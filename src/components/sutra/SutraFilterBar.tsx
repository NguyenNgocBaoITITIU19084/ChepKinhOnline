"use client";

import React, { useId } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { ASPIRATION_TABS } from "@/lib/sutra-catalog-constants";
import type { SutraAspiration } from "@/types/sutra-catalog";
import { pill, focusable } from "@/components/article/styles";

interface SutraFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeAspiration: SutraAspiration;
  onAspirationChange: (val: SutraAspiration) => void;
  totalMatches: number;
}

export function SutraFilterBar({
  searchQuery,
  onSearchChange,
  activeAspiration,
  onAspirationChange,
  totalMatches,
}: SutraFilterBarProps) {
  const inputId = useId();

  return (
    <div className="tw:mb-12 tw:flex tw:flex-col tw:items-center tw:gap-6 tw:w-full">
      {/* Ô tìm kiếm kính mờ viền vàng (Zen Glassmorphic Search Bar) */}
      <div
        className="tw:flex tw:items-center tw:gap-3 tw:w-full tw:max-w-[620px] tw:min-h-12 tw:px-4 tw:bg-[rgba(255,255,255,0.75)] tw:border tw:border-[rgba(214,164,64,0.45)] tw:rounded-[999px] tw:[box-shadow:0_8px_24px_rgba(150,105,25,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] tw:transition-all tw:duration-200 tw:has-[input:focus-visible]:border-gold-500 tw:has-[input:focus-visible]:ring-2 tw:has-[input:focus-visible]:ring-gold-500/30"
      >
        <IconSearch size={18} stroke={2} className="tw:shrink-0 tw:text-gold-700" aria-hidden />
        <label htmlFor={inputId} className="tw:sr-only">
          Tìm kiếm kinh điển
        </label>
        <input
          id={inputId}
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo tên kinh, chữ Hán, tâm nguyện..."
          className="tw:flex-1 tw:min-w-0 tw:border-none tw:bg-transparent tw:p-0 tw:font-ui tw:text-sm sm:tw:text-[15px] tw:text-brown-900 placeholder:tw:text-stone-400 focus:tw:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Xóa từ khóa tìm kiếm"
            className="tw:p-1 tw:rounded-full tw:text-stone-400 hover:tw:text-brown-900 tw:transition-colors focus-visible:tw:outline-none"
          >
            <IconX size={16} aria-hidden />
          </button>
        )}
      </div>

      {/* Dải nút chọn tâm nguyện tu tập theo đúng chuẩn design system */}
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-3 tw:w-full">
        <ul
          role="tablist"
          aria-label="Lọc theo tâm nguyện tu tập"
          className="tw:flex tw:flex-wrap tw:items-center tw:justify-center tw:gap-2 tw:m-0 tw:p-0.5 tw:list-none tw:upto-768:flex-nowrap tw:upto-768:overflow-x-auto tw:upto-768:[scrollbar-width:none] tw:upto-768:[&::-webkit-scrollbar]:hidden tw:upto-768:[&>li]:shrink-0 tw:w-full tw:justify-center-safe"
        >
          {ASPIRATION_TABS.map((tab) => {
            const isActive = activeAspiration === tab.id;
            return (
              <li key={tab.id}>
                <button
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => onAspirationChange(tab.id)}
                  className={`${pill(isActive)} ${focusable}`}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Đếm số bộ kinh hiển thị */}
        <div className="tw:text-xs sm:tw:text-[13px] tw:text-brown-800/80 tw:tracking-wide font-zen-body">
          Hiển thị{" "}
          <span className="tw:font-semibold tw:text-brown-900">{totalMatches}</span>{" "}
          bộ kinh trong án thư
        </div>
      </div>
    </div>
  );
}
