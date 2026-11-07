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

const linkClass = cx(
  "tw:inline-flex tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-0.5 tw:-mx-1.5",
  "tw:text-brown-800 tw:no-underline tw:hover:no-underline tw:hover:text-gold-700 tw:hover:bg-[rgba(232,199,122,0.22)]",
  "tw:transition-colors tw:motion-reduce:transition-none",
  focusable,
);

/** Breadcrumb điều hướng phân tầng cho bài viết tu học */
export function ArticleBreadcrumb({ items, className }: ArticleBreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Đường dẫn trang" className={className}>
      <ol className="tw:m-0 tw:p-0 tw:list-none tw:flex tw:items-center tw:flex-wrap tw:gap-x-2 tw:gap-y-1 tw:text-[0.84rem] tw:leading-normal">
        <li className="tw:inline-flex tw:items-center">
          <Link href="/" aria-label="Trang chủ" className={linkClass}>
            <IconHome size={15} stroke={1.8} className="tw:shrink-0" aria-hidden />
            <span className="tw:upto-480:hidden">Trang chủ</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="tw:inline-flex tw:items-center tw:gap-2 tw:min-w-0">
              <IconChevronRight
                size={14}
                stroke={1.8}
                className="tw:text-gold-500 tw:shrink-0"
                aria-hidden
              />
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cx(
                    "tw:truncate",
                    isLast
                      ? "tw:max-w-[360px] tw:upto-768:max-w-[220px] tw:upto-480:max-w-[160px] tw:font-medium tw:text-brown-900"
                      : "tw:text-brown-800",
                  )}
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={cx(linkClass, "tw:whitespace-nowrap")}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
