# Thiết kế Giao diện Trang Liên Hệ & Góp Ý (Contact & Feedback Page)

- **Ngày tạo:** 2026-11-08
- **Trạng thái:** Đã phê duyệt (Approved)
- **Đường dẫn trang:** `/lien-he` (`src/app/(app)/lien-he/page.tsx`)
- **Phạm vi kỹ thuật:** Trang liên hệ & đóng góp ý kiến mang phong cách thiền tịnh (Zen Split Layout), xây dựng bằng Next.js 16 App Router, 100% Tailwind CSS (prefix `tw:`), tích hợp khối câu hỏi thường gặp (FAQ Accordion), biểu mẫu liên hệ chuyên biệt cho người chép kinh và luồng mô phỏng gửi tin (mock submission) mượt mà.

---

## 1. Bối cảnh & Mục tiêu

Trang web **Chép Kinh Online** hiện đã có liên kết `/lien-he` trong menu danh mục (`NAV` trong `SiteNav.tsx` và `SiteFooter.tsx`), tuy nhiên route này chưa được hiện thực.

Việc xây dựng trang `/lien-he` nhằm đạt các mục tiêu sau:
1. **Lắng nghe và hiệu đính bản kinh:** Tiếp nhận phản ánh chính xác từ đạo hữu về các lỗi chính tả, phiên âm chữ Hán/Việt hoặc lỗi định dạng trong các bài kinh.
2. **Tiếp nhận đề xuất kinh mới & báo lỗi kỹ thuật:** Tạo kênh trao đổi rõ ràng để người dùng đóng góp nguồn kinh hoặc phản ánh sự cố bàn gõ.
3. **Giải đáp thắc mắc trước thông qua FAQ:** Cung cấp sẵn các câu hỏi thường gặp ngay bên cạnh biểu mẫu để người dùng có thể tự tra cứu mà không mất thời gian chờ đợi phản hồi.
4. **Không gian thẩm mỹ thiền tịnh:** Duy trì phong cách thiết kế giấy kem, ánh kim hoàng gia ấm áp, thư thái, tương thích 100% với hệ thống design token của dự án.

---

## 2. Kiến trúc & Tổ chức Thư mục

Tất cả các thành phần được tổ chức thành các đơn vị độc lập, phân tách rõ ràng giữa Server Component và Client Component:

```text
src/
├── app/
│   └── (app)/
│       └── lien-he/
│           └── page.tsx                     # Server Component: SEO metadata, khung bố cục chính 2 cột
├── components/
│   └── contact/
│       ├── ContactHeader.tsx                # Client/Server: Tiêu đề trang, nhãn huy hiệu hoa sen và lời ngỏ
│       ├── ContactFaq.tsx                   # Client Component: Danh sách câu hỏi thường gặp dạng Accordion mở/đóng
│       ├── ContactForm.tsx                  # Client Component: Biểu mẫu nhập liệu, chọn chủ đề, validation và mock submit
│       └── ContactSuccessAlert.tsx          # Client Component: Khung tri ân hoan hỷ sau khi gửi tin nhắn thành công
```

---

## 3. Chi tiết Giao diện & Trải nghiệm Người dùng (UI/UX)

Trang được bố trí theo **Phương án 1 (Zen Split Layout)**:
- **Trên màn hình lớn (Desktop / Tablet >= 1024px)**: Chia 2 cột bất đối xứng (`tw:grid tw:grid-cols-1 lg:tw:grid-cols-12 tw:gap-10`).
  - Cột trái (5 phần - `lg:tw:col-span-5`): Khối FAQ Accordion và lời ngỏ trợ duyên.
  - Cột phải (7 phần - `lg:tw:col-span-7`): Khung Biểu mẫu gửi liên hệ (Contact Form).
- **Trên màn hình nhỏ (Mobile < 1024px)**: Xếp tuần tự: Tiêu đề -> Biểu mẫu liên hệ -> Khối câu hỏi thường gặp FAQ.

### 3.1. Cụm Tiêu Đề Trang (`ContactHeader.tsx`)
- **Huy hiệu hoa sen (Lotus Emblem)**: Huy hiệu tròn viền kép ánh kim chứa hoa sen thanh tịnh.
- **Nhãn trang trí (Eyebrow)**:
  - Cấu trúc: `LẮNG NGHE & TRI ÂN` · `傾聽`
  - Nét kẻ vàng mờ dần hai bên (tương tự nhãn Hồi hướng ở footer).
