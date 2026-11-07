import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types/article";
import { ArticleTeaserCard } from "./ArticleTeaserCard";
import { categoryLabel, cover, coverImage, focusable, fontDisplay, hoverTint, paperPanel } from "./styles";
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

  // Ít hơn 3 bài nhỏ (chuyên mục ít bài): không để phần dư dồn thành khoảng trống giữa các bài.
  // Mỗi bài chia đều chiều cao cột, ảnh cao lên lấp đầy hàng của nó (chỉ khi hai cột, > 768px).
  const sparse = side.length < MAX_ITEMS;

  return (
    <section
      className={cx(
        // Khối nổi bật: bài chính bên trái, ba bài nhỏ xếp dọc bên phải, hai cột cao bằng nhau.
        // Chỉ có bài chính, hoặc màn hẹp: một cột, bài chính trên, ba bài nhỏ dưới
        "tw:grid tw:gap-6 tw:items-stretch",
        side.length === 0
          ? "tw:grid-cols-[minmax(0,1fr)]"
          : "tw:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] tw:upto-768:grid-cols-[minmax(0,1fr)]",
        className,
      )}
      aria-label={label}
    >
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
        <ul
          className={cx(
            paperPanel,
            // Cột bài nhỏ: khung giấy, mỗi bài cao vừa nội dung; phần dư (nếu bài chính cao hơn)
            // chia đều vào khoảng giữa các bài. Các bài ngăn bằng đường kẻ vàng mảnh
            "tw:flex tw:flex-col tw:justify-between tw:m-0 tw:py-2.5 tw:px-4 tw:list-none tw:upto-768:py-1 tw:upto-768:px-3",
            "tw:[&>li]:flex tw:[&>li+li]:[border-top:1px_solid_rgba(214,164,64,0.25)]",
            sparse && "tw:from-769:[&>li]:flex-1",
          )}
        >
          {side.map((article) => (
            <li key={article.id}>
              {/* Một bài nhỏ: ảnh ngang 16:10 bên trái, chữ canh giữa bên phải. Rê chuột: nền hover-tint.
                  Lề âm 8px hai bên để nền hover tràn đều ra ngoài ảnh và chữ.
                  Một cột (màn hẹp): ảnh nhỏ cố định 4:3 */}
              <Link
                href={getHref(article)}
                className={cx(
                  "tw:group tw:grid tw:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] tw:gap-4 tw:items-center",
                  "tw:w-[calc(100%+16px)] tw:my-1 tw:-mx-2 tw:p-2 tw:text-inherit tw:no-underline tw:rounded-[10px]",
                  "tw:[transition:background-color_0.2s_ease] tw:motion-reduce:transition-none",
                  hoverTint,
                  "tw:upto-768:grid-cols-[112px_minmax(0,1fr)] tw:upto-400:grid-cols-[96px_minmax(0,1fr)] tw:upto-400:gap-3",
                  sparse && "tw:from-769:items-stretch",
                  focusable,
                )}
              >
                <div
                  className={cx(
                    cover,
                    "tw:aspect-[16/10] tw:rounded-[10px] tw:upto-768:aspect-[4/3]",
                    sparse && "tw:from-769:aspect-auto tw:from-769:min-h-[120px]",
                  )}
                >
                  <Image
                    src={article.coverImage || FALLBACK_COVER}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 112px, 240px"
                    className={coverImage}
                  />
                </div>
                <div className="tw:flex tw:flex-col tw:justify-center tw:gap-1 tw:min-w-0 tw:py-1 tw:px-0">
                  {/* Tên chuyên mục một dòng, dài thì cắt */}
                  <span className={cx(categoryLabel, "tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap")}>
                    {article.categoryLabel}
                  </span>
                  <h3
                    className={cx(
                      "tw:m-0 tw:text-[1.05rem] tw:font-semibold tw:leading-[1.4] tw:text-brown-900 tw:line-clamp-2",
                      "tw:[transition:color_0.2s_ease] tw:motion-reduce:transition-none tw:group-hover:text-gold-700",
                      fontDisplay,
                    )}
                  >
                    {article.title}
                  </h3>
                  <span className="tw:text-[0.75rem] tw:text-brown-800 tw:tabular-nums">{article.publishedAt}</span>
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
