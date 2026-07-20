import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { THEMES } from "../tokens/tokens";

/* ============================================================================
   useTheme()
   ----------------------------------------------------------------------------
   Any component can read the current theme, change it, or list all themes:

     const { theme, setTheme, themes } = useTheme();

   Used by the ThemeSwitcher, but available anywhere inside <ThemeProvider>.
   ========================================================================= */

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return { ...ctx, themes: THEMES };
}
