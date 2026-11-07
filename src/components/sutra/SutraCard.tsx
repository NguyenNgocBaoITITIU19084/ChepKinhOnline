import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconBook, IconClock, IconPencil } from "@tabler/icons-react";
import type { SutraCatalogItem } from "@/types/sutra-catalog";

interface SutraCardProps {
  sutra: SutraCatalogItem;
}

export function SutraCard({ sutra }: SutraCardProps) {
  return (
    <article className="tw:group tw:relative tw:flex tw:flex-col tw:overflow-hidden tw:rounded-2xl tw:border tw:border-amber-900/15 tw:bg-stone-950 tw:shadow-md hover:tw:shadow-xl hover:tw:border-amber-500/40 tw:transition-all tw:duration-500">
      {/* Khung ảnh tôn tượng tỉ lệ 4:5 */}
      <div className="tw:relative tw:aspect-[4/5] tw:w-full tw:overflow-hidden tw:bg-stone-900">
        <Image
          src={sutra.image}
          alt={`Tôn tượng hoặc tranh minh họa cho ${sutra.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="tw:object-cover tw:transition-transform tw:duration-700 tw:ease-out group-hover:tw:scale-105"
          style={{ objectPosition: sutra.objectPosition || "center 25%" }}
        />

        {/* Lớp gradient trầm ấm để chữ luôn sắc nét */}
        <div className="tw:absolute tw:inset-0 tw:bg-gradient-to-t tw:from-stone-950 tw:via-stone-950/60 tw:to-transparent tw:pointer-events-none" />

        {/* Huy hiệu tâm nguyện & công đức ở góc trên */}
        <div className="tw:absolute tw:top-3.5 tw:left-3.5 tw:right-3.5 tw:flex tw:items-start tw:justify-between tw:gap-2 tw:z-10 tw:pointer-events-none">
          <span className="tw:inline-flex tw:items-center tw:px-2.5 tw:py-1 tw:rounded-full tw:text-xs tw:font-medium tw:text-amber-200 tw:bg-black/50 tw:backdrop-blur-md tw:border tw:border-amber-400/30 tw:shadow-sm font-zen-body">
            {sutra.meritBadge}
          </span>
          <span className="tw:inline-flex tw:items-center tw:px-2 tw:py-0.5 tw:rounded-md tw:text-[11px] tw:text-amber-100/90 tw:bg-amber-950/70 tw:backdrop-blur-sm tw:border tw:border-amber-600/30 font-zen-body">
            {sutra.aspirationLabel}
          </span>
        </div>

        {/* Nội dung đọng lại ở phần dưới thẻ */}
        <div className="tw:absolute tw:bottom-0 tw:left-0 tw:right-0 tw:p-5 tw:z-10 tw:flex tw:flex-col tw:justify-end">
          {/* Tên chữ Hán (nếu có) */}
          {sutra.originalTitle && (
            <p className="tw:text-xs tw:tracking-widest tw:text-amber-200/60 tw:mb-1 tw:font-serif">
              {sutra.originalTitle}
            </p>
          )}

          {/* Tên bộ kinh */}
          <h2 className="tw:text-xl sm:tw:text-2xl tw:font-serif tw:font-medium tw:text-[#faf5ea] tw:leading-snug tw:mb-3 font-zen-book group-hover:tw:text-amber-300 tw:transition-colors">
            <Link href={`/chep-kinh/${sutra.slug}`} className="focus:tw:outline-none">
              <span className="tw:absolute tw:inset-0" aria-hidden="true" />
              {sutra.title}
            </Link>
          </h2>

          {/* Đoạn kệ khai kinh rút gọn */}
          {sutra.verseExcerpt && sutra.verseExcerpt.length > 0 && (
            <div className="tw:mb-4 tw:pl-2.5 tw:border-l tw:border-amber-500/40 tw:text-xs sm:tw:text-[13px] tw:text-stone-300/90 tw:italic tw:leading-relaxed tw:font-serif font-zen-book">
              {sutra.verseExcerpt.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          )}

          {/* Thông số phụ & Nút Chép Kinh */}
          <div className="tw:pt-3 tw:border-t tw:border-stone-800/80 tw:flex tw:items-center tw:justify-between tw:gap-3">
            <div className="tw:flex tw:items-center tw:gap-3 tw:text-xs tw:text-stone-400 font-zen-body">
              <span className="tw:inline-flex tw:items-center tw:gap-1">
                <IconBook size={14} className="tw:text-amber-400/70" aria-hidden />
                <span>{sutra.chapterCount} chương</span>
              </span>
              {sutra.estimatedMinutes && (
                <span className="tw:inline-flex tw:items-center tw:gap-1">
                  <IconClock size={14} className="tw:text-amber-400/70" aria-hidden />
                  <span>~{sutra.estimatedMinutes}p</span>
                </span>
              )}
            </div>

            {/* Nút hành động nổi */}
            <span className="tw:relative tw:z-20 tw:inline-flex tw:items-center tw:gap-1.5 tw:px-3.5 tw:py-1.5 tw:rounded-full tw:text-xs tw:font-medium tw:text-amber-200 tw:bg-amber-950/80 group-hover:tw:bg-amber-500 group-hover:tw:text-stone-950 tw:border tw:border-amber-400/40 group-hover:tw:border-amber-400 tw:transition-all tw:duration-300 font-zen-body">
              <IconPencil size={13} stroke={2} aria-hidden />
              <span>Chép kinh</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
