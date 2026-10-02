import { forwardRef, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface BreadcrumbItem {
  id: string;
  label: ReactNode;
  href?: string;
  current?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
}
/** The final item is current by default; an explicit current item overrides it. */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { items, separator = "/", maxItems, className, "aria-label": label = "Breadcrumb", ...props }, ref,
) {
  const [expanded, setExpanded] = useState(false);
  const limit = maxItems === undefined || !Number.isFinite(maxItems) ? items.length : Math.max(3, Math.floor(maxItems));
  const collapse = !expanded && items.length > limit;
  const current = items.findIndex(item => item.current);
  const currentIndex = current >= 0 ? current : items.length - 1;
  const visible = items.map((item, index) => ({ item, index })).filter(({ index }) => !collapse || index === 0 || index >= items.length - limit + 1 || index === currentIndex);
  const controlClass = "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:underline";
  return <nav {...props} ref={ref} aria-label={label} className={cn("min-w-0 max-w-full text-sm text-text", className)}>
    <ol className="flex flex-wrap items-center gap-2">
      {visible.map(({ item, index }, position) => <li key={item.id} className="flex min-w-0 max-w-full items-center gap-2">
        {position > 0 && <span aria-hidden="true" className="shrink-0 text-muted">{separator}</span>}
        {collapse && position > 0 && index - visible[position - 1].index > 1 && <><button type="button" aria-label="Show hidden breadcrumbs" onClick={() => setExpanded(true)} className={cn(controlClass, "px-2 py-1")}>…</button><span aria-hidden="true" className="text-muted">{separator}</span></>}
        {item.href ? <a href={item.href} onClick={item.onClick} aria-current={index === currentIndex ? "page" : undefined} className={cn(controlClass, "min-w-0 break-words")}>{item.label}</a>
          : item.onClick && index !== currentIndex ? <button type="button" onClick={item.onClick} className={cn(controlClass, "min-w-0 break-words text-left")}>{item.label}</button>
            : <span aria-current={index === currentIndex ? "page" : undefined} className="min-w-0 break-words">{item.label}</span>}
      </li>)}
    </ol>
  </nav>;
});
