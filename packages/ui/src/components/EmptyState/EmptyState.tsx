import { forwardRef, useId, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { title, description, icon, action, className },
  ref,
) {
  const titleId = useId();
  const descriptionId = `${titleId}-description`;

  return (
    <div
      ref={ref}
      role="group"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      className={cn(
        "flex flex-col items-center rounded-lg border border-border bg-surface p-6 text-center text-text",
        className,
      )}
    >
      {icon != null && <div className="mb-4 text-muted">{icon}</div>}
      <h2 id={titleId} className="text-lg font-semibold">{title}</h2>
      {description && <p id={descriptionId} className="mt-2 max-w-md text-sm text-muted">{description}</p>}
      {action != null && <div className="mt-5">{action}</div>}
    </div>
  );
});
