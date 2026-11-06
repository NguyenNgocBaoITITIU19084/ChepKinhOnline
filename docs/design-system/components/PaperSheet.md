# PaperSheet

Kiểu tờ giấy: một tờ rời trên chồng giấy, chép xong tờ thì rút tờ đó sang trái để lộ tờ kế tiếp.

- Trong code: chế độ `layout: "sheet"` của SutraBook, lưu trong `useCopySettings` (setLayout). Các class: `bookSheet`, `stageSheet`, `areaSheet`, `sheetLeaf`.
- Giấy `sheet-hi` → `sheet-mid` → `sheet-edge`, góc `radius-sheet`, chồng giấy `shadow-sheet-stack`. Không bìa, không gáy.
- Máy tính: khổ A4 dọc (1 : 1,414), cao gần kín màn hình. Điện thoại: không giữ tỉ lệ, tờ cao kín phần màn hình còn lại.
- Góc gấp ở hai góc dưới là nút lật trang: nửa phía góc lộ tờ dưới (`sheet-under`), nửa kia là mặt sau góc giấy. Rê chuột thì góc to từ 44px lên 64px.
- Chuyển tờ: tờ trên cùng nhấc lên, nghiêng tới -7°, trượt sang trái trong 700ms. Lật về trước chạy ngược lại.
- Lúc đang tải chỉ hiện tờ giấy trắng, không hiện bìa.
