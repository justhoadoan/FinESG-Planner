---
name: "FinESG Planner"
description: "Hệ thống thiết kế evidence-first cho quy trình sàng lọc CapEx xanh có thể truy vết và kiểm tra."
title: "FinESG Planner — Design System"
document: "DESIGN"
status: final
version: "1.0"
created: 2026-07-29
updated: 2026-07-29
language: vi
sources:
  - ../../prds/prd-FinESG-2026-07-29/prd.md
form_factor: responsive_web
design_direction:
  name: "Evidence-first financial workspace"
  status: assumption
ui_system:
  base: "library-neutral"
  status: decision
  rule: "Không kế thừa mặc định thị giác hoặc hành vi; thư viện triển khai chỉ được dùng khi giữ nguyên contract trong hai spine."
colors:
  background: "#F5F7FA"
  surface: "#FFFFFF"
  surface-subtle: "#EEF2F6"
  surface-strong: "#E2E8F0"
  on-surface: "#172033"
  on-surface-muted: "#526075"
  outline: "#7A8798"
  outline-strong: "#526075"
  primary: "#164E63"
  primary-hover: "#0F3F50"
  primary-subtle: "#DDF1F4"
  on-primary: "#FFFFFF"
  finance: "#315C9B"
  carbon: "#227354"
  risk: "#8A3F67"
  debt: "#925C2D"
  info: "#2457A6"
  info-subtle: "#E8F0FC"
  success: "#19704E"
  success-subtle: "#E5F4EC"
  warning: "#8A5A00"
  warning-subtle: "#FFF3D6"
  estimated: "#7A4E00"
  estimated-subtle: "#FFF7E6"
  error: "#B42318"
  error-subtle: "#FDECEA"
  simulation: "#6941C6"
  simulation-subtle: "#F0EBFF"
  verified: "#1F5A78"
  verified-subtle: "#E5F1F7"
  focus: "#1D4ED8"
  disabled: "#97A3B2"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "32px"
    fontWeight: "650"
    lineHeight: "1.2"
    letterSpacing: "-0.02em"
  heading-lg:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "24px"
    fontWeight: "650"
    lineHeight: "1.3"
  heading-md:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "20px"
    fontWeight: "650"
    lineHeight: "1.35"
  heading-sm:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "16px"
    fontWeight: "650"
    lineHeight: "1.4"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "1.5"
  body-compact:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "13px"
    fontWeight: "400"
    lineHeight: "1.45"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "13px"
    fontWeight: "600"
    lineHeight: "1.35"
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "12px"
    fontWeight: "450"
    lineHeight: "1.4"
  code:
    fontFamily: "'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace"
    fontSize: "12px"
    fontWeight: "500"
    lineHeight: "1.4"
  number:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: "600"
    lineHeight: "1.4"
rounded:
  xs: "2px"
  sm: "4px"
  default: "6px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  unit: "4px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
  section: "48px"
  page-desktop: "32px"
  page-tablet: "24px"
  page-mobile: "16px"
  control-height: "44px"
  compact-control-height: "44px"
  touch-target-min: "44px"
  data-row-height: "44px"
  sidebar-width: "272px"
  context-panel-width: "400px"
  content-max-width: "1600px"
elevation:
  surface: "0 1px 2px rgba(23, 32, 51, 0.06)"
  raised: "0 8px 24px rgba(23, 32, 51, 0.10)"
  overlay: "0 16px 48px rgba(23, 32, 51, 0.16)"
  focus-ring: "0 0 0 3px #1D4ED8"
