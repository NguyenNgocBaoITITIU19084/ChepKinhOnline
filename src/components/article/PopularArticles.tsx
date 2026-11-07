import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types/article";
import { cover, coverImage, focusable, fontDisplay, hoverTint, paperPanel, panelHeading } from "./styles";
import { cx, defaultArticleHref, FALLBACK_COVER, type ArticleHrefBuilder } from "./utils";

export interface PopularArticlesProps {
  articles: Article[];
  title?: string;
  /** Số bài hiện, mặc định 5. */
  limit?: number;
  getHref?: ArticleHrefBuilder;
  className?: string;
}

/** Xếp bài theo lượt đọc (bài chưa có lượt đọc giữ thứ tự gốc, xếp sau). */
export function rankByViews(articles: Article[]) {
  return articles
    .map((article, index) => ({ article, index }))
    .sort((a, b) => (b.article.viewCount ?? -1) - (a.article.viewCount ?? -1) || a.index - b.index)
    .map(({ article }) => article);
}

/** Ô "Đọc nhiều nhất" cho cột phụ: mỗi bài một hàng gồm ảnh nhỏ, tiêu đề, ngày đăng và chuyên mục. */
export function PopularArticles({
  articles,
  title = "Đọc nhiều nhất",
  limit = 5,
  getHref = defaultArticleHref,
  className,
}: PopularArticlesProps) {
  const ranked = rankByViews(articles).slice(0, limit);
  if (ranked.length === 0) return null;

  return (
    <section
      className={cx(paperPanel, "tw:flex tw:flex-col tw:gap-3 tw:pt-5 tw:px-4 tw:pb-4", className)}
      aria-label={title}
    >
      <h2 className={panelHeading}>{title}</h2>
      {/* Các bài ngăn bằng đường kẻ đứt mảnh màu vàng */}
      <ol className="tw:flex tw:flex-col tw:m-0 tw:p-0 tw:list-none tw:[&>li+li]:[border-top:1px_dashed_rgba(214,164,64,0.4)]">
        {ranked.map((article) => (
          <li key={article.id}>
            {/* Một bài: ảnh nhỏ bên trái, tiêu đề và dòng meta bên phải. Rê chuột: nền hover-tint.
                Cột phụ xuống dưới (≤ 1024px), rộng hết màn: ảnh lớn hơn chút */}
            <Link
              href={getHref(article)}
              className={cx(
                "tw:group tw:grid tw:grid-cols-[84px_minmax(0,1fr)] tw:gap-3 tw:items-center tw:my-1.5 tw:mx-0 tw:p-1.5",
                "tw:text-inherit tw:no-underline tw:rounded-[10px] tw:[transition:background-color_0.2s_ease] tw:motion-reduce:transition-none",
                hoverTint,
                "tw:upto-1024:grid-cols-[120px_minmax(0,1fr)] tw:upto-1024:gap-3.5",
                "tw:upto-400:grid-cols-[96px_minmax(0,1fr)] tw:upto-400:gap-3",
                focusable,
              )}
            >
              <span className={cx(cover, "tw:block tw:aspect-[4/3] tw:rounded-lg")}>
                <Image
                  src={article.coverImage || FALLBACK_COVER}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 120px, 84px"
                  className={coverImage}
                />
              </span>
              <span className="tw:flex tw:flex-col tw:gap-1.5 tw:min-w-0">
                <span
                  className={cx(
                    "tw:text-[0.92rem] tw:font-semibold tw:leading-[1.4] tw:text-brown-900 tw:line-clamp-2 tw:upto-1024:text-[1rem]",
                    "tw:[transition:color_0.2s_ease] tw:motion-reduce:transition-none tw:group-hover:text-gold-700",
                    fontDisplay,
                  )}
                >
                  {article.title}
                </span>
                {/* Ngày đăng và chuyên mục cùng dòng; cột phụ hẹp thì chuyên mục xuống dòng dưới ngày */}
                <span className="tw:flex tw:flex-wrap tw:items-baseline tw:gap-x-3 tw:gap-y-0.5 tw:min-w-0 tw:text-[0.74rem] tw:leading-[1.4] tw:text-brown-800 tw:tabular-nums tw:whitespace-nowrap">
                  <span>{article.publishedAt}</span>
                  <span className="tw:text-gold-700">{article.categoryLabel}</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default PopularArticles;
