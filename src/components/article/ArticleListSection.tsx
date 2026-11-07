import type { ReactNode } from "react";
import type { Article } from "@/types/article";
import { ArticleGrid } from "./ArticleGrid";
import { block, eyebrow as eyebrowClass, sectionHead, sectionHeading } from "./styles";
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
    <section className={cx(block, className)} aria-label={title}>
      {/* Màn hẹp (≤ 768px): bộ lọc xuống dưới tiêu đề, trải hết bề rộng */}
      <div className="tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-4 tw:upto-768:flex-col tw:upto-768:items-stretch">
        <div className={sectionHead}>
          {eyebrow && <span className={eyebrowClass}>{eyebrow}</span>}
          <h2 className={sectionHeading}>{title}</h2>
          {summary && (
            <p className="tw:m-0 tw:text-[0.88rem] tw:leading-[1.5] tw:text-brown-800 tw:tabular-nums" aria-live="polite">
              {summary}
            </p>
          )}
        </div>
        {actions && <div className="tw:min-w-0 tw:max-w-full">{actions}</div>}
      </div>

      <ArticleGrid articles={articles} getHref={getHref} emptyMessage={emptyMessage} />
    </section>
  );
}

export default ArticleListSection;
