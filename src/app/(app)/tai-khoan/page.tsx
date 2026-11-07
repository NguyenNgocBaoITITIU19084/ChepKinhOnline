import type { Metadata } from "next";
import { ProfileClient } from "./ProfileClient";

export const metadata: Metadata = {
  title: "Hồ sơ tu học & Công phu · Chép Kinh Online",
  description:
    "Không gian tu học, theo dõi công đức chép kinh và quản lý hồ sơ cá nhân chánh niệm.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
