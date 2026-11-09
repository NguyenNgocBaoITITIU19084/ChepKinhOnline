import type { Metadata } from "next";
import { PhotoBanner } from "@/components/layout/PhotoBanner";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactLandscape } from "@/components/contact/ContactLandscape";

export const metadata: Metadata = {
  title: "Liên hệ & Góp ý | Chép Kinh Online",
  description:
    "Viết thư gửi Ban biên tập Chép Kinh Online: báo lỗi bản kinh, đề xuất kinh mới, báo lỗi kỹ thuật hay góp ý chung.",
};

export default function ContactPage() {
  return (
    <div className="font-zen-body">
      {/* Trọn tượng Đại Phật ngồi giữa núi rừng; banner cao để thấy từ đỉnh đầu đến tay bắt ấn. Ảnh trôi chậm khi cuộn. */}
      <PhotoBanner
        size="tall"
        priority
        parallax
        headingLevel="h1"
        image="/storage/real/tian_tan_1.jpg"
        alt="Tượng Đại Phật ngồi trên đài sen giữa núi rừng, trời xanh mây trắng"
        caption="Đại Phật Thiên Đàn · Lantau, Hồng Kông"
        imagePosition="62% 0%"
        eyebrow="Liên hệ · Góp ý"
        title={
          <>
            Viết một lá thư <em>gửi Ban biên tập</em>
          </>
        }
        lead="Báo lỗi bản kinh, đề xuất kinh mới, hay gửi đôi lời tâm tình. Mỗi lá thư đều được đọc và hồi âm."
      />

      {/* Máy tính: lá thư bên trái, Vấn đáp bên phải. Màn hẹp: thư trước, vấn đáp sau. */}
      <div className="tw:grid tw:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] tw:gap-14 tw:items-start tw:w-full tw:max-w-[1152px] tw:mx-auto tw:pt-10 tw:px-6 tw:pb-16 tw:box-border tw:upto-1024:grid-cols-[minmax(0,1fr)] tw:upto-1024:gap-12 tw:upto-1024:px-5 tw:upto-768:pt-8 tw:upto-768:px-4">
        <ContactForm />
        <ContactFaq className="tw:pt-2" />
      </div>

      <ContactLandscape />
    </div>
  );
}
