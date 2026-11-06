"use client";

import React, { useState } from "react";
import { IconEye, IconEyeOff, IconLock, IconMail, IconSparkles } from "@tabler/icons-react";
import { AuthInput } from "./AuthInput";
import { SocialLoginGroup } from "./SocialLoginGroup";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [notice, setNotice] = useState<string | null>(null);

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextErrors.email = "Vui lòng nhập địa chỉ thư điện tử.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Địa chỉ thư điện tử không hợp lệ.";
    }

    if (!password) {
      nextErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (password.length < 6) {
      nextErrors.password = "Mật khẩu cần tối thiểu 6 ký tự.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    if (!validate()) return;

    setIsLoading(true);
    // Giả lập tương tác gửi yêu cầu đăng nhập
    setTimeout(() => {
      setIsLoading(false);
      setNotice("Hệ thống xác thực tài khoản đang được chuẩn bị. Bạn có thể chép kinh dưới tư cách khách.");
    }, 900);
  };

  const handleSocialSelect = (provider: "google" | "apple" | "facebook") => {
    const providerNames = {
      google: "Google",
      apple: "Apple",
      facebook: "Facebook",
    };
    setNotice(`Cổng đăng nhập qua ${providerNames[provider]} đang được kết nối.`);
  };

  const handleInfoAction = (actionName: string) => {
    setNotice(`Tính năng ${actionName} đang được hoàn thiện.`);
  };

  return (
    <div className="tw:flex tw:flex-col tw:w-full">
      {notice && (
        <div
          className="tw:flex tw:items-center tw:gap-2 tw:p-3 tw:mb-4 tw:rounded-[10px] tw:bg-[#e8c77a]/25 tw:border tw:border-[rgba(214,164,64,0.4)] tw:text-[0.85rem] tw:text-[var(--brown-900,#4a320a)] font-zen-body"
          role="status"
        >
          <IconSparkles size={16} stroke={1.8} className="tw:shrink-0 tw:text-[#a8741a]" />
          <span>{notice}</span>
        </div>
      )}

      <form className="tw:flex tw:flex-col tw:gap-4 tw:w-full" onSubmit={handleSubmit} noValidate>
        <AuthInput
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

        <AuthInput
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
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
          endSlot={
            <button
              type="button"
              className="tw:flex tw:items-center tw:justify-center tw:w-[34px] tw:h-[34px] tw:p-0 tw:text-[var(--brown-800,#6b4a12)] tw:bg-transparent tw:border-0 tw:rounded-lg tw:cursor-pointer tw:transition-colors hover:tw:text-[var(--brown-900,#4a320a)] hover:tw:bg-[#e8c77a]/25 focus-visible:tw:outline-2 focus-visible:tw:outline-[#d6a440] focus-visible:tw:outline-offset-1"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              tabIndex={-1}
            >
              {showPassword ? <IconEyeOff size={18} stroke={1.8} /> : <IconEye size={18} stroke={1.8} />}
            </button>
          }
        />

        <div className="tw:flex tw:items-center tw:justify-between tw:-mt-0.5 tw:text-[0.85rem] font-zen-body">
          <label className="tw:inline-flex tw:items-center tw:gap-2 tw:text-[var(--brown-800,#6b4a12)] tw:cursor-pointer tw:select-none">
            <input
              type="checkbox"
              className="tw:w-4 tw:h-4 tw:rounded tw:border tw:border-[rgba(214,164,64,0.5)] tw:bg-[#fbf7ec] tw:accent-[#d6a440] tw:cursor-pointer focus-visible:tw:outline-2 focus-visible:tw:outline-[#d6a440] focus-visible:tw:outline-offset-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            <span>Ghi nhớ đăng nhập</span>
          </label>

          <button
            type="button"
            className="tw:text-[#a8741a] tw:font-medium tw:transition-colors hover:tw:text-[var(--brown-900,#4a320a)] hover:tw:underline focus-visible:tw:outline-2 focus-visible:tw:outline-[#d6a440] focus-visible:tw:outline-offset-2 tw:bg-transparent tw:border-0 tw:p-0 tw:cursor-pointer"
            onClick={() => handleInfoAction("Quên mật khẩu")}
          >
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          className="tw:relative tw:overflow-hidden tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:w-full tw:min-h-[46px] tw:mt-1.5 tw:px-5 tw:font-semibold tw:text-[0.94rem] tw:text-[var(--brown-900,#4a320a)] tw:bg-gradient-to-b tw:from-[#ffe699] tw:via-[#f5d77f] tw:to-[#d6a440] tw:border tw:border-[#edd17b] tw:rounded-full tw:cursor-pointer tw:select-none tw:shadow-[0_4px_14px_rgba(214,164,64,0.35)] tw:transition-all hover:tw:shadow-[0_6px_20px_rgba(214,164,64,0.5)] hover:tw:-translate-y-0.5 active:tw:translate-y-0 disabled:tw:opacity-60 disabled:tw:pointer-events-none font-zen-body"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="tw:inline-block tw:w-4 tw:h-4 tw:border-2 tw:border-[rgba(74,50,10,0.3)] tw:border-t-[var(--brown-900,#4a320a)] tw:rounded-full tw:animate-spin" />
          ) : (
            <span>Đăng nhập</span>
          )}
        </button>
      </form>

      <SocialLoginGroup onSelectProvider={handleSocialSelect} />

      <div className="tw:flex tw:items-center tw:justify-center tw:gap-1.5 tw:mt-5 tw:text-[0.88rem] tw:text-[var(--brown-800,#6b4a12)] font-zen-body">
        <span>Chưa có tài khoản?</span>
        <button
          type="button"
          className="tw:text-[#a8741a] tw:font-semibold hover:tw:text-[var(--brown-900,#4a320a)] hover:tw:underline tw:cursor-pointer tw:bg-transparent tw:border-0 tw:p-0"
          onClick={() => handleInfoAction("Đăng ký tài khoản")}
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
}
