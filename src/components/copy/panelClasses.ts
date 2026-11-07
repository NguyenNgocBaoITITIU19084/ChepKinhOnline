// Class Tailwind của cột thông tin bên phải trang chép kinh (dùng chung cho SutraBook và SutraBookSkeleton).
// Màn hình hẹp (≤1023px, `tw:max-lg:`): cột phải thành thanh gọn phía trên sách, công cụ chỉ còn biểu tượng.

const focusRing = "tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2";
const hoverGold = "tw:hover:text-brown-900 tw:hover:bg-[rgba(232,199,122,0.3)] tw:hover:no-underline";
const fadeBg = "tw:transition-[background] tw:duration-200 tw:ease-[ease]";

// Cột phải canh mép trên với sách: ô thông tin dài/ngắn (lúc tải, đổi chương) chỉ giãn xuống dưới
export const panel =
  "ck-glass tw:[grid-column:3] tw:[justify-self:end] tw:[align-self:start] tw:flex tw:flex-col tw:gap-3.5 tw:w-[248px] tw:shrink-0 tw:pt-0 tw:px-4 tw:pb-4 " +
  "tw:max-lg:-order-1 tw:max-lg:grid tw:max-lg:grid-cols-[minmax(0,1fr)] tw:max-lg:[grid-template-areas:'info'_'toc'_'tools'] tw:max-lg:items-center tw:max-lg:gap-x-3 tw:max-lg:gap-y-1.5 tw:max-lg:w-[min(100%,620px)] tw:max-lg:pt-2.5 tw:max-lg:px-2.5 tw:max-lg:pb-1.5";

export const info =
  "tw:[grid-area:info] tw:flex tw:flex-col tw:gap-1.5 tw:min-w-0 tw:-mx-4 tw:my-0 tw:pt-[18px] tw:px-5 tw:pb-3.5 tw:bg-[linear-gradient(rgba(255,254,250,0.97)_88%,rgba(255,254,250,0.9))] tw:[border-bottom:1px_solid_rgba(214,164,64,0.3)] " +
  "tw:max-lg:static tw:max-lg:gap-1 tw:max-lg:m-0 tw:max-lg:py-0 tw:max-lg:px-1 tw:max-lg:bg-none tw:max-lg:[border:0]";

export const eyebrow =
  "tw:m-0 tw:text-[0.68rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-gold-700 tw:max-lg:hidden";

export const titleVi =
  "tw:m-0 tw:font-title tw:font-semibold tw:text-[1.3rem] tw:leading-[1.3] tw:text-brown-800 tw:max-lg:truncate tw:max-lg:text-[1.05rem]";

export const chapterName = "tw:mt-0.5 tw:mx-0 tw:mb-0 tw:text-[0.85rem] tw:font-medium tw:text-gold-700";

// Giữ cao đúng một dòng chữ, kể cả lúc chỉ có thanh chờ
export const progressRow =
  "tw:flex tw:justify-between tw:items-center tw:min-h-[1.45em] tw:leading-[1.45] tw:mt-2 tw:text-[0.8rem] tw:tabular-nums tw:text-brown-800 tw:max-lg:mt-0 tw:max-lg:text-[0.75rem]";

export const progressTrack = "tw:h-1 tw:rounded-[999px] tw:bg-[rgba(168,116,26,0.15)] tw:overflow-hidden";

export const progressBar =
  "tw:h-full tw:rounded-[inherit] tw:bg-[linear-gradient(90deg,var(--gold-700),var(--gold-500),var(--gold-300))] tw:transition-[width] tw:duration-[400ms] tw:ease-[ease]";

export const tools =
  "tw:[grid-area:tools] tw:flex tw:flex-col tw:gap-0.5 tw:max-lg:flex-row tw:max-lg:gap-1 tw:max-lg:pt-1.5 tw:max-lg:px-0 tw:max-lg:pb-0";

export const stepper = "tw:flex tw:items-center tw:pl-2.5 tw:max-lg:p-0";

export const toolLabel = "tw:text-[0.88rem] tw:text-brown-800 tw:max-lg:hidden";

export const toolRow =
  `ck-font-inherit tw:flex tw:items-center tw:gap-2.5 tw:w-full tw:min-h-[38px] tw:px-2.5 tw:py-0 tw:text-[0.88rem] tw:text-left tw:no-underline tw:text-brown-800 tw:bg-transparent tw:border-none tw:border-current tw:rounded-[10px] tw:cursor-pointer ${fadeBg} ${hoverGold} ${focusRing} ` +
  "tw:max-lg:justify-center tw:max-lg:w-9 tw:max-lg:min-h-9 tw:max-lg:p-0";

export const iconButton = `tw:inline-grid tw:place-items-center tw:size-9 tw:text-brown-800 tw:bg-transparent tw:border-none tw:border-current tw:rounded-[10px] tw:cursor-pointer ${fadeBg} ${hoverGold} ${focusRing}`;

