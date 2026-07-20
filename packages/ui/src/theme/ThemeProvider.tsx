import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_THEME, type ThemeId } from "../tokens/tokens";

/* ============================================================================
   ThemeProvider
   ----------------------------------------------------------------------------
   The single owner of "which theme is active". It does three jobs:
     1. Holds the current theme in React state.
     2. Writes it to <html data-theme="..."> so CSS variables switch.
     3. Persists the choice to localStorage so it survives a refresh.

   Wrap your whole app in this once. Components below can then read/change the
   theme via the useTheme() hook.
   ========================================================================= */

const STORAGE_KEY = "edtech-theme";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
  return stored ?? DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(readInitialTheme);

  // Apply the theme to the document root whenever it changes.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
    // NOTE (EdTech): for logged-in users you can also POST this to the user
    // profile here so the theme follows them across devices.
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
