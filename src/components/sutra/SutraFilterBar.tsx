"use client";

import React, { useId } from "react";
import { IconAdjustmentsHorizontal, IconRotate, IconSearch, IconX } from "@tabler/icons-react";
import { ASPIRATION_TABS, LENGTH_OPTIONS, SORT_OPTIONS } from "@/lib/sutra-catalog-constants";
import type {
  SutraAspiration,
  SutraCategory,
  SutraCategoryInfo,
  SutraLength,
  SutraSort,
} from "@/types/sutra-catalog";

export interface SutraFilters {
  category: SutraCategory | null;
  aspiration: SutraAspiration;
  length: SutraLength;
  sort: SutraSort;
}

interface SutraFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  filters: SutraFilters;
  onChange: (patch: Partial<SutraFilters>) => void;
  onReset: () => void;
  categories: (SutraCategoryInfo & { count: number })[];
  totalMatches: number;
  totalAll: number;
}

const chip = (active: boolean) =>
  `font-zen-body tw:inline-flex tw:items-center tw:gap-1.5 tw:min-h-9 tw:px-3.5 tw:rounded-full tw:border tw:text-[13px] tw:font-medium tw:leading-none tw:whitespace-nowrap tw:cursor-pointer tw:transition-all tw:duration-200 tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2 tw:focus-visible:outline-[#d6a440] ${
    active
      ? "tw:border-[#8a5c14] tw:bg-[linear-gradient(180deg,#3a2510,#24160a)] tw:text-[#fbe7b5] tw:shadow-[0_6px_14px_-8px_rgba(60,35,5,0.8)]"
      : "tw:border-[#a8741a]/30 tw:bg-[#fffcf4]/80 tw:text-brown-900 tw:hover:border-[#a8741a]/70 tw:hover:bg-[#fff6e0]"
  }`;

// Điện thoại: một hàng cuộn ngang; từ md trở lên: xuống dòng
const chipGroup =
  "tw:flex tw:flex-nowrap tw:md:flex-wrap tw:gap-2 tw:overflow-x-auto tw:md:overflow-visible tw:-mx-4 tw:px-4 tw:sm:-mx-6 tw:sm:px-6 tw:md:mx-0 tw:md:px-0 tw:pb-1 tw:md:pb-0 tw:[scrollbar-width:none] tw:[&::-webkit-scrollbar]:hidden";

const groupLabel =
  "font-zen-body tw:shrink-0 tw:w-full tw:md:w-[92px] tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-gold-700";

