"""Fixture dùng chung. Builder sống trong ``tests/builders.py``."""

from __future__ import annotations

import pytest

from finesg.domain.models.finance_inputs import FinanceInput, Solution
from tests.builders import canonical_input, canonical_solution


@pytest.fixture
def canonical() -> tuple[FinanceInput, Solution]:
    """Ví dụ chuẩn PRD §4.3.1 — đầu vào và vector nghiệm."""
    return canonical_input(), canonical_solution()