export const fontSizeLabel = "tw:min-w-10 tw:text-center tw:text-[0.78rem] tw:tabular-nums tw:text-brown-800";

export const toc =
  "tw:[grid-area:toc] tw:flex tw:flex-col tw:gap-1.5 tw:pt-3 tw:px-1 tw:pb-0 tw:[border-top:1px_solid_rgba(214,164,64,0.3)] tw:max-lg:pt-2 tw:max-lg:px-0";

export const tocList = "tw:flex tw:flex-col tw:gap-0.5 tw:-mx-1 tw:my-0 tw:p-0 tw:list-none tw:max-lg:hidden";

const tocItemBase = `ck-font-inherit tw:grid tw:grid-cols-[22px_minmax(0,1fr)_auto] tw:items-center tw:gap-2 tw:w-full tw:min-h-9 tw:pr-2.5 tw:pl-1.5 tw:py-0 tw:text-[0.88rem] tw:text-left tw:border-none tw:border-current tw:rounded-[10px] tw:cursor-pointer ${fadeBg} ${focusRing}`;
export const tocItem = `${tocItemBase} tw:text-brown-800 tw:bg-transparent tw:hover:bg-[rgba(232,199,122,0.25)]`;
// Chương đang chép: nền vàng đậm hơn, số chương (tocNoActive) thành ô vàng
export const tocItemActive = `${tocItemBase} tw:font-semibold tw:text-brown-900 tw:bg-[rgba(232,199,122,0.38)]`;

export const tocNo =
  "tw:inline-grid tw:place-items-center tw:size-[22px] tw:text-[0.72rem] tw:tabular-nums tw:text-gold-700 tw:border tw:border-solid tw:border-[rgba(214,164,64,0.55)] tw:rounded-[50%]";
export const tocNoActive =
  "tw:inline-grid tw:place-items-center tw:size-[22px] tw:text-[0.72rem] tw:tabular-nums tw:text-brown-900 tw:bg-[linear-gradient(160deg,#fff0c2,var(--gold-500))] tw:border tw:border-solid tw:border-transparent tw:rounded-[50%]";

export const tocTitle = "tw:truncate";

export const tocMeta = "tw:inline-flex tw:text-[0.75rem] tw:tabular-nums tw:text-gold-700";

// Ô chọn chương chỉ dùng trên màn hình hẹp
export const tocSelect =
  "ck-font-inherit tw:hidden tw:w-full tw:min-h-9 tw:px-2.5 tw:py-0 tw:text-[0.88rem] tw:text-brown-800 tw:bg-gold-100 tw:border tw:border-solid tw:border-[rgba(214,164,64,0.5)] tw:rounded-[10px] tw:max-lg:block";

// Hướng dẫn gập lại cho gọn
export const tips =
  "tw:pt-3 tw:px-1 tw:pb-0 tw:text-[0.74rem] tw:leading-[1.6] tw:text-[rgba(107,74,18,0.7)] tw:[border-top:1px_solid_rgba(214,164,64,0.3)] tw:max-lg:hidden";
export const tipsSummary = "tw:text-[0.8rem] tw:font-medium tw:text-gold-700 tw:cursor-pointer";
export const tipsText = "tw:mt-2 tw:mx-0 tw:mb-0";
export const shortcuts = "tw:flex tw:flex-col tw:gap-1.5 tw:mt-2.5 tw:mx-0 tw:mb-0 tw:p-0 tw:list-none";
export const shortcutRow = "tw:grid tw:grid-cols-[76px_minmax(0,1fr)] tw:items-center tw:gap-2";
export const shortcutKeys = "tw:flex tw:gap-1";
export const kbd =
  "tw:min-w-[22px] tw:py-px tw:px-1.5 tw:[font-family:inherit] tw:text-[0.7rem] tw:text-center tw:text-brown-800 tw:bg-gold-100 tw:border tw:border-solid tw:border-[rgba(214,164,64,0.55)] tw:border-b-2 tw:rounded-[5px]";

// Thanh chờ lúc đang tải (nền ánh vàng chạy ngang)
export const skeleton =
  "tw:block tw:rounded-[6px] tw:bg-[linear-gradient(90deg,rgba(232,199,122,0.18),rgba(232,199,122,0.4),rgba(232,199,122,0.18))] tw:bg-size-[200%_100%] tw:animate-[ck-shimmer_1.4s_linear_infinite]";
// Thanh chờ nằm trong dòng chữ: cao bằng chữ nên dòng không đổi chiều cao khi số thật hiện ra
export const skeletonText =
  "tw:inline-block tw:h-[0.95em] tw:align-[-0.12em] tw:rounded-[4px] tw:bg-[linear-gradient(90deg,rgba(232,199,122,0.18),rgba(232,199,122,0.4),rgba(232,199,122,0.18))] tw:bg-size-[200%_100%] tw:animate-[ck-shimmer_1.4s_linear_infinite]";
