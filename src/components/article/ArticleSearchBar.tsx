"use client";

import { useId } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { focusable, pill } from "./styles";
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
    <div role="search" className={cx("tw:flex tw:flex-col tw:items-center tw:gap-3.5 tw:w-full", className)}>
      {/* Ô kính (glass, shadow-glass). Focus bàn phím đặt lên cả ô để viền vàng bao quanh, không bị cắt */}
      <div
        className={cx(
          "tw:flex tw:items-center tw:gap-2.5 tw:w-full tw:max-w-[640px] tw:min-h-12 tw:pt-0 tw:pr-1.5 tw:pb-0 tw:pl-[18px]",
          "tw:bg-[rgba(255,255,255,0.72)] tw:border tw:border-[rgba(214,164,64,0.45)] tw:rounded-[999px]",
          "tw:[box-shadow:0_8px_24px_rgba(150,105,25,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] tw:[transition:border-color_0.2s_ease]",
          "tw:has-[input:focus-visible]:border-gold-500 tw:has-[input:focus-visible]:outline-2 tw:has-[input:focus-visible]:outline-solid",
          "tw:has-[input:focus-visible]:outline-gold-500 tw:has-[input:focus-visible]:outline-offset-2",
        )}
      >
        <IconSearch size={18} stroke={2} className="tw:shrink-0 tw:text-gold-700" aria-hidden />
        <label
          htmlFor={inputId}
          className="tw:absolute tw:w-px tw:h-px tw:-m-px tw:p-0 tw:overflow-hidden tw:[clip:rect(0_0_0_0)] tw:whitespace-nowrap tw:[border:0]"
        >
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
          // Bỏ nút xóa mặc định của trình duyệt, đã có nút riêng
          className={cx(
            "tw:flex-1 tw:min-w-0 tw:p-0 tw:font-ui tw:text-[1rem] tw:text-brown-900 tw:bg-transparent tw:[border:0] tw:outline-none",
            "tw:placeholder:text-[rgba(107,74,18,0.65)] tw:[&::-webkit-search-cancel-button]:appearance-none",
          )}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className={cx(
              "tw:grid tw:place-items-center tw:shrink-0 tw:w-9 tw:h-9 tw:p-0 tw:text-brown-800 tw:bg-transparent tw:[border:0] tw:rounded-[50%]",
              "tw:cursor-pointer tw:[transition:background-color_0.2s_ease,color_0.2s_ease] tw:hover:text-brown-900 tw:hover:bg-[rgba(232,199,122,0.3)]",
              focusable,
            )}
            aria-label="Xóa từ khóa"
          >
            <IconX size={16} stroke={2} aria-hidden />
          </button>
        )}
      </div>

      {suggestions.length > 0 && (
        <ul
          className="tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:gap-2 tw:m-0 tw:p-0 tw:list-none"
          aria-label="Từ khóa gợi ý"
        >
          <li className="tw:text-[0.8rem] tw:text-brown-800" aria-hidden>
            Gợi ý:
          </li>
          {suggestions.map((keyword) => {
            const isActive = normalized === keyword.toLowerCase();
            return (
              <li key={keyword}>
                <button
                  type="button"
                  onClick={() => onQueryChange(isActive ? "" : keyword)}
                  className={cx(pill(isActive), focusable)}
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
