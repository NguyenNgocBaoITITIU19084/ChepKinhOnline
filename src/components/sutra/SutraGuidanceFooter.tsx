import React from "react";
import { IconFlame, IconHeartHandshake, IconSparkles } from "@tabler/icons-react";
import { ZenDivider } from "@/components/icons/BuddhistIcons";

const GUIDANCE_STEPS = [
  {
    step: "01",
    title: "Tịnh Thủ Đoan Trang",
    icon: IconSparkles,
    desc: "Rửa sạch bàn tay, ngồi ngay ngắn, chuẩn bị một không gian yên tĩnh và thanh khiết trước khi khởi tâm chép kinh.",
  },
  {
    step: "02",
    title: "Nhiếp Tâm An Trụ",
    icon: IconFlame,
    desc: "Thở sâu ba hơi, buông xả hết mọi phiền muộn trần thế. Gõ từng chữ bằng tất cả sự cung kính và chánh niệm trong từng khoảnh khắc.",
  },
  {
    step: "03",
    title: "Hồi Hướng Công Đức",
    icon: IconHeartHandshake,
    desc: "Khi hoàn thành một trang kinh, phát nguyện hồi hướng phước đức này đến cửu huyền thất tổ, cha mẹ hiện tiền và muôn loài chúng sinh.",
  },
];

export function SutraGuidanceFooter() {
  return (
    <section className="tw:mt-16 tw:mb-8 tw:p-6 sm:tw:p-10 tw:rounded-3xl tw:border tw:border-amber-900/15 tw:bg-[#fbf8f2]/90 tw:shadow-sm">
      <div className="tw:text-center tw:max-w-xl tw:mx-auto tw:mb-8">
        <p className="tw:text-xs tw:tracking-widest tw:uppercase tw:font-semibold tw:text-amber-800/80 tw:mb-2 font-zen-body">
          Pháp Môn Chép Kinh
        </p>
        <h2 className="tw:text-2xl sm:tw:text-3xl tw:font-serif tw:font-medium tw:text-stone-900 font-zen-book">
          Ba Bước Tịnh Tâm Trước Khi Chép
        </h2>
        <div className="tw:mt-2">
          <ZenDivider symbol="lotus" className="!tw:my-6" />
        </div>
      </div>

      <div className="tw:grid tw:grid-cols-1 md:tw:grid-cols-3 tw:gap-6">
        {GUIDANCE_STEPS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="tw:relative tw:p-6 tw:rounded-2xl tw:border tw:border-amber-900/10 tw:bg-[#faf7f0] tw:flex tw:flex-col tw:items-start"
            >
              <div className="tw:flex tw:items-center tw:justify-between tw:w-full tw:mb-4">
                <div className="tw:w-10 tw:h-10 tw:rounded-xl tw:bg-amber-100/70 tw:text-amber-800 tw:flex tw:items-center tw:justify-center tw:border tw:border-amber-400/30">
                  <Icon size={20} stroke={1.6} aria-hidden />
                </div>
                <span className="tw:text-xs tw:font-serif tw:font-semibold tw:text-amber-800/40">
                  {item.step}
                </span>
              </div>
              <h3 className="tw:text-base sm:tw:text-lg tw:font-serif tw:font-semibold tw:text-stone-900 tw:mb-2 font-zen-book">
                {item.title}
              </h3>
              <p className="tw:text-xs sm:tw:text-sm tw:text-stone-600 tw:leading-relaxed font-zen-body">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
