# Shared component QA handoff

The public API exports Tabs, Accordion, Breadcrumb, Table, Pagination and their
props/item/column/sort types from `@edtech/ui`. Each component has its implementation,
Storybook stories and barrel in `packages/ui/src/components/<Name>/`.

## Usage contracts

- Tabs: unique `items[].value`; `value`/`onValueChange` for controlled selection,
  `defaultValue` for uncontrolled selection. Disabled or missing selections fall
  back to the first enabled tab. Arrow keys select and focus enabled tabs, wrap,
  and respect RTL. Home/End select the first/last enabled tab. Panels remain
  mounted while hidden to preserve child state. Use `label` to name the tablist.
- Accordion: unique item values; `multiple` allows several expanded items.
  Controlled `value` and uncontrolled `defaultValue` are string arrays. Single
  mode uses the first entry. Enter/Space toggle native buttons; arrows and
  Home/End move focus without expanding. Set `headingLevel` for the surrounding
  document hierarchy. Disabled triggers cannot change expansion.
- Breadcrumb: unique item IDs; links use supplied `href`/`onClick`, callback-only
  ancestors use buttons. The final item is current unless one explicitly sets
  `current`. Supply at most one explicit current item. `maxItems` retains the
  first item and the final `maxItems - 1` items (minimum three); an explicit
  current item is also retained. The ellipsis is an accessible expansion button.
  It exposes every hidden link in the original ordered list. `separator` is
  decorative and hidden from assistive technology.
- Table: unique column IDs; `cell(row)` renders generic typed data. `getRowId`
  must return a stable unique key. Sorting is controlled: `onSortChange` emits
  ascending/descending state; consumers supply sorted `data`. No internal data
  sorting or fetching occurs. Supply `caption` to name the table/scroll region.
  `column.className` applies to its header and cells, including minimum widths.
  The scroll region is keyboard focusable; `toolbar` composes consumer controls.
- Pagination: one-based controlled `page`; callbacks request changes. Invalid
  sizes/pages normalize to positive integers and pages clamp to available bounds.
  Zero items disables all page controls. Visible buttons include first/last and
  active-neighbor pages, with decorative gaps. Supply both `pageSizeOptions` and
  `onPageSizeChange` to enable the selector. Consumers choose when to reset the
  page after size changes; the story demonstrates resetting to page one.

No dependencies, lockfiles, existing component implementations or deployment
configuration were changed. The public index also fixes pre-existing unresolved
video type exports by aliasing the existing CaptionOption and MediaOption types
to the previously declared VideoCaption/VideoQuality/VideoLanguage names.

## Storybook scenarios

| Component | Stories |
| --- | --- |
| Tabs | Default, Full Width (controlled), Scrollable Mobile, Disabled Tab |
| Accordion | Single Open, Multiple Open (controlled), Disabled Item |
| Breadcrumb | Basic, Collapsed Long Path, Current Page |
| Table | Default, Sortable, With Toolbar Or Filters, Empty, Loading, Responsive Overflow |
| Pagination | First Page, Middle Page, Last Page, With Page Size, Compact Mobile, Zero Items, One Page |

The toolbar story demonstrates consumer-owned filtering together with Pagination.
The extra zero-item and one-page stories cover required boundary conditions.

## Reproduce validation

From the repository root:

```sh
npx tsc --noEmit -p packages/ui/tsconfig.json
npm run build-storybook --workspace=@edtech/ui
node scripts/qa-manoj-components.cjs
```

The browser runner requires Node 22+ and installed Chrome. On other systems set
`CHROME_PATH` to its executable. It serves the built Storybook on an ephemeral
loopback port, launches headless Chrome with a unique temporary profile and uses
the Chrome DevTools protocol. It does not install packages. It checks every new
story at 320, 375, 768, 1024 and 1440 pixels, functional interactions, ARIA state
and relationships, keyboard events, table overflow and all existing story renders.
The server and browser close on success or failure.

## Validation and remaining scope

TypeScript and the production Storybook build pass. The build emits upstream
Storybook eval warnings and a large documentation chunk warning; these are not
build failures.

Headless Chrome passed 23 new stories at all five widths (115 responsive render
checks), component interaction/keyboard/ARIA checks, and all 100 existing story
renders without uncaught runtime exceptions. Browser result counts are also
recorded in the PR and final delivery. The automated
checks validate responsive geometry and DOM semantics; they do not replace visual
design review, manual screen-reader testing or a cross-browser compatibility pass.
Existing stories receive render/runtime regression checks, not exhaustive
interaction retesting of every existing component.

Production Vercel verification is pending review and merge into `main`. Preserve
the existing `skillforge-storybook-qa` project and Rollup optional-dependency fix.
