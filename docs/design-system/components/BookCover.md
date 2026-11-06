# BookCover

Bìa trước cuốn kinh, bọc vải vàng, hiện trong lúc tải trang rồi mở sang trái.

- Trong code: `BookCover` (src/components/copy/BookCover.tsx). Người dùng truyền `title` (tên kinh) và `subtitle` (mặc định "Chép Kinh Online").
- Vải `cloth`, gradient `cloth-hi` → `cloth-lo`, viền dập nổi vàng nhạt, góc `radius-control`, bóng `shadow-book`.
- Giữa bìa: logo hoa sen 72px, tên kinh kiểu `cover-title` màu `cloth-title` dập nổi, một vạch ngắn, dòng phụ viết hoa giãn chữ.
- Hiệu ứng mở: bìa lật quanh gáy khoảng 1,3 giây, ba tờ giấy lật nối theo. Giảm chuyển động hoặc kiểu tờ giấy thì bỏ bìa.
