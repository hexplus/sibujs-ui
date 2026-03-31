import { input as inputTag, type NodeChildren } from "sibujs";
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
}

export function Input(
	first?: InputProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<InputProps>(first, second);
	const { class: className, type, ...rest } = props;

	return inputTag({
		type,
		"data-slot": "input",
		class: cnReactive(
			"h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
			"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
			"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
			className,
		),
		...rest,
	}) as HTMLElement;
}
