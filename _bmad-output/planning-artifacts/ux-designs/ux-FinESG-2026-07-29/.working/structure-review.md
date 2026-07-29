# Rà soát cấu trúc hai UX spine

Phương pháp: `bmad-editorial-review-structure`  
Reader type: `humans`  
Purpose: `implementation reference`  
Độc giả: nhóm sản phẩm, thiết kế và kỹ thuật  
Length target: không có  
Nguyên tắc: chỉ đề xuất; không sửa `DESIGN.md` hoặc `EXPERIENCE.md`.

---

# A. DESIGN.md

## Document Summary

- **Purpose:** Tài liệu tồn tại để giúp nhóm sản phẩm, thiết kế và kỹ thuật triển khai nhất quán câu trả lời cho “FinESG Planner trông như thế nào”.
- **Audience:** Product manager, UX/UI designer, frontend engineer, QA và các reviewer triển khai.
- **Reader type:** Humans; giữ bảng, ví dụ, quick-reference và các nhắc lại có chủ đích phục vụ tra cứu.
- **Structure model:** Reference/Database — người đọc cần nhảy trực tiếp đến token, vai trò màu, layout hoặc thành phần cụ thể.
- **Current length:** 2.543 từ, 10 section cấp `##`, 26 heading tổng cộng.
- **Input validation:** Đạt; nội dung không rỗng, reader type hợp lệ và cấu trúc Markdown/YAML đọc được.

## Structure Map

| Section | Số từ | Đánh giá phục vụ mục đích |
|---|---:|---|
| Frontmatter + intro | 328 | Trực tiếp; chứa token và quy tắc ưu tiên spine |
| Brand & Style | 242 | Trực tiếp; thiết lập mental model thị giác |
| Colors | 394 | Trực tiếp; phù hợp reference model |
| Typography | 120 | Trực tiếp |
| Layout & Spacing | 190 | Trực tiếp |
| Elevation & Depth | 94 | Trực tiếp |
| Shapes | 73 | Trực tiếp |
| Components | 780 | Cần thiết nhưng đang trộn visual contract với behavior contract |
| Do’s and Don’ts | 238 | Hữu ích như quick-reference; có nhắc lại có chủ đích |
| Assumptions to Confirm | 84 | Cần thiết nhưng bị chôn ở cuối tài liệu |

## Structural and Flow Analysis

- Trật tự `Brand & Style → Colors → Typography → Layout & Spacing → Elevation & Depth → Shapes → Components → Do’s and Don’ts` đúng canonical order và phù hợp với tài liệu tra cứu.
- YAML token mở đầu rồi đến diễn giải ngữ nghĩa là scaffolding tốt: kỹ thuật có giá trị máy đọc được, con người có quy tắc áp dụng.
- Nút thắt chính nằm ở `Components`: nhiều dòng quy định **hành vi, trạng thái nghiệp vụ hoặc điều kiện chặn** thay vì hình thức. Ví dụ gồm bảy nhánh điều hướng, quy tắc readiness, cách xử lý `null/0/N/A`, persistence của banner, không có slider trọng số, DSCR `N/A`, so sánh cùng phiên bản, modal stack và logic lỗi. Những điều này thuộc `EXPERIENCE.md`.
- Các assumption quan trọng đã có trong frontmatter/body nhưng danh sách quyết định lại ở cuối. Đội triển khai có thể bắt đầu dùng palette/UI system trước khi nhận ra chúng chưa được duyệt.
- Các subsection Component hiện có schema không đồng nhất: có phần mô tả anatomy, có phần mô tả trạng thái, có phần là product rule. Điều này làm random access chậm và tăng nguy cơ hai đội triển khai khác nhau.
- `Do’s and Don’ts` lặp lại một phần body nhưng giúp quét nhanh và ngăn sai lệch; đây là reinforcement phù hợp cho người đọc, không phải redundancy cần xóa.
- Pacing tốt: bảng, list và khoảng trắng đủ để tra cứu; không có đoạn narrative dài làm chậm việc tìm token.

## Recommendations

### 1. P0 — MOVE — Tách behavioral rules khỏi `Components`

**Rationale:** `DESIGN.md` phải là nguồn sự thật cho hình thức, còn điều hướng, điều kiện chặn, state transition, validation và quyền hành động phải chuyển sang hoặc liên kết đến `EXPERIENCE.md` để hai peer contracts không xung đột.

**Action:** Với mỗi subsection trong `Components`, giữ anatomy, token, bố cục và cách biểu đạt thị giác; chuyển các câu về workflow/state/validation sang section tương ứng của `EXPERIENCE.md`, rồi để một cross-reference duy nhất.

**Impact:** Di chuyển khoảng 220–280 từ khỏi `DESIGN.md`; gần như không giảm tổng số từ của cả bộ tài liệu.

