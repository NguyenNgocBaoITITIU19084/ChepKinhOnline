"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { SutraCatalogItem, SutraAspiration } from "@/types/sutra-catalog";
import { searchNormalized } from "@/lib/search-utils";
import { SutraFilterBar } from "./SutraFilterBar";
import { SutraCard } from "./SutraCard";
import { SutraEmptyState } from "./SutraEmptyState";

interface SutraCatalogClientProps {
  sutras: SutraCatalogItem[];
}

const VALID_ASPIRATIONS: SutraAspiration[] = ["all", "tri-tue", "cau-an", "cau-sieu", "sam-hoi"];

export function SutraCatalogClient({ sutras }: SutraCatalogClientProps) {
  const searchParams = useSearchParams();
  const paramAspiration = searchParams.get("tam-nguyen") as SutraAspiration | null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAspiration, setSelectedAspiration] = useState<SutraAspiration | null>(null);

  const activeAspiration = useMemo(() => {
    if (selectedAspiration !== null) return selectedAspiration;
    if (paramAspiration && VALID_ASPIRATIONS.includes(paramAspiration)) {
      return paramAspiration;
    }
    return "all";
  }, [selectedAspiration, paramAspiration]);

  const filteredSutras = useMemo(() => {
    return sutras.filter((item) => {
      // 1. Lọc theo nhóm tâm nguyện
      if (activeAspiration !== "all" && item.aspiration !== activeAspiration) {
        return false;
      }

      // 2. Lọc theo từ khóa tìm kiếm (hỗ trợ tiếng Việt không dấu)
      if (searchQuery.trim()) {
        const matchTitle = searchNormalized(item.title, searchQuery);
        const matchOriginal = item.originalTitle ? searchNormalized(item.originalTitle, searchQuery) : false;
        const matchBadge = searchNormalized(item.meritBadge, searchQuery);
        const matchLabel = searchNormalized(item.aspirationLabel, searchQuery);
        const matchDesc = item.description ? searchNormalized(item.description, searchQuery) : false;

        return matchTitle || matchOriginal || matchBadge || matchLabel || matchDesc;
      }

      return true;
    });
  }, [sutras, searchQuery, activeAspiration]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedAspiration("all");
  };

  return (
    <section aria-label="Danh mục các bộ kinh" className="tw:w-full">
      {/* Thanh tìm kiếm & lọc */}
      <SutraFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeAspiration={activeAspiration}
        onAspirationChange={setSelectedAspiration}
        totalMatches={filteredSutras.length}
      />

      {/* Lưới các thẻ kinh: 1 cột điện thoại, 2 cột máy tính bảng, 3 cột máy tính */}
      {filteredSutras.length === 0 ? (
        <SutraEmptyState onReset={handleReset} />
      ) : (
        <div className="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:lg:grid-cols-3 tw:gap-6 tw:lg:gap-7">
          {filteredSutras.map((sutra, idx) => (
            <SutraCard key={sutra.id} sutra={sutra} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
}

export function SutraCatalogSkeleton() {
  return (
    <div className="tw:animate-pulse tw:w-full">
      {/* Search placeholder */}
      <div className="tw:h-12 tw:bg-amber-900/10 tw:rounded-full tw:mb-6 tw:max-w-[620px] tw:mx-auto" />
      {/* Tabs placeholder */}
      <div className="tw:flex tw:justify-center tw:gap-2 tw:mb-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="tw:h-10 tw:w-28 tw:bg-amber-900/10 tw:rounded-full" />
        ))}
      </div>
      {/* Cards placeholder */}
      <div className="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:lg:grid-cols-3 tw:gap-6 tw:lg:gap-7">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="tw:aspect-[3/4.4] tw:rounded-[22px] tw:bg-amber-900/10 tw:border tw:border-amber-900/15"
          />
        ))}
      </div>
    </div>
  );
}
