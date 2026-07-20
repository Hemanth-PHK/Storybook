import type { Preview } from "@storybook/react";
import { THEMES, type ThemeId } from "../src/tokens/tokens";
import { ThemeProvider } from "../src/theme/ThemeProvider";

// Pull in the token variables + Tailwind so classes like bg-primary work.
import "../src/tokens/index.css";

/* ============================================================================
   Storybook preview config
   ----------------------------------------------------------------------------
   Adds a "Theme" dropdown to the Storybook toolbar. Selecting a theme sets
   data-theme on the preview <html>, so EVERY story recolors live.

   This is the intern's self-check tool: build a component, flip themes here,
   and if anything DOESN'T recolor, you hardcoded a color — go fix it.
   ========================================================================= */

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // Storybook's own canvas background follows our token too.
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      description: "Global color theme",
      defaultValue: "default",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: THEMES.map((t) => ({ value: t.id, title: t.label })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const selected = context.globals.theme as ThemeId;

      // Set data-theme directly on the <html> element. This is the most
      // reliable way to make EVERY story recolor from the toolbar, independent
      // of provider state or localStorage.
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", selected);
      }

      return (
        // Provider is still mounted so components using useTheme()/useToast()
        // (ThemeSwitcher, Toast) have their context.
        <ThemeProvider>
          <div className="min-h-[120px] bg-bg p-6 text-text">
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
