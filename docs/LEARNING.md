# Học cùng AI trên chính website này

## Cách làm

Chọn một thay đổi nhỏ → nhờ AI giải thích phần liên quan → sửa hoặc nhờ AI triển khai → xem kết quả → tự kể lại cách nó hoạt động. Mỗi lượt nên đem lại một kỹ năng tự sửa mới.

## Lượt 1: hiểu đường đi của một trang

Mở lần lượt `src/pages/index.astro`, `src/layouts/PageLayout.astro`, `src/components/Head.astro`, `src/components/Header.astro` và `src/styles/global.css`.

Thử hỏi: “Giải thích cách index.astro ghép thành trang chủ. Chỉ nói về những file thực sự được dùng và chỉ ra chỗ mình đổi lời chào.” Sau đó tự đổi một câu và quan sát hot reload.

## Lượt 2: nội dung và dữ liệu

Sửa `src/data/about.md`, tạo một bài với `draft: true` rồi đổi thành `false`. Xem `src/content.config.ts` để hiểu schema và `getCollection()` trên trang chủ để hiểu lọc/sắp xếp.

Thử hỏi: “Vì sao chỉ thêm file Markdown là có trang chi tiết mới? Hãy dẫn qua getStaticPaths và phần render.”

## Lượt 3: tương tác mưa

Mở `src/components/SkyNote.astro` để tìm nút `data-rain-toggle="inline"`. `RainOverlay.astro` gắn Canvas trang trí và nút góc màn hình vào layout chung; `transition:persist` giữ Canvas khi điều hướng.

Trong `src/lib/rain.ts`, `initRain()` quản lý trạng thái, `resize()` tạo giọt theo kích thước màn hình, `draw()` vẽ theo `requestAnimationFrame`, `sync()` đồng bộ nút và bắt đầu/dừng mưa. `sessionStorage` nhớ lựa chọn trong cùng tab. Mỗi giọt có vị trí và độ sâu, từ đó tính tốc độ, độ dài, độ đậm. `FRAME_INTERVAL` giới hạn nhịp vẽ khoảng 30fps; DPR được chặn ở 1.5 và màn hình nhỏ dùng tối đa 44 giọt.

Tự thử đổi tốc độ/số giọt hoặc lời nhắn khi bấm nút. Kiểm tra bằng Tab rồi Enter/Space, chuyển trang khi đang mưa, ẩn tab và bật Reduce Motion trên thiết bị. CSS `.page-rain` dùng `pointer-events: none` nên các link bên dưới vẫn bấm và chữ vẫn chọn được.

Chạy `npm test` để xem các kiểm tra cho bật/tắt, giới hạn số giọt, điều hướng, reduced motion, ẩn tab và trường hợp thiếu Canvas/storage. Các kiểm tra dùng Node test runner có sẵn, không thêm thư viện.

## Lượt 4: từ mã nguồn thành website

Chạy `npm run build`, nhìn thư mục `dist/`, rồi `npm run preview`. Theo `DEPLOYMENT.md` khi đã chọn repository và địa chỉ publish. Phân biệt dev server, file tĩnh, hosting, domain và DNS bằng chính các bước đã làm.

## Trước khi nhận một thay đổi do AI viết

- Mình biết file nào đổi và vì sao chưa?
- Mình có thể chỉ ra chỗ sửa lại nội dung/hành vi không?
- Mình đã trực tiếp thử tình huống quan trọng trên giao diện chưa?

Không cần thuộc toàn bộ cú pháp. Ưu tiên hiểu đủ để sửa, kiểm tra và phát hiện khi kết quả không đúng ý mình.
