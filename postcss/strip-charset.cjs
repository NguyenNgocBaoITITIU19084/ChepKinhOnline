// CSS của Tabler bắt đầu bằng `@charset`, rule này không hợp lệ khi bị import vào `@layer`.
// Dùng OnceExit để chạy sau khi Tailwind đã inline các @import.
module.exports = () => ({
  postcssPlugin: "strip-charset",
  OnceExit(root) {
    root.walkAtRules("charset", (rule) => rule.remove());
  },
});
module.exports.postcss = true;
