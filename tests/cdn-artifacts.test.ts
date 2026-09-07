// @vitest-environment node
//
// Nothing here needs a DOM: it reads built files and runs them in a vm.

import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";
import { describe, expect, it } from "vitest";

// ---------------------------------------------------------------------------
// Assertions against the REAL published CDN artifacts, not against source.
//
// A `<script src="…/cdn.global.js">` tag runs exactly the bytes published here
// — nobody rebundles them — so the two properties this package depends on have
// to be checked against the files themselves:
//
//   1. SibuJS is NOT bundled in. It is a peer dependency, resolved at build
//      time to the `window.Sibu` the runtime's own tag installs. Bundling it
//      would hand every page a second copy of the framework alongside the one
//      it already loaded. Not a correctness problem — the runtime shares its
//      reactive API through a global registry — but a large, pointless
//      download, and nothing in the source would reveal it.
//
//   2. Dev diagnostics are compiled out of the production build. The gate in
//      `components/types.ts` leads with a BARE `__SIBU_DEV__` precisely so a
//      `define` can fold it; a member expression cannot be replaced, and the
//      warning text would ride along in a bundle that can never print it.
// ---------------------------------------------------------------------------

const ROOT = resolve(__dirname, "..");
const PROD_CDN = resolve(ROOT, "dist/cdn.global.js");
const DEV_CDN = resolve(ROOT, "dist/cdn.dev.global.js");

// Diagnostics identified by a literal only they emit, which survives
// minification verbatim.
const DIAGNOSTIC_MARKERS = {
	"lone-string class heuristic": "looks like a class list but is being rendered as TEXT",
	"dropped reactive child": "dropped a reactive (function) child",
} as const;

// `dist/` only exists after `npm run build`. Skipping locally keeps a plain
// `vitest` run working on a fresh clone; on CI a missing artifact is a failure,
// because CI always builds first and a silent skip there would hide exactly the
// regression this file exists to catch.
const built = existsSync(PROD_CDN) && existsSync(DEV_CDN);
const onCI = !!process.env.CI;

/**
 * The runtime bundle this package's CDN build expects to find already loaded.
 *
 * Taken from the installed peer dependency rather than a stub: the components
 * call `Sibu.signal` while the module evaluates, so a hand-written stand-in
 * would have to grow every time a component touches something new. Loading the
 * real artifact is also the arrangement a browser gets — two script tags, the
 * runtime first.
 */
const RUNTIME_CDN = resolve(ROOT, "node_modules/sibujs/dist/cdn.global.js");

/**
 * Run the runtime bundle and then a built CDN bundle in one global, and return
 * the `SibuUI` it installs.
 *
 * The context object IS the global and `window` points back at it, matching a
 * browser where `window === globalThis`. That equivalence matters: esbuild's
 * `globalName` option emits `var SibuUI = (…)()` AFTER the module body, which
 * would overwrite what the body installed. Against a separate `window`
 * stand-in the two land in different slots and the bug hides.
 */
function loadWithRuntime(file: string): Record<string, unknown> {
	const context = createContext({ console }) as Record<string, unknown>;
	context.window = context;
	runInContext(readFileSync(RUNTIME_CDN, "utf8"), context);
	runInContext(readFileSync(file, "utf8"), context);
	return context as Record<string, unknown>;
}

