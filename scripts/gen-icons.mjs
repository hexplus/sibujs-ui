/**
 * Generates src/icons.ts from the COMPLETE lucide icon set.
 * Run: node scripts/gen-icons.mjs
 */
import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const ICONS_DIR = "node_modules/lucide/dist/esm/icons";

/** kebab-case -> PascalCase, e.g. "arrow-left" -> "ArrowLeft" */
function toPascal(kebab) {
	return kebab.replace(/(^|-)([a-z0-9])/g, (_, __, c) => c.toUpperCase());
}

/** Generate code for a single SVG child element */
function genElement(el) {
	const [tag, attrs] = el;
	switch (tag) {
		case "path":
			return `\tpath(s, ${JSON.stringify(attrs.d)});`;
		case "circle":
			return `\tcircle(s, ${attrs.cx}, ${attrs.cy}, ${attrs.r}${hasExtra(attrs, ["cx", "cy", "r"]) ? `, ${JSON.stringify(filterAttrs(attrs, ["cx", "cy", "r"]))}` : ""});`;
		case "line":
			return `\tline(s, ${attrs.x1}, ${attrs.y1}, ${attrs.x2}, ${attrs.y2});`;
		case "polyline":
			return `\t_polyline(s, ${JSON.stringify(attrs.points)});`;
		case "rect":
			return `\trect(s, ${JSON.stringify(toStrRecord(attrs))});`;
		case "polygon":
			return `\tpolygon(s, ${JSON.stringify(attrs.points)});`;
		case "ellipse":
			return `\tellipse(s, ${JSON.stringify(toStrRecord(attrs))});`;
		default:
			return `\tgenericEl(s, ${JSON.stringify(tag)}, ${JSON.stringify(toStrRecord(attrs))});`;
	}
}

function hasExtra(attrs, exclude) {
	return Object.keys(attrs).some((k) => !exclude.includes(k));
}

function filterAttrs(attrs, exclude) {
	const r = {};
	for (const [k, v] of Object.entries(attrs))
		if (!exclude.includes(k)) r[k] = String(v);
	return r;
}

function toStrRecord(attrs) {
	const r = {};
	for (const [k, v] of Object.entries(attrs)) r[k] = String(v);
	return r;
}

async function loadIcon(filename) {
	try {
		const content = await readFile(join(ICONS_DIR, filename), "utf-8");
		const match = content.match(/const \w+ = (\[[\s\S]*?\]);/);
		if (!match) return null;
		return eval(match[1]);
	} catch {
		return null;
	}
}

