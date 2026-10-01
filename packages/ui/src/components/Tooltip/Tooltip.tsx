import {cloneElement,useEffect,useId,useState,useRef,
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
  delayMs?: number;
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
  delayMs = 300,
  children,
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [resolvedSide, setResolvedSide] = useState<TooltipSide>(side);

  const tooltipId = useId();

  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);


  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
  null,
  );

  const clearOpenTimer = () => {
  if (openTimerRef.current) {
    clearTimeout(openTimerRef.current);
    openTimerRef.current = null;
  }
  };

  const openWithDelay = () => {
    clearOpenTimer();

    if (delayMs <= 0) {
      setOpen(true);
      return;
    }

    openTimerRef.current = setTimeout(() => {
      setOpen(true);
      openTimerRef.current = null;
    }, delayMs);
  };

  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
  if (!open) {
    return;
  }

  const updatePosition = () => {
    const triggerElement = triggerRef.current;
    const tooltipElement = tooltipRef.current;

    if (!triggerElement || !tooltipElement) {
      return;
    }

    const triggerRect = triggerElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();

    const gap = 8;

    const availableSpace = {
      top: triggerRect.top,
      right: window.innerWidth - triggerRect.right,
      bottom: window.innerHeight - triggerRect.bottom,
      left: triggerRect.left,
    };

    const requiredSpace = {
      top: tooltipRect.height + gap,
      right: tooltipRect.width + gap,
      bottom: tooltipRect.height + gap,
      left: tooltipRect.width + gap,
    };

    const oppositeSide: Record<TooltipSide, TooltipSide> = {
      top: "bottom",
      right: "left",
      bottom: "top",
      left: "right",
    };

    if (availableSpace[side] >= requiredSpace[side]) {
      setResolvedSide(side);
      return;
    }

    const opposite = oppositeSide[side];

    if (availableSpace[opposite] >= requiredSpace[opposite]) {
      setResolvedSide(opposite);
      return;
    }

    setResolvedSide(side);
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, side]);

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
    openWithDelay();

    children.props.onMouseEnter?.(event);
  };

  const handleMouseLeave = (
    event: MouseEvent<HTMLElement>,
  ) => {
    clearOpenTimer();
    setOpen(false);

    children.props.onMouseLeave?.(event);
  };

  const handleFocus = (
    event: FocusEvent<HTMLElement>,
  ) => {
    clearOpenTimer();
    setOpen(true);

    children.props.onFocus?.(event);
  };

  const handleBlur = (
    event: FocusEvent<HTMLElement>,
  ) => {
    clearOpenTimer();
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
    <span
      ref={triggerRef}
      className="relative inline-flex"
    >
      {trigger}

      {open && (
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50",
            "w-max max-w-xs whitespace-normal break-words rounded-md",
            "bg-text px-3 py-2",
            "text-xs font-medium text-surface",
            "shadow-md",
            sideClasses[resolvedSide],
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