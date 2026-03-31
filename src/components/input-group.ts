import { cva, type VariantProps } from "class-variance-authority";
import { div, type NodeChildren, span } from "sibujs";
import { cn, cnReactive, cnReactive } from "../lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { type BaseProps, normalizeArgs } from "./types";

export function InputGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "input-group",
		role: "group",
		class: cnReactive(
			"group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30",
			"h-9 min-w-0 has-[>textarea]:h-auto",
			"has-[>[data-align=inline-start]]:[&>input]:pl-2",
			"has-[>[data-align=inline-end]]:[&>input]:pr-2",
			"has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
			"has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
			"has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50",
			"has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
			"has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40",
			"aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export const inputGroupAddonVariants = cva(
	"flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
	{
		variants: {
			align: {
				"inline-start":
					"order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
				"inline-end":
					"order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
				"block-start":
					"order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3",
				"block-end":
					"order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3",
			},
		},
		defaultVariants: {
			align: "inline-start",
		},
	},
);

export interface InputGroupAddonProps
	extends BaseProps,
		VariantProps<typeof inputGroupAddonVariants> {}

export function InputGroupAddon(
	first?: InputGroupAddonProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<InputGroupAddonProps>(first, second);
	const {
		class: className,
		align = "inline-start",
		nodes,
		on,
		...rest
	} = props;
	return div({
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		class: cnReactive(inputGroupAddonVariants({ align }), className),
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				if ((ev.target as HTMLElement).closest("button")) return;
				(ev.currentTarget as HTMLElement).parentElement
					?.querySelector("input")
					?.focus();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

export const inputGroupButtonVariants = cva(
	"flex items-center gap-2 text-sm shadow-none",
	{
		variants: {
			size: {
				xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
				sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
				"icon-xs":
					"size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
				"icon-sm": "size-8 p-0 has-[>svg]:p-0",
			},
		},
		defaultVariants: {
			size: "xs",
		},
	},
);

export interface InputGroupButtonProps extends BaseProps {
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "xs" | "sm" | "icon-xs" | "icon-sm";
	type?: "button" | "submit" | "reset";
}

export function InputGroupButton(
	first?: InputGroupButtonProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<InputGroupButtonProps>(first, second);
	const {
		class: className,
		type = "button",
		variant = "ghost",
		size = "xs",
		...rest
	} = props;
	return Button({
		type,
		"data-size": size,
		variant,
		class: cnReactive(inputGroupButtonVariants({ size }), className),
		...rest,
	});
}

export function InputGroupText(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return span({
		class: cn(
			"flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function InputGroupInput(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return Input({
		"data-slot": "input-group-control",
		class: cnReactive(
			"flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
			className,
		),
		...rest,
	});
}

export function InputGroupTextarea(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return Textarea({
		"data-slot": "input-group-control",
		class: cnReactive(
			"flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
			className,
		),
		...rest,
	});
}
