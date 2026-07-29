"""Dung sai của PRD §4.5.1 — đúng một nơi (AD-23).

Cả ``solve/loop.py`` lẫn ``verify/checks.py`` import từ đây. Nếu hai bên có hai
bộ dung sai riêng, việc chỉnh τ của bộ giải mà quên chỉnh τ của verifier sẽ làm
verifier bắt đầu từ chối những nghiệm hợp lệ — và triệu chứng đó trông y hệt
một lỗi bộ giải, dẫn điều tra đi sai hướng hoàn toàn.

Toàn bộ bộ tham số này được persist nguyên vẹn vào bản ghi lần chạy (§4.5.1).
"""

from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal

__all__ = ["Tolerances", "TOLERANCES_V1"]


@dataclass(frozen=True, slots=True)
class Tolerances:
    version: str

    #: Dung sai biến nhị phân.
    binary: Decimal

    #: Dung sai khả thi tuyệt đối cho tiền và CO₂, theo đơn vị chuẩn hóa.
    feasibility_absolute: Decimal

    #: Dung sai khả thi tương đối, kiểm tra bổ sung.
    feasibility_relative: Decimal

    #: Sàn tuyệt đối của dung sai khóa tầng.
    tier_lock_absolute_floor: Decimal

    #: Hệ số tương đối của dung sai khóa tầng.
    tier_lock_relative: Decimal

    def tier_lock(self, optimum: Decimal) -> Decimal:
        """τ(z*) = max(1e-6, 1e-8 × |z*|) — §4.5.1.

        Sau tầng tối đa hóa thêm ``z ≥ z* − τ(z*)``; sau tầng tối thiểu hóa thêm
        ``z ≤ z* + τ(z*)``; rồi mới giải tầng tiếp theo.
        """
        return max(
            self.tier_lock_absolute_floor,
            self.tier_lock_relative * abs(optimum),
        )

    def is_within_feasibility(self, violation: Decimal, scale: Decimal) -> bool:
        """Một vi phạm có nằm trong dung sai không.

        Dùng cả cận tuyệt đối lẫn cận tương đối, theo §4.5.1.
        """
        if abs(violation) <= self.feasibility_absolute:
            return True
        return abs(violation) <= self.feasibility_relative * abs(scale)


TOLERANCES_V1 = Tolerances(
    version="tolerances-v1",
    binary=Decimal("1e-6"),
    feasibility_absolute=Decimal("1e-6"),
    feasibility_relative=Decimal("1e-8"),
    tier_lock_absolute_floor=Decimal("1e-6"),
    tier_lock_relative=Decimal("1e-8"),
)
