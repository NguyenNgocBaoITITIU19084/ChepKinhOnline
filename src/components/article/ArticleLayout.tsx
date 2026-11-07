import type { ReactNode } from "react";
import styles from "./ArticleLayout.module.css";
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
    <div className={cx(styles.layout, className)}>
      <div className={styles.main}>{children}</div>
      {sidebar && (
        <aside className={cx(styles.sidebar, stickySidebar && styles.sticky)} aria-label={sidebarLabel}>
          {sidebar}
        </aside>
      )}
    </div>
  );
}

export default ArticleLayout;
