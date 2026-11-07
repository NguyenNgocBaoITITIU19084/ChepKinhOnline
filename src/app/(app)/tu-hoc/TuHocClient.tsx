"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ArticleCategorySlug } from "@/types/article";
import {
  ARTICLE_CATEGORIES,
  MOCK_ARTICLES,
  MOCK_DAILY_QUOTE,
  POPULAR_SEARCH_KEYWORDS,
} from "@/data/articles-mock";
import { filterArticles } from "@/lib/article-filter";
import {
  ArticleGrid,
  ArticleLayout,
  ArticleFeatureBlock,
  ArticleRowList,
  ArticleSearchBar,
  CategoryFilter,
  CategoryList,
  KeywordList,
  PopularArticles,
  QuoteBox,
  SutraCtaCard,
} from "@/components/article";
import { PhotoBanner } from "@/components/layout/PhotoBanner";
import shared from "@/components/article/shared.module.css";
import styles from "./TuHoc.module.css";

const VALID_SLUGS = new Set<ArticleCategorySlug>(
  ARTICLE_CATEGORIES.map((c) => c.slug),
);

function parseCategory(value: string | null): ArticleCategorySlug {
  return value && VALID_SLUGS.has(value as ArticleCategorySlug)
    ? (value as ArticleCategorySlug)
    : "all";
}

const PAGE_TITLE = "Tu học";
const BANNER_IMAGE = "/storage/real/banner_buddha_fullwidth.jpg";
// Lấy khung ảnh lệch lên trên để thấy trọn đầu tượng Phật
const BANNER_POSITION = "62% 22%";
const BANNER_CAPTION = "Đại Phật Thiên Đàn · Lantau, Hồng Kông";
const PAGE_DESC =
  "Giải nghĩa kinh, nghi thức tụng niệm, cẩm nang tu học và lời Phật dạy cho mỗi ngày.";
/** Số bài nhỏ cạnh bài chính trong khối nổi bật. */
const SECONDARY_COUNT = 3;
const ROWS_PAGE_SIZE = 5;

function Sidebar({
  query,
  onKeyword,
  activeCategory,
  onCategory,
}: {
  query: string;
  onKeyword: (keyword: string) => void;
  activeCategory: ArticleCategorySlug;
  onCategory: (slug: ArticleCategorySlug) => void;
}) {
  return (
    <>
      {/* Máy tính: danh mục ở đầu cột phụ. Màn hẹp cột phụ xuống cuối nên dùng hàng nút trong banner */}
      <CategoryList
        categories={ARTICLE_CATEGORIES}
        activeSlug={activeCategory}
        onSelect={onCategory}
        className={styles.desktopOnly}
      />
      <SutraCtaCard
        size="sm"
        eyebrow="Chép kinh"
        title="Học pháp sáng tỏ · Chép kinh tịnh tâm"
        description="Đọc hiểu rồi, hãy dành ít phút chép từng câu kinh để lời Phật dạy thấm vào tâm."
        buttonText="Chọn kinh để chép"
        buttonHref="/"
      />
      <PopularArticles articles={MOCK_ARTICLES} />
      <KeywordList
        keywords={POPULAR_SEARCH_KEYWORDS}
        activeKeyword={query}
        onSelect={onKeyword}
      />
    </>
  );
}

