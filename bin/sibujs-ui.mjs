#!/usr/bin/env node
/**
 * sibujs-ui — copy components from the registry into your project.
 *
 *   npx sibujs-ui init                  create components.json, install base styles
 *   npx sibujs-ui add button dialog     copy components (and what they need)
 *   npx sibujs-ui list                  show available items
 *   npx sibujs-ui diff [names...]       compare installed files with the registry
 *
 * Zero dependencies on purpose: this runs through `npx` in projects that may
 * not have anything but SibuJS installed.
 *
 * The registry is read from, in order: `--registry <dir|url>`, the `registry`
 * key of components.json, and finally the registry bundled with this package
 * (`dist/registry/`), which is generated from the same source as the npm build.
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const CONFIG_FILE = "components.json";
const BUNDLED_REGISTRY = resolve(dirname(fileURLToPath(import.meta.url)), "../dist/registry");
const CANONICAL = { ui: "@/components/ui", lib: "@/lib" };

const HELP = `sibujs-ui — copy-paste components for SibuJS

Usage
  sibujs-ui init [--theme <color>] [--css <file>] [--force]
  sibujs-ui add <name...> [--all] [--overwrite] [--dry-run]
  sibujs-ui list
  sibujs-ui diff [name...]

Options
  --cwd <dir>         Project directory (default: current directory)
  --registry <src>    Registry directory or base URL (default: bundled registry)
  --no-install        Do not install npm dependencies; print them instead
  -h, --help          Show this help
`;

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

const color = (code) => (s) => (process.stdout.isTTY && !process.env.NO_COLOR ? `\x1b[${code}m${s}\x1b[0m` : s);
const green = color(32);
const yellow = color(33);
const red = color(31);
const dim = color(2);

class CliError extends Error {}

// ---------------------------------------------------------------------------
// Registry access
// ---------------------------------------------------------------------------

const isUrl = (s) => /^https?:\/\//.test(s);

function createRegistry(source) {
	const cache = new Map();
	const location = (file) => {
		if (source.includes("{name}")) return source.replace("{name}", file.replace(/\.json$/, ""));
		return isUrl(source) ? `${source.replace(/\/$/, "")}/${file}` : join(source, file);
	};
	const load = async (file) => {
		const where = location(file);
		if (isUrl(where)) {
			const res = await fetch(where);
			if (!res.ok) throw new CliError(`registry request failed: ${res.status} ${where}`);
			return res.json();
		}
		if (!existsSync(where)) {
			throw new CliError(
				where.startsWith(BUNDLED_REGISTRY)
					? `bundled registry not found at ${where}. Run \`npm run build\` in sibujs-ui, or pass --registry.`
					: `registry file not found: ${where}`,
			);
		}
		return JSON.parse(readFileSync(where, "utf8"));
	};
	return {
		source,
		index: () => load("index.json"),
		item(name) {
			if (!cache.has(name)) {
				cache.set(
					name,
					load(`${name}.json`).catch((err) => {
						throw err instanceof CliError && !source.includes("{name}")
							? new CliError(`unknown item "${name}" (${err.message}). Run \`sibujs-ui list\`.`)
							: err;
					}),
				);
			}
			return cache.get(name);
		},
	};
}

/** Items in install order: every registry dependency before its dependents. */
async function resolveTree(registry, names) {
	const ordered = [];
	const state = new Map();
	const visit = async (name, trail) => {
		if (state.get(name) === "done") return;
		if (state.get(name) === "visiting") throw new CliError(`dependency cycle: ${[...trail, name].join(" → ")}`);
		state.set(name, "visiting");
		const item = await registry.item(name);
		for (const dep of item.registryDependencies ?? []) await visit(dep, [...trail, name]);
		state.set(name, "done");
		ordered.push(item);
	};
	for (const name of names) await visit(name, []);
	return ordered;
}

// ---------------------------------------------------------------------------
// Project configuration
// ---------------------------------------------------------------------------

function readJson(file) {
	return JSON.parse(readFileSync(file, "utf8"));
}

