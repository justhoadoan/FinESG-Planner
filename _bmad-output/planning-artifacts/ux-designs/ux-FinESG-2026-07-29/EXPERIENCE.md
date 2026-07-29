---
name: "FinESG Planner"
title: "FinESG Planner — Experience Specification"
document: "EXPERIENCE"
status: final
version: "1.0"
created: 2026-07-29
updated: 2026-07-29
language: vi
sources:
  - ../../prds/prd-FinESG-2026-07-29/prd.md
form_factor: responsive_web
primary_platform: desktop
secondary_platform: tablet
mobile_posture: full_functionality_via_reflow
personas:
  - CFO / Trưởng phòng Tài chính
  - Kế toán trưởng / Kế toán tài chính
  - Người phụ trách ESG / MRV
  - Ban điều hành
---

# FinESG Planner — Experience Spine

> Tài liệu này sở hữu câu trả lời cho “sản phẩm hoạt động như thế nào”. Nhận diện, token và cách biểu đạt thị giác thuộc [DESIGN.md](./DESIGN.md). PRD là nguồn của phạm vi và hợp đồng nghiệp vụ; `EXPERIENCE.md` chuyển các yêu cầu đó thành bề mặt, trạng thái và hành vi có thể triển khai.

## Foundation

FinESG Planner là công cụ hỗ trợ **sàng lọc sơ bộ** danh mục CapEx xanh cho doanh nghiệp xi măng và thép Việt Nam có quan hệ thương mại với EU. Sản phẩm không phê duyệt đầu tư, không cấp tín dụng, không kiểm toán và không chứng nhận ESG.

Hợp đồng áp dụng cho web thích ứng: desktop là nền tảng chính, tablet là nền tảng phụ và màn hình hẹp giữ đầy đủ chức năng bằng cách sắp xếp lại bố cục. Không dùng chiều rộng CSS viewport để suy ra chế độ “điện thoại chỉ đọc”, vì zoom có thể làm giảm chiều rộng hiệu dụng. Hệ thống UI **không phụ thuộc thư viện**: không hành vi nào mặc nhiên kế thừa từ shadcn/ui hoặc thư viện khác. [DESIGN.md](./DESIGN.md) sở hữu nhận diện và token thị giác; tài liệu này sở hữu hành vi, trạng thái, thao tác bàn phím và các yêu cầu accessibility mà mọi thư viện triển khai phải giữ nguyên.

Các invariant hành vi chịu tải dùng token từ `DESIGN.md`: focus `{colors.focus}`/`{elevation.focus-ring}`, target `{spacing.touch-target-min}`, lỗi `{colors.error}` và trạng thái đã kiểm chứng `{colors.verified}`. Nếu tên/path token đổi, cả hai spine phải đổi trong cùng phiên bản.

### Chỉ mục thẩm quyền và truy vết

| Chủ đề / ID | Nguồn chuẩn | Nơi sử dụng |
|---|---|---|
| Phạm vi, nghiệp vụ, FR/NFR và schema dữ liệu | [PRD](../../prds/prd-FinESG-2026-07-29/prd.md) | Architecture, epic/story, API, data model, test |
| Token, visual anatomy và `CMP-01`–`CMP-28` | [DESIGN.md](./DESIGN.md) → frontmatter, **Components** | UI implementation, visual QA |
| Bề mặt `S01`–`S19`, hành vi, trạng thái, quyền và flow `UJ/OF/QA` | Tài liệu này → **Information Architecture**, **State Patterns**, **Key Flows** | Architecture, story, interaction test |
| Trường nhập và Gói bằng chứng | PRD sở hữu schema; tài liệu này → **Input Field Contracts**, **Evidence Package Contract** sở hữu cách hiển thị và tương tác | Form, validation, export |
| Decision Gate `X-A1`–`X-A8` | Tài liệu này → **Decision Gates** | Product/UX/technical decisions |
| Acceptance `AC-01`–`AC-19` | Tài liệu này → **UX Acceptance Checks** | Story acceptance criteria, E2E, accessibility QA |
| Mockup tham chiếu | Bốn tệp trong `./mockups/`; chỉ minh họa contract của hai spine | Review và visual regression, không tạo requirement mới |

Trải nghiệm được tổ chức quanh chuỗi kiểm soát:

`BCTC → Provenance → con người xác nhận → giả định tương lai có nhãn → tối ưu theo ràng buộc → Bộ kiểm tra nghiệm → Gói bằng chứng`

### Nguyên tắc trải nghiệm

1. **Nguồn trước kết quả.** Mọi số liệu quan trọng phải mở được Provenance, phiên bản và người xác nhận.
2. **Xác nhận là hành động riêng.** Lưu nháp, import hoặc OCR không bao giờ đồng nghĩa với xác nhận nghiệp vụ.
3. **Tiến dần theo mức sẵn sàng.** CFO không phải nhập toàn bộ dữ liệu tương lai ngay từ đầu.
4. **Không che điều kiện.** Kỳ, đơn vị, phạm vi, ngưỡng và giới hạn 12 tháng luôn ở gần số liệu.
5. **Không tự nới ràng buộc.** Vô nghiệm dẫn tới chẩn đoán và deep-link; chỉ người dùng được sửa đầu vào.
6. **Không có điểm tổng hợp mờ.** NPV, CO₂, tiền mặt, CFADS, DSCR, nợ, chi phí tài trợ và rủi ro hiển thị riêng.
7. **Kết quả chỉ hiện hành khi còn đúng phiên bản.** Thay đổi đầu vào làm kết quả phụ thuộc chuyển sang “Cần chạy lại”.

### Mô hình nhập liệu tăng dần

Người dùng không chọn một “chế độ” vĩnh viễn. Hệ thống tự tính mức sẵn sàng và mở đúng hành động:

- **Sàng lọc mô phỏng:** cần đủ 12 Trường BCTC đã xác nhận và dữ liệu Dự án tối thiểu; các giá trị mẫu phải giữ nhãn Ước tính, còn lần chạy, kết quả và báo cáo phải mang nhãn hoặc watermark Mô phỏng.
- **Phân tích tài chính 12 tháng:** chỉ mở khi CFO xác nhận dòng tiền kinh doanh, nghĩa vụ nợ hiện hữu, Gói vay mới, CapEx theo tháng, dòng tiền năm đầu, tỷ lệ chiết khấu và các ngưỡng liên quan.
- **Sẵn sàng quyết định** là trạng thái Hồ sơ để chọn/xuất, không phải loại đầu ra thứ ba; trạng thái này cần thêm CO₂ đủ điều kiện đã xác nhận và kết quả Tối ưu đã kiểm chứng.

**[ASSUMPTION X-A5]** Khi tạo Hồ sơ, CFO có thể chọn “Mục tiêu hiện tại” để sắp xếp checklist: `Sàng lọc nhanh` hoặc `Chuẩn bị phân tích 12 tháng`. Lựa chọn này chỉ thay đổi hướng dẫn, không thay đổi công thức, cổng chặn hoặc nhãn kết quả.

### Vai trò và quyền quyết định trong MVP

| Vai trò | Trách nhiệm UX | Hành động có hậu quả |
|---|---|---|
| Minh — CFO | Cấu hình Kịch bản, Gói vay, Chiến lược và ngưỡng; xem kết quả | Xác nhận giả định tương lai, chọn Phương án cuối, xuất Gói bằng chứng |
| Lan — Kế toán trưởng | Đối chiếu dữ liệu lịch sử với PDF | Xác nhận 12 Trường BCTC và khóa phiên bản dữ liệu cơ sở |
| Thảo — ESG/MRV | Kiểm tra Phiếu bằng chứng phát thải và rủi ro | Xác nhận CO₂ đủ điều kiện, ghi cờ đỏ hoặc từ chối bằng chứng |
| Ban điều hành | Đọc, phản biện, truy nguồn | Không có hành động phê duyệt pháp lý trong MVP |

MVP ghi nhận danh tính và trách nhiệm nhưng chưa tuyên bố có chữ ký số, SSO hoặc RBAC doanh nghiệp đầy đủ.

### Decision Gates

Các gate sau gồm quyết định UX đã khóa và giả định còn cần chủ sản phẩm/kỹ thuật xác nhận.

| ID | Quyết định hoặc giả định | Chủ quyết định | Hạn chốt | Bề mặt ảnh hưởng |
|---|---|---|---|---|
| X-A1 | **[DECIDED 2026-07-29]** Viewport hẹp giữ đủ chức năng qua reflow; không suy “điện thoại” từ CSS width/zoom | UX accessibility contract | Áp dụng ngay | S01–S19 |
| X-A2 | Tự lưu Nháp sau 800 ms; xác nhận luôn thủ công | Trưởng nhóm kỹ thuật + UX | Trước khi dựng nền tảng form | S02, S05–S11 |
| X-A3 | P0 chỉ thông báo tác vụ trong ứng dụng | Chủ sản phẩm | Trước khi triển khai tác vụ bất đồng bộ | S04, S13, S18 |
| X-A4 | Bảng QA là artifact nội bộ, không phải điều hướng P0 | Chủ sản phẩm + Trưởng nhóm QA | Trước khi khóa backlog sprint | QA nội bộ |
| X-A5 | “Mục tiêu hiện tại” chỉ ưu tiên checklist | Chủ sản phẩm + UX | Trước khi dựng S02 | S02–S03 |
| X-A6 | WCAG 2.2 AA là chuẩn nghiệm thu P0 | Chủ sản phẩm + Trưởng nhóm QA | Trước khi viết test UI | Tất cả P0 |
| X-A7 | Chrome và Edge hiện hành là ma trận trình duyệt P0 | Trưởng nhóm kỹ thuật + Trưởng nhóm QA | Trước kiểm thử hệ thống | Tất cả P0 |
| X-A8 | Tác vụ bất đồng bộ phục hồi trạng thái sau điều hướng/mất kết nối | Trưởng nhóm kỹ thuật | Trước khi dựng API tác vụ | S04, S13, S18 |

