import React from "react";
import { LotusIcon } from "@/components/icons/BuddhistIcons";

// Căn chỉnh tâm hoa sen để vừa vặn giữa khung tròn huy hiệu
const LOTUS_NUDGE = "tw:[transform:translateY(-1.5px)]";

export interface ContactHeaderProps {
  className?: string;
}

/**
 * Phần đầu trang Liên hệ & Đóng góp ý kiến:
 * Huy hiệu hoa sen tròn có quầng sáng kim, nhãn eyebrow kẻ vàng đối xứng (LẮNG NGHE & TRI ÂN · 傾聽),
 * tiêu đề trang và lời ngỏ thanh tịnh.
 */
export function ContactHeader({ className = "" }: ContactHeaderProps) {
  return (
    <header
      className={`tw:relative tw:isolate tw:flex tw:flex-col tw:items-center tw:text-center tw:pt-4 tw:pb-8 tw:sm:pt-6 tw:sm:pb-10 ${className}`.trim()}
    >
      {/* Quầng sáng kim mềm mại phía sau huy hiệu */}
      <div
        className="tw:absolute tw:top-0 tw:left-1/2 tw:-translate-x-1/2 tw:w-[340px] tw:h-[180px] tw:-z-10 tw:bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(240,196,100,0.3),transparent_70%)] tw:pointer-events-none"
        aria-hidden
      />

      {/* Huy hiệu đóa sen thanh khiết */}
      <div
        className="tw:grid tw:place-items-center tw:w-14 tw:h-14 tw:rounded-full tw:text-[#8a5c14] tw:bg-[radial-gradient(circle_at_50%_35%,#fffdf6_0%,#fbf1d8_100%)] tw:border tw:border-[rgba(168,116,26,0.5)] tw:[box-shadow:0_0_0_4px_#fffdf8,0_0_0_6px_rgba(214,164,64,0.32),0_12px_24px_-8px_rgba(122,80,14,0.35)]"
        aria-hidden
      >
        <LotusIcon size={26} strokeWidth={1.3} className={LOTUS_NUDGE} />
      </div>

      {/* Nhãn eyebrow kẻ vàng đối xứng: LẮNG NGHE & TRI ÂN · 傾聽 */}
      <div className="tw:grid tw:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] tw:items-center tw:gap-x-3 tw:w-[min(100%,380px)] tw:mt-5 tw:mx-auto tw:leading-none">
        <span className="tw:flex tw:items-center tw:gap-3 tw:before:flex-1 tw:before:min-w-5 tw:before:h-px tw:before:bg-[linear-gradient(90deg,transparent,rgba(168,116,26,0.7))] tw:before:content-[''] font-zen-body tw:text-[0.72rem] tw:font-semibold tw:tracking-[0.24em] tw:mr-[-0.24em] tw:uppercase tw:text-gold-700">
          Lắng nghe & Tri ân
        </span>
        <span
          className="tw:w-[3px] tw:h-[3px] tw:rounded-full tw:bg-[rgba(168,116,26,0.6)]"
          aria-hidden
        />
        <span
          className="tw:flex tw:items-center tw:gap-3 tw:after:content-[''] tw:after:flex-1 tw:after:min-w-5 tw:after:h-px tw:after:bg-[linear-gradient(90deg,transparent,rgba(168,116,26,0.7))] tw:after:[transform:scaleX(-1)] font-zen-han tw:text-[0.84rem] tw:tracking-[0.12em] tw:mr-[-0.12em] tw:text-[#9b2c1a]"
          lang="zh-Hant"
        >
          傾聽
        </span>
      </div>

      {/* Tiêu đề chính */}
      <h1 className="font-zen-title tw:mt-4 tw:text-2xl tw:sm:text-3xl tw:lg:text-4xl tw:font-bold tw:tracking-tight tw:text-brown-900 tw:text-balance tw:leading-snug">
        Liên hệ & Đóng góp ý kiến
      </h1>

      {/* Đoạn lời ngỏ thanh tịnh */}
      <p className="font-zen-body tw:mt-3 tw:max-w-2xl tw:text-[0.95rem] tw:sm:text-base tw:leading-relaxed tw:text-brown-800 tw:text-balance tw:opacity-90">
        Mọi đóng góp về hiệu đính bản kinh, đề xuất kinh điển mới hay phản ánh sự cố kỹ thuật của quý đạo hữu đều là duyên lành quý báu giúp Chép Kinh Online ngày một hoàn thiện và trang nghiêm hơn.
      </p>
    </header>
  );
}
