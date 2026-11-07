import type { ReactNode } from "react";
import { IconBook2 } from "@tabler/icons-react";
import type { Article } from "@/types/article";
import { ArticleCard } from "./ArticleCard";
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
      <div
        className={cx(
          "tw:flex tw:flex-col tw:items-center tw:gap-3 tw:py-12 tw:px-4 tw:text-center tw:text-[0.95rem] tw:leading-[1.6] tw:text-brown-800",
          className,
        )}
        role="status"
      >
        <IconBook2 size={36} stroke={1.5} className="tw:text-gold-700" aria-hidden />
        <p className="tw:max-w-[480px] tw:m-0">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul
      className={cx(
        "tw:grid tw:grid-cols-[repeat(3,minmax(0,1fr))] tw:m-0 tw:p-0 tw:list-none",
        variant === "compact"
          ? // Hàng thẻ gọn: 3 cột, gap nhỏ hơn; dưới 560px thành 1 cột
            "tw:gap-4 tw:upto-560:grid-cols-[minmax(0,1fr)]"
          : "tw:gap-6 tw:upto-1024:grid-cols-[repeat(2,minmax(0,1fr))] tw:upto-1024:gap-5 tw:upto-640:grid-cols-[minmax(0,1fr)] tw:upto-640:gap-4",
        className,
      )}
    >
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} getHref={getHref} headingLevel={cardHeadingLevel} variant={variant} />
        </li>
      ))}
    </ul>
  );
}

export default ArticleGrid;
