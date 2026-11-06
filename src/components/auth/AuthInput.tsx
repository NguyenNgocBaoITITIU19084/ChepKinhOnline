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
      <label htmlFor={inputId} className="tw:text-[0.86rem] tw:font-medium tw:text-[var(--brown-800,#6b4a12)] tw:select-none font-zen-body">
        {label}
      </label>

      <div
        className={`tw:relative tw:flex tw:items-center tw:w-full tw:rounded-[10px] tw:bg-[#fbf7ec]/85 tw:border tw:border-[rgba(214,164,64,0.35)] tw:transition-all hover:tw:border-[rgba(214,164,64,0.6)] hover:tw:bg-[#fbf7ec]/95 focus-within:tw:border-[#d6a440] focus-within:tw:bg-white focus-within:tw:shadow-[0_0_0_3px_rgba(214,164,64,0.18)] ${
          error ? "tw:!border-[#b45309] tw:!bg-[#fff8f6] tw:!shadow-[0_0_0_3px_rgba(180,83,9,0.15)]" : ""
        }`}
      >
        {icon && (
          <span className="tw:flex tw:items-center tw:justify-center tw:pl-3 tw:text-[#a8741a] tw:pointer-events-none tw:shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          className={`tw:flex-1 tw:w-full tw:min-h-[44px] tw:px-3 tw:font-sans tw:text-[0.94rem] tw:text-[var(--ink,#2b2116)] tw:bg-transparent tw:border-0 tw:outline-none placeholder:tw:text-[rgba(120,95,55,0.45)] ${className || ""}`}
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
        <span id={errorId} className="tw:text-[0.8rem] tw:text-[#b45309] tw:mt-0.5 font-zen-body" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});
