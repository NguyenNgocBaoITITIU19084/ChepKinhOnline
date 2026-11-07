"use client";

import React, { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type {
  SutraAspiration,
  SutraCatalogItem,
  SutraCategory,
  SutraLength,
  SutraSort,
} from "@/types/sutra-catalog";
import { searchNormalized } from "@/lib/search-utils";
import {
  SUTRA_CATEGORIES,
  VALID_ASPIRATIONS,
  VALID_CATEGORIES,
  VALID_LENGTHS,
  VALID_SORTS,
  matchesLength,
} from "@/lib/sutra-catalog-constants";
import { SutraFilterBar, type SutraFilters } from "./SutraFilterBar";
import { SutraCategoryShowcase } from "./SutraCategoryShowcase";
import { SutraCard } from "./SutraCard";
import { SutraEmptyState } from "./SutraEmptyState";

interface SutraCatalogClientProps {
  sutras: SutraCatalogItem[];
}

// Tên tham số trên URL (giữ `tam-nguyen` cho các liên kết cũ trong menu)
const PARAM = { category: "the-loai", aspiration: "tam-nguyen", length: "thoi-luong", sort: "sap-xep" } as const;
const DEFAULTS: SutraFilters = { category: null, aspiration: "all", length: "all", sort: "mac-dinh" };

function pick<T extends string>(value: string | null, valid: readonly T[], fallback: T): T {
  return value && (valid as readonly string[]).includes(value) ? (value as T) : fallback;
}

const gridClass = "tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:lg:grid-cols-3 tw:gap-6 tw:lg:gap-7";
const nf = new Intl.NumberFormat("vi-VN");

export function SutraCatalogClient({ sutras }: SutraCatalogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Bộ lọc đọc thẳng từ URL: chia sẻ được liên kết, nút back hoạt động, không cần đồng bộ state
  const filters: SutraFilters = useMemo(
    () => ({
      category: pick<SutraCategory | "">(searchParams.get(PARAM.category), VALID_CATEGORIES, "") || null,
      aspiration: pick<SutraAspiration>(searchParams.get(PARAM.aspiration), VALID_ASPIRATIONS, "all"),
      length: pick<SutraLength>(searchParams.get(PARAM.length), VALID_LENGTHS, "all"),
      sort: pick<SutraSort>(searchParams.get(PARAM.sort), VALID_SORTS, "mac-dinh"),
    }),
    [searchParams],
  );

  const updateFilters = useCallback(
    (patch: Partial<SutraFilters>) => {
      const next = { ...filters, ...patch };
      const params = new URLSearchParams();
      (Object.keys(PARAM) as (keyof SutraFilters)[]).forEach((key) => {
        const value = next[key];
        if (value !== null && value !== DEFAULTS[key]) params.set(PARAM[key], String(value));
      });
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [filters, pathname, router],
  );

  const handleReset = useCallback(() => {
    setSearchQuery("");
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  // Chỉ hiện các tạng đang có kinh
  const categories = useMemo(
    () =>
      SUTRA_CATEGORIES.map((c) => ({ ...c, count: sutras.filter((s) => s.category === c.id).length })).filter(
        (c) => c.count > 0,
      ),
    [sutras],
  );

  const filteredSutras = useMemo(() => {
    const q = searchQuery.trim();
    const list = sutras.filter((item) => {
      if (filters.category && item.category !== filters.category) return false;
      if (filters.aspiration !== "all" && item.aspiration !== filters.aspiration) return false;
      if (!matchesLength(item.estimatedMinutes, filters.length)) return false;
      if (q) {
        return (
          searchNormalized(item.title, q) ||
          (item.originalTitle ? searchNormalized(item.originalTitle, q) : false) ||
          searchNormalized(item.meritBadge, q) ||
          searchNormalized(item.aspirationLabel, q) ||
          (item.description ? searchNormalized(item.description, q) : false)
        );
      }
      return true;
    });

    const minutes = (s: SutraCatalogItem) => s.estimatedMinutes ?? 0;
    if (filters.sort === "ngan-truoc") list.sort((a, b) => minutes(a) - minutes(b));
    if (filters.sort === "dai-truoc") list.sort((a, b) => minutes(b) - minutes(a));
    if (filters.sort === "ten") list.sort((a, b) => a.title.localeCompare(b.title, "vi"));
    return list;
  }, [sutras, searchQuery, filters]);

  // Sắp theo tạng kinh thì chia nhóm từng tạng; sắp kiểu khác thì hiện một lưới liền
  const groups = useMemo(() => {
    if (filters.sort !== "mac-dinh") return null;
    return categories
      .map((cat) => ({ cat, items: filteredSutras.filter((s) => s.category === cat.id) }))
      .filter((g) => g.items.length > 0);
  }, [categories, filteredSutras, filters.sort]);

  // Số thứ tự liên tục theo đúng thứ tự hiển thị (qua các nhóm tạng)
  const orderOf = useMemo(() => {
    const ordered = groups ? groups.flatMap((g) => g.items) : filteredSutras;
    return new Map(ordered.map((s, i) => [s.slug, i]));
  }, [groups, filteredSutras]);
  const indexOf = (slug: string) => orderOf.get(slug) ?? 0;

  return (
    <div className="tw:flex tw:flex-col tw:gap-20 tw:sm:gap-24">
      <SutraCategoryShowcase
        categories={categories}
        sutras={sutras}
        active={filters.category}
        onSelect={(category) => {
          // Ô tạng kinh là lối tắt: chỉ giữ thể loại, bỏ các lọc khác để không ra kết quả trống
          setSearchQuery("");
          updateFilters({ category, aspiration: "all", length: "all" });
        }}
      />

      <section id="an-kinh" aria-labelledby="an-kinh-title" className="tw:scroll-mt-28">
        <header className="tw:mb-8 tw:flex tw:flex-col tw:items-center tw:text-center">
          <p className="font-zen-body tw:m-0 tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.28em] tw:text-gold-700">
            Án Kinh Biên Chép
          </p>
          <h2 id="an-kinh-title" className="font-zen-title tw:mt-3 tw:mb-0 tw:text-3xl tw:sm:text-[42px] tw:font-semibold tw:leading-tight tw:text-brown-900">
            Thỉnh Kinh Theo Tâm Nguyện
          </h2>
        </header>

        <SutraFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onChange={updateFilters}
          onReset={handleReset}
          categories={categories}
          totalMatches={filteredSutras.length}
          totalAll={sutras.length}
        />

        <div className="tw:mt-12">
          {filteredSutras.length === 0 ? (
            <SutraEmptyState onReset={handleReset} />
          ) : groups ? (
            <div className="tw:flex tw:flex-col tw:gap-16">
              {groups.map(({ cat, items }) => (
                <section key={cat.id} aria-labelledby={`tang-${cat.id}`}>
                  <div className="tw:mb-7 tw:flex tw:items-center tw:gap-4">
                    <span
                      lang="zh-Hant"
                      aria-hidden="true"
                      className="font-zen-han tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:w-12 tw:h-12 tw:rounded-[6px] tw:bg-[linear-gradient(180deg,#9a2f19,#6e1d0e)] tw:text-[26px] tw:text-[#f7dc9a] tw:ring-1 tw:ring-[#ecc976]/50 tw:shadow-[0_8px_18px_-8px_rgba(110,29,14,0.7)]"
                    >
                      {cat.han}
                    </span>
                    <div className="tw:min-w-0">
                      <h3 id={`tang-${cat.id}`} className="font-zen-title tw:m-0 tw:text-2xl tw:sm:text-[28px] tw:font-semibold tw:leading-tight tw:text-brown-900">
                        {cat.label}
                      </h3>
                      <p className="font-zen-body tw:m-0 tw:mt-1 tw:text-xs tw:sm:text-[13px] tw:text-brown-800/80">
                        {cat.sanskrit} · {items.length} bộ · {nf.format(items.reduce((s, i) => s + i.wordCount, 0))} chữ
                      </p>
                    </div>
                    <span aria-hidden="true" className="tw:hidden tw:sm:block tw:flex-1 tw:h-px tw:bg-gradient-to-r tw:from-[#a8741a]/45 tw:to-transparent" />
                  </div>
                  <div className={gridClass}>
                    {items.map((sutra) => (
                      <SutraCard key={sutra.id} sutra={sutra} index={indexOf(sutra.slug)} categoryHan={cat.han} categoryLabel={cat.label} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className={gridClass}>
              {filteredSutras.map((sutra, idx) => {
                const cat = SUTRA_CATEGORIES.find((c) => c.id === sutra.category);
                return <SutraCard key={sutra.id} sutra={sutra} index={idx} categoryHan={cat?.han} categoryLabel={cat?.label} />;
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function SutraCatalogSkeleton() {
  return (
    <div className="tw:animate-pulse tw:w-full" aria-hidden="true">
      <div className="tw:h-10 tw:w-72 tw:bg-amber-900/10 tw:rounded-full tw:mx-auto tw:mb-10" />
      <div className="tw:grid tw:grid-cols-2 tw:lg:grid-cols-4 tw:gap-5 tw:mb-20">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="tw:h-[260px] tw:rounded-[20px] tw:bg-amber-900/10" />
        ))}
      </div>
      <div className="tw:h-[220px] tw:rounded-[24px] tw:bg-amber-900/10 tw:mb-12" />
      <div className={gridClass}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="tw:aspect-[3/4.4] tw:rounded-[22px] tw:bg-amber-900/10" />
        ))}
      </div>
    </div>
  );
}
