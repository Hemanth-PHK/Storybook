import {forwardRef,useEffect,useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "../../utils/cn";

export type DrawerSide = "left" | "right" | "bottom";

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: DrawerSide;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
}

const sideClasses: Record<DrawerSide, string> = {
  left: "left-0 top-0 h-full w-full max-w-md",
  right: "right-0 top-0 h-full w-full max-w-md",
  bottom: "bottom-0 left-0 w-full max-h-[80vh]",
};

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onOpenChange,
      side = "right",
      title,
      description,
      children,
      footer,
      closeOnOverlayClick = true,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const drawerRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    const setDrawerRef = (node: HTMLDivElement | null) => {
      drawerRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    useEffect(() => {
      if (!open) {
        return;
      }

      triggerRef.current = document.activeElement as HTMLElement;

      const previousOverflow = document.body.style.overflow;

      document.body.style.overflow = "hidden";

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onOpenChange(false);
          return;
        }

        if (event.key === "Tab") {
          const drawer = drawerRef.current;

          if (!drawer) {
            return;
          }

          const focusableElements =
            drawer.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );

          if (focusableElements.length === 0) {
            event.preventDefault();
            return;
          }

          const firstElement = focusableElements[0];
          const lastElement =
            focusableElements[focusableElements.length - 1];

          if (
            event.shiftKey &&
            document.activeElement === firstElement
          ) {
            event.preventDefault();
            lastElement.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      requestAnimationFrame(() => {
        const drawer = drawerRef.current;

        if (!drawer) {
          return;
        }

        const firstFocusable =
          drawer.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );

        firstFocusable?.focus();
      });

      return () => {
        document.removeEventListener("keydown", handleKeyDown);

        document.body.style.overflow = previousOverflow;

        triggerRef.current?.focus();
      };
    }, [open, onOpenChange]);

    if (!open) {
      return null;
    }

    const drawerContent = (
      <div className="fixed inset-0 z-50">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          aria-hidden="true"
          onClick={() => {
            if (closeOnOverlayClick) {
              onOpenChange(false);
            }
          }}
        />

        {/* Drawer */}
        <div
          ref={setDrawerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          aria-describedby={
            description ? "drawer-description" : undefined
          }
          className={cn(
            "absolute flex flex-col bg-surface text-text shadow-2xl",
            sideClasses[side],
            className,
          )}
          onClick={(event) => event.stopPropagation()}
          {...props}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-border px-6 py-4">
            <div>
              <h2
                id="drawer-title"
                className="text-lg font-semibold"
              >
                {title}
              </h2>

              {description && (
                <p
                  id="drawer-description"
                  className="mt-1 text-sm text-text/70"
                >
                  {description}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close Drawer"
              className={cn(
                "ml-4 rounded-md p-2",
                "text-text/70",
                "hover:bg-black/5 hover:text-text",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-primary",
              )}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="border-t border-border px-6 py-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    );

    return createPortal(drawerContent, document.body);
  },
);

Drawer.displayName = "Drawer";












