import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface NavLink {
  label: string;
  href: string;
  /** Manual override. Leave unset to let `currentPath` decide instead. */
  active?: boolean;
}

// The 3 parts become the props.
export interface NavProps {
  brand: ReactNode;                        // left: logo / name
  links?: NavLink[];                       // middle
  actions?: ReactNode;                      // right: ThemeSwitcher
  /**
   * The app's current route (e.g. React Router's `useLocation().pathname`
   * or Next.js `usePathname()`). When passed, active state is derived from
   * it automatically instead of relying on a hand-set `active` flag —
   * pass this instead of maintaining your own "which link is active" state.
   */
  currentPath?: string;
  /**
   * Called when a link is clicked, before the browser navigates. Use this to
   * hand off to a router (`navigate(link.href)`, `router.push(link.href)`)
   * — call `event.preventDefault()` inside if you don't want the plain
   * anchor navigation to also fire.
   */
  onNavigate?: (link: NavLink, event: MouseEvent<HTMLAnchorElement>) => void;
}

export function Nav({ brand, links = [], actions, currentPath, onNavigate }: NavProps) {
  // The link that was just clicked, so it can show feedback immediately —
  // before routing/data-loading finishes and `currentPath` actually catches
  // up. Purely transient UI feedback, not a duplicate of route state.
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