import { Suspense } from "react";
import type { Metadata } from "next";
import { getSutraCatalog } from "@/data/sutra-catalog";
import { SutraLibraryHero } from "@/components/sutra/SutraLibraryHero";
import {
  SutraCatalogClient,
  SutraCatalogSkeleton,
} from "@/components/sutra/SutraCatalogClient";
import { SutraGuidanceFooter } from "@/components/sutra/SutraGuidanceFooter";

export const metadata: Metadata = {
  title: "Kho Tàng Kinh Điển | Chép Kinh Online",
  description:
    "Tuyển tập các bộ kinh Đại Thừa, Chú Đại Bi, Kinh Dược Sư, Kinh Địa Tạng, Kinh Sám Hối cho hành giả biên chép, huân tu chánh niệm và nuôi dưỡng an lạc.",
};

async function SutraCatalogLoader() {
  const sutras = await getSutraCatalog();
  return <SutraCatalogClient sutras={sutras} />;
}

export default function SutraLibraryPage() {
  return (
    <main className="tw:min-h-screen tw:pb-16 font-zen-body">
      <div className="tw:max-w-6xl tw:mx-auto tw:px-4 sm:tw:px-6 lg:tw:px-8">
        <SutraLibraryHero />
        <Suspense fallback={<SutraCatalogSkeleton />}>
          <SutraCatalogLoader />
        </Suspense>
        <SutraGuidanceFooter />
      </div>
    </main>
  );
}
