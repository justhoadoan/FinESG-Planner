---
title: PRD - FinESG Planner
status: final
version: 1.0
created: 2026-07-29
updated: 2026-07-29
language: vi
working_mode: fast-path
primary_source: G:/FinESG/Ho-so-du-thi-Quantum-FinESG-Focus-Revised.docx
---

# PRD: FinESG Planner

## 0. Mục đích tài liệu

PRD này chuyển đề án FinESG Planner thành hợp đồng sản phẩm có thể dùng trực tiếp cho UX, kiến trúc, chia Epic/Story, lập kế hoạch Sprint và nghiệm thu MVP sáu tuần. Tài liệu dùng thuật ngữ thống nhất trong Mục 3, đánh số yêu cầu chức năng toàn cục từ FR-1 và đánh dấu mọi nội dung suy luận bằng `[ASSUMPTION Ax]`. Nguồn sự thật chính là hồ sơ đề án đã sửa; tài liệu nghiên cứu thị trường chỉ được dùng để làm rõ định vị và ranh giới, không thay đổi cam kết của đề án.

**Tuyên bố sản phẩm:** FinESG Planner là công cụ hỗ trợ **sàng lọc sơ bộ** danh mục CapEx xanh. Hệ thống không phê duyệt đầu tư, không cấp tín dụng, không kiểm toán, không chứng nhận ESG và không thay thế thẩm định tài chính hoàn chỉnh.

### 0.1 Hợp đồng triển khai tóm tắt

- **P0 phải tạo được:** BCTC có Provenance và Kế toán xác nhận → giả định 12 tháng có trạng thái → tối đa 10 Dự án/1–3 Gói vay → ba Chiến lược MILP → Bộ kiểm tra nghiệm → dashboard giải thích → Gói bằng chứng PDF.
- **Không được cắt:** tính đúng công thức, cổng 12 Trường BCTC, cổng CO₂ đã xác nhận, nhãn Sàng lọc mô phỏng, cảnh báo tài trợ sau tháng 12, Bộ kiểm tra nghiệm và Audit Trail tối thiểu.
- **Release gate:** 100% golden tests tài chính; 100% Phương án hiển thị được Bộ kiểm tra nghiệm xác nhận hợp lệ; không cộng trùng CO₂; P95 bộ giải < 3 giây trên cấu hình demo; các giới hạn của smoke test được báo cáo rõ ràng.
- **Phase-blocker trước khi code bộ giải:** DR-03 (hợp đồng CFADS/DSCR/tiền), DR-07 (dung sai/trạng thái), DR-13 (Ngày gốc), DR-14 (nguồn NPV) và DR-16 (thanh khoản theo tháng).
- **Cut order khi trễ:** dùng thứ tự tại Mục 9.2; không được đổi guardrail P0 để giữ lịch.

## 1. Tầm nhìn

FinESG Planner giúp CFO của doanh nghiệp xi măng và thép Việt Nam có quan hệ thương mại với EU trả lời một câu hỏi thực tế: với năng lực tài chính, các giả định 12 tháng và các bằng chứng giảm phát thải hiện có, doanh nghiệp nên chọn tập dự án nào và tài trợ chúng ra sao theo một chiến lược đã công bố trước.

Sản phẩm kết nối ba nhóm dữ liệu thường bị tách rời trong bảng tính: dữ liệu BCTC có bằng chứng nguồn, giả định tài chính tương lai do CFO xác nhận và dữ liệu dự án có phiếu bằng chứng phát thải. Một mô hình MILP sau đó tạo Phương án theo ba Chiến lược có thứ tự ưu tiên rõ ràng. Mọi kết quả phải giải thích được, tái lập được và được Bộ kiểm tra nghiệm độc lập xác nhận hợp lệ trước khi hiển thị.

Lợi thế của FinESG Planner không phải là “một ESG suite mới” hay “công cụ CBAM”. Lợi thế là chuỗi kiểm soát hẹp nhưng hoàn chỉnh:

> BCTC Việt Nam → dữ liệu có Provenance → con người xác nhận → giả định tương lai có nhãn → tối ưu CapEx xanh theo ràng buộc CFO → Gói bằng chứng có Audit Trail.

### 1.1 Vấn đề cần giải quyết

- BCTC PDF khó tái sử dụng, dễ sai đơn vị, kỳ, phạm vi hợp nhất/riêng lẻ và thiếu liên kết về trang nguồn.
- CFO không chỉ chọn Dự án; CFO còn phải cân đối vốn nội bộ, gói vay, thanh khoản, nghĩa vụ nợ và ngưỡng rủi ro.
- NPV vòng đời, CO₂ theo năm và khả năng chi trả 12 tháng là các đại lượng khác kỳ; gộp chúng thành một điểm trọng số khiến kết quả khó giải thích và dễ đảo chiều.
- Số liệu CO₂ do người dùng nhập có nguy cơ trở thành “một cột xanh” nếu không có cấu trúc bằng chứng và bước xác nhận.
- Một nghiệm tối ưu về danh mục chưa chắc là Phương án tài trợ phù hợp nếu mô hình không xét chi phí vay, mục tiêu giảm nợ và quy tắc phá hòa.

### 1.2 Vì sao là bây giờ

Doanh nghiệp xi măng/thép phải đồng thời quản lý nhu cầu chuyển đổi phát thải và giới hạn vốn. MVP tập trung vào quyết định nội bộ của CFO; nghĩa vụ CBAM, kiểm kê phát thải cấp doanh nghiệp và báo cáo tuân thủ vẫn thuộc các hệ thống chuyên biệt.

### 1.3 Nguyên tắc sản phẩm

1. **Có nguồn trước khi có điểm:** mọi số liệu BCTC và CO₂ quan trọng phải có Provenance và Trạng thái xác nhận.
2. **Con người giữ quyền quyết định:** hệ thống đề xuất; Kế toán, Người xác nhận ESG và CFO chịu trách nhiệm xác nhận đầu vào tương ứng.
3. **Không tạo dữ kiện tương lai:** hệ thống có thể cung cấp mẫu/kịch bản, nhưng không trình bày dữ liệu ước tính như dữ liệu thật.
4. **Không dùng điểm tổng hợp mờ:** NPV, CO₂, thanh khoản, DSCR, nợ, chi phí tài trợ và rủi ro được hiển thị riêng.
5. **Tối ưu có điều kiện:** chỉ dùng cụm từ “tối ưu theo Chiến lược, ngưỡng và dữ liệu đã xác nhận”, không tuyên bố “phương án tốt nhất” tuyệt đối.
6. **Không tự nới ràng buộc:** nếu bài toán vô nghiệm, hệ thống giải thích nguyên nhân và để CFO quyết định thay đổi đầu vào.
7. **Kết quả phải tái lập:** cùng phiên bản dữ liệu, cấu hình và bộ giải phải cho cùng kết quả.

## 2. Người dùng mục tiêu

### 2.1 Người dùng chính và trách nhiệm

| Vai trò nghiệp vụ | Mục tiêu | Trách nhiệm trong FinESG Planner |
|---|---|---|
| CFO/Trưởng phòng Tài chính | Chọn danh mục và cơ cấu tài trợ phù hợp | Chọn Chiến lược, Kịch bản, Gói vay và ngưỡng; xác nhận Giả định tài chính tương lai; duyệt Phương án cuối |
| Kế toán trưởng/Kế toán tài chính | Bảo đảm baseline BCTC đúng và có nguồn | Đối chiếu 12 Trường BCTC, sửa sai, xác nhận đơn vị/kỳ/phạm vi và khóa phiên bản |
| Người phụ trách ESG/MRV | Bảo đảm số liệu giảm phát thải có thể giải trình | Hoàn thiện và xác nhận Phiếu bằng chứng phát thải; gắn cờ dữ liệu mô phỏng hoặc không đủ bằng chứng |
| Ban điều hành | Xem và thảo luận phương án | Xem so sánh, lý do chọn/loại, ràng buộc chạm ngưỡng và Gói bằng chứng |

`[ASSUMPTION A1]` Trong MVP sáu tuần, các vai trò trên chỉ được triển khai ở mức **ghi nhận trách nhiệm nghiệp vụ và người xác nhận**; chưa yêu cầu SSO hay mô hình RBAC doanh nghiệp hoàn chỉnh.

### 2.2 Jobs To Be Done

- Khi nhận BCTC PDF, Kế toán muốn lấy nhanh 12 Trường BCTC và thấy ngay trang/vùng nguồn để không phải nhập lại toàn bộ.
- Khi lập kế hoạch CapEx, CFO muốn chọn một Kịch bản và Gói vay mẫu, chỉ sửa/xác nhận các biến tương lai quan trọng.
- Khi đánh giá Dự án xanh, Người phụ trách ESG muốn chứng minh con số CO₂ bằng một Phiếu bằng chứng phát thải nhất quán.
- Khi có nhiều Dự án nhưng vốn hạn chế, CFO muốn nhận Phương án tối ưu theo khẩu vị đã chọn mà vẫn giữ tiền mặt, DSCR và nợ trong ngưỡng.
- Khi một Phương án bị phản biện, CFO muốn truy ngược được số liệu, giả định, phiên bản mô hình và lý do chọn/loại từng Dự án.
- Khi đầu vào thiếu hoặc ràng buộc xung đột, CFO muốn biết điều gì đang chặn bài toán thay vì nhận một kết quả có vẻ hợp lệ nhưng đã âm thầm nới điều kiện.

### 2.3 Người không thuộc phạm vi MVP

- Doanh nghiệp ngoài ngành xi măng/thép hoặc không thuộc nhóm thí điểm có quan hệ thương mại với EU.
- Ngân hàng dùng hệ thống để tự động phê duyệt tín dụng.
- Kiểm toán viên hoặc tổ chức bảo đảm dùng kết quả như bằng chứng kiểm toán/chứng nhận.
- Bộ phận tuân thủ dùng hệ thống để lập tờ khai CBAM hoặc kiểm kê phát thải đầy đủ.
- Nhà đầu tư bên ngoài cần định giá doanh nghiệp hoặc khuyến nghị chứng khoán.

### 2.4 Hành trình người dùng chính

#### UJ-1. Minh, CFO, khởi tạo Hồ sơ phân tích

Minh là CFO của một doanh nghiệp xi măng có khách hàng EU. Anh mở web app, tạo Hồ sơ phân tích, chọn ngành, ngày gốc, kỳ BCTC và đơn vị tiền tệ. Hệ thống tạo checklist đầu vào và hiển thị rõ hai mức đầu ra: Sàng lọc mô phỏng hoặc Phân tích tài chính 12 tháng.

**Kết quả:** người dùng biết dữ liệu nào hệ thống sẽ trích, dữ liệu nào cần xác nhận và điều kiện nào để mở khóa phân tích đầy đủ.

#### UJ-2. Lan, Kế toán trưởng, xác nhận Bộ dữ liệu tài chính lịch sử

Lan là Kế toán trưởng phụ trách số liệu cho Hồ sơ phân tích của Minh. Chị tải BCTC PDF; hệ thống phân loại PDF có lớp text hoặc bản scan, trích 12 Trường BCTC và hiển thị giá trị đề xuất bên cạnh trang hoặc vùng nguồn tương ứng. Lan xử lý các trường Confidence thấp, kiểm tra đơn vị, kỳ, phạm vi hợp nhất/riêng lẻ, sửa nếu cần và xác nhận.

**Kết quả:** một Bộ dữ liệu tài chính lịch sử đã khóa phiên bản, sẵn sàng làm baseline.

