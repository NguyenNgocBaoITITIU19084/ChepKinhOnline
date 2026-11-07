import type { ReactNode } from "react";
import { cx } from "./utils";

export interface ArticleLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  sidebarLabel?: string;
  /** Giữ cột phụ đứng yên khi cuộn (chỉ trên máy tính). */
  stickySidebar?: boolean;
  className?: string;
}

/** Bố cục hai cột của chuyên trang: nội dung chính bên trái, cột phụ 300px bên phải. */
export function ArticleLayout({
  children,
  sidebar,
  sidebarLabel = "Cột phụ",
  stickySidebar = false,
  className,
}: ArticleLayoutProps) {
  return (
    // Hai cột: nội dung chính và cột phụ 300px. Màn hẹp: cột phụ xuống dưới
    <div
      className={cx(
        "tw:grid tw:grid-cols-[minmax(0,1fr)_300px] tw:gap-10 tw:[align-items:start] tw:upto-1024:grid-cols-[minmax(0,1fr)]",
        className,
      )}
    >
      <div className="tw:flex tw:flex-col tw:gap-8 tw:min-w-0">{children}</div>
      {sidebar && (
        <aside
          className={cx(
            "tw:flex tw:flex-col tw:gap-6 tw:min-w-0",
            // Chỉ dính khi màn đủ cao để thấy trọn cột phụ, tránh phần dưới bị khuất; top 92px: dưới thanh header nổi
            stickySidebar &&
              "tw:[@media(min-width:1025px)_and_(min-height:900px)]:sticky tw:[@media(min-width:1025px)_and_(min-height:900px)]:top-[92px]",
          )}
          aria-label={sidebarLabel}
        >
          {sidebar}
        </aside>
      )}
    </div>
  );
}

export default ArticleLayout;