components:
  app-shell:
    id: "CMP-01"
    sidebar-width: "{spacing.sidebar-width}"
    context-panel-width: "{spacing.context-panel-width}"
    border-color: "{colors.outline}"
  process-navigation:
    id: "CMP-02"
    min-target: "{spacing.touch-target-min}"
    active-background: "{colors.primary-subtle}"
    active-indicator: "{colors.primary}"
  evidence-rail:
    id: "CMP-03"
    surface: "{colors.surface}"
    border-color: "{colors.outline}"
    active-indicator: "{colors.focus}"
  readiness-row:
    id: "CMP-04"
    min-height: "{spacing.touch-target-min}"
    surface: "{colors.surface}"
    border-color: "{colors.outline}"
  source-linked-field:
    id: "CMP-05"
    row-height: "{spacing.data-row-height}"
    focus-color: "{colors.focus}"
    review-background: "{colors.warning-subtle}"
  pdf-provenance-viewer:
    id: "CMP-06"
    surface: "{colors.surface}"
    border-color: "{colors.outline}"
    active-box: "{colors.focus}"
  editable-data-table:
    id: "CMP-07"
    row-height: "{spacing.data-row-height}"
    border-color: "{colors.outline}"
    calculated-background: "{colors.surface-subtle}"
  formula-disclosure:
    id: "CMP-08"
    surface: "{colors.surface-subtle}"
    code-font: "{typography.code.fontFamily}"
    code-size: "{typography.code.fontSize}"
    border-color: "{colors.outline}"
  review-panel:
    id: "CMP-09"
    surface: "{colors.surface}"
    radius: "{rounded.md}"
    focus-ring: "{elevation.focus-ring}"
  scenario-selector:
    id: "CMP-10"
    min-target: "{spacing.touch-target-min}"
    selected-border: "{colors.primary}"
    selected-background: "{colors.primary-subtle}"
  project-eligibility-row:
    id: "CMP-11"
    row-height: "{spacing.data-row-height}"
    border-color: "{colors.outline}"
    warning-color: "{colors.warning}"
  project-portfolio-control:
    id: "CMP-12"
    min-target: "{spacing.touch-target-min}"
    focus-ring: "{elevation.focus-ring}"
    border-color: "{colors.outline}"
  emissions-evidence-form:
    id: "CMP-13"
    surface: "{colors.surface}"
    carbon-accent: "{colors.carbon}"
    border-color: "{colors.outline}"
  risk-rubric:
    id: "CMP-14"
    surface: "{colors.surface}"
    risk-accent: "{colors.risk}"
    border-color: "{colors.outline}"
  strategy-selector:
    id: "CMP-15"
    min-target: "{spacing.touch-target-min}"
    selected-border: "{colors.primary}"
    selected-background: "{colors.primary-subtle}"
  run-contract-review:
    id: "CMP-16"
    surface: "{colors.surface}"
    radius: "{rounded.md}"
    border-color: "{colors.outline}"
  async-task-status:
    id: "CMP-17"
    info-background: "{colors.info-subtle}"
    success-background: "{colors.success-subtle}"
    error-background: "{colors.error-subtle}"
  status-badge-and-banner:
    id: "CMP-18"
    badge:
      radius: "{rounded.full}"
      text-color: "{colors.on-surface}"
      border-color: "{colors.outline}"
    banner:
      radius: "{rounded.md}"
      text-color: "{colors.on-surface}"
      border-color: "{colors.outline}"
  solver-status-banner:
    id: "CMP-19"
    verified-background: "{colors.verified-subtle}"
    warning-background: "{colors.warning-subtle}"
    error-background: "{colors.error-subtle}"
  constraint-diagnostic:
    id: "CMP-20"
    surface: "{colors.surface}"
    error-accent: "{colors.error}"
    border-color: "{colors.outline}"
  result-metric-group:
    id: "CMP-21"
    surface: "{colors.surface}"
    number-font: "{typography.number.fontFamily}"
    number-size: "{typography.number.fontSize}"
    border-color: "{colors.outline}"
  project-explanation:
    id: "CMP-22"
    surface: "{colors.surface}"
    border-color: "{colors.outline}"
    muted-text: "{colors.on-surface-muted}"
  version-safe-comparison:
    id: "CMP-23"
    surface: "{colors.surface}"
    selected-background: "{colors.primary-subtle}"
    border-color: "{colors.outline}"
  chart-with-data-table:
    id: "CMP-24"
    finance-series: "{colors.finance}"
    carbon-series: "{colors.carbon}"
    risk-series: "{colors.risk}"
    debt-series: "{colors.debt}"
    grid-color: "{colors.outline}"
    target-line: "{colors.error}"
  export-preview-dialog:
    id: "CMP-25"
    surface: "{colors.surface}"
    radius: "{rounded.lg}"
    elevation: "{elevation.overlay}"
  audit-timeline:
    id: "CMP-26"
    surface: "{colors.surface}"
    line-color: "{colors.outline}"
    verified-accent: "{colors.verified}"
  data-management-action:
    id: "CMP-27"
    min-target: "{spacing.touch-target-min}"
    destructive-color: "{colors.error}"
    focus-ring: "{elevation.focus-ring}"
  empty-loading-error-state:
    id: "CMP-28"
    surface: "{colors.surface}"
    muted-text: "{colors.on-surface-muted}"
    error-color: "{colors.error}"