**Ngoại lệ:** nếu một trường thiếu hoặc không thể đọc, hệ thống không tự điền số 0; trường chuyển sang “Cần kiểm tra” và các phép tính phụ thuộc bị khóa hoặc mang nhãn mô phỏng.

#### UJ-3. Minh xác nhận Kịch bản và Gói vay

CFO chọn Kịch bản thấp/cơ sở/cao, xem các giá trị mẫu đã điền và chỉ sửa/xác nhận dòng tiền kinh doanh dự kiến, nghĩa vụ nợ hiện hữu, Gói vay mới, tiến độ giải ngân CapEx, dòng tiền năm đầu, tỷ lệ chiết khấu và các ngưỡng. Hệ thống kiểm tra đơn vị, kỳ và nguy cơ cộng trùng dòng tiền.

**Kết quả:** Giả định tài chính tương lai chuyển sang “Đã xác nhận”, cho phép tính tiền cuối kỳ và DSCR 12 tháng.

#### UJ-4. Thảo, phụ trách ESG/MRV, xác nhận Dự án và CO₂

Thảo phụ trách ESG/MRV của doanh nghiệp. Chị nhập hoặc kiểm tra Phiếu bằng chứng phát thải cho từng Dự án, gồm đường cơ sở, Scope, nguồn hệ số, phương pháp, kỳ đo, độ chắc chắn và trạng thái dữ liệu thật/mô phỏng. Chỉ CO₂ đã xác nhận mới đủ điều kiện đi vào mục tiêu chính.

**Kết quả:** Dự án có trạng thái bằng chứng rõ ràng và Điểm rủi ro 0–10.

#### UJ-5. Minh chạy và xử lý bài toán tối ưu

CFO chọn một Chiến lược, Kịch bản, 1–3 Gói vay được phép và các ngưỡng. Hệ thống chạy MILP, sau đó Bộ kiểm tra nghiệm kiểm tra lại cân bằng vốn và mọi ràng buộc.

**Kết quả:** hệ thống hiển thị Phương án hợp lệ hoặc trạng thái “Vô nghiệm”, kèm ràng buộc gây nghẽn. Hệ thống không tự thay đổi ngưỡng.

#### UJ-6. Minh so sánh và xuất Gói bằng chứng

CFO chạy ba Chiến lược trên cùng một phiên bản dữ liệu, so sánh danh mục, vốn nội bộ, vốn vay, chi phí tài trợ, NPV, CO₂, tiền mặt, DSCR và rủi ro. CFO chọn Phương án để trình Ban điều hành và xuất Gói bằng chứng.

**Kết quả:** quyết định có thể được giải trình, tái lập và bàn giao sang các quy trình ESG, EPM hoặc ngân hàng tiếp theo.

## 3. Thuật ngữ

- **Hồ sơ phân tích** — Đơn vị làm việc cấp cao nhất, chứa doanh nghiệp, ngày gốc, Bộ dữ liệu tài chính lịch sử, Kịch bản, Dự án, Gói vay, cấu hình và các lần chạy.
- **Ngày gốc** — Ngày bắt đầu kỳ kế hoạch 12 tháng; trong MVP phải trùng ngày kết thúc của BCTC làm baseline.
- **Trường BCTC** — Một trong 12 chỉ tiêu tài chính lịch sử được khóa trong MVP.
- **Bộ dữ liệu tài chính lịch sử** — Tập 12 Trường BCTC đã chuẩn hóa và có Provenance; chỉ là baseline quá khứ.
- **Provenance** — Bằng chứng truy nguồn gồm tài liệu, phiên bản, trang, vùng nguồn, văn bản gốc, phương thức trích xuất và người xác nhận.
- **Confidence** — Mức tin cậy của đề xuất tự động trước khi con người sửa; không đồng nghĩa với xác nhận nghiệp vụ.
- **Trạng thái xác nhận** — Một trong các trạng thái Nháp, Cần kiểm tra, Đã xác nhận hoặc Bị từ chối.
- **Giả định tài chính tương lai** — Dữ liệu dự báo 12 tháng do CFO chọn, nhập hoặc xác nhận; không được suy ra như sự thật chỉ từ BCTC.
- **Kịch bản** — Bộ Giả định tài chính tương lai theo mức Thấp, Cơ sở hoặc Cao.
- **Gói vay** — Nguồn tài trợ mới có hạn mức, lãi suất, phí, kỳ hạn, ân hạn, lịch giải ngân/trả nợ và điều kiện đủ.
- **Dự án** — Khoản đầu tư CapEx mà trong MVP được quyết định theo cách nhị phân: khởi động và chọn toàn bộ, hoặc không chọn; bộ giải chỉ kiểm tra tài trợ và thanh khoản trong 12 tháng, không chứng nhận đủ vốn cho toàn bộ vòng đời.
- **Phiếu bằng chứng phát thải** — Hồ sơ có cấu trúc chứng minh lượng CO₂ dự kiến giảm của một Dự án.
- **CO₂ đã xác nhận** — Giá trị tCO₂e/năm ở trạng thái Đã xác nhận; là loại CO₂ duy nhất được dùng trong mục tiêu chính.
- **Điểm rủi ro** — Điểm của một Dự án, bằng tổng năm chiều rủi ro, mỗi chiều 0–2; giá trị từ 0 đến 10.
- **Rủi ro danh mục** — Tổng Điểm rủi ro của các Dự án được chọn; chỉ dùng ở tầng mục tiêu cuối của Chiến lược Cân bằng.
- **Dòng tiền kinh doanh trước trả nợ** — Dòng tiền 12 tháng do CFO xác nhận, đã phản ánh hoạt động, thuế và vốn lưu động nhưng loại trừ dòng tiền Dự án mới, CapEx, giải ngân vay và trả nợ.
- **CFADS 12 tháng** — Dòng tiền sẵn có để trả nợ trong hợp đồng MVP, bằng Dòng tiền kinh doanh trước trả nợ cộng dòng tiền hoạt động năm đầu của Dự án được chọn nhưng chưa nằm trong dự báo.
- **Nghĩa vụ nợ 12 tháng** — Tổng gốc, lãi và phí tiền mặt đến hạn trong 12 tháng của nợ hiện hữu và Gói vay mới.
- **DSCR 12 tháng** — `CFADS 12 tháng / Nghĩa vụ nợ 12 tháng`; ràng buộc được kiểm tra ở dạng nhân để tránh chia cho 0.
- **Tiền cuối kỳ** — Tiền và tương đương tiền dự kiến tại cuối tháng 12 theo công thức ở Mục 4.3.1.
- **Nợ cuối kỳ** — Dư nợ gốc hiện hữu và mới còn lại tại cuối tháng 12; không gồm lãi/phí đã trả.
- **Vốn chủ cơ sở** — Vốn chủ sở hữu FS-07 tại ngày gốc, dùng làm mẫu số của ngưỡng nợ trong MVP.
- **NPV trước tài trợ** — Giá trị hiện tại ròng vòng đời của dòng tiền Dự án, gồm CapEx nhưng loại trừ dòng tiền vay, gốc, lãi và phí tài trợ.
- **Chi phí tài trợ** — Giá trị hiện tại của lãi và phí phát sinh từ Gói vay; là mục tiêu phụ, tách khỏi NPV trước tài trợ.
- **Ngưỡng tài chính** — Điều kiện tối thiểu/tối đa do CFO xác nhận, gồm Tiền cuối kỳ, DSCR 12 tháng, Nợ cuối kỳ/Vốn chủ cơ sở, NPV, rủi ro hoặc CO₂ tùy Chiến lược.
- **Chiến lược** — Thứ tự ưu tiên lexicographic được khóa: An toàn, Cân bằng hoặc Chuyển đổi nhanh.
- **Phương án** — Tập Dự án và cơ cấu vốn nội bộ/Gói vay do bộ giải tạo cho một Chiến lược, Kịch bản và phiên bản dữ liệu cụ thể.
- **Bộ kiểm tra nghiệm** — Thành phần độc lập kiểm tra lại cân bằng vốn và mọi ràng buộc trước khi Phương án được hiển thị.
- **Trạng thái bộ giải** — Một trong Tối ưu đã kiểm chứng, Khả thi chưa chứng minh tối ưu, Vô nghiệm, Không bị chặn, Lỗi hoặc Không vượt Bộ kiểm tra nghiệm.
- **Dung sai tối ưu** — Ngưỡng tuyệt đối/tương đối đã version hóa dùng để khóa tầng mục tiêu và kiểm tra tính khả thi.
- **Khoảng cách tối ưu** — Chênh lệch tương đối/tuyệt đối do bộ giải báo giữa nghiệm hiện tại và cận tốt nhất đã chứng minh; dùng để phân biệt Tối ưu với Khả thi chưa chứng minh tối ưu.
- **Tỷ lệ tự xử lý** — Tỷ lệ Trường BCTC có đề xuất tự động và không bị chuyển ngay sang Cần kiểm tra; luôn được báo cùng Precision.
- **Gói bằng chứng** — Báo cáo xuất gồm đầu vào, Provenance, giả định, kết quả, lý do, trạng thái bộ giải, phiên bản và Audit Trail.
- **Audit Trail** — Nhật ký bất biến ở mức ứng dụng về ai đã thay đổi/xác nhận gì, lúc nào và lần chạy nào bị ảnh hưởng.
- **Sàng lọc mô phỏng** — Kết quả có ít nhất một đầu vào tương lai thiết yếu chưa được xác nhận; không được trình bày như thẩm định tài chính hoàn chỉnh.

## 4. Yêu cầu sản phẩm

### 4.1 Quản lý Hồ sơ phân tích và trạng thái sẵn sàng

**Mô tả:** Hồ sơ phân tích là nơi tập hợp toàn bộ dữ liệu, giả định và kết quả. Giao diện phải giúp CFO biết ngay bước nào đã hoàn tất và mức tin cậy của đầu ra. Hiện thực hóa UJ-1.

#### FR-1: Tạo và quản lý Hồ sơ phân tích

CFO có thể tạo, xem, đổi tên và sao chép một Hồ sơ phân tích với doanh nghiệp, ngành, ngày gốc, kỳ BCTC, phạm vi báo cáo và đơn vị tiền tệ.

**Điều kiện nghiệm thu:**

- Ngành MVP chỉ cho phép “Xi măng” hoặc “Thép”.
- Mỗi Hồ sơ phân tích có mã duy nhất và số phiên bản.
- Khi sao chép, hệ thống tạo Hồ sơ phân tích mới nhưng giữ liên kết truy nguyên đến bản nguồn.
- `[ASSUMPTION A2]` Mỗi Hồ sơ phân tích dùng một đồng tiền cơ sở; chuyển đổi ngoại tệ tự động nằm ngoài MVP.
- `[ASSUMPTION A15]` Ngày gốc phải trùng ngày kết thúc kỳ BCTC đã xác nhận. Nếu khác ngày, Hồ sơ phân tích chỉ ở trạng thái Sẵn sàng mô phỏng; chức năng roll-forward số dư nằm ngoài MVP.

#### FR-2: Hiển thị checklist và mức đầu ra

Hệ thống phải hiển thị trạng thái hoàn tất của Bộ dữ liệu tài chính lịch sử, Giả định tài chính tương lai, Dự án, Phiếu bằng chứng phát thải và Ngưỡng tài chính.

**Điều kiện nghiệm thu:**

- Khi thiếu đầu vào tương lai thiết yếu, nút Chạy vẫn có thể khởi chạy chế độ Sàng lọc mô phỏng nhưng phải hiển thị cảnh báo rõ.
- Chỉ khi các đầu vào tài chính thiết yếu ở trạng thái Đã xác nhận, hệ thống mới gắn nhãn “Phân tích tài chính 12 tháng”.
- Mỗi cảnh báo phải chỉ ra trường thiếu và hành động cần thực hiện.

