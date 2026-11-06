# ToolRow

Dòng công cụ trong cột bên phải (biểu tượng cùng nhãn) và nút chỉ có biểu tượng đi kèm.

- Trong code: `styles.toolRow` (cao 38px, rộng hết cột) và `styles.iconButton` (36 × 36px). Bộ tăng giảm cỡ chữ là `styles.stepper`.
- Chữ kiểu `tool-label`, màu `brown-800`, biểu tượng Tabler 18px cách chữ `space-10`, góc `radius-control`.
- Rê chuột: nền `hover-tint`, chữ `brown-900`. Focus: viền 2px `gold-500`.
- Màn hẹp: nhãn ẩn, dòng công cụ co thành nút vuông 36px. Luôn đặt `title` cho nút để người dùng biết nó làm gì.
- Nút chỉ có biểu tượng bắt buộc có `aria-label`.
