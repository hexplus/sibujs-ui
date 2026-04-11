import { button as buttonTag, effect, type NodeChildren, span } from "sibujs";
import { CheckIcon } from "../icons";
import { bindControlled } from "../lib/controlled";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export interface CheckboxProps extends BaseProps {
	checked?: boolean | (() => boolean);
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
	name?: string;
	value?: string;
	required?: boolean;
}

export function Checkbox(
	first?: CheckboxProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<CheckboxProps>(first, second);
	const {
		class: className,
		checked: controlledChecked,
		defaultChecked = false,
		onCheckedChange,
		disabled,
		name,
		value,
		required,
		on,
		...rest
	} = props;

	const [isChecked, setIsChecked, isControlled] = bindControlled<boolean>(
		controlledChecked,
		defaultChecked,
	);

	const indicator = span({
		"data-slot": "checkbox-indicator",
		class: "grid place-content-center text-current transition-none",
	});

	const el = buttonTag(
		{
			"data-slot": "checkbox",
			type: "button",
			role: "checkbox",
			"aria-checked": () => String(isChecked()),
			"data-state": () => (isChecked() ? "checked" : "unchecked"),
			disabled,
			"aria-required": required ? "true" : undefined,
			class: cnReactive(
				"peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",
				className,
			),
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
		},
		[indicator],
	) as HTMLElement;

	// Update indicator content reactively
	effect(() => {
		indicator.innerHTML = "";
		if (isChecked()) {
			indicator.appendChild(CheckIcon({ class: "size-3.5" }));
		}
	});

	return el;
}
