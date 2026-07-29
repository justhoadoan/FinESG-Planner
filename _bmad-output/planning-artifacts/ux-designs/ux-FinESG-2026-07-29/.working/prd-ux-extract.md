# Trích xuất dữ kiện UX từ PRD FinESG Planner

## 1. Nguồn và nguyên tắc sử dụng

- Nguồn duy nhất của bản trích xuất này: `G:/FinESG/_bmad-output/planning-artifacts/prds/prd-FinESG-2026-07-29/prd.md`.
- PRD nguồn có trạng thái `final`, phiên bản `1.0`, ngôn ngữ `vi`, ngày cập nhật `2026-07-29`.
- Nội dung dưới đây chỉ gom và chuẩn hóa các dữ kiện có ảnh hưởng trực tiếp đến UX. Không bổ sung mẫu giao diện, bố cục, thành phần tương tác, phong cách thị giác hoặc hành vi chưa được PRD quy định.

## 2. Tuyên bố sản phẩm và ranh giới diễn giải

**Tuyên bố sản phẩm nguyên văn:** FinESG Planner là công cụ hỗ trợ **sàng lọc sơ bộ** danh mục CapEx xanh. Hệ thống không phê duyệt đầu tư, không cấp tín dụng, không kiểm toán, không chứng nhận ESG và không thay thế thẩm định tài chính hoàn chỉnh.

Đối tượng trọng tâm là CFO của doanh nghiệp xi măng và thép Việt Nam có quan hệ thương mại với EU. Câu hỏi sản phẩm phải giúp trả lời:

> Với năng lực tài chính, các giả định 12 tháng và các bằng chứng giảm phát thải hiện có, doanh nghiệp nên chọn tập dự án nào và tài trợ chúng ra sao theo một chiến lược đã công bố trước.

Chuỗi kiểm soát cốt lõi:

> BCTC Việt Nam → dữ liệu có Provenance → con người xác nhận → giả định tương lai có nhãn → tối ưu CapEx xanh theo ràng buộc CFO → Gói bằng chứng có Audit Trail.

Các nguyên tắc phải được bảo toàn trong trải nghiệm:

1. **Có nguồn trước khi có điểm:** mọi số liệu BCTC và CO₂ quan trọng phải có Provenance và Trạng thái xác nhận.
2. **Con người giữ quyền quyết định:** hệ thống đề xuất; Kế toán, Người xác nhận ESG và CFO xác nhận đầu vào tương ứng.
3. **Không tạo dữ kiện tương lai:** mẫu/kịch bản không được trình bày như dữ liệu thật.
4. **Không dùng điểm tổng hợp mờ:** NPV, CO₂, thanh khoản, DSCR, nợ, chi phí tài trợ và rủi ro phải hiển thị riêng.
5. **Tối ưu có điều kiện:** dùng cụm “tối ưu theo Chiến lược, ngưỡng và dữ liệu đã xác nhận”; không tuyên bố “phương án tốt nhất” tuyệt đối.
6. **Không tự nới ràng buộc:** khi Vô nghiệm, giải thích nguyên nhân và để CFO quyết định thay đổi đầu vào.
7. **Kết quả phải tái lập:** cùng phiên bản dữ liệu, cấu hình và bộ giải phải cho cùng kết quả.

## 3. Vai trò nghiệp vụ

| Vai trò nghiệp vụ | Mục tiêu | Trách nhiệm trong FinESG Planner |
|---|---|---|
| CFO/Trưởng phòng Tài chính | Chọn danh mục và cơ cấu tài trợ phù hợp | Chọn Chiến lược, Kịch bản, Gói vay và ngưỡng; xác nhận Giả định tài chính tương lai; duyệt Phương án cuối |
| Kế toán trưởng/Kế toán tài chính | Bảo đảm baseline BCTC đúng và có nguồn | Đối chiếu 12 Trường BCTC, sửa sai, xác nhận đơn vị/kỳ/phạm vi và khóa phiên bản |
| Người phụ trách ESG/MRV | Bảo đảm số liệu giảm phát thải có thể giải trình | Hoàn thiện và xác nhận Phiếu bằng chứng phát thải; gắn cờ dữ liệu mô phỏng hoặc không đủ bằng chứng |
| Ban điều hành | Xem và thảo luận phương án | Xem so sánh, lý do chọn/loại, ràng buộc chạm ngưỡng và Gói bằng chứng |

Giới hạn MVP: các vai trò chỉ được triển khai ở mức ghi nhận trách nhiệm nghiệp vụ và người xác nhận; chưa yêu cầu SSO hoặc RBAC doanh nghiệp hoàn chỉnh. Điều hướng riêng theo vai trò là P1. SSO/RBAC nhiều tài khoản và multi-tenant thuộc giai đoạn pilot.

Người không thuộc phạm vi MVP:

- Doanh nghiệp ngoài ngành xi măng/thép hoặc ngoài nhóm thí điểm có quan hệ thương mại với EU.
- Ngân hàng dùng hệ thống để tự động phê duyệt tín dụng.
- Kiểm toán viên/tổ chức bảo đảm dùng kết quả như bằng chứng kiểm toán hoặc chứng nhận.
- Bộ phận tuân thủ dùng hệ thống để lập tờ khai CBAM hoặc kiểm kê phát thải đầy đủ.
- Nhà đầu tư bên ngoài cần định giá doanh nghiệp hoặc khuyến nghị chứng khoán.

## 4. Jobs To Be Done

- Khi nhận BCTC PDF, Kế toán muốn lấy nhanh 12 Trường BCTC và thấy ngay trang/vùng nguồn để không phải nhập lại toàn bộ.
- Khi lập kế hoạch CapEx, CFO muốn chọn một Kịch bản và Gói vay mẫu, chỉ sửa/xác nhận các biến tương lai quan trọng.
- Khi đánh giá Dự án xanh, Người phụ trách ESG muốn chứng minh con số CO₂ bằng một Phiếu bằng chứng phát thải nhất quán.
- Khi có nhiều Dự án nhưng vốn hạn chế, CFO muốn nhận Phương án tối ưu theo khẩu vị đã chọn mà vẫn giữ tiền mặt, DSCR và nợ trong ngưỡng.
- Khi một Phương án bị phản biện, CFO muốn truy ngược được số liệu, giả định, phiên bản mô hình và lý do chọn/loại từng Dự án.
- Khi đầu vào thiếu hoặc ràng buộc xung đột, CFO muốn biết điều gì đang chặn bài toán thay vì nhận kết quả đã âm thầm nới điều kiện.

## 5. Sáu hành trình người dùng được đặt tên

### UJ-1. Minh, CFO, khởi tạo Hồ sơ phân tích

Minh mở web app, tạo Hồ sơ phân tích, chọn ngành, ngày gốc, kỳ BCTC và đơn vị tiền tệ. Hệ thống tạo checklist đầu vào và hiển thị rõ hai mức đầu ra: **Sàng lọc mô phỏng** hoặc **Phân tích tài chính 12 tháng**.

