// ---------------------------------------------------------------------------
// sibujs-ui — CDN / IIFE bundle
// Self-registering build for <script> tag usage without a bundler.
//
// Usage — the runtime tag FIRST, this one second:
//   <script src="https://unpkg.com/sibujs@latest/dist/cdn.global.js"></script>
//   <script src="https://unpkg.com/sibujs-ui@latest/dist/cdn.global.js"></script>
//   <script>
//     const { Button, Card, Dialog } = window.SibuUI;
//   </script>
//
// SibuJS IS NOT BUNDLED IN HERE. `sibujs` is a peer dependency, and the build
// resolves it to the `window.Sibu` the runtime tag installed (see
// `tsup.cdn.config.ts`). Bundling it would ship a second copy of the framework
// to every page that already loaded one — the components would still work,
// because the runtime shares its reactive API through a global registry, but
// the page would pay for the bytes twice.
//
// That is also why the tags are ordered: this file reads `window.Sibu` while it
// evaluates, so the runtime has to be there already. Loading it alone throws
// with a message that says so, rather than failing later as an undefined
// property somewhere inside a component.
// ---------------------------------------------------------------------------

import * as components from "./index";

// `globalThis` rather than `window`, so the bundle also self-registers in a
// worker. In a browser they are the same object.
//
// Written by hand instead of via esbuild's `globalName`: that option emits
// `var SibuUI = (() => { … })()`, which lands AFTER the module body and would
// overwrite whatever the body installed with the module's own export namespace.
// Harmless while the two are identical, and a silent bug the moment they are
// not. See `tsup.cdn.config.ts`.
if (typeof globalThis !== "undefined") {
	(globalThis as unknown as Record<string, unknown>).SibuUI = { ...components };
}
