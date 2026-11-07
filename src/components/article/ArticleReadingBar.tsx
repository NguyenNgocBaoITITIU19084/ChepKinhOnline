"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCheck,
  IconShare,
} from "@tabler/icons-react";
import { focusable } from "./styles";
import { cx } from "./utils";

export interface ArticleReadingBarProps {
  title: string;
  categoryLabel?: string;
  backHref?: string;
  backLabel?: string;
  className?: string;
}

/**
 * Thanh mini-bar theo dõi tiến độ đọc bài (Reading Progress Indicator).
 * Ghim ở cạnh trên, đổi từ đường line mảnh sang mini-bar đầy đủ khi cuộn qua tiêu đề.
 */
export function ArticleReadingBar({
  title,
  categoryLabel,
  backHref = "/tu-hoc",
  backLabel = "Tu học",
  className,
}: ArticleReadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const calculated = scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;

          setProgress(Math.round(calculated));
          setIsScrolled(scrollTop > 220);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={cx(
        "tw:sticky tw:top-0 tw:left-0 tw:w-full tw:z-40 tw:transition-all tw:duration-300 tw:motion-reduce:transition-none",
        isScrolled
          ? "tw:bg-[rgba(255,250,240,0.92)] tw:backdrop-blur-md tw:border-b tw:border-[rgba(214,164,64,0.35)] tw:shadow-[0_4px_16px_rgba(150,105,25,0.06)]"
          : "tw:bg-transparent tw:pointer-events-none",
        className,
      )}
      aria-hidden={!isScrolled && progress === 0}
    >
      {/* Đường vạch tiến độ đọc 3px */}
      <div className="tw:w-full tw:h-[3px] tw:bg-[rgba(214,164,64,0.18)] tw:overflow-hidden">
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tiến độ đọc bài viết"
          style={{ width: `${progress}%` }}
          className="tw:h-full tw:bg-gradient-to-r tw:from-gold-600 tw:via-gold-500 tw:to-gold-400 tw:transition-all tw:duration-150 tw:ease-out"
        />
      </div>

      {/* Nội dung mini bar khi cuộn xuống */}
      <div
        className={cx(
          "tw:max-w-[1200px] tw:mx-auto tw:px-6 tw:py-2.5 tw:flex tw:items-center tw:justify-between tw:gap-4 tw:transition-all tw:duration-200",
          isScrolled
            ? "tw:opacity-100 tw:translate-y-0 tw:pointer-events-auto"
            : "tw:opacity-0 tw:-translate-y-2 tw:pointer-events-none tw:h-0 tw:py-0 tw:overflow-hidden",
        )}
      >
        {/* Nút quay lại + Tiêu đề rút gọn */}
        <div className="tw:flex tw:items-center tw:gap-3 tw:min-w-0">
          <Link
            href={backHref}
            className={cx(
              "tw:inline-flex tw:items-center tw:gap-1.5 tw:text-[0.82rem] tw:font-medium tw:text-brown-700 tw:hover:text-gold-700 tw:transition-colors tw:shrink-0",
              focusable,
            )}
            title={`Về trang ${backLabel}`}
          >
            <IconArrowLeft size={16} stroke={2} aria-hidden />
            <span className="tw:upto-640:hidden">{backLabel}</span>
          </Link>

          <span className="tw:text-gold-700/50 tw:upto-640:hidden" aria-hidden>
            ·
          </span>

          <span
            className="tw:text-[0.88rem] tw:font-medium tw:text-brown-900 tw:truncate tw:max-w-[500px] tw:upto-1024:max-w-[340px] tw:upto-640:max-w-[200px]"
            title={title}
          >
            {title}
          </span>
        </div>

        {/* % Tiến độ đọc + Nút sao chép / chia sẻ */}
        <div className="tw:flex tw:items-center tw:gap-3 tw:shrink-0">
          <span className="tw:text-[0.78rem] tw:font-semibold tw:text-gold-700 tw:tabular-nums tw:bg-[#fff0c2] tw:px-2.5 tw:py-0.5 tw:rounded-full tw:border tw:border-gold-500/40">
            {progress}%
          </span>

          <button
            type="button"
            onClick={handleShare}
            aria-label={copied ? "Đã sao chép liên kết" : "Chia sẻ bài viết"}
            title={copied ? "Đã sao chép liên kết" : "Sao chép liên kết bài viết"}
            className={cx(
              "tw:inline-flex tw:items-center tw:gap-1.5 tw:px-3 tw:py-1 tw:text-[0.8rem] tw:font-medium tw:rounded-lg tw:border tw:transition-colors tw:cursor-pointer",
              copied
                ? "tw:bg-emerald-50 tw:border-emerald-500 tw:text-emerald-700"
                : "tw:bg-[rgba(255,248,230,0.8)] tw:border-[rgba(214,164,64,0.4)] tw:text-brown-800 tw:hover:text-brown-900 tw:hover:bg-[rgba(232,199,122,0.3)]",
              focusable,
            )}
          >
            {copied ? (
              <>
                <IconCheck size={14} stroke={2.2} className="tw:text-emerald-600" aria-hidden />
                <span className="tw:upto-640:hidden">Đã chép link</span>
              </>
            ) : (
              <>
                <IconShare size={14} stroke={2} className="tw:text-gold-700" aria-hidden />
                <span className="tw:upto-640:hidden">Chia sẻ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
