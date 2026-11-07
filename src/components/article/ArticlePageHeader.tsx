import type { ReactNode } from "react";
import { eyebrow as eyebrowClass, fontDisplay } from "./styles";
import { cx } from "./utils";

export interface ArticlePageHeaderProps {
  title: string;
  eyebrow?: string;
  description?: string;
  /** Bên phải tiêu đề, ví dụ ArticleSearchBar. */
  actions?: ReactNode;
  /** Hàng dưới tiêu đề, ví dụ CategoryFilter. */
  nav?: ReactNode;
  className?: string;
}

/** Đầu chuyên trang kiểu báo: tiêu đề có gạch vàng, công cụ bên phải, hàng chuyên mục bên dưới. */
export function ArticlePageHeader({ title, eyebrow, description, actions, nav, className }: ArticlePageHeaderProps) {
  return (
    // Đầu chuyên trang: tiêu đề bên trái, công cụ (tìm kiếm) bên phải, hàng chuyên mục bên dưới.
    // Gạch chân glass-border. Màn hẹp (≤ 768px): công cụ xuống dưới tiêu đề
    <header
      className={cx(
        "tw:flex tw:flex-col tw:gap-4 tw:pb-4 tw:border-b tw:border-b-[rgba(214,164,64,0.35)]",
        className,
      )}
    >
      <div className="tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-x-6 tw:gap-y-4 tw:upto-768:flex-col tw:upto-768:items-stretch">
        <div className="tw:flex tw:flex-col tw:gap-1.5 tw:min-w-0">
          {eyebrow && <span className={eyebrowClass}>{eyebrow}</span>}
          {/* Gạch vàng ngắn dưới tiêu đề (::after) */}
          <h1
            className={cx(
              "tw:relative tw:m-0 tw:pb-2.5 tw:text-[length:clamp(1.6rem,3vw,2.1rem)] tw:font-semibold tw:leading-[1.25] tw:text-brown-900",
              "tw:after:content-[''] tw:after:absolute tw:after:left-0 tw:after:bottom-0 tw:after:w-12 tw:after:h-0.5 tw:after:bg-gold-500 tw:after:rounded-[999px]",
              fontDisplay,
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="tw:m-0 tw:max-w-[560px] tw:text-[0.92rem] tw:leading-[1.6] tw:text-brown-800">{description}</p>
          )}
        </div>
        {actions && <div className="tw:flex-[0_1_360px] tw:min-w-0 tw:upto-768:basis-auto">{actions}</div>}
      </div>
      {nav && <div className="tw:min-w-0">{nav}</div>}
    </header>
  );
}

export default ArticlePageHeader;