**Ma trận trạng thái sẵn sàng:**

| Trạng thái Hồ sơ phân tích | Điều kiện | Hành động được phép |
|---|---|---|
| Chưa đủ dữ liệu | Thiếu giá trị số bắt buộc hoặc có bất kỳ Trường BCTC nào chưa ở trạng thái Đã xác nhận | Không chạy; hiển thị trường thiếu/chưa xác nhận |
| Sẵn sàng mô phỏng | Cả 12 Trường BCTC ở trạng thái Đã xác nhận và có đủ giá trị số, nhưng Giả định tài chính tương lai hoặc dữ liệu Dự án còn Ước tính/Mô phỏng | Chạy Sàng lọc mô phỏng; mọi kết quả có watermark |
| Sẵn sàng tài chính 12 tháng | 12 Trường BCTC, Giả định tài chính tương lai, lịch Gói vay và dữ liệu tài chính Dự án đã xác nhận | Chạy và gắn nhãn Phân tích tài chính 12 tháng; CO₂ chưa xác nhận vẫn bị loại khỏi mục tiêu chính |
| Sẵn sàng quyết định | Đạt trạng thái tài chính, Phiếu bằng chứng phát thải của Dự án đủ điều kiện đã xác nhận, bộ giải Tối ưu đã kiểm chứng | Cho phép chọn Phương án cuối và xuất Gói bằng chứng không có watermark mô phỏng |
| Cần chạy lại | Một đầu vào hoặc quy tắc đã dùng bị thay đổi/hủy xác nhận | Chỉ xem lịch sử; phải tạo lần chạy mới |

Trạng thái của từng đối tượng dùng state machine `Nháp → Cần kiểm tra → Đã xác nhận` hoặc `Bị từ chối`; mọi thay đổi sau xác nhận tạo phiên bản mới và làm các lần chạy phụ thuộc chuyển sang `Cần chạy lại`.

### 4.2 Tiếp nhận BCTC và xác nhận 12 Trường BCTC

**Mô tả:** Hệ thống giảm nhập liệu thủ công nhưng không che giấu sự không chắc chắn. Mọi giá trị đề xuất phải đi kèm Provenance và bước Kế toán xác nhận. Hiện thực hóa UJ-2.

#### FR-3: Tải và phân loại BCTC PDF

Kế toán có thể tải BCTC PDF; hệ thống xác định tài liệu có lớp text hay cần OCR trước khi trích xuất.

**Điều kiện nghiệm thu:**

- Hệ thống lưu tên tệp, mã băm khi tệp được lưu hợp lệ, số trang, loại PDF, thời điểm tải và phiên bản.
- Lỗi đọc/OCR không làm mất tệp hoặc tạo giá trị 0 giả.
- Trạng thái xử lý tối thiểu gồm: Đã tải, Đang xử lý, Cần kiểm tra, Đã xác nhận, Lỗi.

#### FR-4: Trích đúng danh mục 12 Trường BCTC

Hệ thống đề xuất giá trị cho đúng 12 Trường BCTC sau:

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

**Điều kiện nghiệm thu:**

- Không thêm một chỉ tiêu ngoài danh mục vào công thức MVP nếu chưa thay đổi hợp đồng dữ liệu.
- Mỗi giá trị phải lưu cả văn bản gốc và giá trị chuẩn hóa.
- Dấu âm, đơn vị nghìn/triệu/tỷ, tiền tệ, kỳ và phạm vi hợp nhất/riêng lẻ phải được chuẩn hóa hoặc gắn cờ.

#### FR-5: Hiển thị Provenance và Confidence

Kế toán có thể xem giá trị đề xuất bên cạnh trang hoặc vùng nguồn tương ứng.

**Điều kiện nghiệm thu:**

- Provenance tối thiểu gồm mã trường, văn bản gốc, giá trị chuẩn hóa, đơn vị, kỳ, phạm vi, trang, bounding box, phương thức trích xuất, Confidence và phiên bản tài liệu.
- Confidence thấp hoặc thiếu vùng nguồn phải tự động chuyển sang “Cần kiểm tra”.
- Confidence không được hiển thị như xác suất số liệu đúng về nghiệp vụ.

#### FR-6: Sửa, xác nhận và khóa phiên bản

Kế toán có thể sửa giá trị, ghi lý do và xác nhận từng Trường BCTC hoặc toàn bộ Bộ dữ liệu tài chính lịch sử.

**Điều kiện nghiệm thu:**

- Hệ thống lưu giá trị trước/sau, người sửa, thời điểm và lý do.
- Không được dùng Trường BCTC chưa ở trạng thái Đã xác nhận trong **bất kỳ** phép tính hoặc lần chạy nào, kể cả Sàng lọc mô phỏng.
- Khi dữ liệu đã xác nhận bị thay đổi, mọi Phương án phụ thuộc chuyển sang “Cần chạy lại”.

#### FR-7: Kiểm tra logic tài chính đầu vào

Hệ thống kiểm tra các lỗi có thể phát hiện được như sai đơn vị, sai kỳ, thiếu phạm vi, giá trị không phải số và quan hệ tài chính bất thường.

**Điều kiện nghiệm thu:**

- Cảnh báo không tự sửa số liệu nếu không có quy tắc xác định.
- Người dùng có thể xác nhận một cảnh báo là ngoại lệ và phải ghi lý do.
- Kiểm tra logic và quy tắc kế toán được version hóa.

### 4.3 Giả định tài chính tương lai, Kịch bản và Gói vay

**Mô tả:** CFO không phải nhập lại toàn bộ dữ liệu. Hệ thống cung cấp ba Kịch bản và Gói vay mẫu để chọn; CFO chỉ sửa hoặc xác nhận các biến có tác động đến khả năng chi trả. Hiện thực hóa UJ-3.

#### FR-8: Tạo ba Kịch bản

Hệ thống cho phép tạo Kịch bản Thấp, Cơ sở và Cao cho cùng một Hồ sơ phân tích.

**Dữ liệu thiết yếu của mỗi Kịch bản:**

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

**Điều kiện nghiệm thu:**

- Giá trị mẫu/chưa xác nhận luôn mang nhãn “Ước tính” hoặc “Mô phỏng”.
- CFO có thể sao chép Kịch bản rồi thay đổi một số giả định để phân tích độ nhạy.
- Hệ thống lưu nguồn, ghi chú và người xác nhận cho từng giả định.
- `[ASSUMPTION A3]` Dòng tiền, giải ngân và nghĩa vụ nợ 12 tháng được nhập theo tháng; hệ thống tổng hợp thành chỉ tiêu 12 tháng.

#### FR-9: Cấu hình 1–3 Gói vay

CFO có thể chọn hoặc cấu hình từ 1 đến 3 Gói vay mới được phép cho một lần chạy.

**Điều kiện nghiệm thu:**

- Mỗi Gói vay có hạn mức, lãi suất, phí, kỳ hạn, thời gian ân hạn, lịch giải ngân, lịch trả gốc/lãi và điều kiện để Dự án đủ tiêu chuẩn.
- Gói vay chưa đủ dữ liệu không được dùng trong Phân tích tài chính 12 tháng.
- Hệ thống tính riêng nghĩa vụ nợ 12 tháng và Chi phí tài trợ của Gói vay.
- `[ASSUMPTION A4]` Chi phí tài trợ dùng trong mục tiêu phụ là giá trị hiện tại của lãi và phí trong vòng đời Gói vay; nghĩa vụ nợ dùng cho DSCR chỉ lấy phần đến hạn trong 12 tháng.
- `[ASSUMPTION A17]` Tỷ lệ chiết khấu Chi phí tài trợ mặc định bằng tỷ lệ chiết khấu cấp Hồ sơ phân tích; CFO có thể xác nhận giá trị khác. Tỷ lệ thực tế phải được lưu trong lần chạy.
- Tổng gốc hiện hữu trả lũy kế không được vượt Dư nợ mở đầu; tổng gốc Gói vay mới trả lũy kế tại một tháng không được vượt tổng giải ngân lũy kế đến tháng đó.

#### FR-10: Ngăn cộng trùng dòng tiền

Hệ thống phải yêu cầu CFO khai báo dòng tiền năm đầu của Dự án đã nằm trong dòng tiền kinh doanh dự kiến hay chưa.

**Điều kiện nghiệm thu:**

- Nếu trạng thái không rõ, hệ thống không được tính tiền cuối kỳ/CFADS như dữ liệu đã xác nhận.
- Mỗi dòng tiền chỉ được tính một lần trong tiền cuối kỳ và CFADS.
- Giao diện hiển thị công thức cấu thành để CFO kiểm tra.

#### FR-11: Phân tách đúng kỳ và công thức

Hệ thống tính và hiển thị riêng:

- NPV trước tài trợ vòng đời tại ngày gốc, từ dòng tiền Dự án và tỷ lệ chiết khấu CFO xác nhận.
- CO₂ theo tCO₂e/năm vận hành đầy đủ.
- Tiền cuối kỳ, CFADS 12 tháng, Nghĩa vụ nợ 12 tháng, DSCR 12 tháng và Nợ cuối kỳ/Vốn chủ cơ sở.

**Điều kiện nghiệm thu:**

- Không cộng ba nhóm chỉ tiêu thành một điểm chuẩn hóa.
- Chi phí tài trợ không bị trừ lặp vào NPV trước tài trợ.
- `[ASSUMPTION A5]` Dòng tiền Dự án được CFO nhập theo cùng cơ sở danh nghĩa và sau thuế; MVP không có mô-đun tự tính thuế, lạm phát hoặc tỷ giá.

#### 4.3.1 Hợp đồng tính toán tài chính 12 tháng

`[ASSUMPTION A10]` Các công thức dưới đây là những mặc định có hiệu lực của MVP. Mọi thay đổi phải tạo phiên bản hợp đồng tính toán mới và làm các Phương án cũ chuyển sang “Cần chạy lại”.

**Quy ước dữ liệu:**

- `t = 1..12` là tháng kể từ ngày gốc; mọi dòng tiền 12 tháng được nhập theo tháng rồi cộng để tạo tổng 12 tháng.
- Ngày gốc phải trùng ngày kết thúc của BCTC baseline theo A15; không dùng số dư cũ hơn mà không có roll-forward.
- Dòng tiền kinh doanh trước trả nợ và dòng tiền hoạt động Dự án là số ròng có dấu; CapEx, gốc, lãi và phí trả ra được lưu dưới dạng độ lớn dương rồi trừ trong công thức.
- `CashOpening = FS-01`; `DebtOpening = FS-04 + FS-05`; `EquityBase = FS-07`.
- Giá trị thiếu là `null`, không bao giờ ngầm chuyển thành 0.
- Dòng tiền kinh doanh trước trả nợ đã gồm thuế và biến động vốn lưu động, nhưng loại trừ dòng tiền Dự án mới, CapEx và mọi dòng tiền tài trợ.
- Dòng tiền hoạt động Dự án loại trừ CapEx và tài trợ. FR-10 quyết định có cộng dòng tiền này hay không.

**Công thức chuẩn:**