---

# FinESG Planner — Design Spine

> Tài liệu này sở hữu câu trả lời cho “giao diện trông như thế nào”. Luồng, trạng thái, điều kiện chặn và hành vi tương tác thuộc [EXPERIENCE.md](./EXPERIENCE.md). Nếu mockup khác với `DESIGN.md` hoặc `EXPERIENCE.md`, nội dung trong hai tài liệu chuẩn này được ưu tiên.

**Decision Gates**

Các giá trị token bên dưới là mặc định triển khai, không phải nhận diện thương hiệu đã được duyệt. Chủ quyết định phải khóa các cổng sau trước mốc tương ứng.

| ID | Quyết định hoặc giả định | Trạng thái | Chủ quyết định | Hạn chốt |
|---|---|---|---|---|
| D-A1 | Hướng “evidence-first enterprise” và palette hiện tại | `[ASSUMPTION]` | Chủ sản phẩm + UX | Trước khi dựng màn hình chủ chốt |
| D-A2 | Contract library-neutral; thư viện triển khai không được thay đổi visual/behavior invariant | `[DECIDED 2026-07-29]` | UX contract | Áp dụng ngay |
| D-A3 | P0 chỉ có giao diện sáng | `[ASSUMPTION]` | Chủ sản phẩm + QA | Trước khi kiểm thử thị giác |
| D-A4 | Inter/system sans là font triển khai | `[ASSUMPTION]` | UX + Trưởng nhóm giao diện | Trước khi khóa CSS token |
| D-A5 | Chưa có logo, ảnh thương hiệu hoặc bộ icon riêng | `[ASSUMPTION]` | Chủ sản phẩm | Trước khi hoàn thiện demo |
| D-A6 | WCAG 2.2 AA là chuẩn nghiệm thu P0 | `[ASSUMPTION]` | Chủ sản phẩm + QA | Trước khi viết test UI |

## Brand & Style

**[ASSUMPTION D-A1] Hướng thị giác:** một không gian làm việc tài chính dựa trên bằng chứng, nghiêm túc và có thể kiểm tra; không phải một “dashboard xanh” mang tính quảng bá. Giao diện phải giúp người dùng nhận ra ngay ba điều: số liệu đến từ đâu, ai đã xác nhận và kết quả còn bị ràng buộc bởi điều gì.

Phong cách là **evidence-first enterprise**:

- Nền sáng, mật độ vừa phải, ưu tiên bảng và cấu trúc phân cấp rõ.
- Màu xanh lục chỉ biểu đạt phát thải hoặc trạng thái đã xác nhận; không dùng làm màu thương hiệu bao trùm.
- Chỉ tiêu tài chính, CO₂, nợ và rủi ro luôn có ngôn ngữ thị giác riêng; không trộn thành một điểm tổng hợp.
- Trạng thái luôn có nhãn văn bản và biểu tượng; màu chỉ là tín hiệu bổ sung.
- Chuyển động ngắn và có chức năng, không dùng hiệu ứng ăn mừng hoặc hình ảnh “xanh hóa” trang trí.

**[DECISION D-A2] Nền tảng UI:** hai spine là contract library-neutral và không kế thừa mặc định accessibility, visual hay behavior từ shadcn/ui hoặc thư viện khác. Đội phát triển có thể dùng primitive tương thích shadcn/ui để rút ngắn triển khai, nhưng phải ánh xạ rõ từng component chuẩn và giữ nguyên token, trạng thái, bàn phím, focus và thông báo trong hai spine.

**[ASSUMPTION D-A3] Giao diện P0:** chỉ có giao diện sáng. Giao diện tối không thuộc P0 vì màn hình PDF, bảng tài chính và bản xuất cần được kiểm thử tương phản riêng.

## Colors

### Vai trò màu

