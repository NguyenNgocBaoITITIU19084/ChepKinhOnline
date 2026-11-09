import Link from "next/link";
import { SiteNavGroup } from "@/components/layout/SiteNavGroup";
import { IconArrowRight, IconChevronDown } from "@tabler/icons-react";

export type NavLink = { href: string; title: string; description: string };
export type NavGroup = { label: string; links: NavLink[] };

// Danh mục trên header (footer dùng lại). Các trang ngoài "/" và trang chép kinh chưa được dựng.
export const NAV: NavGroup[] = [
  {
    label: "Kinh điển",
    links: [
      {
        href: "/kinh-dien",
        title: "Kho Tàng Kinh Điển",
        description: "Toàn bộ các bộ kinh biên chép huân tu",
      },
      {
        href: "/kinh-dien?tam-nguyen=tri-tue",
        title: "Khai Mở Trí Tuệ",
        description: "Bát Nhã, Pháp Cú, Thủ Lăng Nghiêm…",
      },
      {
        href: "/kinh-dien?tam-nguyen=cau-an",
        title: "Cầu An & Trị Bệnh",
        description: "Chú Đại Bi, Kinh Dược Sư…",
      },
      {
        href: "/kinh-dien?tam-nguyen=cau-sieu",
        title: "Cầu Siêu & Báo Hiếu",
        description: "Kinh Địa Tạng, Kinh Vu Lan…",
      },
      {
        href: "/kinh-dien?tam-nguyen=sam-hoi",
        title: "Sám Hối Nghiệp Chướng",
        description: "Hồng Danh Sám Hối, Thủy Sám…",
      },
    ],
  },
  {
    label: "Chép kinh",
    links: [
      {
        href: "/chep-kinh/bat-nha-tam-kinh",
        title: "Bắt đầu chép",
        description: "Mở bài kinh đang chép dở",
      },
      { href: "/da-chep", title: "Kinh đã chép", description: "Lịch sử các lần chép và hồi hướng" },
      {
        href: "/muc-tieu",
        title: "Mục tiêu mỗi ngày",
        description: "Đặt số trang muốn chép mỗi ngày",
      },
    ],
  },
  {
    label: "Tu học",
    links: [
      {
        href: "/tu-hoc?category=nghi-thuc",
        title: "Nghi thức tụng niệm",
        description: "Các bước tụng kinh tại gia",
      },
      {
        href: "/tu-hoc?category=giai-nghia",
        title: "Giải nghĩa kinh",
        description: "Ý nghĩa các bản kinh thường tụng",
      },
      {
        href: "/tu-hoc?category=cam-nang",
        title: "Cẩm nang tu học",
        description: "Nuôi dưỡng tâm an lạc mỗi ngày",
      },
      {
        href: "/tu-hoc",
        title: "Tất cả bài viết",
        description: "Chuyên mục giáo lý & cẩm nang",
      },
    ],
  },
  {
    label: "Giới thiệu",
    links: [
      {
        href: "/gioi-thieu",
        title: "Về Chép Kinh Online",
        description: "Ý nghĩa của việc chép kinh",
      },
      {
        href: "/huong-dan",
        title: "Hướng dẫn sử dụng",
        description: "Cách gõ, đổi cỡ chữ, chọn chương",
      },
      {
        href: "/lien-he",
        title: "Liên hệ & góp ý",
        description: "Gửi lời nhắn cho nhóm phát triển",
      },
    ],
  },
];

// Danh mục mở khi rê chuột (hoặc khi focus bằng bàn phím), không cần JavaScript
export function SiteNav() {
  return (
    // Chưa có menu thu gọn cho màn hình hẹp: ẩn danh mục (≤1100px) để header không vỡ
    <nav className="tw:mr-auto tw:ml-3 tw:upto-1100:hidden" aria-label="Danh mục">
      <ul className="tw:flex tw:gap-0.5 tw:m-0 tw:p-0 tw:list-none">
        {NAV.map((group) => (
          <SiteNavGroup key={group.label}>
            <button
              type="button"
              className="ck-font-inherit tw:inline-flex tw:items-center tw:gap-1 tw:min-h-[38px] tw:px-3 tw:py-0 tw:text-[0.92rem] tw:font-medium tw:text-brown-800 tw:bg-transparent tw:border-none tw:border-current tw:rounded-[10px] tw:cursor-pointer tw:transition-[background,color] tw:duration-200 tw:ease-[ease] tw:group-hover:text-brown-900 tw:group-hover:bg-[rgba(232,199,122,0.28)] tw:group-focus-within:text-brown-900 tw:group-focus-within:bg-[rgba(232,199,122,0.28)] tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2"
              aria-haspopup="true"
            >
              {group.label}
              <IconChevronDown
                size={14}
                className="tw:transition-[transform] tw:duration-200 tw:ease-[ease] tw:group-hover:transform-[rotate(180deg)] tw:group-focus-within:transform-[rotate(180deg)]"
                aria-hidden
              />
            </button>
            <div className="ck-menu tw:top-[calc(100%+12px)] tw:-left-1 tw:w-[300px]">
              <div className="ck-menu-eyebrow" aria-hidden>
                {group.label}
              </div>
              {group.links.map(({ href, title, description }) => (
                <Link key={href} href={href} className="ck-menu-item">
                  <span className="ck-menu-text">
                    <strong className="ck-menu-title">{title}</strong>
                    <span className="ck-menu-desc">{description}</span>
                  </span>
                  <IconArrowRight size={16} className="ck-menu-arrow" aria-hidden />
                </Link>
              ))}
            </div>
          </SiteNavGroup>
        ))}
      </ul>
    </nav>
  );
}