| Đại lượng | Công thức MVP |
|---|---|
| `ProjectOCF12` | `Σ_i Σ_t ProjectOCF_i,t × x_i`, chỉ với phần chưa nằm trong Dòng tiền kinh doanh trước trả nợ |
| `ExistingDebtService12` | `Σ_t (ExistingPrincipal_t + ExistingInterest_t + ExistingCashFee_t)` |
| `NewDebtService_t` | `Σ_k [DebtServiceCoef_k,t × Σ_i d_ik + FixedCashFee_k,t × y_k]` |
| `NewDebtService12` | `Σ_t NewDebtService_t` |
| `NewPrincipalPaid12` | `Σ_k PrincipalPaidCoef12_k × Σ_i d_ik` |
| `DebtService12` | `ExistingDebtService12 + NewDebtService12` |
| `CFADS12` | `OperatingCashPreDebt12 + ProjectOCF12` |
| `DSCR12` | `CFADS12 / DebtService12`; nếu `DebtService12 = 0`, hiển thị `N/A` và không áp dụng ràng buộc DSCR; ràng buộc riêng `CFADS12 ≥ 0` và Tiền cuối kỳ theo tháng vẫn áp dụng |
| `NewDrawdown_t` | `Σ_k DrawdownShare_k,t × Σ_i d_ik`, với `Σ_t DrawdownShare_k,t = 1` cho phần giải ngân trong 12 tháng |
| `Cash_t` | `Cash_(t-1) + OperatingCashPreDebt_t + Σ_i ProjectOCF_i,t×x_i + NewDrawdown_t - Σ_i CapEx_i,t×x_i - ExistingDebtService_t - NewDebtService_t` |
| `CashEnd12` | `Cash_12` |
| `DebtEnd12` | `DebtOpening - ExistingPrincipalPaid12 + Σ_iΣ_k d_ik - NewPrincipalPaid12` |
| `DebtToEquity12` | `DebtEnd12 / EquityBase`; nếu `EquityBase ≤ 0`, Hồ sơ phân tích không đạt trạng thái Phân tích tài chính 12 tháng |
| `NPV_i` | `Σ_q FCF_i,q / (1 + r_i)^(q/12)`, với `q` là số tháng từ Ngày gốc đến dòng tiền; `FCF_i,q` gồm CapEx vòng đời và loại trừ mọi dòng tiền tài trợ |
| `PortfolioNPV` | `Σ_i NPV_i × x_i` |
| `FinancingCostPV` | `Σ_k [FinancingCostCoefPV_k(r_finance) × Σ_i d_ik + FixedFeePV_k(r_finance) × y_k]` |
| `PortfolioCO2` | `Σ_i VerifiedCO2_i × x_i`, sau khi xử lý vùng phát thải chồng lấn |
| `RiskScore_i` | Tổng đúng năm điểm chiều của Dự án `i`, mỗi điểm thuộc `{0,1,2}` |
| `PortfolioRisk` | `Σ_i RiskScore_i × x_i`; không dùng trung bình hoặc trọng số khác |

Các hệ số `DebtServiceCoef_k,t`, `DrawdownShare_k,t`, `PrincipalPaidCoef12`, `FinancingCostCoefPV`, `FixedCashFee_k,t` và `FixedFeePV` được tính trước từ lịch Gói vay đã xác nhận, lưu cùng phiên bản và phải vượt golden test.

`[ASSUMPTION A14]` Vì đề án không yêu cầu CFO nhập dự báo vốn chủ, MVP dùng Vốn chủ cơ sở FS-07 làm mẫu số. Dashboard và Gói bằng chứng phải ghi rõ đây là tỷ lệ `Nợ cuối kỳ/Vốn chủ cơ sở`, không phải dự báo bảng cân đối cuối kỳ.

`[ASSUMPTION A16]` Lịch dòng tiền có một nguồn sự thật: hệ thống tính NPV từ các dòng tiền có mốc tháng `q` và tỷ lệ năm `r_i`; NPV do người dùng nhập/chuyển từ tài liệu chỉ là giá trị đối chiếu, không đi vào hàm mục tiêu. Dòng tiền tháng 1–12 dùng cùng bản ghi với CapEx và dòng tiền hoạt động trong phép kiểm tra thanh khoản; dòng tiền sau tháng 12 có mốc `q = 24, 36, ...` nếu chỉ dự báo theo năm.

`[ASSUMPTION A18]` Đề án gốc nêu ngưỡng Tiền cuối kỳ; PRD áp dụng thêm `Cash_t ≥ CashMinimum_t` cho từng tháng để ngăn dùng giải ngân đến muộn tài trợ CapEx đến sớm. Đây là guardrail bảo thủ của MVP và phải được CFO xác nhận trong Tuần 1.

**Ví dụ chuẩn để nghiệm thu công thức:**

Với `CashOpening=100`, `OperatingCashPreDebt12=40`, `ProjectOCF12=10`, giải ngân vay mới `=30`, CapEx 12 tháng `=50`, nghĩa vụ nợ hiện hữu `=15` và nghĩa vụ nợ mới `=5`, hệ thống phải trả `CashEnd12=110`, `CFADS12=50`, `DebtService12=20` và `DSCR12=2,5`. Với `DebtOpening=80`, gốc hiện hữu đã trả `=10`, vay mới `=30`, gốc vay mới đã trả `=5` và `EquityBase=100`, hệ thống phải trả `DebtEnd12=95` và `DebtToEquity12=0,95`. Fixture phải có thêm một lịch dòng tiền trong đó `CashEnd12` dương nhưng `Cash_t` âm giữa kỳ để chứng minh ràng buộc thanh khoản theo tháng phát hiện đúng vi phạm.

### 4.4 Danh mục Dự án, bằng chứng CO₂ và rủi ro

**Mô tả:** Mỗi Dự án phải có dữ liệu tài chính, dữ liệu phát thải và rủi ro đủ rõ để được chọn hoặc loại có lý do. Hiện thực hóa UJ-4.

#### FR-12: Quản lý tối đa 10 Dự án

CFO có thể tạo, sửa, sao chép, bật/tắt và sắp xếp tối đa 10 Dự án trong một Hồ sơ phân tích.

**Dữ liệu tối thiểu:**

- Mã và tên Dự án.
- CapEx vòng đời và CapEx giải ngân 12 tháng.
- CapEx dự kiến sau tháng 12 và mô tả nguồn tài trợ dự kiến.
- Dòng tiền Dự án theo tháng trong 12 tháng đầu và theo năm cho phần vòng đời còn lại.
- Tỷ lệ chiết khấu hoặc tham chiếu tỷ lệ của Hồ sơ phân tích.
- NPV trước tài trợ do hệ thống tính; NPV nhập từ nguồn ngoài chỉ để đối chiếu.
- Phiếu bằng chứng phát thải.
- Điểm rủi ro.
- Quan hệ phụ thuộc, loại trừ hoặc bắt buộc.

**Điều kiện nghiệm thu:**

- Dự án trong MVP là quyết định nhị phân: khởi động và chọn toàn bộ, hoặc không chọn.
- Hệ thống không cho chạy nếu CapEx 12 tháng âm hoặc thiếu.
- Giá trị Đã xác nhận, Ước tính và Mô phỏng phải phân biệt trực quan.
- `[ASSUMPTION A11]` Nếu Dự án còn CapEx sau tháng 12, CFO phải ghi nhận kế hoạch nguồn vốn tương lai. Bộ giải không kiểm tra kế hoạch này; Phương án và Gói bằng chứng phải mang cảnh báo “Khả thi tài chính chỉ được kiểm tra trong 12 tháng”.

#### FR-13: Phiếu bằng chứng phát thải

Người phụ trách ESG có thể tạo Phiếu bằng chứng phát thải cho từng Dự án.

**Trường bắt buộc:**

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

**Điều kiện nghiệm thu:**

- Trạng thái gồm Nháp, Cần kiểm tra, Đã xác nhận, Bị từ chối.
- Chỉ chuyển sang Đã xác nhận khi đủ trường bắt buộc, nguồn có thể truy cập, phiên bản hệ số được xác định rõ và phép tính có thể tái thực hiện.
- Hai Dự án dùng cùng đường cơ sở/vùng phát thải không được tồn tại dưới dạng hai Dự án có thể được cộng đồng thời trong cùng một lần chạy. Người phụ trách ESG phải đặt quan hệ loại trừ, hoặc gộp chúng thành một Dự án kết hợp có CapEx, dòng tiền, NPV, CO₂ và rủi ro đã điều chỉnh trước khi tối ưu.
- CO₂ dùng trong mục tiêu là tCO₂e/năm vận hành đầy đủ. Hệ thống hiển thị riêng CO₂ dự kiến trong 12 tháng đầu theo ngày vận hành/ramp-up khi dữ liệu đã xác nhận; nếu chưa đủ dữ liệu thì hiển thị `N/A`, không nội suy thành số thật.
- Inventory phát thải doanh nghiệp, phát thải hàm chứa/CBAM, allowance/credit và lượng CO₂ Dự án tránh được phải là các loại dữ liệu riêng; MVP chỉ tối ưu lượng CO₂ Dự án tránh được.

#### FR-14: Cổng CO₂ đã xác nhận

Chỉ CO₂ đã xác nhận được dùng trong ràng buộc và mục tiêu chính.

**Điều kiện nghiệm thu:**

- CO₂ Mô phỏng chỉ được dùng trong lần chạy độ nhạy và phải có watermark/nhãn tương ứng.
- Khi Phiếu bằng chứng phát thải bị sửa hoặc hủy xác nhận, các Phương án phụ thuộc chuyển sang “Cần chạy lại”.
- Báo cáo ghi rõ tỷ lệ Dự án dùng dữ liệu thật và tỷ lệ dùng dữ liệu mô phỏng.

#### FR-15: Chấm Điểm rủi ro

Người dùng được phân công chấm 0–2 cho năm chiều:

1. Trưởng thành kỹ thuật.
2. Nhà cung cấp/triển khai.
3. Độ chắc chắn CapEx–dòng tiền.
4. Phụ thuộc vận hành/pháp lý.
5. Độ tin cậy CO₂/MRV.

**Quy tắc tổng hợp:**

- 0–3: Thấp.
- 4–6: Trung bình.
- 7–10: Cao.
- Cờ đỏ trọng yếu: loại Dự án khỏi đề xuất tự động cho đến khi có biện pháp xử lý.

**Điều kiện nghiệm thu:**

- Hệ thống lưu điểm, bằng chứng, người chấm và lý do cho từng chiều.
- `[ASSUMPTION A6]` Quy tắc chung là 0 = đủ bằng chứng/rủi ro thấp; 1 = bằng chứng một phần/rủi ro có thể xử lý; 2 = thiếu bằng chứng hoặc phụ thuộc trọng yếu. Rubric chi tiết theo từng chiều phải được khóa trong Tuần 1.
- Hệ thống không tự biến Điểm rủi ro chủ quan thành xác suất tài chính.
- Ngưỡng rủi ro là ngưỡng tối đa trên **từng Dự án**; Rủi ro danh mục chỉ là tổng dùng ở tầng cuối của Chiến lược Cân bằng.

#### FR-16: Ràng buộc quan hệ Dự án

CFO có thể đánh dấu Dự án bắt buộc, quan hệ phụ thuộc và quan hệ loại trừ.

**Điều kiện nghiệm thu:**

- Dự án phụ thuộc không được chọn nếu Dự án tiền đề không được chọn.
- Hai Dự án loại trừ không được đồng thời xuất hiện.
- Dự án có cờ đỏ không được chọn, trừ khi cờ đỏ đã được đóng với biện pháp xử lý có Audit Trail.

### 4.5 Bộ giải MILP và ba Chiến lược

**Mô tả:** Bộ giải chọn Dự án và phân bổ vốn trong một kỳ kế hoạch 12 tháng. Mọi Chiến lược dùng tối ưu nhiều tầng, khóa kết quả của tầng trước trong phạm vi dung sai đã công bố. Hiện thực hóa UJ-5.

#### FR-17: Mô hình hóa quyết định và cân bằng vốn

