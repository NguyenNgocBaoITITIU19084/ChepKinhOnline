import { LotusLogo } from "@/components/brand/LotusLogo";

export interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

// Khung thẻ kính dùng chung cho các trang xác thực (đăng nhập, đăng ký...).
// Màu lấy từ biến của `.scene` (xem src/components/copy/copy.module.css).
export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="tw:flex tw:flex-1 tw:items-center tw:justify-center tw:px-4 tw:py-10 tw:md:py-14">
      <div className="tw:w-full tw:max-w-[440px] tw:p-6 tw:sm:p-8 tw:md:p-9 tw:rounded-[20px] tw:bg-white/75 tw:border tw:border-[var(--gold-500)]/35 tw:shadow-[0_12px_32px_rgba(150,105,25,0.12)] tw:backdrop-blur-md tw:flex tw:flex-col tw:items-stretch">
        <header className="tw:flex tw:flex-col tw:items-center tw:text-center tw:mb-6">
          <div
            className="tw:flex tw:items-center tw:justify-center tw:w-[52px] tw:h-[52px] tw:mb-3.5 tw:rounded-full tw:bg-[var(--gold-100)] tw:border tw:border-[var(--gold-500)]/45 tw:shadow-[0_4px_14px_rgba(150,105,25,0.08)]"
            aria-hidden="true"
          >
            <LotusLogo size={32} />
          </div>
          <h1 className="font-zen-title tw:text-2xl tw:sm:text-[1.65rem] tw:font-semibold tw:text-[var(--brown-900)] tw:mb-1.5 tw:tracking-tight">
            {title}
          </h1>
          <p className="font-zen-body tw:text-[0.88rem] tw:text-[var(--brown-800)] tw:opacity-85">{subtitle}</p>
        </header>

        {children}
      </div>
    </div>
  );
}
