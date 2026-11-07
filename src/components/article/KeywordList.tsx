"use client";

import { focusable, paperPanel, panelHeading, pill } from "./styles";
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
    <section
      className={cx(paperPanel, "tw:flex tw:flex-col tw:gap-3 tw:pt-5 tw:px-4 tw:pb-4", className)}
      aria-label={title}
    >
      <h2 className={panelHeading}>{title}</h2>
      {/* Các nút viên thuốc xếp dòng */}
      <ul className="tw:flex tw:flex-wrap tw:gap-2 tw:m-0 tw:py-0 tw:px-1 tw:list-none">
        {keywords.map((keyword) => {
          const isActive = active === keyword.toLowerCase();
          return (
            <li key={keyword}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(isActive ? "" : keyword)}
                className={cx(pill(isActive), focusable)}
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
