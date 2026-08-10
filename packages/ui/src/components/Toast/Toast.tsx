import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";


type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantClasses: Record<ToastVariant, string> = {
  success: "border-success",
  error: "border-danger",
  warning: "border-warning",
  info: "border-primary",
};


const iconClasses: Record<ToastVariant, string> = {
  success: "text-success border-success",
  error: "text-danger border-danger",
  warning: "text-warning border-warning",
  info: "text-primary border-primary",
};


const icons: Record<ToastVariant, ReactNode> = {
  success: "✓",
  error: "✕",
  warning: "!",
  info: "i",
};

/* ============================================================================
   Toast Component
   ============================================================================ */

export function Toast({
  variant = "info",
  title,
  children,
  className,
  dismissible = false,
  onDismiss,
  ...props
}: ToastProps) {
  const role = variant === "error" ? "alert" : "status";

  return (
    <div
      role={role}
      className={cn(
        "flex w-full max-w-sm items-start gap-3",
        "rounded-lg border bg-surface p-4",
        "text-text shadow-lg",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {/* =====================================================================
          Status Icon
          ================================================================== */}

      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center",
          "rounded-full border-2",
          "text-xl font-bold leading-none",
          iconClasses[variant],
        )}
        aria-hidden="true"
      >
        {icons[variant]}
      </span>

      {/* =====================================================================
          Toast Content
          ================================================================== */}

      <div className="min-w-0 flex-1">

        {/* Optional Title */}

        {title && (
          <div className="mb-2 text-lg font-semibold text-text">
            {title}
          </div>
        )}

        {/* Main Message */}

        <div className="text-base leading-6 text-muted">
          {children}
        </div>

      </div>
      {dismissible && (
        <button
          type="button"
          onClick={() => {
            onDismiss?.();
          }}
          className={cn(
            "shrink-0 rounded-md p-1",
            "text-muted",

            "transition-colors",
            "hover:bg-surface-hover hover:text-text",

            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-primary",
          )}
          aria-label="Dismiss notification"
        >
          <span aria-hidden="true">
            ×
          </span>
        </button>
      )}

    </div>
  );
}