import { button as buttonTag, type NodeChildren, span } from "sibujs";
import { bindControlled } from "../lib/controlled";
import { cn, cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export interface SwitchProps extends BaseProps {
	checked?: boolean | (() => boolean);
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
	size?: "sm" | "default";
	name?: string;
}

export function Switch(
	first?: SwitchProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SwitchProps>(first, second);
	const {
		class: className,
		checked: controlledChecked,
		defaultChecked = false,
		onCheckedChange,
		disabled,
		size = "default",
		on,
		...rest
	} = props;

	const [isChecked, setIsChecked, isControlled] = bindControlled<boolean>(
		controlledChecked,
		defaultChecked,
	);

	return buttonTag({
		"data-slot": "switch",
		"data-size": size,
		type: "button",
		role: "switch",
		"aria-checked": () => String(isChecked()),
		"data-state": () => (isChecked() ? "checked" : "unchecked"),
		disabled,
		class: cnReactive(
			"peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
			className,
		),
		nodes: [
			span({
				"data-slot": "switch-thumb",
				class: cn(
					"pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground",
				),
				"data-state": () => (isChecked() ? "checked" : "unchecked"),
			}),
		],
		on: {
			...on,
			click: (ev: Event) => {
				if (disabled) return;
				const next = !isChecked();
				if (!isControlled) setIsChecked(next);
				onCheckedChange?.(next);
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}
