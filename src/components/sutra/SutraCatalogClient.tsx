"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  const [activeAspiration, setActiveAspiration] = useState<SutraAspiration>(() => {
    return paramAspiration && VALID_ASPIRATIONS.includes(paramAspiration)
      ? paramAspiration
      : "all";
  });

  useEffect(() => {
    if (paramAspiration && VALID_ASPIRATIONS.includes(paramAspiration)) {
      setActiveAspiration(paramAspiration);
    }
  }, [paramAspiration]);

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
    setActiveAspiration("all");
  };

  return (
    <section aria-label="Danh mục các bộ kinh">
      {/* Thanh tìm kiếm & lọc */}
      <SutraFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeAspiration={activeAspiration}
        onAspirationChange={setActiveAspiration}
        totalMatches={filteredSutras.length}
      />

      {/* Lưới các thẻ kinh hoặc Trạng thái trống */}
      {filteredSutras.length === 0 ? (
        <SutraEmptyState onReset={handleReset} />
      ) : (
        <div className="tw:grid tw:grid-cols-1 sm:tw:grid-cols-2 lg:tw:grid-cols-3 tw:gap-6 lg:tw:gap-8">
          {filteredSutras.map((sutra) => (
            <SutraCard key={sutra.id} sutra={sutra} />
          ))}
        </div>
      )}
    </section>
  );
}

export function SutraCatalogSkeleton() {
  return (
    <div className="tw:animate-pulse">
      {/* Search & tab placeholder */}
      <div className="tw:h-12 tw:bg-amber-900/5 tw:rounded-full tw:mb-6 tw:max-w-md" />
      <div className="tw:flex tw:gap-2 tw:mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="tw:h-9 tw:w-28 tw:bg-amber-900/5 tw:rounded-full" />
        ))}
      </div>
      {/* Cards placeholder */}
      <div className="tw:grid tw:grid-cols-1 sm:tw:grid-cols-2 lg:tw:grid-cols-3 tw:gap-6 lg:tw:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="tw:aspect-[4/5] tw:rounded-2xl tw:bg-amber-900/5 tw:border tw:border-amber-900/10"
          />
        ))}
      </div>
    </div>
  );
}
