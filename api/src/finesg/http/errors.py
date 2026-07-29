"""Envelope lỗi duy nhất — AD-18.

Một shape cho mọi lỗi, luôn có correlation ID, không bao giờ có stack trace.
Cấu trúc bám đúng microcopy **sự cố → tác động → hành động** của EXPERIENCE.md.
"""

from __future__ import annotations

import uuid
from typing import Any

from fastapi import Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

from finesg.domain.errors import (
    ContractViolationError,
    DomainError,
    MissingInputError,
    QuantityKindError,
    UndefinedRatioError,
)

CORRELATION_HEADER = "X-Correlation-Id"


class FieldError(BaseModel):
    field: str
    message_vi: str


class ErrorEnvelope(BaseModel):
    """Shape lỗi duy nhất của API."""

    code: str
    message_vi: str = Field(description="Sự cố")
    impact_vi: str = Field(description="Tác động")
    remediation_vi: str = Field(description="Hành động")
    correlation_id: str
    field_errors: list[FieldError] = []


#: Ánh xạ lỗi miền → HTTP status + tác động/hành động bằng tiếng Việt.
_DOMAIN_MAPPING: dict[type[DomainError], tuple[int, str, str]] = {
    MissingInputError: (
        422,
        "Phép tính phụ thuộc bị khóa; hệ thống không điền 0 thay cho giá trị thiếu.",
        "Mở trường được nêu, nhập hoặc xác nhận giá trị, rồi chạy lại.",
    ),
    UndefinedRatioError: (
        422,
        "Hồ sơ không đạt trạng thái Phân tích tài chính 12 tháng.",
        "Kiểm tra lại Trường BCTC liên quan; Hồ sơ vẫn có thể chạy Sàng lọc mô phỏng.",
    ),
    ContractViolationError: (
        422,
        "Cấu hình vi phạm hợp đồng tính toán; lần chạy không được tạo.",
        "Sửa cấu hình được nêu rồi gửi lại. Hệ thống không tự nới điều kiện.",
    ),
    QuantityKindError: (
        422,
        "Hai đại lượng khác kỳ không được cộng hoặc đổi nhãn cho nhau.",
        "Xem lại đại lượng nào thuộc kỳ nào trước khi so sánh.",
    ),
}


def correlation_id_of(request: Request) -> str:
    existing = request.headers.get(CORRELATION_HEADER)
    return existing or f"cid-{uuid.uuid4().hex[:16]}"


async def domain_error_handler(request: Request, exc: Exception) -> JSONResponse:
    assert isinstance(exc, DomainError)
    status, impact, remediation = _DOMAIN_MAPPING.get(
        type(exc),
        (422, "Lần chạy không được tạo.", "Xem lại đầu vào rồi gửi lại."),
    )
    cid = correlation_id_of(request)

    field_errors: list[FieldError] = []
    if isinstance(exc, MissingInputError):
        field_errors.append(FieldError(field=exc.field, message_vi="Cần kiểm tra"))

    envelope = ErrorEnvelope(
        code=exc.code,
        message_vi=str(exc),
        impact_vi=impact,
        remediation_vi=remediation,
        correlation_id=cid,
        field_errors=field_errors,
    )
    return JSONResponse(
        status_code=status,
        content=envelope.model_dump(mode="json"),
        headers={CORRELATION_HEADER: cid},
    )


async def unhandled_error_handler(request: Request, exc: Exception) -> JSONResponse:
    """NFR-19: nêu bước khắc phục, không lộ stack trace.

    ``str(exc)`` không bao giờ đi vào ``message_vi`` — chi tiết kỹ thuật chỉ
    được ghi trong log nội bộ, tra cứu bằng correlation ID.
    """
    cid = correlation_id_of(request)
    envelope = ErrorEnvelope(
        code="INTERNAL_ERROR",
        message_vi="Hệ thống gặp sự cố kỹ thuật khi xử lý yêu cầu.",
        impact_vi="Yêu cầu không hoàn tất; không có dữ liệu nào bị thay đổi.",
        remediation_vi=f"Thử lại; nếu lặp lại, cung cấp mã theo dõi {cid} cho nhóm hỗ trợ.",
        correlation_id=cid,
    )
    return JSONResponse(
        status_code=500,
        content=envelope.model_dump(mode="json"),
        headers={CORRELATION_HEADER: cid},
    )


def error_responses() -> dict[int | str, dict[str, Any]]:
    """Khai báo cho OpenAPI để client generate đúng shape lỗi (AD-20)."""
    return {
        422: {"model": ErrorEnvelope, "description": "Đầu vào không đủ điều kiện"},
        500: {"model": ErrorEnvelope, "description": "Sự cố kỹ thuật"},
    }
