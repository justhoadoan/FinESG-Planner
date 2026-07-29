# Kiểm toán bề mặt UX — FinESG Planner

Nguồn đối chiếu: `prd-FinESG-2026-07-29/prd.md`, trạng thái `final`, phiên bản 1.0.

Phạm vi của tài liệu này chỉ là kiến trúc trải nghiệm: bề mặt, điểm vào/ra, trạng thái và khả năng khép kín hành trình. Tài liệu không quyết định màu sắc, kiểu chữ, hình khối hay phong cách thị giác.

## 1. Kết luận kiểm toán

- UJ-1 đến UJ-6 và FR-1 đến FR-27 đều có bề mặt đích, điều kiện vào/ra và cao trào thao tác rõ.
- FR-28 và FR-29 có bề mặt nghiệp vụ hợp lý nhưng **chưa có persona hoặc hành trình được đặt tên trong PRD**. Vì vậy, cụm “Đánh giá nội bộ” chưa đạt surface closure hoàn toàn. Cần quyết định đây là giao diện trong sản phẩm hay báo cáo/công cụ offline dành cho nhóm phát triển.
- Luồng cốt lõi khép kín theo chuỗi: Hồ sơ → BCTC đã khóa → Kịch bản/tài trợ đã xác nhận → Dự án đủ điều kiện → cấu hình chạy → kết quả đã kiểm chứng → chọn Phương án → Gói bằng chứng.
- Kết quả cũ không biến mất khi đầu vào thay đổi. Trạng thái “Cần chạy lại/Lỗi thời” phải xuyên suốt từ Tổng quan, Kết quả, So sánh, Xuất báo cáo đến Lịch sử.
- “Vô nghiệm”, “Không bị chặn”, “Lỗi” và “Không vượt Bộ kiểm tra nghiệm” là bốn trạng thái khác nhau, không được gom thành một màn hình lỗi chung.

## 2. Bản đồ bề mặt

| Mã | Bề mặt | Vị trí trong kiến trúc thông tin | Nhu cầu chính được phục vụ |
|---|---|---|---|
| S01 | Danh sách Hồ sơ phân tích | Cấp sản phẩm | Tạo, tìm, mở, sao chép và nhận biết trạng thái Hồ sơ |
| S02 | Tạo/Sửa Hồ sơ | Luồng tạo hoặc bảng chi tiết Hồ sơ | Doanh nghiệp, ngành, ngày gốc, kỳ BCTC, phạm vi và đồng tiền |
| S03 | Tổng quan & mức sẵn sàng | Trang đầu của Hồ sơ | Checklist, cảnh báo, quyền chạy và nhãn đầu ra |
| S04 | Tiếp nhận BCTC | Nhánh BCTC | Tải PDF, theo dõi phân loại, OCR/parser và phiên bản tài liệu |
| S05 | Không gian đối chiếu BCTC | Nhánh BCTC | 12 Trường BCTC đặt cạnh trang/vùng nguồn; sửa, xác nhận và khóa |
| S06 | Kịch bản & giả định 12 tháng | Nhánh Kịch bản & tài trợ | Thấp/Cơ sở/Cao, dòng tiền theo tháng, ngưỡng, công thức và nguồn |
| S07 | Gói vay | Nhánh Kịch bản & tài trợ | Cấu hình 1–3 Gói vay, lịch giải ngân/trả nợ, điều kiện Dự án |
| S08 | Danh mục Dự án | Nhánh Dự án | Danh sách tối đa 10 Dự án, trạng thái và mức đủ điều kiện |
| S09 | Chi tiết tài chính Dự án | Không gian làm việc của một Dự án | CapEx, lịch dòng tiền, NPV hệ thống tính và cảnh báo sau tháng 12 |
| S10 | Phiếu bằng chứng phát thải | Không gian làm việc của một Dự án | Provenance CO₂, Scope, chồng lấn và xác nhận MRV |
| S11 | Rủi ro & quan hệ Dự án | Không gian làm việc của một Dự án/danh mục | Rubric 5 chiều, cờ đỏ, bắt buộc, phụ thuộc và loại trừ |
| S12 | Cấu hình lần chạy | Nhánh Tối ưu | Chọn Kịch bản, Chiến lược, Gói vay, ngưỡng và xem hợp đồng chạy |
| S13 | Trạng thái lần chạy | Sau khi gửi S12 | Tiến trình, tầng mục tiêu, Bộ kiểm tra nghiệm và trạng thái bộ giải |
| S14 | Chẩn đoán Vô nghiệm/sự cố mô hình | Nhánh của S13/S15 | Ràng buộc gây nghẽn, giá trị so ngưỡng, slack/IIS và liên kết sửa |
| S15 | Chi tiết Phương án | Nhánh Kết quả | Danh mục, phân bổ vốn, chỉ tiêu tách kỳ, lý do chọn/loại |
| S16 | So sánh Chiến lược | Nhánh Kết quả | So sánh tối đa ba Chiến lược trên cùng phiên bản, nhận biết nghiệm trùng |
| S17 | So sánh lần chạy/độ nhạy | Nhánh Kết quả | So sánh Kịch bản hoặc giả định, làm nổi bật thay đổi |
| S18 | Chọn & xuất Gói bằng chứng | Nhánh Bằng chứng | Chọn Phương án cuối, xem trước phạm vi/giới hạn và xuất PDF |
| S19 | Phiên bản & Audit Trail | Nhánh Bằng chứng & lịch sử | Truy ngược thay đổi, người xác nhận, phiên bản và quan hệ phụ thuộc |
| S20 | Manifest dữ liệu thử nghiệm | Đánh giá nội bộ | Quyền sử dụng, URL, ngày tải, hash, số trang và loại PDF |
| S21 | Chất lượng trích xuất | Đánh giá nội bộ | Đúng/tổng, lỗi, Precision trước sửa, tự xử lý, cần kiểm tra và cỡ mẫu |

