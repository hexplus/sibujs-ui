# sibujs-ui

A complete UI component library for [SibuJS](https://github.com/hexplus/sibujs). 56 Tailwind-styled, signal-driven components with zero Virtual DOM dependencies.

## Features

- **56 components** — from buttons and inputs to dialogs, sidebars, and data tables
- **Tailwind CSS v4** — fully styled with utility classes, dark mode, and oklch color system
- **Signal-driven** — reactive state powered by SibuJS signals and effects
- **Zero VDOM** — direct DOM manipulation with fine-grained reactivity
- **TypeScript** — full type definitions for all components and props
- **Themeable** — 12 built-in color themes with CSS custom properties
- **Bundler-friendly** — ships ESM and CJS builds and declares `"sideEffects": false`, so bundlers can drop the components you never import

## Installation

```bash
npm install sibujs-ui sibujs
```

`sibujs-ui` declares **`sibujs >=3.2.0 <5.0.0`** as a peer dependency — earlier versions lack the `registerDisposer`, `createId`, `onMount`, and `tag(props, children)` APIs that the components rely on.

CI runs the full test suite, type-check and build against sibujs `3.2.0`, `3.4.1` and `4.0.1` — the floor, middle and current top of that range — in a dedicated compatibility matrix that installs each version and fails if the requested version is not the one actually resolved. That matrix is the only thing this claim rests on; if a version is not listed there, it is not tested.

**Node:** `>=22.3.0` to *use* the package, matching SibuJS 4's own floor.

Building and testing the repository needs `>=22.12.0`, because the dev toolchain (Vite 7 / rolldown) ships a native binding that declares `^20.19.0 || >=22.12.0`. That is a contributor requirement only — rolldown is a devDependency and is never published. CI runs the full verification on Node 22.12, 22 and 24.

## Setup

Add the required theme CSS to your project's stylesheet:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "sibujs-ui/themes/base.css";
@import "sibujs-ui/themes/default.css";
```

## Usage

Every component accepts the sibujs `tag(props, children)` shorthand — props as the first argument, children as the second — so the tree reads top-down without `nodes:` keys:

```ts
import { Button, Card, CardHeader, CardTitle, CardContent } from "sibujs-ui";
import { mount } from "sibujs";

const app = Card([
  CardHeader([CardTitle("Hello World")]),
  CardContent([
    Button(
      { variant: "default", on: { click: () => alert("Clicked!") } },
      "Click me",
    ),
  ]),
]);

mount(app, document.getElementById("app"));
```

## Components

### Layout
Accordion, AspectRatio, Card, Carousel, Collapsible, Resizable, ScrollArea, Separator, Sidebar, Table, Tabs

### Forms
Button, ButtonGroup, Checkbox, Combobox, Field, Form, Input, InputGroup, InputOTP, Label, NativeSelect, RadioGroup, Select, Slider, Switch, Textarea, Toggle, ToggleGroup

### Feedback
Alert, AlertDialog, Badge, Dialog, Drawer, Empty, Progress, Sheet, Skeleton, Sonner (Toast), Spinner, Tooltip

### Navigation
Breadcrumb, Command, ContextMenu, DropdownMenu, HoverCard, Menubar, NavigationMenu, Pagination, Popover

### Data Display
Avatar, Calendar, Chart, Item, Kbd

### Utilities
Direction

## Themes

Import a color theme after the base CSS to override the primary accent color:

```css
@import "sibujs-ui/themes/base.css";
@import "sibujs-ui/themes/default.css";
@import "sibujs-ui/themes/blue.css"; /* optional */
```

Available color themes: `blue`, `red`, `rose`, `orange`, `amber`, `yellow`, `green`, `teal`, `purple`, `violet`.

For dark mode, add `class="dark"` to your `<html>` element.

## Component API

Every component is a plain function that returns an `HTMLElement`. Five calling conventions are accepted — pick whichever form reads best at the call site:

```ts
// 1. No args — just the default element
Separator();

// 2. Children only — string, array, node, or reactive getter
CardTitle("Hello World");
CardContent([child1, child2]);

// 3. Positional className + children (shorthand for purely structural wrappers)
//    NOTE: the string is a className ONLY when children follow it. A LONE
//    string is a text child — `Skeleton("h-6 w-48")` renders the class names
//    as text. For a childless styled element use `{ class }`:
//    Skeleton({ class: "h-6 w-48" }). Dev builds warn on class-like lone strings.
Card("p-6", [header, body]);

// 4. Props object only
Button({ variant: "default", nodes: "Click me", on: { click: handler } });

// 5. Props object + children (canonical sibujs form)
Button(
  { variant: "default", on: { click: handler } },
  "Click me",
);
```

Common props available on every component:

```ts
{
  class: "custom-classes",     // Tailwind classes (merged via cn())
  on: { click: handler },      // Event listeners
  style: { ... },              // Inline styles
  ref: { current: null },      // Element reference
  // …plus component-specific props (variant, size, disabled, etc.)
}
```

Stateful components (`Checkbox`, `Switch`, `Tabs`, `Select`, `Dialog`, `Tooltip`, `Accordion`, …) accept both literal values and reactive getters for their controlled props — passing a signal getter like `{ open: isOpen }` wires the state through automatically:

```ts
const [open, setOpen] = signal(false);

Dialog({ open }, [
  DialogContent([/* … */]),
]);
```

### Reactive children

Children may be reactive getters anywhere `NodeChildren` is accepted, including
inside arrays and nested arrays. The getter is bound by SibuJS, so it re-renders
when its dependencies change:

```ts
const [label, setLabel] = signal("Saving…");

DialogContent(() => label());              // whole child is reactive
DialogContent([icon, () => label()]);      // mixed static and reactive
```

Components that add their own internal nodes — the Dialog close button, the
Drawer drag handle, a menu's chevron, a Command group heading — keep those in
their documented position around your children.

`null`, `undefined` and booleans are ignored, matching SibuJS semantics. Nested
arrays are flattened in order, and neither arrays nor getters are ever
stringified.

Reactive children are disposed together with their component, so a getter stops
being read once its subtree is disposed.

> `toChildren()` is the exported helper for this. The older `toNodes()` keeps its
> `Node[]` return type for backward compatibility and therefore cannot represent
> a reactive child — prefer `toChildren()` in your own components.

### Form controls

`Checkbox`, `Switch` and `RadioGroup` render styled `button` elements but take
part in forms through a visually hidden native input, so `FormData`,
`checkValidity()` / `reportValidity()` and form reset behave natively:

```ts
const form = document.createElement("form");
form.append(
  Checkbox({ name: "terms", required: true }),
  Switch({ name: "notify", value: "email" }),
  RadioGroup({ name: "plan", defaultValue: "free", required: true }, [
    RadioGroupItem({ value: "free" }),
    RadioGroupItem({ value: "pro" }),
  ]),
);

new FormData(form); // → terms=on (only while checked), plan=free, …
```

- A control is submitted only while checked/selected, under its `name`.
- `value` defaults to `"on"` for `Checkbox` and `Switch`, as a native checkbox does.
- `disabled` controls are excluded from submission, per the HTML spec.
- `required` is enforced by real constraint validation, not a custom check.
- `form.reset()` restores `defaultChecked` / `defaultValue` and the visible control follows.
- Controlled and uncontrolled usage behave identically.

The bridge input is `aria-hidden` with `tabindex="-1"`, so it adds no duplicate
tab stop and no duplicate form entry — the styled control stays the only
focusable, announced element.

`RadioGroup` implements the native radio keyboard model: the group is a single
tab stop, and <kbd>↑</kbd>/<kbd>↓</kbd>/<kbd>←</kbd>/<kbd>→</kbd> move (wrapping)
while <kbd>Home</kbd>/<kbd>End</kbd> jump to the first/last item. Disabled items
are skipped.

A `name` (or `required`) is what opts a control into form participation; without
either, no hidden input is created.

## Accessibility

Components ship ARIA roles, states and id wiring — `Dialog` and `AlertDialog`
generate per-instance ids so `aria-labelledby` / `aria-describedby` resolve to
their own title and description, and a reference is dropped rather than left
dangling when the element is absent. This is not a claim of full WCAG
conformance; audit your own application.

## Releasing

Releases are published manually by the package owner. This repository contains
no release automation: nothing here selects a version, parses a registry
response, commits, tags, pushes, retries a publication or rolls one back.

The order below matters. The version has to be set **before** the quality gates
run, because `npm pack` and the build describe whatever version is on disk at
the time — validating first and editing `package.json` afterwards would sign off
on a package that was never actually inspected.

**1. Start from a clean, up-to-date release branch.** `git status` should report
nothing outstanding, so the artifact is built from exactly what is committed.

**2. Install the canonical dependencies.**

```bash
npm ci
```

`npm ci` installs strictly from `package-lock.json`, so the gates run against the
same tree CI uses.

**3. Set the intended version.**

```bash
npm version <version> --no-git-tag-version
```

This writes the new version to **both** `package.json` and `package-lock.json`.
`--no-git-tag-version` is what keeps it inert: no commit and no tag are created,
so the version bump stays a reviewable working-tree change.

**4. Confirm both manifests agree.**

```bash
node -p "require('./package.json').version"
node -p "require('./package-lock.json').version"
```

Both must print the intended release version. A hand-edited `package.json` is
the usual way these drift apart, which then ships a tarball whose lockfile
disagrees with its manifest. At `lockfileVersion` 3 the root version is stored
twice, so it is worth checking the mirror as well:

```bash
node -p "require('./package-lock.json').packages[''].version"
```

**5. Run every quality gate, now that the version is set.**

```bash
npm test -- --run
npm run lint
npx tsc --noEmit
npm run build
npm pack --dry-run --json
npm audit --omit=dev
```

**6. Inspect the package that would actually be published.** `npm pack
--dry-run --json` reports the tarball contents along with its `name`, `version`
and `filename`; confirm the reported version is the intended release version and
that the file list holds the built entry points (`dist/index.js`,
`dist/index.cjs`, `dist/index.d.ts`, `dist/index.d.cts`), the theme CSS under
`src/themes/`, and `README.md`.

**7. Publish — a manual owner action.** Only once every check above has passed:

```bash
npm login
npm publish --access public
```

`npm login` and `npm publish` are run by hand by the package owner. They are
never executed by CI, by any script in this repository, or by any test.
`prepublishOnly` rebuilds the package first, so a publish always ships a freshly
built `dist/`.

**8. Commit and tag afterwards, if you want to.** Creating a release commit and
a Git tag is a separate decision the owner makes after reviewing the version
diff, not a step this repository performs. There is deliberately no script for
it.

## Acknowledgements

The component design, styling, and variant system are inspired by [shadcn/ui](https://ui.shadcn.com/). This is an independent implementation for SibuJS built from scratch using SibuJS signals, tag factories, and direct DOM manipulation.

## License

MIT
