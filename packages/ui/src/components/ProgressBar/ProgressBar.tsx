import { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

export interface ProgressBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value, label, showValue = false, className },
  ref,
) {
  const labelId = useId();
  const progress = Number.isNaN(value) ? 0 : Math.min(100, Math.max(0, value));

  return (
    <div ref={ref} className={cn("w-full text-text", className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          {label && <span id={labelId}>{label}</span>}
          {showValue && <span aria-hidden="true" className="ml-auto text-muted">{progress}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : "Progress"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-hover"
      >
        <div
          className={cn("h-full rounded-full", progress === 100 ? "bg-success" : "bg-primary")}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
});
