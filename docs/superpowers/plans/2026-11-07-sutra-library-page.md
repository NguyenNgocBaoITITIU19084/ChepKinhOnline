# Kế Hoạch Triển Khai Trang Thư Viện Kinh Điển (Sutra Library Catalog Page)

> **Dành cho Agentic Workers:** BẮT BUỘC SỬ DỤNG SUB-SKILL: `superpowers:subagent-driven-development` (khuyên dùng) hoặc `superpowers:executing-plans` để thực hiện từng bước trong kế hoạch này. Các bước sử dụng cú pháp checkbox (`- [ ]`) để theo dõi tiến độ.  
> **Tài liệu đặc tả (Spec):** [docs/superpowers/specs/2026-11-07-sutra-library-page-design.md](file:///Users/baonguyen/Developer/ChepKinhOnline/docs/superpowers/specs/2026-11-07-sutra-library-page-design.md)  
> **Ràng buộc toàn cục (Global Constraints):**  
> - Toàn bộ Tailwind CSS bắt buộc sử dụng tiền tố `tw:` (như `tw:flex`, `tw:rounded-2xl`, `tw:bg-stone-900`...) để tránh xung đột class.  
> - Sử dụng `@tabler/icons-react` và các biểu tượng Phật giáo từ `@/components/icons/BuddhistIcons`.  
> - Tuân thủ phong cách Zen Buddhist: nền `scene-bg`, chữ Lora cho tên kinh và kệ, Be Vietnam Pro cho giao diện, màu hổ phách vàng hoàng y viền mỏng `tw:border-amber-900/10` hoặc `tw:border-amber-400/40`.  
> - Hỗ trợ tìm kiếm tiếng Việt không dấu (bỏ dấu Unicode qua `normalize("NFD")`).

---

## Mục tiêu
Xây dựng trang thư viện kinh điển tại `/kinh-dien` (`src/app/(app)/kinh-dien/page.tsx`), cho phép người dùng duyệt kho kinh theo tâm nguyện tu tập, tìm kiếm nhanh không dấu, xem các thẻ kinh thiền vị tỉ lệ đứng 3:4/4:5 và bấm vào để bắt đầu chép kinh ngay tại `/chep-kinh/[slug]`.

---

## Cấu Trúc File & Trách Nhiệm

```text
src/
├── types/
│   └── sutra-catalog.ts             # Định nghĩa kiểu dữ liệu cho danh mục và bộ lọc kinh
├── data/
│   └── sutra-catalog.ts             # Dữ liệu danh mục kinh điển mở rộng (ảnh, pháp môn, trích kệ, thời gian chép)
├── components/
│   └── sutra/
│       ├── SutraLibraryHero.tsx     # Hero banner: Tiêu đề "Kho Tàng Kinh Điển", câu kệ mở đầu, hoa sen
│       ├── SutraFilterBar.tsx       # Thanh tìm kiếm + Tabs phân loại tâm nguyện
│       ├── SutraCard.tsx            # Thẻ bộ kinh thiền vị 3:4, ảnh tôn tượng, trích kệ, nút "Vào chép kinh"
│       ├── SutraEmptyState.tsx      # Trạng thái không tìm thấy kinh phù hợp kèm nút reset
│       ├── SutraGuidanceFooter.tsx  # Lời dặn 3 bước tịnh tâm trước khi chép kinh
│       └── SutraCatalogClient.tsx   # Client component quản lý state tìm kiếm & bộ lọc, kết nối FilterBar + Grid
├── app/
│   └── (app)/
│       └── kinh-dien/
│           └── page.tsx             # Server Component tải dữ liệu và render trang /kinh-dien
```

---

## Chi Tiết Các Tác Vụ Triển Khai

### Nhiệm vụ 1: Định Nghĩa Kiểu Dữ Liệu & Danh Mục Kinh Điển Mở Rộng
**Files:**
- Tạo: `src/types/sutra-catalog.ts`
- Tạo: `src/data/sutra-catalog.ts`

**Giao diện & Dữ liệu:**
- Kiểu `SutraAspiration`: `"all" | "tri-tue" | "cau-an" | "cau-sieu" | "sam-hoi"`
- Kiểu `SutraCatalogItem`: `id`, `slug`, `title`, `originalTitle`, `aspiration`, `aspirationLabel`, `meritBadge`, `image`, `objectPosition`, `verseExcerpt`, `estimatedMinutes`, `chapterCount`, `description`
- Danh mục `SUTRA_CATALOG_ITEMS`: Chứa đầy đủ dữ liệu phong phú cho tất cả các bộ kinh sẵn có trong dự án (Tâm Kinh Bát Nhã, Chú Đại Bi, Kinh Dược Sư, Kinh Địa Tạng, Kinh Vu Lan Báo Hiếu, Kinh Sám Hối Hồng Danh, Kinh Kim Cương, Kinh Phổ Môn...).

- [ ] **Bước 1.1: Tạo file types `src/types/sutra-catalog.ts`**
- [ ] **Bước 1.2: Tạo file dữ liệu `src/data/sutra-catalog.ts` với hàm helper `getSutraCatalog(): Promise<SutraCatalogItem[]>`**
- [ ] **Bước 1.3: Viết tiện ích chuẩn hóa chuỗi tìm kiếm không dấu `searchNormalized(text, query)`**
- [ ] **Bước 1.4: Kiểm tra typecheck (`npx tsc --noEmit`)**
- [ ] **Bước 1.5: Commit Nhiệm vụ 1**

---

### Nhiệm vụ 2: Xây Dựng Các Thành Phần UI (Hero, Card, Empty State, Guidance Footer)
**Files:**
- Tạo: `src/components/sutra/SutraLibraryHero.tsx`
- Tạo: `src/components/sutra/SutraCard.tsx`
- Tạo: `src/components/sutra/SutraEmptyState.tsx`
- Tạo: `src/components/sutra/SutraGuidanceFooter.tsx`

**Chi tiết tính năng:**
- `SutraLibraryHero`: Tiêu đề "Kho Tàng Kinh Điển" uy nghi, trích kệ khai kinh, họa tiết hoa sen trang nhã.
- `SutraCard`: Thẻ đứng 3:4 hoặc 4:5, ảnh tôn tượng với gradient chuyển sắc mượt, tag tâm nguyện kính mờ, tên kinh font Lora vàng ngà, trích 2 câu kệ thiền vị, nút "Vào chép kinh" trỏ đến `/chep-kinh/[slug]`.
- `SutraEmptyState`: Icon đóa sen tĩnh lặng, thông điệp nhẹ nhàng và nút "Xem tất cả kinh điển" để làm mới bộ lọc.
- `SutraGuidanceFooter`: 3 bước chuẩn bị tâm thế: Tịnh thủ đoan trang, Nhiếp tâm an trụ, Hồi hướng công đức.

- [ ] **Bước 2.1: Tạo component `SutraLibraryHero.tsx`**
- [ ] **Bước 2.2: Tạo component `SutraCard.tsx`**
- [ ] **Bước 2.3: Tạo component `SutraEmptyState.tsx`**
- [ ] **Bước 2.4: Tạo component `SutraGuidanceFooter.tsx`**
- [ ] **Bước 2.5: Kiểm tra typecheck (`npx tsc --noEmit`)**
- [ ] **Bước 2.6: Commit Nhiệm vụ 2**

---

### Nhiệm vụ 3: Xây Dựng Bộ Lọc Tìm Kiếm & Client Coordinator
**Files:**
- Tạo: `src/components/sutra/SutraFilterBar.tsx`
- Tạo: `src/components/sutra/SutraCatalogClient.tsx`

**Chi tiết tính năng:**
- `SutraFilterBar`: Ô tìm kiếm (input với icon kính lúp, nút xóa nhanh), hàng nút chọn nhóm tâm nguyện với trạng thái Active/Inactive trực quan, nhãn đếm số bộ kinh tìm thấy.
- `SutraCatalogClient`: Client Component (`"use client"`), quản lý state `searchQuery` và `activeAspiration`, lọc danh sách kinh theo thời gian thực (hỗ trợ tiếng Việt không dấu), render danh sách `SutraCard` theo lưới responsive (1 cột mobile, 2 cột tablet, 3 cột desktop) hoặc `SutraEmptyState` khi không có kết quả.

- [ ] **Bước 3.1: Tạo component `SutraFilterBar.tsx`**
- [ ] **Bước 3.2: Tạo component `SutraCatalogClient.tsx` tích hợp logic lọc và tìm kiếm**
- [ ] **Bước 3.3: Kiểm tra typecheck (`npx tsc --noEmit`)**
- [ ] **Bước 3.4: Commit Nhiệm vụ 3**

---

### Nhiệm vụ 4: Tạo Trang Route `/kinh-dien` & Kết Nối Điều Hướng Hệ Thống
**Files:**
- Tạo: `src/app/(app)/kinh-dien/page.tsx`
- Sửa: `src/components/layout/SiteHeader.tsx` (thêm liên kết "Kinh Điển")
- Sửa: `src/app/(app)/page.tsx` (thêm nút "Xem toàn bộ tàng kinh các" dẫn tới `/kinh-dien`)

**Chi tiết tính năng:**
- `page.tsx`: Server Component tải dữ liệu qua `getSutraCatalog()`, thiết lập metadata SEO chuẩn ("Kho Tàng Kinh Điển - Chép Kinh Online"), render layout hoàn chỉnh.
- `SiteHeader.tsx`: Cập nhật thanh điều hướng để người dùng từ bất kỳ trang nào cũng có thể bấm vào mục "Kinh Điển".
- Trang chủ (`page.tsx`): Bổ sung liên kết dẫn vào trang thư viện đầy đủ ở khu vực giới thiệu kinh.

- [ ] **Bước 4.1: Tạo trang `src/app/(app)/kinh-dien/page.tsx`**
- [ ] **Bước 4.2: Cập nhật `SiteHeader.tsx` và Trang chủ `page.tsx`**
- [ ] **Bước 4.3: Chạy `npm run build` để kiểm tra toàn bộ luồng biên dịch Next.js**
- [ ] **Bước 4.4: Commit Nhiệm vụ 4**

---

### Nhiệm vụ 5: Kiểm Thử Giao Diện & Hoàn Thiện
**Files:**
- Toàn bộ các file trong phạm vi tính năng

**Chi tiết xác minh:**
- Kiểm tra tính năng lọc tâm nguyện tu tập: Tất cả, Khai Mở Trí Tuệ, Cầu An & Trị Bệnh, Cầu Siêu & Báo Hiếu, Sám Hối Nghiệp Chướng.
- Kiểm tra tìm kiếm tiếng Việt có dấu và không dấu: "duoc su", "dia tang", "tam kinh".
- Kiểm tra trạng thái trống (Empty state) khi gõ từ khóa không tồn tại và bấm nút "Xem tất cả kinh điển".
- Kiểm tra click "Vào chép kinh" chuyển đúng sang `/chep-kinh/[slug]`.
- Kiểm tra hiển thị responsive trên màn hình mobile, tablet và desktop.

- [ ] **Bước 5.1: Kiểm tra thực tế bằng trình duyệt / dev server**
- [ ] **Bước 5.2: Chạy kiểm tra lint & build cuối cùng (`npm run build`)**
- [ ] **Bước 5.3: Hoàn tất commit và tổng kết**
