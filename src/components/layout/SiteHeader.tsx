import type { ReactNode } from "react";
import { Suspense } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/brand/LotusLogo";
import { SiteNav } from "@/components/layout/SiteNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { UserMenu } from "@/components/layout/UserMenu";
import { getCurrentUser } from "@/lib/auth";
import { avatar } from "@/components/ui/classes";

type Props = {
  // Nút riêng của từng trang, đứng trước menu tài khoản
  actions?: ReactNode;
  // Trang chủ cuộn dài nên giữ header dính trên cùng; trang chép kinh thì không
  sticky?: boolean;
};

// Thanh kính mờ trên cùng, dùng chung cho mọi trang: logo | danh mục | nút + tài khoản.
export function SiteHeader({ actions, sticky = false }: Props) {
  return (
    <header
      className={`ck-glass tw:flex tw:items-center tw:justify-between tw:gap-4 tw:mx-5 tw:mt-3 tw:mb-0 tw:py-[7px] tw:pr-2 tw:pl-3.5 tw:max-lg:mx-4 tw:max-lg:mt-2.5 tw:upto-480:pl-2 tw:upto-360:mx-2.5 tw:upto-360:gap-2 ${
        // Trang chủ: header dính trên cùng khi cuộn; còn lại z-20 để menu tài khoản nổi trên sách
        sticky ? "tw:sticky tw:top-3 tw:z-40" : "tw:relative tw:z-20"
      }`}
    >
      <Link href="/" className="tw:inline-flex tw:no-underline tw:hover:no-underline tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2 tw:upto-480:[zoom:0.85] tw:upto-360:[zoom:0.7]" aria-label="Chép Kinh Online - trang chủ">
        <BrandMark size={34} light={false} />
      </Link>
      <SiteNav />
      <nav className="tw:flex tw:items-center tw:gap-2 tw:upto-360:gap-1.5" aria-label="Tài khoản">
        {actions}
        <Suspense fallback={<span className={avatar} aria-hidden />}>
          <HeaderUser />
        </Suspense>
        <MobileNav />
      </nav>
    </header>
  );
}

async function HeaderUser() {
  return <UserMenu user={await getCurrentUser()} />;
}
