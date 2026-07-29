# Review — Adversarial divergence lens

**Prompt:** construct two units one level down that each obey every AD to the letter yet still build incompatibly.

**Verdict:** the spine holds on the headline risks (solver↔verifier, confirmation gating, determinism) but leaks on seven seams. Six are closable with new or tightened ADs; one is a Deferred item that must be pulled back in.

---

## D-01 — CRITICAL — Vô nghiệm has no source of truth for its numbers

AD-2 binds every *displayed* figure to `LedgerResult`, which only exists on a `Plan`. An `Infeasible` run produces a `Diagnosis`, not a `Plan`. S14 must show "giá trị hiện tại so với ngưỡng" (FR-22) — but no AD says where those actuals come from.

**Two units that diverge:** the diagnostic model builder computes the DSCR actual from its slack-model relaxation; the S14 UI computes it from the scenario inputs it already has loaded. Both obey every AD. They print different numbers for the same blocked constraint, and the user's "if–then" reasoning is built on a figure nobody owns.

**Close it:** `Diagnosis` must carry `constraint_rows`, each row declaring its basis (`LEDGER` at a named reference solution, or `MODEL_SLACK`), and S14 must render only those rows.

## D-02 — CRITICAL — CO₂ annual vs first-12-month are the same type

PRD FR-13 and FR-23 are explicit: `tCO₂e/năm vận hành đầy đủ` and CO₂ dự kiến trong 12 tháng đầu "không được cộng hoặc đổi nhãn cho nhau". The spine never binds this. `PortfolioCO2` is a bare Decimal.

**Two units that diverge:** CMP-21 result metric group renders `portfolio_co2` as the annual figure; the WeasyPrint evidence template renders the same field under a "12 tháng đầu" heading because that is what its section is about. Both obey AD-2 and AD-4. The result is exactly the relabeling the PRD forbids — and nothing in the type system stops a future `total_co2 = annual + first12`.

This generalizes: PRD §1.1 names the mixed-period problem as the product's central conceptual risk (lifetime NPV vs annual CO₂ vs 12-month affordability). The spine inherited the guardrail as prose but not as an invariant.

**Close it:** period-distinct quantities must be distinct types that cannot be summed.

## D-03 — HIGH — Two writers, one `Project`

`Project` carries financial data (CFO, S09), emissions evidence (ESG, S10) and risk score (ESG, S11). AD-13 versions entities append-only but never fixes the *aggregate boundary*.

**Two units that diverge:** the S09 financial editor writes `Project` version N+1 from a payload it read at version N; concurrently the S11 risk editor writes `Project` version N+1 from its own read at N. One silently drops the other's fields — and AD-14's audit event faithfully records a change nobody made. The permission matrix in EXPERIENCE assigns these to different roles, which makes concurrent editing the expected case, not the edge case.

**Close it:** name the aggregates and give each exactly one writing role.

## D-04 — HIGH — Two names, two hashes for "which version of the input"

AD-13 says a run stores an `input_version_vector`. AD-17 keys job identity on `input_version_hash`. Nothing says they derive from one canonical serialization.

**Two units that diverge:** the job enqueuer hashes a dict in insertion order; the staleness checker builds the vector from a sorted query. Same logical input, two identities → either a duplicate job slips past AD-17's unique index, or a genuinely-changed input reuses a stale job.

**Close it:** one canonical serializer produces both; the hash is a function of the vector, not a parallel construction.

## D-05 — HIGH — Two presentation layers round independently

AD-4 correctly forbids display rounding inside `domain/` and calls it "a presentation-layer function". But there are **two** presentation layers: React and Jinja2/WeasyPrint.

**Two units that diverge:** the SPA renders `12,4 tỷ VND`; the evidence PDF renders `12,45 tỷ VND` for the identical `LedgerResult`. Both obey AD-2 (same source) and AD-4 (rounding outside domain). The Gói bằng chứng is the artifact meant to be defensible under challenge — two renderings of one number is precisely the failure it exists to prevent.

**Close it:** formatting is a contract served from the backend alongside the label catalog, not a local decision in each renderer.

## D-06 — MEDIUM — Blob storage is an unowned dimension

The container view draws a blob volume; the ERD implies stored source PDFs and exports. No AD or convention governs key layout, access path, or filename handling — while NFR-9 requires per-Case access limits and EXPERIENCE forbids filenames in URLs.

**Two units that diverge:** the upload adapter stores under the user's original filename; the export adapter stores under a UUID and serves it from a static route. One of the two leaks a Vietnamese company filename into a URL.

**Close it:** one key scheme, one authorizing read path, no static route.

## D-07 — MEDIUM — A Deferred item lets two units diverge

Deferred says the choice between `pdfplumber` and PyMuPDF for table detection "is a decision for the code". But both produce bounding boxes, and AD-8 makes the bbox a mandatory part of `Provenance` that CMP-06 renders over the page.

**Two units that diverge:** the text-layer extractor emits PyMuPDF-space boxes; the table extractor emits pdfplumber-space boxes. The viewer draws one of them in the wrong place, and the Provenance chain — the product's core claim — is visibly wrong on some fields. The *tool* choice is safely deferred; the *coordinate space* is not.

**Close it:** normalize bbox to one declared space at the adapter boundary, whatever the extractor.

---

## Held up under attack

- AD-3's ban on `verify/` importing `solve/coefficients.py` is the strongest rule in the spine — it is the one that makes "independent verifier" mean something rather than being a label.
- AD-6's single-factory gate genuinely prevents the "each call-site checks a different subset" divergence.
- AD-12's type-level separation (`Diagnosis` is not a `Plan`, with no conversion path) is the right shape for the "never silently relax" guardrail — it is not enforceable by discipline alone and the spine correctly made it structural.
- AD-9's strategies-as-data closes the most likely source of three-way strategy drift.