Kết quả bắt buộc: người dùng biết dữ liệu nào hệ thống sẽ trích, dữ liệu nào cần xác nhận và điều kiện nào để mở khóa phân tích đầy đủ.

### UJ-2. Lan, Kế toán trưởng, xác nhận Bộ dữ liệu tài chính lịch sử

Lan tải BCTC PDF. Hệ thống phân loại PDF có lớp text hoặc bản scan, trích 12 Trường BCTC và hiển thị giá trị đề xuất bên cạnh trang hoặc vùng nguồn tương ứng. Lan xử lý các trường Confidence thấp, kiểm tra đơn vị, kỳ, phạm vi hợp nhất/riêng lẻ, sửa nếu cần và xác nhận.

Kết quả bắt buộc: Bộ dữ liệu tài chính lịch sử được khóa phiên bản, sẵn sàng làm baseline.

Ngoại lệ bắt buộc: trường thiếu hoặc không thể đọc không được tự điền số 0; trường chuyển sang **Cần kiểm tra** và phép tính phụ thuộc bị khóa hoặc mang nhãn mô phỏng.

### UJ-3. Minh xác nhận Kịch bản và Gói vay

CFO chọn Kịch bản **Thấp/Cơ sở/Cao**, xem giá trị mẫu đã điền và chỉ sửa/xác nhận dòng tiền kinh doanh dự kiến, nghĩa vụ nợ hiện hữu, Gói vay mới, tiến độ giải ngân CapEx, dòng tiền năm đầu, tỷ lệ chiết khấu và các ngưỡng. Hệ thống kiểm tra đơn vị, kỳ và nguy cơ cộng trùng dòng tiền.

Kết quả bắt buộc: Giả định tài chính tương lai chuyển sang **Đã xác nhận**, cho phép tính Tiền cuối kỳ và DSCR 12 tháng.

### UJ-4. Thảo, phụ trách ESG/MRV, xác nhận Dự án và CO₂

Thảo nhập hoặc kiểm tra Phiếu bằng chứng phát thải cho từng Dự án, gồm đường cơ sở, Scope, nguồn hệ số, phương pháp, kỳ đo, độ chắc chắn và trạng thái dữ liệu thật/mô phỏng. Chỉ CO₂ đã xác nhận mới đủ điều kiện đi vào mục tiêu chính.

Kết quả bắt buộc: Dự án có trạng thái bằng chứng rõ ràng và Điểm rủi ro 0–10.

### UJ-5. Minh chạy và xử lý bài toán tối ưu

CFO chọn một Chiến lược, Kịch bản, 1–3 Gói vay được phép và các ngưỡng. Hệ thống chạy MILP, sau đó Bộ kiểm tra nghiệm kiểm tra lại cân bằng vốn và mọi ràng buộc.

Kết quả bắt buộc: hiển thị Phương án hợp lệ hoặc trạng thái **Vô nghiệm**, kèm ràng buộc gây nghẽn. Hệ thống không tự thay đổi ngưỡng.

### UJ-6. Minh so sánh và xuất Gói bằng chứng

CFO chạy ba Chiến lược trên cùng một phiên bản dữ liệu; so sánh danh mục, vốn nội bộ, vốn vay, chi phí tài trợ, NPV, CO₂, tiền mặt, DSCR và rủi ro; chọn Phương án để trình Ban điều hành và xuất Gói bằng chứng.

Kết quả bắt buộc: quyết định có thể giải trình, tái lập và bàn giao sang quy trình ESG, EPM hoặc ngân hàng tiếp theo.

## 6. Thuật ngữ miền phải dùng nhất quán

