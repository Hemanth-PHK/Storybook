import {
  useEffect,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "../../utils/cn";

/* ============================================================================
   Modal — REUSABLE DIALOG COMPONENT
   ----------------------------------------------------------------------------
   A Modal (Dialog) displays important content above the current page.

   Features
   • Controlled component
   • Keyboard accessible
   • Overlay click support
   • Escape key support
   • Design token based styling
   • Reusable for forms, confirmations and dialogs
============================================================================ */

type Size = "sm" | "md" | "lg";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  size?: Size;
  closeOnOverlay?: boolean;
}

const sizeClasses: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-3xl",
};

export function Modal({
  open,
  title,
  children,
  onClose,
  size = "md",
  closeOnOverlay = true,
  className,
  ...props
}: ModalProps) {
  /* Close modal using Escape key */
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  /* Don't render when closed */
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => {
        if (closeOnOverlay) {
          onClose();
        }
      }}
    >
      <div
        className={cn(
          "w-full overflow-hidden rounded-xl shadow-2xl",
          "border border-border",
          sizeClasses[size],
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        onClick={(event) => event.stopPropagation()}
        {...props}
      >
        {/* ==========================================================
            HEADER
        ========================================================== */}

        <div
          className={cn(
            "flex items-center",
            "bg-primary text-primary-foreground",
            "px-6 py-5",
          )}
        >
          {title && (
            <h2
              id="modal-title"
              className="text-xl font-semibold"
            >
              {title}
            </h2>
          )}

          {/* Push close button to the right */}
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "ml-auto rounded-md p-2",
              "transition-colors",

              "hover:bg-white/20",

              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-white",
            )}
            aria-label="Close Modal"
          >
            ✕
          </button>
        </div>

        {/* ==========================================================
            BODY
        ========================================================== */}

        <div
          className={cn(
            "bg-surface text-text",
            "px-6 py-8",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}