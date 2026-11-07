"use client";

import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import type { ArticleCategory, ArticleCategorySlug } from "@/types/article";
import { focusable, paperPanel, panelHeading } from "./styles";
import { cx } from "./utils";

export interface CategoryListProps {
  categories: ArticleCategory[];
  activeSlug?: ArticleCategorySlug;
  onSelect?: (slug: ArticleCategorySlug) => void;
  baseHref?: string;
  getHref?: (category: ArticleCategory) => string;
  title?: string;
  className?: string;
}

/** Ô "Danh mục" cho cột phụ: mỗi dòng có mũi tên, tên chuyên mục và số bài. */
export function CategoryList({
  categories,
  activeSlug,
  onSelect,
  baseHref,
  getHref,
  title = "Danh mục",
  className,
}: CategoryListProps) {
  if (categories.length === 0) return null;

  return (
    <nav className={cx(paperPanel, "tw:flex tw:flex-col tw:gap-1 tw:pt-5 tw:px-4 tw:pb-3", className)} aria-label={title}>
      <h2 className={panelHeading}>{title}</h2>
      <ul className="tw:m-0 tw:p-0 tw:list-none tw:[&>li+li]:[border-top:1px_solid_rgba(214,164,64,0.22)]">
        {categories.map((category) => {
          const isActive = category.slug === activeSlug;
          const href = getHref
            ? getHref(category)
            : baseHref
            ? category.slug === "all"
              ? baseHref
              : `${baseHref}?category=${category.slug}`
            : undefined;
          const itemClasses = cx(
            "tw:group tw:grid tw:grid-cols-[16px_minmax(0,1fr)_auto] tw:items-center tw:gap-2 tw:w-full tw:min-h-11",
            "tw:my-0.5 tw:mx-0 tw:py-0 tw:px-1.5 tw:text-[0.92rem] tw:[font-feature-settings:inherit] tw:text-left tw:[border:0] tw:rounded-[10px] tw:cursor-pointer tw:no-underline",
            "tw:[transition:background-color_0.2s_ease,color_0.2s_ease] tw:motion-reduce:transition-none",
            isActive
              ? "tw:font-semibold tw:text-brown-900 tw:bg-[rgba(232,199,122,0.38)]"
              : "tw:text-brown-800 tw:bg-transparent tw:hover:text-brown-900 tw:hover:bg-[rgba(232,199,122,0.3)]",
            focusable,
          );

          const innerContent = (
            <>
              <IconChevronRight
                size={16}
                stroke={2}
                className="tw:text-gold-700 tw:[transition:transform_0.2s_ease] tw:motion-reduce:transition-none tw:motion-safe:group-hover:[transform:translateX(2px)]"
                aria-hidden
              />
              <span className="tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap">{category.label}</span>
              {typeof category.articleCount === "number" && (
                <span
                  className={cx(
                    "tw:min-w-7 tw:py-0.5 tw:px-2 tw:text-[0.75rem] tw:font-semibold tw:leading-[1.5] tw:text-center tw:rounded-md tw:tabular-nums",
                    isActive
                      ? "tw:text-brown-900 tw:bg-[#fff0c2] tw:[box-shadow:inset_0_0_0_1px_var(--gold-500)]"
                      : "tw:text-[#fdf3dc] tw:bg-brown-900",
                  )}
                >
                  {category.articleCount}
                </span>
              )}
            </>
          );

          return (
            <li key={category.id}>
              {href ? (
                <Link href={href} aria-current={isActive ? "page" : undefined} className={itemClasses}>
                  {innerContent}
                </Link>
              ) : (
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onSelect?.(category.slug)}
                  className={itemClasses}
                >
                  {innerContent}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CategoryList;
