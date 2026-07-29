# Review — Good-spine rubric walker

**Verdict:** structurally sound at the right altitude. Coverage of the driving spec is complete; the failures are in *enforceability* — several rules read as prose where they could be structural — plus two divergence points the adversarial lens also reached independently.

## Checklist

| Criterion | Verdict |
|---|---|
| Fixes the real divergence points for the level below | **Partial** — see R-03, R-05, and D-01..D-07 |
| Every AD's Rule is enforceable and prevents its stated divergence | **Partial** — R-01, R-02 |
| Nothing under Deferred could let two units diverge | **Fail** — D-07 (bbox coordinate space) |
| Named tech is verified-current | **Pass**, one unpinned row — V-01 |
| Ratifies a brownfield codebase | **N/A** — greenfield; no code to contradict |
| Covers the driving spec's capabilities | **Pass** — FR-1..FR-29, NFR-1..NFR-19, S01..S19 all land in the map |
| No AD weakens an inherited one | **N/A** — no parent spine |
| Every dimension the altitude owns is decided/deferred/open | **Partial** — R-03 |

## Findings

### R-01 — HIGH — Append-only and audit-integrity are asserted, not enforced

AD-13 says "`UPDATE` bị cấm" and AD-14 says the audit table "không có `DELETE` grant". Both are the right calls, and both are currently sentences. A sentence does not stop an ORM.

The distinguishing property of a good AD here is that the database itself refuses. Name the migration step: revoke `UPDATE`/`DELETE` on versioned tables and on `audit_events` from the application role, so a mistaken `session.merge()` fails at the driver rather than silently rewriting history. Given that Audit Trail is a P0 non-negotiable (PRD §9.1) and an acceptance criterion (AC-06), this belongs in the rule, not in a code-review habit.

### R-02 — MEDIUM — AD-2's ban needs teeth

"Giá trị do HiGHS trả về … không bao giờ được render như một con số nghiệp vụ" is a rule about intent, checkable only by reading diffs. Give it a shape: solver output lands in a `SolverMeta` type whose fields are status, gap, tier objective values and timings — and no money or CO₂ field exists on it at all. Then rendering a solver figure as a business number requires inventing a field, which is visible in review.

### R-03 — MEDIUM — Blob storage is a silent dimension

Same finding as D-06. The rubric flags it separately because "a whole dimension left silent" is its own failure mode: the container view draws a blob volume that no AD or convention governs, while NFR-9 (per-Case access) and EXPERIENCE (§Hành động nguy hiểm — no filenames in URLs) both make demands on it.

### R-04 — MEDIUM — Tolerance constants have two homes

AD-9 states `τ(z*) = max(1e-6, 1e-8·|z*|)` inside the tier loop. AD-3 requires the verifier to agree "within `τ_feasibility`". PRD §4.5.1 defines four distinct tolerances. Nothing says they live in one place.

Two units diverge the moment someone tunes the solver's τ without touching the verifier's — and the symptom is a verifier that starts rejecting valid solutions, which reads as a solver bug. Tolerances belong in one versioned constants module, imported by both sides and persisted per run (PRD §4.5.1 already requires the run to store the actual parameter set).

### R-05 — LOW — `h` is a solution variable the verifier should recompute

AD-3 bans trusting solver *aggregates*. `h` is a decision variable, so it arrives legitimately in the solution vector — but FR-17 defines `h` by a rule ("`h=1` khi nghĩa vụ nợ hiện hữu > 0 hoặc có Gói vay được chọn với nghĩa vụ nợ 12 tháng dương; Gói vay đang ân hạn toàn bộ trong 12 tháng không tự làm `h=1`"). A solver that gets big-M slightly wrong can return `h=0` on a solution that should have carried a DSCR constraint, and the verifier would wave it through.

The verifier should derive `h` from the rule and assert it matches the returned `h`. One line in AD-3's rule text.

### R-06 — LOW — Lint false positives, verified

`lint_spine.py` flags `{resource}` and `{id}` on the endpoint-naming row. Both are literal FastAPI path syntax, not unfilled template tokens. Verified intentional; rewriting real API syntax to satisfy a regex would be the wrong trade.

## What the rubric rates highly

- **Altitude discipline.** This is a feature spine that keeps epics coherent; it does not descend into per-story detail, and the Deferred table gives a reason per item rather than listing scope.
- **The seed is genuinely minimal.** Stack is name+version with no rationale; the source tree is scaffold, not a mirror; rationale lives in the memlog where the skill wants it.
- **Diagrams carry shape that prose would have bloated** — the dependency graph *is* AD-1's rule rather than an illustration of it, and the run lifecycle encodes six solver states that would otherwise be a table nobody reads.
- **The AD-2/AD-3 tension was found and resolved rather than papered over.** "One source of displayed figures" and "two independent implementations" look contradictory; splitting them by role (coefficients are disposable modelling; the ledger is the oracle *and* the display source) is the non-obvious call this spine exists to make.
