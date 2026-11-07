import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { MOCK_ARTICLES } from "@/data/articles-mock";
import { ArticleGrid, ArticleHeader, SutraCtaCard } from "@/components/article";
import copy from "@/components/copy/copy.module.css";
import shared from "@/components/article/shared.module.css";
import styles from "./ArticleDetail.module.css";

type Props = PageProps<"/tu-hoc/[slug]">;

function findArticle(slug: string) {
  return MOCK_ARTICLES.find((a) => a.slug === slug) ?? null;
}

// Cache Components cần ít nhất một tham số để kiểm tra route lúc build
export function generateStaticParams() {
  return MOCK_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return { title: `${article.title} · Chép Kinh Online`, description: article.excerpt };
}

export default function ArticlePage({ params }: Props) {
  return (
    <div className={shared.page}>
      <Suspense fallback={null}>
        <ArticleContent params={params} />
      </Suspense>
    </div>
  );
}

async function ArticleContent({ params }: Pick<Props, "params">) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const related = MOCK_ARTICLES.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);

  return (
    <>
      <article className={styles.article}>
        <Link href="/tu-hoc" className={`${copy.ghostButton} ${styles.back}`}>
          <IconArrowLeft size={18} stroke={2} aria-hidden />
          <span>Về trang tu học</span>
        </Link>

        <ArticleHeader
          eyebrow={article.categoryLabel}
          title={article.title}
          meta={
            <>
              <span>{article.readTime}</span>
              <span aria-hidden>·</span>
              <span>{article.publishedAt}</span>
            </>
          }
        />

        <div className={`${shared.cover} ${styles.cover}`}>
          <Image
            src={article.coverImage}
            alt=""
            fill
            priority
            sizes="(max-width: 860px) 100vw, 820px"
            className={shared.coverImage}
          />
        </div>

        <p className={styles.lead}>{article.excerpt}</p>
        <p className={styles.note}>Toàn văn bài viết đang được biên soạn.</p>

        {article.relatedSutraSlug && (
          <SutraCtaCard
            eyebrow="Chép kinh"
            title={article.relatedSutraTitle ?? "Chép bản kinh này"}
            description="Đọc xong, hãy chép lại bản kinh để lời dạy thấm vào tâm."
            buttonText="Chép kinh này"
            buttonHref={`/chep-kinh/${article.relatedSutraSlug}`}
          />
        )}
      </article>

      {related.length > 0 && (
        <section className={shared.block} aria-label="Bài cùng chuyên mục">
          <div className={shared.sectionHead}>
            <span className={shared.eyebrow}>{article.categoryLabel}</span>
            <h2 className={shared.sectionHeading}>Bài cùng chuyên mục</h2>
          </div>
          <ArticleGrid articles={related} />
        </section>
      )}
    </>
  );
}