- **Hồ sơ phân tích** — đơn vị làm việc cấp cao nhất, chứa doanh nghiệp, ngày gốc, Bộ dữ liệu tài chính lịch sử, Kịch bản, Dự án, Gói vay, cấu hình và các lần chạy.
- **Ngày gốc** — ngày bắt đầu kỳ kế hoạch 12 tháng; trong MVP phải trùng ngày kết thúc của BCTC làm baseline.
- **Trường BCTC** — một trong 12 chỉ tiêu tài chính lịch sử được khóa trong MVP.
- **Bộ dữ liệu tài chính lịch sử** — tập 12 Trường BCTC đã chuẩn hóa và có Provenance; chỉ là baseline quá khứ.
- **Provenance** — bằng chứng truy nguồn gồm tài liệu, phiên bản, trang, vùng nguồn, văn bản gốc, phương thức trích xuất và người xác nhận.
- **Confidence** — mức tin cậy của đề xuất tự động trước khi con người sửa; không đồng nghĩa với xác nhận nghiệp vụ.
- **Trạng thái xác nhận** — Nháp, Cần kiểm tra, Đã xác nhận hoặc Bị từ chối.
- **Giả định tài chính tương lai** — dữ liệu dự báo 12 tháng do CFO chọn, nhập hoặc xác nhận; không được suy ra như sự thật chỉ từ BCTC.
- **Kịch bản** — bộ Giả định tài chính tương lai theo mức Thấp, Cơ sở hoặc Cao.
- **Gói vay** — nguồn tài trợ mới có hạn mức, lãi suất, phí, kỳ hạn, ân hạn, lịch giải ngân/trả nợ và điều kiện đủ.
- **Dự án** — khoản đầu tư CapEx được quyết định nhị phân trong MVP: khởi động và chọn toàn bộ, hoặc không chọn. Bộ giải chỉ kiểm tra tài trợ/thanh khoản trong 12 tháng, không chứng nhận đủ vốn toàn vòng đời.
- **Phiếu bằng chứng phát thải** — hồ sơ có cấu trúc chứng minh lượng CO₂ dự kiến giảm của một Dự án.
- **CO₂ đã xác nhận** — giá trị tCO₂e/năm ở trạng thái Đã xác nhận; loại duy nhất dùng trong mục tiêu chính.
- **Điểm rủi ro** — tổng năm chiều rủi ro, mỗi chiều 0–2; tổng từ 0 đến 10.
- **Rủi ro danh mục** — tổng Điểm rủi ro của các Dự án được chọn; chỉ dùng ở tầng mục tiêu cuối của Chiến lược Cân bằng.
- **Dòng tiền kinh doanh trước trả nợ** — dòng tiền 12 tháng do CFO xác nhận, đã phản ánh hoạt động, thuế và vốn lưu động nhưng loại trừ dòng tiền Dự án mới, CapEx, giải ngân vay và trả nợ.
- **CFADS 12 tháng** — Dòng tiền kinh doanh trước trả nợ cộng dòng tiền hoạt động năm đầu của Dự án được chọn nhưng chưa nằm trong dự báo.
- **Nghĩa vụ nợ 12 tháng** — tổng gốc, lãi và phí tiền mặt đến hạn trong 12 tháng của nợ hiện hữu và Gói vay mới.
- **DSCR 12 tháng** — `CFADS 12 tháng / Nghĩa vụ nợ 12 tháng`; kiểm tra ràng buộc ở dạng nhân để tránh chia cho 0.
- **Tiền cuối kỳ** — tiền và tương đương tiền dự kiến tại cuối tháng 12.
- **Nợ cuối kỳ** — dư nợ gốc hiện hữu và mới còn lại tại cuối tháng 12; không gồm lãi/phí đã trả.
- **Vốn chủ cơ sở** — vốn chủ sở hữu FS-07 tại ngày gốc, dùng làm mẫu số của ngưỡng nợ trong MVP.
- **NPV trước tài trợ** — giá trị hiện tại ròng vòng đời của dòng tiền Dự án, gồm CapEx nhưng loại trừ dòng tiền vay, gốc, lãi và phí tài trợ.
- **Chi phí tài trợ** — giá trị hiện tại của lãi và phí phát sinh từ Gói vay; mục tiêu phụ, tách khỏi NPV trước tài trợ.
- **Ngưỡng tài chính** — điều kiện tối thiểu/tối đa do CFO xác nhận, gồm Tiền cuối kỳ, DSCR 12 tháng, Nợ cuối kỳ/Vốn chủ cơ sở, NPV, rủi ro hoặc CO₂ tùy Chiến lược.
- **Chiến lược** — thứ tự ưu tiên lexicographic được khóa: An toàn, Cân bằng hoặc Chuyển đổi nhanh.
- **Phương án** — tập Dự án và cơ cấu vốn nội bộ/Gói vay do bộ giải tạo cho một Chiến lược, Kịch bản và phiên bản dữ liệu cụ thể.
- **Bộ kiểm tra nghiệm** — thành phần độc lập kiểm tra lại cân bằng vốn và mọi ràng buộc trước khi Phương án được hiển thị.
- **Trạng thái bộ giải** — Tối ưu đã kiểm chứng, Khả thi chưa chứng minh tối ưu, Vô nghiệm, Không bị chặn, Lỗi hoặc Không vượt Bộ kiểm tra nghiệm.
- **Dung sai tối ưu** — ngưỡng tuyệt đối/tương đối đã version hóa dùng để khóa tầng mục tiêu và kiểm tra tính khả thi.
- **Khoảng cách tối ưu** — chênh lệch do bộ giải báo giữa nghiệm hiện tại và cận tốt nhất đã chứng minh; dùng để phân biệt Tối ưu với Khả thi chưa chứng minh tối ưu.
- **Tỷ lệ tự xử lý** — tỷ lệ Trường BCTC có đề xuất tự động và không bị chuyển ngay sang Cần kiểm tra; luôn báo cùng Precision.
- **Gói bằng chứng** — báo cáo xuất gồm đầu vào, Provenance, giả định, kết quả, lý do, trạng thái bộ giải, phiên bản và Audit Trail.
- **Audit Trail** — nhật ký bất biến ở mức ứng dụng về ai đã thay đổi/xác nhận gì, lúc nào và lần chạy nào bị ảnh hưởng.
- **Sàng lọc mô phỏng** — kết quả có ít nhất một đầu vào tương lai thiết yếu chưa được xác nhận; không được trình bày như thẩm định tài chính hoàn chỉnh.

## 7. Kiến trúc thông tin cấp sản phẩm đã được PRD đặt tên

1. **Danh sách Hồ sơ phân tích** — tạo, sao chép, mở và xem trạng thái.
2. **Tổng quan Hồ sơ phân tích** — checklist dữ liệu, cảnh báo và mức đầu ra.
3. **BCTC & đối chiếu** — tải PDF, xem vùng nguồn, sửa/xác nhận 12 Trường BCTC.
4. **Kịch bản & tài trợ** — Giả định tài chính tương lai, ba Kịch bản, 1–3 Gói vay và Ngưỡng tài chính.
5. **Danh mục Dự án** — dữ liệu CapEx/dòng tiền, Phiếu bằng chứng phát thải, Điểm rủi ro và quan hệ Dự án.
6. **Tối ưu & so sánh** — chọn Chiến lược, chạy, xử lý Vô nghiệm, so sánh và độ nhạy.
7. **Gói bằng chứng & lịch sử** — xuất báo cáo, xem phiên bản và Audit Trail.
8. **Đánh giá nội bộ** — chất lượng trích xuất, Bộ kiểm tra nghiệm và manifest thử nghiệm.

## 8. Trạng thái, cổng sẵn sàng và quyền thao tác

### 8.1 State machine cấp đối tượng

`Nháp → Cần kiểm tra → Đã xác nhận` hoặc `Bị từ chối`.

Mọi thay đổi sau xác nhận tạo phiên bản mới và làm các lần chạy phụ thuộc chuyển sang **Cần chạy lại**.

### 8.2 Ma trận trạng thái Hồ sơ phân tích

| Trạng thái Hồ sơ phân tích | Điều kiện | Hành động được phép |
|---|---|---|
| **Chưa đủ dữ liệu** | Thiếu giá trị số bắt buộc hoặc có bất kỳ Trường BCTC nào chưa ở trạng thái Đã xác nhận | Không chạy; hiển thị trường thiếu/chưa xác nhận |
| **Sẵn sàng mô phỏng** | Cả 12 Trường BCTC đã xác nhận và đủ giá trị số, nhưng Giả định tài chính tương lai hoặc dữ liệu Dự án còn Ước tính/Mô phỏng | Chạy Sàng lọc mô phỏng; mọi kết quả có watermark |
| **Sẵn sàng tài chính 12 tháng** | 12 Trường BCTC, Giả định tài chính tương lai, lịch Gói vay và dữ liệu tài chính Dự án đã xác nhận | Chạy và gắn nhãn Phân tích tài chính 12 tháng; CO₂ chưa xác nhận vẫn bị loại khỏi mục tiêu chính |
| **Sẵn sàng quyết định** | Đạt trạng thái tài chính, Phiếu bằng chứng phát thải của Dự án đủ điều kiện đã xác nhận, bộ giải Tối ưu đã kiểm chứng | Cho phép chọn Phương án cuối và xuất Gói bằng chứng không có watermark mô phỏng |
| **Cần chạy lại** | Một đầu vào hoặc quy tắc đã dùng bị thay đổi/hủy xác nhận | Chỉ xem lịch sử; phải tạo lần chạy mới |

Ngày gốc lệch ngày kết thúc BCTC khiến Hồ sơ chỉ có thể ở trạng thái **Sẵn sàng mô phỏng**, không thể đạt **Sẵn sàng tài chính 12 tháng**.

### 8.3 Trạng thái xử lý BCTC

Tối thiểu gồm: **Đã tải, Đang xử lý, Cần kiểm tra, Đã xác nhận, Lỗi**.

