import type { ReactNode } from "react";
import { IconBook2 } from "@tabler/icons-react";
import type { Article } from "@/types/article";
import { ArticleCard } from "./ArticleCard";
import styles from "./ArticleGrid.module.css";
import { cx, type ArticleHrefBuilder } from "./utils";

export interface ArticleGridProps {
  articles: Article[];
  getHref?: ArticleHrefBuilder;
  /** Nội dung khi không có bài nào. */
  emptyMessage?: ReactNode;
  cardHeadingLevel?: "h2" | "h3" | "h4";
  /** "compact": hàng 3 thẻ gọn (giữ 3 cột tới màn hẹp, rồi 1 cột). */
  variant?: "default" | "compact";
  className?: string;
}

/** Lưới thẻ bài viết (3 cột, 2 cột trên máy tính bảng, 1 cột trên điện thoại). */
export function ArticleGrid({
  articles,
  getHref,
  emptyMessage = "Chưa có bài viết nào trong chuyên mục này.",
  cardHeadingLevel,
  variant = "default",
  className,
}: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className={cx(styles.empty, className)} role="status">
        <IconBook2 size={36} stroke={1.5} className={styles.emptyIcon} aria-hidden />
        <p className={styles.emptyText}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className={cx(styles.grid, variant === "compact" && styles.compactGrid, className)}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} getHref={getHref} headingLevel={cardHeadingLevel} variant={variant} />
        </li>
      ))}
    </ul>
  );
}

export default ArticleGrid;
