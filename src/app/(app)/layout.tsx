import { AppHeader } from "@/components/layout/AppHeader";

// Khung giao diện Tabler cho các trang thông thường
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="page">
      <AppHeader />
      <div className="page-wrapper">{children}</div>
    </div>
  );
}
