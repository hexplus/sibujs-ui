import { cva, type VariantProps } from "class-variance-authority";
import { div, type NodeChildren } from "sibujs";
import { cn, cnReactive } from "../lib/utils";
import { Separator } from "./separator";
import { type BaseProps, normalizeArgs } from "./types";

export const buttonGroupVariants = cva(
	"flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
	{
		variants: {
			orientation: {
				horizontal:
					"[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
				vertical:
					"flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	},
);

export interface ButtonGroupProps
	extends BaseProps,
		VariantProps<typeof buttonGroupVariants> {}

export function ButtonGroup(
	first?: ButtonGroupProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ButtonGroupProps>(first, second);
	const {
		class: className,
		orientation = "horizontal",
		nodes,
		...rest
	} = props;
	return div({
		"data-slot": "button-group",
		"data-orientation": orientation,
		role: "group",
		class: cnReactive(buttonGroupVariants({ orientation, className })),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function ButtonGroupText(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "button-group-text",
		class: cn(
			"flex items-center gap-2 rounded-md border bg-muted px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface ButtonGroupSeparatorProps extends BaseProps {
	orientation?: "horizontal" | "vertical";
}

export function ButtonGroupSeparator(
	first?: ButtonGroupSeparatorProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ButtonGroupSeparatorProps>(first, second);
	const { class: className, orientation, ...rest } = props;

	return Separator({
		"data-slot": "button-group-separator",
		orientation,
		class: cnReactive(
			"relative m-0! self-stretch bg-input data-[orientation=vertical]:h-auto",
			className,
		),
		...rest,
	});
}
