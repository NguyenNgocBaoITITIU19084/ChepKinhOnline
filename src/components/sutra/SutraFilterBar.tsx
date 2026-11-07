"use client";

import React from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { ASPIRATION_TABS } from "@/data/sutra-catalog";
import type { SutraAspiration } from "@/types/sutra-catalog";

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
  return (
    <div className="tw:mb-8 tw:flex tw:flex-col tw:gap-5">
      {/* Hàng tìm kiếm & đếm số lượng */}
      <div className="tw:flex tw:flex-col sm:tw:flex-row tw:items-stretch sm:tw:items-center tw:justify-between tw:gap-4">
        {/* Ô tìm kiếm bo tròn */}
        <div className="tw:relative tw:flex-1 tw:max-w-md">
          <div className="tw:absolute tw:inset-y-0 tw:left-0 tw:pl-3.5 tw:flex tw:items-center tw:pointer-events-none tw:text-amber-800/60">
            <IconSearch size={18} stroke={1.8} aria-hidden />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên kinh, chữ Hán..."
            aria-label="Tìm kiếm kinh điển"
            className="tw:w-full tw:pl-10 tw:pr-9 tw:py-2.5 tw:rounded-full tw:border tw:border-amber-900/15 tw:bg-[#fcfaf7] focus:tw:bg-white tw:text-sm tw:text-stone-800 placeholder:tw:text-stone-400 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-amber-500/20 focus:tw:border-amber-500/40 tw:transition-all font-zen-body"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Xóa tìm kiếm"
              className="tw:absolute tw:inset-y-0 tw:right-0 tw:pr-3 tw:flex tw:items-center tw:text-stone-400 hover:tw:text-stone-600"
            >
              <IconX size={16} aria-hidden />
            </button>
          )}
        </div>

        {/* Đếm số lượng kết quả */}
        <div className="tw:text-xs sm:tw:text-sm tw:text-stone-500 tw:self-end sm:tw:self-center font-zen-body">
          Hiển thị{" "}
          <span className="tw:font-semibold tw:text-amber-900">{totalMatches}</span>{" "}
          bộ kinh
        </div>
      </div>

      {/* Dải nút chọn tâm nguyện tu tập (Scroll ngang mượt mà trên mobile) */}
      <div
        role="tablist"
        aria-label="Lọc theo tâm nguyện tu tập"
        className="tw:flex tw:items-center tw:gap-2 tw:overflow-x-auto tw:pb-1 tw:no-scrollbar"
      >
        {ASPIRATION_TABS.map((tab) => {
          const isActive = activeAspiration === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onAspirationChange(tab.id)}
              className={`tw:shrink-0 tw:px-4 tw:py-2 tw:rounded-full tw:text-xs sm:tw:text-sm tw:font-medium tw:transition-all tw:duration-200 font-zen-body ${
                isActive
                  ? "tw:bg-amber-100 tw:text-amber-950 tw:border tw:border-amber-400 tw:shadow-sm"
                  : "tw:bg-[#faf7f0]/80 tw:text-stone-600 hover:tw:text-stone-900 hover:tw:bg-[#f4efe4] tw:border tw:border-amber-900/10"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
