import React from "react";
import { PhotoBanner } from "@/components/layout/PhotoBanner";

export function SutraLibraryHero() {
  return (
    <PhotoBanner
      size="compact"
      image="/storage/real/an_thu_but_long.jpg"
      imagePosition="center 42%"
      alt="Án thư kinh tạng, bút lông và giấy xuyến chỉ"
      caption="Án Thư Huân Tu · Tịnh Thất Không Gian Số"
      eyebrow="Tàng Kinh Các"
      title={
        <>
          Kho Tàng Kinh Điển, <em>huân tu chánh niệm giữa đời thường</em>
        </>
      }
      lead="Biên chép kinh điển là một trong mười pháp tu thù thắng của Phật giáo Đại Thừa. Mỗi nét chữ đặt xuống trên trang giấy là một hạt giống bồ đề gieo vào tâm thức, xua tan phiền não và nuôi dưỡng an lạc tự tâm."
      priority
    />
  );
}
