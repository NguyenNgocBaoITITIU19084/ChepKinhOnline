"use client";

import React, { forwardRef, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { AuthInput, type AuthInputProps } from "./AuthInput";

export interface PasswordInputProps extends Omit<AuthInputProps, "type" | "endSlot"> {
  /** Tên trường dùng trong nhãn nút ẩn/hiện, vd. "mật khẩu" → "Hiện mật khẩu". */
  toggleName?: string;
}

// Ô mật khẩu có nút ẩn/hiện; trạng thái ẩn/hiện nằm gọn trong component.
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { toggleName = "mật khẩu", ...rest },
  ref
) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthInput
      ref={ref}
      type={visible ? "text" : "password"}
      {...rest}
      endSlot={
        <button
          type="button"
          className="tw:flex tw:items-center tw:justify-center tw:w-[34px] tw:h-[34px] tw:p-0 tw:text-[var(--brown-800)] tw:bg-transparent tw:border-0 tw:rounded-lg tw:cursor-pointer tw:transition-colors tw:hover:text-[var(--brown-900)] tw:hover:bg-[var(--gold-300)]/25 tw:focus-visible:outline-2 tw:focus-visible:outline-[var(--gold-500)] tw:focus-visible:outline-offset-1"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={`${visible ? "Ẩn" : "Hiện"} ${toggleName}`}
          aria-pressed={visible}
        >
          {visible ? <IconEyeOff size={18} stroke={1.8} /> : <IconEye size={18} stroke={1.8} />}
        </button>
      }
    />
  );
});
