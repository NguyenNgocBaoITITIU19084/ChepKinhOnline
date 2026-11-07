import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  IconListDetails,
  IconQuote,
  IconSparkles,
} from "@tabler/icons-react";
import { ARTICLE_CATEGORIES, MOCK_ARTICLES } from "@/data/articles-mock";
import type { Article } from "@/types/article";
import {
  ArticleBreadcrumb,
  ArticleComments,
  ArticleGrid,
  ArticleHeader,
  ArticleLayout,
  ArticleReadingBar,
  CategoryList,
  PopularArticles,
  SutraCtaCard,
} from "@/components/article";
import {
  block,
  cover,
  coverImage,
  eyebrow,
  fontDisplay,
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  return (
    <>
      {/* Vòng tròn tiến độ đọc ở góc dưới phải, bấm để lên đầu trang */}
      <ArticleReadingBar title={article.title} />

      <div className={page}>
        <Suspense fallback={null}>
          <ArticleContent article={article} />
        </Suspense>
      </div>
    </>
  );
}

function ArticleSidebar({ article }: { article: Article }) {
  return (
    <>
      {/* Khối danh mục tu học */}
      <CategoryList
        categories={ARTICLE_CATEGORIES}
        activeSlug={article.category}
        baseHref="/tu-hoc"
      />

      {/* Khối bài viết nổi bật / đọc nhiều */}
      <PopularArticles
        articles={MOCK_ARTICLES}
        title="Bài viết nổi bật"
        limit={5}
      />

      {/* Thẻ nhắc chép kinh cột phụ */}
      <SutraCtaCard
        size="sm"
        eyebrow="Chép kinh"
        title="Học pháp sáng tỏ · Chép kinh tịnh tâm"
        description="Đọc hiểu rồi, hãy dành ít phút chép từng câu kinh để lời Phật dạy thấm vào tâm."
        buttonText="Chọn kinh để chép"
        buttonHref="/"
      />
    </>
  );
}

