# Register Page UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive, and zen-themed registration interface for Chép Kinh Online at `/dang-ky` with pure Tailwind CSS (`tw:` prefix), including Email, Password, Confirm Password ("Xác nhận mật khẩu") fields, social logins, real-time validation, and two-way navigation with `/dang-nhap`.

**Architecture:** Placed inside the `src/app/(auth)` route group to inherit `AuthLayout` (`AppHeader` + `SiteFooter showDedication={false}` on `.scene` background). Pure Tailwind CSS using `tw:` and `tw:variant:` syntax. Client components encapsulate form interactivity, visibility toggles, and matching checks.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS (prefix `tw:`), Tabler Icons (`@tabler/icons-react`).

## Global Constraints

- Must use 100% Tailwind CSS with `tw:` prefix (e.g. `tw:flex`, `tw:hover:`, `tw:focus-within:`, `tw:sm:`). No CSS modules.
- Must adhere strictly to the project's design system: gold (`--gold-500`, `--gold-700`), brown (`--brown-800`, `--brown-900`), paper (`--paper`), and ink (`--ink`, `--ink-wrong`).
- Must explicitly feature 3 fields: Thư điện tử, Mật khẩu, and Xác nhận mật khẩu (with `IconLockCheck` and independent eye toggle).
- Must use Tabler Icons (`@tabler/icons-react`) with standard 18-20px sizing.
- Must use typography: `font-zen-body` (Be Vietnam Pro) and `font-zen-title` (Lora).

---

### Task 1: Create Register Form Component (`RegisterForm.tsx`)

**Files:**
- Create: `src/components/auth/RegisterForm.tsx`

**Interfaces:**
- Consumes: `AuthInput`, `SocialLoginGroup`, and `Link` from `next/link`.
- Produces: `RegisterForm` component with fields for Email, Password, Confirm Password, validation state, independent eye toggles, loading feedback, and navigation link to `/dang-nhap`.

- [ ] **Step 1: Create `src/components/auth/RegisterForm.tsx`**

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IconEye, IconEyeOff, IconLock, IconLockCheck, IconMail, IconSparkles } from "@tabler/icons-react";
import { AuthInput } from "./AuthInput";
import { SocialLoginGroup } from "./SocialLoginGroup";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});
  const [notice, setNotice] = useState<string | null>(null);

  const validate = () => {
    const nextErrors: { email?: string; password?: string; confirmPassword?: string } = {};

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

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Vui lòng xác nhận lại mật khẩu.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    if (!validate()) return;

    setIsLoading(true);
    // Giả lập tương tác đăng ký tài khoản
    setTimeout(() => {
      setIsLoading(false);
      setNotice("Hệ thống đăng ký tài khoản đang được chuẩn bị. Bạn có thể chép kinh dưới tư cách khách.");
    }, 900);
  };

  const handleSocialSelect = (provider: "google" | "apple" | "facebook") => {
    const providerNames = {
      google: "Google",
      apple: "Apple",
      facebook: "Facebook",
    };
    setNotice(`Cổng đăng ký qua ${providerNames[provider]} đang được kết nối.`);
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
          autoComplete="new-password"
          placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)..."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            if (confirmPassword && e.target.value !== confirmPassword) {
              setErrors((prev) => ({ ...prev, confirmPassword: "Mật khẩu xác nhận không trùng khớp." }));
            } else if (confirmPassword && e.target.value === confirmPassword) {
              setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }
          }}
          icon={<IconLock size={18} stroke={1.8} />}
          error={errors.password}
          disabled={isLoading}
          endSlot={
            <button
              type="button"
              className="tw:flex tw:items-center tw:justify-center tw:w-[34px] tw:h-[34px] tw:p-0 tw:text-[var(--brown-800,#6b4a12)] tw:bg-transparent tw:border-0 tw:rounded-lg tw:cursor-pointer tw:transition-colors tw:hover:text-[var(--brown-900,#4a320a)] tw:hover:bg-[#e8c77a]/25 tw:focus-visible:outline-2 tw:focus-visible:outline-[#d6a440] tw:focus-visible:outline-offset-1"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              tabIndex={-1}
            >
              {showPassword ? <IconEyeOff size={18} stroke={1.8} /> : <IconEye size={18} stroke={1.8} />}
            </button>
          }
        />

        <AuthInput
          label="Xác nhận mật khẩu"
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="new-password"
          placeholder="Nhập lại mật khẩu để xác nhận..."
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          icon={<IconLockCheck size={18} stroke={1.8} />}
          error={errors.confirmPassword}
          disabled={isLoading}
          endSlot={
            <button
              type="button"
              className="tw:flex tw:items-center tw:justify-center tw:w-[34px] tw:h-[34px] tw:p-0 tw:text-[var(--brown-800,#6b4a12)] tw:bg-transparent tw:border-0 tw:rounded-lg tw:cursor-pointer tw:transition-colors tw:hover:text-[var(--brown-900,#4a320a)] tw:hover:bg-[#e8c77a]/25 tw:focus-visible:outline-2 tw:focus-visible:outline-[#d6a440] tw:focus-visible:outline-offset-1"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? "Ẩn xác nhận mật khẩu" : "Hiện xác nhận mật khẩu"}
              tabIndex={-1}
            >
              {showConfirmPassword ? <IconEyeOff size={18} stroke={1.8} /> : <IconEye size={18} stroke={1.8} />}
            </button>
          }
        />

        <button
          type="submit"
          className="tw:relative tw:overflow-hidden tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:w-full tw:min-h-[46px] tw:mt-2 tw:px-5 tw:font-semibold tw:text-[0.94rem] tw:text-[var(--brown-900,#4a320a)] tw:bg-gradient-to-b tw:from-[#ffe699] tw:via-[#f5d77f] tw:to-[#d6a440] tw:border tw:border-[#edd17b] tw:rounded-full tw:cursor-pointer tw:select-none tw:shadow-[0_4px_14px_rgba(214,164,64,0.35)] tw:transition-all tw:hover:shadow-[0_6px_20px_rgba(214,164,64,0.5)] tw:hover:-translate-y-0.5 tw:active:translate-y-0 disabled:tw:opacity-60 disabled:tw:pointer-events-none font-zen-body"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="tw:inline-block tw:w-4 tw:h-4 tw:border-2 tw:border-[rgba(74,50,10,0.3)] tw:border-t-[var(--brown-900,#4a320a)] tw:rounded-full tw:animate-spin" />
          ) : (
            <span>Tạo tài khoản</span>
          )}
        </button>
      </form>

      <SocialLoginGroup onSelectProvider={handleSocialSelect} />

      <div className="tw:flex tw:items-center tw:justify-center tw:gap-1.5 tw:mt-5 tw:text-[0.88rem] tw:text-[var(--brown-800,#6b4a12)] font-zen-body">
        <span>Đã có tài khoản?</span>
        <Link
          href="/dang-nhap"
          className="tw:text-[#a8741a] tw:font-semibold tw:hover:text-[var(--brown-900,#4a320a)] tw:hover:underline"
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Exits with code 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/auth/RegisterForm.tsx
git commit -m "feat(auth): create RegisterForm component with confirm password and validation"
```

---

### Task 2: Connect LoginForm Link to Register Page

**Files:**
- Modify: `src/components/auth/LoginForm.tsx`

**Interfaces:**
- Connects: Changes the footer in `LoginForm.tsx` from an info toast button to Next.js `<Link href="/dang-ky">Đăng ký ngay</Link>`.

- [ ] **Step 1: Update `src/components/auth/LoginForm.tsx` footer link**

Import `Link` from `next/link` and replace the button in `.cardFooter` with:
```tsx
      <div className="tw:flex tw:items-center tw:justify-center tw:gap-1.5 tw:mt-5 tw:text-[0.88rem] tw:text-[var(--brown-800,#6b4a12)] font-zen-body">
        <span>Chưa có tài khoản?</span>
        <Link
          href="/dang-ky"
          className="tw:text-[#a8741a] tw:font-semibold tw:hover:text-[var(--brown-900,#4a320a)] tw:hover:underline"
        >
          Đăng ký ngay
        </Link>
      </div>
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Exits with code 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/auth/LoginForm.tsx
git commit -m "feat(auth): link LoginForm to /dang-ky route"
```

---

### Task 3: Create Register Page (`src/app/(auth)/dang-ky/page.tsx`)

**Files:**
- Create: `src/app/(auth)/dang-ky/page.tsx`

**Interfaces:**
- Consumes: `LotusLogo` and `RegisterForm`.
- Produces: The server page route `/dang-ky`.

- [ ] **Step 1: Create `src/app/(auth)/dang-ky/page.tsx`**

```tsx
import type { Metadata } from "next";
import { LotusLogo } from "@/components/brand/LotusLogo";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Đăng ký – Chép Kinh Online",
  description: "Khởi tạo tài khoản chép kinh trực tuyến Chép Kinh Online",
};

