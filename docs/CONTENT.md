# Chỉnh nội dung

## Đôi điều và thông tin chung

Đoạn giới thiệu dài nằm ở `src/data/about.md`. Bạn có thể viết như một tin nhắn bình thường: để một dòng trống giữa hai đoạn, dùng `**chữ đậm**` và `[tên link](https://...)` khi cần.

Tên, mô tả trang và mạng xã hội nằm ở `src/consts.ts`. `EMAIL` đang trống nên không hiện link email. Lời chào ngắn và tên các mục nằm trong `src/pages/index.astro`.

## Thêm một ghi chép

Tạo `src/content/blog/ten-bai/index.md`:

```md
---
title: "Hôm nay mình thử một thứ mới"
description: "Một câu ngắn để biết bài này nói về gì."
date: 2026-10-19
draft: true
---

Viết nội dung ở đây.

## Điều mình học được

Một đoạn ngắn là đủ.
```

`draft: true` giữ bài khỏi trang chủ, danh sách, trang chi tiết và RSS. Chuyển sang `false` khi muốn xuất bản. Tên thư mục quyết định URL: ví dụ `/blog/ten-bai/`. Ngày là ngày ghi chép, định dạng YYYY-MM-DD. Trang chủ tự lấy bài mới nhất.

## Thêm một dự án

Tạo `src/content/projects/ten-du-an/index.md`:

```md
---
title: "Tên dự án"
description: "Mình đã làm gì trong một câu."
date: 2026-10-19
draft: true
demoURL: "https://example.com"
repoURL: "https://github.com/ten-ban/ten-repo"
---

Dự án này là gì? Vì sao mình làm?

## Phần mình làm

Ghi rõ phần tự làm, phần clone hoặc dùng template.

## Điều mình học được

Một việc cụ thể hoặc một lỗi mình đã hiểu hơn.
```

Xóa hẳn `demoURL`/`repoURL` nếu chưa có đường dẫn thật; không để URL ví dụ khi publish. Các ngày ở hai dự án ban đầu ghi nhận ngày thêm nội dung vào website, không phải lịch sử hoàn thành dự án cũ.

## Ảnh và bản nháp

Hai ảnh phong cảnh ở đầu trang nằm trong `src/assets/sky-sunset.webp` và `src/assets/sky-blue-flowers.webp`, được hiển thị qua `src/components/SkyNote.astro`. Đổi ảnh và chú thích tại component này; chú thích khi bật/tắt mưa nằm trong `src/lib/rain.ts`. Ảnh giữ nguyên khung, không áp bộ lọc; nhấn để mở bản lớn ở tab mới. Các bản WebP đã bỏ metadata, ảnh gốc trong thư viện Photos không bị thay đổi.

Có thể đặt ảnh cạnh file Markdown rồi dùng `![Mô tả ảnh](./ten-anh.webp)`. Ưu tiên ảnh do bạn sở hữu; ảnh minh họa cần được ghi rõ. Giữ ảnh vừa đủ độ phân giải và nén trước khi đưa lên repo. Khi dùng file trong `public/` từ component, đi qua `withBase()` để giữ đúng đường dẫn ở GitHub Pages.

Chạy `npm run build` để phát hiện thiếu frontmatter, link metadata sai định dạng hoặc lỗi nội dung trước khi cập nhật website.
