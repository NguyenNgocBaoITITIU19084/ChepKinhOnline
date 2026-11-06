import Link from "next/link";
import { IconPencil } from "@tabler/icons-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import styles from "@/components/copy/copy.module.css";

// Header của các trang thường (trang chủ...): cùng thanh kính với trang chép kinh, nút chính là "Chép kinh"
export function AppHeader() {
  return (
    <SiteHeader
      sticky
      actions={
        <Link href="/chep-kinh/bat-nha-tam-kinh" className={styles.ghostButton}>
          <IconPencil size={18} /> <span className={styles.hideSm}>Chép kinh</span>
        </Link>
      }
    />
  );
}
