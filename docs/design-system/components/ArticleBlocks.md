# ArticleBlocks

Các block dựng chuyên trang bài viết (trang `/tu-hoc`, `/tu-hoc/[slug]`), nằm trong `src/components/article` và lấy từ `@/components/article`.

| Block | Dùng cho |
| --- | --- |
| `ArticleBanner` | Banner đầu trang trên kính mờ: eyebrow, tiêu đề, mô tả, số liệu (tùy chọn), chỗ đặt thêm nội dung (`children`). |
| `ArticleSearchBar` | Ô tìm kiếm dạng viên thuốc, có nút xóa (Esc cũng xóa) và các từ khóa gợi ý. Không tự giữ state: truyền `query` và `onQueryChange`. |
| `ArticleCategoryGrid` | Lưới thẻ chuyên mục kèm đầu block. Mỗi thẻ là nút `aria-pressed`. |
| `CategoryFilter` | Bộ lọc chuyên mục gọn dạng hàng nút viên thuốc, cuộn ngang trên màn hẹp. Dùng khi không cần lưới thẻ. |
| `FeaturedArticlesBlock` | Đầu block cùng `ArticleHero`: một bài lớn bên trái, bài gợi ý bên phải. |
| `ArticleListSection` | Block danh sách: tiêu đề, dòng tóm tắt (đọc lên khi đổi), chỗ đặt bộ lọc (`actions`), lưới `ArticleGrid`. |
| `ArticleGrid` / `ArticleCard` | Lưới 3/2/1 cột và thẻ bài trên giấy `paper`. `variant="compact"`: hàng 3 thẻ gọn (không tóm tắt), màn hẹp thành hàng ngang ảnh nhỏ. |
| `ArticleTeaserCard` / `ArticleTeaserGrid` | Thẻ bài kiểu trang chủ: nhãn chuyên mục nền tối trên ảnh, mép ảnh hòa vào giấy, ngày · thời gian đọc, tóm tắt, chân "Đọc chi tiết". Dùng ở khối bài viết trang chủ và hàng 3 bài dưới bài dẫn ở /tu-hoc. Không truyền `href` thì thẻ là khối tĩnh. |
| `PhotoBanner` | (Trong `components/layout`.) Banner ảnh tràn viền của trang chủ: ảnh mờ hai mép, tờ giấy nổi lên mép dưới chứa eyebrow, tiêu đề (phần `<em>` nghiêng màu vàng), lời dẫn và nội dung thêm. `size="compact"` cho đầu chuyên trang, `size="tall"` khi cần thấy trọn tượng. Tượng sát mép trên ảnh thì thêm `clearHeader` để hạ ảnh xuống dưới header kính; dải phía trên tô bằng `skyColor` (màu trời lấy mẫu ở mép trên ảnh), nên không lộ nền hoa văn. |
| `ArticlePageHeader` | Đầu chuyên trang kiểu báo (hiện không dùng trên trang): tiêu đề có gạch vàng, công cụ bên phải (`actions`), hàng chuyên mục bên dưới (`nav`). |
| `ArticleLayout` | Hai cột: nội dung chính và cột phụ 300px (`sidebar`). Từ 1024px trở xuống cột phụ xuống dưới. |
| `ArticleFeatureBlock` | Khối nổi bật: 1 bài chính (`ArticleTeaserCard size="lg"`) bên trái, tối đa 3 bài nhỏ (ảnh 4:3, chuyên mục, tiêu đề, ngày) xếp dọc trong khung giấy bên phải; hai cột cao bằng nhau, màn ≤768px thành một cột. Không có bài nhỏ thì bài chính chiếm trọn bề rộng. |
| `ArticleLead` | Bài dẫn đầu chuyên mục. `layout="horizontal"`: ảnh trái (tối thiểu 4:3), chữ phải. `layout="stacked"`: ảnh dải ngang 21:9 trên, chữ dưới; /tu-hoc dùng kiểu này để bài dẫn luôn lớn hơn hàng thẻ phụ. |
| `ArticleRowList` / `ArticleRow` | Danh sách bài dạng hàng ngang (ảnh trái, chữ phải), nút "Xem thêm" (`pageSize`), chỗ chen nội dung giữa danh sách (`interlude`). Đổi `key` để về trang đầu khi đổi bộ lọc. |
| `PopularArticles` | Ô "Đọc nhiều nhất" cho cột phụ, xếp theo `viewCount`, huy hiệu số giống mục lục. |
| `KeywordList` | Ô từ khóa cho cột phụ, bấm để tìm. |
| `CategoryList` | Ô "Danh mục" cho cột phụ: mỗi dòng có mũi tên, tên chuyên mục, số bài (nhãn nâu tối, đang chọn thì vàng). |
| `ArticleHeader` | Đầu trang bài viết, canh giữa, không nền. |
| `QuoteBox` | Bài kệ kiểu trang sách: không khung, cột trái ghi nhãn và nguồn, bài kệ căn trái chữ `merit-verse` cỡ lớn, ngăn bằng đường kẻ vàng mảnh. |
| `SutraCtaCard` | Lời mời chép kinh trên kính mờ, một nút vàng `ck-btn-gold`. |