Các hành vi bắt buộc:

- Lỗi đọc/OCR không làm mất tệp và không tạo giá trị 0 giả.
- Confidence thấp hoặc thiếu vùng nguồn tự động chuyển sang **Cần kiểm tra**.
- Không được dùng Trường BCTC chưa **Đã xác nhận** trong bất kỳ phép tính hoặc lần chạy nào, kể cả Sàng lọc mô phỏng.
- Cảnh báo logic không tự sửa số liệu nếu không có quy tắc xác định; người dùng có thể xác nhận ngoại lệ nhưng phải ghi lý do.

### 8.4 Trạng thái bộ giải

| Trạng thái | Điều kiện và cách được phép trình bày |
|---|---|
| **Tối ưu đã kiểm chứng** | Mọi tầng đạt tối ưu trong dung sai và Bộ kiểm tra nghiệm xác nhận hợp lệ; trạng thái duy nhất được gắn nhãn “Phương án tối ưu theo Chiến lược” |
| **Khả thi chưa chứng minh tối ưu** | Có nghiệm hợp lệ nhưng hết thời gian hoặc còn Khoảng cách tối ưu; chỉ là kết quả tạm, không gọi là tối ưu; chỉ xem/xuất như chẩn đoán có watermark; không được chọn làm Phương án cuối |
| **Vô nghiệm** | Bộ giải chứng minh không có nghiệm cho ràng buộc hiện tại; phải nêu ràng buộc có khả năng gây nghẽn |
| **Không bị chặn** | Mô hình unbounded; là lỗi đặc tả/cấu hình, không phải Phương án |
| **Lỗi** | Bộ giải hoặc pipeline thất bại; không có Phương án |
| **Không vượt Bộ kiểm tra nghiệm** | Bộ giải trả nghiệm nhưng kiểm tra độc lập phát hiện vi phạm; không được hiển thị như kết quả hợp lệ |

### 8.5 Nhãn dữ liệu và kết quả bắt buộc

- **Đã xác nhận**, **Ước tính** và **Mô phỏng** phải phân biệt trực quan.
- Trạng thái không chỉ phân biệt bằng màu; mọi cảnh báo phải có nhãn văn bản.
- Dữ liệu mô phỏng phải giữ nhãn xuyên suốt màn hình và báo cáo.
- Kết quả Sàng lọc mô phỏng phải có watermark.
- Giá trị thiếu là `null`, không bao giờ ngầm chuyển thành `0`.
- Mọi Phương án cũ bị ảnh hưởng bởi thay đổi dữ liệu/quy tắc phải mang trạng thái **Lỗi thời/Cần chạy lại**, không bị xóa.

## 9. Dữ liệu và thao tác bắt buộc theo miền

### 9.1 Hồ sơ phân tích

CFO có thể tạo, xem, đổi tên và sao chép Hồ sơ phân tích với:

- Doanh nghiệp.
- Ngành; MVP chỉ cho phép **Xi măng** hoặc **Thép**.
- Ngày gốc.
- Kỳ BCTC.
- Phạm vi báo cáo.
- Đơn vị tiền tệ.

Mỗi Hồ sơ có mã duy nhất và số phiên bản. Bản sao phải giữ liên kết truy nguyên đến bản nguồn. Mỗi Hồ sơ chỉ dùng một đồng tiền cơ sở; không tự động chuyển đổi ngoại tệ trong MVP.

Checklist phải thể hiện trạng thái của:

- Bộ dữ liệu tài chính lịch sử.
- Giả định tài chính tương lai.
- Dự án.
- Phiếu bằng chứng phát thải.
- Ngưỡng tài chính.

Mỗi cảnh báo phải chỉ rõ trường thiếu và hành động cần thực hiện.

### 9.2 Mười hai Trường BCTC cố định

| Mã | Trường BCTC |
|---|---|
| FS-01 | Tiền và tương đương tiền |
| FS-02 | Tài sản ngắn hạn |
| FS-03 | Nợ ngắn hạn |
| FS-04 | Vay ngắn hạn |
| FS-05 | Vay dài hạn |
| FS-06 | Tổng nợ phải trả |
| FS-07 | Vốn chủ sở hữu |
| FS-08 | Doanh thu thuần |
| FS-09 | Lợi nhuận trước thuế |
| FS-10 | Chi phí lãi vay |
| FS-11 | Lợi nhuận sau thuế |
| FS-12 | Lưu chuyển tiền thuần từ hoạt động kinh doanh |

Mỗi giá trị phải lưu:

- Văn bản gốc và giá trị chuẩn hóa.
- Đơn vị, kỳ, tiền tệ và phạm vi hợp nhất/riêng lẻ.
- Trang và bounding box.
- Phương thức trích xuất.
- Confidence.
- Phiên bản tài liệu.

Khi sửa/xác nhận phải lưu giá trị trước/sau, người sửa, thời điểm và lý do. Có thể xác nhận từng trường hoặc toàn bộ Bộ dữ liệu tài chính lịch sử.

### 9.3 Kịch bản và giả định tài chính tương lai

Ba tên Kịch bản: **Thấp, Cơ sở, Cao**.

Dữ liệu thiết yếu của mỗi Kịch bản:

- Dòng tiền kinh doanh trước trả nợ theo tháng trong 12 tháng.
- Gốc, lãi và phí của các khoản vay hiện hữu phải trả theo tháng.
- CapEx giải ngân trong 12 tháng của từng Dự án.
- Dòng tiền hoạt động năm đầu của từng Dự án, tách khỏi CapEx.
- Hạn mức vốn nội bộ được phép sử dụng.
- Tiền mặt tối thiểu.
- DSCR tối thiểu.
- Ngưỡng Nợ cuối kỳ/Vốn chủ cơ sở.
- Tỷ lệ chiết khấu dùng tính NPV.
- Tỷ lệ chiết khấu dùng tính Chi phí tài trợ.

Yêu cầu:

- Giá trị mẫu/chưa xác nhận luôn mang nhãn **Ước tính** hoặc **Mô phỏng**.
- CFO có thể sao chép Kịch bản rồi thay đổi một số giả định để phân tích độ nhạy.
- Lưu nguồn, ghi chú và người xác nhận cho từng giả định.
- Dòng tiền, giải ngân và nghĩa vụ nợ 12 tháng được nhập theo tháng; hệ thống tổng hợp thành chỉ tiêu 12 tháng.
- Dòng tiền năm đầu Dự án phải khai báo đã nằm trong dòng tiền kinh doanh dự kiến hay chưa. Nếu chưa rõ, không được tính Tiền cuối kỳ/CFADS như dữ liệu đã xác nhận.
- Giao diện phải hiển thị công thức cấu thành để CFO kiểm tra.

### 9.4 Gói vay

