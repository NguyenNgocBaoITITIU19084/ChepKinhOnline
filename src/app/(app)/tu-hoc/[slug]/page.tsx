import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { MOCK_ARTICLES } from "@/data/articles-mock";
import { ArticleGrid, ArticleHeader, SutraCtaCard } from "@/components/article";
import {
  block,
  cover,
  coverImage,
  eyebrow,
  page,
  sectionHead,
  sectionHeading,
} from "@/components/article/styles";

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
    <div className={page}>
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
      <article className="tw:flex tw:flex-col tw:gap-8 tw:w-full tw:max-w-[820px] tw:mx-auto tw:my-0">
        <Link href="/tu-hoc" className="ck-btn-ghost tw:self-start">
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

        {/* Ảnh bìa 16:9, góc radius-panel */}
        <div className={`${cover} tw:aspect-[16/9] tw:rounded-2xl tw:[box-shadow:0_8px_24px_rgba(150,105,25,0.1)]`}>
          <Image
            src={article.coverImage}
            alt=""
            fill
            priority
            sizes="(max-width: 860px) 100vw, 820px"
            className={coverImage}
          />
        </div>

        <p className="tw:m-0 tw:text-[1.08rem] tw:leading-[1.8] tw:text-brown-900 tw:text-pretty">{article.excerpt}</p>
        <p className="tw:m-0 tw:text-[0.88rem] tw:leading-[1.6] tw:text-brown-800">Toàn văn bài viết đang được biên soạn.</p>

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
        <section className={block} aria-label="Bài cùng chuyên mục">
          <div className={sectionHead}>
            <span className={eyebrow}>{article.categoryLabel}</span>
            <h2 className={sectionHeading}>Bài cùng chuyên mục</h2>
          </div>
          <ArticleGrid articles={related} />
        </section>
      )}
    </>
  );
}
