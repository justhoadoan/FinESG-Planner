# Validation Report — FinESG Planner

- **DESIGN.md:** `G:\FinESG\_bmad-output\planning-artifacts\ux-designs\ux-FinESG-2026-07-29\DESIGN.md`
- **EXPERIENCE.md:** `G:\FinESG\_bmad-output\planning-artifacts\ux-designs\ux-FinESG-2026-07-29\EXPERIENCE.md`
- **Run at:** 2026-07-29 (Asia/Bangkok)

## Overall verdict

Cặp spine hiện đủ chắc để làm contract cho architecture và story-dev: cả tám dimension đều đạt verdict `strong`, năm nhóm kiểm tra cơ học khép kín, mọi tham chiếu chịu tải phân giải, và không còn finding mở từ rubric walker.

Accessibility review làm thay đổi điều kiện đóng gate, không làm giảm verdict của tám dimension. Contract và static semantics đã qua remediation, nhưng không được phép coi bốn static specimen là bằng chứng nghiệm thu sản phẩm chạy thật. Còn **0 critical · 2 high · 0 medium · 1 low**: hai High bắt buộc có implementation/runtime evidence; một Low thuộc cấu trúc gallery.

## Category verdicts

1. Flow coverage — `strong`
2. Token completeness — `strong`
3. Component coverage — `strong`
4. State coverage — `strong`
5. Visual reference coverage — `strong`
6. Bloat & overspecification — `strong`
7. Inheritance discipline — `strong`
8. Shape fit — `strong`

## 1. Flow coverage — strong

Đã đối chiếu 6 UJ và 29 FR trong PRD. Sáu heading UJ được giữ nguyên văn; mỗi UJ có nhân vật có tên, bước đánh số, climax và failure path khi áp dụng. FR-25 có OF-1 riêng; FR-28 và FR-29 có QA-1 riêng. Không có finding còn mở.

## 2. Token completeness — strong

Frontmatter `DESIGN.md` có 32 color token, 10 typography role và 28 component object. Color token hợp lệ 32/32; 181 lần tham chiếu trên 60 path duy nhất đều phân giải; light-only và mục tiêu tương phản chịu tải được tuyên bố rõ. Không có finding còn mở.

## 3. Component coverage — strong

Registry chuẩn có đúng 28 component. Mỗi object YAML mang một ID duy nhất `CMP-01`–`CMP-28`, khớp visual contract trong `DESIGN.md` và behavioral contract cùng ID/tên trong `EXPERIENCE.md`; CMP-18 có token riêng cho badge và banner. Không có component orphan hoặc lệch tên.

## 4. State coverage — strong

Đã walk đủ S01–S19. Coverage table, permission-denied matrix, offline/version-conflict, idempotency và task-ID recovery đều có contract riêng; hệ thống không tự xác nhận, chạy hoặc xuất khi phục hồi. Không có finding còn mở.

## 5. Visual reference coverage — strong

Bốn mockup hiện hữu đều được hai spine link tại pattern liên quan và nêu rõ surface minh họa S03, S05, S12/S14, S15/S16/S18. Không có orphan; quy tắc spine thắng khi xung đột đã được khóa. Không có finding còn mở.

## 6. Bloat & overspecification — strong

PRD vẫn là nguồn chuẩn duy nhất của scope, cardinality, schema, công thức, validation và nội dung/versioning tệp xuất. Chỉ mục thẩm quyền bảy hàng làm rõ nguồn và consumer; UX chỉ giữ inventory/treatment cần thiết và deep-link về FR nguồn. Bảng `AC-01`–`AC-19` tạo điểm nối ổn định sang story/test mà không tạo nguồn nghiệp vụ thứ hai. Không có finding còn mở.

## 7. Inheritance discipline — strong

Hai `sources` cùng resolve tới PRD hiện hữu; tên UJ, registry component và glossary nhất quán; năm token reference trong `EXPERIENCE.md` đều resolve sang `DESIGN.md`. Inheritance được khóa library-neutral, không ngầm thừa kế visual, behavior hoặc accessibility từ thư viện ngoài. Không có finding còn mở.

## 8. Shape fit — strong

`DESIGN.md` giữ đúng canonical section order. `EXPERIENCE.md` có đủ Foundation, Information Architecture, Voice and Tone, Component Patterns, State Patterns, Interaction Primitives, Accessibility Floor và Key Flows; Responsive & Platform cùng Inspiration & Anti-patterns xuất hiện đúng trigger. Các section bổ sung đều phục vụ trace, readiness, optimization, evidence hoặc acceptance. Không có finding còn mở.

## Extra reviewer — Accessibility

Nguồn: `review-accessibility.md`.

Kết luận adversarial: static semantics tốt không phải runtime conformance. Không đóng WCAG Reviewer Gate cho đến khi hai High dưới đây có test implementation chạy được. Các remediation Critical/High cũ và Medium M01–M03 đã được xác minh; chúng không được tái mở nếu implementation giữ nguyên contract.

## Findings by severity

### Critical (0)

Không có finding Critical còn mở.

### High (2)

