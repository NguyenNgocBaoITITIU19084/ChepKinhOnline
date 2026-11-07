import { IconSparkles } from "@tabler/icons-react";

// Thông báo nhẹ phía trên form. Vùng live luôn có trong DOM để trình đọc màn hình
// bắt được nội dung mới (vùng live chèn vào cùng lúc với nội dung thường bị bỏ qua).
export function AuthNotice({ message }: { message: string | null }) {
  return (
    <div role="status" aria-live="polite">
      {message && (
        <div className="tw:flex tw:items-center tw:gap-2 tw:p-3 tw:mb-4 tw:rounded-[10px] tw:bg-[var(--gold-300)]/25 tw:border tw:border-[var(--gold-500)]/40 tw:text-[0.85rem] tw:text-[var(--brown-900)] font-zen-body">
          <IconSparkles size={16} stroke={1.8} className="tw:shrink-0 tw:text-[var(--gold-700)]" aria-hidden="true" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
