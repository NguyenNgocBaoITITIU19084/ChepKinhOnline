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
  components/
    layout/            # header, nạp Tabler JS
    copy/              # component liên quan chép kinh
    sutra/             # component danh sách/đọc kinh
  generated/prisma/    # Prisma Client (sinh tự động, không commit)
  lib/prisma.ts        # PrismaClient singleton (adapter pg)
  stores/              # Zustand stores
  types/
```
