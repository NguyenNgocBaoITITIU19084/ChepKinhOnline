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
import shared from "./shared.module.css";
import styles from "./ArticleCategoryGrid.module.css";
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
    <section className={cx(styles.section, className)} aria-label={title}>
      <div className={cx(shared.sectionHead, shared.sectionHeadCenter)}>
        {eyebrow && <span className={shared.eyebrow}>{eyebrow}</span>}
        <h2 className={shared.sectionHeading}>{title}</h2>
        {description && <p className={shared.sectionDesc}>{description}</p>}
      </div>

      <ul className={styles.grid}>
        {categories.map((cat) => {
          const isActive = activeSlug === cat.slug;
          const CategoryIcon = (cat.iconName && ICON_MAP[cat.iconName]) || IconBook2;

          return (
            <li key={cat.id}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(cat.slug)}
                className={cx(shared.paperCard, shared.focusable, styles.card, isActive && styles.active)}
              >
                <span className={styles.iconBox} aria-hidden>
                  <CategoryIcon size={18} stroke={2} />
                </span>
                <span className={styles.name}>{cat.label}</span>
                {cat.description && <span className={styles.desc}>{cat.description}</span>}
                <span className={styles.footer}>
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
