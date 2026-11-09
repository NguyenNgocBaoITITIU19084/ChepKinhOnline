"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconArrowRight, IconChevronDown, IconLogin2 } from "@tabler/icons-react";
import type { CurrentUser } from "@/lib/auth";
import { avatar, headerButton, hideSm } from "@/components/ui/classes";

const menuItem = "ck-menu-item ck-menu-item-sm";

function initials(user: CurrentUser) {
  const source = user.name?.trim() || user.email;
  const words = source.split(/\s+/);
  // Tên tiếng Việt: lấy chữ đầu của họ và tên (vd. "Nguyễn Văn An" -> "NA")
  const letters = words.length > 1 ? words[0][0] + words[words.length - 1][0] : source[0];
  return letters.toLocaleUpperCase("vi");
}

export function UserMenu({ user }: { user: CurrentUser | null }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Đóng menu khi bấm ra ngoài hoặc nhấn Esc
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) {
    return (
      <Link href="/dang-nhap" className={`ck-btn-gold ${headerButton}`}>
        <IconLogin2 size={18} stroke={1.8} aria-hidden />
        <span className={hideSm}>Đăng nhập</span>
      </Link>
    );
  }

  const displayName = user.name?.trim() || user.email;

  return (
    <div ref={rootRef} className="tw:relative">
      <button
        type="button"
        className="ck-font-inherit tw:inline-flex tw:items-center tw:gap-2 tw:min-h-10 tw:py-[3px] tw:pr-3 tw:pl-1 tw:text-[0.88rem] tw:font-medium tw:text-brown-800 tw:bg-[rgba(251,247,236,0.85)] tw:backdrop-blur-[8px] tw:border tw:border-solid tw:border-[rgba(168,116,26,0.35)] tw:rounded-[999px] tw:cursor-pointer tw:transition-all tw:duration-[250ms] tw:ease-[ease] tw:hover:text-brown-900 tw:hover:bg-gold-100 tw:hover:border-gold-500 tw:aria-expanded:text-brown-900 tw:aria-expanded:bg-gold-100 tw:aria-expanded:border-gold-500 tw:upto-360:gap-0.5 tw:upto-360:pr-1.5 tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className={avatar} aria-hidden>
          {initials(user)}
        </span>
        <span className={`tw:max-w-40 tw:truncate ${hideSm}`}>{displayName}</span>
        <IconChevronDown size={16} aria-hidden />
      </button>

      <div
        className={`ck-menu ck-menu-end ck-menu-pop tw:top-[calc(100%+12px)] tw:right-0 tw:w-64 ${open ? "ck-menu-open" : ""}`}
        role="menu"
        aria-hidden={!open}
      >
        <div className="tw:flex tw:items-center tw:gap-3 tw:pt-2.5 tw:px-3 tw:pb-1">
          <span className={`${avatar} tw:size-10 tw:text-[0.9rem]`} aria-hidden>
            {initials(user)}
          </span>
          <span className="tw:flex tw:flex-col tw:min-w-0">
            <strong className="ck-menu-title tw:truncate">{displayName}</strong>
            <span className="ck-menu-desc tw:truncate">{user.email}</span>
          </span>
        </div>
        <div className="ck-menu-divider" />
        <Link href="/tai-khoan" className={menuItem} role="menuitem" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          Hồ sơ của tôi
          <IconArrowRight size={14} className="ck-menu-arrow" aria-hidden />
        </Link>
        <Link href="/dang-xuat" className={menuItem} role="menuitem" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          Đăng xuất
          <IconArrowRight size={14} className="ck-menu-arrow" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