**Comprehension note:** Không ảnh hưởng khả năng hiểu nếu cross-reference nằm ngay tại từng component.

### 2. P0 — MOVE — Đưa “Assumptions to Confirm” thành decision gate ngay sau intro

**Rationale:** Palette, hướng thị giác, UI system, theme và font đều đang là assumption nên người triển khai phải thấy trạng thái chưa duyệt trước khi đọc token như một quyết định cuối.

**Action:** Đặt một bảng ngắn `ID · quyết định · trạng thái · owner · ảnh hưởng` sau đoạn spine-ownership; phần chi tiết vẫn có thể nằm ở vị trí canonical phù hợp hoặc được liên kết.

**Impact:** Khoảng 0 từ; thay đổi vị trí, không cắt nội dung.

### 3. P1 — MERGE — Chuẩn hóa schema cho mọi component

**Rationale:** Một reference/database hữu dụng nhất khi mọi entry có cùng cấu trúc và người đọc không phải đoán thông tin nằm ở bullet nào.

**Action:** Dùng một schema thống nhất: `Anatomy · visual states · token references · responsive appearance · EXPERIENCE behavior link`; có thể trình bày bằng bảng.

**Impact:** Tiết kiệm khoảng 50–80 từ nhờ loại câu dẫn và lặp cấu trúc.

### 4. P1 — CONDENSE — Khử lặp mô tả assumption

**Rationale:** Năm assumption được diễn đạt trong frontmatter/body rồi lặp lại gần nguyên văn ở cuối, nhưng chưa có ID để truy vết.

**Action:** Gắn ID như `D-A1…D-A5`; body chỉ đặt tag ID cạnh quyết định, còn decision gate giữ diễn giải đầy đủ một lần.

**Impact:** Tiết kiệm khoảng 40–60 từ.

### 5. P2 — PRESERVE — Giữ canonical section order và bảng token-ngữ nghĩa

**Rationale:** Trật tự hiện tại đi từ identity đến primitive rồi component, đúng cách người triển khai tra cứu và phù hợp DESIGN spine.

**Impact:** 0 từ.

### 6. P2 — PRESERVE — Giữ `Do’s and Don’ts`

**Rationale:** Dù củng cố các nguyên tắc đã nêu, bảng này là guardrail quét nhanh cho designer, engineer và reviewer nên có giá trị comprehension rõ.

**Impact:** 0 từ; không khuyến nghị cắt.

## Summary

- **Total recommendations:** 6
- **Estimated reduction:** Khoảng 310–420 từ khỏi riêng `DESIGN.md` (12–17%); mức giảm ròng của cả hai spine chỉ khoảng 90–140 từ vì phần hành vi cần được chuyển, không bị xóa.
- **Meets length target:** Không có length target.
- **Comprehension trade-offs:** Không có nếu behavioral rules được chuyển kèm cross-reference; cắt chúng mà không chuyển sẽ làm mất hợp đồng triển khai.

---

# B. EXPERIENCE.md

## Document Summary

- **Purpose:** Tài liệu tồn tại để giúp nhóm sản phẩm, thiết kế và kỹ thuật triển khai nhất quán bề mặt, trạng thái, tương tác, accessibility và hành trình của FinESG Planner.
- **Audience:** Product manager, UX designer, frontend/backend engineer, QA, accessibility reviewer và người nghiệm thu nghiệp vụ.
- **Reader type:** Humans; giữ mental model, bảng trạng thái, ví dụ microcopy và named-protagonist journeys.
- **Structure model:** Reference/Database, với `Key Flows` đóng vai trò ví dụ tuyến tính hỗ trợ comprehension.
- **Current length:** 5.917 từ, 16 section cấp `##`, 42 heading tổng cộng.
- **Input validation:** Đạt; nội dung không rỗng, reader type hợp lệ và cấu trúc Markdown/YAML đọc được.

## Structure Map

| Section | Số từ | Đánh giá phục vụ mục đích |
|---|---:|---|
| Frontmatter + intro | 126 | Trực tiếp; xác định ownership và form factor |
| Foundation | 581 | Trực tiếp nhưng lặp readiness và một phần scope từ PRD |
| Information Architecture | 779 | Trực tiếp; đóng vai trò index bề mặt |
| Readiness, Confirmation and Version Contract | 420 | Cốt lõi; nên là nguồn sự thật duy nhất cho state contract |
| Voice and Tone | 277 | Trực tiếp; đúng ownership microcopy |
| Component Patterns | 531 | Trực tiếp |
| State Patterns | 481 | Trực tiếp nhưng có quy tắc lặp trong Component/Flow |
| Interaction Primitives | 414 | Trực tiếp |
| Accessibility Floor | 249 | Trực tiếp và cần giữ như compliance checklist |
| Responsive & Platform | 173 | Trực tiếp |
| Inspiration & Anti-patterns | 208 | Hữu ích nhưng ngắt mạch trước hợp đồng tối ưu |
| Optimization Transparency | 238 | Rất quan trọng nhưng hiện bị chôn sau platform/inspiration |
| Key Flows | 1.011 | Trực tiếp; là bằng chứng hành trình và comprehension aid |
| P0/P1 Experience Cut | 126 | Trực tiếp nhưng đến quá muộn với người lập kế hoạch |
| UX Acceptance Checks | 166 | Trực tiếp |
| Assumptions and Open Decisions | 137 | Cần thiết nhưng bị chôn ở cuối |

