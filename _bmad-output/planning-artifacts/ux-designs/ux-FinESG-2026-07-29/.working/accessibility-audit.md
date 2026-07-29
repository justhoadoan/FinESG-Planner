# Rà soát UX: khả năng tiếp cận và an toàn dữ liệu

**Nguồn rà soát:** PRD FinESG Planner v1.0  
**Phạm vi:** hành vi giao diện, xác nhận của con người, ngăn lỗi, microcopy và responsive web. Không đưa ra quyết định về màu sắc, typography hoặc phong cách thị giác.

## Kết luận

PRD có nền tảng kiểm soát tốt: dữ liệu có nguồn, trạng thái xác nhận, version hóa, không tự điền số 0, không tự nới ràng buộc và không dùng màu làm tín hiệu duy nhất. Tuy nhiên, để đủ an toàn cho dữ liệu tài chính, `EXPERIENCE.md` cần biến các nguyên tắc đó thành hành vi có thể kiểm thử.

Đánh giá: **đạt có điều kiện**. Năm guardrail dưới đây là P0 và không được cắt khỏi MVP.

## 5 guardrail UX không thể thương lượng

### UXG-01 — Xem lại trước mọi xác nhận có hậu quả

- Lưu bản nháp không đồng nghĩa với xác nhận; hệ thống không bao giờ tự xác nhận khi autosave, import, sao chép hoặc sửa hàng loạt.
- Trước khi xác nhận BCTC, giả định tương lai, gói vay, CO₂, điểm rủi ro hoặc Phương án cuối, người dùng phải xem được: phạm vi xác nhận, giá trị vừa thay đổi, cảnh báo còn mở, đơn vị/kỳ/phạm vi, nguồn và tác động tới các lần chạy.
- Người dùng luôn có ba khả năng: quay lại sửa, hủy, hoặc xác nhận rõ ràng. Xác nhận hàng loạt bị chặn nếu còn trường “Cần kiểm tra”, thiếu nguồn hoặc lỗi ngăn chạy.
- Sau xác nhận, thay đổi phải tạo phiên bản mới và lập tức đánh dấu mọi kết quả phụ thuộc là “Cần chạy lại”; không được tiếp tục trình bày kết quả cũ như kết quả hiện hành.
- Xóa dữ liệu, từ chối bằng chứng, đóng cờ đỏ và xuất Gói bằng chứng phải có bước xem lại hậu quả; thao tác có thể đảo ngược thì cung cấp hoàn tác, thao tác không thể đảo ngược thì yêu cầu xác nhận cụ thể theo tên đối tượng.

Guardrail này hiện thực hóa nguyên tắc kiểm tra/xem lại/xác nhận đối với dữ liệu tài chính trong [WCAG 2.2, tiêu chí 3.3.4](https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data).

### UXG-02 — Không cho phép nhập số “đúng cú pháp nhưng sai nghĩa”

- Mọi ô số phải luôn có ngữ cảnh máy đọc được và nhìn thấy được: tên chỉ tiêu, đơn vị, tiền tệ, tháng/kỳ, cơ sở hợp nhất/riêng lẻ và trạng thái.
- Chuỗi rỗng, `0`, `N/A`, “chưa biết” và “không áp dụng” là các trạng thái khác nhau; hệ thống không được tự đổi ô trống thành 0.
- Bộ phân tích số phải xử lý rõ quy ước Việt Nam cho dấu thập phân và phân tách hàng nghìn. Nếu chuỗi có thể hiểu theo nhiều cách, phải yêu cầu người dùng chọn cách hiểu và hiển thị giá trị chuẩn hóa trước khi lưu.
- Khi dán bảng 12 tháng hoặc import, hệ thống phải cho xem trước dữ liệu đã ánh xạ, nêu số ô hợp lệ/lỗi/cảnh báo, và cho sửa trước khi ghi. Không được cắt chữ số, tự đổi đơn vị, tự làm tròn dữ liệu gốc hoặc tự ép giá trị vào ngưỡng.
- Lỗi cấp trường xuất hiện cạnh trường và trong một danh sách lỗi đầu trang; mỗi lỗi nêu “điều gì sai — ảnh hưởng gì — sửa ở đâu”. Sau khi sửa, focus quay về đúng trường hoặc lỗi kế tiếp.
- Các kiểm tra chéo như tổng gốc vượt dư nợ, giải ngân vay muộn hơn CapEx, cộng trùng dòng tiền và sai ngày gốc phải chạy trước xác nhận và trước khi chạy bộ giải.

