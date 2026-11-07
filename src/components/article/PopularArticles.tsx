import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types/article";
import shared from "./shared.module.css";
import styles from "./PopularArticles.module.css";
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
    <section className={cx(shared.paperPanel, styles.panel, className)} aria-label={title}>
      <h2 className={styles.heading}>{title}</h2>
      <ol className={styles.list}>
        {ranked.map((article) => (
          <li key={article.id}>
            <Link href={getHref(article)} className={cx(styles.item, shared.focusable)}>
              <span className={cx(shared.cover, styles.thumb)}>
                <Image
                  src={article.coverImage || FALLBACK_COVER}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 120px, 84px"
                  className={shared.coverImage}
                />
              </span>
              <span className={styles.body}>
                <span className={cx(styles.title, shared.clamp2)}>{article.title}</span>
                <span className={styles.meta}>
                  <span>{article.publishedAt}</span>
                  <span className={styles.metaCategory}>{article.categoryLabel}</span>
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
