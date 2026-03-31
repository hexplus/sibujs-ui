import { div, type NodeChildren } from "sibujs";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export interface ProgressProps extends BaseProps {
	value?: number | (() => number);
	max?: number;
}

export function Progress(
	first?: ProgressProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ProgressProps>(first, second);
	const { class: className, value = 0, max = 100, ...rest } = props;

	const getValue = typeof value === "function" ? value : () => value;

	return div({
		"data-slot": "progress",
		role: "progressbar",
		"aria-valuemin": "0",
		"aria-valuemax": String(max),
		"aria-valuenow": () => String(getValue()),
		class: cnReactive(
			"relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
			className,
		),
		nodes: [
			div({
				"data-slot": "progress-indicator",
				class: "h-full w-full flex-1 bg-primary transition-all",
				style: {
					transform: () => `translateX(-${100 - (getValue() || 0)}%)`,
				},
			}),
		],
		...rest,
	}) as HTMLElement;
}
