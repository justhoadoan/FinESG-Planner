# Phân loại mức trực quan hóa bề mặt

Trạng thái hiện tại: Bộ key-screen tối thiểu đã hoàn tất và qua kiểm tra render trình duyệt ngày 2026-07-29.

| Nhóm bề mặt | Mức hiện tại | Quyết định |
|---|---|---|
| S01–S02 Hồ sơ | Spine-only | Đủ để triển khai P0; không cần mock trước |
| S03 Tổng quan & readiness | Mocked | `mockups/key-overview.html`; khóa mental model hai trục sẵn sàng và hành động kế tiếp |
| S04 Tiếp nhận BCTC | Spine-only | Có thể kế thừa pattern upload/job status |
| S05 Đối chiếu BCTC | Mocked | `mockups/key-bctc-reconciliation.html`; có desktop 1440 px và tablet 900 px |
| S06–S07 Kịch bản & tài trợ | Spine-only | Nên có layout reference cho bảng 12 tháng và Gói vay |
| S08–S11 Dự án/CO₂/rủi ro | Spine-only | Nên có layout reference cho workspace một Dự án |
| S12–S14 Chạy/chẩn đoán | Mocked | `mockups/key-run-diagnostic.html`; gồm S12 và trạng thái thay thế S14 |
| S15–S16 Kết quả/so sánh | Mocked | `mockups/key-results-export.html`; so sánh cùng phiên bản, giải thích và ràng buộc gần ngưỡng |
| S17 Độ nhạy | Spine-only, P1 | Trì hoãn |
| S18–S19 Xuất/lịch sử | S18 mocked; S19 spine-only | S18 nằm trong `mockups/key-results-export.html`; S19 kế thừa timeline và hợp đồng Audit Trail |

Gói key-screen đã tạo:

1. S03 — Tổng quan & mức sẵn sàng.
2. S05 — Đối chiếu 12 Trường BCTC với PDF, desktop và tablet.
3. S12/S14 — Hợp đồng lần chạy và chẩn đoán Vô nghiệm.
4. S15/S16/S18 — So sánh, chọn Phương án và xem trước xuất.

Các bề mặt spine-only không bị xem là thiếu phạm vi. Chúng phải kế thừa đúng component, state và interaction contract trong `DESIGN.md`/`EXPERIENCE.md`; hai spine luôn thắng nếu mockup có xung đột.
