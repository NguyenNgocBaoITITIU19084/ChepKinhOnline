"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthNotice } from "@/components/auth/AuthNotice";
import { validateEmail } from "@/components/auth/validation";
import { eyebrow, focusable } from "@/components/article/styles";
import { cx } from "@/components/article/utils";
import { AVATAR_PHOTOS, COVER_PHOTOS } from "@/data/mock-profile";
import type { EditableProfile } from "@/types/profile";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfilePanel } from "./ProfilePanel";
import { getInitials } from "./ProfileSidebar";
import { fieldHint, fieldLabel, formActions, rowDivider, textareaClass } from "./styles";

const INTENTION_MAX = 300;
const VERSE_MAX = 120;

type Errors = Partial<Record<keyof EditableProfile, string>>;

function validate(values: EditableProfile): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Vui lòng nhập họ và tên.";
  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;
  if (values.intention.length > INTENTION_MAX) errors.intention = `Lời nguyện tối đa ${INTENTION_MAX} ký tự.`;
  return errors;
}

/** Một nhóm trường trong form: nhãn eyebrow, đường chia phía trên (trừ nhóm đầu). */
function Group({ title, children, first }: { title: string; children: ReactNode; first?: boolean }) {
  return (
    <fieldset className={cx("tw:m-0 tw:p-0 tw:border-0 tw:flex tw:flex-col tw:gap-4", !first && cx("tw:pt-6", rowDivider))}>
      <legend className={cx(eyebrow, "tw:float-left tw:w-full tw:m-0 tw:p-0")}>{title}</legend>
      {children}
    </fieldset>
  );
}

/** Ô chọn ảnh đại diện: ảnh tròn nhỏ, đang chọn thì vòng gold-500 bao ngoài. */
function photoOption(active: boolean) {
  return cx(
    "tw:relative tw:size-14 tw:p-0 tw:overflow-hidden tw:rounded-[50%] tw:border-0 tw:cursor-pointer tw:bg-[#efe4c8]",
    "tw:transition-shadow tw:motion-reduce:transition-none",
    active
      ? "tw:shadow-[0_0_0_2px_#fffdf8,0_0_0_4px_var(--gold-500)]"
      : "tw:shadow-[0_0_0_1px_rgba(214,164,64,0.45)] tw:hover:shadow-[0_0_0_2px_#fffdf8,0_0_0_4px_rgba(214,164,64,0.45)]",
    focusable,
  );
}

/** Ô chọn ảnh nền thẻ: khung ngang 16:9 góc radius-control (coverFrame), đang chọn thì vòng gold-500. */
const coverOption = cx(
  "ck-font-inherit tw:flex tw:flex-col tw:gap-1.5 tw:p-0 tw:bg-transparent tw:border-0 tw:cursor-pointer tw:text-left tw:rounded-[10px]",
  focusable,
);

function coverFrame(active: boolean) {
  return cx(
    "tw:relative tw:block tw:w-full tw:aspect-[16/9] tw:overflow-hidden tw:rounded-[10px] tw:bg-[#efe4c8] tw:transition-shadow tw:motion-reduce:transition-none",
    active
      ? "tw:shadow-[0_0_0_2px_#fffdf8,0_0_0_4px_var(--gold-500)]"
      : "tw:shadow-[0_0_0_1px_rgba(214,164,64,0.45)] tw:hover:shadow-[0_0_0_2px_#fffdf8,0_0_0_4px_rgba(214,164,64,0.45)]",
  );
}

/** Ảnh người dùng tự tải lên trước đó (không nằm trong danh sách có sẵn) được đưa lên đầu để vẫn chọn lại được. */
function withCustom<T extends { src: string; label: string }>(list: T[], extra: (string | null)[], label: string) {
  const custom = [...new Set(extra.filter((src): src is string => Boolean(src) && !list.some((p) => p.src === src)))];
  return [...custom.map((src) => ({ src, label })), ...list];
}

interface ProfileFormProps {
  profile: EditableProfile;
  onSave: (values: EditableProfile) => void;
}

