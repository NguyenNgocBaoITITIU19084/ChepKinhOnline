# Thiết kế Giao diện Hồ sơ Người dùng (User Profile Bento Dashboard)

- **Ngày tạo:** 2026-11-07
- **Trạng thái:** Chờ phê duyệt (Pending Review)
- **Đường dẫn trang:** `/tai-khoan` (`src/app/(app)/tai-khoan/page.tsx`)
- **Phạm vi kỹ thuật:** Giao diện UI hoàn chỉnh sử dụng Mock Data phong phú, sẵn sàng cắm API/Prisma khi hoàn thiện hệ thống xác thực.

---

## 1. Bối cảnh & Mục tiêu

Trang **Hồ sơ cá nhân** trong *Chép Kinh Online* không chỉ là nơi chỉnh sửa thông tin tài khoản thông thường, mà đóng vai trò như một **Trung tâm Tu học Cá nhân (Personal Zen Sanctuary & Practice Dashboard)**. 

### Mục tiêu chính:
1. **Định danh trang nghiêm:** Tôn vinh danh tính hành giả qua Họ tên và **Pháp danh** (Dharma name), ảnh đại diện/chữ lồng trong khung hoa sen, cùng lời phát nguyện tu học hàng ngày.
2. **Theo dõi công phu:** Ghi nhận và khích lệ hành trình chép kinh thông qua các chỉ số công đức (chữ đã chép, số bản kinh hoàn thành, chuỗi ngày chuyên cần - streak, thời gian tu tập).
3. **Tiếp nối việc chép kinh:** Giúp người dùng dễ dàng xem và tiếp tục các bài kinh đang chép dở chỉ với 1 cú click.
4. **Hài hòa thẩm mỹ:** Đồng bộ tuyệt đối với ngôn ngữ thiết kế của dự án: phong cách thiền viện (giấy xuyến chỉ vàng nhạt, viền mạ vàng mờ hoàng y, font Lora có chân và hiệu ứng kính mờ `ck-glass`).

---

## 2. Kiến trúc & Tổ chức Thư mục

```text
src/
├── app/
│   └── (app)/
│       └── tai-khoan/
│           └── page.tsx                    # Trang hồ sơ chính
├── components/
│   └── profile/
│       ├── ProfileHeader.tsx               # Breadcrumb và lời tựa đầu trang
│       ├── ProfileIdentityCard.tsx         # Card thông tin hành giả + nút mở modal sửa
│       ├── ProfileEditModal.tsx            # Modal cập nhật thông tin cá nhân (Họ tên, Pháp danh, Lời nguyện)
│       ├── ZenIntentionCard.tsx            # Card lời nguyện / trích đoạn kinh tâm đắc
│       ├── QuickSettingsCard.tsx           # Card cài đặt nhanh (âm thanh chuông, lật trang, cỡ chữ)
│       ├── MeritMetricsGrid.tsx            # Lưới 4 ô thống kê công phu chép kinh
│       ├── InProgressSutrasCard.tsx        # Danh sách kinh đang chép dở kèm thanh tiến độ
│       ├── CompletedSutrasCard.tsx         # Danh sách kinh đã chép hoàn thành viên mãn
│       ├── SavedArticlesCard.tsx           # Danh sách bài viết Tự học đã lưu
│       └── EmptyState.tsx                  # Hiển thị khi danh sách trống
└── data/
    └── mock-profile.ts                     # Dữ liệu mẫu hoàn chỉnh cho trang cá nhân
```

---

## 3. Cấu trúc Giao diện & Bố cục (Layout Details)

Sử dụng bố cục **Bento Grid bất đối xứng**:
* **Mobile / Tablet nhỏ (< 1024px):** 1 cột dọc duy nhất xếp lớp mượt mà.
* **Desktop (≥ 1024px):** Lưới 12 cột (`tw:grid tw:grid-cols-12 tw:gap-6`):
  * **Cột trái (4/12 cột):** Khu vực tĩnh & Định danh.
  * **Cột phải (8/12 cột):** Khu vực động & Dòng chảy công phu.

