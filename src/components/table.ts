import {
	caption,
	div,
	type NodeChildren,
	table as tableTag,
	tbody,
	td,
	tfoot,
	th,
	thead,
	tr,
} from "sibujs";
import { cn, cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export function Table(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	return div({
		"data-slot": "table-container",
		class: "relative w-full overflow-x-auto",
		nodes: [
			tableTag({
				"data-slot": "table",
				class: cnReactive("w-full caption-bottom text-sm", className),
				nodes,
				...rest,
			}),
		],
	}) as HTMLElement;
}

export function TableHeader(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return thead({
		"data-slot": "table-header",
		class: cnReactive("[&_tr]:border-b", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function TableBody(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return tbody({
		"data-slot": "table-body",
		class: cnReactive("[&_tr:last-child]:border-0", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function TableFooter(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return tfoot({
		"data-slot": "table-footer",
		class: cnReactive(
			"border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function TableRow(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return tr({
		"data-slot": "table-row",
		class: cnReactive(
			"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function TableHead(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return th({
		"data-slot": "table-head",
		class: cn(
			"h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function TableCell(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return td({
		"data-slot": "table-cell",
		class: cn(
			"p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function TableCaption(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return caption({
		"data-slot": "table-caption",
		class: cnReactive("mt-4 text-sm text-muted-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}
