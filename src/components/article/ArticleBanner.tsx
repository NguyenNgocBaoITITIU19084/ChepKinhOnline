import type { ReactNode } from "react";
import copy from "@/components/copy/copy.module.css";
import shared from "./shared.module.css";
import styles from "./ArticleBanner.module.css";
import { cx } from "./utils";

export interface BannerMetric {
  label: string;
  value: string;
}

export interface ArticleBannerProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  /** Số liệu ngắn dưới tiêu đề. Bỏ trống thì không hiện. */
  metrics?: BannerMetric[];
  /** Nội dung thêm bên dưới, ví dụ thanh tìm kiếm. */
  children?: ReactNode;
  /** Mức tiêu đề: h1 khi banner là đầu trang, h2 khi đặt giữa trang. */
  headingLevel?: "h1" | "h2";
  className?: string;
}

/** Block banner đầu chuyên trang: kính mờ, eyebrow, tiêu đề, mô tả, số liệu. */
export function ArticleBanner({
  title,
  eyebrow,
  subtitle,
  metrics,
  children,
  headingLevel: Heading = "h1",
  className,
}: ArticleBannerProps) {
  return (
    <section className={cx(copy.glass, styles.banner, className)} aria-label={title}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.content}>
        {eyebrow && <span className={shared.eyebrow}>{eyebrow}</span>}
        <Heading className={styles.title}>{title}</Heading>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {metrics && metrics.length > 0 && (
          <ul className={styles.metrics}>
            {metrics.map((metric) => (
              <li key={metric.label} className={styles.metric}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </li>
            ))}
          </ul>
        )}

        {children && <div className={styles.children}>{children}</div>}
      </div>
    </section>
  );
}

export default ArticleBanner;
