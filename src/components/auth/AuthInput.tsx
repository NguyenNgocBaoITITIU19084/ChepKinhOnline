import React, { forwardRef, useId } from "react";
import styles from "./auth.module.css";

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
    <div className={styles.inputGroup}>
      <label htmlFor={inputId} className={styles.inputLabel}>
        {label}
      </label>
      <div className={`${styles.inputWrapper} ${error ? styles.inputWrapperError : ""}`}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={`${styles.inputField} ${className || ""}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        {endSlot && <div className={styles.inputEndSlot}>{endSlot}</div>}
      </div>
      {error && (
        <span id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});
