"use client";

import React, { useState } from "react";
import { IconChevronDown, IconHelpCircle } from "@tabler/icons-react";
import { CONTACT_FAQS } from "@/data/contact-faq";
import type { FaqItem } from "@/types/contact";

export interface ContactFaqProps {
  /** Danh sách câu hỏi FAQ tuỳ chọn, mặc định sử dụng `CONTACT_FAQS` */
  items?: FaqItem[];
  /** ID của mục mở sẵn ban đầu, mặc định là mục đầu tiên */
  defaultOpenId?: string | null;
  /** Class tuỳ biến cho vùng chứa */
  className?: string;
}

/**
 * Khối Câu Hỏi Thường Gặp (FAQ Accordion):
 * Hiển thị các câu hỏi thường gặp dạng thẻ kính mờ `ck-glass` với tương tác đóng/mở mượt mà.
 */
export function ContactFaq({
  items = CONTACT_FAQS,
  defaultOpenId = CONTACT_FAQS[0]?.id ?? null,
  className = "",
}: ContactFaqProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className={`ck-glass tw:flex tw:flex-col tw:p-5 tw:sm:p-7 tw:rounded-2xl tw:relative tw:overflow-hidden ${className}`.trim()}
    >
      {/* Quầng sáng kim mờ trang trí góc trên */}
      <div
        className="tw:absolute tw:-top-12 tw:-right-12 tw:w-40 tw:h-40 tw:bg-[radial-gradient(circle,rgba(240,196,100,0.25)_0%,transparent_70%)] tw:pointer-events-none tw:-z-0"
        aria-hidden
      />

      {/* Đầu mục FAQ */}
      <div className="tw:relative tw:z-10 tw:mb-6">
        <div className="tw:flex tw:items-center tw:gap-2 tw:text-gold-700 tw:mb-1.5">
          <IconHelpCircle size={18} strokeWidth={1.8} aria-hidden />
          <span className="font-zen-body tw:text-[0.72rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase">
            Giải Đáp Nhanh
          </span>
        </div>
        <h2
          id="faq-heading"
          className="font-zen-title tw:text-xl tw:sm:text-2xl tw:font-bold tw:text-brown-900 tw:tracking-tight tw:m-0"
        >
          Câu Hỏi Thường Gặp
        </h2>
        <p className="font-zen-body tw:text-[0.88rem] tw:text-brown-800/80 tw:mt-1.5 tw:mb-0 tw:leading-relaxed">
          Những thắc mắc phổ biến của đạo hữu trong quá trình tu học và chép kinh.
        </p>
      </div>

      {/* Danh sách accordion items */}
      <div className="tw:relative tw:z-10 tw:flex tw:flex-col tw:gap-3">
        {items.map((item) => {
          const isOpen = openId === item.id;
          const IconComp = item.icon;

          return (
            <div
              key={item.id}
              className={`tw:rounded-xl tw:border tw:transition-all tw:duration-200 ${
                isOpen
                  ? "tw:border-[rgba(214,164,64,0.48)] tw:bg-[#fffdf8] tw:shadow-[0_4px_16px_-4px_rgba(150,105,25,0.08)]"
                  : "tw:border-[rgba(214,164,64,0.22)] tw:bg-[rgba(255,253,248,0.7)] tw:hover:bg-[rgba(255,253,248,0.95)] tw:hover:border-[rgba(214,164,64,0.38)]"
              }`}
            >
              <h3 className="tw:m-0">
                <button
                  type="button"
                  id={`faq-trigger-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className="tw:w-full tw:flex tw:items-center tw:justify-between tw:gap-3.5 tw:p-3.5 tw:sm:p-4 tw:text-left tw:cursor-pointer tw:border-0 tw:bg-transparent tw:rounded-xl tw:focus-visible:outline-2 tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-1"
                >
                  <div className="tw:flex tw:items-center tw:gap-3 tw:min-w-0">
                    {/* Icon đại diện câu hỏi */}
                    {IconComp && (
                      <span
                        className={`tw:grid tw:place-items-center tw:w-9 tw:h-9 tw:shrink-0 tw:rounded-lg tw:border tw:transition-colors tw:duration-200 ${
                          isOpen
                            ? "tw:bg-gold-500 tw:text-white tw:border-gold-700/30"
                            : "tw:bg-[#fbf0d6]/70 tw:text-gold-700 tw:border-[rgba(214,164,64,0.25)]"
                        }`}
                        aria-hidden
                      >
                        {typeof item.icon === "string" ? (
                          <span className="tw:text-sm">{item.icon}</span>
                        ) : (
                          <IconComp size={18} strokeWidth={1.7} />
                        )}
                      </span>
                    )}

                    {/* Câu hỏi */}
                    <span className="font-zen-title tw:text-[0.95rem] tw:sm:text-base tw:font-semibold tw:text-brown-900 tw:leading-snug">
                      {item.question}
                    </span>
                  </div>

                  {/* Nút mũi tên mở/đóng */}
                  <span
                    className={`tw:grid tw:place-items-center tw:w-7 tw:h-7 tw:shrink-0 tw:rounded-full tw:text-gold-700/80 tw:transition-transform tw:duration-300 tw:ease-out ${
                      isOpen ? "tw:rotate-180 tw:bg-gold-100" : ""
                    }`}
                    aria-hidden
                  >
                    <IconChevronDown size={18} strokeWidth={1.8} />
                  </span>
                </button>
              </h3>

              {/* Phần câu trả lời trượt mở */}
              <div
                id={`faq-panel-${item.id}`}
                role="region"
                aria-labelledby={`faq-trigger-${item.id}`}
                className={`tw:grid tw:transition-[grid-template-rows,opacity] tw:duration-300 tw:ease-out ${
                  isOpen
                    ? "tw:grid-rows-[1fr] tw:opacity-100"
                    : "tw:grid-rows-[0fr] tw:opacity-0"
                }`}
              >
                <div className="tw:min-h-0 tw:overflow-hidden">
                  <div className="tw:px-4 tw:pb-4 tw:pt-1 tw:sm:px-5 tw:sm:pb-5">
                    <p className="font-zen-body tw:text-[0.92rem] tw:leading-relaxed tw:text-brown-800/90 tw:m-0">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ghi chú trợ duyên cuối khối FAQ */}
      <div className="tw:relative tw:z-10 tw:mt-6 tw:pt-5 tw:border-t tw:border-[rgba(214,164,64,0.2)] tw:text-center">
        <p className="font-zen-body tw:text-xs tw:sm:text-[0.82rem] tw:text-brown-800/75 tw:m-0 tw:leading-relaxed">
          Đạo hữu chưa tìm thấy câu trả lời phù hợp? Xin vui lòng gửi lời nhắn qua biểu mẫu liên hệ bên cạnh để ban biên tập có duyên hỗ trợ.
        </p>
      </div>
    </section>
  );
}
