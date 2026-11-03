# Scanlinguo NestJS API — Assignment: 2 API collections

Backend riêng cho dự án **Scanlinguo** theo yêu cầu: **Develop and Deploy 2 API collections**, nộp **link Swagger Docs có thể test API trực tiếp**.

## Hai collections

**Collection 1: Categories** — `/api/categories` (POST, GET, GET /:id, PATCH /:id, DELETE /:id).

**Collection 2: Vocabulary** — `/api/vocabulary` (POST, GET, GET /:id, PATCH /:id, DELETE /:id). GET hỗ trợ query `categoryId`.

Swagger: **`/docs`**. Kiểm tra server: `/api`.

## Chạy trên máy

Cài **Node.js 20+** rồi chạy:

```bash
npm install
npm run start:dev
```

Mở http://localhost:3000/docs và chọn **Try it out** rồi **Execute**.

## Cách kiểm thử bằng Swagger

1. Chạy `POST /api/categories` với JSON:
   ```json
   { "name": "Household objects", "description": "Đồ vật trong gia đình" }
   ```
2. Sao chép `id` UUID trong response.
3. Chạy `POST /api/vocabulary`, thay `categoryId` bằng UUID thực tế từ bước 2:
   ```json
   { "word": "chair", "meaning": "cái ghế", "example": "This is a chair.", "categoryId": "UUID_VUA_TAO" }
   ```
4. Dùng `GET /api/categories` và `GET /api/vocabulary` để xem dữ liệu. Thử `PATCH`, `DELETE` nếu muốn.

> Khi xóa category đang có vocabulary, API trả về HTTP 409. Nhập sai dữ liệu trả về HTTP 400; id không tìm thấy trả về HTTP 404.

## Deploy lên Render

1. Tạo **repository GitHub mới** (ví dụ `scanlinguo-nestjs-api`) dưới organization `Scanlinguo-L01VNexus` (nếu có quyền).
2. Push các file trong thư mục này lên nhánh `main`.
3. Truy cập https://dashboard.render.com/ → **New → Web Service** → kết nối repo vừa push.
4. Runtime **Node**; Build command: `npm install && npm run build`; Start command: `npm run start:prod`. Hoặc dùng file `render.yaml` để tạo Blueprint.
5. Sau khi deploy xong, lấy URL do Render cấp, ví dụ `https://TEN-SERVICE.onrender.com/docs` (đây là *mẫu*, không phải link đã triển khai).
6. Mở link Swagger đó, đảm bảo **Try it out** và **Execute** chạy được trên URL public, sau đó nộp link này.

**Lưu ý quan trọng về lưu trữ:** bản demo sử dụng JSON file `data/store.json`, để tối giản setup và giữ dữ liệu qua những lần khởi động trên máy. Trên Render miễn phí filesystem không bền vững: dữ liệu có thể mất khi deploy lại/khởi động lại. Bài yêu cầu API demo có thể test trực tiếp thì phù hợp; nếu cần production, thay bằng PostgreSQL/managed database. Không nên deploy nhiều instance cùng lúc khi dùng JSON file.

## Cấu trúc

```
src/
  main.ts                 # Swagger + ValidationPipe + CORS
  app.module.ts           # Module tổng + health API
  common/json-store.ts    # Lưu dữ liệu JSON
  categories/             # Controller, Service, DTO, Module
  vocabulary/             # Controller, Service, DTO, Module
```

## Nộp bài

Nộp **link Swagger đã deploy**, định dạng `https://.../docs`. Link `localhost` và link repository GitHub không thay thế được URL Swagger công khai.
