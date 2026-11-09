import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types/article";
import { focusable, fontDisplay } from "./styles";
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
  const lg = size === "lg";
  const cardClass = cx(
    "tw:group tw:flex tw:flex-col tw:h-full tw:overflow-hidden tw:text-inherit tw:no-underline tw:bg-paper",
    "tw:border tw:border-[rgba(120,85,20,0.15)] tw:rounded-2xl tw:[box-shadow:0_4px_20px_rgba(90,60,10,0.05)]",
    "tw:[transition:border-color_0.5s_ease,box-shadow_0.5s_ease] tw:motion-reduce:transition-none",
    "tw:hover:border-[rgba(168,116,26,0.4)] tw:hover:[box-shadow:0_12px_32px_rgba(90,60,10,0.12)]",
  );
  const content = (
    <>
      {/* Cỡ lớn (bài chính): ảnh 2:1 thay vì 16:10 */}
      <div
        className={cx(
          "tw:relative tw:overflow-hidden tw:bg-[#efe4c8]",
          lg ? "tw:aspect-[2/1]" : "tw:aspect-[16/10]",
        )}
      >
        {/* Ảnh tượng thường vuông hoặc đứng, lấy khung lệch lên để không cắt mất đầu tượng */}
        <Image
          src={image || FALLBACK_COVER}
          alt=""
          fill
          sizes={imageSizes}
          className="tw:object-cover tw:object-[50%_5%] tw:[transition:transform_0.7s_ease] tw:motion-reduce:transition-none tw:motion-safe:group-hover:[transform:scale(1.05)]"
        />
        {/* Mép dưới ảnh hòa vào màu giấy; bài chính: ảnh giữ trọn, chỉ hòa nhẹ ở mép dưới */}
        <div
          className={cx(
            "tw:absolute tw:inset-0 tw:pointer-events-none",
            lg
              ? "tw:bg-[linear-gradient(to_top,var(--paper),transparent_10%)]"
              : "tw:bg-[linear-gradient(to_top,var(--paper),transparent_50%)]",
          )}
          aria-hidden
        />
        {/* Nhãn chuyên mục nền nâu tối, chữ brand-on-dark */}
        {category && (
          <span className="tw:absolute tw:top-3.5 tw:left-3.5 tw:py-1 tw:px-3 tw:text-[0.68rem] tw:font-semibold tw:tracking-[0.08em] tw:uppercase tw:text-[#fdf3dc] tw:bg-[rgba(31,26,20,0.75)] tw:rounded-md tw:[backdrop-filter:blur(8px)] tw:upto-768:[backdrop-filter:none] tw:upto-768:bg-[rgba(31,26,20,0.82)]">
            {category}
          </span>
        )}
      </div>
      <div
        className={cx(
          "tw:flex tw:flex-1 tw:flex-col",
          lg ? "tw:pt-[18px] tw:px-7 tw:pb-[22px]" : "tw:pt-3 tw:px-6 tw:pb-5",
        )}
      >
        {meta && <div className="tw:mb-2 tw:text-[0.75rem] tw:text-brown-800 tw:tabular-nums">{meta}</div>}
        <Heading
          className={cx(
            "tw:mt-0 tw:mx-0 tw:mb-3 tw:font-semibold tw:text-brown-900",
            "tw:[transition:color_0.3s_ease] tw:motion-reduce:transition-none tw:group-hover:text-gold-700",
            fontDisplay,
            lg
              ? "tw:text-[length:clamp(1.3rem,2vw,1.6rem)] tw:leading-[1.3]"
              : "tw:text-[1.2rem] tw:leading-[1.375] tw:upto-640:text-[1.1rem]",
          )}
        >
          {title}
        </Heading>
        {excerpt && (
          <p
            className={cx(
              "tw:mt-0 tw:mx-0 tw:leading-[1.65] tw:text-brown-800",
              lg ? "tw:mb-[18px] tw:text-[0.95rem] tw:line-clamp-2" : "tw:mb-6 tw:text-[0.875rem] tw:line-clamp-3",
            )}
          >
            {excerpt}
          </p>
        )}
        <div className="tw:flex tw:items-center tw:mt-auto tw:pt-4 tw:border-t tw:border-t-[rgba(120,85,20,0.1)]">
          <span
            className={cx(
              "tw:inline-flex tw:items-center tw:gap-1 tw:text-[0.8rem] tw:font-semibold tw:text-brown-900",
              "tw:[transition:transform_0.3s_ease] tw:motion-reduce:transition-none tw:motion-safe:group-hover:[transform:translateX(4px)]",
              fontDisplay,
            )}
            aria-hidden={href ? true : undefined}
          >
            {readMoreLabel}
            <span aria-hidden>&rarr;</span>
          </span>
        </div>
      </div>
    </>
  );

  return href ? (
    <Link href={href} className={cx(cardClass, focusable, className)}>
      {content}
    </Link>
  ) : (
    <article className={cx(cardClass, className)}>{content}</article>
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
    // Lưới 3 (hoặc 2) cột, 1 cột trên điện thoại
    <ul
      className={cx(
        "tw:grid tw:gap-6 tw:m-0 tw:p-0 tw:list-none tw:max-md:grid-cols-[minmax(0,1fr)]",
        columns === 2 ? "tw:grid-cols-[repeat(2,minmax(0,1fr))]" : "tw:grid-cols-[repeat(3,minmax(0,1fr))]",
        className,
      )}
    >
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
