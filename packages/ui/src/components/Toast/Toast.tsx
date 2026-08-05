import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

/* ============================================================================
   Toast — REUSABLE NOTIFICATION COMPONENT
   ============================================================================ */

type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual and semantic type of notification.
   */
  variant?: ToastVariant;

  /**
   * Optional heading displayed above the message.
   */
  title?: string;

  /**
   * Main Toast message/content.
   */
  children: ReactNode;
}

/* ============================================================================
   Variant Styles
   ============================================================================ */

const variantClasses: Record<ToastVariant, string> = {
  success: "border-success",
  error: "border-danger",
  warning: "border-warning",
  info: "border-primary",
};

/* ============================================================================
   Icon Styles
   ============================================================================ */

const iconClasses: Record<ToastVariant, string> = {
  success: "text-success border-success",
  error: "text-danger border-danger",
  warning: "text-warning border-warning",
  info: "text-primary border-primary",
};

/* ============================================================================
   Variant Icons
   ============================================================================ */

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
  ...props
}: ToastProps) {
  /*
   * Error notifications are more urgent,
   * so they use role="alert".
   *
   * Other Toast variants use role="status".
   */
  const role = variant === "error" ? "alert" : "status";

  return (
    <div
      role={role}
      className={cn(
        /*
         * Layout
         */
        "flex w-[520px] max-w-[90vw] items-start gap-5",

        /*
         * Appearance
         */
        "rounded-xl border-2 bg-surface px-6 py-5",
        "text-text shadow-lg",

        /*
         * Variant border
         */
        variantClasses[variant],

        /*
         * Consumer classes
         */
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
    </div>
  );
}