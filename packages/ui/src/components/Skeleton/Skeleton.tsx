import { type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

/* ============================================================================
   Skeleton — THE REFERENCE COMPONENT
   ----------------------------------------------------------------------------
   A Skeleton provides a visual placeholder while content is loading.

   This component follows the same architecture as Modal.

   1. TYPED PROPS
      - Extends native HTML <div> attributes.
      - Supports className, id, style, aria-*, data-* and more.

   2. DESIGN TOKENS
      - Uses design token classes only.
      - No raw colors are used.

   3. REUSABILITY
      - Supports multiple variants.
      - Custom width and height.
      - Optional loading animation.

   4. ACCESSIBILITY
      - Hidden from screen readers.
      - Used only as a visual loading indicator.

   5. CUSTOMIZATION
      - Supports text, avatar and rectangular placeholders.
============================================================================ */

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