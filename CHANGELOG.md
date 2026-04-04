# Changelog

All notable changes to sibujs-ui will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/).

---

## [1.0.9] — 2026-04-03

### Fixed

- **`SelectValue` renders full node tree** — Previously, selecting a `SelectItem` with complex children (multiple spans, icons, nested markup) flattened everything to `.textContent`, losing structure and styling. `SelectValue` now clones the selected item's DOM subtree via `cloneNode(true)` and renders it in the trigger, preserving formatting. Falls back to plain text for simple items.

### Changed

- **`Input` accepts reactive `value`** — `InputProps.value` now accepts `string | (() => string)`. The runtime already handled reactive getters via `bindAttribute`; this fixes the TypeScript type to match.
- **`Textarea` accepts reactive `value`** — Same fix as Input: `TextareaProps.value` now accepts `string | (() => string)`.
- **`Badge` accepts reactive `variant`** — `BadgeProps.variant` now accepts `BadgeVariant | (() => BadgeVariant)`. When a getter is passed, the CVA class computation is wrapped in a reactive function so the badge re-styles when the variant changes. A new `BadgeVariant` type is exported.
- **Reactive controlled props across all stateful components** — The following props now accept `T | (() => T)` reactive getters in addition to plain values:
  - `Select.value` — `string | (() => string)`
  - `Tabs.value` — `string | (() => string)`
  - `RadioGroup.value` — `string | (() => string)`
  - `Accordion.value` — `string | string[] | (() => string | string[])`
  - `Slider.value` — `number[] | (() => number[])`
  - `Toggle.pressed` — `boolean | (() => boolean)`
  - `Switch.checked` — `boolean | (() => boolean)`
  - `Checkbox.checked` — `boolean | (() => boolean)`
  - `Collapsible.open` — `boolean | (() => boolean)`
