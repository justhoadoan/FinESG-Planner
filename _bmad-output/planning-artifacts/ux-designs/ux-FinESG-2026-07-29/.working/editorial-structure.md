## Document Summary

- **Purpose:** Cặp tài liệu tồn tại để giúp architect, developer, QA và AI agents trích xuất đúng visual invariant, behavior invariant, state, accessibility rule, flow và bằng chứng tham chiếu khi tạo architecture, story, code và test.
- **Audience:** Architect, developer, QA và AI agents dùng tài liệu như contract nguồn triển khai.
- **Reader type:** `llm`; ưu tiên dependency-first, thuật ngữ ổn định, nguồn sự thật duy nhất, schema nhất quán, tham chiếu không mơ hồ và ví dụ gắn với sản phẩm.
- **Structure model:** Reference/Database; `DESIGN.md` là visual/token registry, `EXPERIENCE.md` là behavior/state/interaction registry, còn PRD sở hữu requirement và nghiệp vụ.
- **Current length:** 13.751 từ trên 26 section cấp `##`: `DESIGN.md` có 3.336 từ/9 section cấp `##`/16 heading; `EXPERIENCE.md` có 10.415 từ/17 section cấp `##`/57 heading.
- **Style guide:** Không có style guide ngoài canonical section order của `bmad-ux`; thứ tự tương đối `Brand & Style → Colors → Typography → Layout & Spacing → Elevation & Depth → Shapes → Components → Do’s and Don’ts` và `Foundation → Information Architecture → Voice and Tone → Component Patterns → State Patterns → Interaction Primitives → Accessibility Floor → Key Flows` phải được giữ.
- **Review boundary:** Nội dung là bất biến; báo cáo chỉ đề xuất tổ chức lại, không đề xuất thay đổi ý nghĩa và không sửa hai spine.

**Structure map — `DESIGN.md`**

| Section | Từ | Phục vụ contract |
|---|---:|---|
| Frontmatter + intro | 861 | Có; machine-readable tokens, component token registry, ownership và Decision Gates |
| Brand & Style | 270 | Có; một phần behavior/product invariant lặp tài liệu khác |
| Colors | 463 | Có; semantic color/state mapping trực tiếp |
| Typography | 126 | Có |
| Layout & Spacing | 190 | Có |
| Elevation & Depth | 94 | Có |
| Shapes | 73 | Có |
| Components | 968 | Có; registry quan trọng nhưng một số dòng visual contract chứa behavior đã có ở `EXPERIENCE.md` |
| Do’s and Don’ts | 238 | Một phần; visual guardrail hữu ích, behavioral guardrail bị lặp |
| Assumptions to Confirm | 53 | Có; pointer tới Decision Gates |

**Structure map — `EXPERIENCE.md`**

| Section | Từ | Phục vụ contract |
|---|---:|---|
| Frontmatter + intro | 125 | Có; ownership/form factor/personas |
| Foundation | 1.028 | Có; chứa dependency, invariant, role và gate nhưng lặp readiness/platform/authority chi tiết |
| Information Architecture | 788 | Có; surface registry |
| Delivery Scope | 322 | Có; mapping P0/P1 nhưng lặp prose từ PRD |
| Readiness, Confirmation and Version Contract | 446 | Có; nguồn trạng thái cốt lõi |
| Optimization Transparency | 266 | Có |
| Input Field Contracts | 839 | Có; display-label inventory + UX delta, đã nêu rõ PRD ownership |
| Evidence Package Contract | 319 | Có; preview/action delta, đã nêu rõ PRD ownership |
| Voice and Tone | 277 | Có |
| Component Patterns | 915 | Có; behavioral registry CMP-01–CMP-28 |
| State Patterns | 1.538 | Có; state matrix, surface coverage, permission và reconnect contract |
| Interaction Primitives | 763 | Có; một số normative rule lặp State/Accessibility |
| Accessibility Floor | 386 | Có; contract nghiệm thu bắt buộc |
| Responsive & Platform | 202 | Có; chi tiết X-A1 lặp Foundation/Decision Gates/Acceptance |
| Inspiration & Anti-patterns | 208 | Một phần; inspiration là định hướng, anti-patterns lặp invariant ở PRD/DESIGN/Foundation |
| Key Flows | 1.501 | Có; UJ/OF/QA grounding và failure paths |
| UX Acceptance Checks | 393 | Có; cần schema ID/traceability ổn định cho QA extraction |
| Assumptions and Open Decisions | 99 | Có; pointer tới registry và mốc quyết định |

## Recommendations

### 1. MERGE - [PAIR] Contract authority và traceability index
**Rationale:** Ownership hiện được mô tả đúng nhưng nằm rải ở intro, Foundation, Delivery Scope, Input Field Contracts, Evidence Package Contract và visual-reference notes, khiến agent phải tự hợp nhất nguồn sự thật.
**Impact:** Thêm khoảng 120–160 từ cho một bảng `Topic/ID → authoritative document/section → downstream consumers`, đồng thời cho phép rút khoảng 300–380 từ ownership disclaimer lặp lại; giảm ròng khoảng 180–220 từ.

### 2. CONDENSE - [DESIGN] Dual component encoding trong YAML và bảng CMP-01–CMP-28
**Rationale:** YAML `components.*` và bảng Markdown cùng mô tả 28 component nhưng chưa có mapping máy đọc được từ `CMP-ID` sang YAML path, còn nhiều token được chép lại trong prose.
**Impact:** Thêm mapping `CMP-ID ↔ components.<key>` và rút các token đã có trong YAML khỏi prose sẽ tiết kiệm khoảng 120–180 từ mà vẫn giữ nguyên cả registry lẫn semantic anatomy.

