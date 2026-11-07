"use client";

import {
  IconBook2,
  IconCandle,
  IconChevronRight,
  IconFlower,
  IconHeartHandshake,
  IconSparkles,
  type Icon,
} from "@tabler/icons-react";
import type { ArticleCategory, ArticleCategorySlug } from "@/types/article";
import {
  block,
  eyebrow as eyebrowClass,
  focusable,
  fontDisplay,
  paperCardFrame,
  sectionDesc,
  sectionHead,
  sectionHeadCenter,
  sectionHeading,
} from "./styles";
import { cx } from "./utils";

const ICON_MAP: Record<string, Icon> = {
  IconSparkles,
  IconBook2,
  IconCandle,
  IconFlower,
  IconHeartHandshake,
};

export interface ArticleCategoryGridProps {
  categories: ArticleCategory[];
  activeSlug: ArticleCategorySlug;
  onSelect: (slug: ArticleCategorySlug) => void;
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

/** Block danh mục: lưới thẻ chuyên mục, bấm để lọc. Mỗi thẻ là nút bật/tắt (aria-pressed). */
export function ArticleCategoryGrid({
  categories,
  activeSlug,
  onSelect,
  eyebrow,
  title = "Chuyên mục",
  description,
  className,
}: ArticleCategoryGridProps) {
  if (categories.length === 0) return null;

  return (
    <section className={cx(block, className)} aria-label={title}>
      <div className={cx(sectionHead, sectionHeadCenter)}>
        {eyebrow && <span className={eyebrowClass}>{eyebrow}</span>}
        <h2 className={sectionHeading}>{title}</h2>
        {description && <p className={sectionDesc}>{description}</p>}
      </div>

      <ul className="tw:grid tw:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] tw:gap-4 tw:m-0 tw:p-0 tw:list-none tw:upto-480:grid-cols-[repeat(2,minmax(0,1fr))] tw:upto-480:gap-2.5">
        {categories.map((cat) => {
          const isActive = activeSlug === cat.slug;
          const CategoryIcon = (cat.iconName && ICON_MAP[cat.iconName]) || IconBook2;

          return (
            <li key={cat.id}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(cat.slug)}
                // Thẻ chuyên mục: khung thẻ giấy, thêm bố cục nút.
                // Đang chọn: nền gold-button-top, viền gold-500, chữ đậm 700 (README, mục Trạng thái)
                className={cx(
                  paperCardFrame,
                  focusable,
                  "tw:group tw:flex tw:flex-col tw:gap-2 tw:w-full tw:h-full tw:p-5 tw:[font-feature-settings:inherit] tw:text-left tw:cursor-pointer tw:upto-480:p-3.5",
                  isActive
                    ? "tw:bg-[#fff0c2] tw:border-gold-500"
                    : "tw:bg-paper tw:border-[rgba(214,164,64,0.35)] tw:hover:border-gold-500",
                )}
              >
                {/* Ô biểu tượng: rê chuột lên thẻ thì nền hover-tint */}
                <span
                  className={cx(
                    "tw:grid tw:place-items-center tw:w-10 tw:h-10 tw:mb-1 tw:bg-gold-100 tw:border tw:border-[rgba(214,164,64,0.35)] tw:rounded-[10px]",
                    "tw:[transition:background-color_0.2s_ease,color_0.2s_ease] tw:motion-reduce:transition-none",
                    "tw:group-hover:bg-[rgba(232,199,122,0.3)] tw:group-hover:text-brown-900",
                    isActive ? "tw:text-brown-900" : "tw:text-gold-700",
                  )}
                  aria-hidden
                >
                  <CategoryIcon size={18} stroke={2} />
                </span>
                <span
                  className={cx(
                    "tw:text-[1.1rem] tw:leading-[1.35] tw:text-brown-900",
                    isActive ? "tw:font-bold" : "tw:font-semibold",
                    fontDisplay,
                  )}
                >
                  {cat.label}
                </span>
                {cat.description && (
                  <span className="tw:flex-1 tw:text-[0.84rem] tw:leading-[1.55] tw:text-brown-800 tw:upto-480:hidden">
                    {cat.description}
                  </span>
                )}
                <span className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:pt-2.5 tw:border-t tw:border-t-[rgba(214,164,64,0.25)] tw:text-[0.8rem] tw:font-medium tw:text-brown-800 tw:tabular-nums">
                  <span>
                    {typeof cat.articleCount === "number" ? `${cat.articleCount} bài viết` : "Xem bài viết"}
                  </span>
                  <IconChevronRight size={16} stroke={2} aria-hidden />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ArticleCategoryGrid;
