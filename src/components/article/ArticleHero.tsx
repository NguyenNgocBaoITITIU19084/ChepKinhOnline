import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import type { Article } from "@/types/article";
import { categoryLabel, cover, coverImage, focusable, fontDisplay, meta, paperCard } from "./styles";
import { cx, defaultArticleHref, FALLBACK_COVER, type ArticleHrefBuilder } from "./utils";

export interface ArticleHeroProps {
  featuredArticle: Article;
  /** Các bài gợi ý ở cột phải (nên 2–3 bài). */
  editorPicks?: Article[];
  getHref?: ArticleHrefBuilder;
  /** Ưu tiên tải ảnh bài chính khi block nằm ở đầu trang. */
  priority?: boolean;
  className?: string;
}

/** Lưới bài nổi bật: một bài lớn bên trái, danh sách bài gợi ý bên phải. */
export function ArticleHero({
  featuredArticle,
  editorPicks = [],
  getHref = defaultArticleHref,
  priority = false,
  className,
}: ArticleHeroProps) {
  return (
    <div
      className={cx(
        "tw:grid tw:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] tw:gap-6 tw:items-stretch tw:upto-1024:grid-cols-[minmax(0,1fr)]",
        className,
      )}
    >
      <Link
        href={getHref(featuredArticle)}
        className={cx(paperCard, focusable, "tw:flex tw:flex-col tw:overflow-hidden")}
      >
        <div className={cx(cover, "tw:aspect-[16/9]")}>
          <Image
            src={featuredArticle.coverImage || FALLBACK_COVER}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 680px"
            className={coverImage}
          />
        </div>

        <div className="tw:flex tw:flex-1 tw:flex-col tw:gap-3 tw:pt-6 tw:px-7 tw:pb-7 tw:upto-768:pt-5 tw:upto-768:px-5 tw:upto-768:pb-5">
          <span className={categoryLabel}>{featuredArticle.categoryLabel}</span>
          <h3
            className={cx(
              "tw:m-0 tw:text-[length:clamp(1.35rem,2.2vw,1.7rem)] tw:font-semibold tw:leading-[1.35] tw:text-brown-900 tw:text-balance",
              fontDisplay,
            )}
          >
            {featuredArticle.title}
          </h3>
          <p className="tw:m-0 tw:text-[0.95rem] tw:leading-[1.65] tw:text-brown-800 tw:line-clamp-3">{featuredArticle.excerpt}</p>
          <div className="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-3 tw:mt-auto tw:pt-2">
            <span className={meta}>
              <span>{featuredArticle.readTime}</span>
              <span aria-hidden>·</span>
              <span>{featuredArticle.publishedAt}</span>
            </span>
            <span className="tw:inline-flex tw:items-center tw:gap-1.5 tw:text-[0.9rem] tw:font-semibold tw:text-brown-900" aria-hidden>
              Đọc bài viết
              <IconArrowRight size={16} stroke={2} />
            </span>
          </div>
        </div>
      </Link>

      {editorPicks.length > 0 && (
        // Cột bài gợi ý
        <ul className="tw:flex tw:flex-col tw:gap-4 tw:m-0 tw:p-0 tw:list-none" aria-label="Bài gợi ý">
          {editorPicks.map((article) => (
            <li key={article.id}>
              <Link
                href={getHref(article)}
                className={cx(paperCard, focusable, "tw:flex tw:gap-4 tw:h-full tw:p-3.5")}
              >
                <div
                  className={cx(
                    cover,
                    "tw:shrink-0 tw:w-[112px] tw:aspect-[4/3] tw:self-start tw:rounded-[10px] tw:upto-400:w-[88px]",
                  )}
                >
                  <Image
                    src={article.coverImage || FALLBACK_COVER}
                    alt=""
                    fill
                    sizes="112px"
                    className={coverImage}
                  />
                </div>
                <div className="tw:flex tw:flex-1 tw:flex-col tw:justify-center tw:gap-1.5 tw:min-w-0">
                  <span className={categoryLabel}>{article.categoryLabel}</span>
                  <h3
                    className={cx(
                      "tw:m-0 tw:text-[1rem] tw:font-semibold tw:leading-[1.4] tw:text-brown-900 tw:line-clamp-2",
                      fontDisplay,
                    )}
                  >
                    {article.title}
                  </h3>
                  <span className={meta}>
                    <span>{article.readTime}</span>
                    <span aria-hidden>·</span>
                    <span>{article.publishedAt}</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArticleHero;
