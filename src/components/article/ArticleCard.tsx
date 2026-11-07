import Link from "next/link";
import Image from "next/image";
import { IconPencil } from "@tabler/icons-react";
import type { Article } from "@/types/article";
import { categoryLabel, cover, coverImage, focusable, fontDisplay, meta, paperCard } from "./styles";
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
    // Thẻ gọn: ít chữ hơn, tiêu đề nhỏ hơn, không kẻ chân. Màn hẹp (≤ 560px): thẻ gọn thành hàng ngang, ảnh nhỏ bên trái
    <Link
      href={getHref(article)}
      className={cx(
        paperCard,
        focusable,
        "tw:flex tw:flex-col tw:h-full tw:overflow-hidden",
        compact && "tw:upto-560:flex-row",
        className,
      )}
    >
      <div
        className={cx(
          cover,
          "tw:aspect-[16/10]",
          compact && "tw:upto-560:shrink-0 tw:upto-560:w-[112px] tw:upto-560:aspect-auto tw:upto-560:min-h-[96px]",
        )}
      >
        <Image
          src={article.coverImage || FALLBACK_COVER}
          alt=""
          fill
          sizes={compact ? "(max-width: 560px) 112px, 260px" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"}
          className={coverImage}
        />
      </div>

      <div
        className={cx(
          "tw:flex tw:flex-1 tw:flex-col tw:gap-2",
          compact
            ? "tw:pt-3.5 tw:px-4 tw:pb-4 tw:upto-560:justify-center tw:upto-560:pt-3 tw:upto-560:pb-3 tw:upto-560:px-3.5"
            : "tw:pt-[18px] tw:px-5 tw:pb-5",
        )}
      >
        <span className={categoryLabel}>{article.categoryLabel}</span>
        <Heading
          className={cx(
            "tw:m-0 tw:font-semibold tw:leading-[1.4] tw:text-brown-900 tw:line-clamp-2",
            compact ? "tw:text-[1rem]" : "tw:text-[1.12rem]",
            fontDisplay,
          )}
        >
          {article.title}
        </Heading>
        {!compact && (
          <p className="tw:m-0 tw:text-[0.88rem] tw:leading-[1.6] tw:text-brown-800 tw:line-clamp-3">{article.excerpt}</p>
        )}

        <div
          className={cx(
            "tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-2 tw:mt-auto",
            compact ? "tw:pt-0" : "tw:pt-3 tw:border-t tw:border-t-[rgba(214,164,64,0.25)]",
          )}
        >
          <span className={meta}>
            {!compact && (
              <>
                <span>{article.readTime}</span>
                <span aria-hidden>·</span>
              </>
            )}
            <span>{article.publishedAt}</span>
          </span>
          {/* Bài có bản chép kinh đi kèm */}
          {!compact && article.relatedSutraSlug && (
            <span className="tw:inline-flex tw:items-center tw:gap-1.5 tw:py-0.5 tw:px-2.5 tw:text-[0.76rem] tw:font-medium tw:text-brown-800 tw:bg-gold-100 tw:border tw:border-[rgba(214,164,64,0.35)] tw:rounded-[999px]">
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