async function main() {
	// List all icon files
	const files = (await readdir(ICONS_DIR))
		.filter((f) => f.endsWith(".js") && !f.endsWith(".map"))
		.sort();

	console.log(`Found ${files.length} lucide icon files`);

	const header = `/**
 * Complete lucide icon set — framework-agnostic inline SVG icon helpers.
 * Each function returns an SVGSVGElement with configurable size and class.
 * Auto-generated from lucide icon data (${files.length} icons). Do not edit manually.
 * Re-generate: node scripts/gen-icons.mjs
 */

const SVG_NS = "http://www.w3.org/2000/svg";

export interface IconProps {
\tclass?: string;
\tsize?: number;
\t"aria-hidden"?: string;
\t[attr: string]: unknown;
}

function createSvg(props: IconProps = {}): SVGSVGElement {
\tconst svg = document.createElementNS(SVG_NS, "svg");
\tconst size = props.size ?? 24;
\tsvg.setAttribute("xmlns", SVG_NS);
\tsvg.setAttribute("width", String(size));
\tsvg.setAttribute("height", String(size));
\tsvg.setAttribute("viewBox", "0 0 24 24");
\tsvg.setAttribute("fill", "none");
\tsvg.setAttribute("stroke", "currentColor");
\tsvg.setAttribute("stroke-width", "2");
\tsvg.setAttribute("stroke-linecap", "round");
\tsvg.setAttribute("stroke-linejoin", "round");
\tif (props.class) svg.setAttribute("class", props.class);
\tif (props["aria-hidden"]) svg.setAttribute("aria-hidden", props["aria-hidden"]);
\treturn svg;
}

function path(svg: SVGSVGElement, d: string): void {
\tconst p = document.createElementNS(SVG_NS, "path");
\tp.setAttribute("d", d);
\tsvg.appendChild(p);
}

function line(svg: SVGSVGElement, x1: number, y1: number, x2: number, y2: number): void {
\tconst l = document.createElementNS(SVG_NS, "line");
\tl.setAttribute("x1", String(x1));
\tl.setAttribute("y1", String(y1));
\tl.setAttribute("x2", String(x2));
\tl.setAttribute("y2", String(y2));
\tsvg.appendChild(l);
}

function _polyline(svg: SVGSVGElement, points: string): void {
\tconst p = document.createElementNS(SVG_NS, "polyline");
\tp.setAttribute("points", points);
\tsvg.appendChild(p);
}

function circle(svg: SVGSVGElement, cx: number, cy: number, r: number, attrs?: Record<string, string>): void {
\tconst c = document.createElementNS(SVG_NS, "circle");
\tc.setAttribute("cx", String(cx));
\tc.setAttribute("cy", String(cy));
\tc.setAttribute("r", String(r));
\tif (attrs) { for (const [k, v] of Object.entries(attrs)) c.setAttribute(k, v); }
\tsvg.appendChild(c);
}

function rect(svg: SVGSVGElement, attrs: Record<string, string>): void {
\tconst r = document.createElementNS(SVG_NS, "rect");
\tfor (const [k, v] of Object.entries(attrs)) r.setAttribute(k, v);
\tsvg.appendChild(r);
}

function polygon(svg: SVGSVGElement, points: string): void {
\tconst p = document.createElementNS(SVG_NS, "polygon");
\tp.setAttribute("points", points);
\tsvg.appendChild(p);
}

function ellipse(svg: SVGSVGElement, attrs: Record<string, string>): void {
\tconst e = document.createElementNS(SVG_NS, "ellipse");
\tfor (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
\tsvg.appendChild(e);
}

function genericEl(svg: SVGSVGElement, tag: string, attrs: Record<string, string>): void {
\tconst e = document.createElementNS(SVG_NS, tag);
\tfor (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
\tsvg.appendChild(e);
}
`;

	const lines = [header];
	let count = 0;
	let failed = 0;
	const names = new Set();

	for (const file of files) {
		const kebab = file.replace(".js", "");
		const pascal = toPascal(kebab);
		const fnName = `${pascal}Icon`;

		// Skip duplicates
		if (names.has(fnName)) continue;

		const data = await loadIcon(file);
		if (!data) {
			failed++;
			continue;
		}

		names.add(fnName);

		const elementLines = data.map((el) => genElement(el));

		lines.push(`export function ${fnName}(props?: IconProps): SVGSVGElement {`);
		lines.push(`\tconst s = createSvg(props);`);
		lines.push(elementLines.join("\n"));
		lines.push(`\treturn s;`);
		lines.push(`}\n`);
		count++;
	}

	// Add common aliases used by shadcn (old lucide names -> new names)
	const aliases = [
		["AlertTriangleIcon", "TriangleAlertIcon"],
		["ArrowLeftCircleIcon", "CircleArrowLeftIcon"],
		["CheckCircle2Icon", "CircleCheckBigIcon"],
		["HelpCircleIcon", "CircleQuestionMarkIcon"],
		["MoreHorizontalIcon", "EllipsisIcon"],
		["MoreVerticalIcon", "EllipsisVerticalIcon"],
		["PieChartIcon", "ChartPieIcon"],
		["UploadCloudIcon", "CloudUploadIcon"],
		["Loader2Icon", "LoaderCircleIcon"],
		["TerminalSquareIcon", "SquareTerminalIcon"],
		["VolumeXIcon", "VolumeOffIcon"],
	];

	lines.push("// ── Aliases (shadcn backward-compat names) ──\n");
	for (const [alias, target] of aliases) {
		if (names.has(alias)) continue; // Already generated natively
		if (!names.has(target)) continue; // Target doesn't exist
		lines.push(`export const ${alias} = ${target};\n`);
		names.add(alias);
		count++;
	}

	await writeFile("src/icons.ts", lines.join("\n"), "utf-8");
	console.log(`Generated ${count} icons (${failed} failed)`);
}

main().catch(console.error);
