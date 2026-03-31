import { div, type NodeChildren, optgroup, option, select } from "sibujs";
import { ChevronDownIcon } from "../icons";
import { cn } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export interface NativeSelectProps extends BaseProps {
	disabled?: boolean;
	required?: boolean;
	name?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	multiple?: boolean;
	size?: "sm" | "default";
}

export function NativeSelect(
	first?: NativeSelectProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<NativeSelectProps>(first, second);
	const {
		class: className,
		disabled,
		required,
		name,
		value,
		defaultValue,
		onChange,
		multiple,
		size = "default",
		nodes,
		on,
		...rest
	} = props;

	const selectEl = select({
		"data-slot": "native-select",
		"data-size": size,
		name,
		disabled,
		required,
		multiple,
		value: value ?? defaultValue,
		class: cn(
			"h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 dark:bg-input/30 dark:hover:bg-input/50",
			"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
			"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
			className,
		),
		nodes,
		on: {
			...on,
			change: (ev: Event) => {
				const target = ev.target as HTMLSelectElement;
				onChange?.(target.value);
				(on as Record<string, (ev: Event) => void>)?.change?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	const chevron = ChevronDownIcon({
		class:
			"pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground opacity-50 select-none",
		"aria-hidden": "true",
		"data-slot": "native-select-icon",
	}) as unknown as HTMLElement;

	return div({
		"data-slot": "native-select-wrapper",
		class:
			"group/native-select relative w-fit has-[select:disabled]:opacity-50",
		nodes: [selectEl, chevron],
	}) as HTMLElement;
}

export interface NativeSelectOptionProps extends BaseProps {
	value?: string;
	disabled?: boolean;
}

export function NativeSelectOption(
	first?: NativeSelectOptionProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<NativeSelectOptionProps>(first, second);
	const { value: val, disabled, nodes, ...rest } = props;
	return option({
		"data-slot": "native-select-option",
		value: val,
		disabled,
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface NativeSelectOptGroupProps extends BaseProps {
	label?: string;
	disabled?: boolean;
}

export function NativeSelectOptGroup(
	first?: NativeSelectOptGroupProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<NativeSelectOptGroupProps>(first, second);
	const {
		class: className,
		label: groupLabel,
		disabled,
		nodes,
		...rest
	} = props;
	return optgroup({
		"data-slot": "native-select-optgroup",
		class: cn(className),
		label: groupLabel,
		disabled,
		nodes,
		...rest,
	}) as HTMLElement;
}
