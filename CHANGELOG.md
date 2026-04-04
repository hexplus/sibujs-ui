# Changelog

All notable changes to sibujs-ui will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/).

---

## [1.0.11] — 2026-04-04

### Fixed

- **Slider `value` prop is reactive** — The implementation now handles the `() => number[]` getter that the type signature already accepted. Passing a signal getter reactively syncs the slider values via `effect()`, aligning with the pattern used in Select.

---

## [1.0.10] — 2026-04-03

### Fixed

- **Dialog/AlertDialog `__dialog`/`__alertDialog` available during `onElement`** — The imperative API is now assigned inside an internal `onElement` callback before the user's fires, so `el.__dialog.open()` works immediately without `setTimeout` workarounds.
- **Dialog/AlertDialog `open` prop is reactive** — `open` now accepts `boolean | (() => boolean)`. Passing a signal getter reactively syncs the internal state via `effect()`, enabling controlled dialog state without imperative hacks.
- **Select `value` prop is reactive** — The implementation now handles the `() => string` getter that the type signature already accepted. Passing a signal getter reactively syncs the selected value via `effect()`.
- **DropdownMenuContent no longer clipped by ancestor `overflow`** — Content is now portaled to `document.body` with `position: fixed` and positioned via `getBoundingClientRect()`, avoiding all stacking context and overflow clipping issues. `DropdownMenuItem` and `DropdownMenuRadioItem` updated to resolve the root menu via `__dropdownRoot` when inside portaled content.

### Changed

- **Enforce LF line endings** — Added `.gitattributes` with `* text=auto eol=lf` to prevent CRLF formatting drift on Windows.

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
