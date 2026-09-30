import {
  forwardRef,
  type SelectHTMLAttributes,
} from "react";

import { cn } from "../../utils/cn";

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
  placeholder?: string;
}

export const Select = forwardRef<
  HTMLSelectElement,
  SelectProps
>(function Select(
  {
    className,
    disabled,
    invalid = false,
    placeholder,
    children,
    ...props
  },
  ref,
) {
  return (
    <select
      ref={ref}
      disabled={disabled}
      aria-invalid={invalid}
      className={cn(
        "w-full rounded-lg",
        "bg-surface text-text",
        "px-4 py-2",
        invalid
          ? "border border-danger focus-visible:ring-danger"
          : "border border-border focus-visible:ring-primary",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}

      {children}
    </select>
  );
});