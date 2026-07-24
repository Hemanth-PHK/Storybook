import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

/* ============================================================================
   Input — REUSABLE COMPONENT
   ----------------------------------------------------------------------------
   Follows the same structure as Button.
   1. Typed props
   2. Token-based styling
   3. No hardcoded colors
   4. Accessible focus styles
============================================================================ */

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  className,
  disabled,
  ...props
}: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-border",
        "bg-surface text-text",
        "px-4 py-2",
        "placeholder:text-muted",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-primary",
        "focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}