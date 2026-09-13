// @vitest-environment node
//
// The copy-paste registry: generated from `src/`, shipped in `dist/registry/`,
// installed by `bin/sibujs-ui.mjs`. The end-to-end consumer check (tsc,
// Tailwind, runtime) lives in `scripts/registry/verify.mjs`; this file covers
// the contract cheaply enough to run on every `vitest`.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildRegistry, subsetIcons, writeRegistry } from "../scripts/registry/build.mjs";
import { UI_META } from "../scripts/registry/meta.mjs";

type RegistryFile = { path: string; type: string; content: string };
type RegistryItem = {
	name: string;
	type: string;
	description?: string;
	dependencies: string[];
	devDependencies: string[];
	registryDependencies: string[];
	files: RegistryFile[];
	css?: { imports: string[] };
	meta: { version: string };
};

const ROOT = resolve(__dirname, "..");
const CLI = resolve(ROOT, "bin/sibujs-ui.mjs");
const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));
const { index, items } = buildRegistry() as { index: { items: { name: string }[] }; items: RegistryItem[] };
const byName = new Map(items.map((i) => [i.name, i]));

// ---------------------------------------------------------------------------
// A small JSON Schema (draft-07 subset) validator — enough for the shapes in
// registry/schema/, so the published schema cannot drift from the output.
// ---------------------------------------------------------------------------

type Schema = Record<string, unknown>;

function validate(value: unknown, schema: Schema, root: Schema, at = "$"): string[] {
	if (typeof schema.$ref === "string") {
		const target = schema.$ref.replace(/^#\//, "").split("/").reduce<unknown>((s, k) => (s as Schema)[k], root);
		return validate(value, target as Schema, root, at);
	}
	const errors: string[] = [];
	const types = schema.type === undefined ? [] : ([] as unknown[]).concat(schema.type);
	const typeOf = (v: unknown) =>
		v === null ? "null" : Array.isArray(v) ? "array" : Number.isInteger(v) ? "integer" : typeof v;
	if (types.length && !types.some((t) => t === typeOf(value) || (t === "number" && typeOf(value) === "integer"))) {
		return [`${at}: expected ${types.join("|")}, got ${typeOf(value)}`];
	}
	if (Array.isArray(schema.enum) && !schema.enum.includes(value)) errors.push(`${at}: not one of ${schema.enum}`);
	if (typeof schema.pattern === "string" && typeof value === "string" && !new RegExp(schema.pattern).test(value)) {
		errors.push(`${at}: "${value}" does not match ${schema.pattern}`);
	}
	if (Array.isArray(value)) {
		if (typeof schema.minItems === "number" && value.length < schema.minItems) errors.push(`${at}: too few items`);
		if (schema.items) value.forEach((v, i) => errors.push(...validate(v, schema.items as Schema, root, `${at}[${i}]`)));
	} else if (value && typeof value === "object") {
		const obj = value as Record<string, unknown>;
		const props = (schema.properties ?? {}) as Record<string, Schema>;
		for (const key of (schema.required as string[]) ?? []) {
			if (!(key in obj)) errors.push(`${at}: missing "${key}"`);
		}
		for (const [key, v] of Object.entries(obj)) {
			if (props[key]) errors.push(...validate(v, props[key], root, `${at}.${key}`));
			else if (schema.additionalProperties === false) errors.push(`${at}: unexpected "${key}"`);
			else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
				errors.push(...validate(v, schema.additionalProperties as Schema, root, `${at}.${key}`));
			}
		}
	}
	return errors;
}

const schema = (name: string) => JSON.parse(readFileSync(resolve(ROOT, "registry/schema", name), "utf8")) as Schema;

