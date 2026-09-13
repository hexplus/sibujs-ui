#!/usr/bin/env node
/**
 * Generates the copy-paste registry from `src/`.
 *
 *   node scripts/registry/build.mjs            → writes dist/registry/
 *   node scripts/registry/build.mjs --out dir  → writes somewhere else
 *
 * `src/` is the single source of truth. The npm build (tsup) and this script
 * read the same files, and `npm run build` runs both, so the published package
 * and the registry inside it are always cut from the same commit.
 *
 * What the generator does to each file, and nothing more:
 *
 *  - Rewrites relative imports to the canonical aliases a consumer project uses
 *    (`../lib/utils` → `@/lib/utils`, `./button` → `@/components/ui/button`).
 *    The CLI remaps those to the consumer's own aliases on install.
 *  - Derives npm `dependencies` from bare imports, with version ranges taken
 *    from package.json. An import of a package this package does not declare
 *    is an error: copied code must be installable from its item alone.
 *  - Derives `registryDependencies` from relative imports, so `add dialog`
 *    brings `button`, `utils`, `lifecycle`, … with it.
 *  - Reduces the 1,700-icon `src/icons.ts` to the icons the components import.
 *    Every item of one registry version shares that one file, so installing
 *    components one at a time never overwrites an icon another one needs.
 *
 * The output format is documented in `registry/schema/` and docs/registry.md.
 */

import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { LIB_META, UI_META } from "./meta.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/** Canonical aliases used inside registry files. Consumers remap on install. */
export const CANONICAL_ALIASES = { ui: "@/components/ui", lib: "@/lib" };

const THEME_TITLES = {
	amber: "Amber",
	blue: "Blue",
	green: "Green",
	orange: "Orange",
	purple: "Purple",
	red: "Red",
	rose: "Rose",
	teal: "Teal",
	violet: "Violet",
	yellow: "Yellow",
};

const read = (file) => readFileSync(file, "utf8").replace(/\r\n/g, "\n");

const toTitle = (name) =>
	name
		.split("-")
		.map((w) => (w === "otp" ? "OTP" : w[0].toUpperCase() + w.slice(1)))
		.join(" ");

// ---------------------------------------------------------------------------
// Source discovery
// ---------------------------------------------------------------------------

/**
 * Map every registry-visible source file to its item.
 *
 * @returns {Map<string, { name: string; type: string; path: string; spec: string }>}
 *   keyed by absolute source path. `path` is the file's path inside the
 *   registry, `spec` the canonical import specifier other files use for it.
 */
function discoverSources(root) {
	const sources = new Map();
	const add = (abs, name, kind) => {
		const dir = kind === "ui" ? "ui" : "lib";
		sources.set(abs, {
			name,
			type: kind === "ui" ? "registry:ui" : "registry:lib",
			path: `${dir}/${name}.ts`,
			spec: `${CANONICAL_ALIASES[dir]}/${name}`,
		});
	};

	for (const file of readdirSync(join(root, "src/components")).sort()) {
		if (!file.endsWith(".ts")) continue;
		const name = basename(file, ".ts");
		// `types.ts` holds shared prop types and argument normalization — a
		// library concern, not a component — so it installs under lib/.
		add(join(root, "src/components", file), name, name === "types" ? "lib" : "ui");
	}
	for (const file of readdirSync(join(root, "src/lib")).sort()) {
		if (file.endsWith(".ts")) add(join(root, "src/lib", file), basename(file, ".ts"), "lib");
	}
	add(join(root, "src/icons.ts"), "icons", "lib");

	const seen = new Set();
	for (const { name } of sources.values()) {
		if (seen.has(name)) throw new Error(`[registry] duplicate item name "${name}"`);
		seen.add(name);
	}
	return sources;
}

// ---------------------------------------------------------------------------
// Import analysis and rewriting
// ---------------------------------------------------------------------------

