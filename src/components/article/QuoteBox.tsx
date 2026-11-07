import type { DailyQuote } from "@/types/article";
import styles from "./QuoteBox.module.css";
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
    <figure className={cx(styles.quote, className)}>
      <figcaption className={styles.aside}>
        {eyebrow && <span className={styles.label}>{eyebrow}</span>}
        <cite className={styles.source}>{quote.source}</cite>
      </figcaption>
      <div className={styles.content}>
        <blockquote className={styles.verse}>{quote.verse}</blockquote>
        {quote.meaning && <p className={styles.meaning}>{quote.meaning}</p>}
      </div>
    </figure>
  );
}

export default QuoteBox;
