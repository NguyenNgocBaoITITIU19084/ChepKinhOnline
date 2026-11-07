"use client";

import { useRouter } from "next/navigation";
import { eyebrow, paperPanel } from "@/components/article/styles";
import { cx } from "@/components/article/utils";
import { navItem } from "./styles";

export interface ProfileTab {
  id: string;
  label: string;
}

interface ProfileSidebarProps {
  tabs: ProfileTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

/** Chữ cái đầu họ và tên, vd. "Nguyễn Văn An" -> "NA" (giống UserMenu trên header). */
export function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const letters = words.length > 1 ? words[0][0] + words[words.length - 1][0] : words[0][0];
  return letters.toLocaleUpperCase("vi");
}

/** Cột trái: điều hướng giữa các mục. Màn hẹp: hàng cuộn ngang. */
export function ProfileSidebar({ tabs, activeTab, onTabChange }: ProfileSidebarProps) {
  const router = useRouter();
  // Giao diện mẫu: chưa có phiên đăng nhập thật, đăng xuất thì về trang đăng nhập
  const signOut = () => router.push("/dang-nhap");

  return (
    <nav
      aria-label="Mục tài khoản"
      className={cx(
        paperPanel,
        "tw:flex tw:flex-col tw:gap-3 tw:p-4 tw:lg:sticky tw:lg:top-24 tw:max-lg:flex-row tw:max-lg:items-center tw:max-lg:p-2",
      )}
    >
      <span className={cx(eyebrow, "tw:px-3 tw:pt-1 tw:max-lg:hidden")}>Tài khoản</span>
      <ul
        role="tablist"
        className="tw:m-0 tw:p-0 tw:list-none tw:flex tw:flex-col tw:gap-0.5 tw:max-lg:flex-1 tw:max-lg:min-w-0 tw:max-lg:flex-row tw:max-lg:overflow-x-auto tw:max-lg:[scrollbar-width:none] tw:max-lg:gap-1"
      >
        {tabs.map(({ id, label }) => {
          const active = id === activeTab;
          return (
            <li key={id} role="presentation" className="tw:max-lg:shrink-0">
              <button
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={active}
                aria-controls={`panel-${id}`}
                onClick={() => onTabChange(id)}
                className={cx(navItem(active), "tw:max-lg:whitespace-nowrap")}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>
      {/* Đăng xuất: nút viền, tách khỏi các mục bằng đường chia (màn hẹp: nằm cuối hàng) */}
      <div className="tw:pt-3 tw:border-t tw:border-t-[rgba(214,164,64,0.25)] tw:max-lg:pt-0 tw:max-lg:shrink-0 tw:max-lg:border-t-0">
        <button type="button" className="ck-btn-ghost tw:w-full tw:min-h-10 tw:text-[0.88rem] tw:max-lg:w-auto tw:max-lg:px-4" onClick={signOut}>
          Đăng xuất
        </button>
      </div>
    </nav>
  );
}