### UXG-03 — Trạng thái, phiên bản và mức độ tin cậy phải đi cùng kết quả

- Mọi màn hình kết quả, so sánh, lịch sử và xuất báo cáo phải công bố đồng thời: loại đầu ra, trạng thái dữ liệu, mã phiên bản đầu vào, mã lần chạy và trạng thái Bộ kiểm tra nghiệm.
- “Sàng lọc mô phỏng”, “Phân tích tài chính 12 tháng”, “Đã xác nhận”, “Cần kiểm tra”, “Cần chạy lại” và “Lỗi thời” phải là nhãn văn bản; không chỉ dựa vào màu, biểu tượng, watermark hoặc vị trí.
- Kết quả lỗi thời vẫn được xem để truy vết nhưng mọi hành động “chọn làm Phương án cuối” và “xuất không có nhãn mô phỏng” phải bị chặn. Hệ thống chỉ ra thay đổi nào làm kết quả lỗi thời và cung cấp hành động tạo lần chạy mới.
- Chỉ cho so sánh trực tiếp các lần chạy cùng phiên bản. Nếu người dùng cố so sánh khác phiên bản, hệ thống giải thích khác biệt và không trình bày chênh lệch như tác động của Chiến lược.
- Khi một tác vụ OCR/tối ưu/xuất báo cáo đang chạy, lần bấm lặp không tạo job thứ hai. Nếu mất mạng hoặc timeout, giao diện phải khôi phục đúng trạng thái job thay vì yêu cầu người dùng đoán có nên chạy lại.

### UXG-04 — Mô phỏng và dữ liệu đã xác nhận không được “trông tương đương”

- Nhãn mô phỏng phải xuất hiện tại điểm nhập, checklist, nút chạy, tiêu đề kết quả, từng chỉ tiêu phụ thuộc và Gói bằng chứng; trạng thái không được mất khi người dùng đổi màn hình.
- Nút hành động phải nói đúng hậu quả: “Chạy sàng lọc mô phỏng”, “Chạy phân tích tài chính 12 tháng”, “Tạo lần chạy mới”, không dùng chung một nhãn “Chạy”.
- Sẵn sàng tài chính và sẵn sàng CO₂ là hai trục độc lập. Giao diện không được dùng một trạng thái “Hợp lệ” duy nhất khiến người dùng hiểu rằng cả tài chính lẫn phát thải đều đã được xác nhận.
- Trước khi chạy hoặc xuất kết quả có dữ liệu mô phỏng, giao diện tóm tắt chính xác trường/Dự án nào là mô phỏng và hệ quả: kết quả không dùng cho quyết định cuối.
- Confidence trích xuất phải được diễn giải là “mức tin cậy của đề xuất trích xuất”, không phải xác suất số liệu đúng về kế toán.

### UXG-05 — Luồng cốt lõi phải dùng được không phụ thuộc chuột, màu hoặc bố cục hai cột

- Chuẩn hành vi tối thiểu là WCAG 2.2 AA: toàn bộ luồng P0 dùng được bằng bàn phím; focus có thứ tự hợp lý, luôn nhìn thấy và không bị lớp cố định che; không có bẫy focus.
- Thông báo trạng thái bất đồng bộ như “đang OCR”, “đã hoàn tất”, “vô nghiệm”, “xuất thất bại” phải được công bố cho công nghệ hỗ trợ mà không tự ý chuyển focus. Khi có lỗi ngăn tiếp tục, focus chuyển đến tóm tắt lỗi.
- Bảng dữ liệu phải có quan hệ hàng–cột và tiêu đề có thể đọc bằng công nghệ hỗ trợ. Mọi hành động trong ô phải truy cập được bằng bàn phím; không có thông tin chỉ xuất hiện khi hover.
- Liên kết Provenance giữa giá trị và PDF không được phụ thuộc vào việc nhìn hai vùng cạnh nhau. Trên tablet hoặc khi zoom, người dùng vẫn có thể mở nguồn, biết đang đối chiếu trường nào và quay lại đúng ô mà không mất bản nháp.
- Ở màn hình điện thoại, MVP phải chọn một trong hai hành vi nhất quán: luồng đầy đủ có thể reflow, hoặc chế độ chỉ xem có thông báo rõ. Không được hiển thị một form chỉnh sửa thiếu trường/nút do bị ẩn theo breakpoint.
- Khi zoom hoặc tăng cỡ chữ, form và điều hướng không mất nội dung/chức năng; bảng và PDF có thể cuộn hai chiều khi bản chất dữ liệu yêu cầu, nhưng các nút hoàn tất/hủy và trạng thái hiện tại vẫn truy cập được.

