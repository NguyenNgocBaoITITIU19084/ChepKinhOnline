"use client";

import React, { useState, useMemo } from "react";
import type { SutraCatalogItem, SutraAspiration } from "@/types/sutra-catalog";
import { searchNormalized } from "@/data/sutra-catalog";
import { SutraFilterBar } from "./SutraFilterBar";
import { SutraCard } from "./SutraCard";
import { SutraEmptyState } from "./SutraEmptyState";

interface SutraCatalogClientProps {
  sutras: SutraCatalogItem[];
}

export function SutraCatalogClient({ sutras }: SutraCatalogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeAspiration, setActiveAspiration] = useState<SutraAspiration>("all");

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
