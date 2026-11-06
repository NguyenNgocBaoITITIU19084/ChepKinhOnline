import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import { TablerScripts } from "@/components/layout/TablerScripts";

// Hệ chữ của cả web chỉ có hai họ chữ Latin:
// - Be Vietnam Pro: chữ giao diện (nút, nhãn, đoạn văn)
// - Lora: mọi chữ serif, gồm chữ kinh, tiêu đề và tên web (--font-display trỏ về Lora trong globals.css)
// Noto Serif TC chỉ để hiện tên kinh chữ Hán.

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const lora = Lora({
  variable: "--font-book",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

// Chữ Hán (tên kinh); font CJK lớn nên không preload
const notoSerifTC = Noto_Serif_TC({
  variable: "--font-han",
  weight: ["600"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Chép Kinh Online – Án Thư Chánh Niệm",
  description: "Không gian chép kinh trực tuyến tôn nghiêm – lắng lòng trong từng nét chữ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${lora.variable} ${notoSerifTC.variable}`}>
      <body>
        {children}
        <TablerScripts />
      </body>
    </html>
  );
}
