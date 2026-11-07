"use client";

import { Fragment, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconChevronDown } from "@tabler/icons-react";
import type { Article } from "@/types/article";
import { ArticleGrid } from "./ArticleGrid";
import { categoryLabel, cover, coverImage, focusable, fontDisplay, hoverTint } from "./styles";
import { cx, defaultArticleHref, FALLBACK_COVER, type ArticleHrefBuilder } from "./utils";

export interface ArticleRowProps {
  article: Article;
  getHref?: ArticleHrefBuilder;
  headingLevel?: "h2" | "h3" | "h4";
}

const metaItem =
  "tw:relative tw:ml-4 tw:whitespace-nowrap tw:before:content-['·'] tw:before:absolute tw:before:-left-[11px]";

/** Một hàng bài: ảnh bên trái, chuyên mục, tiêu đề, tóm tắt bên phải. */
export function ArticleRow({ article, getHref = defaultArticleHref, headingLevel: Heading = "h3" }: ArticleRowProps) {
  return (
    // Hàng bài: ảnh bên trái, chữ bên phải. Rê chuột: nền hover-tint
    <Link
      href={getHref(article)}
      className={cx(
        "tw:grid tw:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] tw:gap-5 tw:[align-items:start] tw:my-2 tw:-mx-3 tw:p-3",
        "tw:text-inherit tw:no-underline tw:rounded-[10px] tw:[transition:background-color_0.2s_ease] tw:motion-reduce:transition-none",
        hoverTint,
        "tw:upto-560:grid-cols-[112px_minmax(0,1fr)] tw:upto-560:gap-3.5",
        focusable,
      )}
    >
      <div className={cx(cover, "tw:aspect-[16/9] tw:rounded-[10px] tw:upto-560:aspect-[4/3]")}>
        <Image
          src={article.coverImage || FALLBACK_COVER}
          alt=""
          fill
          sizes="(max-width: 560px) 112px, 300px"
          className={coverImage}
        />
      </div>
      <div className="tw:flex tw:flex-col tw:gap-2 tw:min-w-0">
        <span className={categoryLabel}>{article.categoryLabel}</span>
        <Heading
          className={cx(
            "tw:m-0 tw:text-[1.15rem] tw:font-semibold tw:leading-[1.4] tw:text-brown-900 tw:line-clamp-2 tw:upto-560:text-[1rem]",
            fontDisplay,
          )}
        >
          {article.title}
        </Heading>
        <p className="tw:m-0 tw:text-[0.9rem] tw:leading-[1.6] tw:text-brown-800 tw:line-clamp-3 tw:upto-560:hidden">
          {article.excerpt}
        </p>
        {/*
          Dòng meta: mỗi mục có lề trái 16px, dấu chấm (::before) nằm trong lề đó. Cả hàng kéo lùi 16px
          và khung ngoài cắt phần tràn, nên mục ở đầu mỗi dòng không còn dấu chấm treo.
        */}
        <span className="tw:block tw:overflow-hidden">
          <span className="tw:flex tw:flex-wrap tw:items-center tw:gap-0 tw:-ml-4 tw:text-[0.8rem] tw:leading-[1.45] tw:text-brown-800 tw:tabular-nums">
            <span className={metaItem}>{article.readTime}</span>
            <span className={metaItem}>{article.publishedAt}</span>
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
    <div className={cx("tw:flex tw:flex-col tw:gap-5", className)}>
      {/* Mỗi hàng ngăn bằng một đường kẻ vàng mảnh */}
      <ul
        className="tw:flex tw:flex-col tw:m-0 tw:p-0 tw:list-none tw:[&>li+li]:[border-top:1px_solid_rgba(214,164,64,0.25)]"
        aria-label={label}
      >
        {shown.map((article, index) => (
          <Fragment key={article.id}>
            <li>
              <ArticleRow article={article} getHref={getHref} />
            </li>
            {interlude && index === interludeIndex && (
              <li className="tw:py-5 tw:px-0">{interlude}</li>
            )}
          </Fragment>
        ))}
      </ul>

      {pageSize && remaining > 0 && (
        <button
          type="button"
          className="ck-btn-ghost tw:self-center"
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
