"""Cưỡng chế invariant kiến trúc trong CI, không phải trong code review.

AD-1: ``domain/`` không phụ thuộc gì.
AD-3: ``domain/verify/`` không được dùng hệ số của bộ giải.
AD-21: đại lượng khác kỳ không cộng được.
AD-4: tiền không bao giờ là float.

Một luật kiến trúc chỉ tồn tại khi có thứ gì đó làm build đỏ khi nó bị vi phạm.
"""

from __future__ import annotations

import ast
from decimal import Decimal
from pathlib import Path

import pytest

from finesg.domain.errors import QuantityKindError
from finesg.domain.quantities import (
    AnnualFullOperationCO2,
    First12MonthCO2,
    LifetimeNPV,
    Month12Cash,
)

DOMAIN_ROOT = Path(__file__).resolve().parents[1] / "src" / "finesg" / "domain"

BANNED_TOP_LEVEL_MODULES = {
    "sqlalchemy",
    "psycopg",
    "fastapi",
    "httpx",
    "requests",
    "os",
    "random",
    "socket",
    "pathlib",
    "subprocess",
    "highspy",
    "fitz",
    "pytesseract",
    "weasyprint",
    "jinja2",
}

BANNED_INTERNAL_PREFIXES = ("finesg.adapters", "finesg.http", "finesg.worker", "finesg.app")

NONDETERMINISTIC_CALLS = {"now", "utcnow", "today", "monotonic", "time", "random", "uuid4"}


def _domain_sources() -> list[Path]:
    return sorted(p for p in DOMAIN_ROOT.rglob("*.py"))


def _imported_names(tree: ast.AST) -> set[str]:
    names: set[str] = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            names.update(alias.name for alias in node.names)
        elif isinstance(node, ast.ImportFrom) and node.module and node.level == 0:
            names.add(node.module)
    return names


def test_domain_sources_exist() -> None:
    """Bảo vệ chính bài test: một glob rỗng sẽ khiến mọi test dưới đây pass giả."""
    assert len(_domain_sources()) >= 5


@pytest.mark.parametrize("source", _domain_sources(), ids=lambda p: p.name)
def test_domain_module_has_no_forbidden_imports(source: Path) -> None:
    """AD-1 — ``domain/`` không import adapter, I/O, hay nguồn bất định."""
    tree = ast.parse(source.read_text(encoding="utf-8"))

    for name in _imported_names(tree):
        root = name.split(".")[0]
        assert root not in BANNED_TOP_LEVEL_MODULES, (
            f"AD-1 bị vi phạm: {source.name} import '{name}'. "
            "domain/ phải thuần — mọi đầu vào được truyền vào, không tự đi lấy."
        )
        assert not name.startswith(BANNED_INTERNAL_PREFIXES), (
            f"AD-1 bị vi phạm: {source.name} import '{name}'. "
            "Hướng phụ thuộc chỉ đi vào domain, không đi ra."
        )


@pytest.mark.parametrize("source", _domain_sources(), ids=lambda p: p.name)
def test_domain_module_has_no_nondeterministic_calls(source: Path) -> None:
    """NFR-7 — cùng đầu vào phải cho cùng kết quả, kể cả sau khi phá hòa."""
    tree = ast.parse(source.read_text(encoding="utf-8"))

    for node in ast.walk(tree):
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute):
            assert node.func.attr not in NONDETERMINISTIC_CALLS, (
                f"AD-1 bị vi phạm: {source.name} gọi '{node.func.attr}()'. "
                "Thời điểm đến từ ClockPort do caller inject."
            )


@pytest.mark.parametrize("source", _domain_sources(), ids=lambda p: p.name)
def test_domain_never_coerces_missing_to_zero(source: Path) -> None:
    """AD-5 — chặn mẫu ``x or 0``, đường ngắn nhất để ``None`` thành 0."""
    tree = ast.parse(source.read_text(encoding="utf-8"))

    for node in ast.walk(tree):
        if isinstance(node, ast.BoolOp) and isinstance(node.op, ast.Or):
            for value in node.values[1:]:
                is_zero_literal = isinstance(value, ast.Constant) and value.value == 0
                assert not is_zero_literal, (
                    f"AD-5 bị vi phạm: {source.name} dùng '... or 0'. "
                    "Giá trị thiếu phải ném MissingInputError, không thành 0."
                )


class TestVerifierIndependence:
    """AD-3 — verifier là oracle độc lập, không dùng lại hệ số của bộ giải."""

    def test_verify_package_never_imports_solver_coefficients(self) -> None:
        verify_root = DOMAIN_ROOT / "verify"
        if not verify_root.exists():
            pytest.skip("domain/verify/ chưa được hiện thực (E6)")

        for source in verify_root.rglob("*.py"):
            for name in _imported_names(ast.parse(source.read_text(encoding="utf-8"))):
                assert "solve" not in name, (
                    f"AD-3 bị vi phạm: {source.name} import '{name}'. "
                    "Dùng chung hệ số làm 'Bộ kiểm tra nghiệm độc lập' mất ý nghĩa."
                )


class TestPeriodDistinctQuantities:
    """AD-21 — rủi ro khái niệm trung tâm của PRD §1.1, chặn ở tầng kiểu."""

    def test_annual_and_first_twelve_month_co2_cannot_be_added(self) -> None:
        annual = AnnualFullOperationCO2(Decimal("18200"))
        first12 = First12MonthCO2(Decimal("4300"))

        with pytest.raises(QuantityKindError):
            _ = annual + first12  # type: ignore[operator]

    def test_lifetime_npv_and_month12_cash_cannot_be_added(self) -> None:
        with pytest.raises(QuantityKindError):
            _ = LifetimeNPV(Decimal(10)) + Month12Cash(Decimal(10))  # type: ignore[operator]

    def test_same_kind_adds_normally(self) -> None:
        total = AnnualFullOperationCO2(Decimal(100)) + AnnualFullOperationCO2(Decimal(50))
        assert total.amount == Decimal(150)
        assert isinstance(total, AnnualFullOperationCO2)

    def test_quantity_rejects_float(self) -> None:
        """AD-4 — float không lọt vào miền qua cửa đại lượng."""
        with pytest.raises(TypeError, match="không bao giờ là float"):
            Month12Cash(12.4)  # type: ignore[arg-type]

    def test_period_label_travels_with_the_value(self) -> None:
        """AD-19: nhãn đến từ kiểu, không từ nơi đặt field trong template."""
        assert AnnualFullOperationCO2(Decimal(1)).period_label == "năm vận hành đầy đủ"
        assert First12MonthCO2(Decimal(1)).period_label == "12 tháng đầu"
