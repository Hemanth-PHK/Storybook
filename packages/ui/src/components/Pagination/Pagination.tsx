import { forwardRef, useId, type HTMLAttributes } from "react";
import { Button } from "../Button";
import { Select } from "../Select";
import { cn } from "../../utils/cn";

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
}
const positiveInteger = (value: number, fallback: number) => Number.isFinite(value) && value > 0 ? Math.max(1, Math.floor(value)) : fallback;
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { page, pageSize, totalItems, onPageChange, pageSizeOptions, onPageSizeChange, className, "aria-label": label = "Pagination", ...props }, ref,
) {
  const id = useId();
  const size = positiveInteger(pageSize, 1);
  const total = Number.isFinite(totalItems) ? Math.max(0, Math.floor(totalItems)) : 0;
  const count = Math.max(1, Math.ceil(total / size));
  const current = Math.min(count, positiveInteger(page, 1));
  const pages = Array.from(new Set([1, current - 1, current, current + 1, count].filter(value => value >= 1 && value <= count))).sort((a, b) => a - b);
  const options = Array.from(new Set([size, ...(pageSizeOptions ?? []).filter(value => Number.isInteger(value) && value > 0)])).sort((a, b) => a - b);
  return <nav {...props} ref={ref} aria-label={label} className={cn("flex min-w-0 max-w-full flex-wrap items-center gap-3 text-sm text-text", className)}>
    <p className="w-full sm:w-auto">{total === 0 ? "0 items" : `${(current - 1) * size + 1}–${Math.min(current * size, total)} of ${total} items`}</p>
    <div className="flex max-w-full flex-wrap items-center gap-1">
      <Button type="button" size="sm" variant="outline" aria-label="Previous page" disabled={current === 1 || total === 0} onClick={() => onPageChange(current - 1)}>‹</Button>
      {pages.map((number, index) => <span key={number} className="inline-flex items-center gap-1">
        {index > 0 && number - pages[index - 1] > 1 && <span aria-hidden="true">…</span>}
        <Button type="button" size="sm" variant={number === current ? "primary" : "ghost"} className={number === current ? "text-on-primary" : undefined} aria-label={`Page ${number}`} aria-current={number === current ? "page" : undefined} disabled={total === 0} onClick={() => { if (number !== current) onPageChange(number); }}>{number}</Button>
      </span>)}
      <Button type="button" size="sm" variant="outline" aria-label="Next page" disabled={current === count || total === 0} onClick={() => onPageChange(current + 1)}>›</Button>
    </div>
    {pageSizeOptions && onPageSizeChange && <div className="flex max-w-full items-center gap-2"><label htmlFor={id}>Items per page</label><Select id={id} className="w-auto" value={size} onChange={event => onPageSizeChange(Number(event.target.value))}>{options.map(option => <option key={option} value={option}>{option}</option>)}</Select></div>}
  </nav>;
});
