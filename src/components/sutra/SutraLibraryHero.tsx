import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import { LotusIcon } from "@/components/icons/BuddhistIcons";
import type { SutraCatalogItem } from "@/types/sutra-catalog";

const nf = new Intl.NumberFormat("vi-VN");

/**
 * Hero tràn viền: tôn tượng Đại Phật giữa trời, chữ Hán 大藏經 dọc như hoành phi,
 * dải số liệu tàng kinh (stats) được truyền vào qua `stats` để có thể stream sau.
 */
export function SutraLibraryHero({ stats }: { stats?: React.ReactNode }) {
  return (
    <section
      aria-labelledby="tang-kinh-cac-title"
      className="tw:relative tw:isolate tw:w-full tw:overflow-hidden tw:-mt-[72px] tw:pt-[72px] tw:bg-[#120b05]"
    >
      {/* Tôn tượng Đại Phật làm nền */}
      <Image
        src="/storage/real/banner_buddha_fullwidth.jpg"
        alt="Tôn tượng Đại Phật ngồi kiết già trên tòa sen giữa trời mây"
        fill
        preload
        sizes="100vw"
        className="tw:-z-20 tw:object-cover tw:object-[72%_30%] tw:sm:object-[80%_35%] tw:[filter:sepia(0.45)_saturate(0.85)_brightness(0.78)_contrast(1.05)]"
      />
      {/* Lớp màu trầm hương: tối bên trái cho chữ, ấm vàng bên phải quanh tôn tượng */}
      <div className="tw:absolute tw:inset-0 tw:-z-10 tw:bg-[linear-gradient(90deg,#120b05_0%,rgba(18,11,5,0.92)_28%,rgba(18,11,5,0.55)_55%,rgba(18,11,5,0.15)_80%,rgba(18,11,5,0.35)_100%)] tw:upto-768:bg-[linear-gradient(180deg,rgba(18,11,5,0.55)_0%,rgba(18,11,5,0.75)_45%,#120b05_100%)]" />
      <div className="tw:absolute tw:inset-0 tw:-z-10 tw:bg-[radial-gradient(ellipse_45%_60%_at_72%_42%,rgba(236,190,96,0.28),transparent_70%)]" />
      <div className="tw:absolute tw:inset-x-0 tw:bottom-0 tw:h-40 tw:-z-10 tw:bg-gradient-to-t tw:from-[#120b05] tw:to-transparent" />

      {/* Hào quang: các vòng tròn đồng tâm mảnh quanh đầu tượng */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 600"
        className="tw:absolute tw:-z-10 tw:w-[640px] tw:h-[640px] tw:right-[-60px] tw:top-[-40px] tw:opacity-40 tw:upto-768:hidden"
      >
        {[90, 140, 195, 255].map((r, i) => (
          <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="#ecc976" strokeOpacity={0.5 - i * 0.1} strokeWidth="0.8" strokeDasharray={i % 2 ? "2 6" : undefined} />
        ))}
      </svg>

      <div className="tw:relative tw:mx-auto tw:w-full tw:max-w-[1240px] tw:px-4 tw:sm:px-6 tw:lg:px-8 tw:pt-8 tw:pb-14 tw:sm:pb-20">
        {/* Breadcrumb */}
        <nav aria-label="Đường dẫn trang" className="font-zen-body tw:flex tw:items-center tw:gap-1.5 tw:text-xs tw:text-[#f3e6cc]/70">
          <Link href="/" className="tw:inline-flex tw:items-center tw:gap-1 tw:text-[#f3e6cc]/70 tw:no-underline tw:hover:text-[#ecc976] tw:transition-colors">
            <IconHome size={14} aria-hidden stroke={1.5} />
            <span>Trang chủ</span>
          </Link>
          <IconChevronRight size={12} className="tw:text-[#f3e6cc]/40" aria-hidden />
          <span className="tw:text-[#ecc976] tw:font-medium">Tàng Kinh Các</span>
        </nav>

        <div className="tw:flex tw:items-start tw:gap-8 tw:mt-14 tw:sm:mt-20 tw:lg:mt-24">
          {/* Hoành phi chữ Hán dọc */}
          <div
            className="font-zen-han tw:hidden tw:md:flex tw:shrink-0 tw:flex-col tw:items-center tw:gap-3 tw:rounded-[6px] tw:bg-[linear-gradient(180deg,#9a2f19,#6e1d0e)] tw:px-3 tw:py-5 tw:text-[34px] tw:leading-none tw:text-[#f7dc9a] tw:ring-1 tw:ring-[#ecc976]/50 tw:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6),inset_0_0_0_4px_rgba(110,29,14,1),inset_0_0_0_5px_rgba(236,201,118,0.45)]"
            lang="zh-Hant"
            aria-hidden="true"
          >
            <span>大</span>
            <span>藏</span>
            <span>經</span>
          </div>

          <div className="tw:max-w-[620px]">
            <p className="font-zen-body tw:m-0 tw:inline-flex tw:items-center tw:gap-2.5 tw:text-[11px] tw:sm:text-xs tw:font-semibold tw:uppercase tw:tracking-[0.28em] tw:text-[#ecc976]">
              <LotusIcon size={16} strokeWidth={1.5} color="#ecc976" />
              Đại Tạng Kinh · Pháp Bảo Trang Nghiêm
            </p>

            <h1
              id="tang-kinh-cac-title"
              className="font-zen-title tw:mt-5 tw:mb-0 tw:text-[44px] tw:sm:text-[64px] tw:lg:text-[80px] tw:font-semibold tw:leading-[1.02] tw:tracking-tight tw:text-[#fff3d6] tw:[text-shadow:0_2px_30px_rgba(0,0,0,0.5)]"
            >
              Tàng Kinh Các
            </h1>

            <div className="tw:mt-6 tw:flex tw:items-center tw:gap-3" aria-hidden="true">
              <span className="tw:h-px tw:w-16 tw:bg-gradient-to-r tw:from-transparent tw:to-[#ecc976]" />
              <span className="tw:h-1.5 tw:w-1.5 tw:rotate-45 tw:bg-[#ecc976]" />
              <span className="tw:h-px tw:w-40 tw:bg-gradient-to-r tw:from-[#ecc976] tw:to-transparent" />
            </div>

            <blockquote className="font-zen-title tw:mt-6 tw:mb-0 tw:mx-0 tw:text-base tw:sm:text-lg tw:italic tw:leading-relaxed tw:text-[#f3e6cc]/90">
              Vô thượng thâm thâm vi diệu pháp,
              <br />
              Bách thiên vạn kiếp nan tao ngộ.
            </blockquote>
            <p className="font-zen-body tw:mt-4 tw:mb-0 tw:max-w-[520px] tw:text-sm tw:sm:text-[15px] tw:leading-relaxed tw:text-[#e9dcc0]/75">
              Nơi an trí các bộ kinh, chú, sám, kệ để hành giả cung kính biên chép. Mỗi nét chữ là
              một hạt giống bồ đề gieo vào ruộng tâm.
            </p>

            <div className="tw:mt-8 tw:flex tw:flex-wrap tw:items-center tw:gap-3">
              <a href="#phan-loai" className="ck-btn-gold tw:no-underline">
                Thỉnh kinh để chép
              </a>
              <a
                href="#an-kinh"
                className="font-zen-body tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:border tw:border-[#ecc976]/45 tw:px-5 tw:py-2.5 tw:text-sm tw:font-medium tw:text-[#fff3d6] tw:no-underline tw:transition-colors tw:hover:bg-[#ecc976]/10 tw:hover:border-[#ecc976]/80"
              >
                Xem toàn bộ án kinh
              </a>
            </div>
          </div>
        </div>

        {stats}
      </div>
    </section>
  );
}

/** Dải số liệu thật tính từ nội dung các bộ kinh. */
export function SutraLibraryStats({ sutras }: { sutras: SutraCatalogItem[] }) {
  const categories = new Set(sutras.map((s) => s.category)).size;
  const chapters = sutras.reduce((sum, s) => sum + s.chapterCount, 0);
  const words = sutras.reduce((sum, s) => sum + s.wordCount, 0);
  const minutes = sutras.reduce((sum, s) => sum + (s.estimatedMinutes ?? 0), 0);

  const items = [
    { value: nf.format(sutras.length), label: "Bộ kinh an trí", han: "部" },
    { value: nf.format(categories), label: "Tạng phân loại", han: "藏" },
    { value: nf.format(chapters), label: "Phẩm & nghi thức", han: "品" },
    { value: nf.format(words), label: "Chữ kinh để chép", han: "字" },
    { value: new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 }).format(minutes / 60), label: "Giờ biên chép trọn tạng", han: "時" },
  ];

  return (
    <dl className="tw:mt-14 tw:sm:mt-20 tw:m-0 tw:grid tw:grid-cols-2 tw:sm:grid-cols-3 tw:lg:grid-cols-5 tw:border-t tw:border-[#ecc976]/25">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`tw:relative tw:pt-5 tw:pb-1 tw:pr-4 ${i === items.length - 1 ? "tw:col-span-2 tw:sm:col-span-1" : ""}`}
        >
          <span className="font-zen-han tw:absolute tw:right-4 tw:top-4 tw:text-2xl tw:text-[#ecc976]/20" aria-hidden="true" lang="zh-Hant">
            {item.han}
          </span>
          <dd className="font-zen-title tw:m-0 tw:text-3xl tw:sm:text-[40px] tw:font-semibold tw:leading-none tw:tabular-nums tw:text-[#fff3d6]">
            {item.value}
          </dd>
          <dt className="font-zen-body tw:mt-2 tw:text-[11px] tw:sm:text-xs tw:uppercase tw:tracking-[0.16em] tw:text-[#e9dcc0]/65">
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

export function SutraLibraryStatsSkeleton() {
  return (
    <div className="tw:mt-14 tw:sm:mt-20 tw:h-[92px] tw:border-t tw:border-[#ecc976]/25 tw:animate-pulse" aria-hidden="true" />
  );
}
