import Link from "next/link";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import { cx } from "./utils";
import { focusable } from "./styles";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ArticleBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/** Breadcrumb điều hướng phân tầng cho bài viết tu học */
export function ArticleBreadcrumb({ items, className }: ArticleBreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Đường dẫn trang"
      className={cx(
        "tw:flex tw:items-center tw:flex-wrap tw:gap-1.5 tw:text-[0.82rem] tw:leading-relaxed tw:text-brown-700",
        className,
      )}
    >
      <Link
        href="/"
        aria-label="Trang chủ"
        className={cx(
          "tw:inline-flex tw:items-center tw:gap-1 tw:text-brown-700 tw:hover:text-gold-700 tw:transition-colors tw:motion-reduce:transition-none",
          focusable,
        )}
      >
        <IconHome size={15} stroke={1.8} aria-hidden />
        <span className="tw:upto-480:hidden">Trang chủ</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="tw:inline-flex tw:items-center tw:gap-1.5 tw:min-w-0">
            <IconChevronRight
              size={13}
              stroke={1.6}
              className="tw:text-gold-700/60 tw:shrink-0"
              aria-hidden
            />
            {isLast || !item.href ? (
              <span
                aria-current={isLast ? "page" : undefined}
                className={cx(
                  "tw:truncate tw:max-w-[280px] tw:upto-768:max-w-[180px]",
                  isLast ? "tw:font-medium tw:text-brown-900" : "tw:text-brown-700",
                )}
                title={item.label}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cx(
                  "tw:truncate tw:max-w-[200px] tw:text-brown-700 tw:hover:text-gold-700 tw:transition-colors tw:motion-reduce:transition-none",
                  focusable,
                )}
                title={item.label}
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
