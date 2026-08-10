import type { Config } from "tailwindcss";

/* ============================================================================
   TAILWIND CONFIG — THE BRIDGE
   ----------------------------------------------------------------------------
   This is what makes `className="bg-primary"` compile to
   `background-color: var(--color-primary)`.

   Because the value is a CSS variable (not a fixed color), the SAME class
   produces DIFFERENT colors depending on the active [data-theme]. That's the
   entire mechanism behind dynamic theme switching.

   Interns: you use these names (primary, surface, text, border...) as Tailwind
   classes: bg-primary, text-text, border-border, bg-surface, etc.
   You never write bg-indigo-600 or bg-[#4f46e5].
   ========================================================================= */

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
        },
        "on-primary": "var(--color-on-primary)",

        bg: "var(--color-bg)",
        surface: {
          DEFAULT: "var(--color-surface)",
          hover: "var(--color-surface-hover)",
        },

        text: "var(--color-text)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",

        success: "var(--color-success)",
        danger: "var(--color-danger)",
        warning: "var(--color-warning)",

        "skeleton-base": "var(--color-skeleton-base)",
        "skeleton-shine": "var(--color-skeleton-shine)",
      },
      keyframes: {
        "loading-bar": {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(10%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "loading-bar": "loading-bar 1.1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
