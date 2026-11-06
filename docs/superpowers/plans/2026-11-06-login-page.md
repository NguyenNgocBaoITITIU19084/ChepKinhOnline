# Login Page UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive, and zen-themed login interface for Chép Kinh Online at `/dang-nhap` with Email/Password fields, Google/Apple/Facebook social login buttons, interactive validation, and strict adherence to the project's design system.

**Architecture:** The page is structured inside the Next.js `(app)` route group to inherit `AppHeader`, `SiteFooter`, and the `.scene` background styling. Client components encapsulate form interactivity, password visibility toggling, input validation, and social login feedback using pure CSS Modules and Tabler Icons without introducing unnecessary third-party dependencies.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tabler Icons (`@tabler/icons-react`), CSS Modules with design tokens (`--gold-*`, `--brown-*`, `--paper`, `--ink-*`).

## Global Constraints

- Must adhere strictly to the project's design system: gold (`--gold-500`, `--gold-700`), brown (`--brown-800`, `--brown-900`), paper (`--paper`), and ink (`--ink`, `--ink-wrong`).
- Must use Tabler Icons (`@tabler/icons-react`) with standard 18-20px sizing and 1.8-2px stroke.
- Must not use generic AI-style purple/blue gradients or browser default outline rings.
- Must use typography: `var(--font-sans)` (Be Vietnam Pro) for UI/labels and `var(--font-display)` / `var(--font-book)` (Lora) for titles.
- Must support responsive mobile screens (down to 320px) without breaking layout.

---

### Task 1: Create Auth Input Component (`AuthInput.tsx`)

**Files:**
- Create: `src/components/auth/AuthInput.tsx`
- Create: `src/components/auth/auth.module.css`

**Interfaces:**
- Produces: `AuthInput` component accepting standard `InputHTMLAttributes<HTMLInputElement>` plus `label`, `error`, `icon`, and `endSlot`.

- [ ] **Step 1: Write `src/components/auth/auth.module.css`**

```css
/* Styling cho các phần tử xác thực tuân thủ tokens của Chép Kinh Online */
.inputGroup {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.inputLabel {
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--brown-800, #6b4a12);
  user-select: none;
}

.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  background: rgba(251, 247, 236, 0.85);
  border: 1px solid rgba(214, 164, 64, 0.35);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.inputWrapper:hover {
  border-color: rgba(214, 164, 64, 0.6);
  background: rgba(251, 247, 236, 0.95);
}

.inputWrapper:focus-within {
  border-color: var(--gold-500, #d6a440);
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(214, 164, 64, 0.18);
}

.inputWrapperError {
  border-color: var(--ink-wrong, #b45309) !important;
  background: rgba(255, 248, 246, 0.95);
  box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.15) !important;
}

.inputIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 12px;
  color: var(--gold-700, #a8741a);
  pointer-events: none;
  flex-shrink: 0;
}

.inputField {
  flex: 1;
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.94rem;
  color: var(--ink, #2b2116);
  background: transparent;
  border: none;
  outline: none;
}

.inputField::placeholder {
  color: var(--ink-ghost, rgba(120, 95, 55, 0.45));
}

.inputEndSlot {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 8px;
  flex-shrink: 0;
}

.iconButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  color: var(--brown-800, #6b4a12);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;
}

.iconButton:hover {
  color: var(--brown-900, #4a320a);
  background: rgba(232, 199, 122, 0.25);
}

.iconButton:focus-visible {
  outline: 2px solid var(--gold-500, #d6a440);
  outline-offset: 1px;
}

.errorMessage {
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.8rem;
  color: var(--ink-wrong, #b45309);
  margin-top: 2px;
}
```

- [ ] **Step 2: Write `src/components/auth/AuthInput.tsx`**

```tsx
import React, { forwardRef, useId } from "react";
import styles from "./auth.module.css";

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  endSlot?: React.ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(function AuthInput(
  { label, error, icon, endSlot, id: externalId, className, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={inputId} className={styles.inputLabel}>
        {label}
      </label>
      <div className={`${styles.inputWrapper} ${error ? styles.inputWrapperError : ""}`}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={`${styles.inputField} ${className || ""}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        {endSlot && <div className={styles.inputEndSlot}>{endSlot}</div>}
      </div>
      {error && (
        <span id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});
