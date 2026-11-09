import Image from "next/image";
import { CONTACT_EPIGRAPH } from "@/data/contact-faq";

export interface ContactLandscapeProps {
  className?: string;
}

/**
 * Dải phong cảnh tràn viền cuối trang Liên hệ: chùa Bái Đính giữa núi đá Ninh Bình, ảnh trôi chậm khi cuộn
 * (parallax), mờ dần ở hai mép vào nền hoa văn. Ảnh không có tượng Phật nên đặt được câu kệ lên trên.
 */
export function ContactLandscape({ className = "" }: ContactLandscapeProps) {
  return (
    <figure
      className={`ck-parallax-frame tw:relative tw:m-0 tw:overflow-hidden tw:h-[clamp(340px,56vh,560px)] tw:[mask-image:linear-gradient(180deg,transparent_0,#000_120px,#000_calc(100%_-_120px),transparent_100%)] tw:upto-560:h-[340px] ${className}`.trim()}
    >
      <div className="ck-parallax tw:absolute tw:inset-x-0 tw:-top-[12%] tw:-bottom-[12%]">
        <Image
          src="/storage/real/chua_bai_dinh.jpg"
          alt="Chùa Bái Đính nhiều tầng mái giữa núi đá vôi, soi bóng xuống mặt hồ"
          fill
          sizes="100vw"
          className="tw:object-cover tw:object-[50%_45%]"
        />
      </div>

      {/* Phủ nâu ấm ở giữa để câu kệ đọc rõ trên ảnh */}
      <div
        aria-hidden
        className="tw:absolute tw:inset-0 tw:bg-[radial-gradient(ellipse_60%_55%_at_50%_55%,rgba(43,33,22,0.55),rgba(43,33,22,0.15)_70%,transparent)]"
      />

      <blockquote className="tw:absolute tw:inset-x-4 tw:top-1/2 tw:-translate-y-1/2 tw:m-0 tw:p-0 tw:[border:0] tw:flex tw:flex-col tw:items-center tw:gap-3 tw:text-center">
        <p className="tw:m-0 tw:font-[family-name:var(--font-book),Georgia,serif] tw:text-[clamp(1.6rem,3.6vw,2.6rem)] tw:italic tw:leading-[1.3] tw:text-[#fdf3dc] tw:[text-shadow:0_2px_18px_rgba(30,20,8,0.5)] tw:text-balance">
          {CONTACT_EPIGRAPH.verse}
        </p>
        <cite className="tw:text-[0.74rem] tw:not-italic tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-[#e8c77a]">
          {CONTACT_EPIGRAPH.source}
        </cite>
      </blockquote>

      <figcaption className="tw:absolute tw:right-6 tw:bottom-[132px] tw:py-[5px] tw:px-3 tw:text-[0.72rem] tw:tracking-[0.04em] tw:text-gold-100 tw:bg-[rgba(43,33,22,0.45)] tw:border tw:border-[rgba(255,248,230,0.2)] tw:rounded-[999px] tw:[backdrop-filter:blur(6px)] tw:upto-560:right-1/2 tw:upto-560:translate-x-1/2 tw:upto-560:bottom-[64px] tw:upto-560:whitespace-nowrap">
        Chùa Bái Đính · Ninh Bình
      </figcaption>
    </figure>
  );
}