CFO chọn/cấu hình từ **1 đến 3 Gói vay** cho một lần chạy. Mỗi Gói vay có:

- Hạn mức.
- Lãi suất.
- Phí.
- Kỳ hạn.
- Thời gian ân hạn.
- Lịch giải ngân.
- Lịch trả gốc/lãi.
- Điều kiện để Dự án đủ tiêu chuẩn.

Gói vay chưa đủ dữ liệu không được dùng trong Phân tích tài chính 12 tháng. Hệ thống tính riêng Nghĩa vụ nợ 12 tháng và Chi phí tài trợ. Tỷ lệ chiết khấu Chi phí tài trợ thực tế phải được lưu trong lần chạy.

### 9.5 Dự án

Một Hồ sơ có tối đa **10 Dự án**. CFO có thể tạo, sửa, sao chép, bật/tắt và sắp xếp Dự án.

Dữ liệu tối thiểu:

- Mã và tên Dự án.
- CapEx vòng đời và CapEx giải ngân 12 tháng.
- CapEx dự kiến sau tháng 12 và mô tả nguồn tài trợ dự kiến.
- Dòng tiền Dự án theo tháng trong 12 tháng đầu và theo năm cho phần vòng đời còn lại.
- Tỷ lệ chiết khấu hoặc tham chiếu tỷ lệ của Hồ sơ.
- NPV trước tài trợ do hệ thống tính; NPV nhập ngoài chỉ để đối chiếu.
- Phiếu bằng chứng phát thải.
- Điểm rủi ro.
- Quan hệ phụ thuộc, loại trừ hoặc bắt buộc.

Ràng buộc/hành vi:

- Dự án là quyết định nhị phân: chọn toàn bộ hoặc không chọn.
- Không cho chạy nếu CapEx 12 tháng âm hoặc thiếu.
- Dự án còn CapEx sau tháng 12 phải có kế hoạch nguồn vốn tương lai.
- Vì bộ giải không kiểm tra phần sau tháng 12, Phương án và Gói bằng chứng phải mang cảnh báo: **“Khả thi tài chính chỉ được kiểm tra trong 12 tháng”**.
- Dự án phụ thuộc không được chọn nếu Dự án tiền đề không được chọn.
- Hai Dự án loại trừ không được đồng thời xuất hiện.
- Dự án có cờ đỏ không được chọn cho đến khi cờ đỏ được đóng bằng biện pháp xử lý có Audit Trail.

### 9.6 Phiếu bằng chứng phát thải

Các trường bắt buộc:

- Đường cơ sở trước Dự án.
- Scope 1 hoặc Scope 2.
- Lượng giảm tCO₂e/năm.
- Ngày dự kiến vận hành và giả định ramp-up.
- Nguồn và phiên bản hệ số phát thải.
- Phương pháp tính.
- Khoảng thời gian đo.
- Ranh giới nguồn phát thải và mã nhóm chồng lấn với Dự án khác.
- Mức độ chắc chắn.
- Dữ liệu thật hay mô phỏng.
- Tài liệu/URL nguồn.
- Người xác nhận và thời điểm xác nhận.

Chỉ chuyển sang **Đã xác nhận** khi đủ trường bắt buộc, nguồn có thể truy cập, phiên bản hệ số rõ và phép tính có thể tái thực hiện.

Hai Dự án dùng cùng đường cơ sở/vùng phát thải không được cộng đồng thời. Người phụ trách ESG phải đặt quan hệ loại trừ hoặc gộp thành Dự án kết hợp có CapEx, dòng tiền, NPV, CO₂ và rủi ro đã điều chỉnh trước tối ưu.

CO₂ dùng trong mục tiêu là tCO₂e/năm vận hành đầy đủ. CO₂ dự kiến trong 12 tháng đầu chỉ hiển thị riêng khi đủ dữ liệu ngày vận hành/ramp-up đã xác nhận; nếu thiếu thì hiển thị `N/A`, không nội suy thành số thật.

Inventory phát thải doanh nghiệp, phát thải hàm chứa/CBAM, allowance/credit và CO₂ Dự án tránh được là các loại dữ liệu riêng. MVP chỉ tối ưu CO₂ Dự án tránh được. Scope 3 ngoài phạm vi.

### 9.7 Điểm rủi ro

Năm chiều, mỗi chiều chấm 0–2:

1. Trưởng thành kỹ thuật.
2. Nhà cung cấp/triển khai.
3. Độ chắc chắn CapEx–dòng tiền.
4. Phụ thuộc vận hành/pháp lý.
5. Độ tin cậy CO₂/MRV.

Phân loại tổng:

- 0–3: **Thấp**.
- 4–6: **Trung bình**.
- 7–10: **Cao**.
- Cờ đỏ trọng yếu: loại Dự án khỏi đề xuất tự động cho đến khi có biện pháp xử lý.

Lưu điểm, bằng chứng, người chấm và lý do cho từng chiều. Quy tắc chung đang có hiệu lực: 0 = đủ bằng chứng/rủi ro thấp; 1 = bằng chứng một phần/rủi ro có thể xử lý; 2 = thiếu bằng chứng hoặc phụ thuộc trọng yếu. Hệ thống không được diễn giải Điểm rủi ro chủ quan thành xác suất tài chính.

## 10. Hợp đồng hiển thị kết quả tài chính

Các đại lượng phải hiển thị riêng, không cộng thành điểm chuẩn hóa:

- NPV trước tài trợ vòng đời tại Ngày gốc.
- CO₂ theo tCO₂e/năm vận hành đầy đủ.
- CO₂ dự kiến trong 12 tháng đầu khi đủ dữ liệu.
- Tiền cuối kỳ.
- CFADS 12 tháng.
- Nghĩa vụ nợ 12 tháng.
- DSCR 12 tháng.
- Nợ cuối kỳ/Vốn chủ cơ sở.
- Tổng vốn vay mới.
- Chi phí tài trợ.
- Điểm rủi ro/Rủi ro danh mục.

Các điều kiện hiển thị quan trọng:

- Nếu Nghĩa vụ nợ 12 tháng bằng 0, DSCR hiển thị `N/A`; vẫn áp dụng `CFADS12 ≥ 0` và ngưỡng tiền theo tháng.
- Nếu `EquityBase ≤ 0`, Hồ sơ không đạt trạng thái Phân tích tài chính 12 tháng.
- Dashboard và Gói bằng chứng phải ghi rõ tỷ lệ là **Nợ cuối kỳ/Vốn chủ cơ sở**, không phải dự báo bảng cân đối cuối kỳ.
- NPV trong hàm mục tiêu được hệ thống tính từ lịch dòng tiền version hóa. NPV nhập/chuyển từ tài liệu chỉ là giá trị đối chiếu.
- Kiểm tra ràng buộc dùng giá trị chưa làm tròn. Mọi số hiển thị phải có quy tắc làm tròn.
- Thanh khoản được kiểm tra theo từng tháng; `CashEnd12` dương không loại trừ vi phạm nếu `Cash_t` thấp hơn ngưỡng ở tháng trung gian.