## Information Architecture

### Cấu trúc điều hướng

```text
Hồ sơ phân tích
└── Hồ sơ đang mở
    ├── Tổng quan
    ├── BCTC
    ├── Kịch bản & tài trợ
    ├── Dự án
    ├── Tối ưu
    ├── Kết quả
    └── Bằng chứng & lịch sử
```

- Cấp sản phẩm chỉ có Danh sách Hồ sơ và các thao tác tạo, đổi tên, mở, sao chép và xóa.
- Trong Hồ sơ, sidebar phản ánh thứ tự công việc nhưng không ép wizard tuyến tính; người dùng được quay lại mọi bước.
- Thanh trạng thái Hồ sơ xuất hiện trên mọi bề mặt, gồm phiên bản đầu vào, mức sẵn sàng, số cảnh báo chặn và trạng thái lỗi thời.
- Deep-link từ lỗi, ràng buộc hoặc giải thích phải mở đúng đối tượng, tab, trường và phiên bản.
- Modal stack tối đa một cấp. Dữ liệu phức tạp dùng trang, panel hoặc drawer thay vì dialog lồng nhau.

### Bản đồ bề mặt

| Mã | Bề mặt | Điểm vào | Kết quả chính | Pha |
|---|---|---|---|---|
| S01 | Danh sách Hồ sơ | Mở ứng dụng | Tạo, đổi tên, mở, sao chép và xóa Hồ sơ | P0 |
| S02 | Tạo/Sửa Hồ sơ | CTA tạo hoặc metadata Hồ sơ | Doanh nghiệp, ngành, ngày gốc, kỳ, phạm vi, tiền tệ | P0 |
| S03 | Tổng quan & mức sẵn sàng | Mở Hồ sơ | Checklist, mức đầu ra, trách nhiệm và hành động kế tiếp | P0 |
| S04 | Tiếp nhận BCTC | BCTC | Tải PDF, theo dõi parser/OCR, quản lý phiên bản tài liệu | P0 |
| S05 | Không gian đối chiếu BCTC | Tệp đã xử lý | 12 trường đặt cạnh nguồn, sửa và xác nhận | P0 |
| S06 | Kịch bản & giả định 12 tháng | Kịch bản & tài trợ | Bảng 12 tháng, ngưỡng, nguồn và công thức | P0 |
| S07 | Gói vay | Kịch bản & tài trợ | 1–3 gói, lịch giải ngân/trả nợ và điều kiện | P0 |
| S08 | Danh mục Dự án | Dự án | Tạo, sửa, sao chép, bật/tắt, sắp xếp tối đa 10 Dự án | P0 |
| S09 | Tài chính Dự án | Chọn Dự án | CapEx, dòng tiền, NPV hệ thống tính, giới hạn 12 tháng | P0 |
| S10 | Phiếu bằng chứng phát thải | Chọn Dự án | CO₂, Scope, nguồn, phương pháp, kỳ, chồng lấn và xác nhận | P0 |
| S11 | Rủi ro & quan hệ Dự án | Chọn Dự án | Rubric năm chiều, cờ đỏ, phụ thuộc và loại trừ | P0 |
| S12 | Cấu hình lần chạy | Tối ưu | Chọn Kịch bản, Chiến lược, Gói vay, ngưỡng và xem hợp đồng | P0 |
| S13 | Trạng thái lần chạy | Gửi S12 | Tiến trình các tầng mục tiêu và Bộ kiểm tra nghiệm | P0 |
| S14 | Chẩn đoán Vô nghiệm/sự cố | S13 hoặc Kết quả | Ràng buộc nghẽn, giá trị/ngưỡng/slack và deep-link sửa | P0 |
| S15 | Chi tiết Phương án | Lần chạy hợp lệ | Danh mục, cơ cấu vốn, chỉ tiêu và lý do chọn/loại | P0 |
| S16 | So sánh Chiến lược | Có các lần chạy cùng phiên bản | So sánh ba Chiến lược, nhận biết nghiệm trùng | P0 |
| S17 | So sánh lần chạy/độ nhạy | Chi tiết hoặc lịch sử | Chênh lệch Kịch bản/giả định | P1 |
| S18 | Chọn & xuất | Phương án đủ điều kiện hoặc kết quả chẩn đoán | Xuất Gói bằng chứng hoặc Báo cáo chẩn đoán có watermark | P0 |
| S19 | Phiên bản & Audit Trail | Bằng chứng & lịch sử | Truy ngược ai đổi/xác nhận gì và tác động | P0 |

**[ASSUMPTION X-A4] Khép kín bề mặt:** Manifest dữ liệu thử nghiệm và báo cáo chất lượng trích xuất không nằm trong điều hướng người dùng P0. P0 giao chúng dưới dạng artifact QA nội bộ; dashboard chỉ vào P1 sau khi xác định persona vận hành và quyền truy cập.

### Điều hướng theo viewport

- Desktop: sidebar cố định; breadcrumb chỉ dùng cho cấp Hồ sơ → Dự án/lần chạy.
- Tablet: sidebar thu gọn; nội dung nguồn hoặc giải thích mở trong panel toàn chiều cao.
- Màn hình hẹp/zoom cao: giữ đầy đủ chức năng bằng reflow một cột; panel nguồn/giải thích mở tuần tự và trả focus về trigger.

## Delivery Scope

PRD là nguồn duy nhất của phạm vi P0/P1. Phần này chỉ map phạm vi đó sang bề mặt/handoff UX; nếu nội dung thay đổi, cập nhật PRD trước rồi cập nhật mapping trong cùng phiên bản.

### P0 không được cắt

- S01–S16, S18–S19 và sáu hành trình end-to-end.
- Provenance + human review cho đúng 12 Trường BCTC, gồm xác nhận từng trường hoặc toàn bộ.
- Mô hình nhập liệu tăng dần và nhãn Sàng lọc mô phỏng.
- Cổng CO₂ đã xác nhận, ba Chiến lược lexicographic và Bộ kiểm tra nghiệm.
- Các trạng thái Vô nghiệm, Khả thi chưa chứng minh tối ưu, Lỗi, Không bị chặn (Unbounded) và Không vượt Bộ kiểm tra nghiệm phải được trình bày tách biệt.
- Lý do chọn/loại, cảnh báo CapEx sau tháng 12, versioning và Audit Trail.
- Gói bằng chứng PDF, Báo cáo chẩn đoán có watermark và luồng bàn phím/accessibility tối thiểu.

### Artifact QA nội bộ P0

**[ASSUMPTION X-A4]** Product/ML QA Lead sở hữu hai artifact ngoài điều hướng sản phẩm:

1. `data_inventory.csv`: URL, ngày tải, SHA-256, số trang, loại PDF, quyền sử dụng và trạng thái nhãn chuẩn.
2. `extraction_quality_report.md` hoặc `.csv`: số đúng/tổng, loại lỗi, kết quả theo trường/tài liệu/doanh nghiệp, Precision trước khi Kế toán sửa, Tỷ lệ tự xử lý, tỷ lệ Cần kiểm tra, coverage xác nhận, cỡ mẫu và tuyên bố tám BCTC chỉ là smoke test.

Artifact được tạo từ pipeline đánh giá hoặc lệnh báo cáo của dự án, lưu cùng phiên bản tập kiểm thử và được kiểm tra trong nghiệm thu FR-28/FR-29. Dashboard cho các chỉ số này không thuộc P0.

### P1

- S17 so sánh độ nhạy tự động và làm nổi chênh lệch.
- CSV/JSON cho dữ liệu sản phẩm.
- Điều hướng riêng theo vai trò.
- Dashboard chất lượng trích xuất sau khi có persona vận hành.

## Readiness, Confirmation and Version Contract

### Trạng thái đối tượng

`Nháp → Cần kiểm tra → Đã xác nhận` hoặc `Bị từ chối`

- Tự lưu/import chỉ tạo hoặc cập nhật Nháp.
- Xác nhận luôn ghi người, thời điểm, giá trị trước/sau, lý do và phiên bản.
- Sửa một đối tượng Đã xác nhận tạo phiên bản mới; không sửa đè lịch sử.
- Mọi lần chạy phụ thuộc chuyển sang **Cần chạy lại** và vẫn xem được để truy vết.

### Mức sẵn sàng Hồ sơ

| Mức | Điều kiện UX tóm tắt | Hành động được phép |
|---|---|---|
| Chưa đủ dữ liệu | Thiếu giá trị bắt buộc hoặc có Trường BCTC chưa xác nhận | Xem checklist và sửa; không chạy |
| Sẵn sàng mô phỏng | 12 Trường BCTC đã xác nhận; còn giá trị giả định hoặc dữ liệu Dự án mang nhãn Ước tính | Chạy Sàng lọc mô phỏng; lần chạy, kết quả và báo cáo có nhãn hoặc watermark Mô phỏng |
| Sẵn sàng tài chính 12 tháng | Dữ liệu tài chính lịch sử, tương lai, Gói vay và Dự án đã xác nhận | Chạy Phân tích tài chính 12 tháng |
| Sẵn sàng quyết định | Đạt mức tài chính, CO₂ đủ điều kiện đã xác nhận, kết quả Tối ưu đã kiểm chứng | Chọn Phương án cuối và xuất không có watermark mô phỏng |
| Cần chạy lại | Đầu vào/quy tắc của lần chạy đã đổi | Xem lịch sử; tạo lần chạy mới |

