# Tài liệu Thiết Kế: Giao Diện Trang Đăng Nhập (Login Page UI)

- **Ngày lập**: 2026-11-06
- **Trạng thái**: Đã phê duyệt (Approved)
- **Dự án**: Chép Kinh Online (`chep-kinh-online`)
- **Đường dẫn trang**: `/dang-nhap` (`src/app/(app)/dang-nhap/page.tsx`)

---

## 1. Mục tiêu và Định hướng

Xây dựng trang giao diện đăng nhập cho Chép Kinh Online tại đường dẫn `/dang-nhap`.
Giao diện phải tuyệt đối tuân thủ Bộ quy chuẩn giao diện (Design System) của dự án:
- Phong cách án thư thanh tịnh, tôn nghiêm, tông màu chủ đạo: giấy ngà (`--paper`), mực nâu (`--brown-800`, `--brown-900`), viền chỉ vàng kim (`--gold-500`, `--gold-700`).
- Nền trang kế thừa bố cục `.scene` với hoa văn chữ Vạn liên hoàn (`sayagata-pattern.svg`) và quầng sáng vàng dịu ở hai góc.
- Nằm trong layout `(app)`, hiển thị đầy đủ `AppHeader` (kèm logo hoa sen, danh mục kinh) và `SiteFooter` trang nghiêm.
- Phạm vi: Tập trung hoàn thiện toàn diện giao diện (UI/UX), tương tác nhập liệu client-side, nút bấm mạng xã hội, validation cơ bản; sẵn sàng kết nối thư viện Auth ở các giai đoạn sau.

---

## 2. Kiến trúc và Cấu trúc tệp

```
src/
├── app/
│   └── (app)/
│       └── dang-nhap/
│           ├── page.tsx               # Trang Server Component / Client Component đăng nhập
│           └── login.module.css       # CSS module riêng cho form đăng nhập, kế thừa tokens
└── components/
    └── auth/
        ├── LoginForm.tsx              # Component form đăng nhập chính (Client component)
        ├── SocialLoginGroup.tsx       # Cụm 3 nút đăng nhập Google, Apple, Facebook
        └── AuthInput.tsx              # Ô input chuẩn hóa (hỗ trợ icon trước/sau, hiển thị lỗi)
```

---

## 3. Chi tiết Giao diện & Trải nghiệm (UI/UX)

### 3.1. Khung Thẻ Kính (Glass Login Card)
- **Vị trí**: Căn giữa màn hình theo phương ngang và phương dọc (khoảng đệm `py-10 md:py-16`, tối thiểu `min-h-[calc(100vh-220px)]`).
- **Thẻ chứa**:
  - Class `.glass` kết hợp quy chuẩn thẻ mờ: nền `rgba(255, 255, 255, 0.76)`, viền `1px solid rgba(214, 164, 64, 0.35)`, bo góc 20px, hiệu ứng đổ bóng ấm `0 12px 32px rgba(150, 105, 25, 0.12)`.
  - Độ rộng tối đa: `440px`, đệm trong (padding): `36px 32px` trên máy tính, `28px 20px` trên thiết bị di động.

### 3.2. Tiêu đề và Dẫn nhập (Card Header)
- **Huy hiệu/Biểu tượng**: Biểu tượng hoa sen thu nhỏ hoặc khánh ngọc thanh tịnh ở phía trên tiêu đề.
- **Tiêu đề chính**: `"Đăng Nhập"`, phông Lora (`font-zen-title`), cỡ chữ `1.6rem`, độ đậm `600`, màu chữ `var(--brown-900)`.
- **Câu đề từ**: `"Trở về án thư · Lắng lòng chép kinh"`, phông Be Vietnam Pro (`font-zen-body`), cỡ `0.88rem`, màu `var(--brown-800)` với độ mờ nhẹ (0.8).

### 3.3. Các trường nhập liệu (Form Inputs)
- **Nhãn (Label)**:
  - Cỡ chữ `0.85rem`, độ đậm `500`, màu `var(--brown-800)`, canh lề trên mỗi ô nhập.
- **Ô Email**:
  - Type: `email`, có icon `IconMail` (kích thước 18px, màu `rgba(107, 74, 18, 0.6)`) đặt ở đầu.
  - Placeholder: `"Địa chỉ thư điện tử..."` màu `var(--ink-ghost)`.
- **Ô Mật khẩu**:
  - Type: chuyển đổi động giữa `password` và `text`.
  - Icon `IconLock` đặt ở đầu.
  - Nút con mắt `IconEye` / `IconEyeOff` đặt ở cuối, bấm để ẩn/hiện mật khẩu không làm mất focus.
