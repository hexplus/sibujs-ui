# sibujs-ui

A complete UI component library for [SibuJS](https://github.com/hexplus/sibujs). 56 Tailwind-styled, signal-driven components with zero Virtual DOM dependencies.

## Features

- **56 components** — from buttons and inputs to dialogs, sidebars, and data tables
- **Tailwind CSS v4** — fully styled with utility classes, dark mode, and oklch color system
- **Signal-driven** — reactive state powered by SibuJS signals and effects
- **Zero VDOM** — direct DOM manipulation with fine-grained reactivity
- **TypeScript** — full type definitions for all components and props
- **Themeable** — 12 built-in color themes with CSS custom properties
- **Tree-shakeable** — import only what you use

## Installation

```bash
npm install sibujs-ui sibujs
```

`sibujs-ui` requires **`sibujs >= 1.3.0`** as a peer dependency — earlier versions lack the `registerDisposer`, `createId`, and `tag(props, children)` APIs that the components rely on.

## Setup

Add the required theme CSS to your project's stylesheet:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "sibujs-ui/themes/base.css";
@import "sibujs-ui/themes/default.css";
```

## Usage

Every component accepts the sibujs 1.3.0 `tag(props, children)` shorthand — props as the first argument, children as the second — so the tree reads top-down without `nodes:` keys:

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
Card("p-6", [header, body]);

// 4. Props object only
Button({ variant: "default", nodes: "Click me", on: { click: handler } });

// 5. Props object + children (canonical sibujs 1.3.0 form)
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

## Acknowledgements

The component design, styling, and variant system are inspired by [shadcn/ui](https://ui.shadcn.com/). This is an independent implementation for SibuJS built from scratch using SibuJS signals, tag factories, and direct DOM manipulation.

## License

MIT
