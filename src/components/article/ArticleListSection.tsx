import type { ReactNode } from "react";
import type { Article } from "@/types/article";
import { ArticleGrid } from "./ArticleGrid";
import shared from "./shared.module.css";
import styles from "./ArticleListSection.module.css";
import { cx, type ArticleHrefBuilder } from "./utils";

export interface ArticleListSectionProps {
  title: string;
  articles: Article[];
  eyebrow?: string;
  /** Dòng tóm tắt dưới tiêu đề, ví dụ số bài tìm thấy. Đọc lên khi thay đổi. */
  summary?: ReactNode;
  /** Chỗ đặt bộ lọc hoặc nút bên phải tiêu đề. */
  actions?: ReactNode;
  emptyMessage?: ReactNode;
  getHref?: ArticleHrefBuilder;
  className?: string;
}

/** Block danh sách bài viết: đầu block (tiêu đề, tóm tắt, bộ lọc) và lưới thẻ bài. */
export function ArticleListSection({
  title,
  articles,
  eyebrow,
  summary,
  actions,
  emptyMessage,
  getHref,
  className,
}: ArticleListSectionProps) {
  return (
    <section className={cx(styles.section, className)} aria-label={title}>
      <div className={styles.head}>
        <div className={shared.sectionHead}>
          {eyebrow && <span className={shared.eyebrow}>{eyebrow}</span>}
          <h2 className={shared.sectionHeading}>{title}</h2>
          {summary && (
            <p className={styles.summary} aria-live="polite">
              {summary}
            </p>
          )}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>

      <ArticleGrid articles={articles} getHref={getHref} emptyMessage={emptyMessage} />
    </section>
  );
}

export default ArticleListSection;
