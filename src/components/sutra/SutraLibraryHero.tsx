import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import { LotusIcon } from "@/components/icons/BuddhistIcons";

export function SutraLibraryHero() {
  return (
    <div className="tw:relative tw:w-full tw:pt-4 tw:pb-8">
      {/* Breadcrumb dẫn hướng */}
      <nav
        aria-label="Đường dẫn trang"
        className="tw:flex tw:items-center tw:gap-1.5 tw:text-xs tw:text-stone-500 tw:mb-6 font-zen-body"
      >
        <Link
          href="/"
          className="tw:inline-flex tw:items-center tw:gap-1 tw:text-stone-500 tw:hover:text-amber-800 tw:transition-colors"
        >
          <IconHome size={14} aria-hidden stroke={1.5} />
          <span>Trang chủ</span>
        </Link>
        <IconChevronRight size={12} className="tw:text-stone-400" aria-hidden />
        <span className="tw:text-amber-900 tw:font-medium">Kho Tàng Kinh Điển</span>
      </nav>

      {/* Khối Banner khung tranh án thư trang nghiêm */}
      <div className="tw:relative tw:w-full tw:h-[260px] tw:sm:h-[300px] tw:rounded-[24px] tw:overflow-hidden tw:shadow-[0_8px_30px_rgba(74,50,10,0.12)] tw:border tw:border-[rgba(214,164,64,0.45)]">
        {/* Ảnh nền án thư bút lông chụp thật */}
        <Image
          src="/storage/real/an_thu_but_long.jpg"
          alt="Án thư kinh tạng, bút lông và giấy xuyến chỉ"
          fill
          priority
          sizes="100vw"
          className="tw:object-cover tw:object-[50%_40%]"
        />

        {/* Lớp phủ chuyển sắc trầm ấm để chữ nổi bật thanh tịnh */}
        <div className="tw:absolute tw:inset-0 tw:bg-gradient-to-t tw:from-[#1c1208]/90 tw:via-[#1c1208]/60 tw:to-[#1c1208]/40" />

        {/* Viền chỉ vàng khung tranh bên trong */}
        <div className="tw:absolute tw:inset-3 tw:rounded-[18px] tw:border tw:border-[#ecc976]/30 tw:pointer-events-none" />

        {/* Nội dung chính trong banner */}
        <div className="tw:relative tw:h-full tw:flex tw:flex-col tw:items-center tw:justify-center tw:text-center tw:px-6 tw:py-8 tw:z-10">
          {/* Huy hiệu hoa sen */}
          <div className="tw:inline-flex tw:items-center tw:gap-2 tw:px-3.5 tw:py-1 tw:rounded-full tw:bg-[#fffdf8]/15 tw:backdrop-blur-md tw:border tw:border-[#ecc976]/40 tw:text-[#fff3dc] tw:text-xs tw:font-semibold tw:tracking-[0.16em] tw:uppercase tw:mb-3 font-zen-body">
            <LotusIcon size={16} strokeWidth={1.5} color="#ecc976" />
            <span>Tàng Kinh Các · Án Thư Huân Tu</span>
          </div>

          {/* Tiêu đề chính */}
          <h1 className="font-zen-title tw:text-2xl tw:sm:text-4xl tw:lg:text-5xl tw:font-semibold tw:text-[#fff8e6] tw:tracking-tight tw:mb-3">
            Kho Tàng Kinh Điển
          </h1>

          {/* Câu trích kệ thiền vị */}
          <p className="font-zen-title tw:max-w-2xl tw:text-xs tw:sm:text-base tw:text-[#f3e6cc]/90 tw:italic tw:leading-relaxed tw:m-0">
            &ldquo;Vô thượng thâm thâm vi diệu pháp, bách thiên vạn kiếp nan tao ngộ.
            Mỗi nét chữ chép xuống là một hạt giống bồ đề gieo vào tâm thức.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
