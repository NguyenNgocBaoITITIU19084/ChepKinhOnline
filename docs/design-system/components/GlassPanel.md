# GlassPanel

Khối kính mờ sáng dùng cho header, cột công cụ và thanh tiến độ lúc toàn màn hình.

- Trong code là class `ck-glass` (src/styles/ui.css), gắn thêm vào phần tử chứa cùng class Tailwind: `<aside className="ck-glass tw:flex tw:flex-col ...">`.
- Nền `glass`, viền `glass-border`, bóng `shadow-glass`, mờ nền 12px, góc `radius-panel`.
- Chỉ đặt kính trên nền trang (`scene-bg` có hoa văn), không đặt lên giấy hay lồng kính trong kính.
- Người dùng tự lo phần đệm trong: cột công cụ là `0 16px 16px`, header là `7px 8px 7px 14px`.