## 11. Ba Chiến lược và logic phải được giải thích

### Chiến lược An toàn

1. Tối đa tổng NPV.
2. Giữ NPV tối ưu trong dung sai, giảm tổng vốn vay mới.
3. Giữ hai tầng trước, giảm Chi phí tài trợ.
4. Phá hòa xác định theo mã Dự án/Gói vay.

Không có trọng số tùy ý giữa NPV và nợ.

### Chiến lược Cân bằng

1. Áp dụng ràng buộc CO₂ tối thiểu do CFO xác nhận.
2. Tối đa tổng NPV.
3. Giảm Chi phí tài trợ.
4. Giảm tổng Điểm rủi ro.
5. Phá hòa xác định.

Nếu không đạt ngưỡng CO₂, kết quả là Vô nghiệm; hệ thống không tự hạ ngưỡng. Chỉ CO₂ đã xác nhận được tính.

### Chiến lược Chuyển đổi nhanh

1. Áp dụng ngưỡng NPV, tiền mặt và DSCR tối thiểu.
2. Tối đa tổng CO₂ đã xác nhận.
3. Tối đa tổng NPV.
4. Giảm Chi phí tài trợ.
5. Phá hòa xác định.

Không được chọn Phương án CO₂ cao hơn nếu vi phạm bất kỳ ngưỡng tài chính bắt buộc nào. CO₂ mô phỏng không tham gia mục tiêu chính.

### Vô nghiệm và nghiệm trùng

Vô nghiệm phải kèm:

- Danh sách ràng buộc có khả năng gây nghẽn.
- Giá trị hiện tại so với ngưỡng.
- Mã ràng buộc.
- Ngưỡng.
- Giá trị hoặc slack tối thiểu.
- Liên kết đến đầu vào liên quan.

Nếu dùng chẩn đoán slack, slack chỉ để giải thích, không được biến thành Phương án. Không khẳng định tập xung đột là duy nhất nếu chưa chứng minh. Gợi ý điều chỉnh chỉ là phân tích “nếu–thì”, không tự sửa dữ liệu.

Không tạo đủ ba Phương án bằng cách nhân bản hoặc âm thầm đổi tham số. Khi các Chiến lược trả cùng nghiệm, dashboard hiển thị **“Cùng Phương án”** nhưng giữ Audit Trail riêng cho từng Chiến lược.

## 12. So sánh, giải thích, độ nhạy và xuất

### 12.1 Dashboard so sánh

Chỉ so sánh trực tiếp Phương án dùng cùng phiên bản dữ liệu; nếu khác phiên bản phải cảnh báo.

Phải hiển thị riêng:

- Dự án được chọn.
- Vốn nội bộ và vốn từ từng Gói vay.
- Tổng vốn vay mới và Chi phí tài trợ.
- NPV vòng đời.
- CO₂ đã xác nhận theo tCO₂e/năm vận hành đầy đủ.
- CO₂ dự kiến trong 12 tháng đầu nếu đủ dữ liệu; không cộng hoặc đổi nhãn với CO₂ vận hành đầy đủ.
- Tiền cuối kỳ, CFADS, Nghĩa vụ nợ và DSCR 12 tháng.
- Nợ cuối kỳ/Vốn chủ cơ sở.
- Điểm rủi ro.
- Ràng buộc chạm ngưỡng.
- Khoảng cách tối ưu.

### 12.2 Giải thích chọn/loại Dự án

Dự án được chọn phải hiển thị:

- Nguồn vốn.
- Đóng góp NPV/CO₂.
- Tác động lên các ngưỡng.
- Nếu có CapEx sau tháng 12: tỷ lệ CapEx đã được kiểm tra trong 12 tháng và cảnh báo phần tài trợ tương lai chưa được mô hình kiểm chứng.

Dự án không được chọn phải nêu ít nhất một lý do:

- Không tối ưu ở tầng ưu tiên.
- Thiếu bằng chứng.
- Cờ đỏ.
- Không đủ vốn.
- Vi phạm điều kiện Gói vay.
- Quan hệ phụ thuộc/loại trừ.
- Làm vi phạm ngưỡng.

Giải thích không được khẳng định quan hệ nhân quả ngoài logic mô hình.

### 12.3 Chạy lại và độ nhạy

- Mỗi lần chạy có mã, thời điểm, phiên bản đầu vào và trạng thái riêng.
- Có thể chạy cùng Chiến lược trên Kịch bản Thấp/Cơ sở/Cao hoặc thay đổi một giả định.
- Hệ thống làm nổi bật Dự án hoặc cơ cấu vốn thay đổi giữa các lần chạy.
- CO₂ mô phỏng chỉ xuất hiện trong chế độ độ nhạy.

### 12.4 Gói bằng chứng

P0 xuất PDF; CSV/JSON là P1.

Nội dung bắt buộc:

- Phạm vi, Ngày gốc, người xác nhận và nhãn Sàng lọc mô phỏng/Phân tích tài chính 12 tháng.
- Với Dự án có CapEx sau tháng 12: tổng CapEx, CapEx 12 tháng, phần tài trợ chưa kiểm tra và cảnh báo giới hạn 12 tháng.
- Bộ dữ liệu tài chính lịch sử và Provenance.
- Giả định tài chính tương lai, Kịch bản, Gói vay và Ngưỡng tài chính.
- Dự án, Phiếu bằng chứng phát thải và Điểm rủi ro.
- Chiến lược, thứ tự mục tiêu, Phương án, giải thích và trạng thái Bộ kiểm tra nghiệm.
- Phiên bản dữ liệu, mô hình, quy tắc, nguồn hệ số phát thải và Audit Trail.
- Tuyên bố giới hạn sử dụng.

### 12.5 Audit Trail

Nhật ký tối thiểu gồm người thực hiện, thời điểm, đối tượng, giá trị trước/sau, lý do và phiên bản. Quy tắc kế toán, hệ số phát thải, cấu hình Chiến lược và phiên bản bộ giải phải được ghi trong lần chạy.

## 13. P0, P1, pilot và thứ tự cắt

### 13.1 P0 — Bắt buộc để demo hợp lệ

