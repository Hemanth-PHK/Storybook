# Building components in `@edtech/ui` — read this first

This is the guide for anyone adding a component. Follow it exactly so the
library stays consistent (the ticket says this is **NOT throwaway**).

## The one rule that matters most

**Never write a raw color. Ever.**

```tsx
// ❌ NO — hardcoded. Breaks theme switching.
<div className="bg-indigo-600 text-white">
<div className="bg-[#4f46e5]">
<div style={{ background: "#4f46e5" }}>

// ✅ YES — semantic token. Recolors with the theme.
<div className="bg-primary text-on-primary">
```

If you need a color, use one of these token classes:

| Purpose            | Class                    |
| ------------------ | ------------------------ |
| Brand / main action| `bg-primary` / `text-primary` |
| Text on primary    | `text-on-primary`        |
| Page background    | `bg-bg`                  |
| Card / raised bg   | `bg-surface`             |
| Hover surface      | `bg-surface-hover`       |
| Body text          | `text-text`              |
| Secondary text     | `text-muted`             |
| Borders / dividers | `border-border`          |
| Success / error / warn | `success` / `danger` / `warning` |

**Need a color that isn't in the table?** Don't invent a hex. Ask the lead to
add a token to `src/tokens/themes.css` (in ALL themes) first.

> The ONLY allowed exception: the little preview swatches in `ThemeSwitcher`
> use real hex values on purpose, because they must show each theme's actual
> colors. Don't copy that pattern into normal components.

## Every component folder looks the same

```
ComponentName/
├── ComponentName.tsx          # the component
├── ComponentName.stories.tsx  # its Storybook page
└── index.ts                   # export
```

Copy `components/Button/` as your template. It's the reference for everything:
typed props, variant lookup objects, states, tokens, and its story.

## Definition of done — a component isn't finished until:

1. It uses **only token classes** for color.
2. It has a `.stories.tsx` with a story for **every state** (default, hover,
   disabled, loading, error — whatever applies).
3. It handles **accessibility**: keyboard focus (`focus-visible:ring-primary`),
   correct `aria-*`, and semantic HTML.
4. Props are **typed** (extend the underlying HTML element where possible).
5. It's exported from the folder `index.ts` and from `src/index.ts`.
6. **You switched themes in Storybook and confirmed it recolors.** If any part
   stays the same color across themes, you hardcoded something — fix it.

## Your self-check tool

Run Storybook (`npm run storybook`), open your component, and use the **Theme**
dropdown in the top toolbar. Flip through Indigo / Ocean / Forest / Dark. Watch
your component. Everything colored should change. That's the whole test.
