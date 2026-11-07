"use client";

import { Fragment, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconChevronDown } from "@tabler/icons-react";
import type { Article } from "@/types/article";
import copy from "@/components/copy/copy.module.css";
import { ArticleGrid } from "./ArticleGrid";
import shared from "./shared.module.css";
import styles from "./ArticleRowList.module.css";
import { cx, defaultArticleHref, FALLBACK_COVER, type ArticleHrefBuilder } from "./utils";

export interface ArticleRowProps {
  article: Article;
  getHref?: ArticleHrefBuilder;
  headingLevel?: "h2" | "h3" | "h4";
}

/** Một hàng bài: ảnh bên trái, chuyên mục, tiêu đề, tóm tắt bên phải. */
export function ArticleRow({ article, getHref = defaultArticleHref, headingLevel: Heading = "h3" }: ArticleRowProps) {
  return (
    <Link href={getHref(article)} className={cx(styles.row, shared.focusable)}>
      <div className={cx(shared.cover, styles.cover)}>
        <Image
          src={article.coverImage || FALLBACK_COVER}
          alt=""
          fill
          sizes="(max-width: 560px) 112px, 300px"
          className={shared.coverImage}
        />
      </div>
      <div className={styles.body}>
        <span className={shared.categoryLabel}>{article.categoryLabel}</span>
        <Heading className={cx(styles.title, shared.clamp2)}>{article.title}</Heading>
        <p className={cx(styles.excerpt, shared.clamp3)}>{article.excerpt}</p>
        {/* Dấu chấm vẽ bằng ::before; mục nào rớt xuống đầu dòng thì dấu bị cắt đi */}
        <span className={styles.metaClip}>
          <span className={cx(shared.meta, styles.metaList)}>
            <span className={styles.metaItem}>{article.readTime}</span>
            <span className={styles.metaItem}>{article.publishedAt}</span>
          </span>
        </span>
      </div>
    </Link>
  );
}

export interface ArticleRowListProps {
  articles: Article[];
  getHref?: ArticleHrefBuilder;
  /** Số bài hiện mỗi lần; bấm "Xem thêm" để hiện thêm. Bỏ trống thì hiện hết. */
  pageSize?: number;
  loadMoreLabel?: string;
  /** Nội dung chen giữa danh sách (ví dụ QuoteBox), đặt sau bài thứ `interludeAfter`. */
  interlude?: ReactNode;
  interludeAfter?: number;
  emptyMessage?: ReactNode;
  label?: string;
  className?: string;
}

/**
 * Danh sách bài dạng hàng ngang, có nút "Xem thêm" và chỗ chen nội dung giữa danh sách.
 * Muốn về lại trang đầu khi đổi bộ lọc thì đổi `key` của block.
 */
export function ArticleRowList({
  articles,
  getHref,
  pageSize,
  loadMoreLabel = "Xem thêm bài viết",
  interlude,
  interludeAfter = 3,
  emptyMessage,
  label = "Danh sách bài viết",
  className,
}: ArticleRowListProps) {
  const [visible, setVisible] = useState(pageSize ?? articles.length);

  if (articles.length === 0) {
    return <ArticleGrid articles={[]} emptyMessage={emptyMessage} className={className} />;
  }

  const shown = articles.slice(0, visible);
  const remaining = articles.length - shown.length;
  // Danh sách ngắn hơn chỗ chen thì đặt nội dung chen ở cuối
  const interludeIndex = Math.min(interludeAfter, shown.length) - 1;

  return (
    <div className={cx(styles.wrap, className)}>
      <ul className={styles.list} aria-label={label}>
        {shown.map((article, index) => (
          <Fragment key={article.id}>
            <li className={styles.item}>
              <ArticleRow article={article} getHref={getHref} />
            </li>
            {interlude && index === interludeIndex && (
              <li className={cx(styles.item, styles.interlude)}>{interlude}</li>
            )}
          </Fragment>
        ))}
      </ul>

      {pageSize && remaining > 0 && (
        <button
          type="button"
          className={cx(copy.ghostButton, styles.more)}
          onClick={() => setVisible((v) => v + pageSize)}
        >
          <span>
            {loadMoreLabel} ({remaining})
          </span>
          <IconChevronDown size={18} stroke={2} aria-hidden />
        </button>
      )}
    </div>
  );
}

export default ArticleRowList;
