import type { VariantProps } from "class-variance-authority";
import {
	button as buttonTag,
	div,
	effect,
	type NodeChildren,
	signal,
} from "sibujs";
import { cn } from "../lib/utils";
import { toggleVariants } from "./toggle";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

export interface ToggleGroupProps
	extends BaseProps,
		VariantProps<typeof toggleVariants> {
	type?: "single" | "multiple";
	value?: string | string[];
	defaultValue?: string | string[];
	onValueChange?: (value: string | string[]) => void;
	spacing?: number;
	disabled?: boolean;
}

export interface ToggleGroupItemProps
	extends BaseProps,
		VariantProps<typeof toggleVariants> {
	value: string;
	disabled?: boolean;
}

export function ToggleGroup(
	first?: ToggleGroupProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ToggleGroupProps>(first, second);
	const {
		class: className,
		variant = "default",
		size = "default",
		type = "single",
		value: controlledValue,
		defaultValue,
		onValueChange,
		spacing = 0,
		disabled,
		nodes,
		...rest
	} = props;

	const initial =
		controlledValue ?? defaultValue ?? (type === "multiple" ? [] : "");
	const [value, setValue] = signal<string | string[]>(initial);

	const el = div({
		"data-slot": "toggle-group",
		"data-variant": variant,
		"data-size": size,
		"data-spacing": String(spacing),
		"data-disabled": disabled ? "true" : undefined,
		role: "group",
		style: { "--gap": String(spacing) } as Record<string, string>,
		class: cn(
			"group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__toggleGroup = {
		variant,
		size,
		spacing,
		type,
		disabled,
		value,
		setValue,
		onValueChange,
	};

	return el as HTMLElement;
}

export function ToggleGroupItem(
	first?: ToggleGroupItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ToggleGroupItemProps>(first, second);
	const {
		class: className,
		variant: itemVariant,
		size: itemSize,
		value: itemValue,
		disabled: itemDisabled,
		nodes,
		on,
		...rest
	} = props;

	const el = buttonTag({
		"data-slot": "toggle-group-item",
		"data-value": itemValue,
		"data-state": "off",
		"aria-pressed": "false",
		type: "button",
		disabled: itemDisabled,
		nodes,
		...rest,
	}) as HTMLElement;

	// Apply classes synchronously — walk up to find group context on the same call stack
	// (the group element is created before its children in the nodes array)
	requestAnimationFrame(() => {
		const groupEl = el.closest("[data-slot=toggle-group]");
		const ctx = groupEl ? (groupEl as ElementWithContext).__toggleGroup : null;

		const v = ctx?.variant ?? itemVariant ?? "default";
		const s = ctx?.size ?? itemSize ?? "default";
		const sp = ctx?.spacing ?? 0;
		const isDisabled = (ctx?.disabled || itemDisabled) ?? false;

		el.setAttribute("data-variant", v || "default");
		el.setAttribute("data-size", s || "default");
		el.setAttribute("data-spacing", String(sp));
		if (isDisabled) (el as HTMLButtonElement).disabled = true;

		el.className = cn(
			toggleVariants({ variant: v, size: s }),
			"w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
			"data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
			className,
		);

		// Set initial state
		if (ctx) {
			const current = ctx.value();
			const isOn =
				ctx.type === "multiple"
					? Array.isArray(current) && current.includes(itemValue)
					: current === itemValue;
			el.setAttribute("data-state", isOn ? "on" : "off");
			el.setAttribute("aria-pressed", String(isOn));
		}
	});

	// Click handler
	el.addEventListener("click", (ev: Event) => {
		const groupEl = el.closest("[data-slot=toggle-group]");
		if (!groupEl) return;
		const ctx = (groupEl as ElementWithContext).__toggleGroup;
		if (!ctx || ctx.disabled || itemDisabled) return;

		const current = ctx.value();
		if (ctx.type === "multiple") {
			const arr = Array.isArray(current) ? [...current] : [];
			const idx = arr.indexOf(itemValue);
			if (idx >= 0) arr.splice(idx, 1);
			else arr.push(itemValue);
			ctx.setValue(arr);
			ctx.onValueChange?.(arr);
		} else {
			const next = current === itemValue ? "" : itemValue;
			ctx.setValue(next);
			ctx.onValueChange?.(next);
		}
		(on as Record<string, (ev: Event) => void>)?.click?.(ev);
	});

	// Reactive state binding after mount
	queueMicrotask(() => {
		const groupEl = el.closest("[data-slot=toggle-group]");
		if (!groupEl) return;
		const ctx = (groupEl as ElementWithContext).__toggleGroup;
		if (!ctx) return;

		effect(() => {
			const current = ctx.value();
			const isOn =
				ctx.type === "multiple"
					? Array.isArray(current) && current.includes(itemValue)
					: current === itemValue;
			el.setAttribute("data-state", isOn ? "on" : "off");
			el.setAttribute("aria-pressed", String(isOn));
		});
	});

	return el;
}
