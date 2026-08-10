import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

// The 3 parts become the props.
export interface NavProps {
  brand: ReactNode;                        // left: logo / name
  links?: NavLink[];                       // middle
  actions?: ReactNode;                      // right: ThemeSwitcher
  
  currentPath?: string;
 
  onNavigate?: (link: NavLink, event: MouseEvent<HTMLAnchorElement>) => void;
}

export function Nav({ brand, links = [], actions, currentPath, onNavigate }: NavProps) {
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setPendingHref(null);
  }, [currentPath]);

  const handleClick = (link: NavLink, event: MouseEvent<HTMLAnchorElement>) => {
    setPendingHref(link.href);
    onNavigate?.(link, event);
  };

  return (
    <header className="w-full border-b border-border bg-surface">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        {/* LEFT — brand */}
        <div className="font-semibold text-text">{brand}</div>

        {/* MIDDLE — links */}
        <ul className="hidden flex-1 items-center gap-1 sm:flex">
          {links.map((l) => {
            const isActive = l.active ?? currentPath === l.href;
            const isPending = !isActive && pendingHref === l.href;

            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => handleClick(l, e)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-sm transition-all duration-200 ease-in-out active:scale-95",
                    isActive
                      ? "bg-primary text-on-primary font-semibold shadow-sm"
                      : isPending
                        ? "bg-surface-hover text-text"
                        : "text-muted hover:bg-surface-hover hover:text-text",
                  )}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* RIGHT — actions slot (ThemeSwitcher) */}
        <div className="ml-auto flex items-center gap-2">{actions}</div>
      </nav>
    </header>
  );
}