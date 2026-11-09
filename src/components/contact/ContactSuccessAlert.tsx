"use client";

import React, { useEffect, useRef } from "react";
import { IconPencil } from "@tabler/icons-react";
import { fontDisplay, eyebrow } from "@/components/article/styles";
import { SHEET } from "@/components/contact/styles";

export interface ContactSuccessAlertProps {
  /** Họ tên hoặc pháp danh người gửi */
  name: string;
  /** Email nhận hồi âm */
  email: string;
  /** Đặt lại biểu mẫu để viết thư khác */
  onReset: () => void;
  className?: string;
}

/**
 * Hiện ở chỗ lá thư sau khi gửi xong: chữ 隨喜 (tùy hỷ) dọc trong khung viền vàng, lời cảm ơn ngắn
 * và email sẽ nhận hồi âm (kệ hồi hướng đã có ở chân trang). Tiêu đề nhận focus để trình đọc màn hình đọc ngay.
 */
export function ContactSuccessAlert({ name, email, onReset, className = "" }: ContactSuccessAlertProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div role="status" className={`${SHEET} ${className}`.trim()}>
      <div className="tw:grid tw:grid-cols-[auto_minmax(0,1fr)] tw:gap-x-8 tw:upto-640:grid-cols-[minmax(0,1fr)] tw:upto-640:gap-y-6">
        {/* 隨喜: chữ dọc trong khung kép viền vàng, chỉ để trang trí */}
        <div
          aria-hidden
          lang="zh-Hant"
          className="font-zen-han tw:self-start tw:p-1 tw:rounded-[8px] tw:border tw:border-gold-500 tw:upto-640:justify-self-start"
        >
          <span className="tw:block tw:px-2.5 tw:py-3 tw:rounded-[5px] tw:border tw:border-[rgba(214,164,64,0.5)] tw:text-[1.6rem] tw:leading-none tw:tracking-[0.2em] tw:text-gold-700 tw:[writing-mode:vertical-rl] tw:upto-640:[writing-mode:horizontal-tb] tw:upto-640:tracking-[0.1em]">
            隨喜
          </span>
        </div>

        <div className="tw:flex tw:flex-col tw:gap-4 tw:min-w-0">
          <span className={eyebrow}>Thư đã gửi</span>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className={`${fontDisplay} tw:m-0 tw:text-[1.6rem] tw:font-semibold tw:leading-[1.3] tw:text-brown-900 tw:text-balance tw:focus:outline-none`}
          >
            Cảm ơn {name || "bạn"}, Ban biên tập đã nhận được thư.
          </h2>
          <p className="tw:m-0 tw:max-w-[52ch] tw:text-[0.95rem] tw:leading-[1.7] tw:text-brown-800 tw:text-pretty">
            Hồi âm sẽ gửi về <strong className="tw:font-semibold tw:text-brown-900 tw:break-all">{email}</strong>.
          </p>

          <div className="tw:pt-4">
            <button type="button" onClick={onReset} className="ck-btn-ghost tw:cursor-pointer tw:min-h-[40px] tw:px-4">
              <IconPencil size={18} aria-hidden />
              <span>Viết thư khác</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
