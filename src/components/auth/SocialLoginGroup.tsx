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
    <div className="tw:w-full">
      {/* Đường phân cách */}
      <div className="tw:relative tw:flex tw:items-center tw:justify-center tw:my-5 tw:w-full">
        <div className="tw:absolute tw:inset-x-0 tw:top-1/2 tw:h-px tw:bg-[rgba(214,164,64,0.3)]" aria-hidden="true" />
        <span className="tw:relative tw:z-10 tw:px-3 tw:text-[0.8rem] tw:text-[rgba(120,95,55,0.75)] tw:bg-[#fffdfa] tw:rounded-full font-zen-body">
          hoặc tiếp tục với
        </span>
      </div>

      {/* 3 Nút đăng nhập mạng xã hội */}
      <div className="tw:grid tw:grid-cols-3 tw:gap-3 tw:w-full max-[380px]:tw:gap-1.5">
        <button
          type="button"
          className="tw:relative tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:min-h-[42px] tw:px-2.5 tw:text-[0.86rem] tw:font-medium tw:text-[var(--brown-800,#6b4a12)] tw:bg-[#fbf7ec]/85 tw:border tw:border-[rgba(214,164,64,0.4)] tw:rounded-full tw:cursor-pointer tw:select-none tw:transition-all hover:tw:bg-[#e8c77a]/25 hover:tw:border-[#d6a440] hover:tw:text-[var(--brown-900,#4a320a)] hover:tw:-translate-y-0.5 hover:tw:shadow-[0_3px_8px_rgba(150,105,25,0.08)] active:tw:translate-y-0 focus-visible:tw:outline-2 focus-visible:tw:outline-[#d6a440] focus-visible:tw:outline-offset-2 font-zen-body max-[380px]:tw:px-1.5 max-[380px]:tw:text-[0.8rem]"
          onClick={() => handleClick("google")}
          aria-label="Đăng nhập bằng tài khoản Google"
        >
          <span className="tw:inline-flex tw:items-center tw:justify-center tw:shrink-0">
            <GoogleIcon />
          </span>
          <span>Google</span>
        </button>

        <button
          type="button"
          className="tw:relative tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:min-h-[42px] tw:px-2.5 tw:text-[0.86rem] tw:font-medium tw:text-[var(--brown-800,#6b4a12)] tw:bg-[#fbf7ec]/85 tw:border tw:border-[rgba(214,164,64,0.4)] tw:rounded-full tw:cursor-pointer tw:select-none tw:transition-all hover:tw:bg-[#e8c77a]/25 hover:tw:border-[#d6a440] hover:tw:text-[var(--brown-900,#4a320a)] hover:tw:-translate-y-0.5 hover:tw:shadow-[0_3px_8px_rgba(150,105,25,0.08)] active:tw:translate-y-0 focus-visible:tw:outline-2 focus-visible:tw:outline-[#d6a440] focus-visible:tw:outline-offset-2 font-zen-body max-[380px]:tw:px-1.5 max-[380px]:tw:text-[0.8rem]"
          onClick={() => handleClick("apple")}
          aria-label="Đăng nhập bằng tài khoản Apple"
        >
          <span className="tw:inline-flex tw:items-center tw:justify-center tw:shrink-0">
            <IconBrandApple size={18} stroke={2} />
          </span>
          <span>Apple</span>
        </button>

        <button
          type="button"
          className="tw:relative tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:min-h-[42px] tw:px-2.5 tw:text-[0.86rem] tw:font-medium tw:text-[var(--brown-800,#6b4a12)] tw:bg-[#fbf7ec]/85 tw:border tw:border-[rgba(214,164,64,0.4)] tw:rounded-full tw:cursor-pointer tw:select-none tw:transition-all hover:tw:bg-[#e8c77a]/25 hover:tw:border-[#d6a440] hover:tw:text-[var(--brown-900,#4a320a)] hover:tw:-translate-y-0.5 hover:tw:shadow-[0_3px_8px_rgba(150,105,25,0.08)] active:tw:translate-y-0 focus-visible:tw:outline-2 focus-visible:tw:outline-[#d6a440] focus-visible:tw:outline-offset-2 font-zen-body max-[380px]:tw:px-1.5 max-[380px]:tw:text-[0.8rem]"
          onClick={() => handleClick("facebook")}
          aria-label="Đăng nhập bằng tài khoản Facebook"
        >
          <span className="tw:inline-flex tw:items-center tw:justify-center tw:shrink-0" style={{ color: "#1877F2" }}>
            <IconBrandFacebook size={18} stroke={2} />
          </span>
          <span>Facebook</span>
        </button>
      </div>
    </div>
  );
}
