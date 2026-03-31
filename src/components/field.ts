import { cva, type VariantProps } from "class-variance-authority";
import { div, fieldset, legend, type NodeChildren, p, span } from "sibujs";
import { cnReactive } from "../lib/utils";
import { Label } from "./label";
import { Separator } from "./separator";
import { type BaseProps, normalizeArgs } from "./types";

export function FieldSet(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return fieldset({
		"data-slot": "field-set",
		class: cnReactive(
			"flex flex-col gap-6",
			"has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface FieldLegendProps extends BaseProps {
	variant?: "legend" | "label";
}

export function FieldLegend(
	first?: FieldLegendProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<FieldLegendProps>(first, second);
	const { class: className, variant = "legend", nodes, ...rest } = props;
	return legend({
		"data-slot": "field-legend",
		"data-variant": variant,
		class: cnReactive(
			"mb-3 font-medium",
			"data-[variant=legend]:text-base",
			"data-[variant=label]:text-sm",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function FieldGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "field-group",
		class: cnReactive(
			"group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export const fieldVariants = cva(
	"group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
	{
		variants: {
			orientation: {
				vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
				horizontal: [
					"flex-row items-center",
					"[&>[data-slot=field-label]]:flex-auto",
					"has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
				],
				responsive: [
					"flex-col @md/field-group:flex-row @md/field-group:items-center [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto",
					"@md/field-group:[&>[data-slot=field-label]]:flex-auto",
					"@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
				],
			},
		},
		defaultVariants: {
			orientation: "vertical",
		},
	},
);

export interface FieldProps
	extends BaseProps,
		VariantProps<typeof fieldVariants> {
	invalid?: boolean;
	disabled?: boolean;
}

export function Field(
	first?: FieldProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<FieldProps>(first, second);
	const {
		class: className,
		orientation = "vertical",
		invalid,
		disabled,
		nodes,
		...rest
	} = props;
	return div({
		role: "group",
		"data-slot": "field",
		"data-orientation": orientation,
		"data-invalid": invalid ? "true" : undefined,
		"data-disabled": disabled ? "true" : undefined,
		class: cnReactive(fieldVariants({ orientation, className })),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function FieldContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "field-content",
		class: cnReactive(
			"group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface FieldLabelProps extends BaseProps {
	for?: string;
}

export function FieldLabel(
	first?: FieldLabelProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<FieldLabelProps>(first, second);
	const { class: className, for: htmlFor, nodes, ...rest } = props;
	return Label({
		"data-slot": "field-label",
		for: htmlFor,
		class: cnReactive(
			"group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
			"has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
			"has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
			className,
		),
		nodes,
		...rest,
	});
}

export function FieldTitle(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "field-label",
		class: cnReactive(
			"flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function FieldDescription(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return p({
		"data-slot": "field-description",
		class: cnReactive(
			"text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
			"last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
			"[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function FieldSeparator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	const hasContent =
		nodes != null && (Array.isArray(nodes) ? nodes.length > 0 : true);
	const children: Node[] = [
		Separator({ class: "absolute inset-0 top-1/2" }) as Node,
	];
	if (hasContent) {
		children.push(
			span({
				"data-slot": "field-separator-content",
				class:
					"relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
				nodes,
			}) as Node,
		);
	}
	return div({
		"data-slot": "field-separator",
		"data-content": hasContent ? "true" : undefined,
		class: cnReactive(
			"relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
			className,
		),
		nodes: children,
		...rest,
	}) as HTMLElement;
}

export interface FieldErrorProps extends BaseProps {
	errors?: Array<{ message?: string } | undefined>;
}

export function FieldError(
	first?: FieldErrorProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<FieldErrorProps>(first, second);
	const { class: className, errors, nodes, ...rest } = props;

	if (!nodes && !errors?.length) {
		return null as unknown as HTMLElement;
	}

	let content: NodeChildren = nodes;
	if (!content && errors?.length) {
		const unique = [...new Map(errors.map((e) => [e?.message, e])).values()];
		if (unique.length === 1) {
			content = unique[0]?.message;
		} else {
			const messages = unique
				.filter((e): e is { message: string } => !!e?.message)
				.map((e) => e.message);
			if (messages.length > 0) {
				const items = messages.map((msg) => {
					const li = document.createElement("li");
					li.textContent = msg;
					return li as unknown as Node;
				});
				const ul = document.createElement("ul");
				ul.className = "ml-4 flex list-disc flex-col gap-1";
				for (const li of items) ul.appendChild(li);
				content = [ul as unknown as Node] as NodeChildren;
			}
		}
	}

	return div({
		"data-slot": "field-error",
		role: "alert",
		class: cnReactive("text-sm font-normal text-destructive", className),
		nodes: content,
		...rest,
	}) as HTMLElement;
}
