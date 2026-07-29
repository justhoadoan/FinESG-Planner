"""Tầng driving adapter — FastAPI.

Phạm vi hiện tại: **chỉ E0**. Đây không phải ứng dụng FinESG Planner; S01–S19
chưa tồn tại. Endpoint ở đây phơi hợp đồng tính toán §4.3.1 ra để kiểm chứng
bằng tay, song song với golden test.
"""

from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse

from finesg.domain.errors import DomainError
from finesg.domain.finance.contract_v1 import CONTRACT_VERSION, build_ledger
from finesg.domain.tolerances_v1 import TOLERANCES_V1
from finesg.fixtures.canonical import canonical_input, canonical_solution
from finesg.http.errors import (
    CORRELATION_HEADER,
    correlation_id_of,
    domain_error_handler,
    error_responses,
    unhandled_error_handler,
)
from finesg.http.schemas import LedgerRequest, LedgerResponse

_HARNESS = Path(__file__).parent / "harness.html"

app = FastAPI(
    title="FinESG Planner — API",
    version="0.1.0",
    description=(
        "Phạm vi hiện tại chỉ gồm E0: hợp đồng tính toán tài chính 12 tháng "
        "(PRD §4.3.1). Bộ giải MILP, Bộ kiểm tra nghiệm, ingest BCTC và giao "
        "diện sản phẩm chưa được hiện thực."
    ),
)

app.add_exception_handler(DomainError, domain_error_handler)
app.add_exception_handler(Exception, unhandled_error_handler)


@app.middleware("http")
async def attach_correlation_id(request: Request, call_next):  # noqa: ANN001, ANN201
    """NFR-17: correlation ID có trên mọi response, kể cả 2xx (AD-18)."""
    cid = correlation_id_of(request)
    response = await call_next(request)
    response.headers[CORRELATION_HEADER] = cid
    return response


@app.get("/", response_class=HTMLResponse, include_in_schema=False)
async def harness() -> str:
    return _HARNESS.read_text(encoding="utf-8")


@app.get("/api/v1/meta")
async def meta() -> dict:
    """Phiên bản hợp đồng và dung sai đang có hiệu lực — §4.5.1 yêu cầu persist."""
    return {
        "calc_contract_version": CONTRACT_VERSION,
        "tolerances_version": TOLERANCES_V1.version,
        "tolerances": {
            "binary": str(TOLERANCES_V1.binary),
            "feasibility_absolute": str(TOLERANCES_V1.feasibility_absolute),
            "feasibility_relative": str(TOLERANCES_V1.feasibility_relative),
        },
        "implemented_scope": ["E0"],
        "not_implemented": ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"],
    }


@app.get("/api/v1/examples/canonical", response_model=LedgerRequest)
async def canonical_example() -> LedgerRequest:
    """Ví dụ chuẩn §4.3.1 — bộ số nghiệm thu của §14 tiêu chí 11."""
    return LedgerRequest(data=canonical_input(), solution=canonical_solution())


@app.post(
    "/api/v1/ledger",
    response_model=LedgerResponse,
    responses=error_responses(),
)
async def compute_ledger(body: LedgerRequest) -> LedgerResponse:
    """Dựng ledger 12 tháng từ đầu vào và một vector nghiệm.

    Đây là cùng một hàm mà golden test gọi — không có đường tính toán thứ hai.
    """
    ledger = build_ledger(body.data, body.solution)
    return LedgerResponse.of(ledger, body.data)
