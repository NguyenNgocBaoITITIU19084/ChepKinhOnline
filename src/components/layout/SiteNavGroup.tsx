"use client";

import { useState, type ReactNode } from "react";

/*
 * Một mục danh mục trên header. Dropdown mở bằng CSS (:hover / :focus-within), nhưng header
 * không dựng lại khi chuyển trang: link vừa bấm vẫn giữ focus và chuột vẫn nằm trên menu,
 * nên menu cứ mở mãi. Bấm link thì gắn data-closed (CSS ép ẩn) và bỏ focus; menu chỉ mở lại
 * khi chuột rời khỏi mục rồi quay lại, hoặc khi focus lại bằng bàn phím.
 */
export function SiteNavGroup({ children }: { children: ReactNode }) {
  const [closed, setClosed] = useState(false);

  return (
    <li
      className="ck-nav-group tw:group tw:relative"
      data-closed={closed || undefined}
      onClick={(e) => {
        if (!(e.target as Element).closest("a")) return;
        setClosed(true);
        (document.activeElement as HTMLElement | null)?.blur();
      }}
      onPointerLeave={() => setClosed(false)}
      onKeyUp={(e) => e.key === "Tab" && setClosed(false)}
    >
      {children}
    </li>
  );
}
