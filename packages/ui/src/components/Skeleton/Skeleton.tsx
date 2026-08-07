import { type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";



type Variant = "text" | "avatar" | "rect";

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  width?: string | number;
  height?: string | number;
  animated?: boolean;
}

const variantClasses: Record<Variant, string> = {
  text: "h-4 w-full rounded",
  avatar: "h-12 w-12 rounded-full",
  rect: "rounded-lg",
};

export function Skeleton({
  variant = "text",
  width,
  height,
  animated = true,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-surface-hover",
        animated && "animate-pulse",
        variantClasses[variant],
        className,
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  );
}