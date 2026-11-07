import type { ReactNode } from "react";
import { eyebrow as eyebrowClass, fontDisplay } from "./styles";
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
    // Nền kính lấy từ `ck-glass` (src/styles/ui.css), ở đây chỉ bố cục
    <section
      className={cx(
        "ck-glass tw:relative tw:overflow-hidden tw:py-12 tw:px-8 tw:text-center tw:upto-768:py-8 tw:upto-768:px-4",
        className,
      )}
      aria-label={title}
    >
      {/* Quầng sáng `glow` phía trên */}
      <div
        className="tw:absolute tw:top-[-60px] tw:inset-x-0 tw:bottom-auto tw:h-[220px] tw:bg-[radial-gradient(ellipse_45%_100%_at_50%_0%,rgba(240,196,100,0.34),transparent_70%)] tw:pointer-events-none"
        aria-hidden
      />
      <div className="tw:relative tw:flex tw:flex-col tw:items-center tw:gap-3.5 tw:max-w-[760px] tw:mx-auto tw:my-0">
        {eyebrow && <span className={eyebrowClass}>{eyebrow}</span>}
        <Heading
          className={cx(
            "tw:m-0 tw:text-[length:clamp(2rem,4.5vw,3rem)] tw:font-semibold tw:leading-[1.2] tw:text-brown-900 tw:text-balance",
            fontDisplay,
          )}
        >
          {title}
        </Heading>
        {subtitle && (
          <p className="tw:max-w-[640px] tw:m-0 tw:text-[1.02rem] tw:leading-[1.7] tw:text-brown-800 tw:text-pretty">{subtitle}</p>
        )}

        {/* Số liệu, ngăn trên bằng glass-border */}
        {metrics && metrics.length > 0 && (
          <ul className="tw:flex tw:flex-wrap tw:justify-center tw:gap-x-10 tw:gap-y-4 tw:w-full tw:mt-2 tw:mx-0 tw:mb-0 tw:pt-5 tw:px-0 tw:pb-0 tw:list-none tw:border-t tw:border-t-[rgba(214,164,64,0.35)]">
            {metrics.map((metric) => (
              <li key={metric.label} className="tw:flex tw:flex-col tw:items-center tw:gap-0.5">
                <span className={cx("tw:text-[1.4rem] tw:font-semibold tw:text-brown-900 tw:tabular-nums", fontDisplay)}>
                  {metric.value}
                </span>
                <span className="tw:text-[0.8rem] tw:text-brown-800">{metric.label}</span>
              </li>
            ))}
          </ul>
        )}

        {children && <div className="tw:w-full tw:mt-2">{children}</div>}
      </div>
    </section>
  );
}

export default ArticleBanner;
