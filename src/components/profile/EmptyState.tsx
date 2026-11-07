import { LotusIcon } from "@/components/icons/BuddhistIcons";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:text-center tw:py-8 tw:px-4 tw:rounded-xl tw:bg-amber-50/40 tw:border tw:border-dashed tw:border-amber-300/50">
      <div className="tw:p-2.5 tw:rounded-full tw:bg-amber-100/60 tw:text-gold-700 tw:mb-2.5">
        <LotusIcon size={28} strokeWidth={1.4} />
      </div>
      <h4 className="tw:text-sm tw:font-bold tw:text-brown-900 tw:font-serif tw:mb-1">{title}</h4>
      <p className="tw:text-xs tw:text-brown-600 tw:max-w-sm tw:leading-relaxed tw:mb-3">
        {description}
      </p>
      {action && (
        <a
          href={action.href}
          className="tw:inline-flex tw:items-center tw:gap-1.5 tw:px-3.5 tw:py-1.5 tw:rounded-lg tw:text-xs tw:font-semibold tw:text-brown-900 tw:bg-gold-400 tw:hover:bg-gold-500 tw:transition-colors"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
