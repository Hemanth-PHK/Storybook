import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

// The 3 parts become the props.
export interface NavProps {
  brand: ReactNode;                        // left: logo / name
  links?: { label: string; href: string; active?: boolean }[];  // middle
  actions?: ReactNode;                      // right: ThemeSwitcher
}

export function Nav({ brand, links = [], actions }: NavProps) {
  return (
    <header className="w-full border-b border-border bg-surface">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        {/* LEFT — brand */}
        <div className="font-semibold text-text">{brand}</div>

        {/* MIDDLE — links */}
        <ul className="hidden flex-1 items-center gap-1 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={cn(
                  "rounded-lg px-3 py-1.5 text-sm transition-all duration-200 ease-in-out active:scale-95",
                  l.active
                    ? "bg-primary text-on-primary font-semibold shadow-sm"
                    : "text-muted hover:bg-surface-hover hover:text-text",
                )}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* RIGHT — actions slot (ThemeSwitcher) */}
        <div className="ml-auto flex items-center gap-2">{actions}</div>
      </nav>
    </header>
  );
}