| Token | Vai trò |
|---|---|
| `{colors.background}` | Nền ứng dụng và vùng ngoài workspace |
| `{colors.surface}` | Thẻ, form, bảng, panel và dialog |
| `{colors.surface-subtle}` | Hàng nhóm, vùng chỉ đọc, skeleton và phân tách ngữ cảnh |
| `{colors.on-surface}` | Nội dung chính |
| `{colors.on-surface-muted}` | Metadata, mô tả, nhãn phụ |
| `{colors.primary}` | Hành động chính, điều hướng đang chọn và liên kết quan trọng |
| `{colors.finance}` | Dòng tiền, NPV, tiền mặt và CFADS |
| `{colors.carbon}` | CO₂, Scope và bằng chứng phát thải |
| `{colors.debt}` | Vốn vay, nghĩa vụ nợ và chi phí tài trợ |
| `{colors.risk}` | Điểm rủi ro và cờ đỏ |

### Trạng thái

| Trạng thái | Nền / chữ | Biểu tượng bắt buộc | Nhãn mẫu |
|---|---|---|---|
| Đã xác nhận dữ liệu | `{colors.success-subtle}` / `{colors.success}` | Check trong vòng tròn | “Đã xác nhận” |
| Đã kiểm chứng kết quả | `{colors.verified-subtle}` / `{colors.verified}` | Khiên có check | “Tối ưu đã kiểm chứng” |
| Cần kiểm tra / cảnh báo | `{colors.warning-subtle}` / `{colors.warning}` | Tam giác cảnh báo | “Cần kiểm tra” |
| Lỗi / không vượt kiểm tra | `{colors.error-subtle}` / `{colors.error}` | Bát giác hoặc vòng tròn có dấu chấm than | “Không vượt Bộ kiểm tra nghiệm” |
| Ước tính | `{colors.estimated-subtle}` / `{colors.estimated}` | Bút chì trong hình thoi | “Ước tính” |
| Mô phỏng | `{colors.simulation-subtle}` / `{colors.simulation}` | Bình thí nghiệm + viền nét đứt | “Mô phỏng” |
| Thông tin / đang xử lý | `{colors.info-subtle}` / `{colors.info}` | Info hoặc spinner | “Đang xử lý” |
| Lỗi thời / cần chạy lại | `{colors.warning-subtle}` / `{colors.warning}` | Đồng hồ có mũi tên | “Cần chạy lại” |

Không được dùng xanh lục để biểu đạt đồng thời “CO₂ cao”, “đã xác nhận” và “phương án được chọn” nếu thiếu nhãn. Trên biểu đồ, mọi series phải có tên, ký hiệu hoặc pattern; đường ngưỡng dùng `{components.chart-with-data-table.target-line}` và nhãn số.

### Tương phản

- **[ASSUMPTION D-A6]** Văn bản thường và placeholder có ý nghĩa phải đạt WCAG 2.2 AA; chỉ báo focus và đường biên của thành phần điều khiển thiết yếu phải có tỷ lệ tương phản tối thiểu 3:1 với nền kề.
- Màu nhạt chỉ dùng làm nền; văn bản luôn dùng token foreground tương phản.
- Focus không xóa outline nếu chưa có thay thế đạt chuẩn; dùng `{elevation.focus-ring}` hoặc đường viền `{colors.focus}` đặc, không giảm opacity.
- Nội dung trong PDF và biểu đồ có phiên bản dữ liệu dạng bảng hoặc danh sách.
- Trạng thái disabled không được là cách duy nhất giải thích vì sao hành động bị chặn.

## Typography

**[ASSUMPTION D-A4]** Dùng Inter hoặc system sans tương đương để hỗ trợ tiếng Việt và dữ liệu dày. Không dùng font trang trí.

- Tiêu đề trang: `{typography.display}`; chỉ một tiêu đề cấp trang.
- Tiêu đề nhóm: `{typography.heading-lg}` hoặc `{typography.heading-md}`.
- Tên trường, nhãn cột và nút: `{typography.label}`.
- Nội dung mặc định: `{typography.body}`; nội dung siêu dữ liệu dày đặc dùng `{typography.body-compact}`.
- Số liệu dùng `{typography.number}` với `tabular-nums`; mã trường, mã lần chạy và công thức dùng `{typography.code}`.
- Đơn vị và kỳ phải nằm cùng cụm thị giác với con số, ví dụ `12,4 tỷ VND · Tháng 12` hoặc `18.200 tCO₂e/năm`.
- Không giảm chữ dưới 12px. Không dùng viết hoa toàn bộ cho câu hoặc cảnh báo dài.