## Yêu cầu microcopy bắt buộc

1. Không dùng “phương án tốt nhất”, “đã phê duyệt”, “khuyến nghị đầu tư” hoặc “đủ khả năng trả nợ”. Dùng: **“Phương án tối ưu theo Chiến lược, ngưỡng và dữ liệu đã xác nhận”**.
2. Không dùng “Hợp lệ” đứng riêng. Dùng một trong các câu cụ thể: **“Nghiệm đạt các ràng buộc đã cấu hình”**, **“Bộ dữ liệu đã được Kế toán xác nhận”**, hoặc **“Phiếu CO₂ đã được người phụ trách ESG xác nhận”**.
3. Lần đầu xuất hiện phải mở rộng các viết tắt như CFADS, DSCR, NPV; các lần sau vẫn có giải thích tại chỗ dùng được bằng bàn phím và cảm ứng.
4. Cảnh báo và lỗi phải có cấu trúc: **sự cố → tác động → hành động khắc phục**. Ví dụ: “Tiền cuối kỳ tháng 4 thấp hơn ngưỡng 2 tỷ đồng; Phương án không thể được xác nhận. Hãy sửa ngưỡng, tiến độ CapEx hoặc nguồn vốn rồi tạo lần chạy mới.”
5. “Vô nghiệm” phải được giải thích bằng tiếng nghiệp vụ, liệt kê ràng buộc gây nghẽn và khẳng định hệ thống **chưa thay đổi ngưỡng**.
6. Nút hành động dùng động từ và đối tượng cụ thể; không dùng “OK”, “Tiếp tục” hoặc “Xác nhận” khi không rõ đang xác nhận điều gì.

## An toàn dữ liệu tài chính và quyền riêng tư

- Không đưa giá trị tài chính nhạy cảm, tên tệp đầy đủ hoặc dữ liệu Dự án vào URL, tiêu đề trình duyệt, thông báo hệ thống ngoài ứng dụng hay log phía người dùng.
- Tải xuống Gói bằng chứng phải nêu nội dung/phạm vi, loại đầu ra, tên tệp dự kiến và cảnh báo dữ liệu nhạy cảm trước khi tạo tệp.
- Nếu phiên làm việc hết hạn hoặc mất kết nối, bản nháp phải được bảo toàn hoặc hệ thống phải cảnh báo trước; không được âm thầm bỏ dữ liệu người dùng vừa nhập.
- Hồ sơ được sao chép phải nêu rõ xác nhận nào được kế thừa và xác nhận nào phải thực hiện lại. Không đối tượng nào được mang trạng thái “Đã xác nhận” chỉ vì được sao chép sang bối cảnh khác.
- Trong MVP chưa có RBAC hoàn chỉnh, microcopy phải nói rõ người xác nhận là danh tính được ghi nhận trong môi trường demo, không được diễn đạt như chữ ký số hoặc phê duyệt có thẩm quyền.

## Tiêu chí kiểm thử UX tối thiểu

- Hoàn thành UJ-1 đến UJ-6 chỉ bằng bàn phím trên desktop.
- Hoàn thành đối chiếu 12 Trường BCTC và nhập 12 tháng trên tablet mà không mất ngữ cảnh hay dữ liệu.
- Thử với số Việt Nam có dấu `.`/`,` mơ hồ, ô trống, số 0, số âm, đơn vị nghìn/triệu/tỷ và dữ liệu dán thiếu tháng.
- Thử chỉnh một giá trị đã xác nhận và kiểm chứng mọi kết quả phụ thuộc chuyển sang “Cần chạy lại”.
- Thử trình đọc màn hình với bảng BCTC, tóm tắt lỗi, trạng thái job và liên kết Provenance.
- Thử zoom/tăng cỡ chữ, mất mạng giữa OCR/tối ưu/xuất báo cáo, bấm chạy liên tiếp và quay lại từ PDF.
- Thử mọi nhánh “Mô phỏng”, “Vô nghiệm”, “Nghiệm trùng”, “Lỗi thời”, “CO₂ chưa xác nhận” và “CapEx sau tháng 12”.

## Khuyến nghị đưa vào hai spine

- Đưa toàn bộ UXG-01 đến UXG-05, microcopy và tiêu chí kiểm thử vào `EXPERIENCE.md`.
- `DESIGN.md` chỉ cần chịu trách nhiệm biểu đạt thị giác cho các trạng thái/token tương ứng; hành vi chặn, xác nhận, focus, phiên bản và thông báo vẫn thuộc `EXPERIENCE.md`.
