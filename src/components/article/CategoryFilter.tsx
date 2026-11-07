"use client";

import type { ArticleCategory, ArticleCategorySlug } from "@/types/article";
import { focusable, pill } from "./styles";
import { cx } from "./utils";

export interface CategoryFilterProps {
  categories: ArticleCategory[];
  activeSlug: ArticleCategorySlug;
  onSelect: (slug: ArticleCategorySlug) => void;
  label?: string;
  /** Canh hàng nút: trái (mặc định) hoặc giữa. */
  align?: "start" | "center";
  className?: string;
}

/** Bộ lọc chuyên mục dạng hàng nút viên thuốc, gọn hơn ArticleCategoryGrid. */
export function CategoryFilter({
  categories,
  activeSlug,
  onSelect,
  label = "Lọc theo chuyên mục",
  align = "start",
  className,
}: CategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <ul
      className={cx(
        "tw:flex tw:flex-wrap tw:gap-2 tw:m-0 tw:p-0.5 tw:list-none",
        // Màn hẹp: một hàng cuộn ngang
        "tw:upto-768:flex-nowrap tw:upto-768:overflow-x-auto tw:upto-768:[scrollbar-width:none] tw:upto-768:[&::-webkit-scrollbar]:hidden tw:upto-768:[&>li]:shrink-0",
        // "safe center": hàng tràn thì vẫn cuộn được từ nút đầu tiên
        align === "center" && "tw:justify-center-safe",
        className,
      )}
      aria-label={label}
    >
      {categories.map((category) => {
        const isActive = category.slug === activeSlug;
        return (
          <li key={category.id}>
            <button
              type="button"
              className={cx(pill(isActive), focusable)}
              onClick={() => onSelect(category.slug)}
              aria-pressed={isActive}
            >
              {category.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryFilter;
