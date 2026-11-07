import { IconQuote } from "@tabler/icons-react";
import { BodhiLeafIcon } from "@/components/icons/BuddhistIcons";

interface ZenIntentionCardProps {
  intention: string;
}

export function ZenIntentionCard({ intention }: ZenIntentionCardProps) {
  const displayIntention =
    intention ||
    "Nguyện tâm bồ đề kiên cố, tinh tấn chép kinh mỗi ngày để thân tâm an lạc, phước huệ trang nghiêm.";

  return (
    <section
      aria-labelledby="zen-intention-heading"
      className="ck-glass tw:relative tw:overflow-hidden tw:rounded-2xl tw:p-5 tw:bg-gradient-to-br tw:from-amber-50/70 tw:via-[#FFFDF9] tw:to-gold-50/60 tw:border tw:border-[rgba(214,164,64,0.3)] tw:shadow-[0_4px_20px_rgba(107,74,18,0.05)]"
    >
      <div className="tw:flex tw:items-center tw:gap-2 tw:mb-3">
        <span className="tw:text-gold-600">
          <BodhiLeafIcon size={18} strokeWidth={1.6} />
        </span>
        <h3
          id="zen-intention-heading"
          className="tw:text-sm tw:font-bold tw:uppercase tw:tracking-wider tw:text-brown-900"
        >
          Tâm Nguyện Tu Học
        </h3>
      </div>

      <div className="tw:relative tw:pl-6 tw:py-1">
        <IconQuote
          size={24}
          className="tw:absolute tw:left-0 tw:top-0 tw:text-amber-400/50 tw:-scale-x-100"
        />
        <p className="tw:text-sm tw:leading-relaxed tw:text-brown-800 tw:font-serif tw:italic">
          “{displayIntention}”
        </p>
      </div>

      <div className="tw:mt-3 tw:flex tw:items-center tw:justify-end tw:text-[0.72rem] tw:text-brown-500 tw:italic">
        <span>— Hồi hướng công đức chánh niệm</span>
      </div>
    </section>
  );
}
