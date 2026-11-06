"use client";

import React, { useState } from "react";
import { IconEye, IconEyeOff, IconLock, IconMail, IconSparkles } from "@tabler/icons-react";
import copyStyles from "@/components/copy/copy.module.css";
import styles from "./auth.module.css";
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
    <div className={styles.formContainer}>
      {notice && (
        <div className={styles.noticeToast} role="status">
          <IconSparkles size={16} stroke={1.8} />
          <span>{notice}</span>
        </div>
      )}

      <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
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
              className={styles.iconButton}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              tabIndex={-1}
            >
              {showPassword ? <IconEyeOff size={18} stroke={1.8} /> : <IconEye size={18} stroke={1.8} />}
            </button>
          }
        />

        <div className={styles.optionsRow}>
          <label className={styles.rememberLabel}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            <span>Ghi nhớ đăng nhập</span>
          </label>

          <button
            type="button"
            className={styles.forgotLink}
            onClick={() => handleInfoAction("Quên mật khẩu")}
          >
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          className={`${copyStyles.goldButton} ${styles.submitButton}`}
          disabled={isLoading}
        >
          {isLoading ? <span className={styles.submitSpinner} /> : <span>Đăng nhập</span>}
        </button>
      </form>

      <SocialLoginGroup onSelectProvider={handleSocialSelect} />

      <div className={styles.cardFooter}>
        <span>Chưa có tài khoản?</span>
        <button
          type="button"
          className={styles.registerLink}
          onClick={() => handleInfoAction("Đăng ký tài khoản")}
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
}
