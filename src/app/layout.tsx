import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora, Noto_Serif_TC, Playfair_Display } from "next/font/google";
import "./globals.css";
import { TablerScripts } from "@/components/layout/TablerScripts";

// Chữ giao diện: font sans thiết kế cho tiếng Việt
const beVietnam = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

// Chữ kinh: serif gốc thư pháp, dấu tiếng Việt rõ và cân đối
const lora = Lora({
  variable: "--font-book",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
});

// Tiêu đề, logo
const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

// Chữ Hán (tên kinh); font CJK lớn nên không preload
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-han",
  weight: ["600"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Chép Kinh Online",
  description: "Chép kinh trực tuyến – tâm an, pháp lạc mỗi ngày",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${lora.variable} ${playfair.variable} ${notoSerifTC.variable}`}
    >
      <body>
        {children}
        <TablerScripts />
      </body>
    </html>
  );
}