```

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Exits with code 0 (no compile errors).

- [ ] **Step 4: Commit**

```bash
git add src/components/auth/auth.module.css src/components/auth/AuthInput.tsx
git commit -m "feat(auth): create AuthInput component with zen styling"
```

---

### Task 2: Create Social Login Component (`SocialLoginGroup.tsx`)

**Files:**
- Create: `src/components/auth/SocialLoginGroup.tsx`
- Modify: `src/components/auth/auth.module.css`

**Interfaces:**
- Produces: `SocialLoginGroup` component accepting `onSelectProvider?: (provider: "google" | "apple" | "facebook") => void`.

- [ ] **Step 1: Add Social Button styles to `src/components/auth/auth.module.css`**

Append to `src/components/auth/auth.module.css`:
```css
.socialDivider {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 22px 0 18px;
  width: 100%;
}

.socialDivider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(214, 164, 64, 0.3);
}

.socialDividerText {
  position: relative;
  z-index: 1;
  padding: 0 12px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.8rem;
  color: var(--ink-ghost, rgba(120, 95, 55, 0.7));
  background: rgba(255, 255, 255, 0.85);
  border-radius: 999px;
}

.socialGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
}

.socialButton {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 10px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--brown-800, #6b4a12);
  background: rgba(251, 247, 236, 0.85);
  border: 1px solid rgba(214, 164, 64, 0.4);
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  transition: all 0.2s ease;
}

