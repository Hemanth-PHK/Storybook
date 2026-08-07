import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { THEMES } from "../tokens/tokens";


export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return { ...ctx, themes: THEMES };
}
