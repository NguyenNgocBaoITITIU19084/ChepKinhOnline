# Design system Chép Kinh Online

Bộ quy chuẩn giao diện của trang chép kinh. Giá trị lấy từ [`src/styles/ui.css`](../../src/styles/ui.css) (bảng màu, kính mờ, nút), [`src/styles/book.css`](../../src/styles/book.css) (cuốn sách), class Tailwind `tw:` trong các component và font trong [`src/app/layout.tsx`](../../src/app/layout.tsx). Sửa giao diện thì cập nhật cả thư mục này.

- [`tokens.json`](tokens.json): toàn bộ màu, kiểu chữ, khoảng cách, góc bo, bóng đổ. Các màu `gold-*`, `brown-*`, `paper`, `ink`, `ink-ghost`, `ink-wrong` đã là biến CSS trên `:root` (ví dụ `gold-500` là `--gold-500`) và là màu Tailwind (`tw:text-gold-500`, `tw:bg-paper`...). Các token còn lại hiện vẫn là giá trị viết thẳng trong CSS; tên token là tên gọi chung để trao đổi và để đổi thành biến CSS sau này.
- [`components/`](components): hướng dẫn từng thành phần.

## Thành phần

| Thành phần | Dùng cho |
| --- | --- |
| [GlassPanel](components/GlassPanel.md) | Khối kính mờ sáng dùng cho header, cột công cụ và thanh tiến độ lúc toàn màn hình. |
| [Button](components/Button.md) | Nút chữ dạng viên thuốc, có hai kiểu: nút vàng cho hành động chính, nút viền cho lựa chọn phụ. |
| [ToolRow](components/ToolRow.md) | Dòng công cụ trong cột bên phải (biểu tượng cùng nhãn) và nút chỉ có biểu tượng đi kèm. |
| [ProgressBar](components/ProgressBar.md) | Số trang, phần trăm và thanh tiến độ mảnh của chương đang chép. |
| [TableOfContents](components/TableOfContents.md) | Mục lục các chương của bộ kinh, kèm tiến độ từng chương. |
| [BookPage](components/BookPage.md) | Một trang kinh để chép: chữ mờ hướng dẫn, chữ đã chép thấm mực, con trỏ và ô chữ đang gõ nổi phía trên. |
| [PaperSheet](components/PaperSheet.md) | Kiểu tờ giấy: một tờ rời trên chồng giấy, chép xong tờ thì rút tờ đó sang trái để lộ tờ kế tiếp. |
| [BookCover](components/BookCover.md) | Bìa trước cuốn kinh, bọc vải vàng, hiện trong lúc tải trang rồi mở sang trái. |
| [BrandMark](components/BrandMark.md) | Logo hoa sen kèm tên web "Chép Kinh Online" và khẩu hiệu "Tâm an · Pháp lạc". |
| [ProfileHero](components/ProfileHero.md) | Thẻ hành giả ở đầu trang tài khoản: ảnh nền chụp thật, ảnh đại diện, pháp danh, câu kinh tâm đắc. |
| [ArticleBlocks](components/ArticleBlocks.md) | Các block của chuyên trang bài viết: banner, tìm kiếm, danh mục, bài nổi bật, danh sách bài, trích kệ, lời mời chép kinh. |

Chép Kinh Online là nơi người ta chép kinh như ngồi trước một cuốn kinh thật: giấy ngà, mực nâu, viền vàng, hoa văn chữ Vạn chìm. Mọi quyết định giao diện phục vụ một việc: giữ tâm yên trong lúc gõ. Ít màu, ít chuyển động, chữ kinh luôn là thứ rõ nhất trên màn hình.

## Nội dung và giọng văn

