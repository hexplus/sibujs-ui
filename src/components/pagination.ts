import { a, li, type NodeChildren, nav, span, ul } from "sibujs";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon,
} from "../icons";
import { cn, cnReactive } from "../lib/utils";
import { buttonVariants } from "./button";
import { type BaseProps, normalizeArgs } from "./types";

export function Pagination(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return nav({
		role: "navigation",
		"aria-label": "pagination",
		"data-slot": "pagination",
		class: cnReactive("mx-auto flex w-full justify-center", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function PaginationContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return ul({
		"data-slot": "pagination-content",
		class: cnReactive("flex flex-row items-center gap-1", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function PaginationItem(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, ...rest } = props;
	return li({
		"data-slot": "pagination-item",
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface PaginationLinkProps extends BaseProps {
	isActive?: boolean;
	size?: "default" | "sm" | "lg" | "icon";
	href?: string;
}

export function PaginationLink(
	first?: PaginationLinkProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<PaginationLinkProps>(first, second);
	const {
		class: className,
		isActive,
		size = "icon",
		href,
		nodes,
		...rest
	} = props;
	return a({
		"aria-current": isActive ? "page" : undefined,
		"data-slot": "pagination-link",
		"data-active": isActive,
		href,
		class: cn(
			buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function PaginationPrevious(
	first?: PaginationLinkProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<PaginationLinkProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return PaginationLink(
		{
			"aria-label": "Go to previous page",
			size: "default",
			class: cnReactive("gap-1 px-2.5 sm:pl-2.5", className),
			...rest,
		},
		nodes ?? [
			ChevronLeftIcon(),
			span(
				{
					class: "hidden sm:block",
				},
				"Previous",
			),
		],
	);
}

export function PaginationNext(
	first?: PaginationLinkProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<PaginationLinkProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return PaginationLink(
		{
			"aria-label": "Go to next page",
			size: "default",
			class: cnReactive("gap-1 px-2.5 sm:pr-2.5", className),
			...rest,
		},
		nodes ?? [
			span(
				{
					class: "hidden sm:block",
				},
				"Next",
			),
			ChevronRightIcon(),
		],
	);
}

export function PaginationEllipsis(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return span(
		{
			"aria-hidden": "true",
			"data-slot": "pagination-ellipsis",
			class: cnReactive("flex size-9 items-center justify-center", className),
			...rest,
		},
		[
			MoreHorizontalIcon({ class: "size-4" }),
			span(
				{
					class: "sr-only",
				},
				"More pages",
			),
		],
	) as HTMLElement;
}
