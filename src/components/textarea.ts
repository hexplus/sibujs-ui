import { type NodeChildren, textarea as textareaTag } from "sibujs";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export interface TextareaProps extends BaseProps {
	placeholder?: string;
	disabled?: boolean;
	value?: string | (() => string);
	name?: string;
	id?: string;
	required?: boolean;
	readonly?: boolean;
	rows?: number;
}

export function Textarea(
	first?: TextareaProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<TextareaProps>(first, second);
	const { class: className, ...rest } = props;

	return textareaTag({
		"data-slot": "textarea",
		class: cnReactive(
			"flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
			className,
		),
		...rest,
	}) as HTMLElement;
}