### Cấu trúc điều hướng đề xuất từ IA đã chốt trong PRD

1. Cấp sản phẩm: **Hồ sơ phân tích** (S01).
2. Trong một Hồ sơ: **Tổng quan** (S03), **BCTC** (S04–S05), **Kịch bản & tài trợ** (S06–S07), **Dự án** (S08–S11), **Tối ưu** (S12–S14), **Kết quả** (S15–S17), **Bằng chứng & lịch sử** (S18–S19).
3. Cụm **Đánh giá nội bộ** (S20–S21) nằm ngoài điều hướng Hồ sơ cho đến khi xác định persona, quyền truy cập và việc đây có thực sự là giao diện sản phẩm.

## 3. Hợp đồng trạng thái dùng chung

Mỗi tham chiếu trong các ma trận bên dưới dùng năm nhánh trạng thái: **Rỗng · Đang xử lý · Lỗi · Lỗi thời · Vô nghiệm**. “Không áp dụng” nghĩa là trạng thái đó không có ý nghĩa nghiệp vụ tại bề mặt tương ứng, không phải là chưa thiết kế.

| Mã | Rỗng | Đang xử lý | Lỗi | Lỗi thời | Vô nghiệm |
|---|---|---|---|---|---|
| ST-A Hồ sơ | Chưa có Hồ sơ; giải thích giá trị và CTA tạo mới | Đang tạo/sao chép/lưu, chặn gửi lặp | Không lưu được; giữ dữ liệu đã nhập, nêu cách thử lại | Bản đang xem không còn mới nhất; cho tải lại hoặc mở phiên bản mới | Không áp dụng |
| ST-B Sẵn sàng | Checklist chưa có dữ liệu; chỉ dẫn bước đầu | Đang tính lại trạng thái phụ thuộc | Không xác định được readiness; không cho chạy | Có đầu vào đổi/hủy xác nhận; kết quả cũ chỉ được xem | Cấu hình đầu vào hợp lệ về hình thức nhưng không có nghiệm; liên kết S14 |
| ST-C Tệp/OCR | Chưa có PDF; CTA tải tệp | Đang tải/phân loại/OCR/trích; có tiến độ và chống gửi lặp | Tệp hỏng, OCR/parser lỗi; không tạo số 0, giữ tệp và cho xử lý lại | Có phiên bản tài liệu mới; bản trích cũ không còn hiệu lực | Không áp dụng |
| ST-D Đối chiếu/xác nhận | Chưa có đề xuất hoặc trường `null`; “Cần kiểm tra” | Đang tải trang PDF, vùng nguồn hoặc lưu xác nhận | Thiếu nguồn, sai định dạng, lỗi lưu; không mất sửa đổi | Tài liệu/quy tắc đổi; bộ dữ liệu đã khóa được giữ lịch sử nhưng cần phiên bản mới | Không áp dụng |
| ST-E Biểu mẫu giả định/tài trợ | Chưa có giá trị/gói; phân biệt bắt buộc và tùy chọn | Đang tính lại công thức/lịch/nút xác nhận tạm khóa | Sai đơn vị/kỳ, lịch trả vượt giải ngân, nguồn dòng tiền chưa rõ | Giả định/gói đã dùng bị sửa; các lần chạy phụ thuộc cần chạy lại | Cấu hình có thể khiến bài toán vô nghiệm nhưng chỉ kết luận sau khi chạy |
| ST-F Dự án/MRV/rủi ro | Chưa có Dự án/phiếu/điểm; CTA theo vai trò | Đang tính NPV, kiểm tra chồng lấn hoặc lưu bằng chứng | Thiếu CapEx, nguồn CO₂ không truy cập, quan hệ vòng/xung đột, lưu lỗi | Dòng tiền, hệ số, bằng chứng hoặc rubric đổi; kết quả phụ thuộc cần chạy lại | Dự án có thể bị loại khỏi tập đủ điều kiện; không gọi riêng là Vô nghiệm trước lúc chạy |
| ST-G Cấu hình chạy | Không có Kịch bản/Dự án/Gói vay đủ điều kiện; dẫn về trường chặn | Đang kiểm tra readiness trước gửi | Thiếu dữ liệu bắt buộc, phiên bản xung đột hoặc gửi thất bại | Cấu hình tham chiếu phiên bản cũ; phải làm mới trước chạy | Chỉ xuất hiện sau khi bộ giải chứng minh; chuyển S14 |
| ST-H Pipeline bộ giải | Chưa có lần chạy | Đang xếp hàng/giải từng tầng/kiểm tra nghiệm; không cho gửi trùng | “Lỗi”, “Không bị chặn” hoặc “Không vượt Bộ kiểm tra nghiệm” có thông điệp riêng | Đầu vào đổi trong/sau chạy; kết quả đánh dấu Cần chạy lại | “Vô nghiệm” đã chứng minh; mở chẩn đoán, không tự nới ngưỡng |
| ST-I Kết quả/so sánh | Chưa có Phương án đủ điều kiện; CTA chạy | Đang tải/tổng hợp kết quả hoặc chờ các Chiến lược | Không tải được chi tiết; giữ metadata lần chạy và cho thử lại | Khác phiên bản hoặc đầu vào đổi; cấm so sánh trực tiếp/chọn cuối | Hiển thị cột/thẻ Vô nghiệm và liên kết S14; không giả lập Phương án |
| ST-J Xuất bằng chứng | Chưa chọn Phương án hợp lệ; nêu điều kiện mở khóa | Đang kết xuất/xác minh tệp; chống xuất lặp | Xuất thất bại; không đánh dấu đã hoàn tất, cho thử lại | Phương án bị lỗi thời; cấm xuất như hiện hành, cho xuất bản lịch sử có nhãn | Không có Phương án để chọn/xuất |
| ST-K Lịch sử | Chưa có thay đổi/lần chạy; giải thích loại sự kiện sẽ xuất hiện | Đang tải/lọc/khôi phục chế độ xem | Không tải được; không ngụ ý lịch sử trống | Bản ghi bất biến; chỉ trạng thái đối tượng tham chiếu có thể lỗi thời | Ghi lại Vô nghiệm như một sự kiện, không phải lỗi log |
| ST-L QA nội bộ | Chưa có manifest/nhãn chuẩn; chỉ dẫn nhập hoặc tạo báo cáo | Đang tính metrics/đọc manifest | Dòng manifest thiếu quyền/hash; phép đo lỗi; nêu chính xác phần chưa tính | Tập đánh giá hoặc nhãn chuẩn đổi; metrics cũ ghi phiên bản | Không áp dụng; tập kiểm thử không có kết quả thì gọi là thiếu dữ liệu, không gọi Vô nghiệm |