- Web app responsive bằng tiếng Việt và một Hồ sơ phân tích cho doanh nghiệp xi măng hoặc thép.
- Tải PDF text-layer hoặc scan; parser/OCR, mapping 12 Trường BCTC, Provenance, Confidence và Kế toán xác nhận.
- Kịch bản Cơ sở; khả năng sao chép thành Thấp/Cao; 1–3 Gói vay; tối đa 10 Dự án.
- Hợp đồng tính toán, ma trận sẵn sàng và kiểm tra cộng trùng.
- Phiếu bằng chứng phát thải Scope 1/2, kiểm tra chồng lấn CO₂ và Điểm rủi ro năm chiều.
- Ba Chiến lược lexicographic, ràng buộc tài chính/MRV, hợp đồng dung sai và quy tắc phá hòa.
- Bộ kiểm tra nghiệm độc lập, trạng thái bộ giải, Vô nghiệm và golden tests.
- Dashboard cơ bản gồm Phương án, nguồn vốn, NPV, CO₂, Tiền cuối kỳ, DSCR, rủi ro, lý do chọn/loại và cảnh báo giới hạn 12 tháng.
- Gói bằng chứng PDF, Audit Trail và version hóa đủ để tái lập.
- Smoke test tám BCTC, một case xi măng, một case thép và đóng gói Docker.

**Không được cắt khỏi P0:** tính đúng công thức; Provenance/human-in-the-loop; cổng CO₂ đã xác nhận; ba Chiến lược; Bộ kiểm tra nghiệm; nhãn Sàng lọc mô phỏng; cảnh báo tài trợ sau tháng 12; Audit Trail tối thiểu.

### 13.2 P1 — Chỉ khi P0 ổn định

- Mẫu Kịch bản Thấp/Cao được điền sẵn và giao diện so sánh độ nhạy tự động.
- Làm nổi bật chênh lệch Dự án/cơ cấu vốn giữa các lần chạy.
- Xuất CSV/JSON bên cạnh PDF.
- Dashboard đánh giá chất lượng trích xuất; nếu cắt, vẫn phải tạo báo cáo offline theo FR-29.
- Mở rộng tập đánh giá lên 20–30 BCTC nếu quyền sử dụng cho phép.
- Điều hướng riêng theo vai trò; nếu cắt, P0 vẫn phải ghi người xác nhận và trách nhiệm.

Thứ tự cắt khi trễ: (1) mở rộng 20–30 BCTC; (2) dashboard đánh giá nội bộ; (3) CSV/JSON; (4) so sánh độ nhạy tự động; (5) điều hướng riêng theo vai trò. Không được thay đổi guardrail P0 để giữ lịch.

### 13.3 Giai đoạn pilot

- SSO/RBAC nhiều tài khoản và multi-tenant.
- Chính sách lưu giữ, residency, sao lưu và xóa tự động.
- Tích hợp ESG, EPM, ngân hàng hoặc ERP bằng schema/API version hóa.
- Đánh giá bảo mật, pháp lý và vận hành production.
- Tự động cập nhật nguồn quy định/hệ số phát thải sau khi có quy trình phê duyệt.

## 14. Cảnh báo, guardrail và ngôn từ bắt buộc

### 14.1 Guardrail tài chính

- BCTC lịch sử không được dùng một mình để khẳng định khả năng trả nợ 12 tháng.
- Phân tích tài chính 12 tháng chỉ bật khi CFO xác nhận đủ đầu vào thiết yếu.
- Không trừ lặp Chi phí tài trợ trong NPV trước tài trợ.
- Không cộng trùng dòng tiền Dự án và dòng tiền kinh doanh dự kiến.
- Không tự nới Tiền cuối kỳ, DSCR 12 tháng, Nợ cuối kỳ/Vốn chủ cơ sở, CO₂, NPV hoặc ngưỡng rủi ro.
- Dự án có CapEx sau tháng 12 phải luôn hiển thị phần vốn tương lai chưa được kiểm tra.

### 14.2 Guardrail phát thải

- Chỉ CO₂ đã xác nhận được dùng trong mục tiêu chính.
- Scope 1 và Scope 2 phải được gắn nhãn; Scope 3 ngoài MVP.
- Dữ liệu mô phỏng phải giữ nhãn xuyên suốt màn hình và báo cáo.
- Không tạo kiểm kê phát thải doanh nghiệp, không tính phát thải hàm chứa CBAM và không chứng nhận tín chỉ.
- Hai Dự án chồng lấn CO₂ phải bị loại trừ hoặc gộp trước tối ưu; không cộng trùng.

### 14.3 Guardrail diễn giải

- Không gọi kết quả là **“khuyến nghị đầu tư”**, **“phê duyệt tín dụng”** hoặc **“phương án tốt nhất”** nếu không kèm điều kiện áp dụng.
- Chỉ trạng thái **Tối ưu đã kiểm chứng** được gọi là **“Phương án tối ưu theo Chiến lược”**.
- Mọi báo cáo phải nêu Chiến lược, Kịch bản, ngưỡng, phiên bản và giới hạn sử dụng.
- Precision được tính trước human review; số sau xác nhận không được dùng để đánh giá mô hình trích xuất.
- Tám BCTC hiện tại chỉ được gọi là **smoke test**, không phải bằng chứng tổng quát hóa.

### 14.4 Thông báo và lỗi

- Khi OCR hoặc tối ưu đang chạy, giao diện phải phản hồi trạng thái và ngăn gửi trùng yêu cầu.
- Thông báo lỗi phải nêu bước khắc phục, không lộ stack trace.
- Vô nghiệm không phải lỗi hệ thống; phải giải thích ràng buộc gây nghẽn.
- Không bị chặn là lỗi đặc tả/cấu hình, không phải Phương án.
- Không vượt Bộ kiểm tra nghiệm không được trình bày như kết quả hợp lệ.
- Mỗi cảnh báo đầu vào phải chỉ ra trường thiếu và hành động cần thực hiện.

## 15. Ràng buộc form factor, khả dụng và bảo mật có ảnh hưởng UX

- Web app responsive, ưu tiên desktop và tablet.
- Luồng đối chiếu PDF/bảng dữ liệu không bắt buộc tối ưu cho màn hình điện thoại trong MVP.
- Ngôn ngữ giao diện MVP là tiếng Việt; mã trường/công thức có thể giữ ký hiệu tài chính chuẩn.
- Trạng thái không chỉ phân biệt bằng màu; mọi cảnh báo có nhãn văn bản.
- Luồng cốt lõi dùng được bàn phím và có thứ tự focus hợp lý.
- Dữ liệu tài chính nhạy cảm; truy cập giới hạn theo Hồ sơ phân tích.
- Trong demo, chủ Hồ sơ có thể xóa dữ liệu thủ công; chính sách lưu giữ tự động thuộc pilot.
- Log kỹ thuật dùng correlation ID cho tải tệp, trích xuất, xác nhận, lần chạy và xuất báo cáo.

## 16. Chỉ số thành công có ảnh hưởng đến thiết kế và kiểm thử UX

### Chỉ số chính

