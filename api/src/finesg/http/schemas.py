"""Shape trả về của API.

``LedgerResult`` là dataclass thuần trong ``domain/``. Việc chuyển nó thành JSON
— và **chỉ** ở đây mới có làm tròn hiển thị — thuộc tầng trình bày (AD-4).
Kiểm tra ràng buộc luôn dùng giá trị chưa làm tròn trong domain.
"""

from __future__ import annotations

from decimal import Decimal

from pydantic import BaseModel, Field

from finesg.domain.finance.contract_v1 import LedgerResult
from finesg.domain.models.finance_inputs import FinanceInput, Solution


class LedgerRequest(BaseModel):
    data: FinanceInput
    solution: Solution


class MonthRow(BaseModel):
    month: int
    drawdown: Decimal
    cash: Decimal
    cash_minimum: Decimal | None
    breaches_floor: bool


class LedgerResponse(BaseModel):
    """Mọi con số ở đây đến từ ``LedgerResult`` — AD-2."""

    contract_version: str

    cash_end_12: Decimal
    cash_end_12_period: str = Field(description="Nhãn kỳ, đến từ kiểu — AD-19/AD-21")
    cash_floor_breach_months: list[int]
    months: list[MonthRow]

    project_ocf_12: Decimal
    cfads_12: Decimal
    existing_debt_service_12: Decimal
    new_debt_service_12: Decimal
    debt_service_12: Decimal
    dscr_12: Decimal | None
    dscr_12_display: str = Field(description="'N/A' khi không có nghĩa vụ nợ — FR-11")

    debt_opening: Decimal
    new_borrowing_12: Decimal
    new_principal_paid_12: Decimal
    debt_end_12: Decimal
    equity_base: Decimal
    debt_to_equity_12: Decimal

    npv_by_project: dict[str, Decimal]
    portfolio_npv: Decimal
    portfolio_npv_period: str
    financing_cost_pv: Decimal

    @classmethod
    def of(cls, ledger: LedgerResult, data: FinanceInput) -> LedgerResponse:
        breaches = set(ledger.cash_floor_breach_months)
        months = [
            MonthRow(
                month=t,
                drawdown=ledger.new_drawdown_by_month[t - 1],
                cash=ledger.cash_by_month[t - 1],
                cash_minimum=data.cash_minimum.values[t - 1],
                breaches_floor=t in breaches,
            )
            for t in range(1, 13)
        ]
        return cls(
            contract_version=ledger.contract_version,
            cash_end_12=ledger.cash_end_12.amount,
            cash_end_12_period=ledger.cash_end_12.period_label,
            cash_floor_breach_months=list(ledger.cash_floor_breach_months),
            months=months,
            project_ocf_12=ledger.project_ocf_12,
            cfads_12=ledger.cfads_12,
            existing_debt_service_12=ledger.existing_debt_service_12,
            new_debt_service_12=ledger.new_debt_service_12,
            debt_service_12=ledger.debt_service_12,
            dscr_12=ledger.dscr_12,
            dscr_12_display=ledger.dscr_12_display,
            debt_opening=ledger.debt_opening,
            new_borrowing_12=ledger.new_borrowing_12,
            new_principal_paid_12=ledger.new_principal_paid_12,
            debt_end_12=ledger.debt_end_12,
            equity_base=ledger.equity_base,
            debt_to_equity_12=ledger.debt_to_equity_12,
            npv_by_project=ledger.npv_by_project,
            portfolio_npv=ledger.portfolio_npv.amount,
            portfolio_npv_period=ledger.portfolio_npv.period_label,
            financing_cost_pv=ledger.financing_cost_pv,
        )
