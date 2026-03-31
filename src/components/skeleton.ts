import { div, type NodeChildren } from "sibujs";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export function Skeleton(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	return div({
		"data-slot": "skeleton",
		class: cnReactive("animate-pulse rounded-md bg-accent", className),
		nodes,
		...rest,
	}) as HTMLElement;
}