- **SM-1 — Tính đúng tài chính:** 100% công thức vượt golden test.
- **SM-2 — Tính hợp lệ của Phương án:** 100% Phương án hiển thị được Bộ kiểm tra nghiệm xác nhận hợp lệ; case nhỏ khớp vét cạn.
- **SM-3 — Tính toàn vẹn CO₂:** 100% CO₂ dùng trong mục tiêu/ràng buộc chính có Phiếu bằng chứng phát thải Đã xác nhận.
- **SM-4 — Khả năng giải trình:** 100% Phương án xuất được Gói bằng chứng có phiên bản, nguồn, giả định, trạng thái bộ giải, lý do và Audit Trail.
- **SM-5 — Hiệu quả thao tác:** thử nghiệm ghép cặp với 5–10 cặp người dùng–case; mục tiêu giảm median thời gian chuẩn bị ≥ 30%; 50% là mục tiêu mở rộng.

### Chỉ số phụ

- **SM-6 — Chất lượng trích xuất:** Precision đề xuất tự động ≥ 95% trên tập khóa trước khi Kế toán sửa; luôn báo cùng Tỷ lệ tự xử lý, tỷ lệ Cần kiểm tra, số đúng/tổng và cỡ mẫu.
- **SM-7 — Hiệu năng bộ giải:** P95 < 3 giây với tối đa 10 Dự án trên cấu hình demo.
- **SM-8 — Chạy end-to-end:** xử lý cả tám BCTC smoke test gồm bốn text-layer và bốn scan; không dùng để tuyên bố tổng quát hóa.
- **SM-9 — Hoàn tất luồng:** tối thiểu 80% người thử nghiệm hoàn tất từ tạo Hồ sơ đến xuất Gói bằng chứng mà không cần thành viên nhóm can thiệp trực tiếp.

### Counter-metrics

- Không giảm tỷ lệ Cần kiểm tra bằng cách chấp nhận Confidence thấp.
- Không tăng CO₂ bằng cách vi phạm ngưỡng NPV, tiền mặt, DSCR hoặc nợ.
- Không tối ưu thời gian giải bằng cách bỏ Bộ kiểm tra nghiệm hoặc giảm nội dung giải thích.
- Không dùng kết quả sau Kế toán sửa để làm đẹp Precision.
- Không tăng số Phương án bằng cách nhân bản nghiệm hoặc tự nới ràng buộc.

## 17. Tiêu chí chấp nhận MVP liên quan trực tiếp đến UX

- UJ-1 đến UJ-6 chạy end-to-end trên ít nhất một case xi măng và một case thép.
- Dữ liệu thiếu tạo đúng nhãn Sàng lọc mô phỏng; không tự suy diễn thành dữ liệu thật.
- CO₂ chưa xác nhận không đi vào mục tiêu chính.
- Vô nghiệm và nghiệm trùng được báo đúng, không tự nới ràng buộc.
- Gói bằng chứng chứa đủ dữ liệu, giả định, Provenance, phiên bản, lý do và giới hạn sử dụng.
- Dự án có CapEx sau tháng 12 luôn hiển thị phần vốn tương lai chưa được kiểm tra.
- Ma trận trạng thái sẵn sàng chặn đúng thao tác cho dữ liệu thiếu, mô phỏng, đã xác nhận và cần chạy lại.
- Hồ sơ có Ngày gốc lệch ngày kết thúc BCTC không thể đạt Sẵn sàng tài chính 12 tháng.
- Hai Dự án chồng lấn CO₂ bị loại trừ hoặc gộp trước tối ưu.
- NPV dùng trong hàm mục tiêu luôn do hệ thống tính từ lịch dòng tiền version hóa, không lấy trực tiếp từ số nhập.

## 18. Quyết định đã có hiệu lực nhưng còn phải khóa trong quá trình triển khai

Các quyết định sau có tác động trực tiếp đến UX và không phải khoảng trống tự do để thiết kế lại:

- Một đồng tiền cơ sở cho mỗi Hồ sơ; không tự đổi ngoại tệ.
- Dữ liệu 12 tháng nhập theo tháng và tổng hợp 12 tháng.
- CapEx sau tháng 12 yêu cầu kế hoạch nguồn vốn và cảnh báo, không tuyên bố đủ vốn vòng đời.
- Demo chỉ ghi người xác nhận; SSO/RBAC chuyển pilot.
- Demo cho phép xóa thủ công; chính sách tự động chuyển pilot.
- P0 xuất PDF; CSV/JSON là P1.
- Ngày gốc phải trùng ngày kết thúc BCTC; không roll-forward.
- NPV nhập ngoài chỉ để đối chiếu.
- Ngưỡng tiền mặt được áp dụng theo từng tháng.
- Dòng tiền Dự án là danh nghĩa, sau thuế; không có tax/inflation/FX engine.

Các nội dung PRD yêu cầu owner khóa trong Tuần 1:

- Rubric chi tiết và bằng chứng/cờ đỏ cho năm chiều rủi ro.
- Thứ tự Chiến lược Cân bằng: Chi phí tài trợ trước, Điểm rủi ro sau.
- Tỷ lệ chiết khấu Chi phí tài trợ.
- Guardrail ngưỡng tiền mặt theo tháng.

## 19. Điểm nguồn chưa quy định đủ để suy ra thiết kế giao diện

Đây là các khoảng trống của nguồn, không phải đề xuất UX:

- PRD không quy định phong cách thị giác, thương hiệu, bảng màu, typography, iconography hoặc mật độ giao diện.
- PRD không quy định cấu trúc điều hướng cụ thể ngoài tám vùng kiến trúc thông tin cấp sản phẩm.
- PRD không quy định dashboard dùng biểu đồ/bảng/thẻ nào, thứ tự ưu tiên thị giác hoặc mức thông tin mở mặc định.
- PRD không quy định cơ chế cộng tác khi nhiều vai trò cùng chỉnh một Hồ sơ trong MVP; SSO/RBAC đầy đủ nằm ở pilot.
- PRD không cung cấp giá trị mẫu cụ thể cho Kịch bản Thấp/Cơ sở/Cao hoặc Gói vay mẫu.
- Rubric chi tiết cho từng chiều rủi ro và định nghĩa cờ đỏ phải được khóa trong Tuần 1.
- PRD không quy định ngưỡng Confidence nào là “thấp”.
- PRD không quy định giới hạn dung lượng tệp PDF, số tệp BCTC cho một Hồ sơ, hành vi tải lại hay xử lý tài liệu nhiều kỳ.
- PRD không quy định hành vi lưu nháp/tự động lưu, hoàn tác, xác nhận hàng loạt hoặc xử lý xung đột phiên bản.
- PRD không quy định kênh thông báo khi OCR/tối ưu hoàn tất; chỉ yêu cầu phản hồi trạng thái và ngăn gửi trùng.
- PRD không quy định nội dung chi tiết của watermark, câu chữ đầy đủ cho tuyên bố giới hạn sử dụng hoặc mẫu Gói bằng chứng PDF.
- PRD không nêu hệ thống thiết kế hay tiêu chuẩn accessibility cụ thể ngoài bàn phím, focus hợp lý và không dùng màu làm tín hiệu duy nhất.
