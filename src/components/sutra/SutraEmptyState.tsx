import React from "react";
import { LotusIcon } from "@/components/icons/BuddhistIcons";
import { IconRotate } from "@tabler/icons-react";

interface SutraEmptyStateProps {
  onReset: () => void;
}

export function SutraEmptyState({ onReset }: SutraEmptyStateProps) {
  return (
    <div className="tw:py-16 tw:px-6 tw:text-center tw:rounded-2xl tw:border tw:border-amber-900/10 tw:bg-[#faf7f0]/60 tw:backdrop-blur-sm tw:my-8 tw:max-w-xl tw:mx-auto">
      <div className="tw:inline-flex tw:items-center tw:justify-center tw:w-16 tw:h-16 tw:rounded-full tw:bg-amber-100/50 tw:text-amber-800/60 tw:mb-4">
        <LotusIcon size={34} strokeWidth={1.3} />
      </div>

      <h3 className="tw:text-lg sm:tw:text-xl tw:font-serif tw:font-medium tw:text-stone-800 tw:mb-2 font-zen-book">
        Chưa tìm thấy bộ kinh phù hợp
      </h3>

      <p className="tw:text-sm tw:text-stone-600 tw:max-w-md tw:mx-auto tw:mb-6 tw:leading-relaxed font-zen-body">
        Quý đạo hữu có thể thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục
        &ldquo;Tất cả kinh điển&rdquo; để xem trọn vẹn tàng kinh các.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="tw:inline-flex tw:items-center tw:gap-2 tw:px-5 tw:py-2.5 tw:rounded-full tw:text-sm tw:font-medium tw:text-amber-900 tw:bg-amber-100 hover:tw:bg-amber-200 tw:border tw:border-amber-400/40 tw:shadow-sm tw:transition-colors font-zen-body"
      >
        <IconRotate size={16} aria-hidden />
        <span>Xem tất cả kinh điển</span>
      </button>
    </div>
  );
}
