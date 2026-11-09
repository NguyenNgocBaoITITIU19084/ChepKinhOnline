import Link from "next/link";
import { IconPencil } from "@tabler/icons-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { headerButton, hideSm } from "@/components/ui/classes";

// Header của các trang thường (trang chủ...): cùng thanh kính với trang chép kinh, nút chính là "Chép kinh".
// Trên điện thoại (≤480px) ẩn nút này để nhường chỗ cho nút danh mục; link vẫn có trong danh mục.
export function AppHeader() {
  return (
    <SiteHeader
      sticky
      actions={
        <Link href="/chep-kinh/bat-nha-tam-kinh" className={`ck-btn-ghost ${headerButton} tw:upto-480:hidden`}>
          <IconPencil size={18} /> <span className={hideSm}>Chép kinh</span>
        </Link>
      }
    />
  );
}
