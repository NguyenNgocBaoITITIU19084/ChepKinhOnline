import { cache, Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconBooks } from "@tabler/icons-react";
import { prisma } from "@/lib/prisma";
import { splitSutraChapters } from "@/lib/sutra";
import { BrandMark } from "@/components/brand/LotusLogo";
import { SutraBook } from "@/components/copy/SutraBook";
import { SutraBookSkeleton } from "@/components/copy/SutraBookSkeleton";
import { SiteNav } from "@/components/layout/SiteNav";
import { UserMenu } from "@/components/layout/UserMenu";
import { getCurrentUser } from "@/lib/auth";
import styles from "@/components/copy/copy.module.css";

export default function CopySutraPage({ params }: PageProps<"/chep-kinh/[slug]">) {
  return (
    <main className={styles.scene}>
      <header className={`${styles.glass} ${styles.siteHeader}`}>
        <Link href="/" className={styles.brandLink} aria-label="Chép Kinh Online - trang chủ">
          <BrandMark size={34} light={false} />
        </Link>
        <SiteNav />
        <nav className={styles.headerActions} aria-label="Tài khoản">
          <Link href="/" className={styles.ghostButton}>
            <IconBooks size={18} /> <span className={styles.hideSm}>Danh sách kinh</span>
          </Link>
          <Suspense fallback={<span className={styles.avatar} aria-hidden />}>
            <HeaderUser />
          </Suspense>
        </nav>
      </header>
      <Suspense fallback={<SutraBookSkeleton />}>
        <SutraContent params={params} />
      </Suspense>
    </main>
  );
}

async function HeaderUser() {
  return <UserMenu user={await getCurrentUser()} />;
}

type SlugParams = Pick<PageProps<"/chep-kinh/[slug]">, "params">;

// Dùng chung một truy vấn cho phần tiêu đề và phần sách trong cùng request
const findSutra = cache((slug: string) =>
  prisma.sutra.findUnique({
    where: { slug, isPublished: true },
    select: { slug: true, title: true, content: true },
  }),
);

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
