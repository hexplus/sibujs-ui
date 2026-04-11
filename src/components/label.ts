import { label as labelTag, type NodeChildren } from "sibujs";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export interface LabelProps extends BaseProps {
	/** The id of the form element this label is associated with. */
	for?: string;
	/** Alias for `for` — accepted for compatibility with existing call sites. */
	htmlFor?: string;
}

export function Label(
	first?: LabelProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<LabelProps>(first, second);
	const { class: className, for: forAttr, htmlFor, nodes, ...rest } = props;

	return labelTag({
		"data-slot": "label",
		for: forAttr ?? htmlFor,
		class: cnReactive(
			"flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}
