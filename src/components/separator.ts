import { div, type NodeChildren } from "sibujs";
import { cn } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export interface SeparatorProps extends BaseProps {
	orientation?: "horizontal" | "vertical";
	decorative?: boolean;
}

export function Separator(
	first?: SeparatorProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SeparatorProps>(first, second);
	const {
		class: className,
		orientation = "horizontal",
		decorative = true,
		nodes,
		...rest
	} = props;

	return div({
		"data-slot": "separator",
		role: decorative ? "none" : "separator",
		"aria-orientation": decorative ? undefined : orientation,
		"data-orientation": orientation,
		class: cn(
			"shrink-0 bg-border",
			orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}
