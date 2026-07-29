# Review — Version & reality-check lens

**Prompt:** verify every committed decision was web-researched or reality-checked rather than asserted from training data.

**Verdict:** pass with one finding. Every pinned version was read from a live registry on 2026-07-29, not recalled.

## Method

| Source | Queried |
|---|---|
| `pypi.org/pypi/<pkg>/json` | fastapi, sqlalchemy, alembic, pydantic, uvicorn, highspy, pymupdf, pdfplumber, pytesseract, psycopg, pytest, weasyprint, jinja2, structlog |
| `registry.npmjs.org` | react, vite, typescript, @tanstack/react-query, react-router-dom, zod (+ dist-tags for typescript) |
| Docker Hub tags API | postgres, python |
| `sources.debian.org` | tesseract in trixie |
| GitHub raw (HEAD) | tessdata_best `vie.traineddata` reachability |

## Findings

### V-01 — MEDIUM — Tesseract is the one unpinned row in Stack

`Tesseract OCR + vie (tessdata_best) | 5.x` is a range, not a pin, and the linter's "unpinned Stack versions" check exists for exactly this. Debian trixie ships **5.5.0-1**; pin it, and pin the `vie.traineddata` by commit rather than `main`, or two builds a month apart produce different extraction results and FR-29's Precision figure stops being comparable across the evaluation set.

**Fix:** pin `tesseract-ocr=5.5.0-1` and record the tessdata commit SHA.

### V-02 — INFO — A web search returned stale data; the registry did not

A search result asserted FastAPI 0.136.1 (April 2026, from a blog). The PyPI registry returned **0.140.13**. The registry value was used. Worth recording because it is the exact failure mode this lens exists to catch — and the search result *looked* current.

### V-03 — INFO — TypeScript 7.0.2 is genuinely `latest`, and correctly flagged

`dist-tags.latest = 7.0.2` confirmed; this is the Go-native compiler line, with `5.9.3` still available. The spine tags it `[ASSUMPTION SA-2]` with a named fallback and states the fallback costs one line. That is the right treatment for a recently-GA major on a six-week deadline — adopted, not hidden.

### V-04 — INFO — Fit checks, not just existence checks

- highspy 1.15.1 declares Python 3.9–3.14 → the pinned 3.13.14 is inside support.
- HiGHS has **no** native indicator constraint and **no** native IIS. Both gaps are load-bearing for FR-17 and FR-22, and both are handled explicitly (AD-11 derived big-M, AD-12 separate slack model) with the PRD clauses that permit the fallback cited. This is the difference between naming a technology and checking it fits.
- `vie.traineddata` returned HTTP 200 from tessdata_best → offline Vietnamese OCR is viable, which is what makes the local-only decision (NFR-9/10/11) real rather than aspirational.
- PostgreSQL 18.4 and `python:3.13.14-slim-trixie` both confirmed as current published tags.

### V-05 — INFO — One queried package was not adopted

`reportlab 5.0.0` was queried and dropped in favour of WeasyPrint 69.0, because the Evidence Package needs an independent print stylesheet (EXPERIENCE → Responsive & Platform) and HTML+CSS→PDF keeps one templating story with the label catalog. Recorded so the choice does not look unconsidered.
