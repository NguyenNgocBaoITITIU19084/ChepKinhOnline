import { Suspense } from "react";
import type { Metadata } from "next";
import { TuHocContent, TuHocFallback } from "./TuHocClient";

export const metadata: Metadata = {
  title: "Tu học · Chép Kinh Online",
  description: "Giải nghĩa kinh, nghi thức tụng niệm, cẩm nang tu học và lời Phật dạy.",
};

// Phần lọc đọc ?category= trên URL nên phải nằm trong Suspense
export default function TuHocPage() {
  return (
    <Suspense fallback={<TuHocFallback />}>
      <TuHocContent />
    </Suspense>
  );
}
