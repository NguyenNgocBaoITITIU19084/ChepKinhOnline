import Link from "next/link";
import {
  IconBook,
  IconBook2,
  IconCandle,
  IconCalendarEvent,
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
import styles from "@/components/copy/copy.module.css";

type NavLink = { href: string; title: string; description: string; icon: Icon };
type NavGroup = { label: string; links: NavLink[] };

// Danh mục trên header. Các trang ngoài "/" và trang chép kinh chưa được dựng.
const NAV: NavGroup[] = [
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
        href: "/tu-hoc/nghi-thuc",
        title: "Nghi thức tụng niệm",
        description: "Các bước tụng kinh tại gia",
        icon: IconCandle,
      },
      {
        href: "/tu-hoc/giai-nghia",
        title: "Giải nghĩa kinh",
        description: "Ý nghĩa các bản kinh thường tụng",
        icon: IconScript,
      },
      {
        href: "/tu-hoc/ngay-via",
        title: "Ngày vía & lịch âm",
        description: "Ngày rằm, mùng một, vía chư Phật",
        icon: IconCalendarEvent,
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
    <nav className={styles.siteNav} aria-label="Danh mục">
      <ul className={styles.navList}>
        {NAV.map((group) => (
          <li key={group.label} className={styles.navItem}>
            <button type="button" className={styles.navTrigger} aria-haspopup="true">
              {group.label}
              <IconChevronDown size={14} className={styles.navChevron} aria-hidden />
            </button>
            <div className={`${styles.glass} ${styles.dropdown}`}>
              {group.links.map(({ href, title, description, icon: LinkIcon }) => (
                <Link key={href} href={href} className={styles.dropItem}>
                  <span className={styles.dropIcon} aria-hidden>
                    <LinkIcon size={18} />
                  </span>
                  <span className={styles.dropText}>
                    <strong>{title}</strong>
                    <span>{description}</span>
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