Mô hình phải dùng tối thiểu các biến:

- `x_i ∈ {0,1}`: chọn Dự án `i`.
- `u_i ≥ 0`: vốn nội bộ cấp cho Dự án `i`.
- `d_ik ≥ 0`: vốn từ Gói vay `k` cấp cho Dự án `i`.
- `y_k ∈ {0,1}`: có sử dụng Gói vay `k`.
- `h ∈ {0,1}`: có Nghĩa vụ nợ 12 tháng lớn hơn 0.

**Cân bằng vốn bắt buộc:**

`u_i + Σ_k d_ik = CapEx_i,12 × x_i`

**Ràng buộc bắt buộc:**

- `Σ_i u_i ≤ InternalFundsLimit`.
- `MinDraw_k × y_k ≤ Σ_i d_ik ≤ LoanLimit_k × y_k`.
- `d_ik = 0` khi Gói vay `k` không đủ điều kiện cấp cho Dự án `i`.
- `Cash_t ≥ CashMinimum_t` với mọi `t = 1..12`; nếu CFO chỉ nhập một ngưỡng thì áp dụng cùng ngưỡng cho cả 12 tháng.
- `CFADS12 ≥ 0` là guardrail dòng tiền độc lập, kể cả khi Nghĩa vụ nợ 12 tháng bằng 0.
- Nếu `h=1`, `CFADS12 ≥ DSCRMinimum × DebtService12`; nếu `h=0`, ràng buộc DSCR không áp dụng. Ưu tiên indicator constraint; nếu bộ giải không hỗ trợ, `M` phải được suy ra từ cận dữ liệu đã xác nhận và lưu trong lần chạy.
- `h=1` khi nghĩa vụ nợ hiện hữu lớn hơn 0 hoặc có Gói vay được chọn với nghĩa vụ nợ 12 tháng dương; Gói vay đang ân hạn toàn bộ trong 12 tháng không tự làm `h=1`.
- Gốc trả lũy kế không được vượt dư nợ/giải ngân lũy kế ở bất kỳ tháng nào.
- `DebtToEquity12 ≤ DebtToEquityMaximum`.
- `RiskScore_i × x_i ≤ MaxProjectRisk` cho từng Dự án; Dự án có cờ đỏ có `x_i = 0`.
- Tuân thủ Dự án bắt buộc, phụ thuộc, loại trừ và mục tiêu CO₂ đã xác nhận.
- Nếu Dự án có CapEx sau tháng 12, áp dụng cảnh báo/điều kiện kế hoạch vốn tương lai tại FR-12; mô hình không được diễn giải là đã tài trợ đủ vòng đời.

**Điều kiện nghiệm thu:**

- Mọi biến và ràng buộc có đơn vị rõ ràng.
- Làm tròn hiển thị không được làm một nghiệm không hợp lệ trở thành có vẻ hợp lệ.
- Mô hình và tham số sai số tối ưu được version hóa.
- Mỗi Gói vay phải liên kết `y_k` với số tiền vay bằng cả cận dưới và cận trên; không được có `y_k=1` nhưng số tiền vay bằng 0 nếu Gói vay có phí cố định.
- Bộ kiểm tra nghiệm phải tính lại các công thức trong Mục 4.3.1 từ đầu vào gốc và nghiệm, không dùng các tổng trung gian do bộ giải trả về.

#### 4.5.1 Hợp đồng tối ưu nhiều tầng

`[ASSUMPTION A12]` MVP dùng các mặc định dưới đây để kết quả có thể tái lập. Mọi lần chạy lưu nguyên bộ tham số thực tế.

**Chuẩn hóa và dung sai:**

- Tiền được chuẩn hóa theo đơn vị tiền tệ của Hồ sơ phân tích; tính toán giữ ít nhất sáu chữ số thập phân của đơn vị chuẩn hóa.
- Dung sai biến nhị phân `τ_binary = 10^-6`.
- Dung sai khả thi tuyệt đối cho tiền và CO₂ `τ_feasibility = 10^-6` đơn vị chuẩn hóa; kiểm tra thêm dung sai tương đối `10^-8`.
- Dung sai khóa một tầng có giá trị tối ưu `z*` là `τ(z*) = max(10^-6, 10^-8 × |z*|)`.
- Sau tầng tối đa hóa, thêm ràng buộc `z ≥ z* - τ(z*)`; sau tầng tối thiểu hóa, thêm ràng buộc `z ≤ z* + τ(z*)`, rồi mới giải tầng tiếp theo.
- Bộ kiểm tra nghiệm dùng cùng ngưỡng số học nhưng tính độc lập; mọi vi phạm lớn hơn dung sai khiến kết quả chuyển sang trạng thái “Không vượt Bộ kiểm tra nghiệm”.

**Tính xác định:**

- Thứ tự Dự án và Gói vay được sắp theo mã ổn định trước khi tạo mô hình.
- Phiên bản bộ giải, chế độ deterministic, seed, số luồng và giới hạn thời gian được lưu trong lần chạy.
- Tầng phá hòa cuối cùng lần lượt tối thiểu hóa vector có thứ tự `x_i`, `y_k`, `u_i`, `d_ik` theo mã ổn định.
- Hai Phương án chỉ được coi là trùng khi có cùng `x_i`, cùng `y_k` và mọi phân bổ `u_i`, `d_ik` bằng nhau trong Dung sai tối ưu.

**Trạng thái bộ giải:**

| Trạng thái | Điều kiện hiển thị |
|---|---|
| Tối ưu đã kiểm chứng | Mọi tầng đạt tối ưu trong dung sai và Bộ kiểm tra nghiệm xác nhận nghiệm hợp lệ |
| Khả thi chưa chứng minh tối ưu | Có nghiệm được Bộ kiểm tra nghiệm xác nhận hợp lệ nhưng đã hết thời gian hoặc vẫn còn Khoảng cách tối ưu; chỉ hiển thị là kết quả tạm, không gọi là tối ưu |
| Vô nghiệm | Bộ giải chứng minh không có nghiệm cho các ràng buộc hiện tại |
| Không bị chặn | Mô hình unbounded; coi là lỗi đặc tả/cấu hình, không phải Phương án |
| Lỗi | Bộ giải hoặc pipeline thất bại; không có Phương án |
| Không vượt Bộ kiểm tra nghiệm | Bộ giải trả nghiệm nhưng kiểm tra độc lập phát hiện vi phạm |

**Golden-test oracle tối thiểu:**

- Mỗi fixture lưu đầu vào, trạng thái mong đợi, mã Dự án/Gói vay được chọn, phân bổ vốn, giá trị từng tầng và danh sách ràng buộc chạm ngưỡng.
- Bộ fixture phải có: case khả thi cơ bản; thiếu tiền mặt; vi phạm DSCR; Gói vay không đủ điều kiện; CO₂ chưa xác nhận; cờ đỏ rủi ro; quan hệ phụ thuộc/loại trừ; nghiệm hòa; Vô nghiệm; và nghiệm khả thi nhưng chưa chứng minh tối ưu.
- Fixture thiếu tiền mặt phải bao gồm trường hợp Tiền cuối kỳ dương nhưng một tháng trung gian thấp hơn ngưỡng.
- Fixture biên phải bao gồm: Ngày gốc lệch kỳ BCTC; Nghĩa vụ nợ 12 tháng bằng 0; Vốn chủ cơ sở bằng 0/âm; trả gốc vượt dư nợ; giải ngân vay sau thời điểm CapEx; CapEx sau tháng 12; hai Dự án chồng lấn CO₂; Dự án kết hợp; dữ liệu `null`; ba Chiến lược cho cùng Phương án; hết thời gian; và mô hình không bị chặn.
- Case tối đa nhỏ phải được đối chiếu bằng vét cạn; kết quả khác oracle trong Dung sai tối ưu làm pipeline thất bại.

#### FR-18: Chiến lược An toàn

Bộ giải thực hiện thứ tự ưu tiên:

1. Tối đa tổng NPV.
2. Trong tập nghiệm giữ nguyên NPV tối ưu trong phạm vi dung sai đã công bố, giảm tổng vốn vay mới.
3. Trong tập nghiệm giữ nguyên hai tầng trước, giảm Chi phí tài trợ.
4. Phá hòa xác định theo mã Dự án/Gói vay.

**Điều kiện nghiệm thu:**

- Không có trọng số tùy ý giữa NPV và nợ.
- Cùng đầu vào và phiên bản phải trả cùng Phương án.

#### FR-19: Chiến lược Cân bằng

Bộ giải thực hiện thứ tự ưu tiên:

1. Áp dụng ràng buộc CO₂ tối thiểu do CFO xác nhận.
2. Tối đa tổng NPV.
3. Giảm Chi phí tài trợ.
4. Giảm tổng Điểm rủi ro.
5. Phá hòa xác định.

`[ASSUMPTION A13]` Cụm “giảm chi phí tài trợ/rủi ro” trong đề án được triển khai thành hai tầng liên tiếp: Chi phí tài trợ trước, Điểm rủi ro sau; không dùng tổng có trọng số.

**Điều kiện nghiệm thu:**

- Nếu không đạt ngưỡng CO₂, kết quả là Vô nghiệm; hệ thống không tự hạ ngưỡng.
- Chỉ CO₂ đã xác nhận được tính vào ngưỡng.

#### FR-20: Chiến lược Chuyển đổi nhanh

Bộ giải thực hiện thứ tự ưu tiên:

1. Áp dụng ngưỡng NPV, tiền mặt và DSCR tối thiểu.
2. Tối đa tổng CO₂ đã xác nhận.
3. Tối đa tổng NPV.
4. Giảm Chi phí tài trợ.
5. Phá hòa xác định.

**Điều kiện nghiệm thu:**

- Không được chọn Phương án CO₂ cao hơn nếu vi phạm bất kỳ ngưỡng tài chính bắt buộc nào.
- CO₂ mô phỏng không tham gia tầng mục tiêu chính.

#### FR-21: Bộ kiểm tra nghiệm độc lập

Mọi Phương án phải được Bộ kiểm tra nghiệm xác nhận trước khi hiển thị.

**Điều kiện nghiệm thu:**

- Bộ kiểm tra nghiệm tính lại cân bằng vốn và toàn bộ ràng buộc từ dữ liệu đầu vào, không chỉ tin trạng thái bộ giải.
- Phương án không được Bộ kiểm tra nghiệm xác nhận hợp lệ thì không được hiển thị như kết quả hợp lệ.
- Kết quả lưu Trạng thái bộ giải, Khoảng cách tối ưu, thời gian giải, nghiệm từng tầng và ràng buộc chạm ngưỡng.
- Chỉ trạng thái “Tối ưu đã kiểm chứng” được gắn nhãn “Phương án tối ưu theo Chiến lược”.
- “Khả thi chưa chứng minh tối ưu” chỉ được xem/xuất như chẩn đoán có watermark; MVP không cho chọn làm Phương án cuối và không có cơ chế ngoại lệ.

#### FR-22: Xử lý Vô nghiệm và nghiệm trùng

Hệ thống phải báo đúng trạng thái khi bài toán theo một Chiến lược ở trạng thái Vô nghiệm hoặc khi nhiều Chiến lược trả cùng một Phương án.

**Điều kiện nghiệm thu:**

