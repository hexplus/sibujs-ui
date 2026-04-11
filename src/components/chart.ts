import { div, type NodeChildren } from "sibujs";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

/**
 * Chart components provide the styling container for chart libraries.
 *
 * This provides framework-agnostic containers — use any charting library
 * and mount it inside ChartContainer.
 */

export type ChartConfig = Record<
	string,
	{
		label?: string;
		color?: string;
		theme?: Record<"light" | "dark", string>;
	}
>;

export interface ChartContainerProps extends BaseProps {
	config: ChartConfig;
}

let chartCounter = 0;

export function ChartContainer(
	first?: ChartContainerProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ChartContainerProps>(first, second);
	const { class: className, config, nodes, ...rest } = props;

	const chartId = `chart-${++chartCounter}`;

	// Inject ChartStyle as first child (like shadcn)
	const styleEl = ChartStyle({ id: chartId, config });
	const childNodes = [
		styleEl as Node,
		...((Array.isArray(nodes)
			? nodes
			: nodes != null
				? [nodes]
				: []) as Node[]),
	];

	const el = div({
		"data-slot": "chart",
		"data-chart": chartId,
		class: cnReactive(
			"flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
			className,
		),
		nodes: childNodes,
		...rest,
	}) as HTMLElement;

	return el;
}

export interface ChartTooltipContentProps extends BaseProps {
	hideLabel?: boolean;
	hideIndicator?: boolean;
	indicator?: "line" | "dot" | "dashed";
	nameKey?: string;
	labelKey?: string;
}

export function ChartTooltipContent(
	first?: ChartTooltipContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ChartTooltipContentProps>(first, second);
	const {
		class: className,
		hideLabel = false,
		hideIndicator = false,
		indicator = "dot",
		nodes,
		...rest
	} = props;

	return div({
		"data-slot": "chart-tooltip-content",
		class: cnReactive(
			"grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface ChartLegendContentProps extends BaseProps {
	verticalAlign?: "top" | "bottom";
}

export function ChartLegendContent(
	first?: ChartLegendContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ChartLegendContentProps>(first, second);
	const { class: className, verticalAlign = "bottom", nodes, ...rest } = props;

	return div({
		"data-slot": "chart-legend-content",
		class: cnReactive(
			"flex items-center justify-center gap-4",
			verticalAlign === "top" ? "pb-3" : "pt-3",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface ChartStyleProps {
	id: string;
	config: ChartConfig;
}

export function ChartStyle(props: ChartStyleProps): HTMLElement {
	const { id, config } = props;

	let css = "";
	for (const [key, value] of Object.entries(config)) {
		if (value.color) {
			css += `[data-chart="${id}"] { --color-${key}: ${value.color}; }\n`;
		}
		if (value.theme) {
			if (value.theme.light) {
				css += `[data-chart="${id}"] { --color-${key}: ${value.theme.light}; }\n`;
			}
			if (value.theme.dark) {
				css += `.dark [data-chart="${id}"] { --color-${key}: ${value.theme.dark}; }\n`;
			}
		}
	}

	const style = document.createElement("style");
	style.textContent = css;
	return style as unknown as HTMLElement;
}
