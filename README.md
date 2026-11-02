# Chép Kinh Online

Ứng dụng cho phép người dùng chép kinh trực tuyến.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript, `src/`)
- [Tabler](https://tabler.io) (`@tabler/core` cho UI, `@tabler/icons-react` cho icon)
- [Tailwind CSS 4](https://tailwindcss.com) dùng prefix `tw:` (vd. `tw:flex`, `tw:md:p-4`), chạy song song với Tabler — xem `src/app/globals.css`
- [Zustand](https://zustand.docs.pmnd.rs) cho state phía client
- [Prisma 7](https://www.prisma.io) + PostgreSQL 17 (chạy bằng Docker)

## Cài đặt

```bash
cp .env.example .env
npm install          # tự chạy `prisma generate`
npm run db:up        # khởi động Postgres trong Docker
npm run db:migrate   # tạo/áp dụng migration
npm run db:seed      # thêm dữ liệu mẫu
npm run dev
```

Mở http://localhost:3000.

## Scripts

| Script | Mô tả |
| --- | --- |
| `dev` / `build` / `start` | Chạy Next.js |
| `lint` | ESLint |
| `db:up` / `db:down` | Bật/tắt Postgres |
| `db:migrate` | `prisma migrate dev` |
| `db:seed` | Chạy `prisma/seed.ts` |
| `db:studio` | Mở Prisma Studio |
| `db:generate` | Sinh lại Prisma Client |

## Cấu trúc

```
prisma/
  schema.prisma        # User, Sutra, CopySession
  seed.ts
prisma7.config.ts      # cấu hình Prisma CLI (datasource, migrations, seed)
src/
  app/                 # routes (App Router)
    (app)/             # các trang dùng khung Tabler (trang chủ...)
    chep-kinh/[slug]/  # trang chép kinh
  components/
    layout/            # header, nạp Tabler JS
    brand/             # logo hoa sen
    copy/              # trang chép kinh: sách mở, gõ trực tiếp trên trang, lật trang
    sutra/             # component danh sách/đọc kinh
  generated/prisma/    # Prisma Client (sinh tự động, không commit)
  lib/prisma.ts        # PrismaClient singleton (adapter pg)
  stores/              # Zustand stores
  types/
```

## Bản quyền hình ảnh

- `src/assets/buddha.jpg`: cắt từ ảnh [Tượng Phật Thích Ca](https://commons.wikimedia.org/wiki/File:T%C6%B0%E1%BB%A3ng_Ph%E1%BA%ADt_Th%C3%ADch_Ca.jpg) của Bùi Thụy Đào Nguyên, giấy phép [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0). Phải giữ dòng ghi công trên trang khi dùng ảnh này.
