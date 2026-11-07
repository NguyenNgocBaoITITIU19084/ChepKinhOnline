import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types/article";
import shared from "./shared.module.css";
import styles from "./ArticleTeaserCard.module.css";
import { cx, defaultArticleHref, FALLBACK_COVER, type ArticleHrefBuilder } from "./utils";

export interface ArticleTeaserCardProps {
  title: string;
  image: string;
  category?: string;
  /** Dòng nhỏ trên tiêu đề, ví dụ "Ngày đăng · 5 phút đọc". */
  meta?: ReactNode;
  excerpt?: string;
  /** Có đường dẫn thì cả thẻ là liên kết; không có thì là khối tĩnh. */
  href?: string;
  readMoreLabel?: string;
  headingLevel?: "h2" | "h3" | "h4";
  imageSizes?: string;
  /** "lg": tiêu đề lớn hơn, dùng cho bài chính của khối nổi bật. */
  size?: "md" | "lg";
  className?: string;
}

/** Thẻ bài kiểu trang chủ: nhãn chuyên mục trên ảnh, tiêu đề, tóm tắt, chân "Đọc chi tiết". */
export function ArticleTeaserCard({
  title,
  image,
  category,
  meta,
  excerpt,
  href,
  readMoreLabel = "Đọc chi tiết",
  headingLevel: Heading = "h3",
  imageSizes = "(max-width: 768px) 100vw, 33vw",
  size = "md",
  className,
}: ArticleTeaserCardProps) {
  const sizeClass = size === "lg" ? styles.lg : undefined;
  const content = (
    <>
      <div className={styles.cover}>
        <Image src={image || FALLBACK_COVER} alt="" fill sizes={imageSizes} className={styles.image} />
        <div className={styles.fade} aria-hidden />
        {category && <span className={styles.badge}>{category}</span>}
      </div>
      <div className={styles.body}>
        {meta && <div className={styles.meta}>{meta}</div>}
        <Heading className={styles.title}>{title}</Heading>
        {excerpt && <p className={cx(styles.excerpt, shared.clamp3)}>{excerpt}</p>}
        <div className={styles.footer}>
          <span className={styles.readMore} aria-hidden={href ? true : undefined}>
            {readMoreLabel}
            <span aria-hidden>&rarr;</span>
          </span>
        </div>
      </div>
    </>
  );

  return href ? (
    <Link href={href} className={cx(styles.card, sizeClass, shared.focusable, className)}>
      {content}
    </Link>
  ) : (
    <article className={cx(styles.card, sizeClass, className)}>{content}</article>
  );
}

export interface ArticleTeaserGridProps {
  articles: Article[];
  getHref?: ArticleHrefBuilder;
  headingLevel?: "h2" | "h3" | "h4";
  /** Số cột trên máy tính (mặc định 3). Cột hẹp như /tu-hoc thì dùng 2. */
  columns?: 2 | 3;
  className?: string;
}

/** Lưới thẻ kiểu trang chủ từ danh sách bài viết. */
export function ArticleTeaserGrid({
  articles,
  getHref = defaultArticleHref,
  headingLevel,
  columns = 3,
  className,
}: ArticleTeaserGridProps) {
  if (articles.length === 0) return null;
  return (
    <ul className={cx(styles.grid, columns === 2 && styles.grid2, className)}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleTeaserCard
            title={article.title}
            image={article.coverImage}
            category={article.categoryLabel}
            meta={`${article.publishedAt} · ${article.readTime}`}
            excerpt={article.excerpt}
            href={getHref(article)}
            headingLevel={headingLevel}
            imageSizes={columns === 2 ? "(max-width: 768px) 100vw, 420px" : undefined}
          />
        </li>
      ))}
    </ul>
  );
}

export default ArticleTeaserCard;
