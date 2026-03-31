import { cva, type VariantProps } from "class-variance-authority";
import { div, type NodeChildren } from "sibujs";
import { cn } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export const alertVariants = cva(
	"relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
	{
		variants: {
			variant: {
				default: "bg-card text-card-foreground",
				destructive:
					"bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface AlertProps
	extends BaseProps,
		VariantProps<typeof alertVariants> {}

export function Alert(
	first?: AlertProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<AlertProps>(first, second);
	const { class: className, variant, nodes, ...rest } = props;

	return div({
		"data-slot": "alert",
		role: "alert",
		class: cn(alertVariants({ variant }), className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function AlertTitle(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	return div({
		"data-slot": "alert-title",
		class: cn(
			"col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function AlertDescription(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	return div({
		"data-slot": "alert-description",
		class: cn(
			"col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}