/** Mục Hồ sơ cá nhân: sửa trực tiếp trên trang. Giao diện mẫu, chỉ lưu vào state. */
export function ProfileForm({ profile, onSave }: ProfileFormProps) {
  const [values, setValues] = useState<EditableProfile>(profile);
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const intentionId = useId();
  const avatarFileRef = useRef<HTMLInputElement>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);

  // Ảnh tải lên chỉ xem trước trong trình duyệt (giao diện mẫu, không gửi lên máy chủ).
  // Không thu hồi URL khi rời form: thẻ hành giả vẫn đang dùng ảnh đã lưu.
  const handleUpload = (key: "avatar" | "cover") => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    update(key, URL.createObjectURL(file));
    e.target.value = "";
  };

  const avatarChoices = withCustom(AVATAR_PHOTOS, [values.avatar, profile.avatar], "Ảnh đã tải lên");
  const coverChoices = withCustom(COVER_PHOTOS, [values.cover, profile.cover], "Ảnh đã tải lên");

  const dirty = (Object.keys(profile) as (keyof EditableProfile)[]).some((key) => values[key] !== profile[key]);
  const initials = getInitials(values.name || profile.name);

  const update = <K extends keyof EditableProfile>(key: K, value: EditableProfile[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setNotice(null);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const cleaned: EditableProfile = {
      ...values,
      name: values.name.trim(),
      dharmaName: values.dharmaName.trim(),
      dharmaNameHan: values.dharmaNameHan.trim(),
      email: values.email.trim(),
      favoriteVerse: values.favoriteVerse.trim(),
      favoriteVerseSource: values.favoriteVerseSource.trim(),
    };
    onSave(cleaned);
    setValues(cleaned);
    setNotice("Đã lưu hồ sơ.");
  };

  const handleReset = () => {
    setValues(profile);
    setErrors({});
    setNotice(null);
  };

  return (
    <ProfilePanel
      title="Hồ sơ cá nhân"
      description="Ảnh đại diện, ảnh nền thẻ, danh xưng và câu kinh tâm đắc."
    >
      <form noValidate onSubmit={handleSubmit} className="tw:flex tw:flex-col tw:gap-6">
        <AuthNotice message={notice} />

        <Group first title="Ảnh đại diện">
          <div className="tw:flex tw:items-center tw:gap-6 tw:upto-560:flex-col tw:upto-560:items-start">
            <ProfileAvatar src={values.avatar} initials={initials} size={96} />
            <div className="tw:flex tw:flex-col tw:gap-3">
              <div role="radiogroup" aria-label="Chọn ảnh có sẵn" className="tw:flex tw:flex-wrap tw:gap-3">
                {avatarChoices.map((photo) => (
                  <button
                    key={photo.src}
                    type="button"
                    role="radio"
                    aria-checked={values.avatar === photo.src}
                    aria-label={photo.label}
                    title={photo.label}
                    onClick={() => update("avatar", photo.src)}
                    className={photoOption(values.avatar === photo.src)}
                  >
                    <Image src={photo.src} alt="" fill sizes="56px" className="tw:object-cover" unoptimized={photo.src.startsWith("blob:")} />
                  </button>
                ))}
              </div>
              <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
                <input ref={avatarFileRef} type="file" accept="image/*" className="tw:sr-only" tabIndex={-1} onChange={handleUpload("avatar")} />
                <button type="button" className="ck-btn-ghost tw:min-h-[38px] tw:px-4 tw:text-[0.86rem]" onClick={() => avatarFileRef.current?.click()}>
                  Tải ảnh lên
                </button>
                {values.avatar && (
                  <button type="button" className="ck-btn-ghost tw:min-h-[38px] tw:px-4 tw:text-[0.86rem]" onClick={() => update("avatar", "")}>
                    Dùng chữ đầu tên
                  </button>
                )}
              </div>
            </div>
          </div>
        </Group>

        <Group title="Ảnh nền thẻ hành giả">
          <div role="radiogroup" aria-label="Chọn ảnh nền thẻ" className="tw:grid tw:grid-cols-5 tw:gap-4 tw:upto-1100:grid-cols-3 tw:upto-480:grid-cols-2">
            {coverChoices.map((photo) => {
              const active = values.cover === photo.src;
              return (
                <button
                  key={photo.src}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => update("cover", photo.src)}
                  className={coverOption}
                >
                  <span className={coverFrame(active)}>
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="200px"
                      className="tw:object-cover"
                      style={{ objectPosition: "position" in photo ? String(photo.position) : "50% 50%" }}
                      unoptimized={photo.src.startsWith("blob:")}
                    />
                  </span>
                  <span className={cx("tw:text-[0.82rem]", active ? "tw:font-semibold tw:text-brown-900" : "tw:font-medium tw:text-brown-800")}>
                    {photo.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3">
            <input ref={coverFileRef} type="file" accept="image/*" className="tw:sr-only" tabIndex={-1} onChange={handleUpload("cover")} />
            <button type="button" className="ck-btn-ghost tw:min-h-[38px] tw:px-4 tw:text-[0.86rem]" onClick={() => coverFileRef.current?.click()}>
              Tải ảnh lên
            </button>
            <p className={fieldHint}>Nên chọn ảnh ngang, chủ thể lệch về bên phải để không bị chữ che.</p>
          </div>
        </Group>

        <Group title="Danh tính">
          <div className="tw:grid tw:grid-cols-2 tw:gap-x-5 tw:gap-y-4 tw:upto-640:grid-cols-1">
            <AuthInput
              label="Họ và tên"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              error={errors.name}
            />
            <AuthInput
              label="Thư điện tử"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              error={errors.email}
            />
            <AuthInput
              label="Pháp danh"
              name="dharmaName"
              placeholder="Không bắt buộc"
              value={values.dharmaName}
              onChange={(e) => update("dharmaName", e.target.value)}
            />
            <div className="tw:flex tw:flex-col tw:gap-1.5">
              <AuthInput
                label="Pháp danh chữ Hán"
                name="dharmaNameHan"
                placeholder="善緣"
                maxLength={6}
                className="tw:font-hanzi"
                value={values.dharmaNameHan}
                onChange={(e) => update("dharmaNameHan", e.target.value)}
              />
              <p className={fieldHint}>Không bắt buộc, chỉ để trang trí.</p>
            </div>
          </div>
        </Group>

        <Group title="Tâm nguyện">
          <div className="tw:grid tw:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] tw:gap-x-5 tw:gap-y-4 tw:upto-640:grid-cols-1">
            <AuthInput
              label="Câu kinh tâm đắc"
              name="favoriteVerse"
              maxLength={VERSE_MAX}
              placeholder="Ưng vô sở trụ nhi sanh kỳ tâm."
              value={values.favoriteVerse}
              onChange={(e) => update("favoriteVerse", e.target.value)}
            />
            <AuthInput
              label="Trích từ"
              name="favoriteVerseSource"
              placeholder="Kinh Kim Cang"
              value={values.favoriteVerseSource}
              onChange={(e) => update("favoriteVerseSource", e.target.value)}
            />
          </div>

          <div className="tw:flex tw:flex-col tw:gap-1.5">
            <label htmlFor={intentionId} className={fieldLabel}>
              Lời nguyện hồi hướng
            </label>
            <textarea
              id={intentionId}
              name="intention"
              rows={4}
              maxLength={INTENTION_MAX}
              placeholder="Nguyện đem công đức này..."
              className={textareaClass}
              value={values.intention}
              onChange={(e) => update("intention", e.target.value)}
              aria-describedby={`${intentionId}-count`}
            />
            <p id={`${intentionId}-count`} className={`${fieldHint} tw:text-right tw:tabular-nums`}>
              {values.intention.length}/{INTENTION_MAX}
            </p>
          </div>
        </Group>

        <div className={formActions}>
          {/* Nút không dùng được thì ẩn hẳn, không làm mờ (design system) */}
          {dirty && (
            <button type="button" className="ck-btn-ghost" onClick={handleReset}>
              Hoàn tác
            </button>
          )}
          <button type="submit" className="ck-btn-gold">
            Lưu hồ sơ
          </button>
        </div>
      </form>
    </ProfilePanel>
  );
}
