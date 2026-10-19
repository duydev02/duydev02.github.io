# Ngữ cảnh cho AI làm việc trong dự án

## Mục tiêu và thông tin thật

- Website cá nhân của Duy, tài khoản GitHub `duydev02`.
- Người dùng đã viết HTML/CSS, học F8, clone giao diện Shopee và publish một số trang lên GitHub Pages.
- Trang đã cung cấp: https://duydev02.github.io/motchutdangyeu/.
- Thích bầu trời, mưa, cảm nhận những điều nhỏ; muốn giọng văn vui vẻ, tinh nghịch, chưa cần portfolio nghề nghiệp.
- Người dùng đã chọn cách giới thiệu “dev có kinh nghiệm Java/backend”; dùng cách này trong lời mở đầu và bio, vẫn giữ giọng gần gũi.
- Thông tin bổ sung do người dùng gửi từ ChatGPT memory: ở TP. Hồ Chí Minh, TOEIC 685; đang tìm hiểu Spring Boot và làm dự án Identity/Authentication; có dùng Docker/Git. Spring Boot phải ghi là đang học/đang tìm hiểu, dự án Identity phải ghi đang làm, không tự điền tính năng hoặc repo chưa được cung cấp.
- Sở thích được cung cấp: cầu lông, gym, đọc tiểu thuyết, League of Legends/Esports, R&B/Indie/Pop (Grey D, Wave to Earth), cà phê cuối tuần; đã đọc Không gia đình, Rừng Na Uy, Nhà giả kim. Hướng nội, tò mò, thích quan sát và hiểu nguyên lý. Xem `docs/PROFILE.md` để lấy ngữ cảnh đầy đủ.
- Muốn học cách hiểu và điều chỉnh sản phẩm cùng AI, ưu tiên làm nhanh có kiểm chứng.
- Người dùng đã cung cấp CV Java Developer bản 2025 (chưa cập nhật) và ảnh chân dung. `docs/PROFILE.md` ghi lại các dữ kiện và phần cần xác nhận. Có thể dùng kinh nghiệm đã có; không suy từ chữ “Present” trong CV cũ thành công việc hiện tại hoặc tự tính lại số năm kinh nghiệm.
- Ảnh đã tối ưu trong `src/assets/duy-vung-tau.webp`; trang đang dùng GitHub và LinkedIn từ thông tin được cung cấp. Email vẫn để trống. Chưa có domain hoặc link Shopee được xác nhận.
- Hai ảnh phong cảnh người dùng cung cấp ngày 2026-10-20 thay bầu trời minh họa ở đầu trang: `src/assets/sky-sunset.webp` và `src/assets/sky-blue-flowers.webp`. Giữ màu, khung hình tự nhiên; không tự gán địa điểm hoặc tác giả. Ảnh gốc không thay đổi; bản web đã bỏ metadata.

## Định hướng thiết kế đã chốt

Dùng Astro Nano làm nền. Người dùng thích Nano nhất trong các mẫu đã xem; Astral bị đánh giá cổ và quá đơn giản, Fuwari quá màu mè. Giữ cảm giác gọn, hiện đại và dễ đọc, thêm cá tính bằng lời viết, ảnh thật khi có và tương tác nhỏ. Đọc `DESIGN.md` trước khi thay đổi giao diện.

Không biến trang thành landing page công ty, thêm chức danh/công ty bịa, số liệu thành tích, skill bars, nhiều thẻ bo tròn, gradient phủ trang hoặc hiệu ứng liên tục ngoài phạm vi tương tác đã chọn. Giữ credit nguồn và LICENSE.

## Kỹ thuật và cấu trúc

- Astro 7, TypeScript, Tailwind CSS 4 (Vite plugin, theme khai báo trong CSS); ưu tiên static output và ít JavaScript ở trình duyệt.
- Dùng npm, Node 24, `package-lock.json`; không thêm lockfile thứ hai.
- Layout/components ở `src/`; schema ở `src/content.config.ts`; nội dung Markdown ở `src/data/about.md` và `src/content/`.
- Dùng `withBase()` cho link/asset nội bộ để hỗ trợ GitHub Pages dưới subpath.
- Link tới trang nội bộ phải kết thúc bằng `/` (ví dụ `/projects/`, `/blog/`) vì cấu hình `trailingSlash: "always"`; URL thiếu dấu này trả về 404 trong dev.
- Font phải có bộ ký tự tiếng Việt. Giữ semantic headings, focus bàn phím, tên truy cập cho nút, hỗ trợ reduced motion.
- Nội dung phải đọc được khi JavaScript tắt; tương tác mưa là phần bổ sung.
- Dùng `src/consts.ts` cho cấu hình cá nhân chung. Không đưa khóa/API token vào repo.

## Quy trình làm việc

Hoàn thành thay đổi trong phạm vi người dùng yêu cầu. Giải thích ngắn những file cần biết và cách tự chỉnh khi bàn giao. Cập nhật tài liệu nếu cấu trúc, lệnh hoặc quyết định thiết kế thay đổi. Không yêu cầu người dùng xác nhận lại các lựa chọn nhỏ đã được ủy quyền.

Sau thay đổi mã nguồn, chạy `npm run build` (đã bao gồm Astro check). Khi đổi giao diện/tương tác, kiểm tra bản desktop, mobile, dark mode, nút mưa và điều hướng. Không cần tạo test chỉ để sao chép một thay đổi văn bản/CSS nhỏ. Không coi build thành công là đã publish.

Người dùng đã chọn publish website cá nhân chính qua GitHub Pages: repository public `duydev02/duydev02.github.io`, địa chỉ `https://duydev02.github.io/`. Workflow trong `.github/workflows/deploy.yml` tự kiểm tra, build và deploy khi push `main`; URL/base lấy từ cấu hình Pages. Dùng `docs/DEPLOYMENT.md` cho quy trình. `docs/PROFILE.md` chỉ lưu cục bộ, được gitignore; không đẩy ghi chú CV này lên repository public. Không tự chọn domain hoặc dịch vụ trả phí.