## 4. Ma trận khép kín hành trình người dùng

| Hành trình/nhu cầu | Bề mặt | Điểm vào → điểm ra | Cao trào trải nghiệm | Trạng thái ngoại lệ bắt buộc |
|---|---|---|---|---|
| UJ-1 — Minh khởi tạo Hồ sơ và hiểu điều kiện đầu ra | S01 → S02 → S03 | Vào từ danh sách hoặc trạng thái rỗng → ra tại Tổng quan có mã Hồ sơ, phiên bản, checklist và mức sẵn sàng | Minh nhìn thấy chính xác mình đang ở “Chưa đủ dữ liệu”, “Sẵn sàng mô phỏng” hay đủ điều kiện cho phân tích 12 tháng, cùng hành động kế tiếp | ST-A + ST-B; đặc biệt ngày gốc lệch kỳ BCTC phải giữ ở Sẵn sàng mô phỏng, không bị coi là lỗi kỹ thuật |
| UJ-2 — Lan xác nhận Bộ dữ liệu tài chính lịch sử | S03 → S04 → S05 → S03/S19 | Hồ sơ thiếu baseline → Bộ 12 Trường BCTC đã khóa phiên bản và người xác nhận | Lan đối chiếu trường Confidence thấp với đúng vùng nguồn, sửa có lý do và khóa đủ 12 trường | ST-C + ST-D; `null` không thành 0; lỗi OCR không mất tệp; thay tài liệu làm baseline cũ lỗi thời |
| UJ-3 — Minh xác nhận Kịch bản và Gói vay | S03 → S06 ↔ S07 → S03 | Baseline đã khóa → giả định tương lai và lịch Gói vay ở trạng thái Đã xác nhận | Minh thấy công thức tiền/CFADS/DSCR được cấu thành từ đâu, xử lý nguy cơ cộng trùng và xác nhận bộ đầu vào 12 tháng | ST-E + ST-B; không rõ nguồn dòng tiền thì chưa đạt phân tích 12 tháng; cấu hình có rủi ro vô nghiệm chỉ cảnh báo trước, không kết luận thay bộ giải |
| UJ-4 — Thảo xác nhận Dự án và CO₂ | S08 → S09/S10/S11 → S08/S03 | Dự án nháp → Dự án có tài chính, phiếu CO₂, điểm rủi ro, quan hệ và trạng thái đủ điều kiện rõ | Thảo tái thực hiện được phép tính CO₂, xử lý vùng chồng lấn và chuyển phiếu sang Đã xác nhận | ST-F; CO₂ mô phỏng không biến mất nhưng bị tách khỏi mục tiêu chính; cờ đỏ hoặc chồng lấn phải nêu cách xử lý |
| UJ-5 — Minh chạy và xử lý bài toán tối ưu | S03 → S12 → S13 → S15 hoặc S14 | Hồ sơ đủ mức chạy → Phương án đã kiểm chứng hoặc chẩn đoán Vô nghiệm/sự cố có thể hành động | Bộ kiểm tra nghiệm xác nhận kết quả trước khi Minh được thấy nhãn “Phương án tối ưu theo Chiến lược”; nếu Vô nghiệm, Minh thấy đúng ràng buộc nghẽn mà không bị tự sửa ngưỡng | ST-G + ST-H; tách rõ Khả thi chưa chứng minh tối ưu, Vô nghiệm, Không bị chặn, Lỗi và Không vượt Bộ kiểm tra nghiệm |
| UJ-6 — Minh so sánh và xuất Gói bằng chứng | S15 → S16/S17 → S18 → S19 | Có các lần chạy cùng phiên bản → một Phương án được chọn và Gói bằng chứng PDF có thể truy nguyên | Minh so sánh các đại lượng riêng biệt, hiểu lý do chọn/loại, chọn Phương án hợp lệ và xem trước giới hạn trước khi xuất | ST-I + ST-J + ST-K; cấm so sánh trực tiếp khác phiên bản; nghiệm trùng có nhãn “Cùng Phương án”; kết quả lỗi thời không được xuất như hiện hành |

