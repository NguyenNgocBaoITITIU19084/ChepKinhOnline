import { AppHeader } from "@/components/layout/AppHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import styles from "@/components/copy/copy.module.css";

// Trang xác thực (đăng nhập, đăng ký...): cùng nền `.scene`, header và footer với nhóm (app),
// nhưng bỏ lời hồi hướng ở chân trang cho gọn.
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.scene}>
      <AppHeader />
      <main className="tw:flex-1">{children}</main>
      <SiteFooter showDedication={false} />
    </div>
  );
}
