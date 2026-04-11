import { a, li, type NodeChildren, nav, ol, span } from "sibujs";
import { ChevronRightIcon, MoreHorizontalIcon } from "../icons";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export function Breadcrumb(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, ...rest } = props;
	return nav({
		"aria-label": "breadcrumb",
		"data-slot": "breadcrumb",
		nodes,
		...rest,
	}) as HTMLElement;
}

export function BreadcrumbList(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return ol({
		"data-slot": "breadcrumb-list",
		class: cnReactive(
			"flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function BreadcrumbItem(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return li({
		"data-slot": "breadcrumb-item",
		class: cnReactive("inline-flex items-center gap-1.5", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface BreadcrumbLinkProps extends BaseProps {
	href?: string;
}

export function BreadcrumbLink(
	first?: BreadcrumbLinkProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BreadcrumbLinkProps>(first, second);
	const { class: className, href, nodes, ...rest } = props;
	return a({
		"data-slot": "breadcrumb-link",
		href,
		class: cnReactive("transition-colors hover:text-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function BreadcrumbPage(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return span({
		"data-slot": "breadcrumb-page",
		role: "link",
		"aria-disabled": "true",
		"aria-current": "page",
		class: cnReactive("font-normal text-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function BreadcrumbSeparator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return li(
		{
			"data-slot": "breadcrumb-separator",
			role: "presentation",
			"aria-hidden": "true",
			class: cnReactive("[&>svg]:size-3.5", className),
			...rest,
		},
		nodes ?? [ChevronRightIcon()],
	) as HTMLElement;
}

export function BreadcrumbEllipsis(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return span(
		{
			"data-slot": "breadcrumb-ellipsis",
			role: "presentation",
			"aria-hidden": "true",
			class: cnReactive("flex size-9 items-center justify-center", className),
			...rest,
		},
		[
			MoreHorizontalIcon({ class: "size-4" }),
			span(
				{
					class: "sr-only",
				},
				"More",
			),
		],
	) as HTMLElement;
}
