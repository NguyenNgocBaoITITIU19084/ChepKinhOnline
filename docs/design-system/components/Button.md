# Button

Nút chữ dạng viên thuốc, có hai kiểu: nút vàng cho hành động chính, nút viền cho lựa chọn phụ.

- Trong code: class `ck-btn-gold` và `ck-btn-ghost` (src/styles/ui.css), mũi tên trượt là `ck-btn-arrow`. Kích cỡ riêng từng chỗ thêm bằng class `tw:` (vd. nút header dùng `headerButton` trong src/components/ui/classes.ts). Nút viền cũng dùng cho liên kết `next/link` ("Danh sách kinh", "Về trang chủ").
- Nút vàng: gradient `gold-button-top` → `gold-500`, viền `gold-button-border`, chữ `brown-900`, bóng `shadow-gold-button` (rê chuột: `shadow-gold-button-hover`).
- Nút viền: nền `ghost-button`, chữ `brown-800`, viền vàng 45%.
- Cao tối thiểu 40px, đệm ngang 16px, chữ kiểu `button`, biểu tượng Tabler 18px cách chữ `space-6`, góc `radius-pill`.
- Mỗi hộp thoại có tối đa một nút vàng. Chữ trên nút nói rõ việc sẽ xảy ra.