Sẵn sàng tài chính và sẵn sàng CO₂ là hai trục độc lập. Nếu Ngày gốc khác ngày kết thúc kỳ BCTC, Hồ sơ chỉ được phép ở mức mô phỏng.

### Trạng thái bộ giải

| Trạng thái | Cách trình bày | Quyền chọn cuối |
|---|---|---|
| Tối ưu đã kiểm chứng | “Phương án tối ưu theo Chiến lược, ngưỡng và dữ liệu đã xác nhận” | Có, nếu Hồ sơ đạt “Sẵn sàng quyết định” và các cổng chọn/xuất tại S18 đều đạt |
| Khả thi chưa chứng minh tối ưu | Nêu timeout/Khoảng cách tối ưu; watermark chẩn đoán | Không |
| Vô nghiệm | Nêu các ràng buộc có khả năng gây nghẽn; khẳng định chưa đổi ngưỡng | Không |
| Không bị chặn (Unbounded) | Không tồn tại nghiệm tối ưu hữu hạn do lỗi mô hình hoặc cấu hình; không gọi kết quả là Phương án | Không |
| Lỗi | Nêu bước thất bại, correlation ID và cách thử lại | Không |
| Không vượt Bộ kiểm tra nghiệm | Nêu vi phạm được phát hiện; không hiển thị như hợp lệ | Không |

## Optimization Transparency

### Trước khi chạy

S12 hiển thị một “Hợp đồng lần chạy” có:

- Phiên bản Bộ dữ liệu tài chính, Kịch bản, Dự án, bằng chứng CO₂, rubric và quy tắc.
- Chiến lược và thứ tự mục tiêu lexicographic.
- 1–3 Gói vay được phép.
- Ngưỡng tài chính/CO₂/rủi ro, dung sai tối ưu và giới hạn thời gian.
- Dự án bị loại trước tối ưu cùng lý do.
- Danh sách dữ liệu Ước tính/Mô phỏng và loại đầu ra sẽ nhận.

CTA phải nói rõ “Chạy sàng lọc mô phỏng” hoặc “Chạy phân tích tài chính 12 tháng”.

### Sau khi chạy

S15/S16 tách riêng:

- NPV trước tài trợ vòng đời.
- CO₂ đã xác nhận theo tCO₂e/năm vận hành đầy đủ; CO₂ 12 tháng đầu nếu có.
- Tiền mặt theo từng tháng và Tiền cuối kỳ.
- CFADS, Nghĩa vụ nợ và DSCR 12 tháng.
- Nợ cuối kỳ/Vốn chủ cơ sở.
- Vốn nội bộ, từng Gói vay, tổng vay mới và Chi phí tài trợ.
- Điểm rủi ro và cờ đỏ.
- Trạng thái bộ giải, Khoảng cách tối ưu, Bộ kiểm tra nghiệm và ràng buộc chạm ngưỡng.
- Tỷ lệ Dự án dùng dữ liệu thật, tỷ lệ dùng dữ liệu mô phỏng và số Dự án chưa có CO₂ đã xác nhận.

Giải thích Dự án được chọn nêu nguồn vốn, đóng góp và tác động ngưỡng. Dự án bị loại nêu ít nhất một lý do thuộc logic mô hình, không suy diễn nhân quả ngoài mô hình.

## Input Field Contracts

PRD FR-4 đến FR-17 là nguồn chuẩn cho tên, cardinality, công thức và validation nghiệp vụ. Các bảng dưới đây chỉ là **display-label inventory + UX delta** để thiết kế form; không được dùng độc lập để sinh schema dữ liệu. Mọi trường có metadata UI chung: đơn vị/tiền tệ, kỳ hoặc ngày hiệu lực, nguồn/ghi chú, trạng thái `Nháp · Cần kiểm tra · Đã xác nhận · Bị từ chối`, người xác nhận và thời điểm. Trường tính toán là chỉ đọc.

| Bề mặt | Requirement nguồn | UX delta do spine sở hữu |
|---|---|---|
| S05 | FR-4–FR-7 | Source-linked field, native editable table, confidence phụ, review/confirm và phân biệt `null`/`0`/`N/A`. |
| S06 | FR-8, FR-10–FR-11 | Scenario selector, bảng 12 tháng, nhãn mẫu/Ước tính, formula disclosure và cảnh báo cộng trùng. |
| S07 | FR-9, FR-11 | Tối đa ba Gói vay, lịch theo tháng, disclosure điều khoản/công thức và lý do chặn gói thứ tư. |
| S09 | FR-12, FR-17 | Nhóm vòng đời/12 tháng, output NPV chỉ đọc và cảnh báo CapEx sau tháng 12. |
| S10–S11 | FR-13–FR-16 | Emissions evidence form, cổng xác nhận CO₂, overlap treatment và Risk rubric có lý do/bằng chứng. |

### S05 — Bộ 12 Trường BCTC

| Mã | Trường | Mã | Trường |
|---|---|---|---|
| FS-01 | Tiền và tương đương tiền | FS-07 | Vốn chủ sở hữu |
| FS-02 | Tài sản ngắn hạn | FS-08 | Doanh thu thuần |
| FS-03 | Nợ ngắn hạn | FS-09 | Lợi nhuận trước thuế |
| FS-04 | Vay ngắn hạn | FS-10 | Chi phí lãi vay |
| FS-05 | Vay dài hạn | FS-11 | Lợi nhuận sau thuế |
| FS-06 | Tổng nợ phải trả | FS-12 | Lưu chuyển tiền thuần từ hoạt động kinh doanh |

UI render đúng 12 nhãn trên thành 12 Source-linked field trong native table; metadata, validation và điều kiện sử dụng lấy trực tiếp từ PRD FR-4–FR-7. Spine chỉ bổ sung thứ tự ưu tiên Cần kiểm tra, mở PDF cùng ngữ cảnh và review–correct–confirm.

### S06 — Kịch bản & giả định 12 tháng

| Nhóm hiển thị | UX treatment |
|---|---|
| Hoạt động, nợ hiện hữu, Dự án | Bảng 12 tháng có row/column headers; mỗi dòng mở Formula disclosure và trạng thái nguồn/xác nhận. |
| Nguồn nội bộ và ngưỡng | Đơn vị, kỳ và chiều bất đẳng thức luôn cạnh input; lỗi liên kết tới đúng ô. |
| Chiết khấu | Hai Source-linked field riêng; UI không gộp thành một “tỷ lệ tài chính”. |

Tên trường, công thức và validation nghiệp vụ của ba nhóm lấy từ PRD FR-8, FR-10 và FR-11.

### S07 — Gói vay

| Nhóm hiển thị | UX treatment |
|---|---|
| Điều khoản | Source-linked fields; phần trăm/giá trị tuyệt đối và tiền tệ là label cố định. |
| Giải ngân và trả nợ | Native table theo tháng; Formula disclosure mở từ tổng/read-only cell. |
| Điều kiện đủ | Danh sách Dự án/CapEx có trạng thái và deep-link; Dự án không đáp ứng điều kiện của một Gói vay chỉ bị loại khỏi Gói vay đó, không bị loại khỏi toàn bộ danh mục. |

Cardinality, field schema và validation lấy từ PRD FR-9/FR-11. UI chỉ chịu trách nhiệm giải thích lý do khi lựa chọn Gói vay bị chặn.

### S09 — Tài chính Dự án

| Nhóm hiển thị | UX treatment |
|---|---|
| CapEx vòng đời, 12 tháng và sau tháng 12 | Tách ba section; tổng tính toán chỉ đọc; cảnh báo phần ngoài kỳ xuất hiện xuyên Dự án → kết quả → preview. |
| Dòng tiền năm đầu và vòng đời | Bảng theo tháng/năm có kỳ, nguồn và disclosure chống cộng trùng ở đúng ngữ cảnh. |
| Chiết khấu và NPV | Source-linked field cho input; Formula disclosure cho NPV hệ thống tính; output không có affordance sửa. |

Field schema, công thức và cổng nghiệp vụ lấy từ PRD FR-12/FR-17; spine chỉ sở hữu grouping, disclosure và continuity của cảnh báo.

### S10 — Phiếu bằng chứng phát thải

| Nhóm hiển thị | UX treatment |
|---|---|
| Kết quả, baseline/Scope và thời gian | Section có heading; đơn vị/kỳ nằm cạnh giá trị; source mở tại chỗ. |
| Hệ số và phương pháp | Formula/source disclosure hiển thị tài liệu, phiên bản và input liên quan. |
| Chất lượng và Loại nguồn | “Ước tính” là status badge của giá trị; `Thật/Mô phỏng` là radio có label riêng, không trộn hai khái niệm. |
| Chồng lấn và xác nhận | Conflict banner mở Dự án liên quan; Review panel ghi người, lý do và phiên bản. |

Schema/cổng CO₂/rủi ro lấy từ PRD FR-13–FR-16. UI phải tách trạng thái của **giá trị CO₂** khỏi trạng thái đủ điều kiện của toàn Dự án và không tự suy diễn rule loại/gộp.

## Evidence Package Contract

PRD FR-26/FR-27 sở hữu nội dung và versioning của tệp xuất. Phần này chỉ sở hữu preview, điều kiện hành động, modal/focus và cách người dùng nhận biết hai loại đầu ra.

S18 có hai đường xuất tách biệt:

