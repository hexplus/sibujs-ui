# Changelog

All notable changes to sibujs-ui will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/).

---

## [1.3.1] — 2026-04-18

### Changed — peer range widened to `sibujs ^2.0.0`

`peerDependencies.sibujs` relaxed from `>=2.2.0` to `^2.0.0`. The package only uses the stable public API (`signal`, `derived`, `effect`, tag factories, `cnReactive`) — none of which has changed since 2.0.0 — so the previous floor unnecessarily excluded consumers on sibujs 2.0.x and 2.1.x. No source changes, no behavior changes. Install compatibility gained, nothing lost.

---

## [1.3.0] — 2026-04-16

### Added — `TooltipContent.portal`

`TooltipContent` now accepts a `portal?: boolean` prop. When set, the content element is teleported to `document.body` on mount and switched from `position: absolute` (anchored to the tooltip parent) to `position: fixed` with coordinates recomputed from the trigger's `getBoundingClientRect()` every time the tooltip opens. Use this whenever the tooltip's nearest scrolling ancestor has `overflow: hidden` and would otherwise clip the content. Cleanup is wired through `registerDisposer` so the teleported node is removed when the owning tooltip is disposed.

### Fixed — Sidebar tooltip race in expanded mode

`SidebarMenuButton` previously tried to suppress the icon-mode tooltip when the sidebar was expanded by toggling `display` on the content element from a one-shot effect. `TooltipContent`'s own display effect re-asserted `display = ""` on every hover, so the suppression effect was overwritten and the tooltip became visible in expanded mode (and could also leak into the collapsed-without-hover state). The suppression has been replaced with an `open()` interceptor that wraps the tooltip context so the tooltip simply does not open while the sidebar is expanded or in mobile mode — no more inline-style tug-of-war with `TooltipContent`.

### Fixed — Sidebar tooltip clipped in icon-collapsed mode

`SidebarContent` carries `overflow: hidden` in `group-data-[collapsible=icon]` to prevent horizontal scrollbars in icon mode. That clipping also hid the menu-button tooltip, which renders to the right of the (≈48px-wide) icon column. `SidebarMenuButton` now passes `portal: true` to its `TooltipContent`, so the label escapes the sidebar's overflow box and renders correctly next to the icon.

---

## [1.1.0] — 2026-04-11

### Changed — shorthand-only authoring internally

Every component in `sibujs-ui` has been migrated to the positional shorthand form (`tag(children)`, `tag("className", children)`, `tag({ props }, children)`). The previous `{ class, nodes: [...] }` object form is gone from the package source — 132 call sites across 34 component files were rewritten in a single AST-driven pass so the internal style is uniform. This is purely an internal refactor: every public component API, prop name, className contract, and DOM output is unchanged, and no runtime behavior is affected.

Why the minor bump: while consumers see no API change, the shorthand is now the canonical authoring style across the SibuJS ecosystem (documented that way in the framework docs and reference site), and aligning the UI package with that canonical form is the kind of cross-cutting source change that deserves a visible version marker rather than a silent patch.

`normalizeArgs` continues to accept the legacy `{ nodes: ... }` prop form from user code, so existing consumer call sites keep working exactly as before — the change is in how the package's own components are *written*, not in what shapes they *accept*.

---

## [1.0.12] — 2026-04-11

### Fixed — reactive controlled props

Previously every stateful component inlined `signal(controlled ?? default)` to seed its internal state. When the caller passed a reactive getter (`() => T`), the function itself was stored as the signal value, so every read returned the function rather than the unwrapped value — `data-state`, `aria-*`, and change callbacks all broke silently. A new shared `bindControlled<T>()` helper handles all three shapes (`undefined` / literal / getter) in one place, and every stateful component has been migrated to use it:

- `Toggle.pressed` — now reactive.
- `Tooltip.open` — now accepts `boolean | (() => boolean)` (type signature widened + runtime fix).
- `HoverCard.open` — same fix as Tooltip.
- `Checkbox.checked`, `Switch.checked`, `Tabs.value`, `RadioGroup.value`, `Slider.value`, `Collapsible.open` — migrated off the inline pattern onto `bindControlled`.
- `Select.value`, `Dialog.open`, `AlertDialog.open`, `Accordion.value` — the inline fixes shipped earlier have been replaced with the shared helper for consistency.

