"use client";

import { useId } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import shared from "./shared.module.css";
import styles from "./ArticleSearchBar.module.css";
import { cx } from "./utils";

export interface ArticleSearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  /** Nhãn cho trình đọc màn hình. */
  label?: string;
  placeholder?: string;
  /** Từ khóa gợi ý hiện dưới ô tìm kiếm. */
  suggestions?: string[];
  className?: string;
}

/** Block thanh tìm kiếm: ô nhập có nút xóa và các từ khóa gợi ý. Không tự giữ state. */
export function ArticleSearchBar({
  query,
  onQueryChange,
  label = "Tìm bài viết",
  placeholder = "Tìm bài viết, tên kinh, chủ đề tu học",
  suggestions = [],
  className,
}: ArticleSearchBarProps) {
  const inputId = useId();
  const normalized = query.trim().toLowerCase();

  return (
    <div role="search" className={cx(styles.search, className)}>
      <div className={styles.box}>
        <IconSearch size={18} stroke={2} className={styles.icon} aria-hidden />
        <label htmlFor={inputId} className={styles.visuallyHidden}>
          {label}
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape" && query) onQueryChange("");
          }}
          placeholder={placeholder}
          className={styles.input}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className={cx(styles.clear, shared.focusable)}
            aria-label="Xóa từ khóa"
          >
            <IconX size={16} stroke={2} aria-hidden />
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <ul className={styles.suggestions} aria-label="Từ khóa gợi ý">
          <li className={styles.suggestionsLabel} aria-hidden>
            Gợi ý:
          </li>
          {suggestions.map((keyword) => {
            const isActive = normalized === keyword.toLowerCase();
            return (
              <li key={keyword}>
                <button
                  type="button"
                  onClick={() => onQueryChange(isActive ? "" : keyword)}
                  className={cx(shared.pill, shared.focusable, isActive && shared.pillActive)}
                  aria-pressed={isActive}
                >
                  {keyword}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ArticleSearchBar;