- Vô nghiệm phải kèm danh sách ràng buộc có khả năng gây nghẽn và giá trị hiện tại so với ngưỡng.
- Nếu bộ giải hỗ trợ IIS, hệ thống dùng IIS để nêu tập ràng buộc xung đột. Nếu không, hệ thống chạy một mô hình chẩn đoán riêng với biến slack có đơn vị và mức phạt được công bố; slack chỉ dùng giải thích, tuyệt đối không được biến thành Phương án.
- Mỗi chẩn đoán phải nêu mã ràng buộc, ngưỡng, giá trị hoặc slack tối thiểu và liên kết đến đầu vào liên quan; không khẳng định đây là tập xung đột duy nhất nếu chưa chứng minh được đó là tập xung đột tối thiểu.
- Gợi ý điều chỉnh chỉ là phân tích “nếu–thì”; không được tự sửa dữ liệu.
- Hệ thống không tạo đủ ba Phương án bằng cách nhân bản hoặc âm thầm đổi tham số.
- Nghiệm trùng được xác định theo Mục 4.5.1; dashboard hiển thị “Cùng Phương án” nhưng vẫn giữ Audit Trail của từng Chiến lược.

### 4.6 So sánh, giải thích, độ nhạy và xuất Gói bằng chứng

**Mô tả:** Giá trị của kết quả nằm ở khả năng CFO hiểu, phản biện và bàn giao nó. Hiện thực hóa UJ-6.

#### FR-23: Dashboard so sánh Phương án

CFO có thể so sánh các Chiến lược trên cùng một phiên bản đầu vào.

**Dashboard phải hiển thị riêng:**

- Dự án được chọn.
- Vốn nội bộ và vốn từ từng Gói vay.
- Tổng vốn vay mới và Chi phí tài trợ.
- NPV vòng đời.
- CO₂ đã xác nhận theo tCO₂e/năm vận hành đầy đủ và, nếu đủ dữ liệu, CO₂ dự kiến trong 12 tháng đầu; hai giá trị không được cộng hoặc đổi nhãn cho nhau.
- Tiền cuối kỳ, CFADS, nghĩa vụ nợ và DSCR 12 tháng.
- Nợ cuối kỳ/Vốn chủ cơ sở.
- Điểm rủi ro.
- Ràng buộc chạm ngưỡng và Khoảng cách tối ưu.

**Điều kiện nghiệm thu:**

- Không dùng một điểm tổng hợp NPV–CO₂–rủi ro.
- Chỉ so sánh trực tiếp các Phương án dùng cùng phiên bản dữ liệu; nếu khác phiên bản phải có cảnh báo.

#### FR-24: Giải thích chọn/loại Dự án

Hệ thống cung cấp lý do kiểm chứng được cho từng Dự án.

**Điều kiện nghiệm thu:**

- Dự án được chọn phải hiển thị nguồn vốn, đóng góp NPV/CO₂ và tác động lên các ngưỡng.
- Nếu Dự án còn CapEx sau tháng 12, giải thích phải hiển thị tỷ lệ CapEx được kiểm tra trong 12 tháng và cảnh báo phần tài trợ tương lai chưa được mô hình kiểm chứng.
- Dự án không được chọn phải hiển thị ít nhất một lý do: không tối ưu ở tầng ưu tiên, thiếu bằng chứng, cờ đỏ, không đủ vốn, vi phạm điều kiện Gói vay, phụ thuộc/loại trừ hoặc làm vi phạm ngưỡng.
- Giải thích không được khẳng định quan hệ nhân quả ngoài logic mô hình.

#### FR-25: Chạy lại và phân tích độ nhạy

CFO có thể chạy cùng một Chiến lược trên Kịch bản Thấp, Cơ sở và Cao hoặc thay đổi một giả định.

**Điều kiện nghiệm thu:**

- Mỗi lần chạy có mã, thời điểm, phiên bản đầu vào và trạng thái riêng.
- Hệ thống làm nổi bật Dự án hoặc cơ cấu vốn thay đổi giữa các lần chạy.
- Giá trị CO₂ mô phỏng chỉ xuất hiện trong chế độ độ nhạy.

#### FR-26: Xuất Gói bằng chứng

CFO có thể xuất một Gói bằng chứng cho Phương án đã chọn.

**Nội dung bắt buộc:**

- Phạm vi, ngày gốc, người xác nhận và nhãn Sàng lọc mô phỏng/Phân tích tài chính 12 tháng.
- Với Dự án có CapEx sau tháng 12, tổng CapEx, CapEx 12 tháng, phần tài trợ chưa được kiểm tra và cảnh báo về giới hạn kiểm tra 12 tháng phải được trình bày riêng.
- Bộ dữ liệu tài chính lịch sử và Provenance.
- Giả định tài chính tương lai, Kịch bản, Gói vay và Ngưỡng tài chính.
- Dự án, Phiếu bằng chứng phát thải và Điểm rủi ro.
- Chiến lược, thứ tự mục tiêu, Phương án, giải thích và trạng thái Bộ kiểm tra nghiệm.
- Phiên bản dữ liệu, mô hình, quy tắc, nguồn hệ số phát thải và Audit Trail liên quan.
- Tuyên bố giới hạn sử dụng.

`[ASSUMPTION A7]` P0 xuất PDF để trình bày; CSV/JSON là P1. Định dạng tích hợp chuyên biệt với các quy trình ESG, EPM hoặc ngân hàng thuộc giai đoạn pilot.

#### FR-27: Audit Trail và version hóa

Hệ thống phải ghi lại mọi thay đổi có thể ảnh hưởng đến Phương án.

**Điều kiện nghiệm thu:**

- Nhật ký tối thiểu gồm người thực hiện, thời điểm, đối tượng, giá trị trước/sau, lý do và phiên bản.
- Thay đổi dữ liệu đã dùng phải đánh dấu Phương án cũ là “Lỗi thời/Cần chạy lại”, không xóa lịch sử.
- Quy tắc kế toán, hệ số phát thải, cấu hình Chiến lược và phiên bản bộ giải phải được ghi trong lần chạy.

### 4.7 Đánh giá mô hình và quản trị dữ liệu thử nghiệm

**Mô tả:** Tập dữ liệu hiện tại chứng minh khả năng chạy end-to-end, không chứng minh khả năng tổng quát hóa.

#### FR-28: Quản lý manifest dữ liệu

Nhóm phát triển phải duy trì `data_inventory.csv` cho mọi BCTC dùng trong thử nghiệm.

**Điều kiện nghiệm thu:**

- Mỗi bản ghi có URL, ngày tải/truy cập, SHA-256 khi tệp được lưu hợp lệ, số trang, loại PDF và trạng thái quyền sử dụng.
- SHA-256 để trống không được mô tả là đã kiểm chứng tệp.
- MVP không tái phân phối PDF gốc nếu chưa có quyền phù hợp.
- Tập smoke hiện là tám URL PDF chính thức từ bảy doanh nghiệp; bản gốc chưa được đóng gói trong workspace và SHA-256 phải để trống cho đến khi tệp được lưu hợp lệ sau khi rà soát quyền sử dụng.

#### FR-29: Báo cáo chất lượng trích xuất

Hệ thống đánh giá đề xuất tự động **trước khi Kế toán sửa**.

**Báo cáo bắt buộc:**

- Số đúng/tổng số và loại lỗi theo từng Trường BCTC.
- Kết quả theo từng tài liệu và từng doanh nghiệp.
- Precision đề xuất tự động.
- Tỷ lệ tự xử lý.
- Tỷ lệ chuyển sang “Cần kiểm tra”.
- Kết quả sau xác nhận, báo riêng dưới dạng coverage xác nhận.

**Điều kiện nghiệm thu:**

- Tám BCTC hiện tại chỉ được gọi là smoke test: 96 giá trị, gồm 48 text và 48 scan.
- Với mỗi Trường BCTC, nhóm text-layer chỉ có bốn mẫu; một lỗi làm tỷ lệ thay đổi 25 điểm phần trăm. Báo cáo phải nêu hạn chế này.
- Không dùng Macro-F1 từ tám BCTC để tuyên bố khả năng tổng quát.
- Mục tiêu Precision ≥ 95% chỉ áp dụng cho đề xuất tự động trên tập khóa, trước khi con người sửa.
- Sau khi rà soát quyền sử dụng, tập đánh giá Vòng 2 gồm 20–30 BCTC; tập này được khóa trước, tách kết quả theo doanh nghiệp và báo cáo cỡ mẫu cùng khoảng bất định.

## 5. Kiến trúc thông tin cấp sản phẩm

1. **Danh sách Hồ sơ phân tích** — tạo, sao chép, mở và xem trạng thái.
2. **Tổng quan Hồ sơ phân tích** — checklist dữ liệu, cảnh báo và mức đầu ra.
3. **BCTC & đối chiếu** — tải PDF, xem vùng nguồn, sửa/xác nhận 12 Trường BCTC.
4. **Kịch bản & tài trợ** — Giả định tài chính tương lai, ba Kịch bản, 1–3 Gói vay và Ngưỡng tài chính.
5. **Danh mục Dự án** — dữ liệu CapEx/dòng tiền, Phiếu bằng chứng phát thải, Điểm rủi ro và quan hệ Dự án.
6. **Tối ưu & so sánh** — chọn Chiến lược, chạy, xử lý Vô nghiệm, so sánh và độ nhạy.
7. **Gói bằng chứng & lịch sử** — xuất báo cáo, xem phiên bản và Audit Trail.
8. **Đánh giá nội bộ** — chất lượng trích xuất, Bộ kiểm tra nghiệm và manifest thử nghiệm.

## 6. Yêu cầu phi chức năng

### 6.1 Hiệu năng

- NFR-1: P95 thời gian giải MILP < 3 giây với tối đa 10 Dự án và 1–3 Gói vay trên cấu hình demo được công bố.
- NFR-2: Thời gian giải được đo riêng, tách khỏi thời gian OCR và thời gian end-to-end.
- NFR-3: Giao diện phải phản hồi trạng thái khi OCR hoặc tối ưu đang chạy; không để người dùng gửi trùng yêu cầu.

### 6.2 Tính đúng và khả năng tái lập

- NFR-4: 100% công thức tài chính phải vượt golden test.
- NFR-5: 100% Phương án hiển thị phải được Bộ kiểm tra nghiệm xác nhận hợp lệ.
- NFR-6: Các case nhỏ phải khớp nghiệm vét cạn.
- NFR-7: Cùng đầu vào, cấu hình, phiên bản bộ giải và dung sai phải cho cùng kết quả, kể cả kết quả sau khi phá hòa.
- NFR-8: Mọi số hiển thị phải có quy tắc làm tròn; kiểm tra ràng buộc dùng giá trị chưa làm tròn.

### 6.3 Bảo mật và riêng tư

- NFR-9: BCTC và dữ liệu dự án là dữ liệu tài chính nhạy cảm; truy cập phải giới hạn theo Hồ sơ phân tích.
- NFR-10: Dữ liệu phải được mã hóa khi truyền; bí mật/hạn mức truy cập không được ghi vào log ứng dụng.
- NFR-11: Tệp thử nghiệm không được dùng để huấn luyện hoặc cung cấp cho bên thứ ba nếu chưa có quyền.
- NFR-12: `[ASSUMPTION A8]` Trong môi trường demo, chủ Hồ sơ phân tích có thể xóa dữ liệu thủ công; chính sách lưu giữ tự động, residency và kiểm soát production được chốt ở giai đoạn pilot.

### 6.4 Khả dụng và khả năng tiếp cận

- NFR-13: Web app responsive, ưu tiên desktop và tablet; các luồng đối chiếu PDF/bảng dữ liệu không bắt buộc tối ưu cho màn hình điện thoại trong MVP.
- NFR-14: Trạng thái không chỉ phân biệt bằng màu; mọi cảnh báo có nhãn văn bản.
- NFR-15: Luồng cốt lõi có thể dùng bàn phím và có thứ tự focus hợp lý.
- NFR-16: Ngôn ngữ giao diện MVP là tiếng Việt; mã trường/công thức có thể giữ ký hiệu tài chính chuẩn.