- **Phong cách ô nhập**:
  - Nền giấy ngà nhẹ (`rgba(251, 247, 236, 0.85)`), viền mảnh `1px solid rgba(214, 164, 64, 0.35)`, bo góc `10px` (`radius-control`).
  - Chiều cao `44px`, đệm chữ thoải mái.
  - Focus state: viền chuyển sang `var(--gold-500)`, bóng nhẹ màu hổ phách `0 0 0 3px rgba(214, 164, 64, 0.18)`. Tuyệt đối không dùng outline xanh mặc định.
- **Báo lỗi (Validation)**:
  - Khi có lỗi (để trống email, mật khẩu ngắn dưới 6 ký tự), viền chuyển sang màu mực đỏ trầm `var(--ink-wrong)` (`#b45309`), kèm dòng thông báo nhỏ bên dưới.

### 3.4. Tùy chọn Phụ
- Hàng ngang canh giữa hai đầu (`display: flex; justify-content: space-between`):
  - Bên trái: Checkbox "Ghi nhớ đăng nhập" với checkbox tùy biến phong cách giấy ngà - viền vàng.
  - Bên phải: Liên kết "Quên mật khẩu?" màu `var(--gold-700)`, hover chuyển sang `var(--brown-900)` có gạch chân nhẹ.

### 3.5. Nút Hành động Chính (Primary Action)
- Áp dụng class `.goldButton`:
  - Dáng viên thuốc (`radius-pill`), nền gradient thếp vàng đặc trưng.
  - Chiều rộng `100%`, chiều cao `46px`, chữ màu `var(--brown-900)` đậm `600`.
  - Hiệu ứng vệt sáng quét qua nhẹ nhàng khi rê chuột (`hover`).
  - Trạng thái loading: Khi người dùng bấm submit, hiển thị vòng xoay mượt mà và vô hiệu hóa nút tạm thời.

### 3.6. Dải phân cách (Divider)
- Đường phân cách thanh nhã với dải chỉ vàng mờ (`rgba(214, 164, 64, 0.25)`).
- Chữ ở giữa: `"hoặc tiếp tục với"`, cỡ chữ `0.8rem`, màu `var(--ink-ghost)`, nền trùng màu kính.

### 3.7. Cụm nút Đăng nhập Mạng Xã Hội (Social Logins)
- Gồm 3 nút phân bổ đều theo chiều ngang: **Google**, **Apple**, **Facebook**.
- **Quy cách nút**:
  - Dáng viên thuốc, kế thừa phong cách `.ghostButton`: nền giấy ngà nhẹ (`rgba(251, 247, 236, 0.85)`), viền chỉ vàng `rgba(214, 164, 64, 0.45)`, bo góc tròn 999px.
  - Chiều cao `42px`, linh hoạt hiển thị logo cùng tên dịch vụ hoặc logo kèm tooltip trợ năng `aria-label`.
  - Khi hover: Nền ửng ánh vàng (`rgba(232, 199, 122, 0.2)`), viền sáng rõ hơn.
  - **Biểu tượng**:
    - Google: Logo chữ G vector chuẩn kích thước 18px.
    - Apple: Logo quả táo `IconBrandApple` màu `var(--brown-900)`.
    - Facebook: Logo `IconBrandFacebook` màu xanh Facebook tinh tế hoặc màu nâu mực đồng bộ.

### 3.8. Chân Thẻ Điều Hướng (Card Footer)
- Đoạn văn bản: `"Chưa có tài khoản? "` kèm nút hoặc link `"Đăng ký ngay"` màu `var(--gold-700)` in đậm `600`.
- Tương tác: Bấm vào "Đăng ký" hoặc "Quên mật khẩu" sẽ kích hoạt hộp thoại thông báo nhẹ nhàng (Feedback notification) thông báo tính năng đang sẵn sàng kết nối.

---

## 4. Khả năng tương thích và Trợ năng (Accessibility & Responsiveness)
- **Mobile First**: Co giãn tự nhiên trên màn hình từ 320px đến màn hình 4K.
- **Bàn phím**: Điều hướng tab mượt mà qua các ô input, nút submit và các nút mạng xã hội. Focus ring chuẩn vàng kim (`outline: 2px solid var(--gold-500)`).
- **Giảm chuyển động (prefers-reduced-motion)**: Tắt các hiệu ứng vệt sáng lướt qua nếu người dùng kích hoạt giảm chuyển động.