## 5. Ma trận khép kín yêu cầu chức năng

| FR/nhu cầu | Bề mặt | Điểm vào → điểm ra | Cao trào trải nghiệm | Rỗng · Đang xử lý · Lỗi · Lỗi thời · Vô nghiệm |
|---|---|---|---|---|
| FR-1 — Tạo, xem, đổi tên, sao chép Hồ sơ có truy nguyên | S01, S02, S19 | Danh sách/CTA tạo → Hồ sơ mới hoặc bản sao có mã, phiên bản và liên kết nguồn | Hồ sơ mở tại S03 với metadata hợp lệ và lịch sử nguồn bản sao | ST-A; Không áp dụng Vô nghiệm |
| FR-2 — Checklist và mức đầu ra | S03 | Có Hồ sơ → trạng thái sẵn sàng, cảnh báo theo trường và hành động kế tiếp | Nhãn “Sàng lọc mô phỏng” hoặc “Phân tích tài chính 12 tháng” phản ánh đúng dữ liệu, không chỉ là badge trang trí | ST-B; Vô nghiệm chỉ sau một lần chạy và liên kết S14 |
| FR-3 — Tải/phân loại PDF | S04 | Hồ sơ có metadata baseline → tài liệu Đã tải/Đang xử lý/Cần kiểm tra/Đã xác nhận/Lỗi | PDF được bảo toàn và phân loại text/scan trước khi trích | ST-C; Không áp dụng Vô nghiệm |
| FR-4 — Đúng 12 Trường BCTC | S05 | Có kết quả trích hoặc bộ 12 trường trống → đủ đúng 12 mã với raw/normalized value | Lan thấy đủ 12 trường, đơn vị/kỳ/phạm vi và biết trường nào chưa dùng được | ST-D; trường thiếu là `null`/Cần kiểm tra, không phải 0; Không áp dụng Vô nghiệm |
| FR-5 — Provenance và Confidence | S05 | Chọn một Trường BCTC → nguồn PDF được mở đúng trang/vùng | Click một trường làm nổi đúng bounding box và hiển thị raw value, phương thức, Confidence, phiên bản | ST-D; lỗi tải trang không làm giá trị có vẻ đã được chứng minh; Không áp dụng Vô nghiệm |
| FR-6 — Sửa, xác nhận, khóa phiên bản | S05, S19, S03 | Trường/Bộ dữ liệu Cần kiểm tra → Đã xác nhận và khóa, hoặc Bị từ chối | Xác nhận toàn bộ chỉ thành công khi cả 12 trường hợp lệ; sửa sau khóa tạo phiên bản mới | ST-D + ST-K; thay đổi làm lần chạy phụ thuộc Cần chạy lại; Không áp dụng Vô nghiệm |
| FR-7 — Kiểm tra logic đầu vào | S05 | Có giá trị chuẩn hóa → cảnh báo được xử lý hoặc chấp nhận ngoại lệ có lý do | Người dùng mở cảnh báo, xem quy tắc, sửa hoặc ghi lý do ngoại lệ mà hệ thống không tự sửa số | ST-D; tải quy tắc/lưu lý do có loading/error; quy tắc mới làm kiểm tra cũ lỗi thời; Không áp dụng Vô nghiệm |
| FR-8 — Ba Kịch bản và dữ liệu thiết yếu | S06 | Baseline đã khóa → Kịch bản Thấp/Cơ sở/Cao ở Nháp hoặc Đã xác nhận | Minh sửa bảng 12 tháng, thấy tổng và xác nhận từng giả định có nguồn/người xác nhận | ST-E; thiếu dữ liệu giữ nhãn Ước tính/Mô phỏng; Không áp dụng Vô nghiệm ở giai đoạn nhập |
| FR-9 — 1–3 Gói vay | S07 | Có Kịch bản/Hồ sơ → 1–3 Gói vay hợp lệ và được phép trong lần chạy | Minh xem đồng thời hạn mức, lịch giải ngân/trả nợ và nghĩa vụ 12 tháng/chi phí vòng đời trước khi xác nhận | ST-E; chặn gói thứ tư, lịch trả vượt giải ngân, gói thiếu dữ liệu; Vô nghiệm chỉ sau chạy |
| FR-10 — Ngăn cộng trùng dòng tiền | S06, S09 | Có dòng tiền kinh doanh và dòng tiền Dự án → mỗi dòng được khai báo “đã gồm/chưa gồm” | Công thức preview cho thấy một dòng tiền xuất hiện đúng một lần trong Cash/CFADS | ST-E; trạng thái nguồn không rõ là lỗi xác nhận, làm khóa phân tích 12 tháng; Không áp dụng Vô nghiệm |
| FR-11 — Tách kỳ và công thức | S06, S09, S15 | Có dữ liệu → NPV vòng đời, CO₂/năm và chỉ tiêu 12 tháng hiển thị riêng | Minh kiểm tra cấu thành Cash, CFADS, DSCR, D/E và NPV mà không gặp điểm tổng hợp mờ | ST-E + ST-I; `DebtService=0` hiển thị DSCR `N/A`, `EquityBase≤0` chặn readiness; Vô nghiệm do ngưỡng được giải thích ở S14 |
| FR-12 — Tối đa 10 Dự án | S08, S09 | Danh mục rỗng/hiện có → tối đa 10 Dự án có dữ liệu tài chính và trạng thái | Tạo/sao chép Dự án, NPV được hệ thống tính và cảnh báo phần CapEx sau tháng 12 luôn thấy được | ST-F; chặn Dự án thứ 11, CapEx âm/thiếu, tính NPV lỗi; thay dòng tiền làm kết quả lỗi thời |
| FR-13 — Phiếu bằng chứng phát thải | S10 | Dự án tồn tại → phiếu Nháp/Cần kiểm tra/Đã xác nhận/Bị từ chối | Thảo chứng minh được phép tính, nguồn, hệ số, Scope, kỳ, ranh giới và xử lý chồng lấn trước xác nhận | ST-F; nguồn không truy cập hoặc chồng lấn chưa xử lý không cho xác nhận; Không áp dụng Vô nghiệm riêng |
| FR-14 — Cổng CO₂ đã xác nhận | S10, S12, S15, S18 | Phiếu có trạng thái → CO₂ được vào mục tiêu chính hoặc chỉ hiện trong độ nhạy | Tại cấu hình chạy và kết quả, Minh thấy rõ phần CO₂ nào được tính và phần nào bị loại | ST-F + ST-G + ST-I; hủy xác nhận làm kết quả lỗi thời; thiếu CO₂ xác nhận có thể gây Vô nghiệm cho ngưỡng Cân bằng tại S14 |
| FR-15 — Điểm rủi ro năm chiều | S11 | Dự án tồn tại → đủ 5 điểm, bằng chứng, lý do, người chấm và trạng thái cờ đỏ | Người chấm hoàn tất rubric, thấy tổng 0–10 và phân loại nhưng không bị diễn giải thành xác suất | ST-F; thiếu một chiều không cho xác nhận; rubric đổi làm lần chạy lỗi thời; cờ đỏ loại Dự án trước tối ưu |
| FR-16 — Quan hệ Dự án | S11, S08 | Có ít nhất hai Dự án hoặc Dự án bắt buộc → đồ thị quan hệ hợp lệ | CFO xác nhận bắt buộc/phụ thuộc/loại trừ và thấy ngay xung đột hoặc vòng quan hệ | ST-F; trạng thái rỗng hợp lệ khi không có quan hệ; lỗi vòng/xung đột phải dẫn đến đối tượng; Vô nghiệm quan hệ xuất hiện ở S14 sau chạy |
| FR-17 — Quyết định, cân bằng vốn và guardrail | S12, S13, S15 | Cấu hình đủ dữ liệu → nghiệm có phân bổ vốn và mọi ràng buộc được kiểm tra | Trước chạy Minh xem bản tóm tắt hợp đồng; sau chạy thấy phân bổ, ràng buộc chạm ngưỡng và trạng thái kiểm chứng | ST-G + ST-H + ST-I; mọi trạng thái bộ giải phải tách biệt; đầu vào đổi giữa lúc chạy làm kết quả lỗi thời |
| FR-18 — Chiến lược An toàn | S12, S13, S15 | Chọn An toàn → kết quả theo NPV → vay mới → chi phí tài trợ → phá hòa | Thứ tự ưu tiên hiển thị trước và sau chạy; kết quả chỉ gọi tối ưu khi đã kiểm chứng | ST-G + ST-H; Vô nghiệm/sự cố dẫn S14; không cho người dùng kéo trọng số |
| FR-19 — Chiến lược Cân bằng | S12, S13, S15 | Chọn Cân bằng và ngưỡng CO₂ → kết quả theo NPV → chi phí → rủi ro | Minh xác nhận CO₂ tối thiểu và thấy chỉ CO₂ đã xác nhận được tính | ST-G + ST-H; không đạt ngưỡng CO₂ là Vô nghiệm, không tự hạ ngưỡng |
| FR-20 — Chiến lược Chuyển đổi nhanh | S12, S13, S15 | Chọn Chuyển đổi nhanh và ngưỡng tài chính → kết quả theo CO₂ → NPV → chi phí | Minh thấy tối đa CO₂ chỉ trong tập vượt NPV, tiền mặt và DSCR | ST-G + ST-H; vi phạm guardrail tạo Vô nghiệm/chẩn đoán, không hiển thị Phương án CO₂ cao hơn như hợp lệ |
| FR-21 — Bộ kiểm tra nghiệm độc lập | S13, S15, S19 | Bộ giải trả trạng thái/nghiệm → chỉ kết quả vượt kiểm tra mới vào S15 như hợp lệ | Chuyển từ “Đang kiểm tra nghiệm” sang “Tối ưu đã kiểm chứng”; không bỏ qua bước này | ST-H; lỗi verifier là “Không vượt Bộ kiểm tra nghiệm”; khả thi chưa tối ưu có watermark và không chọn cuối |
| FR-22 — Vô nghiệm và nghiệm trùng | S14, S16 | Lần chạy Vô nghiệm hoặc các Chiến lược cùng nghiệm → chẩn đoán hoặc nhãn “Cùng Phương án” | Minh mở đúng ràng buộc, giá trị/ngưỡng/slack và deep-link về đầu vào nhưng tự quyết định có sửa hay không | ST-H + ST-I; chẩn đoán loading/error riêng; không nhân bản nghiệm, không biến slack thành Phương án |
| FR-23 — Dashboard so sánh Phương án | S16, S15 | Có ≥1 lần chạy trên cùng phiên bản → bảng/thẻ so sánh các đại lượng riêng | CFO so sánh dự án, vốn, NPV, CO₂, Cash, CFADS, DSCR, D/E, rủi ro và optimality gap mà không có điểm tổng hợp | ST-I; rỗng khi chưa chạy; loading khi ghép dữ liệu; khác phiên bản bị khóa so sánh; Vô nghiệm vẫn là một trạng thái cột, không là Phương án |
| FR-24 — Giải thích chọn/loại Dự án | S15 | Chọn một Dự án trong kết quả → bảng giải thích có nguồn vốn, đóng góp và tác động ngưỡng/lý do loại | CFO mở từng Dự án và nhận lý do kiểm chứng được, kể cả phần CapEx sau tháng 12 chưa được kiểm tra | ST-I; thiếu giải thích là lỗi kết quả; đầu vào đổi làm giải thích lỗi thời; Dự án bị loại do Vô nghiệm chỉ nêu theo logic mô hình |
| FR-25 — Chạy lại/độ nhạy | S17, S12 | Chọn lần chạy gốc → bản sao cấu hình hoặc so sánh Thấp/Cơ sở/Cao | Hệ thống làm nổi đúng Dự án/cơ cấu vốn thay đổi và giới hạn CO₂ mô phỏng trong chế độ độ nhạy | ST-I + ST-G; rỗng nếu chỉ có một lần chạy; đang chạy từng biến thể; khác phiên bản cảnh báo; biến thể Vô nghiệm được giữ như kết quả so sánh |
| FR-26 — Xuất Gói bằng chứng | S18 | Có Phương án đủ điều kiện → xem trước rồi tải PDF | CFO xác nhận đúng Phương án, nhãn mức đầu ra, giới hạn 12 tháng và nội dung truy nguyên trước khi xuất | ST-J; Phương án lỗi thời/khả thi chưa tối ưu/mô phỏng phải có watermark hoặc bị chặn đúng hợp đồng; Vô nghiệm không có CTA chọn cuối |
| FR-27 — Audit Trail/version hóa | S19 và banner trạng thái tại S03/S05/S06/S08/S15/S18 | Có sự kiện/thay đổi → dòng thời gian lọc được và deep-link về phiên bản/đối tượng | Người xem truy ra ai đổi gì, trước/sau, lý do, lúc nào và lần chạy nào bị ảnh hưởng | ST-K; log không được “rỗng giả” khi tải lỗi; lịch sử bất biến; ghi lại cả Vô nghiệm và lỗi kỹ thuật |
| FR-28 — Manifest dữ liệu | S20 | Có quyền vào khu vực nội bộ → bảng manifest đầy đủ hoặc trường thiếu được gắn cờ | Người vận hành phân biệt rõ hash trống, quyền chưa rõ và tài liệu đã xác minh | ST-L; **surface closure chưa đạt vì PRD chưa có persona/UJ sở hữu bề mặt này** |
| FR-29 — Báo cáo chất lượng trích xuất | S21 | Có tập khóa + nhãn chuẩn + đề xuất trước sửa → metrics theo trường/tài liệu/doanh nghiệp | Người vận hành thấy đúng/tổng, loại lỗi, Precision trước sửa, auto-coverage, review rate, cỡ mẫu và giới hạn smoke test | ST-L; **surface closure chưa đạt vì PRD chưa có persona/UJ sở hữu bề mặt này**; không dữ liệu không được hiển thị thành 0% |