## Layout & Spacing

### Khung ứng dụng

- Desktop: app shell gồm thanh điều hướng Hồ sơ rộng `{spacing.sidebar-width}`, vùng nội dung linh hoạt và panel ngữ cảnh tối đa `{spacing.context-panel-width}` khi cần Provenance hoặc giải thích.
- Nội dung tối đa `{spacing.content-max-width}`; trang dữ liệu cho phép rộng hơn trang đọc.
- Grid desktop 12 cột, gutter 24px; tablet 8 cột; điện thoại 4 cột.
- Khoảng cách trang dùng `{spacing.page-desktop}`, `{spacing.page-tablet}` và `{spacing.page-mobile}`.
- Mỗi màn hình chỉ có một vùng hành động chính cố định; không lặp cùng CTA ở đầu và cuối mà không đồng bộ trạng thái.

### Mật độ

- Form quyết định dùng khoảng cách `{spacing.lg}` giữa các trường; bảng dữ liệu dùng hàng `{spacing.data-row-height}`.
- Nhóm nội dung liên quan cách nhau `{spacing.xl}`; section cấp trang cách nhau `{spacing.section}`.
- Bảng 12 tháng và bảng so sánh được cuộn ngang khi cần, với cột khóa định danh cố định. Không bóp cột đến mức mất đơn vị hoặc kỳ.
- Hai cột PDF–dữ liệu chỉ là cách bố trí desktop; quan hệ Provenance phải tồn tại khi chuyển sang một cột.

## Elevation & Depth

- Dùng đường viền `{colors.outline}` và phân lớp bề mặt trước khi dùng bóng.
- Card thông thường dùng `{elevation.surface}`; menu, popover và sticky action bar dùng `{elevation.raised}`; dialog dùng `{elevation.overlay}`.
- Không dùng card lồng quá hai cấp. Nội dung phân cấp sâu chuyển sang section, tab hoặc panel.
- Thanh trạng thái Hồ sơ dùng nền bề mặt và viền dưới; không nổi như quảng cáo.
- Panel PDF và panel giải thích có thể sticky trên desktop nhưng không che focus, lỗi hoặc hành động hoàn tất.

## Shapes

- Bán kính mặc định `{rounded.default}` tạo cảm giác công cụ chuyên nghiệp, không quá mềm.
- Input, button và cell-edit dùng `{rounded.sm}` đến `{rounded.default}`.
- Card và panel dùng `{rounded.md}`; dialog lớn tối đa `{rounded.lg}`.
- Pill `{rounded.full}` chỉ dành cho badge trạng thái ngắn; không đặt đoạn cảnh báo dài trong pill.
- Biểu tượng dùng nét đơn giản 1.5–2px, không dùng icon màu như tín hiệu duy nhất.

## Components

Đây là registry component chuẩn dùng chung với `EXPERIENCE.md` → **Component Patterns**. Mỗi object `components.<key>` trong frontmatter mang `id` tương ứng, tạo ánh xạ máy đọc được từ YAML path sang CMP-ID. ID và tên phải được giữ nguyên trong code, story và test; bảng này sở hữu visual anatomy, còn bảng bên kia sở hữu hành vi.

