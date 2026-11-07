"use client";

import React from "react";
import { IconBrandApple, IconBrandFacebook } from "@tabler/icons-react";

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

export type SocialProvider = "google" | "apple" | "facebook";

const PROVIDERS: { id: SocialProvider; name: string; icon: React.ReactNode }[] = [
  { id: "google", name: "Google", icon: <GoogleIcon /> },
  { id: "apple", name: "Apple", icon: <IconBrandApple size={18} stroke={2} /> },
  {
    id: "facebook",
    name: "Facebook",
    icon: <IconBrandFacebook size={18} stroke={2} style={{ color: "#1877F2" }} />,
  },
];

export interface SocialLoginGroupProps {
  /** Quyết định nhãn trợ năng: "Đăng nhập bằng…" hay "Đăng ký bằng…". */
  mode?: "login" | "register";
  onSelectProvider?: (provider: SocialProvider) => void;
}

export function SocialLoginGroup({ mode = "login", onSelectProvider }: SocialLoginGroupProps) {
  const actionLabel = mode === "register" ? "Đăng ký" : "Đăng nhập";

  return (
    <div className="tw:w-full">
      {/* Đường phân cách */}
      <div className="tw:flex tw:items-center tw:gap-3 tw:my-5 tw:w-full">
        <div className="tw:flex-1 tw:h-px tw:bg-[var(--gold-500)]/30" aria-hidden="true" />
        <span className="tw:shrink-0 tw:text-[0.8rem] tw:text-[var(--brown-800)]/75 font-zen-body">
          hoặc tiếp tục với
        </span>
        <div className="tw:flex-1 tw:h-px tw:bg-[var(--gold-500)]/30" aria-hidden="true" />
      </div>

      {/* 3 nút mạng xã hội; màn hẹp (< 360px) chỉ hiện biểu tượng để không tràn nút */}
      <div className="tw:grid tw:grid-cols-3 tw:gap-3 tw:w-full tw:max-[360px]:gap-2">
        {PROVIDERS.map(({ id, name, icon }) => (
          <button
            key={id}
            type="button"
            className="tw:relative tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:min-w-0 tw:min-h-[42px] tw:px-2.5 tw:text-[0.86rem] tw:font-medium tw:text-[var(--brown-800)] tw:bg-[var(--paper)]/85 tw:border tw:border-[var(--gold-500)]/40 tw:rounded-full tw:cursor-pointer tw:select-none tw:transition-all tw:hover:bg-[var(--gold-300)]/25 tw:hover:border-[var(--gold-500)] tw:hover:text-[var(--brown-900)] tw:hover:shadow-[0_3px_8px_rgba(150,105,25,0.08)] tw:motion-safe:hover:-translate-y-0.5 tw:active:translate-y-0 tw:focus-visible:outline-2 tw:focus-visible:outline-[var(--gold-500)] tw:focus-visible:outline-offset-2 font-zen-body"
            onClick={() => onSelectProvider?.(id)}
            aria-label={`${actionLabel} bằng tài khoản ${name}`}
          >
            <span className="tw:inline-flex tw:items-center tw:justify-center tw:shrink-0" aria-hidden="true">
              {icon}
            </span>
            <span className="tw:max-[360px]:hidden">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
