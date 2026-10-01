
import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "../../utils/cn";

type ModalSize = "sm" | "md" | "lg";

export interface ModalProps
  extends Omit<HTMLAttributes<HTMLDialogElement>, "title"> {
  open: boolean;
  title?: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlay?: boolean;
  dismissible?: boolean;
  initialFocusSelector?: string;
}

const sizes: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-3xl",
};

export function Modal({
  open,
  title,
  description,
  children,
  onClose,
  size = "md",
  closeOnOverlay = true,
  dismissible = true,
  initialFocusSelector,
  className,
  ...props
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();

      const target = initialFocusSelector
        ? dialog.querySelector<HTMLElement>(initialFocusSelector)
        : null;

      target?.focus();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, initialFocusSelector]);

  const handleClose = () => {
    if (dismissible) onClose();
  };

  return (
    <dialog
      {...props}
      ref={dialogRef}
      aria-label={title || "Dialog"}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      onMouseDown={(event) => {
        if (!closeOnOverlay || !dismissible) return;

        const rect = event.currentTarget.getBoundingClientRect();

        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        ) {
          handleClose();
        }
      }}
      className={cn(
        "fixed inset-0 m-auto w-[calc(100%-2rem)]",
        "max-h-[calc(100dvh-2rem)] overflow-hidden",
        "rounded-xl border border-border bg-surface",
        "p-0 text-text shadow-2xl",
        "backdrop:bg-black/50",
        sizes[size],
        className,
      )}
    >
      <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
        <div className="flex shrink-0 items-center gap-3 bg-primary px-4 py-4 text-primary-foreground sm:px-6">
          <h2 className="min-w-0 flex-1 break-words text-lg font-semibold">
            {title || "Dialog"}
          </h2>

          <button
            type="button"
            aria-label="Close dialog"
            disabled={!dismissible}
            onClick={handleClose}
            className={cn(
              "shrink-0 rounded-md p-2",
              "hover:bg-white/20",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-white",
              "disabled:opacity-50",
            )}
          >
            ✕
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto px-4 py-5 sm:px-6">
          {description && (
            <p className="mb-6 break-words text-sm leading-6">
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </dialog>
  );
}

Modal.displayName = "Modal";