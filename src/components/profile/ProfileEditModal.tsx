"use client";

import { useEffect, useState, useRef } from "react";
import { IconX, IconCheck, IconUser, IconHeartHandshake, IconSparkles } from "@tabler/icons-react";
import type { UserProfileData } from "@/types/profile";

interface ProfileEditModalProps {
  isOpen: boolean;
  user: UserProfileData;
  onClose: () => void;
  onSave: (updated: Partial<UserProfileData>) => void;
}

export function ProfileEditModal({ isOpen, user, onClose, onSave }: ProfileEditModalProps) {
  const [name, setName] = useState(user.name);
  const [dharmaName, setDharmaName] = useState(user.dharmaName);
  const [intention, setIntention] = useState(user.intention);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setName(user.name);
    setDharmaName(user.dharmaName);
    setIntention(user.intention);
  }, [user, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim() || user.name,
      dharmaName: dharmaName.trim(),
      intention: intention.trim(),
    });
    onClose();
  };

  return (
    <div
      className="tw:fixed tw:inset-0 tw:z-50 tw:flex tw:items-center tw:justify-center tw:p-4 tw:bg-black/40 tw:backdrop-blur-sm tw:animate-[ck-fade-in_0.2s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="ck-glass tw:relative tw:w-full tw:max-w-lg tw:rounded-2xl tw:bg-[#FFFDF9] tw:border tw:border-gold-400/50 tw:p-6 tw:shadow-[0_16px_48px_rgba(107,74,18,0.18)]"
      >
        {/* Header modal */}
        <div className="tw:flex tw:items-center tw:justify-between tw:pb-4 tw:border-b tw:border-amber-200/60">
          <div className="tw:flex tw:items-center tw:gap-2">
            <span className="tw:p-1.5 tw:rounded-lg tw:bg-amber-100 tw:text-amber-800">
              <IconUser size={18} stroke={1.8} />
            </span>
            <h3 id="edit-profile-title" className="tw:text-lg tw:font-bold tw:text-brown-900 tw:font-serif">
              Chỉnh Sửa Hồ Sơ Hành Giả
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="tw:p-1.5 tw:rounded-lg tw:text-brown-500 tw:hover:text-brown-900 tw:hover:bg-amber-100/60 tw:transition-colors tw:cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Form nội dung */}
        <form onSubmit={handleSubmit} className="tw:mt-5 tw:space-y-4">
          <div>
            <label className="tw:block tw:text-xs tw:font-semibold tw:text-brown-800 tw:mb-1.5">
              Họ và tên
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="tw:w-full tw:px-3.5 tw:py-2.5 tw:rounded-xl tw:text-sm tw:text-brown-900 tw:bg-white tw:border tw:border-amber-300/70 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-gold-500/50 tw:focus:border-gold-500 tw:transition-all"
              placeholder="Nhập họ và tên..."
            />
          </div>

          <div>
            <label className="tw:flex tw:items-center tw:gap-1.5 tw:text-xs tw:font-semibold tw:text-brown-800 tw:mb-1.5">
              <IconSparkles size={14} className="tw:text-gold-600" />
              <span>Pháp danh (nếu có)</span>
            </label>
            <input
              type="text"
              value={dharmaName}
              onChange={(e) => setDharmaName(e.target.value)}
              className="tw:w-full tw:px-3.5 tw:py-2.5 tw:rounded-xl tw:text-sm tw:text-brown-900 tw:bg-white tw:border tw:border-amber-300/70 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-gold-500/50 tw:focus:border-gold-500 tw:transition-all"
              placeholder="Ví dụ: Thiện Duyên, Diệu Tâm, Tuệ Minh..."
            />
          </div>

          <div>
            <label className="tw:flex tw:items-center tw:gap-1.5 tw:text-xs tw:font-semibold tw:text-brown-800 tw:mb-1.5">
              <IconHeartHandshake size={14} className="tw:text-gold-600" />
              <span>Lời phát nguyện tu học & chép kinh</span>
            </label>
            <textarea
              rows={3}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="tw:w-full tw:px-3.5 tw:py-2.5 tw:rounded-xl tw:text-sm tw:text-brown-900 tw:bg-white tw:border tw:border-amber-300/70 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-gold-500/50 tw:focus:border-gold-500 tw:transition-all tw:resize-none"
              placeholder="Ghi lại lời phát nguyện hoặc tâm niệm hướng thiện của bạn..."
            />
            <p className="tw:text-[0.75rem] tw:text-brown-500 tw:mt-1">
              Lời nguyện này sẽ hiển thị trang trọng tại bảng tu tập mỗi khi bạn đăng nhập.
            </p>
          </div>

          {/* Action buttons */}
          <div className="tw:flex tw:items-center tw:justify-end tw:gap-3 tw:pt-4 tw:border-t tw:border-amber-200/60">
            <button
              type="button"
              onClick={onClose}
              className="tw:px-4 tw:py-2 tw:rounded-xl tw:text-sm tw:font-medium tw:text-brown-700 tw:hover:bg-amber-100/60 tw:transition-colors tw:cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="tw:inline-flex tw:items-center tw:gap-1.5 tw:px-5 tw:py-2 tw:rounded-xl tw:text-sm tw:font-semibold tw:text-brown-950 tw:bg-gradient-to-r tw:from-gold-400 tw:to-amber-400 tw:hover:from-gold-500 tw:hover:to-amber-500 tw:shadow-sm tw:hover:shadow tw:transition-all tw:cursor-pointer"
            >
              <IconCheck size={16} stroke={2.2} />
              <span>Lưu thông tin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
