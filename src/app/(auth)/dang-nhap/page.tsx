import type { Metadata } from "next";
import { LotusLogo } from "@/components/brand/LotusLogo";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập – Chép Kinh Online",
  description: "Đăng nhập vào không gian chép kinh trực tuyến Chép Kinh Online",
};

export default function LoginPage() {
  return (
    <div className="tw:flex tw:items-center tw:justify-center tw:min-h-[calc(100vh-180px)] tw:px-4 tw:py-10 tw:md:py-14">
      {/* Khung Thẻ Kính (Glass Login Card) sử dụng Tailwind */}
      <div className="tw:w-full tw:max-w-[440px] tw:p-6 tw:sm:p-8 tw:md:p-9 tw:rounded-[20px] tw:bg-white/75 tw:border tw:border-[rgba(214,164,64,0.35)] tw:shadow-[0_12px_32px_rgba(150,105,25,0.12)] tw:backdrop-blur-md tw:flex tw:flex-col tw:items-stretch">
        <header className="tw:flex tw:flex-col tw:items-center tw:text-center tw:mb-6">
          <div
            className="tw:flex tw:items-center tw:justify-center tw:w-[52px] tw:h-[52px] tw:mb-3.5 tw:rounded-full tw:bg-[#fff8e6] tw:border tw:border-[rgba(214,164,64,0.45)] tw:shadow-[0_4px_14px_rgba(150,105,25,0.08)]"
            aria-hidden="true"
          >
            <LotusLogo size={32} />
          </div>
          <h1 className="font-zen-title tw:text-2xl tw:sm:text-[1.65rem] tw:font-semibold tw:text-[var(--brown-900,#4a320a)] tw:mb-1.5 tw:tracking-tight">
            Đăng Nhập
          </h1>
          <p className="font-zen-body tw:text-[0.88rem] tw:text-[var(--brown-800,#6b4a12)] tw:opacity-85">
            Trở về án thư · Lắng lòng chép kinh
          </p>
        </header>

        <LoginForm />
      </div>
    </div>
  );
}
