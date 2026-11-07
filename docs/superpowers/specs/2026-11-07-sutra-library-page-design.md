# Thiết kế Giao diện Thư Viện Kinh Điển (Sutra Library Catalog Page)

- **Ngày tạo:** 2026-11-07
- **Trạng thái:** Chờ phê duyệt (Pending Review)
- **Đường dẫn trang:** `/kinh-dien` (`src/app/(app)/kinh-dien/page.tsx`)
- **Phạm vi kỹ thuật:** Trang thư viện kinh riêng biệt, hỗ trợ tìm kiếm không dấu, lọc theo tâm nguyện tu tập, hiển thị thẻ kinh khổ dọc thiền vị và điều hướng trực tiếp vào bàn chép kinh `/chep-kinh/[slug]`.

---

## 1. Bối cảnh & Mục tiêu

Hiện tại, người dùng chỉ xem được các bộ kinh thông qua một thanh cuộn ngang (Carousel) ở Trang chủ hoặc truy cập trực tiếp qua đường dẫn `/chep-kinh/[slug]`. Khi số lượng kinh điển tăng lên, người dùng cần một không gian thư viện trang nghiêm, tĩnh lặng và thuận tiện để:
1. **Duyệt và tra cứu kinh điển:** Phân loại rõ ràng theo tâm nguyện tu tập (Cầu An, Cầu Siêu, Trí Tuệ, Sám Hối).
2. **Trải nghiệm thị giác thiền vị:** Thể hiện nét đẹp tôn tượng Phật/Bồ Tát với phong cách tranh thủy mặc / ảnh viện trang nghiêm, tỉ lệ đứng 3:4 hoặc 4:5, lời kệ khai kinh ngắn gọn đánh thức tâm bồ đề.
3. **Thao tác liền mạch:** Tìm kiếm tức thì theo từ khóa, lọc theo nhóm tâm nguyện, một chạm là bước ngay vào bàn chép kinh thanh tịnh.

---

## 2. Kiến trúc & Tổ chức Thư mục

```text
src/
├── app/
│   └── (app)/
│       └── kinh-dien/
│           └── page.tsx                     # Server Component trang Thư viện kinh điển
├── components/
│   └── sutra/
│       ├── SutraLibraryHero.tsx             # Header thư viện: Tiêu đề, trích kệ khai kinh, họa tiết hoa sen
│       ├── SutraFilterBar.tsx               # Thanh tìm kiếm + Pills lọc theo tâm nguyện tu tập
│       ├── SutraGrid.tsx                    # Lưới hiển thị danh sách thẻ kinh + xử lý lọc client
│       ├── SutraCard.tsx                    # Thẻ bộ kinh phong cách tranh thiền dọc 3:4
│       ├── SutraEmptyState.tsx              # Hiển thị khi tìm kiếm/lọc không có kết quả
│       └── SutraGuidanceFooter.tsx          # 3 bước chuẩn bị tâm thế trước khi chép kinh
└── data/
    └── sutras.ts                            # Cập nhật metadata mở rộng (tâm nguyện, lời kệ ngắn, tên Hán)
```

---

## 3. Mô hình Dữ liệu (Data Model) & Siêu Dữ Liệu Kinh

Mỗi bộ kinh hiển thị trên thư viện sẽ bao gồm các trường thông tin:

```typescript
export type SutraAspiration = 
  | "all"
  | "tri-tue"    // Khai Mở Trí Tuệ
  | "cau-an"     // Cầu An & Trị Bệnh
  | "cau-sieu"   // Cầu Siêu & Báo Hiếu
  | "sam-hoi";   // Sám Hối Nghiệp Chướng

export interface SutraCatalogItem {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string;            // Tên chữ Hán hoặc Phạn
  aspiration: SutraAspiration;       // Nhóm tâm nguyện
  aspirationLabel: string;           // Nhãn hiển thị (ví dụ: "Khai Mở Trí Tuệ")
  meritBadge: string;                // Huy hiệu công đức (ví dụ: "Đại nguyện cứu khổ")
  image: string;                     // Đường dẫn ảnh đại diện tôn tượng
  objectPosition?: string;           // Vị trí trọng tâm ảnh (focus khuôn mặt/pháp khí)
  verseExcerpt: string[];            // 2-4 câu kệ đúc kết / khai kinh
  estimatedMinutes?: number;         // Thời gian chép ước lượng (phút)
  chapterCount: number;              // Số chương / phần
}
```

