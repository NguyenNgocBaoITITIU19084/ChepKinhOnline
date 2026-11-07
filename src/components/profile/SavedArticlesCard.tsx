import Link from "next/link";
import { IconBookmark, IconClock, IconArrowUpRight } from "@tabler/icons-react";
import type { SavedArticle } from "@/types/profile";
import { EmptyState } from "./EmptyState";

interface SavedArticlesCardProps {
  articles: SavedArticle[];
}

export function SavedArticlesCard({ articles }: SavedArticlesCardProps) {
  return (
    <section
      aria-labelledby="saved-articles-heading"
      className="ck-glass tw:rounded-2xl tw:p-6 tw:bg-[rgba(255,253,246,0.95)] tw:border tw:border-[rgba(214,164,64,0.3)] tw:shadow-[0_4px_24px_rgba(107,74,18,0.06)]"
    >
      <div className="tw:flex tw:items-center tw:justify-between tw:mb-4">
        <div className="tw:flex tw:items-center tw:gap-2.5">
          <span className="tw:p-1.5 tw:rounded-lg tw:bg-amber-100 tw:text-amber-800">
            <IconBookmark size={20} stroke={1.8} />
          </span>
          <div>
            <h3
              id="saved-articles-heading"
              className="tw:text-base tw:font-bold tw:text-brown-900 tw:font-serif"
            >
              Bài Học Tự Học Đã Lưu
            </h3>
            <p className="tw:text-xs tw:text-brown-600">
              Kiến thức Phật pháp & cẩm nang tu học đã lưu lại
            </p>
          </div>
        </div>
        <Link
          href="/tu-hoc"
          className="tw:text-xs tw:font-semibold tw:text-amber-800 tw:hover:text-amber-950 tw:hover:underline"
        >
          Khám phá thêm
        </Link>
      </div>

      {articles.length === 0 ? (
        <EmptyState
          title="Chưa có bài viết nào được lưu"
          description="Trong lúc đọc các bài viết tại mục Tự Học, bạn có thể lưu lại để đọc lại bất cứ lúc nào."
          action={{
            label: "Xem mục Tự học",
            href: "/tu-hoc",
          }}
        />
      ) : (
        <div className="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:gap-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/tu-hoc/${article.slug}`}
              className="tw:group tw:p-3.5 tw:rounded-xl tw:bg-white/60 tw:border tw:border-amber-200/50 tw:hover:border-gold-500/70 tw:hover:shadow-sm tw:transition-all tw:flex tw:flex-col tw:justify-between tw:gap-3"
            >
              <div>
                <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:mb-1.5">
                  <span className="tw:text-[0.68rem] tw:font-semibold tw:px-2 tw:py-0.5 tw:rounded-full tw:bg-amber-100/70 tw:text-brown-800">
                    {article.category}
                  </span>
                  <span className="tw:inline-flex tw:items-center tw:gap-1 tw:text-[0.68rem] tw:text-brown-500">
                    <IconClock size={12} /> {article.readTime}
                  </span>
                </div>
                <h4 className="tw:text-xs tw:font-bold tw:text-brown-900 group-hover:tw:text-amber-800 tw:transition-colors tw:line-clamp-2 tw:font-serif">
                  {article.title}
                </h4>
              </div>

              <div className="tw:flex tw:items-center tw:justify-between tw:pt-2 tw:border-t tw:border-amber-100 tw:text-[0.72rem] tw:text-brown-500">
                <span>Đã lưu: {article.savedAt}</span>
                <span className="tw:inline-flex tw:items-center tw:gap-0.5 tw:font-semibold tw:text-amber-700 group-hover:tw:translate-x-0.5 tw:transition-transform">
                  Đọc ngay <IconArrowUpRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
