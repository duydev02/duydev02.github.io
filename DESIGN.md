# Gu và định hướng giao diện

## Cảm giác muốn có

Một góc nhỏ trên internet: một dev, thích bầu trời, thích mưa, có chút nghịch ngợm. Hiện đại, gần gũi, thoáng và bình tĩnh. Nội dung nên nghe như chủ trang nói chuyện, không như một bản quảng cáo bản thân.

## Những phản hồi cần nhớ

- **Astro Nano:** đẹp nhất trong ba mẫu đầu, nhưng demo hơi clean/chuyên nghiệp.
- **Astral:** quá đơn giản và giao diện cũ; không dùng hướng này.
- **Fuwari:** màu mè, tạo cảm giác “AI”; không dùng hướng này.
- Người dùng đã đồng ý **lấy Nano làm nền**.

## Giữ từ Nano

Bề ngang đọc khoảng 640px, font sans cho điều hướng/tiêu đề, serif cho đoạn đọc, nhịp khoảng trắng, cấu trúc blog/dự án bằng Markdown, light/dark/system theme. Giữ bố cục nội dung có thể đọc ngay, tránh một hero chiếm cả màn hình chỉ để trang trí.

## Cá nhân hóa ở bản đầu

- Nền trắng ấm `#faf9f6`, chữ xám đậm `#293137`, màu nhấn xanh lá dịu `#557465`.
- Font Inter + Lora, tự host và có bộ ký tự tiếng Việt.
- Logo chữ nhỏ `duy.`; lời mở đầu tự nhiên; tiêu đề “Mấy thứ mình nghịch”.
- Dùng ảnh chân dung thật do chủ trang cung cấp cạnh lời chào. Giữ khuôn mặt tự nhiên; tạo avatar tròn và điều chỉnh khung bằng CSS. Nội dung Java/backend được kể ngắn trong phần đôi điều, tránh biến trang thành CV đầy đủ.
- Nội dung đời thường có mục “Dạo này đang mày mò” và “Lúc không gõ code”. Dùng chữ và danh sách gọn, không thêm skill bars hoặc một thẻ lớn cho từng sở thích. Mức độ đang học và dự án đang làm phải được thể hiện rõ.
- Hai ảnh phong cảnh do Duy cung cấp: hoàng hôn trên sông và trời xanh với hoa sứ. Đặt cạnh nhau, giữ nguyên tỉ lệ 4:3, màu tự nhiên; nhấn ảnh để xem lớn ở tab mới. Bản WebP bỏ metadata và được Astro sinh kích thước phù hợp màn hình.
- Người dùng đã đồng ý mở rộng mưa ra toàn trang. Dùng Canvas 2D, giọt thưa, ba lớp xa/gần và giảm độ đậm ở vùng đọc; không tự phát âm thanh.
- Nút dưới ảnh bật/tắt cùng trạng thái với nút góc màn hình. Giữ lựa chọn trong session của tab và qua điều hướng Astro. Mặc định lần ghé mới là tắt.
- Lớp mưa không bắt chuột, không nhận focus, không được đọc bởi trình đọc màn hình. Tạm dừng khi tab bị ẩn; tắt chuyển động khi thiết bị bật giảm chuyển động.
- Hiệu ứng mưa tôn trọng `prefers-reduced-motion`; nút dùng được bằng bàn phím.
- Danh sách dự án có đường phân cách mảnh, tránh biến tất cả thành các card lớn giống nhau.

## Cách thêm dấu ấn về sau

Ưu tiên ảnh trời chủ trang chọn, câu chú thích riêng, một hình vẽ nhỏ hoặc chi tiết vui trong nội dung. Thêm từng thứ và xem cả trang để kiểm tra sự cân đối. Không tự gán địa điểm, ngày chụp hoặc tác giả khi chưa được cung cấp.

## Kiểm tra khi đổi giao diện

Kiểm tra ở chiều rộng 375px, 768px và desktop; không có tràn ngang. Chữ tiếng Việt đầy đủ dấu, contrast đọc được ở cả hai theme. Nội dung và link vẫn dùng được khi tắt JS; không ẩn toàn bộ trang chờ animation.
