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

## Setup

Add the required theme CSS to your project's stylesheet:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "sibujs-ui/themes/base.css";
@import "sibujs-ui/themes/default.css";
```

## Usage

```ts
import { Button, Card, CardHeader, CardTitle, CardContent } from "sibujs-ui";
import { mount } from "sibujs";

const app = Card({
  nodes: [
    CardHeader({
      nodes: [CardTitle({ nodes: "Hello World" })],
    }),
    CardContent({
      nodes: [
        Button({
          variant: "default",
          nodes: "Click me",
          on: { click: () => alert("Clicked!") },
        }),
      ],
    }),
  ],
});

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

All components follow a consistent pattern:

```ts
ComponentName({
  class: "custom-classes",     // Tailwind classes (merged via cn())
  nodes: "content" | [...],    // Child content
  on: { click: handler },      // Event listeners
  style: { ... },              // Inline styles
  ref: { current: null },      // Element reference
  variant: "default",          // Component-specific variants
  // ...other component props
}): HTMLElement
```

## Acknowledgements

The component design, styling, and variant system are inspired by [shadcn/ui](https://ui.shadcn.com/). This is an independent implementation for SibuJS — no React, Radix, or shadcn code is used. All components are built from scratch using SibuJS signals, tag factories, and direct DOM manipulation.

## License

MIT