1. **Gói bằng chứng PDF:** dành cho Phương án đáp ứng các điều kiện của loại đầu ra tương ứng; bản mô phỏng giữ watermark và không được trình bày như quyết định cuối.
2. **Báo cáo chẩn đoán PDF:** cho trạng thái Khả thi chưa chứng minh tối ưu; luôn có watermark, không có hành động “Chọn Phương án cuối”. Lần chạy có trạng thái Vô nghiệm được lưu và giải thích tại S14/S19, nhưng không được trình bày như một Phương án.

Bản xem trước render đủ tám section được PRD FR-26 đánh số; không duy trì schema thứ hai trong spine:

| Section PRD | Preview treatment |
|---|---|
| 1 — Phạm vi/giới hạn | Summary + disclosure người xác nhận/loại đầu ra. |
| 2 — BCTC/Provenance | Source-linked table; mở được nguồn trước khi xuất. |
| 3 — Giả định/tài trợ/ngưỡng | Nhóm theo Kịch bản/Gói vay, kèm status/version. |
| 4 — Dự án/CO₂/rủi ro | Project explanation + status badge, không có điểm tổng hợp. |
| 5 — CapEx sau tháng 12 | Warning section luôn mở nếu có dữ liệu theo rule nguồn. |
| 6 — Chiến lược/Phương án/giải thích | Run contract + result + constraint disclosure. |
| 7 — Phiên bản/Audit Trail | Evidence rail + deep-link read-only. |
| 8 — Tuyên bố giới hạn | Section riêng, không ẩn trong footer hoặc tooltip. |

Trước khi tạo tệp, người dùng xem loại báo cáo, watermark, phạm vi dữ liệu nhạy cảm, tên tệp dự kiến và mã lần chạy. Xuất thất bại giữ nguyên cấu hình để thử lại.

## Voice and Tone

Giọng điệu chính xác, bình tĩnh, không quảng cáo và không thay người dùng ra quyết định. Câu ngắn; động từ rõ; thuật ngữ nhất quán với PRD.

| Dùng | Không dùng |
|---|---|
| “Phương án tối ưu theo Chiến lược An toàn và các ngưỡng hiện tại.” | “Đây là phương án tốt nhất.” |
| “Bộ dữ liệu đã được Lan xác nhận.” | “Dữ liệu hợp lệ.” |
| “Nghiệm đạt các ràng buộc đã cấu hình.” | “Đủ khả năng trả nợ.” |
| “Không có nghiệm với các ngưỡng hiện tại. Hệ thống chưa thay đổi ngưỡng.” | “Tối ưu thất bại — hãy giảm ngưỡng.” |
| “Confidence 82% của đề xuất trích xuất.” | “Số liệu đúng 82%.” |
| “CO₂ mô phỏng không tham gia mục tiêu chính.” | “CO₂ đã được tính.” |
| “Phần CapEx sau tháng 12 chưa được kiểm tra nguồn tài trợ.” | “Dự án đã được tài trợ đầy đủ.” |
| “Tạo lần chạy mới” | “Tiếp tục” |

Quy tắc microcopy:

- Lần đầu dùng phải mở rộng: “Giá trị hiện tại ròng (NPV)”, “Dòng tiền sẵn có để trả nợ (CFADS)” và “Hệ số khả năng trả nợ (DSCR)”.
- Cảnh báo theo cấu trúc **sự cố → tác động → hành động**.
- Nút dùng động từ + đối tượng, không dùng “OK”.
- “Ước tính”, “Mô phỏng”, “Đã xác nhận”, “Cần kiểm tra” và “Cần chạy lại” là nhãn văn bản bắt buộc.
- “Vô nghiệm” là kết quả nghiệp vụ; “Lỗi” là sự cố kỹ thuật. Không dùng chung thông điệp.

## Component Patterns

| ID | Component chuẩn | Bề mặt | Behavioral contract |
|---|---|---|---|
| CMP-01 | App shell | S01–S19 | Một `main` có tên, một `h1` cấp trang, skip link, breadcrumb `nav`, thanh Hồ sơ luôn hiển thị phiên bản/readiness/stale; không lộ dữ liệu nhạy cảm trong title/URL. |
| CMP-02 | Process navigation | S03–S19 | Link thật, focusable, có `aria-current`; trạng thái từng nhánh không tự hoàn tất chỉ vì đã mở. |
| CMP-03 | Evidence rail | S03/S05/S12/S14/S15/S16/S18 | Giữ chuỗi `Giá trị → Nguồn → Xác nhận → Phiên bản → Tác động đến lần chạy`; mỗi chặng focusable khi có đích và mở đúng đối tượng. |
| CMP-04 | Readiness row | S03 | Nêu đối tượng, owner, lỗi chặn và một hành động kế tiếp cụ thể; hành động là link/button có accessible name đầy đủ. |
| CMP-05 | Source-linked field | S05/S10 | “Mở nguồn” giữ ngữ cảnh; hỗ trợ xác nhận từng trường/đưa về Cần kiểm tra; hint và lỗi được liên kết với control bằng `aria-describedby` và `aria-errormessage`. |
| CMP-06 | PDF provenance viewer | S05 | Đồng bộ trường với trang/bounding box; luôn có mô tả text tương đương; tablet/màn hẹp mở panel tuần tự và trả focus về trường. |
| CMP-07 | Editable data table | S05/S06/S07/S09 | Dùng hợp đồng bảng nhập liệu HTML native tại **Interaction Primitives**; phân biệt trống/0/N/A, edit/view/calculated/error và giữ ngữ cảnh hàng/cột cho screen reader. |
| CMP-08 | Formula disclosure | S06/S09/S15 | Mở cấu thành, đơn vị, kỳ và nguồn; output tính toán chỉ đọc, không có affordance sửa. |
| CMP-09 | Review panel | S05/S06/S07/S10/S11/S18 | Tóm tắt phạm vi, thay đổi, cảnh báo, người xác nhận và tác động; review → correct → confirm; modal giữ focus trong lớp phủ và trả focus về phần tử kích hoạt theo hợp đồng. |
| CMP-10 | Scenario selector | S06/S12 | Native radio trong `fieldset`; Thấp/Cơ sở/Cao; bản sao giữ liên kết nguồn và liệt kê trường đã đổi. |
| CMP-11 | Project eligibility row | S08 | Tách tài chính/CO₂/rủi ro; lỗi mở đúng tab/field đang chặn. |
| CMP-12 | Project portfolio control | S08 | Tạo, sửa, sao chép, bật/tắt và sắp xếp bằng nút/bàn phím; chặn Dự án thứ 11; drag-and-drop chỉ bổ sung. |
| CMP-13 | Emissions evidence form | S10 | Dùng field contract S10; Loại nguồn chỉ Thật/Mô phỏng; Ước tính là nhãn giá trị, không phải loại nguồn. |
| CMP-14 | Risk rubric | S11 | Năm chiều 0–2; mỗi điểm có lý do/bằng chứng; tổng không diễn giải thành xác suất. |
| CMP-15 | Strategy selector | S12 | Card lựa chọn chứa native `<input type="radio">`; công bố thứ tự lexicographic, không có trọng số/slider; thay đổi cập nhật Run contract review. |
| CMP-16 | Run contract review | S12 | Trước chạy liệt kê phiên bản, Kịch bản, Gói vay, ngưỡng, Dự án đủ điều kiện và dữ liệu mô phỏng; CTA nêu đầu ra. |
| CMP-17 | Async task status | S04/S13/S18 | Một task ID cho một yêu cầu; phục hồi sau mất kết nối/điều hướng; không gửi trùng; live-region mapping theo **Tác vụ bất đồng bộ**. |
| CMP-18 | Status badge and banner | S03–S19 | Badge ngắn; banner nêu sự cố → tác động → hành động; text + icon + màu; badge không là control. |
| CMP-19 | Solver status banner | S13–S16 | Công bố đúng trạng thái bộ giải/Bộ kiểm tra nghiệm trước KPI; cập nhật nền không tự chuyển focus. |
| CMP-20 | Constraint diagnostic | S14 | Mã, thực tế, ngưỡng, slack, giải thích nếu–thì và deep-link; không có “Tự sửa”, không âm thầm nới ngưỡng. |
| CMP-21 | Result metric group | S15/S16 | Tách vòng đời/12 tháng/nợ/CO₂/rủi ro; đơn vị, kỳ, phiên bản và accessible expansion luôn đi cùng số. |
| CMP-22 | Project explanation | S15 | Dự án chọn nêu vốn/đóng góp/tác động; Dự án loại có ít nhất một lý do mô hình. |
| CMP-23 | Version-safe comparison | S16/S17 | Bảng có `caption`, column/row headers; chỉ so cùng phiên bản; khác phiên bản chuyển “So dữ liệu”; nghiệm trùng có nhãn. |
| CMP-24 | Chart with data table | S06/S15/S17 | Biểu đồ chỉ bổ trợ; luôn có bảng dữ liệu tương đương và tên series/ngưỡng không phụ thuộc màu. |
| CMP-25 | Export preview dialog | S18 | Modal dialog có tên/mô tả, initial focus, containment, `Esc`, background inert và return focus; chọn cuối và xuất là hai bước riêng. |
| CMP-26 | Audit timeline | S19 | Lọc theo đối tượng/người/lần chạy; deep-link bản lịch sử read-only; empty/load/error/permission có treatment. |
| CMP-27 | Data management action | S01/S04/S08 | Chỉ owner đủ quyền; xem hậu quả, xác nhận bằng tên, phiên bản/Audit Trail; permission-denied dùng contract State Patterns. |
| CMP-28 | Empty/loading/error state | S01–S19 | Empty nêu next step; skeleton phản ánh layout; spinner có nhãn; lỗi có safe message, recovery và correlation ID khi áp dụng. |

