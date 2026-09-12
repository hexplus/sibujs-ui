# The sibujs-ui registry

sibujs-ui ships two ways, both built from the same `src/`:

| | npm package | Copy-paste registry |
|---|---|---|
| Install | `npm install sibujs-ui sibujs` | `npx sibujs-ui add button` |
| Code lives in | `node_modules/sibujs-ui` | your project (`src/components/ui/button.ts`) |
| Imports | `import { Button } from "sibujs-ui"` | `import { Button } from "@/components/ui/button"` |
| Updates | bump the version | `npx sibujs-ui diff` / `add --overwrite` |
| Customising | props, `class`, theme tokens | edit the file |
| Styles | import `sibujs-ui/themes/*.css` (README → Setup) | copied into your project, imported for you |

Both can be used in the same project: the registry installs files under your own
paths and never touches `node_modules/sibujs-ui`.

## When to use which

**Use the npm package when** you want the components as a dependency: upgrades
are a version bump, fixes arrive without merging, and you customise through
props, `class` and theme tokens. It is the right default for applications that
use the components as they are, and it is the only option that also gives you
the CDN build and the full 1,700-icon set.

**Use the registry when** you want to own the code: change a component's markup,
variants or behaviour directly, delete what you do not use, or keep a design
system in your repository without forking the package. You take on merging
upstream changes yourself (`diff` shows them).

**Mixing is fine.** A common pattern is the package for most components and a
copied, modified `button.ts` or `dialog.ts` where you needed a change the props
do not allow.

## Quick start

Requirements: a TypeScript project with Tailwind CSS v4 set up, and SibuJS.

```bash
npx sibujs-ui init            # components.json + base styles + cn()
npx sibujs-ui add button card dialog
```

```ts
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

Card([CardContent([Button({ variant: "outline" }, "Click me")])]);
```

Copied components import each other through the `@/` alias, so it has to
resolve. `init` warns when your tsconfig does not declare it:

```jsonc
// tsconfig.json (or tsconfig.app.json)
{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
```

```ts
// vite.config.ts
import { fileURLToPath } from "node:url";
export default { resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } } };
```

## CLI

The CLI is the `sibujs-ui` package's `bin`. `npx sibujs-ui@<version>` pins it,
and with it the registry version it installs.

| Command | What it does |
|---|---|
| `init [--theme <color>] [--css <file>] [--force]` | Writes `components.json`, installs `base` and `utils` (and a theme), adds the `@import` lines to your stylesheet. |
| `add <name...>` | Copies items and everything in their `registryDependencies`, then installs missing npm dependencies. |
| `add --all` | Every component. |
| `list` | Every item, grouped: components, library, styles, themes. |
| `diff [name...]` | Without names: which installed files differ from the registry. With names: the changed lines. |

Options for every command:

