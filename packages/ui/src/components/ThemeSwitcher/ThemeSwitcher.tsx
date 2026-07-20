import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../theme/useTheme";
import { cn } from "../../utils/cn";

/* ============================================================================
   ThemeSwitcher — the feature from the ticket
   ----------------------------------------------------------------------------
   The palette icon that lives in the top-right corner. Click it → a dropdown
   of themes appears → pick one → the WHOLE site recolors.

   It doesn't contain any color logic itself. It just calls setTheme(id) from
   useTheme(), which flips <html data-theme>. Everything else is CSS cascade.

   Behaviors handled: open/close, click-outside-to-close, Escape-to-close,
   active-theme checkmark, keyboard focusable options.
   ========================================================================= */

function PaletteIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on click outside or Escape.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block">
      {/* Trigger icon button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-lg",
          "text-text hover:bg-surface-hover transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Change color theme"
      >
        <PaletteIcon />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl",
            "border border-border bg-surface shadow-lg",
          )}
        >
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted">
            Theme
          </div>
          {themes.map((t) => {
            const isActive = t.id === theme;
            return (
              <button
                key={t.id}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm",
                  "text-text hover:bg-surface-hover transition-colors",
                  "focus-visible:outline-none focus-visible:bg-surface-hover",
                )}
              >
                {/* Preview swatches for this theme */}
                <span className="flex shrink-0 -space-x-1">
                  {t.swatches.map((c, i) => (
                    <span
                      key={i}
                      className="h-4 w-4 rounded-full border border-border"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </span>
                <span className="flex-1">{t.label}</span>
                {isActive && (
                  <span className="text-primary">
                    <CheckIcon />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