function loadConfig(cwd) {
	const file = join(cwd, CONFIG_FILE);
	if (!existsSync(file)) {
		throw new CliError(`no ${CONFIG_FILE} in ${cwd}. Run \`npx sibujs-ui init\` first.`);
	}
	const config = readJson(file);
	for (const key of ["ui", "lib", "styles"]) {
		if (typeof config.paths?.[key] !== "string") throw new CliError(`${CONFIG_FILE}: "paths.${key}" is required`);
	}
	for (const key of ["ui", "lib"]) {
		if (typeof config.aliases?.[key] !== "string") throw new CliError(`${CONFIG_FILE}: "aliases.${key}" is required`);
	}
	return config;
}

function defaultConfig(cwd, cssFlag) {
	const base = existsSync(join(cwd, "src")) ? "src/" : "";
	const cssCandidates = [
		"src/style.css",
		"src/styles.css",
		"src/index.css",
		"src/main.css",
		"src/app.css",
		"src/styles/globals.css",
		"app/globals.css",
		"style.css",
	];
	const css = cssFlag ?? cssCandidates.find((f) => existsSync(join(cwd, f))) ?? null;
	return {
		$schema: "https://unpkg.com/sibujs-ui/dist/registry/schema/components.json",
		css,
		paths: {
			ui: `${base}components/ui`,
			lib: `${base}lib`,
			styles: `${base}styles/sibujs-ui`,
		},
		aliases: { ui: CANONICAL.ui, lib: CANONICAL.lib },
	};
}

/** Best-effort check that the `@/` alias the config uses is declared in tsconfig. */
function checkAliases(cwd, config) {
	const prefixes = new Set(Object.values(config.aliases).map((a) => a.split("/")[0]));
	const tsconfigs = ["tsconfig.json", "tsconfig.app.json"].map((f) => join(cwd, f)).filter(existsSync);
	const text = tsconfigs.map((f) => readFileSync(f, "utf8")).join("\n");
	for (const prefix of prefixes) {
		if (prefix.startsWith(".") || text.includes(`"${prefix}/*"`)) continue;
		const target = config.paths.lib.startsWith("src/") ? "./src/*" : "./*";
		console.log(
			yellow(`\n! The import alias "${prefix}/*" is not declared in your tsconfig.`) +
				`\n  Copied components import each other through it. Add:\n\n` +
				dim(`    "compilerOptions": { "paths": { "${prefix}/*": ["${target}"] } }\n`) +
				`\n  and the same alias in your bundler (Vite: resolve.alias { "${prefix}": "/${target.slice(2, -2)}" }).`,
		);
	}
}

// ---------------------------------------------------------------------------
// Installing files
// ---------------------------------------------------------------------------

/** Where a registry file lands, from the first segment of its registry path. */
function targetPath(cwd, config, file) {
	const [head, ...rest] = file.path.split("/");
	const dir = { ui: config.paths.ui, lib: config.paths.lib, styles: config.paths.styles }[head];
	if (!dir) throw new CliError(`cannot place registry file "${file.path}"`);
	const target = resolve(cwd, dir, ...rest);
	if (relative(cwd, target).startsWith("..")) throw new CliError(`refusing to write outside the project: ${target}`);
	return target;
}

