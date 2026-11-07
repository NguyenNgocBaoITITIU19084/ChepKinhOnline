// Chuỗi class Tailwind dùng lại ở nhiều nơi (để Tailwind quét được, luôn viết nguyên chuỗi).

// Ẩn trên điện thoại (≤480px), vd. chữ trong nút header
export const hideSm = "tw:upto-480:hidden";

// Nút trên thanh header gọn hơn một bậc; ở 320–360px chữ đã ẩn nên thu nút thành hình tròn
export const headerButton =
  "tw:min-h-10 tw:px-4 tw:text-[0.88rem] tw:upto-360:w-10 tw:upto-360:p-0";

// Ô tròn chữ cái đầu tên người dùng
export const avatar =
  "tw:inline-grid tw:place-items-center tw:size-8 tw:shrink-0 tw:rounded-[50%] tw:text-[0.8rem] tw:font-semibold tw:text-brown-900 tw:bg-[linear-gradient(160deg,#fff0c2,var(--gold-500))] tw:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]";