- Viết tiếng Việt có dấu, giọng nhẹ nhàng, xưng hô trung tính. Không dùng biểu tượng cảm xúc.
- Gọi đúng tên quen thuộc với Phật tử: "Chép lại chương này", "Mục lục", "Công Đức Viên Mãn", "Hồi hướng", "Đang chép".
- Nút nói rõ việc sẽ xảy ra: "Chép tiếp: Thần chú", "Chép lại", "Về trang chủ", "Toàn màn hình", "Kiểu tờ giấy".
- Nhãn nhỏ (`eyebrow`) viết hoa toàn bộ: "ĐANG CHÉP", "MỤC LỤC". Tên kinh, tên chương viết hoa chữ đầu mỗi âm tiết như bản in: "Ma Ha Bát Nhã Ba La Mật Đa Tâm Kinh".
- Số liệu ngắn gọn, dùng dấu chấm giữa: "Trang 3/5 · 44%", "Phần 2/4 · Chánh kinh".
- Khẩu hiệu của web là "Tâm an · Pháp lạc".

## Màu sắc

- Nền trang là `scene-bg` chuyển dần sang `scene-bg-end`, có quầng `glow` ở góc trên trái và dưới phải, phủ hoa văn chữ Vạn ([src/assets/sayagata-pattern.svg](../../src/assets/sayagata-pattern.svg)) ô 190px.
- Chữ giao diện dùng `brown-800`, chữ đậm và chữ trên nút vàng dùng `brown-900`.
- `gold-700` chỉ dành cho chữ nhấn ngắn: `eyebrow`, `chapter-name`, số chương, con trỏ. Trên nền sáng nó chỉ đạt khoảng 4:1, nên không dùng cho đoạn văn.
- `gold-500` là màu viền mảnh, chân nút vàng và hoa văn. Không dùng `gold-500` làm màu chữ.
- Trên trang kinh chỉ có bốn màu chữ: `ink` (đã chép đúng), `ink-pending` (đang gõ dở), `ink-ghost` (chữ mờ hướng dẫn) và `ink-wrong` (gõ sai). Không thêm màu nào khác vào trang.
- `ink-ghost` cố ý mờ (khoảng 2:1) để người chép phân biệt chỗ đã chép với chỗ chưa chép. Không dùng màu này cho chữ cần đọc.
- Báo sai bằng `ink-wrong` cộng gạch lượn sóng, không chỉ đổi màu.
- Không dùng đỏ, xanh hay tím. Màu ửng hồng (`lotus-blush`, `lotus-tip`) chỉ có trong logo hoa sen.

## Chữ

- Chữ giao diện: Be Vietnam Pro (`sans`), cỡ 400, 500, 600.
- Chữ kinh: Lora (`book`), đậm 500 cho nét đầy đặn mà không thành chữ đậm. Dùng kiểu `verse`: giãn dòng 1.95, thụt đầu câu 1.5em, câu cách nhau 0.8em.
- Cỡ chữ kinh co theo bề rộng trang: clamp(16px, 5% bề rộng trang, 34px), nhân với cài đặt cỡ chữ của người dùng (22 = 100%). Người dùng chỉnh từ 16 đến 40, mỗi bước 2.
- Tiêu đề và tên web: cũng là Lora (`display` là tên gọi khác của `book`, khai báo `--font-display: var(--font-book)` trong `globals.css`), đậm 600; `merit-title` đậm 700. Cả web chỉ có một họ chữ serif.
- Tên kinh chữ Hán: Noto Serif TC (`han`), chỉ để trang trí, không bắt người dùng gõ.
- Mọi con số đứng thành cột (trang, phần trăm, số chương) dùng `font-variant-numeric: tabular-nums`.
- Chỉ ba font, lấy từ Google Fonts qua `next/font`: Be Vietnam Pro, Lora (có bộ chữ `vietnamese`) và Noto Serif TC.
- Trang chủ viết bằng class Tailwind: dùng `font-zen-title` (Lora), `font-zen-body` (Be Vietnam Pro), `font-zen-han` (Noto Serif TC) trong `src/app/zen-theme.css`. Không thêm họ chữ khác.