- **Tiêu đề chính**: *"Liên hệ & Đóng góp ý kiến"* (phông `font-zen-title`, kích thước chữ thích ứng `tw:text-2xl sm:tw:text-3xl lg:tw:text-4xl`, màu `tw:text-brown-900`).
- **Đoạn dẫn**: Lời chia sẻ từ tâm về tinh thần hoan hỷ lắng nghe đóng góp để hoàn thiện không gian chép kinh.

### 3.2. Khối Câu Hỏi Thường Gặp (`ContactFaq.tsx`)
Accordion tinh tế, click để trượt mở nội dung, bao gồm 4 câu hỏi thực tế:
1. **Báo lỗi chính tả hoặc câu chữ trong bài kinh**:
   - *Nội dung*: Hướng dẫn người dùng chọn chủ đề *"Sửa lỗi bài kinh"*, điền rõ tên bộ kinh và câu/đoạn cần sửa. Ban biên tập sẽ đối chiếu với Tam Tạng kinh điển để chỉnh sửa trong 24-48 giờ.
2. **Làm sao để đề xuất một bộ kinh mới chưa có trên trang?**:
   - *Nội dung*: Nêu rõ tiêu chí tiếp nhận các bài kinh có nguồn dịch chuẩn xác từ chư tôn đức hoặc các viện nghiên cứu Phật học uy tín.
3. **Trang web có thu phí hay nhận quyên góp tài chính không?**:
   - *Nội dung*: Khẳng định dự án hoàn toàn phi thương mại và phục vụ cộng đồng. Mọi công đức tu tập và chép kinh đều hồi hướng chung cho pháp giới chúng sinh.
4. **Gặp sự cố khi đang gõ chép kinh (kẹt phím, lỗi dấu tiếng Việt)?**:
   - *Nội dung*: Hướng dẫn kiểm tra bảng mã Unicode và kiểu gõ Telex/VNI, hoặc thử tải lại trang (dữ liệu bài chép luôn được tự động lưu cục bộ).

### 3.3. Biểu Mẫu Liên Hệ (`ContactForm.tsx`)
Nằm trong khung thẻ giấy thiền (`ck-glass`, nền giấy kem `tw:bg-[var(--paper-cream)]/80`, viền `tw:border-[rgba(214,164,64,0.35)]`, góc bo `tw:rounded-2xl`):
- **Bộ chọn chủ đề (Category Selection)**: 4 nút tag pills tròn bo góc dễ bấm:
  - `sutra_edit`: 📿 Sửa lỗi bản kinh (Mặc định được chọn)
  - `sutra_suggest`: 📜 Đề xuất kinh mới
  - `tech_issue`: ⚙️ Báo lỗi kỹ thuật
  - `general`: 🌸 Tâm tình & Khác
- **Trường thông tin tùy biến (Conditional Field)**:
  - Khi chủ đề là `sutra_edit` hoặc `sutra_suggest`: Xuất hiện thêm ô nhập *"Bộ kinh & Vị trí câu/đoạn"* (Placeholder: *"Ví dụ: Chú Đại Bi - Câu thứ 12"*).
- **Họ tên / Pháp danh**: Ô nhập text, bắt buộc, tối thiểu 2 ký tự.
- **Địa chỉ Email**: Ô nhập email, bắt buộc, kiểm tra định dạng email hợp lệ để nhận phản hồi.
- **Nội dung lời nhắn**: Textarea tối thiểu 4 dòng, hỗ trợ đếm ký tự, placeholder nhã nhặn.
- **Nút gửi**: Nút bấm hoàng kim (`ck-btn-gold`), có icon lá thư gửi đi (`IconSend` từ `@tabler/icons-react`), trạng thái loading spinner khi bấm gửi.

### 3.4. Khung Cảm Tạ Hoan Hỷ (`ContactSuccessAlert.tsx`)
Khi gửi thành công:
- Khung biểu mẫu trượt chuyển đổi nhẹ nhàng sang khung cảm tạ hoan hỷ.
- Biểu tượng hoa sen vàng rạng rỡ với vòng hào quang êm dịu.
- Tiêu đề: *"Tri Ân Lời Nhắn Của Quý Đạo Hữu"*.
- Lời nhắn: Xác nhận đã ghi nhận thông tin của `[Họ tên]` và sẽ liên lạc qua `[Email]` khi hoàn tất.
- Nút bấm: *"Gửi thêm lời nhắn khác"* để đặt lại trạng thái form nếu cần.

