# Accessibility recheck — FinESG Planner

## Overall assessment

**Kết luận hiện tại: contract accessibility đã qua remediation; chưa thể đóng implementation gate chỉ bằng bốn static specimen.**

Không còn finding Critical hoặc Medium. Các xung đột Critical/High của lần review trước và ba finding Medium của vòng static review đã được sửa trong hai spine hoặc trong markup/CSS của mockup. Phần còn lại gồm **0 critical · 2 high · 0 medium · 1 low**. Hai finding High hiện là khoảng trống bằng chứng chạy được, không phải mâu thuẫn trong contract.

## Scope and method

- Đọc lại toàn bộ `DESIGN.md`, `EXPERIENCE.md` và bốn HTML trong `mockups/`.
- Đối chiếu WCAG 2.2 AA với focus/outline, bàn phím, target size, text size/contrast, page semantics, native table/form, radio/tab, modal dialog, disabled state, live region và native-table editing contract.
- Dùng Playwright/Chromium tại 1600, 1440, 1280, 1024, 768, 720, 400 và 320 CSS px; kiểm tra DOM/accessibility tree, broken ARIA references, duplicate IDs, keyboard focus sequence, computed font/contrast, overflow và console/page errors.
- Bốn mockup không có JavaScript và được hai spine định nghĩa là visual reference. Vì vậy focus containment, `Esc`, return focus, edit/save/cancel, async polling/dedupe và reflow sản phẩm chỉ có thể đánh giá ở cấp contract hoặc markup tĩnh.

## Resolved Critical/High findings

- **A11Y-C01 resolved at contract level.** `EXPERIENCE.md:15,31,137,527,545–550,666` khóa full functionality qua reflow, cấm suy “điện thoại chỉ đọc” từ CSS viewport/zoom và yêu cầu nghiệm thu 200%/400% tới 320 CSS px. Không còn xung đột làm mất chỉnh sửa/xác nhận/chạy/xuất.
- **A11Y-H01 resolved.** `DESIGN.md:136,324–326` dùng focus đặc `#1D4ED8`. Playwright đi qua **108 keyboard stops**; mọi stop có outline đặc 3px và target tối thiểu 44×44. Radio-card S12 chuyển indicator tới toàn card bằng `:has(input:focus-visible)`.
- **A11Y-H02 resolved in static semantics.** Overview/results/run dùng link/button thật; S12 dùng native radio trong `fieldset`; tablist/tab/tabpanel có selected/control relationships. Không có control thiếu accessible name, duplicate ID hoặc ARIA reference bị gãy.
- **A11Y-H03 resolved.** Bảng so sánh có `caption`, `thead`, 4 column headers và 9 row headers; run diagnostic có `caption`, 5 column headers và 3 row headers.
- **A11Y-H04 resolved in contract and partially evidenced.** `EXPERIENCE.md:472–474` chọn native `<table>`, không dùng ARIA grid, và định nghĩa view/edit/dirty/error. Hai specimen S05 có caption, 6 column headers, 12 row headers và một input có label/required/description; Playwright accessibility tree giữ đúng row/column context.
- **A11Y-H05 resolved in markup.** Export drawer có `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`; ba vùng nền của specimen export dùng `inert`/`aria-hidden`.
- **A11Y-H06 resolved in markup/contract.** S05 dùng hai CTA `aria-disabled="true"` vẫn focusable, mỗi CTA tham chiếu lý do bằng `aria-describedby`; input mẫu có label cố định, `required` và hint liên kết.
- **A11Y-H07 resolved.** Mọi meaningful visible text node có computed font-size tối thiểu 12px; token muted đạt AA. Mười glyph 9px còn lại ở overview đều decorative và `aria-hidden="true"`; các glyph trạng thái S12 hiện cũng có tên và tương phản đạt chuẩn.

## Unresolved findings — High

### A11Y-H01 — Reflow 320px/400% chưa có bằng chứng chạy được

