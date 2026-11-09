"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { IconArrowRight, IconChevronDown, IconMenu2, IconPencil, IconX } from "@tabler/icons-react";
import { BrandMark } from "@/components/brand/LotusLogo";
import { NAV } from "@/components/layout/SiteNav";

const FOCUS =
  "tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2";

const noopSubscribe = () => () => {};

/*
 * Danh mục cho màn hình hẹp (≤1100px, nơi SiteNav bị ẩn): nút ba gạch mở ngăn kéo trượt từ
 * mép phải, nền mờ phía sau. Ngăn kéo render qua portal vào <body> vì header có backdrop-filter,
 * phần tử fixed nằm trong header sẽ bị giam trong khung header.
 * Đóng khi bấm link, chạm nền mờ, nhấn Esc hoặc khi bấm quay lại/tiến tới (nút back Android).
 * Không dùng usePathname: với Cache Components, hook đọc URL nằm ngoài <Suspense> chặn prerender.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  // Portal chỉ dựng ở trình duyệt (server không có document)
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPop = () => setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPop);
    closeRef.current?.focus({ preventScroll: true });
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPop);
      // Trả focus về nút mở nếu người dùng đang ở trong ngăn kéo
      if (panel?.contains(document.activeElement)) trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  const drawer = (
    <div className="tw:upto-1100:block tw:hidden" inert={!open}>
      {/* Nền mờ */}
      <div
        aria-hidden
        onClick={close}
        className={`tw:fixed tw:inset-0 tw:z-[60] tw:bg-[rgba(35,25,12,0.45)] tw:transition-opacity tw:duration-300 tw:motion-reduce:transition-none ${
          open ? "tw:opacity-100" : "tw:opacity-0 tw:pointer-events-none"
        }`}
      />

      {/* Ngăn kéo */}
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Danh mục"
        className={`tw:fixed tw:top-0 tw:right-0 tw:bottom-0 tw:z-[61] tw:flex tw:flex-col tw:w-[min(86vw,360px)] tw:bg-[radial-gradient(ellipse_at_80%_0%,#fffdf6,#fbf3df_70%)] tw:border-l tw:border-l-[rgba(214,164,64,0.4)] tw:shadow-[-24px_0_48px_-16px_rgba(90,60,10,0.35)] tw:transition-transform tw:duration-300 tw:ease-[cubic-bezier(0.22,1,0.36,1)] tw:motion-reduce:transition-none ${
          open ? "tw:translate-x-0" : "tw:translate-x-full"
        }`}
      >
        {/* Đầu ngăn kéo: logo và nút đóng */}
        <div className="tw:flex tw:items-center tw:justify-between tw:gap-3 tw:px-5 tw:pt-[max(16px,env(safe-area-inset-top))] tw:pb-4 tw:border-b tw:border-b-[rgba(214,164,64,0.3)]">
          <Link href="/" onClick={close} className={`tw:inline-flex tw:no-underline tw:hover:no-underline tw:[zoom:0.85] ${FOCUS}`}>
            <BrandMark size={32} light={false} />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Đóng danh mục"
            className={`tw:inline-flex tw:items-center tw:justify-center tw:w-10 tw:h-10 tw:shrink-0 tw:rounded-full tw:text-brown-900 tw:bg-[rgba(255,250,238,0.9)] tw:border tw:border-[rgba(214,164,64,0.45)] tw:cursor-pointer tw:transition-colors tw:duration-200 tw:hover:bg-[rgba(232,199,122,0.28)] ${FOCUS}`}
          >
            <IconX size={20} stroke={1.8} aria-hidden />
          </button>
        </div>

        {/* Danh mục: mỗi nhóm gập mở */}
        <nav aria-label="Danh mục" className="tw:flex-1 tw:overflow-y-auto tw:overscroll-contain tw:px-3 tw:py-2">
          <ul className="tw:m-0 tw:p-0 tw:list-none">
            {NAV.map((group, i) => (
              <li key={group.label} className="tw:not-first:border-t tw:not-first:border-t-[rgba(214,164,64,0.22)]">
                <details className="tw:group" open={i === 0}>
                  <summary
                    className={`tw:flex tw:items-center tw:justify-between tw:min-h-[52px] tw:px-2.5 tw:rounded-[10px] tw:list-none tw:cursor-pointer tw:font-title tw:font-semibold tw:text-[1.08rem] tw:text-brown-900 tw:[&::-webkit-details-marker]:hidden ${FOCUS}`}
                  >
                    {group.label}
                    <IconChevronDown
                      size={18}
                      aria-hidden
                      className="tw:text-gold-700 tw:transition-transform tw:duration-200 tw:group-open:rotate-180"
                    />
                  </summary>
                  <ul className="tw:m-0 tw:mb-2 tw:ml-2.5 tw:p-0 tw:pl-3 tw:list-none tw:border-l tw:border-l-[rgba(214,164,64,0.4)]">
                    {group.links.map(({ href, title, description }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={close}
                          className={`tw:flex tw:flex-col tw:gap-0.5 tw:px-2.5 tw:py-2 tw:rounded-[10px] tw:no-underline tw:hover:no-underline tw:hover:bg-[rgba(232,199,122,0.22)] ${FOCUS}`}
                        >
                          <span className="tw:text-[0.95rem] tw:font-medium tw:text-brown-900">{title}</span>
                          <span className="tw:text-[0.78rem] tw:text-brown-800 tw:opacity-80">{description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </nav>

        {/* Chân ngăn kéo: nút chép kinh (trên điện thoại header đã ẩn nút này) */}
        <div className="tw:px-5 tw:pt-4 tw:pb-[max(20px,env(safe-area-inset-bottom))] tw:border-t tw:border-t-[rgba(214,164,64,0.3)]">
          <Link
            href="/chep-kinh/bat-nha-tam-kinh"
            onClick={close}
            className="ck-btn-gold tw:w-full tw:min-h-12 tw:justify-center"
          >
            <IconPencil size={18} aria-hidden />
            Bắt đầu chép kinh
            <IconArrowRight size={17} stroke={2} className="ck-btn-arrow" aria-hidden />
          </Link>
          <p className="tw:mt-3 tw:mb-0 tw:text-center tw:font-title tw:italic tw:text-[0.85rem] tw:text-gold-700">
            Tâm an · Pháp lạc
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="tw:hidden tw:upto-1100:flex">
      <button
        ref={triggerRef}
        type="button"
        className={`tw:inline-flex tw:items-center tw:justify-center tw:w-10 tw:h-10 tw:rounded-full tw:text-brown-900 tw:bg-[rgba(255,250,238,0.85)] tw:border tw:border-[rgba(214,164,64,0.45)] tw:cursor-pointer tw:transition-colors tw:duration-200 tw:hover:bg-[rgba(232,199,122,0.28)] ${FOCUS}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label="Mở danh mục"
        onClick={() => setOpen(true)}
      >
        <IconMenu2 size={20} stroke={1.8} aria-hidden />
      </button>
      {isClient && createPortal(drawer, document.body)}
    </div>
  );
}