.socialButton:hover {
  background: rgba(232, 199, 122, 0.25);
  border-color: var(--gold-500, #d6a440);
  color: var(--brown-900, #4a320a);
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(150, 105, 25, 0.08);
}

.socialButton:active {
  transform: translateY(0);
}

.socialButton:focus-visible {
  outline: 2px solid var(--gold-500, #d6a440);
  outline-offset: 2px;
}

.socialIcon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
```

- [ ] **Step 2: Create `src/components/auth/SocialLoginGroup.tsx`**

```tsx
"use client";

import React from "react";
import { IconBrandApple, IconBrandFacebook } from "@tabler/icons-react";
import styles from "./auth.module.css";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export interface SocialLoginGroupProps {
  onSelectProvider?: (provider: "google" | "apple" | "facebook") => void;
}

export function SocialLoginGroup({ onSelectProvider }: SocialLoginGroupProps) {
  const handleClick = (provider: "google" | "apple" | "facebook") => {
    if (onSelectProvider) {
      onSelectProvider(provider);
    }
  };

  return (
    <div className={styles.socialSection}>
      <div className={styles.socialDivider}>
        <span className={styles.socialDividerText}>hoặc tiếp tục với</span>
      </div>

      <div className={styles.socialGrid}>
        <button
          type="button"
          className={styles.socialButton}
          onClick={() => handleClick("google")}
          aria-label="Đăng nhập bằng Google"
        >
          <span className={styles.socialIcon}>
            <GoogleIcon />
          </span>
          <span>Google</span>
        </button>

        <button
          type="button"
          className={styles.socialButton}
          onClick={() => handleClick("apple")}
          aria-label="Đăng nhập bằng Apple"
        >
          <span className={styles.socialIcon}>
            <IconBrandApple size={18} stroke={2} />
          </span>
          <span>Apple</span>
        </button>

        <button
          type="button"
          className={styles.socialButton}
          onClick={() => handleClick("facebook")}
          aria-label="Đăng nhập bằng Facebook"
        >
          <span className={styles.socialIcon} style={{ color: "#1877F2" }}>
            <IconBrandFacebook size={18} stroke={2} />
          </span>
          <span>Facebook</span>
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Exits with code 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/auth/SocialLoginGroup.tsx src/components/auth/auth.module.css
git commit -m "feat(auth): create SocialLoginGroup component with Google, Apple, Facebook"
```

---

### Task 3: Create Login Form Component (`LoginForm.tsx`)

**Files:**
- Create: `src/components/auth/LoginForm.tsx`
- Modify: `src/components/auth/auth.module.css`

**Interfaces:**
- Consumes: `AuthInput`, `SocialLoginGroup`, and `styles.goldButton` from `copy.module.css`.
- Produces: `LoginForm` component managing validation state, password visibility, remember me checkbox, loading feedback, and notifications.

- [ ] **Step 1: Add form layout, checkbox, submit button, and toast styling to `src/components/auth/auth.module.css`**

Append to `src/components/auth/auth.module.css`:
```css
.loginForm {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.optionsRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -2px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.85rem;
}

.rememberLabel {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--brown-800, #6b4a12);
  cursor: pointer;
  user-select: none;
}

.checkbox {
  appearance: none;
  width: 17px;
  height: 17px;
  margin: 0;
  border-radius: 4px;
  background: rgba(251, 247, 236, 0.95);
  border: 1px solid rgba(214, 164, 64, 0.5);
  cursor: pointer;
  display: grid;
  place-content: center;
  transition: all 0.15s ease;
}

.checkbox:checked {
  background: var(--gold-500, #d6a440);
  border-color: var(--gold-700, #a8741a);
}

.checkbox:checked::after {
  content: "";
  width: 5px;
  height: 9px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px);
}

.checkbox:focus-visible {
  outline: 2px solid var(--gold-500, #d6a440);
  outline-offset: 2px;
}

.forgotLink {
  color: var(--gold-700, #a8741a);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s ease;
}

.forgotLink:hover {
  color: var(--brown-900, #4a320a);
  text-decoration: underline;
}

.forgotLink:focus-visible {
  outline: 2px solid var(--gold-500, #d6a440);
  outline-offset: 2px;
}

.submitButton {
  width: 100%;
  margin-top: 6px;
  cursor: pointer;
}

.submitSpinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(74, 50, 10, 0.3);
  border-top-color: var(--brown-900, #4a320a);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.cardFooter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 20px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.88rem;
  color: var(--brown-800, #6b4a12);
}

.registerLink {
  color: var(--gold-700, #a8741a);
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
}

.registerLink:hover {
  color: var(--brown-900, #4a320a);
  text-decoration: underline;
}

.noticeToast {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  background: rgba(232, 199, 122, 0.25);
  border: 1px solid rgba(214, 164, 64, 0.4);
  font-size: 0.85rem;
  color: var(--brown-900, #4a320a);
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 2: Create `src/components/auth/LoginForm.tsx`**

```tsx
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
```

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Exits with code 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/auth/LoginForm.tsx src/components/auth/auth.module.css
git commit -m "feat(auth): create LoginForm component with validation and state"
```

---

### Task 4: Create Login Page (`src/app/(app)/dang-nhap/page.tsx`)

**Files:**
- Create: `src/app/(app)/dang-nhap/page.tsx`
- Create: `src/app/(app)/dang-nhap/page.module.css`

**Interfaces:**
- Consumes: `LoginForm`, `LotusLogo`, and `.glass` class from `copy.module.css`.
- Produces: The server/client page route `/dang-nhap`.

- [ ] **Step 1: Write `src/app/(app)/dang-nhap/page.module.css`**

```css
.loginContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 180px);
  padding: 40px 16px 60px;
}

.loginCard {
  width: 100%;
  max-width: 440px;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.cardHeader {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
}

.headerEmblem {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  margin-bottom: 14px;
  border-radius: 999px;
  background: var(--gold-100, #fff8e6);
  border: 1px solid rgba(214, 164, 64, 0.45);
  box-shadow: 0 4px 14px rgba(150, 105, 25, 0.08);
}

.cardTitle {
  font-family: var(--font-display), Georgia, serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--brown-900, #4a320a);
  margin: 0 0 6px 0;
  letter-spacing: -0.01em;
}

.cardSubtitle {
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.88rem;
  color: var(--brown-800, #6b4a12);
  opacity: 0.85;
  margin: 0;
}

@media (max-width: 480px) {
  .loginContainer {
    padding: 24px 12px 48px;
  }

  .loginCard {
    padding: 28px 20px;
  }

  .cardTitle {
    font-size: 1.45rem;
  }
}
```

- [ ] **Step 2: Create `src/app/(app)/dang-nhap/page.tsx`**

```tsx
import type { Metadata } from "next";
import copyStyles from "@/components/copy/copy.module.css";
import { LotusLogo } from "@/components/brand/LotusLogo";
import { LoginForm } from "@/components/auth/LoginForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Đăng nhập – Chép Kinh Online",
  description: "Đăng nhập vào không gian chép kinh trực tuyến Chép Kinh Online",
};

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={`${copyStyles.glass} ${styles.loginCard}`}>
        <header className={styles.cardHeader}>
          <div className={styles.headerEmblem} aria-hidden>
            <LotusLogo size={32} />
          </div>
          <h1 className={styles.cardTitle}>Đăng Nhập</h1>
          <p className={styles.cardSubtitle}>Trở về án thư · Lắng lòng chép kinh</p>
        </header>

        <LoginForm />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Exits with code 0.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(app\)/dang-nhap/page.tsx src/app/\(app\)/dang-nhap/page.module.css
git commit -m "feat(auth): add /dang-nhap login page with zen card layout"
```

---

### Task 5: Project Build Verification and Polish

**Files:**
- Test / Verify: Entire Next.js project build and linting

- [ ] **Step 1: Run Next.js production build**

Run: `npm run build`
Expected: Successfully generates static routes and dynamic routes without any error, including `/dang-nhap`.

- [ ] **Step 2: Run linter**

Run: `npm run lint`
Expected: Exits with code 0.

- [ ] **Step 3: Verification commit (if any fixes made)**

```bash
git status
```
Expected: Clean working tree.
