/*
 * Chuỗi class Tailwind dùng chung cho các block bài viết (src/components/article).
 * Giá trị theo docs/design-system/README.md. Các token chưa có biến (hover-tint, gold-button-top,
 * glass-border...) ghi thẳng giá trị, chú thích tên token bên cạnh.
 * Kính mờ và nút vàng không viết lại ở đây: dùng `ck-glass`, `ck-btn-gold` trong src/styles/ui.css.
 *
 * Mỗi chuỗi là class đầy đủ viết sẵn (Tailwind chỉ thấy class viết nguyên văn trong mã nguồn).
 * Không ghép hai chuỗi cùng đặt một thuộc tính lên một phần tử: Tailwind tự sắp thứ tự class,
 * nên không biết class nào thắng.
 */

/** Chữ tiêu đề serif: Lora, rồi Georgia. */
export const fontDisplay = "tw:font-[family-name:var(--font-display),Georgia,serif]";

/** Bố cục trang: các block cách nhau bằng gap, không cộng margin lẻ. */
export const page =
  "tw:flex tw:flex-col tw:gap-14 tw:w-full tw:max-w-[1200px] tw:mx-auto tw:my-0 tw:pt-10 tw:px-6 tw:pb-20 tw:box-border " +
  "tw:upto-1024:gap-12 tw:upto-1024:pt-8 tw:upto-1024:px-5 tw:upto-1024:pb-16 " +
  "tw:upto-768:gap-10 tw:upto-768:pt-6 tw:upto-768:px-4 tw:upto-768:pb-14";

/** Một block: đầu block và nội dung cách nhau 24px. */
export const block = "tw:flex tw:flex-col tw:gap-6";

/** Kiểu chữ `eyebrow`: 0.68rem / 600 / giãn 0.18em, viết hoa, gold-700. */
export const eyebrow =
  "tw:text-[0.68rem] tw:font-semibold tw:leading-[1.4] tw:tracking-[0.18em] tw:uppercase tw:text-gold-700";

/** Đầu block: eyebrow, tiêu đề, mô tả. */
export const sectionHead = "tw:flex tw:flex-col tw:gap-1.5";
export const sectionHeadCenter = "tw:items-center tw:text-center";

export const sectionHeading =
  "tw:m-0 tw:font-[family-name:var(--font-display),Georgia,serif] tw:text-[1.6rem] tw:font-semibold tw:leading-[1.3] " +
  "tw:text-brown-900 tw:text-balance tw:upto-768:text-[1.35rem]";

export const sectionDesc = "tw:m-0 tw:text-[0.92rem] tw:leading-[1.6] tw:text-brown-800";

/** Nhãn chuyên mục trên thẻ bài. */
export const categoryLabel =
  "tw:text-[0.68rem] tw:font-semibold tw:tracking-[0.12em] tw:uppercase tw:text-gold-700";

/** Kiểu chữ `meta`: 0.8rem, con số đứng cột. */
export const meta =
  "tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:text-[0.8rem] tw:leading-[1.45] tw:text-brown-800 tw:tabular-nums";

/** Khung thẻ giấy (chưa có màu nền, màu viền): viền glass-border, góc radius-panel. */
export const paperCardFrame =
  "tw:border tw:rounded-2xl tw:[box-shadow:0_8px_24px_rgba(150,105,25,0.08)] tw:no-underline tw:text-inherit " +
  "tw:[transition:border-color_0.2s_ease,box-shadow_0.2s_ease] tw:hover:[box-shadow:0_10px_28px_rgba(150,105,25,0.14)] " +
  "tw:motion-reduce:transition-none";

/** Thẻ giấy bấm được: nền paper, viền glass-border, rê chuột viền gold-500. */
export const paperCard = `${paperCardFrame} tw:bg-paper tw:border-[rgba(214,164,64,0.35)] tw:hover:border-gold-500`;

/** Khung giấy tĩnh (không bấm được) cho ô bên cột phụ. */
export const paperPanel =
  "tw:bg-paper tw:border tw:border-[rgba(214,164,64,0.35)] tw:rounded-2xl tw:[box-shadow:0_8px_24px_rgba(150,105,25,0.08)]";

/** Tiêu đề ô cột phụ, gạch chân glass-border. */
export const panelHeading =
  "tw:m-0 tw:pt-0 tw:px-1 tw:pb-3 tw:font-[family-name:var(--font-display),Georgia,serif] tw:text-[1.15rem] tw:font-semibold " +
  "tw:text-brown-900 tw:border-b tw:border-b-[rgba(214,164,64,0.35)]";

/** Focus bàn phím: viền 2px gold-500, cách 2px. Gắn cho mọi phần tử bấm được. */
export const focusable =
  "tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2";

const pillBase =
  "tw:inline-flex tw:items-center tw:min-h-[38px] tw:py-0 tw:px-4 tw:font-ui tw:text-[0.88rem] tw:border tw:rounded-[999px] " +
  "tw:cursor-pointer tw:whitespace-nowrap tw:[transition:background-color_0.2s_ease,color_0.2s_ease,border-color_0.2s_ease] " +
  "tw:motion-reduce:transition-none";

/**
 * Nút viên thuốc nhỏ (bộ lọc, gợi ý tìm kiếm): nền ghost-button, rê chuột hover-tint,
 * đang chọn nền gold-button-top, chữ đậm.
 */
export function pill(active: boolean) {
  return active
    ? `${pillBase} tw:font-semibold tw:text-brown-900 tw:bg-[#fff0c2] tw:border-gold-500`
    : `${pillBase} tw:font-medium tw:text-brown-800 tw:bg-[rgba(255,248,230,0.7)] tw:border-[rgba(214,164,64,0.45)] tw:hover:text-brown-900 tw:hover:bg-[rgba(232,199,122,0.3)]`;
}

/** Ảnh bìa: nền paper-edge trong lúc chờ ảnh. */
export const cover = "tw:relative tw:overflow-hidden tw:bg-[#efe4c8]";
export const coverImage = "tw:object-cover";

/** Nền hover-tint cho hàng bài bấm được. */
export const hoverTint = "tw:hover:bg-[rgba(232,199,122,0.3)]";
