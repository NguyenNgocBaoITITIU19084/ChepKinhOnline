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
  title: "Kho Tàng Kinh Điển · Chép Kinh Online",
  description:
    "Tuyển tập các bộ kinh Đại Thừa, Chú Đại Bi, Kinh Dược Sư, Kinh Địa Tạng, Kinh Sám Hối cho hành giả biên chép, huân tu chánh niệm và nuôi dưỡng an lạc.",
};

async function SutraCatalogLoader() {
  const sutras = await getSutraCatalog();
  return <SutraCatalogClient sutras={sutras} />;
}

export default function SutraLibraryPage() {
  return (
    <main className="tw:min-h-screen tw:pb-20 font-zen-body">
      {/* Banner ảnh tràn viền phía trên */}
      <SutraLibraryHero />

      {/* Nội dung danh mục kinh điển */}
      <div className="tw:max-w-[1240px] tw:mx-auto tw:px-4 sm:tw:px-6 lg:tw:px-8 tw:mt-8">
        <Suspense fallback={<SutraCatalogSkeleton />}>
          <SutraCatalogLoader />
        </Suspense>
        <SutraGuidanceFooter />
      </div>
    </main>
  );
}
