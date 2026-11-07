"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { IconLock, IconLockCheck, IconMail } from "@tabler/icons-react";
import { AuthInput } from "./AuthInput";
import { AuthNotice } from "./AuthNotice";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { PasswordInput } from "./PasswordInput";
import { SocialLoginGroup, type SocialProvider } from "./SocialLoginGroup";
import {
  PASSWORD_MIN_LENGTH,
  validateConfirmPassword,
  validateEmail,
  validateNewPassword,
} from "./validation";

type Errors = { email?: string; password?: string; confirmPassword?: string };

const PROVIDER_NAMES: Record<SocialProvider, string> = { google: "Google", apple: "Apple", facebook: "Facebook" };

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Ô xác nhận chỉ được kiểm tra trực tiếp sau khi người dùng rời ô (hoặc bấm gửi),
  // để không báo lỗi "không khớp" ngay từ ký tự đầu tiên.
  const [confirmTouched, setConfirmTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  // Cùng một quy tắc cho cả hai ô mật khẩu: khi ô xác nhận đã được chạm và có nội dung,
  // lỗi không khớp luôn được tính lại theo giá trị mới nhất.
  const syncConfirmError = (nextPassword: string, nextConfirm: string) => {
    if (!confirmTouched || !nextConfirm) return;
    setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(nextPassword, nextConfirm) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);
    setConfirmTouched(true);

    const nextErrors: Errors = {
      email: validateEmail(email),
      password: validateNewPassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };
    setErrors(nextErrors);

    // Đưa con trỏ tới ô sai đầu tiên
    if (nextErrors.email) return emailRef.current?.focus();
    if (nextErrors.password) return passwordRef.current?.focus();
    if (nextErrors.confirmPassword) return confirmRef.current?.focus();

    setIsLoading(true);
    // Giả lập tương tác đăng ký tài khoản
    setTimeout(() => {
      setIsLoading(false);
      setNotice("Hệ thống đăng ký tài khoản đang được chuẩn bị. Bạn có thể chép kinh dưới tư cách khách.");
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
          autoComplete="new-password"
          placeholder={`Tối thiểu ${PASSWORD_MIN_LENGTH} ký tự`}
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword(value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            syncConfirmError(value, confirmPassword);
          }}
          icon={<IconLock size={18} stroke={1.8} />}
          error={errors.password}
          disabled={isLoading}
        />

        <PasswordInput
          ref={confirmRef}
          label="Xác nhận mật khẩu"
          toggleName="xác nhận mật khẩu"
          autoComplete="new-password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => {
            const value = e.target.value;
            setConfirmPassword(value);
            if (!value) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            syncConfirmError(password, value);
          }}
          onBlur={() => {
            if (!confirmPassword) return;
            setConfirmTouched(true);
            setErrors((prev) => ({ ...prev, confirmPassword: validateConfirmPassword(password, confirmPassword) }));
          }}
          icon={<IconLockCheck size={18} stroke={1.8} />}
          error={errors.confirmPassword}
          disabled={isLoading}
        />

        <AuthSubmitButton isLoading={isLoading}>Tạo tài khoản</AuthSubmitButton>
      </form>

      <SocialLoginGroup
        mode="register"
        onSelectProvider={(provider) => setNotice(`Cổng đăng ký qua ${PROVIDER_NAMES[provider]} đang được kết nối.`)}
      />

      <div className="tw:flex tw:items-center tw:justify-center tw:gap-1.5 tw:mt-5 tw:text-[0.88rem] tw:text-[var(--brown-800)] font-zen-body">
        <span>Đã có tài khoản?</span>
        <Link
          href="/dang-nhap"
          className="tw:text-[var(--gold-700)] tw:font-semibold tw:hover:text-[var(--brown-900)] tw:hover:underline"
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
