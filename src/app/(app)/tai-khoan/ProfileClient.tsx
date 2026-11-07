"use client";

import { useEffect, useState } from "react";
import { ArticleBreadcrumb } from "@/components/article";
import { page } from "@/components/article/styles";
import { initialMockProfile } from "@/data/mock-profile";
import type { EditableProfile, UserProfileData } from "@/types/profile";
import {
  CopyPreferencesSection,
  LearningSection,
  OverviewSection,
  ProfileForm,
  ProfileHero,
  ProfileSidebar,
  SecuritySection,
  type ProfileTab,
} from "@/components/profile";

const TABS: ProfileTab[] = [
  { id: "tong-quan", label: "Tổng quan" },
  { id: "hoc-tap", label: "Học tập" },
  { id: "ho-so", label: "Hồ sơ cá nhân" },
  { id: "doi-mat-khau", label: "Đổi mật khẩu" },
  { id: "cai-dat", label: "Cài đặt chép kinh" },
];

const isTab = (id: string) => TABS.some((t) => t.id === id);

/**
 * Trang tài khoản (giao diện mẫu): dữ liệu lấy từ src/data/mock-profile.ts, lưu trong state.
 * Mục đang mở ghi lên hash (#ho-so, #doi-mat-khau...) để dẫn thẳng tới từng mục.
 */
export function ProfileClient() {
  const [user, setUser] = useState<UserProfileData>(initialMockProfile);
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.slice(1);
      if (isTab(id)) setActiveTab(id);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const changeTab = (id: string) => {
    setActiveTab(id);
    history.replaceState(null, "", `#${id}`);
  };

  const saveProfile = (values: EditableProfile) => setUser((prev) => ({ ...prev, ...values }));

  const profile: EditableProfile = {
    name: user.name,
    dharmaName: user.dharmaName,
    dharmaNameHan: user.dharmaNameHan,
    email: user.email,
    intention: user.intention,
    avatar: user.avatar,
    cover: user.cover,
    favoriteVerse: user.favoriteVerse,
    favoriteVerseSource: user.favoriteVerseSource,
  };

  return (
    <div className={`${page} tw:gap-8 tw:upto-768:gap-6`}>
      <div className="tw:flex tw:flex-col tw:gap-4">
        <ArticleBreadcrumb items={[{ label: "Tài khoản" }]} />
        <h1 className="tw:sr-only">Tài khoản của tôi</h1>
        <ProfileHero user={user} />
      </div>

      <div className="tw:grid tw:grid-cols-[240px_minmax(0,1fr)] tw:gap-6 tw:items-start tw:max-lg:grid-cols-1">
        <ProfileSidebar tabs={TABS} activeTab={activeTab} onTabChange={changeTab} />

        <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="tw:min-w-0">
          {activeTab === "tong-quan" && <OverviewSection user={user} />}
          {activeTab === "hoc-tap" && <LearningSection report={user.learning} />}
          {activeTab === "ho-so" && <ProfileForm profile={profile} onSave={saveProfile} />}
          {activeTab === "doi-mat-khau" && <SecuritySection sessions={user.sessions} />}
          {activeTab === "cai-dat" && <CopyPreferencesSection />}
        </div>
      </div>
    </div>
  );
}