Visual references cho các pattern chủ chốt:

- [S03 — Tổng quan & mức sẵn sàng](./mockups/key-overview.html)
- [S05 — Đối chiếu 12 Trường BCTC, desktop và tablet](./mockups/key-bctc-reconciliation.html)
- [S12/S14 — Hợp đồng lần chạy và chẩn đoán Vô nghiệm](./mockups/key-run-diagnostic.html)
- [S15/S16/S18 — So sánh Phương án và xem trước Gói bằng chứng](./mockups/key-results-export.html)

Mockup chỉ là visual reference; các contract và trạng thái trong hai spine luôn thắng khi có xung đột.

## State Patterns

| Tình huống | Cách xử lý |
|---|---|
| Chưa có Hồ sơ | Nêu mục đích và CTA “Tạo Hồ sơ phân tích”; không hiển thị dashboard rỗng |
| Tệp đang được OCR/phân tích | Giữ tệp, báo giai đoạn và chống tải lại trùng; người dùng có thể rời trang |
| OCR lỗi | Không tạo số 0; giữ tệp và metadata; cho xử lý lại hoặc nhập/đối chiếu thủ công |
| Trường thiếu | `null` + “Cần kiểm tra”; mọi phép tính phụ thuộc bị khóa |
| Confidence thấp | Ưu tiên hàng trong hàng đợi kiểm tra; không tự coi là sai hoặc đúng |
| Giá trị Ước tính | Giữ nhãn “Ước tính” ở cấp trường/đối tượng; không tự đổi thành Đã xác nhận hoặc Mô phỏng |
| Đầu ra Mô phỏng | Giữ nhãn và watermark “Sàng lọc mô phỏng” trên lần chạy, kết quả và báo cáo |
| Số mơ hồ theo locale | Hiển thị cách hệ thống hiểu số và yêu cầu chọn trước khi lưu |
| Bản nháp mất kết nối | Server là source of truth; giữ sửa đổi chưa đồng bộ trong bộ nhớ của tab, không ghi dữ liệu nhạy cảm vào local storage, gắn “Chưa đồng bộ” và chặn xác nhận/chạy/xuất |
| Đầu vào đã xác nhận bị sửa | Tạo phiên bản mới; kết quả phụ thuộc lập tức chuyển “Cần chạy lại” |
| CO₂ chưa xác nhận | Vẫn hiển thị trong Dự án/độ nhạy với nhãn; loại khỏi mục tiêu/ràng buộc chính |
| Hai Dự án chồng lấn CO₂ | Chặn xác nhận tính đủ điều kiện cho đến khi loại trừ hoặc gộp có bằng chứng |
| Cờ đỏ rủi ro | Dự án không vào đề xuất tự động; hiển thị lý do và biện pháp xử lý |
| CapEx sau tháng 12 | Luôn hiện tỷ lệ CapEx đã kiểm tra và phần tài trợ tương lai chưa kiểm chứng |
| Nghĩa vụ nợ bằng 0 | DSCR hiển thị `N/A`; vẫn kiểm tra CFADS ≥ 0 và tiền mặt từng tháng |
| EquityBase ≤ 0 | Chặn Phân tích tài chính 12 tháng; chỉ ra FS-07 và cách kiểm tra |
| Lần chạy đang xử lý | Hiển thị tầng mục tiêu hiện tại; nút chạy bị thay bằng trạng thái, không tạo job thứ hai |
| Vô nghiệm | Giữ như một kết quả lần chạy; nêu ràng buộc nghẽn; không tự nới |
| Khả thi chưa chứng minh tối ưu | Cho xem và xuất Báo cáo chẩn đoán có watermark; cấm chọn cuối |
| Không vượt Bộ kiểm tra nghiệm | Không hiển thị số liệu như Phương án; nêu mã kiểm tra và correlation ID |
| Nghiệm trùng | Nhãn “Cùng Phương án”; Audit Trail riêng cho từng Chiến lược |
| Kết quả lỗi thời | Cho xem để truy vết; chặn chọn làm Phương án cuối và chặn xuất như một kết quả hiện hành; CTA “Tạo lần chạy mới” |
| So sánh khác phiên bản | Chặn so trực tiếp; liệt kê khác biệt dữ liệu trước |
| Xuất thất bại | Không đánh dấu hoàn tất; giữ cấu hình xuất và cho thử lại |

### Coverage theo bề mặt

| Surface | State bắt buộc | Treatment riêng |
|---|---|---|
| S01 | cold-load, empty, loading, error, permission-denied | Empty có CTA tạo Hồ sơ; lỗi/permission không lộ tên Hồ sơ không được phép xem. |
| S02 | cold-load, draft, saving, save-failed, invalid, version-conflict, permission-denied | Giữ input tại chỗ; conflict bắt buộc review trước ghi đè. |
| S03 | loading, blocked, partial, ready, stale, error | Hai trục readiness độc lập; mỗi blocked/stale row có owner và next action. |
| S04 | empty, uploading, OCR, OCR-failed, offline, duplicate, permission-denied | Giữ file + metadata an toàn; retry dùng cùng task identity. |
| S05 | loading, view, edit, dirty, invalid, `null`/`0`/`N/A`, confirming, confirmed, conflict, permission-denied | Tóm tắt lỗi → ô; PDF/source vẫn truy cập được khi không dùng split view. |
| S06 | empty, sample, estimated, dirty, saving, save-failed, invalid, confirmed, conflict | Nhãn mẫu/Ước tính không biến mất khi sao chép Kịch bản. |
| S07 | empty, draft, invalid, confirmed, expired/unsupported terms, conflict, permission-denied | Lãi suất/kỳ/lịch nợ sai phải chặn xác nhận Gói vay. |
| S08 | empty, loading, limit-reached, eligible, blocked, stale, permission-denied | Empty có CTA thêm Dự án; Dự án thứ 11 bị chặn với lý do. |
| S09 | empty, draft, invalid, calculated, confirmed, stale, conflict | Output tính toán chỉ đọc; CapEx sau tháng 12 luôn có cảnh báo. |
| S10 | empty, draft, needs-review, invalid, overlap, confirmed, rejected, permission-denied | CO₂ chưa xác nhận bị loại khỏi mục tiêu chính nhưng vẫn truy vết được. |
| S11 | empty, draft, invalid, red-flag, confirmed, permission-denied | Cờ đỏ nêu chiều, điểm, lý do và cách xử lý. |
| S12 | loading, no-eligible-project, blocked, ready, version-mismatch, permission-denied | Run contract review nêu dữ liệu bị loại và khóa CTA khi chưa đủ điều kiện. |
| S13 | queued, running, reconnecting, recovered, timeout, technical-failed, completed | Hiển thị task ID/tầng mục tiêu; không tạo job thứ hai. |
| S14 | infeasible, feasible-not-proven, failed-check, technical-error | Mỗi trạng thái có banner/deep-link khác nhau; không tự nới hoặc tự sửa. |
| S15 | empty, loading, verified, feasible-not-proven, stale, permission-denied | Chỉ “Tối ưu đã kiểm chứng” được trình bày như Phương án tối ưu. |
| S16 | fewer-than-two, comparable, identical, version-mismatch, loading, error | Khác phiên bản chuyển sang “So dữ liệu”, không tính chênh lệch Chiến lược. |
| S17 | empty, running, partial, failed, stale | P1; chạy lại giữ input version và liên kết lần chạy gốc. |
| S18 | loading, ineligible, reviewing, exporting, success, failed, permission-denied | Chọn cuối và xuất là hai hậu quả riêng; failure giữ cấu hình. |
| S19 | empty, loading, filtered-empty, error, permission-denied | Empty phân biệt “chưa có sự kiện” và “bộ lọc không có kết quả”. |

### Permission-denied contract

| Hành động | Vai trò được phép trong MVP | Treatment khi không đủ quyền |
|---|---|---|
| Xác nhận BCTC lịch sử | Kế toán trưởng/Kế toán tài chính được phân công | Control dùng `aria-disabled="true"` để vẫn khám phá được; lý do và owner cần liên hệ nằm trước control. |
| Xác nhận Kịch bản, Gói vay và ngưỡng | CFO/Trưởng phòng Tài chính của Hồ sơ | Giữ read-only value/source; không cho sửa hoặc xác nhận thay. |
| Xác nhận CO₂ và Điểm rủi ro | Người phụ trách ESG/MRV được phân công | Giữ bằng chứng ở chế độ chỉ đọc. Nếu người dùng gửi yêu cầu không đủ quyền, hiển thị alert rồi trả focus về tiêu đề lỗi. |
| Chạy tối ưu, chọn Phương án cuối, xuất | CFO/Chủ Hồ sơ | Tách từng quyền; không gộp “Chọn & xuất”. Mỗi CTA bị chặn có lý do và recovery path. |
| Xóa Hồ sơ/tài liệu/Dự án | Chỉ Chủ Hồ sơ | Không mở confirm dialog; nêu tác động, người có quyền và đường quay lại an toàn. |
| Xem Hồ sơ/Audit Trail | Thành viên được cấp quyền; Ban điều hành read-only | Nếu ngay cả sự tồn tại của đối tượng cũng là thông tin nhạy cảm, trả trang “Không tìm thấy/Không có quyền” trong shell hiện tại; không tiết lộ tên, file, số liệu, URL nội bộ hoặc metadata. |

