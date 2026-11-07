"use client";

import { IconEdit, IconMail, IconCalendarTime } from "@tabler/icons-react";
import { LotusIcon } from "@/components/icons/BuddhistIcons";
import type { UserProfileData } from "@/types/profile";

interface ProfileIdentityCardProps {
  user: UserProfileData;
  onEditClick: () => void;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  return words.length > 1
    ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

export function ProfileIdentityCard({ user, onEditClick }: ProfileIdentityCardProps) {
  const initials = getInitials(user.name);

  return (
    <section
      aria-labelledby="profile-identity-heading"
      className="ck-glass tw:relative tw:overflow-hidden tw:rounded-2xl tw:p-6 tw:bg-[rgba(255,253,246,0.95)] tw:border tw:border-[rgba(214,164,64,0.3)] tw:shadow-[0_4px_24px_rgba(107,74,18,0.06)]"
    >
      {/* Họa tiết góc sen mờ trang nhã */}
      <div className="tw:absolute tw:-top-6 tw:-right-6 tw:opacity-[0.06] tw:pointer-events-none">
        <LotusIcon size={120} />
      </div>

      <div className="tw:flex tw:flex-col tw:items-center tw:text-center">
        {/* Avatar với khung viền hoa sen */}
        <div className="tw:relative tw:mb-4">
          <div className="tw:size-24 tw:rounded-full tw:bg-gradient-to-br tw:from-amber-100 tw:to-gold-400 tw:p-1 tw:shadow-[0_4px_16px_rgba(180,130,30,0.2)]">
            <div className="tw:size-full tw:rounded-full tw:bg-[#FFFDF7] tw:flex tw:items-center tw:justify-center tw:border-2 tw:border-amber-200">
              <span className="tw:text-2xl tw:font-bold tw:tracking-wider tw:text-brown-900">
                {initials}
              </span>
            </div>
          </div>
          <div
            className="tw:absolute tw:-bottom-1 tw:-right-1 tw:p-1.5 tw:rounded-full tw:bg-gradient-to-tr tw:from-gold-600 tw:to-amber-300 tw:text-white tw:shadow-sm"
            title="Hành giả chánh niệm"
            aria-label="Hành giả chánh niệm"
          >
            <LotusIcon size={16} color="#ffffff" strokeWidth={1.8} />
          </div>
        </div>

        {/* Tên & Pháp danh */}
        <h2
          id="profile-identity-heading"
          className="tw:text-xl tw:font-bold tw:text-brown-900 tw:font-serif tw:mb-1.5"
        >
          {user.name}
        </h2>

        {user.dharmaName && (
          <div className="tw:inline-flex tw:items-center tw:gap-1.5 tw:px-3 tw:py-1 tw:rounded-full tw:bg-amber-100/70 tw:border tw:border-amber-300/60 tw:text-brown-800 tw:text-xs tw:font-semibold tw:mb-4">
            <span className="tw:text-amber-700">Pháp danh:</span>
            <span className="tw:text-brown-950 tw:tracking-wide">{user.dharmaName}</span>
          </div>
        )}

        {/* Thông tin phụ: Email & Ngày tham gia */}
        <div className="tw:w-full tw:space-y-2 tw:pt-3 tw:border-t tw:border-[rgba(214,164,64,0.2)] tw:text-xs tw:text-brown-700">
          <div className="tw:flex tw:items-center tw:justify-between tw:px-1">
            <span className="tw:inline-flex tw:items-center tw:gap-1.5 tw:text-brown-600">
              <IconMail size={15} stroke={1.6} /> Hòm thư:
            </span>
            <span className="tw:font-medium tw:truncate tw:max-w-[170px] tw:text-brown-900">
              {user.email}
            </span>
          </div>

          <div className="tw:flex tw:items-center tw:justify-between tw:px-1">
            <span className="tw:inline-flex tw:items-center tw:gap-1.5 tw:text-brown-600">
              <IconCalendarTime size={15} stroke={1.6} /> Bắt đầu tu học:
            </span>
            <span className="tw:font-medium tw:text-brown-900">{user.joinedDate}</span>
          </div>
        </div>

        {/* Nút bấm chỉnh sửa */}
        <div className="tw:w-full tw:mt-5">
          <button
            type="button"
            onClick={onEditClick}
            className="tw:w-full tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:py-2.5 tw:px-4 tw:rounded-xl tw:text-sm tw:font-medium tw:text-brown-900 tw:bg-gradient-to-r tw:from-amber-100 tw:to-gold-200 tw:border tw:border-gold-400/60 tw:hover:from-amber-200 tw:hover:to-gold-300 tw:transition-all tw:duration-200 tw:shadow-sm tw:hover:shadow tw:cursor-pointer"
          >
            <IconEdit size={16} stroke={1.8} />
            <span>Chỉnh sửa hồ sơ</span>
          </button>
        </div>
      </div>
    </section>
  );
}