## Bề mặt

- **Kính mờ** (`glass`, viền `glass-border`, bóng `shadow-glass`, mờ nền 12px, góc `radius-panel`): header, cột công cụ, thanh tiến độ khi toàn màn hình. Không lồng kính trong kính.
- **Trang sách**: giấy `paper` tỏa sáng từ `paper-hi` ra `paper-edge`, vân giấy nhiễu nhẹ, mép tờ chồng ở cạnh ngoài, góc `radius-page`.
- **Bìa sách**: vải `cloth` từ `cloth-hi` xuống `cloth-lo`, viền dập nổi, tên kinh `cloth-title` dập nổi. Bìa chỉ hiện lúc tải trang, rồi mở sang trái.
- **Tờ giấy rời** (kiểu tờ giấy): giấy `sheet-mid`, góc `radius-sheet`, chồng giấy xếp lệch `shadow-sheet-stack`. Máy tính dùng khổ A4 dọc (1 : 1,414). Điện thoại để tờ cao kín phần màn hình còn lại.
- Bóng đổ luôn là nâu vàng ấm (rgba 90–150, 55–105, 10–25), không dùng bóng xám hay đen.

## Khoảng cách và góc

- Thang khoảng cách: `space-2`, `space-4`, `space-6`, `space-8`, `space-10`, `space-14`, `space-16`, `space-20`, `space-24`. Bố cục dùng `gap`, không cộng margin lẻ.
- Góc bo: `radius-control` (10px) cho mọi nút và dòng bấm được, `radius-panel` (16px) cho khối kính, `radius-pill` cho nút chữ và thanh tiến độ, `radius-circle` cho huy hiệu số.
- Vùng bấm tối thiểu 36px (nút biểu tượng), 38–40px cho dòng công cụ và nút chữ.
- Lề hai bên màn hình hẹp là 16px. Cột công cụ rộng 248px.

## Bố cục trang chép kinh

- **Máy tính (từ 1024px)**: sách mở hai trang ở giữa, cột công cụ bên phải thẳng hàng với header.
- **Màn hẹp**: cột công cụ thành thanh gọn phía trên sách, chỉ còn biểu tượng. Mục lục thành ô chọn.
- **Toàn màn hình**: ẩn header và cột công cụ, sách to ra giữa. Góc trên phải có thanh kính nhỏ ghi "Trang x/y · %" kèm nút thoát. Esc để thoát.
- **Kiểu tờ giấy**: luôn một trang, không bìa, không gáy.

## Chuyển động

- Mở bìa khoảng 1,3 giây, ba tờ giấy lật nối đuôi sau bìa.
- Lật trang sách 3D 900ms, có bóng đổ lên trang dưới.
- Kiểu tờ giấy: tờ trên cùng nhấc lên, nghiêng tới -7° rồi trượt sang trái trong 700ms. Lật về trước chạy ngược lại.
- Chữ đúng thấm mực trong 0,75 giây. Con trỏ nhấp nháy theo nhịp 1,1 giây.
- Khi bật "Giảm chuyển động": bỏ mọi hiệu ứng 3D, chỉ mờ dần 280–400ms.

## Trạng thái

- Rê chuột: nền `hover-tint`, chữ đổi sang `brown-900`.
- Đang chọn (mục lục): nền vàng đậm hơn, chữ đậm 600, huy hiệu số chuyển sang gradient vàng.
- Focus bàn phím: viền 2px `gold-500`, cách 2px. Đừng bỏ viền này.
- Đang tải: thanh chờ ánh vàng thay cho con số, cao đúng một dòng chữ. Không hiện số mặc định rồi nhảy sang số thật.
- Nút không dùng được (ví dụ góc lật ở trang đầu hoặc trang cuối) thì ẩn hẳn, không làm mờ.

## Biểu tượng và hình

