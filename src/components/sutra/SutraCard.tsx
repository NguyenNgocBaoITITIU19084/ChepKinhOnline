import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { SutraCatalogItem } from "@/types/sutra-catalog";

interface SutraCardProps {
  sutra: SutraCatalogItem;
  index: number;
  categoryHan?: string;
  categoryLabel?: string;
}

const nf = new Intl.NumberFormat("vi-VN");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function SutraCard({ sutra, index, categoryHan, categoryLabel }: SutraCardProps) {
  return (
    <Link
      href={`/chep-kinh/${sutra.slug}`}
      aria-label={`${sutra.title}, vào chép kinh`}
      className="tw:group tw:relative tw:aspect-[3/4.6] tw:sm:aspect-[3/4.4] tw:rounded-[22px] tw:overflow-hidden tw:bg-[#2a1d10] tw:no-underline tw:shadow-[0_1px_2px_rgba(74,50,10,0.10),0_6px_14px_-6px_rgba(74,50,10,0.22),0_18px_32px_-16px_rgba(74,50,10,0.32)] tw:transition-[translate,box-shadow] tw:duration-500 tw:ease-out tw:hover:-translate-y-1.5 tw:hover:shadow-[0_2px_4px_rgba(74,50,10,0.10),0_14px_24px_-10px_rgba(74,50,10,0.28),0_30px_48px_-20px_rgba(74,50,10,0.42)] tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4 tw:focus-visible:outline-[#d6a440]"
    >
      {/* Ảnh tôn tượng nền */}
      <Image
        src={sutra.image}
        alt={`Tôn tượng hoặc tranh minh họa ${sutra.title}`}
        fill
        className="tw:object-cover tw:transition-transform tw:duration-[1200ms] tw:ease-out tw:group-hover:scale-[1.06]"
        style={{ objectPosition: sutra.objectPosition ?? "center 22%" }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        loading={index < 3 ? "eager" : "lazy"}
      />

      {/* Lớp phủ chuyển màu nâu trà ấm áp để văn tự luôn sáng rõ */}
      <div className="tw:absolute tw:inset-0 tw:bg-gradient-to-t tw:from-[#160e06] tw:via-[#160e06]/60 tw:via-45% tw:to-transparent tw:to-75%" />
      <div className="tw:absolute tw:inset-x-0 tw:top-0 tw:h-28 tw:bg-gradient-to-b tw:from-[#160e06]/50 tw:to-transparent" />

      {/* Khung chỉ vàng tinh tế viền trong như tranh treo thiền môn */}
      <div className="tw:absolute tw:inset-2.5 tw:rounded-[16px] tw:border tw:border-[#ecc976]/25 tw:pointer-events-none tw:transition-colors tw:duration-500 tw:group-hover:border-[#ecc976]/55" />

      {/* Số thứ tự bộ kinh */}
      <span className="tw:absolute tw:top-5 tw:left-5 tw:flex tw:items-center tw:gap-2.5">
        {categoryHan && (
          <span
            lang="zh-Hant"
            aria-hidden="true"
            className="font-zen-han tw:inline-flex tw:items-center tw:justify-center tw:w-8 tw:h-8 tw:rounded-[5px] tw:bg-[#120b05]/55 tw:backdrop-blur-sm tw:text-[16px] tw:text-[#f7dc9a] tw:ring-1 tw:ring-[#ecc976]/45"
          >
            {categoryHan}
          </span>
        )}
        <span className="font-zen-title tw:text-[#fff8e6]/85 tw:text-sm tw:tracking-[0.2em] tw:tabular-nums">
          {pad(index + 1)}
        </span>
        {categoryLabel && <span className="tw:sr-only">{categoryLabel}</span>}
      </span>

      {/* Dải triện đỏ chữ Hán viết dọc góc trên phải */}
      {sutra.originalTitle && (
        <span
          className="font-zen-han tw:absolute tw:top-5 tw:right-5 tw:max-h-[42%] tw:overflow-hidden tw:px-1.5 tw:py-2.5 tw:rounded-[4px] tw:bg-[#8a2a17]/90 tw:text-[#fff3dc] tw:text-[12px] tw:tracking-[0.14em] tw:leading-none tw:shadow-[0_4px_12px_rgba(0,0,0,0.3)] tw:ring-1 tw:ring-[#ecc976]/40"
          style={{ writingMode: "vertical-rl" }}
          lang="zh-Hant"
        >
          {sutra.originalTitle}
        </span>
      )}

      {/* Khối thông tin chi tiết ở chân thẻ */}
      <div className="tw:absolute tw:inset-x-0 tw:bottom-0 tw:p-6 tw:sm:p-7 tw:z-10">
        {/* Nhãn tâm nguyện & pháp môn */}
        <span className="font-zen-body tw:inline-flex tw:items-center tw:gap-2 tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-[#ecc976]">
          <span className="tw:w-5 tw:h-px tw:bg-[#ecc976]/70" aria-hidden="true" />
          {sutra.aspirationLabel}
        </span>

        {/* Tiêu đề bộ kinh */}
        <h3 className="font-zen-title tw:mt-2 tw:text-xl tw:sm:text-2xl tw:font-semibold tw:leading-snug tw:text-[#fff8e6] tw:text-balance tw:group-hover:text-[#ffe9b8] tw:transition-colors">
          {sutra.title}
        </h3>

        {/* Lời tựa kệ hoặc tóm tắt ý nghĩa */}
        {sutra.verseExcerpt && sutra.verseExcerpt.length > 0 ? (
          <div className="font-zen-title tw:mt-2.5 tw:border-l tw:border-[#ecc976]/45 tw:pl-2.5 tw:text-xs tw:sm:text-[13px] tw:italic tw:leading-relaxed tw:text-[#f3e6cc]/85">
            {sutra.verseExcerpt.map((line, idx) => (
              <p key={idx} className="tw:m-0">{line}</p>
            ))}
          </div>
        ) : sutra.description ? (
          <p className="font-zen-body tw:mt-2.5 tw:text-xs tw:sm:text-[13px] tw:leading-relaxed tw:text-[#f3e6cc]/80 tw:line-clamp-2">
            {sutra.description}
          </p>
        ) : null}

        {/* Số liệu bộ kinh: số phẩm, số chữ, thời gian chép */}
        <ul className="font-zen-body tw:m-0 tw:mt-4 tw:p-0 tw:list-none tw:flex tw:flex-wrap tw:gap-x-4 tw:gap-y-1 tw:text-[11.5px] tw:text-[#f3e6cc]/75 tw:tabular-nums">
          <li><span className="tw:text-[#ecc976]">{sutra.chapterCount}</span> phẩm</li>
          {sutra.wordCount > 0 && <li><span className="tw:text-[#ecc976]">{nf.format(sutra.wordCount)}</span> chữ</li>}
          {sutra.estimatedMinutes ? <li>~<span className="tw:text-[#ecc976]">{sutra.estimatedMinutes}</span> phút chép</li> : null}
        </ul>

        {/* Thanh chân thẻ: Huy hiệu công đức & Nút Chép Kinh vàng rực rỡ */}
        <div className="tw:mt-5 tw:pt-4 tw:border-t tw:border-[#ecc976]/20 tw:flex tw:items-center tw:justify-between tw:gap-3">
          <span className="font-zen-body tw:min-w-0 tw:truncate tw:text-xs tw:italic tw:text-[#f3e6cc]/65">
            {sutra.meritBadge}
          </span>
          <span className="font-zen-body tw:shrink-0 tw:whitespace-nowrap tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:border tw:border-[#fff8e6]/60 tw:bg-[#fff8e6] tw:pl-4 tw:pr-3.5 tw:py-2.5 tw:text-[13px] tw:font-semibold tw:leading-none tw:text-[#3d2906] tw:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_16px_-6px_rgba(0,0,0,0.45)] tw:transition-all tw:duration-300 tw:group-hover:border-[#8a5c14]/60 tw:group-hover:bg-[linear-gradient(180deg,#f3d48a_0%,#e0b252_55%,#c99232_100%)] tw:group-hover:shadow-[inset_0_1px_0_rgba(255,250,232,0.9),0_8px_20px_-6px_rgba(201,146,50,0.6)]">
            Vào chép kinh
            <svg
              className="tw:w-3.5 tw:h-3.5 tw:transition-transform tw:duration-300 tw:group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
