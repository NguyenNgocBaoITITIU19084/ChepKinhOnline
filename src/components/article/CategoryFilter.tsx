"use client";

import type { ArticleCategory, ArticleCategorySlug } from "@/types/article";
import shared from "./shared.module.css";
import styles from "./CategoryFilter.module.css";
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
    <ul className={cx(styles.bar, align === "center" && styles.center, className)} aria-label={label}>
      {categories.map((category) => {
        const isActive = category.slug === activeSlug;
        return (
          <li key={category.id}>
            <button
              type="button"
              className={cx(shared.pill, shared.focusable, isActive && shared.pillActive)}
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
