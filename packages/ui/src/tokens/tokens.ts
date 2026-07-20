/* ============================================================================
   THEME METADATA (TypeScript)
   ----------------------------------------------------------------------------
   themes.css holds the actual colors. This file holds the LIST of available
   themes plus a preview swatch trio for each, so the ThemeSwitcher UI can
   render options without duplicating color logic.

   ⚠️ TEMPORARY: these six themes are provisional until Figma tokens arrive.
   When a theme is added/removed in themes.css, update this list to match.
   ========================================================================= */

export const THEMES = [
  { id: "scholar-indigo", label: "Scholar Indigo", swatches: ["#ffffff", "#f8fafc", "#4f46e5"] },
  { id: "teal-focus",     label: "Teal Focus",     swatches: ["#f6fafb", "#e0f2f1", "#0d9488"] },
  { id: "warm-academy",   label: "Warm Academy",   swatches: ["#fbf9f6", "#fef3e2", "#2563eb"] },
  { id: "violet-scholar", label: "Violet Scholar", swatches: ["#faf8fc", "#f3e8ff", "#7c3aed"] },
  { id: "forest-growth",  label: "Forest Growth",  swatches: ["#f7faf8", "#dcfce7", "#059669"] },
  { id: "midnight-study", label: "Midnight Study", swatches: ["#1e293b", "#334155", "#818cf8"] },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "scholar-indigo";
