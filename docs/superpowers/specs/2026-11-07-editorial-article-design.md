# Tài liệu Thiết Kế: Hệ Thống Giao Diện Bài Viết & Trang Tu Học (Editorial & Article UI)

- **Ngày lập**: 2026-11-07
- **Trạng thái**: Đã phê duyệt bản thiết kế (Approved)
- **Dự án**: Chép Kinh Online (`chep-kinh-online`)
- **Đường dẫn trang**: `/tu-hoc` (`src/app/(app)/tu-hoc/page.tsx`)
- **Phạm vi kỹ thuật**: Frontend UI mẫu (Mock Data), bộ component bài viết tái sử dụng cho các trang nội dung khác trong tương lai (Tin tức, Phật sự, Cẩm nang). Không can thiệp cơ sở dữ liệu backend.

---

## 1. Mục tiêu và Định hướng

Xây dựng giao diện trang danh sách bài viết Tu học tại đường dẫn `/tu-hoc` theo phong cách **Tạp chí Phật giáo trang nhã (Editorial Zen)**:
- Thấm nhuần tinh thần "Tâm an · Pháp lạc", tôn vinh sự thanh tịnh, mực thước của Phật pháp.
- Áp dụng đầy đủ Bộ quy chuẩn giao diện (Design System) của Chép Kinh Online:
  - Bảng màu: Nền `scene-bg` phảng phất hoa văn chữ Vạn `sayagata-pattern.svg`, thẻ bài viết giấy ngà `paper`, viền kính mờ `glass-border`, nét nhấn vàng thếp `gold-500` và `gold-700`, chữ mực nâu `brown-800` và `brown-900`.
  - Phông chữ: Tiêu đề dùng phông Lora (`font-zen-title`), nội dung và nhãn dùng Be Vietnam Pro (`font-zen-body`).
- Tách bạch và module hóa toàn bộ thành phần bài viết thành bộ component chung (`src/components/article/`) để tái sử dụng tối đa cho các trang tin tức/thông báo/cẩm nang sau này.

---

## 2. Kiến trúc và Cấu trúc tệp

```text
src/
├── app/(app)/
│   └── tu-hoc/
│       └── page.tsx                   # Trang danh sách Tu học (ghép nối các component bài viết dùng chung)
├── types/
│   └── article.ts                     # TypeScript interfaces: Article, ArticleCategory, DailyQuote
├── data/
│   └── articles-mock.ts               # Dữ liệu mock: danh sách bài viết Tu học, danh mục, trích dẫn Phật ngôn
└── components/
    └── article/
        ├── article.module.css         # CSS Modules cho layout và thẻ bài viết (kế thừa tokens hệ thống)
        ├── ArticleHeader.tsx          # Tiêu đề chuyên trang, câu đề từ tĩnh tâm
        ├── ArticleHero.tsx            # Khối tiêu điểm: 1 bài viết lớn bên trái + 2 bài phụ bên phải
        ├── CategoryFilter.tsx         # Thanh tab chuyển danh mục (Tất cả, Giải nghĩa kinh, Nghi thức, Cẩm nang, Phật ngôn)
        ├── ArticleGrid.tsx            # Lưới hiển thị danh sách bài viết responsive
        ├── ArticleCard.tsx            # Thẻ bài viết chuẩn (ảnh bìa, danh mục, thời gian đọc, tóm tắt)
        ├── QuoteBox.tsx               # Khung trích dẫn lời Phật dạy trong ngày (Dhammapada / Kinh điển)
        └── SutraCtaCard.tsx           # Thẻ kêu gọi kết nối sang trang chép kinh ("Gieo duyên chép kinh")
```

---

## 3. Định nghĩa Dữ liệu (TypeScript Types & Schema)

Tệp `src/types/article.ts`:

```typescript
export type ArticleCategorySlug = 
  | "all" 
  | "giai-nghia" 
  | "nghi-thuc" 
  | "cam-nang" 
  | "phat-ngon";

export interface ArticleCategory {
  id: string;
  slug: ArticleCategorySlug;
  label: string;
  description?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategorySlug;
  categoryLabel: string;
  readTime: string;           // vd: "5 phút đọc"
  publishedAt: string;        // vd: "Rằm tháng Chạp, 2026"
  coverImage: string;         // Đường dẫn ảnh bìa
  isFeatured?: boolean;       // Đưa lên khối Hero chính
  isEditorPick?: boolean;     // Đưa lên danh sách phụ Hero
  relatedSutraSlug?: string;  // Khóa liên kết đến bài kinh để chép (nếu có)
  relatedSutraTitle?: string; // Tên kinh tương ứng
}

export interface DailyQuote {
  id: string;
  verse: string;              // Câu kệ / Lời Phật dạy
  source: string;             // Xuất xứ (vd: "Kinh Pháp Cú - Phẩm Tâm")
  meaning?: string;           // Lời giải nghĩa ngắn
}
```

