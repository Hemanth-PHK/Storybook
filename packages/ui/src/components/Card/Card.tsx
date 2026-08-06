import {
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "../../utils/cn";

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