"""Đầu vào của hợp đồng tính toán 12 tháng — PRD §4.3.1.

Quy ước dữ liệu (§4.3.1), được thực thi ở đây chứ không phải ở tầng gọi:

- ``t = 1..12`` là tháng kể từ Ngày gốc.
- Dòng tiền kinh doanh trước trả nợ và dòng tiền hoạt động Dự án là số ròng có
  dấu; CapEx, gốc, lãi và phí trả ra lưu dưới dạng **độ lớn dương** rồi trừ
  trong công thức.
- Giá trị thiếu là ``None``, không bao giờ ngầm thành 0 (AD-5).
"""

from __future__ import annotations

from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, field_validator

from finesg.domain.errors import ContractViolationError, MissingInputError

PLANNING_MONTHS = 12

__all__ = [
    "PLANNING_MONTHS",
    "MonthlySeries",
    "BaselineBalances",
    "ExistingDebtSchedule",
    "LifetimeCashFlow",
    "ProjectFinancials",
    "LoanPackage",
    "Solution",
    "FinanceInput",
]


class _Frozen(BaseModel):
    model_config = ConfigDict(frozen=True, extra="forbid", strict=False)


class MonthlySeries(_Frozen):
    """Đúng 12 giá trị theo tháng. ``None`` nghĩa là chưa có, không phải 0."""

    values: tuple[Decimal | None, ...]

    @field_validator("values")
    @classmethod
    def _exactly_twelve(cls, v: tuple[Decimal | None, ...]) -> tuple[Decimal | None, ...]:
        if len(v) != PLANNING_MONTHS:
            raise ValueError(
                f"Chuỗi theo tháng phải có đúng {PLANNING_MONTHS} phần tử, nhận {len(v)}."
            )
        return v

    @classmethod
    def flat(cls, amount: Decimal | int | str) -> MonthlySeries:
        """Chia đều một tổng 12 tháng — tiện cho fixture, không dùng ở production."""
        return cls(values=tuple([Decimal(str(amount))] * PLANNING_MONTHS))

    @classmethod
    def zeros(cls) -> MonthlySeries:
        return cls(values=tuple([Decimal(0)] * PLANNING_MONTHS))

    def at(self, month: int, field: str) -> Decimal:
        """Giá trị tại tháng ``month`` (1-based). Ném nếu thiếu — AD-5."""
        if not 1 <= month <= PLANNING_MONTHS:
            raise ContractViolationError(f"Tháng {month} nằm ngoài kỳ kế hoạch 1..12.")
        value = self.values[month - 1]
        if value is None:
            raise MissingInputError(f"{field}[t={month}]")
        return value

    def total(self, field: str) -> Decimal:
        """Tổng 12 tháng. Bất kỳ tháng nào thiếu đều làm tổng mất định nghĩa."""
        return sum(
            (self.at(t, field) for t in range(1, PLANNING_MONTHS + 1)),
            start=Decimal(0),
        )

    def has_gaps(self) -> bool:
        return any(v is None for v in self.values)


class BaselineBalances(_Frozen):
    """Số dư mở đầu, lấy từ Bộ dữ liệu tài chính lịch sử đã xác nhận.

    ``CashOpening = FS-01``; ``DebtOpening = FS-04 + FS-05``; ``EquityBase = FS-07``.
    """

    fs01_cash: Decimal | None = Field(description="Tiền và tương đương tiền")
    fs04_short_term_debt: Decimal | None = Field(description="Vay ngắn hạn")
    fs05_long_term_debt: Decimal | None = Field(description="Vay dài hạn")
    fs07_equity: Decimal | None = Field(description="Vốn chủ sở hữu")

    @property
    def cash_opening(self) -> Decimal:
        if self.fs01_cash is None:
            raise MissingInputError("FS-01")
        return self.fs01_cash

    @property
    def debt_opening(self) -> Decimal:
        if self.fs04_short_term_debt is None:
            raise MissingInputError("FS-04")
        if self.fs05_long_term_debt is None:
            raise MissingInputError("FS-05")
        return self.fs04_short_term_debt + self.fs05_long_term_debt

    @property
    def equity_base(self) -> Decimal:
        if self.fs07_equity is None:
            raise MissingInputError("FS-07")
        return self.fs07_equity


class ExistingDebtSchedule(_Frozen):
    """Nghĩa vụ nợ hiện hữu theo tháng, lưu dưới dạng độ lớn dương."""

    principal: MonthlySeries
    interest: MonthlySeries
    cash_fee: MonthlySeries

    def service_at(self, month: int) -> Decimal:
        return (
            self.principal.at(month, "ExistingPrincipal")
            + self.interest.at(month, "ExistingInterest")
            + self.cash_fee.at(month, "ExistingCashFee")
        )

    def service_12(self) -> Decimal:
        return sum(
            (self.service_at(t) for t in range(1, PLANNING_MONTHS + 1)),
            start=Decimal(0),
        )

    def principal_paid_12(self) -> Decimal:
        return self.principal.total("ExistingPrincipal")


