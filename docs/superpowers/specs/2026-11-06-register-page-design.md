# Tài liệu Thiết Kế: Giao Diện Trang Đăng Ký (Register Page UI)

- **Ngày lập**: 2026-11-06
- **Trạng thái**: Đã phê duyệt (Approved)
- **Dự án**: Chép Kinh Online (`chep-kinh-online`)
- **Đường dẫn trang**: `/dang-ky` (`src/app/(app)/dang-ky/page.tsx`)

---

## 1. Mục tiêu và Định hướng

Xây dựng trang giao diện đăng ký tài khoản cho Chép Kinh Online tại đường dẫn `/dang-ky`.
Giao diện tuyệt đối tuân thủ:
- Bộ quy chuẩn giao diện (Design System) của Chép Kinh Online: phong cách án thư thanh tịnh, tôn nghiêm, tông màu ấm vàng - nâu trầm, nền kem hoa văn chữ Vạn `.scene`.
- **100% Tailwind CSS** (tiền tố `tw:`, font `font-zen-title`, `font-zen-body`), không sử dụng CSS modules.
- Bố cục kế thừa `(app)/layout.tsx` với đầy đủ `AppHeader` và `SiteFooter`.
- Kết nối hai chiều với trang đăng nhập `/dang-nhap`.

---

## 2. Kiến trúc và Cấu trúc tệp

```
src/
├── app/
│   └── (app)/
│       └── dang-ky/
│           └── page.tsx               # Server Component trang đăng ký (/dang-ky)
└── components/
    └── auth/
        ├── RegisterForm.tsx           # Client Component form đăng ký (Email, Password, ConfirmPassword)
        ├── LoginForm.tsx              # Cập nhật liên kết chuyển hướng sang /dang-ky
        ├── AuthInput.tsx              # Tái sử dụng
        └── SocialLoginGroup.tsx       # Tái sử dụng
```

---

## 3. Chi tiết Giao diện & Trải nghiệm (UI/UX)

### 3.1. Khung Thẻ Kính (Glass Register Card)
- **Vị trí**: Căn giữa màn hình (`tw:flex tw:items-center tw:justify-center tw:min-h-[calc(100vh-180px)] tw:px-4 tw:py-10 md:tw:py-14`).
- **Thẻ chứa**:
  - `tw:w-full tw:max-w-[440px] tw:p-6 sm:tw:p-8 md:tw:p-9 tw:rounded-[20px] tw:bg-white/75 tw:border tw:border-[rgba(214,164,64,0.35)] tw:shadow-[0_12px_32px_rgba(150,105,25,0.12)] tw:backdrop-blur-md tw:flex tw:flex-col tw:items-stretch`.

### 3.2. Tiêu đề & Dẫn nhập
- **Huy hiệu sen**: Vòng tròn vàng nhạt chứa biểu tượng hoa sen `LotusLogo(32)` kích thước 52px.
- **Tiêu đề**: `"Đăng Ký"`, phông Lora (`font-zen-title`), cỡ `tw:text-2xl sm:tw:text-[1.65rem]`, màu `var(--brown-900,#4a320a)`.
- **Dẫn nhập**: `"Khởi tâm bồ đề · Đồng hành chép kinh"`, phông Be Vietnam Pro (`font-zen-body`), màu `var(--brown-800,#6b4a12)`.

### 3.3. Các trường nhập liệu (Form Fields)
- Tối giản 3 trường:
  1. **Thư điện tử**: `AuthInput` type `email`, icon `IconMail`, placeholder `"ban@vidu.vn"`.
  2. **Mật khẩu**: `AuthInput` type `password`/`text`, icon `IconLock`, nút bật/tắt hiển thị mật khẩu (`IconEye`/`IconEyeOff`), placeholder `"Nhập mật khẩu (tối thiểu 6 ký tự)..."`.
  3. **Nhập lại mật khẩu**: `AuthInput` type `password`/`text`, icon `IconLockCheck`, nút bật/tắt hiển thị mật khẩu riêng, placeholder `"Xác nhận lại mật khẩu..."`.
- **Validation**:
  - Email rỗng hoặc sai định dạng regex: Thông báo `"Địa chỉ thư điện tử không hợp lệ."`
  - Mật khẩu < 6 ký tự: Thông báo `"Mật khẩu cần tối thiểu 6 ký tự."`
  - Nhập lại mật khẩu không khớp: Thông báo `"Mật khẩu xác nhận không trùng khớp."`
  - Viền đỏ mực `tw:!border-[#b45309]` và thông báo lỗi hiển thị ngay dưới ô tương ứng.

### 3.4. Nút Hành động & Mạng xã hội
- **Nút Tạo tài khoản**: Nút vàng son thếp vàng `tw:bg-gradient-to-b tw:from-[#ffe699] tw:via-[#f5d77f] tw:to-[#d6a440]`, hiệu ứng hover ánh sáng, spinner loading khi đang xử lý.
- **Dải phân cách**: `"hoặc tiếp tục với"` và cụm nút `SocialLoginGroup` (Google, Apple, Facebook).

### 3.5. Chân Thẻ Điều Hướng
- Đoạn văn bản: `"Đã có tài khoản? "` kèm `<Link href="/dang-nhap">Đăng nhập</Link>` màu vàng đồng hổ phách (`tw:text-[#a8741a] tw:font-semibold hover:tw:text-[#4a320a] hover:tw:underline`).
- Đồng thời cập nhật `LoginForm.tsx` tại `/dang-nhap` để dòng `"Chưa có tài khoản?"` trỏ thẳng tới `<Link href="/dang-ky">Đăng ký ngay</Link>`.
