"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconArrowUp } from "@tabler/icons-react";

/** Trang đọc bài dài: hiện thêm vòng tiến độ đọc quanh nút. */
const READING_PAGES = /^\/tu-hoc\/[^/]+\/?$/;

export interface ScrollToTopProps {
  /** Ép bật/tắt vòng tiến độ; mặc định bật cho trang chi tiết bài tu học. */
  showProgress?: boolean;
  /** Cuộn quá bao nhiêu px thì nút hiện ra. */
  threshold?: number;
  className?: string;
}

const SIZE = 56;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const focusRing =
  "tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2";

/**
 * Nút tròn "Lên đầu trang" ở góc dưới phải, dùng chung cho mọi trang trong layout (app).
 * Hiện khi đã cuộn xuống; trên trang đọc bài, viền vàng chạy theo % đã đọc.
 */
export function ScrollToTop({ showProgress, threshold = 320, className }: ScrollToTopProps) {
  const pathname = usePathname();
  const withProgress = showProgress ?? READING_PAGES.test(pathname ?? "");

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const value = scrollable > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollable) * 100)) : 0;
      setProgress(Math.round(value));
      setVisible(scrollTop > threshold);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
    // Đổi trang thì tính lại (chiều cao trang mới khác)
  }, [threshold, pathname]);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const done = progress >= 100;
  const showPercent = withProgress && !done;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      inert={!visible}
      aria-label={withProgress ? `Lên đầu trang (đã đọc ${progress}%)` : "Lên đầu trang"}
      title="Lên đầu trang"
      className={[
        "tw:group tw:fixed tw:z-40 tw:right-6 tw:bottom-6 tw:upto-768:right-4 tw:upto-768:bottom-4",
        "tw:appearance-none tw:p-0 tw:rounded-full tw:cursor-pointer",
        "tw:bg-[rgba(255,251,242,0.94)] tw:backdrop-blur-md tw:shadow-[0_8px_24px_rgba(150,105,25,0.18)]",
        "tw:hover:shadow-[0_10px_28px_rgba(150,105,25,0.26)] tw:hover:-translate-y-0.5",
        "tw:transition-[opacity,transform,box-shadow] tw:duration-200 tw:ease-out tw:motion-reduce:transition-none",
        // Không có vòng tiến độ thì dùng viền mảnh để nút vẫn rõ khối
        withProgress ? "tw:border-0" : "tw:border tw:border-[rgba(214,164,64,0.5)]",
        visible ? "tw:opacity-100 tw:scale-100" : "tw:opacity-0 tw:scale-75 tw:pointer-events-none",
        focusRing,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width: SIZE, height: SIZE }}
    >
      {withProgress && (
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="tw:absolute tw:inset-0 tw:-rotate-90"
          aria-hidden
        >
          <defs>
            <linearGradient id="scroll-top-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--gold-300)" />
              <stop offset="100%" stopColor="var(--gold-700)" />
            </linearGradient>
          </defs>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(214,164,64,0.22)"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="url(#scroll-top-ring)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
            className="tw:transition-[stroke-dashoffset] tw:duration-150 tw:ease-out tw:motion-reduce:transition-none"
          />
        </svg>
      )}

      {/* Mũi tên lên (luôn hiện) + số % trên trang đọc bài */}
      <span
        aria-hidden
        className="tw:absolute tw:inset-0 tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-px"
      >
        <IconArrowUp
          size={showPercent ? 15 : 22}
          stroke={2.4}
          className="tw:text-gold-700 tw:transition-transform tw:duration-200 tw:group-hover:-translate-y-0.5 tw:motion-reduce:transition-none"
        />
        {showPercent && (
          <span className="tw:text-[0.66rem] tw:font-semibold tw:leading-none tw:tabular-nums tw:text-brown-900">
            {progress}%
          </span>
        )}
      </span>
    </button>
  );
}
