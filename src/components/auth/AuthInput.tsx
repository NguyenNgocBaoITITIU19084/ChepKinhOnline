import React, { forwardRef, useId } from "react";

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  endSlot?: React.ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(function AuthInput(
  { label, error, icon, endSlot, id: externalId, className, ...rest },
  ref
) {
  const generatedId = useId();
  const inputId = externalId || generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="tw:flex tw:flex-col tw:gap-1.5 tw:w-full">
      <label htmlFor={inputId} className="tw:text-[0.86rem] tw:font-medium tw:text-[var(--brown-800)] tw:select-none font-zen-body">
        {label}
      </label>

      <div
        className={`tw:relative tw:flex tw:items-center tw:w-full tw:rounded-[10px] tw:bg-[var(--paper)]/85 tw:border tw:border-[var(--gold-500)]/35 tw:transition-all tw:hover:border-[var(--gold-500)]/60 tw:hover:bg-[var(--paper)]/95 tw:focus-within:border-[var(--gold-500)] tw:focus-within:bg-white tw:focus-within:shadow-[0_0_0_3px_rgba(214,164,64,0.18)] ${
          error ? "tw:!border-[var(--ink-wrong)] tw:!bg-[#fff8f6] tw:!shadow-[0_0_0_3px_rgba(180,83,9,0.15)]" : ""
        }`}
      >
        {icon && (
          <span className="tw:flex tw:items-center tw:justify-center tw:pl-3 tw:text-[var(--gold-700)] tw:pointer-events-none tw:shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          className={`tw:flex-1 tw:w-full tw:min-h-[44px] tw:px-3 font-zen-body tw:text-[0.94rem] tw:text-[var(--ink)] tw:bg-transparent tw:border-0 tw:outline-none tw:placeholder:text-[var(--ink-ghost)] ${className || ""}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />

        {endSlot && (
          <div className="tw:flex tw:items-center tw:justify-center tw:pr-2 tw:shrink-0">
            {endSlot}
          </div>
        )}
      </div>

      {error && (
        <span id={errorId} className="tw:text-[0.8rem] tw:text-[var(--ink-wrong)] tw:mt-0.5 font-zen-body" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});