## Bố cục trang /tu-hoc

`PhotoBanner size="compact"` (`src/components/layout/PhotoBanner.tsx`, cùng banner ảnh tràn viền ở trang chủ) chứa tiêu đề h1 và ô tìm kiếm (ảnh tràn lên dưới header, chỉ mờ mép dưới), rồi `ArticleLayout`:

- Ngay dưới banner, trải hết bề rộng nội dung (trên cả hai cột): `ArticleFeatureBlock` (1 bài chính + 3 bài nhỏ). Khi đang tìm thì ẩn.
- Cột chính: "Bài viết mới" bằng `ArticleRowList` có `QuoteBox` chen sau bài thứ ba.
- Khi đang tìm: bỏ bài dẫn, chỉ hiện kết quả dạng hàng.
- Cột phụ: `CategoryList` (từ 1024px trở xuống ẩn đi, thay bằng hàng nút `CategoryFilter` trong banner), `SutraCtaCard size="sm"`, `PopularArticles`, `KeywordList`. Ô trong cột phụ là giấy (`shared.paperPanel`) hoặc kính, không bọc kính ngoài cả cột (không lồng kính trong kính).

## Quy tắc

- Đường dẫn bài viết đi qua prop `getHref` (mặc định `/tu-hoc/{slug}`). Muốn dùng block cho chuyên trang khác thì truyền hàm khác, không sửa trong block.
- Lọc và tìm bài dùng `filterArticles` trong `src/lib/article-filter.ts`. Tìm không phân biệt dấu: "bat nha" khớp "Bát Nhã".
- Mỗi block viết bằng class Tailwind `tw:` ngay trong JSX. Phần dùng chung (`eyebrow`, đầu block, thẻ giấy, nút viên thuốc, viền focus) là các chuỗi class trong `src/components/article/styles.ts`. Kính mờ và nút vàng dùng lại `ck-glass`, `ck-btn-gold` của `src/styles/ui.css`, không viết lại.
- Trang xếp các block bằng `shared.page` (cột flex, `gap`), block không tự đặt margin.
- Mọi phần tử bấm được gắn `shared.focusable` để có viền focus 2px `gold-500`.
- Rê chuột chỉ đổi màu nền, viền hoặc bóng (`hover-tint`, `gold-500`), không nhấc thẻ hay phóng to ảnh.
- Ảnh bìa là ảnh trang trí (`alt=""`) vì tiêu đề bài đã nằm ngay trong thẻ.
- Tiêu đề block viết như câu thường ("Bài viết nổi bật"). Eyebrow viết thường trong code, CSS tự chuyển sang chữ hoa.
