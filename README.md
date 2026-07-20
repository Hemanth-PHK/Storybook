# EdTech Design System (`@edtech/ui`)

A coded component library with **dynamic theme switching**. Every screen is
assembled from these components, and every color follows the active theme.

## How theme switching works (the whole idea in 4 lines)

1. Components use token classes (`bg-primary`), never raw colors.
2. Tailwind maps `bg-primary` → `var(--color-primary)`.
3. Each theme in `themes.css` gives those variables different values.
4. `ThemeProvider` sets `<html data-theme="ocean">`; the cascade recolors
   everything instantly.

```
Component (bg-primary)
   → Tailwind (var(--color-primary))
      → themes.css ([data-theme] sets the value)
         → ThemeProvider (switches data-theme)
```

## Getting started

```bash
npm install
npm run storybook      # opens the component workshop at localhost:6006
```

In Storybook, use the **Theme** dropdown in the toolbar to switch themes and
watch every component recolor.

## Using it in the app

```tsx
import { ThemeProvider, ToastProvider, Nav, ThemeSwitcher, Button } from "@edtech/ui";
import "@edtech/ui/src/tokens/index.css";

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Nav brand="LearnHub" actions={<ThemeSwitcher />} />
        {/* rest of the app */}
      </ToastProvider>
    </ThemeProvider>
  );
}
```

## Structure

```
packages/ui/
├── .storybook/          Storybook config + the theme toolbar
├── src/
│   ├── tokens/          themes.css (colors), tokens.ts (theme list), index.css
│   ├── theme/           ThemeProvider + useTheme
│   ├── components/      one folder per component
│   ├── utils/           cn() helper
│   └── index.ts         public exports
├── tailwind.config.ts   maps token names → CSS variables (the bridge)
└── CONTRIBUTING.md      ← interns read this before building
```

## Adding a theme

1. Add a `[data-theme="new"] { ... }` block in `src/tokens/themes.css` (define
   **every** token).
2. Add an entry (id, label, preview swatches) to `THEMES` in `src/tokens/tokens.ts`.

That's it — it shows up in the switcher and the Storybook toolbar automatically.

## Note on React Native

This library is **web-only** (React + Tailwind + DOM). React Native cannot use
these components directly. If mobile is in scope, only the **tokens** are
shareable; components need a separate RN implementation. Confirm scope before
assuming this ticket covers mobile.