Khi permission bị từ chối ở page load, focus đi tới `h1` của trang trạng thái; khi bị từ chối sau một hành động, thông báo assertive ngắn xuất hiện rồi focus đi tới tóm tắt lỗi. Mọi route đều có “Quay lại Hồ sơ được phép xem” hoặc “Liên hệ Chủ Hồ sơ”; không dựa vào disabled control như kênh giải thích duy nhất.

### Đồng bộ lại sau mất kết nối

Server version là source of truth. Khi mất kết nối, tab giữ draft chưa đồng bộ trong bộ nhớ và cảnh báo trước khi đóng trang; không lưu BCTC/dữ liệu Dự án vào `localStorage`/cache không mã hóa. Khi nối lại:

1. Tải version hiện hành từ server.
2. Nếu version không đổi, gửi draft với idempotency key rồi công bố “Đã đồng bộ”.
3. Nếu version đã đổi, mở review conflict theo từng trường; người dùng chọn giữ server hoặc áp dụng giá trị draft vào một phiên bản mới.
4. Không tự xác nhận, chạy hoặc xuất trong bất kỳ nhánh reconnect nào.
5. Tác vụ OCR/tối ưu/xuất được phục hồi bằng task ID phía server; nếu phục hồi thất bại, giữ cấu hình và cho thử lại với cùng idempotency key.

Mọi lỗi hiển thị cho người dùng chỉ gồm mô tả an toàn, tác động, bước khắc phục và correlation ID. Không hiển thị stack trace, câu lệnh, đường dẫn máy chủ hoặc dữ liệu nhạy cảm; chi tiết kỹ thuật chỉ được ghi trong log nội bộ.

## Interaction Primitives

### Chuột, cảm ứng và bàn phím

- Toàn bộ P0 dùng được bằng `Tab`, `Shift+Tab`, `Enter`, phím mũi tên và `Esc`.
- Bảng nhập liệu P0 dùng **native `<table>`**, không gán `role="grid"`: `caption`, `th scope="col|row"` và mỗi ô sửa có một nút “Sửa [tên trường, kỳ]”. `Tab` đi qua control; không chiếm phím mũi tên của screen reader.
- Khi kích hoạt “Sửa”, ô hiển thị một native input có accessible name từ hàng + cột + đơn vị/kỳ; `Enter` lưu nháp, `Esc` hủy và trả focus về nút sửa, `Tab` theo thứ tự DOM. Ô tính toán/read-only là text có nhãn “Chỉ đọc”, không giả làm input.
- Ô dirty công bố “Chưa đồng bộ”; ô lỗi dùng `aria-invalid="true"` và `aria-errormessage`; lỗi tổng hợp liên kết tới input. Một hàng chỉ có một edit mode tại một thời điểm.
- Không gán phím tắt một ký tự cho hành động tài chính; không có shortcut thực hiện xác nhận hoặc xuất.
- Không dùng drag-and-drop làm cách duy nhất để tải tệp, sắp xếp hoặc thiết lập quan hệ Dự án.
- Hover chỉ bổ sung thông tin; mọi hành động phải focus/tap được.

### Lưu và xác nhận

- **[ASSUMPTION X-A2]** Form tự lưu bản nháp sau 800 ms không có hoạt động nhập liệu hoặc khi trường mất focus; header hiển thị “Đang lưu…” → “Đã lưu bản nháp”.
- Autosave thất bại giữ nội dung tại chỗ và cung cấp “Thử lưu lại”; không đóng form.
- Xác nhận không bao giờ tự động. Trước xác nhận, mở một panel xem lại cho phép quay lại sửa.
- Sau xác nhận, sửa lại tạo phiên bản mới; không dùng undo để thay đổi lịch sử đã khóa.

### Validation

- Kiểm tra định dạng khi blur; kiểm tra chéo và kiểm tra readiness khi lưu/xác nhận/chạy.
- Lỗi cấp trường nằm cạnh trường và trong tóm tắt đầu trang.
- Chọn lỗi trong tóm tắt chuyển focus đúng trường; sau sửa chuyển tới lỗi kế tiếp theo thứ tự đọc.
- Required xuất hiện trong label và semantics (`required` hoặc `aria-required`); hint/lỗi gắn bằng `aria-describedby`/`aria-errormessage`.
- Khi CTA bị chặn nhưng người dùng vẫn cần khám phá lý do, dùng control có thể focus với `aria-disabled="true"` và guard phía xử lý hành động; lý do nằm trước CTA và được tham chiếu bằng `aria-describedby`. Khi không cần khám phá lý do, có thể dùng thuộc tính native `disabled`.

### Tác vụ bất đồng bộ

- OCR, tối ưu và xuất báo cáo có mã tác vụ; lần bấm lặp không tạo tác vụ mới.
- **[ASSUMPTION X-A8]** Người dùng được rời trang; khi quay lại, UI lấy trạng thái tác vụ hiện có.
- **[ASSUMPTION X-A3]** Hoàn tất hoặc thất bại được thông báo trong ứng dụng; không gửi email/push ở P0.
- Vùng tác vụ dùng `aria-busy` trong lúc xử lý. Thông báo lưu, tiến trình và hoàn tất dùng `role="status"`, `aria-live="polite"` và `aria-atomic="true"`; lỗi chặn và xung đột dùng `role="alert"` hoặc `aria-live="assertive"`. Loại bỏ thông báo trùng theo `operationId + phase` và không đọc lại sau mỗi lần poll.
- Cập nhật nền không tự di chuyển focus. Sau submit có lỗi form, focus tới tóm tắt lỗi; khi điều hướng sang trang kết quả/Vô nghiệm, focus tới `h1`, không tới banner.

### Lớp phủ và dialog

- Review/xác nhận/xuất dùng native `<dialog>` hoặc ARIA modal dialog hoàn chỉnh: `aria-labelledby`, `aria-describedby`, initial focus vào heading hoặc nút an toàn, focus containment, `Esc` đóng và trả focus về trigger.
- Nội dung nền dùng `inert` khi modal mở. Nút hủy luôn nằm trước hành động có hậu quả trong thứ tự focus; đóng dialog không làm mất draft.
- “Chọn làm Phương án cuối” và “Xuất Gói bằng chứng” là hai dialog/hậu quả riêng, mỗi thao tác có idempotency key và Audit Trail.

### Hành động nguy hiểm

- Xóa Hồ sơ tại menu S01; xóa tài liệu nguồn tại menu S04; xóa Dự án tại menu hàng S08. Chỉ chủ Hồ sơ được thao tác trong demo.
- Nếu đối tượng đã được dùng trong một lần chạy, UI giữ bản ghi tối thiểu trong Audit Trail, tạo phiên bản mới và đánh dấu kết quả phụ thuộc “Cần chạy lại”.
- Xóa, từ chối bằng chứng và xuất dữ liệu nhạy cảm có bước xem lại hậu quả; thao tác làm mất dữ liệu yêu cầu xác nhận bằng tên đối tượng.
- Không đưa tên tệp đầy đủ, số liệu tài chính hoặc tên Dự án nhạy cảm vào URL, browser title hoặc thông báo hệ điều hành.

## Accessibility Floor

**[ASSUMPTION X-A6]** Chuẩn nghiệm thu tối thiểu là **WCAG 2.2 AA** cho toàn bộ luồng P0.

- Mỗi trang dùng template: skip link → `nav` có tên → breadcrumb `nav` → một `main` có tên → một `h1` → `h2` theo section; landmark cùng loại phải có tên riêng.
- Tất cả chức năng dùng được bằng bàn phím; focus indicator đặc tương phản tối thiểu 3:1 với nền kề, không bị sticky header che và không có bẫy focus.
- Thứ tự focus theo thứ tự đọc. `Esc` đóng lớp trên cùng và trả focus về trigger.
- Mỗi input có label cố định gồm tên, đơn vị, kỳ và phạm vi; placeholder không thay label.
- Touch target P0 tối thiểu 44×44 CSS px; link inline trong câu là ngoại lệ, còn deep-link độc lập phải có hit area tương đương.
- Trạng thái dùng text + icon + màu; biểu đồ có bảng dữ liệu tương đương.
- Screen reader đọc được tiêu đề hàng/cột, tổng, trạng thái ô và lỗi trong bảng.
- Vùng PDF có tên tài liệu, trang và mô tả bounding box; người dùng không cần nhìn hai panel cạnh nhau để hiểu Provenance.
- Tăng chữ/zoom không làm mất CTA, trạng thái, nội dung hoặc quyền thao tác; kiểm thử ở mức zoom 200% và 400%, đến chiều rộng tương đương 320 CSS px. Bảng/PDF chỉ được cuộn hai chiều bên trong container có tên khi bản chất dữ liệu yêu cầu.
- Reduce Motion loại bỏ chuyển động không thiết yếu; spinner và progress vẫn có nhãn.
- Xác nhận có hậu quả tuân thủ review–correct–confirm; lưu nháp không kích hoạt xác nhận.
- Thông báo Vô nghiệm, hoàn tất job và lỗi xuất dùng live-region mapping trong **Tác vụ bất đồng bộ**; lỗi chặn sau submit chuyển focus đến tóm tắt lỗi.
- Tiếng Việt phải được kiểm thử với dấu và chuỗi dài. Lần đầu xuất hiện dùng `abbr`/text mở rộng cho NPV, CFADS, DSCR, VCS; ngày có `<time datetime>`. Tên truy cập phải diễn đạt đầy đủ các dấu `≥`, `≤`, `−`, `×`, dấu thập phân, tiền tệ và `tCO₂e/năm`, ví dụ “lớn hơn hoặc bằng một phẩy hai lăm lần”.
- Metadata có nghĩa không nhỏ hơn 12 CSS px và đạt 4.5:1; ellipsis chỉ dùng khi có disclosure focusable/tappable đọc được toàn bộ nội dung.

