import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

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

// Khung ảnh: mờ dần ở hai mép theo --fade-top / --fade-bottom
const PHOTO =
  "tw:relative tw:overflow-hidden tw:[mask-image:linear-gradient(180deg,transparent_0,#000_var(--fade-top),#000_calc(100%_-_var(--fade-bottom)),transparent_100%)]";
// Lớp nhòe mép trên (chỉ banner thường; banner gọn nằm dưới header nên bỏ)
const PHOTO_TOP_BLUR =
  "tw:before:content-[''] tw:before:absolute tw:before:inset-x-0 tw:before:top-0 tw:before:z-1 tw:before:pointer-events-none tw:before:[backdrop-filter:blur(16px)_saturate(110%)] tw:before:h-[calc(var(--fade-top)_+_60px)] tw:before:bg-[linear-gradient(180deg,rgba(255,250,236,0.55),rgba(255,250,236,0))] tw:before:[mask-image:linear-gradient(180deg,#000_30%,transparent_100%)]";
// Tờ giấy kem
const SHEET =
  "tw:relative tw:z-1 tw:bg-[radial-gradient(ellipse_at_50%_0%,#fffdf6,var(--paper)_70%)] tw:border tw:border-[rgba(214,164,64,0.4)] tw:rounded-2xl tw:[box-shadow:0_24px_60px_rgba(120,85,20,0.16)]";

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
    <section id={id} className={["tw:relative tw:pb-6", compact ? "tw:mt-[-68px]" : "tw:mt-2", className].filter(Boolean).join(" ")}>
      {/*
       * Giao thoa ảnh với nền giấy:
       * - Mask làm chính tấm ảnh trong dần ở mép trên/dưới (--fade-top / --fade-bottom), nên nền kem
       *   hoa văn chữ Vạn của `.ck-scene-bg` hiện xuyên qua, không có đường cắt ngang.
       * - Hai lớp backdrop blur (mép trên ::before, mép dưới overlay) cũng có mask, độ mờ tăng dần
       *   về phía mép, để ảnh nhòe như sương trước khi tan vào nền.
       * Lúc ảnh chưa tải: để trong suốt, nền hoa văn hiện ra thay vì một mảng màu.
       */}
      <div
        className={
          compact
            ? // Ảnh tràn lên tận mép trên, nằm dưới thanh header kính (cao 68px kể cả lề trên 12px,
              // header dính có z-index 40 nên luôn nổi trên ảnh). Chỉ mờ và nhòe ở mép dưới.
              `${PHOTO} tw:h-[clamp(460px,70vh,680px)] tw:[--fade-top:0px] tw:[--fade-bottom:200px] tw:upto-560:h-[400px] tw:upto-560:[--fade-bottom:140px]`
            : `${PHOTO} ${PHOTO_TOP_BLUR} tw:h-[clamp(440px,74vh,720px)] tw:[--fade-top:180px] tw:[--fade-bottom:220px] tw:upto-560:h-[480px] tw:upto-560:[--fade-top:110px] tw:upto-560:[--fade-bottom:150px]`
        }
      >
        {/* Tượng nằm giữa, hơi cao trong khung: giữ nguyên ảnh, không lật */}
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="tw:object-cover tw:object-[50%_40%]"
          style={imageStyle}
        />
        {/* Chỉ phủ nhạt mép dưới cho liền với tờ giấy */}
        <div className="tw:content-[''] tw:absolute tw:inset-x-0 tw:bottom-0 tw:z-1 tw:pointer-events-none tw:[backdrop-filter:blur(16px)_saturate(110%)] tw:h-[calc(var(--fade-bottom)_+_60px)] tw:bg-[linear-gradient(0deg,rgba(251,240,214,0.6),rgba(251,240,214,0))] tw:[mask-image:linear-gradient(0deg,#000_30%,transparent_100%)]" />
        {caption && (
          <span
            className={`tw:absolute tw:z-2 tw:right-6 tw:py-[5px] tw:px-3 tw:text-[0.72rem] tw:tracking-[0.04em] tw:text-gold-100 tw:bg-[rgba(43,33,22,0.45)] tw:border tw:border-[rgba(255,248,230,0.2)] tw:rounded-[999px] tw:[backdrop-filter:blur(6px)] tw:upto-560:top-auto tw:upto-560:right-1/2 tw:upto-560:bottom-[84px] tw:upto-560:[transform:translateX(50%)] tw:upto-560:whitespace-nowrap tw:upto-560:text-[0.66rem] ${
              compact ? "tw:top-24" : "tw:top-[184px]"
            }`}
          >
            {caption}
          </span>
        )}
      </div>

      {/* Tờ giấy kem nổi lên đè mép dưới ảnh */}
      <div
        className={
          compact
            ? // Thẳng mép với nội dung bên dưới: cùng lề với trang (24 / 20 / 16px, rộng tối đa 1152px)
              `${SHEET} tw:mt-[-96px] tw:mx-[max(24px,calc((100%_-_1152px)_/_2))] tw:mb-0 tw:pt-[30px] tw:px-8 tw:pb-7 tw:upto-1024:mt-[-72px] tw:upto-1024:mx-5 tw:upto-1024:pt-[26px] tw:upto-1024:px-5 tw:upto-1024:pb-[22px] tw:upto-768:mx-4`
            : `${SHEET} tw:max-w-[1152px] tw:mt-[-96px] tw:mx-auto tw:mb-0 tw:pt-9 tw:px-10 tw:pb-8 tw:max-lg:mt-[-72px] tw:max-lg:mx-4 tw:max-lg:pt-[30px] tw:max-lg:px-6 tw:max-lg:pb-[26px]`
        }
      >
        {eyebrow && (
          <span className="tw:block tw:mb-2.5 tw:text-[0.74rem] tw:font-semibold tw:tracking-[0.22em] tw:text-center tw:uppercase tw:text-gold-700">
            {eyebrow}
          </span>
        )}
        <Heading className="tw:max-w-[760px] tw:mt-0 tw:mx-auto tw:mb-4 tw:font-title tw:text-[clamp(1.6rem,3vw,2.3rem)] tw:font-semibold tw:leading-[1.25] tw:text-center tw:text-brown-900 tw:text-balance tw:[&_em]:italic tw:[&_em]:font-medium tw:[&_em]:text-gold-700">
          {title}
        </Heading>
        {lead && (
          <p
            className={`tw:max-w-[760px] tw:mt-0 tw:mx-auto tw:text-[1rem] tw:leading-[1.8] tw:text-center tw:text-brown-800 tw:text-pretty tw:[&_strong]:font-semibold tw:[&_strong]:text-brown-900 ${
              compact ? "tw:mb-[22px]" : "tw:mb-[30px]"
            }`}
          >
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export default PhotoBanner;
