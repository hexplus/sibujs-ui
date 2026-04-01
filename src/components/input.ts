import {
	button as buttonTag,
	div,
	input as inputTag,
	type NodeChildren,
} from "sibujs";
import { ChevronDownIcon, ChevronUpIcon } from "../icons";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export interface InputProps extends BaseProps {
	type?: string;
	placeholder?: string;
	disabled?: boolean;
	value?: string;
	name?: string;
	id?: string;
	required?: boolean;
	readonly?: boolean;
	min?: string;
	max?: string;
	step?: string;
}

const BASE_INPUT_CLASS =
	"h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30";

const FOCUS_CLASS =
	"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

const INVALID_CLASS =
	"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40";

export function Input(
	first?: InputProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<InputProps>(first, second);
	const { class: className, type, disabled, ...rest } = props;

	if (type !== "number") {
		return inputTag({
			type,
			disabled,
			"data-slot": "input",
			class: cnReactive(BASE_INPUT_CLASS, FOCUS_CLASS, INVALID_CLASS, className),
			...rest,
		}) as HTMLElement;
	}

	// Number input: wrapper with stepper buttons
	const inputEl = inputTag({
		type: "number",
		disabled,
		"data-slot": "input",
		class: cnReactive(
			"h-full w-full min-w-0 bg-transparent px-3 py-1 text-base outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
			"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
		),
		...rest,
	}) as HTMLInputElement;

	function step(direction: number) {
		if (disabled) return;
		if (direction > 0) inputEl.stepUp();
		else inputEl.stepDown();
		inputEl.dispatchEvent(new Event("input", { bubbles: true }));
		inputEl.dispatchEvent(new Event("change", { bubbles: true }));
	}

	const stepBtnClass =
		"flex h-1/2 items-center justify-center text-muted-foreground/80 hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50";

	return div({
		"data-slot": "input-number",
		class: cnReactive(
			"flex h-9 w-full min-w-0 items-center rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow] has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50 has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 dark:bg-input/30",
			"has-[input:aria-invalid]:border-destructive has-[input:aria-invalid]:ring-destructive/20 dark:has-[input:aria-invalid]:ring-destructive/40",
			className,
		),
		nodes: [
			inputEl,
			div({
				class: "flex h-full shrink-0 flex-col border-l border-input",
				nodes: [
					buttonTag({
						type: "button",
						tabindex: "-1",
						disabled,
						"aria-label": "Increase",
						class: `${stepBtnClass} w-6 rounded-tr-[calc(var(--radius)-1px)] border-b border-input`,
						on: { click: () => step(1) },
						nodes: [ChevronUpIcon({ class: "size-3" }) as unknown as Node],
					}),
					buttonTag({
						type: "button",
						tabindex: "-1",
						disabled,
						"aria-label": "Decrease",
						class: `${stepBtnClass} w-6 rounded-br-[calc(var(--radius)-1px)]`,
						on: { click: () => step(-1) },
						nodes: [
							ChevronDownIcon({ class: "size-3" }) as unknown as Node,
						],
					}),
				],
			}),
		],
	}) as HTMLElement;
}
