import { cva, type VariantProps } from "class-variance-authority";
import { div, type NodeChildren } from "sibujs";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export function Empty(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "empty",
		class: cnReactive(
			"flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function EmptyHeader(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "empty-header",
		class: cnReactive(
			"flex max-w-sm flex-col items-center gap-2 text-center",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export const emptyMediaVariants = cva(
	"mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface EmptyMediaProps
	extends BaseProps,
		VariantProps<typeof emptyMediaVariants> {}

export function EmptyMedia(
	first?: EmptyMediaProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<EmptyMediaProps>(first, second);
	const { class: className, variant = "default", nodes, ...rest } = props;
	return div({
		"data-slot": "empty-icon",
		"data-variant": variant,
		class: cnReactive(emptyMediaVariants({ variant, className })),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function EmptyTitle(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "empty-title",
		class: cnReactive("text-lg font-medium tracking-tight", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function EmptyDescription(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "empty-description",
		class: cnReactive(
			"text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function EmptyContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "empty-content",
		class: cnReactive(
			"flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}
