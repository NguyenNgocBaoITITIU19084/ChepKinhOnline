# BookPage

Một trang kinh để chép: chữ mờ hướng dẫn, chữ đã chép thấm mực, con trỏ và ô chữ đang gõ nổi phía trên.

- Trong code: `BookPage` (src/components/copy/BookPage.tsx). Người dùng truyền `index` (số trang, `null` là trang trắng), `text`, `progress` ({ matched, wrong, rest } từ `matchCopy`), `currentWord`, `active`, `fontSize`, `showGuide`, `side` ("left" | "right" | "single"), `continued`, `runsOn`.
- Chữ kiểu `verse` trên giấy `paper`. Bốn trạng thái chữ: `ink` (đã chép, thấm mực 0,75 giây), `ink-pending` (đang gõ dở, chưa có dấu), `ink-ghost` (chưa chép), `ink-wrong` kèm gạch lượn sóng (gõ sai).
- Con trỏ 2px `gold-700` có quầng `shadow-caret`, không chiếm chỗ nên dòng chữ không xô lệch khi gõ.
- Ô nổi (`typedFloat`) hiện chữ đang gõ: nền `gold-100`, chữ `ink-typing`, góc `radius-tip`. Gõ sai thì chuyển sang `ink-wrong`. Ô tự dịch vào trong nếu sát mép trang.
- Không cần gõ dấu câu. Dấu cách và Enter dùng thay nhau được. Câu mới chỉ bắt đầu sau khi gõ dấu cách hoặc Enter, để bộ gõ Telex/VNI chốt chữ cuối.
- Trang được chia lại theo cỡ chữ (đo thật bằng DOM), nên chữ luôn trải kín trang.