- Biểu tượng dùng Tabler Icons (`@tabler/icons-react`), nét 2px, cỡ 16–18px, màu theo chữ (`currentColor`).
- Logo hoa sen ([src/components/brand/LotusLogo.tsx](../../src/components/brand/LotusLogo.tsx)): cánh trắng ửng hồng, viền `gold-500`, mặt nước hai nét cong. Đặt cạnh tên web theo kiểu `brand-name`. Không tô lại màu logo.
- Hoa văn chữ Vạn liên hoàn ([src/assets/sayagata-pattern.svg](../../src/assets/sayagata-pattern.svg)) chỉ dùng làm nền trang, độ đậm 10%. Không đặt lên giấy, bìa hay nút.
- Không dùng ảnh người, biểu tượng cảm xúc hay hình minh họa trong vùng chép kinh.

## Bảng token

### Màu

| Token | Giá trị | Dùng cho |
| --- | --- | --- |
| `gold-100` | `#fff8e6` | Nền vàng nhạt nhất: phím tắt (kbd), ô chữ đang gõ, ô chọn chương, ô biểu tượng trong menu. |
| `gold-300` | `#ecc976` | Đầu sáng của thanh tiến độ; nét hoa văn trên khối vàng ở bìa. |
| `gold-500` | `#d6a440` | Vàng chủ đạo: viền mảnh, chân nút vàng, hoa văn chữ Vạn, nét logo hoa sen, con trỏ phát sáng. |
| `gold-700` | `#a8741a` | Chữ nhấn vàng: nhãn nhỏ (eyebrow), tên chương, số chương, con trỏ gõ. Chỉ khoảng 4:1 trên nền trang: dùng cho chữ ngắn từ 0.68rem đậm 600 trở lên, không dùng cho đoạn văn dài. |
| `brown-800` | `#6b4a12` | Chữ giao diện chính trên kính mờ và nền trang: tên kinh, nút, menu, nhãn công cụ (khoảng 8:1). |
| `brown-900` | `#4a320a` | Chữ đậm nhất trên nút vàng và huy hiệu; màu chữ mặc định của cả trang. |
| `paper` | `#fbf7ec` | Màu giấy trang kinh. |
| `paper-hi` | `#fffcf3` | Tâm sáng của trang sách (đầu gradient tỏa tròn). |
| `paper-mid` | `#f8f1e0` | Giữa gradient trang sách. |
| `paper-edge` | `#efe4c8` | Mép tối của trang sách; mặt sau góc giấy gấp. |
| `sheet-hi` | `#fffdf6` | Tâm sáng của tờ giấy rời (kiểu tờ giấy). |
| `sheet-mid` | `#faf4e4` | Giữa gradient tờ giấy rời. |
| `sheet-edge` | `#f2e8cf` | Mép tờ giấy rời. |
| `sheet-under` | `#ebe0c4` | Tờ giấy bên dưới lộ ra ở góc gấp. |
| `ink` | `#2b2116` | Mực chữ kinh đã chép đúng, trên paper (khoảng 15:1). |
| `ink-pending` | `rgba(43, 33, 22, 0.62)` | Chữ đang gõ dở khớp mặt chữ (chưa có dấu), trên paper. |
| `ink-ghost` | `rgba(120, 95, 55, 0.42)` | Chữ mờ hướng dẫn chưa chép, trên paper. Cố ý mờ (khoảng 2:1) để phân biệt với chữ đã chép; không dùng cho chữ cần đọc rõ. |
| `ink-wrong` | `#b45309` | Chữ gõ sai và gạch lượn sóng báo sai, trên paper (khoảng 4.7:1). |
| `ink-typing` | `#7a4f1d` | Chữ trong ô nổi khi đang gõ đúng, trên gold-100. |
| `scene-bg` | `#fffdf8` | Nền trang chép kinh (dưới hoa văn chữ Vạn). |
| `scene-bg-end` | `#fbf0d6` | Cuối gradient dọc của nền trang. |
| `glow` | `rgba(240, 196, 100, 0.34)` | Quầng sáng vàng ở hai góc nền. |
| `glass` | `rgba(255, 255, 255, 0.72)` | Mặt kính mờ: header, cột công cụ, thanh toàn màn hình. |
| `glass-border` | `rgba(214, 164, 64, 0.35)` | Viền kính mờ và đường chia trong cột công cụ. |
| `hover-tint` | `rgba(232, 199, 122, 0.3)` | Nền khi rê chuột lên nút biểu tượng, dòng công cụ, mục lục. |
| `track` | `rgba(168, 116, 26, 0.15)` | Rãnh thanh tiến độ. |
| `gold-button-top` | `#fff0c2` | Đỉnh gradient nút vàng, huy hiệu số chương đang chép, avatar. |
| `gold-button-border` | `#f5d98f` | Viền nút vàng. |
| `ghost-button` | `rgba(255, 248, 230, 0.7)` | Nền nút viền (ghost). |
| `cloth` | `#b5862c` | Vải bọc bìa sách. |
| `cloth-hi` | `#c99a3e` | Đầu sáng gradient vải bìa. |
| `cloth-lo` | `#8d6315` | Đầu tối gradient vải bìa. |
| `cloth-title` | `#fff4d6` | Tên kinh dập nổi trên bìa vải. |
| `brand-on-dark` | `#fdf3dc` | Chữ "Chép Kinh Online" trên nền tối. |
| `tagline-on-dark` | `#e8c77a` | Khẩu hiệu "Tâm an · Pháp lạc" trên nền tối. |
| `lotus-blush` | `#f2a3a0` | Đầu cánh sen ngoài ửng hồng (logo). |
| `lotus-tip` | `#e2615c` | Đầu cánh sen giữa ửng đỏ (logo). |
| `overlay` | `rgba(70, 50, 15, 0.32)` | Lớp phủ sau hộp thoại công đức. |

