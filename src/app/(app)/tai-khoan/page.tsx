import type { Metadata } from "next";
import { ProfileClient } from "./ProfileClient";

export const metadata: Metadata = {
  title: "Tài khoản · Chép Kinh Online",
  description: "Công phu chép kinh, hồ sơ cá nhân, bảo mật và cài đặt chép kinh.",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