### Fixed — unmount leaks

Many overlay/menu components attached `document`/`window` listeners, `ResizeObserver`s, and `setTimeout` callbacks inside `queueMicrotask` or `effect()` without cleanup paths for the unmount-while-open case. Every confirmed leak is now tied to `registerDisposer`:

- **Dialog / AlertDialog / Drawer / Sheet** — detaches `document` keydown listeners, clears pending close timers, and restores `document.body.style.overflow` if the overlay is disposed while still open.
- **Popover / DropdownMenu / ContextMenu / Menubar / Select / NavigationMenu / Calendar** — detaches `document` `mousedown`/`keydown` outside-click-and-escape listeners on dispose.
- **Combobox** — the outside-click listener was previously leaked on every `effect()` re-run because `effect()` does not honor return-value cleanups. The handler is now hoisted and attach/detach is driven by `isOpen()` state, with a final `registerDisposer` safety net.
- **Sidebar** — `window.matchMedia('change')` and `window keydown` (Ctrl/Cmd+B shortcut) listeners are now detached on dispose.
- **Accordion** — content `ResizeObserver`, close-fallback `setTimeout`, and the state `effect()` share a single disposer.
- **ScrollArea** — viewport `ResizeObserver` is disconnected on dispose.
- **Tooltip / HoverCard** — pending open/close `setTimeout`s and the content `effect()` are cleaned up on dispose.

### Fixed — miscellaneous

- **`Label.htmlFor` alias** — `Label` and `FieldLabel` now accept both `for` and `htmlFor` as the associated-element id. Previously only `for` was honored; `htmlFor` call sites silently dropped the prop.
- **`normalizeArgs` props-plus-children shorthand** — `Component({ ...props }, children)` (sibujs 1.3.0's canonical form) is now recognised alongside the positional `Component("className", children)` form. The two are disambiguated by the type of the first argument; when a props object is passed, the positional second argument wins over any `nodes` key already on the object.

### Added

- **`bindControlled<T>()` helper** — shared controlled-prop utility exported from `src/lib/controlled.ts`.
- **`aria-describedby` for Tooltip and HoverCard** — triggers expose a stable `aria-describedby` resolving to the content id so screen readers can associate the content with the focusable trigger.
- **Keyboard dismissal for Tooltip and HoverCard** — pressing `Escape` while the trigger is focused closes the overlay.
- **Touch support for Tooltip and HoverCard** — `pointerenter`/`pointerleave` replace the previous mouse-only wiring, so tap devices can surface both overlays.
- **FOUC prevention for Tooltip and HoverCard** — content elements seed `data-state="closed"` and `display: none` at creation, so closed-state CSS applies on the first paint.

### Security

- **Sidebar cookie hardening** — the sidebar persistence cookie now emits `SameSite=Lax` (CSRF hardening) and `Secure` when the page is served over HTTPS. The stored value is non-sensitive (just open/closed), but defense-in-depth.

### Dependencies

- **`sibujs` peer and dev dependency bumped to `^1.3.0`** — the new `bindControlled` helper and disposer-tied resource cleanup depend on `createId`, `registerDisposer`, and the `tag(props, children)` shorthand introduced in sibujs 1.3.0. Consumers must upgrade `sibujs` alongside `sibujs-ui` 1.0.12.

### Tests

- **New test infrastructure** — `vitest.config.ts` (jsdom environment) plus three test files:
  - `tests/smoke.test.ts` — 64 tests; every exported component constructs without throwing.
  - `tests/bindControlled.test.ts` — 5 unit tests for the helper.
  - `tests/regressions.test.ts` — 23 historical-regression tests covering Checkbox/Switch/Tabs/Toggle reactive controlled props, Label/FieldLabel `for`/`htmlFor` compat, Tooltip/HoverCard reactive `open` + `aria-describedby` + Escape + initial `data-state="closed"`, and Accordion/ScrollArea `ResizeObserver` cleanup on dispose (via a mocked observer).
- **92 tests total**, all passing under `jsdom`.

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
