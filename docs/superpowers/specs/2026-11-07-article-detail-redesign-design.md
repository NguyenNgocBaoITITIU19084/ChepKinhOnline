# Thiết kế lại trang chi tiết bài viết Tu học (Article Detail Redesign)

**Ngày lập:** 07/11/2026  
**Đường dẫn thử nghiệm chính:** `/tu-hoc/y-nghia-sau-mau-bat-nha-tam-kinh`  
**Công nghệ:** Next.js App Router, React, Tailwind CSS (quy chuẩn tiền tố `tw:`), Tabler Icons, TypeScript.

---

## 1. Mục tiêu & Phạm vi
Nâng cấp trang chi tiết bài viết tu học từ trang văn bản sơ khai 1 cột thành một không gian đọc Phật học thanh tịnh, hiện đại, giàu tính tương tác và thẩm mỹ cao:
1. **Thanh tiến độ đọc (Reading Progress Mini-bar):** Sticky phía trên cùng khi cuộn trang, hiển thị tiến độ % đọc, tiêu đề rút gọn và nút chia sẻ / sao chép link.
2. **Breadcrumb:** Điều hướng phân tầng rõ ràng (`Trang chủ` > `Tu học` > `Giải nghĩa kinh` > `Tên bài viết`).
3. **Nội dung bài viết đầy đủ (Rich Article Content):**
   - Bổ sung nội dung hoàn chỉnh, sâu sắc về bản kinh Bát Nhã Tâm Kinh và các bài viết mẫu.
   - Mục lục bài viết (Table of Contents) nhảy nhanh theo đề mục (anchor links).
   - Các trích đoạn kệ kinh (Blockquotes), hộp ghi chú chánh niệm (Callout Box).
   - Thẻ kêu gọi chép kinh (`SutraCtaCard`) gắn với bản kinh liên quan.
4. **Khu vực Bình luận (Zen Comments Section):**
   - Giao diện gửi cảm ngộ/bình luận nhẹ nhàng, tôn kính.
   - Danh sách bình luận với avatar thiền vị, thời gian tương đối, nút *"Hoan hỷ"* (thay nút like) và phản hồi.
   - Tương tác phía client (React state) phản hồi tức thì khi người dùng đăng bình luận mới.
5. **Cột phụ Sidebar (300px):**
   - Khối **Danh mục tu học** (`CategoryList`): liên kết lọc về `/tu-hoc?category=...`, có số lượng bài viết.
   - Khối **Bài viết nổi bật / Đọc nhiều** (`PopularArticles`): danh sách bài có lượt đọc cao kèm ảnh thumbnail.
   - Khối **Gợi ý chép kinh** (`SutraCtaCard` size nhỏ).
6. **Chân trang - Bài viết liên quan (Related Articles):**
   - Khối grid các bài cùng chuyên mục giúp độc giả tiếp tục duy trì việc tu học.

---

## 2. Kiến trúc & Bố cục Giao diện (Layout Specification)

### 2.1 Bố cục 2 cột (ArticleLayout)
- Sử dụng cấu trúc lưới `grid-cols-[minmax(0,1fr)_300px]` (tự chuyển thành 1 cột trên màn hình nhỏ `≤ 1024px`).
- Cột chính (bên trái): Breadcrumb, Header bài viết, Ảnh bìa 16:9, Mục lục, Toàn văn bài viết, Thẻ chép kinh, Tác giả/Nguồn, Khu vực Bình luận.
- Cột phụ (bên phải): Sticky khi cuộn trên màn hình máy tính, chứa Danh mục, Bài đọc nhiều, Lời nhắc chép kinh.
- Phía dưới (Full width): Khối Bài viết liên quan (`ArticleGrid`).

