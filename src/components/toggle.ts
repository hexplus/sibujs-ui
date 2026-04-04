import { cva, type VariantProps } from "class-variance-authority";
import { button as buttonTag, type NodeChildren, signal } from "sibujs";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export const toggleVariants = cva(
	"group/toggle inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-9 min-w-9 px-2",
				sm: "h-8 min-w-8 px-1.5",
				lg: "h-10 min-w-10 px-2.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ToggleProps
	extends BaseProps,
		VariantProps<typeof toggleVariants> {
	pressed?: boolean | (() => boolean);
	defaultPressed?: boolean;
	onPressedChange?: (pressed: boolean) => void;
	disabled?: boolean;
}

export function Toggle(
	first?: ToggleProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ToggleProps>(first, second);
	const {
		class: className,
		variant,
		size,
		pressed,
		defaultPressed = false,
		onPressedChange,
		nodes,
		on,
		...rest
	} = props;

	const [isPressed, setIsPressed] = signal(pressed ?? defaultPressed);

	const el = buttonTag({
		"data-slot": "toggle",
		type: "button",
		"aria-pressed": () => String(isPressed()),
		"data-state": () => (isPressed() ? "on" : "off"),
		class: cnReactive(toggleVariants({ variant, size }), className),
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				const next = !isPressed();
				if (pressed === undefined) setIsPressed(next);
				onPressedChange?.(next);
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	return el;
}
