import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import type { Article } from "@/types/article";
import shared from "./shared.module.css";
import styles from "./ArticleLead.module.css";
import { cx, defaultArticleHref, FALLBACK_COVER, type ArticleHrefBuilder } from "./utils";

export interface ArticleLeadProps {
  article: Article;
  getHref?: ArticleHrefBuilder;
  headingLevel?: "h2" | "h3";
  /** Ưu tiên tải ảnh khi bài nằm ở đầu trang. */
  priority?: boolean;
  /** "horizontal": ảnh trái, chữ phải. "stacked": ảnh lớn trên, chữ dưới (nổi bật hơn hàng thẻ phụ). */
  layout?: "horizontal" | "stacked";
  className?: string;
}

/** Bài dẫn đầu chuyên mục: ảnh lớn bên trái, tiêu đề và tóm tắt bên phải (màn hẹp xếp dọc). */
export function ArticleLead({
  article,
  getHref = defaultArticleHref,
  headingLevel: Heading = "h2",
  priority = false,
  layout = "horizontal",
  className,
}: ArticleLeadProps) {
  const stacked = layout === "stacked";
  return (
    <Link href={getHref(article)} className={cx(shared.paperCard, shared.focusable, styles.lead, stacked && styles.stacked, className)}>
      <div className={cx(shared.cover, styles.cover)}>
        <Image
          src={article.coverImage || FALLBACK_COVER}
          alt=""
          fill
          priority={priority}
          sizes={stacked ? "(max-width: 1024px) 100vw, 820px" : "(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 520px"}
          className={shared.coverImage}
        />
      </div>
      <div className={styles.body}>
        <span className={shared.categoryLabel}>{article.categoryLabel}</span>
        <Heading className={styles.title}>{article.title}</Heading>
        <p className={cx(styles.excerpt, shared.clamp3)}>{article.excerpt}</p>
        <div className={styles.footer}>
          <span className={shared.meta}>
            <span>{article.readTime}</span>
            <span aria-hidden>·</span>
            <span>{article.publishedAt}</span>
          </span>
          <span className={styles.readMore} aria-hidden>
            Đọc bài viết
            <IconArrowRight size={16} stroke={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ArticleLead;