### 6.5 Quan sát và hỗ trợ

- NFR-17: Log kỹ thuật có correlation ID cho tải tệp, trích xuất, xác nhận, lần chạy và xuất báo cáo.
- NFR-18: Dashboard nội bộ theo dõi lỗi OCR/parser, lỗi mapping, tỷ lệ Cần kiểm tra, lỗi bộ giải và lỗi Bộ kiểm tra nghiệm.
- NFR-19: Thông báo lỗi cho người dùng phải nêu bước khắc phục, không lộ stack trace.

## 7. Ràng buộc và guardrail

### 7.1 Guardrail tài chính

- BCTC lịch sử không được dùng một mình để khẳng định khả năng trả nợ 12 tháng.
- Phân tích tài chính 12 tháng chỉ bật khi CFO xác nhận đủ đầu vào thiết yếu.
- Không trừ lặp Chi phí tài trợ trong NPV trước tài trợ.
- Không cộng trùng dòng tiền Dự án và dòng tiền kinh doanh dự kiến.
- Không tự nới Tiền cuối kỳ, DSCR 12 tháng, Nợ cuối kỳ/Vốn chủ cơ sở, CO₂, NPV hoặc ngưỡng rủi ro.

### 7.2 Guardrail phát thải

- Chỉ CO₂ đã xác nhận được dùng trong mục tiêu chính.
- Scope 1 và Scope 2 phải được gắn nhãn; Scope 3 ngoài phạm vi MVP.
- Dữ liệu mô phỏng phải giữ nhãn xuyên suốt màn hình và báo cáo.
- FinESG Planner không tạo kiểm kê phát thải doanh nghiệp, không tính phát thải hàm chứa CBAM và không chứng nhận tín chỉ.

### 7.3 Guardrail diễn giải

- Không gọi kết quả là “khuyến nghị đầu tư”, “phê duyệt tín dụng” hoặc “phương án tốt nhất” nếu không kèm điều kiện áp dụng.
- Mọi báo cáo phải nêu Chiến lược, Kịch bản, ngưỡng, phiên bản và giới hạn sử dụng.
- Precision được tính trước human review; số sau xác nhận không được dùng để đánh giá mô hình trích xuất.

## 8. Non-goals

- Xây một ESG suite toàn diện.
- Lập báo cáo/tờ khai CBAM hoặc tính nghĩa vụ chứng chỉ CBAM.
- Kiểm kê Scope 3.
- Thẩm định tín dụng, chấm điểm tín dụng hoặc tự động phê duyệt khoản vay.
- Bảo đảm/kiểm toán/chứng nhận dữ liệu ESG.
- Fine-tune mô hình Document AI trong MVP.
- Cam kết OCR đúng mọi BCTC hoặc mọi bản scan, bất kể chất lượng.
- Dùng CP-SAT; MVP dùng một mô hình MILP và một Bộ kiểm tra nghiệm độc lập.
- Tối ưu lịch triển khai chi tiết nhiều kỳ hoặc điều độ thiết bị.
- Chứng minh đủ nguồn tài trợ cho CapEx phát sinh sau tháng 12 hoặc cho toàn bộ vòng đời Dự án.
- Offline PWA.
- Triển khai on-premise production.
- Tích hợp production với ERP, ngân hàng, ESG suite hoặc kho dữ liệu.
- Mở rộng sang mọi ngành sản xuất trong MVP sáu tuần.
- Tái phân phối hoặc khai thác hàng loạt PDF nguồn khi chưa có quyền.

## 9. Phạm vi MVP

### 9.1 P0 — Bắt buộc để demo hợp lệ

- Web app responsive bằng tiếng Việt và một Hồ sơ phân tích cho doanh nghiệp xi măng hoặc thép.
- Tải PDF text-layer hoặc scan; parser/OCR, mapping 12 Trường BCTC, Provenance, Confidence và Kế toán xác nhận.
- Kịch bản Cơ sở; khả năng sao chép thành Thấp/Cao; 1–3 Gói vay; tối đa 10 Dự án.
- Hợp đồng tính toán Mục 4.3.1, ma trận sẵn sàng và kiểm tra cộng trùng.
- Phiếu bằng chứng phát thải Scope 1/2, kiểm tra chồng lấn CO₂ và Điểm rủi ro năm chiều.
- Ba Chiến lược lexicographic, ràng buộc tài chính/MRV, hợp đồng dung sai và quy tắc phá hòa.
- Bộ kiểm tra nghiệm độc lập, trạng thái bộ giải, Vô nghiệm và golden tests.
- Dashboard cơ bản gồm Phương án, nguồn vốn, NPV, CO₂, Tiền cuối kỳ, DSCR, rủi ro, lý do chọn/loại và cảnh báo giới hạn 12 tháng.
- Gói bằng chứng PDF, Audit Trail và version hóa đủ để tái lập.
- Smoke test tám BCTC, một case xi măng, một case thép và đóng gói Docker.

**Không được cắt khỏi P0:** tính đúng công thức; Provenance/human-in-the-loop; cổng CO₂ đã xác nhận; ba Chiến lược; Bộ kiểm tra nghiệm; nhãn Sàng lọc mô phỏng; cảnh báo tài trợ sau tháng 12; Audit Trail tối thiểu.

### 9.2 P1 — Thực hiện nếu P0 ổn định

- Mẫu Kịch bản Thấp/Cao được điền sẵn và giao diện so sánh độ nhạy tự động.
- Làm nổi bật chênh lệch Dự án/cơ cấu vốn giữa các lần chạy.
- Xuất CSV/JSON bên cạnh PDF.
- Dashboard đánh giá chất lượng trích xuất; nếu hạng mục này bị cắt, nhóm vẫn tạo báo cáo offline theo FR-29.
- Mở rộng tập đánh giá lên 20–30 BCTC nếu quyền sử dụng cho phép.
- Điều hướng riêng theo vai trò; nếu hạng mục này bị cắt, P0 vẫn phải ghi người xác nhận và trách nhiệm.

**Thứ tự cắt khi trễ tiến độ:** (1) mở rộng 20–30 BCTC; (2) dashboard đánh giá nội bộ; (3) CSV/JSON; (4) so sánh độ nhạy tự động; (5) điều hướng riêng theo vai trò. Việc cắt không được làm thay đổi các guardrail P0.

### 9.3 Giai đoạn pilot

- SSO/RBAC nhiều tài khoản và mô hình multi-tenant.
- Chính sách lưu giữ, residency, sao lưu và xóa tự động.
- Tích hợp với ESG, EPM, ngân hàng hoặc ERP bằng schema/API đã version hóa.
- Đánh giá bảo mật, pháp lý và vận hành production.
- Tự động cập nhật nguồn quy định hoặc hệ số phát thải sau khi có quy trình phê duyệt.

### 9.4 Ngoài phạm vi MVP

- Các Non-goals tại Mục 8.
- API công khai hoặc tích hợp đối tác.
- Tự động lấy lãi suất, tỷ giá, hệ số phát thải hoặc dữ liệu thị trường từ bên ngoài.
- Phân tích Monte Carlo hoặc tối ưu stochastic.
- Giá carbon, allowance hoặc credit trong hàm mục tiêu.

## 10. Chỉ số thành công

### 10.1 Chỉ số chính

- **SM-1 — Tính đúng tài chính:** 100% công thức vượt golden test. Xác nhận FR-10, FR-11, FR-17.
- **SM-2 — Tính hợp lệ của Phương án:** 100% Phương án hiển thị được Bộ kiểm tra nghiệm xác nhận hợp lệ; case nhỏ khớp vét cạn. Xác nhận FR-17 đến FR-22.
- **SM-3 — Tính toàn vẹn CO₂:** 100% CO₂ dùng trong mục tiêu/ràng buộc chính có Phiếu bằng chứng phát thải Đã xác nhận. Xác nhận FR-13, FR-14, FR-19, FR-20.
- **SM-4 — Khả năng giải trình:** 100% Phương án xuất được Gói bằng chứng có phiên bản, nguồn, giả định, trạng thái bộ giải, lý do và Audit Trail. Xác nhận FR-23, FR-24, FR-26, FR-27.
- **SM-5 — Hiệu quả thao tác:** `[ASSUMPTION A19]` thử nghiệm ghép cặp với 5–10 cặp người dùng–case tổng cộng; mỗi người dùng thực hiện cùng một case bằng quy trình đối chứng và FinESG. Mục tiêu là giảm median thời gian chuẩn bị ≥ 30%; 50% là mục tiêu mở rộng. Xác nhận UJ-1 đến UJ-6.

### 10.2 Chỉ số phụ

- **SM-6 — Chất lượng trích xuất:** Precision đề xuất tự động ≥ 95% trên tập khóa trước khi Kế toán sửa; luôn báo kèm Tỷ lệ tự xử lý, tỷ lệ Cần kiểm tra, số đúng/tổng và cỡ mẫu. Xác nhận FR-4 đến FR-7, FR-29.
- **SM-7 — Hiệu năng bộ giải:** P95 < 3 giây với tối đa 10 Dự án trên cấu hình demo. Xác nhận FR-18 đến FR-22.
- **SM-8 — Khả năng chạy end-to-end:** xử lý được cả tám BCTC smoke test, gồm bốn text-layer và bốn scan, nhưng không dùng kết quả này để tuyên bố tổng quát hóa. Xác nhận FR-3 đến FR-7, FR-29.
- **SM-9 — Mức hoàn tất luồng:** `[ASSUMPTION A9]` tối thiểu 80% người thử nghiệm hoàn tất từ tạo Hồ sơ phân tích đến xuất Gói bằng chứng mà không cần thành viên nhóm can thiệp trực tiếp.

### 10.3 Counter-metrics

- **SM-C1:** Không giảm tỷ lệ Cần kiểm tra bằng cách chấp nhận giá trị Confidence thấp.
- **SM-C2:** Không tăng CO₂ bằng cách vi phạm ngưỡng NPV, tiền mặt, DSCR hoặc nợ.
- **SM-C3:** Không tối ưu thời gian giải bằng cách bỏ Bộ kiểm tra nghiệm hoặc giảm nội dung giải thích.
- **SM-C4:** Không dùng kết quả sau Kế toán sửa để làm đẹp Precision của mô hình.
- **SM-C5:** Không tăng số Phương án bằng cách nhân bản nghiệm hoặc tự nới ràng buộc.

## 11. Kế hoạch triển khai sáu tuần

### Tuần 1 — Khóa hợp đồng dữ liệu và logic

- Khóa 12 Trường BCTC, Phiếu bằng chứng phát thải, rubric rủi ro, đầu vào tài chính 12 tháng và đặc tả MILP.
- Hoàn tất manifest tám PDF smoke test và rà soát quyền sử dụng.
- Tạo annotation guide, wireframe và bộ case tài chính nhỏ có nghiệm đối chiếu.

### Tuần 2–3 — Dữ liệu và bộ giải

- Xây parser/OCR, nhận diện bảng/bố cục, mapping 12 trường và màn hình Provenance.
- Xây Kịch bản, Gói vay mẫu, Phiếu bằng chứng phát thải và Điểm rủi ro.
- Xây MILP nhiều tầng, Bộ kiểm tra nghiệm, golden tests và case vét cạn.

### Tuần 4–5 — Web app end-to-end

- Nối luồng BCTC → xác nhận → giả định → Dự án → tối ưu → dashboard → Gói bằng chứng.
- Khóa ba Chiến lược và quy tắc phá hòa.
- Mở rộng có kiểm soát lên 20–30 BCTC nếu quyền sử dụng cho phép.
- Báo cáo chất lượng theo trường, tài liệu và doanh nghiệp.

