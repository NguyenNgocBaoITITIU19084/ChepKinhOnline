import Link from "next/link";
import {
  IconBook,
  IconBook2,
  IconCandle,
  IconChevronDown,
  IconFlower,
  IconHeartHandshake,
  IconHistory,
  IconInfoCircle,
  IconMessageCircle,
  IconPencil,
  IconScript,
  IconSparkles,
  IconTarget,
  type Icon,
} from "@tabler/icons-react";

export type NavLink = { href: string; title: string; description: string; icon: Icon };
export type NavGroup = { label: string; links: NavLink[] };

// Danh mục trên header (footer dùng lại). Các trang ngoài "/" và trang chép kinh chưa được dựng.
export const NAV: NavGroup[] = [
  {
    label: "Kinh điển",
    links: [
      {
        href: "/kinh/dai-thua",
        title: "Kinh Đại thừa",
        description: "Bát Nhã, Pháp Hoa, Kim Cang, Dược Sư…",
        icon: IconBook,
      },
      {
        href: "/kinh/nguyen-thuy",
        title: "Kinh Nguyên thủy",
        description: "Pháp Cú, Kinh Từ Bi, Kinh Phước Đức…",
        icon: IconBook2,
      },
      {
        href: "/kinh/than-chu",
        title: "Thần chú",
        description: "Chú Đại Bi, Vãng Sanh, Thập Chú…",
        icon: IconSparkles,
      },
      {
        href: "/kinh/sam-hoi",
        title: "Sám hối",
        description: "Hồng Danh, Bát Nhã Sám, Tam Thiên Phật…",
        icon: IconHeartHandshake,
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
        icon: IconPencil,
      },
      { href: "/da-chep", title: "Kinh đã chép", description: "Lịch sử các lần chép và hồi hướng", icon: IconHistory },
      {
        href: "/muc-tieu",
        title: "Mục tiêu mỗi ngày",
        description: "Đặt số trang muốn chép mỗi ngày",
        icon: IconTarget,
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
        icon: IconCandle,
      },
      {
        href: "/tu-hoc?category=giai-nghia",
        title: "Giải nghĩa kinh",
        description: "Ý nghĩa các bản kinh thường tụng",
        icon: IconScript,
      },
      {
        href: "/tu-hoc?category=cam-nang",
        title: "Cẩm nang tu học",
        description: "Nuôi dưỡng tâm an lạc mỗi ngày",
        icon: IconFlower,
      },
      {
        href: "/tu-hoc",
        title: "Tất cả bài viết",
        description: "Chuyên mục giáo lý & cẩm nang",
        icon: IconBook2,
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
        icon: IconFlower,
      },
      {
        href: "/huong-dan",
        title: "Hướng dẫn sử dụng",
        description: "Cách gõ, đổi cỡ chữ, chọn chương",
        icon: IconInfoCircle,
      },
      {
        href: "/lien-he",
        title: "Liên hệ & góp ý",
        description: "Gửi lời nhắn cho nhóm phát triển",
        icon: IconMessageCircle,
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
          <li key={group.label} className="tw:group tw:relative">
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
            {/* before: cầu nối vô hình để rê chuột từ danh mục xuống dropdown không bị đóng */}
            <div className="ck-glass tw:absolute tw:top-[calc(100%+10px)] tw:left-0 tw:flex tw:flex-col tw:gap-0.5 tw:w-[300px] tw:p-2 tw:bg-[rgba(255,253,246,0.97)] tw:opacity-0 tw:invisible tw:transform-[translateY(6px)] tw:transition-[opacity,transform,visibility] tw:duration-[180ms] tw:ease-[ease] tw:group-hover:opacity-100 tw:group-hover:visible tw:group-hover:transform-none tw:group-focus-within:opacity-100 tw:group-focus-within:visible tw:group-focus-within:transform-none tw:before:content-[''] tw:before:absolute tw:before:inset-x-0 tw:before:-top-3 tw:before:bottom-auto tw:before:h-3">
              {group.links.map(({ href, title, description, icon: LinkIcon }) => (
                <Link
                  key={href}
                  href={href}
                  className="tw:group/item tw:grid tw:grid-cols-[34px_minmax(0,1fr)] tw:items-center tw:gap-3 tw:py-[9px] tw:px-2.5 tw:no-underline tw:rounded-[10px] tw:transition-[background] tw:duration-150 tw:ease-[ease] tw:hover:no-underline tw:hover:bg-[rgba(232,199,122,0.26)] tw:focus-visible:no-underline tw:focus-visible:bg-[rgba(232,199,122,0.26)] tw:focus-visible:outline-none"
                >
                  <span
                    className="tw:grid tw:place-items-center tw:size-[34px] tw:text-gold-700 tw:bg-gold-100 tw:border tw:border-solid tw:border-[rgba(214,164,64,0.4)] tw:rounded-[10px] tw:group-hover/item:text-brown-900 tw:group-hover/item:bg-[linear-gradient(160deg,#fff0c2,var(--gold-500))] tw:group-hover/item:border-transparent"
                    aria-hidden
                  >
                    <LinkIcon size={18} />
                  </span>
                  <span className="tw:flex tw:flex-col tw:gap-px tw:min-w-0">
                    <strong className="tw:text-[0.9rem] tw:font-semibold tw:text-brown-900">{title}</strong>
                    <span className="tw:text-[0.78rem] tw:leading-[1.4] tw:text-[rgba(107,74,18,0.72)]">{description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
