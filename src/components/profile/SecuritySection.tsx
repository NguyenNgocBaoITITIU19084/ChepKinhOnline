"use client";

import { useState, type FormEvent } from "react";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { AuthNotice } from "@/components/auth/AuthNotice";
import {
  PASSWORD_MIN_LENGTH,
  validateConfirmPassword,
  validateNewPassword,
} from "@/components/auth/validation";
import { eyebrow, meta } from "@/components/article/styles";
import { cx } from "@/components/article/utils";
import type { LoginSession } from "@/types/profile";
import { ProfilePanel } from "./ProfilePanel";
import { fieldHint, formActions, rowDivider } from "./styles";

type PasswordFields = { current: string; next: string; confirm: string };
type PasswordErrors = Partial<Record<keyof PasswordFields, string>>;

const EMPTY: PasswordFields = { current: "", next: "", confirm: "" };

function validatePasswords(values: PasswordFields): PasswordErrors {
  const errors: PasswordErrors = {};
  if (!values.current) errors.current = "Vui lòng nhập mật khẩu hiện tại.";
  const nextError = validateNewPassword(values.next);
  if (nextError) errors.next = nextError;
  else if (values.next === values.current)
    errors.next = "Mật khẩu mới cần khác mật khẩu hiện tại.";
  const confirmError = validateConfirmPassword(values.next, values.confirm);
  if (confirmError) errors.confirm = confirmError;
  return errors;
}

/** Mục Đổi mật khẩu: đổi mật khẩu và các thiết bị đang đăng nhập. Giao diện mẫu, không gọi máy chủ. */
export function SecuritySection({
  sessions: initialSessions,
}: {
  sessions: LoginSession[];
}) {
  const [values, setValues] = useState<PasswordFields>(EMPTY);
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [sessions, setSessions] = useState(initialSessions);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);

  const update = (key: keyof PasswordFields, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setNotice(null);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validatePasswords(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setValues(EMPTY);
    setNotice("Đã đổi mật khẩu.");
  };

  const handleCancel = () => {
    setValues(EMPTY);
    setErrors({});
    setNotice(null);
  };

  const signOutOthers = () => {
    setSessions((prev) => prev.filter((s) => s.current));
    setSessionNotice("Đã đăng xuất khỏi các thiết bị khác.");
  };

  const hasInput = values.current || values.next || values.confirm;
  const otherSessions = sessions.filter((s) => !s.current).length;

  return (
    <div className="tw:flex tw:flex-col tw:gap-6">
      <ProfilePanel
        title="Đổi mật khẩu"
        description="Nhập mật khẩu hiện tại để xác nhận."
      >
        <form
          noValidate
          onSubmit={handleSubmit}
          className="tw:flex tw:flex-col"
        >
          <AuthNotice message={notice} />

          <div className="tw:flex tw:flex-col tw:gap-4 tw:max-w-[440px]">
            <PasswordInput
              label="Mật khẩu hiện tại"
              name="currentPassword"
              autoComplete="current-password"
              toggleName="mật khẩu hiện tại"
              value={values.current}
              onChange={(e) => update("current", e.target.value)}
              error={errors.current}
            />
            <div className="tw:flex tw:flex-col tw:gap-1.5">
              <PasswordInput
                label="Mật khẩu mới"
                name="newPassword"
                autoComplete="new-password"
                toggleName="mật khẩu mới"
                value={values.next}
                onChange={(e) => update("next", e.target.value)}
                error={errors.next}
              />
              {!errors.next && (
                <p className={fieldHint}>
                  Tối thiểu {PASSWORD_MIN_LENGTH} ký tự.
                </p>
              )}
            </div>
            <PasswordInput
              label="Nhập lại mật khẩu mới"
              name="confirmPassword"
              autoComplete="new-password"
              toggleName="mật khẩu xác nhận"
              value={values.confirm}
              onChange={(e) => update("confirm", e.target.value)}
              error={errors.confirm}
            />
          </div>

          <div className={cx(formActions, "tw:justify-start")}>
            <button type="submit" className="ck-btn-gold">
              Đổi mật khẩu
            </button>
            {hasInput && (
              <button
                type="button"
                className="ck-btn-ghost"
                onClick={handleCancel}
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </ProfilePanel>

      <ProfilePanel
        title="Thiết bị đang đăng nhập"
        description="Thấy thiết bị lạ, hãy đăng xuất và đổi mật khẩu."
      >
        <div>
          <AuthNotice message={sessionNotice} />
          <ul className="tw:m-0 tw:p-0 tw:list-none tw:flex tw:flex-col">
            {sessions.map((session, i) => {
              return (
                <li
                  key={session.id}
                  className={cx(
                    "tw:flex tw:items-center tw:gap-3 tw:py-3",
                    i > 0 && rowDivider,
                  )}
                >
                  <div className="tw:flex tw:flex-col tw:gap-0.5 tw:flex-1 tw:min-w-0">
                    <span className="tw:text-[0.92rem] tw:font-medium tw:text-brown-900">
                      {session.device}
                    </span>
                    <span className={meta}>
                      {session.location} · {session.lastActive}
                    </span>
                  </div>
                  {session.current && (
                    <span className={eyebrow}>Thiết bị này</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        {otherSessions > 0 && (
          <div>
            <button
              type="button"
              className="ck-btn-ghost"
              onClick={signOutOthers}
            >
              Đăng xuất các thiết bị khác
            </button>
          </div>
        )}
      </ProfilePanel>
    </div>
  );
}
