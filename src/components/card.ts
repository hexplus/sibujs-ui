import { div, type NodeChildren } from "sibujs";
import { cn } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export function Card(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "card",
		class: cn(
			"flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function CardHeader(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "card-header",
		class: cn(
			"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function CardTitle(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "card-title",
		class: cn("leading-none font-semibold", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function CardDescription(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "card-description",
		class: cn("text-sm text-muted-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function CardAction(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "card-action",
		class: cn(
			"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function CardContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "card-content",
		class: cn("px-6", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function CardFooter(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "card-footer",
		class: cn("flex items-center px-6 [.border-t]:pt-6", className),
		nodes,
		...rest,
	}) as HTMLElement;
}
