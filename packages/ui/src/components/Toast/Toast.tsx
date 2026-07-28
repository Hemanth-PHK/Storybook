import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

/* ============================================================================
   Toast — REUSABLE NOTIFICATION COMPONENT
   ----------------------------------------------------------------------------
   Toast displays short feedback messages to the user.

   Examples:
   - Success: "Changes saved successfully"
   - Error: "Something went wrong"
   - Warning: "Please review your information"
   - Info: "A new update is available"

   COMPONENT RULES:

   1. TYPED PROPS
      - Extends native HTML <div> attributes.
      - Consumers automatically receive className, id, style, aria-*, etc.

   2. VARIANTS
      - success
      - error
      - warning
      - info

   3. DESIGN TOKENS
      - Uses the project's theme token classes.
      - No hardcoded hex colors.
      - Automatically adapts when the application theme changes.

   4. ACCESSIBILITY
      - Error notifications use role="alert".
      - Other notifications use role="status".
      - Decorative icons are hidden from screen readers.
      - Dismiss button has an accessible label.

   5. DISMISSIBLE
      - Toast can optionally display a close button.
      - onDismiss notifies the parent that the user wants to dismiss it.

   6. CONTROLLED BEHAVIOR
      - Toast does NOT manage its own visibility.
      - The parent decides whether the Toast is rendered.
      - This keeps the component reusable.
   ========================================================================= */


/* ============================================================================
   Types
   ============================================================================ */

type ToastVariant = "success" | "error" | "warning" | "info";


/* ============================================================================
   Props
   ============================================================================ */

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

  /**
   * Determines whether the dismiss button is displayed.
   */
  dismissible?: boolean;

  /**
   * Called when the user clicks the dismiss button.
   *
   * The parent component should normally use this callback
   * to remove the Toast from the UI.
   */
  onDismiss?: () => void;
}


/* ============================================================================
   Variant Styles
   ----------------------------------------------------------------------------
   Only design-system token classes are used here.
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
  success: "text-success",
  error: "text-danger",
  warning: "text-warning",
  info: "text-primary",
};


/* ============================================================================
   Variant Icons
   ----------------------------------------------------------------------------
   These icons are decorative.

   aria-hidden is applied when they are rendered so screen readers don't
   announce them unnecessarily.
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
  dismissible = true,
  onDismiss,
  className,
  ...props
}: ToastProps) {
  /*
   * Errors should be announced more urgently by assistive technologies.
   *
   * Other Toast types use role="status".
   */
  const role = variant === "error" ? "alert" : "status";

  return (
    <div
      role={role}
      className={cn(
        /*
         * Layout
         */
        "flex w-full max-w-sm items-start gap-3",

        /*
         * Appearance
         */
        "rounded-lg border bg-surface p-4",
        "text-text shadow-lg",

        /*
         * Variant border
         */
        variantClasses[variant],

        /*
         * Allow consumers to extend the component.
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


      {/* =====================================================================
          Dismiss Button

          Important:
          Clicking this button calls onDismiss().

          The parent component decides what happens next.
          Usually it changes visibility state and removes the Toast.
          ================================================================== */}

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