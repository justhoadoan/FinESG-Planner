"""Hợp đồng tính toán tài chính 12 tháng — PRD §4.3.1, phiên bản 1.

AD-2: mọi con số tài chính hiển thị đến từ ``LedgerResult`` mà module này sinh
ra. Giá trị do bộ giải trả về chỉ là metadata lần chạy và không bao giờ được
render như một con số nghiệp vụ.

Đổi bất kỳ công thức nào ở đây **phải** tạo một module ``contract_v2.py`` mới và
bump ``CONTRACT_VERSION``; các Phương án cũ chuyển sang "Cần chạy lại" (A10).

Module này thuần theo AD-1: không I/O, không đồng hồ, không RNG, không env.
"""

from __future__ import annotations

from dataclasses import dataclass
from decimal import Context, Decimal, localcontext

from finesg.domain.errors import ContractViolationError, UndefinedRatioError
from finesg.domain.models.finance_inputs import (
    PLANNING_MONTHS,
    FinanceInput,
    Solution,
)
from finesg.domain.quantities import LifetimeNPV, Month12Cash

CONTRACT_VERSION = "calc-contract-v1"

#: Bối cảnh số học cục bộ. Dùng ``localcontext`` để không đụng vào context
#: toàn cục của process — hai lần chạy song song phải cho cùng kết quả (NFR-7).
_CALC_CONTEXT = Context(prec=34)

__all__ = ["CONTRACT_VERSION", "LedgerResult", "build_ledger"]


@dataclass(frozen=True, slots=True)
class LedgerResult:
    """Kết quả đi bộ 12 tháng. Nguồn duy nhất của mọi con số hiển thị (AD-2)."""

    contract_version: str

    # --- thanh khoản theo tháng ---
    cash_by_month: tuple[Decimal, ...]
    new_drawdown_by_month: tuple[Decimal, ...]
    cash_end_12: Month12Cash

    #: Các tháng có ``Cash_t < CashMinimum_t``. Rỗng nghĩa là không vi phạm.
    #: A18/DR-16: ngưỡng theo **từng tháng**, chặt hơn đề án gốc, để chặn việc
    #: dùng giải ngân đến muộn tài trợ CapEx đến sớm.
    cash_floor_breach_months: tuple[int, ...]

    # --- khả năng trả nợ ---
    project_ocf_12: Decimal
    cfads_12: Decimal
    existing_debt_service_12: Decimal
    new_debt_service_12: Decimal
    debt_service_12: Decimal

    #: ``None`` nghĩa là N/A — khi ``DebtService12 = 0`` thì ràng buộc DSCR
    #: không áp dụng, nhưng ``CFADS12 ≥ 0`` và tiền mặt theo tháng vẫn áp dụng.
    dscr_12: Decimal | None

    # --- nợ ---
    debt_opening: Decimal
    new_borrowing_12: Decimal
    new_principal_paid_12: Decimal
    debt_end_12: Decimal
    equity_base: Decimal
    debt_to_equity_12: Decimal

    # --- vòng đời ---
    npv_by_project: dict[str, Decimal]
    portfolio_npv: LifetimeNPV
    financing_cost_pv: Decimal

    @property
    def dscr_12_display(self) -> str:
        """FR-11: khi không có nghĩa vụ nợ, hiển thị ``N/A``, không phải 0."""
        return "N/A" if self.dscr_12 is None else str(self.dscr_12)


def build_ledger(data: FinanceInput, solution: Solution) -> LedgerResult:
    """Dựng ledger 12 tháng từ đầu vào đã xác nhận và một vector nghiệm.

    Mọi số học chạy trong ``_CALC_CONTEXT``. Không có bước làm tròn hiển thị
    nào ở đây — AD-4: kiểm tra ràng buộc dùng giá trị chưa làm tròn, làm tròn
    là việc của tầng trình bày.
    """
    with localcontext(_CALC_CONTEXT):
        return _build(data, solution)


