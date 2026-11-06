"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SutraSummary } from "@/lib/sutra-repo";

// Tranh / ảnh đại diện cho từng bộ kinh, chọn theo vị Phật, Bồ Tát hoặc pháp môn của kinh đó.
// objectPosition giữ trọn khuôn mặt, vương miện và pháp khí khi ảnh bị cắt theo khung dọc 3:4.
export const SUTRA_ARTWORKS: Record<
  string,
  {
    src: string;
    alt: string;
    tag: string;
    meritBadge: string;
    objectPosition?: string;
  }
> = {
  "kinh-dia-tang": {
    src: "/storage/dia-tang-bo-tat.jpg",
    alt: "Tranh Đức Địa Tạng Vương Bồ Tát cầm tích trượng và minh châu, ngồi trên tòa sen",
    tag: "Địa Tạng Vương Bồ Tát",
    meritBadge: "Đại nguyện cứu khổ",
    objectPosition: "center 20%",
  },
  "chu-dai-bi": {
    src: "/storage/quan-the-am.jpg",
    alt: "Tranh Đức Quán Thế Âm Bồ Tát cầm cành dương liễu, rưới nước cam lồ từ bình tịnh thủy",
    tag: "Quán Thế Âm Bồ Tát",
    meritBadge: "Đại bi tâm chú",
    objectPosition: "center 25%",
  },
  "kinh-sam-hoi": {
    src: "/storage/phat-thich-ca.jpg",
    alt: "Tranh Đức Bổn Sư Thích Ca Mâu Ni Phật nhập thiền định trên tòa sen",
    tag: "Từ Bi Thủy Sám",
    meritBadge: "Tịnh nghiệp tiêu oan",
    objectPosition: "center 25%",
  },
  "kinh-duoc-su": {
    src: "/storage/phat-duoc-su.jpg",
    alt: "Tranh Đức Dược Sư Lưu Ly Quang Như Lai thân xanh lưu ly, tay nâng bát thuốc",
    tag: "Dược Sư Lưu Ly Quang",
    meritBadge: "Tiêu tai diên thọ",
    objectPosition: "center 22%",
  },
  "kinh-vu-lan-bao-hieu": {
    src: "/storage/real/kinh_vu_lan_muc_kien_lien.jpg",
    alt: "Tôn tượng Tôn giả Mục Kiền Liên, bậc đại hiếu cứu mẹ",
    tag: "Tôn giả Mục Kiền Liên",
    meritBadge: "Báo hiếu phụ mẫu",
    objectPosition: "center 18%",
  },
  "kinh-sam-hoi-hong-danh": {
    src: "/storage/real/tuong_phat_vang_dien.jpg",
    alt: "Chư Phật kim thân an vị trong chánh điện",
    tag: "Hồng danh chư Phật",
    meritBadge: "88 vị Phật Thế Tôn",
    objectPosition: "38% center",
  },
};

const FALLBACK_ARTWORK = {
  src: "/storage/buddha.jpg",
  tag: "Kinh điển huân tu",
  meritBadge: "Công đức thọ trì",
  objectPosition: "center 20%",
};

