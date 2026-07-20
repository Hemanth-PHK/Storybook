import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

/* ============================================================================
   Button — THE REFERENCE COMPONENT
   ----------------------------------------------------------------------------
   Every other component copies this shape. Study it:

   1. TYPED PROPS: extend the real HTML element's props so consumers get
      onClick, disabled, type, aria-*, etc. for free.
   2. VARIANTS: a lookup object maps a `variant` prop to token-based classes.
   3. NO RAW COLORS: every color is a token class (bg-primary, text-text...).
      There is not a single hex or bg-blue-500 anywhere. THAT is what lets the
      theme switch recolor this button automatically.
   4. STATES: hover, disabled, and focus-visible are all handled with tokens.
   ========================================================================= */

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "bg-surface text-text border border-border hover:bg-surface-hover",
  ghost: "bg-transparent text-primary hover:bg-surface-hover",
  danger: "bg-danger text-on-primary hover:opacity-90",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "transition-colors focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
