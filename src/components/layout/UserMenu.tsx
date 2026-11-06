"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconChevronDown, IconLogin2, IconLogout, IconUser } from "@tabler/icons-react";
import type { CurrentUser } from "@/lib/auth";
import styles from "@/components/copy/copy.module.css";

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
      <Link href="/dang-nhap" className={styles.goldButton}>
        <IconLogin2 size={18} stroke={1.8} aria-hidden />
        <span className={styles.hideSm}>Đăng nhập</span>
      </Link>
    );
  }

  const displayName = user.name?.trim() || user.email;

  return (
    <div ref={rootRef} className={styles.userMenu}>
      <button
        type="button"
        className={styles.userButton}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className={styles.avatar} aria-hidden>
          {initials(user)}
        </span>
        <span className={`${styles.userName} ${styles.hideSm}`}>{displayName}</span>
        <IconChevronDown size={16} aria-hidden />
      </button>

      {open && (
        <div className={`${styles.glass} ${styles.menu}`} role="menu">
          <div className={styles.menuHead}>
            <strong>{displayName}</strong>
            <span>{user.email}</span>
          </div>
          <Link href="/tai-khoan" className={styles.menuItem} role="menuitem" onClick={() => setOpen(false)}>
            <IconUser size={18} /> Hồ sơ của tôi
          </Link>
          <Link href="/dang-xuat" className={styles.menuItem} role="menuitem" onClick={() => setOpen(false)}>
            <IconLogout size={18} /> Đăng xuất
          </Link>
        </div>
      )}
    </div>
  );
}