---

## 4. Chi tiết Thiết kế Giao diện (UI Components)

### 4.1. `ArticleHeader` (Tiêu đề chuyên trang)
- **Nội dung**:
  - Eyebrow: `CHUYÊN TRANG TU HỌC & SOI SÁNG TÂM` (màu `gold-700`, chữ hoa, giãn chữ rộng).
  - Tiêu đề chính: `"Pháp Lạc · Mở Lối Tu Tập"` (phông Lora, chữ `brown-900`, cỡ `2rem - 2.5rem`).
  - Lời mở: Câu văn thanh tịnh giải thích ý nghĩa của việc học pháp song hành cùng chép kinh.

### 4.2. `ArticleHero` (Khối tiêu điểm Editorial)
- Bố cục 2 cột trên desktop (60% / 40%), xếp chồng trên mobile:
  - **Bài viết tâm điểm (Cột trái)**:
    - Ảnh bìa khổ lớn tỉ lệ 16:9 bo góc `radius-control` (10px).
    - Huy hiệu danh mục màu vàng `gold-700` trên nền `gold-100`.
    - Tiêu đề lớn 2 dòng, trích đoạn tóm tắt 3 dòng tạo cảm xúc sâu lắng.
    - Meta thông tin: Thời gian đọc và ngày đăng kèm dấu chấm giữa.
    - Nút bấm viên thuốc *"Đọc bài giảng"* dẫn link tương lai.
  - **Danh sách bài đọc thêm (Cột phải)**:
    - 2 thẻ bài viết phụ xếp dọc, bố cục ngang (ảnh thu nhỏ bên trái, tiêu đề và tóm tắt bên phải).
    - Ngăn cách bởi đường chỉ vàng mờ `glass-border`.

### 4.3. `CategoryFilter` (Thanh chọn chuyên mục linh hoạt)
- Danh sách tabs:
  - `Tất cả` (All)
  - `Giải nghĩa kinh`
  - `Nghi thức tụng niệm`
  - `Cẩm nang tu học`
  - `Lời Phật dạy`
- **Tương tác**: Chuyển đổi trạng thái ngay trên client (instant filter). Nút đang kích hoạt có nền vàng ấm `gold-button-top`, viền vàng `gold-500`, bóng đổ nhẹ `shadow-gold-button`.

### 4.4. `ArticleGrid` & `ArticleCard` (Lưới bài viết giấy ngà)
- **Bố cục lưới**: Lưới 3 cột trên Desktop (`tw:grid-cols-3`), 2 cột trên Tablet, 1 cột trên Mobile.
- **Thẻ `ArticleCard`**:
  - Nền giấy ngà `paper` (`#fbf7ec`), viền kính `glass-border` (`rgba(214, 164, 64, 0.35)`).
  - Hiệu ứng hover: Nhấc nhẹ thẻ lên 4px (`translate-y`), quầng đổ bóng vàng kim ấm dịu (`shadow-sheet-stack`).
  - Ảnh bìa có lớp phủ gradient mờ nhẹ để màu ảnh hài hòa với nền giấy.
  - Nhãn danh mục, tiêu đề Lora nét 600, tóm tắt 2 dòng `line-clamp-2`.
  - Nếu bài viết có `relatedSutraSlug`: Hiển thị huy hiệu nhỏ *"Có bản chép kinh"* kèm icon cây bút hoa sen.

### 4.5. `QuoteBox` (Phật ngôn soi sáng)
- Khung độc lập trang nhã mô phỏng trang kinh nhỏ:
  - Có hoa văn viền góc thanh thoát.
  - Bài kệ trích từ Kinh Pháp Cú bằng kiểu chữ Lora nghiêng (`merit-verse`).
  - Ghi rõ nguồn xuất xứ kinh điển.

### 4.6. `SutraCtaCard` (Gieo duyên chép kinh)
- Khung kính mờ `glass` đặt cuối trang danh sách:
  - Lời nhắn: *"Học pháp để hiểu, chép kinh để khắc ghi vào tâm thức."*
  - Nút chính: Nút vàng `radius-pill` kêu gọi *"Khám phá kho kinh điển"* dẫn về thư viện kinh chép.

---

## 5. Danh sách Tác vụ Kiểm thử & Hoàn thiện (Verification Checklist)

1. [ ] Không có lỗi TypeScript (`npm run build` hoặc type check sạch sẽ).
2. [ ] Bộ lọc `CategoryFilter` lọc bài viết tức thì và chính xác theo slug danh mục.
3. [ ] Responsive tốt trên cả màn hình di động (375px), tablet (768px) và desktop (1024px+).
4. [ ] Khả năng tái sử dụng: Props của component được thiết kế mở, không hard-code đường dẫn hay dữ liệu tĩnh trong component.
5. [ ] Tuyệt đối **không chạy lệnh git commit** cho tới khi có yêu cầu từ người dùng.