### 2.2 Thanh tiến độ Mini-bar (Sticky Reading Progress Bar)
- **Vị trí:** `sticky top-0 z-40`, nền kính mờ `ck-glass` với hiệu ứng hòa nhập mượt mà.
- **Thành phần:**
  - Đường line tiến độ mảnh (3px) ở cạnh trên hoặc đáy bar, gradient màu vàng hổ phách (`tw:from-gold-600 tw:to-gold-400`).
  - Khi cuộn qua tiêu đề bài viết: thanh trượt mở nhẹ hiển thị:
    - Nút quay lại nhanh (`IconArrowLeft`).
    - Tiêu đề bài viết rút gọn (cắt gọn `tw:truncate`).
    - Số % tiến độ đọc (vd: `45% đã đọc`).
    - Nút sao chép liên kết (`IconShare` / `IconCheck`) có toast thông báo ngắn gọn.

### 2.3 Breadcrumb
- Đường dẫn: `Trang chủ` → `Tu học` → `[Chuyên mục]` → `[Tiêu đề bài viết]`.
- Style: Kiểu chữ thanh nhã `tw:text-[0.82rem] tw:text-brown-700`, phân cách bởi dấu `/` mờ hoặc `IconChevronRight`.

### 2.4 Nội dung bài viết phong phú (Article Body Typography)
- Font chữ: Nội dung dùng sans-serif dễ đọc (`leading-[1.85]`, kích cỡ `1.08rem`), tiêu đề các phần dùng font Lora (`var(--font-display)`).
- Trích đoạn thiền vị: Khung viền mạ vàng mờ, biểu tượng hoa sen hoặc dấu ngoặc kép nghệ thuật.
- Hộp mục lục: Tự động điều hướng đến các thẻ H2/H3 trong bài.

### 2.5 Component Bình luận (ArticleComments)
- **Props / State:**
  - Danh sách bình luận mẫu sâu sắc (vd: Phật tử Diệu Thiện, Tuệ Minh...).
  - Form thêm bình luận: Họ tên, Nội dung cảm ngộ.
  - Xử lý submit: Thêm ngay vào state cục bộ, hiển thị thông báo thành tâm hoan hỷ.
  - Tương tác "Hoan hỷ": Tăng số lượt tán thán của từng bình luận khi click.

---

## 3. Tương thích & Quy chuẩn Kỹ thuật
- **Tailwind CSS:** Toàn bộ class sử dụng tiền tố `tw:` (như `tw:flex`, `tw:rounded-2xl`, `tw:bg-paper`, `tw:text-brown-900`...).
- **Color tokens:** Tuân thủ hệ màu Zen của dự án:
  - Nền: `tw:bg-paper`, `tw:bg-parchment`.
  - Màu chữ: `tw:text-brown-900`, `tw:text-brown-800`, `tw:text-gold-700`.
  - Viền & Card: `paperPanel`, `paperCardFrame`, `focusable`.
- **Hiệu năng & Khả năng tiếp cận (Accessibility):**
  - Semantic HTML (`<article>`, `<aside>`, `<nav>`, `<section>`, `<form>`).
  - Hỗ trợ đầy đủ phím bấm `Tab`, focus-visible, `aria-label`, giảm chuyển động `tw:motion-reduce`.

---

## 4. Kế hoạch triển khai
1. Tạo component `ArticleBreadcrumb` và `ArticleReadingBar` (client component xử lý scroll & progress & share).
2. Tạo component `ArticleComments` (client component quản lý tương tác bình luận).
3. Bổ sung nội dung chi tiết bài viết (đặc biệt bài mẫu `y-nghia-sau-mau-bat-nha-tam-kinh` và cấu trúc trường `content` trong mock).
4. Tích hợp `ArticleLayout`, `CategoryList` (hỗ trợ chuyển hướng sang `/tu-hoc?category=...`), `PopularArticles` và `ArticleGrid` (bài liên quan) vào trang `/tu-hoc/[slug]`.
5. Kiểm tra giao diện trên màn hình Desktop, Tablet và Mobile.
