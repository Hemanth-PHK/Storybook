import type { ReactNode } from "react";

import { cn } from "../../utils/cn";

export interface ErrorStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function ErrorState({
  title,
  description,
  icon,
  action,
  className,
}: ErrorStateProps) {
  return (
    <section
      role="alert"
      className={cn(
        "rounded-lg border border-border bg-surface min-w-0 [overflow-wrap:anywhere] p-4 sm:p-6 text-text",
        className,
      )}
    >
      {icon != null && (
        <div className="mb-4 text-danger">
          {icon}
        </div>
      )}
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
      {action != null && <div className="mt-5">{action}</div>}
    </section>
  );
}
