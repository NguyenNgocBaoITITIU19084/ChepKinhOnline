import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Đăng ký – Chép Kinh Online",
  description: "Khởi tạo tài khoản chép kinh trực tuyến Chép Kinh Online",
};

export default function RegisterPage() {
  return (
    <AuthCard title="Đăng Ký" subtitle="Khởi tâm bồ đề · Đồng hành chép kinh">
      <RegisterForm />
    </AuthCard>
  );
}
