# Mockup Working Brief — FinESG Planner

Nguồn: `DESIGN.md`, `EXPERIENCE.md`, `.memlog.md`. Không tạo quyết định mới; nếu khác spine thì spine được ưu tiên.

## Intent

- **Con người:** Minh (CFO), Lan (Kế toán trưởng) và Thảo (ESG/MRV) đang chuẩn bị một hồ sơ CapEx để bị phản biện bởi Ban điều hành.
- **Việc phải hoàn thành:** xác định dữ liệu nào đáng tin, điều kiện nào còn chặn, một Phương án được tạo theo Chiến lược nào và có thể truy ngược đến đâu.
- **Cảm giác:** chính xác như sổ soát xét, bình tĩnh như phòng họp tài chính, dày thông tin nhưng không gây cảm giác “trading terminal”.

## Domain exploration

1. Sổ cái và bảng cân đối.
2. Trang nguồn, bounding box và dấu vết kiểm tra.
3. Tháng kế hoạch, ngưỡng tiền mặt và nghĩa vụ nợ.
4. Ràng buộc, độ dư và trạng thái Bộ kiểm tra nghiệm.
5. Phiếu bằng chứng phát thải, Scope và hệ số phát thải.
6. Phiên bản, người xác nhận và Audit Trail.
7. Danh mục CapEx, nguồn vốn và phần tài trợ sau tháng 12.

## Color world

1. Mực xanh than của báo cáo tài chính — `{colors.primary}`.
2. Giấy trắng và xám lạnh của BCTC — `{colors.surface}`, `{colors.surface_subtle}`.
3. Xanh lục xác nhận của dấu soát xét/CO₂ — `{colors.success}`, `{colors.carbon}`.
4. Hổ phách của mục cần kiểm tra — `{colors.warning}`.
5. Tím của dữ liệu mô phỏng — `{colors.simulation}`.
6. Đỏ của ràng buộc bị vi phạm — `{colors.error}`.
7. Xanh lam của dữ liệu tài chính — `{colors.finance}`.

## Signature

**Evidence rail:** một dải ngữ cảnh xuyên màn hình nối `Giá trị → Nguồn → Trạng thái xác nhận → Phiên bản → Tác động đến lần chạy`. Chữ ký này phải xuất hiện ở:

1. Thanh trạng thái Hồ sơ trên S03.
2. Hàng trường + bounding box trên S05.
3. Hợp đồng lần chạy trên S12.
4. Ràng buộc nghẽn + liên kết sửa trên S14.
5. Header Phương án trên S15/S16.
6. Bản xem trước nội dung Gói bằng chứng trên S18.

## Defaults bị loại

| Default phổ biến | FinESG thay bằng |
|---|---|
| Lưới KPI card có icon trang trí | Ledger chỉ tiêu theo kỳ/đơn vị, có nguồn và trạng thái |
| Dashboard ESG xanh lá | Nền trung tính; xanh lục chỉ dành cho CO₂ hoặc xác nhận |
| Gauge/radar/pie chart | Bảng so sánh, line tiền mặt theo tháng và stacked bar nguồn vốn |
| Nút disabled không giải thích | Lý do chặn + hành động kế tiếp + liên kết trực tiếp |
| Kết quả “tốt nhất” | “Tối ưu theo Chiến lược, ngưỡng và dữ liệu đã xác nhận” |

## Component checkpoint

- **Palette:** chỉ dùng token trong `DESIGN.md`; không thêm hex tùy ý.
- **Depth:** borders-first, bóng rất nhẹ chỉ cho overlay/sticky action.
- **Surfaces:** canvas `{colors.background}`, panel `{colors.surface}`, vùng chỉ đọc `{colors.surface_subtle}`.
- **Typography:** Inter/system sans; số dùng tabular figures.
- **Spacing:** base 4px; 8/12/16/24/32 cho cấp tăng dần.
- **Responsive:** mock desktop 1440×1024; S05 có thêm tablet 900×1100 trong cùng HTML.

