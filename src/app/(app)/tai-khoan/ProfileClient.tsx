"use client";

import { useState } from "react";
import { initialMockProfile } from "@/data/mock-profile";
import type { UserProfileData } from "@/types/profile";
import {
  ProfileHeader,
  ProfileIdentityCard,
  ProfileEditModal,
  ZenIntentionCard,
  QuickSettingsCard,
  MeritMetricsGrid,
  InProgressSutrasCard,
  CompletedSutrasCard,
  SavedArticlesCard,
} from "@/components/profile";

export function ProfileClient() {
  const [user, setUser] = useState<UserProfileData>(initialMockProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveProfile = (updated: Partial<UserProfileData>) => {
    setUser((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  return (
    <div className="tw:max-w-6xl tw:mx-auto tw:px-4 tw:py-6 tw:sm:py-8">
      {/* Đầu trang: Breadcrumb & Tiêu đề */}
      <ProfileHeader />

      {/* Lưới Bento chính: 12 cột */}
      <div className="tw:grid tw:grid-cols-1 tw:lg:grid-cols-12 tw:gap-6 tw:items-start">
        {/* Cột trái (4/12 cột trên Desktop) */}
        <aside className="tw:lg:col-span-4 tw:space-y-6">
          <ProfileIdentityCard
            user={user}
            onEditClick={() => setIsEditModalOpen(true)}
          />
          <ZenIntentionCard intention={user.intention} />
          <QuickSettingsCard />
        </aside>

        {/* Cột phải (8/12 cột trên Desktop) */}
        <div className="tw:lg:col-span-8 tw:space-y-6">
          {/* Lưới 4 ô thống kê công phu */}
          <MeritMetricsGrid metrics={user.metrics} />

          {/* Danh sách kinh đang chép dở */}
          <InProgressSutrasCard sutras={user.inProgressSutras} />

          {/* Danh sách kinh đã hoàn thành viên mãn */}
          <CompletedSutrasCard sutras={user.completedSutras} />

          {/* Danh sách bài học tự học đã lưu */}
          <SavedArticlesCard articles={user.savedArticles} />
        </div>
      </div>

      {/* Modal chỉnh sửa thông tin */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        user={user}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
