"""Golden test — ví dụ chuẩn PRD §4.3.1 và các case biên §4.5.1.

SM-1 đặt 100% pass ở đây là điều kiện release. §14 tiêu chí 11 nói rõ ví dụ
chuẩn phải trả **đúng toàn bộ** kết quả.
"""

from __future__ import annotations

from decimal import Decimal

import pytest

from finesg.domain.errors import (
    ContractViolationError,
    MissingInputError,
    UndefinedRatioError,
)
from finesg.domain.finance.contract_v1 import CONTRACT_VERSION, build_ledger
from finesg.domain.quantities import LifetimeNPV, Month12Cash
from finesg.domain.tolerances_v1 import TOLERANCES_V1
from tests.builders import (
    CANONICAL_LOAN,
    D,
    canonical_input,
    canonical_solution,
    months,
)


def assert_close(actual: Decimal, expected: Decimal | str | int, label: str) -> None:
    """So khớp trong dung sai §4.5.1, đúng cách hệ thống kiểm tra ràng buộc."""
    expected = Decimal(str(expected))
    assert TOLERANCES_V1.is_within_feasibility(actual - expected, expected), (
        f"{label}: kỳ vọng {expected}, nhận {actual} "
        f"(lệch {actual - expected}, vượt dung sai §4.5.1)"
    )


class TestCanonicalExample:
    """§14 tiêu chí 11 — bộ số nghiệm thu của hợp đồng tính toán."""

    def test_cash_end_12(self, canonical):
        ledger = build_ledger(*canonical)
        assert_close(ledger.cash_end_12.amount, 110, "CashEnd12")

    def test_cfads_12(self, canonical):
        ledger = build_ledger(*canonical)
        assert_close(ledger.cfads_12, 50, "CFADS12")

    def test_debt_service_12(self, canonical):
        ledger = build_ledger(*canonical)
        assert_close(ledger.existing_debt_service_12, 15, "ExistingDebtService12")
        assert_close(ledger.new_debt_service_12, 5, "NewDebtService12")
        assert_close(ledger.debt_service_12, 20, "DebtService12")

    def test_dscr_12(self, canonical):
        ledger = build_ledger(*canonical)
        assert ledger.dscr_12 is not None
        assert_close(ledger.dscr_12, "2.5", "DSCR12")

    def test_debt_end_12(self, canonical):
        ledger = build_ledger(*canonical)
        assert_close(ledger.debt_opening, 80, "DebtOpening")
        assert_close(ledger.new_borrowing_12, 30, "NewBorrowing12")
        assert_close(ledger.new_principal_paid_12, 5, "NewPrincipalPaid12")
        assert_close(ledger.debt_end_12, 95, "DebtEnd12")

    def test_debt_to_equity_12(self, canonical):
        ledger = build_ledger(*canonical)
        assert_close(ledger.debt_to_equity_12, "0.95", "DebtToEquity12")

    def test_contract_is_versioned(self, canonical):
        """A10: đổi công thức phải tạo phiên bản hợp đồng mới."""
        assert build_ledger(*canonical).contract_version == CONTRACT_VERSION


class TestMonthlyLiquidity:
    """A18 / DR-16 / §14 tiêu chí 15 — ngưỡng tiền mặt theo **từng tháng**."""

    def test_no_breach_when_drawdown_is_early(self, canonical):
        ledger = build_ledger(*canonical)
        assert ledger.cash_floor_breach_months == ()
        assert len(ledger.cash_by_month) == 12

    def test_detects_mid_period_shortfall_despite_positive_year_end(self):
        """Giải ngân đến muộn không được phép tài trợ CapEx đến sớm.

        Đây là fixture mà §14 tiêu chí 15 bắt buộc phải có: ``CashEnd12`` dương
        nhưng một tháng giữa kỳ nằm dưới ngưỡng. Nếu chỉ kiểm tra cuối kỳ, cấu
        hình này trông hoàn toàn hợp lệ.
        """
        data = canonical_input(
            cash_minimum=months({t: 60 for t in range(1, 13)}),
            drawdown_months={11: "0.5", 12: "0.5"},
        )
        ledger = build_ledger(data, canonical_solution())

        assert_close(ledger.cash_end_12.amount, 110, "CashEnd12")
        assert ledger.cash_end_12.amount > Decimal(60)
        assert ledger.cash_floor_breach_months == (5, 6, 7, 8)

    def test_drawdown_share_sums_to_total_borrowing(self, canonical):
        ledger = build_ledger(*canonical)
        assert_close(
            sum(ledger.new_drawdown_by_month, start=Decimal(0)), 30, "Σ NewDrawdown_t"
        )


class TestDoubleCountGuard:
    """FR-10 — mỗi dòng tiền chỉ được tính một lần."""

    def test_project_ocf_excluded_when_already_in_forecast(self):
        data = canonical_input(ocf_already_in_operating_forecast=True)
        ledger = build_ledger(data, canonical_solution())

        assert ledger.project_ocf_12 == Decimal(0)
        assert_close(ledger.cfads_12, 40, "CFADS12 khi OCF đã nằm trong dự báo")
        assert_close(ledger.cash_end_12.amount, 100, "CashEnd12 không cộng trùng OCF")

    def test_undeclared_inclusion_blocks_calculation(self):
        """Trạng thái không rõ thì hệ thống không được tính như dữ liệu đã xác nhận."""
        data = canonical_input(ocf_already_in_operating_forecast=None)
        with pytest.raises(MissingInputError):
            build_ledger(data, canonical_solution())


