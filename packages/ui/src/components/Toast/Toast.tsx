import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";



type ToastVariant = "success" | "error" | "warning" | "info";


/* ============================================================================
   Props
   ============================================================================ */

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
  success: "text-success",
  error: "text-danger",
  warning: "text-warning",
  info: "text-primary",
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
  dismissible = true,
  onDismiss,
  className,
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
          "flex h-6 w-6 shrink-0 items-center justify-center",
          "rounded-full font-semibold",
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
          <div className="mb-1 font-medium text-text">
            {title}
          </div>
        )}


        {/* Main Message */}

        <div className="text-sm text-muted">
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