class LifetimeCashFlow(_Frozen):
    """Một dòng tiền vòng đời của Dự án, có mốc tháng ``q`` kể từ Ngày gốc.

    DR-14 / A16: NPV luôn do hệ thống tính từ lịch này. NPV người dùng nhập chỉ
    là giá trị đối chiếu và không bao giờ đi vào hàm mục tiêu.
    """

    month_offset: int = Field(ge=0, description="q — số tháng từ Ngày gốc")
    amount: Decimal = Field(description="FCF: gồm CapEx vòng đời, loại trừ mọi dòng tiền tài trợ")


class ProjectFinancials(_Frozen):
    code: str = Field(pattern=r"^[A-Z0-9][A-Z0-9_-]{0,15}$")
    capex_12m: MonthlySeries
    ocf_12m: MonthlySeries

    #: FR-10. ``None`` nghĩa là CFO chưa khai báo — trạng thái không rõ thì
    #: hệ thống không được tính tiền cuối kỳ/CFADS như dữ liệu đã xác nhận.
    ocf_already_in_operating_forecast: bool | None

    lifetime_cashflows: tuple[LifetimeCashFlow, ...]
    discount_rate_annual: Decimal

    def contributes_ocf(self) -> bool:
        """Dòng tiền Dự án có được cộng vào tiền mặt và CFADS không — FR-10."""
        if self.ocf_already_in_operating_forecast is None:
            raise MissingInputError(f"ocf_already_in_operating_forecast[{self.code}]")
        return not self.ocf_already_in_operating_forecast


class LoanPackage(_Frozen):
    """Hệ số đã tiền tính từ lịch Gói vay đã xác nhận — §4.3.1.

    Các hệ số này thuộc phía **bộ giải**. ``domain/verify`` bị cấm dùng chúng
    (AD-3); verifier đi bộ lại từ lịch gốc.
    """

    code: str = Field(pattern=r"^[A-Z0-9][A-Z0-9_-]{0,15}$")

    #: Nghĩa vụ nợ trên một đơn vị vốn vay, theo tháng.
    debt_service_coef: MonthlySeries

    #: Tỷ trọng giải ngân theo tháng; tổng bằng 1 cho phần giải ngân trong 12 tháng.
    drawdown_share: MonthlySeries

    #: Gốc trả lũy kế trong 12 tháng, trên một đơn vị vốn vay.
    principal_paid_coef_12m: Decimal

    #: PV lãi + phí vòng đời, trên một đơn vị vốn vay.
    financing_cost_coef_pv: Decimal

    #: Phí cố định phải trả bằng tiền theo tháng khi Gói vay được dùng.
    fixed_cash_fee: MonthlySeries

    #: PV phí cố định khi Gói vay được dùng.
    fixed_fee_pv: Decimal


class Solution(_Frozen):
    """Vector nghiệm của bộ giải."""

    #: mã Dự án → được chọn
    x: dict[str, bool]

    #: mã Dự án → vốn nội bộ cấp cho Dự án
    u: dict[str, Decimal]

    #: mã Dự án → { mã Gói vay → vốn vay cấp cho Dự án }
    d: dict[str, dict[str, Decimal]]

    #: mã Gói vay → có sử dụng
    y: dict[str, bool]

    def drawn_from(self, loan_code: str) -> Decimal:
        """Σ_i d_ik — tổng vốn rút từ một Gói vay."""
        return sum(
            (per_loan.get(loan_code, Decimal(0)) for per_loan in self.d.values()),
            start=Decimal(0),
        )

    def total_new_borrowing(self) -> Decimal:
        """Σ_i Σ_k d_ik."""
        return sum(
            (
                amount
                for per_loan in self.d.values()
                for amount in per_loan.values()
            ),
            start=Decimal(0),
        )


class FinanceInput(_Frozen):
    """Toàn bộ đầu vào cần để dựng ledger 12 tháng."""

    baseline: BaselineBalances
    operating_cash_pre_debt: MonthlySeries
    existing_debt: ExistingDebtSchedule
    projects: tuple[ProjectFinancials, ...]
    loans: tuple[LoanPackage, ...]
    cash_minimum: MonthlySeries
    financing_discount_rate_annual: Decimal

    @field_validator("projects")
    @classmethod
    def _at_most_ten(cls, v: tuple[ProjectFinancials, ...]) -> tuple[ProjectFinancials, ...]:
        if len(v) > 10:
            raise ValueError("FR-12: tối đa 10 Dự án trong một Hồ sơ phân tích.")
        codes = [p.code for p in v]
        if len(set(codes)) != len(codes):
            raise ValueError("Mã Dự án phải là duy nhất.")
        return v

    @field_validator("loans")
    @classmethod
    def _one_to_three(cls, v: tuple[LoanPackage, ...]) -> tuple[LoanPackage, ...]:
        if len(v) > 3:
            raise ValueError("FR-9: tối đa 3 Gói vay cho một lần chạy.")
        codes = [k.code for k in v]
        if len(set(codes)) != len(codes):
            raise ValueError("Mã Gói vay phải là duy nhất.")
        return v

    def sorted_projects(self) -> tuple[ProjectFinancials, ...]:
        """AD-10: thứ tự ổn định theo mã, trước mọi thao tác dựng model."""
        return tuple(sorted(self.projects, key=lambda p: p.code))

    def sorted_loans(self) -> tuple[LoanPackage, ...]:
        return tuple(sorted(self.loans, key=lambda k: k.code))