function ArticleContent({ article }: { article: Article }) {
  const related = MOCK_ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id,
  ).slice(0, 3);

  const breadcrumbItems = [
    { label: "Tu học", href: "/tu-hoc" },
    {
      label: article.categoryLabel,
      href: `/tu-hoc?category=${article.category}`,
    },
    { label: article.title },
  ];

  return (
    <>
      <ArticleLayout
        stickySidebar={true}
        sidebar={<ArticleSidebar article={article} />}
        sidebarLabel="Cột danh mục và bài nổi bật"
      >
        <article className="tw:flex tw:flex-col tw:gap-8 tw:w-full tw:min-w-0">
          {/* Breadcrumb điều hướng */}
          <ArticleBreadcrumb items={breadcrumbItems} />

          {/* Tiêu đề & Thông tin bài viết */}
          <ArticleHeader
            eyebrow={article.categoryLabel}
            title={article.title}
            meta={
              <>
                <span>{article.readTime}</span>
                <span aria-hidden>·</span>
                <span>{article.publishedAt}</span>
                {typeof article.viewCount === "number" && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{article.viewCount.toLocaleString("vi-VN")} lượt đọc</span>
                  </>
                )}
              </>
            }
          />

          {/* Ảnh bìa 16:9 */}
          <div
            className={`${cover} tw:aspect-[16/9] tw:rounded-2xl tw:[box-shadow:0_8px_24px_rgba(150,105,25,0.1)]`}
          >
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 820px"
              className={coverImage}
            />
          </div>

          {/* Đoạn mở đầu (Lead excerpt) */}
          <div className="tw:p-5 tw:rounded-2xl tw:bg-[rgba(255,248,230,0.65)] tw:border tw:border-[rgba(214,164,64,0.3)] tw:border-l-4 tw:border-l-gold-500">
            <p className="tw:m-0 tw:text-[1.1rem] tw:leading-[1.8] tw:text-brown-900 tw:italic tw:text-pretty">
              {article.excerpt}
            </p>
          </div>

          {/* Mục lục bài viết (Table of Contents) nếu có sections */}
          {article.sections && article.sections.length > 0 && (
            <nav
              aria-label="Mục lục bài viết"
              className="tw:p-5 tw:rounded-2xl tw:bg-paper tw:border tw:border-[rgba(214,164,64,0.35)] tw:shadow-[0_4px_16px_rgba(150,105,25,0.05)] tw:flex tw:flex-col tw:gap-3"
            >
              <div className="tw:flex tw:items-center tw:gap-2 tw:text-brown-900 tw:font-semibold tw:text-[0.95rem]">
                <IconListDetails size={18} className="tw:text-gold-700" aria-hidden />
                <span>Mục lục bài viết</span>
              </div>
              <ol className="tw:m-0 tw:p-0 tw:list-none tw:flex tw:flex-col tw:gap-2 tw:text-[0.9rem] tw:text-brown-800">
                {article.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="tw:text-brown-800 tw:hover:text-gold-700 tw:transition-colors tw:no-underline tw:hover:underline"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#binh-luan"
                    className="tw:text-brown-800 tw:hover:text-gold-700 tw:transition-colors tw:no-underline tw:hover:underline"
                  >
                    Cảm ngộ & Bình luận ({article.comments?.length ?? 0})
                  </a>
                </li>
              </ol>
            </nav>
          )}

          {/* Thân bài viết: Các đề mục và nội dung chi tiết */}
          {article.sections && article.sections.length > 0 ? (
            <div className="tw:flex tw:flex-col tw:gap-8 tw:pt-2">
              {article.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="tw:flex tw:flex-col tw:gap-4 tw:scroll-mt-24"
                >
                  <h2
                    className={`tw:m-0 tw:text-[1.38rem] tw:font-semibold tw:text-brown-900 tw:pt-2 ${fontDisplay}`}
                  >
                    {section.title}
                  </h2>

                  {section.content.map((p, idx) => (
                    <p
                      key={idx}
                      className="tw:m-0 tw:text-[1.05rem] tw:leading-[1.85] tw:text-brown-900 tw:text-pretty"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Trích dẫn kệ kinh */}
                  {section.quote && (
                    <blockquote className="tw:my-2 tw:p-6 tw:rounded-2xl tw:bg-gradient-to-br tw:from-[rgba(255,248,230,0.85)] tw:to-[rgba(245,235,210,0.5)] tw:border tw:border-[rgba(214,164,64,0.45)] tw:shadow-[0_4px_16px_rgba(150,105,25,0.06)] tw:flex tw:flex-col tw:gap-3 tw:relative">
                      <IconQuote
                        size={32}
                        className="tw:text-gold-500/40 tw:absolute tw:top-4 tw:right-4"
                        aria-hidden
                      />
                      <p
                        className={`tw:m-0 tw:text-[1.12rem] tw:italic tw:leading-[1.8] tw:text-brown-900 tw:relative tw:z-10 ${fontDisplay}`}
                      >
                        “{section.quote.text}”
                      </p>
                      {section.quote.source && (
                        <cite className="tw:text-[0.84rem] tw:font-medium tw:text-gold-700 tw:not-italic tw:self-end">
                          {section.quote.source}
                        </cite>
                      )}
                    </blockquote>
                  )}

                  {/* Hộp chiêm nghiệm thiền định */}
                  {section.callout && (
                    <aside className="tw:my-2 tw:p-5 tw:rounded-2xl tw:bg-[rgba(255,250,240,0.85)] tw:border tw:border-[rgba(214,164,64,0.35)] tw:border-l-4 tw:border-l-gold-700 tw:flex tw:flex-col tw:gap-2">
                      <div className="tw:flex tw:items-center tw:gap-2 tw:font-semibold tw:text-[0.92rem] tw:text-brown-900">
                        <IconSparkles size={17} className="tw:text-gold-700" aria-hidden />
                        <span>{section.callout.title}</span>
                      </div>
                      <p className="tw:m-0 tw:text-[0.92rem] tw:leading-relaxed tw:text-brown-800">
                        {section.callout.text}
                      </p>
                    </aside>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className="tw:flex tw:flex-col tw:gap-4">
              <p className="tw:m-0 tw:text-[1.05rem] tw:leading-[1.85] tw:text-brown-900">
                {article.excerpt}
              </p>
              <p className="tw:m-0 tw:text-[0.92rem] tw:leading-[1.6] tw:text-brown-800">
                Toàn văn bài viết đang được Ban biên tập cập nhật thêm các bản dịch và chú giải chi tiết.
              </p>
            </div>
          )}

          {/* Thẻ kêu gọi chép kinh Bát Nhã nếu có liên kết */}
          {article.relatedSutraSlug && (
            <SutraCtaCard
              eyebrow="Chép kinh tịnh tâm"
              title={article.relatedSutraTitle ?? "Chép bản kinh này"}
              description="Đọc hiểu ý nghĩa sâu xa là một duyên lành, hãy chép từng nét chữ để lời Phật dạy thấm nhuần vào tâm thức."
              buttonText="Chép kinh này ngay"
              buttonHref={`/chep-kinh/${article.relatedSutraSlug}`}
            />
          )}

          {/* Lời kết & Tôn chỉ trang web */}
          <div className="tw:pt-6 tw:pb-2 tw:border-t tw:border-[rgba(214,164,64,0.25)] tw:text-[0.84rem] tw:leading-relaxed tw:text-brown-800/90 tw:italic">
            Biên soạn và chọn lọc bởi Ban biên tập Chép Kinh Online. Nguyện hồi hướng công đức này đến khắp tất cả chúng sinh đều được an lạc và khai mở trí tuệ Bát Nhã.
          </div>

          {/* Phần bình luận & cảm ngộ */}
          <ArticleComments
            articleId={article.id}
            initialComments={article.comments ?? []}
          />
        </article>
      </ArticleLayout>

      {/* Khối bài viết liên quan dưới chân trang */}
      {related.length > 0 && (
        <section className={`${block} tw:pt-6`} aria-label="Bài viết liên quan">
          <div className={sectionHead}>
            <span className={eyebrow}>{article.categoryLabel}</span>
            <h2 className={sectionHeading}>Bài viết liên quan</h2>
          </div>
          <ArticleGrid articles={related} />
        </section>
      )}
    </>
  );
}
