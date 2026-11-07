# ProfileHero

Thẻ hành giả ở đầu trang tài khoản. Nền là ảnh chụp thật, thể hiện sự trang nghiêm và trân trọng người dùng.

- Trong code: `ProfileHero` (src/components/profile/ProfileHero.tsx), ảnh đại diện `ProfileAvatar` (src/components/profile/ProfileAvatar.tsx).
- Nền là ảnh chụp thật chùa Bái Đính. Lớp phủ nâu ấm (`brown-900` → `cloth-lo`) đặc ở bên trái, trong dần sang phải. Chữ `cloth-title` nằm trên phần phủ đặc, không đè lên công trình. Màn ≤ 768px phủ từ dưới lên, chữ dồn xuống dưới. Góc dưới phải ghi tên nơi chụp.
- Viền mảnh vàng kem bên trong thẻ, góc `radius-panel`, bóng `shadow-book`. Không thêm hoa văn góc, không thêm biểu tượng trang trí.
- Ảnh đại diện tròn có vành gradient vàng (`gold-button-top` → `gold-500` → `gold-700`). Người dùng chọn ảnh có sẵn (hoa sen, bút lông, chùa, bình minh), tự tải ảnh lên, hoặc dùng chữ cái đầu tên. Không đưa tượng Phật vào danh sách ảnh đại diện.
- Nội dung: lời chào "Nam Mô A Di Đà Phật · Kính chào đạo hữu", danh xưng "Đạo hữu {pháp danh}" kèm pháp danh chữ Hán (font `han`, `gold-300`, chỉ để trang trí), số ngày đồng hành và chuỗi ngày tinh tấn, câu kinh tâm đắc (Lora nghiêng, gạch trái `gold-500`), một nút vàng "Chép tiếp: {tên kinh}".
- Cả trang chỉ có một thẻ này.