Dữ liệu sẽ được kết hợp từ `src/lib/sutra-repo.ts` (`listSutras`) cùng bảng tra cứu siêu dữ liệu chi tiết trong `src/data/sutras.ts`.

---

## 4. Chi tiết Giao diện & Trải nghiệm Người dùng

### 4.1. Khối Hero (SutraLibraryHero)
- **Nền & Họa tiết:** Kế thừa hoa văn chữ Vạn Sayagata chìm nhẹ nhàng trên nền `scene-bg` ấm cúng.
- **Biểu tượng:** Đóa sen nở thanh tịnh viền vàng mỏng (`LotusIcon`).
- **Tiêu đề:** *"Kho Tàng Kinh Điển"* (phông Be Vietnam Pro đậm, nâu trà `brown-900`).
- **Lời tựa thiền môn:** *"Khai kinh kệ: Nguyện giải Như Lai chân thật nghĩa. Mỗi nét bút chép xuống là một hạt giống lành gieo vào tâm thức."* (phông Lora nghiêng, nâu trầm `brown-700`).

### 4.2. Thanh Tìm kiếm & Lọc Tâm Nguyện (SutraFilterBar)
- **Ô tìm kiếm:** Thiết kế dạng viên thuốc bo tròn lớn (`tw:rounded-full`), nền giấy sáng (`tw:bg-[#fbf8f2]`), viền mỏng hổ phách (`tw:border-amber-900/15`), có biểu tượng kính lúp màu vàng đồng. Tìm kiếm tức thì cả tiếng Việt có dấu và không dấu (normalize Unicode).
- **Thanh phân loại (Aspiration Pills):**
  - Danh sách tab:
    1. *Tất cả kinh điển* (Mặc định)
    2. *Khai Mở Trí Tuệ* (Tâm Kinh Bát Nhã, Kim Cương...)
    3. *Cầu An & Trị Bệnh* (Kinh Dược Sư, Chú Đại Bi...)
    4. *Cầu Siêu & Báo Hiếu* (Kinh Vu Lan, Kinh Địa Tạng...)
    5. *Sám Hối Nghiệp Chướng* (Kinh Sám Hối Hồng Danh, Từ Bi Thủy Sám...)
  - Trạng thái Active: Nền vàng hoàng y viền hổ phách, chữ nâu sẫm rõ ràng (`tw:bg-amber-100 tw:text-amber-900 tw:border-amber-400`).
  - Trạng thái Inactive: Nền trong suốt hoặc giấy ngà mờ, chữ nâu nhạt (`tw:text-stone-600 hover:tw:text-amber-900`).
- **Bộ đếm kết quả:** Dòng chữ nhỏ bên phải: *"Hiển thị X bộ kinh phù hợp"*.

### 4.3. Thẻ Bộ Kinh (SutraCard) - Tinh hoa Thiền Vị
- **Khung & Tỉ lệ:** Khung ảnh đứng 3:4 hoặc 4:5, bo góc `tw:rounded-2xl`, bóng đổ êm dịu, viền mỏng kính mờ (`tw:border-amber-900/10`).
- **Hình ảnh tôn tượng:** Sử dụng ảnh tôn tượng chụp thật / tranh lụa trang nghiêm, `object-cover` chuẩn nét.
- **Lớp chuyển sắc (Vignette & Gradient):**
  - Chuyển từ trong suốt ở phần trên xuống nền trầm ấm cổ phong ở phần chân thẻ (`tw:from-transparent tw:via-stone-900/50 tw:to-stone-950/90`).