```
+-----------------------------------------------------------------------------------------+
| [ProfileHeader] Trang chủ / Hồ sơ tu học                                                |
| Tiêu đề: "Không Gian Tu Học & Hồ Sơ Cá Nhân"                                            |
+----------------------------------------------------+------------------------------------+
| [CỘT TRÁI - 4 CỘT]                                 | [CỘT PHẢI - 8 CỘT]                 |
|                                                    |                                    |
| 1. ProfileIdentityCard                             | 1. MeritMetricsGrid (Lưới 4 ô)     |
|    - Avatar viền hoa sen                           |    [Tổng số chữ]  [Kinh hoàn thành]|
|    - Họ tên + Pháp danh                            |    [Chuỗi ngày]   [Thời gian chép] |
|    - Email & Ngày bắt đầu                          +------------------------------------+
|    - Nút "Chỉnh sửa hồ sơ"                         | 2. InProgressSutrasCard            |
|                                                    |    - Bát Nhã Tâm Kinh (65%)        |
| 2. ZenIntentionCard                                |      [Tiếp tục chép ->]           |
|    - Lời nguyện tu học / Trích khế kinh            |    - Chú Đại Bi (30%)              |
|                                                    +------------------------------------+
| 3. QuickSettingsCard                               | 3. CompletedSutrasCard             |
|    - Âm chuông chánh niệm (Bật/Tắt)               |    - Kinh Phổ Môn (Hoàn thành)     |
|    - Tiếng gõ mõ lật trang                         |      [Xem lại bài chép]            |
|    - Cỡ chữ chép mặc định                          +------------------------------------+
|                                                    | 4. SavedArticlesCard               |
|                                                    |    - Các bài viết từ mục Tự học    |
+----------------------------------------------------+------------------------------------+
```

---

## 4. Chi tiết Dữ liệu & Tương tác

### 4.1. Dữ liệu Mẫu (`mock-profile.ts`)
```typescript
export interface UserProfileData {
  id: string;
  name: string;
  dharmaName: string; // Pháp danh (vd: Thiện Duyên, Diệu Tâm)
  email: string;
  joinedDate: string;
  avatarUrl?: string;
  intention: string; // Lời nguyện tu học
  metrics: {
    totalCharsTyped: number;
    completedSutrasCount: number;
    streakDays: number;
    totalHoursSpent: number;
  };
  inProgressSutras: Array<{
    id: string;
    slug: string;
    title: string;
    originalTitle?: string;
    progressPercent: number;
    typedChars: number;
    totalChars: number;
    lastPracticedAt: string;
  }>;
  completedSutras: Array<{
    id: string;
    slug: string;
    title: string;
    originalTitle?: string;
    completedAt: string;
    totalChars: number;
  }>;
  savedArticles: Array<{
    id: string;
    slug: string;
    title: string;
    readTime: string;
    category: string;
    savedAt: string;
  }>;
}
```

### 4.2. Tương tác chính:
1. **Nút "Chỉnh sửa hồ sơ"**: Mở modal `ProfileEditModal` cho phép người dùng thay đổi Tên hiển thị, Pháp danh, Lời phát nguyện cá nhân.
2. **Nút "Tiếp tục chép"**: Dẫn trực tiếp tới `/chep-kinh/[slug]`, sẵn sàng cho phiên chép kinh mới.
3. **Bộ gạt Cài đặt nhanh (`QuickSettingsCard`)**: Có state cục bộ (hoặc lưu `localStorage`) phản hồi ngay lập tức khi bật/tắt âm thanh chuông mõ.
4. **Trạng thái trống (Empty State)**: Có thiết kế nhẹ nhàng với lời nhắn động viên khi chưa có bài kinh nào hoàn thành hoặc đang chép.

---

## 5. Quy chuẩn Kỹ thuật & Styling

* **Tailwind Prefix:** Tuân thủ quy tắc dự án, tất cả class Tailwind đều có tiền tố `tw:` (như `tw:flex`, `tw:bg-amber-50/50`, `tw:rounded-2xl`).
* **Icons:** Sử dụng thư viện `@tabler/icons-react` và các icon Phật giáo có sẵn trong `src/components/icons/BuddhistIcons.tsx`.
* **Hiệu ứng:** Lớp kính mờ `ck-glass`, đổ bóng êm ái, chuyển động mượt (`tw:transition-all tw:duration-200`).
* **Khả năng tiếp cận (Accessibility):** Có nhãn `aria-label`, hỗ trợ bàn phím khi mở/đóng modal (`Escape`, focus trap cơ bản).
