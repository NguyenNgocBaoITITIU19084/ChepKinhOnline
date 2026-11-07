"use client";

import React from "react";
import type { SutraCatalogItem, SutraCategory, SutraCategoryInfo } from "@/types/sutra-catalog";

const nf = new Intl.NumberFormat("vi-VN");

interface Props {
  categories: SutraCategoryInfo[];
  sutras: SutraCatalogItem[];
  active: SutraCategory | null;
  onSelect: (id: SutraCategory | null) => void;
}

/** Bốn ô tạng kinh lớn như bốn gian kinh các; bấm để lọc nhanh theo thể loại. */
export function SutraCategoryShowcase({ categories, sutras, active, onSelect }: Props) {
  return (
    <section id="phan-loai" aria-labelledby="phan-loai-title" className="tw:scroll-mt-28">
      <header className="tw:text-center tw:max-w-2xl tw:mx-auto">
        <p className="font-zen-body tw:m-0 tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.28em] tw:text-gold-700">
          Phân Loại Pháp Bảo
        </p>
        <h2 id="phan-loai-title" className="font-zen-title tw:mt-3 tw:mb-0 tw:text-3xl tw:sm:text-[42px] tw:font-semibold tw:leading-tight tw:text-brown-900">
          Tứ Tạng Kinh Văn
        </h2>
        <p className="font-zen-body tw:mt-3 tw:mb-0 tw:text-sm tw:sm:text-[15px] tw:leading-relaxed tw:text-brown-800">
          Kinh, Chú, Sám, Kệ được an trí riêng từng gian. Chọn một tạng để thỉnh các bộ kinh thuộc tạng ấy.
        </p>
      </header>

      <ul className="tw:m-0 tw:mt-10 tw:p-0 tw:list-none tw:grid tw:grid-cols-2 tw:lg:grid-cols-4 tw:gap-3 tw:sm:gap-5">
        {categories.map((cat) => {
          const items = sutras.filter((s) => s.category === cat.id);
          const words = items.reduce((sum, s) => sum + s.wordCount, 0);
          const isActive = active === cat.id;
          return (
            <li key={cat.id}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  onSelect(isActive ? null : cat.id);
                  document.getElementById("an-kinh")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`tw:group tw:relative tw:isolate tw:w-full tw:h-full tw:min-h-[220px] tw:sm:min-h-[280px] tw:overflow-hidden tw:rounded-[20px] tw:p-5 tw:sm:p-7 tw:text-left tw:cursor-pointer tw:border tw:transition-all tw:duration-500 tw:bg-[linear-gradient(165deg,#2b1a0b_0%,#1a0f06_70%)] tw:shadow-[0_20px_40px_-24px_rgba(60,35,5,0.7)] tw:hover:-translate-y-1 tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4 tw:focus-visible:outline-[#d6a440] ${
                  isActive
                    ? "tw:border-[#ecc976] tw:ring-2 tw:ring-[#ecc976]/50"
                    : "tw:border-[#ecc976]/20 tw:hover:border-[#ecc976]/55"
                }`}
              >
                {/* Chữ Hán khổng lồ chìm làm nền */}
                <span
                  aria-hidden="true"
                  lang="zh-Hant"
                  className="font-zen-han tw:absolute tw:-right-4 tw:-bottom-10 tw:-z-10 tw:text-[180px] tw:sm:text-[230px] tw:leading-none tw:text-[#ecc976]/[0.07] tw:transition-all tw:duration-700 tw:group-hover:text-[#ecc976]/[0.12] tw:group-hover:scale-105"
                >
                  {cat.han}
                </span>
                <span aria-hidden="true" className="tw:absolute tw:inset-2 tw:rounded-[14px] tw:border tw:border-[#ecc976]/10 tw:pointer-events-none" />

                <span
                  lang="zh-Hant"
                  aria-hidden="true"
                  className="font-zen-han tw:inline-flex tw:items-center tw:justify-center tw:w-12 tw:h-12 tw:sm:w-14 tw:sm:h-14 tw:rounded-[6px] tw:bg-[linear-gradient(180deg,#9a2f19,#6e1d0e)] tw:text-[26px] tw:sm:text-[30px] tw:text-[#f7dc9a] tw:ring-1 tw:ring-[#ecc976]/50 tw:shadow-[0_8px_18px_-8px_rgba(0,0,0,0.6)]"
                >
                  {cat.han}
                </span>

                <span className="font-zen-body tw:block tw:mt-5 tw:text-[10px] tw:sm:text-[11px] tw:uppercase tw:tracking-[0.18em] tw:text-[#ecc976]/80">
                  {cat.sanskrit}
                </span>
                <span className="font-zen-title tw:block tw:mt-1.5 tw:text-xl tw:sm:text-[26px] tw:font-semibold tw:text-[#fff3d6]">
                  {cat.label}
                </span>
                <span className="font-zen-body tw:hidden tw:sm:block tw:mt-2 tw:text-[13px] tw:leading-relaxed tw:text-[#e9dcc0]/70">
                  {cat.description}
                </span>

                <span className="font-zen-body tw:mt-5 tw:pt-4 tw:flex tw:items-baseline tw:justify-between tw:gap-2 tw:border-t tw:border-[#ecc976]/15 tw:text-[#e9dcc0]/80">
                  <span>
                    <span className="font-zen-title tw:text-2xl tw:sm:text-3xl tw:font-semibold tw:text-[#fff3d6] tw:tabular-nums">{items.length}</span>
                    <span className="tw:ml-1.5 tw:text-xs">bộ</span>
                  </span>
                  <span className="tw:text-[11px] tw:sm:text-xs tw:tabular-nums">{nf.format(words)} chữ</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
