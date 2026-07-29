# Spine Pair Review — FinESG Planner

## Overall verdict

Cặp spine hiện **đủ chắc để làm contract cho architecture và story-dev**: năm nhóm kiểm tra cơ học đều khép kín, authority index phân quyền nguồn rõ, component có identity máy đọc được, và `AC-01`–`AC-19` tạo điểm nối ổn định sang story/test. Các quyết định chịu tải về state, permission, offline, accessibility và UI inheritance đều source-extract được; tổng findings còn mở: **0 critical · 0 high · 0 medium · 0 low**.

## 1. Flow coverage — strong

Pass 1 đã đối chiếu **6 UJ và 29 FR** trong PRD. Sáu heading UJ được giữ nguyên văn; mỗi UJ có nhân vật có tên, bước đánh số, climax và nhánh ngoại lệ. FR-25 có flow OF-1 riêng; FR-28 và FR-29 có flow QA-1 riêng, đều có protagonist, failure path và climax. Bảng nghiệm thu có đúng 19 ID liên tục `AC-01`–`AC-19`, mỗi hàng nêu assertion, nguồn contract và ngữ cảnh (`prd.md` §2.4, dòng 92–129; §4, dòng 174–748; `EXPERIENCE.md` §Key Flows, dòng 583–673; §UX Acceptance Checks, dòng 675–697).

### Findings

Không có finding còn mở.

## 2. Token completeness — strong

Pass 1 đã kiểm tra toàn bộ frontmatter `DESIGN.md`, gồm 32 color token, 10 typography role và 28 component object. `description` đã có; color key dùng kebab-case và 32/32 giá trị là hex sáu chữ số; mỗi typography role chỉ dùng các field được spec cho phép; mỗi component là object có token thực hoặc tham chiếu `{path.to.token}`. Tổng cộng 181 lần tham chiếu token, 60 path duy nhất, đều phân giải; chế độ light-only được tuyên bố rõ và mục tiêu tương phản chịu tải được nêu (`DESIGN.md` frontmatter, dòng 1–288; §Colors > Tương phản, dòng 355–361).

### Findings

Không có finding còn mở.

## 3. Component coverage — strong

Pass 1 xác nhận registry chuẩn có đúng **28 component**. Mỗi object YAML mang một `id` duy nhất từ `CMP-01` đến `CMP-28`; ID, tên và slug khớp hoàn toàn với visual registry trong `DESIGN.md` và behavioral registry trong `EXPERIENCE.md`. CMP-18 tách đúng hai object con `badge` và `banner`, mỗi nhánh có radius/text/border riêng, thay vì ép hai anatomy vào một bộ token phẳng (`DESIGN.md` frontmatter `components`, dòng 137–287; §Components, dòng 408–441; `EXPERIENCE.md` §Component Patterns, dòng 359–390).

### Findings

Không có finding còn mở.

## 4. State coverage — strong

Pass 1 đã walk đủ S01–S19. Bảng coverage gắn từng surface với các state áp dụng và treatment riêng; permission-denied có ma trận theo hành động/vai trò cùng focus, recovery và redaction contract; mất kết nối có server source of truth, draft trong bộ nhớ tab, version-conflict review, idempotency và phục hồi task ID mà không tự xác nhận/chạy/xuất (`EXPERIENCE.md` §Information Architecture, dòng 119–149; §State Patterns, dòng 401–477; §Interaction Primitives, dòng 479–525).

### Findings

Không có finding còn mở.

## 5. Visual reference coverage — strong

Pass 1 inventory có bốn file trong `mockups/`, không có file trong `imports/` và không có thư mục `wireframes/`. Cả hai spine link đủ bốn mockup ngay cạnh component/pattern liên quan, nêu rõ các surface S03, S05, S12/S14 và S15/S16/S18 được minh họa; mọi link resolve và quy tắc spine thắng khi xung đột được tuyên bố rõ (`DESIGN.md` §Components > Visual references, dòng 443–450; `EXPERIENCE.md` §Component Patterns, dòng 392–399).

