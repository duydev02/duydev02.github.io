# Đưa góc nhỏ lên mạng

Đã chuẩn bị workflow `.github/workflows/deploy.yml` cho lần publish đầu tiên lên GitHub Pages. Địa chỉ/repository đang chờ người dùng chọn. Không có domain hoặc dịch vụ trả phí được tạo.

## 1. Kiểm tra bản build

```sh
npm ci
npm run build
npm run preview
```

Astro xuất file tĩnh vào `dist/`. Hosting chỉ cần phục vụ thư mục này, không cần chạy Node ở máy chủ.

## 2. Đặt URL đúng

Cấu hình đọc `SITE_URL` và `SITE_BASE` trong môi trường hoặc `.env`. File `.env` được bỏ qua bởi Git. Mặc định dùng localhost để tránh ghi một domain chưa được chọn vào metadata.

| Kiểu publish | SITE_URL | SITE_BASE |
| --- | --- | --- |
| User site GitHub | `https://duydev02.github.io` | `/` |
| Repo tên portfolio | `https://duydev02.github.io` | `/portfolio` |
| Domain riêng | `https://domain-cua-ban.example` | `/` |

`SITE_URL` là origin. `SITE_BASE` là đường dẫn con, không có domain. Tên `portfolio` là ví dụ theo thư mục hiện tại; thay bằng tên repository thật. Khi đổi URL, build lại để canonical, Open Graph, RSS và sitemap được cập nhật.

Ví dụ build ở dưới `/portfolio`:

```sh
SITE_URL=https://duydev02.github.io SITE_BASE=/portfolio npm run build
SITE_URL=https://duydev02.github.io SITE_BASE=/portfolio npm run preview
```

Để local trở lại, chạy build không có các biến này hoặc chỉnh `.env` về localhost và `/`.

## 3. GitHub Pages

Tạo repository public mới: `duydev02.github.io` cho website cá nhân chính, hoặc `portfolio` cho địa chỉ có `/portfolio/`. Không ghi đè repository `motchutdangyeu` đang có.

Trong repository, chọn **Settings → Pages → Source: GitHub Actions**, hoặc cấu hình Pages qua GitHub API với `build_type: workflow`. Sau đó push nhánh `main`; có thể chạy lại thủ công trong tab Actions.

Workflow đã có sẵn, thực hiện lần lượt:

1. Checkout mã nguồn, cài Node.js 24 và dependency bằng `npm ci`.
2. Chạy `npm test` cho tương tác mưa và vòng đời trình duyệt.
3. Đọc `origin` và `base_path` từ cấu hình Pages, dùng làm `SITE_URL` và `SITE_BASE`.
4. Chạy `npm run build`, gồm Astro check; upload riêng `dist/`.
5. Deploy artifact trong environment `github-pages` và trả về địa chỉ online.

Phiên bản action được kiểm tra ngày 2026-10-20: checkout v7, setup-node v7, configure-pages v6, upload-pages-artifact v5, deploy-pages v5. Xem file workflow để chỉnh, tránh sao chép một mẫu cũ từ tài liệu.

`node_modules/`, `.astro/`, `dist/`, `.env`, ảnh QA và `docs/PROFILE.md` được bỏ qua bởi Git. Ghi chú hồ sơ CV chỉ giữ ở máy; repository chứa nội dung website đã chọn và ảnh WebP tối ưu, không chứa PDF CV hoặc ảnh gốc trong thư viện Photos. Khi tạo commit đầu, dùng email GitHub no-reply để không đưa email cá nhân vào lịch sử công khai.

Mỗi lần sửa nội dung sau này: kiểm tra local, commit, push `main`, chờ workflow hoàn tất. Nếu build thất bại, xem bước đỏ trong Actions; phiên bản đã deploy trước đó tiếp tục được phục vụ. Đổi tên repo hoặc gắn domain cần kiểm tra lại metadata và các link trước khi chia sẻ.

## 4. Domain riêng sau này

Sau khi đã chọn và mua tên miền, khai báo Custom domain trong GitHub Pages, cấu hình DNS theo hướng dẫn của GitHub/nhà đăng ký và bật Enforce HTTPS khi chứng chỉ sẵn sàng. Chuyển `SITE_URL` sang domain thật, `SITE_BASE=/`, rồi build/deploy lại. Nếu dùng CNAME file, đặt nó trong `public/CNAME` với domain thật.

Nguồn: [Astro trên GitHub Pages](https://docs.astro.build/en/guides/deploy/github/), [Custom domain cho GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Trước khi gửi link

Xem trên điện thoại, thử link dự án, chuyển theme, nút mưa, đường dẫn bài viết trực tiếp và trang 404. Kiểm tra title, description, ảnh chia sẻ; tìm `localhost`, `example.com` và thông tin mẫu còn sót trong `dist/`. Mặc định bản build local sẽ chứa localhost, đây là dấu hiệu cần đặt URL thật trước khi publish.
