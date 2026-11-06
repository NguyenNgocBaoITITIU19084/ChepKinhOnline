# ProgressBar

Số trang, phần trăm và thanh tiến độ mảnh của chương đang chép.

- Trong code: `styles.progressRow`, `styles.progressTrack`, `styles.progressBar` trong SutraBook.
- Rãnh `track` cao 4px, thanh gradient `gold-700` → `gold-500` → `gold-300`, góc `radius-pill`, chạy 0,4 giây khi đổi.
- Chữ kiểu `meta`, `tabular-nums`, viết dạng "Trang 3/5" và "44%".
- Lúc chưa lấy lại tiến độ đã lưu: hiện thanh chờ (`styles.skeleton`) thay cho số và để thanh ở 0%.
- Luôn kèm `role="progressbar"` cùng `aria-valuenow`.
