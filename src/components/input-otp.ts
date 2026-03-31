import { div, effect, type NodeChildren, signal, span } from "sibujs";
import { MinusIcon } from "../icons";
import { cn } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

export interface InputOTPProps extends BaseProps {
	maxLength?: number;
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	onComplete?: (value: string) => void;
	disabled?: boolean;
	pattern?: string;
}

export function InputOTP(
	first?: InputOTPProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<InputOTPProps>(first, second);
	const {
		class: className,
		maxLength = 6,
		value: controlledValue,
		defaultValue = "",
		onValueChange,
		onComplete,
		disabled,
		pattern,
		nodes,
		...rest
	} = props;

	const [currentValue, setCurrentValue] = signal(
		controlledValue ?? defaultValue,
	);
	const [focusedIndex, setFocusedIndex] = signal(-1);
	const [isFocused, setIsFocused] = signal(false);

	// Create hidden input for capturing keyboard events
	const hiddenInput = document.createElement("input");
	hiddenInput.type = "text";
	hiddenInput.setAttribute("data-slot", "input-otp-hidden");
	hiddenInput.setAttribute("inputmode", "numeric");
	hiddenInput.setAttribute("autocomplete", "one-time-code");
	if (pattern) hiddenInput.setAttribute("pattern", pattern);
	if (disabled) hiddenInput.disabled = true;
	hiddenInput.maxLength = maxLength;
	hiddenInput.value = controlledValue ?? defaultValue;
	hiddenInput.style.cssText =
		"position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:1;";
	if (disabled) hiddenInput.style.cursor = "not-allowed";

	hiddenInput.addEventListener("input", () => {
		const val = hiddenInput.value.slice(0, maxLength);
		hiddenInput.value = val;
		if (controlledValue === undefined) setCurrentValue(val);
		onValueChange?.(val);
		setFocusedIndex(Math.min(val.length, maxLength - 1));
		if (val.length === maxLength) {
			onComplete?.(val);
		}
	});

	hiddenInput.addEventListener("focus", () => {
		setIsFocused(true);
		setFocusedIndex(Math.min(currentValue().length, maxLength - 1));
	});

	hiddenInput.addEventListener("blur", () => {
		setIsFocused(false);
		setFocusedIndex(-1);
	});

	const container = div({
		"data-slot": "input-otp",
		"data-disabled": disabled ? "" : undefined,
		class: cn(
			"group/input-otp relative flex items-center gap-2 has-disabled:opacity-50",
			className,
		),
		style: "position: relative",
		nodes: [
			hiddenInput as Node,
			...(Array.isArray(nodes)
				? (nodes as Node[])
				: nodes instanceof Node
					? [nodes]
					: nodes != null
						? [document.createTextNode(String(nodes))]
						: []),
		],
		...rest,
	}) as HTMLElement;

	(container as ElementWithContext).__inputOtp = {
		value: currentValue,
		focusedIndex,
		isFocused,
		maxLength,
	};

	return container as HTMLElement;
}

export function InputOTPGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "input-otp-group",
		class: cn("flex items-center", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface InputOTPSlotProps extends BaseProps {
	index: number;
}

export function InputOTPSlot(
	first?: InputOTPSlotProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<InputOTPSlotProps>(first, second);
	const { class: className, index, ...rest } = props;

	const slotEl = div({
		"data-slot": "input-otp-slot",
		"data-index": String(index),
		class: cn(
			"relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:data-[active=true]:aria-invalid:ring-destructive/40",
			className,
		),
		...rest,
	}) as HTMLElement;

	const charDisplay = span({
		"data-slot": "input-otp-char",
		class: "pointer-events-none",
	}) as HTMLElement;

	const caret = div({
		"data-slot": "input-otp-caret",
		class:
			"pointer-events-none absolute inset-0 flex items-center justify-center",
		style: "display: none",
		nodes: [
			div({
				class: "h-4 w-px animate-caret-blink bg-foreground duration-1000",
			}) as HTMLElement as Node,
		],
	}) as HTMLElement;

	slotEl.appendChild(charDisplay);
	slotEl.appendChild(caret);

	queueMicrotask(() => {
		const otpEl = slotEl.closest("[data-slot=input-otp]");
		if (otpEl) {
			const ctx = (otpEl as ElementWithContext).__inputOtp;
			if (ctx) {
				effect(() => {
					const val = ctx.value();
					const focused = ctx.focusedIndex();
					const hasFocus = ctx.isFocused();
					const char = val[index] ?? "";

					charDisplay.textContent = char;

					const isActive = hasFocus && focused === index;
					const isFilled = char !== "";

					slotEl.setAttribute("data-active", String(isActive));

					if (isActive && !isFilled) {
						caret.style.display = "";
					} else {
						caret.style.display = "none";
					}
				});
			}
		}
	});

	return slotEl as HTMLElement;
}

export function InputOTPSeparator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { ...rest } = props;
	return div({
		"data-slot": "input-otp-separator",
		role: "separator",
		nodes: [MinusIcon({}) as unknown as Node],
		...rest,
	}) as HTMLElement;
}