- `--cwd <dir>` — project directory.
- `--registry <dir|url>` — where to read items (see [Endpoints](#endpoints)).
- `--no-install` — print the npm install command instead of running it. The
  package manager is picked from your lockfile (npm, pnpm, yarn, bun).
- `--dry-run` (`init`, `add`) — report what would be written, write nothing.
- `--overwrite` (`add`) — replace files that exist and differ. Without it they
  are skipped and reported, so local edits are never lost silently.

### `components.json`

```json
{
  "$schema": "https://unpkg.com/sibujs-ui/dist/registry/schema/components.json",
  "css": "src/style.css",
  "paths": {
    "ui": "src/components/ui",
    "lib": "src/lib",
    "styles": "src/styles/sibujs-ui"
  },
  "aliases": {
    "ui": "@/components/ui",
    "lib": "@/lib"
  }
}
```

- `paths` — where files go, relative to the project root. `init` uses `src/…`
  when a `src/` directory exists.
- `aliases` — the import specifiers for `paths.ui` and `paths.lib`. Registry
  files use `@/components/ui/*` and `@/lib/*`; the CLI rewrites them to these
  values, so `"ui": "~/ui"` works as long as your tsconfig and bundler agree.
- `css` — your main stylesheet. Style and theme items add their `@import` lines
  after the last existing `@import` (adding `@import "tailwindcss";` if it is
  missing). `null` prints the lines instead.
- `registry` (optional) — a default for `--registry`.

### What gets installed

`npx sibujs-ui add dialog` writes:

```
src/components/ui/dialog.ts
src/components/ui/button.ts          ← dialog uses Button
src/lib/utils.ts                     ← cn(), cnReactive()
src/lib/types.ts                     ← BaseProps, normalizeArgs, toChildren
src/lib/lifecycle.ts  controlled.ts  aria.ts  scroll-lock.ts
src/lib/icons.ts                     ← the icons components use
src/styles/sibujs-ui/base.css  default.css
```

and installs `sibujs`, `clsx`, `tailwind-merge` and `class-variance-authority`
if your `package.json` does not already list them.

`lib/icons.ts` holds only the ~20 lucide icons the components import, not the
package's full set. It is the same file for every component of a registry
version, so adding components one at a time never needs a different copy. If
you have added icons of your own to it, `add` keeps your file as long as it
still exports every icon the registry needs, and tells you which are missing
otherwise. For more icons, use the `lucide` package.

### Updating copied components

```bash
npx sibujs-ui@latest diff            # which files changed upstream (or locally)
npx sibujs-ui@latest diff dialog     # the changed lines
npx sibujs-ui@latest add dialog --overwrite
```

`diff` compares against the registry after applying your aliases, so a file you
never edited shows as identical.

## Endpoints

The registry is a directory of static JSON, published inside the npm package at
`dist/registry/`:

| File | Contents |
|---|---|
| `index.json` | The full index: every item, without file contents. |
| `<name>.json` | One item, with the full source of each file. |
| `schema/registry.json`, `schema/registry-item.json`, `schema/components.json` | JSON Schemas for the above. |

Because it is part of the package, any npm CDN serves it:

```
https://unpkg.com/sibujs-ui@<version>/dist/registry/index.json
https://unpkg.com/sibujs-ui@<version>/dist/registry/button.json
https://cdn.jsdelivr.net/npm/sibujs-ui@<version>/dist/registry/button.json
```

It is also importable as `sibujs-ui/registry/<file>` from an installed package.

`--registry` accepts a local directory, a base URL (`<base>/<name>.json`), or a
URL template containing `{name}`. With no flag and no `registry` key in
`components.json`, the CLI reads the registry bundled with itself.

## Item format

Every item follows `schema/registry-item.json`. `dist/registry/button.json`
(content shortened):

```json
{
  "$schema": "./schema/registry-item.json",
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "A button with variants and sizes.",
  "dependencies": ["class-variance-authority@^0.7.1", "sibujs@>=3.2.0 <5.0.0"],
  "devDependencies": [],
  "registryDependencies": ["base", "types", "utils"],
  "files": [
    {
      "path": "ui/button.ts",
      "type": "registry:ui",
      "content": "import { cva, type VariantProps } from \"class-variance-authority\";\nimport { button as buttonTag, type NodeChildren } from \"sibujs\";\nimport { cnReactive } from \"@/lib/utils\";\n…"
    }
  ],
  "tailwind": { "version": 4, "utilities": [], "variants": ["dark"] },
  "categories": ["forms"],
  "meta": { "version": "1.6.0" }
}
```

| Field | Meaning |
|---|---|
| `name` | Unique; the endpoint is `<name>.json`. |
| `type` | `registry:ui` (a component), `registry:lib` (helpers, types, icons), `registry:style` (`base`), `registry:theme` (`theme-<color>`). |
| `dependencies` / `devDependencies` | npm packages as `name@range`. |
| `registryDependencies` | Other items, installed first. |
| `files[].path` | First segment picks the directory: `ui/` → `paths.ui`, `lib/` → `paths.lib`, `styles/` → `paths.styles`. |
| `files[].content` | Full source, importing other items through `@/components/ui/*` and `@/lib/*`. |
| `tailwind` | Custom utilities (`animate-in`, `fade-in-0`, `animate-accordion-down`, …) and variants (`data-open`, `dark`, …) the source uses. All are defined in `base`; the list says why a component needs it. |
| `css.imports` | (style, theme) Files to `@import`, in order, relative to `paths.styles`. |
| `cssVars` | (theme) The custom properties the theme sets, for `light` and `dark`. Informational. |
| `meta.version` | The sibujs-ui version the item was generated from. |

The items:

- **Components** — one per file in `src/components/`, named after it (`button`,
  `dropdown-menu`, …). Run `npx sibujs-ui list` for all of them.
- **Library** — `utils` (`cn`, `cnReactive`), `types`, `lifecycle`,
  `controlled`, `aria`, `form-control`, `scroll-lock`, `icons`.
- **Style** — `base`: `base.css` (Tailwind theme bridge, keyframes, custom
  utilities and variants) and `default.css` (neutral light and dark tokens).
- **Themes** — `theme-amber`, `theme-blue`, `theme-green`, `theme-orange`,
  `theme-purple`, `theme-red`, `theme-rose`, `theme-teal`, `theme-violet`,
  `theme-yellow`.

## How the registry is built

`npm run build` runs the npm build (ESM, CJS, types), the CDN build, the CDN
stylesheet and then `npm run build:registry`, which runs
[`scripts/registry/build.mjs`](../scripts/registry/build.mjs). The registry is
generated from the files the npm build compiles, in the same run, into the same
tarball — there is no second copy of any component to keep in sync.

For each source file the generator:

1. rewrites relative imports to the canonical aliases
   (`../lib/utils` → `@/lib/utils`, `./button` → `@/components/ui/button`) and
   changes nothing else;
2. derives `dependencies` from bare imports, with ranges from `package.json`.
   Importing a package sibujs-ui does not declare fails the build;
3. derives `registryDependencies` from the relative imports;
4. records which `base.css` utilities and variants the file uses;
5. for `src/icons.ts`, keeps only the icons some component imports, the icons
   those aliases point at, and the SVG helpers they call.

Only descriptions and categories are written by hand, in
[`scripts/registry/meta.mjs`](../scripts/registry/meta.mjs).

What keeps it honest:

- `tests/registry.test.ts` — output matches the JSON Schemas; one item per
  component, library file and theme; every component has a description;
  component sources differ from `src/` only in import lines; every `@/` import
  is covered by `registryDependencies`; every bare import by `dependencies`;
  `dist/registry/` is byte-for-byte what the source generates now; and the CLI
  (init, add, alias remapping, idempotency, kept edits, `--overwrite`, `diff`,
  the icons rule, dry runs and errors).
- `npm run registry:verify` ([`scripts/registry/verify.mjs`](../scripts/registry/verify.mjs))
  — installs every component with the real CLI into a scratch project with a
  strict browser tsconfig (`noUnusedLocals`, `verbatimModuleSyntax`,
  `erasableSyntaxOnly`, no Node types), type-checks it, compiles its stylesheet
  with Tailwind, and bundles and renders components in jsdom. CI runs it after
  the tests.

### Adding a component

1. Add `src/components/<name>.ts` and export it from `src/index.ts`, as before.
2. Add a description and category for `<name>` in `scripts/registry/meta.mjs`.
3. `npm run build && npm test -- --run && npm run registry:verify`.

Import other components with `./<name>`, helpers with `../lib/<name>` and icons
with `import { XIcon } from "../icons"`. A new icon is picked up by the icons
subset automatically.
