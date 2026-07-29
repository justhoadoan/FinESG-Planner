"""Ví dụ chuẩn PRD §4.3.1 — fixture tham chiếu dùng chung.

Golden test và bàn thử dev cùng đọc từ đây. Nếu mỗi bên tự dựng lại bộ số này,
hai bên sẽ trôi khỏi nhau và bộ số nghiệm thu của §14 tiêu chí 11 mất ý nghĩa.

Fixture ở đây dựng lại **ví dụ chuẩn** của PRD §4.3.1 — bộ số mà §14 tiêu chí 11
đặt làm điều kiện chấp nhận MVP.
"""

from __future__ import annotations

from decimal import Decimal

from finesg.domain.models.finance_inputs import (
    BaselineBalances,
    ExistingDebtSchedule,
    FinanceInput,
    LifetimeCashFlow,
    LoanPackage,
    MonthlySeries,
    ProjectFinancials,
    Solution,
)


def D(v: str | int) -> Decimal:  # noqa: N802 — tên ngắn có chủ ý trong fixture
    return Decimal(str(v))


def series(*values: str | int | None) -> MonthlySeries:
    """12 giá trị theo tháng; ``None`` giữ nguyên là thiếu, không thành 0."""
    assert len(values) == 12, f"cần đúng 12 giá trị, nhận {len(values)}"
    return MonthlySeries(values=tuple(None if v is None else D(v) for v in values))


def months(mapping: dict[int, str | int], default: str | int = 0) -> MonthlySeries:
    """Dựng chuỗi từ ``{tháng: giá trị}``, các tháng còn lại lấy ``default``."""
    return series(*[mapping.get(t, default) for t in range(1, 13)])


# ── Ví dụ chuẩn §4.3.1 ──────────────────────────────────────────────────────
#
#   CashOpening=100 · OperatingCashPreDebt12=40 · ProjectOCF12=10
#   giải ngân vay mới=30 · CapEx 12 tháng=50
#   nghĩa vụ nợ hiện hữu=15 · nghĩa vụ nợ mới=5
#     → CashEnd12=110 · CFADS12=50 · DebtService12=20 · DSCR12=2,5
#
#   DebtOpening=80 · gốc hiện hữu đã trả=10 · vay mới=30
#   gốc vay mới đã trả=5 · EquityBase=100
#     → DebtEnd12=95 · DebtToEquity12=0,95

CANONICAL_PROJECT = "P1"
CANONICAL_LOAN = "L1"


def canonical_baseline() -> BaselineBalances:
    return BaselineBalances(
        fs01_cash=D(100),
        fs04_short_term_debt=D(80),
        fs05_long_term_debt=D(0),
        fs07_equity=D(100),
    )


def canonical_operating_cash() -> MonthlySeries:
    """Tổng 40: 3/tháng cho tháng 1–11, 7 ở tháng 12."""
    return months({t: 3 for t in range(1, 12)} | {12: 7})


def canonical_existing_debt() -> ExistingDebtSchedule:
    """Tổng nghĩa vụ 15, trong đó gốc 10 và lãi 5."""
    return ExistingDebtSchedule(
        principal=months({t: 1 for t in range(1, 11)}),
        interest=months({t: 1 for t in range(1, 6)}),
        cash_fee=MonthlySeries.zeros(),
    )


def canonical_project(
    *,
    ocf_already_in_operating_forecast: bool | None = False,
    lifetime_cashflows: tuple[LifetimeCashFlow, ...] | None = None,
) -> ProjectFinancials:
    """CapEx 12 tháng = 50 (tháng 1–5), dòng tiền Dự án = 10 (tháng 8–12)."""
    return ProjectFinancials(
        code=CANONICAL_PROJECT,
        capex_12m=months({t: 10 for t in range(1, 6)}),
        ocf_12m=months({t: 2 for t in range(8, 13)}),
        ocf_already_in_operating_forecast=ocf_already_in_operating_forecast,
        lifetime_cashflows=lifetime_cashflows
        or (
            LifetimeCashFlow(month_offset=0, amount=D(-50)),
            LifetimeCashFlow(month_offset=12, amount=D(30)),
            LifetimeCashFlow(month_offset=24, amount=D(30)),
        ),
        discount_rate_annual=D("0.10"),
    )


def canonical_loan(*, drawdown_months: dict[int, str] | None = None) -> LoanPackage:
    """Nghĩa vụ nợ mới = 5 trên 30 vốn rút: 3 theo hệ số + 2 phí cố định.

    ``principal_paid_coef_12m = 1/6`` để gốc vay mới đã trả = 5 trên 30 vốn rút.
    Tỷ số này không biểu diễn hữu hạn được, nên nghiệm thu dùng dung sai §4.5.1
    thay vì so bằng tuyệt đối — đúng cách hệ thống thật kiểm tra ràng buộc.
    """
    return LoanPackage(
        code=CANONICAL_LOAN,
        debt_service_coef=months({t: "0.01" for t in range(1, 11)}),
        drawdown_share=months(drawdown_months or {1: "0.5", 2: "0.5"}),
        principal_paid_coef_12m=D(1) / D(6),
        financing_cost_coef_pv=D("0.08"),
        fixed_cash_fee=months({1: 1, 2: 1}),
        fixed_fee_pv=D("0.5"),
    )


def canonical_input(
    *,
    cash_minimum: MonthlySeries | None = None,
    drawdown_months: dict[int, str] | None = None,
    **project_kwargs: object,
) -> FinanceInput:
    return FinanceInput(
        baseline=canonical_baseline(),
        operating_cash_pre_debt=canonical_operating_cash(),
        existing_debt=canonical_existing_debt(),
        projects=(canonical_project(**project_kwargs),),  # type: ignore[arg-type]
        loans=(canonical_loan(drawdown_months=drawdown_months),),
        cash_minimum=cash_minimum or MonthlySeries.zeros(),
        financing_discount_rate_annual=D("0.10"),
    )


def canonical_solution(*, selected: bool = True, drawn: str | int = 30) -> Solution:
    return Solution(
        x={CANONICAL_PROJECT: selected},
        u={CANONICAL_PROJECT: D(20)},
        d={CANONICAL_PROJECT: {CANONICAL_LOAN: D(drawn)}},
        y={CANONICAL_LOAN: True},
    )

