import Link from "next/link";
import { LotusLogo } from "@/components/brand/LotusLogo";
import { fontDisplay } from "@/components/article/styles";
import { cx } from "@/components/article/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: { label: string; href: string };
}

/** Danh sách trống: logo sen nhỏ, một câu nhẹ nhàng và nút viền dẫn tới việc nên làm. */
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="tw:flex tw:flex-col tw:items-center tw:gap-2 tw:py-8 tw:px-4 tw:text-center tw:rounded-[10px] tw:border tw:border-dashed tw:border-[rgba(214,164,64,0.45)]">
      <LotusLogo size={36} />
      <p className={cx("tw:m-0 tw:text-[1rem] tw:font-semibold tw:text-brown-900", fontDisplay)}>{title}</p>
      <p className="tw:m-0 tw:max-w-sm tw:text-[0.86rem] tw:leading-[1.6] tw:text-brown-800">{description}</p>
      {action && (
        <Link href={action.href} className="ck-btn-ghost tw:mt-2 tw:no-underline">
          {action.label}
        </Link>
      )}
    </div>
  );
}
