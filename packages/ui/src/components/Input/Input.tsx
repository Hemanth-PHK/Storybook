import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

<<<<<<< HEAD
/* ============================================================================
   Input — REUSABLE COMPONENT
   ----------------------------------------------------------------------------
   1. Typed props
   2. Token-based styling
   3. Accessible focus styles
   4. Supports validation state
============================================================================ */
=======
>>>>>>> 88ee94bdd4e56167f6c5a1ecd5dc0b41f44a3571

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({
  className,
  disabled,
  invalid = false,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-lg",
        "bg-surface text-text",
        "px-4 py-2",

        invalid
          ? "border border-danger focus-visible:ring-danger"
          : "border border-border focus-visible:ring-primary",

        "placeholder:text-muted",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-offset-2",

        "disabled:cursor-not-allowed",
        "disabled:opacity-50",

        className
      )}
      disabled={disabled}
      aria-invalid={invalid}
      {...props}
    />
  );
}