def _build(data: FinanceInput, solution: Solution) -> LedgerResult:
    projects = data.sorted_projects()
    loans = data.sorted_loans()

    selected = tuple(p for p in projects if solution.x.get(p.code, False))

    # ── Hệ số Gói vay áp lên số tiền thực rút ────────────────────────────────
    drawn: dict[str, Decimal] = {k.code: solution.drawn_from(k.code) for k in loans}
    used: dict[str, bool] = {k.code: solution.y.get(k.code, False) for k in loans}

    for loan in loans:
        if drawn[loan.code] != 0 and not used[loan.code]:
            raise ContractViolationError(
                f"Gói vay {loan.code} có vốn rút nhưng y_k = 0. "
                "FR-17 yêu cầu liên kết y_k với số tiền vay bằng cả cận dưới và cận trên."
            )

    # ── ProjectOCF12 — chỉ phần chưa nằm trong dòng tiền kinh doanh (FR-10) ──
    project_ocf_12 = Decimal(0)
    for project in selected:
        if project.contributes_ocf():
            project_ocf_12 += project.ocf_12m.total(f"ProjectOCF[{project.code}]")

    # ── Nghĩa vụ nợ ──────────────────────────────────────────────────────────
    existing_debt_service_12 = data.existing_debt.service_12()

    def new_debt_service_at(month: int) -> Decimal:
        total = Decimal(0)
        for loan in loans:
            coef = loan.debt_service_coef.at(month, f"DebtServiceCoef[{loan.code}]")
            total += coef * drawn[loan.code]
            if used[loan.code]:
                total += loan.fixed_cash_fee.at(month, f"FixedCashFee[{loan.code}]")
        return total

    new_debt_service_12 = sum(
        (new_debt_service_at(t) for t in range(1, PLANNING_MONTHS + 1)),
        start=Decimal(0),
    )
    debt_service_12 = existing_debt_service_12 + new_debt_service_12

    # ── CFADS và DSCR ────────────────────────────────────────────────────────
    operating_cash_12 = data.operating_cash_pre_debt.total("OperatingCashPreDebt")
    cfads_12 = operating_cash_12 + project_ocf_12

    if debt_service_12 == 0:
        # FR-11 / FR-17: N/A, và ràng buộc DSCR không áp dụng. Không phải 0,
        # không phải vô cực — hai cách đó đều làm ràng buộc mất ý nghĩa.
        dscr_12: Decimal | None = None
    else:
        dscr_12 = cfads_12 / debt_service_12

    # ── Đi bộ tiền mặt theo tháng ────────────────────────────────────────────
    cash_by_month: list[Decimal] = []
    drawdown_by_month: list[Decimal] = []
    breaches: list[int] = []
    cash = data.baseline.cash_opening

    for month in range(1, PLANNING_MONTHS + 1):
        drawdown = sum(
            (
                loan.drawdown_share.at(month, f"DrawdownShare[{loan.code}]") * drawn[loan.code]
                for loan in loans
            ),
            start=Decimal(0),
        )

        project_ocf = Decimal(0)
        capex = Decimal(0)
        for project in selected:
            if project.contributes_ocf():
                project_ocf += project.ocf_12m.at(month, f"ProjectOCF[{project.code}]")
            capex += project.capex_12m.at(month, f"CapEx[{project.code}]")

        cash = (
            cash
            + data.operating_cash_pre_debt.at(month, "OperatingCashPreDebt")
            + project_ocf
            + drawdown
            - capex
            - data.existing_debt.service_at(month)
            - new_debt_service_at(month)
        )

        floor = data.cash_minimum.at(month, "CashMinimum")
        if cash < floor:
            breaches.append(month)

        cash_by_month.append(cash)
        drawdown_by_month.append(drawdown)

    # ── Nợ cuối kỳ ───────────────────────────────────────────────────────────
    new_borrowing_12 = solution.total_new_borrowing()
    new_principal_paid_12 = sum(
        (loan.principal_paid_coef_12m * drawn[loan.code] for loan in loans),
        start=Decimal(0),
    )
    existing_principal_paid_12 = data.existing_debt.principal_paid_12()

    if existing_principal_paid_12 > data.baseline.debt_opening:
        raise ContractViolationError(
            "Gốc hiện hữu trả lũy kế vượt Dư nợ mở đầu — FR-9 cấm cấu hình này."
        )

    debt_end_12 = (
        data.baseline.debt_opening
        - existing_principal_paid_12
        + new_borrowing_12
        - new_principal_paid_12
    )

    equity_base = data.baseline.equity_base
    if equity_base <= 0:
        # §4.3.1: Hồ sơ không đạt trạng thái Phân tích tài chính 12 tháng.
        raise UndefinedRatioError(
            ratio="DebtToEquity12",
            reason="Vốn chủ cơ sở FS-07 ≤ 0; Hồ sơ chỉ có thể ở mức Sàng lọc mô phỏng.",
        )
    debt_to_equity_12 = debt_end_12 / equity_base

    # ── NPV vòng đời và Chi phí tài trợ ──────────────────────────────────────
    npv_by_project = {p.code: _npv(p) for p in projects}
    portfolio_npv = sum(
        (npv_by_project[p.code] for p in selected),
        start=Decimal(0),
    )

    financing_cost_pv = Decimal(0)
    for loan in loans:
        financing_cost_pv += loan.financing_cost_coef_pv * drawn[loan.code]
        if used[loan.code]:
            financing_cost_pv += loan.fixed_fee_pv

    return LedgerResult(
        contract_version=CONTRACT_VERSION,
        cash_by_month=tuple(cash_by_month),
        new_drawdown_by_month=tuple(drawdown_by_month),
        cash_end_12=Month12Cash(cash_by_month[-1]),
        cash_floor_breach_months=tuple(breaches),
        project_ocf_12=project_ocf_12,
        cfads_12=cfads_12,
        existing_debt_service_12=existing_debt_service_12,
        new_debt_service_12=new_debt_service_12,
        debt_service_12=debt_service_12,
        dscr_12=dscr_12,
        debt_opening=data.baseline.debt_opening,
        new_borrowing_12=new_borrowing_12,
        new_principal_paid_12=new_principal_paid_12,
        debt_end_12=debt_end_12,
        equity_base=equity_base,
        debt_to_equity_12=debt_to_equity_12,
        npv_by_project=npv_by_project,
        portfolio_npv=LifetimeNPV(portfolio_npv),
        financing_cost_pv=financing_cost_pv,
    )


def _npv(project) -> Decimal:  # noqa: ANN001 — ProjectFinancials, tránh import vòng
    """``NPV_i = Σ_q FCF_i,q / (1 + r_i)^(q/12)`` — §4.3.1.

    ``q`` là số tháng từ Ngày gốc; ``r_i`` là tỷ lệ chiết khấu **theo năm**.
    DR-14: NPV luôn do hệ thống tính từ lịch dòng tiền có mốc tháng đã version
    hóa; NPV người dùng nhập chỉ để đối chiếu và không đi vào hàm mục tiêu.
    """
    rate = project.discount_rate_annual
    base = Decimal(1) + rate
    if base <= 0:
        raise ContractViolationError(
            f"Tỷ lệ chiết khấu của Dự án {project.code} làm (1+r) ≤ 0."
        )

    total = Decimal(0)
    for flow in project.lifetime_cashflows:
        exponent = Decimal(flow.month_offset) / Decimal(12)
        total += flow.amount / (base**exponent)
    return total