## Responsive & Platform

| Viewport | Hành vi |
|---|---|
| `≥1280px` | Sidebar + nội dung + panel ngữ cảnh. S05 dùng split view bảng/PDF; S15 có cột giải thích sticky. |
| `1024–1279px` | Sidebar + nội dung. PDF/giải thích mở panel phải; bảng vẫn giữ cột định danh. |
| `768–1023px` | Sidebar thành Sheet; nội dung một cột. S05 chuyển tuần tự `Trường đang xét → Mở nguồn → Quay lại trường`. Cho phép đầy đủ chỉnh sửa/xác nhận. |
| `<768px` | **[DECISION X-A1] Đầy đủ chức năng qua reflow:** shell/panel thành một cột; dialog chiếm viewport; Evidence rail xếp dọc. Chỉ bảng/PDF có bản chất hai chiều được cuộn trong container có tên, không làm toàn tài liệu overflow ngang. |

- **[ASSUMPTION X-A7]** P0 ưu tiên Chrome và Edge phiên bản hiện hành trên desktop doanh nghiệp.
- Không giả lập gesture native. Đây là responsive web, không phải ứng dụng di động.
- Kiểm thử ở mức zoom 200% và 400%, đến chiều rộng tương đương 320 CSS px; không phân loại thiết bị bằng viewport width, user-agent hoặc zoom để cắt chức năng.
- Bản in/bản PDF xuất có stylesheet riêng và không phụ thuộc theme màn hình.

## Inspiration & Anti-patterns

### Inspiration

- **Không gian đối chiếu tài liệu:** giữ trường dữ liệu và bằng chứng nguồn trong cùng ngữ cảnh, tương tự quy trình soát xét kế toán.
- **Bảng tính có kiểm soát:** giữ sự quen thuộc của hàng/cột, nhưng công khai đơn vị, công thức, nguồn và trạng thái thay vì ô “ma thuật”.
- **Version diff:** mọi thay đổi đã xác nhận có before/after, người thực hiện và tác động đến lần chạy.
- **Decision memo:** kết quả trình bày đủ để giải thích, không chỉ để gây ấn tượng trên dashboard.

### Anti-patterns bị cấm

- Một “FinESG Score” trộn NPV, CO₂ và rủi ro.
- Slider trọng số cho ba Chiến lược lexicographic.
- Nút “Tự sửa để có nghiệm” hoặc âm thầm hạ ngưỡng.
- Chat-first AI che khuất nguồn và công thức.
- Wizard khóa người dùng trong một đường đi và giấu trạng thái các bước khác.
- Dashboard dùng gauge/radar/pie làm bề mặt quyết định chính.
- Màu xanh, checkmark hoặc watermark là tín hiệu trạng thái duy nhất.
- Nút disabled không có lý do và deep-link khắc phục.
- Thông điệp “Thành công” cho kết quả chưa vượt Bộ kiểm tra nghiệm.

## Key Flows

### UJ-1. Minh, CFO, khởi tạo Hồ sơ phân tích

1. Minh mở S01 và chọn “Tạo Hồ sơ phân tích”.
2. Tại S02, anh nhập doanh nghiệp, Xi măng/Thép, ngày gốc, kỳ BCTC, phạm vi và tiền tệ.
3. Hệ thống kiểm tra ngày gốc so với ngày kết thúc BCTC dự kiến.
4. Minh chọn mục tiêu hướng dẫn “Sàng lọc nhanh” hoặc “Chuẩn bị phân tích 12 tháng”.
5. Hồ sơ mở tại S03 với checklist theo người phụ trách và hai trục sẵn sàng tài chính/CO₂.
6. **Climax:** Minh nhìn thấy chính xác dữ liệu cần để chạy mô phỏng và phần bổ sung cần để nâng lên phân tích 12 tháng — không bị buộc nhập tất cả ngay.

Ngoại lệ: Ngày gốc lệch kỳ BCTC cơ sở → banner giải thích Hồ sơ chỉ có thể ở mức mô phỏng và dẫn về siêu dữ liệu Hồ sơ.

### UJ-2. Lan, Kế toán trưởng, xác nhận Bộ dữ liệu tài chính lịch sử

1. Lan vào S04, tải PDF text-layer hoặc scan.
2. UI theo dõi tải → phân loại → OCR/phân tích → trích xuất, không tạo tác vụ lặp.
3. S05 mở với hàng đợi 12 trường; trường có mức tin cậy trích xuất thấp hoặc thiếu nguồn đứng trước.
4. Lan chọn FS-01; PDF mở đúng trang và bounding box, cùng giá trị gốc và giá trị chuẩn hóa.
5. Lan sửa nếu cần, ghi lý do và xử lý các cảnh báo đơn vị/kỳ/phạm vi.
6. Lan chọn “Xác nhận trường này”; hệ thống ghi riêng người, thời điểm, giá trị trước/sau và lý do.
7. Sau khi xử lý dần hàng đợi, Lan mở panel “Xác nhận toàn bộ 12 trường BCTC” để xem lại phạm vi còn lại.
8. **Climax:** phiên bản dữ liệu cơ sở được khóa, ghi Lan là người xác nhận và S03 chuyển sang bước tiếp theo.

Ngoại lệ: OCR lỗi hoặc trường không đọc được → tệp được giữ, trường là `null/Cần kiểm tra`; không có phép tính nào được phép sử dụng trường đó.

### UJ-3. Minh xác nhận Kịch bản và Gói vay

1. Minh mở S06, chọn Kịch bản Cơ sở có dữ liệu mẫu mang nhãn Ước tính.
2. Anh xem bảng 12 tháng và chỉ sửa các biến cần thiết: dòng tiền kinh doanh, nghĩa vụ nợ, CapEx, dòng tiền Dự án, hạn mức vốn nội bộ, ngưỡng, tỷ lệ chiết khấu NPV và tỷ lệ chiết khấu Chi phí tài trợ.
3. Với mỗi dòng tiền Dự án, anh khai báo đã nằm trong dự báo hoạt động hay chưa.
4. Minh mở S07, cấu hình 1–3 Gói vay và lịch giải ngân/trả nợ.
5. Hệ thống hiển thị công thức Cash, CFADS và DSCR, đồng thời cảnh báo cộng trùng hoặc lệch kỳ.
6. Minh xem lại và xác nhận giả định tương lai.
7. **Climax:** S03 chuyển thành “Sẵn sàng tài chính 12 tháng”, hoặc nêu đúng trường còn chặn.

Ngoại lệ: Minh chưa muốn hoàn thiện → lưu Nháp và vẫn có thể chạy Sàng lọc mô phỏng nếu đạt cổng tương ứng; nhãn mô phỏng theo suốt kết quả.

### UJ-4. Thảo, phụ trách ESG/MRV, xác nhận Dự án và CO₂

1. Thảo mở S08 và chọn một Dự án.
2. Tại S09, cô kiểm tra CapEx, dòng tiền, NPV hệ thống tính và phần CapEx sau tháng 12.
3. Tại S10, cô hoàn thiện đường cơ sở phát thải, Scope 1/2, hệ số, nguồn, phương pháp, kỳ, mức chắc chắn và Loại nguồn Thật/Mô phỏng.
4. Hệ thống phát hiện một Dự án khác có phạm vi CO₂ chồng lấn; Thảo chọn loại trừ hoặc gộp và ghi bằng chứng.
5. Tại S11, cô chấm năm chiều rủi ro 0–2, ghi lý do và xử lý cờ đỏ.
6. Thảo mở panel xem lại và xác nhận Phiếu bằng chứng phát thải.
7. **Climax:** S08 hiển thị riêng “Tài chính đủ”, “CO₂ đã xác nhận” và **[EXAMPLE]** “Rủi ro 4/10 — Trung bình”; chỉ CO₂ vừa xác nhận được phép vào mục tiêu chính.

Ngoại lệ: nguồn CO₂ không truy cập hoặc phiếu chưa xác nhận → giá trị CO₂ bị loại khỏi mục tiêu/ràng buộc chính nhưng Dự án tài chính vẫn có thể tham gia Chiến lược không cần CO₂. Cờ đỏ trọng yếu chưa xử lý → toàn bộ Dự án bị loại khỏi đề xuất tự động.

### UJ-5. Minh chạy và xử lý bài toán tối ưu

1. Minh mở S12; hệ thống chỉ ra dữ liệu đủ điều kiện và dữ liệu bị loại.
2. Anh chọn Chiến lược Cân bằng, Kịch bản Cơ sở, hai Gói vay và ngưỡng CO₂.
3. Hợp đồng lần chạy công bố thứ tự: CO₂ tối thiểu → tối đa NPV → giảm Chi phí tài trợ → giảm rủi ro.
4. Minh chọn CTA có nhãn đúng loại đầu ra.
5. S13 hiển thị từng tầng mục tiêu và bước Bộ kiểm tra nghiệm.
6. **[EXAMPLE]** Lần đầu trả Vô nghiệm; S14 liệt kê ngưỡng CO₂ và tiền mặt tháng 4 là các điểm nghẽn, có giá trị, độ dư (slack) và liên kết trực tiếp.
7. **[EXAMPLE]** Minh tự quyết định sửa tiến độ CapEx, tạo phiên bản mới rồi chạy lại.
8. **Climax:** lần chạy mới đạt “Tối ưu đã kiểm chứng”; chỉ lúc này S15 dùng cụm “Phương án tối ưu theo Chiến lược”.

