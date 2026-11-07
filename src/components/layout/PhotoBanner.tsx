import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import site from "./site.module.css";

export interface PhotoBannerProps {
  image: string;
  alt: string;
  /** Chú thích nhỏ trên ảnh (tên tượng, nơi chụp). */
  caption?: string;
  eyebrow?: string;
  /** Tiêu đề; phần bọc trong <em> hiện nghiêng màu vàng như banner trang chủ. */
  title: ReactNode;
  headingLevel?: "h1" | "h2";
  lead?: ReactNode;
  /** Nội dung thêm trong tờ giấy, bên dưới lời dẫn. */
  children?: ReactNode;
  /** "compact": ảnh thấp hơn, dùng cho đầu chuyên trang. */
  size?: "default" | "compact";
  /** Vị trí lấy khung ảnh (object-position), mặc định "50% 40%". */
  imagePosition?: string;
  priority?: boolean;
  id?: string;
  className?: string;
}

/**
 * Banner ảnh tràn viền: ảnh mờ dần ở hai mép, tờ giấy nổi lên mép dưới ảnh chứa
 * eyebrow, tiêu đề và lời dẫn. Không đặt chữ lên ảnh để khỏi che tượng Phật.
 */
export function PhotoBanner({
  image,
  alt,
  caption,
  eyebrow,
  title,
  headingLevel: Heading = "h2",
  lead,
  children,
  size = "default",
  imagePosition,
  priority = false,
  id,
  className,
}: PhotoBannerProps) {
  const compact = size === "compact";
  const imageStyle: CSSProperties | undefined = imagePosition ? { objectPosition: imagePosition } : undefined;

  return (
    <section id={id} className={[site.intro, compact && site.introCompact, className].filter(Boolean).join(" ")}>
      <div className={site.introPhoto}>
        <Image src={image} alt={alt} fill priority={priority} sizes="100vw" className={site.introImage} style={imageStyle} />
        {/* Chỉ phủ nhạt mép dưới cho liền với tờ giấy */}
        <div className={site.introOverlay} />
        {caption && <span className={site.introCaption}>{caption}</span>}
      </div>

      <div className={site.introSheet}>
        {eyebrow && <span className={site.introEyebrow}>{eyebrow}</span>}
        <Heading className={site.introTitle}>{title}</Heading>
        {lead && <p className={site.introLead}>{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export default PhotoBanner;
