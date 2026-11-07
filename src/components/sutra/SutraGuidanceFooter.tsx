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
    <section className="tw:mt-16 tw:mb-6 tw:p-6 sm:tw:p-10 tw:rounded-3xl tw:border tw:border-[rgba(214,164,64,0.4)] tw:bg-[radial-gradient(ellipse_at_50%_0%,#fffdf6,var(--paper)_70%)] tw:[box-shadow:0_14px_40px_rgba(120,85,20,0.12)]">
      <div className="tw:text-center tw:max-w-xl tw:mx-auto tw:mb-8">
        <span className="tw:text-xs tw:tracking-widest tw:uppercase tw:font-semibold tw:text-gold-700 tw:mb-1.5 font-zen-body">
          Pháp Môn Chép Kinh
        </span>
        <h2 className="font-zen-title tw:text-2xl sm:tw:text-3xl tw:font-semibold tw:text-brown-900 tw:mt-1.5">
          Ba Bước Tịnh Tâm Trước Khi Chép
        </h2>
        <div className="tw:mt-1">
          <ZenDivider symbol="lotus" className="!tw:my-4" />
        </div>
      </div>

      <div className="tw:grid tw:grid-cols-1 md:tw:grid-cols-3 tw:gap-6">
        {GUIDANCE_STEPS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="tw:relative tw:p-6 tw:rounded-2xl tw:border tw:border-[rgba(214,164,64,0.3)] tw:bg-[rgba(255,253,246,0.7)] tw:backdrop-blur-sm tw:flex tw:flex-col tw:items-start tw:shadow-sm"
            >
              <div className="tw:flex tw:items-center tw:justify-between tw:w-full tw:mb-4">
                <div className="tw:w-10 tw:h-10 tw:rounded-xl tw:bg-[#fff0c2] tw:text-[#7a4e0a] tw:flex tw:items-center tw:justify-center tw:border tw:border-gold-500/50">
                  <Icon size={20} stroke={1.8} aria-hidden />
                </div>
                <span className="font-zen-title tw:text-sm tw:font-bold tw:text-gold-700/60">
                  {item.step}
                </span>
              </div>
              <h3 className="font-zen-title tw:text-lg tw:font-semibold tw:text-brown-900 tw:mb-2">
                {item.title}
              </h3>
              <p className="font-zen-body tw:text-xs sm:tw:text-[13.5px] tw:text-brown-800 tw:leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
