/*
 * Chuỗi class dùng riêng cho trang tài khoản. Màu, góc bo, khoảng cách theo docs/design-system/README.md.
 * Thẻ giấy, eyebrow, meta, focus... dùng lại từ src/components/article/styles.ts.
 * Token chưa có biến CSS ghi thẳng giá trị, chú thích tên token bên cạnh.
 */

/** Ô đếm bên trong thẻ giấy: nền gold-100 nhạt, viền glass-border, góc radius-control. */
export const statTile =
  "tw:flex tw:flex-col tw:gap-1 tw:p-4 tw:rounded-[10px] tw:bg-[linear-gradient(180deg,#fff8e6,rgba(255,240,194,0.45))] tw:border tw:border-[rgba(214,164,64,0.45)]";

/** Con số lớn trong ô đếm: Lora 600, đứng cột. */
export const statValue =
  "tw:m-0 tw:font-[family-name:var(--font-display),Georgia,serif] tw:text-[1.6rem] tw:font-semibold tw:leading-[1.2] tw:text-brown-900 tw:tabular-nums";

/** Đường chia mảnh giữa các hàng trong thẻ (glass-border). */
export const rowDivider = "tw:border-t tw:border-t-[rgba(214,164,64,0.25)]";

/** Ô nhập nhiều dòng, cùng kiểu với AuthInput. */
export const textareaClass =
  "tw:w-full tw:min-h-[112px] tw:px-3 tw:py-2.5 tw:font-ui tw:text-[0.94rem] tw:leading-[1.6] tw:text-ink tw:bg-paper/85 " +
  "tw:border tw:border-[rgba(214,164,64,0.35)] tw:rounded-[10px] tw:outline-none tw:resize-y tw:transition-all " +
  "tw:placeholder:text-ink-ghost tw:hover:border-[rgba(214,164,64,0.6)] tw:focus:border-gold-500 tw:focus:bg-white " +
  "tw:focus:shadow-[0_0_0_3px_rgba(214,164,64,0.18)]";

/** Nhãn trường form, cùng kiểu với AuthInput. */
export const fieldLabel = "tw:text-[0.86rem] tw:font-medium tw:text-brown-800";

/** Dòng gợi ý dưới trường form (kiểu caption). */
export const fieldHint = "tw:m-0 tw:text-[0.78rem] tw:leading-[1.5] tw:text-[rgba(107,74,18,0.78)]";

/** Hàng nút cuối form: nút phụ bên trái, nút vàng bên phải; màn hẹp xếp dọc. */
export const formActions =
  "tw:flex tw:flex-wrap tw:items-center tw:justify-end tw:gap-2.5 tw:pt-5 tw:upto-480:flex-col-reverse tw:upto-480:items-stretch";

/** Mục điều hướng cột trái. */
export function navItem(active: boolean) {
  const base =
    "ck-font-inherit tw:flex tw:items-center tw:gap-2.5 tw:w-full tw:min-h-10 tw:px-3 tw:text-left tw:text-[0.9rem] tw:border-0 tw:rounded-[10px] " +
    "tw:cursor-pointer tw:transition-colors tw:motion-reduce:transition-none tw:focus-visible:outline-2 tw:focus-visible:outline-solid " +
    "tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2";
  return active
    ? `${base} tw:font-semibold tw:text-brown-900 tw:bg-[linear-gradient(90deg,#fff0c2,rgba(255,240,194,0.35))] tw:shadow-[inset_3px_0_0_var(--gold-500)] tw:max-lg:shadow-[inset_0_-2px_0_var(--gold-500)]`
    : `${base} tw:font-medium tw:text-brown-800 tw:bg-transparent tw:hover:text-brown-900 tw:hover:bg-[rgba(232,199,122,0.3)]`;
}
