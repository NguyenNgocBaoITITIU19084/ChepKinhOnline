export interface AuthSubmitButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

// Nút chính vàng thếp của form xác thực; khi đang gửi thì hiện vòng xoay và khoá nút.
export function AuthSubmitButton({ isLoading, children }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      className="tw:relative tw:overflow-hidden tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:w-full tw:min-h-[46px] tw:mt-2 tw:px-5 tw:font-semibold tw:text-[0.94rem] tw:text-[var(--brown-900)] tw:bg-gradient-to-b tw:from-[#ffe699] tw:via-[#f5d77f] tw:to-[var(--gold-500)] tw:border tw:border-[#edd17b] tw:rounded-full tw:cursor-pointer tw:select-none tw:shadow-[0_4px_14px_rgba(214,164,64,0.35)] tw:transition-all tw:hover:shadow-[0_6px_20px_rgba(214,164,64,0.5)] tw:motion-safe:hover:-translate-y-0.5 tw:active:translate-y-0 tw:disabled:opacity-60 tw:disabled:pointer-events-none tw:focus-visible:outline-2 tw:focus-visible:outline-[var(--gold-500)] tw:focus-visible:outline-offset-2 font-zen-body"
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <span
            className="tw:inline-block tw:w-4 tw:h-4 tw:border-2 tw:border-[var(--brown-900)]/30 tw:border-t-[var(--brown-900)] tw:rounded-full tw:animate-spin"
            aria-hidden="true"
          />
          <span className="tw:sr-only">Đang xử lý</span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}