### Kiểu chữ

| Kiểu | Font | Cỡ / giãn dòng / đậm | Dùng cho |
| --- | --- | --- | --- |
| `merit-title` | `display` | 1.9rem / 1.2 / 700 | Tiêu đề hộp thoại chép xong, màu gold-700. |
| `cover-title` | `display` | 2rem / 1.3 / 600 | Tên kinh trên bìa vải, màu cloth-title, co theo màn hình (1.1rem đến 2rem). |
| `title-vi` | `display` | 1.3rem / 1.3 / 600 | Tên kinh trong cột công cụ, màu brown-800. |
| `brand-name` | `display` | 22px / 1.15 / 600, giãn chữ 0.02em | Tên web cạnh logo (cỡ = 0.62 × cỡ logo). |
| `verse` | `book` | 22px / 1.95 / 500 | Chữ kinh trên trang. Cỡ thật = clamp(16px, 5% bề rộng trang, 34px) × hệ số cỡ chữ của người dùng (22 = 100%). |
| `merit-verse` | `book` | 1.12rem / 1.8 / 400, nghiêng | Bài kệ hồi hướng trong hộp thoại công đức. |
| `nav` | `sans` | 0.92rem / 1.4 / 500 | Mục menu trên header. |
| `button` | `sans` | 0.9rem / 1.4 / 500 | Nút vàng và nút viền. |
| `tool-label` | `sans` | 0.88rem / 1.4 / 400 | Dòng công cụ, mục lục. |
| `chapter-name` | `sans` | 0.85rem / 1.4 / 500 | Tên chương đang chép, màu gold-700. |
| `meta` | `sans` | 0.8rem / 1.45 / 400 | Số trang, phần trăm; luôn tabular-nums. |
| `caption` | `sans` | 0.74rem / 1.6 / 400 | Hướng dẫn gập trong cột công cụ. |
| `eyebrow` | `sans` | 0.68rem / 1.4 / 600, giãn chữ 0.18em | Nhãn nhỏ viết hoa trên tiêu đề, màu gold-700. |
| `tagline` | `sans` | 9.7px / 1.3 / 400, giãn chữ 0.28em | Khẩu hiệu dưới tên web (cỡ = 0.27 × cỡ logo), viết hoa. |
| `han-title` | `han` | 1.1rem / 1.4 / 600 | Tên kinh chữ Hán, chỉ để trang trí. |

