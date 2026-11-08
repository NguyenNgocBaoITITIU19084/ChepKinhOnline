import type { Metadata } from "next";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ & Góp ý | Chép Kinh Online",
  description:
    "Gửi đóng góp ý kiến, phản ánh lỗi bài kinh hoặc đề xuất bản kinh mới để cùng xây dựng không gian chép kinh trang nghiêm, thanh tịnh.",
};

export default function ContactPage() {
  return (
    <div className="tw:max-w-[1152px] tw:mx-auto tw:px-4 tw:sm:px-6 tw:py-8 tw:lg:py-12 font-zen-body">
      <ContactHeader />

      <div className="tw:grid tw:grid-cols-1 tw:lg:grid-cols-12 tw:gap-8 tw:lg:gap-10 tw:items-start">
        {/* Cột trái desktop (5 phần) / Cột dưới mobile: FAQ Giải đáp nhanh */}
        <div className="tw:order-2 tw:lg:order-1 tw:lg:col-span-5">
          <ContactFaq />
        </div>

        {/* Cột phải desktop (7 phần) / Cột trên mobile: Biểu mẫu liên hệ & góp ý */}
        <div className="tw:order-1 tw:lg:order-2 tw:lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
