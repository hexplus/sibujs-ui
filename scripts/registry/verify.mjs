#!/usr/bin/env node
/**
 * End-to-end check of the copy-paste flow, as a consumer experiences it.
 *
 *   npm run build:registry && npm run registry:verify
 *
 * 1. Creates a throwaway project with a strict, Vite-style tsconfig
 *    (`noUnusedLocals`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, no Node
 *    types) and a stylesheet that imports Tailwind.
 * 2. Runs the real CLI: `init --theme blue`, then `add --all`, against the
 *    built registry in dist/registry/.
 * 3. Type-checks every copied file with `tsc`.
 * 4. Compiles the project stylesheet with the Tailwind CLI and checks that the
 *    copied base stylesheet and component classes produced CSS.
 * 5. Bundles an entry that builds several components through the `@/` aliases
 *    and runs it in jsdom.
 *
 * The consumer's node_modules is a link to this package's, so nothing is
 * downloaded; `--no-install` keeps the CLI from touching it.
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { JSDOM } from "jsdom";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const REGISTRY = join(ROOT, "dist/registry");
const keep = process.argv.includes("--keep");

if (!existsSync(join(REGISTRY, "index.json"))) {
	console.error("dist/registry/ not found. Run `npm run build:registry` first.");
	process.exit(1);
}

const project = mkdtempSync(join(tmpdir(), "sibujs-ui-consumer-"));
const step = (label) => console.log(`\n▸ ${label}`);
const fail = (message) => {
	console.error(`\n✗ ${message}\n  project kept at ${project}`);
	process.exit(1);
};

/** Run a Node script inside the consumer project, echoing its output. */
function runNode(script, args) {
	const result = spawnSync(process.execPath, [script, ...args], { cwd: project, encoding: "utf8" });
	const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
	if (output) console.log(output.replace(/^/gm, "  "));
	if (result.status !== 0) fail(`${script} ${args.join(" ")} exited with ${result.status}`);
	return output;
}

try {
	step(`consumer project at ${project}`);
	writeFileSync(
		join(project, "package.json"),
		JSON.stringify({ name: "consumer", private: true, type: "module", dependencies: { sibujs: "*" } }, null, 2),
	);
	writeFileSync(
		join(project, "tsconfig.json"),
		JSON.stringify(
			{
				compilerOptions: {
					target: "ES2022",
					module: "ESNext",
					moduleResolution: "bundler",
					lib: ["ES2022", "DOM", "DOM.Iterable"],
					types: [],
					strict: true,
					noEmit: true,
					skipLibCheck: true,
					isolatedModules: true,
					verbatimModuleSyntax: true,
					erasableSyntaxOnly: true,
					noUnusedLocals: true,
					noUnusedParameters: true,
					noFallthroughCasesInSwitch: true,
					noUncheckedSideEffectImports: true,
					paths: { "@/*": ["./src/*"] },
				},
				include: ["src"],
			},
			null,
			2,
		),
	);
	mkdirSync(join(project, "src"));
	writeFileSync(join(project, "src/style.css"), '@import "tailwindcss";\n');
	symlinkSync(join(ROOT, "node_modules"), join(project, "node_modules"), "junction");

	const cli = join(ROOT, "bin/sibujs-ui.mjs");
	step("sibujs-ui init --theme blue");
	runNode(cli, ["init", "--theme", "blue", "--no-install", "--registry", REGISTRY]);
	step("sibujs-ui add --all");
	runNode(cli, ["add", "--all", "--no-install"]);

	writeFileSync(
		join(project, "src/main.ts"),
		`import { mount } from "sibujs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const app = Card({ class: cn("w-96", "bg-card") }, [
	CardHeader([CardTitle("Registry")]),
	CardContent([
		Button({ variant: "outline" }, "Click"),
		Checkbox(),
		Dialog([DialogTrigger("Open"), DialogContent([DialogTitle("Title")])]),
		Select([SelectTrigger(), SelectContent([SelectItem({ value: "a" }, "A")])]),
	]),
]);
mount(app, document.getElementById("app") as HTMLElement);
`,
	);

	step("tsc --noEmit (strict consumer tsconfig)");
	runNode(join(ROOT, "node_modules/typescript/bin/tsc"), ["-p", "tsconfig.json"]);

	step("tailwindcss compiles the project stylesheet");
	const css = readFileSync(join(project, "src/style.css"), "utf8");
	for (const expected of ["./styles/sibujs-ui/base.css", "./styles/sibujs-ui/default.css", "./styles/sibujs-ui/themes/blue.css"]) {
		if (!css.includes(`@import "${expected}";`)) fail(`src/style.css is missing @import "${expected}"`);
	}
	runNode(join(ROOT, "node_modules/@tailwindcss/cli/dist/index.mjs"), ["-i", "src/style.css", "-o", "out.css"]);
	const compiled = readFileSync(join(project, "out.css"), "utf8");
	for (const needle of [".bg-primary", "--primary: oklch(0.488", "animate-in", "[data-state=\"open\"]"]) {
		if (!compiled.includes(needle)) fail(`compiled CSS does not contain ${needle}`);
	}
	console.log(`  ${compiled.length} bytes of CSS`);

	step("bundle and run in jsdom");
	const bundle = await build({
		entryPoints: [join(project, "src/main.ts")],
		absWorkingDir: project,
		bundle: true,
		write: false,
		format: "iife",
		platform: "browser",
		define: { __SIBU_DEV__: "false" },
		logLevel: "warning",
	});
	const dom = new JSDOM('<!doctype html><div id="app"></div>', { runScripts: "outside-only" });
	dom.window.eval(bundle.outputFiles[0].text);
	const html = dom.window.document.getElementById("app").innerHTML;
	for (const slot of ["card", "button", "checkbox"]) {
		if (!html.includes(`data-slot="${slot}"`)) fail(`rendered markup has no data-slot="${slot}"`);
	}
	console.log(`  rendered ${html.length} characters of markup`);

	console.log("\n✓ registry verified: install, type-check, CSS and runtime");
} finally {
	if (!keep && process.exitCode !== 1) {
		// Remove the node_modules link on its own first, so the recursive delete
		// below can never descend into this package's real node_modules.
		unlinkSync(join(project, "node_modules"));
		rmSync(project, { recursive: true, force: true });
	} else {
		console.log(`project kept at ${project}`);
	}
}
