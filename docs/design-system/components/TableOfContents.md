# TableOfContents

Mục lục các chương của bộ kinh, kèm tiến độ từng chương.

- Trong code: `styles.toc`, `styles.tocItem`, `styles.tocActive` trong SutraBook; chương lấy từ các dòng `# Tên chương` của nội dung kinh.
- Mỗi mục: huy hiệu số 22px (`radius-circle`, viền vàng, chữ `gold-700`), tên chương cắt bằng dấu ba chấm, cột phải hiện phần trăm hoặc dấu tích khi chép xong.
- Chương đang chép: chữ đậm 600, huy hiệu gradient `gold-button-top` → `gold-500`, đặt `aria-current`.
- Chưa có phần trăm (chưa chép) thì để trống, không ghi "0%".
- Màn hẹp: thay bằng ô chọn (`styles.tocSelect`, nền `gold-100`), chương xong thêm "✓".