- **Location:** contract `EXPERIENCE.md:31,137,527,545–550,666`; static canvases `key-overview.html:55,91`, `key-bctc-reconciliation.html:115,214,219`, `key-run-diagnostic.html:71,112`, `key-results-export.html:109–110,616–619`.
- **Evidence:** tại 320 CSS px, document scroll widths vẫn là `overview 1440`, `S05 1488`, `run 1440`, `results 1456` px. Các frame tại viewport thiết kế không overflow nội bộ; overflow này đến từ gallery/specimen cố định, không phải một responsive implementation.
- **Impact:** không thể dùng bốn file này để nghiệm thu WCAG 1.4.10 hoặc acceptance check hoàn thành UJ-1–UJ-6 tại 200%/400%.
- **Required evidence:** một route/prototype responsive chạy được, hoặc test harness implementation, chứng minh shell/panel reflow một cột và horizontal scroll chỉ nằm trong container bảng/PDF có tên. Static gallery có thể giữ kích thước cố định nếu được loại rõ khỏi acceptance surface.

### A11Y-H02 — Các contract tương tác/runtime chưa thể nghiệm thu từ static specimen

- **Location:** `EXPERIENCE.md:472–504,519–531`; cả bốn mockup không có `<script>`.
- **Evidence:** markup chứng minh được radio, tabs, table, dialog, disabled reason và live-region roles, nhưng không chứng minh:
  - nút “Sửa” → input, `Enter` lưu, `Esc` hủy/trả focus và invalid `aria-invalid`/`aria-errormessage` của S05;
  - arrow-key tab switching;
  - guard cho `aria-disabled`;
  - initial focus, containment, `Esc` và return focus của dialog;
  - `aria-busy`, task-ID dedupe, status transition và focus tới `h1` sau điều hướng.
- **Additional modal evidence:** trong file results, **11 tabbable controls** của specimen so sánh vẫn nằm ngoài dialog vì hai specimen cùng tồn tại trong một DOM. Đây là giới hạn của gallery, nên file không thể dùng làm focus-trap acceptance fixture.
- **Required evidence:** test tương tác bàn phím + accessibility-tree trên implementation cho một edit-valid, một edit-invalid, một disabled guard, một tab switch, một async transition và một chu kỳ mở/đóng dialog hoàn chỉnh.

## Resolved findings — Medium

### A11Y-M01 — Glyph trạng thái S12 có semantics và tương phản đạt chuẩn

- **Location:** `key-run-diagnostic.html:342–351,838–867,1489–1495,1647,1654,1884–1890`.
- **Remediation:** mọi `.nav-state` trong hai specimen có `role="img"` và `aria-label` mô tả trạng thái; hai checkmark Gói vay có nhãn “Được chọn cho lần chạy”. Pending dùng `--on-surface-muted`; rule `.loan-row .check` giữ foreground `--on-primary` sau rule span tổng quát.
- **Verification:** accessibility tree trả về tên trạng thái, ví dụ `img "Chưa chạy"`. Bốn pending glyph đạt **5.46–5.95:1**; hai checkmark đạt **9.11:1**. Audit contrast toàn trang hiện có 0 fail.

### A11Y-M02 — Số, ngày, viết tắt và ký hiệu có cách đọc xác định

- **Location:** `key-overview.html:896,942,950,1073,1087`; `key-bctc-reconciliation.html:1299–1300,1435–1483,1597–1598,1693–1741,1806`; `key-run-diagnostic.html:1532,1592,1677,1719–1739,2005–2029,2050,2079`; `key-results-export.html:659,696,720–762,798,835`.
- **Remediation:** thêm `<abbr title>` cùng expansion ẩn ở lần xuất hiện đầu của BCTC, NPV, CFADS, DSCR, VCS, VND và `tCO₂e/năm`; thêm `<time datetime>` cho ngày có nghĩa; ký hiệu `≥/≤/−/×`, số thập phân, tỷ đồng và đơn vị chịu tải dùng visible text `aria-hidden` + câu đọc ẩn, hoặc accessible name tự nhiên trên table cell.
- **Verification:** bốn file hiện có tổng cộng **20 `<abbr>` và 20 `<time>`**. DOM audit không còn ký hiệu `≥/≤/−/×` chịu tải nào thiếu accessible expansion. Accessibility tree đọc ví dụ “Lớn hơn hoặc bằng 20 phẩy 0 tỷ đồng”, “Thiếu 0 phẩy 07 lần” và “39 phẩy 6 tỷ đồng Việt Nam; giảm 2 phẩy 2 so với An toàn”.

