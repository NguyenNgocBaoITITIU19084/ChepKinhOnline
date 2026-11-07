# Kế Hoạch Triển Khai Trang Hồ Sơ Người Dùng (User Profile Bento Dashboard)

> **Dành cho Agentic Workers:** SỬ DỤNG SUB-SKILL: `superpowers:subagent-driven-development` hoặc `superpowers:executing-plans` để thực hiện từng bước trong kế hoạch này. Các bước sử dụng cú pháp checkbox (`- [ ]`) để theo dõi tiến độ.  
> **Tài liệu đặc tả (Spec):** [docs/superpowers/specs/2026-11-07-user-profile-page-design.md](file:///Users/baonguyen/Developer/ChepKinhOnline/docs/superpowers/specs/2026-11-07-user-profile-page-design.md)  
> **Ràng buộc toàn cục (Global Constraints):**  
> - Toàn bộ styling Tailwind CSS bắt buộc sử dụng tiền tố `tw:` (như `tw:flex`, `tw:rounded-2xl`, `tw:bg-gold-500`...) để tránh xung đột với Tabler/Bootstrap.  
> - Sử dụng `@tabler/icons-react` và các biểu tượng Phật giáo sẵn có từ `@/components/icons/BuddhistIcons`.  
> - Tuân thủ phong cách Zen Buddhist: giấy xuyến chỉ (`bg-paper-light`), viền vàng hoàng y (`border-[rgba(214,164,64,0.3)]`), hiệu ứng kính mờ `ck-glass`, font Lora serif cho tiêu đề và câu kinh.

---

## Mục tiêu
Xây dựng giao diện trang Hồ sơ người dùng tại `/tai-khoan` theo mô hình **Bento Grid Dashboard** với dữ liệu mẫu (mock data), cho phép người dùng quản lý thông tin danh tính (Họ tên, Pháp danh), theo dõi công phu tu tập (chữ đã chép, chuỗi ngày streak), tiếp tục các bản kinh đang chép dở và tinh chỉnh trải nghiệm cá nhân.

---

## Chi Tiết Các Tác Vụ Triển Khai

### Nhiệm vụ 1: Định Nghĩa Kiểu Dữ Liệu & Mock Data
**Tệp:**
- Tạo: `src/types/profile.ts`
- Tạo: `src/data/mock-profile.ts`

**Giao diện & Dữ liệu:**
- `UserProfileData`: chứa `id`, `name`, `dharmaName`, `email`, `joinedDate`, `avatarUrl`, `intention`, `metrics`, `inProgressSutras`, `completedSutras`, `savedArticles`.
- Mock data phong phú, có đủ dữ liệu cho một Phật tử tích cực (ví dụ: Phật tử Tuệ Quang / Nguyễn Văn An, Bát Nhã Tâm Kinh tiến độ 68%, Chú Đại Bi tiến độ 35%, Kinh Phổ Môn đã hoàn thành, 3 bài viết tự học đã lưu).

- [ ] **Bước 1.1:** Tạo file `src/types/profile.ts` chứa đầy đủ các interface.
- [ ] **Bước 1.2:** Tạo file `src/data/mock-profile.ts` chứa dữ liệu mẫu chuẩn xác và hàm trợ giúp `getMockUserProfile()`.
- [ ] **Bước 1.3:** Kiểm tra TypeScript build bằng `npm run build` hoặc `npx tsc --noEmit` để đảm bảo không có lỗi type.

---

### Nhiệm vụ 2: Các Thành Phần Cột Trái (Identity, Intention, Quick Settings, Edit Modal)
**Tệp:**
- Tạo: `src/components/profile/ProfileIdentityCard.tsx`
- Tạo: `src/components/profile/ZenIntentionCard.tsx`
- Tạo: `src/components/profile/QuickSettingsCard.tsx`
- Tạo: `src/components/profile/ProfileEditModal.tsx`

**Chi tiết tính năng:**
- `ProfileIdentityCard`: Hiển thị Avatar lớn có vòng tròn sen thanh tịnh, Họ tên font đậm, Pháp danh nổi bật với nhãn tag hoàng y mạ vàng, email, ngày tham gia, nút "Chỉnh sửa hồ sơ".
- `ProfileEditModal`: Client component (`"use client"`), mở modal dạng `ck-glass` với form cập nhật Tên, Pháp danh, Lời phát nguyện. Hỗ trợ nút Lưu (cập nhật state) và nút Đóng/Escape.
- `ZenIntentionCard`: Khối hiển thị lời nguyện tu học hoặc câu khế kinh truyền cảm hứng với icon hoa sen và định dạng trích dẫn thư pháp.
- `QuickSettingsCard`: Client component (`"use client"`), gồm 3 switch gạt: "Chuông chánh niệm khi hoàn thành đoạn", "Tiếng lật trang giấy xuyến chỉ", và nút chọn cỡ chữ mặc định (Vừa / Lớn).

- [ ] **Bước 2.1:** Viết component `ProfileIdentityCard.tsx`.
- [ ] **Bước 2.2:** Viết component `ProfileEditModal.tsx` với đầy đủ accessibility (`role="dialog"`, xử lý phím Esc, backdrop click).
- [ ] **Bước 2.3:** Viết component `ZenIntentionCard.tsx`.
- [ ] **Bước 2.4:** Viết component `QuickSettingsCard.tsx` với state cục bộ bật/tắt trực quan.
- [ ] **Bước 2.5:** Kiểm tra type và cấu trúc giao diện các thẻ cột trái.

---

### Nhiệm vụ 3: Các Thành Phần Cột Phải (Metrics, In Progress, Completed, Saved Articles)
**Tệp:**
- Tạo: `src/components/profile/MeritMetricsGrid.tsx`
- Tạo: `src/components/profile/InProgressSutrasCard.tsx`
- Tạo: `src/components/profile/CompletedSutrasCard.tsx`
- Tạo: `src/components/profile/SavedArticlesCard.tsx`
- Tạo: `src/components/profile/EmptyState.tsx`

**Chi tiết tính năng:**
- `MeritMetricsGrid`: Lưới 4 ô Bento thanh lịch:
  1. Tổng số chữ đã chép (kèm icon bút lông / quyển kinh).
  2. Số bản kinh viên mãn (kèm icon hoa sen mãn khai).
  3. Chuỗi ngày chuyên cần Streak (kèm icon ngọn đèn chánh niệm / tia sáng).
  4. Thời gian công phu (giờ tu tập).
- `InProgressSutrasCard`: Danh sách các bản kinh đang chép dở:
  - Tên kinh, tên chữ Hán, số chữ đã chép / tổng số chữ.
  - Thanh tiến độ màu vàng hoàng y (`tw:h-2 tw:bg-gold-500 tw:rounded-full`).
  - Nút bấm *"Tiếp tục chép"* dẫn link thẳng sang `/chep-kinh/[slug]`.
- `CompletedSutrasCard`: Danh sách các bộ kinh đã hoàn thành:
  - Tên kinh, ngày hoàn thành, huy hiệu "Viên mãn".
  - Nút *"Xem bài chép"* hoặc xem lại bản kinh.
- `SavedArticlesCard`: Danh sách bài viết Tự học đã lưu:
  - Tiêu đề bài viết, chuyên mục, thời gian đọc, link sang `/tu-hoc/[slug]`.
- `EmptyState`: Component hiển thị khi danh sách trống với icon dịu mắt và câu khuyến tấn nhẹ nhàng.

- [ ] **Bước 3.1:** Viết component `EmptyState.tsx`.
- [ ] **Bước 3.2:** Viết component `MeritMetricsGrid.tsx`.
- [ ] **Bước 3.3:** Viết component `InProgressSutrasCard.tsx`.
- [ ] **Bước 3.4:** Viết component `CompletedSutrasCard.tsx`.
- [ ] **Bước 3.5:** Viết component `SavedArticlesCard.tsx`.

---

### Nhiệm vụ 4: Lắp Ráp Trang Chính `/tai-khoan` & ProfileHeader
**Tệp:**
- Tạo: `src/components/profile/ProfileHeader.tsx`
- Tạo: `src/components/profile/index.ts` (export tất cả component)
- Tạo: `src/app/(app)/tai-khoan/page.tsx`
- Kiểm tra: `src/components/layout/UserMenu.tsx` (đảm bảo menu link tới `/tai-khoan`)

**Chi tiết tính năng:**
- `ProfileHeader`: Breadcrumb `Trang chủ` / `Hồ sơ tu học`, tiêu đề trang `Hồ Sơ Tu Học & Công Phu`, lời chúc bình an.
- `tai-khoan/page.tsx`:
  - Khung bao ngoài phong cách giấy xuyến chỉ (`ck-page-container` hoặc `container tw:py-8`).
  - Lưới 12 cột Bento Grid: `tw:grid tw:grid-cols-1 tw:lg:grid-cols-12 tw:gap-6`.
  - Quản lý state người dùng giả lập (để khi sửa thông tin trong `ProfileEditModal`, dữ liệu cập nhật tức thời trên trang).

- [ ] **Bước 4.1:** Tạo `src/components/profile/ProfileHeader.tsx`.
- [ ] **Bước 4.2:** Tạo `src/components/profile/index.ts` tập trung hóa exports.
- [ ] **Bước 4.3:** Xây dựng trang `src/app/(app)/tai-khoan/page.tsx` tích hợp toàn bộ các component Bento.
- [ ] **Bước 4.4:** Kiểm tra tích hợp với `UserMenu` khi người dùng bấm vào "Hồ sơ của tôi".

---

### Nhiệm vụ 5: Kiểm Thử, Kiểm Tra Lỗi & Hoàn Thiện (Verification & Polish)
- [ ] **Bước 5.1:** Chạy `npm run build` để kiểm tra toàn bộ TypeScript và cấu trúc routing Next.js không có lỗi cảnh báo/biên dịch.
- [ ] **Bước 5.2:** Kiểm tra tính đáp ứng hiển thị (Responsive) trên cả màn hình Desktop lớn, màn hình Laptop và Mobile.
- [ ] **Bước 5.3:** Kiểm tra tương tác Modal, đóng/mở mượt mà, đổi tên/pháp danh phản ánh ngay lập tức trên UI.
- [ ] **Bước 5.4:** Commit mã nguồn hoàn thiện vào Git repository.
