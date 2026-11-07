import Link from "next/link";
import Image from "next/image";
import { IconArrowRight } from "@tabler/icons-react";
import type { Article } from "@/types/article";
import { categoryLabel, cover, coverImage, focusable, fontDisplay, meta, paperCard } from "./styles";
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
    // Bài dẫn đầu: ảnh lớn bên trái, chữ bên phải. Kiểu xếp dọc: ảnh tràn bề rộng, tiêu đề lớn hơn.
    // Màn hẹp (≤ 640px): một cột
    <Link
      href={getHref(article)}
      className={cx(
        paperCard,
        focusable,
        "tw:@container tw:grid tw:overflow-hidden",
        stacked
          ? "tw:grid-cols-[minmax(0,1fr)]"
          : "tw:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] tw:upto-640:grid-cols-[minmax(0,1fr)]",
        className,
      )}
    >
      {/*
        Ảnh tối thiểu 4:3 theo bề rộng cột ảnh (1.3 / 2.3 bề rộng thẻ × 0.75), để bài dẫn
        luôn cao hơn hàng thẻ phụ; phần chữ dài hơn thì ảnh giãn theo, không để khoảng trống.
        Không dùng aspect-ratio: kèm chiều cao co giãn nó sẽ kéo ảnh lấn sang cột chữ.
        Kiểu xếp dọc: ảnh dải ngang 21:9 để nổi bật mà không chiếm quá nhiều chiều cao. Màn hẹp: 16:10
      */}
      <div
        className={cx(
          cover,
          "tw:min-w-0",
          stacked
            ? "tw:min-h-0 tw:aspect-[21/9]"
            : "tw:min-h-[calc(100cqi*0.424)] tw:upto-640:min-h-0 tw:upto-640:aspect-[16/10]",
        )}
      >
        <Image
          src={article.coverImage || FALLBACK_COVER}
          alt=""
          fill
          priority={priority}
          sizes={stacked ? "(max-width: 1024px) 100vw, 820px" : "(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 520px"}
          className={coverImage}
        />
      </div>
      <div
        className={cx(
          "tw:flex tw:flex-col tw:justify-center",
          stacked
            ? "tw:gap-2 tw:pt-5 tw:px-6 tw:pb-[22px]"
            : "tw:gap-2.5 tw:p-7 tw:upto-640:pt-[18px] tw:upto-640:px-5 tw:upto-640:pb-5",
        )}
      >
        <span className={categoryLabel}>{article.categoryLabel}</span>
        <Heading
          className={cx(
            "tw:m-0 tw:font-semibold tw:leading-[1.35] tw:text-brown-900 tw:text-balance",
            stacked ? "tw:text-[length:clamp(1.25rem,2vw,1.5rem)]" : "tw:text-[length:clamp(1.3rem,2vw,1.6rem)]",
            fontDisplay,
          )}
        >
          {article.title}
        </Heading>
        <p
          className={cx(
            "tw:m-0 tw:text-[0.92rem] tw:leading-[1.65] tw:text-brown-800",
            stacked ? "tw:line-clamp-2" : "tw:line-clamp-3",
          )}
        >
          {article.excerpt}
        </p>
        <div
          className={cx(
            "tw:flex tw:gap-2.5 tw:mt-auto",
            stacked ? "tw:flex-row tw:flex-wrap tw:items-center tw:justify-between tw:pt-1" : "tw:flex-col tw:pt-2",
          )}
        >
          <span className={meta}>
            <span>{article.readTime}</span>
            <span aria-hidden>·</span>
            <span>{article.publishedAt}</span>
          </span>
          <span className="tw:inline-flex tw:items-center tw:gap-1.5 tw:text-[0.9rem] tw:font-semibold tw:text-brown-900" aria-hidden>
            Đọc bài viết
            <IconArrowRight size={16} stroke={2} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ArticleLead;
