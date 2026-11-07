import React from "react";
import Link from "next/link";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import { LotusIcon, ZenDivider } from "@/components/icons/BuddhistIcons";

export function SutraLibraryHero() {
  return (
    <header className="tw:relative tw:pt-6 tw:pb-8 tw:text-center tw:overflow-hidden">
      {/* Breadcrumb nhẹ nhàng */}
      <nav
        aria-label="Đường dẫn trang"
        className="tw:flex tw:items-center tw:justify-center tw:gap-1.5 tw:text-xs tw:text-stone-500 tw:mb-6 font-zen-body"
      >
        <Link
          href="/"
          className="tw:inline-flex tw:items-center tw:gap-1 hover:tw:text-amber-800 tw:transition-colors"
        >
          <IconHome size={14} aria-hidden stroke={1.5} />
          <span>Trang chủ</span>
        </Link>
        <IconChevronRight size={12} className="tw:text-stone-400" aria-hidden />
        <span className="tw:text-amber-900/80 tw:font-medium">Kho Tàng Kinh Điển</span>
      </nav>

      {/* Hoa sen biểu tượng */}
      <div className="tw:inline-flex tw:items-center tw:justify-center tw:w-12 tw:h-12 tw:rounded-full tw:bg-amber-100/60 tw:text-amber-700 tw:mb-4 tw:border tw:border-amber-400/30 tw:shadow-sm">
        <LotusIcon size={26} strokeWidth={1.5} />
      </div>

      {/* Nhãn nhỏ eyebrow */}
      <p className="tw:text-xs tw:tracking-widest tw:uppercase tw:font-semibold tw:text-amber-800/80 tw:mb-2 font-zen-body">
        Tàng Kinh Các · Pháp Lạc Huân Tu
      </p>

      {/* Tiêu đề chính */}
      <h1 className="tw:text-3xl sm:tw:text-4xl lg:tw:text-5xl tw:font-serif tw:font-semibold tw:text-stone-900 tw:tracking-tight tw:mb-4 font-zen-book">
        Kho Tàng Kinh Điển
      </h1>

      {/* Lời tựa trích kệ */}
      <p className="tw:max-w-2xl tw:mx-auto tw:text-sm sm:tw:text-base tw:text-stone-600 tw:italic tw:leading-relaxed tw:font-serif tw:px-4 font-zen-book">
        &ldquo;Vô thượng thâm thâm vi diệu pháp, bách thiên vạn kiếp nan tao ngộ.
        Mỗi nét chữ chép xuống là một hạt giống bồ đề gieo vào tâm thức.&rdquo;
      </p>

      {/* Zen divider trang nhã */}
      <div className="tw:mt-4">
        <ZenDivider symbol="lotus" className="!tw:my-6" />
      </div>
    </header>
  );
}
