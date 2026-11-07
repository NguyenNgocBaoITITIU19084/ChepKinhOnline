"use client";

import { IconChevronRight } from "@tabler/icons-react";
import type { ArticleCategory, ArticleCategorySlug } from "@/types/article";
import shared from "./shared.module.css";
import styles from "./CategoryList.module.css";
import { cx } from "./utils";

export interface CategoryListProps {
  categories: ArticleCategory[];
  activeSlug: ArticleCategorySlug;
  onSelect: (slug: ArticleCategorySlug) => void;
  title?: string;
  className?: string;
}

/** Ô "Danh mục" cho cột phụ: mỗi dòng có mũi tên, tên chuyên mục và số bài. */
export function CategoryList({ categories, activeSlug, onSelect, title = "Danh mục", className }: CategoryListProps) {
  if (categories.length === 0) return null;

  return (
    <nav className={cx(shared.paperPanel, styles.panel, className)} aria-label={title}>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={styles.list}>
        {categories.map((category) => {
          const isActive = category.slug === activeSlug;
          return (
            <li key={category.id}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(category.slug)}
                className={cx(styles.item, shared.focusable, isActive && styles.active)}
              >
                <IconChevronRight size={16} stroke={2} className={styles.chevron} aria-hidden />
                <span className={styles.label}>{category.label}</span>
                {typeof category.articleCount === "number" && (
                  <span className={styles.count}>
                    {category.articleCount}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CategoryList;
