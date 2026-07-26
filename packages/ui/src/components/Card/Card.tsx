import {
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "../../utils/cn";

/* ============================================================================
   Card — THE REFERENCE COMPONENT
   ----------------------------------------------------------------------------
   A Card is a flexible container used to group related content together.

   This component follows the same architecture as Modal.

   1. TYPED PROPS
      - Extends native HTML <div> attributes.
      - Supports className, id, style, aria-*, data-* and more.

   2. DESIGN TOKENS
      - Uses design token classes only.
      - No raw colors are used.

   3. REUSABILITY
      - Supports optional header, footer and custom content.
      - Can be used for dashboards, forms, statistics,
        product cards and more.

   4. ACCESSIBILITY
      - Semantic HTML.
      - Fully keyboard accessible.

   5. CUSTOMIZATION
      - Supports optional padding.
      - Supports optional shadow.
============================================================================ */

export interface CardProps
  extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
  padded?: boolean;
  shadow?: boolean;
}

export function Card({
  title,
  footer,
  children,
  padded = true,
  shadow = true,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border",
        "bg-surface text-text",
        shadow && "shadow-md",
        className,
      )}
      {...props}
    >
      {title && (
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold">
            {title}
          </h3>
        </div>
      )}

      <div className={cn(padded && "p-6")}>
        {children}
      </div>

      {footer && (
        <div className="border-t border-border px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
}