#### [Accessibility] A11Y-H01 — Reflow 320px/400% chưa có bằng chứng chạy được

- **Location:** `EXPERIENCE.md:31,137,527,545–550,666`; static canvases trong bốn mockup.
- **Evidence:** tại 320 CSS px, document scroll width vẫn là `1440 · 1488 · 1440 · 1456` px cho overview, S05, run và results. Đây là gallery cố định, không phải responsive implementation.
- **Impact:** không thể nghiệm thu WCAG 1.4.10 hoặc full-function journeys UJ-1–UJ-6 ở 200%/400%.
- **Still required:** route/prototype responsive hoặc implementation test harness chứng minh shell/panel reflow một cột và chỉ container bảng/PDF có tên mới được scroll ngang.

#### [Accessibility] A11Y-H02 — Contract tương tác/runtime chưa thể nghiệm thu từ static specimen

- **Location:** `EXPERIENCE.md:472–504,519–531`; cả bốn mockup không có `<script>`.
- **Evidence:** markup không chứng minh edit/save/cancel/error focus, arrow-key tabs, `aria-disabled` guard, dialog initial/contained/returned focus, `Esc`, `aria-busy`, task-ID dedupe hoặc post-navigation focus.
- **Impact:** một implementation có thể trông đúng nhưng vẫn làm hỏng keyboard flow, async announcement hoặc modal isolation.
- **Still required:** test bàn phím và accessibility tree cho edit valid/invalid, disabled guard, tab switch, async transition và một chu kỳ dialog hoàn chỉnh.

### Medium (0)

Không có finding Medium còn mở. A11Y-M01, A11Y-M02 và A11Y-M03 đã được sửa và kiểm tra lại.

### Low (1)

#### [Accessibility] A11Y-L01 — Gallery nhiều specimen chưa theo page-semantic template

- **Location:** `EXPERIENCE.md:351,519`; outer structure của S05, run và results.
- **Evidence:** không file nào có skip link; một số breadcrumb không phải named `nav`; nhiều screen/state cùng tồn tại trong một accessibility tree, tạo nhiều `h1` và chuỗi focus nối tiếp.
- **Impact:** gallery gây nhiễu với assistive technology, dù chưa chứng minh route production sẽ sai.
- **Still required:** tách specimen thành file/route riêng hoặc ẩn hoàn toàn specimen không hoạt động; cung cấp một shell reference có skip link, named breadcrumb `nav`, một named `main` và một page `h1`.

## Resolved findings

### Rubric walker

Toàn bộ finding của rubric walker đã được xử lý; residual rubric count là **0 critical · 0 high · 0 medium · 0 low**.

### Accessibility remediation

- Critical reflow contract conflict đã được đóng ở cấp contract: full functionality phải tồn tại qua reflow tới 320 CSS px.
- Các finding High cũ về focus, semantic controls, table structure, native-table contract, modal markup, disabled reasons và minimum text/contrast đã được đóng ở cấp contract/markup.
- **A11Y-M01:** glyph trạng thái có accessible name; contrast đo được 5.46–9.11:1.
- **A11Y-M02:** có 20 `<abbr>`, 20 `<time>` và 0 chuỗi `≥/≤/−/×` chịu tải thiếu cách đọc accessible.
- **A11Y-M03:** số phần tử thực sự overflow với ellipsis giảm từ 11 xuống 0; bảy design frame vẫn không overflow nội bộ.

## Mechanical notes

- Hai `sources` resolve tới cùng PRD: `../../prds/prd-FinESG-2026-07-29/prd.md`.
- `DESIGN.md`: 236 scalar frontmatter entries và 49 mapping node; 32/32 color token, 10/10 typography role và 28/28 component object hợp lệ.
- 181 token-reference occurrences / 60 unique paths; 0 unresolved.
- Registry YAML/visual/behavior khớp 28/28 theo ID, tên và slug; CMP-18 có hai nhánh token `badge`/`banner`.
- Chỉ mục thẩm quyền có bảy hàng; registry acceptance có đủ `AC-01`–`AC-19`, không trùng hoặc thiếu ID.
- Bốn mockup tồn tại và được link; `imports/` rỗng, `wireframes/` không tồn tại.
- Playwright: 0 console/page error, 0 duplicate ID, 0 broken ARIA reference, 108/108 keyboard stop có focus indicator và target tối thiểu 44×44, 0 contrast fail.
- Không có Mermaid block hoặc lỗi Mermaid.
- Hai spine có `status: final`, `version: "1.0"`; các assumption/decision gate còn mở vẫn có owner và hạn chốt trong registry.

## Reviewer files

- `G:\FinESG\_bmad-output\planning-artifacts\ux-designs\ux-FinESG-2026-07-29\review-rubric.md`
- `G:\FinESG\_bmad-output\planning-artifacts\ux-designs\ux-FinESG-2026-07-29\review-accessibility.md`

---

Artifacts: `DESIGN.md` · `EXPERIENCE.md` · `review-rubric.md` · `review-accessibility.md` · `validation-report.md` · `validation-report.html`  
Generated: 2026-07-29 · Asia/Bangkok
