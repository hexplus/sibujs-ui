import { div, type NodeChildren, optgroup, option, select } from "sibujs";
import { ChevronDownIcon } from "../icons";
import { bindControlled } from "../lib/controlled";
import { nodeOwner, ownedEffect } from "../lib/lifecycle";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export interface NativeSelectProps extends BaseProps {
	disabled?: boolean;
	required?: boolean;
	name?: string;
	/** Controlled value. Accepts a getter so a parent signal can drive it. */
	value?: string | (() => string);
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

	const isControlled = value !== undefined;
	const [current, , , stopControlled] = bindControlled<string>(
		value,
		defaultValue ?? "",
	);

	/**
	 * Select `v` among the options that exist right now.
	 *
	 * The value used to go to the tag factory, which applied it before the
	 * options were appended — a `<select>` with no matching option ignores the
	 * assignment, so the first option always won.
	 */
	const applyValue = (v: string) => {
		const el = selectEl as HTMLSelectElement;
		if (el.value !== v) el.value = v;
	};

	const selectEl = select({
		"data-slot": "native-select",
		"data-size": size,
		name,
		disabled,
		required,
		multiple,
		class: cnReactive(
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
				// Controlled: the owner decides. If it did not accept the change,
				// put the selection back.
				if (isControlled && !multiple) applyValue(current());
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

	const wrapper = div(
		{
			"data-slot": "native-select-wrapper",
			class:
				"group/native-select relative w-fit has-[select:disabled]:opacity-50",
		},
		[selectEl, chevron],
	) as HTMLElement;

	const owner = nodeOwner(wrapper);
	owner.add(stopControlled);

	if (!multiple) {
		if (isControlled) {
			ownedEffect(wrapper, () => applyValue(current()));
			// Options rendered later (a reactive list) must still pick up the value.
			if (typeof MutationObserver !== "undefined") {
				const mo = new MutationObserver(() => applyValue(current()));
				mo.observe(selectEl, { childList: true, subtree: true });
				owner.observer(mo);
			}
		} else if (defaultValue !== undefined) {
			/**
			 * Mark the default option so a form reset returns to it, as a native
			 * `selected` attribute would, and select it.
			 *
			 * Options rendered later (a reactive list) get the same treatment as
			 * they arrive — otherwise the first option would show and a form reset
			 * would return to it — but only until the user picks something: a
			 * late-arriving default must not take the selection away from them.
			 */
			const applyDefault = () => {
				for (const opt of Array.from((selectEl as HTMLSelectElement).options)) {
					const isDefault = opt.value === defaultValue;
					if (opt.defaultSelected !== isDefault)
						opt.defaultSelected = isDefault;
				}
				applyValue(defaultValue);
			};
			applyDefault();
			if (typeof MutationObserver !== "undefined") {
				const mo = new MutationObserver(applyDefault);
				mo.observe(selectEl, { childList: true, subtree: true });
				owner.observer(mo);
				selectEl.addEventListener("change", () => mo.disconnect(), {
					once: true,
				});
			}
		}
	}

	return wrapper;
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
		class: cnReactive(className),
		label: groupLabel,
		disabled,
		nodes,
		...rest,
	}) as HTMLElement;
}
