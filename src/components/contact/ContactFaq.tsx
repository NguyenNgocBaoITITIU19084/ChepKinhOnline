import { IconPlus } from "@tabler/icons-react";
import { CONTACT_FAQS } from "@/data/contact-faq";
import { fontDisplay, eyebrow, focusable } from "@/components/article/styles";
import type { FaqItem } from "@/types/contact";

const HAN_NUMERALS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

export interface ContactFaqProps {
  /** Danh sách hỏi đáp, mặc định `CONTACT_FAQS` */
  items?: FaqItem[];
  /** ID của mục mở sẵn, mặc định đóng hết cho gọn */
  defaultOpenId?: string | null;
  className?: string;
}

/**
 * Cột lề bên cạnh lá thư: mục Vấn đáp dàn như trang sách, số thứ tự chữ Hán,
 * gạch mảnh ngăn các câu, không khung, không icon.
 * Đóng/mở bằng <details> gốc của trình duyệt.
 */
export function ContactFaq({
  items = CONTACT_FAQS,
  defaultOpenId = null,
  className = "",
}: ContactFaqProps) {
  return (
    <aside className={className || undefined}>
      {/* Vấn đáp */}
      <section aria-labelledby="faq-heading" className="tw:flex tw:flex-col">
        <span className={eyebrow}>Vấn đáp</span>
        <h2
          id="faq-heading"
          className={`${fontDisplay} tw:mt-1.5 tw:mb-4 tw:text-[1.35rem] tw:font-semibold tw:leading-[1.3] tw:text-brown-900`}
        >
          Những điều hay được hỏi
        </h2>

        <div className="tw:border-t tw:border-t-[rgba(214,164,64,0.35)]">
          {items.map((item, index) => (
            <details
              key={item.id}
              open={item.id === defaultOpenId}
              className="tw:group tw:border-b tw:border-b-[rgba(214,164,64,0.35)]"
            >
              <summary
                className={`tw:grid tw:grid-cols-[1.5rem_minmax(0,1fr)_auto] tw:items-baseline tw:gap-x-3 tw:py-4 tw:cursor-pointer tw:list-none tw:[&::-webkit-details-marker]:hidden tw:rounded-[10px] tw:hover:text-brown-900 ${focusable}`}
              >
                <span aria-hidden lang="zh-Hant" className="font-zen-han tw:text-[0.95rem] tw:text-gold-700">
                  {HAN_NUMERALS[index] ?? index + 1}
                </span>
                <span className={`${fontDisplay} tw:text-[1rem] tw:font-semibold tw:leading-[1.45] tw:text-brown-900`}>
                  {item.question}
                </span>
                <IconPlus
                  size={16}
                  strokeWidth={1.8}
                  aria-hidden
                  className="tw:self-center tw:text-gold-700 tw:transition-transform tw:duration-200 tw:group-open:rotate-45 tw:motion-reduce:transition-none"
                />
              </summary>
              <p className="tw:m-0 tw:pl-[2.25rem] tw:pr-6 tw:pb-5 tw:text-[0.92rem] tw:leading-[1.7] tw:text-brown-800 tw:text-pretty">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </aside>
  );
}
