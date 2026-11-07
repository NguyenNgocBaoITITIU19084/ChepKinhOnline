import type { ReactNode } from "react";
import shared from "./shared.module.css";
import styles from "./ArticlePageHeader.module.css";
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
    <header className={cx(styles.header, className)}>
      <div className={styles.top}>
        <div className={styles.titleGroup}>
          {eyebrow && <span className={shared.eyebrow}>{eyebrow}</span>}
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.desc}>{description}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {nav && <div className={styles.nav}>{nav}</div>}
    </header>
  );
}

export default ArticlePageHeader;