### 3. MOVE - [DESIGN → EXPERIENCE/PRD pointer] Behavioral rules còn nằm trong visual sections
**Rationale:** Các câu về readiness, stale propagation, quyền thao tác, drag-and-drop, slider trọng số, verifier và nghiệp vụ chọn/loại trong `Brand & Style`, `Components` hoặc `Do’s and Don’ts` thuộc behavior/product ownership và đã có nguồn chuẩn khác.
**Impact:** Di chuyển hoặc thay bằng ID/cross-reference khoảng 160–220 từ khỏi `DESIGN.md`; không giảm nội dung contract vì invariant vẫn tồn tại ở nguồn chuẩn.

### 4. QUESTION - [DESIGN/PAIR] CMP-18 đang gộp badge và banner
**Rationale:** YAML gán `{rounded.full}` cho `status-badge-and-banner` trong khi body nói pill chỉ dành cho badge, nên agent có thể áp dụng radius của badge cho banner.
**Impact:** Tách thành `CMP-18A Status badge` và `CMP-18B Status banner`, hoặc thêm hai nested token path, sẽ tăng khoảng 20–35 từ nhưng loại một ambiguity trực tiếp.

### 5. CONDENSE - [EXPERIENCE] Foundation chỉ giữ dependency và invariant
**Rationale:** Foundation lặp chi tiết về progressive readiness, role authority, viewport reflow và token chịu tải vốn đã có bảng chuẩn ở Readiness, Permission-denied, Responsive và Decision Gates.
**Impact:** Giữ chain, bảy nguyên tắc, persona summary và gate registry nhưng thay detail bằng ID reference sẽ tiết kiệm khoảng 170–240 từ.

### 6. CONDENSE - [EXPERIENCE] Delivery Scope thành mapping thay vì bản tóm tắt PRD
**Rationale:** Section đã tuyên bố PRD là nguồn duy nhất nhưng danh sách P0 vẫn chép lại nhiều requirement bằng prose, tạo điểm drift khi PRD đổi.
**Impact:** Chuyển sang bảng `P0/P1 item → S-ID/UJ-ID/FR-ID/artifact` sẽ tiết kiệm khoảng 90–140 từ và tăng độ chính xác truy vết.

### 7. MERGE - [EXPERIENCE] Canonical state vocabulary và alias machine-readable
**Rationale:** State matrix phải được giữ, nhưng hiện trộn nhãn Việt chuẩn với alias tiếng Anh như `failed-check`, `technical-failed`, `permission-denied` mà chưa có ID/canonical-name mapping duy nhất.
**Impact:** Thêm stable ID và bảng alias khoảng 100–140 từ; thay state wording lặp trong Component/Interaction/Acceptance bằng ID sẽ giảm khoảng 230–320 từ, tiết kiệm ròng khoảng 130–180 từ.

### 8. MERGE - [EXPERIENCE] Normative ownership giữa State, Interaction và Accessibility
**Rationale:** Focus return, live regions, `aria-disabled`, permission denial, reconnect và async recovery được quy định ở nhiều section, khiến agent khó biết câu nào là normative definition và câu nào là application.
**Impact:** Giữ nguyên Accessibility Floor và State matrices, đặt definition tại đúng section rồi dùng ID reference ở section còn lại; tiết kiệm khoảng 110–170 từ.

### 9. CONDENSE - [EXPERIENCE] Inspiration & Anti-patterns
**Rationale:** Bốn inspiration bullets không cần cho architecture/story/QA extraction, còn anti-patterns lặp các negative invariant đã có ở PRD, DESIGN Do’s and Don’ts hoặc Foundation.
**Impact:** Di chuyển inspiration sang tài liệu nghiên cứu/mock brief và biến anti-patterns thành ID references sẽ tiết kiệm khoảng 130–180 từ.

### 10. MERGE - [EXPERIENCE] UX Acceptance Checks thành traceable test registry
**Rationale:** Các bullet là contract QA hữu ích nhưng không có AC-ID hoặc liên kết nhất quán đến UJ/S/CMP/ST/FR, nên downstream agents phải suy luận coverage.
**Impact:** Chuyển sang bảng `AC-ID → assertion → source IDs → viewport/role` có thể tăng khoảng 60–100 từ nhưng giảm lỗi trích xuất và cho phép story/test tham chiếu ổn định.

### 11. PRESERVE - Registries, state/accessibility contracts, flows và visual references
**Rationale:** Decision Gates, token/component registries, State Patterns + surface coverage, Permission-denied/reconnect, Accessibility Floor, UJ-1–UJ-6, OF-1, QA-1 và bốn visual references cung cấp grounding cụ thể mà LLM không nên phải suy diễn.
**Impact:** 0 từ bị cắt; nếu bổ sung ID metadata cho flows, tăng khoảng 50–90 từ là chấp nhận được.

### 12. CONDENSE - [PAIR] Repeated decision-gate applications
**Rationale:** D-A6/X-A6 và X-A1 xuất hiện ở registry rồi được diễn giải lại nhiều lần mà chưa nêu rõ đâu là definition, đâu là application site.
**Impact:** Giữ registry đầy đủ, gắn application sites bằng gate ID và rút câu lặp sẽ tiết kiệm khoảng 60–100 từ.

## Summary

- **Total recommendations:** 12
- **Estimated reduction:** Khoảng 750–1.000 từ ròng (5–7% của 13.751 từ), sau khi đã tính phần tăng cho authority index, state aliases và AC traceability.
- **Meets length target:** No target specified.
- **Comprehension trade-offs:** Không cắt registry, state matrix, accessibility contract, named flows hoặc visual references; mọi giảm chữ đến từ ownership pointer, stable IDs và loại prose lặp, nên độ chính xác cho LLM tăng thay vì giảm.
