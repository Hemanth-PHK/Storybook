import {cloneElement,useEffect,useId,useState,
  type FocusEvent,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "../../utils/cn";

export type TooltipSide = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  content: ReactNode;
  side?: TooltipSide;
  children: ReactElement<HTMLAttributes<HTMLElement>>;
  className?: string;
}

const sideClasses: Record<TooltipSide, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
};

export function Tooltip({
  content,
  side = "top",
  children,
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  const tooltipId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleMouseEnter = (
    event: MouseEvent<HTMLElement>,
  ) => {
    setOpen(true);

    children.props.onMouseEnter?.(event);
  };

  const handleMouseLeave = (
    event: MouseEvent<HTMLElement>,
  ) => {
    setOpen(false);

    children.props.onMouseLeave?.(event);
  };

  const handleFocus = (
    event: FocusEvent<HTMLElement>,
  ) => {
    setOpen(true);

    children.props.onFocus?.(event);
  };

  const handleBlur = (
    event: FocusEvent<HTMLElement>,
  ) => {
    setOpen(false);

    children.props.onBlur?.(event);
  };

  const trigger = cloneElement(children, {
    "aria-describedby": open ? tooltipId : undefined,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
  });

  return (
    <span className="relative inline-flex">
      {trigger}

      {open && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50",
            "whitespace-nowrap rounded-md",
            "bg-text px-3 py-2",
            "text-xs font-medium text-surface",
            "shadow-md",
            sideClasses[side],
            className,
          )}
        >
          {content}
        </div>
      )}
    </span>
  );
}

Tooltip.displayName = "Tooltip";