const AUTOPLAY_MS = 6500;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function SutraCarousel({ sutras }: { sutras: SutraSummary[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [positions, setPositions] = useState(sutras.length);

  // Bề rộng một bước cuộn = bề rộng thẻ + khoảng cách giữa hai thẻ
  const getStep = useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    const second = track?.children[1] as HTMLElement | undefined;
    if (!first) return 1;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  }, []);

  const syncState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const step = getStep();
    const visible = Math.max(1, Math.round((track.clientWidth + 8) / step));
    setPositions(Math.max(1, sutras.length - visible + 1));
    setActive(Math.round(track.scrollLeft / step));
    setProgress(max > 0 ? track.scrollLeft / max : 1);
  }, [getStep, sutras.length]);

  useEffect(() => {
    syncState();
    window.addEventListener("resize", syncState);
    return () => window.removeEventListener("resize", syncState);
  }, [syncState]);

  // Nhớ đích đang cuộn tới, để bấm liên tiếp khi thẻ còn đang trượt vẫn đi đủ số bước
  const pendingTarget = useRef<{ index: number; at: number } | null>(null);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const last = Math.max(0, positions - 1);
      const target = Math.min(Math.max(index, 0), last);
      pendingTarget.current = { index: target, at: Date.now() };
      track.scrollTo({ left: target * getStep(), behavior: "smooth" });
    },
    [getStep, positions],
  );

  const currentIndex = useCallback(() => {
    const pending = pendingTarget.current;
    if (pending && Date.now() - pending.at < 700) return pending.index;
    return active;
  }, [active]);

  const handlePrev = useCallback(() => {
    const index = currentIndex();
    scrollToIndex(index <= 0 ? positions - 1 : index - 1);
  }, [currentIndex, positions, scrollToIndex]);

  const handleNext = useCallback(() => {
    const index = currentIndex();
    scrollToIndex(index >= positions - 1 ? 0 : index + 1);
  }, [currentIndex, positions, scrollToIndex]);

  // Tự chuyển thẻ chậm rãi; dừng khi rê chuột, đang focus bàn phím hoặc người dùng chọn giảm chuyển động
  useEffect(() => {
    if (paused || positions <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(handleNext, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [paused, active, positions, handleNext]);

  if (!sutras || sutras.length === 0) {
    return (
      <div className="tw:p-12 tw:text-center tw:text-stone-500 tw:bg-[#faf7f0] tw:rounded-xl tw:border tw:border-amber-900/10 font-zen-body">
        Chưa có kinh điển nào trong án thư.
      </div>
    );
  }

  const arrowClass =
    "tw:group tw:w-11 tw:h-11 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:border tw:border-[#6b4a12]/25 tw:bg-[#fbf7ef]/80 tw:backdrop-blur-sm tw:text-[#4a320a] tw:transition-all tw:duration-300 tw:hover:bg-[#4a320a] tw:hover:text-[#fbf7ef] tw:hover:border-[#4a320a] tw:focus-visible:outline-2 tw:focus-visible:outline-offset-2 tw:focus-visible:outline-[#d6a440] tw:cursor-pointer";

  return (
    <div
      className="tw:relative tw:w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Danh sách bộ kinh"
    >
      {/* Thanh điều khiển: số thứ tự, vạch tiến độ, nút tới lui */}
      <div className="tw:flex tw:items-center tw:gap-5 tw:mb-7 tw:px-1">
        <div className="font-zen-title tw:flex tw:items-baseline tw:gap-1.5 tw:text-[#4a320a] tw:shrink-0">
          <span className="tw:text-3xl tw:font-semibold tw:tabular-nums tw:leading-none">
            {pad(Math.min(active + 1, sutras.length))}
          </span>
          <span className="tw:text-sm tw:text-[#6b4a12]/60 tw:tabular-nums">/ {pad(sutras.length)}</span>
        </div>

        <div className="tw:relative tw:flex-1 tw:h-px tw:bg-[#6b4a12]/20" aria-hidden="true">
          <div
            className="tw:absolute tw:inset-y-[-1px] tw:left-0 tw:bg-gradient-to-r tw:from-[#a8741a] tw:to-[#d6a440] tw:rounded-full tw:transition-[width] tw:duration-300"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>

        <div className="tw:flex tw:items-center tw:gap-2 tw:shrink-0">
          <button type="button" onClick={handlePrev} aria-label="Kinh trước" className={arrowClass}>
            <svg className="tw:w-4 tw:h-4 tw:transition-transform tw:group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m6-6-6 6 6 6" />
            </svg>
          </button>
          <button type="button" onClick={handleNext} aria-label="Kinh tiếp theo" className={arrowClass}>
            <svg className="tw:w-4 tw:h-4 tw:transition-transform tw:group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dải thẻ cuộn ngang có snap: vuốt trên điện thoại, cuộn ngang trên trackpad */}
      <div
        ref={trackRef}
        onScroll={syncState}
        className="tw:flex tw:gap-5 tw:sm:gap-6 tw:overflow-x-auto tw:snap-x tw:snap-mandatory tw:scroll-smooth tw:-mx-5 tw:px-5 tw:scroll-px-5 tw:pt-4 tw:-mt-3 tw:pb-12 tw:-mb-8 tw:[scrollbar-width:none] tw:[&::-webkit-scrollbar]:hidden"
      >
        {sutras.map((sutra, idx) => {
          const art = SUTRA_ARTWORKS[sutra.slug] ?? { ...FALLBACK_ARTWORK, alt: sutra.title };

          return (
            <Link
              key={sutra.id}
              href={`/chep-kinh/${sutra.slug}`}
              aria-label={`${sutra.title}, vào chép kinh`}
              className="tw:group tw:relative tw:shrink-0 tw:snap-start tw:basis-[84%] tw:sm:basis-[calc((100%-1.5rem)/2)] tw:lg:basis-[calc((100%-3rem)/3)] tw:aspect-[3/4.6] tw:sm:aspect-[3/4.3] tw:rounded-[22px] tw:overflow-hidden tw:bg-[#2a1d10] tw:no-underline tw:shadow-[0_1px_2px_rgba(74,50,10,0.10),0_6px_14px_-6px_rgba(74,50,10,0.22),0_18px_32px_-16px_rgba(74,50,10,0.32)] tw:transition-[translate,box-shadow] tw:duration-500 tw:ease-out tw:hover:-translate-y-1.5 tw:hover:shadow-[0_2px_4px_rgba(74,50,10,0.10),0_14px_24px_-10px_rgba(74,50,10,0.28),0_30px_48px_-20px_rgba(74,50,10,0.42)] tw:focus-visible:outline-2 tw:focus-visible:outline-offset-4 tw:focus-visible:outline-[#d6a440]"
            >
              <Image
                src={art.src}
                alt={art.alt}
                fill
                className="tw:object-cover tw:transition-transform tw:duration-[1200ms] tw:ease-out tw:group-hover:scale-[1.06]"
                style={{ objectPosition: art.objectPosition ?? "center 20%" }}
                sizes="(max-width: 640px) 84vw, (max-width: 1024px) 48vw, 400px"
                priority={idx < 3}
              />

              {/* Lớp tối dần từ dưới lên để chữ luôn đọc rõ trên mọi bức tranh */}
              <div className="tw:absolute tw:inset-0 tw:bg-gradient-to-t tw:from-[#160e06] tw:via-[#160e06]/55 tw:via-40% tw:to-transparent tw:to-70%" />
              <div className="tw:absolute tw:inset-x-0 tw:top-0 tw:h-28 tw:bg-gradient-to-b tw:from-[#160e06]/45 tw:to-transparent" />

              {/* Viền chỉ vàng bên trong như khung tranh treo */}
              <div className="tw:absolute tw:inset-2.5 tw:rounded-[16px] tw:border tw:border-[#ecc976]/25 tw:pointer-events-none tw:transition-colors tw:duration-500 tw:group-hover:border-[#ecc976]/55" />

              {/* Số thứ tự bộ kinh */}
              <span className="font-zen-title tw:absolute tw:top-6 tw:left-6 tw:text-[#fff8e6]/85 tw:text-sm tw:tracking-[0.2em] tw:tabular-nums">
                {pad(idx + 1)}
              </span>

              {/* Tên kinh chữ Hán viết dọc như dải triện */}
              {sutra.originalTitle && (
                <span
                  className="font-zen-han tw:absolute tw:top-5 tw:right-5 tw:max-h-[42%] tw:overflow-hidden tw:px-1.5 tw:py-2.5 tw:rounded-[4px] tw:bg-[#8a2a17]/90 tw:text-[#fff3dc] tw:text-[12px] tw:tracking-[0.14em] tw:leading-none tw:shadow-[0_4px_12px_rgba(0,0,0,0.3)] tw:ring-1 tw:ring-[#ecc976]/40"
                  style={{ writingMode: "vertical-rl" }}
                  lang="zh-Hant"
                >
                  {sutra.originalTitle}
                </span>
              )}

              {/* Nội dung chữ ở chân thẻ */}
              <div className="tw:absolute tw:inset-x-0 tw:bottom-0 tw:p-6 tw:sm:p-7">
                <span className="font-zen-body tw:inline-flex tw:items-center tw:gap-2 tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-[#ecc976]">
                  <span className="tw:w-5 tw:h-px tw:bg-[#ecc976]/70" aria-hidden="true" />
                  {art.tag}
                </span>

                <h3 className="font-zen-title tw:mt-2.5 tw:text-[22px] tw:sm:text-2xl tw:font-semibold tw:leading-snug tw:text-[#fff8e6] tw:text-balance">
                  {sutra.title}
                </h3>

                {sutra.description && (
                  <p className="font-zen-body tw:mt-2.5 tw:text-[13.5px] tw:leading-relaxed tw:text-[#f3e6cc]/80 tw:line-clamp-2">
                    {sutra.description}
                  </p>
                )}

                <div className="tw:mt-5 tw:pt-4 tw:border-t tw:border-[#ecc976]/20 tw:flex tw:items-center tw:justify-between tw:gap-3">
                  <span className="font-zen-body tw:min-w-0 tw:truncate tw:text-xs tw:italic tw:text-[#f3e6cc]/65">{art.meritBadge}</span>
                  <span className="font-zen-body tw:shrink-0 tw:whitespace-nowrap tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:bg-[#fff8e6] tw:pl-4 tw:pr-3 tw:py-2 tw:text-[13px] tw:font-semibold tw:text-[#4a320a] tw:transition-colors tw:duration-300 tw:group-hover:bg-[#ecc976]">
                    Vào chép kinh
                    <svg className="tw:w-3.5 tw:h-3.5 tw:transition-transform tw:duration-300 tw:group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Chấm chỉ vị trí, mỗi chấm ứng với một bộ kinh */}
      <div className="tw:flex tw:items-center tw:justify-center tw:gap-2 tw:mt-6">
        {Array.from({ length: positions }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToIndex(idx)}
            aria-label={`Đến bộ kinh ${idx + 1}`}
            aria-current={active === idx}
            className={`tw:h-1.5 tw:p-0 tw:border-0 tw:appearance-none tw:rounded-full tw:transition-all tw:duration-500 tw:cursor-pointer ${
              active === idx ? "tw:w-8 tw:bg-[#a8741a]" : "tw:w-1.5 tw:bg-[#6b4a12]/25 tw:hover:bg-[#6b4a12]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