- **Huy hiệu góc trên:** Tag tâm nguyện/công đức màu vàng nhạt bán trong suốt dạng kính mờ (`tw:backdrop-blur-sm tw:bg-black/30 tw:border tw:border-amber-400/30 tw:text-amber-200`).
- **Nội dung trên thẻ:**
  - **Tên kinh:** Phông Lora, chữ lớn 22px, màu vàng ngà (`tw:text-[#faf5ea]`), đậm nét thiền.
  - **Tên Hán/Ý nghĩa:** Dòng chữ phụ nhỏ thanh mảnh (`tw:text-[#d5c3aa]`).
  - **Lời kệ trích dẫn:** 2 dòng thơ thanh tịnh gợi mở cảm hứng tu học.
  - **Thông số phụ:** Huy hiệu nhỏ chỉ số chương / ước tính thời gian chép.
- **Nút hành động "Vào chép kinh":**
  - Nút viền vàng sáng (`tw:border tw:border-amber-400/50 tw:text-amber-200 hover:tw:bg-amber-400/20`), chuyển hướng mượt mà đến `/chep-kinh/[slug]`.
- **Hiệu ứng hover:** Ảnh nền zoom nhẹ 1.03x cực kỳ mượt mà (700ms ease), viền thẻ sáng nhẹ tông màu hổ phách.

### 4.4. Trạng thái Trống (SutraEmptyState)
- Khi tìm kiếm không ra kết quả:
  - Hình minh họa đóa sen chìm thanh thoát.
  - Thông báo: *"Chưa tìm thấy bộ kinh phù hợp với từ khóa tìm kiếm."*
  - Nút hành động: *"Xem tất cả kinh điển"* để xóa bộ lọc và quay lại danh sách đầy đủ.

### 4.5. Khối Lời Dặn Trước Khi Chép (SutraGuidanceFooter)
- Đặt ở cuối trang, đóng khung giấy xuyến chỉ nhẹ:
  - **Tịnh thủ đoan trang:** Rửa sạch tay, chỉnh tề y phục, chuẩn bị bàn ngồi tĩnh lặng.
  - **Nhiếp tâm an trụ:** Ngồi ngay ngắn, hít thở sâu ba hơi, buông xả lo toan trước khi gõ phím.
  - **Hồi hướng công đức:** Khi hoàn thành mỗi trang kinh, hướng tâm lành đến cha mẹ, người thân và muôn loài.

---

## 5. Tương Thích & Điều Hướng (Navigation & Linkage)

1. **Header Menu:** Thêm nút / link **"Kinh Điển"** vào `SiteHeader` (nếu đang ở trang khác) hoặc làm nổi bật khi đang ở `/kinh-dien`.
2. **Trang chủ (`/`):** Ở phần danh sách kinh hiện tại, bổ sung nút liên kết *"Xem toàn bộ tàng kinh các"* trỏ tới `/kinh-dien`.
3. **Từ trang chép kinh (`/chep-kinh/[slug]`):** Nút "Danh sách kinh" ở góc trên header hiện tại trỏ về `/` sẽ có thể trỏ về `/kinh-dien` để người dùng dễ dàng chọn kinh khác.

---

## 6. Kế hoạch Kiểm Thử & Xác Minh (Testing & Verification)

1. **Kiểm tra hiển thị responsive:** Kiểm tra mượt mà trên Mobile (375px), Tablet (768px) và Desktop (1280px+).
2. **Kiểm tra tìm kiếm & bộ lọc:**
   - Tìm kiếm tiếng Việt có dấu: "Dược Sư", "Địa Tạng", "Tâm Kinh".
   - Tìm kiếm tiếng Việt không dấu: "duoc su", "dia tang", "tam kinh".
   - Bấm chuyển các tab tâm nguyện và xác nhận danh sách cập nhật chính xác tức thì.
3. **Kiểm tra liên kết:**
   - Bấm nút "Vào chép kinh" trên từng thẻ kinh và đảm bảo dẫn chính xác đến `/chep-kinh/[slug]`.
4. **Kiểm tra Next.js build & TypeScript:**
   - Chạy `npm run build` hoặc typecheck đảm bảo không có lỗi biên dịch.
