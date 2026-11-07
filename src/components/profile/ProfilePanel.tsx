import type { ReactNode } from "react";
import { fontDisplay, paperPanel } from "@/components/article/styles";
import { cx } from "@/components/article/utils";

interface ProfilePanelProps {
  title: string;
  description?: string;
  /** Bên phải tiêu đề, ví dụ liên kết "Xem tất cả". */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Thẻ giấy chứa một mục của trang tài khoản: tiêu đề Lora, mô tả ngắn, gạch chân glass-border. */
export function ProfilePanel({ title, description, action, children, className }: ProfilePanelProps) {
  return (
    <section className={cx(paperPanel, "tw:flex tw:flex-col tw:gap-5 tw:p-6 tw:upto-480:p-4", className)}>
      <header className="tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-3 tw:pb-3 tw:border-b tw:border-b-[rgba(214,164,64,0.35)]">
        <div className="tw:flex tw:flex-col tw:gap-1 tw:min-w-0">
          <h2 className={cx("tw:m-0 tw:text-[1.2rem] tw:font-semibold tw:leading-[1.3] tw:text-brown-900", fontDisplay)}>
            {title}
          </h2>
          {description && <p className="tw:m-0 tw:text-[0.86rem] tw:leading-[1.55] tw:text-brown-800">{description}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
