"""Lỗi miền. Không có lỗi nào ở đây mang chi tiết kỹ thuật ra ngoài (AD-18)."""

from __future__ import annotations


class DomainError(Exception):
    """Gốc của mọi lỗi miền."""

    code: str = "DOMAIN_ERROR"


class MissingInputError(DomainError):
    """Một giá trị bắt buộc là ``None``.

    Tồn tại để thực thi AD-5: giá trị thiếu không bao giờ được ngầm thành 0.
    Đây là rủi ro số 1 trong bảng §13 của PRD — một Trường BCTC không đọc được
    trở thành 0 và hệ thống trả về một phân tích trông hoàn chỉnh nhưng sai.
    """

    code = "MISSING_INPUT"

    def __init__(self, field: str) -> None:
        self.field = field
        super().__init__(f"Thiếu giá trị bắt buộc: {field}")


class QuantityKindError(DomainError):
    """Cố cộng/so sánh hai đại lượng khác kỳ (AD-21)."""

    code = "QUANTITY_KIND_MISMATCH"

    def __init__(self, left: str, right: str) -> None:
        self.left = left
        self.right = right
        super().__init__(
            f"Không thể kết hợp {left} với {right}: hai đại lượng khác kỳ. "
            "PRD §1.1 và FR-13 cấm cộng hoặc đổi nhãn giữa chúng."
        )


class UndefinedRatioError(DomainError):
    """Mẫu số làm tỷ lệ mất định nghĩa nghiệp vụ."""

    code = "UNDEFINED_RATIO"

    def __init__(self, ratio: str, reason: str) -> None:
        self.ratio = ratio
        self.reason = reason
        super().__init__(f"Không tính được {ratio}: {reason}")


class ContractViolationError(DomainError):
    """Đầu vào vi phạm một quy ước của hợp đồng tính toán §4.3.1."""

    code = "CONTRACT_VIOLATION"

    def __init__(self, detail: str) -> None:
        super().__init__(detail)