describe("registry: generated items", () => {
	it("match the published JSON schemas", () => {
		const itemSchema = schema("registry-item.json");
		for (const item of items) expect(validate(item, itemSchema, itemSchema), item.name).toEqual([]);
		const indexSchema = schema("registry.json");
		expect(validate(index, indexSchema, indexSchema)).toEqual([]);
	});

	it("has one item per component and library file, plus base and every theme", () => {
		const components = readdirSync(resolve(ROOT, "src/components"))
			.filter((f) => f.endsWith(".ts") && f !== "types.ts")
			.map((f) => f.replace(/\.ts$/, ""));
		const lib = readdirSync(resolve(ROOT, "src/lib")).map((f) => f.replace(/\.ts$/, ""));
		const themes = readdirSync(resolve(ROOT, "src/themes"))
			.map((f) => f.replace(/\.css$/, ""))
			.filter((t) => t !== "base" && t !== "default")
			.map((t) => `theme-${t}`);

		expect(items.filter((i) => i.type === "registry:ui").map((i) => i.name).sort()).toEqual(components.sort());
		expect(items.filter((i) => i.type === "registry:lib").map((i) => i.name).sort()).toEqual(
			[...lib, "types", "icons"].sort(),
		);
		expect(items.filter((i) => i.type === "registry:theme").map((i) => i.name).sort()).toEqual(themes.sort());
		expect(byName.get("base")?.type).toBe("registry:style");
		expect(index.items.map((i) => i.name)).toEqual(items.map((i) => i.name));
	});

	it("gives every component a description and category in meta.mjs", () => {
		const undocumented = items.filter((i) => i.type === "registry:ui" && !UI_META[i.name]).map((i) => i.name);
		expect(undocumented).toEqual([]);
	});

	it("ships the component source unchanged apart from import specifiers", () => {
		const importLine = /^\s*(?:import|export)\b.*$|^\s*\}\s*from\s.*$/gm;
		const strip = (s: string) => s.replace(importLine, "");
		for (const name of ["button", "dialog", "sidebar"]) {
			const source = readFileSync(resolve(ROOT, `src/components/${name}.ts`), "utf8");
			expect(strip(byName.get(name)!.files[0].content)).toBe(strip(source));
		}
		expect(byName.get("utils")!.files[0].content).toBe(readFileSync(resolve(ROOT, "src/lib/utils.ts"), "utf8"));
	});

	it("uses only canonical aliases, each backed by a registry dependency", () => {
		const specOf = (item: RegistryItem) => item.files[0].path.replace(/^ui\//, "@/components/ui/").replace(/^lib\//, "@/lib/").replace(/\.ts$/, "");
		const specToName = new Map(items.filter((i) => i.files[0].path.endsWith(".ts")).map((i) => [specOf(i), i.name]));

		for (const item of items) {
			for (const file of item.files.filter((f) => f.path.endsWith(".ts"))) {
				const specs = [...file.content.matchAll(/(?:from|import)\s*["']([^"']+)["']/g)].map((m) => m[1]);
				expect(specs.filter((s) => s.startsWith(".")), item.name).toEqual([]);
				for (const spec of specs.filter((s) => s.startsWith("@/"))) {
					const dep = specToName.get(spec);
					expect(dep, `${item.name} imports ${spec}`).toBeDefined();
					expect(item.registryDependencies, `${item.name} → ${dep}`).toContain(dep);
				}
				for (const spec of specs.filter((s) => !s.startsWith("@/") && !s.startsWith("."))) {
					const name = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
					const range = pkg.dependencies[name] ?? pkg.peerDependencies[name];
					expect(item.dependencies, `${item.name} imports ${spec}`).toContain(`${name}@${range}`);
				}
			}
		}
	});

	it("puts utils, base and types under every component", () => {
		for (const item of items.filter((i) => i.type === "registry:ui")) {
			expect(item.registryDependencies).toContain("base");
		}
		expect(byName.get("button")!.registryDependencies).toEqual(["base", "types", "utils"]);
		expect(byName.get("utils")!.dependencies).toEqual([
			`clsx@${pkg.dependencies.clsx}`,
			`tailwind-merge@${pkg.dependencies["tailwind-merge"]}`,
		]);
	});

	it("reduces icons to exactly the icons components import", () => {
		const icons = byName.get("icons")!.files[0].content;
		const exported = [...icons.matchAll(/^export (?:function|const) (\w+)/gm)].map((m) => m[1]);
		const imported = new Set<string>();
		for (const item of items) {
			const m = /import\s*\{([^}]*)\}\s*from\s*"@\/lib\/icons"/.exec(item.files[0].content);
			for (const name of m?.[1].split(",") ?? []) if (name.trim()) imported.add(name.trim());
		}
		for (const name of imported) expect(exported).toContain(name);
		// Aliases pull in their targets: Loader2Icon = LoaderCircleIcon.
		expect(exported).toContain("LoaderCircleIcon");
		expect(exported.length).toBeLessThan(40);
		// Helpers no kept icon calls are dropped (strict `noUnusedLocals`).
		expect(icons).not.toMatch(/function _genericEl/);
	});

	it("subsetIcons rejects an icon that does not exist", () => {
		expect(() => subsetIcons(readFileSync(resolve(ROOT, "src/icons.ts"), "utf8"), ["NopeIcon"])).toThrow(/NopeIcon/);
	});

	it("stamps every item with the package version", () => {
		for (const item of items) expect(item.meta.version).toBe(pkg.version);
	});
});