class TestBoundaryCases:
    """Fixture biên bắt buộc theo §4.5.1."""

    def test_zero_debt_service_gives_na_not_zero(self):
        """FR-11: ``DebtService12 = 0`` → DSCR là N/A, không phải 0 hay vô cực."""
        from finesg.domain.models.finance_inputs import ExistingDebtSchedule, MonthlySeries

        data = canonical_input().model_copy(
            update={
                "existing_debt": ExistingDebtSchedule(
                    principal=MonthlySeries.zeros(),
                    interest=MonthlySeries.zeros(),
                    cash_fee=MonthlySeries.zeros(),
                ),
                "loans": (),
            }
        )
        solution = canonical_solution().model_copy(update={"d": {}, "y": {}})
        ledger = build_ledger(data, solution)

        assert ledger.debt_service_12 == Decimal(0)
        assert ledger.dscr_12 is None
        assert ledger.dscr_12_display == "N/A"
        assert ledger.cfads_12 >= 0, "CFADS12 ≥ 0 vẫn là guardrail độc lập"

    def test_non_positive_equity_blocks_twelve_month_analysis(self):
        data = canonical_input()
        data = data.model_copy(
            update={"baseline": data.baseline.model_copy(update={"fs07_equity": D(0)})}
        )
        with pytest.raises(UndefinedRatioError) as exc:
            build_ledger(data, canonical_solution())
        assert exc.value.ratio == "DebtToEquity12"

    def test_principal_repaid_beyond_opening_balance_is_rejected(self):
        data = canonical_input()
        data = data.model_copy(
            update={
                "baseline": data.baseline.model_copy(
                    update={"fs04_short_term_debt": D(5), "fs05_long_term_debt": D(0)}
                )
            }
        )
        with pytest.raises(ContractViolationError, match="vượt Dư nợ mở đầu"):
            build_ledger(data, canonical_solution())

    def test_missing_field_never_becomes_zero(self):
        """AD-5 — rủi ro số 1 trong bảng §13 của PRD."""
        data = canonical_input()
        data = data.model_copy(
            update={"baseline": data.baseline.model_copy(update={"fs01_cash": None})}
        )
        with pytest.raises(MissingInputError) as exc:
            build_ledger(data, canonical_solution())
        assert exc.value.field == "FS-01"

    def test_missing_month_in_series_is_reported_with_its_month(self):
        data = canonical_input()
        gapped = data.operating_cash_pre_debt.model_copy(
            update={"values": (D(3), None) + data.operating_cash_pre_debt.values[2:]}
        )
        data = data.model_copy(update={"operating_cash_pre_debt": gapped})

        with pytest.raises(MissingInputError) as exc:
            build_ledger(data, canonical_solution())
        assert exc.value.field == "OperatingCashPreDebt[t=2]"

    def test_loan_drawn_without_usage_flag_is_rejected(self):
        """FR-17: ``y_k`` phải liên kết với số tiền vay bằng cả hai cận."""
        solution = canonical_solution().model_copy(update={"y": {CANONICAL_LOAN: False}})
        with pytest.raises(ContractViolationError, match="y_k = 0"):
            build_ledger(canonical_input(), solution)

    def test_unselected_project_contributes_nothing(self):
        ledger = build_ledger(canonical_input(), canonical_solution(selected=False))

        assert ledger.project_ocf_12 == Decimal(0)
        assert ledger.portfolio_npv.amount == Decimal(0)


class TestLifetimeNpv:
    """DR-14 / A16 — NPV do hệ thống tính từ lịch dòng tiền có mốc tháng."""

    def test_npv_discounts_by_month_offset(self, canonical):
        data, solution = canonical
        ledger = build_ledger(data, solution)

        # -50 + 30/1.1 + 30/1.1² = -50 + 27.2727… + 24.7933… = 2.0661…
        assert_close(ledger.npv_by_project["P1"], "2.066115702479339", "NPV_P1")
        assert_close(ledger.portfolio_npv.amount, "2.066115702479339", "PortfolioNPV")

    def test_portfolio_npv_is_a_lifetime_quantity(self, canonical):
        ledger = build_ledger(*canonical)
        assert isinstance(ledger.portfolio_npv, LifetimeNPV)
        assert isinstance(ledger.cash_end_12, Month12Cash)


class TestFinancingCost:
    """FR-11 / A4 — Chi phí tài trợ tách khỏi NPV trước tài trợ."""

    def test_financing_cost_is_not_deducted_from_npv(self, canonical):
        ledger = build_ledger(*canonical)

        # 0.08 × 30 + 0.5 = 2.9
        assert_close(ledger.financing_cost_pv, "2.9", "FinancingCostPV")
        # NPV giữ nguyên: §7.1 cấm trừ lặp Chi phí tài trợ vào NPV trước tài trợ.
        assert_close(ledger.portfolio_npv.amount, "2.066115702479339", "PortfolioNPV")
