import {
  useEffect,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "../../utils/cn";

/* ============================================================================
   Modal — THE REFERENCE COMPONENT
   ----------------------------------------------------------------------------
   A Modal (Dialog) displays important content above the current page.

   This component follows the same architecture as Button.

   1. TYPED PROPS
      - Extends native HTML <div> attributes.
      - Consumers automatically receive className, id, style,
        aria-*, data-* and other standard HTML props.

   2. CONTROLLED COMPONENT
      - Visibility is controlled by the parent.
      - The component never owns its own open state.

   3. DESIGN TOKENS
      - Uses design token classes only.
      - No raw colors are used inside the component.

   4. REUSABILITY
      - Works for confirmation dialogs, forms,
        edit screens and custom content.

   5. ACCESSIBILITY
      - Supports keyboard users.
      - Supports Escape key.
      - Supports overlay click.
      - Uses role="dialog" and aria-modal.
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

  /* Close the modal when Escape is pressed. */
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

  /* Don't render anything while closed. */
  if (!open) {
    return null;
  }

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
          "w-full rounded-lg border border-border",
          "bg-surface text-text shadow-xl",
          "overflow-hidden",
          sizeClasses[size],
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        onClick={(event) => event.stopPropagation()}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          {title && (
            <h2
              id="modal-title"
              className="text-lg font-semibold"
            >
              {title}
            </h2>
          )}

          <button
            type="button"
            onClick={onClose}
            className={cn(
              "ml-auto rounded-md p-2",
              "text-muted transition-colors",
              "hover:bg-surface-hover hover:text-text",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-primary",
            )}
            aria-label="Close Modal"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}