// ---------------------------------------------------------------------------
// The built artifact must be what the source generates today.
// ---------------------------------------------------------------------------

const DIST = resolve(ROOT, "dist/registry");
const onCI = !!process.env.CI;

describe.skipIf(!existsSync(DIST) && !onCI)("registry: dist/registry is current", () => {
	it("matches a fresh generation byte for byte", () => {
		expect(existsSync(DIST), "dist/registry missing — run `npm run build`").toBe(true);
		for (const item of items) {
			const built = JSON.parse(readFileSync(resolve(DIST, `${item.name}.json`), "utf8"));
			expect(built, `${item.name}.json is stale — run \`npm run build:registry\``).toEqual(item);
		}
		expect(JSON.parse(readFileSync(resolve(DIST, "index.json"), "utf8"))).toEqual(index);
	});
});

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

describe("registry: CLI", () => {
	let work: string;
	let registry: string;

	const cli = (cwd: string, ...args: string[]) => {
		const r = spawnSync(process.execPath, [CLI, ...args, "--no-install", "--registry", registry], {
			cwd,
			encoding: "utf8",
			env: { ...process.env, NO_COLOR: "1" },
		});
		return { code: r.status, out: `${r.stdout}${r.stderr}` };
	};
	const project = (name: string, css = '@import "tailwindcss";\n') => {
		const dir = join(work, name);
		mkdirSync(join(dir, "src"), { recursive: true });
		writeFileSync(join(dir, "package.json"), JSON.stringify({ dependencies: { sibujs: "^4.0.0", clsx: "^2.0.0" } }));
		writeFileSync(join(dir, "src/app.css"), css);
		return dir;
	};
	const readIn = (dir: string, file: string) => readFileSync(join(dir, file), "utf8");

	beforeAll(() => {
		work = mkdtempSync(join(tmpdir(), "sibujs-ui-cli-"));
		registry = join(work, "registry");
		writeRegistry(registry);
	});
	afterAll(() => rmSync(work, { recursive: true, force: true }));

	it("init writes components.json, base styles and utils, and wires the stylesheet", () => {
		const dir = project("init");
		const { code, out } = cli(dir, "init", "--theme", "rose");
		expect(code, out).toBe(0);

		const config = JSON.parse(readIn(dir, "components.json"));
		expect(config.paths).toEqual({ ui: "src/components/ui", lib: "src/lib", styles: "src/styles/sibujs-ui" });
		expect(config.css).toBe("src/app.css");
		expect(readIn(dir, "src/lib/utils.ts")).toBe(byName.get("utils")!.files[0].content);
		expect(existsSync(join(dir, "src/styles/sibujs-ui/themes/rose.css"))).toBe(true);
		expect(readIn(dir, "src/app.css")).toBe(
			[
				'@import "tailwindcss";',
				'@import "./styles/sibujs-ui/base.css";',
				'@import "./styles/sibujs-ui/default.css";',
				'@import "./styles/sibujs-ui/themes/rose.css";',
				"",
			].join("\n"),
		);
		// Already-declared packages are not requested again.
		expect(out).toContain('tailwind-merge@');
		expect(out).not.toMatch(/install[^\n]*clsx/);
		// No tsconfig here, so the alias hint is printed.
		expect(out).toContain('"@/*" is not declared');
	});

	it("add installs the dependency closure and remaps aliases", () => {
		const dir = project("aliases");
		expect(cli(dir, "init").code).toBe(0);
		const config = JSON.parse(readIn(dir, "components.json"));
		config.aliases = { ui: "~/ui", lib: "#lib" };
		writeFileSync(join(dir, "components.json"), JSON.stringify(config));

		const { code, out } = cli(dir, "add", "dialog");
		expect(code, out).toBe(0);
		for (const file of ["ui/dialog.ts", "ui/button.ts", "lib/lifecycle.ts", "lib/scroll-lock.ts", "lib/icons.ts", "lib/types.ts"]) {
			const [dirName, base] = file.split("/");
			const path = dirName === "ui" ? `src/components/ui/${base}` : `src/lib/${base}`;
			expect(existsSync(join(dir, path)), path).toBe(true);
		}
		const dialog = readIn(dir, "src/components/ui/dialog.ts");
		expect(dialog).toContain('from "~/ui/button"');
		expect(dialog).toContain('from "#lib/utils"');
		expect(dialog).not.toContain("@/");
		// class-variance-authority comes in through button.
		expect(out).toContain("class-variance-authority@");
	});

	it("is idempotent, keeps local edits, and --overwrite replaces them", () => {
		const dir = project("edits");
		expect(cli(dir, "init").code).toBe(0);
		expect(cli(dir, "add", "button").code).toBe(0);

		const again = cli(dir, "add", "button");
		expect(again.out).toContain("unchanged src/components/ui/button.ts");
		expect(readIn(dir, "src/app.css").match(/base\.css/g)).toHaveLength(1);

		const file = join(dir, "src/components/ui/button.ts");
		writeFileSync(file, `${readFileSync(file, "utf8")}\nexport const local = 1;\n`);
		expect(cli(dir, "add", "button").out).toContain("skipped src/components/ui/button.ts");
		expect(readFileSync(file, "utf8")).toContain("export const local = 1;");

		const diff = cli(dir, "diff", "button");
		expect(diff.out).toContain("~ src/components/ui/button.ts");
		expect(diff.out).toContain("- export const local = 1;");

		expect(cli(dir, "add", "button", "--overwrite").out).toContain("wrote src/components/ui/button.ts");
		expect(readFileSync(file, "utf8")).not.toContain("local = 1");
		expect(cli(dir, "diff").out).not.toContain("~");
	});

	it("accepts a local icons file that already has every icon, whatever else it holds", () => {
		const dir = project("icons");
		expect(cli(dir, "init").code).toBe(0);
		expect(cli(dir, "add", "checkbox").code).toBe(0);
		const icons = join(dir, "src/lib/icons.ts");
		writeFileSync(icons, `${readFileSync(icons, "utf8")}\nexport function MyIcon() {}\n`);
		const out = cli(dir, "add", "select").out;
		expect(out).toContain("unchanged src/lib/icons.ts");
		expect(readFileSync(icons, "utf8")).toContain("MyIcon");

		writeFileSync(icons, "export function CheckIcon() {}\n");
		expect(cli(dir, "add", "select").out).toMatch(/icons\.ts is missing icons[^\n]*ChevronDownIcon/);
	});

	it("prints the @import lines when no stylesheet is configured", () => {
		const dir = join(work, "no-css");
		mkdirSync(dir);
		const { code, out } = cli(dir, "init");
		expect(code, out).toBe(0);
		expect(JSON.parse(readIn(dir, "components.json")).css).toBeNull();
		expect(out).toContain('@import "./styles/sibujs-ui/base.css";');
	});

	it("dry-run writes nothing; unknown items and missing config fail clearly", () => {
		const dir = project("dry");
		expect(cli(dir, "add", "button").out).toContain("Run `npx sibujs-ui init` first");
		expect(cli(dir, "init").code).toBe(0);
		const dry = cli(dir, "add", "card", "--dry-run");
		expect(dry.out).toContain("would write src/components/ui/card.ts");
		expect(existsSync(join(dir, "src/components/ui/card.ts"))).toBe(false);

		const unknown = cli(dir, "add", "nope");
		expect(unknown.code).toBe(1);
		expect(unknown.out).toContain('unknown item "nope"');
	});

	// -----------------------------------------------------------------------
	// Dependency installation, against fake package managers on PATH. Each
	// fake logs `{ pm, args, cwd }` and exits with FAKE_PM_EXIT, so these tests
	// see exactly which tool the CLI ran, where, and what it did on failure.
	// -----------------------------------------------------------------------

	const fakeBin = () => {
		const bin = join(work, "fake-bin");
		if (existsSync(bin)) return bin;
		mkdirSync(bin);
		writeFileSync(
			join(bin, "fake-pm.cjs"),
			[
				'const fs = require("fs");',
				"const call = { pm: process.argv[2], args: process.argv.slice(3), cwd: process.cwd() };",
				'fs.appendFileSync(process.env.FAKE_PM_LOG, JSON.stringify(call) + "\\n");',
				"process.exit(Number(process.env.FAKE_PM_EXIT || 0));",
				"",
			].join("\n"),
		);
		for (const pm of ["npm", "pnpm", "yarn", "bun"]) {
			writeFileSync(join(bin, `${pm}.cmd`), `@"${process.execPath}" "%~dp0fake-pm.cjs" ${pm} %*\r\n`);
			writeFileSync(join(bin, pm), `#!/bin/sh\nexec "${process.execPath}" "$(dirname "$0")/fake-pm.cjs" ${pm} "$@"\n`, {
				mode: 0o755,
			});
		}
		return bin;
	};

	/** Run the CLI WITH installation enabled, resolving package managers to the fakes. */
	const cliInstalling = (cwd: string, exitCode: number, ...args: string[]) => {
		const log = join(work, `pm-${Math.random().toString(36).slice(2)}.log`);
		writeFileSync(log, "");
		const env: Record<string, string | undefined> = { ...process.env, NO_COLOR: "1", FAKE_PM_LOG: log, FAKE_PM_EXIT: String(exitCode) };
		// Windows spells it `Path`; overwrite whichever key exists rather than
		// adding a second one the child may or may not read.
		const pathKey = Object.keys(env).find((k) => k.toUpperCase() === "PATH") ?? "PATH";
		env[pathKey] = [fakeBin(), env[pathKey]].join(process.platform === "win32" ? ";" : ":");
		const r = spawnSync(process.execPath, [CLI, ...args, "--registry", registry], { cwd, encoding: "utf8", env });
		const calls = readFileSync(log, "utf8")
			.split("\n")
			.filter(Boolean)
			.map((line) => JSON.parse(line) as { pm: string; args: string[]; cwd: string });
		return { code: r.status, out: `${r.stdout}${r.stderr}`, calls };
	};

	/** A repository root (`.git` bounds the lockfile search) containing `app/`. */
	const repo = (name: string, rootFiles: Record<string, string>, appPackage: object = {}) => {
		const root = join(work, name);
		mkdirSync(join(root, ".git"), { recursive: true });
		for (const [file, content] of Object.entries(rootFiles)) writeFileSync(join(root, file), content);
		const app = join(root, "packages/app");
		mkdirSync(join(app, "src"), { recursive: true });
		writeFileSync(join(app, "package.json"), JSON.stringify({ name: "app", ...appPackage }));
		expect(cli(app, "init").code).toBe(0);
		return app;
	};

	it("exits non-zero when dependency installation fails, after copying the files", () => {
		const dir = repo("install-fails", {});
		const { code, out, calls } = cliInstalling(dir, 1, "add", "button");
		expect(code, out).toBe(1);
		expect(calls.map((c) => c.pm)).toEqual(["npm", "npm"]);
		expect(out).toContain("error: dependency installation failed");
		expect(out).toMatch(/npm install [^\n]*class-variance-authority@[^\n]*\(exit code 1\)/);
		// The report still names what was written, so the user knows the state.
		expect(out).toContain("wrote src/components/ui/button.ts");
		expect(existsSync(join(dir, "src/components/ui/button.ts"))).toBe(true);
	});

	it("exits zero when installation succeeds, running in the project directory", () => {
		const dir = repo("install-ok", {});
		const { code, out, calls } = cliInstalling(dir, 0, "add", "button");
		expect(code, out).toBe(0);
		expect(calls).toHaveLength(2);
		expect(calls[0].args[0]).toBe("install");
		expect(calls[1].args.slice(0, 2)).toEqual(["install", "-D"]);
		for (const call of calls) expect(resolve(call.cwd)).toBe(resolve(dir));
	});

	it.each([
		["pnpm", "lockfile at the workspace root", { "pnpm-lock.yaml": "", "pnpm-workspace.yaml": "packages:\n  - packages/*\n" }, {}],
		["yarn", "lockfile at the workspace root", { "yarn.lock": "", "package.json": JSON.stringify({ workspaces: ["packages/*"] }) }, {}],
		["bun", "lockfile at the workspace root", { "bun.lock": "" }, {}],
		["pnpm", "packageManager beats a lockfile in the same directory", { "package.json": JSON.stringify({ packageManager: "pnpm@9.12.0" }), "package-lock.json": "{}" }, {}],
		["yarn", "the nearest signal wins", { "pnpm-lock.yaml": "" }, { packageManager: "yarn@4.5.0" }],
	])("installs with %s: %s", (expected, _case, rootFiles, appPackage) => {
		const dir = repo(`pm-${expected}-${Math.random().toString(36).slice(2, 8)}`, rootFiles, appPackage);
		const { code, out, calls } = cliInstalling(dir, 0, "add", "skeleton");
		expect(code, out).toBe(0);
		expect(calls.length).toBeGreaterThan(0);
		for (const call of calls) {
			expect(call.pm).toBe(expected);
			expect(call.args[0]).toBe("add");
			expect(resolve(call.cwd)).toBe(resolve(dir));
		}
		expect(existsSync(join(dir, "package-lock.json"))).toBe(false);
	});

	it("does not look past the repository root for a lockfile", () => {
		const outer = join(work, "outer");
		mkdirSync(outer, { recursive: true });
		writeFileSync(join(outer, "pnpm-lock.yaml"), "");
		const dir = join(outer, "inner");
		mkdirSync(join(dir, ".git"), { recursive: true });
		mkdirSync(join(dir, "src"));
		writeFileSync(join(dir, "package.json"), "{}");
		expect(cli(dir, "init").code).toBe(0);
		const { calls } = cliInstalling(dir, 0, "add", "skeleton");
		expect(calls.map((c) => c.pm)).toContain("npm");
		expect(calls.every((c) => c.pm === "npm")).toBe(true);
	});

	it("list shows components, library, styles and themes", () => {
		const { code, out } = cli(work, "list");
		expect(code).toBe(0);
		for (const heading of ["Components", "Library", "Styles", "Themes"]) expect(out).toContain(heading);
		expect(out).toMatch(/button\s+A button with variants and sizes\./);
	});
});