### Tuần 6 — Thử nghiệm và đóng gói

- Thử nghiệm với 5–10 cặp người dùng–case theo SM-5.
- Đo median thời gian, lỗi dữ liệu, khả năng giải trình và độ ổn định khi đổi giả định.
- Sửa lỗi, đóng gói Docker, quay video demo và hoàn thiện báo cáo về các giới hạn của hệ thống.

## 12. Phụ thuộc

- PDF parser và OCR cho hai loại BCTC.
- Thành phần nhận diện bảng/bố cục; mapping nghiệp vụ vẫn là lớp riêng.
- Bộ giải MILP và thư viện mô hình hóa.
- Bộ kiểm tra nghiệm độc lập với bộ giải.
- Kho dữ liệu quan hệ cho phiên bản, Audit Trail và kết quả.
- Trình xem PDF có hỗ trợ trang và bounding box.
- Nguồn hệ số phát thải do Người phụ trách ESG cung cấp/xác nhận.
- `data_inventory.csv` và quyền sử dụng tài liệu thử nghiệm.

## 13. Rủi ro và biện pháp giảm thiểu

| Rủi ro | Tác động | Biện pháp MVP |
|---|---|---|
| Sai đơn vị/kỳ/phạm vi dù OCR đúng ký tự | Kết quả tài chính sai toàn bộ | Chuẩn hóa metadata, kiểm tra logic, Provenance và Kế toán xác nhận |
| BCTC được hiểu như dự báo 12 tháng | Khuyến nghị sai về khả năng trả nợ | Tách dữ liệu lịch sử và Giả định tài chính tương lai; khóa nhãn đầu ra |
| CO₂ tự khai hoặc mô phỏng | Greenwashing, tối ưu sai | Phiếu bằng chứng phát thải, cổng xác nhận và tách chế độ độ nhạy |
| Điểm rủi ro chủ quan | Phương án thay đổi theo người chấm | Rubric, bằng chứng và người xác nhận; khóa phiên bản |
| Nhiều nghiệm tương đương | Cơ cấu vốn thay đổi tùy ý | Mục tiêu nhiều tầng và quy tắc phá hòa xác định |
| Cộng trùng dòng tiền/chi phí tài trợ | NPV, tiền mặt hoặc DSCR bị sai | Khai báo nguồn dòng tiền, công thức hiển thị và golden tests |
| Bộ giải trả nghiệm vi phạm do sai số/làm tròn | Phương án không khả thi | Bộ kiểm tra nghiệm độc lập và kiểm tra bằng giá trị chưa làm tròn |
| Tám PDF quá nhỏ | Tuyên bố độ chính xác thiếu cơ sở | Chỉ gọi smoke test; mở rộng tập khóa 20–30 BCTC và báo cỡ mẫu |
| Quyền sử dụng PDF chưa rõ | Rủi ro pháp lý/dữ liệu | Manifest quyền sử dụng, không tái phân phối, chỉ băm khi lưu hợp lệ |
| Dữ liệu tài chính nhạy cảm | Rò rỉ hoặc dùng sai mục đích | Giới hạn truy cập, log an toàn, xóa thủ công trong demo; đánh giá cho môi trường production ở giai đoạn sau |

## 14. Tiêu chí chấp nhận MVP

MVP chỉ được coi là sẵn sàng demo khi đồng thời thỏa mãn các tiêu chí sau:

1. Luồng UJ-1 đến UJ-6 chạy end-to-end trên ít nhất một case xi măng và một case thép.
2. Tám PDF smoke test được ghi kết quả minh bạch theo FR-29.
3. 100% golden tests tài chính và case MILP nhỏ vượt qua.
4. 100% Phương án hiển thị được Bộ kiểm tra nghiệm xác nhận hợp lệ.
5. Ba Chiến lược tuân thủ đúng thứ tự ưu tiên và cho kết quả xác định.
6. Dữ liệu thiếu tạo đúng nhãn Sàng lọc mô phỏng; hệ thống không tự suy diễn thành dữ liệu thật.
7. CO₂ chưa xác nhận không đi vào mục tiêu chính.
8. Vô nghiệm và nghiệm trùng được báo đúng, không tự nới ràng buộc.
9. Gói bằng chứng chứa đủ dữ liệu, giả định, Provenance, phiên bản, lý do và giới hạn sử dụng.
10. P95 thời gian giải đạt ngưỡng vận hành < 3 giây trên cấu hình demo được công bố.
11. Ví dụ chuẩn trong Mục 4.3.1 trả đúng toàn bộ kết quả và được Bộ kiểm tra nghiệm xác nhận hợp lệ.
12. Mọi fixture tại Mục 4.5.1 trả đúng trạng thái, tập Dự án/Gói vay, phân bổ, giá trị từng tầng và ràng buộc chạm ngưỡng.
13. Dự án có CapEx sau tháng 12 luôn hiển thị phần vốn tương lai chưa được kiểm tra.
14. Ma trận trạng thái sẵn sàng chặn đúng thao tác cho dữ liệu thiếu, mô phỏng, đã xác nhận và cần chạy lại.
15. Ràng buộc `Cash_t` phát hiện thiếu hụt giữa kỳ dù `CashEnd12` dương, đồng thời chặn dùng giải ngân vay muộn cho CapEx sớm.
16. Hồ sơ có Ngày gốc lệch ngày kết thúc BCTC không thể đạt trạng thái Sẵn sàng tài chính 12 tháng.
17. Hai Dự án chồng lấn CO₂ bị loại trừ hoặc được gộp thành một Dự án kết hợp trước tối ưu; không có phép cộng trùng.
18. NPV trong hàm mục tiêu luôn được hệ thống tính từ lịch dòng tiền version hóa, không lấy trực tiếp từ số người dùng nhập.

## 15. Decision Register

Mỗi mặc định dưới đây **có hiệu lực để triển khai MVP** cho đến khi owner phê duyệt thay đổi. Thay đổi sau hạn chốt phải tạo phiên bản hợp đồng mới và đánh dấu kết quả phụ thuộc là Cần chạy lại.

| ID | Vấn đề | Mặc định đang có hiệu lực | Owner | Hạn/revisit | Phạm vi bị ảnh hưởng |
|---|---|---|---|---|---|
| DR-01 | Đồng tiền cơ sở | CFO chọn một đồng tiền cho mỗi Hồ sơ phân tích; không tự đổi ngoại tệ (A2) | PM + CFO | Khóa Tuần 1 | Data contract, UI |
| DR-02 | Độ chi tiết 12 tháng | Nhập theo tháng và tổng hợp 12 tháng (A3) | PM + Finance QA | Khóa Tuần 1 | Kịch bản, Gói vay |
| DR-03 | CFADS/DSCR/Tiền cuối kỳ | Dùng hợp đồng Mục 4.3.1 (A10, A14) | CFO + Finance QA | Trước khi code FR-11/FR-17 | **Phase-blocker bộ giải** |
| DR-04 | Chi phí tài trợ | PV lãi/phí vòng đời; nghĩa vụ nợ chỉ lấy khoản đến hạn 12 tháng (A4) | CFO + Finance QA | Trước golden test | Mục tiêu phụ |
| DR-05 | CapEx sau tháng 12 | Yêu cầu kế hoạch nguồn vốn và cảnh báo; không tuyên bố đủ vốn vòng đời (A11) | PM + CFO | Trước fixture đầu tiên | Eligibility, báo cáo |
| DR-06 | Rubric rủi ro | Dùng nguyên tắc chung 0/1/2; khóa bằng chứng/cờ đỏ chi tiết trong Tuần 1 (A6) | PM + ESG lead | Cuối Tuần 1 | Form, optimizer |
| DR-07 | Dung sai/trạng thái bộ giải | Dùng Mục 4.5.1 (A12) | Tech lead + Finance QA | Trước golden test | Solver, verifier |
| DR-08 | Thứ tự Chiến lược Cân bằng | Chi phí tài trợ trước, Điểm rủi ro sau (A13) | PM + CFO | Khóa Tuần 1 | Objective tiers |
| DR-09 | Tài khoản và phân quyền | Demo ghi người xác nhận; SSO/RBAC chuyển pilot (A1) | PM + Security | Revisit trước pilot | Auth, audit |
| DR-10 | Lưu giữ dữ liệu | Demo cho phép xóa thủ công; policy tự động chuyển pilot (A8) | Security + Legal | Revisit trước pilot | Data governance |
| DR-11 | Gói bằng chứng | P0 xuất PDF; CSV/JSON là P1 (A7) | PM | Sau P0 ổn định | Export |
| DR-12 | Mục tiêu usability | 80% hoàn tất luồng không cần can thiệp trực tiếp (A9) | PM + UX | Trước test Tuần 6 | User test |
| DR-13 | Ngày gốc và số dư mở đầu | Ngày gốc trùng ngày kết thúc BCTC; không roll-forward trong MVP (A15) | CFO + Finance QA | Trước code FR-1 | **Phase-blocker công thức** |
| DR-14 | Nguồn NPV | Hệ thống tính từ lịch dòng tiền có mốc tháng; NPV nhập ngoài chỉ để đối chiếu (A16) | CFO + Finance QA | Trước golden test | NPV, objective |
| DR-15 | Chiết khấu Chi phí tài trợ | Mặc định bằng tỷ lệ cấp Hồ sơ phân tích; CFO có thể xác nhận giá trị khác (A17) | CFO | Khóa Tuần 1 | FinancingCostPV |
| DR-16 | Ngưỡng thanh khoản giữa kỳ | Dùng ngưỡng Tiền cuối kỳ theo tháng, chặt hơn đề án gốc (A18) | CFO + Finance QA | Khóa Tuần 1 | Cash constraints |
| DR-17 | Cơ sở dòng tiền Dự án | Dòng tiền danh nghĩa, sau thuế; không có tax/inflation/FX engine (A5) | CFO + Finance QA | Khóa Tuần 1 | NPV, CFADS |
| DR-18 | Đơn vị mẫu thử nghiệm | 5–10 cặp người dùng–case tổng cộng; mỗi người dùng chạy cùng một case ở hai quy trình (A19) | PM + UX | Trước test Tuần 6 | SM-5 |

## 16. Chỉ mục giả định

Decision Register tại Mục 15 là nguồn sự thật cho trạng thái, owner và hạn chốt. Bảng này chỉ bảo đảm mọi thẻ `[ASSUMPTION]` nội tuyến đều truy ngược được:

| Giả định | Decision Register | Giả định | Decision Register |
|---|---|---|---|
| A1 | DR-09 | A10 | DR-03 |
| A2 | DR-01 | A11 | DR-05 |
| A3 | DR-02 | A12 | DR-07 |
| A4 | DR-04 | A13 | DR-08 |
| A5 | DR-17 | A14 | DR-03 |
| A6 | DR-06 | A15 | DR-13 |
| A7 | DR-11 | A16 | DR-14 |
| A8 | DR-10 | A17 | DR-15 |
| A9 | DR-12 | A18 | DR-16 |
| A19 | DR-18 |  |  |

## 17. Nguồn và tài liệu liên quan

- Hồ sơ đề án đã sửa: `G:/FinESG/Ho-so-du-thi-Quantum-FinESG-Focus-Revised.docx`.
- Manifest dữ liệu: `G:/FinESG/data_inventory.csv`.
- Tài liệu nghiên cứu định vị: `G:/FinESG/_bmad-output/planning-artifacts/prds/prd-FinESG-2026-07-29/research-landscape.md`.
