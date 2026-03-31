import { kbd as kbdTag, type NodeChildren } from "sibujs";
import { cn, cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export function Kbd(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	return kbdTag({
		"data-slot": "kbd",
		class: cn(
			"pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none",
			"[&_svg:not([class*='size-'])]:size-3",
			"[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function KbdGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	return kbdTag({
		"data-slot": "kbd-group",
		class: cnReactive("inline-flex items-center gap-1", className),
		nodes,
		...rest,
	}) as HTMLElement;
}
