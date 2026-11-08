# Kế Hoạch Triển Khai Trang Liên Hệ & Góp Ý (Contact & Feedback Page)

> **Dành cho Agentic Workers:** BẮT BUỘC SỬ DỤNG SUB-SKILL: `superpowers:subagent-driven-development` (khuyên dùng) hoặc `superpowers:executing-plans` để thực hiện từng bước trong kế hoạch này. Các bước sử dụng cú pháp checkbox (`- [ ]`) để theo dõi tiến độ.  
> **Tài liệu đặc tả (Spec):** [docs/superpowers/specs/2026-11-08-contact-page-design.md](file:///Users/baonguyen/Developer/ChepKinhOnline/docs/superpowers/specs/2026-11-08-contact-page-design.md)  
> **Mục tiêu:** Xây dựng trang Liên hệ & Đóng góp ý kiến tại `/lien-he` (`src/app/(app)/lien-he/page.tsx`) theo phong cách Zen Split Layout (cột trái FAQ Accordion, cột phải Form gửi phản hồi thông minh, mock submit mượt mà).

## Kiến Trúc & Công Nghệ
- **Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4 (bắt buộc prefix `tw:`), Tabler Icons (`@tabler/icons-react`), Lotus Icon (`@/components/icons/BuddhistIcons`).
- **Kiến trúc:** Bố cục 2 cột bất đối xứng trên desktop (`tw:grid tw:grid-cols-1 lg:tw:grid-cols-12 tw:gap-10`), chia nhỏ thành các component độc lập (`ContactHeader`, `ContactFaq`, `ContactForm`, `ContactSuccessAlert`). Quản lý state cục bộ với React Hooks và mock submission timeout.

## Ràng Buộc Toàn Cục (Global Constraints)
- Toàn bộ class Tailwind CSS **bắt buộc** dùng tiền tố `tw:` (ví dụ `tw:flex`, `tw:grid`, `tw:rounded-2xl`, `tw:p-6`...) để tránh xung đột với Tabler.
- Phong cách thẩm mỹ Zen Buddhist: Nền giấy kem `var(--paper-cream)`, font tiêu đề `font-zen-title`, font thân bài `font-zen-body`, viền vàng nhạt `tw:border-[rgba(214,164,64,0.35)]`, card thủy tinh mờ `ck-glass`, nút bấm ánh kim `ck-btn-gold`.
- Không có lỗi TypeScript, đảm bảo `npx tsc --noEmit` và `npm run build` vượt qua.

---

## Cấu Trúc File & Trách Nhiệm

```text
src/
├── types/
│   └── contact.ts                    # Kiểu dữ liệu form, danh mục liên hệ, FAQ item, validation errors
├── data/
│   └── contact-faq.ts                # Dữ liệu 4 câu hỏi thường gặp FAQ chuyên sâu về chép kinh
├── components/
│   └── contact/
│       ├── ContactHeader.tsx         # Tiêu đề trang, huy hiệu hoa sen và nhãn eyebrow kẻ vàng
│       ├── ContactFaq.tsx            # Accordion câu hỏi thường gặp
│       ├── ContactSuccessAlert.tsx   # Khung tri ân hoan hỷ sau khi gửi tin nhắn thành công
│       └── ContactForm.tsx           # Biểu mẫu nhập liệu (Pill chọn chủ đề, conditional field, validation, mock submit)
└── app/
    └── (app)/
        └── lien-he/
            └── page.tsx              # Server Component: SEO metadata, bố cục 2 cột tích hợp các components
```

---

## Chi Tiết Các Tác Vụ Triển Khai

### Task 1: Định Nghĩa Types & Dữ Liệu Tĩnh FAQ
**Files:**
- Tạo mới: `src/types/contact.ts`
- Tạo mới: `src/data/contact-faq.ts`

**Giao diện & Dữ liệu:**
- Kiểu `ContactCategory`: `"sutra_edit" | "sutra_suggest" | "tech_issue" | "general"`
- Kiểu `ContactFormData`: `category`, `sutraReference?`, `name`, `email`, `message`
- Kiểu `FormErrors`: `name?`, `email?`, `sutraReference?`, `message?`
- Kiểu `FaqItem`: `id`, `question`, `answer`, `icon`
- Mảng `CONTACT_FAQS`: 4 câu hỏi thực tế về báo lỗi bản kinh, đề xuất kinh mới, phi lợi nhuận, sự cố bàn gõ.

- [ ] **Bước 1.1: Tạo file `src/types/contact.ts` định nghĩa toàn bộ types**
- [ ] **Bước 1.2: Tạo file `src/data/contact-faq.ts` chứa dữ liệu tĩnh câu hỏi thường gặp**
- [ ] **Bước 1.3: Chạy kiểm tra typecheck (`npx tsc --noEmit`)**
- [ ] **Bước 1.4: Commit Task 1**

---

### Task 2: Xây Dựng Các Component Giao Diện (Header, FAQ Accordion, Success Alert)
**Files:**
- Tạo mới: `src/components/contact/ContactHeader.tsx`
- Tạo mới: `src/components/contact/ContactFaq.tsx`
- Tạo mới: `src/components/contact/ContactSuccessAlert.tsx`

**Chi tiết tính năng:**
- `ContactHeader`: Huy hiệu hoa sen tròn có quầng sáng kim, nhãn eyebrow kẻ vàng đối xứng (`LẮNG NGHE & TRI ÂN · 傾聽`), tiêu đề "Liên hệ & Đóng góp ý kiến", lời ngỏ thanh tịnh.
- `ContactFaq`: Hiển thị danh sách FAQ theo phong cách Accordion. Cho phép mở/đóng từng mục với hiệu ứng chuyển tiếp mượt mà.
- `ContactSuccessAlert`: Hiển thị sau khi submit form thành công, biểu tượng đóa sen vàng tỏa sáng, lời cảm tạ theo tên và email người gửi, nút "Gửi thêm lời nhắn khác" gọi callback `onReset()`.

- [ ] **Bước 2.1: Xây dựng `ContactHeader.tsx` với Tailwind prefix `tw:`**
- [ ] **Bước 2.2: Xây dựng `ContactFaq.tsx` có tương tác Accordion toggle mượt mà**
- [ ] **Bước 2.3: Xây dựng `ContactSuccessAlert.tsx`**
- [ ] **Bước 2.4: Kiểm tra typecheck (`npx tsc --noEmit`)**
- [ ] **Bước 2.5: Commit Task 2**

---

### Task 3: Xây Dựng Biểu Mẫu Liên Hệ (ContactForm)
**Files:**
- Tạo mới: `src/components/contact/ContactForm.tsx`

**Chi tiết tính năng:**
- Khung thẻ giấy mờ `ck-glass` viền ánh kim ấm `tw:border-[rgba(214,164,64,0.35)]`.
- Tag pills chọn nhanh 4 chủ đề (Sửa lỗi bản kinh, Đề xuất kinh mới, Báo lỗi kỹ thuật, Khác).
- Trường điều kiện (Conditional Input): Nếu chủ đề là `sutra_edit` hoặc `sutra_suggest`, tự động mở rộng trường *"Tên bài kinh / Vị trí đoạn kinh"*.
- Ô nhập Họ tên, Email, Nội dung tin nhắn kèm nhãn và placeholder tao nhã.
- Kiểm tra hợp lệ dữ liệu (validation) hiển thị lỗi thân thiện và viền đỏ cam khi không đạt.
- Xử lý mock submission với độ trễ 1000ms (`setTimeout`), loading spinner trên nút bấm `ck-btn-gold`, sau đó hiển thị `ContactSuccessAlert`.

- [ ] **Bước 3.1: Xây dựng `ContactForm.tsx` đầy đủ state, validation và mock submission**
- [ ] **Bước 3.2: Kiểm tra typecheck (`npx tsc --noEmit`)**
- [ ] **Bước 3.3: Commit Task 3**

---

### Task 4: Tích Hợp Trang `/lien-he` & Kiểm Thử Toàn Diện
**Files:**
- Tạo mới: `src/app/(app)/lien-he/page.tsx`

**Chi tiết tính năng:**
- Metadata SEO chuẩn: Title *"Liên hệ & Góp ý | Chép Kinh Online"*, Description rõ ràng.
- Bố cục 2 cột (Desktop: Cột trái 5 phần FAQ, Cột phải 7 phần Form; Mobile: xếp tuần tự mượt mà).
- Kiểm tra hoạt động điều hướng từ Header và Footer tới `/lien-he`.
- Chạy `npm run build` để kiểm tra build Next.js thành công 100%.

- [ ] **Bước 4.1: Tạo trang `src/app/(app)/lien-he/page.tsx` kết nối các components**
- [ ] **Bước 4.2: Chạy kiểm tra TypeScript (`npx tsc --noEmit`)**
- [ ] **Bước 4.3: Chạy build Next.js (`npm run build`) xác nhận không phát sinh lỗi**
- [ ] **Bước 4.4: Commit Task 4 và hoàn tất**
