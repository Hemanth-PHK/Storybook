import { type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps
  extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  label?: string;
  decorative?: boolean;
  className?: string;
}

export function Divider({
  orientation = "horizontal",
  label,
  decorative = false,
  className,
  ...props
}: DividerProps) {
  const isVertical = orientation === "vertical";


  if (decorative) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "shrink-0 bg-border",
          isVertical ? "h-full w-px" : "h-px w-full",
          className,
        )}
        {...props}
      />
    );
  }

  /*
   horizontal divider
   */
  if (label && !isVertical) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          "flex w-full items-center gap-3",
          className,
        )}
        {...props}
      >
        <div className="h-px flex-1 bg-border" />

        <span className="shrink-0 text-sm text-text/70">
          {label}
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>
    );
  }

  /*Vertical divider*/
  if (isVertical) {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "h-full w-px shrink-0 bg-border",
          className,
        )}
        {...props}
      />
    );
  }

  /*
   Normal horizontal divider
   */
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        "h-px w-full shrink-0 bg-border",
        className,
      )}
      {...props}
    />
  );
}

Divider.displayName = "Divider";