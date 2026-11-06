import { connection } from "next/server";
import { listSutras } from "@/lib/sutra-repo";
import { SutraCarousel } from "@/components/sutra/SutraCarousel";

export async function SutraList() {
  await connection();
  const sutras = await listSutras();

  if (sutras.length === 0) {
    return (
      <div className="tw:p-12 tw:text-center tw:text-stone-500 tw:bg-[#faf7f0] tw:rounded-xl tw:border tw:border-amber-900/10 font-zen-body">
        Chưa có kinh điển nào trong án thư.
      </div>
    );
  }

  return <SutraCarousel sutras={sutras} />;
}
