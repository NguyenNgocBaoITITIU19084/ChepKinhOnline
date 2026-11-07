import React from "react";

// Mỗi bước mang một chữ Hán làm dấu ấn thay cho icon: 淨 tịnh, 定 định, 迴 hồi hướng
const GUIDANCE_STEPS = [
  {
    han: "淨",
    reading: "Tịnh",
    title: "Tịnh thủ đoan trang",
    desc: "Rửa sạch bàn tay, ngồi ngay ngắn, chuẩn bị một không gian yên tĩnh và thanh khiết trước khi khởi tâm chép kinh.",
  },
  {
    han: "定",
    reading: "Định",
    title: "Nhiếp tâm an trụ",
    desc: "Thở sâu ba hơi, buông xả mọi phiền muộn. Gõ từng chữ bằng tất cả sự cung kính và chánh niệm.",
  },
  {
    han: "迴",
    reading: "Hồi",
    title: "Hồi hướng công đức",
    desc: "Chép xong một trang kinh, phát nguyện hồi hướng phước đức đến cửu huyền thất tổ, cha mẹ hiện tiền và muôn loài chúng sinh.",
  },
];

export function SutraGuidanceFooter() {
  return (
    <section
      aria-labelledby="nghi-thuc-title"
      className="tw:mt-28 tw:mb-4 tw:border-y-[3px] tw:border-x-0 tw:border-double tw:border-[#a8741a]/45 tw:bg-[linear-gradient(90deg,transparent,rgba(255,253,247,0.75)_15%,rgba(255,253,247,0.75)_85%,transparent)] tw:py-12 tw:sm:py-16"
    >
      <div className="tw:grid tw:grid-cols-1 tw:lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] tw:gap-12 tw:lg:gap-16 tw:px-1 tw:sm:px-4 tw:lg:px-8">
        {/* Cột trái: tiêu đề và kệ hồi hướng */}
        <div className="tw:flex tw:flex-col">
          <p className="font-zen-body tw:m-0 tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.28em] tw:text-gold-700">
            Nghi thức trước khi chép
          </p>
          <h2
            id="nghi-thuc-title"
            className="font-zen-title tw:mt-4 tw:mb-0 tw:text-[34px] tw:sm:text-[44px] tw:font-semibold tw:leading-[1.1] tw:text-brown-900 tw:text-balance"
          >
            Ba bước tịnh tâm
          </h2>
          <p className="font-zen-body tw:mt-5 tw:mb-0 tw:max-w-[420px] tw:text-[15px] tw:leading-relaxed tw:text-brown-800">
            Chép kinh không cốt ở số chữ, mà ở tâm khi đặt từng chữ xuống. Dành ít phút cho ba điều này
            trước khi mở trang kinh.
          </p>

          <figure className="tw:mt-8 tw:lg:mt-auto tw:mx-0 tw:mb-0 tw:lg:pt-8">
            <blockquote className="font-zen-title tw:m-0 tw:border-l-2 tw:border-[#8a2a17]/70 tw:pl-5 tw:text-[17px] tw:italic tw:leading-[1.75] tw:text-brown-900">
              Án tu rị tu rị, ma ha tu rị,
              <br />
              tu tu rị, ta bà ha.
            </blockquote>
            <figcaption className="font-zen-body tw:mt-3 tw:pl-5 tw:text-xs tw:tracking-[0.12em] tw:uppercase tw:text-brown-800/70">
              Tịnh khẩu nghiệp chân ngôn · tụng ba lần trước khi chép
            </figcaption>
          </figure>
        </div>

        {/* Cột phải: ba bước */}
        <ol className="tw:m-0 tw:p-0 tw:list-none">
          {GUIDANCE_STEPS.map((item, i) => (
            <li
              key={item.han}
              className={`tw:grid tw:grid-cols-[64px_minmax(0,1fr)] tw:sm:grid-cols-[96px_minmax(0,1fr)] tw:gap-5 tw:sm:gap-8 tw:py-7 tw:sm:py-8 ${
                i > 0 ? "tw:border-t tw:border-[#a8741a]/25" : "tw:pt-0"
              }`}
            >
              <div className="tw:flex tw:flex-col tw:items-center">
                <span
                  lang="zh-Hant"
                  aria-hidden="true"
                  className="font-zen-han tw:text-[52px] tw:sm:text-[72px] tw:leading-none tw:text-[#8a2a17]"
                >
                  {item.han}
                </span>
                <span className="font-zen-body tw:mt-2 tw:text-[11px] tw:uppercase tw:tracking-[0.2em] tw:text-brown-800/70">
                  {item.reading}
                </span>
              </div>
              <div className="tw:pt-1 tw:sm:pt-2">
                <h3 className="font-zen-title tw:m-0 tw:flex tw:items-baseline tw:gap-3 tw:text-xl tw:sm:text-2xl tw:font-semibold tw:text-brown-900">
                  <span className="font-zen-body tw:text-xs tw:font-semibold tw:tabular-nums tw:text-gold-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </h3>
                <p className="font-zen-body tw:mt-2.5 tw:mb-0 tw:max-w-[520px] tw:text-[15px] tw:leading-relaxed tw:text-brown-800">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