| ID | Component chuẩn | Visual contract |
|---|---|---|
| CMP-01 | App shell | Sidebar `{spacing.sidebar-width}`, panel ngữ cảnh tối đa `{spacing.context-panel-width}`, bề mặt sáng có viền `{colors.outline}`; thanh Hồ sơ luôn giữ chỗ cho tên, phiên bản và trạng thái. |
| CMP-02 | Process navigation | Mục hiện hành dùng `{colors.primary-subtle}`, thanh `{colors.primary}` và chữ đậm; icon, nhãn và trạng thái có cột ổn định. |
| CMP-03 | Evidence rail | Năm chặng **Giá trị → Nguồn → Xác nhận → Phiên bản → Tác động đến lần chạy**; desktop một hàng, tablet/màn hẹp xếp tuần tự; chặng hiện hành dùng `{colors.focus}` và nhãn chữ. |
| CMP-04 | Readiness row | Năm vùng ổn định: đối tượng, người phụ trách, trạng thái, lỗi chặn và hành động; tài chính và CO₂ dùng nhóm riêng, không gộp thành một badge. |
| CMP-05 | Source-linked field | Mã, giá trị gốc/chuẩn hóa, đơn vị-kỳ-phạm vi, Confidence, trạng thái và “Mở nguồn”; trường và bounding box cùng dùng `{colors.focus}`. |
| CMP-06 | PDF provenance viewer | Header tên tệp/trang, vùng tài liệu, bounding box và metadata nguồn; bề mặt/viền lần lượt `{colors.surface}`/`{colors.outline}`. |
| CMP-07 | Editable data table | Hàng `{spacing.data-row-height}`; input có label cố định, số tabular, tổng/read-only dùng `{colors.surface-subtle}`; `null`, `0`, `N/A` khác nhau bằng chữ. |
| CMP-08 | Formula disclosure | Panel nền `{colors.surface-subtle}` nêu công thức, thành phần, đơn vị, kỳ và nguồn; output tính toán không có affordance sửa. |
| CMP-09 | Review panel | Các vùng phạm vi, thay đổi, cảnh báo, tác động và hành động; CTA dùng động từ + đối tượng, focus theo `{elevation.focus-ring}`. |
| CMP-10 | Scenario selector | Ba lựa chọn Thấp/Cơ sở/Cao; lựa chọn hiện hành có radio, viền `{colors.primary}` và nền `{colors.primary-subtle}`. |
| CMP-11 | Project eligibility row | Tách ba trạng thái tài chính, CO₂ và rủi ro; mỗi lỗi chặn có nhãn và liên kết, không dựa vào màu. |
| CMP-12 | Project portfolio control | Hành động thêm/sao chép/bật-tắt/sắp xếp có target `{spacing.touch-target-min}`; không dùng drag-and-drop làm cách duy nhất. |
| CMP-13 | Emissions evidence form | Nhóm trường theo baseline, Scope, hệ số, phương pháp, kỳ, độ chắc chắn và loại nguồn; accent `{colors.carbon}` chỉ đánh dấu miền dữ liệu. |
| CMP-14 | Risk rubric | Năm chiều 0–2, mỗi hàng có điểm, lý do và nguồn; accent `{colors.risk}` không biến tổng điểm thành gauge/xác suất. |
| CMP-15 | Strategy selector | Card nêu thứ tự mục tiêu, ràng buộc và trạng thái dữ liệu; lựa chọn hiện hành có radio + nhãn “Đang chọn”, không có slider trọng số. |
| CMP-16 | Run contract review | Các khối phiên bản, Kịch bản, Gói vay, ngưỡng, Dự án đủ điều kiện và dữ liệu mô phỏng trên `{colors.surface}`. |
| CMP-17 | Async task status | Tiến trình có mã tác vụ, nhãn giai đoạn và trạng thái chữ; nền info/success/error dùng token subtle tương ứng. |
| CMP-18 | Status badge and banner | Badge dùng `components.status-badge-and-banner.badge` và chỉ cho trạng thái ngắn; banner dùng nhánh `.banner` theo cấu trúc sự cố → tác động → hành động; watermark không thay nhãn chữ. |
| CMP-19 | Solver status banner | Trạng thái bộ giải nằm trước KPI; Tối ưu đã kiểm chứng / Vô nghiệm / Khả thi chưa chứng minh tối ưu / Không vượt Bộ kiểm tra nghiệm có icon, tiêu đề và màu riêng. |
| CMP-20 | Constraint diagnostic | Bảng mã, thực tế, ngưỡng, độ dư/thiếu và hành động trực tiếp; lỗi dùng `{colors.error}` nhưng số và nhãn vẫn tự đủ nghĩa. |
| CMP-21 | Result metric group | Tách vòng đời, 12 tháng, vốn-nợ, phát thải và rủi ro; mọi số có đơn vị, kỳ, phiên bản và trạng thái. |
| CMP-22 | Project explanation | Hàng Dự án chọn/loại hiển thị nguồn vốn, đóng góp, tác động hoặc ít nhất một lý do mô hình; metadata dùng `{colors.on-surface-muted}`. |
| CMP-23 | Version-safe comparison | Cột là Chiến lược/lần chạy; hàng nhãn khóa; cột hiện hành dùng `{colors.primary-subtle}`; chênh lệch có dấu, đơn vị và mô tả. |
| CMP-24 | Chart with data table | Chỉ dùng cho xu hướng/so sánh; line chart có đường ngưỡng, stacked bar có số tuyệt đối + phần trăm, luôn có bảng dữ liệu; cấm pie/radar. |
| CMP-25 | Export preview dialog | Dialog `{rounded.lg}`/`{elevation.overlay}` liệt kê phạm vi, watermark, người xác nhận, giới hạn, tên tệp và footer hủy/xuất. |
| CMP-26 | Audit timeline | Timeline có người, thời gian, đối tượng, phiên bản và deep-link; đường `{colors.outline}`, sự kiện kiểm chứng dùng `{colors.verified}` + nhãn. |
| CMP-27 | Data management action | Xóa/từ chối dùng `{colors.error}` ở bước xem lại, không là mặc định; focus rõ và không lộ dữ liệu nhạy cảm trong chrome hệ điều hành. |
| CMP-28 | Empty/loading/error state | Empty nêu giá trị bước kế tiếp; skeleton phản ánh bố cục; spinner có nhãn; lỗi kỹ thuật, Vô nghiệm và Không vượt kiểm tra có treatment khác nhau. |