export default function RegisterPage() {
  return (
    <div className="tw:flex tw:items-center tw:justify-center tw:min-h-[calc(100vh-180px)] tw:px-4 tw:py-10 tw:md:py-14">
      {/* Khung Thẻ Kính (Glass Register Card) */}
      <div className="tw:w-full tw:max-w-[440px] tw:p-6 tw:sm:p-8 tw:md:p-9 tw:rounded-[20px] tw:bg-white/75 tw:border tw:border-[rgba(214,164,64,0.35)] tw:shadow-[0_12px_32px_rgba(150,105,25,0.12)] tw:backdrop-blur-md tw:flex tw:flex-col tw:items-stretch">
        <header className="tw:flex tw:flex-col tw:items-center tw:text-center tw:mb-6">
          <div
            className="tw:flex tw:items-center tw:justify-center tw:w-[52px] tw:h-[52px] tw:mb-3.5 tw:rounded-full tw:bg-[#fff8e6] tw:border tw:border-[rgba(214,164,64,0.45)] tw:shadow-[0_4px_14px_rgba(150,105,25,0.08)]"
            aria-hidden="true"
          >
            <LotusLogo size={32} />
          </div>
          <h1 className="font-zen-title tw:text-2xl tw:sm:text-[1.65rem] tw:font-semibold tw:text-[var(--brown-900,#4a320a)] tw:mb-1.5 tw:tracking-tight">
            Đăng Ký
          </h1>
          <p className="font-zen-body tw:text-[0.88rem] tw:text-[var(--brown-800,#6b4a12)] tw:opacity-85">
            Khởi tâm bồ đề · Đồng hành chép kinh
          </p>
        </header>

        <RegisterForm />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Exits with code 0.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(auth\)/dang-ky/page.tsx
git commit -m "feat(auth): add /dang-ky registration page"
```

---

### Task 4: Project Build Verification and Polish

**Files:**
- Test / Verify: Entire Next.js project build and linting

- [ ] **Step 1: Run Next.js production build**

Run: `npm run build`
Expected: Successfully generates static routes including `/dang-ky` and `/dang-nhap`.

- [ ] **Step 2: Run linter**

Run: `npm run lint`
Expected: Exits with code 0.

- [ ] **Step 3: Verification commit (if any fixes made)**

```bash
git status
```
Expected: Clean working tree.