Font: `sans` = "Be Vietnam Pro", system-ui, sans-serif, `book` = Lora, serif, `display` = Lora, serif (trỏ về `book`), `han` = "Noto Serif TC", serif.

### Khoảng cách

| Token | Giá trị | Dùng cho |
| --- | --- | --- |
| `space-2` | `2px` | Khoảng giữa các dòng công cụ và mục trong menu thả. |
| `space-4` | `4px` | Khoảng giữa các nút biểu tượng trên thanh gọn (màn hẹp). |
| `space-6` | `6px` | Khoảng giữa biểu tượng và chữ trong nút. |
| `space-8` | `8px` | Khoảng giữa số chương, tên chương và phần trăm trong mục lục. |
| `space-10` | `10px` | Khoảng giữa logo và tên web; lề trong dòng công cụ. |
| `space-14` | `14px` | Khoảng giữa các nhóm trong cột công cụ, giữa thanh gọn và sách. |
| `space-16` | `16px` | Lề ngoài của trang và cột công cụ. |
| `space-20` | `20px` | Lề hai bên vùng sách trên máy tính. |
| `space-24` | `24px` | Khoảng giữa sách và cột công cụ. |

### Góc bo

| Token | Giá trị | Dùng cho |
| --- | --- | --- |
| `radius-sheet` | `2px` | Góc tờ giấy rời. |
| `radius-page` | `4px` | Góc ngoài trang sách. |
| `radius-kbd` | `5px` | Phím tắt (kbd). |
| `radius-tip` | `8px` | Ô chữ nổi khi đang gõ. |
| `radius-control` | `10px` | Dòng công cụ, nút biểu tượng, mục lục, menu, bìa sách. |
| `radius-panel` | `16px` | Khối kính mờ: header, cột công cụ. |
| `radius-pill` | `999px` | Nút vàng, nút viền, thanh tiến độ. |
| `radius-circle` | `50%` | Huy hiệu số chương, avatar. |

### Bóng đổ

| Token | Giá trị | Dùng cho |
| --- | --- | --- |
| `shadow-glass` | `0 8px 24px rgba(150, 105, 25, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)` | Khối kính mờ. |
| `shadow-gold-button` | `0 4px 16px rgba(214, 164, 64, 0.4)` | Nút vàng lúc nghỉ. |
| `shadow-gold-button-hover` | `0 6px 22px rgba(214, 164, 64, 0.6)` | Nút vàng khi rê chuột. |
| `shadow-tip` | `0 4px 14px rgba(120, 85, 20, 0.22)` | Ô chữ nổi khi đang gõ. |
| `shadow-book` | `0 40px 60px -30px rgba(90, 60, 10, 0.55), 0 14px 26px rgba(120, 85, 20, 0.22)` | Bóng đổ dưới cuốn sách và tờ giấy. |
| `shadow-sheet-stack` | `0 0 0 1px rgba(190, 160, 100, 0.22), 4px 5px 0 -1px #f4ecd8, 4px 5px 0 0 rgba(180, 150, 90, 0.3), 8px 10px 0 -2px #efe5cb, 8px 10px 0 -1px rgba(180, 150, 90, 0.26), 0 18px 30px -12px rgba(110, 80, 20, 0.35)` | Chồng giấy xếp lệch dưới tờ giấy rời. |
| `shadow-caret` | `0 0 6px rgba(214, 164, 64, 0.55)` | Quầng sáng con trỏ gõ. |
