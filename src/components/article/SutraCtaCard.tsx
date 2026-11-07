import Link from "next/link";
import { IconArrowRight, IconPencil } from "@tabler/icons-react";
import copy from "@/components/copy/copy.module.css";
import shared from "./shared.module.css";
import styles from "./SutraCtaCard.module.css";
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
  return (
    <section className={cx(copy.glass, styles.cta, size === "sm" && styles.sm, className)} aria-label={title}>
      {eyebrow && <span className={shared.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.desc}>{description}</p>}
      <Link href={buttonHref} className={cx(copy.goldButton, styles.button)}>
        <IconPencil size={18} stroke={2} aria-hidden />
        <span>{buttonText}</span>
        <IconArrowRight size={16} stroke={2} className={copy.btnArrow} aria-hidden />
      </Link>
    </section>
  );
}

export default SutraCtaCard;
