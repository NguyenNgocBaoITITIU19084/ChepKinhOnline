import type { DailyQuote } from "@/types/article";
import { fontDisplay } from "./styles";
import { cx } from "./utils";

export interface QuoteBoxProps {
  quote: DailyQuote;
  eyebrow?: string;
  className?: string;
}

/**
 * Trích một bài kệ như trang sách in: cột trái ghi nhãn và nguồn kinh, bên phải là
 * bài kệ căn trái và lời bàn ngắn. Không khung, không icon; chỉ một đường kẻ mảnh ngăn hai cột.
 */
export function QuoteBox({ quote, eyebrow, className }: QuoteBoxProps) {
  return (
    // Màn hẹp (≤ 640px): một cột, nhãn và nguồn lên trên, đường kẻ vẫn chạy dọc bên trái bài kệ
    <figure
      className={cx(
        "tw:grid tw:grid-cols-[minmax(0,10.5rem)_minmax(0,1fr)] tw:gap-x-8 tw:m-0 tw:py-4 tw:px-0",
        "tw:upto-640:grid-cols-[minmax(0,1fr)] tw:upto-640:gap-y-[18px] tw:upto-640:py-2",
        className,
      )}
    >
      <figcaption className="tw:flex tw:flex-col tw:gap-2 tw:pt-1.5 tw:upto-640:gap-1 tw:upto-640:pt-0">
        {eyebrow && (
          <span className={cx("tw:text-[1rem] tw:font-semibold tw:leading-[1.35] tw:text-brown-900", fontDisplay)}>
            {eyebrow}
          </span>
        )}
        {/* text-pretty: tránh một chữ lẻ ("2") rơi xuống dòng cuối */}
        <cite className="tw:text-[0.8rem] tw:not-italic tw:leading-[1.5] tw:text-brown-800 tw:text-pretty">{quote.source}</cite>
      </figcaption>
      <div className="tw:min-w-0 tw:pl-8 tw:border-l tw:border-l-[rgba(214,164,64,0.45)] tw:upto-640:pl-[18px]">
        {/* Kiểu chữ `merit-verse` cỡ lớn hơn: Lora nghiêng, giữ ngắt dòng của bài kệ.
            Gỡ viền trái và padding mà style blockquote chung của Tabler áp vào */}
        <blockquote className="tw:m-0 tw:p-0 tw:[border:0] tw:font-[family-name:var(--font-book),Georgia,serif] tw:text-[1.3rem] tw:italic tw:font-normal tw:leading-[1.7] tw:text-brown-900 tw:whitespace-pre-line tw:upto-640:text-[1.12rem]">
          {quote.verse}
        </blockquote>
        {quote.meaning && (
          <p className="tw:max-w-[46ch] tw:mt-5 tw:mx-0 tw:mb-0 tw:text-pretty tw:text-[0.92rem] tw:leading-[1.65] tw:text-brown-800">
            {quote.meaning}
          </p>
        )}
      </div>
    </figure>
  );
}

export default QuoteBox;