/** Remap canonical aliases in a registry file to the project's aliases. */
function transform(content, file, config) {
	if (!file.path.endsWith(".ts")) return content;
	return content
		.replace(/(["'])@\/components\/ui\//g, `$1${config.aliases.ui}/`)
		.replace(/(["'])@\/lib\//g, `$1${config.aliases.lib}/`);
}

const exportedNames = (source) => new Set([...source.matchAll(/^export (?:function|const) (\w+)/gm)].map((m) => m[1]));

function writeItemFiles(cwd, config, item, flags, report) {
	for (const file of item.files) {
		const target = targetPath(cwd, config, file);
		const content = transform(file.content, file, config);
		const shown = relative(cwd, target).replaceAll("\\", "/");
		if (existsSync(target)) {
			const current = readFileSync(target, "utf8").replace(/\r\n/g, "\n");
			if (current === content) {
				report.unchanged.push(shown);
				continue;
			}
			if (!flags.overwrite) {
				// The icons file is shared by every component. A local copy that
				// already exports every icon this version needs is good enough, and
				// may hold icons the user added themselves.
				if (item.name === "icons") {
					const local = exportedNames(current);
					const missing = [...exportedNames(content)].filter((n) => !local.has(n));
					if (missing.length === 0) {
						report.unchanged.push(shown);
						continue;
					}
					report.warnings.push(
						`${shown} is missing icons this registry version uses: ${missing.join(", ")}. ` +
							"Merge them in, or re-run with --overwrite.",
					);
				}
				report.skipped.push(shown);
				continue;
			}
		}
		if (!flags["dry-run"]) {
			mkdirSync(dirname(target), { recursive: true });
			writeFileSync(target, content);
		}
		report.written.push(shown);
		report.installed.add(item.name);
	}
}

/** Add `@import` lines for style/theme items to the project stylesheet. */
function wireCss(cwd, config, items, flags, report) {
	const imports = items.flatMap((item) =>
		(item.css?.imports ?? []).map((file) => resolve(cwd, config.paths.styles, file)),
	);
	if (imports.length === 0) return;
	const lines = (fromDir) =>
		imports.map((abs) => {
			let rel = relative(fromDir, abs).replaceAll("\\", "/");
			if (!rel.startsWith(".")) rel = `./${rel}`;
			return `@import "${rel}";`;
		});

	const cssFile = config.css ? resolve(cwd, config.css) : null;
	if (!cssFile || !existsSync(cssFile)) {
		// Only worth repeating when this run actually wrote a stylesheet; every
		// `add` resolves `base`, and the reminder would otherwise print each time.
		if (!items.some((item) => item.css && report.installed.has(item.name))) return;
		report.notes.push(
			`Add to your main stylesheet, after @import "tailwindcss":\n${lines(cwd)
				.map((l) => `    ${l}`)
				.join("\n")}\n  (paths relative to the project root; set "css" in ${CONFIG_FILE} to do this automatically)`,
		);
		return;
	}

	let css = readFileSync(cssFile, "utf8");
	const missing = lines(dirname(cssFile)).filter((line) => !css.includes(line));
	if (missing.length === 0) return;
	if (!/@import\s+["']tailwindcss["']/.test(css)) {
		missing.unshift('@import "tailwindcss";');
	}
	const importLines = [...css.matchAll(/^@import[^\n]*$/gm)];
	if (importLines.length > 0) {
		const last = importLines[importLines.length - 1];
		const at = last.index + last[0].length;
		css = `${css.slice(0, at)}\n${missing.join("\n")}${css.slice(at)}`;
	} else {
		css = `${missing.join("\n")}\n\n${css}`;
	}
	if (!flags["dry-run"]) writeFileSync(cssFile, css);
	report.written.push(`${relative(cwd, cssFile).replaceAll("\\", "/")} (${missing.length} @import added)`);
}

// ---------------------------------------------------------------------------
// npm dependencies
// ---------------------------------------------------------------------------

function detectPackageManager(cwd) {
	if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
	if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
	if (existsSync(join(cwd, "bun.lock")) || existsSync(join(cwd, "bun.lockb"))) return "bun";
	return "npm";
}

/** Split `name@range` (the name may itself start with `@`). */
function splitDependency(spec) {
	const at = spec.indexOf("@", 1);
	return at === -1 ? [spec, ""] : [spec.slice(0, at), spec.slice(at + 1)];
}

function installDependencies(cwd, items, flags, report) {
	const pkgFile = join(cwd, "package.json");
	const pkg = existsSync(pkgFile) ? readJson(pkgFile) : {};
	const declared = new Set(
		Object.keys({ ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies }),
	);
	const collect = (key) => [
		...new Set(items.flatMap((i) => i[key] ?? []).filter((spec) => !declared.has(splitDependency(spec)[0]))),
	];
	const deps = collect("dependencies");
	const devDeps = collect("devDependencies");

	if (devDeps.some((d) => splitDependency(d)[0] === "tailwindcss")) {
		report.notes.push(
			"Tailwind CSS v4 also needs a build integration, e.g. `@tailwindcss/vite`: https://tailwindcss.com/docs/installation",
		);
	}
	if (deps.length === 0 && devDeps.length === 0) return;

	const pm = detectPackageManager(cwd);
	const commands = [];
	const addCmd = pm === "npm" ? "install" : "add";
	if (deps.length) commands.push([addCmd, ...deps]);
	if (devDeps.length) commands.push([addCmd, "-D", ...devDeps]);

	const quote = (arg) => (/[\s<>|&^]/.test(arg) ? `"${arg}"` : arg);
	for (const args of commands) {
		const printed = `${pm} ${args.map(quote).join(" ")}`;
		if (!flags.install || flags["dry-run"]) {
			report.notes.push(`Install dependencies: ${printed}`);
			continue;
		}
		console.log(dim(`$ ${printed}`));
		// Windows package managers are .cmd shims, which need a shell; hand it
		// one pre-quoted command line rather than an argument array.
		const result =
			process.platform === "win32"
				? spawnSync(printed, { cwd, stdio: "inherit", shell: true })
				: spawnSync(pm, args, { cwd, stdio: "inherit" });
		if (result.status !== 0) report.warnings.push(`dependency install failed; run it yourself: ${printed}`);
	}
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

function printReport(report, flags) {
	const prefix = flags["dry-run"] ? "would write" : "wrote";
	for (const f of report.written) console.log(`${green("✓")} ${prefix} ${f}`);
	for (const f of report.unchanged) console.log(dim(`= unchanged ${f}`));
	for (const f of report.skipped) console.log(`${yellow("•")} skipped ${f} ${dim("(exists and differs; --overwrite to replace)")}`);
	for (const w of report.warnings) console.log(yellow(`! ${w}`));
	for (const n of report.notes) console.log(`\n${n}`);
}

async function install(cwd, config, registry, names, flags) {
	const items = await resolveTree(registry, names);
	const report = { written: [], unchanged: [], skipped: [], warnings: [], notes: [], installed: new Set() };
	for (const item of items) writeItemFiles(cwd, config, item, flags, report);
	wireCss(cwd, config, items, flags, report);
	installDependencies(cwd, items, flags, report);
	printReport(report, flags);
	return items;
}

async function commandInit(cwd, flags) {
	const file = join(cwd, CONFIG_FILE);
	let config;
	if (existsSync(file) && !flags.force) {
		config = loadConfig(cwd);
		console.log(dim(`= ${CONFIG_FILE} exists; keeping it (--force to regenerate)`));
	} else {
		config = defaultConfig(cwd, flags.css);
		if (flags.registry) config.registry = flags.registry;
		if (!flags["dry-run"]) writeFileSync(file, `${JSON.stringify(config, null, 2)}\n`);
		console.log(`${green("✓")} ${flags["dry-run"] ? "would write" : "wrote"} ${CONFIG_FILE}`);
	}
	const registry = createRegistry(flags.registry ?? config.registry ?? BUNDLED_REGISTRY);
	const names = ["base", "utils"];
	if (flags.theme) names.push(`theme-${flags.theme}`);
	await install(cwd, config, registry, names, flags);
	checkAliases(cwd, config);
	console.log(`\nNext: ${green("npx sibujs-ui add button")}`);
}

async function commandAdd(cwd, names, flags) {
	const config = loadConfig(cwd);
	const registry = createRegistry(flags.registry ?? config.registry ?? BUNDLED_REGISTRY);
	if (flags.all) {
		const index = await registry.index();
		names = index.items.filter((i) => i.type === "registry:ui").map((i) => i.name);
	}
	if (names.length === 0) throw new CliError("nothing to add. Usage: sibujs-ui add <name...> (or --all)");
	await install(cwd, config, registry, names, flags);
}

async function commandList(cwd, flags) {
	const config = existsSync(join(cwd, CONFIG_FILE)) ? loadConfig(cwd) : {};
	const registry = createRegistry(flags.registry ?? config.registry ?? BUNDLED_REGISTRY);
	const index = await registry.index();
	console.log(`${index.name} ${index.version} ${dim(`(${registry.source})`)}`);
	const groups = [
		["Components", "registry:ui"],
		["Library", "registry:lib"],
		["Styles", "registry:style"],
		["Themes", "registry:theme"],
	];
	for (const [label, type] of groups) {
		const items = index.items.filter((i) => i.type === type);
		if (!items.length) continue;
		console.log(`\n${label}`);
		const width = Math.max(...items.map((i) => i.name.length));
		for (const i of items) console.log(`  ${i.name.padEnd(width)}  ${dim(i.description ?? "")}`);
	}
}

/** Minimal line diff (LCS) — enough to show what changed in one file. */
function lineDiff(a, b) {
	const x = a.split("\n");
	const y = b.split("\n");
	const n = x.length;
	const m = y.length;
	const lcs = new Uint32Array((n + 1) * (m + 1));
	for (let i = n - 1; i >= 0; i--) {
		for (let j = m - 1; j >= 0; j--) {
			lcs[i * (m + 1) + j] =
				x[i] === y[j] ? lcs[(i + 1) * (m + 1) + j + 1] + 1 : Math.max(lcs[(i + 1) * (m + 1) + j], lcs[i * (m + 1) + j + 1]);
		}
	}
	const out = [];
	let i = 0;
	let j = 0;
	while (i < n || j < m) {
		if (i < n && j < m && x[i] === y[j]) {
			i++;
			j++;
		} else if (j < m && (i === n || lcs[i * (m + 1) + j + 1] >= lcs[(i + 1) * (m + 1) + j])) {
			out.push(green(`+ ${y[j]}`) + dim(`  (${j + 1})`));
			j++;
		} else {
			out.push(red(`- ${x[i]}`) + dim(`  (${i + 1})`));
			i++;
		}
	}
	return out;
}

async function commandDiff(cwd, names, flags) {
	const config = loadConfig(cwd);
	const registry = createRegistry(flags.registry ?? config.registry ?? BUNDLED_REGISTRY);
	const explicit = names.length > 0;
	if (!explicit) names = (await registry.index()).items.map((i) => i.name);

	let changed = 0;
	for (const name of names) {
		const item = await registry.item(name);
		for (const file of item.files) {
			const target = targetPath(cwd, config, file);
			const shown = relative(cwd, target).replaceAll("\\", "/");
			if (!existsSync(target)) {
				if (explicit) console.log(`${yellow("?")} ${shown} ${dim("not installed")}`);
				continue;
			}
			const local = readFileSync(target, "utf8").replace(/\r\n/g, "\n");
			const upstream = transform(file.content, file, config);
			if (local === upstream) {
				console.log(dim(`= ${shown}`));
				continue;
			}
			changed++;
			console.log(`${yellow("~")} ${shown} ${dim(`differs from ${name}@${item.meta?.version ?? "registry"}`)}`);
			if (explicit) console.log(`${lineDiff(local, upstream).join("\n")}\n`);
		}
	}
	if (!explicit && changed) console.log(dim("\nRun `sibujs-ui diff <name>` to see the changes."));
}

// ---------------------------------------------------------------------------
// Entry
// ---------------------------------------------------------------------------

async function main(argv) {
	const { values: flags, positionals } = parseArgs({
		args: argv,
		allowPositionals: true,
		options: {
			cwd: { type: "string" },
			registry: { type: "string" },
			theme: { type: "string" },
			css: { type: "string" },
			all: { type: "boolean", default: false },
			overwrite: { type: "boolean", default: false },
			force: { type: "boolean", default: false },
			"dry-run": { type: "boolean", default: false },
			install: { type: "boolean", default: true },
			"no-install": { type: "boolean", default: false },
			help: { type: "boolean", short: "h", default: false },
		},
	});
	if (flags["no-install"]) flags.install = false;
	const [command, ...rest] = positionals;
	const cwd = resolve(flags.cwd ?? process.cwd());

	if (flags.help || !command) {
		console.log(HELP);
		return;
	}
	switch (command) {
		case "init":
			return commandInit(cwd, flags);
		case "add":
			return commandAdd(cwd, rest, flags);
		case "list":
			return commandList(cwd, flags);
		case "diff":
			return commandDiff(cwd, rest, flags);
		default:
			throw new CliError(`unknown command "${command}"\n\n${HELP}`);
	}
}

main(process.argv.slice(2)).catch((err) => {
	if (err instanceof CliError || err?.code?.startsWith?.("ERR_PARSE_ARGS")) {
		console.error(red(`error: ${err.message}`));
	} else {
		console.error(err);
	}
	process.exitCode = 1;
});