## 6. Kiểm tra ngược: mọi bề mặt có hành trình đáp xuống

| Bề mặt | Hành trình đáp xuống | Trạng thái closure |
|---|---|---|
| S01–S03 | UJ-1; UJ-2/3/5 quay lại S03 để nhận readiness | Đóng |
| S04–S05 | UJ-2 | Đóng |
| S06–S07 | UJ-3; UJ-5 đi qua trước chạy | Đóng |
| S08–S11 | UJ-4; UJ-5 dùng eligibility của Dự án | Đóng |
| S12–S14 | UJ-5 | Đóng |
| S15–S17 | UJ-5 kết thúc tại S15; UJ-6 tiếp tục qua S16/S17 | Đóng |
| S18–S19 | UJ-6; UJ-2 dùng S19 cho truy nguyên phiên bản | Đóng |
| S20–S21 | Không có UJ/persona được đặt tên | **Hở** — cần quyết định giao diện sản phẩm hay artifact offline |

## 7. Rủi ro kiến trúc UX ưu tiên

1. **Trạng thái sẵn sàng và lỗi thời bị phân mảnh.** Một thay đổi nhỏ ở BCTC, giả định, hệ số CO₂ hoặc quy tắc có thể làm nhiều lần chạy lỗi thời. Nếu mỗi màn hình tự diễn giải readiness, CFO sẽ gặp kết quả mâu thuẫn. Cần một hợp đồng trạng thái duy nhất từ backend và cùng một “thanh trạng thái Hồ sơ” trên mọi bề mặt.
2. **Đối chiếu BCTC là bề mặt có mật độ và phụ thuộc bố cục cao nhất.** S05 phải giữ đồng thời danh sách 12 trường, PDF/trang/vùng nguồn, raw/normalized value, Confidence, metadata và thao tác xác nhận; đây là màn hình cần wireframe/key-screen sớm nhất cho desktop và tablet.
3. **Vô nghiệm dễ bị hiểu thành lỗi hệ thống hoặc lời khuyên tự động.** S14 phải tách chẩn đoán khỏi thay đổi đầu vào, deep-link đến trường liên quan và dùng ngôn ngữ “nếu–thì”; không có nút “tự sửa để chạy”.
4. **Các đại lượng khác kỳ dễ bị người xem so sánh sai.** NPV vòng đời, CO₂/năm vận hành đầy đủ, CO₂ 12 tháng đầu và chỉ tiêu tài chính 12 tháng phải có nhãn kỳ/đơn vị cố định trên S15–S18; không dùng một điểm tổng hợp.
5. **Handoff nhiều vai trò nhưng MVP chưa có RBAC đầy đủ.** UX vẫn phải cho biết ai chịu trách nhiệm, ai đã xác nhận và bước nào đang chờ Kế toán/ESG/CFO; nếu không, checklist chỉ mô tả dữ liệu chứ không điều phối công việc.
6. **FR-28/29 chưa có chủ hành trình.** Nếu giữ S20/S21 trong sản phẩm, PRD cần bổ sung persona và entry point. Nếu coi là QA offline, phải loại chúng khỏi IA người dùng và giao bằng pipeline/report artifact.
7. **Chọn Phương án và xuất báo cáo có nhiều cổng chặn.** S18 phải giải thích vì sao chưa được chọn/xuất đối với kết quả mô phỏng, khả thi chưa tối ưu, lỗi thời, khác phiên bản hoặc không vượt verifier; một nút disabled không đủ.

## 8. Thứ tự cần chốt khi dựng EXPERIENCE.md

1. Chốt hợp đồng trạng thái toàn Hồ sơ và quy tắc lan truyền “Cần chạy lại”.
2. Chốt IA nội bộ của Hồ sơ cùng mẫu điều hướng giữa bảy nhánh cốt lõi.
3. Dựng key flow/wireframe S05 (đối chiếu BCTC), S03 (readiness), S12–S14 (chạy/chẩn đoán), S15–S18 (so sánh/chọn/xuất).
4. Định nghĩa mẫu biểu dữ liệu dày cho S06–S11, gồm xác nhận từng phần, nguồn, lý do và trạng thái.
5. Chốt deep-link từ cảnh báo/chẩn đoán/kết quả về đúng đầu vào và phiên bản.
6. Quyết định số phận S20/S21 trước khi tuyên bố surface closure hoàn toàn.
