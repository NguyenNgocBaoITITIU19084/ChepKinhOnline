import Link from "next/link";
import { IconArrowRight, IconPencil } from "@tabler/icons-react";
import { eyebrow as eyebrowClass, fontDisplay } from "./styles";
import { cx } from "./utils";

export interface SutraCtaCardProps {
  title: string;
  buttonText: string;
  buttonHref: string;
  description?: string;
  eyebrow?: string;
  /** "sm": gọn cho cột phụ 300px. */
  size?: "md" | "sm";
  className?: string;
}

/** Khối mời chép kinh: kính mờ, tiêu đề, mô tả và một nút vàng. */
export function SutraCtaCard({
  title,
  buttonText,
  buttonHref,
  description,
  eyebrow,
  size = "md",
  className,
}: SutraCtaCardProps) {
  const sm = size === "sm";
  return (
    // Nền kính lấy từ `ck-glass`, nút từ `ck-btn-gold` (src/styles/ui.css). "sm": cỡ gọn cho cột phụ
    <section
      className={cx(
        "ck-glass tw:flex tw:flex-col tw:items-center tw:text-center",
        sm ? "tw:gap-2.5 tw:py-6 tw:px-5" : "tw:gap-3.5 tw:py-10 tw:px-8 tw:upto-768:py-7 tw:upto-768:px-4",
        className,
      )}
      aria-label={title}
    >
      {eyebrow && <span className={eyebrowClass}>{eyebrow}</span>}
      <h2
        className={cx(
          "tw:max-w-[560px] tw:m-0 tw:font-semibold tw:leading-[1.3] tw:text-brown-900 tw:text-balance",
          sm ? "tw:text-[1.2rem]" : "tw:text-[length:clamp(1.35rem,2.5vw,1.75rem)]",
          fontDisplay,
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cx(
            "tw:max-w-[560px] tw:m-0 tw:leading-[1.65] tw:text-brown-800",
            sm ? "tw:text-[0.88rem]" : "tw:text-[0.95rem]",
          )}
        >
          {description}
        </p>
      )}
      <Link
        href={buttonHref}
        className={cx(
          "ck-btn-gold tw:mt-1.5",
          sm ? "tw:w-full tw:whitespace-normal" : "tw:upto-480:w-full tw:upto-480:whitespace-normal",
        )}
      >
        <IconPencil size={18} stroke={2} aria-hidden />
        <span>{buttonText}</span>
        <IconArrowRight size={16} stroke={2} className="ck-btn-arrow" aria-hidden />
      </Link>
    </section>
  );
}

export default SutraCtaCard;
