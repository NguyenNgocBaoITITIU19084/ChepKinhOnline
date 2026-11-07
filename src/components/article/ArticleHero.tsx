import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import type { Article } from "@/types/article";
import shared from "./shared.module.css";
import styles from "./ArticleHero.module.css";
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
    <div className={cx(styles.grid, className)}>
      <Link
        href={getHref(featuredArticle)}
        className={cx(shared.paperCard, shared.focusable, styles.featured)}
      >
        <div className={cx(shared.cover, styles.featuredCover)}>
          <Image
            src={featuredArticle.coverImage || FALLBACK_COVER}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 680px"
            className={shared.coverImage}
          />
        </div>

        <div className={styles.featuredBody}>
          <span className={shared.categoryLabel}>{featuredArticle.categoryLabel}</span>
          <h3 className={styles.featuredTitle}>{featuredArticle.title}</h3>
          <p className={cx(styles.featuredExcerpt, shared.clamp3)}>{featuredArticle.excerpt}</p>
          <div className={styles.featuredFooter}>
            <span className={shared.meta}>
              <span>{featuredArticle.readTime}</span>
              <span aria-hidden>·</span>
              <span>{featuredArticle.publishedAt}</span>
            </span>
            <span className={styles.readMore} aria-hidden>
              Đọc bài viết
              <IconArrowRight size={16} stroke={2} />
            </span>
          </div>
        </div>
      </Link>

      {editorPicks.length > 0 && (
        <ul className={styles.picks} aria-label="Bài gợi ý">
          {editorPicks.map((article) => (
            <li key={article.id}>
              <Link
                href={getHref(article)}
                className={cx(shared.paperCard, shared.focusable, styles.pick)}
              >
                <div className={cx(shared.cover, styles.pickCover)}>
                  <Image
                    src={article.coverImage || FALLBACK_COVER}
                    alt=""
                    fill
                    sizes="112px"
                    className={shared.coverImage}
                  />
                </div>
                <div className={styles.pickBody}>
                  <span className={shared.categoryLabel}>{article.categoryLabel}</span>
                  <h3 className={cx(styles.pickTitle, shared.clamp2)}>{article.title}</h3>
                  <span className={shared.meta}>
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
