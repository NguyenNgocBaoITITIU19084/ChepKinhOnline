"use client";

import { useEffect, useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { focusable } from "./styles";
import { cx } from "./utils";

export interface ArticleReadingBarProps {
  /** Tiêu đề bài, dùng cho nhãn trợ năng */
  title?: string;
  className?: string;
}

const SIZE = 56;
const STROKE = 3;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Vòng tròn tiến độ đọc bài ở góc dưới phải.
 * Hiện khi cuộn qua phần đầu bài; viền vàng chạy theo % đã đọc, bấm để lên đầu trang.
 */
export function ArticleReadingBar({ title, className }: ArticleReadingBarProps) {
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
      setVisible(scrollTop > 320);
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
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const done = progress >= 100;
  const label = `Đã đọc ${progress}%${title ? ` bài “${title}”` : ""}. Bấm để lên đầu trang`;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      inert={!visible}
      aria-label={label}
      title="Lên đầu trang"
      className={cx(
        "tw:group tw:fixed tw:z-40 tw:right-6 tw:bottom-6 tw:upto-768:right-4 tw:upto-768:bottom-4",
        "tw:appearance-none tw:p-0 tw:border-0 tw:rounded-full tw:cursor-pointer",
        "tw:bg-[rgba(255,251,242,0.94)] tw:backdrop-blur-md tw:shadow-[0_8px_24px_rgba(150,105,25,0.18)]",
        "tw:hover:shadow-[0_10px_28px_rgba(150,105,25,0.26)] tw:hover:-translate-y-0.5",
        "tw:transition-[opacity,transform,box-shadow] tw:duration-200 tw:ease-out tw:motion-reduce:transition-none",
        visible ? "tw:opacity-100 tw:scale-100" : "tw:opacity-0 tw:scale-75 tw:pointer-events-none",
        focusable,
        className,
      )}
      style={{ width: SIZE, height: SIZE }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="tw:absolute tw:inset-0 tw:-rotate-90"
        aria-hidden
      >
        <defs>
          <linearGradient id="reading-ring" x1="0" y1="0" x2="1" y2="1">
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
          stroke="url(#reading-ring)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
          className="tw:transition-[stroke-dashoffset] tw:duration-150 tw:ease-out tw:motion-reduce:transition-none"
        />
      </svg>

      {/* Mũi tên lên (luôn hiện) + số % đã đọc */}
      <span
        aria-hidden
        className="tw:absolute tw:inset-0 tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-px"
      >
        <IconArrowUp
          size={done ? 20 : 15}
          stroke={2.4}
          className="tw:text-gold-700 tw:transition-transform tw:duration-200 tw:group-hover:-translate-y-0.5 tw:motion-reduce:transition-none"
        />
        {!done && (
          <span className="tw:text-[0.66rem] tw:font-semibold tw:leading-none tw:tabular-nums tw:text-brown-900">
            {progress}%
          </span>
        )}
      </span>
    </button>
  );
}
