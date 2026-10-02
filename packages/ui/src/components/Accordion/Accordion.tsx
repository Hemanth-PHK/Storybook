import { forwardRef, useId, useRef, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface AccordionItem { value: string; heading: ReactNode; content: ReactNode; disabled?: boolean }
export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: AccordionItem[];
  multiple?: boolean;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}
/** Values must be unique. Single mode uses at most the first supplied value. */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { items, multiple = false, value, defaultValue = [], onValueChange, headingLevel = 3, className, ...props }, ref,
) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = value ?? internal;
  const open = multiple ? selected : selected.slice(0, 1);
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6";
  return <div {...props} ref={ref} className={cn("min-w-0 max-w-full rounded-lg border border-border bg-surface text-text", className)}>
    {items.map((item, index) => {
      const expanded = open.includes(item.value);
      return <div key={item.value} className={cn(index > 0 && "border-t border-border")}>
        <Heading><button type="button" ref={node => { buttons.current[index] = node; }} id={`${id}-trigger-${index}`}
          aria-expanded={expanded} aria-controls={`${id}-content-${index}`} disabled={item.disabled}
          className="flex w-full items-center justify-between gap-3 rounded-md px-4 py-3 text-left font-medium hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            const next = expanded ? open.filter(entry => entry !== item.value) : multiple ? [...open, item.value] : [item.value];
            if (value === undefined) setInternal(next);
            onValueChange?.(next);
          }} onKeyDown={event => {
            const enabled = items.map((entry, i) => entry.disabled ? -1 : i).filter(i => i >= 0);
            const position = enabled.indexOf(index);
            let next: number | undefined;
            if (event.key === "ArrowDown") next = enabled[(position + 1) % enabled.length];
            if (event.key === "ArrowUp") next = enabled[(position - 1 + enabled.length) % enabled.length];
            if (event.key === "Home") next = enabled[0];
            if (event.key === "End") next = enabled[enabled.length - 1];
            if (next !== undefined) { event.preventDefault(); buttons.current[next]?.focus(); }
          }}><span className="min-w-0 break-words">{item.heading}</span><span aria-hidden="true" className="shrink-0">{expanded ? "−" : "+"}</span></button></Heading>
        <div id={`${id}-content-${index}`} aria-labelledby={`${id}-trigger-${index}`} hidden={!expanded}
          className="min-w-0 break-words px-4 pb-4">{item.content}</div>
      </div>;
    })}
  </div>;
});
