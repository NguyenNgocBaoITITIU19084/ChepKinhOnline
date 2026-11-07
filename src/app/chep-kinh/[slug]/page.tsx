import { cache, Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconBooks } from "@tabler/icons-react";
import { findSutra as findSutraData } from "@/lib/sutra-repo";
import { splitSutraChapters } from "@/lib/sutra";
import { SutraBook } from "@/components/copy/SutraBook";
import { SutraBookSkeleton } from "@/components/copy/SutraBookSkeleton";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { headerButton, hideSm } from "@/components/ui/classes";

export default function CopySutraPage({ params }: PageProps<"/chep-kinh/[slug]">) {
  return (
    <main className="ck-scene ck-scene-bg">
      <SiteHeader
        actions={
          <Link href="/kinh-dien" className={`ck-btn-ghost ${headerButton}`}>
            <IconBooks size={18} stroke={1.7} aria-hidden />
            <span className={hideSm}>Danh sách kinh</span>
          </Link>
        }
      />
      <Suspense fallback={<SutraBookSkeleton />}>
        <SutraContent params={params} />
      </Suspense>
    </main>
  );
}

type SlugParams = Pick<PageProps<"/chep-kinh/[slug]">, "params">;

// Dùng chung một truy vấn cho phần tiêu đề và phần sách trong cùng request
const findSutra = cache((slug: string) => findSutraData(slug));

async function getSutra(params: SlugParams["params"]) {
  const { slug } = await params;
  const sutra = await findSutra(slug);
  if (!sutra) notFound();
  return sutra;
}

async function SutraContent({ params }: SlugParams) {
  const sutra = await getSutra(params);
  return <SutraBook slug={sutra.slug} title={sutra.title} chapters={splitSutraChapters(sutra.content)} />;
}
