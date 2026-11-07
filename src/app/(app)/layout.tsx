import { AppHeader } from "@/components/layout/AppHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

// `ck-scene` cho nền kem hoa văn chữ Vạn và bảng màu dùng chung với trang chép kinh
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="ck-scene ck-scene-bg">
      <AppHeader />
      <main className="tw:flex-1">{children}</main>
      <SiteFooter />
      {/* Nút lên đầu trang dùng chung; trang chi tiết bài tu học có thêm vòng tiến độ đọc */}
      <ScrollToTop />
    </div>
  );
}
