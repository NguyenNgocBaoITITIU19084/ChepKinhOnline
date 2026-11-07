"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { IconLock, IconMail } from "@tabler/icons-react";
import { AuthInput } from "./AuthInput";
import { AuthNotice } from "./AuthNotice";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { PasswordInput } from "./PasswordInput";
import { SocialLoginGroup, type SocialProvider } from "./SocialLoginGroup";
import { validateEmail } from "./validation";

type Errors = { email?: string; password?: string };

const PROVIDER_NAMES: Record<SocialProvider, string> = { google: "Google", apple: "Apple", facebook: "Facebook" };

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Không tick sẵn: người dùng có thể đang ở máy dùng chung.
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    // Đăng nhập chỉ cần không để trống; độ dài tối thiểu là quy tắc của trang đăng ký.
    const nextErrors: Errors = {
      email: validateEmail(email),
      password: password ? undefined : "Vui lòng nhập mật khẩu.",
    };
    setErrors(nextErrors);

    // Đưa con trỏ tới ô sai đầu tiên
    if (nextErrors.email) return emailRef.current?.focus();
    if (nextErrors.password) return passwordRef.current?.focus();

    setIsLoading(true);
    // Giả lập tương tác gửi yêu cầu đăng nhập
    setTimeout(() => {
      setIsLoading(false);
      setNotice("Hệ thống xác thực tài khoản đang được chuẩn bị. Bạn có thể chép kinh dưới tư cách khách.");
    }, 900);
  };

  return (
    <div className="tw:flex tw:flex-col tw:w-full">
      <AuthNotice message={notice} />

      <form className="tw:flex tw:flex-col tw:gap-4 tw:w-full" onSubmit={handleSubmit} noValidate>
        <AuthInput
          ref={emailRef}
          label="Thư điện tử"
          type="email"
          autoComplete="email"
          placeholder="ban@vidu.vn"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          icon={<IconMail size={18} stroke={1.8} />}
          error={errors.email}
          disabled={isLoading}
        />

        <PasswordInput
          ref={passwordRef}
          label="Mật khẩu"
          autoComplete="current-password"
          placeholder="Nhập mật khẩu..."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          icon={<IconLock size={18} stroke={1.8} />}
          error={errors.password}
          disabled={isLoading}
        />

        <div className="tw:flex tw:items-center tw:justify-between tw:gap-3 tw:-mt-0.5 tw:text-[0.85rem] font-zen-body">
          <label className="tw:inline-flex tw:items-center tw:gap-2 tw:text-[var(--brown-800)] tw:cursor-pointer tw:select-none">
            <input
              type="checkbox"
              className="tw:w-4 tw:h-4 tw:rounded tw:border tw:border-[var(--gold-500)]/50 tw:bg-[var(--paper)] tw:accent-[var(--gold-500)] tw:cursor-pointer tw:focus-visible:outline-2 tw:focus-visible:outline-[var(--gold-500)] tw:focus-visible:outline-offset-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            <span>Ghi nhớ đăng nhập</span>
          </label>

          <button
            type="button"
            className="tw:text-[var(--gold-700)] tw:font-medium tw:transition-colors tw:hover:text-[var(--brown-900)] tw:hover:underline tw:focus-visible:outline-2 tw:focus-visible:outline-[var(--gold-500)] tw:focus-visible:outline-offset-2 tw:bg-transparent tw:border-0 tw:p-0 tw:cursor-pointer"
            onClick={() => setNotice("Tính năng Quên mật khẩu đang được hoàn thiện.")}
          >
            Quên mật khẩu?
          </button>
        </div>

        <AuthSubmitButton isLoading={isLoading}>Đăng nhập</AuthSubmitButton>
      </form>

      <SocialLoginGroup
        mode="login"
        onSelectProvider={(provider) => setNotice(`Cổng đăng nhập qua ${PROVIDER_NAMES[provider]} đang được kết nối.`)}
      />

      <div className="tw:flex tw:items-center tw:justify-center tw:gap-1.5 tw:mt-5 tw:text-[0.88rem] tw:text-[var(--brown-800)] font-zen-body">
        <span>Chưa có tài khoản?</span>
        <Link
          href="/dang-ky"
          className="tw:text-[var(--gold-700)] tw:font-semibold tw:hover:text-[var(--brown-900)] tw:hover:underline"
        >
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}
