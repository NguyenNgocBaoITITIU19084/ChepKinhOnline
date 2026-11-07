import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { LotusIcon } from "@/components/icons/BuddhistIcons";

export function ProfileHeader() {
  return (
    <div className="tw:mb-6">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="tw:flex tw:items-center tw:gap-1.5 tw:text-xs tw:text-brown-600 tw:mb-3"
      >
        <Link
          href="/"
          className="tw:hover:text-brown-900 tw:transition-colors tw:no-underline hover:tw:underline"
        >
          Trang chủ
        </Link>
        <IconChevronRight size={14} className="tw:text-brown-400" />
        <span className="tw:text-brown-900 tw:font-semibold" aria-current="page">
          Hồ sơ tu học
        </span>
      </nav>

      {/* Main Title & Subtitle */}
      <div className="tw:flex tw:flex-col tw:sm:flex-row tw:sm:items-center tw:justify-between tw:gap-2">
        <div>
          <div className="tw:flex tw:items-center tw:gap-2">
            <span className="tw:text-gold-600">
              <LotusIcon size={24} strokeWidth={1.6} />
            </span>
            <h1 className="tw:text-2xl tw:sm:text-3xl tw:font-bold tw:text-brown-950 tw:font-serif tw:tracking-tight">
              Hồ Sơ Tu Học & Công Phu
            </h1>
          </div>
          <p className="tw:text-xs tw:sm:text-sm tw:text-brown-700 tw:mt-1">
            Không gian ghi dấu từng nét chữ chánh niệm và công đức tu tập mỗi ngày.
          </p>
        </div>

        <div className="tw:hidden tw:sm:flex tw:items-center tw:gap-2 tw:px-3 tw:py-1.5 tw:rounded-full tw:bg-amber-100/60 tw:border tw:border-amber-300/50 tw:text-xs tw:text-brown-800">
          <span className="tw:size-2 tw:rounded-full tw:bg-emerald-500 tw:animate-ping" />
          <span>Tâm Bồ Đề Kiên Cố</span>
        </div>
      </div>
    </div>
  );
}
