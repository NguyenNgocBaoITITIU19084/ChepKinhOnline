import { Suspense } from "react";
import type { Metadata } from "next";
import { getSutraCatalog } from "@/data/sutra-catalog";
import {
  SutraLibraryHero,
  SutraLibraryStats,
  SutraLibraryStatsSkeleton,
} from "@/components/sutra/SutraLibraryHero";
import {
  SutraCatalogClient,
  SutraCatalogSkeleton,
} from "@/components/sutra/SutraCatalogClient";
import { SutraBuddhaBackdrop } from "@/components/sutra/SutraBuddhaBackdrop";
import { SutraGuidanceFooter } from "@/components/sutra/SutraGuidanceFooter";

export const metadata: Metadata = {
  title: "Tàng Kinh Các · Chép Kinh Online",
  description:
    "Tàng kinh các phân loại theo Kinh, Chú, Sám, Kệ: Bát Nhã Tâm Kinh, Chú Đại Bi, Kinh Dược Sư, Kinh Địa Tạng, Từ Bi Thủy Sám... cho hành giả biên chép, huân tu chánh niệm.",
};

async function HeroStatsLoader() {
  const sutras = await getSutraCatalog();
  return <SutraLibraryStats sutras={sutras} />;
}

async function SutraCatalogLoader() {
  const sutras = await getSutraCatalog();
  return <SutraCatalogClient sutras={sutras} />;
}

export default function SutraLibraryPage() {
  return (
    <div className="font-zen-body">
      <SutraLibraryHero
        stats={
          <Suspense fallback={<SutraLibraryStatsSkeleton />}>
            <HeroStatsLoader />
          </Suspense>
        }
      />

      <div className="tw:relative tw:isolate">
        <SutraBuddhaBackdrop />
        <div className="tw:w-full tw:max-w-[1240px] tw:mx-auto tw:px-4 tw:sm:px-6 tw:lg:px-8 tw:pt-16 tw:sm:pt-20 tw:pb-20">
          <Suspense fallback={<SutraCatalogSkeleton />}>
            <SutraCatalogLoader />
          </Suspense>
          <SutraGuidanceFooter />
        </div>
      </div>
    </div>
  );
}
