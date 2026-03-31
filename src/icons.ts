/**
 * Complete lucide icon set — framework-agnostic inline SVG icon helpers.
 * Each function returns an SVGSVGElement with configurable size and class.
 * Auto-generated from lucide icon data (1694 icons). Do not edit manually.
 * Re-generate: node scripts/gen-icons.mjs
 *
 * Icon designs © Lucide Contributors — ISC License
 * https://github.com/lucide-icons/lucide/blob/main/LICENSE
 */

const SVG_NS = "http://www.w3.org/2000/svg";

export interface IconProps {
	class?: string;
	size?: number;
	"aria-hidden"?: string;
	[attr: string]: unknown;
}

function createSvg(props: IconProps = {}): SVGSVGElement {
	const svg = document.createElementNS(SVG_NS, "svg");
	const size = props.size ?? 24;
	svg.setAttribute("xmlns", SVG_NS);
	svg.setAttribute("width", String(size));
	svg.setAttribute("height", String(size));
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("fill", "none");
	svg.setAttribute("stroke", "currentColor");
	svg.setAttribute("stroke-width", "2");
	svg.setAttribute("stroke-linecap", "round");
	svg.setAttribute("stroke-linejoin", "round");
	if (props.class) svg.setAttribute("class", props.class);
	if (props["aria-hidden"])
		svg.setAttribute("aria-hidden", props["aria-hidden"]);
	return svg;
}

function path(svg: SVGSVGElement, d: string): void {
	const p = document.createElementNS(SVG_NS, "path");
	p.setAttribute("d", d);
	svg.appendChild(p);
}

function line(
	svg: SVGSVGElement,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
): void {
	const l = document.createElementNS(SVG_NS, "line");
	l.setAttribute("x1", String(x1));
	l.setAttribute("y1", String(y1));
	l.setAttribute("x2", String(x2));
	l.setAttribute("y2", String(y2));
	svg.appendChild(l);
}

function _polyline(svg: SVGSVGElement, points: string): void {
	const p = document.createElementNS(SVG_NS, "polyline");
	p.setAttribute("points", points);
	svg.appendChild(p);
}

function circle(
	svg: SVGSVGElement,
	cx: number,
	cy: number,
	r: number,
	attrs?: Record<string, string>,
): void {
	const c = document.createElementNS(SVG_NS, "circle");
	c.setAttribute("cx", String(cx));
	c.setAttribute("cy", String(cy));
	c.setAttribute("r", String(r));
	if (attrs) {
		for (const [k, v] of Object.entries(attrs)) c.setAttribute(k, v);
	}
	svg.appendChild(c);
}

function rect(svg: SVGSVGElement, attrs: Record<string, string>): void {
	const r = document.createElementNS(SVG_NS, "rect");
	for (const [k, v] of Object.entries(attrs)) r.setAttribute(k, v);
	svg.appendChild(r);
}

function polygon(svg: SVGSVGElement, points: string): void {
	const p = document.createElementNS(SVG_NS, "polygon");
	p.setAttribute("points", points);
	svg.appendChild(p);
}

function ellipse(svg: SVGSVGElement, attrs: Record<string, string>): void {
	const e = document.createElementNS(SVG_NS, "ellipse");
	for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
	svg.appendChild(e);
}

function _genericEl(
	svg: SVGSVGElement,
	tag: string,
	attrs: Record<string, string>,
): void {
	const e = document.createElementNS(SVG_NS, tag);
	for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
	svg.appendChild(e);
}

export function AArrowDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14 12 4 4 4-4");
	path(s, "M18 16V7");
	path(s, "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16");
	path(s, "M3.304 13h6.392");
	return s;
}

export function AArrowUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14 11 4-4 4 4");
	path(s, "M18 16V7");
	path(s, "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16");
	path(s, "M3.304 13h6.392");
	return s;
}

export function ALargeSmallIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16");
	path(s, "M15.697 14h5.606");
	path(s, "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16");
	path(s, "M3.304 13h6.392");
	return s;
}

export function AccessibilityIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 16, 4, 1);
	path(s, "m18 19 1-7-6 1");
	path(s, "m5 8 3-3 5.5 3-2.36 3.5");
	path(s, "M4.24 14.5a5 5 0 0 0 6.88 6");
	path(s, "M13.76 17.5a5 5 0 0 0-6.88-6");
	return s;
}

export function ActivityIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	);
	return s;
}

export function AirVentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 17.5a2.5 2.5 0 1 1-4 2.03V12");
	path(
		s,
		"M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
	);
	path(s, "M6 8h12");
	path(s, "M6.6 15.572A2 2 0 1 0 10 17v-5");
	return s;
}

export function AirplayIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1",
	);
	path(s, "m12 15 5 6H7Z");
	return s;
}

export function AlarmClockCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 13, 8);
	path(s, "M5 3 2 6");
	path(s, "m22 6-3-3");
	path(s, "M6.38 18.7 4 21");
	path(s, "M17.64 18.67 20 21");
	path(s, "m9 13 2 2 4-4");
	return s;
}

export function AlarmClockMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 13, 8);
	path(s, "M5 3 2 6");
	path(s, "m22 6-3-3");
	path(s, "M6.38 18.7 4 21");
	path(s, "M17.64 18.67 20 21");
	path(s, "M9 13h6");
	return s;
}

export function AlarmClockOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6.87 6.87a8 8 0 1 0 11.26 11.26");
	path(s, "M19.9 14.25a8 8 0 0 0-9.15-9.15");
	path(s, "m22 6-3-3");
	path(s, "M6.26 18.67 4 21");
	path(s, "m2 2 20 20");
	path(s, "M4 4 2 6");
	return s;
}

export function AlarmClockPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 13, 8);
	path(s, "M5 3 2 6");
	path(s, "m22 6-3-3");
	path(s, "M6.38 18.7 4 21");
	path(s, "M17.64 18.67 20 21");
	path(s, "M12 10v6");
	path(s, "M9 13h6");
	return s;
}

export function AlarmClockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 13, 8);
	path(s, "M12 9v4l2 2");
	path(s, "M5 3 2 6");
	path(s, "m22 6-3-3");
	path(s, "M6.38 18.7 4 21");
	path(s, "M17.64 18.67 20 21");
	return s;
}

export function AlarmSmokeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 21c0-2.5 2-2.5 2-5");
	path(s, "M16 21c0-2.5 2-2.5 2-5");
	path(s, "m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8");
	path(
		s,
		"M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z",
	);
	path(s, "M6 21c0-2.5 2-2.5 2-5");
	return s;
}

export function AlbumIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	_polyline(s, "11 3 11 11 14 8 17 11 17 3");
	return s;
}

export function AlignCenterHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 12h20");
	path(s, "M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4");
	path(s, "M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4");
	path(s, "M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1");
	path(s, "M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1");
	return s;
}

export function AlignCenterVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v20");
	path(s, "M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4");
	path(s, "M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4");
	path(s, "M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1");
	path(s, "M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1");
	return s;
}

export function AlignEndHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "6", height: "16", x: "4", y: "2", rx: "2" });
	rect(s, { width: "6", height: "9", x: "14", y: "9", rx: "2" });
	path(s, "M22 22H2");
	return s;
}

export function AlignEndVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "16", height: "6", x: "2", y: "4", rx: "2" });
	rect(s, { width: "9", height: "6", x: "9", y: "14", rx: "2" });
	path(s, "M22 22V2");
	return s;
}

export function AlignHorizontalDistributeCenterIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "6", height: "14", x: "4", y: "5", rx: "2" });
	rect(s, { width: "6", height: "10", x: "14", y: "7", rx: "2" });
	path(s, "M17 22v-5");
	path(s, "M17 7V2");
	path(s, "M7 22v-3");
	path(s, "M7 5V2");
	return s;
}

export function AlignHorizontalDistributeEndIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "6", height: "14", x: "4", y: "5", rx: "2" });
	rect(s, { width: "6", height: "10", x: "14", y: "7", rx: "2" });
	path(s, "M10 2v20");
	path(s, "M20 2v20");
	return s;
}

export function AlignHorizontalDistributeStartIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "6", height: "14", x: "4", y: "5", rx: "2" });
	rect(s, { width: "6", height: "10", x: "14", y: "7", rx: "2" });
	path(s, "M4 2v20");
	path(s, "M14 2v20");
	return s;
}

export function AlignHorizontalJustifyCenterIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "6", height: "14", x: "2", y: "5", rx: "2" });
	rect(s, { width: "6", height: "10", x: "16", y: "7", rx: "2" });
	path(s, "M12 2v20");
	return s;
}

export function AlignHorizontalJustifyEndIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "6", height: "14", x: "2", y: "5", rx: "2" });
	rect(s, { width: "6", height: "10", x: "12", y: "7", rx: "2" });
	path(s, "M22 2v20");
	return s;
}

export function AlignHorizontalJustifyStartIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "6", height: "14", x: "6", y: "5", rx: "2" });
	rect(s, { width: "6", height: "10", x: "16", y: "7", rx: "2" });
	path(s, "M2 2v20");
	return s;
}

export function AlignHorizontalSpaceAroundIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "6", height: "10", x: "9", y: "7", rx: "2" });
	path(s, "M4 22V2");
	path(s, "M20 22V2");
	return s;
}

export function AlignHorizontalSpaceBetweenIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "6", height: "14", x: "3", y: "5", rx: "2" });
	rect(s, { width: "6", height: "10", x: "15", y: "7", rx: "2" });
	path(s, "M3 2v20");
	path(s, "M21 2v20");
	return s;
}

export function AlignStartHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "6", height: "16", x: "4", y: "6", rx: "2" });
	rect(s, { width: "6", height: "9", x: "14", y: "6", rx: "2" });
	path(s, "M22 2H2");
	return s;
}

export function AlignStartVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "9", height: "6", x: "6", y: "14", rx: "2" });
	rect(s, { width: "16", height: "6", x: "6", y: "4", rx: "2" });
	path(s, "M2 2v20");
	return s;
}

export function AlignVerticalDistributeCenterIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 17h-3");
	path(s, "M22 7h-5");
	path(s, "M5 17H2");
	path(s, "M7 7H2");
	rect(s, { x: "5", y: "14", width: "14", height: "6", rx: "2" });
	rect(s, { x: "7", y: "4", width: "10", height: "6", rx: "2" });
	return s;
}

export function AlignVerticalDistributeEndIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "14", height: "6", x: "5", y: "14", rx: "2" });
	rect(s, { width: "10", height: "6", x: "7", y: "4", rx: "2" });
	path(s, "M2 20h20");
	path(s, "M2 10h20");
	return s;
}

export function AlignVerticalDistributeStartIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "14", height: "6", x: "5", y: "14", rx: "2" });
	rect(s, { width: "10", height: "6", x: "7", y: "4", rx: "2" });
	path(s, "M2 14h20");
	path(s, "M2 4h20");
	return s;
}

export function AlignVerticalJustifyCenterIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "14", height: "6", x: "5", y: "16", rx: "2" });
	rect(s, { width: "10", height: "6", x: "7", y: "2", rx: "2" });
	path(s, "M2 12h20");
	return s;
}

export function AlignVerticalJustifyEndIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "14", height: "6", x: "5", y: "12", rx: "2" });
	rect(s, { width: "10", height: "6", x: "7", y: "2", rx: "2" });
	path(s, "M2 22h20");
	return s;
}

export function AlignVerticalJustifyStartIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "14", height: "6", x: "5", y: "16", rx: "2" });
	rect(s, { width: "10", height: "6", x: "7", y: "6", rx: "2" });
	path(s, "M2 2h20");
	return s;
}

export function AlignVerticalSpaceAroundIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "10", height: "6", x: "7", y: "9", rx: "2" });
	path(s, "M22 20H2");
	path(s, "M22 4H2");
	return s;
}

export function AlignVerticalSpaceBetweenIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "14", height: "6", x: "5", y: "15", rx: "2" });
	rect(s, { width: "10", height: "6", x: "7", y: "3", rx: "2" });
	path(s, "M2 21h20");
	path(s, "M2 3h20");
	return s;
}

export function AmbulanceIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 10H6");
	path(s, "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2");
	path(
		s,
		"M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14",
	);
	path(s, "M8 8v4");
	path(s, "M9 18h6");
	circle(s, 17, 18, 2);
	circle(s, 7, 18, 2);
	return s;
}

export function AmpersandIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 12h3");
	path(
		s,
		"M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13",
	);
	return s;
}

export function AmpersandsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",
	);
	path(
		s,
		"M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",
	);
	return s;
}

export function AmphoraIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8");
	path(s, "M10 5H8a2 2 0 0 0 0 4h.68");
	path(s, "M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8");
	path(s, "M14 5h2a2 2 0 0 1 0 4h-.68");
	path(s, "M18 22H6");
	path(s, "M9 2h6");
	return s;
}

export function AnchorIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6v16");
	path(s, "m19 13 2-1a9 9 0 0 1-18 0l2 1");
	path(s, "M9 11h6");
	circle(s, 12, 4, 2);
	return s;
}

export function AngryIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M16 16s-1.5-2-4-2-4 2-4 2");
	path(s, "M7.5 8 10 9");
	path(s, "m14 9 2.5-1");
	path(s, "M9 10h.01");
	path(s, "M15 10h.01");
	return s;
}

export function AnnoyedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M8 15h8");
	path(s, "M8 9h2");
	path(s, "M14 9h2");
	return s;
}

export function AntennaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 12 7 2");
	path(s, "m7 12 5-10");
	path(s, "m12 12 5-10");
	path(s, "m17 12 5-10");
	path(s, "M4.5 7h15");
	path(s, "M12 16v6");
	return s;
}

export function AnvilIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4");
	path(s, "M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z");
	path(s, "M9 12v5");
	path(s, "M15 12v5");
	path(s, "M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1");
	return s;
}

export function ApertureIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m14.31 8 5.74 9.94");
	path(s, "M9.69 8h11.48");
	path(s, "m7.38 12 5.74-9.94");
	path(s, "M9.69 16 3.95 6.06");
	path(s, "M14.31 16H2.83");
	path(s, "m16.62 12-5.74 9.94");
	return s;
}

export function AppWindowMacIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "16", x: "2", y: "4", rx: "2" });
	path(s, "M6 8h.01");
	path(s, "M10 8h.01");
	path(s, "M14 8h.01");
	return s;
}

export function AppWindowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { x: "2", y: "4", width: "20", height: "16", rx: "2" });
	path(s, "M10 4v4");
	path(s, "M2 8h20");
	path(s, "M6 4v4");
	return s;
}

export function AppleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6.528V3a1 1 0 0 1 1-1h0");
	path(
		s,
		"M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",
	);
	return s;
}

export function ArchiveRestoreIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "5", x: "2", y: "3", rx: "1" });
	path(s, "M4 8v11a2 2 0 0 0 2 2h2");
	path(s, "M20 8v11a2 2 0 0 1-2 2h-2");
	path(s, "m9 15 3-3 3 3");
	path(s, "M12 12v9");
	return s;
}

export function ArchiveXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "5", x: "2", y: "3", rx: "1" });
	path(s, "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8");
	path(s, "m9.5 17 5-5");
	path(s, "m9.5 12 5 5");
	return s;
}

export function ArchiveIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "5", x: "2", y: "3", rx: "1" });
	path(s, "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8");
	path(s, "M10 12h4");
	return s;
}

export function ArmchairIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3");
	path(
		s,
		"M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
	);
	path(s, "M5 18v2");
	path(s, "M19 18v2");
	return s;
}

export function ArrowBigDownDashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z",
	);
	path(s, "M9 4h6");
	return s;
}

export function ArrowBigDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z",
	);
	return s;
}

export function ArrowBigLeftDashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13 9a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707l6.94 6.94a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z",
	);
	path(s, "M20 9v6");
	return s;
}

export function ArrowBigLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.793 19.793a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707z",
	);
	return s;
}

export function ArrowBigRightDashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 9a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707l-6.94 6.94a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",
	);
	path(s, "M4 9v6");
	return s;
}

export function ArrowBigRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z",
	);
	return s;
}

export function ArrowBigUpDashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14 16a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-6.939-6.939a1.207 1.207 0 0 0-1.708 0l-6.94 6.94a.707.707 0 0 0 .5 1.206H8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1z",
	);
	path(s, "M9 20h6");
	return s;
}

export function ArrowBigUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z",
	);
	return s;
}

export function ArrowDown01Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 16 4 4 4-4");
	path(s, "M7 20V4");
	rect(s, { x: "15", y: "4", width: "4", height: "6", ry: "2" });
	path(s, "M17 20v-6h-2");
	path(s, "M15 20h4");
	return s;
}

export function ArrowDown10Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 16 4 4 4-4");
	path(s, "M7 20V4");
	path(s, "M17 10V4h-2");
	path(s, "M15 10h4");
	rect(s, { x: "15", y: "14", width: "4", height: "6", ry: "2" });
	return s;
}

export function ArrowDownAZIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 16 4 4 4-4");
	path(s, "M7 20V4");
	path(s, "M20 8h-5");
	path(s, "M15 10V6.5a2.5 2.5 0 0 1 5 0V10");
	path(s, "M15 14h5l-5 6h5");
	return s;
}

export function ArrowDownFromLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19 3H5");
	path(s, "M12 21V7");
	path(s, "m6 15 6 6 6-6");
	return s;
}

export function ArrowDownLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 7 7 17");
	path(s, "M17 17H7V7");
	return s;
}

export function ArrowDownNarrowWideIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 16 4 4 4-4");
	path(s, "M7 20V4");
	path(s, "M11 4h4");
	path(s, "M11 8h7");
	path(s, "M11 12h10");
	return s;
}

export function ArrowDownRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m7 7 10 10");
	path(s, "M17 7v10H7");
	return s;
}

export function ArrowDownToDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v14");
	path(s, "m19 9-7 7-7-7");
	circle(s, 12, 21, 1);
	return s;
}

export function ArrowDownToLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 17V3");
	path(s, "m6 11 6 6 6-6");
	path(s, "M19 21H5");
	return s;
}

export function ArrowDownUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 16 4 4 4-4");
	path(s, "M7 20V4");
	path(s, "m21 8-4-4-4 4");
	path(s, "M17 4v16");
	return s;
}

export function ArrowDownWideNarrowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 16 4 4 4-4");
	path(s, "M7 20V4");
	path(s, "M11 4h10");
	path(s, "M11 8h7");
	path(s, "M11 12h4");
	return s;
}

export function ArrowDownZAIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 16 4 4 4-4");
	path(s, "M7 4v16");
	path(s, "M15 4h5l-5 6h5");
	path(s, "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20");
	path(s, "M20 18h-5");
	return s;
}

export function ArrowDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 5v14");
	path(s, "m19 12-7 7-7-7");
	return s;
}

export function ArrowLeftFromLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m9 6-6 6 6 6");
	path(s, "M3 12h14");
	path(s, "M21 19V5");
	return s;
}

export function ArrowLeftRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 3 4 7l4 4");
	path(s, "M4 7h16");
	path(s, "m16 21 4-4-4-4");
	path(s, "M20 17H4");
	return s;
}

export function ArrowLeftToLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 19V5");
	path(s, "m13 6-6 6 6 6");
	path(s, "M7 12h14");
	return s;
}

export function ArrowLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m12 19-7-7 7-7");
	path(s, "M19 12H5");
	return s;
}

export function ArrowRightFromLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 5v14");
	path(s, "M21 12H7");
	path(s, "m15 18 6-6-6-6");
	return s;
}

export function ArrowRightLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 3 4 4-4 4");
	path(s, "M20 7H4");
	path(s, "m8 21-4-4 4-4");
	path(s, "M4 17h16");
	return s;
}

export function ArrowRightToLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 12H3");
	path(s, "m11 18 6-6-6-6");
	path(s, "M21 5v14");
	return s;
}

export function ArrowRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 12h14");
	path(s, "m12 5 7 7-7 7");
	return s;
}

export function ArrowUp01Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 8 4-4 4 4");
	path(s, "M7 4v16");
	rect(s, { x: "15", y: "4", width: "4", height: "6", ry: "2" });
	path(s, "M17 20v-6h-2");
	path(s, "M15 20h4");
	return s;
}

export function ArrowUp10Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 8 4-4 4 4");
	path(s, "M7 4v16");
	path(s, "M17 10V4h-2");
	path(s, "M15 10h4");
	rect(s, { x: "15", y: "14", width: "4", height: "6", ry: "2" });
	return s;
}

export function ArrowUpAZIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 8 4-4 4 4");
	path(s, "M7 4v16");
	path(s, "M20 8h-5");
	path(s, "M15 10V6.5a2.5 2.5 0 0 1 5 0V10");
	path(s, "M15 14h5l-5 6h5");
	return s;
}

export function ArrowUpDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m21 16-4 4-4-4");
	path(s, "M17 20V4");
	path(s, "m3 8 4-4 4 4");
	path(s, "M7 4v16");
	return s;
}

export function ArrowUpFromDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m5 9 7-7 7 7");
	path(s, "M12 16V2");
	circle(s, 12, 21, 1);
	return s;
}

export function ArrowUpFromLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m18 9-6-6-6 6");
	path(s, "M12 3v14");
	path(s, "M5 21h14");
	return s;
}

export function ArrowUpLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7 17V7h10");
	path(s, "M17 17 7 7");
	return s;
}

export function ArrowUpNarrowWideIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 8 4-4 4 4");
	path(s, "M7 4v16");
	path(s, "M11 12h4");
	path(s, "M11 16h7");
	path(s, "M11 20h10");
	return s;
}

export function ArrowUpRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7 7h10v10");
	path(s, "M7 17 17 7");
	return s;
}

export function ArrowUpToLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 3h14");
	path(s, "m18 13-6-6-6 6");
	path(s, "M12 7v14");
	return s;
}

export function ArrowUpWideNarrowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 8 4-4 4 4");
	path(s, "M7 4v16");
	path(s, "M11 12h10");
	path(s, "M11 16h7");
	path(s, "M11 20h4");
	return s;
}

export function ArrowUpZAIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 8 4-4 4 4");
	path(s, "M7 4v16");
	path(s, "M15 4h5l-5 6h5");
	path(s, "M15 20v-3.5a2.5 2.5 0 0 1 5 0V20");
	path(s, "M20 18h-5");
	return s;
}

export function ArrowUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m5 12 7-7 7 7");
	path(s, "M12 19V5");
	return s;
}

export function ArrowsUpFromLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m4 6 3-3 3 3");
	path(s, "M7 17V3");
	path(s, "m14 6 3-3 3 3");
	path(s, "M17 17V3");
	path(s, "M4 21h16");
	return s;
}

export function AsteriskIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6v12");
	path(s, "M17.196 9 6.804 15");
	path(s, "m6.804 9 10.392 6");
	return s;
}

export function AtSignIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 4);
	path(s, "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8");
	return s;
}

export function AtomIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 1);
	path(
		s,
		"M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z",
	);
	path(
		s,
		"M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z",
	);
	return s;
}

export function AudioLinesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 10v3");
	path(s, "M6 6v11");
	path(s, "M10 3v18");
	path(s, "M14 8v7");
	path(s, "M18 5v13");
	path(s, "M22 10v3");
	return s;
}

export function AudioWaveformIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2",
	);
	return s;
}

export function AwardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
	);
	circle(s, 12, 8, 6);
	return s;
}

export function AxeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9");
	path(
		s,
		"M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z",
	);
	return s;
}

export function Axis3dIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13.5 10.5 15 9");
	path(s, "M4 4v15a1 1 0 0 0 1 1h15");
	path(s, "M4.293 19.707 6 18");
	path(s, "m9 15 1.5-1.5");
	return s;
}

export function BabyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5");
	path(s, "M15 12h.01");
	path(
		s,
		"M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
	);
	path(s, "M9 12h.01");
	return s;
}

export function BackpackIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
	);
	path(s, "M8 10h8");
	path(s, "M8 18h8");
	path(s, "M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6");
	path(s, "M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2");
	return s;
}

export function BadgeAlertIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	line(s, 12, 8, 12, 12);
	line(s, 12, 16, 12.01, 16);
	return s;
}

export function BadgeCentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	path(s, "M12 7v10");
	path(s, "M15.4 10a4 4 0 1 0 0 4");
	return s;
}

export function BadgeCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	path(s, "m9 12 2 2 4-4");
	return s;
}

export function BadgeDollarSignIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	path(s, "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8");
	path(s, "M12 18V6");
	return s;
}

export function BadgeEuroIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	path(s, "M7 12h5");
	path(s, "M15 9.4a4 4 0 1 0 0 5.2");
	return s;
}

export function BadgeIndianRupeeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	path(s, "M8 8h8");
	path(s, "M8 12h8");
	path(s, "m13 17-5-1h1a4 4 0 0 0 0-8");
	return s;
}

export function BadgeInfoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	line(s, 12, 16, 12, 12);
	line(s, 12, 8, 12.01, 8);
	return s;
}

export function BadgeJapaneseYenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	path(s, "m9 8 3 3v7");
	path(s, "m12 11 3-3");
	path(s, "M9 12h6");
	path(s, "M9 16h6");
	return s;
}

export function BadgeMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	line(s, 8, 12, 16, 12);
	return s;
}

export function BadgePercentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	path(s, "m15 9-6 6");
	path(s, "M9 9h.01");
	path(s, "M15 15h.01");
	return s;
}

export function BadgePlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	line(s, 12, 8, 12, 16);
	line(s, 8, 12, 16, 12);
	return s;
}

export function BadgePoundSterlingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	path(s, "M8 12h4");
	path(s, "M10 16V9.5a2.5 2.5 0 0 1 5 0");
	path(s, "M8 16h7");
	return s;
}

export function BadgeQuestionMarkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	path(s, "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3");
	line(s, 12, 17, 12.01, 17);
	return s;
}

export function BadgeRussianRubleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	path(s, "M9 16h5");
	path(s, "M9 12h5a2 2 0 1 0 0-4h-3v9");
	return s;
}

export function BadgeSwissFrancIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	path(s, "M11 17V8h4");
	path(s, "M11 12h3");
	path(s, "M9 16h4");
	return s;
}

export function BadgeTurkishLiraIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 7v10a5 5 0 0 0 5-5");
	path(s, "m15 8-6 3");
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76",
	);
	return s;
}

export function BadgeXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	line(s, 15, 9, 9, 15);
	line(s, 9, 9, 15, 15);
	return s;
}

export function BadgeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
	);
	return s;
}

export function BaggageClaimIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2");
	path(s, "M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10");
	rect(s, { width: "13", height: "8", x: "8", y: "6", rx: "1" });
	circle(s, 18, 20, 2);
	circle(s, 9, 20, 2);
	return s;
}

export function BalloonIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1");
	path(s, "M12 6a2 2 0 0 1 2 2");
	path(s, "M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0");
	return s;
}

export function BanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M4.929 4.929 19.07 19.071");
	return s;
}

export function BananaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5");
	path(
		s,
		"M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z",
	);
	return s;
}

export function BandageIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 10.01h.01");
	path(s, "M10 14.01h.01");
	path(s, "M14 10.01h.01");
	path(s, "M14 14.01h.01");
	path(s, "M18 6v12");
	path(s, "M6 6v12");
	rect(s, { x: "2", y: "6", width: "20", height: "12", rx: "2" });
	return s;
}

export function BanknoteArrowDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5");
	path(s, "m16 19 3 3 3-3");
	path(s, "M18 12h.01");
	path(s, "M19 16v6");
	path(s, "M6 12h.01");
	circle(s, 12, 12, 2);
	return s;
}

export function BanknoteArrowUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5");
	path(s, "M18 12h.01");
	path(s, "M19 22v-6");
	path(s, "m22 19-3-3-3 3");
	path(s, "M6 12h.01");
	circle(s, 12, 12, 2);
	return s;
}

export function BanknoteXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5");
	path(s, "m17 17 5 5");
	path(s, "M18 12h.01");
	path(s, "m22 17-5 5");
	path(s, "M6 12h.01");
	circle(s, 12, 12, 2);
	return s;
}

export function BanknoteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "12", x: "2", y: "6", rx: "2" });
	circle(s, 12, 12, 2);
	path(s, "M6 12h.01M18 12h.01");
	return s;
}

export function BarcodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 5v14");
	path(s, "M8 5v14");
	path(s, "M12 5v14");
	path(s, "M17 5v14");
	path(s, "M21 5v14");
	return s;
}

export function BarrelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 3a41 41 0 0 0 0 18");
	path(s, "M14 3a41 41 0 0 1 0 18");
	path(
		s,
		"M17 3a2 2 0 0 1 1.68.92 15.25 15.25 0 0 1 0 16.16A2 2 0 0 1 17 21H7a2 2 0 0 1-1.68-.92 15.25 15.25 0 0 1 0-16.16A2 2 0 0 1 7 3z",
	);
	path(s, "M3.84 17h16.32");
	path(s, "M3.84 7h16.32");
	return s;
}

export function BaselineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 20h16");
	path(s, "m6 16 6-12 6 12");
	path(s, "M8 12h8");
	return s;
}

export function BathIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 4 8 6");
	path(s, "M17 19v2");
	path(s, "M2 12h20");
	path(s, "M7 19v2");
	path(
		s,
		"M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",
	);
	return s;
}

export function BatteryChargingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m11 7-3 5h4l-3 5");
	path(s, "M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935");
	path(s, "M22 14v-4");
	path(s, "M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936");
	return s;
}

export function BatteryFullIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 10v4");
	path(s, "M14 10v4");
	path(s, "M22 14v-4");
	path(s, "M6 10v4");
	rect(s, { x: "2", y: "6", width: "16", height: "12", rx: "2" });
	return s;
}

export function BatteryLowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 14v-4");
	path(s, "M6 14v-4");
	rect(s, { x: "2", y: "6", width: "16", height: "12", rx: "2" });
	return s;
}

export function BatteryMediumIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 14v-4");
	path(s, "M22 14v-4");
	path(s, "M6 14v-4");
	rect(s, { x: "2", y: "6", width: "16", height: "12", rx: "2" });
	return s;
}

export function BatteryPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 9v6");
	path(s, "M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605");
	path(s, "M22 14v-4");
	path(s, "M7 12h6");
	path(s, "M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606");
	return s;
}

export function BatteryWarningIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 17h.01");
	path(s, "M10 7v6");
	path(s, "M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2");
	path(s, "M22 14v-4");
	path(s, "M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2");
	return s;
}

export function BatteryIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M 22 14 L 22 10");
	rect(s, { x: "2", y: "6", width: "16", height: "12", rx: "2" });
	return s;
}

export function BeakerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4.5 3h15");
	path(s, "M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3");
	path(s, "M6 14h12");
	return s;
}

export function BeanOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1",
	);
	path(s, "M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66");
	path(
		s,
		"M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04",
	);
	line(s, 2, 2, 22, 22);
	return s;
}

export function BeanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z",
	);
	path(s, "M5.341 10.62a4 4 0 1 0 5.279-5.28");
	return s;
}

export function BedDoubleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8");
	path(s, "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4");
	path(s, "M12 4v6");
	path(s, "M2 18h20");
	return s;
}

export function BedSingleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8");
	path(s, "M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4");
	path(s, "M3 18h18");
	return s;
}

export function BedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 4v16");
	path(s, "M2 8h18a2 2 0 0 1 2 2v10");
	path(s, "M2 17h20");
	path(s, "M6 8v9");
	return s;
}

export function BeefOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11.771 6.109a2.5 2.5 0 0 1 3.12 3.12");
	path(s, "M17.852 12.185a6.5 6.5 0 0 0-9.035-9.04");
	path(
		s,
		"M18.013 18.013C15.029 20.349 10.831 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5",
	);
	path(s, "m18.5 6 2.19 4.5a6.48 6.48 0 0 1-.139 4.393");
	path(s, "m2 2 20 20");
	path(
		s,
		"M6.355 6.37a7 7 0 0 0-.075.23c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c3.356 0 6.993-1.267 9.85-3.151",
	);
	return s;
}

export function BeefIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3",
	);
	path(
		s,
		"m18.5 6 2.19 4.5a6.48 6.48 0 0 1-2.29 7.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5",
	);
	circle(s, 12.5, 8.5, 2.5);
	return s;
}

export function BeerOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 13v5");
	path(s, "M17 11.47V8");
	path(s, "M17 11h1a3 3 0 0 1 2.745 4.211");
	path(s, "m2 2 20 20");
	path(s, "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3");
	path(s, "M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268");
	path(
		s,
		"M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12",
	);
	path(s, "M9 14.6V18");
	return s;
}

export function BeerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 11h1a3 3 0 0 1 0 6h-1");
	path(s, "M9 12v6");
	path(s, "M13 12v6");
	path(
		s,
		"M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z",
	);
	path(s, "M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8");
	return s;
}

export function BellDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.268 21a2 2 0 0 0 3.464 0");
	path(
		s,
		"M11.68 2.009A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673c-.824-.85-1.678-1.731-2.21-3.348",
	);
	circle(s, 18, 5, 3);
	return s;
}

export function BellElectricIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18.518 17.347A7 7 0 0 1 14 19");
	path(s, "M18.8 4A11 11 0 0 1 20 9");
	path(s, "M9 9h.01");
	circle(s, 20, 16, 2);
	circle(s, 9, 9, 7);
	rect(s, { x: "4", y: "16", width: "10", height: "6", rx: "2" });
	return s;
}

export function BellMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.268 21a2 2 0 0 0 3.464 0");
	path(s, "M15 8h6");
	path(
		s,
		"M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12",
	);
	return s;
}

export function BellOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.268 21a2 2 0 0 0 3.464 0");
	path(
		s,
		"M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
	);
	path(s, "m2 2 20 20");
	path(s, "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05");
	return s;
}

export function BellPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.268 21a2 2 0 0 0 3.464 0");
	path(s, "M15 8h6");
	path(s, "M18 5v6");
	path(
		s,
		"M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332",
	);
	return s;
}

export function BellRingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.268 21a2 2 0 0 0 3.464 0");
	path(s, "M22 8c0-2.3-.8-4.3-2-6");
	path(
		s,
		"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	);
	path(s, "M4 2C2.8 3.7 2 5.7 2 8");
	return s;
}

export function BellIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.268 21a2 2 0 0 0 3.464 0");
	path(
		s,
		"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	);
	return s;
}

export function BetweenHorizontalEndIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "13", height: "7", x: "3", y: "3", rx: "1" });
	path(s, "m22 15-3-3 3-3");
	rect(s, { width: "13", height: "7", x: "3", y: "14", rx: "1" });
	return s;
}

export function BetweenHorizontalStartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "13", height: "7", x: "8", y: "3", rx: "1" });
	path(s, "m2 9 3 3-3 3");
	rect(s, { width: "13", height: "7", x: "8", y: "14", rx: "1" });
	return s;
}

export function BetweenVerticalEndIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "7", height: "13", x: "3", y: "3", rx: "1" });
	path(s, "m9 22 3-3 3 3");
	rect(s, { width: "7", height: "13", x: "14", y: "3", rx: "1" });
	return s;
}

export function BetweenVerticalStartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "7", height: "13", x: "3", y: "8", rx: "1" });
	path(s, "m15 2-3 3-3-3");
	rect(s, { width: "7", height: "13", x: "14", y: "8", rx: "1" });
	return s;
}

export function BicepsFlexedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1",
	);
	path(s, "M15 14a5 5 0 0 0-7.584 2");
	path(s, "M9.964 6.825C8.019 7.977 9.5 13 8 15");
	return s;
}

export function BikeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 18.5, 17.5, 3.5);
	circle(s, 5.5, 17.5, 3.5);
	circle(s, 15, 5, 1);
	path(s, "M12 17.5V14l-3-3 4-3 2 3h2");
	return s;
}

export function BinaryIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { x: "14", y: "14", width: "4", height: "6", rx: "2" });
	rect(s, { x: "6", y: "4", width: "4", height: "6", rx: "2" });
	path(s, "M6 20h4");
	path(s, "M14 10h4");
	path(s, "M6 14h2v6");
	path(s, "M14 4h2v6");
	return s;
}

export function BinocularsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 10h4");
	path(s, "M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3");
	path(
		s,
		"M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z",
	);
	path(s, "M 22 16 L 2 16");
	path(
		s,
		"M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z",
	);
	path(s, "M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3");
	return s;
}

export function BiohazardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 11.9, 2);
	path(s, "M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6");
	path(s, "m8.9 10.1 1.4.8");
	path(s, "M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5");
	path(s, "m15.1 10.1-1.4.8");
	path(s, "M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2");
	path(s, "M12 13.9v1.6");
	path(s, "M13.5 5.4c-1-.2-2-.2-3 0");
	path(s, "M17 16.4c.7-.7 1.2-1.6 1.5-2.5");
	path(s, "M5.5 13.9c.3.9.8 1.8 1.5 2.5");
	return s;
}

export function BirdIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 7h.01");
	path(s, "M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20");
	path(s, "m20 7 2 .5-2 .5");
	path(s, "M10 18v3");
	path(s, "M14 17.75V21");
	path(s, "M7 18a6 6 0 0 0 3.84-10.61");
	return s;
}

export function BirdhouseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 18v4");
	path(s, "m17 18 1.956-11.468");
	path(s, "m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8");
	path(s, "M4 18h16");
	path(s, "M7 18 5.044 6.532");
	circle(s, 12, 10, 2);
	return s;
}

export function BitcoinIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727",
	);
	return s;
}

export function BlendIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 9, 9, 7);
	circle(s, 15, 15, 7);
	return s;
}

export function BlindsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3h18");
	path(s, "M20 7H8");
	path(s, "M20 11H8");
	path(s, "M10 19h10");
	path(s, "M8 15h12");
	path(s, "M4 3v14");
	circle(s, 4, 19, 2);
	return s;
}

export function BlocksIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2",
	);
	rect(s, { x: "14", y: "2", width: "8", height: "8", rx: "1" });
	return s;
}

export function BluetoothConnectedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m7 7 10 10-5 5V2l5 5L7 17");
	line(s, 18, 12, 21, 12);
	line(s, 3, 12, 6, 12);
	return s;
}

export function BluetoothOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m17 17-5 5V12l-5 5");
	path(s, "m2 2 20 20");
	path(s, "M14.5 9.5 17 7l-5-5v4.5");
	return s;
}

export function BluetoothSearchingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m7 7 10 10-5 5V2l5 5L7 17");
	path(s, "M20.83 14.83a4 4 0 0 0 0-5.66");
	path(s, "M18 12h.01");
	return s;
}

export function BluetoothIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m7 7 10 10-5 5V2l5 5L7 17");
	return s;
}

export function BoldIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
	);
	return s;
}

export function BoltIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
	);
	circle(s, 12, 12, 4);
	return s;
}

export function BombIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 11, 13, 9);
	path(
		s,
		"M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95",
	);
	path(s, "m22 2-1.5 1.5");
	return s;
}

export function BoneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z",
	);
	return s;
}

export function BookAIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	path(s, "m8 13 4-7 4 7");
	path(s, "M9.1 11h5.7");
	return s;
}

export function BookAlertIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13h.01");
	path(s, "M12 6v3");
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	return s;
}

export function BookAudioIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6v7");
	path(s, "M16 8v3");
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	path(s, "M8 8v3");
	return s;
}

export function BookCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	path(s, "m9 9.5 2 2 4-4");
	return s;
}

export function BookCopyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 7a2 2 0 0 0-2 2v11");
	path(s, "M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21");
	path(
		s,
		"M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10",
	);
	return s;
}

export function BookDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 17h1.5");
	path(s, "M12 22h1.5");
	path(s, "M12 2h1.5");
	path(s, "M17.5 22H19a1 1 0 0 0 1-1");
	path(s, "M17.5 2H19a1 1 0 0 1 1 1v1.5");
	path(s, "M20 14v3h-2.5");
	path(s, "M20 8.5V10");
	path(s, "M4 10V8.5");
	path(s, "M4 19.5V14");
	path(s, "M4 4.5A2.5 2.5 0 0 1 6.5 2H8");
	path(s, "M8 22H6.5a1 1 0 0 1 0-5H8");
	return s;
}

export function BookDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13V7");
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	path(s, "m9 10 3 3 3-3");
	return s;
}

export function BookHeadphonesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	path(s, "M8 12v-2a4 4 0 0 1 8 0v2");
	circle(s, 15, 12, 1);
	circle(s, 9, 12, 1);
	return s;
}

export function BookHeartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	path(
		s,
		"M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
	);
	return s;
}

export function BookImageIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17");
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	circle(s, 10, 8, 2);
	return s;
}

export function BookKeyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15");
	path(s, "M17 2v6");
	path(s, "M17 4h2");
	path(s, "M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20");
	circle(s, 17, 10, 2);
	return s;
}

export function BookLockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 6V4a2 2 0 1 0-4 0v2");
	path(s, "M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20");
	path(s, "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10");
	rect(s, { x: "12", y: "6", width: "8", height: "5", rx: "1" });
	return s;
}

export function BookMarkedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2v8l3-3 3 3V2");
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	return s;
}

export function BookMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	path(s, "M9 10h6");
	return s;
}

export function BookOpenCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 21V7");
	path(s, "m16 12 2 2 4-4");
	path(
		s,
		"M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3",
	);
	return s;
}

export function BookOpenTextIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7v14");
	path(s, "M16 12h2");
	path(s, "M16 8h2");
	path(
		s,
		"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	);
	path(s, "M6 12h2");
	path(s, "M6 8h2");
	return s;
}

export function BookOpenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7v14");
	path(
		s,
		"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
	);
	return s;
}

export function BookPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7v6");
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	path(s, "M9 10h6");
	return s;
}

export function BookSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 22H5.5a1 1 0 0 1 0-5h4.501");
	path(s, "m21 22-1.879-1.878");
	path(s, "M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8");
	circle(s, 17, 18, 3);
	return s;
}

export function BookTextIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	path(s, "M8 11h8");
	path(s, "M8 7h6");
	return s;
}

export function BookTypeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 13h4");
	path(s, "M12 6v7");
	path(s, "M16 8V6H8v2");
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	return s;
}

export function BookUp2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13V7");
	path(s, "M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20");
	path(s, "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2");
	path(s, "m9 10 3-3 3 3");
	path(s, "m9 5 3-3 3 3");
	return s;
}

export function BookUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13V7");
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	path(s, "m9 10 3-3 3 3");
	return s;
}

export function BookUserIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 13a3 3 0 1 0-6 0");
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	circle(s, 12, 8, 2);
	return s;
}

export function BookXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14.5 7-5 5");
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	path(s, "m9.5 7 5 5");
	return s;
}

export function BookIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",
	);
	return s;
}

export function BookmarkCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
	);
	path(s, "m9 10 2 2 4-4");
	return s;
}

export function BookmarkMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 10H9");
	path(
		s,
		"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
	);
	return s;
}

export function BookmarkPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7v6");
	path(s, "M15 10H9");
	path(
		s,
		"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
	);
	return s;
}

export function BookmarkXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14.5 7.5-5 5");
	path(
		s,
		"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
	);
	path(s, "m9.5 7.5 5 5");
	return s;
}

export function BookmarkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",
	);
	return s;
}

export function BoomBoxIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4");
	path(s, "M8 8v1");
	path(s, "M12 8v1");
	path(s, "M16 8v1");
	rect(s, { width: "20", height: "12", x: "2", y: "9", rx: "2" });
	circle(s, 8, 15, 2);
	circle(s, 16, 15, 2);
	return s;
}

export function BotMessageSquareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6V2H8");
	path(s, "M15 11v2");
	path(s, "M2 12h2");
	path(s, "M20 12h2");
	path(
		s,
		"M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z",
	);
	path(s, "M9 11v2");
	return s;
}

export function BotOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13.67 8H18a2 2 0 0 1 2 2v4.33");
	path(s, "M2 14h2");
	path(s, "M20 14h2");
	path(s, "M22 22 2 2");
	path(s, "M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586");
	path(s, "M9 13v2");
	path(s, "M9.67 4H12v2.33");
	return s;
}

export function BotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 8V4H8");
	rect(s, { width: "16", height: "12", x: "4", y: "8", rx: "2" });
	path(s, "M2 14h2");
	path(s, "M20 14h2");
	path(s, "M15 13v2");
	path(s, "M9 13v2");
	return s;
}

export function BottleWineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z",
	);
	path(s, "M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4");
	return s;
}

export function BowArrowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 3h4v4");
	path(
		s,
		"M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17",
	);
	path(s, "M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05");
	path(
		s,
		"M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z",
	);
	path(s, "M9.707 14.293 21 3");
	return s;
}

export function BoxIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
	);
	path(s, "m3.3 7 8.7 5 8.7-5");
	path(s, "M12 22V12");
	return s;
}

export function BoxesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
	);
	path(s, "m7 16.5-4.74-2.85");
	path(s, "m7 16.5 5-3");
	path(s, "M7 16.5v5.17");
	path(
		s,
		"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
	);
	path(s, "m17 16.5-5-3");
	path(s, "m17 16.5 4.74-2.85");
	path(s, "M17 16.5v5.17");
	path(
		s,
		"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
	);
	path(s, "M12 8 7.26 5.15");
	path(s, "m12 8 4.74-2.85");
	path(s, "M12 13.5V8");
	return s;
}

export function BracesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",
	);
	path(
		s,
		"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
	);
	return s;
}

export function BracketsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3");
	path(s, "M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3");
	return s;
}

export function BrainCircuitIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
	);
	path(s, "M9 13a4.5 4.5 0 0 0 3-4");
	path(s, "M6.003 5.125A3 3 0 0 0 6.401 6.5");
	path(s, "M3.477 10.896a4 4 0 0 1 .585-.396");
	path(s, "M6 18a4 4 0 0 1-1.967-.516");
	path(s, "M12 13h4");
	path(s, "M12 18h6a2 2 0 0 1 2 2v1");
	path(s, "M12 8h8");
	path(s, "M16 8V5a2 2 0 0 1 2-2");
	circle(s, 16, 13, 0.5);
	circle(s, 18, 3, 0.5);
	circle(s, 20, 21, 0.5);
	circle(s, 20, 8, 0.5);
	return s;
}

export function BrainCogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10.852 14.772-.383.923");
	path(s, "m10.852 9.228-.383-.923");
	path(s, "m13.148 14.772.382.924");
	path(s, "m13.531 8.305-.383.923");
	path(s, "m14.772 10.852.923-.383");
	path(s, "m14.772 13.148.923.383");
	path(
		s,
		"M17.598 6.5A3 3 0 1 0 12 5a3 3 0 0 0-5.63-1.446 3 3 0 0 0-.368 1.571 4 4 0 0 0-2.525 5.771",
	);
	path(s, "M17.998 5.125a4 4 0 0 1 2.525 5.771");
	path(s, "M19.505 10.294a4 4 0 0 1-1.5 7.706");
	path(
		s,
		"M4.032 17.483A4 4 0 0 0 11.464 20c.18-.311.892-.311 1.072 0a4 4 0 0 0 7.432-2.516",
	);
	path(s, "M4.5 10.291A4 4 0 0 0 6 18");
	path(s, "M6.002 5.125a3 3 0 0 0 .4 1.375");
	path(s, "m9.228 10.852-.923-.383");
	path(s, "m9.228 13.148-.923.383");
	circle(s, 12, 12, 3);
	return s;
}

export function BrainIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 18V5");
	path(s, "M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4");
	path(s, "M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5");
	path(s, "M17.997 5.125a4 4 0 0 1 2.526 5.77");
	path(s, "M18 18a4 4 0 0 0 2-7.464");
	path(s, "M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517");
	path(s, "M6 18a4 4 0 0 1-2-7.464");
	path(s, "M6.003 5.125a4 4 0 0 0-2.526 5.77");
	return s;
}

export function BrickWallFireIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 3v2.107");
	path(
		s,
		"M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9",
	);
	path(s, "M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938");
	path(s, "M3 15h5.253");
	path(s, "M3 9h8.228");
	path(s, "M8 15v6");
	path(s, "M8 3v6");
	return s;
}

export function BrickWallShieldIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 9v1.258");
	path(s, "M16 3v5.46");
	path(s, "M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75");
	path(
		s,
		"M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z",
	);
	path(s, "M3 15h7");
	path(s, "M3 9h12.142");
	path(s, "M8 15v6");
	path(s, "M8 3v6");
	return s;
}

export function BrickWallIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M12 9v6");
	path(s, "M16 15v6");
	path(s, "M16 3v6");
	path(s, "M3 15h18");
	path(s, "M3 9h18");
	path(s, "M8 15v6");
	path(s, "M8 3v6");
	return s;
}

export function BriefcaseBusinessIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 12h.01");
	path(s, "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2");
	path(s, "M22 13a18.15 18.15 0 0 1-20 0");
	rect(s, { width: "20", height: "14", x: "2", y: "6", rx: "2" });
	return s;
}

export function BriefcaseConveyorBeltIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 20v2");
	path(s, "M14 20v2");
	path(s, "M18 20v2");
	path(s, "M21 20H3");
	path(s, "M6 20v2");
	path(s, "M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12");
	rect(s, { x: "4", y: "6", width: "16", height: "10", rx: "2" });
	return s;
}

export function BriefcaseMedicalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 11v4");
	path(s, "M14 13h-4");
	path(s, "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2");
	path(s, "M18 6v14");
	path(s, "M6 6v14");
	rect(s, { width: "20", height: "14", x: "2", y: "6", rx: "2" });
	return s;
}

export function BriefcaseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16");
	rect(s, { width: "20", height: "14", x: "2", y: "6", rx: "2" });
	return s;
}

export function BringToFrontIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { x: "8", y: "8", width: "8", height: "8", rx: "2" });
	path(s, "M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2");
	path(s, "M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2");
	return s;
}

export function BrushCleaningIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 22-1-4");
	path(
		s,
		"M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1",
	);
	path(s, "M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z");
	path(s, "m8 22 1-4");
	return s;
}

export function BrushIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m11 10 3 3");
	path(
		s,
		"M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z",
	);
	path(s, "M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031");
	return s;
}

export function BubblesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7.001 15.085A1.5 1.5 0 0 1 9 16.5");
	circle(s, 18.5, 8.5, 3.5);
	circle(s, 7.5, 16.5, 5.5);
	circle(s, 7.5, 4.5, 2.5);
	return s;
}

export function BugOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 20v-8");
	path(s, "M12.656 7H14a4 4 0 0 1 4 4v1.344");
	path(s, "M14.12 3.88 16 2");
	path(s, "M17.123 17.123A6 6 0 0 1 6 14v-3a4 4 0 0 1 1.72-3.287");
	path(s, "m2 2 20 20");
	path(s, "M21 5a4 4 0 0 1-3.55 3.97");
	path(s, "M22 13h-3.344");
	path(s, "M3 21a4 4 0 0 1 3.81-4");
	path(s, "M3 5a4 4 0 0 0 3.55 3.97");
	path(s, "M6 13H2");
	path(s, "m8 2 1.88 1.88");
	path(s, "M9.712 4.06A3 3 0 0 1 15 6v1.13");
	return s;
}

export function BugPlayIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97");
	path(
		s,
		"M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
	);
	path(s, "M14.12 3.88 16 2");
	path(s, "M21 5a4 4 0 0 1-3.55 3.97");
	path(s, "M3 21a4 4 0 0 1 3.81-4");
	path(s, "M3 5a4 4 0 0 0 3.55 3.97");
	path(s, "M6 13H2");
	path(s, "m8 2 1.88 1.88");
	path(s, "M9 7.13V6a3 3 0 1 1 6 0v1.13");
	return s;
}

export function BugIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 20v-9");
	path(s, "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z");
	path(s, "M14.12 3.88 16 2");
	path(s, "M21 21a4 4 0 0 0-3.81-4");
	path(s, "M21 5a4 4 0 0 1-3.55 3.97");
	path(s, "M22 13h-4");
	path(s, "M3 21a4 4 0 0 1 3.81-4");
	path(s, "M3 5a4 4 0 0 0 3.55 3.97");
	path(s, "M6 13H2");
	path(s, "m8 2 1.88 1.88");
	path(s, "M9 7.13V6a3 3 0 1 1 6 0v1.13");
	return s;
}

export function Building2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 12h4");
	path(s, "M10 8h4");
	path(s, "M14 21v-3a2 2 0 0 0-4 0v3");
	path(
		s,
		"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
	);
	path(s, "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16");
	return s;
}

export function BuildingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 10h.01");
	path(s, "M12 14h.01");
	path(s, "M12 6h.01");
	path(s, "M16 10h.01");
	path(s, "M16 14h.01");
	path(s, "M16 6h.01");
	path(s, "M8 10h.01");
	path(s, "M8 14h.01");
	path(s, "M8 6h.01");
	path(s, "M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3");
	rect(s, { x: "4", y: "2", width: "16", height: "20", rx: "2" });
	return s;
}

export function BusFrontIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 6 2 7");
	path(s, "M10 6h4");
	path(s, "m22 7-2-1");
	rect(s, { width: "16", height: "16", x: "4", y: "3", rx: "2" });
	path(s, "M4 11h16");
	path(s, "M8 15h.01");
	path(s, "M16 15h.01");
	path(s, "M6 19v2");
	path(s, "M18 21v-2");
	return s;
}

export function BusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 6v6");
	path(s, "M15 6v6");
	path(s, "M2 12h19.6");
	path(
		s,
		"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",
	);
	circle(s, 7, 18, 2);
	path(s, "M9 18h5");
	circle(s, 16, 18, 2);
	return s;
}

export function CableCarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 3h.01");
	path(s, "M14 2h.01");
	path(s, "m2 9 20-5");
	path(s, "M12 12V6.5");
	rect(s, { width: "16", height: "10", x: "4", y: "12", rx: "3" });
	path(s, "M9 12v5");
	path(s, "M15 12v5");
	path(s, "M4 17h16");
	return s;
}

export function CableIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z",
	);
	path(s, "M17 21v-2");
	path(s, "M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10");
	path(s, "M21 21v-2");
	path(s, "M3 5V3");
	path(
		s,
		"M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z",
	);
	path(s, "M7 5V3");
	return s;
}

export function CakeSliceIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 13H3");
	path(s, "M16 17H3");
	path(
		s,
		"m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6",
	);
	circle(s, 9, 7, 2);
	return s;
}

export function CakeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8");
	path(s, "M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1");
	path(s, "M2 21h20");
	path(s, "M7 8v3");
	path(s, "M12 8v3");
	path(s, "M17 8v3");
	path(s, "M7 4h.01");
	path(s, "M12 4h.01");
	path(s, "M17 4h.01");
	return s;
}

export function CalculatorIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "16", height: "20", x: "4", y: "2", rx: "2" });
	line(s, 8, 6, 16, 6);
	line(s, 16, 14, 16, 18);
	path(s, "M16 10h.01");
	path(s, "M12 10h.01");
	path(s, "M8 10h.01");
	path(s, "M12 14h.01");
	path(s, "M8 14h.01");
	path(s, "M12 18h.01");
	path(s, "M8 18h.01");
	return s;
}

export function Calendar1Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 14h1v4");
	path(s, "M16 2v4");
	path(s, "M3 10h18");
	path(s, "M8 2v4");
	rect(s, { x: "3", y: "4", width: "18", height: "18", rx: "2" });
	return s;
}

export function CalendarArrowDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14 18 4 4 4-4");
	path(s, "M16 2v4");
	path(s, "M18 14v8");
	path(s, "M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343");
	path(s, "M3 10h18");
	path(s, "M8 2v4");
	return s;
}

export function CalendarArrowUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14 18 4-4 4 4");
	path(s, "M16 2v4");
	path(s, "M18 22v-8");
	path(s, "M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9");
	path(s, "M3 10h18");
	path(s, "M8 2v4");
	return s;
}

export function CalendarCheck2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2v4");
	path(s, "M16 2v4");
	path(s, "M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8");
	path(s, "M3 10h18");
	path(s, "m16 20 2 2 4-4");
	return s;
}

export function CalendarCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2v4");
	path(s, "M16 2v4");
	rect(s, { width: "18", height: "18", x: "3", y: "4", rx: "2" });
	path(s, "M3 10h18");
	path(s, "m9 16 2 2 4-4");
	return s;
}

export function CalendarClockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 14v2.2l1.6 1");
	path(s, "M16 2v4");
	path(s, "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5");
	path(s, "M3 10h5");
	path(s, "M8 2v4");
	circle(s, 16, 16, 6);
	return s;
}

export function CalendarCogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15.228 16.852-.923-.383");
	path(s, "m15.228 19.148-.923.383");
	path(s, "M16 2v4");
	path(s, "m16.47 14.305.382.923");
	path(s, "m16.852 20.772-.383.924");
	path(s, "m19.148 15.228.383-.923");
	path(s, "m19.53 21.696-.382-.924");
	path(s, "m20.772 16.852.924-.383");
	path(s, "m20.772 19.148.924.383");
	path(s, "M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6");
	path(s, "M3 10h18");
	path(s, "M8 2v4");
	circle(s, 18, 18, 3);
	return s;
}

export function CalendarDaysIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2v4");
	path(s, "M16 2v4");
	rect(s, { width: "18", height: "18", x: "3", y: "4", rx: "2" });
	path(s, "M3 10h18");
	path(s, "M8 14h.01");
	path(s, "M12 14h.01");
	path(s, "M16 14h.01");
	path(s, "M8 18h.01");
	path(s, "M12 18h.01");
	path(s, "M16 18h.01");
	return s;
}

export function CalendarFoldIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3 20a2 2 0 0 0 2 2h10a2.4 2.4 0 0 0 1.706-.706l3.588-3.588A2.4 2.4 0 0 0 21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",
	);
	path(s, "M15 22v-5a1 1 0 0 1 1-1h5");
	path(s, "M8 2v4");
	path(s, "M16 2v4");
	path(s, "M3 10h18");
	return s;
}

export function CalendarHeartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12.127 22H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.125");
	path(
		s,
		"M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
	);
	path(s, "M16 2v4");
	path(s, "M3 10h18");
	path(s, "M8 2v4");
	return s;
}

export function CalendarMinus2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2v4");
	path(s, "M16 2v4");
	rect(s, { width: "18", height: "18", x: "3", y: "4", rx: "2" });
	path(s, "M3 10h18");
	path(s, "M10 16h4");
	return s;
}

export function CalendarMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 19h6");
	path(s, "M16 2v4");
	path(s, "M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5");
	path(s, "M3 10h18");
	path(s, "M8 2v4");
	return s;
}

export function CalendarOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18");
	path(s, "M21 15.5V6a2 2 0 0 0-2-2H9.5");
	path(s, "M16 2v4");
	path(s, "M3 10h7");
	path(s, "M21 10h-5.5");
	path(s, "m2 2 20 20");
	return s;
}

export function CalendarPlus2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2v4");
	path(s, "M16 2v4");
	rect(s, { width: "18", height: "18", x: "3", y: "4", rx: "2" });
	path(s, "M3 10h18");
	path(s, "M10 16h4");
	path(s, "M12 14v4");
	return s;
}

export function CalendarPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 19h6");
	path(s, "M16 2v4");
	path(s, "M19 16v6");
	path(s, "M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5");
	path(s, "M3 10h18");
	path(s, "M8 2v4");
	return s;
}

export function CalendarRangeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "4", rx: "2" });
	path(s, "M16 2v4");
	path(s, "M3 10h18");
	path(s, "M8 2v4");
	path(s, "M17 14h-6");
	path(s, "M13 18H7");
	path(s, "M7 14h.01");
	path(s, "M17 18h.01");
	return s;
}

export function CalendarSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 2v4");
	path(s, "M21 11.75V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.25");
	path(s, "m22 22-1.875-1.875");
	path(s, "M3 10h18");
	path(s, "M8 2v4");
	circle(s, 18, 18, 3);
	return s;
}

export function CalendarSyncIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 10v4h4");
	path(s, "m11 14 1.535-1.605a5 5 0 0 1 8 1.5");
	path(s, "M16 2v4");
	path(s, "m21 18-1.535 1.605a5 5 0 0 1-8-1.5");
	path(s, "M21 22v-4h-4");
	path(s, "M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3");
	path(s, "M3 10h4");
	path(s, "M8 2v4");
	return s;
}

export function CalendarX2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2v4");
	path(s, "M16 2v4");
	path(s, "M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8");
	path(s, "M3 10h18");
	path(s, "m17 22 5-5");
	path(s, "m17 17 5 5");
	return s;
}

export function CalendarXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2v4");
	path(s, "M16 2v4");
	rect(s, { width: "18", height: "18", x: "3", y: "4", rx: "2" });
	path(s, "M3 10h18");
	path(s, "m14 14-4 4");
	path(s, "m10 14 4 4");
	return s;
}

export function CalendarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2v4");
	path(s, "M16 2v4");
	rect(s, { width: "18", height: "18", x: "3", y: "4", rx: "2" });
	path(s, "M3 10h18");
	return s;
}

export function CalendarsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v2");
	path(s, "M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2");
	path(s, "M18 2v2");
	path(s, "M2 13h2");
	path(s, "M8 8h14");
	rect(s, { x: "8", y: "3", width: "14", height: "14", rx: "2" });
	return s;
}

export function CameraOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14.564 14.558a3 3 0 1 1-4.122-4.121");
	path(s, "m2 2 20 20");
	path(s, "M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175");
	path(
		s,
		"M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344",
	);
	return s;
}

export function CameraIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
	);
	circle(s, 12, 13, 3);
	return s;
}

export function CandyCaneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2Z",
	);
	path(s, "M17.75 7 15 2.1");
	path(s, "M10.9 4.8 13 9");
	path(s, "m7.9 9.7 2 4.4");
	path(s, "M4.9 14.7 7 18.9");
	return s;
}

export function CandyOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 10v7.9");
	path(s, "M11.802 6.145a5 5 0 0 1 6.053 6.053");
	path(s, "M14 6.1v2.243");
	path(s, "m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965");
	path(
		s,
		"M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4",
	);
	path(s, "m2 2 20 20");
	path(
		s,
		"M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4",
	);
	return s;
}

export function CandyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 7v10.9");
	path(s, "M14 6.1V17");
	path(
		s,
		"M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4",
	);
	path(
		s,
		"M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07",
	);
	path(
		s,
		"M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4",
	);
	return s;
}

export function CannabisOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22v-4c1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5");
	path(
		s,
		"M13.988 8.327C13.902 6.054 13.365 3.82 12 2a9.3 9.3 0 0 0-1.445 2.9",
	);
	path(
		s,
		"M17.375 11.725C18.882 10.53 21 7.841 21 6c-2.324 0-5.08 1.296-6.662 2.684",
	);
	path(s, "m2 2 20 20");
	path(s, "M21.024 15.378A15 15 0 0 0 22 15c-.426-1.279-2.67-2.557-4.25-2.907");
	path(
		s,
		"M6.995 6.992C5.714 6.4 4.29 6 3 6c0 2 2.5 5 4 6-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3",
	);
	return s;
}

export function CannabisIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22v-4");
	path(
		s,
		"M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6",
	);
	return s;
}

export function CaptionsOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.5 5H19a2 2 0 0 1 2 2v8.5");
	path(s, "M17 11h-.5");
	path(s, "M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2");
	path(s, "m2 2 20 20");
	path(s, "M7 11h4");
	path(s, "M7 15h2.5");
	return s;
}

export function CaptionsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "14", x: "3", y: "5", rx: "2", ry: "2" });
	path(s, "M7 15h4M15 15h2M7 11h2M13 11h4");
	return s;
}

export function CarFrontIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8",
	);
	path(s, "M7 14h.01");
	path(s, "M17 14h.01");
	rect(s, { width: "18", height: "8", x: "3", y: "10", rx: "2" });
	path(s, "M5 18v2");
	path(s, "M19 18v2");
	return s;
}

export function CarTaxiFrontIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2h4");
	path(
		s,
		"m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8",
	);
	path(s, "M7 14h.01");
	path(s, "M17 14h.01");
	rect(s, { width: "18", height: "8", x: "3", y: "10", rx: "2" });
	path(s, "M5 18v2");
	path(s, "M19 18v2");
	return s;
}

export function CarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
	);
	circle(s, 7, 17, 2);
	path(s, "M9 17h6");
	circle(s, 17, 17, 2);
	return s;
}

export function CaravanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2");
	path(s, "M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2");
	path(s, "M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9");
	circle(s, 8, 19, 2);
	return s;
}

export function CardSimIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 14v4");
	path(
		s,
		"M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z",
	);
	path(s, "M8 14h8");
	rect(s, { x: "8", y: "10", width: "8", height: "8", rx: "1" });
	return s;
}

export function CarrotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46",
	);
	path(s, "M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z");
	path(s, "M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z");
	return s;
}

export function CaseLowerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 9v7");
	path(s, "M14 6v10");
	circle(s, 17.5, 12.5, 3.5);
	circle(s, 6.5, 12.5, 3.5);
	return s;
}

export function CaseSensitiveIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16");
	path(s, "M22 9v7");
	path(s, "M3.304 13h6.392");
	circle(s, 18.5, 12.5, 3.5);
	return s;
}

export function CaseUpperIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5",
	);
	path(s, "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16");
	path(s, "M3.304 13h6.392");
	return s;
}

export function CassetteTapeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "16", x: "2", y: "4", rx: "2" });
	circle(s, 8, 10, 2);
	path(s, "M8 12h8");
	circle(s, 16, 10, 2);
	path(s, "m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3");
	return s;
}

export function CastIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6");
	path(s, "M2 12a9 9 0 0 1 8 8");
	path(s, "M2 16a5 5 0 0 1 4 4");
	line(s, 2, 20, 2.01, 20);
	return s;
}

export function CastleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 5V3");
	path(s, "M14 5V3");
	path(s, "M15 21v-3a3 3 0 0 0-6 0v3");
	path(s, "M18 3v8");
	path(s, "M18 5H6");
	path(s, "M22 11H2");
	path(s, "M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9");
	path(s, "M6 3v8");
	return s;
}

export function CatIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z",
	);
	path(s, "M8 14v.5");
	path(s, "M16 14v.5");
	path(s, "M11.25 16.25h1.5L12 17l-.75-.75Z");
	return s;
}

export function CctvOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m12.309 6.652 4.797 2.401a1 1 0 0 1 .447 1.341l-.501 1.001.605.605h2.725a1 1 0 0 1 .894 1.447l-.724 1.448",
	);
	path(
		s,
		"m15.166 15.166-.719 1.439a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.9 2.9 0 0 1 .873-1.037",
	);
	path(s, "M2 19h3.76a2 2 0 0 0 1.8-1.1l1.441-2.902");
	path(s, "m2 2 20 20");
	path(s, "M2 21v-4");
	path(s, "M7 9h.01");
	return s;
}

export function CctvIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97",
	);
	path(
		s,
		"M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z",
	);
	path(s, "M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15");
	path(s, "M2 21v-4");
	path(s, "M7 9h.01");
	return s;
}

export function ChartAreaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	path(
		s,
		"M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z",
	);
	return s;
}

export function ChartBarBigIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	rect(s, { x: "7", y: "13", width: "9", height: "4", rx: "1" });
	rect(s, { x: "7", y: "5", width: "12", height: "4", rx: "1" });
	return s;
}

export function ChartBarDecreasingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	path(s, "M7 11h8");
	path(s, "M7 16h3");
	path(s, "M7 6h12");
	return s;
}

export function ChartBarIncreasingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	path(s, "M7 11h8");
	path(s, "M7 16h12");
	path(s, "M7 6h3");
	return s;
}

export function ChartBarStackedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 13v4");
	path(s, "M15 5v4");
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	rect(s, { x: "7", y: "13", width: "9", height: "4", rx: "1" });
	rect(s, { x: "7", y: "5", width: "12", height: "4", rx: "1" });
	return s;
}

export function ChartBarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	path(s, "M7 16h8");
	path(s, "M7 11h12");
	path(s, "M7 6h3");
	return s;
}

export function ChartCandlestickIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9 5v4");
	rect(s, { width: "4", height: "6", x: "7", y: "9", rx: "1" });
	path(s, "M9 15v2");
	path(s, "M17 3v2");
	rect(s, { width: "4", height: "8", x: "15", y: "5", rx: "1" });
	path(s, "M17 13v3");
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	return s;
}

export function ChartColumnBigIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	rect(s, { x: "15", y: "5", width: "4", height: "12", rx: "1" });
	rect(s, { x: "7", y: "8", width: "4", height: "9", rx: "1" });
	return s;
}

export function ChartColumnDecreasingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 17V9");
	path(s, "M18 17v-3");
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	path(s, "M8 17V5");
	return s;
}

export function ChartColumnIncreasingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 17V9");
	path(s, "M18 17V5");
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	path(s, "M8 17v-3");
	return s;
}

export function ChartColumnStackedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 13H7");
	path(s, "M19 9h-4");
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	rect(s, { x: "15", y: "5", width: "4", height: "12", rx: "1" });
	rect(s, { x: "7", y: "8", width: "4", height: "9", rx: "1" });
	return s;
}

export function ChartColumnIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	path(s, "M18 17V9");
	path(s, "M13 17V5");
	path(s, "M8 17v-3");
	return s;
}

export function ChartGanttIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 6h8");
	path(s, "M12 16h6");
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	path(s, "M8 11h7");
	return s;
}

export function ChartLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	path(s, "m19 9-5 5-4-4-3 3");
	return s;
}

export function ChartNetworkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m13.11 7.664 1.78 2.672");
	path(s, "m14.162 12.788-3.324 1.424");
	path(s, "m20 4-6.06 1.515");
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	circle(s, 12, 6, 2);
	circle(s, 16, 12, 2);
	circle(s, 9, 15, 2);
	return s;
}

export function ChartNoAxesColumnDecreasingIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 21V3");
	path(s, "M12 21V9");
	path(s, "M19 21v-6");
	return s;
}

export function ChartNoAxesColumnIncreasingIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 21v-6");
	path(s, "M12 21V9");
	path(s, "M19 21V3");
	return s;
}

export function ChartNoAxesColumnIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 21v-6");
	path(s, "M12 21V3");
	path(s, "M19 21V9");
	return s;
}

export function ChartNoAxesCombinedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 16v5");
	path(s, "M16 14v7");
	path(s, "M20 10v11");
	path(
		s,
		"m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15",
	);
	path(s, "M4 18v3");
	path(s, "M8 14v7");
	return s;
}

export function ChartNoAxesGanttIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 5h12");
	path(s, "M4 12h10");
	path(s, "M12 19h8");
	return s;
}

export function ChartPieIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
	);
	path(s, "M21.21 15.89A10 10 0 1 1 8 2.83");
	return s;
}

export function ChartScatterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 7.5, 7.5, 0.5, { fill: "currentColor" });
	circle(s, 18.5, 5.5, 0.5, { fill: "currentColor" });
	circle(s, 11.5, 11.5, 0.5, { fill: "currentColor" });
	circle(s, 7.5, 16.5, 0.5, { fill: "currentColor" });
	circle(s, 17.5, 14.5, 0.5, { fill: "currentColor" });
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	return s;
}

export function ChartSplineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3v16a2 2 0 0 0 2 2h16");
	path(s, "M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7");
	return s;
}

export function CheckCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 6 7 17l-5-5");
	path(s, "m22 10-7.5 7.5L13 16");
	return s;
}

export function CheckLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20 4L9 15");
	path(s, "M21 19L3 19");
	path(s, "M9 15L4 10");
	return s;
}

export function CheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20 6 9 17l-5-5");
	return s;
}

export function ChefHatIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",
	);
	path(s, "M6 17h12");
	return s;
}

export function CherryIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z");
	path(s, "M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z");
	path(s, "M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12");
	path(s, "M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z");
	return s;
}

export function ChessBishopIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z",
	);
	path(
		s,
		"M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18",
	);
	path(s, "m16 7-2.5 2.5");
	path(s, "M9 2h6");
	return s;
}

export function ChessKingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z",
	);
	path(
		s,
		"m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1",
	);
	path(s, "M10 4h4");
	path(s, "M12 2v6.818");
	return s;
}

export function ChessKnightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z",
	);
	path(
		s,
		"M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456",
	);
	path(s, "m15 5 1.425-1.425");
	path(s, "m17 8 1.53-1.53");
	path(s, "M9.713 12.185 7 18");
	return s;
}

export function ChessPawnIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z",
	);
	path(s, "m14.5 10 1.5 8");
	path(s, "M7 10h10");
	path(s, "m8 18 1.5-8");
	circle(s, 12, 6, 4);
	return s;
}

export function ChessQueenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z",
	);
	path(s, "m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402");
	path(s, "m20 9-3 9");
	path(s, "m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34");
	path(s, "M7 18 4 9");
	circle(s, 12, 4, 2);
	circle(s, 20, 7, 2);
	circle(s, 4, 7, 2);
	return s;
}

export function ChessRookIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z",
	);
	path(s, "M10 2v2");
	path(s, "M14 2v2");
	path(s, "m17 18-1-9");
	path(s, "M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2");
	path(s, "M6 4h12");
	path(s, "m7 18 1-9");
	return s;
}

export function ChevronDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m6 9 6 6 6-6");
	return s;
}

export function ChevronFirstIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m17 18-6-6 6-6");
	path(s, "M7 6v12");
	return s;
}

export function ChevronLastIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m7 18 6-6-6-6");
	path(s, "M17 6v12");
	return s;
}

export function ChevronLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 18-6-6 6-6");
	return s;
}

export function ChevronRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m9 18 6-6-6-6");
	return s;
}

export function ChevronUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m18 15-6-6-6 6");
	return s;
}

export function ChevronsDownUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m7 20 5-5 5 5");
	path(s, "m7 4 5 5 5-5");
	return s;
}

export function ChevronsDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m7 6 5 5 5-5");
	path(s, "m7 13 5 5 5-5");
	return s;
}

export function ChevronsLeftRightEllipsisIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 12h.01");
	path(s, "M16 12h.01");
	path(s, "m17 7 5 5-5 5");
	path(s, "m7 7-5 5 5 5");
	path(s, "M8 12h.01");
	return s;
}

export function ChevronsLeftRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m9 7-5 5 5 5");
	path(s, "m15 7 5 5-5 5");
	return s;
}

export function ChevronsLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m11 17-5-5 5-5");
	path(s, "m18 17-5-5 5-5");
	return s;
}

export function ChevronsRightLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m20 17-5-5 5-5");
	path(s, "m4 17 5-5-5-5");
	return s;
}

export function ChevronsRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m6 17 5-5-5-5");
	path(s, "m13 17 5-5-5-5");
	return s;
}

export function ChevronsUpDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m7 15 5 5 5-5");
	path(s, "m7 9 5-5 5 5");
	return s;
}

export function ChevronsUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m17 11-5-5-5 5");
	path(s, "m17 18-5-5-5 5");
	return s;
}

export function ChurchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 9h4");
	path(s, "M12 7v5");
	path(s, "M14 21v-3a2 2 0 0 0-4 0v3");
	path(
		s,
		"m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9",
	);
	path(
		s,
		"M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14",
	);
	return s;
}

export function CigaretteOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13");
	path(s, "M18 8c0-2.5-2-2.5-2-5");
	path(s, "m2 2 20 20");
	path(s, "M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866");
	path(s, "M22 8c0-2.5-2-2.5-2-5");
	path(s, "M7 12v4");
	return s;
}

export function CigaretteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14");
	path(s, "M18 8c0-2.5-2-2.5-2-5");
	path(s, "M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1");
	path(s, "M22 8c0-2.5-2-2.5-2-5");
	path(s, "M7 12v4");
	return s;
}

export function CircleAlertIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	line(s, 12, 8, 12, 12);
	line(s, 12, 16, 12.01, 16);
	return s;
}

export function CircleArrowDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 8v8");
	path(s, "m8 12 4 4 4-4");
	return s;
}

export function CircleArrowLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m12 8-4 4 4 4");
	path(s, "M16 12H8");
	return s;
}

export function CircleArrowOutDownLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 12a10 10 0 1 1 10 10");
	path(s, "m2 22 10-10");
	path(s, "M8 22H2v-6");
	return s;
}

export function CircleArrowOutDownRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22a10 10 0 1 1 10-10");
	path(s, "M22 22 12 12");
	path(s, "M22 16v6h-6");
	return s;
}

export function CircleArrowOutUpLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 8V2h6");
	path(s, "m2 2 10 10");
	path(s, "M12 2A10 10 0 1 1 2 12");
	return s;
}

export function CircleArrowOutUpRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 12A10 10 0 1 1 12 2");
	path(s, "M22 2 12 12");
	path(s, "M16 2h6v6");
	return s;
}

export function CircleArrowRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m12 16 4-4-4-4");
	path(s, "M8 12h8");
	return s;
}

export function CircleArrowUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m16 12-4-4-4 4");
	path(s, "M12 16V8");
	return s;
}

export function CircleCheckBigIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21.801 10A10 10 0 1 1 17 3.335");
	path(s, "m9 11 3 3L22 4");
	return s;
}

export function CircleCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m9 12 2 2 4-4");
	return s;
}

export function CircleChevronDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m16 10-4 4-4-4");
	return s;
}

export function CircleChevronLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m14 16-4-4 4-4");
	return s;
}

export function CircleChevronRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m10 8 4 4-4 4");
	return s;
}

export function CircleChevronUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m8 14 4-4 4 4");
	return s;
}

export function CircleDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.1 2.182a10 10 0 0 1 3.8 0");
	path(s, "M13.9 21.818a10 10 0 0 1-3.8 0");
	path(s, "M17.609 3.721a10 10 0 0 1 2.69 2.7");
	path(s, "M2.182 13.9a10 10 0 0 1 0-3.8");
	path(s, "M20.279 17.609a10 10 0 0 1-2.7 2.69");
	path(s, "M21.818 10.1a10 10 0 0 1 0 3.8");
	path(s, "M3.721 6.391a10 10 0 0 1 2.7-2.69");
	path(s, "M6.391 20.279a10 10 0 0 1-2.69-2.7");
	return s;
}

export function CircleDivideIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	line(s, 8, 12, 16, 12);
	line(s, 12, 16, 12, 16);
	line(s, 12, 8, 12, 8);
	return s;
}

export function CircleDollarSignIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8");
	path(s, "M12 18V6");
	return s;
}

export function CircleDotDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.1 2.18a9.93 9.93 0 0 1 3.8 0");
	path(s, "M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7");
	path(s, "M21.82 10.1a9.93 9.93 0 0 1 0 3.8");
	path(s, "M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69");
	path(s, "M13.9 21.82a9.94 9.94 0 0 1-3.8 0");
	path(s, "M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7");
	path(s, "M2.18 13.9a9.93 9.93 0 0 1 0-3.8");
	path(s, "M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69");
	circle(s, 12, 12, 1);
	return s;
}

export function CircleDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	circle(s, 12, 12, 1);
	return s;
}

export function CircleEllipsisIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M17 12h.01");
	path(s, "M12 12h.01");
	path(s, "M7 12h.01");
	return s;
}

export function CircleEqualIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M7 10h10");
	path(s, "M7 14h10");
	return s;
}

export function CircleFadingArrowUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2a10 10 0 0 1 7.38 16.75");
	path(s, "m16 12-4-4-4 4");
	path(s, "M12 16V8");
	path(s, "M2.5 8.875a10 10 0 0 0-.5 3");
	path(s, "M2.83 16a10 10 0 0 0 2.43 3.4");
	path(s, "M4.636 5.235a10 10 0 0 1 .891-.857");
	path(s, "M8.644 21.42a10 10 0 0 0 7.631-.38");
	return s;
}

export function CircleFadingPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2a10 10 0 0 1 7.38 16.75");
	path(s, "M12 8v8");
	path(s, "M16 12H8");
	path(s, "M2.5 8.875a10 10 0 0 0-.5 3");
	path(s, "M2.83 16a10 10 0 0 0 2.43 3.4");
	path(s, "M4.636 5.235a10 10 0 0 1 .891-.857");
	path(s, "M8.644 21.42a10 10 0 0 0 7.631-.38");
	return s;
}

export function CircleGaugeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15.6 2.7a10 10 0 1 0 5.7 5.7");
	circle(s, 12, 12, 2);
	path(s, "M13.4 10.6 19 5");
	return s;
}

export function CircleMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M8 12h8");
	return s;
}

export function CircleOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m2 2 20 20");
	path(s, "M8.35 2.69A10 10 0 0 1 21.3 15.65");
	path(s, "M19.08 19.08A10 10 0 1 1 4.92 4.92");
	return s;
}

export function CircleParkingOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12.656 7H13a3 3 0 0 1 2.984 3.307");
	path(s, "M13 13H9");
	path(s, "M19.071 19.071A1 1 0 0 1 4.93 4.93");
	path(s, "m2 2 20 20");
	path(s, "M8.357 2.687a10 10 0 0 1 12.956 12.956");
	path(s, "M9 17V9");
	return s;
}

export function CircleParkingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M9 17V7h4a3 3 0 0 1 0 6H9");
	return s;
}

export function CirclePauseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	line(s, 10, 15, 10, 9);
	line(s, 14, 15, 14, 9);
	return s;
}

export function CirclePercentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m15 9-6 6");
	path(s, "M9 9h.01");
	path(s, "M15 15h.01");
	return s;
}

export function CirclePileIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 19, 2);
	circle(s, 12, 5, 2);
	circle(s, 16, 12, 2);
	circle(s, 20, 19, 2);
	circle(s, 4, 19, 2);
	circle(s, 8, 12, 2);
	return s;
}

export function CirclePlayIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
	);
	circle(s, 12, 12, 10);
	return s;
}

export function CirclePlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M8 12h8");
	path(s, "M12 8v8");
	return s;
}

export function CirclePoundSterlingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M10 16V9.5a1 1 0 0 1 5 0");
	path(s, "M8 12h4");
	path(s, "M8 16h7");
	return s;
}

export function CirclePowerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 7v4");
	path(s, "M7.998 9.003a5 5 0 1 0 8-.005");
	return s;
}

export function CircleQuestionMarkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3");
	path(s, "M12 17h.01");
	return s;
}

export function CircleSlash2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M22 2 2 22");
	return s;
}

export function CircleSlashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	line(s, 9, 15, 15, 9);
	return s;
}

export function CircleSmallIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 6);
	return s;
}

export function CircleStarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(
		s,
		"M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z",
	);
	return s;
}

export function CircleStopIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	rect(s, { x: "9", y: "9", width: "6", height: "6", rx: "1" });
	return s;
}

export function CircleUserRoundIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17.925 20.056a6 6 0 0 0-11.851.001");
	circle(s, 12, 11, 4);
	circle(s, 12, 12, 10);
	return s;
}

export function CircleUserIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	circle(s, 12, 10, 3);
	path(s, "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662");
	return s;
}

export function CircleXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m15 9-6 6");
	path(s, "m9 9 6 6");
	return s;
}

export function CircleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	return s;
}

export function CircuitBoardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M11 9h4a2 2 0 0 0 2-2V3");
	circle(s, 9, 9, 2);
	path(s, "M7 21v-4a2 2 0 0 1 2-2h4");
	circle(s, 15, 15, 2);
	return s;
}

export function CitrusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z",
	);
	path(s, "M19.65 15.66A8 8 0 0 1 8.35 4.34");
	path(s, "m14 10-5.5 5.5");
	path(s, "M14 17.85V10H6.15");
	return s;
}

export function ClapperboardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m12.296 3.464 3.02 3.956");
	path(
		s,
		"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z",
	);
	path(s, "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z");
	path(s, "m6.18 5.276 3.1 3.899");
	return s;
}

export function ClipboardCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" });
	path(
		s,
		"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
	);
	path(s, "m9 14 2 2 4-4");
	return s;
}

export function ClipboardClockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 14v2.2l1.6 1");
	path(s, "M16 4h2a2 2 0 0 1 2 2v.832");
	path(s, "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2");
	circle(s, 16, 16, 6);
	rect(s, { x: "8", y: "2", width: "8", height: "4", rx: "1" });
	return s;
}

export function ClipboardCopyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" });
	path(s, "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2");
	path(s, "M16 4h2a2 2 0 0 1 2 2v4");
	path(s, "M21 14H11");
	path(s, "m15 10-4 4 4 4");
	return s;
}

export function ClipboardListIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" });
	path(
		s,
		"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
	);
	path(s, "M12 11h4");
	path(s, "M12 16h4");
	path(s, "M8 11h.01");
	path(s, "M8 16h.01");
	return s;
}

export function ClipboardMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" });
	path(
		s,
		"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
	);
	path(s, "M9 14h6");
	return s;
}

export function ClipboardPasteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 14h10");
	path(s, "M16 4h2a2 2 0 0 1 2 2v1.344");
	path(s, "m17 18 4-4-4-4");
	path(s, "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113");
	rect(s, { x: "8", y: "2", width: "8", height: "4", rx: "1" });
	return s;
}

export function ClipboardPenLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "4", x: "8", y: "2", rx: "1" });
	path(s, "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5");
	path(s, "M16 4h2a2 2 0 0 1 1.73 1");
	path(s, "M8 18h1");
	path(
		s,
		"M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
	);
	return s;
}

export function ClipboardPenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 4h2a2 2 0 0 1 2 2v2");
	path(
		s,
		"M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
	);
	path(s, "M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2");
	rect(s, { x: "8", y: "2", width: "8", height: "4", rx: "1" });
	return s;
}

export function ClipboardPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" });
	path(
		s,
		"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
	);
	path(s, "M9 14h6");
	path(s, "M12 17v-6");
	return s;
}

export function ClipboardTypeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" });
	path(
		s,
		"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
	);
	path(s, "M9 12v-1h6v1");
	path(s, "M11 17h2");
	path(s, "M12 11v6");
	return s;
}

export function ClipboardXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" });
	path(
		s,
		"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
	);
	path(s, "m15 11-6 6");
	path(s, "m9 11 6 6");
	return s;
}

export function ClipboardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1" });
	path(
		s,
		"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
	);
	return s;
}

export function Clock1Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6l2-4");
	return s;
}

export function Clock10Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6l-4-2");
	return s;
}

export function Clock11Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6l-2-4");
	return s;
}

export function Clock12Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6");
	return s;
}

export function Clock2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6l4-2");
	return s;
}

export function Clock3Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6h4");
	return s;
}

export function Clock4Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6l4 2");
	return s;
}

export function Clock5Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6l2 4");
	return s;
}

export function Clock6Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v10");
	return s;
}

export function Clock7Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6l-2 4");
	return s;
}

export function Clock8Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6l-4 2");
	return s;
}

export function Clock9Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6H8");
	return s;
}

export function ClockAlertIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6v6l4 2");
	path(s, "M20 12v5");
	path(s, "M20 21h.01");
	path(s, "M21.25 8.2A10 10 0 1 0 16 21.16");
	return s;
}

export function ClockArrowDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6v6l2 1");
	path(s, "M12.337 21.994a10 10 0 1 1 9.588-8.767");
	path(s, "m14 18 4 4 4-4");
	path(s, "M18 14v8");
	return s;
}

export function ClockArrowUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6v6l1.56.78");
	path(s, "M13.227 21.925a10 10 0 1 1 8.767-9.588");
	path(s, "m14 18 4-4 4 4");
	path(s, "M18 22v-8");
	return s;
}

export function ClockCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6v6l4 2");
	path(s, "M22 12a10 10 0 1 0-11 9.95");
	path(s, "m22 16-5.5 5.5L14 19");
	return s;
}

export function ClockFadingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2a10 10 0 0 1 7.38 16.75");
	path(s, "M12 6v6l4 2");
	path(s, "M2.5 8.875a10 10 0 0 0-.5 3");
	path(s, "M2.83 16a10 10 0 0 0 2.43 3.4");
	path(s, "M4.636 5.235a10 10 0 0 1 .891-.857");
	path(s, "M8.644 21.42a10 10 0 0 0 7.631-.38");
	return s;
}

export function ClockPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6v6l3.644 1.822");
	path(s, "M16 19h6");
	path(s, "M19 16v6");
	path(s, "M21.92 13.267a10 10 0 1 0-8.653 8.653");
	return s;
}

export function ClockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 6v6l4 2");
	return s;
}

export function ClosedCaptionIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 9.17a3 3 0 1 0 0 5.66");
	path(s, "M17 9.17a3 3 0 1 0 0 5.66");
	rect(s, { x: "2", y: "5", width: "20", height: "14", rx: "2" });
	return s;
}

export function CloudAlertIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 12v4");
	path(s, "M12 20h.01");
	path(s, "M8.128 16.949A7 7 0 1 1 15.71 8h1.79a1 1 0 0 1 0 9h-1.642");
	return s;
}

export function CloudBackupIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607");
	path(s, "M7 11v4h4");
	path(
		s,
		"M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15",
	);
	return s;
}

export function CloudCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m17 15-5.5 5.5L9 18");
	path(s, "M5.516 16.07A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 3.501 7.327");
	return s;
}

export function CloudCogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10.852 19.772-.383.924");
	path(s, "m13.148 14.228.383-.923");
	path(s, "M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923");
	path(s, "m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544");
	path(s, "m14.772 15.852.923-.383");
	path(s, "m14.772 18.148.923.383");
	path(
		s,
		"M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2",
	);
	path(s, "m9.228 15.852-.923-.383");
	path(s, "m9.228 18.148-.923.383");
	return s;
}

export function CloudDownloadIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13v8l-4-4");
	path(s, "m12 21 4-4");
	path(s, "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284");
	return s;
}

export function CloudDrizzleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242");
	path(s, "M8 19v1");
	path(s, "M8 14v1");
	path(s, "M16 19v1");
	path(s, "M16 14v1");
	path(s, "M12 21v1");
	path(s, "M12 16v1");
	return s;
}

export function CloudFogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242");
	path(s, "M16 17H7");
	path(s, "M17 21H9");
	return s;
}

export function CloudHailIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242");
	path(s, "M16 14v2");
	path(s, "M8 14v2");
	path(s, "M16 20h.01");
	path(s, "M8 20h.01");
	path(s, "M12 16v2");
	path(s, "M12 22h.01");
	return s;
}

export function CloudLightningIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973");
	path(s, "m13 12-3 5h4l-3 5");
	return s;
}

export function CloudMoonRainIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 20v2");
	path(
		s,
		"M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36",
	);
	path(s, "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24");
	path(s, "M7 19v2");
	return s;
}

export function CloudMoonIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z");
	path(
		s,
		"M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36",
	);
	return s;
}

export function CloudOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057");
	path(s, "M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78");
	path(s, "m2 2 20 20");
	return s;
}

export function CloudRainWindIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242");
	path(s, "m9.2 22 3-7");
	path(s, "m9 13-3 7");
	path(s, "m17 13-3 7");
	return s;
}

export function CloudRainIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242");
	path(s, "M16 14v6");
	path(s, "M8 14v6");
	path(s, "M12 16v6");
	return s;
}

export function CloudSnowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242");
	path(s, "M8 15h.01");
	path(s, "M8 19h.01");
	path(s, "M12 17h.01");
	path(s, "M12 21h.01");
	path(s, "M16 15h.01");
	path(s, "M16 19h.01");
	return s;
}

export function CloudSunRainIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v2");
	path(s, "m4.93 4.93 1.41 1.41");
	path(s, "M20 12h2");
	path(s, "m19.07 4.93-1.41 1.41");
	path(s, "M15.947 12.65a4 4 0 0 0-5.925-4.128");
	path(s, "M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24");
	path(s, "M11 20v2");
	path(s, "M7 19v2");
	return s;
}

export function CloudSunIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v2");
	path(s, "m4.93 4.93 1.41 1.41");
	path(s, "M20 12h2");
	path(s, "m19.07 4.93-1.41 1.41");
	path(s, "M15.947 12.65a4 4 0 0 0-5.925-4.128");
	path(s, "M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z");
	return s;
}

export function CloudSyncIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m17 18-1.535 1.605a5 5 0 0 1-8-1.5");
	path(s, "M17 22v-4h-4");
	path(s, "M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607");
	path(s, "M7 10v4h4");
	path(s, "m7 14 1.535-1.605a5 5 0 0 1 8 1.5");
	return s;
}

export function CloudUploadIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13v8");
	path(s, "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242");
	path(s, "m8 17 4-4 4 4");
	return s;
}

export function CloudIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z");
	return s;
}

export function CloudyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z");
	path(s, "M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61");
	return s;
}

export function CloverIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16.17 7.83 2 22");
	path(
		s,
		"M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12",
	);
	path(s, "m7.83 7.83 8.34 8.34");
	return s;
}

export function ClubIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z",
	);
	path(s, "M12 17.66L12 22");
	return s;
}

export function CodeXmlIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m18 16 4-4-4-4");
	path(s, "m6 8-4 4 4 4");
	path(s, "m14.5 4-5 16");
	return s;
}

export function CodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 18 6-6-6-6");
	path(s, "m8 6-6 6 6 6");
	return s;
}

export function CoffeeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2v2");
	path(s, "M14 2v2");
	path(
		s,
		"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
	);
	path(s, "M6 2v2");
	return s;
}

export function CogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 10.27 7 3.34");
	path(s, "m11 13.73-4 6.93");
	path(s, "M12 22v-2");
	path(s, "M12 2v2");
	path(s, "M14 12h8");
	path(s, "m17 20.66-1-1.73");
	path(s, "m17 3.34-1 1.73");
	path(s, "M2 12h2");
	path(s, "m20.66 17-1.73-1");
	path(s, "m20.66 7-1.73 1");
	path(s, "m3.34 17 1.73-1");
	path(s, "m3.34 7 1.73 1");
	circle(s, 12, 12, 2);
	circle(s, 12, 12, 8);
	return s;
}

export function CoinsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13.744 17.736a6 6 0 1 1-7.48-7.48");
	path(s, "M15 6h1v4");
	path(s, "m6.134 14.768.866-.5 2 3.464");
	circle(s, 16, 8, 6);
	return s;
}

export function Columns2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M12 3v18");
	return s;
}

export function Columns3CogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5");
	path(s, "m14.3 19.6 1-.4");
	path(s, "M15 3v7.5");
	path(s, "m15.2 16.9-.9-.3");
	path(s, "m16.6 21.7.3-.9");
	path(s, "m16.8 15.3-.4-1");
	path(s, "m19.1 15.2.3-.9");
	path(s, "m19.6 21.7-.4-1");
	path(s, "m20.7 16.8 1-.4");
	path(s, "m21.7 19.4-.9-.3");
	path(s, "M9 3v18");
	circle(s, 18, 18, 3);
	return s;
}

export function Columns3Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M9 3v18");
	path(s, "M15 3v18");
	return s;
}

export function Columns4Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M7.5 3v18");
	path(s, "M12 3v18");
	path(s, "M16.5 3v18");
	return s;
}

export function CombineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1");
	path(s, "M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1");
	path(s, "m7 15 3 3");
	path(s, "m7 21 3-3H5a2 2 0 0 1-2-2v-2");
	rect(s, { x: "14", y: "14", width: "7", height: "7", rx: "1" });
	rect(s, { x: "3", y: "3", width: "7", height: "7", rx: "1" });
	return s;
}

export function CommandIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",
	);
	return s;
}

export function CompassIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(
		s,
		"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
	);
	return s;
}

export function ComponentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
	);
	path(
		s,
		"M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z",
	);
	path(
		s,
		"M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z",
	);
	path(
		s,
		"M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",
	);
	return s;
}

export function ComputerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "14", height: "8", x: "5", y: "2", rx: "2" });
	rect(s, { width: "20", height: "8", x: "2", y: "14", rx: "2" });
	path(s, "M6 18h2");
	path(s, "M12 18h6");
	return s;
}

export function ConciergeBellIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z",
	);
	path(s, "M20 16a8 8 0 1 0-16 0");
	path(s, "M12 4v4");
	path(s, "M10 4h4");
	return s;
}

export function ConeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98");
	ellipse(s, { cx: "12", cy: "19", rx: "9", ry: "3" });
	return s;
}

export function ConstructionIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { x: "2", y: "6", width: "20", height: "8", rx: "1" });
	path(s, "M17 14v7");
	path(s, "M7 14v7");
	path(s, "M17 3v3");
	path(s, "M7 3v3");
	path(s, "M10 14 2.3 6.3");
	path(s, "m14 6 7.7 7.7");
	path(s, "m8 6 8 8");
	return s;
}

export function ContactRoundIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 2v2");
	path(s, "M17.915 22a6 6 0 0 0-12 0");
	path(s, "M8 2v2");
	circle(s, 12, 12, 4);
	rect(s, { x: "3", y: "4", width: "18", height: "18", rx: "2" });
	return s;
}

export function ContactIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 2v2");
	path(s, "M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2");
	path(s, "M8 2v2");
	circle(s, 12, 11, 3);
	rect(s, { x: "3", y: "4", width: "18", height: "18", rx: "2" });
	return s;
}

export function ContainerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z",
	);
	path(s, "M10 21.9V14L2.1 9.1");
	path(s, "m10 14 11.9-6.9");
	path(s, "M14 19.8v-8.1");
	path(s, "M18 17.5V9.4");
	return s;
}

export function ContrastIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 18a6 6 0 0 0 0-12v12z");
	return s;
}

export function CookieIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5");
	path(s, "M8.5 8.5v.01");
	path(s, "M16 15.5v.01");
	path(s, "M12 12v.01");
	path(s, "M11 17v.01");
	path(s, "M7 14v.01");
	return s;
}

export function CookingPotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 12h20");
	path(s, "M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8");
	path(s, "m4 8 16-4");
	path(
		s,
		"m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8",
	);
	return s;
}

export function CopyCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m12 15 2 2 4-4");
	rect(s, { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" });
	path(s, "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2");
	return s;
}

export function CopyMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 12, 15, 18, 15);
	rect(s, { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" });
	path(s, "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2");
	return s;
}

export function CopyPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 15, 12, 15, 18);
	line(s, 12, 15, 18, 15);
	rect(s, { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" });
	path(s, "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2");
	return s;
}

export function CopySlashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 12, 18, 18, 12);
	rect(s, { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" });
	path(s, "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2");
	return s;
}

export function CopyXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 12, 12, 18, 18);
	line(s, 12, 18, 18, 12);
	rect(s, { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" });
	path(s, "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2");
	return s;
}

export function CopyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" });
	path(s, "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2");
	return s;
}

export function CopyleftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M9.17 14.83a4 4 0 1 0 0-5.66");
	return s;
}

export function CopyrightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M14.83 14.83a4 4 0 1 1 0-5.66");
	return s;
}

export function CornerDownLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20 4v7a4 4 0 0 1-4 4H4");
	path(s, "m9 10-5 5 5 5");
	return s;
}

export function CornerDownRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 10 5 5-5 5");
	path(s, "M4 4v7a4 4 0 0 0 4 4h12");
	return s;
}

export function CornerLeftDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14 15-5 5-5-5");
	path(s, "M20 4h-7a4 4 0 0 0-4 4v12");
	return s;
}

export function CornerLeftUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 9 9 4 4 9");
	path(s, "M20 20h-7a4 4 0 0 1-4-4V4");
	return s;
}

export function CornerRightDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10 15 5 5 5-5");
	path(s, "M4 4h7a4 4 0 0 1 4 4v12");
	return s;
}

export function CornerRightUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10 9 5-5 5 5");
	path(s, "M4 20h7a4 4 0 0 0 4-4V4");
	return s;
}

export function CornerUpLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20 20v-7a4 4 0 0 0-4-4H4");
	path(s, "M9 14 4 9l5-5");
	return s;
}

export function CornerUpRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 14 5-5-5-5");
	path(s, "M4 20v-7a4 4 0 0 1 4-4h12");
	return s;
}

export function CpuIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 20v2");
	path(s, "M12 2v2");
	path(s, "M17 20v2");
	path(s, "M17 2v2");
	path(s, "M2 12h2");
	path(s, "M2 17h2");
	path(s, "M2 7h2");
	path(s, "M20 12h2");
	path(s, "M20 17h2");
	path(s, "M20 7h2");
	path(s, "M7 20v2");
	path(s, "M7 2v2");
	rect(s, { x: "4", y: "4", width: "16", height: "16", rx: "2" });
	rect(s, { x: "8", y: "8", width: "8", height: "8", rx: "1" });
	return s;
}

export function CreativeCommonsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(
		s,
		"M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1",
	);
	path(
		s,
		"M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1",
	);
	return s;
}

export function CreditCardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "14", x: "2", y: "5", rx: "2" });
	line(s, 2, 10, 22, 10);
	return s;
}

export function CroissantIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487");
	path(s, "M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132");
	path(s, "M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42");
	path(s, "M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14");
	path(
		s,
		"M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676",
	);
	return s;
}

export function CropIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 2v14a2 2 0 0 0 2 2h14");
	path(s, "M18 22V8a2 2 0 0 0-2-2H2");
	return s;
}

export function CrossIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z",
	);
	return s;
}

export function CrosshairIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	line(s, 22, 12, 18, 12);
	line(s, 6, 12, 2, 12);
	line(s, 12, 6, 12, 2);
	line(s, 12, 22, 12, 18);
	return s;
}

export function CrownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
	);
	path(s, "M5 21h14");
	return s;
}

export function CuboidIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 22v-8");
	path(s, "M2.336 8.89 10 14l11.715-7.029");
	path(
		s,
		"M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z",
	);
	return s;
}

export function CupSodaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8");
	path(s, "M5 8h14");
	path(s, "M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0");
	path(s, "m12 8 1-6h2");
	return s;
}

export function CurrencyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 8);
	line(s, 3, 3, 6, 6);
	line(s, 21, 3, 18, 6);
	line(s, 3, 21, 6, 18);
	line(s, 21, 21, 18, 18);
	return s;
}

export function CylinderIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	ellipse(s, { cx: "12", cy: "5", rx: "9", ry: "3" });
	path(s, "M3 5v14a9 3 0 0 0 18 0V5");
	return s;
}

export function DamIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
	);
	path(s, "M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1");
	path(s, "M2 10h4");
	path(s, "M2 14h4");
	path(s, "M2 18h4");
	path(s, "M2 6h4");
	path(
		s,
		"M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z",
	);
	return s;
}

export function DatabaseBackupIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	ellipse(s, { cx: "12", cy: "5", rx: "9", ry: "3" });
	path(s, "M3 12a9 3 0 0 0 5 2.69");
	path(s, "M21 9.3V5");
	path(s, "M3 5v14a9 3 0 0 0 6.47 2.88");
	path(s, "M12 12v4h4");
	path(
		s,
		"M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",
	);
	return s;
}

export function DatabaseSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 11.693V5");
	path(s, "m22 22-1.875-1.875");
	path(s, "M3 12a9 3 0 0 0 8.697 2.998");
	path(s, "M3 5v14a9 3 0 0 0 9.28 2.999");
	circle(s, 18, 18, 3);
	ellipse(s, { cx: "12", cy: "5", rx: "9", ry: "3" });
	return s;
}

export function DatabaseZapIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	ellipse(s, { cx: "12", cy: "5", rx: "9", ry: "3" });
	path(s, "M3 5V19A9 3 0 0 0 15 21.84");
	path(s, "M21 5V8");
	path(s, "M21 12L18 17H22L19 22");
	path(s, "M3 12A9 3 0 0 0 14.59 14.87");
	return s;
}

export function DatabaseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	ellipse(s, { cx: "12", cy: "5", rx: "9", ry: "3" });
	path(s, "M3 5V19A9 3 0 0 0 21 19V5");
	path(s, "M3 12A9 3 0 0 0 21 12");
	return s;
}

export function DecimalsArrowLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m13 21-3-3 3-3");
	path(s, "M20 18H10");
	path(s, "M3 11h.01");
	rect(s, { x: "6", y: "3", width: "5", height: "8", rx: "2.5" });
	return s;
}

export function DecimalsArrowRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 18h10");
	path(s, "m17 21 3-3-3-3");
	path(s, "M3 11h.01");
	rect(s, { x: "15", y: "3", width: "5", height: "8", rx: "2.5" });
	rect(s, { x: "6", y: "3", width: "5", height: "8", rx: "2.5" });
	return s;
}

export function DeleteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z",
	);
	path(s, "m12 9 6 6");
	path(s, "m18 9-6 6");
	return s;
}

export function DessertIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826",
	);
	path(s, "M20.804 14.869a9 9 0 0 1-17.608 0");
	circle(s, 12, 4, 2);
	return s;
}

export function DiameterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 19, 19, 2);
	circle(s, 5, 5, 2);
	path(s, "M6.48 3.66a10 10 0 0 1 13.86 13.86");
	path(s, "m6.41 6.41 11.18 11.18");
	path(s, "M3.66 6.48a10 10 0 0 0 13.86 13.86");
	return s;
}

export function DiamondMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z",
	);
	path(s, "M8 12h8");
	return s;
}

export function DiamondPercentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z",
	);
	path(s, "M9.2 9.2h.01");
	path(s, "m14.5 9.5-5 5");
	path(s, "M14.7 14.8h.01");
	return s;
}

export function DiamondPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 8v8");
	path(
		s,
		"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z",
	);
	path(s, "M8 12h8");
	return s;
}

export function DiamondIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
	);
	return s;
}

export function Dice1Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	path(s, "M12 12h.01");
	return s;
}

export function Dice2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	path(s, "M15 9h.01");
	path(s, "M9 15h.01");
	return s;
}

export function Dice3Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	path(s, "M16 8h.01");
	path(s, "M12 12h.01");
	path(s, "M8 16h.01");
	return s;
}

export function Dice4Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	path(s, "M16 8h.01");
	path(s, "M8 8h.01");
	path(s, "M8 16h.01");
	path(s, "M16 16h.01");
	return s;
}

export function Dice5Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	path(s, "M16 8h.01");
	path(s, "M8 8h.01");
	path(s, "M8 16h.01");
	path(s, "M16 16h.01");
	path(s, "M12 12h.01");
	return s;
}

export function Dice6Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	path(s, "M16 8h.01");
	path(s, "M16 12h.01");
	path(s, "M16 16h.01");
	path(s, "M8 8h.01");
	path(s, "M8 12h.01");
	path(s, "M8 16h.01");
	return s;
}

export function DicesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2" });
	path(
		s,
		"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6",
	);
	path(s, "M6 18h.01");
	path(s, "M10 14h.01");
	path(s, "M15 6h.01");
	path(s, "M18 9h.01");
	return s;
}

export function DiffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3v14");
	path(s, "M5 10h14");
	path(s, "M5 21h14");
	return s;
}

export function Disc2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	circle(s, 12, 12, 4);
	path(s, "M12 12h.01");
	return s;
}

export function Disc3Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M6 12c0-1.7.7-3.2 1.8-4.2");
	circle(s, 12, 12, 2);
	path(s, "M18 12c0 1.7-.7 3.2-1.8 4.2");
	return s;
}

export function DiscAlbumIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	circle(s, 12, 12, 5);
	path(s, "M12 12h.01");
	return s;
}

export function DiscIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	circle(s, 12, 12, 2);
	return s;
}

export function DivideIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 6, 1);
	line(s, 5, 12, 19, 12);
	circle(s, 12, 18, 1);
	return s;
}

export function DnaOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8");
	path(s, "m17 6-2.891-2.891");
	path(s, "M2 15c3.333-3 6.667-3 10-3");
	path(s, "m2 2 20 20");
	path(s, "m20 9 .891.891");
	path(s, "M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1");
	path(s, "M3.109 14.109 4 15");
	path(s, "m6.5 12.5 1 1");
	path(s, "m7 18 2.891 2.891");
	path(s, "M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16");
	return s;
}

export function DnaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10 16 1.5 1.5");
	path(s, "m14 8-1.5-1.5");
	path(s, "M15 2c-1.798 1.998-2.518 3.995-2.807 5.993");
	path(s, "m16.5 10.5 1 1");
	path(s, "m17 6-2.891-2.891");
	path(s, "M2 15c6.667-6 13.333 0 20-6");
	path(s, "m20 9 .891.891");
	path(s, "M3.109 14.109 4 15");
	path(s, "m6.5 12.5 1 1");
	path(s, "m7 18 2.891 2.891");
	path(s, "M9 22c1.798-1.998 2.518-3.995 2.807-5.993");
	return s;
}

export function DockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 8h20");
	rect(s, { width: "20", height: "16", x: "2", y: "4", rx: "2" });
	path(s, "M6 16h12");
	return s;
}

export function DogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11.25 16.25h1.5L12 17z");
	path(s, "M16 14v.5");
	path(
		s,
		"M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309",
	);
	path(s, "M8 14v.5");
	path(
		s,
		"M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5",
	);
	return s;
}

export function DollarSignIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 12, 2, 12, 22);
	path(s, "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6");
	return s;
}

export function DonutIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3",
	);
	circle(s, 12, 12, 3);
	return s;
}

export function DoorClosedLockedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 12h.01");
	path(s, "M18 9V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14");
	path(s, "M2 20h8");
	path(s, "M20 17v-2a2 2 0 1 0-4 0v2");
	rect(s, { x: "14", y: "17", width: "8", height: "5", rx: "1" });
	return s;
}

export function DoorClosedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 12h.01");
	path(s, "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14");
	path(s, "M2 20h20");
	return s;
}

export function DoorOpenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 20H2");
	path(
		s,
		"M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z",
	);
	path(s, "M11 4H8a2 2 0 0 0-2 2v14");
	path(s, "M14 12h.01");
	path(s, "M22 20h-3");
	return s;
}

export function DotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12.1, 12.1, 1);
	return s;
}

export function DownloadIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 15V3");
	path(s, "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4");
	path(s, "m7 10 5 5 5-5");
	return s;
}

export function DraftingCompassIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m12.99 6.74 1.93 3.44");
	path(s, "M19.136 12a10 10 0 0 1-14.271 0");
	path(s, "m21 21-2.16-3.84");
	path(s, "m3 21 8.02-14.26");
	circle(s, 12, 5, 2);
	return s;
}

export function DramaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 11h.01");
	path(s, "M14 6h.01");
	path(s, "M18 6h.01");
	path(s, "M6.5 13.1h.01");
	path(s, "M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3");
	path(s, "M17.4 9.9c-.8.8-2 .8-2.8 0");
	path(
		s,
		"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7",
	);
	path(s, "M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4");
	return s;
}

export function DrillIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z",
	);
	path(
		s,
		"M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8",
	);
	path(s, "M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3");
	path(s, "M18 6h4");
	path(s, "m5 10-2 8");
	path(s, "m7 18 2-8");
	return s;
}

export function DroneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 10 7 7");
	path(s, "m10 14-3 3");
	path(s, "m14 10 3-3");
	path(s, "m14 14 3 3");
	path(s, "M14.205 4.139a4 4 0 1 1 5.439 5.863");
	path(s, "M19.637 14a4 4 0 1 1-5.432 5.868");
	path(s, "M4.367 10a4 4 0 1 1 5.438-5.862");
	path(s, "M9.795 19.862a4 4 0 1 1-5.429-5.873");
	rect(s, { x: "10", y: "8", width: "4", height: "8", rx: "1" });
	return s;
}

export function DropletOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586",
	);
	path(s, "m2 2 20 20");
	path(
		s,
		"M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208",
	);
	return s;
}

export function DropletIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
	);
	return s;
}

export function DropletsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
	);
	path(
		s,
		"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
	);
	return s;
}

export function DrumIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m2 2 8 8");
	path(s, "m22 2-8 8");
	ellipse(s, { cx: "12", cy: "9", rx: "10", ry: "5" });
	path(s, "M7 13.4v7.9");
	path(s, "M12 14v8");
	path(s, "M17 13.4v7.9");
	path(s, "M2 9v8a10 5 0 0 0 20 0V9");
	return s;
}

export function DrumstickIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23");
	path(
		s,
		"m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59",
	);
	return s;
}

export function DumbbellIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
	);
	path(s, "m2.5 21.5 1.4-1.4");
	path(s, "m20.1 3.9 1.4-1.4");
	path(
		s,
		"M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
	);
	path(s, "m9.6 14.4 4.8-4.8");
	return s;
}

export function EarOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46");
	path(s, "M6 8.5c0-.75.13-1.47.36-2.14");
	path(s, "M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76");
	path(s, "M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18");
	line(s, 2, 2, 22, 22);
	return s;
}

export function EarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0");
	path(s, "M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4");
	return s;
}

export function EarthLockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7 3.34V5a3 3 0 0 0 3 3");
	path(s, "M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05");
	path(s, "M21.54 15H17a2 2 0 0 0-2 2v4.54");
	path(s, "M12 2a10 10 0 1 0 9.54 13");
	path(s, "M20 6V4a2 2 0 1 0-4 0v2");
	rect(s, { width: "8", height: "5", x: "14", y: "6", rx: "1" });
	return s;
}

export function EarthIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21.54 15H17a2 2 0 0 0-2 2v4.54");
	path(
		s,
		"M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
	);
	path(s, "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05");
	circle(s, 12, 12, 10);
	return s;
}

export function EclipseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 2a7 7 0 1 0 10 10");
	return s;
}

export function EggFriedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 11.5, 12.5, 3.5);
	path(
		s,
		"M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z",
	);
	return s;
}

export function EggOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m2 2 20 20");
	path(s, "M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19");
	path(s, "M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568");
	return s;
}

export function EggIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12");
	return s;
}

export function EllipseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	ellipse(s, { cx: "12", cy: "12", rx: "10", ry: "6" });
	return s;
}

export function EllipsisVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 1);
	circle(s, 12, 5, 1);
	circle(s, 12, 19, 1);
	return s;
}

export function EllipsisIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 1);
	circle(s, 19, 12, 1);
	circle(s, 5, 12, 1);
	return s;
}

export function EqualApproximatelyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0");
	path(s, "M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0");
	return s;
}

export function EqualNotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 5, 9, 19, 9);
	line(s, 5, 15, 19, 15);
	line(s, 19, 5, 5, 19);
	return s;
}

export function EqualIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 5, 9, 19, 9);
	line(s, 5, 15, 19, 15);
	return s;
}

export function EraserIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21",
	);
	path(s, "m5.082 11.09 8.828 8.828");
	return s;
}

export function EthernetPortIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m15 20 3-3h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2l3 3z",
	);
	path(s, "M6 8v1");
	path(s, "M10 8v1");
	path(s, "M14 8v1");
	path(s, "M18 8v1");
	return s;
}

export function EuroIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 10h12");
	path(s, "M4 14h9");
	path(
		s,
		"M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2",
	);
	return s;
}

export function EvChargerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5",
	);
	path(s, "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16");
	path(s, "M2 21h13");
	path(s, "M3 7h11");
	path(s, "m9 11-2 3h3l-2 3");
	return s;
}

export function ExpandIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 15 6 6");
	path(s, "m15 9 6-6");
	path(s, "M21 16v5h-5");
	path(s, "M21 8V3h-5");
	path(s, "M3 16v5h5");
	path(s, "m3 21 6-6");
	path(s, "M3 8V3h5");
	path(s, "M9 9 3 3");
	return s;
}

export function ExternalLinkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 3h6v6");
	path(s, "M10 14 21 3");
	path(s, "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6");
	return s;
}

export function EyeClosedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 18-.722-3.25");
	path(s, "M2 8a10.645 10.645 0 0 0 20 0");
	path(s, "m20 15-1.726-2.05");
	path(s, "m4 15 1.726-2.05");
	path(s, "m9 18 .722-3.25");
	return s;
}

export function EyeOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
	);
	path(s, "M14.084 14.158a3 3 0 0 1-4.242-4.242");
	path(
		s,
		"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
	);
	path(s, "m2 2 20 20");
	return s;
}

export function EyeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	);
	circle(s, 12, 12, 3);
	return s;
}

export function FactoryIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 16h.01");
	path(s, "M16 16h.01");
	path(
		s,
		"M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z",
	);
	path(s, "M8 16h.01");
	return s;
}

export function FanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",
	);
	path(s, "M12 12v.01");
	return s;
}

export function FastForwardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z",
	);
	path(
		s,
		"M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z",
	);
	return s;
}

export function FeatherIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z",
	);
	path(s, "M16 8 2 22");
	path(s, "M17.5 15H9");
	return s;
}

export function FenceIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z");
	path(s, "M6 8h4");
	path(s, "M6 18h4");
	path(s, "m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z");
	path(s, "M14 8h4");
	path(s, "M14 18h4");
	path(s, "m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z");
	return s;
}

export function FerrisWheelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 2);
	path(s, "M12 2v4");
	path(s, "m6.8 15-3.5 2");
	path(s, "m20.7 7-3.5 2");
	path(s, "M6.8 9 3.3 7");
	path(s, "m20.7 17-3.5-2");
	path(s, "m9 22 3-8 3 8");
	path(s, "M8 22h8");
	path(s, "M18 18.7a9 9 0 1 0-12 0");
	return s;
}

export function FileArchiveIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M8 12v-1");
	path(s, "M8 18v-2");
	path(s, "M8 7V6");
	circle(s, 8, 20, 2);
	return s;
}

export function FileAxis3dIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "m8 18 4-4");
	path(s, "M8 10v8h8");
	return s;
}

export function FileBadgeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(
		s,
		"m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88",
	);
	circle(s, 6, 14, 3);
	return s;
}

export function FileBoxIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14.5 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.8",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M11.7 14.2 7 17l-4.7-2.8");
	path(
		s,
		"M3 13.1a2 2 0 0 0-.999 1.76v3.24a2 2 0 0 0 .969 1.78L6 21.7a2 2 0 0 0 2.03.01L11 19.9a2 2 0 0 0 1-1.76V14.9a2 2 0 0 0-.97-1.78L8 11.3a2 2 0 0 0-2.03-.01z",
	);
	path(s, "M7 17v5");
	return s;
}

export function FileBracesCornerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1");
	path(
		s,
		"M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1",
	);
	return s;
}

export function FileBracesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1");
	path(
		s,
		"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",
	);
	return s;
}

export function FileChartColumnIncreasingIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M8 18v-2");
	path(s, "M12 18v-4");
	path(s, "M16 18v-6");
	return s;
}

export function FileChartColumnIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M8 18v-1");
	path(s, "M12 18v-6");
	path(s, "M16 18v-3");
	return s;
}

export function FileChartLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "m16 13-3.5 3.5-2-2L8 17");
	return s;
}

export function FileChartPieIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15.941 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.512",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M4.017 11.512a6 6 0 1 0 8.466 8.475");
	path(
		s,
		"M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z",
	);
	return s;
}

export function FileCheckCornerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "m14 20 2 2 4-4");
	return s;
}

export function FileCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "m9 15 2 2 4-4");
	return s;
}

export function FileClockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M8 14v2.2l1.6 1");
	circle(s, 8, 16, 6);
	return s;
}

export function FileCodeCornerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "m5 16-3 3 3 3");
	path(s, "m9 22 3-3-3-3");
	return s;
}

export function FileCodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M10 12.5 8 15l2 2.5");
	path(s, "m14 12.5 2 2.5-2 2.5");
	return s;
}

export function FileCogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z",
	);
	path(s, "M20 8v12a2 2 0 0 1-2 2h-4.182");
	path(s, "m3.305 19.53.923-.382");
	path(s, "M4 10.592V4a2 2 0 0 1 2-2h8");
	path(s, "m4.228 16.852-.924-.383");
	path(s, "m5.852 15.228-.383-.923");
	path(s, "m5.852 20.772-.383.924");
	path(s, "m8.148 15.228.383-.923");
	path(s, "m8.53 21.696-.382-.924");
	path(s, "m9.773 16.852.922-.383");
	path(s, "m9.773 19.148.922.383");
	circle(s, 7, 18, 3);
	return s;
}

export function FileDiffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M9 10h6");
	path(s, "M12 13V7");
	path(s, "M9 17h6");
	return s;
}

export function FileDigitIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M10 16h2v6");
	path(s, "M10 22h4");
	rect(s, { x: "2", y: "16", width: "4", height: "6", rx: "2" });
	return s;
}

export function FileDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M12 18v-6");
	path(s, "m9 15 3 3 3-3");
	return s;
}

export function FileExclamationPointIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M12 9v4");
	path(s, "M12 17h.01");
	return s;
}

export function FileHeadphoneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(
		s,
		"M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
	);
	return s;
}

export function FileHeartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(
		s,
		"M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z",
	);
	return s;
}

export function FileImageIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	circle(s, 10, 12, 2);
	path(s, "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22");
	return s;
}

export function FileInputIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M2 15h10");
	path(s, "m9 18 3-3-3-3");
	return s;
}

export function FileKeyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M4 12v6");
	path(s, "M4 14h2");
	path(
		s,
		"M9.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v4",
	);
	circle(s, 4, 20, 2);
	return s;
}

export function FileLockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M9 17v-2a2 2 0 0 0-4 0v2");
	rect(s, { width: "8", height: "5", x: "3", y: "17", rx: "1" });
	return s;
}

export function FileMinusCornerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M14 18h6");
	return s;
}

export function FileMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M9 15h6");
	return s;
}

export function FileMusicIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.35",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M8 20v-7l3 1.474");
	circle(s, 6, 20, 2);
	return s;
}

export function FileOutputIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "m5 11-3 3");
	path(s, "m5 17-3-3h10");
	return s;
}

export function FilePenLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z",
	);
	path(s, "M14.487 7.858A1 1 0 0 1 14 7V2");
	path(
		s,
		"M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516",
	);
	path(s, "M8 18h1");
	return s;
}

export function FilePenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(
		s,
		"M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z",
	);
	return s;
}

export function FilePlayIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(
		s,
		"M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
	);
	return s;
}

export function FilePlusCornerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M14 19h6");
	path(s, "M17 16v6");
	return s;
}

export function FilePlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M9 15h6");
	path(s, "M12 18v-6");
	return s;
}

export function FileQuestionMarkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M12 17h.01");
	path(s, "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3");
	return s;
}

export function FileScanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M16 14a2 2 0 0 0-2 2");
	path(s, "M16 22a2 2 0 0 1-2-2");
	path(s, "M20 14a2 2 0 0 1 2 2");
	path(s, "M20 22a2 2 0 0 0 2-2");
	return s;
}

export function FileSearchCornerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "m21 22-2.88-2.88");
	circle(s, 16, 17, 3);
	return s;
}

export function FileSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	circle(s, 11.5, 14.5, 2.5);
	path(s, "M13.3 16.3 15 18");
	return s;
}

export function FileSignalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M8 15h.01");
	path(s, "M11.5 13.5a2.5 2.5 0 0 1 0 3");
	path(s, "M15 12a5 5 0 0 1 0 6");
	return s;
}

export function FileSlidersIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M8 12h8");
	path(s, "M10 11v2");
	path(s, "M8 17h8");
	path(s, "M14 16v2");
	return s;
}

export function FileSpreadsheetIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M8 13h2");
	path(s, "M14 13h2");
	path(s, "M8 17h2");
	path(s, "M14 17h2");
	return s;
}

export function FileStackIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1");
	path(s, "M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1");
	path(
		s,
		"M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z",
	);
	return s;
}

export function FileSymlinkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "m10 18 3-3-3-3");
	return s;
}

export function FileTerminalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "m8 16 2-2-2-2");
	path(s, "M12 18h4");
	return s;
}

export function FileTextIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M10 9H8");
	path(s, "M16 13H8");
	path(s, "M16 17H8");
	return s;
}

export function FileTypeCornerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16");
	path(s, "M6 22h2");
	path(s, "M7 14v8");
	return s;
}

export function FileTypeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M11 18h2");
	path(s, "M12 12v6");
	path(s, "M9 13v-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5");
	return s;
}

export function FileUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M12 12v6");
	path(s, "m15 15-3-3-3 3");
	return s;
}

export function FileUserIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M16 22a4 4 0 0 0-8 0");
	circle(s, 12, 15, 3);
	return s;
}

export function FileVideoCameraIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(
		s,
		"m10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157",
	);
	rect(s, { width: "7", height: "6", x: "3", y: "16", rx: "1" });
	return s;
}

export function FileVolumeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 11.55V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-1.95",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M12 15a5 5 0 0 1 0 6");
	path(
		s,
		"M8 14.502a.5.5 0 0 0-.826-.381l-1.893 1.631a1 1 0 0 1-.651.243H3.5a.5.5 0 0 0-.5.501v3.006a.5.5 0 0 0 .5.501h1.129a1 1 0 0 1 .652.243l1.893 1.633a.5.5 0 0 0 .826-.38z",
	);
	return s;
}

export function FileXCornerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "m15 17 5 5");
	path(s, "m20 17-5 5");
	return s;
}

export function FileXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "m14.5 12.5-5 5");
	path(s, "m9.5 12.5 5 5");
	return s;
}

export function FileIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	return s;
}

export function FilesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8");
	path(
		s,
		"M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z",
	);
	path(s, "M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1");
	return s;
}

export function FilmIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M7 3v18");
	path(s, "M3 7.5h4");
	path(s, "M3 12h18");
	path(s, "M3 16.5h4");
	path(s, "M17 3v18");
	path(s, "M17 7.5h4");
	path(s, "M17 16.5h4");
	return s;
}

export function FingerprintPatternIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4");
	path(s, "M14 13.12c0 2.38 0 6.38-1 8.88");
	path(s, "M17.29 21.02c.12-.6.43-2.3.5-3.02");
	path(s, "M2 12a10 10 0 0 1 18-6");
	path(s, "M2 16h.01");
	path(s, "M21.8 16c.2-2 .131-5.354 0-6");
	path(s, "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2");
	path(s, "M8.65 22c.21-.66.45-1.32.57-2");
	path(s, "M9 6.8a6 6 0 0 1 9 5.2v2");
	return s;
}

export function FireExtinguisherIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5");
	path(s, "M9 18h8");
	path(s, "M18 3h-3");
	path(s, "M11 3a6 6 0 0 0-6 6v11");
	path(s, "M5 13h4");
	path(s, "M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z");
	return s;
}

export function FishOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058",
	);
	path(
		s,
		"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618",
	);
	path(
		s,
		"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20",
	);
	return s;
}

export function FishSymbolIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 16s9-15 20-4C11 23 2 8 2 8");
	return s;
}

export function FishIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
	);
	path(s, "M18 12v.5");
	path(s, "M16 17.93a9.77 9.77 0 0 1 0-11.86");
	path(
		s,
		"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",
	);
	path(
		s,
		"M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4",
	);
	path(
		s,
		"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98",
	);
	return s;
}

export function FishingHookIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10",
	);
	path(s, "M20.414 8.586 22 7");
	circle(s, 19, 10, 2);
	return s;
}

export function FishingRodIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 11h1");
	path(s, "M8 15a2 2 0 0 1-4 0V3a1 1 0 0 1 1-1h.5C14 2 20 9 20 18v4");
	circle(s, 18, 18, 2);
	return s;
}

export function FlagOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528");
	path(s, "m2 2 20 20");
	path(s, "M4 22V4");
	path(s, "M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347");
	return s;
}

export function FlagTriangleLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5");
	return s;
}

export function FlagTriangleRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5");
	return s;
}

export function FlagIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
	);
	return s;
}

export function FlameKindlingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z",
	);
	path(s, "m5 22 14-4");
	path(s, "m5 18 14 4");
	return s;
}

export function FlameIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
	);
	return s;
}

export function FlashlightOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11.652 6H18");
	path(s, "M12 13v1");
	path(
		s,
		"M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V6",
	);
	path(s, "m2 2 20 20");
	path(
		s,
		"M7.649 2H17a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8a4 4 0 0 0-.55 1.007",
	);
	return s;
}

export function FlashlightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13v1");
	path(
		s,
		"M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z",
	);
	path(s, "M6 6h12");
	return s;
}

export function FlaskConicalOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2v2.343");
	path(s, "M14 2v6.343");
	path(s, "m2 2 20 20");
	path(s, "M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563");
	path(s, "M6.453 15H15");
	path(s, "M8.5 2h7");
	return s;
}

export function FlaskConicalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
	);
	path(s, "M6.453 15h11.094");
	path(s, "M8.5 2h7");
	return s;
}

export function FlaskRoundIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2v6.292a7 7 0 1 0 4 0V2");
	path(s, "M5 15h14");
	path(s, "M8.5 2h7");
	return s;
}

export function FlipHorizontal2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3 7 5 5-5 5V7");
	path(s, "m21 7-5 5 5 5V7");
	path(s, "M12 20v2");
	path(s, "M12 14v2");
	path(s, "M12 8v2");
	path(s, "M12 2v2");
	return s;
}

export function FlipVertical2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m17 3-5 5-5-5h10");
	path(s, "m17 21-5-5-5 5h10");
	path(s, "M4 12H2");
	path(s, "M10 12H8");
	path(s, "M16 12h-2");
	path(s, "M22 12h-2");
	return s;
}

export function Flower2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",
	);
	circle(s, 12, 8, 2);
	path(s, "M12 10v12");
	path(s, "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z");
	path(s, "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z");
	return s;
}

export function FlowerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 3);
	path(
		s,
		"M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5",
	);
	path(s, "M12 7.5V9");
	path(s, "M7.5 12H9");
	path(s, "M16.5 12H15");
	path(s, "M12 16.5V15");
	path(s, "m8 8 1.88 1.88");
	path(s, "M14.12 9.88 16 8");
	path(s, "m8 16 1.88-1.88");
	path(s, "M14.12 14.12 16 16");
	return s;
}

export function FocusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 3);
	path(s, "M3 7V5a2 2 0 0 1 2-2h2");
	path(s, "M17 3h2a2 2 0 0 1 2 2v2");
	path(s, "M21 17v2a2 2 0 0 1-2 2h-2");
	path(s, "M7 21H5a2 2 0 0 1-2-2v-2");
	return s;
}

export function FoldHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 12h6");
	path(s, "M22 12h-6");
	path(s, "M12 2v2");
	path(s, "M12 8v2");
	path(s, "M12 14v2");
	path(s, "M12 20v2");
	path(s, "m19 9-3 3 3 3");
	path(s, "m5 15 3-3-3-3");
	return s;
}

export function FoldVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22v-6");
	path(s, "M12 8V2");
	path(s, "M4 12H2");
	path(s, "M10 12H8");
	path(s, "M16 12h-2");
	path(s, "M22 12h-2");
	path(s, "m15 19-3-3-3 3");
	path(s, "m15 5-3 3-3-3");
	return s;
}

export function FolderArchiveIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 15, 19, 2);
	path(
		s,
		"M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1",
	);
	path(s, "M15 11v-1");
	path(s, "M15 17v-2");
	return s;
}

export function FolderCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	);
	path(s, "m9 13 2 2 4-4");
	return s;
}

export function FolderClockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 14v2.2l1.6 1");
	path(
		s,
		"M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2",
	);
	circle(s, 16, 16, 6);
	return s;
}

export function FolderClosedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	);
	path(s, "M2 10h20");
	return s;
}

export function FolderCodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 10.5 8 13l2 2.5");
	path(s, "m14 10.5 2 2.5-2 2.5");
	path(
		s,
		"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z",
	);
	return s;
}

export function FolderCogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3",
	);
	path(s, "m14.305 19.53.923-.382");
	path(s, "m15.228 16.852-.923-.383");
	path(s, "m16.852 15.228-.383-.923");
	path(s, "m16.852 20.772-.383.924");
	path(s, "m19.148 15.228.383-.923");
	path(s, "m19.53 21.696-.382-.924");
	path(s, "m20.772 16.852.924-.383");
	path(s, "m20.772 19.148.924.383");
	circle(s, 18, 18, 3);
	return s;
}

export function FolderDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
	);
	circle(s, 12, 13, 1);
	return s;
}

export function FolderDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	);
	path(s, "M12 10v6");
	path(s, "m15 13-3 3-3-3");
	return s;
}

export function FolderGit2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 19a5 5 0 0 1-5-5v8");
	path(
		s,
		"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",
	);
	circle(s, 13, 12, 2);
	circle(s, 20, 19, 2);
	return s;
}

export function FolderGitIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 13, 2);
	path(
		s,
		"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	);
	path(s, "M14 13h3");
	path(s, "M7 13h3");
	return s;
}

export function FolderHeartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417",
	);
	path(
		s,
		"M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
	);
	return s;
}

export function FolderInputIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1",
	);
	path(s, "M2 13h10");
	path(s, "m9 16 3-3-3-3");
	return s;
}

export function FolderKanbanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
	);
	path(s, "M8 10v4");
	path(s, "M12 10v2");
	path(s, "M16 10v6");
	return s;
}

export function FolderKeyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.36",
	);
	path(s, "M19 12v6");
	path(s, "M19 14h2");
	circle(s, 19, 20, 2);
	return s;
}

export function FolderLockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "5", x: "14", y: "17", rx: "1" });
	path(
		s,
		"M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5",
	);
	path(s, "M20 17v-2a2 2 0 1 0-4 0v2");
	return s;
}

export function FolderMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9 13h6");
	path(
		s,
		"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	);
	return s;
}

export function FolderOpenDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2",
	);
	circle(s, 14, 15, 1);
	return s;
}

export function FolderOpenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
	);
	return s;
}

export function FolderOutputIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5",
	);
	path(s, "M2 13h10");
	path(s, "m5 10-3 3 3 3");
	return s;
}

export function FolderPenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5",
	);
	path(
		s,
		"M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
	);
	return s;
}

export function FolderPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 10v6");
	path(s, "M9 13h6");
	path(
		s,
		"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	);
	return s;
}

export function FolderRootIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",
	);
	circle(s, 12, 13, 2);
	path(s, "M12 15v5");
	return s;
}

export function FolderSearch2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 11.5, 12.5, 2.5);
	path(
		s,
		"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	);
	path(s, "M13.3 14.3 15 16");
	return s;
}

export function FolderSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1",
	);
	path(s, "m21 21-1.9-1.9");
	circle(s, 17, 17, 3);
	return s;
}

export function FolderSymlinkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 9.35V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7",
	);
	path(s, "m8 16 3-3-3-3");
	return s;
}

export function FolderSyncIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5",
	);
	path(s, "M12 10v4h4");
	path(s, "m12 14 1.535-1.605a5 5 0 0 1 8 1.5");
	path(s, "M22 22v-4h-4");
	path(s, "m22 18-1.535 1.605a5 5 0 0 1-8-1.5");
	return s;
}

export function FolderTreeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
	);
	path(
		s,
		"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
	);
	path(s, "M3 5a2 2 0 0 0 2 2h3");
	path(s, "M3 3v13a2 2 0 0 0 2 2h3");
	return s;
}

export function FolderUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	);
	path(s, "M12 10v6");
	path(s, "m9 13 3-3 3 3");
	return s;
}

export function FolderXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	);
	path(s, "m9.5 10.5 5 5");
	path(s, "m14.5 10.5-5 5");
	return s;
}

export function FolderIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
	);
	return s;
}

export function FoldersIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z",
	);
	path(s, "M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1");
	return s;
}

export function FootprintsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
	);
	path(
		s,
		"M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
	);
	path(s, "M16 17h4");
	path(s, "M4 13h4");
	return s;
}

export function ForkliftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 12H5a2 2 0 0 0-2 2v5");
	path(s, "M15 19h7");
	path(s, "M16 19V2");
	path(
		s,
		"M6 12V7a2 2 0 0 1 2-2h2.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 16 10.828",
	);
	path(s, "M7 19h4");
	circle(s, 13, 19, 2);
	circle(s, 5, 19, 2);
	return s;
}

export function FormIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 14h6");
	path(s, "M4 2h10");
	rect(s, { x: "4", y: "18", width: "16", height: "4", rx: "1" });
	rect(s, { x: "4", y: "6", width: "16", height: "4", rx: "1" });
	return s;
}

export function ForwardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 17 5-5-5-5");
	path(s, "M4 18v-2a4 4 0 0 1 4-4h12");
	return s;
}

export function FrameIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 22, 6, 2, 6);
	line(s, 22, 18, 2, 18);
	line(s, 6, 2, 6, 22);
	line(s, 18, 2, 18, 22);
	return s;
}

export function FrownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M16 16s-1.5-2-4-2-4 2-4 2");
	line(s, 9, 9, 9.01, 9);
	line(s, 15, 9, 15.01, 9);
	return s;
}

export function FuelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5",
	);
	path(s, "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16");
	path(s, "M2 21h13");
	path(s, "M3 9h11");
	return s;
}

export function FullscreenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 7V5a2 2 0 0 1 2-2h2");
	path(s, "M17 3h2a2 2 0 0 1 2 2v2");
	path(s, "M21 17v2a2 2 0 0 1-2 2h-2");
	path(s, "M7 21H5a2 2 0 0 1-2-2v-2");
	rect(s, { width: "10", height: "8", x: "7", y: "8", rx: "1" });
	return s;
}

export function FunnelPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348",
	);
	path(s, "M16 6h6");
	path(s, "M19 3v6");
	return s;
}

export function FunnelXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473",
	);
	path(s, "m16.5 3.5 5 5");
	path(s, "m21.5 3.5-5 5");
	return s;
}

export function FunnelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
	);
	return s;
}

export function GalleryHorizontalEndIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 7v10");
	path(s, "M6 5v14");
	rect(s, { width: "12", height: "18", x: "10", y: "3", rx: "2" });
	return s;
}

export function GalleryHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 3v18");
	rect(s, { width: "12", height: "18", x: "6", y: "3", rx: "2" });
	path(s, "M22 3v18");
	return s;
}

export function GalleryThumbnailsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "14", x: "3", y: "3", rx: "2" });
	path(s, "M4 21h1");
	path(s, "M9 21h1");
	path(s, "M14 21h1");
	path(s, "M19 21h1");
	return s;
}

export function GalleryVerticalEndIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7 2h10");
	path(s, "M5 6h14");
	rect(s, { width: "18", height: "12", x: "3", y: "10", rx: "2" });
	return s;
}

export function GalleryVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 2h18");
	rect(s, { width: "18", height: "12", x: "3", y: "6", rx: "2" });
	path(s, "M3 22h18");
	return s;
}

export function Gamepad2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 6, 11, 10, 11);
	line(s, 8, 9, 8, 13);
	line(s, 15, 12, 15.01, 12);
	line(s, 18, 10, 18.01, 10);
	path(
		s,
		"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
	);
	return s;
}

export function GamepadDirectionalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z",
	);
	path(
		s,
		"M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z",
	);
	path(
		s,
		"M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z",
	);
	path(
		s,
		"M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z",
	);
	return s;
}

export function GamepadIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 6, 12, 10, 12);
	line(s, 8, 10, 8, 14);
	line(s, 15, 13, 15.01, 13);
	line(s, 18, 11, 18.01, 11);
	rect(s, { width: "20", height: "12", x: "2", y: "6", rx: "2" });
	return s;
}

export function GaugeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m12 14 4-4");
	path(s, "M3.34 19a10 10 0 1 1 17.32 0");
	return s;
}

export function GavelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381");
	path(s, "m16 16 6-6");
	path(s, "m21.5 10.5-8-8");
	path(s, "m8 8 6-6");
	path(s, "m8.5 7.5 8 8");
	return s;
}

export function GemIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.5 3 8 9l4 13 4-13-2.5-6");
	path(
		s,
		"M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z",
	);
	path(s, "M2 9h20");
	return s;
}

export function GeorgianLariIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11.5 21a7.5 7.5 0 1 1 7.35-9");
	path(s, "M13 12V3");
	path(s, "M4 21h16");
	path(s, "M9 12V3");
	return s;
}

export function GhostIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9 10h.01");
	path(s, "M15 10h.01");
	path(
		s,
		"M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z",
	);
	return s;
}

export function GiftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7v14");
	path(s, "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8");
	path(
		s,
		"M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5",
	);
	rect(s, { x: "3", y: "7", width: "18", height: "4", rx: "1" });
	return s;
}

export function GitBranchMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 6a9 9 0 0 0-9 9V3");
	path(s, "M21 18h-6");
	circle(s, 18, 6, 3);
	circle(s, 6, 18, 3);
	return s;
}

export function GitBranchPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 3v12");
	path(s, "M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z");
	path(s, "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z");
	path(s, "M15 6a9 9 0 0 0-9 9");
	path(s, "M18 15v6");
	path(s, "M21 18h-6");
	return s;
}

export function GitBranchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 6a9 9 0 0 0-9 9V3");
	circle(s, 18, 6, 3);
	circle(s, 6, 18, 3);
	return s;
}

export function GitCommitHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 3);
	line(s, 3, 12, 9, 12);
	line(s, 15, 12, 21, 12);
	return s;
}

export function GitCommitVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3v6");
	circle(s, 12, 12, 3);
	path(s, "M12 15v6");
	return s;
}

export function GitCompareArrowsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 5, 6, 3);
	path(s, "M12 6h5a2 2 0 0 1 2 2v7");
	path(s, "m15 9-3-3 3-3");
	circle(s, 19, 18, 3);
	path(s, "M12 18H7a2 2 0 0 1-2-2V9");
	path(s, "m9 15 3 3-3 3");
	return s;
}

export function GitCompareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 18, 18, 3);
	circle(s, 6, 6, 3);
	path(s, "M13 6h3a2 2 0 0 1 2 2v7");
	path(s, "M11 18H8a2 2 0 0 1-2-2V9");
	return s;
}

export function GitForkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 18, 3);
	circle(s, 6, 6, 3);
	circle(s, 18, 6, 3);
	path(s, "M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9");
	path(s, "M12 12v3");
	return s;
}

export function GitGraphIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 5, 6, 3);
	path(s, "M5 9v6");
	circle(s, 5, 18, 3);
	path(s, "M12 3v18");
	circle(s, 19, 6, 3);
	path(s, "M16 15.7A9 9 0 0 0 19 9");
	return s;
}

export function GitMergeConflictIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6h4a2 2 0 0 1 2 2v7");
	path(s, "M6 12v9");
	path(s, "M9 3 3 9");
	path(s, "M9 9 3 3");
	circle(s, 18, 18, 3);
	return s;
}

export function GitMergeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 18, 18, 3);
	circle(s, 6, 6, 3);
	path(s, "M6 21V9a9 9 0 0 0 9 9");
	return s;
}

export function GitPullRequestArrowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 5, 6, 3);
	path(s, "M5 9v12");
	circle(s, 19, 18, 3);
	path(s, "m15 9-3-3 3-3");
	path(s, "M12 6h5a2 2 0 0 1 2 2v7");
	return s;
}

export function GitPullRequestClosedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 6, 6, 3);
	path(s, "M6 9v12");
	path(s, "m21 3-6 6");
	path(s, "m21 9-6-6");
	path(s, "M18 11.5V15");
	circle(s, 18, 18, 3);
	return s;
}

export function GitPullRequestCreateArrowIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 5, 6, 3);
	path(s, "M5 9v12");
	path(s, "m15 9-3-3 3-3");
	path(s, "M12 6h5a2 2 0 0 1 2 2v3");
	path(s, "M19 15v6");
	path(s, "M22 18h-6");
	return s;
}

export function GitPullRequestCreateIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 6, 6, 3);
	path(s, "M6 9v12");
	path(s, "M13 6h3a2 2 0 0 1 2 2v3");
	path(s, "M18 15v6");
	path(s, "M21 18h-6");
	return s;
}

export function GitPullRequestDraftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 18, 18, 3);
	circle(s, 6, 6, 3);
	path(s, "M18 6V5");
	path(s, "M18 11v-1");
	line(s, 6, 9, 6, 21);
	return s;
}

export function GitPullRequestIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 18, 18, 3);
	circle(s, 6, 6, 3);
	path(s, "M13 6h3a2 2 0 0 1 2 2v7");
	line(s, 6, 9, 6, 21);
	return s;
}

export function GlassWaterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z",
	);
	path(s, "M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0");
	return s;
}

export function GlassesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 6, 15, 4);
	circle(s, 18, 15, 4);
	path(s, "M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2");
	path(s, "M2.5 13 5 7c.7-1.3 1.4-2 3-2");
	path(s, "M21.5 13 19 7c-.7-1.3-1.5-2-3-2");
	return s;
}

export function GlobeLockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13",
	);
	path(s, "M2 12h8.5");
	path(s, "M20 6V4a2 2 0 1 0-4 0v2");
	rect(s, { width: "8", height: "5", x: "14", y: "6", rx: "1" });
	return s;
}

export function GlobeOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643");
	path(s, "M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929");
	path(s, "M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687");
	path(s, "M17.656 12H22");
	path(s, "M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45");
	path(s, "M2 12h10");
	path(s, "m2 2 20 20");
	return s;
}

export function GlobeXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 3 5 5");
	path(
		s,
		"M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10",
	);
	path(s, "m21 3-5 5");
	return s;
}

export function GlobeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20");
	path(s, "M2 12h20");
	return s;
}

export function GoalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13V2l8 4-8 4");
	path(s, "M20.561 10.222a9 9 0 1 1-12.55-5.29");
	path(s, "M8.002 9.997a5 5 0 1 0 8.9 2.02");
	return s;
}

export function GpuIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 17h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2");
	path(s, "M2 21V3");
	path(s, "M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3");
	circle(s, 16, 11, 2);
	circle(s, 8, 11, 2);
	return s;
}

export function GraduationCapIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
	);
	path(s, "M22 10v6");
	path(s, "M6 12.5V16a6 3 0 0 0 12 0v-3.5");
	return s;
}

export function GrapeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 5V2l-5.89 5.89");
	circle(s, 16.6, 15.89, 3);
	circle(s, 8.11, 7.4, 3);
	circle(s, 12.35, 11.65, 3);
	circle(s, 13.91, 5.85, 3);
	circle(s, 18.15, 10.09, 3);
	circle(s, 6.56, 13.2, 3);
	circle(s, 10.8, 17.44, 3);
	circle(s, 5, 19, 3);
	return s;
}

export function Grid2x2CheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
	);
	path(s, "m16 19 2 2 4-4");
	return s;
}

export function Grid2x2PlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
	);
	path(s, "M16 19h6");
	path(s, "M19 22v-6");
	return s;
}

export function Grid2x2XIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3",
	);
	path(s, "m16 16 5 5");
	path(s, "m16 21 5-5");
	return s;
}

export function Grid2x2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3v18");
	path(s, "M3 12h18");
	rect(s, { x: "3", y: "3", width: "18", height: "18", rx: "2" });
	return s;
}

export function Grid3x2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 3v18");
	path(s, "M3 12h18");
	path(s, "M9 3v18");
	rect(s, { x: "3", y: "3", width: "18", height: "18", rx: "2" });
	return s;
}

export function Grid3x3Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 9h18");
	path(s, "M3 15h18");
	path(s, "M9 3v18");
	path(s, "M15 3v18");
	return s;
}

export function GripHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 9, 1);
	circle(s, 19, 9, 1);
	circle(s, 5, 9, 1);
	circle(s, 12, 15, 1);
	circle(s, 19, 15, 1);
	circle(s, 5, 15, 1);
	return s;
}

export function GripVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 9, 12, 1);
	circle(s, 9, 5, 1);
	circle(s, 9, 19, 1);
	circle(s, 15, 12, 1);
	circle(s, 15, 5, 1);
	circle(s, 15, 19, 1);
	return s;
}

export function GripIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 5, 1);
	circle(s, 19, 5, 1);
	circle(s, 5, 5, 1);
	circle(s, 12, 12, 1);
	circle(s, 19, 12, 1);
	circle(s, 5, 12, 1);
	circle(s, 12, 19, 1);
	circle(s, 19, 19, 1);
	circle(s, 5, 19, 1);
	return s;
}

export function GroupIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 7V5c0-1.1.9-2 2-2h2");
	path(s, "M17 3h2c1.1 0 2 .9 2 2v2");
	path(s, "M21 17v2c0 1.1-.9 2-2 2h-2");
	path(s, "M7 21H5c-1.1 0-2-.9-2-2v-2");
	rect(s, { width: "7", height: "5", x: "7", y: "7", rx: "1" });
	rect(s, { width: "7", height: "5", x: "10", y: "12", rx: "1" });
	return s;
}

export function GuitarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m11.9 12.1 4.514-4.514");
	path(
		s,
		"M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z",
	);
	path(s, "m6 16 2 2");
	path(
		s,
		"M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z",
	);
	return s;
}

export function HamIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856");
	path(
		s,
		"M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288",
	);
	path(
		s,
		"M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025",
	);
	path(s, "m8.5 16.5-1-1");
	return s;
}

export function HamburgerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25");
	path(s, "M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2");
	path(
		s,
		"M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0",
	);
	path(s, "m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2");
	return s;
}

export function HammerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9");
	path(s, "m18 15 4-4");
	path(
		s,
		"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",
	);
	return s;
}

export function HandCoinsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17");
	path(
		s,
		"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
	);
	path(s, "m2 16 6 6");
	circle(s, 16, 9, 2.9);
	circle(s, 6, 5, 3);
	return s;
}

export function HandFistIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0",
	);
	path(s, "M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5");
	path(s, "M9 5A2 2 0 1 0 5 5V10");
	path(s, "M9 7V4A2 2 0 1 1 13 4V7.268");
	return s;
}

export function HandGrabIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4");
	path(s, "M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2");
	path(s, "M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5");
	path(s, "M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2");
	path(
		s,
		"M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0",
	);
	return s;
}

export function HandHeartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16");
	path(
		s,
		"m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95",
	);
	path(s, "m2 15 6 6");
	path(
		s,
		"m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91",
	);
	return s;
}

export function HandHelpingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14");
	path(
		s,
		"m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
	);
	path(s, "m2 13 6 6");
	return s;
}

export function HandMetalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4");
	path(s, "M14 11V9a2 2 0 1 0-4 0v2");
	path(s, "M10 10.5V5a2 2 0 1 0-4 0v9");
	path(
		s,
		"m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5",
	);
	return s;
}

export function HandPlatterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3V2");
	path(
		s,
		"m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5",
	);
	path(s, "M2 14h12a2 2 0 0 1 0 4h-2");
	path(s, "M4 10h16");
	path(s, "M5 10a7 7 0 0 1 14 0");
	path(s, "M5 14v6a1 1 0 0 1-1 1H2");
	return s;
}

export function HandIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2");
	path(s, "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2");
	path(s, "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8");
	path(
		s,
		"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
	);
	return s;
}

export function HandbagIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z",
	);
	path(s, "M8 11V6a4 4 0 0 1 8 0v5");
	return s;
}

export function HandshakeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m11 17 2 2a1 1 0 1 0 3-3");
	path(
		s,
		"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
	);
	path(s, "m21 3 1 11h-2");
	path(s, "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3");
	path(s, "M3 4h8");
	return s;
}

export function HardDriveDownloadIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v8");
	path(s, "m16 6-4 4-4-4");
	rect(s, { width: "20", height: "8", x: "2", y: "14", rx: "2" });
	path(s, "M6 18h.01");
	path(s, "M10 18h.01");
	return s;
}

export function HardDriveUploadIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 6-4-4-4 4");
	path(s, "M12 2v8");
	rect(s, { width: "20", height: "8", x: "2", y: "14", rx: "2" });
	path(s, "M6 18h.01");
	path(s, "M10 18h.01");
	return s;
}

export function HardDriveIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 16h.01");
	path(
		s,
		"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
	);
	path(s, "M21.946 12.013H2.054");
	path(s, "M6 16h.01");
	return s;
}

export function HardHatIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5");
	path(s, "M14 6a6 6 0 0 1 6 6v3");
	path(s, "M4 15v-3a6 6 0 0 1 6-6");
	rect(s, { x: "2", y: "15", width: "20", height: "4", rx: "1" });
	return s;
}

export function HashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 4, 9, 20, 9);
	line(s, 4, 15, 20, 15);
	line(s, 10, 3, 8, 21);
	line(s, 16, 3, 14, 21);
	return s;
}

export function HatGlassesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 18a2 2 0 0 0-4 0");
	path(
		s,
		"m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11",
	);
	path(s, "M2 11h20");
	circle(s, 17, 18, 3);
	circle(s, 7, 18, 3);
	return s;
}

export function HazeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m5.2 6.2 1.4 1.4");
	path(s, "M2 13h2");
	path(s, "M20 13h2");
	path(s, "m17.4 7.6 1.4-1.4");
	path(s, "M22 17H2");
	path(s, "M22 21H2");
	path(s, "M16 13a4 4 0 0 0-8 0");
	path(s, "M12 5V2.5");
	return s;
}

export function HdIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 12H6");
	path(s, "M10 15V9");
	path(
		s,
		"M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z",
	);
	path(s, "M6 15V9");
	rect(s, { x: "2", y: "5", width: "20", height: "14", rx: "2" });
	return s;
}

export function HdmiPortIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1l2 2h12l2-2h1a1 1 0 0 0 1-1Z",
	);
	path(s, "M7.5 12h9");
	return s;
}

export function Heading1Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 12h8");
	path(s, "M4 18V6");
	path(s, "M12 18V6");
	path(s, "m17 12 3-2v8");
	return s;
}

export function Heading2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 12h8");
	path(s, "M4 18V6");
	path(s, "M12 18V6");
	path(s, "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1");
	return s;
}

export function Heading3Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 12h8");
	path(s, "M4 18V6");
	path(s, "M12 18V6");
	path(s, "M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2");
	path(s, "M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2");
	return s;
}

export function Heading4Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 18V6");
	path(s, "M17 10v3a1 1 0 0 0 1 1h3");
	path(s, "M21 10v8");
	path(s, "M4 12h8");
	path(s, "M4 18V6");
	return s;
}

export function Heading5Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 12h8");
	path(s, "M4 18V6");
	path(s, "M12 18V6");
	path(s, "M17 13v-3h4");
	path(s, "M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17");
	return s;
}

export function Heading6Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 12h8");
	path(s, "M4 18V6");
	path(s, "M12 18V6");
	circle(s, 19, 16, 2);
	path(s, "M20 10c-2 2-3 3.5-3 6");
	return s;
}

export function HeadingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 12h12");
	path(s, "M6 20V4");
	path(s, "M18 20V4");
	return s;
}

export function HeadphoneOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 14h-1.343");
	path(s, "M9.128 3.47A9 9 0 0 1 21 12v3.343");
	path(s, "m2 2 20 20");
	path(s, "M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3");
	path(
		s,
		"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364",
	);
	return s;
}

export function HeadphonesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
	);
	return s;
}

export function HeadsetIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z",
	);
	path(s, "M21 16v2a4 4 0 0 1-4 4h-5");
	return s;
}

export function HeartCrackIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15",
	);
	path(
		s,
		"M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z",
	);
	return s;
}

export function HeartHandshakeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762",
	);
	return s;
}

export function HeartMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572",
	);
	path(s, "M15 15h6");
	return s;
}

export function HeartOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655",
	);
	path(
		s,
		"m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761",
	);
	path(s, "m2 2 20 20");
	return s;
}

export function HeartPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49",
	);
	path(s, "M15 15h6");
	path(s, "M18 12v6");
	return s;
}

export function HeartPulseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
	);
	path(s, "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27");
	return s;
}

export function HeartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
	);
	return s;
}

export function HeaterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 8c2-3-2-3 0-6");
	path(s, "M15.5 8c2-3-2-3 0-6");
	path(s, "M6 10h.01");
	path(s, "M6 14h.01");
	path(s, "M10 16v-4");
	path(s, "M14 16v-4");
	path(s, "M18 16v-4");
	path(
		s,
		"M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3",
	);
	path(s, "M5 20v2");
	path(s, "M19 20v2");
	return s;
}

export function HelicopterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 17v4");
	path(s, "M14 3v8a2 2 0 0 0 2 2h5.865");
	path(s, "M17 17v4");
	path(s, "M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z");
	path(s, "M2 10v5");
	path(s, "M6 3h16");
	path(s, "M7 21h14");
	path(s, "M8 13H2");
	return s;
}

export function HexagonIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
	);
	return s;
}

export function HighlighterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m9 11-6 6v3h9l3-3");
	path(s, "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4");
	return s;
}

export function HistoryIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8");
	path(s, "M3 3v5h5");
	path(s, "M12 7v5l4 2");
	return s;
}

export function HopOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27");
	path(
		s,
		"M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28",
	);
	path(s, "M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26");
	path(
		s,
		"M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25",
	);
	path(s, "M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75");
	path(
		s,
		"M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24",
	);
	path(
		s,
		"M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28",
	);
	path(
		s,
		"M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05",
	);
	path(s, "m2 2 20 20");
	return s;
}

export function HopIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18",
	);
	path(
		s,
		"M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88",
	);
	path(
		s,
		"M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36",
	);
	path(
		s,
		"M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87",
	);
	path(
		s,
		"M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08",
	);
	path(
		s,
		"M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57",
	);
	path(s, "M4.93 4.93 3 3a.7.7 0 0 1 0-1");
	path(
		s,
		"M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15",
	);
	return s;
}

export function HospitalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7v4");
	path(s, "M14 21v-3a2 2 0 0 0-4 0v3");
	path(s, "M14 9h-4");
	path(
		s,
		"M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2",
	);
	path(s, "M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16");
	return s;
}

export function HotelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 22v-6.57");
	path(s, "M12 11h.01");
	path(s, "M12 7h.01");
	path(s, "M14 15.43V22");
	path(s, "M15 16a5 5 0 0 0-6 0");
	path(s, "M16 11h.01");
	path(s, "M16 7h.01");
	path(s, "M8 11h.01");
	path(s, "M8 7h.01");
	rect(s, { x: "4", y: "2", width: "16", height: "20", rx: "2" });
	return s;
}

export function HourglassIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 22h14");
	path(s, "M5 2h14");
	path(
		s,
		"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",
	);
	path(
		s,
		"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",
	);
	return s;
}

export function HouseHeartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z",
	);
	path(
		s,
		"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	);
	return s;
}

export function HousePlugIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 12V8.964");
	path(s, "M14 12V8.964");
	path(
		s,
		"M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z",
	);
	path(
		s,
		"M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2",
	);
	return s;
}

export function HousePlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35",
	);
	path(s, "M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8");
	path(s, "M15 18h6");
	path(s, "M18 15v6");
	return s;
}

export function HouseWifiIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9.5 13.866a4 4 0 0 1 5 .01");
	path(s, "M12 17h.01");
	path(
		s,
		"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	);
	path(s, "M7 10.754a8 8 0 0 1 10 0");
	return s;
}

export function HouseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8");
	path(
		s,
		"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
	);
	return s;
}

export function IceCreamBowlIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0",
	);
	path(s, "M12.14 11a3.5 3.5 0 1 1 6.71 0");
	path(s, "M15.5 6.5a3.5 3.5 0 1 0-7 0");
	return s;
}

export function IceCreamConeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11");
	path(s, "M17 7A5 5 0 0 0 7 7");
	path(s, "M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4");
	return s;
}

export function IdCardLanyardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13.5 8h-3");
	path(
		s,
		"m15 2-1 2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3",
	);
	path(s, "M16.899 22A5 5 0 0 0 7.1 22");
	path(s, "m9 2 3 6");
	circle(s, 12, 15, 3);
	return s;
}

export function IdCardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 10h2");
	path(s, "M16 14h2");
	path(s, "M6.17 15a3 3 0 0 1 5.66 0");
	circle(s, 9, 11, 2);
	rect(s, { x: "2", y: "5", width: "20", height: "14", rx: "2" });
	return s;
}

export function ImageDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
	);
	path(s, "m14 19 3 3v-5.5");
	path(s, "m17 22 3-3");
	circle(s, 9, 9, 2);
	return s;
}

export function ImageMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7");
	line(s, 16, 5, 22, 5);
	circle(s, 9, 9, 2);
	path(s, "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21");
	return s;
}

export function ImageOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 2, 2, 22, 22);
	path(s, "M10.41 10.41a2 2 0 1 1-2.83-2.83");
	line(s, 13.5, 13.5, 6, 21);
	line(s, 18, 12, 21, 15);
	path(
		s,
		"M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",
	);
	path(s, "M21 15V5a2 2 0 0 0-2-2H9");
	return s;
}

export function ImagePlayIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
	);
	path(s, "M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6");
	path(s, "m6 21 5-5");
	circle(s, 9, 9, 2);
	return s;
}

export function ImagePlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 5h6");
	path(s, "M19 2v6");
	path(s, "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5");
	path(s, "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21");
	circle(s, 9, 9, 2);
	return s;
}

export function ImageUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21",
	);
	path(s, "m14 19.5 3-3 3 3");
	path(s, "M17 22v-5.5");
	circle(s, 9, 9, 2);
	return s;
}

export function ImageUpscaleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 3h5v5");
	path(s, "M17 21h2a2 2 0 0 0 2-2");
	path(s, "M21 12v3");
	path(s, "m21 3-5 5");
	path(s, "M3 7V5a2 2 0 0 1 2-2");
	path(s, "m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19");
	path(s, "M9 3h3");
	rect(s, { x: "3", y: "11", width: "10", height: "10", rx: "1" });
	return s;
}

export function ImageIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	circle(s, 9, 9, 2);
	path(s, "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21");
	return s;
}

export function ImagesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16");
	path(s, "M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2");
	circle(s, 13, 7, 1, { fill: "currentColor" });
	rect(s, { x: "8", y: "2", width: "14", height: "14", rx: "2" });
	return s;
}

export function ImportIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3v12");
	path(s, "m8 11 4 4 4-4");
	path(
		s,
		"M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4",
	);
	return s;
}

export function InboxIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	_polyline(s, "22 12 16 12 14 15 10 15 8 12 2 12");
	path(
		s,
		"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
	);
	return s;
}

export function IndianRupeeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 3h12");
	path(s, "M6 8h12");
	path(s, "m6 13 8.5 8");
	path(s, "M6 13h3");
	path(s, "M9 13c6.667 0 6.667-10 0-10");
	return s;
}

export function InfinityIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8");
	return s;
}

export function InfoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M12 16v-4");
	path(s, "M12 8h.01");
	return s;
}

export function InspectionPanelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M7 7h.01");
	path(s, "M17 7h.01");
	path(s, "M7 17h.01");
	path(s, "M17 17h.01");
	return s;
}

export function ItalicIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 19, 4, 10, 4);
	line(s, 14, 20, 5, 20);
	line(s, 15, 4, 9, 20);
	return s;
}

export function IterationCcwIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 14 4 4-4 4");
	path(s, "M20 10a8 8 0 1 0-8 8h8");
	return s;
}

export function IterationCwIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 10a8 8 0 1 1 8 8H4");
	path(s, "m8 22-4-4 4-4");
	return s;
}

export function JapaneseYenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 9.5V21m0-11.5L6 3m6 6.5L18 3");
	path(s, "M6 15h12");
	path(s, "M6 11h12");
	return s;
}

export function JoystickIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z",
	);
	path(s, "M6 15v-2");
	path(s, "M12 15V9");
	circle(s, 12, 6, 3);
	return s;
}

export function KanbanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 3v14");
	path(s, "M12 3v8");
	path(s, "M19 3v18");
	return s;
}

export function KayakIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z");
	path(
		s,
		"M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61",
	);
	path(s, "m6.707 6.707 10.586 10.586");
	path(s, "M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z");
	return s;
}

export function KeyRoundIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
	);
	circle(s, 16.5, 7.5, 0.5, { fill: "currentColor" });
	return s;
}

export function KeySquareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z",
	);
	path(s, "m14 7 3 3");
	path(
		s,
		"m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814",
	);
	return s;
}

export function KeyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4");
	path(s, "m21 2-9.6 9.6");
	circle(s, 7.5, 15.5, 5.5);
	return s;
}

export function KeyboardMusicIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "16", x: "2", y: "4", rx: "2" });
	path(s, "M6 8h4");
	path(s, "M14 8h.01");
	path(s, "M18 8h.01");
	path(s, "M2 12h20");
	path(s, "M6 12v4");
	path(s, "M10 12v4");
	path(s, "M14 12v4");
	path(s, "M18 12v4");
	return s;
}

export function KeyboardOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M 20 4 A2 2 0 0 1 22 6");
	path(s, "M 22 6 L 22 16.41");
	path(s, "M 7 16 L 16 16");
	path(s, "M 9.69 4 L 20 4");
	path(s, "M14 8h.01");
	path(s, "M18 8h.01");
	path(s, "m2 2 20 20");
	path(s, "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2");
	path(s, "M6 8h.01");
	path(s, "M8 12h.01");
	return s;
}

export function KeyboardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 8h.01");
	path(s, "M12 12h.01");
	path(s, "M14 8h.01");
	path(s, "M16 12h.01");
	path(s, "M18 8h.01");
	path(s, "M6 8h.01");
	path(s, "M7 16h10");
	path(s, "M8 12h.01");
	rect(s, { width: "20", height: "16", x: "2", y: "4", rx: "2" });
	return s;
}

export function LampCeilingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v5");
	path(s, "M14.829 15.998a3 3 0 1 1-5.658 0");
	path(
		s,
		"M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z",
	);
	return s;
}

export function LampDeskIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z",
	);
	path(s, "m14.207 4.793-3.414 3.414");
	path(
		s,
		"M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
	);
	path(s, "m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18");
	return s;
}

export function LampFloorIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 10v12");
	path(
		s,
		"M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z",
	);
	path(s, "M9 22h6");
	return s;
}

export function LampWallDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z",
	);
	path(
		s,
		"M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z",
	);
	path(s, "M8 6h4a2 2 0 0 1 2 2v5");
	return s;
}

export function LampWallUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z",
	);
	path(
		s,
		"M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",
	);
	path(s, "M8 18h4a2 2 0 0 0 2-2v-5");
	return s;
}

export function LampIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 12v6");
	path(
		s,
		"M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z",
	);
	path(
		s,
		"M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z",
	);
	return s;
}

export function LandPlotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m12 8 6-3-6-3v10");
	path(
		s,
		"m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12",
	);
	path(s, "m6.49 12.85 11.02 6.3");
	path(s, "M17.51 12.85 6.5 19.15");
	return s;
}

export function LandmarkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 18v-7");
	path(
		s,
		"M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",
	);
	path(s, "M14 18v-7");
	path(s, "M18 18v-7");
	path(s, "M3 22h18");
	path(s, "M6 18v-7");
	return s;
}

export function LanguagesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m5 8 6 6");
	path(s, "m4 14 6-6 2-3");
	path(s, "M2 5h12");
	path(s, "M7 2h1");
	path(s, "m22 22-5-10-5 10");
	path(s, "M14 18h6");
	return s;
}

export function LaptopMinimalCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 20h20");
	path(s, "m9 10 2 2 4-4");
	rect(s, { x: "3", y: "4", width: "18", height: "12", rx: "2" });
	return s;
}

export function LaptopMinimalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "12", x: "3", y: "4", rx: "2", ry: "2" });
	line(s, 2, 20, 22, 20);
	return s;
}

export function LaptopIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z",
	);
	path(s, "M20.054 15.987H3.946");
	return s;
}

export function LassoSelectIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7 22a5 5 0 0 1-2-4");
	path(s, "M7 16.93c.96.43 1.96.74 2.99.91");
	path(
		s,
		"M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2",
	);
	path(s, "M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z");
	path(
		s,
		"M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z",
	);
	return s;
}

export function LassoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3.704 14.467a10 8 0 1 1 3.115 2.375");
	path(s, "M7 22a5 5 0 0 1-2-3.994");
	circle(s, 5, 16, 2);
	return s;
}

export function LaughIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z");
	line(s, 9, 9, 9.01, 9);
	line(s, 15, 9, 15.01, 9);
	return s;
}

export function Layers2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z",
	);
	path(
		s,
		"m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845",
	);
	return s;
}

export function LayersPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z",
	);
	path(s, "M16 17h6");
	path(s, "M19 14v6");
	path(s, "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178");
	path(s, "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962");
	return s;
}

export function LayersIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
	);
	path(
		s,
		"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
	);
	path(
		s,
		"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
	);
	return s;
}

export function LayoutDashboardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "7", height: "9", x: "3", y: "3", rx: "1" });
	rect(s, { width: "7", height: "5", x: "14", y: "3", rx: "1" });
	rect(s, { width: "7", height: "9", x: "14", y: "12", rx: "1" });
	rect(s, { width: "7", height: "5", x: "3", y: "16", rx: "1" });
	return s;
}

export function LayoutGridIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "7", height: "7", x: "3", y: "3", rx: "1" });
	rect(s, { width: "7", height: "7", x: "14", y: "3", rx: "1" });
	rect(s, { width: "7", height: "7", x: "14", y: "14", rx: "1" });
	rect(s, { width: "7", height: "7", x: "3", y: "14", rx: "1" });
	return s;
}

export function LayoutListIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "7", height: "7", x: "3", y: "3", rx: "1" });
	rect(s, { width: "7", height: "7", x: "3", y: "14", rx: "1" });
	path(s, "M14 4h7");
	path(s, "M14 9h7");
	path(s, "M14 15h7");
	path(s, "M14 20h7");
	return s;
}

export function LayoutPanelLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "7", height: "18", x: "3", y: "3", rx: "1" });
	rect(s, { width: "7", height: "7", x: "14", y: "3", rx: "1" });
	rect(s, { width: "7", height: "7", x: "14", y: "14", rx: "1" });
	return s;
}

export function LayoutPanelTopIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "7", x: "3", y: "3", rx: "1" });
	rect(s, { width: "7", height: "7", x: "3", y: "14", rx: "1" });
	rect(s, { width: "7", height: "7", x: "14", y: "14", rx: "1" });
	return s;
}

export function LayoutTemplateIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "7", x: "3", y: "3", rx: "1" });
	rect(s, { width: "9", height: "7", x: "3", y: "14", rx: "1" });
	rect(s, { width: "5", height: "7", x: "16", y: "14", rx: "1" });
	return s;
}

export function LeafIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
	);
	path(s, "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12");
	return s;
}

export function LeafyGreenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22",
	);
	path(s, "M2 22 17 7");
	return s;
}

export function LecternIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3",
	);
	path(s, "M18 6V3a1 1 0 0 0-1-1h-3");
	rect(s, { width: "8", height: "12", x: "8", y: "10", rx: "1" });
	return s;
}

export function LensConcaveIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M7 2a1 1 0 0 0-.8 1.6 14 14 0 0 1 0 16.8A1 1 0 0 0 7 22h10a1 1 0 0 0 .8-1.6 14 14 0 0 1 0-16.8A1 1 0 0 0 17 2z",
	);
	return s;
}

export function LensConvexIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13.433 2a1 1 0 0 1 .824.448 18 18 0 0 1 0 19.104 1 1 0 0 1-.824.448h-2.866a1 1 0 0 1-.824-.448 18 18 0 0 1 0-19.104A1 1 0 0 1 10.567 2z",
	);
	return s;
}

export function LibraryBigIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "18", x: "3", y: "3", rx: "1" });
	path(s, "M7 3v18");
	path(
		s,
		"M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z",
	);
	return s;
}

export function LibraryIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 6 4 14");
	path(s, "M12 6v14");
	path(s, "M8 8v12");
	path(s, "M4 4v16");
	return s;
}

export function LifeBuoyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "m4.93 4.93 4.24 4.24");
	path(s, "m14.83 9.17 4.24-4.24");
	path(s, "m14.83 14.83 4.24 4.24");
	path(s, "m9.17 14.83-4.24 4.24");
	circle(s, 12, 12, 4);
	return s;
}

export function LigatureIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 12h2v8");
	path(s, "M14 20h4");
	path(s, "M6 12h4");
	path(s, "M6 20h4");
	path(s, "M8 20V8a4 4 0 0 1 7.464-2");
	return s;
}

export function LightbulbOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5");
	path(s, "m2 2 20 20");
	path(s, "M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5");
	path(s, "M9 18h6");
	path(s, "M10 22h4");
	return s;
}

export function LightbulbIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
	);
	path(s, "M9 18h6");
	path(s, "M10 22h4");
	return s;
}

export function LineDotRightHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M 3 12 L 15 12");
	circle(s, 18, 12, 3);
	return s;
}

export function LineSquiggleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2",
	);
	return s;
}

export function LineStyleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 5h2");
	path(s, "M15 12h6");
	path(s, "M19 5h2");
	path(s, "M3 12h6");
	path(s, "M3 19h18");
	path(s, "M3 5h2");
	return s;
}

export function Link2OffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9 17H7A5 5 0 0 1 7 7");
	path(s, "M15 7h2a5 5 0 0 1 4 8");
	line(s, 8, 12, 12, 12);
	line(s, 2, 2, 22, 22);
	return s;
}

export function Link2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9 17H7A5 5 0 0 1 7 7h2");
	path(s, "M15 7h2a5 5 0 1 1 0 10h-2");
	line(s, 8, 12, 16, 12);
	return s;
}

export function LinkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71");
	path(s, "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71");
	return s;
}

export function ListCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 5H3");
	path(s, "M16 12H3");
	path(s, "M11 19H3");
	path(s, "m15 18 2 2 4-4");
	return s;
}

export function ListChecksIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 5h8");
	path(s, "M13 12h8");
	path(s, "M13 19h8");
	path(s, "m3 17 2 2 4-4");
	path(s, "m3 7 2 2 4-4");
	return s;
}

export function ListChevronsDownUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 5h8");
	path(s, "M3 12h8");
	path(s, "M3 19h8");
	path(s, "m15 5 3 3 3-3");
	path(s, "m15 19 3-3 3 3");
	return s;
}

export function ListChevronsUpDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 5h8");
	path(s, "M3 12h8");
	path(s, "M3 19h8");
	path(s, "m15 8 3-3 3 3");
	path(s, "m15 16 3 3 3-3");
	return s;
}

export function ListCollapseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 5h11");
	path(s, "M10 12h11");
	path(s, "M10 19h11");
	path(s, "m3 10 3-3-3-3");
	path(s, "m3 20 3-3-3-3");
	return s;
}

export function ListEndIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 5H3");
	path(s, "M16 12H3");
	path(s, "M9 19H3");
	path(s, "m16 16-3 3 3 3");
	path(s, "M21 5v12a2 2 0 0 1-2 2h-6");
	return s;
}

export function ListFilterPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 5H2");
	path(s, "M6 12h12");
	path(s, "M9 19h6");
	path(s, "M16 5h6");
	path(s, "M19 8V2");
	return s;
}

export function ListFilterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 5h20");
	path(s, "M6 12h12");
	path(s, "M9 19h6");
	return s;
}

export function ListIndentDecreaseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 5H11");
	path(s, "M21 12H11");
	path(s, "M21 19H11");
	path(s, "m7 8-4 4 4 4");
	return s;
}

export function ListIndentIncreaseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 5H11");
	path(s, "M21 12H11");
	path(s, "M21 19H11");
	path(s, "m3 8 4 4-4 4");
	return s;
}

export function ListMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 5H3");
	path(s, "M11 12H3");
	path(s, "M16 19H3");
	path(s, "M21 12h-6");
	return s;
}

export function ListMusicIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 5H3");
	path(s, "M11 12H3");
	path(s, "M11 19H3");
	path(s, "M21 16V5");
	circle(s, 18, 16, 3);
	return s;
}

export function ListOrderedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 5h10");
	path(s, "M11 12h10");
	path(s, "M11 19h10");
	path(s, "M4 4h1v5");
	path(s, "M4 9h2");
	path(s, "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02");
	return s;
}

export function ListPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 5H3");
	path(s, "M11 12H3");
	path(s, "M16 19H3");
	path(s, "M18 9v6");
	path(s, "M21 12h-6");
	return s;
}

export function ListRestartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 5H3");
	path(s, "M7 12H3");
	path(s, "M7 19H3");
	path(
		s,
		"M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14",
	);
	path(s, "M11 10v4h4");
	return s;
}

export function ListStartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 5h6");
	path(s, "M3 12h13");
	path(s, "M3 19h13");
	path(s, "m16 8-3-3 3-3");
	path(s, "M21 19V7a2 2 0 0 0-2-2h-6");
	return s;
}

export function ListTodoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 5h8");
	path(s, "M13 12h8");
	path(s, "M13 19h8");
	path(s, "m3 17 2 2 4-4");
	rect(s, { x: "3", y: "4", width: "6", height: "6", rx: "1" });
	return s;
}

export function ListTreeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 5h13");
	path(s, "M13 12h8");
	path(s, "M13 19h8");
	path(s, "M3 10a2 2 0 0 0 2 2h3");
	path(s, "M3 5v12a2 2 0 0 0 2 2h3");
	return s;
}

export function ListVideoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 5H3");
	path(s, "M10 12H3");
	path(s, "M10 19H3");
	path(
		s,
		"M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z",
	);
	return s;
}

export function ListXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 5H3");
	path(s, "M11 12H3");
	path(s, "M16 19H3");
	path(s, "m15.5 9.5 5 5");
	path(s, "m20.5 9.5-5 5");
	return s;
}

export function ListIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 5h.01");
	path(s, "M3 12h.01");
	path(s, "M3 19h.01");
	path(s, "M8 5h13");
	path(s, "M8 12h13");
	path(s, "M8 19h13");
	return s;
}

export function LoaderCircleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 12a9 9 0 1 1-6.219-8.56");
	return s;
}

export function LoaderPinwheelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0");
	path(s, "M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6");
	path(s, "M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6");
	circle(s, 12, 12, 10);
	return s;
}

export function LoaderIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v4");
	path(s, "m16.2 7.8 2.9-2.9");
	path(s, "M18 12h4");
	path(s, "m16.2 16.2 2.9 2.9");
	path(s, "M12 18v4");
	path(s, "m4.9 19.1 2.9-2.9");
	path(s, "M2 12h4");
	path(s, "m4.9 4.9 2.9 2.9");
	return s;
}

export function LocateFixedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 2, 12, 5, 12);
	line(s, 19, 12, 22, 12);
	line(s, 12, 2, 12, 5);
	line(s, 12, 19, 12, 22);
	circle(s, 12, 12, 7);
	circle(s, 12, 12, 3);
	return s;
}

export function LocateOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 19v3");
	path(s, "M12 2v3");
	path(s, "M18.89 13.24a7 7 0 0 0-8.13-8.13");
	path(s, "M19 12h3");
	path(s, "M2 12h3");
	path(s, "m2 2 20 20");
	path(s, "M7.05 7.05a7 7 0 0 0 9.9 9.9");
	return s;
}

export function LocateIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 2, 12, 5, 12);
	line(s, 19, 12, 22, 12);
	line(s, 12, 2, 12, 5);
	line(s, 12, 19, 12, 22);
	circle(s, 12, 12, 7);
	return s;
}

export function LockKeyholeOpenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 16, 1);
	rect(s, { width: "18", height: "12", x: "3", y: "10", rx: "2" });
	path(s, "M7 10V7a5 5 0 0 1 9.33-2.5");
	return s;
}

export function LockKeyholeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 16, 1);
	rect(s, { x: "3", y: "10", width: "18", height: "12", rx: "2" });
	path(s, "M7 10V7a5 5 0 0 1 10 0v3");
	return s;
}

export function LockOpenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" });
	path(s, "M7 11V7a5 5 0 0 1 9.9-1");
	return s;
}

export function LockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2" });
	path(s, "M7 11V7a5 5 0 0 1 10 0v4");
	return s;
}

export function LogInIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10 17 5-5-5-5");
	path(s, "M15 12H3");
	path(s, "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4");
	return s;
}

export function LogOutIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 17 5-5-5-5");
	path(s, "M21 12H9");
	path(s, "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4");
	return s;
}

export function LogsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 5h1");
	path(s, "M3 12h1");
	path(s, "M3 19h1");
	path(s, "M8 5h1");
	path(s, "M8 12h1");
	path(s, "M8 19h1");
	path(s, "M13 5h8");
	path(s, "M13 12h8");
	path(s, "M13 19h8");
	return s;
}

export function LollipopIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 11, 11, 8);
	path(s, "m21 21-4.3-4.3");
	path(s, "M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0");
	return s;
}

export function LuggageIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2",
	);
	path(s, "M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14");
	path(s, "M10 20h4");
	circle(s, 16, 20, 2);
	circle(s, 8, 20, 2);
	return s;
}

export function MagnetIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m12 15 4 4");
	path(
		s,
		"M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z",
	);
	path(s, "m5 8 4 4");
	return s;
}

export function MailCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8");
	path(s, "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7");
	path(s, "m16 19 2 2 4-4");
	return s;
}

export function MailMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8");
	path(s, "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7");
	path(s, "M16 19h6");
	return s;
}

export function MailOpenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
	);
	path(s, "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10");
	return s;
}

export function MailPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8");
	path(s, "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7");
	path(s, "M19 16v6");
	path(s, "M16 19h6");
	return s;
}

export function MailQuestionMarkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5");
	path(s, "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7");
	path(
		s,
		"M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2",
	);
	path(s, "M20 22v.01");
	return s;
}

export function MailSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5");
	path(s, "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7");
	path(s, "M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z");
	circle(s, 18, 18, 3);
	path(s, "m22 22-1.5-1.5");
	return s;
}

export function MailWarningIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5");
	path(s, "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7");
	path(s, "M20 14v4");
	path(s, "M20 22v.01");
	return s;
}

export function MailXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9");
	path(s, "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7");
	path(s, "m17 17 4 4");
	path(s, "m21 17-4 4");
	return s;
}

export function MailIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7");
	rect(s, { x: "2", y: "4", width: "20", height: "16", rx: "2" });
	return s;
}

export function MailboxIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z",
	);
	_polyline(s, "15,9 18,9 18,11");
	path(s, "M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2");
	line(s, 6, 10, 7, 10);
	return s;
}

export function MailsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732");
	path(s, "m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5");
	rect(s, { x: "7", y: "3", width: "15", height: "12", rx: "2" });
	return s;
}

export function MapMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14",
	);
	path(s, "M15 5.764V14");
	path(s, "M21 18h-6");
	path(s, "M9 3.236v15");
	return s;
}

export function MapPinCheckInsideIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
	);
	path(s, "m9 10 2 2 4-4");
	return s;
}

export function MapPinCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728",
	);
	circle(s, 12, 10, 3);
	path(s, "m16 18 2 2 4-4");
	return s;
}

export function MapPinHouseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z",
	);
	path(
		s,
		"M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2",
	);
	path(s, "M18 22v-3");
	circle(s, 10, 10, 3);
	return s;
}

export function MapPinMinusInsideIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
	);
	path(s, "M9 10h6");
	return s;
}

export function MapPinMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738",
	);
	circle(s, 12, 10, 3);
	path(s, "M16 18h6");
	return s;
}

export function MapPinOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12.75 7.09a3 3 0 0 1 2.16 2.16");
	path(
		s,
		"M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568",
	);
	path(s, "m2 2 20 20");
	path(s, "M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533");
	path(s, "M9.13 9.13a3 3 0 0 0 3.74 3.74");
	return s;
}

export function MapPinPenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468");
	path(
		s,
		"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
	);
	circle(s, 10, 10, 3);
	return s;
}

export function MapPinPlusInsideIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
	);
	path(s, "M12 7v6");
	path(s, "M9 10h6");
	return s;
}

export function MapPinPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738",
	);
	circle(s, 12, 10, 3);
	path(s, "M16 18h6");
	path(s, "M19 15v6");
	return s;
}

export function MapPinSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M 12.248 21.969 a 1 1 0 0 1 -0.849 -0.17 C 9.539 20.193 4 14.993 4 10 a 8 8 0 0 1 16 0 C 20 10.42 19.961 10.841 19.888 11.262",
	);
	path(s, "m22 22-1.88-1.88");
	circle(s, 12, 10, 3);
	circle(s, 18, 18, 3);
	return s;
}

export function MapPinXInsideIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
	);
	path(s, "m14.5 7.5-5 5");
	path(s, "m9.5 7.5 5 5");
	return s;
}

export function MapPinXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077",
	);
	circle(s, 12, 10, 3);
	path(s, "m21.5 15.5-5 5");
	path(s, "m21.5 20.5-5-5");
	return s;
}

export function MapPinIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
	);
	circle(s, 12, 10, 3);
	return s;
}

export function MapPinnedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",
	);
	circle(s, 12, 8, 2);
	path(
		s,
		"M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",
	);
	return s;
}

export function MapPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12",
	);
	path(s, "M15 5.764V12");
	path(s, "M18 15v6");
	path(s, "M21 18h-6");
	path(s, "M9 3.236v15");
	return s;
}

export function MapIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
	);
	path(s, "M15 5.764v15");
	path(s, "M9 3.236v15");
	return s;
}

export function MarsStrokeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14 6 4 4");
	path(s, "M17 3h4v4");
	path(s, "m21 3-7.75 7.75");
	circle(s, 9, 15, 6);
	return s;
}

export function MarsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 3h5v5");
	path(s, "m21 3-6.75 6.75");
	circle(s, 10, 14, 6);
	return s;
}

export function MartiniIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 22h8");
	path(s, "M12 11v11");
	path(s, "m19 3-7 8-7-8Z");
	return s;
}

export function Maximize2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 3h6v6");
	path(s, "m21 3-7 7");
	path(s, "m3 21 7-7");
	path(s, "M9 21H3v-6");
	return s;
}

export function MaximizeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 3H5a2 2 0 0 0-2 2v3");
	path(s, "M21 8V5a2 2 0 0 0-2-2h-3");
	path(s, "M3 16v3a2 2 0 0 0 2 2h3");
	path(s, "M16 21h3a2 2 0 0 0 2-2v-3");
	return s;
}

export function MedalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15",
	);
	path(s, "M11 12 5.12 2.2");
	path(s, "m13 12 5.88-9.8");
	path(s, "M8 7h8");
	circle(s, 12, 17, 5);
	path(s, "M12 18v-2h-.5");
	return s;
}

export function MegaphoneOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11.636 6A13 13 0 0 0 19.4 3.2 1 1 0 0 1 21 4v11.344");
	path(s, "M14.378 14.357A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1");
	path(s, "m2 2 20 20");
	path(s, "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14");
	path(s, "M8 8v6");
	return s;
}

export function MegaphoneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
	);
	path(s, "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14");
	path(s, "M8 6v8");
	return s;
}

export function MehIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	line(s, 8, 15, 16, 15);
	line(s, 9, 9, 9.01, 9);
	line(s, 15, 9, 15.01, 9);
	return s;
}

export function MemoryStickIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 12v-2");
	path(s, "M12 18v-2");
	path(s, "M16 12v-2");
	path(s, "M16 18v-2");
	path(s, "M2 11h1.5");
	path(s, "M20 18v-2");
	path(s, "M20.5 11H22");
	path(s, "M4 18v-2");
	path(s, "M8 12v-2");
	path(s, "M8 18v-2");
	rect(s, { x: "2", y: "6", width: "20", height: "10", rx: "2" });
	return s;
}

export function MenuIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 5h16");
	path(s, "M4 12h16");
	path(s, "M4 19h16");
	return s;
}

export function MergeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m8 6 4-4 4 4");
	path(s, "M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22");
	path(s, "m20 22-5-5");
	return s;
}

export function MessageCircleCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	);
	path(s, "m9 12 2 2 4-4");
	return s;
}

export function MessageCircleCodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10 9-3 3 3 3");
	path(s, "m14 15 3-3-3-3");
	path(
		s,
		"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	);
	return s;
}

export function MessageCircleDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.1 2.182a10 10 0 0 1 3.8 0");
	path(s, "M13.9 21.818a10 10 0 0 1-3.8 0");
	path(s, "M17.609 3.72a10 10 0 0 1 2.69 2.7");
	path(s, "M2.182 13.9a10 10 0 0 1 0-3.8");
	path(s, "M20.28 17.61a10 10 0 0 1-2.7 2.69");
	path(s, "M21.818 10.1a10 10 0 0 1 0 3.8");
	path(s, "M3.721 6.391a10 10 0 0 1 2.7-2.69");
	path(s, "m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98");
	return s;
}

export function MessageCircleHeartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	);
	path(
		s,
		"M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z",
	);
	return s;
}

export function MessageCircleMoreIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	);
	path(s, "M8 12h.01");
	path(s, "M12 12h.01");
	path(s, "M16 12h.01");
	return s;
}

export function MessageCircleOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m2 2 20 20");
	path(
		s,
		"M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989",
	);
	path(s, "M8.35 2.69A10 10 0 0 1 21.3 15.65");
	return s;
}

export function MessageCirclePlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	);
	path(s, "M8 12h8");
	path(s, "M12 8v8");
	return s;
}

export function MessageCircleQuestionMarkIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	);
	path(s, "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3");
	path(s, "M12 17h.01");
	return s;
}

export function MessageCircleReplyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	);
	path(s, "m10 15-3-3 3-3");
	path(s, "M7 12h8a2 2 0 0 1 2 2v1");
	return s;
}

export function MessageCircleWarningIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	);
	path(s, "M12 8v4");
	path(s, "M12 16h.01");
	return s;
}

export function MessageCircleXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	);
	path(s, "m15 9-6 6");
	path(s, "m9 9 6 6");
	return s;
}

export function MessageCircleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
	);
	return s;
}

export function MessageSquareCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	path(s, "m9 11 2 2 4-4");
	return s;
}

export function MessageSquareCodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	path(s, "m10 8-3 3 3 3");
	path(s, "m14 14 3-3-3-3");
	return s;
}

export function MessageSquareDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 3h2");
	path(s, "M16 19h-2");
	path(s, "M2 12v-2");
	path(s, "M2 16v5.286a.71.71 0 0 0 1.212.502l1.149-1.149");
	path(s, "M20 19a2 2 0 0 0 2-2v-1");
	path(s, "M22 10v2");
	path(s, "M22 6V5a2 2 0 0 0-2-2");
	path(s, "M4 3a2 2 0 0 0-2 2v1");
	path(s, "M8 19h2");
	path(s, "M8 3h2");
	return s;
}

export function MessageSquareDiffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	path(s, "M10 15h4");
	path(s, "M10 9h4");
	path(s, "M12 7v4");
	return s;
}

export function MessageSquareDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.7 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4.7",
	);
	circle(s, 19, 6, 3);
	return s;
}

export function MessageSquareHeartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	path(
		s,
		"M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5",
	);
	return s;
}

export function MessageSquareLockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10",
	);
	path(s, "M20 15v-2a2 2 0 0 0-4 0v2");
	rect(s, { x: "14", y: "15", width: "8", height: "5", rx: "1" });
	return s;
}

export function MessageSquareMoreIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	path(s, "M12 11h.01");
	path(s, "M16 11h.01");
	path(s, "M8 11h.01");
	return s;
}

export function MessageSquareOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826",
	);
	path(s, "m2 2 20 20");
	path(s, "M8.656 3H20a2 2 0 0 1 2 2v11.344");
	return s;
}

export function MessageSquarePlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	path(s, "M12 8v6");
	path(s, "M9 11h6");
	return s;
}

export function MessageSquareQuoteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 14a2 2 0 0 0 2-2V8h-2");
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	path(s, "M8 14a2 2 0 0 0 2-2V8H8");
	return s;
}

export function MessageSquareReplyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	path(s, "m10 8-3 3 3 3");
	path(s, "M17 14v-1a2 2 0 0 0-2-2H7");
	return s;
}

export function MessageSquareShareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4",
	);
	path(s, "M16 3h6v6");
	path(s, "m16 9 6-6");
	return s;
}

export function MessageSquareTextIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	path(s, "M7 11h10");
	path(s, "M7 15h6");
	path(s, "M7 7h8");
	return s;
}

export function MessageSquareWarningIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	path(s, "M12 15h.01");
	path(s, "M12 7v4");
	return s;
}

export function MessageSquareXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	path(s, "m14.5 8.5-5 5");
	path(s, "m9.5 8.5 5 5");
	return s;
}

export function MessageSquareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
	);
	return s;
}

export function MessagesSquareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
	);
	path(
		s,
		"M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",
	);
	return s;
}

export function MetronomeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 11.4V9.1");
	path(s, "m12 17 6.59-6.59");
	path(
		s,
		"m15.05 5.7-.218-.691a3 3 0 0 0-5.663 0L4.418 19.695A1 1 0 0 0 5.37 21h13.253a1 1 0 0 0 .951-1.31L18.45 16.2",
	);
	circle(s, 20, 9, 2);
	return s;
}

export function MicOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 19v3");
	path(s, "M15 9.34V5a3 3 0 0 0-5.68-1.33");
	path(s, "M16.95 16.95A7 7 0 0 1 5 12v-2");
	path(s, "M18.89 13.23A7 7 0 0 0 19 12v-2");
	path(s, "m2 2 20 20");
	path(s, "M9 9v3a3 3 0 0 0 5.12 2.12");
	return s;
}

export function MicVocalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
	);
	path(
		s,
		"M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
	);
	circle(s, 16, 7, 5);
	return s;
}

export function MicIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 19v3");
	path(s, "M19 10v2a7 7 0 0 1-14 0v-2");
	rect(s, { x: "9", y: "2", width: "6", height: "13", rx: "3" });
	return s;
}

export function MicrochipIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 12h4");
	path(s, "M10 17h4");
	path(s, "M10 7h4");
	path(s, "M18 12h2");
	path(s, "M18 18h2");
	path(s, "M18 6h2");
	path(s, "M4 12h2");
	path(s, "M4 18h2");
	path(s, "M4 6h2");
	rect(s, { x: "6", y: "2", width: "12", height: "20", rx: "2" });
	return s;
}

export function MicroscopeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 18h8");
	path(s, "M3 22h18");
	path(s, "M14 22a7 7 0 1 0 0-14h-1");
	path(s, "M9 14h2");
	path(s, "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z");
	path(s, "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3");
	return s;
}

export function MicrowaveIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "15", x: "2", y: "4", rx: "2" });
	rect(s, { width: "8", height: "7", x: "6", y: "8", rx: "1" });
	path(s, "M18 8v7");
	path(s, "M6 19v2");
	path(s, "M18 19v2");
	return s;
}

export function MilestoneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13v8");
	path(s, "M12 3v3");
	path(
		s,
		"M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
	);
	return s;
}

export function MilkOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2h8");
	path(
		s,
		"M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3",
	);
	path(s, "M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435");
	line(s, 2, 2, 22, 22);
	return s;
}

export function MilkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2h8");
	path(
		s,
		"M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",
	);
	path(s, "M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0");
	return s;
}

export function Minimize2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14 10 7-7");
	path(s, "M20 10h-6V4");
	path(s, "m3 21 7-7");
	path(s, "M4 14h6v6");
	return s;
}

export function MinimizeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 3v3a2 2 0 0 1-2 2H3");
	path(s, "M21 8h-3a2 2 0 0 1-2-2V3");
	path(s, "M3 16h3a2 2 0 0 1 2 2v3");
	path(s, "M16 21v-3a2 2 0 0 1 2-2h3");
	return s;
}

export function MinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 12h14");
	return s;
}

export function MirrorRectangularIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 6 8 9");
	path(s, "m16 7-8 8");
	rect(s, { x: "4", y: "2", width: "16", height: "20", rx: "2" });
	return s;
}

export function MirrorRoundIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 6.6 8.6 8");
	path(s, "M12 18v4");
	path(s, "M15 7.5 9.5 13");
	path(s, "M7 22h10");
	circle(s, 12, 10, 8);
	return s;
}

export function MonitorCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m9 10 2 2 4-4");
	rect(s, { width: "20", height: "14", x: "2", y: "3", rx: "2" });
	path(s, "M12 17v4");
	path(s, "M8 21h8");
	return s;
}

export function MonitorCloudIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z");
	path(s, "M12 17v4");
	path(s, "M8 21h8");
	rect(s, { x: "2", y: "3", width: "20", height: "14", rx: "2" });
	return s;
}

export function MonitorCogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 17v4");
	path(s, "m14.305 7.53.923-.382");
	path(s, "m15.228 4.852-.923-.383");
	path(s, "m16.852 3.228-.383-.924");
	path(s, "m16.852 8.772-.383.923");
	path(s, "m19.148 3.228.383-.924");
	path(s, "m19.53 9.696-.382-.924");
	path(s, "m20.772 4.852.924-.383");
	path(s, "m20.772 7.148.924.383");
	path(s, "M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7");
	path(s, "M8 21h8");
	circle(s, 18, 6, 3);
	return s;
}

export function MonitorDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 17v4");
	path(s, "M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693");
	path(s, "M8 21h8");
	circle(s, 19, 6, 3);
	return s;
}

export function MonitorDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13V7");
	path(s, "m15 10-3 3-3-3");
	rect(s, { width: "20", height: "14", x: "2", y: "3", rx: "2" });
	path(s, "M12 17v4");
	path(s, "M8 21h8");
	return s;
}

export function MonitorOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 17v4");
	path(s, "M17 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 1.184-1.826");
	path(s, "m2 2 20 20");
	path(s, "M8 21h8");
	path(s, "M8.656 3H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.293 1.042");
	return s;
}

export function MonitorPauseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 13V7");
	path(s, "M14 13V7");
	rect(s, { width: "20", height: "14", x: "2", y: "3", rx: "2" });
	path(s, "M12 17v4");
	path(s, "M8 21h8");
	return s;
}

export function MonitorPlayIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",
	);
	path(s, "M12 17v4");
	path(s, "M8 21h8");
	rect(s, { x: "2", y: "3", width: "20", height: "14", rx: "2" });
	return s;
}

export function MonitorSmartphoneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8");
	path(s, "M10 19v-3.96 3.15");
	path(s, "M7 19h5");
	rect(s, { width: "6", height: "10", x: "16", y: "12", rx: "2" });
	return s;
}

export function MonitorSpeakerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5.5 20H8");
	path(s, "M17 9h.01");
	rect(s, { width: "10", height: "16", x: "12", y: "4", rx: "2" });
	path(s, "M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4");
	circle(s, 17, 15, 1);
	return s;
}

export function MonitorStopIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 17v4");
	path(s, "M8 21h8");
	rect(s, { x: "2", y: "3", width: "20", height: "14", rx: "2" });
	rect(s, { x: "9", y: "7", width: "6", height: "6", rx: "1" });
	return s;
}

export function MonitorUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m9 10 3-3 3 3");
	path(s, "M12 13V7");
	rect(s, { width: "20", height: "14", x: "2", y: "3", rx: "2" });
	path(s, "M12 17v4");
	path(s, "M8 21h8");
	return s;
}

export function MonitorXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14.5 12.5-5-5");
	path(s, "m9.5 12.5 5-5");
	rect(s, { width: "20", height: "14", x: "2", y: "3", rx: "2" });
	path(s, "M12 17v4");
	path(s, "M8 21h8");
	return s;
}

export function MonitorIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "14", x: "2", y: "3", rx: "2" });
	line(s, 8, 21, 16, 21);
	line(s, 12, 17, 12, 21);
	return s;
}

export function MoonStarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 5h4");
	path(s, "M20 3v4");
	path(
		s,
		"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
	);
	return s;
}

export function MoonIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
	);
	return s;
}

export function MotorbikeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m18 14-1-3");
	path(s, "m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81");
	path(
		s,
		"M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5",
	);
	circle(s, 19, 17, 3);
	circle(s, 5, 17, 3);
	return s;
}

export function MountainSnowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m8 3 4 8 5-5 5 15H2L8 3z");
	path(s, "M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19");
	return s;
}

export function MountainIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m8 3 4 8 5-5 5 15H2L8 3z");
	return s;
}

export function MouseLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7.318V10");
	path(s, "M5 10v5a7 7 0 0 0 14 0V9c0-3.527-2.608-6.515-6-7");
	circle(s, 7, 4, 2);
	return s;
}

export function MouseOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 6v.343");
	path(s, "M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218");
	path(s, "M19 13.343V9A7 7 0 0 0 8.56 2.902");
	path(s, "M22 22 2 2");
	return s;
}

export function MousePointer2OffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m15.55 8.45 5.138 2.087a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063L8.45 15.551",
	);
	path(s, "M22 2 2 22");
	path(s, "m6.816 11.528-2.779-6.84a.495.495 0 0 1 .651-.651l6.84 2.779");
	return s;
}

export function MousePointer2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
	);
	return s;
}

export function MousePointerBanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z",
	);
	circle(s, 16, 16, 6);
	path(s, "m11.8 11.8 8.4 8.4");
	return s;
}

export function MousePointerClickIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 4.1 12 6");
	path(s, "m5.1 8-2.9-.8");
	path(s, "m6 12-1.9 2");
	path(s, "M7.2 2.2 8 5.1");
	path(
		s,
		"M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z",
	);
	return s;
}

export function MousePointerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12.586 12.586 19 19");
	path(
		s,
		"M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z",
	);
	return s;
}

export function MouseRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7.318V10");
	path(s, "M19 10v5a7 7 0 0 1-14 0V9c0-3.527 2.608-6.515 6-7");
	circle(s, 17, 4, 2);
	return s;
}

export function MouseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { x: "5", y: "2", width: "14", height: "20", rx: "7" });
	path(s, "M12 6v4");
	return s;
}

export function Move3dIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 3v16h16");
	path(s, "m5 19 6-6");
	path(s, "m2 6 3-3 3 3");
	path(s, "m18 16 3 3-3 3");
	return s;
}

export function MoveDiagonal2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19 13v6h-6");
	path(s, "M5 11V5h6");
	path(s, "m5 5 14 14");
	return s;
}

export function MoveDiagonalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 19H5v-6");
	path(s, "M13 5h6v6");
	path(s, "M19 5 5 19");
	return s;
}

export function MoveDownLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 19H5V13");
	path(s, "M19 5L5 19");
	return s;
}

export function MoveDownRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19 13V19H13");
	path(s, "M5 5L19 19");
	return s;
}

export function MoveDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 18L12 22L16 18");
	path(s, "M12 2V22");
	return s;
}

export function MoveHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m18 8 4 4-4 4");
	path(s, "M2 12h20");
	path(s, "m6 8-4 4 4 4");
	return s;
}

export function MoveLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 8L2 12L6 16");
	path(s, "M2 12H22");
	return s;
}

export function MoveRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 8L22 12L18 16");
	path(s, "M2 12H22");
	return s;
}

export function MoveUpLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 11V5H11");
	path(s, "M5 5L19 19");
	return s;
}

export function MoveUpRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 5H19V11");
	path(s, "M19 5L5 19");
	return s;
}

export function MoveUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 6L12 2L16 6");
	path(s, "M12 2V22");
	return s;
}

export function MoveVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v20");
	path(s, "m8 18 4 4 4-4");
	path(s, "m8 6 4-4 4 4");
	return s;
}

export function MoveIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v20");
	path(s, "m15 19-3 3-3-3");
	path(s, "m19 9 3 3-3 3");
	path(s, "M2 12h20");
	path(s, "m5 9-3 3 3 3");
	path(s, "m9 5 3-3 3 3");
	return s;
}

export function Music2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 8, 18, 4);
	path(s, "M12 18V2l7 4");
	return s;
}

export function Music3Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 18, 4);
	path(s, "M16 18V2");
	return s;
}

export function Music4Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9 18V5l12-2v13");
	path(s, "m9 9 12-2");
	circle(s, 6, 18, 3);
	circle(s, 18, 16, 3);
	return s;
}

export function MusicIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9 18V5l12-2v13");
	circle(s, 6, 18, 3);
	circle(s, 18, 16, 3);
	return s;
}

export function Navigation2OffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9.31 9.31 5 21l7-4 7 4-1.17-3.17");
	path(s, "M14.53 8.88 12 2l-1.17 3.17");
	line(s, 2, 2, 22, 22);
	return s;
}

export function Navigation2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	polygon(s, "12 2 19 21 12 17 5 21 12 2");
	return s;
}

export function NavigationOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8.43 8.43 3 11l8 2 2 8 2.57-5.43");
	path(s, "M17.39 11.73 22 2l-9.73 4.61");
	line(s, 2, 2, 22, 22);
	return s;
}

export function NavigationIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	polygon(s, "3 11 22 2 13 21 11 13 3 11");
	return s;
}

export function NetworkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { x: "16", y: "16", width: "6", height: "6", rx: "1" });
	rect(s, { x: "2", y: "16", width: "6", height: "6", rx: "1" });
	rect(s, { x: "9", y: "2", width: "6", height: "6", rx: "1" });
	path(s, "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3");
	path(s, "M12 12V8");
	return s;
}

export function NewspaperIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 18h-5");
	path(s, "M18 14h-8");
	path(
		s,
		"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
	);
	rect(s, { width: "8", height: "4", x: "10", y: "6", rx: "1" });
	return s;
}

export function NfcIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 8.32a7.43 7.43 0 0 1 0 7.36");
	path(s, "M9.46 6.21a11.76 11.76 0 0 1 0 11.58");
	path(s, "M12.91 4.1a15.91 15.91 0 0 1 .01 15.8");
	path(s, "M16.37 2a20.16 20.16 0 0 1 0 20");
	return s;
}

export function NonBinaryIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v10");
	path(s, "m8.5 4 7 4");
	path(s, "m8.5 8 7-4");
	circle(s, 12, 17, 5);
	return s;
}

export function NotebookPenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4");
	path(s, "M2 6h4");
	path(s, "M2 10h4");
	path(s, "M2 14h4");
	path(s, "M2 18h4");
	path(
		s,
		"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
	);
	return s;
}

export function NotebookTabsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 6h4");
	path(s, "M2 10h4");
	path(s, "M2 14h4");
	path(s, "M2 18h4");
	rect(s, { width: "16", height: "20", x: "4", y: "2", rx: "2" });
	path(s, "M15 2v20");
	path(s, "M15 7h5");
	path(s, "M15 12h5");
	path(s, "M15 17h5");
	return s;
}

export function NotebookTextIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 6h4");
	path(s, "M2 10h4");
	path(s, "M2 14h4");
	path(s, "M2 18h4");
	rect(s, { width: "16", height: "20", x: "4", y: "2", rx: "2" });
	path(s, "M9.5 8h5");
	path(s, "M9.5 12H16");
	path(s, "M9.5 16H14");
	return s;
}

export function NotebookIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 6h4");
	path(s, "M2 10h4");
	path(s, "M2 14h4");
	path(s, "M2 18h4");
	rect(s, { width: "16", height: "20", x: "4", y: "2", rx: "2" });
	path(s, "M16 2v20");
	return s;
}

export function NotepadTextDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2v4");
	path(s, "M12 2v4");
	path(s, "M16 2v4");
	path(s, "M16 4h2a2 2 0 0 1 2 2v2");
	path(s, "M20 12v2");
	path(s, "M20 18v2a2 2 0 0 1-2 2h-1");
	path(s, "M13 22h-2");
	path(s, "M7 22H6a2 2 0 0 1-2-2v-2");
	path(s, "M4 14v-2");
	path(s, "M4 8V6a2 2 0 0 1 2-2h2");
	path(s, "M8 10h6");
	path(s, "M8 14h8");
	path(s, "M8 18h5");
	return s;
}

export function NotepadTextIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 2v4");
	path(s, "M12 2v4");
	path(s, "M16 2v4");
	rect(s, { width: "16", height: "18", x: "4", y: "4", rx: "2" });
	path(s, "M8 10h6");
	path(s, "M8 14h8");
	path(s, "M8 18h5");
	return s;
}

export function NutOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 4V2");
	path(
		s,
		"M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592a7.01 7.01 0 0 0 4.125-2.939",
	);
	path(s, "M19 10v3.343");
	path(
		s,
		"M12 12c-1.349-.573-1.905-1.005-2.5-2-.546.902-1.048 1.353-2.5 2-1.018-.644-1.46-1.08-2-2-1.028.71-1.69.918-3 1 1.081-1.048 1.757-2.03 2-3 .194-.776.84-1.551 1.79-2.21m11.654 5.997c.887-.457 1.28-.891 1.556-1.787 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4-.74 0-1.461.068-2.15.192",
	);
	line(s, 2, 2, 22, 22);
	return s;
}

export function NutIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 4V2");
	path(
		s,
		"M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4",
	);
	path(
		s,
		"M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z",
	);
	return s;
}

export function OctagonAlertIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 16h.01");
	path(s, "M12 8v4");
	path(
		s,
		"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
	);
	return s;
}

export function OctagonMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
	);
	path(s, "M8 12h8");
	return s;
}

export function OctagonPauseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 15V9");
	path(s, "M14 15V9");
	path(
		s,
		"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
	);
	return s;
}

export function OctagonXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 9-6 6");
	path(
		s,
		"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
	);
	path(s, "m9 9 6 6");
	return s;
}

export function OctagonIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
	);
	return s;
}

export function OmegaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21",
	);
	return s;
}

export function OptionIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3h6l6 18h6");
	path(s, "M14 3h7");
	return s;
}

export function OrbitIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20.341 6.484A10 10 0 0 1 10.266 21.85");
	path(s, "M3.659 17.516A10 10 0 0 1 13.74 2.152");
	circle(s, 12, 12, 3);
	circle(s, 19, 5, 2);
	circle(s, 5, 19, 2);
	return s;
}

export function OrigamiIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025");
	path(
		s,
		"m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009",
	);
	path(
		s,
		"m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027",
	);
	return s;
}

export function Package2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3v6");
	path(
		s,
		"M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z",
	);
	path(s, "M3.054 9.013h17.893");
	return s;
}

export function PackageCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22V12");
	path(s, "m16 17 2 2 4-4");
	path(
		s,
		"M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753",
	);
	path(s, "M3.29 7 12 12l8.71-5");
	path(s, "m7.5 4.27 8.997 5.148");
	return s;
}

export function PackageMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22V12");
	path(s, "M16 17h6");
	path(
		s,
		"M21 13V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955",
	);
	path(s, "M3.29 7 12 12l8.71-5");
	path(s, "m7.5 4.27 8.997 5.148");
	return s;
}

export function PackageOpenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22v-9");
	path(
		s,
		"M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z",
	);
	path(
		s,
		"M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13",
	);
	path(
		s,
		"M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z",
	);
	return s;
}

export function PackagePlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22V12");
	path(s, "M16 17h6");
	path(s, "M19 14v6");
	path(
		s,
		"M21 10.535V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955",
	);
	path(s, "M3.29 7 12 12l8.71-5");
	path(s, "m7.5 4.27 8.997 5.148");
	return s;
}

export function PackageSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22V12");
	path(s, "M20.27 18.27 22 20");
	path(
		s,
		"M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559",
	);
	path(s, "M3.29 7 12 12l8.71-5");
	path(s, "m7.5 4.27 8.997 5.148");
	circle(s, 18.5, 16.5, 2.5);
	return s;
}

export function PackageXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22V12");
	path(s, "m16.5 14.5 5 5");
	path(s, "m16.5 19.5 5-5");
	path(
		s,
		"M21 10.5V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.13-.074",
	);
	path(s, "M3.29 7 12 12l8.71-5");
	path(s, "m7.5 4.27 8.997 5.148");
	return s;
}

export function PackageIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
	);
	path(s, "M12 22V12");
	_polyline(s, "3.29 7 12 12 20.71 7");
	path(s, "m7.5 4.27 9 5.15");
	return s;
}

export function PaintBucketIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 7 6 2");
	path(s, "M18.992 12H2.041");
	path(
		s,
		"M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595",
	);
	path(
		s,
		"m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33",
	);
	return s;
}

export function PaintRollerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "16", height: "6", x: "2", y: "2", rx: "2" });
	path(s, "M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2");
	rect(s, { width: "4", height: "6", x: "8", y: "16", rx: "1" });
	return s;
}

export function PaintbrushVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2v2");
	path(s, "M14 2v4");
	path(s, "M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z");
	path(
		s,
		"M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1",
	);
	return s;
}

export function PaintbrushIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14.622 17.897-10.68-2.913");
	path(
		s,
		"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z",
	);
	path(
		s,
		"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15",
	);
	return s;
}

export function PaletteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
	);
	circle(s, 13.5, 6.5, 0.5, { fill: "currentColor" });
	circle(s, 17.5, 10.5, 0.5, { fill: "currentColor" });
	circle(s, 6.5, 12.5, 0.5, { fill: "currentColor" });
	circle(s, 8.5, 7.5, 0.5, { fill: "currentColor" });
	return s;
}

export function PandaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11.25 17.25h1.5L12 18z");
	path(s, "m15 12 2 2");
	path(s, "M18 6.5a.5.5 0 0 0-.5-.5");
	path(
		s,
		"M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83",
	);
	path(s, "M6 6.5a.495.495 0 0 1 .5-.5");
	path(s, "m9 12-2 2");
	return s;
}

export function PanelBottomCloseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 15h18");
	path(s, "m15 8-3 3-3-3");
	return s;
}

export function PanelBottomDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M14 15h1");
	path(s, "M19 15h2");
	path(s, "M3 15h2");
	path(s, "M9 15h1");
	return s;
}

export function PanelBottomOpenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 15h18");
	path(s, "m9 10 3-3 3 3");
	return s;
}

export function PanelBottomIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 15h18");
	return s;
}

export function PanelLeftCloseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M9 3v18");
	path(s, "m16 15-3-3 3-3");
	return s;
}

export function PanelLeftDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M9 14v1");
	path(s, "M9 19v2");
	path(s, "M9 3v2");
	path(s, "M9 9v1");
	return s;
}

export function PanelLeftOpenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M9 3v18");
	path(s, "m14 9 3 3-3 3");
	return s;
}

export function PanelLeftRightDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 10V9");
	path(s, "M15 15v-1");
	path(s, "M15 21v-2");
	path(s, "M15 5V3");
	path(s, "M9 10V9");
	path(s, "M9 15v-1");
	path(s, "M9 21v-2");
	path(s, "M9 5V3");
	rect(s, { x: "3", y: "3", width: "18", height: "18", rx: "2" });
	return s;
}

export function PanelLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M9 3v18");
	return s;
}

export function PanelRightCloseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M15 3v18");
	path(s, "m8 9 3 3-3 3");
	return s;
}

export function PanelRightDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M15 14v1");
	path(s, "M15 19v2");
	path(s, "M15 3v2");
	path(s, "M15 9v1");
	return s;
}

export function PanelRightOpenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M15 3v18");
	path(s, "m10 15-3-3 3-3");
	return s;
}

export function PanelRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M15 3v18");
	return s;
}

export function PanelTopBottomDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 15h1");
	path(s, "M14 9h1");
	path(s, "M19 15h2");
	path(s, "M19 9h2");
	path(s, "M3 15h2");
	path(s, "M3 9h2");
	path(s, "M9 15h1");
	path(s, "M9 9h1");
	rect(s, { x: "3", y: "3", width: "18", height: "18", rx: "2" });
	return s;
}

export function PanelTopCloseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 9h18");
	path(s, "m9 16 3-3 3 3");
	return s;
}

export function PanelTopDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M14 9h1");
	path(s, "M19 9h2");
	path(s, "M3 9h2");
	path(s, "M9 9h1");
	return s;
}

export function PanelTopOpenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 9h18");
	path(s, "m15 14-3 3-3-3");
	return s;
}

export function PanelTopIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 9h18");
	return s;
}

export function PanelsLeftBottomIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M9 3v18");
	path(s, "M9 15h12");
	return s;
}

export function PanelsRightBottomIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 15h12");
	path(s, "M15 3v18");
	return s;
}

export function PanelsTopLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 9h18");
	path(s, "M9 21V9");
	return s;
}

export function PaperclipIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
	);
	return s;
}

export function ParenthesesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 21s-4-3-4-9 4-9 4-9");
	path(s, "M16 3s4 3 4 9-4 9-4 9");
	return s;
}

export function ParkingMeterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 15h2");
	path(s, "M12 12v3");
	path(s, "M12 19v3");
	path(
		s,
		"M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z",
	);
	path(s, "M9 9a3 3 0 1 1 6 0");
	return s;
}

export function PartyPopperIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5.8 11.3 2 22l10.7-3.79");
	path(s, "M4 3h.01");
	path(s, "M22 8h.01");
	path(s, "M15 2h.01");
	path(s, "M22 20h.01");
	path(
		s,
		"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",
	);
	path(
		s,
		"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17",
	);
	path(s, "m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7");
	path(
		s,
		"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",
	);
	return s;
}

export function PauseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { x: "14", y: "3", width: "5", height: "18", rx: "1" });
	rect(s, { x: "5", y: "3", width: "5", height: "18", rx: "1" });
	return s;
}

export function PawPrintIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 11, 4, 2);
	circle(s, 18, 8, 2);
	circle(s, 20, 16, 2);
	path(
		s,
		"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z",
	);
	return s;
}

export function PcCaseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "14", height: "20", x: "5", y: "2", rx: "2" });
	path(s, "M15 14h.01");
	path(s, "M9 6h6");
	path(s, "M9 10h6");
	return s;
}

export function PenLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 21h8");
	path(
		s,
		"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	);
	return s;
}

export function PenOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982",
	);
	path(s, "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353");
	path(s, "m2 2 20 20");
	return s;
}

export function PenToolIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
	);
	path(
		s,
		"m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
	);
	path(s, "m2.3 2.3 7.286 7.286");
	circle(s, 11, 11, 2);
	return s;
}

export function PenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	);
	return s;
}

export function PencilLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 21h8");
	path(s, "m15 5 4 4");
	path(
		s,
		"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	);
	return s;
}

export function PencilOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982",
	);
	path(s, "m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353");
	path(s, "m15 5 4 4");
	path(s, "m2 2 20 20");
	return s;
}

export function PencilRulerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13",
	);
	path(s, "m8 6 2-2");
	path(s, "m18 16 2-2");
	path(
		s,
		"m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17",
	);
	path(
		s,
		"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	);
	path(s, "m15 5 4 4");
	return s;
}

export function PencilIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	);
	path(s, "m15 5 4 4");
	return s;
}

export function PentagonIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
	);
	return s;
}

export function PercentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 19, 5, 5, 19);
	circle(s, 6.5, 6.5, 2.5);
	circle(s, 17.5, 17.5, 2.5);
	return s;
}

export function PersonStandingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 5, 1);
	path(s, "m9 20 3-6 3 6");
	path(s, "m6 8 6 2 6-2");
	path(s, "M12 10v4");
	return s;
}

export function PhilippinePesoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20 11H4");
	path(s, "M20 7H4");
	path(s, "M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7");
	return s;
}

export function PhoneCallIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 2a9 9 0 0 1 9 9");
	path(s, "M13 6a5 5 0 0 1 5 5");
	path(
		s,
		"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
	);
	return s;
}

export function PhoneForwardedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 6h8");
	path(s, "m18 2 4 4-4 4");
	path(
		s,
		"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
	);
	return s;
}

export function PhoneIncomingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 2v6h6");
	path(s, "m22 2-6 6");
	path(
		s,
		"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
	);
	return s;
}

export function PhoneMissedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 2 6 6");
	path(s, "m22 2-6 6");
	path(
		s,
		"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
	);
	return s;
}

export function PhoneOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272",
	);
	path(s, "M22 2 2 22");
	path(
		s,
		"M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",
	);
	return s;
}

export function PhoneOutgoingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 8 6-6");
	path(s, "M22 8V2h-6");
	path(
		s,
		"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
	);
	return s;
}

export function PhoneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
	);
	return s;
}

export function PiIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 9, 4, 9, 20);
	path(s, "M4 7c0-1.7 1.3-3 3-3h13");
	path(s, "M18 20c-1.7 0-3-1.3-3-3V4");
	return s;
}

export function PianoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8",
	);
	path(s, "M2 14h20");
	path(s, "M6 14v4");
	path(s, "M10 14v4");
	path(s, "M14 14v4");
	path(s, "M18 14v4");
	return s;
}

export function PickaxeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999");
	path(
		s,
		"M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024",
	);
	path(
		s,
		"M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069",
	);
	path(
		s,
		"M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z",
	);
	return s;
}

export function PictureInPicture2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4");
	rect(s, { width: "10", height: "7", x: "12", y: "13", rx: "2" });
	return s;
}

export function PictureInPictureIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 10h6V4");
	path(s, "m2 4 6 6");
	path(s, "M21 10V7a2 2 0 0 0-2-2h-7");
	path(s, "M3 14v2a2 2 0 0 0 2 2h3");
	rect(s, { x: "12", y: "14", width: "10", height: "7", rx: "1" });
	return s;
}

export function PiggyBankIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z",
	);
	path(s, "M16 10h.01");
	path(s, "M2 8v1a2 2 0 0 0 2 2h1");
	return s;
}

export function PilcrowLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 3v11");
	path(s, "M14 9h-3a3 3 0 0 1 0-6h9");
	path(s, "M18 3v11");
	path(s, "M22 18H2l4-4");
	path(s, "m6 22-4-4");
	return s;
}

export function PilcrowRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 3v11");
	path(s, "M10 9H7a1 1 0 0 1 0-6h8");
	path(s, "M14 3v11");
	path(s, "m18 14 4 4H2");
	path(s, "m22 18-4 4");
	return s;
}

export function PilcrowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 4v16");
	path(s, "M17 4v16");
	path(s, "M19 4H9.5a4.5 4.5 0 0 0 0 9H13");
	return s;
}

export function PillBottleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4");
	path(s, "M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7");
	rect(s, { width: "16", height: "5", x: "4", y: "2", rx: "1" });
	return s;
}

export function PillIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z");
	path(s, "m8.5 8.5 7 7");
	return s;
}

export function PinOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 17v5");
	path(s, "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89");
	path(s, "m2 2 20 20");
	path(
		s,
		"M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
	);
	return s;
}

export function PinIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 17v5");
	path(
		s,
		"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
	);
	return s;
}

export function PipetteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12",
	);
	path(
		s,
		"m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z",
	);
	path(s, "m2 22 .414-.414");
	return s;
}

export function PizzaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m12 14-1 1");
	path(s, "m13.75 18.25-1.25 1.42");
	path(s, "M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12");
	path(s, "M18.8 9.3a1 1 0 0 0 2.1 7.7");
	path(
		s,
		"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z",
	);
	return s;
}

export function PlaneLandingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 22h20");
	path(
		s,
		"M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z",
	);
	return s;
}

export function PlaneTakeoffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 22h20");
	path(
		s,
		"M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z",
	);
	return s;
}

export function PlaneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
	);
	return s;
}

export function PlayIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	);
	return s;
}

export function Plug2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9 2v6");
	path(s, "M15 2v6");
	path(s, "M12 17v5");
	path(s, "M5 8h14");
	path(s, "M6 11V8h12v3a6 6 0 1 1-12 0Z");
	return s;
}

export function PlugZapIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",
	);
	path(s, "m2 22 3-3");
	path(s, "M7.5 13.5 10 11");
	path(s, "M10.5 16.5 13 14");
	path(s, "m18 3-4 4h6l-4 4");
	return s;
}

export function PlugIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22v-5");
	path(s, "M15 8V2");
	path(
		s,
		"M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z",
	);
	path(s, "M9 8V2");
	return s;
}

export function PlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 12h14");
	path(s, "M12 5v14");
	return s;
}

export function PocketKnifeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2");
	path(s, "M18 6h.01");
	path(s, "M6 18h.01");
	path(s, "M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z");
	path(s, "M18 11.66V22a4 4 0 0 0 4-4V6");
	return s;
}

export function PodcastIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 17a1 1 0 1 0-2 0l.5 4.5a0.5 0.5 0 0 0 1 0z");
	path(s, "M16.85 18.58a9 9 0 1 0-9.7 0");
	path(s, "M8 14a5 5 0 1 1 8 0");
	circle(s, 12, 11, 1, { fill: "currentColor" });
	return s;
}

export function PointerOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 4.5V4a2 2 0 0 0-2.41-1.957");
	path(s, "M13.9 8.4a2 2 0 0 0-1.26-1.295");
	path(
		s,
		"M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158",
	);
	path(
		s,
		"m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343",
	);
	path(s, "M6 6v8");
	path(s, "m2 2 20 20");
	return s;
}

export function PointerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 14a8 8 0 0 1-8 8");
	path(s, "M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2");
	path(s, "M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1");
	path(s, "M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10");
	path(
		s,
		"M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
	);
	return s;
}

export function PopcornIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4",
	);
	path(s, "M10 22 9 8");
	path(s, "m14 22 1-14");
	path(
		s,
		"M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z",
	);
	return s;
}

export function PopsicleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z",
	);
	path(s, "m22 22-5.5-5.5");
	return s;
}

export function PoundSterlingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 7c0-5.333-8-5.333-8 0");
	path(s, "M10 7v14");
	path(s, "M6 21h12");
	path(s, "M6 13h10");
	return s;
}

export function PowerOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18.36 6.64A9 9 0 0 1 20.77 15");
	path(s, "M6.16 6.16a9 9 0 1 0 12.68 12.68");
	path(s, "M12 2v4");
	path(s, "m2 2 20 20");
	return s;
}

export function PowerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v10");
	path(s, "M18.4 6.6a9 9 0 1 1-12.77.04");
	return s;
}

export function PresentationIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 3h20");
	path(s, "M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3");
	path(s, "m7 21 5-5 5 5");
	return s;
}

export function PrinterCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5");
	path(s, "m16 19 2 2 4-4");
	path(s, "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2");
	path(s, "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6");
	return s;
}

export function PrinterXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12.531 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6.377");
	path(s, "m16.5 16.5 5 5");
	path(s, "m16.5 21.5 5-5");
	path(s, "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.5");
	path(s, "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6");
	return s;
}

export function PrinterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
	);
	path(s, "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6");
	rect(s, { x: "6", y: "14", width: "12", height: "8", rx: "1" });
	return s;
}

export function ProjectorIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 7 3 5");
	path(s, "M9 6V3");
	path(s, "m13 7 2-2");
	circle(s, 9, 13, 3);
	path(
		s,
		"M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17",
	);
	path(s, "M16 16h2");
	return s;
}

export function ProportionsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "16", x: "2", y: "4", rx: "2" });
	path(s, "M12 9v11");
	path(s, "M2 9h13a2 2 0 0 1 2 2v9");
	return s;
}

export function PuzzleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
	);
	return s;
}

export function PyramidIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z",
	);
	path(s, "M12 2v20");
	return s;
}

export function QrCodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "5", height: "5", x: "3", y: "3", rx: "1" });
	rect(s, { width: "5", height: "5", x: "16", y: "3", rx: "1" });
	rect(s, { width: "5", height: "5", x: "3", y: "16", rx: "1" });
	path(s, "M21 16h-3a2 2 0 0 0-2 2v3");
	path(s, "M21 21v.01");
	path(s, "M12 7v3a2 2 0 0 1-2 2H7");
	path(s, "M3 12h.01");
	path(s, "M12 3h.01");
	path(s, "M12 16v.01");
	path(s, "M16 12h1");
	path(s, "M21 12v.01");
	path(s, "M12 21v-1");
	return s;
}

export function QuoteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
	);
	path(
		s,
		"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
	);
	return s;
}

export function RabbitIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 16a3 3 0 0 1 2.24 5");
	path(s, "M18 12h.01");
	path(
		s,
		"M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3",
	);
	path(s, "M20 8.54V4a2 2 0 1 0-4 0v3");
	path(s, "M7.612 12.524a3 3 0 1 0-1.6 4.3");
	return s;
}

export function RadarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19.07 4.93A10 10 0 0 0 6.99 3.34");
	path(s, "M4 6h.01");
	path(s, "M2.29 9.62A10 10 0 1 0 21.31 8.35");
	path(s, "M16.24 7.76A6 6 0 1 0 8.23 16.67");
	path(s, "M12 18h.01");
	path(s, "M17.99 11.66A6 6 0 0 1 15.77 16.67");
	circle(s, 12, 12, 2);
	path(s, "m13.41 10.59 5.66-5.66");
	return s;
}

export function RadiationIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 12h.01");
	path(
		s,
		"M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z",
	);
	path(
		s,
		"M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z",
	);
	path(
		s,
		"M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z",
	);
	return s;
}

export function RadicalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21",
	);
	return s;
}

export function RadioOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.4103 10.7852C10.1529 11.1218 10 11.5425 10 11.999C10 13.1036 10.8954 13.999 12 13.999C12.5077 13.999 12.9713 13.8098 13.324 13.498",
	);
	path(s, "M16.1992 7.80078C17.4739 9.07549 18.0422 10.8109 17.9039 12.5134");
	path(s, "M19.0996 4.89844C22.0892 7.88804 22.7871 12.2879 21.1932 15.936");
	path(s, "M2 2L22 22");
	path(s, "M4.89961 19.0984C0.999609 15.1984 0.999609 8.79844 4.89961 4.89844");
	path(s, "M7.79922 16.1992C5.66828 14.0683 5.51165 10.6498 7.32931 8.25");
	return s;
}

export function RadioReceiverIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 16v2");
	path(s, "M19 16v2");
	rect(s, { width: "20", height: "8", x: "2", y: "8", rx: "2" });
	path(s, "M18 12h.01");
	return s;
}

export function RadioTowerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4.9 16.1C1 12.2 1 5.8 4.9 1.9");
	path(s, "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5");
	circle(s, 12, 9, 2);
	path(s, "M16.2 4.8c2 2 2.26 5.11.8 7.47");
	path(s, "M19.1 1.9a9.96 9.96 0 0 1 0 14.1");
	path(s, "M9.5 18h5");
	path(s, "m8 22 4-11 4 11");
	return s;
}

export function RadioIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16.247 7.761a6 6 0 0 1 0 8.478");
	path(s, "M19.075 4.933a10 10 0 0 1 0 14.134");
	path(s, "M4.925 19.067a10 10 0 0 1 0-14.134");
	path(s, "M7.753 16.239a6 6 0 0 1 0-8.478");
	circle(s, 12, 12, 2);
	return s;
}

export function RadiusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20.34 17.52a10 10 0 1 0-2.82 2.82");
	circle(s, 19, 19, 2);
	path(s, "m13.41 13.41 4.18 4.18");
	circle(s, 12, 12, 2);
	return s;
}

export function RainbowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 17a10 10 0 0 0-20 0");
	path(s, "M6 17a6 6 0 0 1 12 0");
	path(s, "M10 17a2 2 0 0 1 4 0");
	return s;
}

export function RatIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 22H4a2 2 0 0 1 0-4h12");
	path(s, "M13.236 18a3 3 0 0 0-2.2-5");
	path(s, "M16 9h.01");
	path(
		s,
		"M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3",
	);
	path(s, "M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18");
	return s;
}

export function RatioIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "12", height: "20", x: "6", y: "2", rx: "2" });
	rect(s, { width: "20", height: "12", x: "2", y: "6", rx: "2" });
	return s;
}

export function ReceiptCentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7v10");
	path(
		s,
		"M14.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0",
	);
	path(
		s,
		"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
	);
	return s;
}

export function ReceiptEuroIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0",
	);
	path(
		s,
		"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
	);
	path(s, "M8 12h5");
	return s;
}

export function ReceiptIndianRupeeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
	);
	path(s, "M8 11h8");
	path(s, "M8 7h8");
	path(s, "M9 7a4 4 0 0 1 0 8H8l3 2");
	return s;
}

export function ReceiptJapaneseYenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m12 10 3-3");
	path(
		s,
		"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
	);
	path(s, "M9 11h6");
	path(s, "M9 15h6");
	path(s, "m9 7 3 3v7");
	return s;
}

export function ReceiptPoundSterlingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 17V9.5a1 1 0 0 1 5 0");
	path(
		s,
		"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
	);
	path(s, "M8 13h5");
	path(s, "M8 17h7");
	return s;
}

export function ReceiptRussianRubleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
	);
	path(s, "M8 11h5a2 2 0 0 0 0-4h-3v10");
	path(s, "M8 15h5");
	return s;
}

export function ReceiptSwissFrancIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 11h4");
	path(s, "M10 17V7h5");
	path(
		s,
		"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
	);
	path(s, "M8 15h5");
	return s;
}

export function ReceiptTextIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 16H8");
	path(s, "M14 8H8");
	path(s, "M16 12H8");
	path(
		s,
		"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
	);
	return s;
}

export function ReceiptTurkishLiraIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 7v10a5 5 0 0 0 5-5");
	path(s, "m14 8-6 3");
	path(
		s,
		"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
	);
	return s;
}

export function ReceiptIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 17V7");
	path(s, "M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8");
	path(
		s,
		"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z",
	);
	return s;
}

export function RectangleCircleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z");
	circle(s, 14, 12, 8);
	return s;
}

export function RectangleEllipsisIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "12", x: "2", y: "6", rx: "2" });
	path(s, "M12 12h.01");
	path(s, "M17 12h.01");
	path(s, "M7 12h.01");
	return s;
}

export function RectangleGogglesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
	);
	return s;
}

export function RectangleHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "12", x: "2", y: "6", rx: "2" });
	return s;
}

export function RectangleVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "12", height: "20", x: "6", y: "2", rx: "2" });
	return s;
}

export function RecycleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",
	);
	path(
		s,
		"M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",
	);
	path(s, "m14 16-3 3 3 3");
	path(s, "M8.293 13.596 7.196 9.5 3.1 10.598");
	path(
		s,
		"m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",
	);
	path(s, "m13.378 9.633 4.096 1.098 1.097-4.096");
	return s;
}

export function Redo2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 14 5-5-5-5");
	path(s, "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13");
	return s;
}

export function RedoDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 17, 1);
	path(s, "M21 7v6h-6");
	path(s, "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7");
	return s;
}

export function RedoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 7v6h-6");
	path(s, "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7");
	return s;
}

export function RefreshCcwDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8");
	path(s, "M3 3v5h5");
	path(s, "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16");
	path(s, "M16 16h5v5");
	circle(s, 12, 12, 1);
	return s;
}

export function RefreshCcwIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8");
	path(s, "M3 3v5h5");
	path(s, "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16");
	path(s, "M16 16h5v5");
	return s;
}

export function RefreshCwOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47");
	path(s, "M8 16H3v5");
	path(s, "M3 12C3 9.51 4 7.26 5.64 5.64");
	path(s, "m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64");
	path(s, "M21 12c0 1-.16 1.97-.47 2.87");
	path(s, "M21 3v5h-5");
	path(s, "M22 22 2 2");
	return s;
}

export function RefreshCwIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8");
	path(s, "M21 3v5h-5");
	path(s, "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16");
	path(s, "M8 16H3v5");
	return s;
}

export function RefrigeratorIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z",
	);
	path(s, "M5 10h14");
	path(s, "M15 7v6");
	return s;
}

export function RegexIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 3v10");
	path(s, "m12.67 5.5 8.66 5");
	path(s, "m12.67 10.5 8.66-5");
	path(
		s,
		"M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z",
	);
	return s;
}

export function RemoveFormattingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 7V4h16v3");
	path(s, "M5 20h6");
	path(s, "M13 4 8 20");
	path(s, "m15 15 5 5");
	path(s, "m20 15-5 5");
	return s;
}

export function Repeat1Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m17 2 4 4-4 4");
	path(s, "M3 11v-1a4 4 0 0 1 4-4h14");
	path(s, "m7 22-4-4 4-4");
	path(s, "M21 13v1a4 4 0 0 1-4 4H3");
	path(s, "M11 10h1v4");
	return s;
}

export function Repeat2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m2 9 3-3 3 3");
	path(s, "M13 18H7a2 2 0 0 1-2-2V6");
	path(s, "m22 15-3 3-3-3");
	path(s, "M11 6h6a2 2 0 0 1 2 2v10");
	return s;
}

export function RepeatIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m17 2 4 4-4 4");
	path(s, "M3 11v-1a4 4 0 0 1 4-4h14");
	path(s, "m7 22-4-4 4-4");
	path(s, "M21 13v1a4 4 0 0 1-4 4H3");
	return s;
}

export function ReplaceAllIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1");
	path(s, "M14 4a1 1 0 0 1 1-1");
	path(s, "M15 10a1 1 0 0 1-1-1");
	path(s, "M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1");
	path(s, "M21 4a1 1 0 0 0-1-1");
	path(s, "M21 9a1 1 0 0 1-1 1");
	path(s, "m3 7 3 3 3-3");
	path(s, "M6 10V5a2 2 0 0 1 2-2h2");
	rect(s, { x: "3", y: "14", width: "7", height: "7", rx: "1" });
	return s;
}

export function ReplaceIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 4a1 1 0 0 1 1-1");
	path(s, "M15 10a1 1 0 0 1-1-1");
	path(s, "M21 4a1 1 0 0 0-1-1");
	path(s, "M21 9a1 1 0 0 1-1 1");
	path(s, "m3 7 3 3 3-3");
	path(s, "M6 10V5a2 2 0 0 1 2-2h2");
	rect(s, { x: "3", y: "14", width: "7", height: "7", rx: "1" });
	return s;
}

export function ReplyAllIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m12 17-5-5 5-5");
	path(s, "M22 18v-2a4 4 0 0 0-4-4H7");
	path(s, "m7 17-5-5 5-5");
	return s;
}

export function ReplyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20 18v-2a4 4 0 0 0-4-4H4");
	path(s, "m9 17-5-5 5-5");
	return s;
}

export function RewindIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z",
	);
	path(
		s,
		"M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z",
	);
	return s;
}

export function RibbonIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22",
	);
	path(s, "m12 18 2.57-3.5");
	path(s, "M6.243 9.016a7 7 0 0 1 11.507-.009");
	path(s, "M9.35 14.53 12 11.22");
	path(
		s,
		"M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z",
	);
	return s;
}

export function RoadIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 17v4");
	path(s, "M12 5V3");
	path(s, "M12 9v3");
	path(
		s,
		"M2.077 18.449A2 2 0 0 0 4 21h16a2 2 0 0 0 1.924-2.55l-4-14A2 2 0 0 0 16 3H8a2 2 0 0 0-1.924 1.45z",
	);
	return s;
}

export function RocketIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5");
	path(
		s,
		"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",
	);
	path(
		s,
		"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",
	);
	path(s, "M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05");
	return s;
}

export function RockingChairIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 13 3.708 7.416");
	path(s, "M3 19a15 15 0 0 0 18 0");
	path(s, "m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18");
	path(s, "m9 13-3.708 7.416");
	return s;
}

export function RollerCoasterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 19V5");
	path(s, "M10 19V6.8");
	path(s, "M14 19v-7.8");
	path(s, "M18 5v4");
	path(s, "M18 19v-6");
	path(s, "M22 19V9");
	path(s, "M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65");
	return s;
}

export function RoseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 10h-1a4 4 0 1 1 4-4v.534");
	path(
		s,
		"M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31",
	);
	path(
		s,
		"M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2",
	);
	path(s, "M9.77 12C4 15 2 22 2 22");
	circle(s, 17, 8, 2);
	return s;
}

export function Rotate3dIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2",
	);
	path(s, "m15.194 13.707 3.814 1.86-1.86 3.814");
	path(
		s,
		"M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4",
	);
	return s;
}

export function RotateCcwKeyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7v6");
	path(s, "M12 9h2");
	path(s, "M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8");
	path(s, "M3 3v5h5");
	circle(s, 12, 15, 2);
	return s;
}

export function RotateCcwSquareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20 9V7a2 2 0 0 0-2-2h-6");
	path(s, "m15 2-3 3 3 3");
	path(s, "M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2");
	return s;
}

export function RotateCcwIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8");
	path(s, "M3 3v5h5");
	return s;
}

export function RotateCwSquareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 5H6a2 2 0 0 0-2 2v3");
	path(s, "m9 8 3-3-3-3");
	path(s, "M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2");
	return s;
}

export function RotateCwIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8");
	path(s, "M21 3v5h-5");
	return s;
}

export function RouteOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 6, 19, 3);
	path(s, "M9 19h8.5c.4 0 .9-.1 1.3-.2");
	path(s, "M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12");
	path(s, "m2 2 20 20");
	path(s, "M21 15.3a3.5 3.5 0 0 0-3.3-3.3");
	path(s, "M15 5h-4.3");
	circle(s, 18, 5, 3);
	return s;
}

export function RouteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 6, 19, 3);
	path(s, "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15");
	circle(s, 18, 5, 3);
	return s;
}

export function RouterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "8", x: "2", y: "14", rx: "2" });
	path(s, "M6.01 18H6");
	path(s, "M10.01 18H10");
	path(s, "M15 10v4");
	path(s, "M17.84 7.17a4 4 0 0 0-5.66 0");
	path(s, "M20.66 4.34a8 8 0 0 0-11.31 0");
	return s;
}

export function Rows2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 12h18");
	return s;
}

export function Rows3Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M21 9H3");
	path(s, "M21 15H3");
	return s;
}

export function Rows4Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M21 7.5H3");
	path(s, "M21 12H3");
	path(s, "M21 16.5H3");
	return s;
}

export function RssIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 11a9 9 0 0 1 9 9");
	path(s, "M4 4a16 16 0 0 1 16 16");
	circle(s, 5, 19, 1);
	return s;
}

export function RulerDimensionLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 15v-3");
	path(s, "M14 15v-3");
	path(s, "M18 15v-3");
	path(s, "M2 8V4");
	path(s, "M22 6H2");
	path(s, "M22 8V4");
	path(s, "M6 15v-3");
	rect(s, { x: "2", y: "12", width: "20", height: "8", rx: "2" });
	return s;
}

export function RulerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z",
	);
	path(s, "m14.5 12.5 2-2");
	path(s, "m11.5 9.5 2-2");
	path(s, "m8.5 6.5 2-2");
	path(s, "m17.5 15.5 2-2");
	return s;
}

export function RussianRubleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 11h8a4 4 0 0 0 0-8H9v18");
	path(s, "M6 15h8");
	return s;
}

export function SailboatIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2v15");
	path(s, "M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z");
	path(
		s,
		"M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z",
	);
	return s;
}

export function SaladIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7 21h10");
	path(s, "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z");
	path(
		s,
		"M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1",
	);
	path(s, "m13 12 4-4");
	path(s, "M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2");
	return s;
}

export function SandwichIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777");
	path(s, "M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25");
	path(s, "M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9");
	path(s, "m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2");
	rect(s, { width: "20", height: "4", x: "2", y: "11", rx: "1" });
	return s;
}

export function SatelliteDishIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 10a7.31 7.31 0 0 0 10 10Z");
	path(s, "m9 15 3-3");
	path(s, "M17 13a6 6 0 0 0-6-6");
	path(s, "M21 13A10 10 0 0 0 11 3");
	return s;
}

export function SatelliteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5",
	);
	path(s, "M16.5 7.5 19 5");
	path(
		s,
		"m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5",
	);
	path(s, "M9 21a6 6 0 0 0-6-6");
	path(
		s,
		"M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z",
	);
	return s;
}

export function SaudiRiyalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m20 19.5-5.5 1.2");
	path(s, "M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2");
	path(s, "m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2");
	path(s, "M20 10 4 13.5");
	return s;
}

export function SaveAllIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2v3a1 1 0 0 0 1 1h5");
	path(s, "M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6");
	path(s, "M18 22H4a2 2 0 0 1-2-2V6");
	path(
		s,
		"M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z",
	);
	return s;
}

export function SaveOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 13H8a1 1 0 0 0-1 1v7");
	path(s, "M14 8h1");
	path(s, "M17 21v-4");
	path(s, "m2 2 20 20");
	path(s, "M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41");
	path(s, "M29.5 11.5s5 5 4 5");
	path(s, "M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15");
	return s;
}

export function SaveIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
	);
	path(s, "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7");
	path(s, "M7 3v4a1 1 0 0 0 1 1h7");
	return s;
}

export function Scale3dIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 7v11a1 1 0 0 0 1 1h11");
	path(s, "M5.293 18.707 11 13");
	circle(s, 19, 19, 2);
	circle(s, 5, 5, 2);
	return s;
}

export function ScaleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3v18");
	path(s, "m19 8 3 8a5 5 0 0 1-6 0zV7");
	path(s, "M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1");
	path(s, "m5 8 3 8a5 5 0 0 1-6 0zV7");
	path(s, "M7 21h10");
	return s;
}

export function ScalingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7");
	path(s, "M14 15H9v-5");
	path(s, "M16 3h5v5");
	path(s, "M21 3 9 15");
	return s;
}

export function ScanBarcodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 7V5a2 2 0 0 1 2-2h2");
	path(s, "M17 3h2a2 2 0 0 1 2 2v2");
	path(s, "M21 17v2a2 2 0 0 1-2 2h-2");
	path(s, "M7 21H5a2 2 0 0 1-2-2v-2");
	path(s, "M8 7v10");
	path(s, "M12 7v10");
	path(s, "M17 7v10");
	return s;
}

export function ScanEyeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 7V5a2 2 0 0 1 2-2h2");
	path(s, "M17 3h2a2 2 0 0 1 2 2v2");
	path(s, "M21 17v2a2 2 0 0 1-2 2h-2");
	path(s, "M7 21H5a2 2 0 0 1-2-2v-2");
	circle(s, 12, 12, 1);
	path(
		s,
		"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
	);
	return s;
}

export function ScanFaceIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 7V5a2 2 0 0 1 2-2h2");
	path(s, "M17 3h2a2 2 0 0 1 2 2v2");
	path(s, "M21 17v2a2 2 0 0 1-2 2h-2");
	path(s, "M7 21H5a2 2 0 0 1-2-2v-2");
	path(s, "M8 14s1.5 2 4 2 4-2 4-2");
	path(s, "M9 9h.01");
	path(s, "M15 9h.01");
	return s;
}

export function ScanHeartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 3h2a2 2 0 0 1 2 2v2");
	path(s, "M21 17v2a2 2 0 0 1-2 2h-2");
	path(s, "M3 7V5a2 2 0 0 1 2-2h2");
	path(s, "M7 21H5a2 2 0 0 1-2-2v-2");
	path(
		s,
		"M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z",
	);
	return s;
}

export function ScanLineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 7V5a2 2 0 0 1 2-2h2");
	path(s, "M17 3h2a2 2 0 0 1 2 2v2");
	path(s, "M21 17v2a2 2 0 0 1-2 2h-2");
	path(s, "M7 21H5a2 2 0 0 1-2-2v-2");
	path(s, "M7 12h10");
	return s;
}

export function ScanQrCodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 12v4a1 1 0 0 1-1 1h-4");
	path(s, "M17 3h2a2 2 0 0 1 2 2v2");
	path(s, "M17 8V7");
	path(s, "M21 17v2a2 2 0 0 1-2 2h-2");
	path(s, "M3 7V5a2 2 0 0 1 2-2h2");
	path(s, "M7 17h.01");
	path(s, "M7 21H5a2 2 0 0 1-2-2v-2");
	rect(s, { x: "7", y: "7", width: "5", height: "5", rx: "1" });
	return s;
}

export function ScanSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 7V5a2 2 0 0 1 2-2h2");
	path(s, "M17 3h2a2 2 0 0 1 2 2v2");
	path(s, "M21 17v2a2 2 0 0 1-2 2h-2");
	path(s, "M7 21H5a2 2 0 0 1-2-2v-2");
	circle(s, 12, 12, 3);
	path(s, "m16 16-1.9-1.9");
	return s;
}

export function ScanTextIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 7V5a2 2 0 0 1 2-2h2");
	path(s, "M17 3h2a2 2 0 0 1 2 2v2");
	path(s, "M21 17v2a2 2 0 0 1-2 2h-2");
	path(s, "M7 21H5a2 2 0 0 1-2-2v-2");
	path(s, "M7 8h8");
	path(s, "M7 12h10");
	path(s, "M7 16h6");
	return s;
}

export function ScanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 7V5a2 2 0 0 1 2-2h2");
	path(s, "M17 3h2a2 2 0 0 1 2 2v2");
	path(s, "M21 17v2a2 2 0 0 1-2 2h-2");
	path(s, "M7 21H5a2 2 0 0 1-2-2v-2");
	return s;
}

export function SchoolIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 21v-3a2 2 0 0 0-4 0v3");
	path(s, "M18 4.933V21");
	path(s, "m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6");
	path(
		s,
		"m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11",
	);
	path(s, "M6 4.933V21");
	circle(s, 12, 9, 2);
	return s;
}

export function ScissorsLineDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5.42 9.42 8 12");
	circle(s, 4, 8, 2);
	path(s, "m14 6-8.58 8.58");
	circle(s, 4, 16, 2);
	path(s, "M10.8 14.8 14 18");
	path(s, "M16 12h-2");
	path(s, "M22 12h-2");
	return s;
}

export function ScissorsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 6, 6, 3);
	path(s, "M8.12 8.12 12 12");
	path(s, "M20 4 8.12 15.88");
	circle(s, 6, 18, 3);
	path(s, "M14.8 14.8 20 20");
	return s;
}

export function ScooterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 4h-3.5l2 11.05");
	path(
		s,
		"M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009",
	);
	circle(s, 19.5, 17.5, 2.5);
	circle(s, 4.5, 17.5, 2.5);
	return s;
}

export function ScreenShareOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3");
	path(s, "M8 21h8");
	path(s, "M12 17v4");
	path(s, "m22 3-5 5");
	path(s, "m17 3 5 5");
	return s;
}

export function ScreenShareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3");
	path(s, "M8 21h8");
	path(s, "M12 17v4");
	path(s, "m17 8 5-5");
	path(s, "M17 3h5v5");
	return s;
}

export function ScrollTextIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 12h-5");
	path(s, "M15 8h-5");
	path(s, "M19 17V5a2 2 0 0 0-2-2H4");
	path(
		s,
		"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
	);
	return s;
}

export function ScrollIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19 17V5a2 2 0 0 0-2-2H4");
	path(
		s,
		"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",
	);
	return s;
}

export function SearchAlertIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 11, 11, 8);
	path(s, "m21 21-4.3-4.3");
	path(s, "M11 7v4");
	path(s, "M11 15h.01");
	return s;
}

export function SearchCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m8 11 2 2 4-4");
	circle(s, 11, 11, 8);
	path(s, "m21 21-4.3-4.3");
	return s;
}

export function SearchCodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m13 13.5 2-2.5-2-2.5");
	path(s, "m21 21-4.3-4.3");
	path(s, "M9 8.5 7 11l2 2.5");
	circle(s, 11, 11, 8);
	return s;
}

export function SearchSlashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m13.5 8.5-5 5");
	circle(s, 11, 11, 8);
	path(s, "m21 21-4.3-4.3");
	return s;
}

export function SearchXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m13.5 8.5-5 5");
	path(s, "m8.5 8.5 5 5");
	circle(s, 11, 11, 8);
	path(s, "m21 21-4.3-4.3");
	return s;
}

export function SearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m21 21-4.34-4.34");
	circle(s, 11, 11, 8);
	return s;
}

export function SectionIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0");
	path(s, "M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0");
	return s;
}

export function SendHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
	);
	path(s, "M6 12h16");
	return s;
}

export function SendToBackIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { x: "14", y: "14", width: "8", height: "8", rx: "2" });
	rect(s, { x: "2", y: "2", width: "8", height: "8", rx: "2" });
	path(s, "M7 14v1a2 2 0 0 0 2 2h1");
	path(s, "M14 7h1a2 2 0 0 1 2 2v1");
	return s;
}

export function SendIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	);
	path(s, "m21.854 2.147-10.94 10.939");
	return s;
}

export function SeparatorHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 16-4 4-4-4");
	path(s, "M3 12h18");
	path(s, "m8 8 4-4 4 4");
	return s;
}

export function SeparatorVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3v18");
	path(s, "m16 16 4-4-4-4");
	path(s, "m8 8-4 4 4 4");
	return s;
}

export function ServerCogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10.852 14.772-.383.923");
	path(s, "M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923");
	path(s, "m13.148 9.228.383-.923");
	path(s, "m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544");
	path(s, "m14.772 10.852.923-.383");
	path(s, "m14.772 13.148.923.383");
	path(
		s,
		"M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5",
	);
	path(
		s,
		"M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5",
	);
	path(s, "M6 18h.01");
	path(s, "M6 6h.01");
	path(s, "m9.228 10.852-.923-.383");
	path(s, "m9.228 13.148-.923.383");
	return s;
}

export function ServerCrashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",
	);
	path(
		s,
		"M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",
	);
	path(s, "M6 6h.01");
	path(s, "M6 18h.01");
	path(s, "m13 6-4 6h6l-4 6");
	return s;
}

export function ServerOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5");
	path(s, "M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z");
	path(s, "M22 17v-1a2 2 0 0 0-2-2h-1");
	path(s, "M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z");
	path(s, "M6 18h.01");
	path(s, "m2 2 20 20");
	return s;
}

export function ServerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "8", x: "2", y: "2", rx: "2", ry: "2" });
	rect(s, { width: "20", height: "8", x: "2", y: "14", rx: "2", ry: "2" });
	line(s, 6, 6, 6.01, 6);
	line(s, 6, 18, 6.01, 18);
	return s;
}

export function Settings2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 17H5");
	path(s, "M19 7h-9");
	circle(s, 17, 17, 3);
	circle(s, 7, 7, 3);
	return s;
}

export function SettingsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	);
	circle(s, 12, 12, 3);
	return s;
}

export function ShapesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",
	);
	rect(s, { x: "3", y: "14", width: "7", height: "7", rx: "1" });
	circle(s, 17.5, 17.5, 3.5);
	return s;
}

export function Share2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 18, 5, 3);
	circle(s, 6, 12, 3);
	circle(s, 18, 19, 3);
	line(s, 8.59, 13.51, 15.42, 17.49);
	line(s, 15.41, 6.51, 8.59, 10.49);
	return s;
}

export function ShareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v13");
	path(s, "m16 6-4-4-4 4");
	path(s, "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8");
	return s;
}

export function SheetIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	line(s, 3, 9, 21, 9);
	line(s, 3, 15, 21, 15);
	line(s, 9, 9, 9, 21);
	line(s, 15, 9, 15, 21);
	return s;
}

export function ShellIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44",
	);
	return s;
}

export function ShelvingUnitIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3");
	path(s, "M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3");
	path(s, "M20 22V2");
	path(s, "M4 12h16");
	path(s, "M4 20h16");
	path(s, "M4 2v20");
	path(s, "M4 4h16");
	return s;
}

export function ShieldAlertIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	path(s, "M12 8v4");
	path(s, "M12 16h.01");
	return s;
}

export function ShieldBanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	path(s, "m4.243 5.21 14.39 12.472");
	return s;
}

export function ShieldCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	path(s, "m9 12 2 2 4-4");
	return s;
}

export function ShieldCogCornerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 22c-3.806-1.45-7-3.966-7-9V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v4",
	);
	path(s, "M14.923 16.547 14 16.164");
	path(s, "m14.923 18.843-.923.383");
	path(s, "M16.547 14.923 16.164 14");
	path(s, "m16.547 20.467-.383.924");
	path(s, "m18.843 14.923.383-.923");
	path(s, "m19.225 21.391-.382-.924");
	path(s, "m20.467 16.547.923-.383");
	path(s, "m20.467 18.843.923.383");
	circle(s, 17.695, 17.695, 3);
	return s;
}

export function ShieldCogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10.929 14.467-.383.924");
	path(s, "M10.929 8.923 10.546 8");
	path(s, "M13.225 8.923 13.608 8");
	path(s, "m13.607 15.391-.382-.924");
	path(s, "m14.849 10.547.923-.383");
	path(s, "m14.849 12.843.923.383");
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	path(s, "m9.305 10.547-.923-.383");
	path(s, "m9.305 12.843-.923.383");
	circle(s, 12.077, 11.695, 3);
	return s;
}

export function ShieldEllipsisIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	path(s, "M8 12h.01");
	path(s, "M12 12h.01");
	path(s, "M16 12h.01");
	return s;
}

export function ShieldHalfIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	path(s, "M12 22V2");
	return s;
}

export function ShieldMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	path(s, "M9 12h6");
	return s;
}

export function ShieldOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m2 2 20 20");
	path(
		s,
		"M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
	);
	path(
		s,
		"M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
	);
	return s;
}

export function ShieldPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	path(s, "M9 12h6");
	path(s, "M12 9v6");
	return s;
}

export function ShieldQuestionMarkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	path(s, "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3");
	path(s, "M12 17h.01");
	return s;
}

export function ShieldUserIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	path(s, "M6.376 18.91a6 6 0 0 1 11.249.003");
	circle(s, 12, 11, 4);
	return s;
}

export function ShieldXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	path(s, "m14.5 9.5-5 5");
	path(s, "m9.5 9.5 5 5");
	return s;
}

export function ShieldIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	);
	return s;
}

export function ShipWheelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 8);
	path(s, "M12 2v7.5");
	path(s, "m19 5-5.23 5.23");
	path(s, "M22 12h-7.5");
	path(s, "m19 19-5.23-5.23");
	path(s, "M12 14.5V22");
	path(s, "M10.23 13.77 5 19");
	path(s, "M9.5 12H2");
	path(s, "M10.23 10.23 5 5");
	circle(s, 12, 12, 2.5);
	return s;
}

export function ShipIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 10.189V14");
	path(s, "M12 2v3");
	path(s, "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6");
	path(
		s,
		"M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76",
	);
	path(
		s,
		"M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
	);
	return s;
}

export function ShirtIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z",
	);
	return s;
}

export function ShoppingBagIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 10a4 4 0 0 1-8 0");
	path(s, "M3.103 6.034h17.794");
	path(
		s,
		"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
	);
	return s;
}

export function ShoppingBasketIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 11-1 9");
	path(s, "m19 11-4-7");
	path(s, "M2 11h20");
	path(s, "m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4");
	path(s, "M4.5 15.5h15");
	path(s, "m5 11 4-7");
	path(s, "m9 11 1 9");
	return s;
}

export function ShoppingCartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 8, 21, 1);
	circle(s, 19, 21, 1);
	path(
		s,
		"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
	);
	return s;
}

export function ShovelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z",
	);
	path(
		s,
		"M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z",
	);
	path(s, "m9 15 7.879-7.878");
	return s;
}

export function ShowerHeadIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m4 4 2.5 2.5");
	path(s, "M13.5 6.5a4.95 4.95 0 0 0-7 7");
	path(s, "M15 5 5 15");
	path(s, "M14 17v.01");
	path(s, "M10 16v.01");
	path(s, "M13 13v.01");
	path(s, "M16 10v.01");
	path(s, "M11 20v.01");
	path(s, "M17 14v.01");
	path(s, "M20 11v.01");
	return s;
}

export function ShredderIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5",
	);
	path(s, "M14 2v5a1 1 0 0 0 1 1h5");
	path(s, "M10 22v-5");
	path(s, "M14 19v-2");
	path(s, "M18 20v-3");
	path(s, "M2 13h20");
	path(s, "M6 20v-3");
	return s;
}

export function ShrimpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 12h.01");
	path(s, "M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1");
	path(
		s,
		"M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8",
	);
	path(s, "M14 8a8.5 8.5 0 0 1 0 8");
	path(s, "M16 16c2 0 4.5-4 4-6");
	return s;
}

export function ShrinkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 15 6 6m-6-6v4.8m0-4.8h4.8");
	path(s, "M9 19.8V15m0 0H4.2M9 15l-6 6");
	path(s, "M15 4.2V9m0 0h4.8M15 9l6-6");
	path(s, "M9 4.2V9m0 0H4.2M9 9 3 3");
	return s;
}

export function ShrubIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5");
	path(s, "M14.5 14.5 12 17");
	path(s, "M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z");
	return s;
}

export function ShuffleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m18 14 4 4-4 4");
	path(s, "m18 2 4 4-4 4");
	path(s, "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22");
	path(s, "M2 6h1.972a4 4 0 0 1 3.6 2.2");
	path(s, "M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45");
	return s;
}

export function SigmaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2",
	);
	return s;
}

export function SignalHighIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 20h.01");
	path(s, "M7 20v-4");
	path(s, "M12 20v-8");
	path(s, "M17 20V8");
	return s;
}

export function SignalLowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 20h.01");
	path(s, "M7 20v-4");
	return s;
}

export function SignalMediumIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 20h.01");
	path(s, "M7 20v-4");
	path(s, "M12 20v-8");
	return s;
}

export function SignalZeroIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 20h.01");
	return s;
}

export function SignalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 20h.01");
	path(s, "M7 20v-4");
	path(s, "M12 20v-8");
	path(s, "M17 20V8");
	path(s, "M22 4v16");
	return s;
}

export function SignatureIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284",
	);
	path(s, "M3 21h18");
	return s;
}

export function SignpostBigIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 9H4L2 7l2-2h6");
	path(s, "M14 5h6l2 2-2 2h-6");
	path(s, "M10 22V4a2 2 0 1 1 4 0v18");
	path(s, "M8 22h8");
	return s;
}

export function SignpostIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13v8");
	path(s, "M12 3v3");
	path(
		s,
		"M2.354 10.354a1.207 1.207 0 0 1 0-1.708l2.06-2.06A2 2 0 0 1 5.828 6h12.344a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H5.828a2 2 0 0 1-1.414-.586z",
	);
	return s;
}

export function SirenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7 18v-6a5 5 0 1 1 10 0v6");
	path(
		s,
		"M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z",
	);
	path(s, "M21 12h1");
	path(s, "M18.5 4.5 18 5");
	path(s, "M2 12h1");
	path(s, "M12 2v1");
	path(s, "m4.929 4.929.707.707");
	path(s, "M12 12v6");
	return s;
}

export function SkipBackIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
	);
	path(s, "M3 20V4");
	return s;
}

export function SkipForwardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 4v16");
	path(
		s,
		"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
	);
	return s;
}

export function SkullIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m12.5 17-.5-1-.5 1h1z");
	path(
		s,
		"M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z",
	);
	circle(s, 15, 12, 1);
	circle(s, 9, 12, 1);
	return s;
}

export function SlashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 2 2 22");
	return s;
}

export function SliceIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14",
	);
	return s;
}

export function SlidersHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 5H3");
	path(s, "M12 19H3");
	path(s, "M14 3v4");
	path(s, "M16 17v4");
	path(s, "M21 12h-9");
	path(s, "M21 19h-5");
	path(s, "M21 5h-7");
	path(s, "M8 10v4");
	path(s, "M8 12H3");
	return s;
}

export function SlidersVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 8h4");
	path(s, "M12 21v-9");
	path(s, "M12 8V3");
	path(s, "M17 16h4");
	path(s, "M19 12V3");
	path(s, "M19 21v-5");
	path(s, "M3 14h4");
	path(s, "M5 10V3");
	path(s, "M5 21v-7");
	return s;
}

export function SmartphoneChargingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" });
	path(s, "M12.667 8 10 12h4l-2.667 4");
	return s;
}

export function SmartphoneNfcIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "7", height: "12", x: "2", y: "6", rx: "1" });
	path(s, "M13 8.32a7.43 7.43 0 0 1 0 7.36");
	path(s, "M16.46 6.21a11.76 11.76 0 0 1 0 11.58");
	path(s, "M19.91 4.1a15.91 15.91 0 0 1 .01 15.8");
	return s;
}

export function SmartphoneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" });
	path(s, "M12 18h.01");
	return s;
}

export function SmilePlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 11v1a10 10 0 1 1-9-10");
	path(s, "M8 14s1.5 2 4 2 4-2 4-2");
	line(s, 9, 9, 9.01, 9);
	line(s, 15, 9, 15.01, 9);
	path(s, "M16 5h6");
	path(s, "M19 2v6");
	return s;
}

export function SmileIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	path(s, "M8 14s1.5 2 4 2 4-2 4-2");
	line(s, 9, 9, 9.01, 9);
	line(s, 15, 9, 15.01, 9);
	return s;
}

export function SnailIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0");
	circle(s, 10, 13, 8);
	path(s, "M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6");
	path(s, "M18 3 19.1 5.2");
	path(s, "M22 3 20.9 5.2");
	return s;
}

export function SnowflakeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10 20-1.25-2.5L6 18");
	path(s, "M10 4 8.75 6.5 6 6");
	path(s, "m14 20 1.25-2.5L18 18");
	path(s, "m14 4 1.25 2.5L18 6");
	path(s, "m17 21-3-6h-4");
	path(s, "m17 3-3 6 1.5 3");
	path(s, "M2 12h6.5L10 9");
	path(s, "m20 10-1.5 2 1.5 2");
	path(s, "M22 12h-6.5L14 15");
	path(s, "m4 10 1.5 2L4 14");
	path(s, "m7 21 3-6-1.5-3");
	path(s, "m7 3 3 6h4");
	return s;
}

export function SoapDispenserDropletIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.5 2v4");
	path(s, "M14 2H7a2 2 0 0 0-2 2");
	path(
		s,
		"M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19",
	);
	path(
		s,
		"M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",
	);
	return s;
}

export function SofaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3");
	path(
		s,
		"M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",
	);
	path(s, "M4 18v2");
	path(s, "M20 18v2");
	path(s, "M12 4v9");
	return s;
}

export function SolarPanelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 2h2");
	path(s, "m14.28 14-4.56 8");
	path(s, "m21 22-1.558-4H4.558");
	path(s, "M3 10v2");
	path(
		s,
		"M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z",
	);
	path(s, "M7 2a4 4 0 0 1-4 4");
	path(s, "m8.66 7.66 1.41 1.41");
	return s;
}

export function SoupIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z");
	path(s, "M7 21h10");
	path(s, "M19.5 12 22 6");
	path(
		s,
		"M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62",
	);
	path(
		s,
		"M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62",
	);
	path(
		s,
		"M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62",
	);
	return s;
}

export function SpaceIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1");
	return s;
}

export function SpadeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 18v4");
	path(
		s,
		"M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5",
	);
	return s;
}

export function SparkleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
	);
	return s;
}

export function SparklesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
	);
	path(s, "M20 2v4");
	path(s, "M22 4h-4");
	circle(s, 4, 20, 2);
	return s;
}

export function SpeakerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "16", height: "20", x: "4", y: "2", rx: "2" });
	path(s, "M12 6h.01");
	circle(s, 12, 14, 4);
	path(s, "M12 14h.01");
	return s;
}

export function SpeechIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20",
	);
	path(s, "M19.8 17.8a7.5 7.5 0 0 0 .003-10.603");
	path(s, "M17 15a3.5 3.5 0 0 0-.025-4.975");
	return s;
}

export function SpellCheck2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m6 16 6-12 6 12");
	path(s, "M8 12h8");
	path(
		s,
		"M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1",
	);
	return s;
}

export function SpellCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m6 16 6-12 6 12");
	path(s, "M8 12h8");
	path(s, "m16 20 2 2 4-4");
	return s;
}

export function SplinePointerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",
	);
	path(s, "M5 17A12 12 0 0 1 17 5");
	circle(s, 19, 5, 2);
	circle(s, 5, 19, 2);
	return s;
}

export function SplineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 19, 5, 2);
	circle(s, 5, 19, 2);
	path(s, "M5 17A12 12 0 0 1 17 5");
	return s;
}

export function SplitIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 3h5v5");
	path(s, "M8 3H3v5");
	path(s, "M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3");
	path(s, "m15 9 6-6");
	return s;
}

export function SpoolIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66",
	);
	path(
		s,
		"m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178",
	);
	return s;
}

export function SportShoeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m15 10.42 4.8-5.07");
	path(s, "M19 18h3");
	path(
		s,
		"M9.5 22 21.414 9.415A2 2 0 0 0 21.2 6.4l-5.61-4.208A1 1 0 0 0 14 3v2a2 2 0 0 1-1.394 1.906L8.677 8.053A1 1 0 0 0 8 9c-.155 6.393-2.082 9-4 9a2 2 0 0 0 0 4h14",
	);
	return s;
}

export function SpotlightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15.295 19.562 16 22");
	path(s, "m17 16 3.758 2.098");
	path(s, "m19 12.5 3.026-.598");
	path(
		s,
		"M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z",
	);
	path(s, "M8 9V2");
	return s;
}

export function SprayCanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 3h.01");
	path(s, "M7 5h.01");
	path(s, "M11 7h.01");
	path(s, "M3 7h.01");
	path(s, "M7 9h.01");
	path(s, "M3 11h.01");
	rect(s, { width: "4", height: "4", x: "15", y: "5" });
	path(s, "m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2");
	path(s, "m13 14 8-2");
	path(s, "m13 19 8-2");
	return s;
}

export function SproutIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3",
	);
	path(s, "M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4");
	path(s, "M5 21h14");
	return s;
}

export function SquareActivityIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M17 12h-2l-2 5-2-10-2 5H7");
	return s;
}

export function SquareArrowDownLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "m16 8-8 8");
	path(s, "M16 16H8V8");
	return s;
}

export function SquareArrowDownRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "m8 8 8 8");
	path(s, "M16 8v8H8");
	return s;
}

export function SquareArrowDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M12 8v8");
	path(s, "m8 12 4 4 4-4");
	return s;
}

export function SquareArrowLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "m12 8-4 4 4 4");
	path(s, "M16 12H8");
	return s;
}

export function SquareArrowOutDownLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6");
	path(s, "m3 21 9-9");
	path(s, "M9 21H3v-6");
	return s;
}

export function SquareArrowOutDownRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6");
	path(s, "m21 21-9-9");
	path(s, "M21 15v6h-6");
	return s;
}

export function SquareArrowOutUpLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6");
	path(s, "m3 3 9 9");
	path(s, "M3 9V3h6");
	return s;
}

export function SquareArrowOutUpRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6");
	path(s, "m21 3-9 9");
	path(s, "M15 3h6v6");
	return s;
}

export function SquareArrowRightEnterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10 16 4-4-4-4");
	path(s, "M3 12h11");
	path(
		s,
		"M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3",
	);
	return s;
}

export function SquareArrowRightExitIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 12h11");
	path(s, "m17 16 4-4-4-4");
	path(
		s,
		"M21 6.344V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.344",
	);
	return s;
}

export function SquareArrowRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M8 12h8");
	path(s, "m12 16 4-4-4-4");
	return s;
}

export function SquareArrowUpLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M8 16V8h8");
	path(s, "M16 16 8 8");
	return s;
}

export function SquareArrowUpRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M8 8h8v8");
	path(s, "m8 16 8-8");
	return s;
}

export function SquareArrowUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "m16 12-4-4-4 4");
	path(s, "M12 16V8");
	return s;
}

export function SquareAsteriskIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M12 8v8");
	path(s, "m8.5 14 7-4");
	path(s, "m8.5 10 7 4");
	return s;
}

export function SquareBottomDashedScissorsIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	line(s, 5, 3, 19, 3);
	line(s, 3, 5, 3, 19);
	line(s, 21, 5, 21, 19);
	line(s, 9, 21, 10, 21);
	line(s, 14, 21, 15, 21);
	path(s, "M 3 5 A2 2 0 0 1 5 3");
	path(s, "M 19 3 A2 2 0 0 1 21 5");
	path(s, "M 5 21 A2 2 0 0 1 3 19");
	path(s, "M 21 19 A2 2 0 0 1 19 21");
	circle(s, 8.5, 8.5, 1.5);
	line(s, 9.56066, 9.56066, 12, 12);
	line(s, 17, 17, 14.82, 14.82);
	circle(s, 8.5, 15.5, 1.5);
	line(s, 9.56066, 14.43934, 17, 7);
	return s;
}

export function SquareCenterlineDashedHorizontalIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3");
	path(s, "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3");
	path(s, "M12 20v2");
	path(s, "M12 14v2");
	path(s, "M12 8v2");
	path(s, "M12 2v2");
	return s;
}

export function SquareCenterlineDashedVerticalIcon(
	props?: IconProps,
): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3");
	path(s, "M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3");
	path(s, "M4 12H2");
	path(s, "M10 12H8");
	path(s, "M16 12h-2");
	path(s, "M22 12h-2");
	return s;
}

export function SquareChartGanttIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M9 8h7");
	path(s, "M8 12h6");
	path(s, "M11 16h5");
	return s;
}

export function SquareCheckBigIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344");
	path(s, "m9 11 3 3L22 4");
	return s;
}

export function SquareCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "m9 12 2 2 4-4");
	return s;
}

export function SquareChevronDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "m16 10-4 4-4-4");
	return s;
}

export function SquareChevronLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "m14 16-4-4 4-4");
	return s;
}

export function SquareChevronRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "m10 8 4 4-4 4");
	return s;
}

export function SquareChevronUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "m8 14 4-4 4 4");
	return s;
}

export function SquareCodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10 9-3 3 3 3");
	path(s, "m14 15 3-3-3-3");
	rect(s, { x: "3", y: "3", width: "18", height: "18", rx: "2" });
	return s;
}

export function SquareDashedBottomCodeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 9.5 8 12l2 2.5");
	path(s, "M14 21h1");
	path(s, "m14 9.5 2 2.5-2 2.5");
	path(
		s,
		"M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2",
	);
	path(s, "M9 21h1");
	return s;
}

export function SquareDashedBottomIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2",
	);
	path(s, "M9 21h1");
	path(s, "M14 21h1");
	return s;
}

export function SquareDashedKanbanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 7v7");
	path(s, "M12 7v4");
	path(s, "M16 7v9");
	path(s, "M5 3a2 2 0 0 0-2 2");
	path(s, "M9 3h1");
	path(s, "M14 3h1");
	path(s, "M19 3a2 2 0 0 1 2 2");
	path(s, "M21 9v1");
	path(s, "M21 14v1");
	path(s, "M21 19a2 2 0 0 1-2 2");
	path(s, "M14 21h1");
	path(s, "M9 21h1");
	path(s, "M5 21a2 2 0 0 1-2-2");
	path(s, "M3 14v1");
	path(s, "M3 9v1");
	return s;
}

export function SquareDashedMousePointerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",
	);
	path(s, "M5 3a2 2 0 0 0-2 2");
	path(s, "M19 3a2 2 0 0 1 2 2");
	path(s, "M5 21a2 2 0 0 1-2-2");
	path(s, "M9 3h1");
	path(s, "M9 21h2");
	path(s, "M14 3h1");
	path(s, "M3 9v1");
	path(s, "M21 9v2");
	path(s, "M3 14v1");
	return s;
}

export function SquareDashedTopSolidIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 21h1");
	path(s, "M21 14v1");
	path(s, "M21 19a2 2 0 0 1-2 2");
	path(s, "M21 9v1");
	path(s, "M3 14v1");
	path(s, "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2");
	path(s, "M3 9v1");
	path(s, "M5 21a2 2 0 0 1-2-2");
	path(s, "M9 21h1");
	return s;
}

export function SquareDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 3a2 2 0 0 0-2 2");
	path(s, "M19 3a2 2 0 0 1 2 2");
	path(s, "M21 19a2 2 0 0 1-2 2");
	path(s, "M5 21a2 2 0 0 1-2-2");
	path(s, "M9 3h1");
	path(s, "M9 21h1");
	path(s, "M14 3h1");
	path(s, "M14 21h1");
	path(s, "M3 9v1");
	path(s, "M21 9v1");
	path(s, "M3 14v1");
	path(s, "M21 14v1");
	return s;
}

export function SquareDivideIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	line(s, 8, 12, 16, 12);
	line(s, 12, 16, 12, 16);
	line(s, 12, 8, 12, 8);
	return s;
}

export function SquareDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	circle(s, 12, 12, 1);
	return s;
}

export function SquareEqualIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M7 10h10");
	path(s, "M7 14h10");
	return s;
}

export function SquareFunctionIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	path(s, "M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3");
	path(s, "M9 11.2h5.7");
	return s;
}

export function SquareKanbanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M8 7v7");
	path(s, "M12 7v4");
	path(s, "M16 7v9");
	return s;
}

export function SquareLibraryIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M7 7v10");
	path(s, "M11 7v10");
	path(s, "m15 7 2 10");
	return s;
}

export function SquareMIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16",
	);
	rect(s, { x: "3", y: "3", width: "18", height: "18", rx: "2" });
	return s;
}

export function SquareMenuIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M7 8h10");
	path(s, "M7 12h10");
	path(s, "M7 16h10");
	return s;
}

export function SquareMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M8 12h8");
	return s;
}

export function SquareMousePointerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z",
	);
	path(s, "M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6");
	return s;
}

export function SquareParkingOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3.6 3.6A2 2 0 0 1 5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-.59 1.41");
	path(s, "M3 8.7V19a2 2 0 0 0 2 2h10.3");
	path(s, "m2 2 20 20");
	path(s, "M13 13a3 3 0 1 0 0-6H9v2");
	path(s, "M9 17v-2.3");
	return s;
}

export function SquareParkingIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M9 17V7h4a3 3 0 0 1 0 6H9");
	return s;
}

export function SquarePauseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	line(s, 10, 15, 10, 9);
	line(s, 14, 15, 14, 9);
	return s;
}

export function SquarePenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7");
	path(
		s,
		"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
	);
	return s;
}

export function SquarePercentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "m15 9-6 6");
	path(s, "M9 9h.01");
	path(s, "M15 15h.01");
	return s;
}

export function SquarePiIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M7 7h10");
	path(s, "M10 7v10");
	path(s, "M16 17a2 2 0 0 1-2-2V7");
	return s;
}

export function SquarePilcrowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M12 12H9.5a2.5 2.5 0 0 1 0-5H17");
	path(s, "M12 7v10");
	path(s, "M16 7v10");
	return s;
}

export function SquarePlayIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { x: "3", y: "3", width: "18", height: "18", rx: "2" });
	path(
		s,
		"M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
	);
	return s;
}

export function SquarePlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M8 12h8");
	path(s, "M12 8v8");
	return s;
}

export function SquarePowerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7v4");
	path(s, "M7.998 9.003a5 5 0 1 0 8-.005");
	rect(s, { x: "3", y: "3", width: "18", height: "18", rx: "2" });
	return s;
}

export function SquareRadicalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7 12h2l2 5 2-10h4");
	rect(s, { x: "3", y: "3", width: "18", height: "18", rx: "2" });
	return s;
}

export function SquareRoundCornerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 11a8 8 0 0 0-8-8");
	path(s, "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4");
	return s;
}

export function SquareScissorsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	circle(s, 8.5, 8.5, 1.5);
	line(s, 9.56066, 9.56066, 12, 12);
	line(s, 17, 17, 14.82, 14.82);
	circle(s, 8.5, 15.5, 1.5);
	line(s, 9.56066, 14.43934, 17, 7);
	return s;
}

export function SquareSigmaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M16 8.9V7H8l4 5-4 5h8v-1.9");
	return s;
}

export function SquareSlashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	line(s, 9, 15, 15, 9);
	return s;
}

export function SquareSplitHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3");
	path(s, "M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3");
	line(s, 12, 4, 12, 20);
	return s;
}

export function SquareSplitVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3");
	path(s, "M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3");
	line(s, 4, 12, 20, 12);
	return s;
}

export function SquareSquareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { x: "3", y: "3", width: "18", height: "18", rx: "2" });
	rect(s, { x: "8", y: "8", width: "8", height: "8", rx: "1" });
	return s;
}

export function SquareStackIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2");
	path(s, "M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2");
	rect(s, { width: "8", height: "8", x: "14", y: "14", rx: "2" });
	return s;
}

export function SquareStarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z",
	);
	rect(s, { x: "3", y: "3", width: "18", height: "18", rx: "2" });
	return s;
}

export function SquareStopIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	rect(s, { x: "9", y: "9", width: "6", height: "6", rx: "1" });
	return s;
}

export function SquareTerminalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m7 11 2-2-2-2");
	path(s, "M11 13h4");
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	return s;
}

export function SquareUserRoundIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 21a6 6 0 0 0-12 0");
	circle(s, 12, 11, 4);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	return s;
}

export function SquareUserIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	circle(s, 12, 10, 3);
	path(s, "M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2");
	return s;
}

export function SquareXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" });
	path(s, "m15 9-6 6");
	path(s, "m9 9 6 6");
	return s;
}

export function SquareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	return s;
}

export function SquaresExcludeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0",
	);
	path(
		s,
		"M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2",
	);
	return s;
}

export function SquaresIntersectIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 22a2 2 0 0 1-2-2");
	path(s, "M14 2a2 2 0 0 1 2 2");
	path(s, "M16 22h-2");
	path(s, "M2 10V8");
	path(s, "M2 4a2 2 0 0 1 2-2");
	path(s, "M20 8a2 2 0 0 1 2 2");
	path(s, "M22 14v2");
	path(s, "M22 20a2 2 0 0 1-2 2");
	path(s, "M4 16a2 2 0 0 1-2-2");
	path(
		s,
		"M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z",
	);
	path(s, "M8 2h2");
	return s;
}

export function SquaresSubtractIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 22a2 2 0 0 1-2-2");
	path(s, "M16 22h-2");
	path(
		s,
		"M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z",
	);
	path(s, "M20 8a2 2 0 0 1 2 2");
	path(s, "M22 14v2");
	path(s, "M22 20a2 2 0 0 1-2 2");
	return s;
}

export function SquaresUniteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z",
	);
	return s;
}

export function SquircleDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13.77 3.043a34 34 0 0 0-3.54 0");
	path(s, "M13.771 20.956a33 33 0 0 1-3.541.001");
	path(s, "M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44");
	path(s, "M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438");
	path(s, "M20.957 10.23a33 33 0 0 1 0 3.54");
	path(s, "M3.043 10.23a34 34 0 0 0 .001 3.541");
	path(s, "M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438");
	path(s, "M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44");
	return s;
}

export function SquircleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9");
	return s;
}

export function SquirrelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15.236 22a3 3 0 0 0-2.2-5");
	path(s, "M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4");
	path(s, "M18 13h.01");
	path(
		s,
		"M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10",
	);
	return s;
}

export function StampIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13");
	path(
		s,
		"M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z",
	);
	path(s, "M5 22h14");
	return s;
}

export function StarHalfIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2",
	);
	return s;
}

export function StarOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m10.344 4.688 1.181-2.393a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.237 3.152",
	);
	path(
		s,
		"m17.945 17.945.43 2.505a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a8 8 0 0 0 .4-.099",
	);
	path(s, "m2 2 20 20");
	return s;
}

export function StarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
	);
	return s;
}

export function StepBackIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z",
	);
	path(s, "M21 20V4");
	return s;
}

export function StepForwardIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",
	);
	path(s, "M3 4v16");
	return s;
}

export function StethoscopeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 2v2");
	path(s, "M5 2v2");
	path(s, "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1");
	path(s, "M8 15a6 6 0 0 0 12 0v-3");
	circle(s, 20, 10, 2);
	return s;
}

export function StickerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",
	);
	path(s, "M15 3v5a1 1 0 0 0 1 1h5");
	path(s, "M8 13h.01");
	path(s, "M16 13h.01");
	path(s, "M10 16s.8 1 2 1c1.3 0 2-1 2-1");
	return s;
}

export function StickyNoteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",
	);
	path(s, "M15 3v5a1 1 0 0 0 1 1h5");
	return s;
}

export function StoneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z",
	);
	path(s, "M11.99 22 14 12l7.822 3.184");
	path(s, "M14 12 8.47 2.302");
	return s;
}

export function StoreIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5");
	path(
		s,
		"M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
	);
	path(s, "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05");
	return s;
}

export function StretchHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "6", x: "2", y: "4", rx: "2" });
	rect(s, { width: "20", height: "6", x: "2", y: "14", rx: "2" });
	return s;
}

export function StretchVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "6", height: "20", x: "4", y: "2", rx: "2" });
	rect(s, { width: "6", height: "20", x: "14", y: "2", rx: "2" });
	return s;
}

export function StrikethroughIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 4H9a3 3 0 0 0-2.83 4");
	path(s, "M14 12a4 4 0 0 1 0 8H6");
	line(s, 4, 12, 20, 12);
	return s;
}

export function SubscriptIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m4 5 8 8");
	path(s, "m12 5-8 8");
	path(
		s,
		"M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07",
	);
	return s;
}

export function SunDimIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 4);
	path(s, "M12 4h.01");
	path(s, "M20 12h.01");
	path(s, "M12 20h.01");
	path(s, "M4 12h.01");
	path(s, "M17.657 6.343h.01");
	path(s, "M17.657 17.657h.01");
	path(s, "M6.343 17.657h.01");
	path(s, "M6.343 6.343h.01");
	return s;
}

export function SunMediumIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 4);
	path(s, "M12 3v1");
	path(s, "M12 20v1");
	path(s, "M3 12h1");
	path(s, "M20 12h1");
	path(s, "m18.364 5.636-.707.707");
	path(s, "m6.343 17.657-.707.707");
	path(s, "m5.636 5.636.707.707");
	path(s, "m17.657 17.657.707.707");
	return s;
}

export function SunMoonIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v2");
	path(
		s,
		"M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715",
	);
	path(s, "M16 12a4 4 0 0 0-4-4");
	path(s, "m19 5-1.256 1.256");
	path(s, "M20 12h2");
	return s;
}

export function SunSnowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 21v-1");
	path(s, "M10 4V3");
	path(s, "M10 9a3 3 0 0 0 0 6");
	path(s, "m14 20 1.25-2.5L18 18");
	path(s, "m14 4 1.25 2.5L18 6");
	path(s, "m17 21-3-6 1.5-3H22");
	path(s, "m17 3-3 6 1.5 3");
	path(s, "M2 12h1");
	path(s, "m20 10-1.5 2 1.5 2");
	path(s, "m3.64 18.36.7-.7");
	path(s, "m4.34 6.34-.7-.7");
	return s;
}

export function SunIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 4);
	path(s, "M12 2v2");
	path(s, "M12 20v2");
	path(s, "m4.93 4.93 1.41 1.41");
	path(s, "m17.66 17.66 1.41 1.41");
	path(s, "M2 12h2");
	path(s, "M20 12h2");
	path(s, "m6.34 17.66-1.41 1.41");
	path(s, "m19.07 4.93-1.41 1.41");
	return s;
}

export function SunriseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v8");
	path(s, "m4.93 10.93 1.41 1.41");
	path(s, "M2 18h2");
	path(s, "M20 18h2");
	path(s, "m19.07 10.93-1.41 1.41");
	path(s, "M22 22H2");
	path(s, "m8 6 4-4 4 4");
	path(s, "M16 18a4 4 0 0 0-8 0");
	return s;
}

export function SunsetIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 10V2");
	path(s, "m4.93 10.93 1.41 1.41");
	path(s, "M2 18h2");
	path(s, "M20 18h2");
	path(s, "m19.07 10.93-1.41 1.41");
	path(s, "M22 22H2");
	path(s, "m16 6-4 4-4-4");
	path(s, "M16 18a4 4 0 0 0-8 0");
	return s;
}

export function SuperscriptIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m4 19 8-8");
	path(s, "m12 19-8-8");
	path(
		s,
		"M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06",
	);
	return s;
}

export function SwatchBookIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z");
	path(s, "M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7");
	path(s, "M 7 17h.01");
	path(
		s,
		"m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8",
	);
	return s;
}

export function SwissFrancIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 21V3h8");
	path(s, "M6 16h9");
	path(s, "M10 9.5h7");
	return s;
}

export function SwitchCameraIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5");
	path(s, "M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5");
	circle(s, 12, 12, 3);
	path(s, "m18 22-3-3 3-3");
	path(s, "m6 2 3 3-3 3");
	return s;
}

export function SwordIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m11 19-6-6");
	path(s, "m5 21-2-2");
	path(s, "m8 16-4 4");
	path(s, "M9.5 17.5 21 6V3h-3L6.5 14.5");
	return s;
}

export function SwordsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	_polyline(s, "14.5 17.5 3 6 3 3 6 3 17.5 14.5");
	line(s, 13, 19, 19, 13);
	line(s, 16, 16, 20, 20);
	line(s, 19, 21, 21, 19);
	_polyline(s, "14.5 6.5 18 3 21 3 21 6 17.5 9.5");
	line(s, 5, 14, 9, 18);
	line(s, 7, 17, 4, 20);
	line(s, 3, 19, 5, 21);
	return s;
}

export function SyringeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m18 2 4 4");
	path(s, "m17 7 3-3");
	path(s, "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5");
	path(s, "m9 11 4 4");
	path(s, "m5 19-3 3");
	path(s, "m14 4 6 6");
	return s;
}

export function Table2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
	);
	return s;
}

export function TableCellsMergeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 21v-6");
	path(s, "M12 9V3");
	path(s, "M3 15h18");
	path(s, "M3 9h18");
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	return s;
}

export function TableCellsSplitIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 15V9");
	path(s, "M3 15h18");
	path(s, "M3 9h18");
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	return s;
}

export function TableColumnsSplitIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 14v2");
	path(s, "M14 20v2");
	path(s, "M14 2v2");
	path(s, "M14 8v2");
	path(s, "M2 15h8");
	path(s, "M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2");
	path(s, "M2 9h8");
	path(s, "M22 15h-4");
	path(s, "M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2");
	path(s, "M22 9h-4");
	path(s, "M5 3v18");
	return s;
}

export function TableOfContentsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 5H3");
	path(s, "M16 12H3");
	path(s, "M16 19H3");
	path(s, "M21 5h.01");
	path(s, "M21 12h.01");
	path(s, "M21 19h.01");
	return s;
}

export function TablePropertiesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 3v18");
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M21 9H3");
	path(s, "M21 15H3");
	return s;
}

export function TableRowsSplitIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 10h2");
	path(s, "M15 22v-8");
	path(s, "M15 2v4");
	path(s, "M2 10h2");
	path(s, "M20 10h2");
	path(s, "M3 19h18");
	path(s, "M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6");
	path(s, "M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2");
	path(s, "M8 10h2");
	path(s, "M9 22v-8");
	path(s, "M9 2v4");
	return s;
}

export function TableIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3v18");
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 9h18");
	path(s, "M3 15h18");
	return s;
}

export function TabletSmartphoneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "10", height: "14", x: "3", y: "8", rx: "2" });
	path(s, "M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4");
	path(s, "M8 18h.01");
	return s;
}

export function TabletIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "16", height: "20", x: "4", y: "2", rx: "2", ry: "2" });
	line(s, 12, 18, 12.01, 18);
	return s;
}

export function TabletsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 7, 7, 5);
	circle(s, 17, 17, 5);
	path(s, "M12 17h10");
	path(s, "m3.46 10.54 7.08-7.08");
	return s;
}

export function TagIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
	);
	circle(s, 7.5, 7.5, 0.5, { fill: "currentColor" });
	return s;
}

export function TagsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z",
	);
	path(s, "M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193");
	circle(s, 10.5, 6.5, 0.5, { fill: "currentColor" });
	return s;
}

export function Tally1Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 4v16");
	return s;
}

export function Tally2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 4v16");
	path(s, "M9 4v16");
	return s;
}

export function Tally3Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 4v16");
	path(s, "M9 4v16");
	path(s, "M14 4v16");
	return s;
}

export function Tally4Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 4v16");
	path(s, "M9 4v16");
	path(s, "M14 4v16");
	path(s, "M19 4v16");
	return s;
}

export function Tally5Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M4 4v16");
	path(s, "M9 4v16");
	path(s, "M14 4v16");
	path(s, "M19 4v16");
	path(s, "M22 6 2 18");
	return s;
}

export function TangentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 17, 4, 2);
	path(s, "M15.59 5.41 5.41 15.59");
	circle(s, 4, 17, 2);
	path(s, "M12 22s-4-9-1.5-11.5S22 12 22 12");
	return s;
}

export function TargetIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 12, 10);
	circle(s, 12, 12, 6);
	circle(s, 12, 12, 2);
	return s;
}

export function TelescopeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44",
	);
	path(s, "m13.56 11.747 4.332-.924");
	path(s, "m16 21-3.105-6.21");
	path(
		s,
		"M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z",
	);
	path(s, "m6.158 8.633 1.114 4.456");
	path(s, "m8 21 3.105-6.21");
	circle(s, 12, 13, 2);
	return s;
}

export function TentTreeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 4, 4, 2);
	path(s, "m14 5 3-3 3 3");
	path(s, "m14 10 3-3 3 3");
	path(s, "M17 14V2");
	path(s, "M17 14H7l-5 8h20Z");
	path(s, "M8 14v8");
	path(s, "m9 14 5 8");
	return s;
}

export function TentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3.5 21 14 3");
	path(s, "M20.5 21 10 3");
	path(s, "M15.5 21 12 15l-3.5 6");
	path(s, "M2 21h20");
	return s;
}

export function TerminalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 19h8");
	path(s, "m4 17 6-6-6-6");
	return s;
}

export function TestTubeDiagonalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3");
	path(s, "m16 2 6 6");
	path(s, "M12 16H4");
	return s;
}

export function TestTubeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2");
	path(s, "M8.5 2h7");
	path(s, "M14.5 16h-5");
	return s;
}

export function TestTubesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2");
	path(s, "M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2");
	path(s, "M3 2h7");
	path(s, "M14 2h7");
	path(s, "M9 16H4");
	path(s, "M20 16h-5");
	return s;
}

export function TextAlignCenterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 5H3");
	path(s, "M17 12H7");
	path(s, "M19 19H5");
	return s;
}

export function TextAlignEndIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 5H3");
	path(s, "M21 12H9");
	path(s, "M21 19H7");
	return s;
}

export function TextAlignJustifyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 5h18");
	path(s, "M3 12h18");
	path(s, "M3 19h18");
	return s;
}

export function TextAlignStartIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 5H3");
	path(s, "M15 12H3");
	path(s, "M17 19H3");
	return s;
}

export function TextCursorInputIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6");
	path(s, "M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7");
	path(s, "M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1");
	path(s, "M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1");
	path(s, "M9 6v12");
	return s;
}

export function TextCursorIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1");
	path(s, "M7 22h1a4 4 0 0 0 4-4v-1");
	path(s, "M7 2h1a4 4 0 0 1 4 4v1");
	return s;
}

export function TextInitialIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 5h6");
	path(s, "M15 12h6");
	path(s, "M3 19h18");
	path(s, "m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12");
	path(s, "M3.92 10h6.16");
	return s;
}

export function TextQuoteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 5H3");
	path(s, "M21 12H8");
	path(s, "M21 19H8");
	path(s, "M3 12v7");
	return s;
}

export function TextSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 5H3");
	path(s, "M10 12H3");
	path(s, "M10 19H3");
	circle(s, 17, 15, 3);
	path(s, "m21 19-1.9-1.9");
	return s;
}

export function TextSelectIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 21h1");
	path(s, "M14 3h1");
	path(s, "M19 3a2 2 0 0 1 2 2");
	path(s, "M21 14v1");
	path(s, "M21 19a2 2 0 0 1-2 2");
	path(s, "M21 9v1");
	path(s, "M3 14v1");
	path(s, "M3 9v1");
	path(s, "M5 21a2 2 0 0 1-2-2");
	path(s, "M5 3a2 2 0 0 0-2 2");
	path(s, "M7 12h10");
	path(s, "M7 16h6");
	path(s, "M7 8h8");
	path(s, "M9 21h1");
	path(s, "M9 3h1");
	return s;
}

export function TextWrapIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 16-3 3 3 3");
	path(s, "M3 12h14.5a1 1 0 0 1 0 7H13");
	path(s, "M3 19h6");
	path(s, "M3 5h18");
	return s;
}

export function TheaterIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 10s3-3 3-8");
	path(s, "M22 10s-3-3-3-8");
	path(s, "M10 2c0 4.4-3.6 8-8 8");
	path(s, "M14 2c0 4.4 3.6 8 8 8");
	path(s, "M2 10s2 2 2 5");
	path(s, "M22 10s-2 2-2 5");
	path(s, "M8 15h8");
	path(s, "M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1");
	path(s, "M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1");
	return s;
}

export function ThermometerSnowflakeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10 20-1.25-2.5L6 18");
	path(s, "M10 4 8.75 6.5 6 6");
	path(s, "M10.585 15H10");
	path(s, "M2 12h6.5L10 9");
	path(s, "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z");
	path(s, "m4 10 1.5 2L4 14");
	path(s, "m7 21 3-6-1.5-3");
	path(s, "m7 3 3 6h2");
	return s;
}

export function ThermometerSunIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v2");
	path(s, "M12 8a4 4 0 0 0-1.645 7.647");
	path(s, "M2 12h2");
	path(s, "M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z");
	path(s, "m4.93 4.93 1.41 1.41");
	path(s, "m6.34 17.66-1.41 1.41");
	return s;
}

export function ThermometerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z");
	return s;
}

export function ThumbsDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",
	);
	path(s, "M17 14V2");
	return s;
}

export function ThumbsUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
	);
	path(s, "M7 10v12");
	return s;
}

export function TicketCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
	);
	path(s, "m9 12 2 2 4-4");
	return s;
}

export function TicketMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
	);
	path(s, "M9 12h6");
	return s;
}

export function TicketPercentIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
	);
	path(s, "M9 9h.01");
	path(s, "m15 9-6 6");
	path(s, "M15 15h.01");
	return s;
}

export function TicketPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
	);
	path(s, "M9 12h6");
	path(s, "M12 9v6");
	return s;
}

export function TicketSlashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
	);
	path(s, "m9.5 14.5 5-5");
	return s;
}

export function TicketXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
	);
	path(s, "m9.5 14.5 5-5");
	path(s, "m9.5 9.5 5 5");
	return s;
}

export function TicketIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
	);
	path(s, "M13 5v2");
	path(s, "M13 17v2");
	path(s, "M13 11v2");
	return s;
}

export function TicketsPlaneIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12");
	path(s, "m12 13.5 3.794.506");
	path(s, "m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8");
	path(s, "M6 10V8");
	path(s, "M6 14v1");
	path(s, "M6 19v2");
	rect(s, { x: "2", y: "8", width: "20", height: "13", rx: "2" });
	return s;
}

export function TicketsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8");
	path(s, "M6 10V8");
	path(s, "M6 14v1");
	path(s, "M6 19v2");
	rect(s, { x: "2", y: "8", width: "20", height: "13", rx: "2" });
	return s;
}

export function TimerOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2h4");
	path(s, "M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7");
	path(s, "M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2");
	path(s, "m2 2 20 20");
	path(s, "M12 12v-2");
	return s;
}

export function TimerResetIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2h4");
	path(s, "M12 14v-4");
	path(s, "M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6");
	path(s, "M9 17H4v5");
	return s;
}

export function TimerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	line(s, 10, 2, 14, 2);
	line(s, 12, 14, 15, 11);
	circle(s, 12, 14, 8);
	return s;
}

export function ToggleLeftIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 9, 12, 3);
	rect(s, { width: "20", height: "14", x: "2", y: "5", rx: "7" });
	return s;
}

export function ToggleRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 15, 12, 3);
	rect(s, { width: "20", height: "14", x: "2", y: "5", rx: "7" });
	return s;
}

export function ToiletIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18",
	);
	path(s, "M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8");
	return s;
}

export function ToolCaseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 15h4");
	path(
		s,
		"m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27",
	);
	path(
		s,
		"m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122",
	);
	path(
		s,
		"M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
	);
	return s;
}

export function ToolboxIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 12v4");
	path(
		s,
		"M16 6a2 2 0 0 1 1.414.586l4 4A2 2 0 0 1 22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 .586-1.414l4-4A2 2 0 0 1 8 6z",
	);
	path(s, "M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2");
	path(s, "M2 14h20");
	path(s, "M8 12v4");
	return s;
}

export function TornadoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 4H3");
	path(s, "M18 8H6");
	path(s, "M19 12H9");
	path(s, "M16 16h-6");
	path(s, "M11 20H9");
	return s;
}

export function TorusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	ellipse(s, { cx: "12", cy: "11", rx: "3", ry: "2" });
	ellipse(s, { cx: "12", cy: "12.5", rx: "10", ry: "8.5" });
	return s;
}

export function TouchpadOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 20v-6");
	path(s, "M19.656 14H22");
	path(s, "M2 14h12");
	path(s, "m2 2 20 20");
	path(s, "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2");
	path(s, "M9.656 4H20a2 2 0 0 1 2 2v10.344");
	return s;
}

export function TouchpadIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "16", x: "2", y: "4", rx: "2" });
	path(s, "M2 14h20");
	path(s, "M12 20v-6");
	return s;
}

export function TowelRackIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M22 7h-2");
	path(
		s,
		"M6.5 3h11A2.5 2.5 0 0 1 20 5.5V20a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5.5a1 1 0 0 0-5 0V17a1 1 0 0 0 1 1h4",
	);
	path(s, "M9 7H2");
	return s;
}

export function TowerControlIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z",
	);
	path(s, "M8 13v9");
	path(s, "M16 22v-9");
	path(s, "m9 6 1 7");
	path(s, "m15 6-1 7");
	path(s, "M12 6V2");
	path(s, "M13 2h-2");
	return s;
}

export function ToyBrickIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "12", x: "3", y: "8", rx: "1" });
	path(s, "M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3");
	path(s, "M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3");
	return s;
}

export function TractorIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20");
	path(s, "M16 18h-5");
	path(s, "M18 5a1 1 0 0 0-1 1v5.573");
	path(s, "M3 4h8.129a1 1 0 0 1 .99.863L13 11.246");
	path(s, "M4 11V4");
	path(s, "M7 15h.01");
	path(s, "M8 10.1V4");
	circle(s, 18, 18, 2);
	circle(s, 7, 15, 5);
	return s;
}

export function TrafficConeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16.05 10.966a5 2.5 0 0 1-8.1 0");
	path(
		s,
		"m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04",
	);
	path(s, "M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z");
	path(s, "M9.194 6.57a5 2.5 0 0 0 5.61 0");
	return s;
}

export function TrainFrontTunnelIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 22V12a10 10 0 1 1 20 0v10");
	path(s, "M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8");
	path(s, "M10 15h.01");
	path(s, "M14 15h.01");
	path(s, "M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z");
	path(s, "m9 19-2 3");
	path(s, "m15 19 2 3");
	return s;
}

export function TrainFrontIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 3.1V7a4 4 0 0 0 8 0V3.1");
	path(s, "m9 15-1-1");
	path(s, "m15 15 1-1");
	path(s, "M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z");
	path(s, "m8 19-2 3");
	path(s, "m16 19 2 3");
	return s;
}

export function TrainTrackIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 17 17 2");
	path(s, "m2 14 8 8");
	path(s, "m5 11 8 8");
	path(s, "m8 8 8 8");
	path(s, "m11 5 8 8");
	path(s, "m14 2 8 8");
	path(s, "M7 22 22 7");
	return s;
}

export function TramFrontIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "16", height: "16", x: "4", y: "3", rx: "2" });
	path(s, "M4 11h16");
	path(s, "M12 3v8");
	path(s, "m8 19-2 3");
	path(s, "m18 22-2-3");
	path(s, "M8 15h.01");
	path(s, "M16 15h.01");
	return s;
}

export function TransgenderIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 16v6");
	path(s, "M14 20h-4");
	path(s, "M18 2h4v4");
	path(s, "m2 2 7.17 7.17");
	path(s, "M2 5.355V2h3.357");
	path(s, "m22 2-7.17 7.17");
	path(s, "M8 5 5 8");
	circle(s, 12, 12, 4);
	return s;
}

export function Trash2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 11v6");
	path(s, "M14 11v6");
	path(s, "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6");
	path(s, "M3 6h18");
	path(s, "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2");
	return s;
}

export function TrashIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6");
	path(s, "M3 6h18");
	path(s, "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2");
	return s;
}

export function TreeDeciduousIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z",
	);
	path(s, "M12 19v3");
	return s;
}

export function TreePalmIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4");
	path(
		s,
		"M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3",
	);
	path(
		s,
		"M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35",
	);
	path(s, "M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14");
	return s;
}

export function TreePineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z",
	);
	path(s, "M12 22v-3");
	return s;
}

export function TreesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z");
	path(s, "M7 16v6");
	path(s, "M13 19v3");
	path(
		s,
		"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",
	);
	return s;
}

export function TrendingDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 17h6v-6");
	path(s, "m22 17-8.5-8.5-5 5L2 7");
	return s;
}

export function TrendingUpDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14.828 14.828 21 21");
	path(s, "M21 16v5h-5");
	path(s, "m21 3-9 9-4-4-6 6");
	path(s, "M21 8V3h-5");
	return s;
}

export function TrendingUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 7h6v6");
	path(s, "m22 7-8.5 8.5-5-5L2 17");
	return s;
}

export function TriangleAlertIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
	);
	path(s, "M12 9v4");
	path(s, "M12 17h.01");
	return s;
}

export function TriangleDashedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.17 4.193a2 2 0 0 1 3.666.013");
	path(s, "M14 21h2");
	path(s, "m15.874 7.743 1 1.732");
	path(s, "m18.849 12.952 1 1.732");
	path(s, "M21.824 18.18a2 2 0 0 1-1.835 2.824");
	path(s, "M4.024 21a2 2 0 0 1-1.839-2.839");
	path(s, "m5.136 12.952-1 1.732");
	path(s, "M8 21h2");
	path(s, "m8.102 7.743-1 1.732");
	return s;
}

export function TriangleRightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z",
	);
	return s;
}

export function TriangleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
	);
	return s;
}

export function TrophyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978");
	path(s, "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978");
	path(s, "M18 9h1.5a1 1 0 0 0 0-5H18");
	path(s, "M4 22h16");
	path(s, "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z");
	path(s, "M6 9H4.5a1 1 0 0 1 0-5H6");
	return s;
}

export function TruckElectricIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 19V7a2 2 0 0 0-2-2H9");
	path(s, "M15 19H9");
	path(
		s,
		"M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14",
	);
	path(s, "M2 13v5a1 1 0 0 0 1 1h2");
	path(
		s,
		"M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02",
	);
	circle(s, 17, 19, 2);
	circle(s, 7, 19, 2);
	return s;
}

export function TruckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2");
	path(s, "M15 18H9");
	path(
		s,
		"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
	);
	circle(s, 17, 18, 2);
	circle(s, 7, 18, 2);
	return s;
}

export function TurkishLiraIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 4 5 9");
	path(s, "m15 8.5-10 5");
	path(s, "M18 12a9 9 0 0 1-9 9V3");
	return s;
}

export function TurntableIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 12.01h.01");
	path(s, "M18 8v4a8 8 0 0 1-1.07 4");
	circle(s, 10, 12, 4);
	rect(s, { x: "2", y: "4", width: "20", height: "16", rx: "2" });
	return s;
}

export function TurtleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z",
	);
	path(s, "M4.82 7.9 8 10");
	path(s, "M15.18 7.9 12 10");
	path(s, "M16.93 10H20a2 2 0 0 1 0 4H2");
	return s;
}

export function TvMinimalPlayIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",
	);
	path(s, "M7 21h10");
	rect(s, { width: "20", height: "14", x: "2", y: "3", rx: "2" });
	return s;
}

export function TvMinimalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M7 21h10");
	rect(s, { width: "20", height: "14", x: "2", y: "3", rx: "2" });
	return s;
}

export function TvIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m17 2-5 5-5-5");
	rect(s, { width: "20", height: "15", x: "2", y: "7", rx: "2" });
	return s;
}

export function TypeOutlineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z",
	);
	return s;
}

export function TypeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 4v16");
	path(s, "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2");
	path(s, "M9 20h6");
	return s;
}

export function UmbrellaOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13v7a2 2 0 0 0 4 0");
	path(s, "M12 2v2");
	path(
		s,
		"M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51",
	);
	path(s, "m2 2 20 20");
	path(s, "M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10");
	return s;
}

export function UmbrellaIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 13v7a2 2 0 0 0 4 0");
	path(s, "M12 2v2");
	path(
		s,
		"M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z",
	);
	return s;
}

export function UnderlineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M6 4v6a6 6 0 0 0 12 0V4");
	line(s, 4, 20, 20, 20);
	return s;
}

export function Undo2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M9 14 4 9l5-5");
	path(s, "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11");
	return s;
}

export function UndoDotIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 17a9 9 0 0 0-15-6.7L3 13");
	path(s, "M3 7v6h6");
	circle(s, 12, 17, 1);
	return s;
}

export function UndoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 7v6h6");
	path(s, "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13");
	return s;
}

export function UnfoldHorizontalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 12h6");
	path(s, "M8 12H2");
	path(s, "M12 2v2");
	path(s, "M12 8v2");
	path(s, "M12 14v2");
	path(s, "M12 20v2");
	path(s, "m19 15 3-3-3-3");
	path(s, "m5 9-3 3 3 3");
	return s;
}

export function UnfoldVerticalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 22v-6");
	path(s, "M12 8V2");
	path(s, "M4 12H2");
	path(s, "M10 12H8");
	path(s, "M16 12h-2");
	path(s, "M22 12h-2");
	path(s, "m15 19-3 3-3-3");
	path(s, "m15 5-3-3-3 3");
	return s;
}

export function UngroupIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "6", x: "5", y: "4", rx: "1" });
	rect(s, { width: "8", height: "6", x: "11", y: "14", rx: "1" });
	return s;
}

export function UniversityIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M14 21v-3a2 2 0 0 0-4 0v3");
	path(s, "M18 12h.01");
	path(s, "M18 16h.01");
	path(
		s,
		"M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z",
	);
	path(s, "M6 12h.01");
	path(s, "M6 16h.01");
	circle(s, 12, 10, 2);
	return s;
}

export function Unlink2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2");
	return s;
}

export function UnlinkIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71",
	);
	path(
		s,
		"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71",
	);
	line(s, 8, 2, 8, 5);
	line(s, 2, 8, 5, 8);
	line(s, 16, 19, 16, 22);
	line(s, 19, 16, 22, 16);
	return s;
}

export function UnplugIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m19 5 3-3");
	path(s, "m2 22 3-3");
	path(
		s,
		"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z",
	);
	path(s, "M7.5 13.5 10 11");
	path(s, "M10.5 16.5 13 14");
	path(
		s,
		"m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z",
	);
	return s;
}

export function UploadIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 3v12");
	path(s, "m17 8-5-5-5 5");
	path(s, "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4");
	return s;
}

export function UsbIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 10, 7, 1);
	circle(s, 4, 20, 1);
	path(s, "M4.7 19.3 19 5");
	path(s, "m21 3-3 1 2 2Z");
	path(s, "M9.26 7.68 5 12l2 5");
	path(s, "m10 14 5 2 3.5-3.5");
	path(s, "m18 12 1-1 1 1-1 1Z");
	return s;
}

export function UserCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 11 2 2 4-4");
	path(s, "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2");
	circle(s, 9, 7, 4);
	return s;
}

export function UserCogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 15H6a4 4 0 0 0-4 4v2");
	path(s, "m14.305 16.53.923-.382");
	path(s, "m15.228 13.852-.923-.383");
	path(s, "m16.852 12.228-.383-.923");
	path(s, "m16.852 17.772-.383.924");
	path(s, "m19.148 12.228.383-.923");
	path(s, "m19.53 18.696-.382-.924");
	path(s, "m20.772 13.852.924-.383");
	path(s, "m20.772 16.148.924.383");
	circle(s, 18, 15, 3);
	circle(s, 9, 7, 4);
	return s;
}

export function UserKeyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M20 11v6");
	path(s, "M20 13h2");
	path(s, "M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578");
	circle(s, 10, 7, 4);
	circle(s, 20, 19, 2);
	return s;
}

export function UserLockIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19 16v-2a2 2 0 0 0-4 0v2");
	path(s, "M9.5 15H7a4 4 0 0 0-4 4v2");
	circle(s, 10, 7, 4);
	rect(s, { x: "13", y: "16", width: "8", height: "5", rx: ".899" });
	return s;
}

export function UserMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2");
	circle(s, 9, 7, 4);
	line(s, 22, 11, 16, 11);
	return s;
}

export function UserPenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11.5 15H7a4 4 0 0 0-4 4v2");
	path(
		s,
		"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
	);
	circle(s, 10, 7, 4);
	return s;
}

export function UserPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2");
	circle(s, 9, 7, 4);
	line(s, 19, 8, 19, 14);
	line(s, 22, 11, 16, 11);
	return s;
}

export function UserRoundCheckIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 21a8 8 0 0 1 13.292-6");
	circle(s, 10, 8, 5);
	path(s, "m16 19 2 2 4-4");
	return s;
}

export function UserRoundCogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14.305 19.53.923-.382");
	path(s, "m15.228 16.852-.923-.383");
	path(s, "m16.852 15.228-.383-.923");
	path(s, "m16.852 20.772-.383.924");
	path(s, "m19.148 15.228.383-.923");
	path(s, "m19.53 21.696-.382-.924");
	path(s, "M2 21a8 8 0 0 1 10.434-7.62");
	path(s, "m20.772 16.852.924-.383");
	path(s, "m20.772 19.148.924.383");
	circle(s, 10, 8, 5);
	circle(s, 18, 18, 3);
	return s;
}

export function UserRoundKeyIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19 11v6");
	path(s, "M19 13h2");
	path(s, "M2 21a8 8 0 0 1 12.868-6.349");
	circle(s, 10, 8, 5);
	circle(s, 19, 19, 2);
	return s;
}

export function UserRoundMinusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 21a8 8 0 0 1 13.292-6");
	circle(s, 10, 8, 5);
	path(s, "M22 19h-6");
	return s;
}

export function UserRoundPenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 21a8 8 0 0 1 10.821-7.487");
	path(
		s,
		"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
	);
	circle(s, 10, 8, 5);
	return s;
}

export function UserRoundPlusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 21a8 8 0 0 1 13.292-6");
	circle(s, 10, 8, 5);
	path(s, "M19 16v6");
	path(s, "M22 19h-6");
	return s;
}

export function UserRoundSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 10, 8, 5);
	path(s, "M2 21a8 8 0 0 1 10.434-7.62");
	circle(s, 18, 18, 3);
	path(s, "m22 22-1.9-1.9");
	return s;
}

export function UserRoundXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 21a8 8 0 0 1 11.873-7");
	circle(s, 10, 8, 5);
	path(s, "m17 17 5 5");
	path(s, "m22 17-5 5");
	return s;
}

export function UserRoundIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 8, 5);
	path(s, "M20 21a8 8 0 0 0-16 0");
	return s;
}

export function UserSearchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 10, 7, 4);
	path(s, "M10.3 15H7a4 4 0 0 0-4 4v2");
	circle(s, 17, 17, 3);
	path(s, "m21 21-1.9-1.9");
	return s;
}

export function UserStarIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z",
	);
	path(s, "M8 15H7a4 4 0 0 0-4 4v2");
	circle(s, 10, 7, 4);
	return s;
}

export function UserXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2");
	circle(s, 9, 7, 4);
	line(s, 17, 8, 22, 13);
	line(s, 22, 8, 17, 13);
	return s;
}

export function UserIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2");
	circle(s, 12, 7, 4);
	return s;
}

export function UsersRoundIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 21a8 8 0 0 0-16 0");
	circle(s, 10, 8, 5);
	path(s, "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3");
	return s;
}

export function UsersIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2");
	path(s, "M16 3.128a4 4 0 0 1 0 7.744");
	path(s, "M22 21v-2a4 4 0 0 0-3-3.87");
	circle(s, 9, 7, 4);
	return s;
}

export function UtensilsCrossedIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8");
	path(
		s,
		"M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7",
	);
	path(s, "m2.1 21.8 6.4-6.3");
	path(s, "m19 5-7 7");
	return s;
}

export function UtensilsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2");
	path(s, "M7 2v20");
	path(s, "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7");
	return s;
}

export function UtilityPoleIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v20");
	path(s, "M2 5h20");
	path(s, "M3 3v2");
	path(s, "M7 3v2");
	path(s, "M17 3v2");
	path(s, "M21 3v2");
	path(s, "m19 5-7 7-7-7");
	return s;
}

export function VanIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3",
	);
	path(
		s,
		"M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2",
	);
	path(s, "M9 18h5");
	circle(s, 16, 18, 2);
	circle(s, 7, 18, 2);
	return s;
}

export function VariableIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 21s-4-3-4-9 4-9 4-9");
	path(s, "M16 3s4 3 4 9-4 9-4 9");
	line(s, 15, 9, 9, 15);
	line(s, 9, 9, 15, 15);
	return s;
}

export function VaultIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	circle(s, 7.5, 7.5, 0.5, { fill: "currentColor" });
	path(s, "m7.9 7.9 2.7 2.7");
	circle(s, 16.5, 7.5, 0.5, { fill: "currentColor" });
	path(s, "m13.4 10.6 2.7-2.7");
	circle(s, 7.5, 16.5, 0.5, { fill: "currentColor" });
	path(s, "m7.9 16.1 2.7-2.7");
	circle(s, 16.5, 16.5, 0.5, { fill: "currentColor" });
	path(s, "m13.4 13.4 2.7 2.7");
	circle(s, 12, 12, 2);
	return s;
}

export function VectorSquareIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19.5 7a24 24 0 0 1 0 10");
	path(s, "M4.5 7a24 24 0 0 0 0 10");
	path(s, "M7 19.5a24 24 0 0 0 10 0");
	path(s, "M7 4.5a24 24 0 0 1 10 0");
	rect(s, { x: "17", y: "17", width: "5", height: "5", rx: "1" });
	rect(s, { x: "17", y: "2", width: "5", height: "5", rx: "1" });
	rect(s, { x: "2", y: "17", width: "5", height: "5", rx: "1" });
	rect(s, { x: "2", y: "2", width: "5", height: "5", rx: "1" });
	return s;
}

export function VeganIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 8q6 0 6-6-6 0-6 6");
	path(s, "M17.41 3.59a10 10 0 1 0 3 3");
	path(s, "M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14");
	return s;
}

export function VenetianMaskIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 11c-1.5 0-2.5.5-3 2");
	path(
		s,
		"M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z",
	);
	path(s, "M6 11c1.5 0 2.5.5 3 2");
	return s;
}

export function VenusAndMarsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 20h4");
	path(s, "M12 16v6");
	path(s, "M17 2h4v4");
	path(s, "m21 2-5.46 5.46");
	circle(s, 12, 11, 5);
	return s;
}

export function VenusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 15v7");
	path(s, "M9 19h6");
	circle(s, 12, 9, 6);
	return s;
}

export function VibrateOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m2 8 2 2-2 2 2 2-2 2");
	path(s, "m22 8-2 2 2 2-2 2 2 2");
	path(s, "M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2");
	path(s, "M16 10.34V6c0-.55-.45-1-1-1h-4.34");
	line(s, 2, 2, 22, 22);
	return s;
}

export function VibrateIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m2 8 2 2-2 2 2 2-2 2");
	path(s, "m22 8-2 2 2 2-2 2 2 2");
	rect(s, { width: "8", height: "14", x: "8", y: "5", rx: "1" });
	return s;
}

export function VideoOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196");
	path(s, "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2");
	path(s, "m2 2 20 20");
	return s;
}

export function VideoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
	);
	rect(s, { x: "2", y: "6", width: "14", height: "12", rx: "2" });
	return s;
}

export function VideotapeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "20", height: "16", x: "2", y: "4", rx: "2" });
	path(s, "M2 8h20");
	circle(s, 8, 14, 2);
	path(s, "M8 12h8");
	circle(s, 16, 14, 2);
	return s;
}

export function ViewIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2");
	path(s, "M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2");
	circle(s, 12, 12, 1);
	path(
		s,
		"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0",
	);
	return s;
}

export function VoicemailIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 6, 12, 4);
	circle(s, 18, 12, 4);
	line(s, 6, 16, 18, 16);
	return s;
}

export function VolleyballIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11.1 7.1a16.55 16.55 0 0 1 10.9 4");
	path(s, "M12 12a12.6 12.6 0 0 1-8.7 5");
	path(s, "M16.8 13.6a16.55 16.55 0 0 1-9 7.5");
	path(s, "M20.7 17a12.8 12.8 0 0 0-8.7-5 13.3 13.3 0 0 1 0-10");
	path(s, "M6.3 3.8a16.55 16.55 0 0 0 1.9 11.5");
	circle(s, 12, 12, 10);
	return s;
}

export function Volume1Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
	);
	path(s, "M16 9a5 5 0 0 1 0 6");
	return s;
}

export function Volume2Icon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
	);
	path(s, "M16 9a5 5 0 0 1 0 6");
	path(s, "M19.364 18.364a9 9 0 0 0 0-12.728");
	return s;
}

export function VolumeOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 9a5 5 0 0 1 .95 2.293");
	path(s, "M19.364 5.636a9 9 0 0 1 1.889 9.96");
	path(s, "m2 2 20 20");
	path(
		s,
		"m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11",
	);
	path(s, "M9.828 4.172A.686.686 0 0 1 11 4.657v.686");
	return s;
}

export function VolumeXIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
	);
	line(s, 22, 9, 16, 15);
	line(s, 16, 9, 22, 15);
	return s;
}

export function VolumeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
	);
	return s;
}

export function VoteIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m9 12 2 2 4-4");
	path(s, "M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z");
	path(s, "M22 19H2");
	return s;
}

export function WalletCardsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "18", height: "18", x: "3", y: "3", rx: "2" });
	path(s, "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2");
	path(
		s,
		"M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21",
	);
	return s;
}

export function WalletMinimalIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 14h.01");
	path(
		s,
		"M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14",
	);
	return s;
}

export function WalletIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
	);
	path(s, "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4");
	return s;
}

export function WallpaperIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 17v4");
	path(s, "M8 21h8");
	path(s, "m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15");
	circle(s, 8, 9, 2);
	rect(s, { x: "2", y: "3", width: "20", height: "14", rx: "2" });
	return s;
}

export function WandSparklesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
	);
	path(s, "m14 7 3 3");
	path(s, "M5 6v4");
	path(s, "M19 14v4");
	path(s, "M10 2v2");
	path(s, "M7 8H3");
	path(s, "M21 16h-4");
	path(s, "M11 3H9");
	return s;
}

export function WandIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 4V2");
	path(s, "M15 16v-2");
	path(s, "M8 9h2");
	path(s, "M20 9h2");
	path(s, "M17.8 11.8 19 13");
	path(s, "M15 9h.01");
	path(s, "M17.8 6.2 19 5");
	path(s, "m3 21 9-9");
	path(s, "M12.2 6.2 11 5");
	return s;
}

export function WarehouseIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11");
	path(
		s,
		"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z",
	);
	path(s, "M6 13h12");
	path(s, "M6 17h12");
	return s;
}

export function WashingMachineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 6h3");
	path(s, "M17 6h.01");
	rect(s, { width: "18", height: "20", x: "3", y: "2", rx: "2" });
	circle(s, 12, 13, 5);
	path(s, "M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5");
	return s;
}

export function WatchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 10v2.2l1.6 1");
	path(
		s,
		"m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05",
	);
	path(s, "m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05");
	circle(s, 12, 12, 6);
	return s;
}

export function WavesArrowDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 10L12 2");
	path(s, "M16 6L12 10L8 6");
	path(
		s,
		"M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15",
	);
	path(
		s,
		"M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21",
	);
	return s;
}

export function WavesArrowUpIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 2v8");
	path(
		s,
		"M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
	);
	path(
		s,
		"M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
	);
	path(s, "m8 6 4-4 4 4");
	return s;
}

export function WavesLadderIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19 5a2 2 0 0 0-2 2v11");
	path(
		s,
		"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
	);
	path(s, "M7 13h10");
	path(s, "M7 9h10");
	path(s, "M9 5a2 2 0 0 0-2 2v11");
	return s;
}

export function WavesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
	);
	path(
		s,
		"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
	);
	path(
		s,
		"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
	);
	return s;
}

export function WaypointsIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m10.586 5.414-5.172 5.172");
	path(s, "m18.586 13.414-5.172 5.172");
	path(s, "M6 12h12");
	circle(s, 12, 20, 2);
	circle(s, 12, 4, 2);
	circle(s, 20, 12, 2);
	circle(s, 4, 12, 2);
	return s;
}

export function WebcamIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 10, 8);
	circle(s, 12, 10, 3);
	path(s, "M7 22h10");
	path(s, "M12 22v-4");
	return s;
}

export function WebhookOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15");
	path(s, "M9 3.4a4 4 0 0 1 6.52.66");
	path(s, "m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05");
	path(s, "M20.3 20.3a4 4 0 0 1-2.3.7");
	path(s, "M18.6 13a4 4 0 0 1 3.357 3.414");
	path(s, "m12 6 .6 1");
	path(s, "m2 2 20 20");
	return s;
}

export function WebhookIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2",
	);
	path(s, "m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06");
	path(s, "m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8");
	return s;
}

export function WeightTildeIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z",
	);
	path(s, "M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0");
	circle(s, 12, 5, 3);
	return s;
}

export function WeightIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 5, 3);
	path(
		s,
		"M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z",
	);
	return s;
}

export function WheatOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m2 22 10-10");
	path(s, "m16 8-1.17 1.17");
	path(
		s,
		"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
	);
	path(
		s,
		"m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97",
	);
	path(
		s,
		"M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62",
	);
	path(s, "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z");
	path(
		s,
		"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
	);
	path(
		s,
		"m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98",
	);
	path(
		s,
		"M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28",
	);
	line(s, 2, 2, 22, 22);
	return s;
}

export function WheatIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 22 16 8");
	path(
		s,
		"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
	);
	path(
		s,
		"M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
	);
	path(
		s,
		"M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z",
	);
	path(s, "M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z");
	path(
		s,
		"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
	);
	path(
		s,
		"M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
	);
	path(
		s,
		"M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z",
	);
	return s;
}

export function WholeWordIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 7, 12, 3);
	path(s, "M10 9v6");
	circle(s, 17, 12, 3);
	path(s, "M14 7v8");
	path(s, "M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1");
	return s;
}

export function WifiCogIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m14.305 19.53.923-.382");
	path(s, "m15.228 16.852-.923-.383");
	path(s, "m16.852 15.228-.383-.923");
	path(s, "m16.852 20.772-.383.924");
	path(s, "m19.148 15.228.383-.923");
	path(s, "m19.53 21.696-.382-.924");
	path(s, "M2 7.82a15 15 0 0 1 20 0");
	path(s, "m20.772 16.852.924-.383");
	path(s, "m20.772 19.148.924.383");
	path(s, "M5 11.858a10 10 0 0 1 11.5-1.785");
	path(s, "M8.5 15.429a5 5 0 0 1 2.413-1.31");
	circle(s, 18, 18, 3);
	return s;
}

export function WifiHighIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 20h.01");
	path(s, "M5 12.859a10 10 0 0 1 14 0");
	path(s, "M8.5 16.429a5 5 0 0 1 7 0");
	return s;
}

export function WifiLowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 20h.01");
	path(s, "M8.5 16.429a5 5 0 0 1 7 0");
	return s;
}

export function WifiOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 20h.01");
	path(s, "M8.5 16.429a5 5 0 0 1 7 0");
	path(s, "M5 12.859a10 10 0 0 1 5.17-2.69");
	path(s, "M19 12.859a10 10 0 0 0-2.007-1.523");
	path(s, "M2 8.82a15 15 0 0 1 4.177-2.643");
	path(s, "M22 8.82a15 15 0 0 0-11.288-3.764");
	path(s, "m2 2 20 20");
	return s;
}

export function WifiPenIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M2 8.82a15 15 0 0 1 20 0");
	path(
		s,
		"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
	);
	path(s, "M5 12.859a10 10 0 0 1 10.5-2.222");
	path(s, "M8.5 16.429a5 5 0 0 1 3-1.406");
	return s;
}

export function WifiSyncIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5");
	path(s, "M11.965 14.105h4");
	path(s, "M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5");
	path(s, "M2 8.82a15 15 0 0 1 20 0");
	path(s, "M21.965 22.105v-4");
	path(s, "M5 12.86a10 10 0 0 1 3-2.032");
	path(s, "M8.5 16.429h.01");
	return s;
}

export function WifiZeroIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 20h.01");
	return s;
}

export function WifiIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 20h.01");
	path(s, "M2 8.82a15 15 0 0 1 20 0");
	path(s, "M5 12.859a10 10 0 0 1 14 0");
	path(s, "M8.5 16.429a5 5 0 0 1 7 0");
	return s;
}

export function WindArrowDownIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 2v8");
	path(s, "M12.8 21.6A2 2 0 1 0 14 18H2");
	path(s, "M17.5 10a2.5 2.5 0 1 1 2 4H2");
	path(s, "m6 6 4 4 4-4");
	return s;
}

export function WindIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12.8 19.6A2 2 0 1 0 14 16H2");
	path(s, "M17.5 8a2.5 2.5 0 1 1 2 4H2");
	path(s, "M9.8 4.4A2 2 0 1 1 11 8H2");
	return s;
}

export function WineOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 22h8");
	path(s, "M7 10h3m7 0h-1.343");
	path(s, "M12 15v7");
	path(
		s,
		"M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198",
	);
	line(s, 2, 2, 22, 22);
	return s;
}

export function WineIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M8 22h8");
	path(s, "M7 10h10");
	path(s, "M12 15v7");
	path(s, "M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z");
	return s;
}

export function WorkflowIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	rect(s, { width: "8", height: "8", x: "3", y: "3", rx: "2" });
	path(s, "M7 11v4a2 2 0 0 0 2 2h4");
	rect(s, { width: "8", height: "8", x: "13", y: "13", rx: "2" });
	return s;
}

export function WormIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "m19 12-1.5 3");
	path(s, "M19.63 18.81 22 20");
	path(
		s,
		"M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z",
	);
	return s;
}

export function WrenchIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
	);
	return s;
}

export function XLineTopIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 4H6");
	path(s, "M18 8 6 20");
	path(s, "m6 8 12 12");
	return s;
}

export function XIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M18 6 6 18");
	path(s, "m6 6 12 12");
	return s;
}

export function ZapOffIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317");
	path(s, "M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773");
	path(
		s,
		"M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643",
	);
	path(s, "m2 2 20 20");
	return s;
}

export function ZapIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
	);
	return s;
}

export function ZodiacAquariusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"m2 10 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.096-.001l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 10",
	);
	path(
		s,
		"m2 18.002 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.097 0l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 18.002",
	);
	return s;
}

export function ZodiacAriesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M12 7.5a4.5 4.5 0 1 1 5 4.5");
	path(s, "M7 12a4.5 4.5 0 1 1 5-4.5V21");
	return s;
}

export function ZodiacCancerIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M21 14.5A9 6.5 0 0 1 5.5 19");
	path(s, "M3 9.5A9 6.5 0 0 1 18.5 5");
	circle(s, 17.5, 14.5, 3.5);
	circle(s, 6.5, 9.5, 3.5);
	return s;
}

export function ZodiacCapricornIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 21a3 3 0 0 0 3-3V6.5a1 1 0 0 0-7 0");
	path(s, "M7 19V6a3 3 0 0 0-3-3h0");
	circle(s, 17, 17, 3);
	return s;
}

export function ZodiacGeminiIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M16 4.525v14.948");
	path(s, "M20 3A17 17 0 0 1 4 3");
	path(s, "M4 21a17 17 0 0 1 16 0");
	path(s, "M8 4.525v14.948");
	return s;
}

export function ZodiacLeoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M10 16c0-4-3-4.5-3-8a5 5 0 0 1 10 0c0 3.466-3 6.196-3 10a3 3 0 0 0 6 0",
	);
	circle(s, 7, 16, 3);
	return s;
}

export function ZodiacLibraIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(
		s,
		"M3 16h6.857c.162-.012.19-.323.038-.38a6 6 0 1 1 4.212 0c-.153.057-.125.368.038.38H21",
	);
	path(s, "M3 20h18");
	return s;
}

export function ZodiacOphiuchusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M3 10A6.06 6.06 0 0 1 12 10 A6.06 6.06 0 0 0 21 10");
	path(s, "M6 3v12a6 6 0 0 0 12 0V3");
	return s;
}

export function ZodiacPiscesIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M19 21a15 15 0 0 1 0-18");
	path(s, "M20 12H4");
	path(s, "M5 3a15 15 0 0 1 0 18");
	return s;
}

export function ZodiacSagittariusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M15 3h6v6");
	path(s, "M21 3 3 21");
	path(s, "m9 9 6 6");
	return s;
}

export function ZodiacScorpioIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M10 19V5.5a1 1 0 0 1 5 0V17a2 2 0 0 0 2 2h5l-3-3");
	path(s, "m22 19-3 3");
	path(s, "M5 19V5.5a1 1 0 0 1 5 0");
	path(s, "M5 5.5A2.5 2.5 0 0 0 2.5 3");
	return s;
}

export function ZodiacTaurusIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 12, 15, 6);
	path(s, "M18 3A6 6 0 0 1 6 3");
	return s;
}

export function ZodiacVirgoIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	path(s, "M11 5.5a1 1 0 0 1 5 0V16a5 5 0 0 0 5 5");
	path(s, "M16 11.5a1 1 0 0 1 5 0V16a5 5 0 0 1-5 5");
	path(s, "M6 19V6a3 3 0 0 0-3-3h0");
	path(s, "M6 5.5a1 1 0 0 1 5 0V19");
	return s;
}

export function ZoomInIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 11, 11, 8);
	line(s, 21, 21, 16.65, 16.65);
	line(s, 11, 8, 11, 14);
	line(s, 8, 11, 14, 11);
	return s;
}

export function ZoomOutIcon(props?: IconProps): SVGSVGElement {
	const s = createSvg(props);
	circle(s, 11, 11, 8);
	line(s, 21, 21, 16.65, 16.65);
	line(s, 8, 11, 14, 11);
	return s;
}

// ── Aliases (shadcn backward-compat names) ──

export const AlertTriangleIcon = TriangleAlertIcon;

export const ArrowLeftCircleIcon = CircleArrowLeftIcon;

export const CheckCircle2Icon = CircleCheckBigIcon;

export const HelpCircleIcon = CircleQuestionMarkIcon;

export const MoreHorizontalIcon = EllipsisIcon;

export const MoreVerticalIcon = EllipsisVerticalIcon;

export const PieChartIcon = ChartPieIcon;

export const UploadCloudIcon = CloudUploadIcon;

export const Loader2Icon = LoaderCircleIcon;

export const TerminalSquareIcon = SquareTerminalIcon;
