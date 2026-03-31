import { cva, type VariantProps } from "class-variance-authority";
import { div, type NodeChildren, p } from "sibujs";
import { cnReactive } from "../lib/utils";
import { Separator } from "./separator";
import { type BaseProps, normalizeArgs } from "./types";

export function ItemGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "item-group",
		role: "list",
		class: cnReactive("group/item-group flex flex-col", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function ItemSeparator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return Separator({
		"data-slot": "item-separator",
		orientation: "horizontal",
		class: cnReactive("my-0", className),
		...rest,
	});
}

export const itemVariants = cva(
	"group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-accent/50",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline: "border-border",
				muted: "bg-muted/50",
			},
			size: {
				default: "gap-4 p-4",
				sm: "gap-2.5 px-4 py-3",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ItemProps
	extends BaseProps,
		VariantProps<typeof itemVariants> {}

export function Item(
	first?: ItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ItemProps>(first, second);
	const {
		class: className,
		variant = "default",
		size = "default",
		nodes,
		...rest
	} = props;
	return div({
		"data-slot": "item",
		"data-variant": variant,
		"data-size": size,
		class: cnReactive(itemVariants({ variant, size }), className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export const itemMediaVariants = cva(
	"flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
				image:
					"size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface ItemMediaProps
	extends BaseProps,
		VariantProps<typeof itemMediaVariants> {}

export function ItemMedia(
	first?: ItemMediaProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ItemMediaProps>(first, second);
	const { class: className, variant = "default", nodes, ...rest } = props;
	return div({
		"data-slot": "item-media",
		"data-variant": variant,
		class: cnReactive(itemMediaVariants({ variant }), className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function ItemContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "item-content",
		class: cnReactive(
			"flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function ItemTitle(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "item-title",
		class: cnReactive(
			"flex w-fit items-center gap-2 text-sm font-medium leading-snug",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function ItemDescription(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return p({
		"data-slot": "item-description",
		class: cnReactive(
			"line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function ItemActions(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "item-actions",
		class: cnReactive("flex items-center gap-2", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function ItemHeader(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "item-header",
		class: cnReactive(
			"flex basis-full items-center justify-between gap-2",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function ItemFooter(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "item-footer",
		class: cnReactive(
			"flex basis-full items-center justify-between gap-2",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}