// Static imports and re-exports at the start of a line: `import … from "x"`,
// `export { … } from "x"`, `export * from "x"`, `import "x"`. Named lists may
// span lines (`\{[^}]*\}`). Dynamic `import()` is not used by the package and
// is rejected below.
const IMPORT_RES = [
	/^(\s*(?:import|export)\s+(?:type\s+)?(?:[\w$]+\s*,?\s*)?(?:\{[^}]*\}|\*(?:\s+as\s+[\w$]+)?)?\s*from\s*)(["'])([^"']+)\2/gm,
	/^(\s*import\s*)(["'])([^"']+)\2/gm,
];

/** Package name of a bare specifier: `a/b` → `a`, `@s/a/b` → `@s/a`. */
const packageName = (spec) => spec.split("/").slice(0, spec.startsWith("@") ? 2 : 1).join("/");

function analyzeFile(abs, sources, pkg) {
	const content = read(abs);
	if (/\bimport\s*\(/.test(content.replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, ""))) {
		throw new Error(`[registry] ${relative(ROOT, abs)}: dynamic import() is not supported`);
	}

	const dependencies = new Set();
	const registryDependencies = new Set();
	/** Names imported from src/icons.ts by this file. */
	const icons = new Set();

	const rewrite = (match, head, quote, spec) => {
		if (!spec.startsWith(".")) {
			const name = packageName(spec);
			const range = pkg.dependencies?.[name] ?? pkg.peerDependencies?.[name];
			if (!range) {
				throw new Error(
					`[registry] ${relative(ROOT, abs)} imports "${spec}", which is not a dependency or ` +
						"peerDependency of sibujs-ui. Copied code must be installable from its registry item.",
				);
			}
			dependencies.add(`${name}@${range}`);
			return match;
		}

		const target = resolve(dirname(abs), spec.endsWith(".ts") ? spec : `${spec}.ts`);
		const item = sources.get(target);
		if (!item) {
			throw new Error(`[registry] ${relative(ROOT, abs)} imports "${spec}", which is outside the registry`);
		}
		registryDependencies.add(item.name);
		if (item.name === "icons") {
			const list = /\{([^}]*)\}/.exec(head);
			if (!list) throw new Error(`[registry] ${relative(ROOT, abs)}: icons must be imported by name`);
			for (const part of list[1].split(",")) {
				const imported = part.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0];
				if (imported) icons.add(imported);
			}
		}
		return `${head}${quote}${item.spec}${quote}`;
	};
	const rewritten = IMPORT_RES.reduce((text, re) => text.replace(re, rewrite), content);

	// Anything still relative was written in a shape the patterns above do not
	// recognise; shipping it would hand the consumer an unresolvable import.
	const leftover = /(?:\bfrom\s*|^\s*import\s*)["']\.\.?\//m.exec(rewritten);
	if (leftover) {
		throw new Error(`[registry] ${relative(ROOT, abs)}: unrecognised relative import near "${leftover[0]}"`);
	}

	return { content: rewritten, dependencies, registryDependencies, icons };
}

// ---------------------------------------------------------------------------
// Icons subset
// ---------------------------------------------------------------------------

/**
 * Split `src/icons.ts` into top-level blocks and keep only what `wanted` needs:
 * the requested icons, the icons their aliases point at, and the SVG helpers
 * those bodies call. Unused helpers are dropped too — a consumer tsconfig with
 * `noUnusedLocals` (the Vite default) would otherwise reject the file.
 */
export function subsetIcons(source, wanted) {
	const lines = source.split("\n");
	/** @type {{ name: string | null; kind: string; text: string }[]} */
	const blocks = [];
	let i = 0;
	// Skip the file header: this subset gets its own.
	if (lines[0].startsWith("/**")) {
		while (!lines[i].includes("*/")) i++;
		i++;
	}
	for (; i < lines.length; i++) {
		const line = lines[i];
		const head = /^(?:export\s+)?(function|const|interface)\s+([A-Za-z_$][\w$]*)/.exec(line);
		if (!head) continue;
		let end = i;
		if (!(head[1] === "const" && line.trimEnd().endsWith(";"))) {
			while (end < lines.length && !/^\};?$/.test(lines[end])) end++;
		}
		blocks.push({ kind: head[1], name: head[2], text: lines.slice(i, end + 1).join("\n") });
		i = end;
	}

	const byName = new Map(blocks.map((b) => [b.name, b]));
	const keep = new Set(["SVG_NS", "IconProps", "createSvg"]);
	const pending = [...wanted];
	while (pending.length) {
		const name = pending.pop();
		if (keep.has(name)) continue;
		const block = byName.get(name);
		if (!block) throw new Error(`[registry] icon "${name}" is imported but not defined in src/icons.ts`);
		keep.add(name);
		const alias = /^export const \w+ = (\w+);$/.exec(block.text);
		if (alias) pending.push(alias[1]);
	}
	// Helpers are plain (non-exported) functions called from kept icon bodies.
	const keptText = blocks.filter((b) => keep.has(b.name)).map((b) => b.text).join("\n");
	for (const b of blocks) {
		if (b.kind === "function" && !b.text.startsWith("export") && new RegExp(`\\b${b.name}\\(s,`).test(keptText)) {
			keep.add(b.name);
		}
	}

	const header = [
		"/**",
		" * Inline SVG icons used by the sibujs-ui components — a subset of lucide.",
		" * Each function returns an SVGSVGElement with configurable size and class.",
		" *",
		" * Generated from the sibujs-ui registry. Components installed later from the",
		" * same registry version only need icons already in this file. For other icons",
		" * use the `lucide` package, or the full set exported by the `sibujs-ui` package.",
		" *",
		" * Icon designs © Lucide Contributors — ISC License",
		" * https://github.com/lucide-icons/lucide/blob/main/LICENSE",
		" */",
	].join("\n");

	const body = blocks
		.filter((b) => keep.has(b.name))
		.map((b) => b.text)
		.join("\n\n");
	return `${header}\n\n${body}\n`;
}

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------

/** Names of the custom utilities, variants and animations `base.css` defines. */
function readBaseCss(root) {
	const css = read(join(root, "src/themes/base.css"));
	const utilities = [...css.matchAll(/@utility\s+([\w-]+)/g)].map((m) => m[1]);
	const animations = [...css.matchAll(/--animate-([\w-]+)\s*:/g)]
		.map((m) => `animate-${m[1]}`)
		.filter((name) => !utilities.includes(name));
	const variants = [...css.matchAll(/@custom-variant\s+([\w-]+)/g)].map((m) => m[1]);
	return { utilities: [...utilities, ...animations], variants };
}

/** Which of base.css's custom utilities and variants a source file uses. */
function tailwindRequirements(content, base) {
	const has = (token) => new RegExp(`(?<![\\w-])${token.replace(/[-]/g, "\\-")}(?![\\w-])`).test(content);
	return {
		version: 4,
		utilities: base.utilities.filter(has).sort(),
		variants: base.variants.filter((v) => new RegExp(`(?<![\\w-])${v}:`).test(content)).sort(),
	};
}

/** `:root { --x: v }` and `.dark { --x: v }` → `{ light, dark }`. */
function parseCssVars(css) {
	const block = (selector) => {
		const m = new RegExp(`${selector.replace(".", "\\.")}\\s*\\{([^}]*)\\}`).exec(css);
		if (!m) return undefined;
		const vars = {};
		for (const [, name, value] of m[1].matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) vars[name] = value.trim();
		return vars;
	};
	const out = {};
	const light = block(":root");
	const dark = block(".dark");
	if (light) out.light = light;
	if (dark) out.dark = dark;
	return out;
}

// ---------------------------------------------------------------------------
// Assembly
// ---------------------------------------------------------------------------

const sortDeps = (set) => [...set].sort();

/**
 * Build every registry item in memory.
 *
 * @param {string} [root] package root (defaults to this repository)
 * @returns {{ index: object; items: object[] }}
 */
export function buildRegistry(root = ROOT) {
	const pkg = JSON.parse(read(join(root, "package.json")));
	const sources = discoverSources(root);
	const base = readBaseCss(root);
	const iconsPath = join(root, "src/icons.ts");

	const analyzed = new Map();
	const wantedIcons = new Set();
	for (const [abs, item] of sources) {
		if (abs === iconsPath) continue;
		const result = analyzeFile(abs, sources, pkg);
		for (const icon of result.icons) wantedIcons.add(icon);
		analyzed.set(item.name, { item, ...result });
	}
	analyzed.set("icons", {
		item: sources.get(iconsPath),
		content: subsetIcons(read(iconsPath), wantedIcons),
		dependencies: new Set(),
		registryDependencies: new Set(),
	});

	const meta = { version: pkg.version };
	const items = [];

	// Style: the tokens, keyframes and custom variants every component needs.
	items.push({
		$schema: "./schema/registry-item.json",
		name: "base",
		type: "registry:style",
		title: "Base",
		description: "Theme tokens, animations and data-state variants required by every component (Tailwind CSS v4).",
		dependencies: [],
		devDependencies: ["tailwindcss@^4"],
		registryDependencies: [],
		files: ["base.css", "default.css"].map((file) => ({
			path: `styles/${file}`,
			type: "registry:style",
			content: read(join(root, "src/themes", file)),
		})),
		css: { imports: ["base.css", "default.css"], requires: ["tailwindcss"] },
		tailwind: { version: 4, ...base },
		categories: ["styles"],
		meta,
	});

	for (const { item, content, dependencies, registryDependencies } of analyzed.values()) {
		const isUi = item.type === "registry:ui";
		const uiMeta = UI_META[item.name];
		const description = isUi ? uiMeta?.description : LIB_META[item.name];
		const deps = new Set(registryDependencies);
		if (isUi) deps.add("base");
		items.push({
			$schema: "./schema/registry-item.json",
			name: item.name,
			type: item.type,
			title: toTitle(item.name),
			...(description ? { description } : {}),
			dependencies: sortDeps(dependencies),
			devDependencies: [],
			registryDependencies: sortDeps(deps),
			files: [{ path: item.path, type: item.type, content }],
			...(isUi ? { tailwind: tailwindRequirements(content, base) } : {}),
			categories: [isUi ? (uiMeta?.category ?? "uncategorized") : "lib"],
			meta,
		});
	}

	for (const file of readdirSync(join(root, "src/themes")).sort()) {
		const color = basename(file, ".css");
		if (!(color in THEME_TITLES)) continue;
		const content = read(join(root, "src/themes", file));
		items.push({
			$schema: "./schema/registry-item.json",
			name: `theme-${color}`,
			type: "registry:theme",
			title: `${THEME_TITLES[color]} theme`,
			description: `Overrides the primary and chart colors with the ${color} palette.`,
			dependencies: [],
			devDependencies: [],
			registryDependencies: ["base"],
			files: [{ path: `styles/themes/${file}`, type: "registry:theme", content }],
			css: { imports: [`themes/${file}`] },
			cssVars: parseCssVars(content),
			categories: ["themes"],
			meta,
		});
	}

	const order = { "registry:lib": 0, "registry:style": 1, "registry:ui": 2, "registry:theme": 3 };
	items.sort((a, b) => order[a.type] - order[b.type] || a.name.localeCompare(b.name));

	for (const item of items) {
		for (const dep of item.registryDependencies) {
			if (!items.some((i) => i.name === dep)) {
				throw new Error(`[registry] "${item.name}" depends on unknown item "${dep}"`);
			}
		}
	}

	const index = {
		$schema: "./schema/registry.json",
		name: "sibujs-ui",
		homepage: pkg.homepage,
		version: pkg.version,
		aliases: CANONICAL_ALIASES,
		items: items.map(({ $schema, files, cssVars, ...rest }) => ({
			...rest,
			files: files.map(({ content, ...file }) => file),
		})),
	};

	return { index, items };
}

/** Write the registry to `outDir` (cleared first). */
export function writeRegistry(outDir, root = ROOT) {
	const { index, items } = buildRegistry(root);
	rmSync(outDir, { recursive: true, force: true });
	mkdirSync(outDir, { recursive: true });
	const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
	writeFileSync(join(outDir, "index.json"), json(index));
	for (const item of items) writeFileSync(join(outDir, `${item.name}.json`), json(item));
	cpSync(join(root, "registry/schema"), join(outDir, "schema"), { recursive: true });
	return { index, items };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
	const flag = process.argv.indexOf("--out");
	const outDir = resolve(flag === -1 ? join(ROOT, "dist/registry") : process.argv[flag + 1]);
	const { items } = writeRegistry(outDir);
	const missing = items.filter((i) => i.type === "registry:ui" && !i.description).map((i) => i.name);
	console.log(`[registry] wrote ${items.length} items to ${relative(process.cwd(), outDir) || "."}`);
	if (missing.length) console.warn(`[registry] no description in scripts/registry/meta.mjs for: ${missing.join(", ")}`);
}
