import type { ReactNode } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand/LotusLogo";
import { SiteNav } from "@/components/layout/SiteNav";
import { UserMenu } from "@/components/layout/UserMenu";
import { getCurrentUser } from "@/lib/auth";
import styles from "@/components/copy/copy.module.css";

type Props = {
  // Nút riêng của từng trang, đứng trước menu tài khoản
  actions?: ReactNode;
  // Trang chủ cuộn dài nên giữ header dính trên cùng; trang chép kinh thì không
  sticky?: boolean;
};

// Thanh kính mờ trên cùng, dùng chung cho mọi trang: logo | danh mục | nút + tài khoản.
// Phải nằm trong một phần tử có class `.scene` để có bảng màu --gold-*, --brown-*.
export function SiteHeader({ actions, sticky = false }: Props) {
  return (
    <header className={`${styles.glass} ${styles.siteHeader} ${sticky ? styles.siteHeaderSticky : ""}`}>
      <Link href="/" className={styles.brandLink} aria-label="Chép Kinh Online - trang chủ">
        <BrandMark size={34} light={false} />
      </Link>
      <SiteNav />
      <nav className={styles.headerActions} aria-label="Tài khoản">
        {actions}
        <Suspense fallback={<span className={styles.avatar} aria-hidden />}>
          <HeaderUser />
        </Suspense>
      </nav>
    </header>
  );
}

async function HeaderUser() {
  return <UserMenu user={await getCurrentUser()} />;
}
