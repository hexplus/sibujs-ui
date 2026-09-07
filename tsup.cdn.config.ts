import type { Plugin } from "esbuild";
import { defineConfig } from "tsup";

// ---------------------------------------------------------------------------
// CDN / IIFE builds for sibujs-ui.
//
// These are the only outputs this package ships that a consumer cannot
// rebundle — a `<script src="…/cdn.global.js">` tag runs exactly the bytes
// published here. Every other entry point is handed to the consumer's bundler
// as ESM/CJS with `__SIBU_DEV__` left undefined ON PURPOSE, so that bundler
// decides the mode and folds the dev branches accordingly.
//
// The CDN cannot delegate that decision, so it is made here:
//
//   dist/cdn.global.js      __SIBU_DEV__: false — production. Diagnostics are
//                           compiled out, not merely disabled.
//   dist/cdn.dev.global.js  __SIBU_DEV__: true  — development. Warnings are
//                           live with no build step, which is the whole point
//                           of having them in a no-build workflow.
//
// NO `globalName`, deliberately — and this is a trap worth naming, because
// adding it looks like an obvious improvement. It makes esbuild emit
// `var SibuUI = (() => { … })()`, and that assignment lands AFTER the module
// body has finished, overwriting whatever the body installed with the module's
// own export namespace. `src/cdn.ts` assigns the global itself instead.
// ---------------------------------------------------------------------------

/**
 * Resolve `sibujs` to the `window.Sibu` the runtime's own <script> tag
 * installed, instead of bundling the framework into this artifact.
 *
 * `sibujs` is a PEER dependency: the consumer brings it. Bundling it here would
 * hand every page a second copy of the runtime alongside the one it already
 * loaded. That is not a correctness problem — the framework publishes its
 * reactive API on a global registry and later copies delegate to the first — but
 * it is a large and pointless download.
 *
 * The guard turns the ordering mistake into a sentence. Without it, a page that
 * forgets the runtime tag fails much later, as an undefined property inside
 * whichever component happens to run first.
 */
const sibujsFromGlobal: Plugin = {
	name: "sibujs-from-global",
	setup(build) {
		build.onResolve({ filter: /^sibujs$/ }, () => ({ path: "sibujs", namespace: "sibujs-global" }));
		build.onLoad({ filter: /.*/, namespace: "sibujs-global" }, () => ({
			// One line, no escape sequences: this string is JavaScript source, and
// an escaped newline here is one careless edit away from becoming a
// real one and producing an unterminated string in the module below.
contents: "const Sibu = globalThis.Sibu; if (!Sibu) { throw new Error('[sibujs-ui] SibuJS is not on the page. Load the runtime tag BEFORE this one: https://unpkg.com/sibujs@latest/dist/cdn.global.js'); } module.exports = Sibu;",
loader: "js",
		}));
	},
};

const shared = {
	entry: undefined as never,
	format: ["iife"] as const,
	outDir: "dist",
	dts: false,
	minify: true,
	esbuildPlugins: [sibujsFromGlobal],
};

export default defineConfig([
	{
		...shared,
		// Object entry form: the KEY is the output basename, so this emits
		// `cdn.global.js` while the dev build below emits `cdn.dev.global.js`
		// from the same source.
		entry: { cdn: "src/cdn.ts" },
		define: { __SIBU_DEV__: "false" },
	},
	{
		...shared,
		entry: { "cdn.dev": "src/cdn.ts" },
		define: { __SIBU_DEV__: "true" },
	},
]);
