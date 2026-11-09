"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import { NAV } from "@/components/layout/SiteNav";

const FOCUS =
  "tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2";

/*
 * Danh mục cho màn hình hẹp (≤1100px, nơi SiteNav bị ẩn): nút ba gạch mở một tấm kính
 * thả xuống ngay dưới header, mỗi nhóm là một mục gập mở. Đóng khi bấm link, chạm ra ngoài,
 * nhấn Esc hoặc khi đường dẫn đổi. Header có backdrop-filter nên không dùng lớp phủ fixed
 * (sẽ bị giam trong header), thay bằng bắt sự kiện chạm ngoài.
 */
export function MobileNav() {
  const pathname = usePathname();
  // Ghi lại trang lúc mở menu: sang trang khác thì tự coi như đã đóng, không cần effect
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (next: boolean | ((v: boolean) => boolean)) =>
    setOpenedOn((prev) => {
      const wasOpen = prev === pathname;
      return (typeof next === "function" ? next(wasOpen) : next) ? pathname : null;
    });
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenedOn(null);
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenedOn(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="tw:hidden tw:upto-1100:flex">
      <button
        type="button"
        className={`tw:inline-flex tw:items-center tw:justify-center tw:w-10 tw:h-10 tw:rounded-full tw:text-brown-900 tw:bg-[rgba(255,250,238,0.85)] tw:border tw:border-[rgba(214,164,64,0.45)] tw:cursor-pointer tw:transition-colors tw:duration-200 tw:hover:bg-[rgba(232,199,122,0.28)] ${FOCUS}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Đóng danh mục" : "Mở danh mục"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <IconX size={20} stroke={1.8} aria-hidden /> : <IconMenu2 size={20} stroke={1.8} aria-hidden />}
      </button>

      {open && (
        <nav
            id={panelId}
            aria-label="Danh mục"
            className="tw:absolute tw:bg-[#fffaf0] tw:border tw:border-[rgba(214,164,64,0.35)] tw:rounded-[16px] tw:shadow-[0_18px_40px_-12px_rgba(120,85,20,0.35)] tw:left-0 tw:right-0 tw:top-[calc(100%+8px)] tw:z-50 tw:max-h-[calc(100dvh-96px)] tw:overflow-y-auto tw:overscroll-contain tw:p-2"
          >
            <ul className="tw:m-0 tw:p-0 tw:list-none">
              {NAV.map((group, i) => (
                <li key={group.label} className="tw:not-first:border-t tw:not-first:border-t-[rgba(214,164,64,0.25)]">
                  <details className="tw:group" open={i === 0}>
                    <summary
                      className={`tw:flex tw:items-center tw:justify-between tw:min-h-12 tw:px-3 tw:rounded-[10px] tw:list-none tw:cursor-pointer tw:font-medium tw:text-[0.98rem] tw:text-brown-900 tw:[&::-webkit-details-marker]:hidden ${FOCUS}`}
                    >
                      {group.label}
                      <IconChevronDown
                        size={16}
                        aria-hidden
                        className="tw:text-gold-700 tw:transition-transform tw:duration-200 tw:group-open:rotate-180"
                      />
                    </summary>
                    <ul className="tw:m-0 tw:pb-2 tw:px-1 tw:list-none">
                      {group.links.map(({ href, title, description }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            onClick={() => setOpen(false)}
                            className={`tw:flex tw:flex-col tw:gap-0.5 tw:px-3 tw:py-2.5 tw:rounded-[10px] tw:no-underline tw:hover:no-underline tw:hover:bg-[rgba(232,199,122,0.22)] ${FOCUS}`}
                          >
                            <strong className="tw:font-title tw:text-[0.98rem] tw:font-semibold tw:text-brown-900">
                              {title}
                            </strong>
                            <span className="tw:text-[0.8rem] tw:text-brown-800 tw:opacity-85">{description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </nav>
      )}
    </div>
  );
}
