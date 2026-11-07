import Link from "next/link";
import Image from "next/image";
import { IconPencil } from "@tabler/icons-react";
import type { Article } from "@/types/article";
import shared from "./shared.module.css";
import styles from "./ArticleCard.module.css";
import { cx, defaultArticleHref, FALLBACK_COVER, type ArticleHrefBuilder } from "./utils";

export interface ArticleCardProps {
  article: Article;
  getHref?: ArticleHrefBuilder;
  headingLevel?: "h2" | "h3" | "h4";
  /** "compact": chỉ ảnh, chuyên mục, tiêu đề và ngày, dùng cho hàng bài phụ. */
  variant?: "default" | "compact";
  className?: string;
}

/** Thẻ một bài viết: ảnh bìa, chuyên mục, tiêu đề, tóm tắt, thời gian đọc. */
export function ArticleCard({
  article,
  getHref = defaultArticleHref,
  headingLevel: Heading = "h3",
  variant = "default",
  className,
}: ArticleCardProps) {
  const compact = variant === "compact";
  return (
    <Link
      href={getHref(article)}
      className={cx(shared.paperCard, shared.focusable, styles.card, compact && styles.compact, className)}
    >
      <div className={cx(shared.cover, styles.cover)}>
        <Image
          src={article.coverImage || FALLBACK_COVER}
          alt=""
          fill
          sizes={compact ? "(max-width: 560px) 112px, 260px" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"}
          className={shared.coverImage}
        />
      </div>

      <div className={styles.body}>
        <span className={shared.categoryLabel}>{article.categoryLabel}</span>
        <Heading className={cx(styles.title, shared.clamp2)}>{article.title}</Heading>
        {!compact && <p className={cx(styles.excerpt, shared.clamp3)}>{article.excerpt}</p>}

        <div className={styles.footer}>
          <span className={shared.meta}>
            {!compact && (
              <>
                <span>{article.readTime}</span>
                <span aria-hidden>·</span>
              </>
            )}
            <span>{article.publishedAt}</span>
          </span>
          {!compact && article.relatedSutraSlug && (
            <span className={styles.sutra}>
              <IconPencil size={14} stroke={2} aria-hidden />
              Có bản chép kinh
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
