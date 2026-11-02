import path from "node:path";

const config = {
  plugins: {
    // Tắt bước tối ưu của Tailwind (chạy trước strip-charset); Next tự minify CSS khi build
    "@tailwindcss/postcss": { optimize: false },
    // Turbopack chạy PostCSS từ thư mục .next (không có import.meta.dirname), nên plugin local phải dùng đường dẫn tuyệt đối
    [path.join(process.cwd(), "postcss/strip-charset.cjs")]: {},
  },
};

export default config;
