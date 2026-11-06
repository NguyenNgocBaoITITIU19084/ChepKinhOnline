import { AppHeader } from "@/components/layout/AppHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import styles from "@/components/copy/copy.module.css";

// `.scene` cho nền kem hoa văn chữ Vạn và bảng màu dùng chung với trang chép kinh
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className={styles.scene}>
      <AppHeader />
      <main className="tw:flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
