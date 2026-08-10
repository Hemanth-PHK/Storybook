/* Public API of @edtech/ui. Consuming apps import from here:
     import { Button, ThemeProvider, ThemeSwitcher } from "@edtech/ui";
*/

// Theme engine
export { ThemeProvider } from "./theme/ThemeProvider";
export { useTheme } from "./theme/useTheme";
export { THEMES, DEFAULT_THEME } from "./tokens/tokens";
export type { ThemeId } from "./tokens/tokens";
export * from "./components/Card";
export * from "./components/Skeleton";

// Components — Button is your reference (already built). ThemeSwitcher is foundation.
export * from "./components/Button";
export * from "./components/ThemeSwitcher";
 export * from "./components/Nav";
export * from "./components/PageTransition";
export * from "./components/RouteLoadingIndicator";

/* ============================================================================
   YOUR COMPONENTS TO BUILD
   When you finish a component, uncomment its line below so the app can import
   it. (Keep it commented until the component's folder exists, or the build
   will error.)
   ----------------------------------------------------------------------------
   Aarnesh:
   // export * from "./components/Input";
   // export * from "./components/FormFields";

   Bhuvana:
   // export * from "./components/Card";
   // export * from "./components/Skeleton";

   Mahesh:
   // export * from "./components/Modal";
   // export * from "./components/Toast";

   Together:
  
   ========================================================================= */