## Structural and Flow Analysis

- Foundation cung cấp mental model tốt, nhưng phần “Mô hình nhập liệu tăng dần” gần như preview lại bảng readiness đầy đủ ở section sau. Với reader type humans, nên giữ một overview ngắn rồi dẫn đến nguồn sự thật, không duy trì hai định nghĩa song song.
- IA xuất hiện sớm và surface table hỗ trợ random access tốt. Tuy nhiên, phase/cut và surface-closure decision nằm rải ở IA, `P0/P1 Experience Cut` và `Assumptions`, khiến phạm vi triển khai không có một điểm đọc duy nhất.
- `Optimization Transparency` là hợp đồng nghiệp vụ–UX quan trọng nhất của S12–S16 nhưng nằm sau accessibility, responsive và inspiration. Người triển khai component/state có thể đọc quá sâu trước khi gặp hợp đồng này.
- `State Patterns` là nơi phù hợp để làm nguồn sự thật, nhưng cùng quy tắc về stale results, async jobs, verifier, version-safe comparison và export gating đang xuất hiện lại trong `Component Patterns`, `Key Flows` và acceptance checks. Một phần là reinforcement hữu ích; phần mô tả quy tắc chi tiết nên tồn tại một lần và được tham chiếu.
- `Inspiration & Anti-patterns` chen giữa platform và optimization làm đứt mạch “foundation → IA → contracts → components/states → interactions/platform → flows”. Các anti-pattern thuần thị giác như gauge/radar/pie hoặc màu xanh là ownership của `DESIGN.md`.
- `Key Flows` lặp một số trạng thái nhưng có giá trị cao: chúng biến reference contract thành các phiên làm việc có protagonist, climax và ngoại lệ. Không nên cắt; chỉ cần chuẩn hóa schema để quét nhanh.
- `Accessibility Floor` củng cố một số quy tắc keyboard/focus đã có ở Interaction Primitives, nhưng repetition ở đây có mục tiêu compliance và nên được giữ.
- Assumption/open decisions ảnh hưởng trực tiếp đến kiến trúc (mobile read-only, autosave, notification, S20/S21, mục tiêu Hồ sơ) nhưng nằm cuối, không có owner hoặc thời điểm chốt.

## Recommendations

### 1. P0 — MOVE — Đặt `Optimization Transparency` ngay sau readiness/version contract

**Rationale:** Hợp đồng trước/sau khi chạy chi phối S12–S16, component, state và flow nên phải xuất hiện trước các chi tiết triển khai phụ thuộc vào nó.

**Action:** Giữ nguyên nội dung nhưng chuyển section sau `Readiness, Confirmation and Version Contract`, trước `Voice and Tone`/`Component Patterns`.

**Impact:** Khoảng 0 từ.

### 2. P0 — MOVE — Front-load assumptions thành decision gate có owner

**Rationale:** Các assumption hiện tại thay đổi form factor, autosave, thông báo, IA và mô hình dữ liệu nên không thể chỉ là ghi chú cuối tài liệu.

**Action:** Đặt bảng `ID · quyết định · trạng thái · owner · deadline · surfaces affected` ngay sau Foundation; section cuối chỉ giữ các quyết định pilot hoặc liên kết ngược.

**Impact:** Khoảng 0–20 từ.

### 3. P0 — MERGE — Chỉ định một nguồn sự thật cho readiness và stale propagation

**Rationale:** Hai mô tả readiness cộng với nhiều bản lặp “Cần chạy lại” làm tăng nguy cơ UI, API và QA dùng các điều kiện khác nhau.

**Action:** Giữ bảng trong `Readiness, Confirmation and Version Contract` làm canonical; Foundation chỉ giữ mental model một đoạn ngắn, Component/Flow/Acceptance dùng ID hoặc liên kết đến state rule.

**Impact:** Tiết kiệm khoảng 90–130 từ.

### 4. P0 — MERGE — Hợp nhất quy tắc trạng thái chi tiết vào `State Patterns`

**Rationale:** Async job, Vô nghiệm, verifier failure, nghiệm trùng, khác phiên bản và export failure hiện vừa được định nghĩa vừa được mô tả lại ở nhiều section, gây khó bảo trì.