Ngoại lệ: nếu hết thời gian giải, lần chạy chuyển sang trạng thái “Khả thi chưa chứng minh tối ưu”; kết quả không thể chọn cuối nhưng có thể xuất Báo cáo chẩn đoán PDF có watermark tại S18.

### UJ-6. Minh so sánh và xuất Gói bằng chứng

1. Minh chạy đủ ba Chiến lược trên cùng phiên bản.
2. S16 đặt các Phương án cạnh nhau và hiển thị trạng thái bộ giải trước mọi KPI.
3. Anh so sánh danh mục, vốn, NPV, CO₂, tiền mặt, DSCR, nợ, chi phí và rủi ro theo hàng riêng.
4. Hai Chiến lược trả cùng nghiệm; UI gắn “Cùng Phương án” nhưng giữ mã lần chạy.
5. Minh mở lý do chọn/loại từng Dự án và cảnh báo CapEx sau tháng 12.
6. Tại S18, anh chọn Phương án đủ điều kiện, xem trước phạm vi, watermark, người xác nhận, giới hạn sử dụng và tên tệp.
7. Minh xuất PDF rồi mở S19 để kiểm tra Audit Trail.
8. **Climax:** Gói bằng chứng liên kết được từ kết quả tới nguồn, giả định, phiên bản, trạng thái bộ giải, Bộ kiểm tra nghiệm và người xác nhận.

Ngoại lệ: đầu vào đổi trước khi xuất → kết quả chuyển “Cần chạy lại”; việc xuất kết quả như một kết quả hiện hành bị chặn, nhưng bản lịch sử vẫn xem được.

### OF-1 — Minh chạy lại và phân tích độ nhạy (FR-25)

1. Minh mở S17 từ một Phương án tại S15; hệ thống giữ mã lần chạy gốc và toàn bộ input version.
2. Anh chọn một giả định/biến được phép kiểm tra và khai báo các giá trị thử; UI hiển thị đơn vị, khoảng hợp lệ và giá trị baseline.
3. Run contract review liệt kê biến giữ nguyên, biến thay đổi và số lần chạy sẽ tạo; không sửa Kịch bản nguồn.
4. Minh xác nhận; từng biến thể có task ID và trạng thái riêng nhưng cùng liên kết về baseline.
5. **Failure path:** nếu baseline đã lỗi thời hoặc một giá trị ngoài miền, hệ thống không chạy, focus tới tóm tắt lỗi và cung cấp deep-link sửa/tạo baseline mới.
6. **Climax:** S17 đặt baseline và các biến thể trong Version-safe comparison, cho biết thay đổi nào đi cùng chênh lệch mà không trình bày tương quan như quan hệ nhân quả đã chứng minh.

### QA-1 — Quỳnh kiểm tra manifest và chất lượng trích xuất (FR-28, FR-29)

1. Quỳnh, Product/ML QA Lead, mở artifact QA nội bộ từ pipeline kiểm thử, không phải điều hướng người dùng P0.
2. Chị chọn một tập BCTC đã khóa; manifest hiển thị URL/nguồn, ngày tải, SHA-256, số trang, loại PDF và quyền sử dụng.
3. Báo cáo trích xuất dùng giá trị đề xuất **trước** khi Kế toán sửa, nêu số đúng/tổng, tỷ lệ tự xử lý, tỷ lệ Cần kiểm tra và kết quả theo từng trường/doanh nghiệp.
4. Quỳnh mở từng lỗi về đúng tài liệu, trang và bounding box; mọi thay đổi đối với ground truth phải tạo một phiên bản mới và một bản ghi Audit Trail.
5. **Failure path:** nếu thiếu hash, thông tin quyền sử dụng hoặc ground truth đã khóa, tập kiểm tra có trạng thái “Không hợp lệ”; hệ thống không tính/chia sẻ Precision.
6. **Climax:** Quỳnh khóa phiên bản manifest + báo cáo, ghi rõ đây là bằng chứng smoke/end-to-end hay tập đánh giá mở rộng, không dùng tám PDF để tuyên bố khả năng tổng quát hóa.

## UX Acceptance Checks

| ID | Khẳng định nghiệm thu | Nguồn contract | Ngữ cảnh |
|---|---|---|---|
| AC-01 | Hoàn thành UJ-1 đến UJ-6 chỉ bằng bàn phím. | UJ-1–UJ-6; **Interaction Primitives** | Desktop; mọi vai trò trong flow |
| AC-02 | Hoàn thành UJ-1 đến UJ-6 ở mức zoom 200% và 400%, đến chiều rộng tương đương 320 CSS px mà không mất chỉnh sửa, xác nhận, chạy, chọn cuối hoặc xuất; cuộn ngang chỉ nằm trong bảng/PDF có tên. | X-A1, X-A6; **Responsive & Platform** | Viewport hẹp/zoom |
| AC-03 | Hoàn thành S05 và bảng 12 tháng trên tablet mà không mất trường, nguồn, trạng thái hoặc dữ liệu. | S05, S06, S09; CMP-07 | Tablet |
| AC-04 | Bảng HTML native tại S05 công bố caption, tiêu đề hàng/cột và trạng thái chỉnh sửa/chỉ đọc/lỗi; dialog xem trước xuất giữ focus, đóng bằng `Esc` và trả focus về phần tử kích hoạt. | S05, S18; CMP-07, CMP-25 | Bàn phím + screen reader |
| AC-05 | Mỗi hành động bị từ chối vì thiếu quyền phải nêu vai trò hoặc owner có thể xử lý và đường khắc phục, đồng thời không tiết lộ metadata nhạy cảm; chọn cuối và xuất là hai hậu quả riêng. | **Permission-denied contract**; S16, S18; CMP-27 | Sai vai trò/thiếu quyền |
| AC-06 | Xác nhận được từng Trường BCTC và toàn bộ 12 trường; mỗi phạm vi tạo đúng Audit Trail. | S05; CMP-05, CMP-09, CMP-26 | Kế toán trưởng |
| AC-07 | Xử lý đúng `null`, `0`, N/A, số âm, đơn vị nghìn/triệu/tỷ và chuỗi dấu `.`/`,` mơ hồ. | S05–S07, S09; **Validation** | Nhập/sửa dữ liệu |
| AC-08 | Phân biệt Đã xác nhận, Ước tính, Mô phỏng và Tối ưu đã kiểm chứng bằng nhãn, icon và màu. | **State Patterns**; CMP-18, CMP-19 | Mọi bề mặt trạng thái |
| AC-09 | Sửa một giá trị Đã xác nhận làm mọi lần chạy phụ thuộc chuyển “Cần chạy lại”. | **Readiness, Confirmation and Version Contract** | Thay đổi đầu vào |
| AC-10 | Mọi CO₂ trong mục tiêu chính mở được Phiếu bằng chứng phát thải Đã xác nhận. | S10; CMP-13 | ESG/MRV |
| AC-11 | Mọi Phương án hiển thị vượt Bộ kiểm tra nghiệm; trạng thái khác không được giả dạng Phương án. | S13–S16; CMP-19 | Kết quả bộ giải |
| AC-12 | Tạo, sao chép, bật/tắt, sắp xếp tối đa 10 Dự án và chặn Dự án thứ 11 với lý do rõ. | S08; CMP-12 | CFO |
| AC-13 | Xuất được Báo cáo chẩn đoán có watermark cho Khả thi chưa chứng minh tối ưu mà không mở quyền chọn Phương án cuối. | S14; CMP-19, CMP-20 | CFO |
| AC-14 | Gói bằng chứng chứa đủ tám section và cảnh báo phần CapEx sau tháng 12. | S18; **Evidence Package Contract**; CMP-25 | Xem trước/xuất |
| AC-15 | Hai artifact QA nội bộ P0 chứa đủ schema đã nêu. | **Delivery Scope**; QA-1 | Product/ML QA |
| AC-16 | OF-1 giữ cùng baseline version cho mọi biến thể; QA-1 không tính Precision khi manifest/ground truth chưa hợp lệ. | OF-1; QA-1 | Phân tích độ nhạy/QA |
| AC-17 | Mỗi cảnh báo có sự cố, tác động, hành động và deep-link. | CMP-18, CMP-20 | Mọi vai trò |
| AC-18 | Mỗi chỉ tiêu kết quả có đơn vị/kỳ; mọi biểu đồ có bảng dữ liệu tương đương. | CMP-21, CMP-24 | Kết quả/so sánh |
| AC-19 | Ít nhất 80% người thử nghiệm hoàn tất tạo Hồ sơ → xuất Gói bằng chứng mà không cần thành viên nhóm can thiệp trực tiếp. | UJ-1–UJ-6; PRD → Success Metrics | Usability test |

## Assumptions and Open Decisions

- Decision Gates X-A1 đến X-A8 là sổ đăng ký quyết định/giả định duy nhất của `EXPERIENCE.md`; mục `[DECIDED]` là invariant hiện hành, mục còn lại phải được chủ quyết định chốt tại bảng.
- Cần khóa trong triển khai Tuần 1: rubric chi tiết/cờ đỏ cho năm chiều rủi ro, ngưỡng Confidence thấp, giá trị mẫu Kịch bản/Gói vay, giới hạn PDF và câu chữ watermark.
- Cần quyết định trước pilot: xung đột chỉnh sửa nhiều người, SSO/RBAC, lưu giữ dữ liệu, kênh thông báo ngoài ứng dụng và giao diện tối.