### A11Y-M03 — Metadata/provenance chịu tải không còn bị ellipsis cắt

- **Location:** `key-overview.html:751–759`; `key-bctc-reconciliation.html:1284–1292`.
- **Remediation:** `.check-evidence`, `.field-label`, `.value-note` và source-detail copy chuyển sang wrap với `overflow-wrap:anywhere`, `text-overflow:clip` và `white-space:normal`. Các ellipsis không chịu tải khác giữ nguyên nhưng không overflow ở viewport thiết kế.
- **Verification:** Playwright hiện tìm thấy **0 phần tử đang thực sự overflow với ellipsis** trên cả bốn file; bảy design frame vẫn có 0 overflow ngang và 0 overflow dọc.

## Unresolved finding — Low

### A11Y-L01 — Gallery nhiều specimen chưa theo page-semantic template

- **Location:** contract `EXPERIENCE.md:351,519`; overview breadcrumb `key-overview.html:863`; S05 outer main và hai `h1` `key-bctc-reconciliation.html:1279,1354,1605`; run outer main/breadcrumbs và bốn `h1` `key-run-diagnostic.html:1448,1452,1518,1837,1841,1908`; results outer main/hai `h1` `key-results-export.html:623,670,846`.
- **Evidence:** không file nào có skip link. Breadcrumb overview/run là `div`/`p`, không phải labelled `nav`. S05, run và results chứa nhiều screen/state trong cùng accessibility tree, dẫn tới nhiều `h1` và chuỗi focus nối tiếp.
- **Impact:** chính gallery gây nhiễu khi được mở bằng assistive technology; đây không phải bằng chứng rằng route production sẽ sai vì contract đã khóa đúng template.
- **Fix:** tách mỗi specimen thành file/route riêng, hoặc ẩn hoàn toàn specimen không hoạt động khỏi accessibility tree; cung cấp ít nhất một shell reference có skip link, named breadcrumb nav, một named main và một page `h1`.

## Mechanical verification snapshot

| Check | Current result |
|---|---|
| Console/page errors | 0 / 0 trên cả bốn file |
| Duplicate IDs / broken ARIA refs | 0 / 0 |
| Keyboard focus sequence | 18 overview · 47 S05 · 29 run · 14 results |
| Focus indicator | 108/108 stop có outline đặc 3px; radio-card có white separation halo |
| Target size | 0 keyboard target dưới 44×44, gồm hai CTA `aria-disabled` |
| Meaningful text | 1,046 nodes; minimum 12px; 10 glyph overview 9px đều decorative/hidden |
| Text contrast | 0 fail overview · 0 S05 · 0 run · 0 results |
| Abbreviation / date semantics | 20 `<abbr>` · 20 `<time>`; first-use expansions visible trong accessibility tree |
| Load-bearing symbol reading | 0 chuỗi `≥/≤/−/×` thiếu accessible name hoặc hidden expansion |
| Live ellipsis overflow | 0 overview · 0 S05 · 0 run · 0 results |
| Design-frame overflow | 0 ngang/0 dọc trên 7 frame ở viewport thiết kế |
| 320px document width | 1440 · 1488 · 1440 · 1456 px |
| Tables | 4/4 có caption, `thead`, column headers và row headers |
| S05 form/disabled | 2 labelled required inputs; 2 focusable `aria-disabled` CTA có reason |
| Run selector/tabs | Native fieldset/radio; tablist + 2 tabs + 2 linked panels |
| Export dialog | Named/described modal; inert export background; runtime trap chưa test được |
| Live regions | 1 overview status; 2 S05 alerts; 2 run status + 1 alert; 0 async `aria-busy` specimen |
| Grid posture | 0 ARIA grid/gridcell; đúng contract native-table |

## Gate recommendation

Hai spine và desktop static semantics hiện đủ tốt để handoff implementation; A11Y-M01/M02/M03 đã đóng bằng markup/CSS và kiểm tra Playwright. Không tái mở các Critical/High cũ đã resolved. Trước khi đóng WCAG Reviewer Gate cho sản phẩm chạy thật, vẫn bắt buộc có bằng chứng implementation cho **A11Y-H01** và **A11Y-H02**.
