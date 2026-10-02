import { forwardRef, useId, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  fullWidth?: boolean;
}

/** Values must be unique. Arrow keys automatically select the focused tab. */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { items, value, defaultValue, onValueChange, label = "Content tabs", fullWidth = false, className, ...props }, ref,
) {
  const id = useId();
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const [internal, setInternal] = useState(defaultValue ?? items.find(item => !item.disabled)?.value);
  const requested = value ?? internal;
  const active = items.find(item => item.value === requested && !item.disabled)?.value ?? items.find(item => !item.disabled)?.value;
  const select = (next: string) => {
    if (value === undefined) setInternal(next);
    if (next !== active) onValueChange?.(next);
  };
  return <div {...props} ref={ref} className={cn("min-w-0 max-w-full text-text", className)}>
    <div role="tablist" aria-label={label} aria-orientation="horizontal" className="flex max-w-full overflow-x-auto border-b border-border p-1">
      {items.map((item, index) => <button key={item.value} ref={node => { buttons.current[index] = node; }}
        type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`}
        aria-selected={active === item.value} disabled={item.disabled} tabIndex={active === item.value ? 0 : -1}
        className={cn("shrink-0 rounded-md px-4 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50", fullWidth && "flex-1", active === item.value ? "bg-primary text-on-primary" : "hover:bg-surface-hover")}
        onClick={() => select(item.value)} onKeyDown={event => {
          const enabled = items.map((entry, i) => entry.disabled ? -1 : i).filter(i => i >= 0);
          const position = enabled.indexOf(index);
          let next: number | undefined;
          const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
          if (event.key === "ArrowRight") next = enabled[(position + (rtl ? -1 : 1) + enabled.length) % enabled.length];
          if (event.key === "ArrowLeft") next = enabled[(position + (rtl ? 1 : -1) + enabled.length) % enabled.length];
          if (event.key === "Home") next = enabled[0];
          if (event.key === "End") next = enabled[enabled.length - 1];
          if (next !== undefined) { event.preventDefault(); buttons.current[next]?.focus(); select(items[next].value); }
        }}>{item.label}</button>)}
    </div>
    {items.map((item, index) => <div key={item.value} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`}
      hidden={active !== item.value} tabIndex={0} className="min-w-0 break-words p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{item.content}</div>)}
  </div>;
});
