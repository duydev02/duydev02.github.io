# Một góc trời của Duy

Website cá nhân dựa trên **Astro Nano**: gọn, dễ đọc, có một chút mây và mưa. Mục tiêu là vừa có một góc riêng để chia sẻ, vừa học cách hiểu, chỉnh sửa và vận hành một website cùng AI.

Địa chỉ website: **https://duydev02.github.io/** · [Trạng thái publish](https://github.com/duydev02/duydev02.github.io/actions/workflows/deploy.yml)

## Chạy ở máy mình

Dùng Node.js 24 (xem `.nvmrc`) và npm.

```sh
npm ci
npm run dev
```

Mở địa chỉ Local mà terminal hiển thị, thường là `http://localhost:4321`.

```sh
npm test         # kiểm tra bật/tắt mưa và các trạng thái trình duyệt
npm run check    # kiểm tra Astro và TypeScript
npm run build    # kiểm tra rồi xuất website tĩnh vào dist/
npm run preview  # xem bản đã build
```

## Muốn sửa gì thì mở đâu?

| Muốn sửa | File |
| --- | --- |
| Tên, mô tả, GitHub, email | `src/consts.ts` |
| Lời mở đầu, thứ tự các mục | `src/pages/index.astro` |
| Đoạn đôi điều về mình | `src/data/about.md` |
| Việc đang học/làm, mục tiêu gần đây | `src/data/now.md` |
| Sách, nhạc và sở thích ngoài code | `src/data/offscreen.md` |
| Ảnh chân dung | `src/assets/duy-vung-tau.webp` (khung ảnh trong `src/pages/index.astro`) |
| Dự án | `src/content/projects/<ten>/index.md` |
| Ghi chép | `src/content/blog/<ten>/index.md` |
| Màu, font size, khoảng cách | `src/styles/global.css` |
| Hai ảnh phong cảnh, chú thích và nút mưa | `src/components/SkyNote.astro` |
| Lớp mưa và nút bật/tắt toàn trang | `src/components/RainOverlay.astro` |
| Số giọt, tốc độ, nhịp vẽ và trạng thái mưa | `src/lib/rain.ts` |
| Metadata, font, logic đổi theme | `src/components/Head.astro` |

## Tài liệu dự án

- [DESIGN.md](DESIGN.md): gu đã chốt, điều nên giữ khi chỉnh giao diện.
- [AGENTS.md](AGENTS.md): ngữ cảnh và quy tắc dành cho AI làm việc trong repo.
- [docs/CONTENT.md](docs/CONTENT.md): thêm bài, dự án và chỉnh nội dung Markdown.
- `docs/PROFILE.md` là ghi chú hồ sơ chỉ lưu cục bộ, được bỏ qua bởi Git và không đưa vào repository public.
- [docs/LEARNING.md](docs/LEARNING.md): cách học và thử sửa cùng AI.
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md): build, GitHub Pages, domain và DNS.
- [ROADMAP.md](ROADMAP.md): những gì đã có và các việc tiếp theo.

## Những gì đang là bản đầu

Tên hiển thị dùng **Duy**, phù hợp với thông tin người dùng cung cấp. Nội dung được biên tập từ cuộc trò chuyện, CV 2025 và bản thông tin bổ sung do người dùng gửi từ ChatGPT memory. TOEIC 685 dùng thông tin mới; Spring Boot và Identity/Authentication được ghi rõ đang tìm hiểu/đang làm. CV chưa cập nhật nên không khẳng định công ty/chức danh hiện tại hoặc tự tính số năm kinh nghiệm.

Ảnh chân dung và hai ảnh phong cảnh được chủ trang cung cấp, đã tối ưu WebP và bỏ metadata. Email để trống và không hiển thị. Ngày trong các bài dự án là ngày ghi lại nội dung, không khẳng định ngày hoàn thành dự án cũ.

Đã chuẩn bị workflow GitHub Pages trong `.github/workflows/deploy.yml`. Workflow kiểm tra tương tác mưa, build website và tự lấy URL/base từ GitHub Pages để canonical, RSS và sitemap đúng địa chỉ. `SITE_URL` mặc định khi chạy local vẫn là localhost. Xem `docs/DEPLOYMENT.md` để publish hoặc gắn domain sau này.

## Nguồn template

Dựa trên [markhorn-dev/astro-nano](https://github.com/markhorn-dev/astro-nano), phiên bản nguồn `66aa017d614828ba5dba02a9e51a1a714850ad31`. Giữ layout hẹp, cặp font Inter/Lora, content collections, light/dark/system theme và static output; cá nhân hóa nội dung, điều hướng và các chi tiết nhỏ.

Phần kỹ thuật đã được cập nhật lên Astro 7 và Tailwind CSS 4; content collections dùng glob loader. Bản tùy chỉnh dùng Markdown thuần, không cần MDX hoặc framework giao diện bổ sung. `overrides` trong package.json nâng postcss-selector-parser lên bản vá bảo mật cho Tailwind Typography.

Giữ nguyên giấy phép MIT của Mark Horn trong [LICENSE](LICENSE). Dự án dùng **npm** và `package-lock.json` làm lockfile duy nhất.