**Action:** Gắn mã `ST-01…`; `Component Patterns` nêu component áp dụng state nào, `Key Flows` chỉ giữ ngoại lệ có ý nghĩa kịch tính, `UX Acceptance Checks` trỏ tới mã kiểm tra.

**Impact:** Tiết kiệm khoảng 120–180 từ.

**Comprehension note:** Không thay các ngoại lệ trong journey bằng mã trần; luôn giữ nhãn con người đọc được cạnh mã.

### 5. P0 — QUESTION — Khóa vị trí cấu trúc của S20/S21

**Rationale:** Tài liệu đã giả định S20/S21 là artifact/report nội bộ ở P0, nhưng vẫn nhắc dashboard chất lượng trong cut/decision; nếu không chốt, IA và backlog sẽ hiểu khác nhau.

**Action:** Chọn một trong hai cấu trúc: (a) đưa chúng vào appendix “Internal QA artifacts” và loại khỏi product navigation, hoặc (b) bổ sung persona/entry point rồi đưa vào surface map sản phẩm.

**Impact:** 0 từ nếu chỉ tái phân loại; có thể tiết kiệm khoảng 20–40 từ nhắc lại.

### 6. P1 — MOVE — Đưa `P0/P1 Experience Cut` lên ngay sau Information Architecture

**Rationale:** Nhóm lập kế hoạch cần biết surface và hành vi nào phải xây trước khi đọc toàn bộ pattern và flow.

**Impact:** Khoảng 0 từ.

### 7. P1 — MOVE — Chuyển `Inspiration & Anti-patterns` xuống appendix/đoạn cuối

**Rationale:** Section này hữu ích để hiệu chỉnh quyết định nhưng làm gián đoạn chuỗi hợp đồng triển khai; các anti-pattern thuần hình thức phải chuyển hoặc liên kết sang `DESIGN.md`.

**Impact:** Di chuyển khoảng 30–50 từ sang `DESIGN.md`; có thể cắt 20–30 từ lặp trong EXPERIENCE.

### 8. P1 — MERGE — Chuẩn hóa schema cho `Key Flows`

**Rationale:** Sáu flow đã có protagonist, steps, climax và exception nhưng thiếu nhãn nhất quán cho precondition, entry và exit nên tra cứu chéo với surface/state còn chậm.

**Action:** Mỗi flow dùng cùng schema: `Protagonist · preconditions · entry surface · numbered path · climax · exit state · exceptions · linked FR/state IDs`.

**Impact:** Tăng khoảng 30–60 từ nhưng cải thiện khả năng triển khai và traceability.

### 9. P2 — CONDENSE — Rút phần scope lặp từ PRD trong Foundation

**Rationale:** EXPERIENCE nên giữ UX mental model, còn định vị/non-goal đầy đủ đã có qua `sources:` trong PRD.

**Action:** Giữ tuyên bố “sàng lọc sơ bộ” và chuỗi kiểm soát; rút các câu phủ định hoặc chuyển thành một liên kết tới guardrail PRD.

**Impact:** Tiết kiệm khoảng 50–80 từ.

### 10. P2 — PRESERVE — Giữ `Voice and Tone`, `Accessibility Floor` và named-protagonist `Key Flows`

**Rationale:** Đây là comprehension aids và compliance references phục vụ trực tiếp con người; sự củng cố có chủ đích quan trọng hơn giảm chữ.

**Impact:** 0 từ; không khuyến nghị cắt.

## Summary

- **Total recommendations:** 10
- **Estimated reduction:** Khoảng 260–410 từ (4–7%) sau khi tính phần bổ sung schema cho flows; phần lớn lợi ích đến từ một nguồn sự thật cho readiness/state, không phải ép tài liệu ngắn.
- **Meets length target:** Không có length target.
- **Comprehension trade-offs:** Chuyển quy tắc sang mã/cross-reference quá mạnh có thể làm journey khó đọc; vì vậy phải giữ nhãn trạng thái và ngoại lệ bằng ngôn ngữ tự nhiên trong `Key Flows`.

---

# P0 synthesis cho cả hai peer contracts

1. Tách dứt khoát visual appearance trong `DESIGN.md` khỏi behavior/state trong `EXPERIENCE.md`, để mỗi câu chỉ có một spine sở hữu.
2. Front-load các assumption ảnh hưởng triển khai thành decision gate có ID, owner và deadline trong cả hai tài liệu.
3. Đưa `Optimization Transparency` lên ngay sau readiness/version contract.
4. Dùng một bảng readiness và một `State Patterns` làm nguồn sự thật; các component, flow và acceptance check chỉ củng cố hoặc liên kết.
5. Chốt S20/S21 là product surfaces có persona hay internal QA artifacts nằm ngoài product IA.
