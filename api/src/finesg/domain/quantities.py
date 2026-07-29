"""Đại lượng mang kỳ trong chính kiểu của nó — AD-21.

PRD §1.1 gọi đây là rủi ro khái niệm trung tâm của sản phẩm: NPV vòng đời,
CO₂ theo năm vận hành đầy đủ và khả năng chi trả 12 tháng là ba kỳ khác nhau.
Nếu cả ba chỉ là ``Decimal`` thì ``total = annual_co2 + first_12m_co2`` là một
biểu thức hợp lệ về kiểu, và một template PDF có thể render field CO₂/năm dưới
heading "12 tháng đầu" mà không ai viết sai một dòng code nào.

Ở đây kiểu làm việc đó bất khả thi.
"""

from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal
from typing import Self

from finesg.domain.errors import QuantityKindError

__all__ = [
    "Quantity",
    "LifetimeNPV",
    "Month12Cash",
    "AnnualFullOperationCO2",
    "First12MonthCO2",
]


@dataclass(frozen=True, slots=True)
class Quantity:
    """Một đại lượng có kỳ. Chỉ kết hợp được với đúng kiểu của mình."""

    amount: Decimal

    #: Nhãn kỳ, dùng cho thông điệp lỗi và cho catalog nhãn (AD-19).
    period_label: str = ""

    def __post_init__(self) -> None:
        if not isinstance(self.amount, Decimal):
            raise TypeError(
                f"{type(self).__name__} yêu cầu Decimal, nhận {type(self.amount).__name__}. "
                "AD-4: tiền và CO₂ không bao giờ là float."
            )

    def _require_same_kind(self, other: object) -> Quantity:
        if type(other) is not type(self):
            raise QuantityKindError(
                left=type(self).__name__,
                right=type(other).__name__,
            )
        assert isinstance(other, Quantity)
        return other

    def __add__(self, other: object) -> Self:
        peer = self._require_same_kind(other)
        return type(self)(self.amount + peer.amount)

    def __sub__(self, other: object) -> Self:
        peer = self._require_same_kind(other)
        return type(self)(self.amount - peer.amount)

    def __lt__(self, other: object) -> bool:
        return self.amount < self._require_same_kind(other).amount

    def __le__(self, other: object) -> bool:
        return self.amount <= self._require_same_kind(other).amount


@dataclass(frozen=True, slots=True)
class LifetimeNPV(Quantity):
    """Giá trị hiện tại ròng vòng đời tại Ngày gốc, trước tài trợ."""

    period_label: str = "vòng đời"


@dataclass(frozen=True, slots=True)
class Month12Cash(Quantity):
    """Tiền tại cuối tháng 12 của kỳ kế hoạch."""

    period_label: str = "tháng 12"


@dataclass(frozen=True, slots=True)
class AnnualFullOperationCO2(Quantity):
    """tCO₂e trên một năm vận hành đầy đủ — đại lượng vào mục tiêu chính."""

    period_label: str = "năm vận hành đầy đủ"


@dataclass(frozen=True, slots=True)
class First12MonthCO2(Quantity):
    """tCO₂e dự kiến trong 12 tháng đầu, theo ngày vận hành và ramp-up.

    FR-13: hiển thị riêng, chỉ khi dữ liệu đã xác nhận đủ. Chưa đủ thì ``None``
    và hiển thị ``N/A`` — không bao giờ nội suy từ con số theo năm.
    """

    period_label: str = "12 tháng đầu"
