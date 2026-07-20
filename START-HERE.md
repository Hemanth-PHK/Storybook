# 👋 Start here

Welcome to the **US-5 Design System** repo — the component library every screen
of our e-learning platform will be built from.

## Run it in 3 commands

```bash
npm install          # installs everything, including Storybook
npm run storybook    # opens the component workshop at localhost:6006
```

Storybook opens in your browser. You'll see **Button** and **ThemeSwitcher**
already built — these are your references. Use the **🎨 Theme** dropdown to switch
themes and watch them recolor.

## Your job: build the components

The **Button is already built as your reference.** Your task is to build your
assigned components by copying the Button pattern. They don't exist yet — you
create them.

| You | Build (in order) |
|---|---|
| Mahesh | Modal → Toast |
| Aarnesh | Input → Form fields |
| Bhuvana | Card → Skeleton |
| Together | Nav |

## How to build each component

1. **Read `ONBOARDING.html`** (open in browser) and `packages/ui/CONTRIBUTING.md` first.
2. **Copy `packages/ui/src/components/Button/`** — paste it, rename to your component.
3. Rename the 3 files inside and replace `Button` with your component name.
4. Build it using **tokens only** (never raw colors), add a story per state.
5. **Uncomment your component's export** in `packages/ui/src/index.ts`.
6. Check it in Storybook — flip through all themes; everything should recolor.

Start with your **first** component. When it's reviewed and merged, take the second.

## The one rule that matters most

**Never write a real color. Always use a token** like `bg-primary`, `bg-surface`,
`text-text`. This is what makes our dynamic theme switching work.

## Stuck?

Stuck for more than 20 minutes? **Message me.** That's expected and normal.