---

## 4. Quản Lý Trạng Thái & Xử Lý Dữ Liệu (State & Data Flow)

### 4.1. Cấu trúc Kiểu Dữ liệu
```typescript
export type ContactCategory = "sutra_edit" | "sutra_suggest" | "tech_issue" | "general";

export interface ContactFormData {
  category: ContactCategory;
  sutraReference?: string;
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  sutraReference?: string;
  message?: string;
}
```

### 4.2. Luồng Xử Lý Mô Phỏng (Mock Submission Flow)
1. **Client Validation**:
   - `name`: Không rỗng, độ dài $\ge 2$.
   - `email`: Khớp regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
   - `sutraReference`: Bắt buộc nếu category là `sutra_edit` (tối thiểu 3 ký tự).
   - `message`: Không rỗng, độ dài $\ge 10$ ký tự.
2. **Submission State**:
   - Khi hợp lệ: Đặt `isSubmitting = true`.
   - Giả lập trễ mạng: `await new Promise((resolve) => setTimeout(resolve, 1000))`.
   - Ghi nhận dữ liệu vào console (`console.info("[Contact Form] Submitted:", data)`).
   - Đặt `isSubmitting = false` và `isSubmitted = true`.
3. **Reset State**:
   - Khi bấm "Gửi thêm lời nhắn khác": Đưa form về giá trị mặc định, `isSubmitted = false`.

---

## 5. Quy Chuẩn Kỹ Thuật & Tailwind CSS

- **Prefix bắt buộc**: Toàn bộ class Tailwind CSS bắt buộc sử dụng tiền tố `tw:` (như `tw:flex`, `tw:grid`, `tw:rounded-2xl`, `tw:p-6`, `tw:transition-all`).
- **Màu sắc & Phông chữ**:
  - Tiêu đề: `font-zen-title` (Lora)
  - Chữ nội dung: `font-zen-body` (Be Vietnam Pro)
  - Chữ Hán phụ đề: `font-zen-han` (Noto Serif TC)
  - Màu chữ: `tw:text-brown-900`, `tw:text-brown-800`, `tw:text-gold-700`
  - Viền & Card: `ck-glass`, `tw:border-[rgba(214,164,64,0.35)]`
  - Nút bấm: `ck-btn-gold`
- **Tương thích thiết bị**: Responsive mượt mà trên iPhone/Android nhỏ ($\le 375px$), Tablet (768px), và Desktop lớn ($\ge 1280px$).

---

## 6. Kiểm Thử & Tiêu Chí Nghiệm Thu (Acceptance Criteria)

1. **Hiển thị & Điều hướng**:
   - Truy cập được vào đường dẫn `/lien-he` từ thanh Menu header và Chân trang footer mà không gặp lỗi 404.
   - Thẻ `<title>` và `<meta name="description">` hiển thị đúng cho SEO.
2. **Tương tác Accordion FAQ**:
   - Bấm vào từng câu hỏi FAQ sẽ mở câu trả lời tương ứng, bấm lại hoặc bấm câu khác sẽ hoạt động mượt mà.
3. **Tương tác Biểu mẫu (Form)**:
   - Chuyển đổi giữa 4 nhóm chủ đề (Pill tag) kích hoạt chính xác ô nhập bổ sung *"Bộ kinh & đoạn cần sửa"*.
   - Nhập thiếu hoặc sai định dạng hiển thị thông báo lỗi tiếng Việt thân thiện, viền đổi màu đỏ cam nhẹ.
   - Nhập đầy đủ và bấm Gửi: Nút chuyển sang trạng thái loading, sau 1 giây hiển thị màn hình Cảm tạ hoan hỷ kèm thông tin người gửi.
   - Bấm nút "Gửi thêm lời nhắn khác" đưa giao diện trở lại trạng thái ban đầu sạch sẽ.
4. **Không lỗi TypeScript & Build**:
   - Chạy `npm run build` thành công không có cảnh báo hoặc lỗi type.