export function SutraFilterBar({
  searchQuery,
  onSearchChange,
  filters,
  onChange,
  onReset,
  categories,
  totalMatches,
  totalAll,
}: SutraFilterBarProps) {
  const inputId = useId();
  const sortId = useId();
  const hasFilter =
    !!searchQuery.trim() ||
    filters.category !== null ||
    filters.aspiration !== "all" ||
    filters.length !== "all" ||
    filters.sort !== "mac-dinh";

  return (
    <div
      role="search"
      aria-label="Tìm và lọc kinh điển"
      className="tw:relative tw:rounded-[24px] tw:border tw:border-[#d6a440]/40 tw:bg-[#fffdf7]/85 tw:backdrop-blur-md tw:p-4 tw:sm:p-6 tw:shadow-[0_24px_50px_-30px_rgba(120,85,20,0.45),inset_0_1px_0_rgba(255,255,255,0.9)]"
    >
      {/* Hàng 1: ô tìm kiếm + sắp xếp */}
      <div className="tw:flex tw:flex-col tw:sm:flex-row tw:gap-3">
        <div className="tw:flex tw:flex-1 tw:items-center tw:gap-3 tw:min-h-12 tw:px-4 tw:rounded-full tw:border tw:border-[#d6a440]/45 tw:bg-white/90 tw:transition-shadow tw:focus-within:shadow-[0_0_0_3px_rgba(214,164,64,0.25)]">
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
            className="tw:flex-1 tw:min-w-0 tw:border-none tw:bg-transparent tw:p-0 tw:text-sm tw:sm:text-[15px] tw:text-brown-900 tw:placeholder:text-stone-400 tw:focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Xóa từ khóa tìm kiếm"
              className="tw:p-1 tw:rounded-full tw:border-0 tw:bg-transparent tw:cursor-pointer tw:text-stone-400 tw:hover:text-brown-900 tw:transition-colors"
            >
              <IconX size={16} aria-hidden />
            </button>
          )}
        </div>

        <div className="tw:relative tw:flex tw:items-center tw:min-h-12 tw:rounded-full tw:border tw:border-[#d6a440]/45 tw:bg-white/90 tw:pl-4 tw:pr-2 tw:sm:w-[270px]">
          <IconAdjustmentsHorizontal size={17} className="tw:shrink-0 tw:text-gold-700" aria-hidden />
          <label htmlFor={sortId} className="tw:sr-only">
            Sắp xếp
          </label>
          <select
            id={sortId}
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value as SutraSort })}
            className="font-zen-body tw:flex-1 tw:min-w-0 tw:h-11 tw:pl-2.5 tw:pr-1 tw:border-0 tw:bg-transparent tw:text-sm tw:text-brown-900 tw:cursor-pointer tw:focus:outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="tw:mt-5 tw:flex tw:flex-col tw:gap-4">
        {/* Thể loại */}
        <div className="tw:flex tw:flex-wrap tw:md:flex-nowrap tw:items-center tw:gap-x-3 tw:gap-y-2">
          <span className={groupLabel} id={`${inputId}-cat`}>Thể loại</span>
          <div role="group" aria-labelledby={`${inputId}-cat`} className={chipGroup}>
            <button type="button" aria-pressed={filters.category === null} onClick={() => onChange({ category: null })} className={chip(filters.category === null)}>
              Tất cả <span className="tw:opacity-60 tw:tabular-nums">{totalAll}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filters.category === c.id}
                onClick={() => onChange({ category: filters.category === c.id ? null : c.id })}
                className={chip(filters.category === c.id)}
              >
                <span className="font-zen-han tw:text-[15px]" lang="zh-Hant" aria-hidden="true">{c.han}</span>
                {c.label}
                <span className="tw:opacity-60 tw:tabular-nums">{c.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tâm nguyện */}
        <div className="tw:flex tw:flex-wrap tw:md:flex-nowrap tw:items-center tw:gap-x-3 tw:gap-y-2">
          <span className={groupLabel} id={`${inputId}-asp`}>Tâm nguyện</span>
          <div role="group" aria-labelledby={`${inputId}-asp`} className={chipGroup}>
            {ASPIRATION_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={filters.aspiration === t.id}
                title={t.description}
                onClick={() => onChange({ aspiration: t.id })}
                className={chip(filters.aspiration === t.id)}
              >
                {t.id === "all" ? "Tất cả" : t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Độ dài */}
        <div className="tw:flex tw:flex-wrap tw:md:flex-nowrap tw:items-center tw:gap-x-3 tw:gap-y-2">
          <span className={groupLabel} id={`${inputId}-len`}>Thời lượng</span>
          <div role="group" aria-labelledby={`${inputId}-len`} className={chipGroup}>
            {LENGTH_OPTIONS.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={filters.length === l.id}
                onClick={() => onChange({ length: l.id })}
                className={chip(filters.length === l.id)}
              >
                {l.id === "all" ? "Tất cả" : l.label}
                {l.hint && <span className="tw:opacity-60 tw:font-normal">· {l.hint}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chân thanh lọc: số kết quả + xoá lọc */}
      <div className="tw:mt-5 tw:pt-4 tw:border-t tw:border-[#d6a440]/25 tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-3">
        <p className="font-zen-body tw:m-0 tw:text-[13px] tw:text-brown-800" aria-live="polite">
          Đang hiển thị <strong className="tw:text-brown-900 tw:tabular-nums">{totalMatches}</strong> / {totalAll} bộ kinh trong tàng kinh các
        </p>
        {hasFilter && (
          <button
            type="button"
            onClick={onReset}
            className="font-zen-body tw:inline-flex tw:items-center tw:gap-1.5 tw:border-0 tw:bg-transparent tw:p-0 tw:text-[13px] tw:font-semibold tw:text-[#8a2a17] tw:cursor-pointer tw:hover:underline"
          >
            <IconRotate size={15} aria-hidden />
            Xoá bộ lọc
          </button>
        )}
      </div>
    </div>
  );
}