export function TuHocContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = parseCategory(searchParams.get("category"));
  const [searchQuery, setSearchQuery] = useState("");

  // Chuyên mục lấy thẳng từ URL (?category=...), không giữ state riêng
  const handleCategorySelect = (slug: ArticleCategorySlug) => {
    router.replace(slug === "all" ? "/tu-hoc" : `/tu-hoc?category=${slug}`, {
      scroll: false,
    });
  };

  const filtered = useMemo(
    () =>
      filterArticles(MOCK_ARTICLES, {
        category: activeCategory,
        query: searchQuery,
      }),
    [activeCategory, searchQuery],
  );

  const query = searchQuery.trim();
  const category = ARTICLE_CATEGORIES.find((c) => c.slug === activeCategory);
  // Đổi bộ lọc thì danh sách về lại trang đầu
  const listKey = `${activeCategory}|${query}`;

  // Không tìm kiếm: khối nổi bật (1 bài chính + tối đa 3 bài nhỏ), rồi danh sách hàng ngang
  const [lead, ...others] = filtered;
  const secondary = others.slice(0, SECONDARY_COUNT);
  const rows = others.slice(secondary.length);

  return (
    <>
      <PhotoBanner
        size="compact"
        priority
        headingLevel="h1"
        image={BANNER_IMAGE}
        alt="Tượng Đại Phật ngồi thiền trên đỉnh núi giữa trời xanh"
        caption={BANNER_CAPTION}
        eyebrow={activeCategory === "all" ? "Chuyên trang tu học" : PAGE_TITLE}
        title={
          activeCategory === "all" ? (
            <>
              Tu học, <em>soi sáng con đường an lạc</em>
            </>
          ) : (
            <>
              Chuyên mục <em>{category?.label ?? PAGE_TITLE}</em>
            </>
          )
        }
        lead={activeCategory === "all" ? PAGE_DESC : category?.description}
        imagePosition={BANNER_POSITION}
      >
        <div className={styles.bannerTools}>
          <ArticleSearchBar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            placeholder="Tìm bài viết, tên kinh, nghi thức"
          />
          <CategoryFilter
            categories={ARTICLE_CATEGORIES}
            activeSlug={activeCategory}
            onSelect={handleCategorySelect}
            align="center"
            className={styles.mobileOnly}
          />
        </div>
      </PhotoBanner>

      <div className={shared.page}>
        {/* Khối nổi bật trải hết bề rộng nội dung, trên cả cột chính lẫn cột phụ */}
        {!query && lead && (
          <ArticleFeatureBlock lead={lead} items={secondary} />
        )}

        <ArticleLayout
          sidebar={
            <Sidebar
              query={searchQuery}
              onKeyword={setSearchQuery}
              activeCategory={activeCategory}
              onCategory={handleCategorySelect}
            />
          }
        >
          {query ? (
            <section className={shared.block} aria-label="Kết quả tìm kiếm">
              <div className={shared.sectionHead}>
                <h2 className={shared.sectionHeading}>Kết quả tìm kiếm</h2>
                <p className={shared.sectionDesc} aria-live="polite">
                  Tìm thấy {filtered.length} bài với từ khóa “{query}”
                </p>
              </div>
              <ArticleRowList
                key={listKey}
                articles={filtered}
                pageSize={ROWS_PAGE_SIZE}
                label="Kết quả tìm kiếm"
                emptyMessage={`Không có bài nào khớp với “${query}”. Thử từ khóa khác hoặc xóa ô tìm kiếm để xem tất cả.`}
              />
            </section>
          ) : !lead ? (
            <ArticleGrid articles={[]} />
          ) : (
            <>
              {/* Chuyên mục ít bài (không còn bài cho "Bài viết mới") thì cột chính chỉ còn câu kệ */}
              {rows.length === 0 && (
                <QuoteBox quote={MOCK_DAILY_QUOTE} eyebrow="Lời Phật dạy hôm nay" />
              )}
              {rows.length > 0 && (
                <section className={shared.block} aria-label="Bài viết mới">
                  <h2 className={shared.sectionHeading}>Bài viết mới</h2>
                  <ArticleRowList
                    key={listKey}
                    articles={rows}
                    pageSize={ROWS_PAGE_SIZE}
                    interlude={
                      <QuoteBox
                        quote={MOCK_DAILY_QUOTE}
                        eyebrow="Lời Phật dạy hôm nay"
                      />
                    }
                    interludeAfter={3}
                  />
                </section>
              )}
            </>
          )}
        </ArticleLayout>
      </div>
    </>
  );
}

export function TuHocFallback() {
  return (
    <PhotoBanner
      size="compact"
      headingLevel="h1"
      image={BANNER_IMAGE}
      alt="Tượng Đại Phật ngồi thiền trên đỉnh núi giữa trời xanh"
      caption={BANNER_CAPTION}
      eyebrow="Chuyên trang tu học"
      title={
        <>
          Tu học, <em>soi sáng con đường an lạc</em>
        </>
      }
      lead={PAGE_DESC}
      imagePosition={BANNER_POSITION}
    />
  );
}
