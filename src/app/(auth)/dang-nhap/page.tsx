import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập – Chép Kinh Online",
  description: "Đăng nhập vào không gian chép kinh trực tuyến Chép Kinh Online",
};

export default function LoginPage() {
  return (
    <AuthCard title="Đăng Nhập" subtitle="Trở về án thư · Lắng lòng chép kinh">
      <LoginForm />
    </AuthCard>
  );
}
