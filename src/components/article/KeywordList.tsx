"use client";

import shared from "./shared.module.css";
import styles from "./PopularArticles.module.css";
import { cx } from "./utils";

export interface KeywordListProps {
  keywords: string[];
  onSelect: (keyword: string) => void;
  /** Từ khóa đang tìm, để đánh dấu nút đang chọn. */
  activeKeyword?: string;
  title?: string;
  className?: string;
}

/** Ô từ khóa cho cột phụ: bấm một từ khóa để tìm, bấm lại để bỏ. */
export function KeywordList({
  keywords,
  onSelect,
  activeKeyword = "",
  title = "Chủ đề được tìm nhiều",
  className,
}: KeywordListProps) {
  if (keywords.length === 0) return null;
  const active = activeKeyword.trim().toLowerCase();

  return (
    <section className={cx(shared.paperPanel, styles.panel, className)} aria-label={title}>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={styles.keywords}>
        {keywords.map((keyword) => {
          const isActive = active === keyword.toLowerCase();
          return (
            <li key={keyword}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(isActive ? "" : keyword)}
                className={cx(shared.pill, shared.focusable, isActive && shared.pillActive)}
              >
                {keyword}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default KeywordList;