describe.skipIf(!built && !onCI)("published CDN artifacts", () => {
	it("both bundles exist (run `npm run build` first)", () => {
		expect(existsSync(PROD_CDN), `missing ${PROD_CDN}`).toBe(true);
		expect(existsSync(DEV_CDN), `missing ${DEV_CDN}`).toBe(true);
	});

	it("does NOT bundle SibuJS", () => {
		const source = readFileSync(PROD_CDN, "utf8");
		// A symbol key only the framework's reactive core defines. If the
		// framework were bundled in, it would be in these bytes.
		expect(source).not.toContain("sibujs.reactive.v1");
		// And the shim that reads it off the page instead.
		expect(source).toContain("globalThis.Sibu");
	});

	it("fails with a readable message when the runtime tag is missing", () => {
		// Without the guard this surfaces much later, as an undefined property
		// inside whichever component happens to run first.
		const context = createContext({ console }) as Record<string, unknown>;
		context.window = context;
		expect(() => runInContext(readFileSync(PROD_CDN, "utf8"), context)).toThrow(/SibuJS is not on the page/);
	});

	it("self-registers the component surface on SibuUI", () => {
		const SibuUI = loadWithRuntime(PROD_CDN).SibuUI as Record<string, unknown>;
		expect(typeof SibuUI).toBe("object");
		for (const name of ["Button", "Card", "Dialog", "Input"]) {
			expect(typeof SibuUI[name], name).toBe("function");
		}
	});

	it("does not claim the runtime's own global", () => {
		// Two script tags share a page. If this bundle ever wrote `Sibu`, it
		// would replace the runtime that has to load before it.
		const context = loadWithRuntime(PROD_CDN);
		const Sibu = context.Sibu as Record<string, unknown>;
		expect(typeof Sibu.signal).toBe("function");
		expect(typeof Sibu.effect).toBe("function");
	});

	it("compiles every diagnostic out of the production bundle", () => {
		const source = readFileSync(PROD_CDN, "utf8");
		for (const [name, marker] of Object.entries(DIAGNOSTIC_MARKERS)) {
			expect(source, `${name} survived into the production bundle`).not.toContain(marker);
		}
	});

	it("keeps every diagnostic in the development bundle", () => {
		const source = readFileSync(DEV_CDN, "utf8");
		for (const [name, marker] of Object.entries(DIAGNOSTIC_MARKERS)) {
			expect(source, `${name} is missing from the development bundle`).toContain(marker);
		}
	});

	it("the production bundle is smaller than the development one", () => {
		expect(statSync(PROD_CDN).size).toBeLessThan(statSync(DEV_CDN).size);
	});
});

// ---------------------------------------------------------------------------
// The stylesheet that makes the CDN bundle usable.
//
// The components carry Tailwind utility classes — 29 of them on a single
// Button — and the shipped themes are custom properties only. A page that loads
// the script tag without a Tailwind build gets correct behaviour and a raw
// browser default button: nothing errors, and it looks broken. A no-build
// consumer has no build step by definition, so the compiled CSS has to ship.
// ---------------------------------------------------------------------------

const CDN_CSS = resolve(ROOT, "dist/sibujs-ui.css");

// Gated on the same flag as the bundles above: once this package has been
// built, a MISSING stylesheet is a failure rather than a skip — skipping on
// absence would hide exactly the gap these tests exist to close.
describe.skipIf(!built && !onCI)("the CDN stylesheet", () => {
	it("is built", () => {
		expect(existsSync(CDN_CSS), `missing ${CDN_CSS} — run \`npm run build\``).toBe(true);
	});

	it("carries the utilities the components actually use", () => {
		const css = readFileSync(CDN_CSS, "utf8");
		// A sample spanning layout, spacing, borders and state variants, taken
		// from classes Button and friends emit.
		for (const utility of [".inline-flex", ".rounded-md", ".px-4", ".gap-2", ".shrink-0"]) {
			expect(css, `${utility} is missing — the source scan did not reach the components`).toContain(utility);
		}
	});

	it("carries the theme tokens, so no separate theme import is needed", () => {
		const css = readFileSync(CDN_CSS, "utf8");
		expect(css).toContain("--radius");
		expect(css).toContain("--color-primary");
		// base.css contributes the animations the components name.
		expect(css).toContain("accordion-down");
	});

	it("is compiled, not a passthrough of the source imports", () => {
		const css = readFileSync(CDN_CSS, "utf8");
		expect(css).not.toContain('@import "tailwindcss"');
		expect(css.length).toBeGreaterThan(10_000);
	});
});
