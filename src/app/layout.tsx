import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/layout/AppHeader";
import { TablerScripts } from "@/components/layout/TablerScripts";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Chép Kinh Online",
  description: "Chép kinh trực tuyến – tĩnh tâm mỗi ngày",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={inter.variable}>
      <body>
        <div className="page">
          <AppHeader />
          <div className="page-wrapper">{children}</div>
        </div>
        <TablerScripts />
      </body>
    </html>
  );
}
