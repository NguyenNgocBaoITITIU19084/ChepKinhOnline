import type { ReactNode } from "react";
import shared from "./shared.module.css";
import styles from "./ArticleHeader.module.css";
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
    <header className={cx(styles.header, className)}>
      {eyebrow && <span className={shared.eyebrow}>{eyebrow}</span>}
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {meta && <div className={shared.meta}>{meta}</div>}
    </header>
  );
}

export default ArticleHeader;