### Visual references

- [S03 — Tổng quan & mức sẵn sàng](./mockups/key-overview.html)
- [S05 — Đối chiếu 12 Trường BCTC, desktop và tablet](./mockups/key-bctc-reconciliation.html)
- [S12/S14 — Hợp đồng lần chạy và chẩn đoán Vô nghiệm](./mockups/key-run-diagnostic.html)
- [S15/S16/S18 — So sánh Phương án và xem trước Gói bằng chứng](./mockups/key-results-export.html)

Các tệp trên minh họa cách áp dụng token và component, không tạo thêm yêu cầu. Nếu có xung đột, `DESIGN.md` và `EXPERIENCE.md` luôn được ưu tiên.

## Do’s and Don’ts

| Làm | Không làm |
|---|---|
| Gắn nguồn, phiên bản, người xác nhận và trạng thái với số liệu. | Hiển thị một con số “sạch” nhưng không cho biết nguồn hoặc kỳ. |
| Giữ NPV, CO₂, thanh khoản, DSCR, nợ, chi phí và rủi ro thành các nhóm riêng. | Gom các đại lượng thành một điểm FinESG tổng hợp. |
| Dùng xanh lục có kiểm soát cho CO₂/đã xác nhận, kèm nhãn. | Biến toàn bộ sản phẩm thành giao diện xanh lá mang tính “greenwashing”. |
| Hiển thị giới hạn 12 tháng ngay cạnh chỉ tiêu và Dự án liên quan. | Giấu CapEx sau tháng 12 trong chú thích cuối trang. |
| Dùng bảng, trend line và con số có đơn vị cho quyết định. | Dùng gauge, radar hoặc pie chart để tạo ấn tượng mà khó kiểm chứng. |
| Giữ kết quả lỗi thời để truy vết và đánh dấu “Cần chạy lại”. | Xóa kết quả cũ hoặc tiếp tục trình bày như hiện hành. |
| Cho phép mở nguồn, công thức và lý do tại đúng ngữ cảnh. | Dồn toàn bộ giải thích vào một trang “chi tiết” tách rời. |
| Dùng trạng thái, icon, text và focus rõ ràng. | Dựa vào màu, hover hoặc bố cục hai cột để truyền tải ý nghĩa. |

## Assumptions to Confirm

Decision Gates D-A1 đến D-A6 là sổ đăng ký quyết định/giả định duy nhất của `DESIGN.md`. Gate có nhãn `[DECIDED]` là invariant hiện hành; gate còn `[ASSUMPTION]` dùng token mặc định có thể thay thế và mọi mockup/mã giao diện phải tham chiếu ID trong ghi chú bàn giao.
