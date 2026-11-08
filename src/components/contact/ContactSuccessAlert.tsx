"use client";

import React from "react";
import { IconRotateClockwise, IconCheck } from "@tabler/icons-react";
import { LotusIcon } from "@/components/icons/BuddhistIcons";

// Căn chỉnh tâm hoa sen vừa vặn trục giữa huy hiệu
const LOTUS_NUDGE = "tw:[transform:translateY(-1.5px)]";

export interface ContactSuccessAlertProps {
  /** Họ tên hoặc pháp danh của người gửi */
  name: string;
  /** Hòm thư điện tử của người gửi đã cung cấp */
  email: string;
  /** Hàm callback để đặt lại trạng thái biểu mẫu, cho phép gửi thêm tin */
  onReset: () => void;
  /** Class tuỳ biến cho vùng chứa */
  className?: string;
}

/**
 * Khung Cảm Tạ Hoan Hỷ (ContactSuccessAlert):
 * Hiển thị sau khi người dùng gửi biểu mẫu liên hệ thành công, tri ân bằng thông điệp
 * thanh tịnh và xác nhận hòm thư tiếp nhận phản hồi.
 */
export function ContactSuccessAlert({
  name,
  email,
  onReset,
  className = "",
}: ContactSuccessAlertProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`ck-glass tw:relative tw:isolate tw:overflow-hidden tw:flex tw:flex-col tw:items-center tw:text-center tw:p-6 tw:sm:p-10 tw:rounded-2xl tw:border tw:border-[rgba(214,164,64,0.45)] tw:shadow-[0_12px_36px_-10px_rgba(150,105,25,0.18)] ${className}`.trim()}
    >
      {/* Vầng hào quang kim sắc tỏa sáng phía sau */}
      <div
        className="tw:absolute tw:top-1/2 tw:left-1/2 tw:-translate-x-1/2 tw:-translate-y-1/2 tw:w-[360px] tw:h-[360px] tw:-z-10 tw:bg-[radial-gradient(circle,rgba(240,196,100,0.35)_0%,rgba(240,196,100,0.1)_45%,transparent_70%)] tw:pointer-events-none"
        aria-hidden
      />

      {/* Đóa sen vàng rạng rỡ với huy hiệu vòng tròn đồng tâm */}
      <div className="tw:relative tw:mb-5">
        <div
          className="tw:absolute tw:-inset-2 tw:rounded-full tw:bg-[radial-gradient(circle,rgba(214,164,64,0.3)_0%,transparent_75%)] tw:animate-pulse"
          aria-hidden
        />
        <div
          className="tw:relative tw:grid tw:place-items-center tw:w-20 tw:h-20 tw:rounded-full tw:text-[#8a5c14] tw:bg-[radial-gradient(circle_at_50%_35%,#fffdf6_0%,#fbf1d8_100%)] tw:border tw:border-[rgba(168,116,26,0.6)] tw:[box-shadow:0_0_0_5px_#fffdf8,0_0_0_8px_rgba(214,164,64,0.32),0_16px_32px_-8px_rgba(122,80,14,0.4)]"
          aria-hidden
        >
          <LotusIcon size={38} strokeWidth={1.3} className={LOTUS_NUDGE} />
          {/* Huy hiệu dấu kiểm nhỏ góc dưới */}
          <span className="tw:absolute tw:-bottom-1 tw:-right-1 tw:grid tw:place-items-center tw:w-6 tw:h-6 tw:rounded-full tw:bg-gold-500 tw:text-white tw:border-2 tw:border-white tw:shadow-sm">
            <IconCheck size={14} strokeWidth={2.5} />
          </span>
        </div>
      </div>

      {/* Eyebrow: GỬI THÀNH CÔNG · 圓滿 */}
      <div className="tw:grid tw:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] tw:items-center tw:gap-x-2.5 tw:w-[min(100%,320px)] tw:mb-3 tw:leading-none">
        <span className="tw:flex tw:items-center tw:gap-2 tw:before:flex-1 tw:before:min-w-4 tw:before:h-px tw:before:bg-[linear-gradient(90deg,transparent,rgba(168,116,26,0.7))] tw:before:content-[''] font-zen-body tw:text-[0.68rem] tw:font-semibold tw:tracking-[0.2em] tw:uppercase tw:text-gold-700">
          Gửi Thành Công
        </span>
        <span
          className="tw:w-[3px] tw:h-[3px] tw:rounded-full tw:bg-[rgba(168,116,26,0.6)]"
          aria-hidden
        />
        <span
          className="tw:flex tw:items-center tw:gap-2 tw:after:content-[''] tw:after:flex-1 tw:after:min-w-4 tw:after:h-px tw:after:bg-[linear-gradient(90deg,transparent,rgba(168,116,26,0.7))] tw:after:[transform:scaleX(-1)] font-zen-han tw:text-[0.8rem] tw:tracking-[0.1em] tw:text-[#9b2c1a]"
          lang="zh-Hant"
        >
          圓滿
        </span>
      </div>

      {/* Tiêu đề cảm tạ */}
      <h3 className="font-zen-title tw:text-xl tw:sm:text-2xl tw:font-bold tw:text-brown-900 tw:tracking-tight tw:mb-3">
        Tri Ân Lời Nhắn Của Quý Đạo Hữu
      </h3>

      {/* Lời nhắn tôn kính */}
      <div className="font-zen-body tw:max-w-md tw:text-[0.92rem] tw:sm:text-base tw:leading-relaxed tw:text-brown-800/90 tw:flex tw:flex-col tw:gap-2.5 tw:mb-7">
        <p className="tw:m-0">
          Kính gửi đạo hữu{" "}
          <strong className="tw:font-semibold tw:text-brown-900">
            {name || "quý đạo hữu"}
          </strong>
          , lời nhắn và tâm nguyện của đạo hữu đã được chuyển đến Ban biên tập{" "}
          <span className="font-zen-title tw:font-semibold tw:text-gold-700">
            Chép Kinh Online
          </span>
          .
        </p>
        <p className="tw:m-0">
          Chúng tôi sẽ cẩn trọng đối chiếu kinh văn, thẩm định kỹ thuật và phản hồi sớm nhất qua hòm thư:
        </p>
        <div className="tw:inline-flex tw:items-center tw:justify-center tw:py-1.5 tw:px-3 tw:rounded-lg tw:bg-[#fff9ea] tw:border tw:border-[rgba(214,164,64,0.35)] tw:text-gold-700 tw:font-medium tw:text-sm tw:break-all tw:shadow-inner">
          {email}
        </div>
        <p className="tw:m-0 tw:text-xs tw:sm:text-sm tw:text-brown-800/75 tw:italic tw:mt-1">
          Kính chúc đạo hữu và gia quyến thân tâm thường an lạc, bồ đề tâm kiên cố!
        </p>
      </div>

      {/* Nút gửi thêm lời nhắn khác */}
      <button
        type="button"
        onClick={onReset}
        className="ck-btn-gold tw:cursor-pointer tw:px-6 tw:py-2.5 tw:shadow-md tw:hover:shadow-lg tw:transition-all tw:duration-200"
      >
        <IconRotateClockwise size={18} strokeWidth={2} aria-hidden />
        <span>Gửi thêm lời nhắn khác</span>
      </button>
    </div>
  );
}
