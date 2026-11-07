import type { ReactNode } from "react";
import { eyebrow as eyebrowClass, fontDisplay, meta as metaClass } from "./styles";
import { cx } from "./utils";

export interface ArticleHeaderProps {
  title: string;
  eyebrow?: string;
  subtitle?: ReactNode;
  /** Dòng phụ dưới cùng, ví dụ thời gian đọc và ngày đăng. */
  meta?: ReactNode;
  className?: string;
}

/** Đầu trang canh giữa không có nền: eyebrow, tiêu đề h1, mô tả. Dùng cho trang bài viết. */
export function ArticleHeader({ title, eyebrow, subtitle, meta, className }: ArticleHeaderProps) {
  return (
    <header className={cx("tw:flex tw:flex-col tw:items-center tw:gap-3 tw:text-center", className)}>
      {eyebrow && <span className={eyebrowClass}>{eyebrow}</span>}
      <h1
        className={cx(
          "tw:max-w-[820px] tw:m-0 tw:text-[length:clamp(1.9rem,4vw,2.6rem)] tw:font-semibold tw:leading-[1.25] tw:text-brown-900 tw:text-balance",
          fontDisplay,
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="tw:max-w-[640px] tw:m-0 tw:text-[1.02rem] tw:leading-[1.7] tw:text-brown-800 tw:text-pretty">{subtitle}</p>
      )}
      {meta && <div className={metaClass}>{meta}</div>}
    </header>
  );
}

export default ArticleHeader;
