import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types/article";
import { ArticleTeaserCard } from "./ArticleTeaserCard";
import shared from "./shared.module.css";
import styles from "./ArticleFeatureBlock.module.css";
import { cx, defaultArticleHref, FALLBACK_COVER, type ArticleHrefBuilder } from "./utils";

export interface ArticleFeatureBlockProps {
  /** Bài chính, hiện lớn bên trái. */
  lead: Article;
  /** Bài nhỏ bên phải, nên đúng 3 bài (nhiều hơn sẽ bị cắt). */
  items?: Article[];
  getHref?: ArticleHrefBuilder;
  label?: string;
  className?: string;
}

const MAX_ITEMS = 3;

/** Khối nổi bật: 1 bài chính (thẻ kiểu trang chủ, cỡ lớn) và tối đa 3 bài nhỏ xếp dọc bên phải. */
export function ArticleFeatureBlock({
  lead,
  items = [],
  getHref = defaultArticleHref,
  label = "Bài viết nổi bật",
  className,
}: ArticleFeatureBlockProps) {
  const side = items.slice(0, MAX_ITEMS);

  return (
    <section className={cx(styles.block, side.length === 0 && styles.single, className)} aria-label={label}>
      <ArticleTeaserCard
        size="lg"
        headingLevel="h2"
        title={lead.title}
        image={lead.coverImage}
        category={lead.categoryLabel}
        meta={`${lead.publishedAt} · ${lead.readTime}`}
        excerpt={lead.excerpt}
        href={getHref(lead)}
        readMoreLabel="Đọc bài viết"
        imageSizes="(max-width: 768px) 100vw, 620px"
      />

      {side.length > 0 && (
        <ul className={cx(shared.paperPanel, styles.side, side.length < MAX_ITEMS && styles.sparse)}>
          {side.map((article) => (
            <li key={article.id}>
              <Link href={getHref(article)} className={cx(styles.item, shared.focusable)}>
                <div className={cx(shared.cover, styles.thumb)}>
                  <Image
                    src={article.coverImage || FALLBACK_COVER}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 112px, 240px"
                    className={shared.coverImage}
                  />
                </div>
                <div className={styles.body}>
                  <span className={cx(shared.categoryLabel, styles.category)}>{article.categoryLabel}</span>
                  <h3 className={cx(styles.title, shared.clamp2)}>{article.title}</h3>
                  <span className={styles.meta}>{article.publishedAt}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ArticleFeatureBlock;
