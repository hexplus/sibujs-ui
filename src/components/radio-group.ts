import {
	button as buttonTag,
	div,
	effect,
	type NodeChildren,
	signal,
	span,
} from "sibujs";
import { CircleIcon } from "../icons";
import { cnReactive } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

export interface RadioGroupProps extends BaseProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	name?: string;
	disabled?: boolean;
	required?: boolean;
}

export function RadioGroup(
	first?: RadioGroupProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<RadioGroupProps>(first, second);
	const {
		class: className,
		value: controlledValue,
		defaultValue = "",
		onValueChange,
		name,
		disabled,
		required,
		nodes,
		...rest
	} = props;

	const [value, setValue] = signal(controlledValue ?? defaultValue);

	const el = div({
		"data-slot": "radio-group",
		role: "radiogroup",
		"aria-required": required ? "true" : undefined,
		"data-disabled": disabled ? "true" : undefined,
		class: cnReactive("grid gap-3", className),
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__radioGroup = {
		value,
		select: (v: string) => {
			if (disabled) return;
			if (controlledValue === undefined) setValue(v);
			onValueChange?.(v);
		},
		name,
	};

	return el as HTMLElement;
}

export interface RadioGroupItemProps extends BaseProps {
	value: string;
	disabled?: boolean;
}

export function RadioGroupItem(
	first?: RadioGroupItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<RadioGroupItemProps>(first, second);
	const { class: className, value: itemValue, disabled, on, ...rest } = props;

	const indicatorWrapper = span({
		"data-slot": "radio-group-indicator",
		class: "relative flex items-center justify-center",
	});

	const el = buttonTag({
		"data-slot": "radio-group-item",
		"data-value": itemValue,
		type: "button",
		role: "radio",
		disabled,
		class: cnReactive(
			"aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
			className,
		),
		nodes: [indicatorWrapper],
		on: {
			...on,
			click: (ev: Event) => {
				if (disabled) return;
				const groupEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=radio-group]",
				);
				if (groupEl)
					(groupEl as ElementWithContext).__radioGroup?.select(itemValue);
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	// Bind checked state
	queueMicrotask(() => {
		const groupEl = el.closest("[data-slot=radio-group]");
		if (groupEl) {
			const ctx = (groupEl as ElementWithContext).__radioGroup;
			if (ctx) {
				effect(() => {
					const isSelected = ctx.value() === itemValue;
					el.setAttribute("aria-checked", String(isSelected));
					el.setAttribute("data-state", isSelected ? "checked" : "unchecked");
					indicatorWrapper.innerHTML = "";
					if (isSelected) {
						const icon = CircleIcon({
							class:
								"absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary",
						});
						indicatorWrapper.appendChild(icon);
					}
				});
			}
		}
	});

	return el;
}
