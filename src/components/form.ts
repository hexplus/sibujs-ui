import { div, type NodeChildren, p } from "sibujs";
import { cn } from "../lib/utils";
import { Label } from "./label";
import { type BaseProps, normalizeArgs } from "./types";

/**
 * Form components provide the layout and styling for form fields.
 *
 * Unlike shadcn's React version (which wraps react-hook-form),
 * this provides framework-agnostic form field containers.
 * Use sibujs's built-in form() utility for validation and state management.
 */

export function FormItem(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "form-item",
		class: cn("grid gap-2", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface FormLabelProps extends BaseProps {
	for?: string;
	error?: boolean;
}

export function FormLabel(
	first?: FormLabelProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<FormLabelProps>(first, second);
	const { class: className, for: htmlFor, error, nodes, ...rest } = props;
	return Label({
		"data-slot": "form-label",
		"data-error": error ? "true" : undefined,
		for: htmlFor,
		class: cn("data-[error=true]:text-destructive", className),
		nodes,
		...rest,
	});
}

export function FormDescription(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return p({
		"data-slot": "form-description",
		class: cn("text-sm text-muted-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface FormMessageProps extends BaseProps {
	error?: string;
}

export function FormMessage(
	first?: FormMessageProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement | null {
	const props = normalizeArgs<FormMessageProps>(first, second);
	const { class: className, error, nodes, ...rest } = props;
	const content = error ?? nodes;
	if (!content) return null as unknown as HTMLElement;

	return p({
		"data-slot": "form-message",
		class: cn("text-sm text-destructive", className),
		nodes: content,
		...rest,
	}) as HTMLElement;
}