### Findings

Không có finding còn mở.

## 6. Bloat & overspecification — strong

Pass 2 xác nhận PRD vẫn là nguồn chuẩn duy nhất của scope, cardinality, schema, công thức, validation và nội dung/versioning tệp xuất. Authority index làm ranh giới này explicit; `Input Field Contracts` chỉ giữ display label/grouping/disclosure/continuity/interaction treatment, còn `Evidence Package Contract` chỉ map tám section PRD sang preview treatment. Các bảng authority và acceptance mới thay cho prose lặp, có consumer rõ và không tạo nguồn nghiệp vụ thứ hai (`EXPERIENCE.md` §Foundation > Chỉ mục thẩm quyền và truy vết, dòng 35–45; §Input Field Contracts, dòng 246–310; §Evidence Package Contract, dòng 312–334; §UX Acceptance Checks, dòng 675–697).

### Findings

Không có finding còn mở.

## 7. Inheritance discipline — strong

Pass 2 xác nhận `sources` của cả hai spine cùng resolve tới PRD hiện hữu; sáu tên UJ trùng nguyên văn nguồn; registry component dùng cùng ID/tên; năm token reference trong `EXPERIENCE.md` đều resolve sang `DESIGN.md`. Authority index thống nhất quyền sở hữu PRD/DESIGN/EXPERIENCE, còn UI inheritance được khóa nhất quán là **library-neutral**, không mặc định kế thừa visual, behavior hoặc accessibility từ thư viện triển khai (`DESIGN.md` frontmatter, dòng 11–20; §Brand & Style, dòng 294–321; `EXPERIENCE.md` frontmatter, dòng 10–15; §Foundation, dòng 27–45; §Key Flows, dòng 583–655).

### Findings

Không có finding còn mở.

## 8. Shape fit — strong

Pass 2 xác nhận `DESIGN.md` giữ đúng thứ tự khóa Brand & Style → Colors → Typography → Layout & Spacing → Elevation & Depth → Shapes → Components → Do’s and Don’ts. `EXPERIENCE.md` có đủ Foundation, IA, Voice and Tone, Component Patterns, State Patterns, Interaction Primitives, Accessibility Floor và Key Flows; Responsive & Platform cùng Inspiration & Anti-patterns có mặt đúng trigger. Authority index và bảng `AC-01`–`AC-19` đều có downstream consumer rõ nên xứng đáng là cấu trúc bổ sung, không phải narrative trang trí (`DESIGN.md` dòng 307–463; `EXPERIENCE.md` §Foundation, dòng 27–45; các heading cấp 2, dòng 97–703).

### Findings

Không có finding còn mở.

## Mechanical notes

- Hai `sources` resolve tới cùng tệp `../../prds/prd-FinESG-2026-07-29/prd.md`.
- `DESIGN.md` có 236 scalar frontmatter entries và 49 mapping node; 32/32 color token hợp lệ, 10/10 typography role đúng field shape và 28/28 component node là object không rỗng.
- Có 181 token-reference occurrences / 60 unique paths trên hai spine; **0 unresolved**. Tham chiếu biểu đồ dùng `{components.chart-with-data-table.target-line}` và resolve đúng.
- Cả 28 component YAML đều có `id` duy nhất; registry YAML/visual/behavior khớp 28/28 theo ID, tên và slug. CMP-18 có hai nhánh `badge`/`banner` với tổng sáu token leaf.
- Authority index có bảy hàng ownership/consumer và mọi file link đều resolve. Bảng acceptance có 19/19 ID liên tục, không trùng, không thiếu và mọi hàng có đủ bốn cột.
- Bốn mockup đều tồn tại và được link cụ thể; `imports/` rỗng, `wireframes/` không tồn tại.
- Không có Mermaid block; không có lỗi Mermaid để báo. Hai spine có `status: final`, `version: "1.0"`; các assumption/decision gate chưa khóa vẫn được giữ trong registry có owner và hạn chốt, không tạo lỗi shape.
