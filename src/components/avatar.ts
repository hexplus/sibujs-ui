import { div, img, type NodeChildren, span } from "sibujs";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export interface AvatarProps extends BaseProps {
	size?: "default" | "sm" | "lg";
}

export function Avatar(
	first?: AvatarProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<AvatarProps>(first, second);
	const { class: className, size = "default", nodes, ...rest } = props;
	return div({
		"data-slot": "avatar",
		"data-size": size,
		class: cnReactive(
			"group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface AvatarImageProps extends BaseProps {
	src?: string;
	alt?: string;
}

export function AvatarImage(
	first?: AvatarImageProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<AvatarImageProps>(first, second);
	const { class: className, src, alt, ...rest } = props;

	const imgEl = img({
		"data-slot": "avatar-image",
		src,
		alt,
		class: cnReactive("aspect-square size-full", className),
		...rest,
	}) as HTMLImageElement;

	// On error, hide the image so fallback shows
	imgEl.addEventListener("error", () => {
		imgEl.style.display = "none";
	});

	return imgEl as unknown as HTMLElement;
}

export function AvatarFallback(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "avatar-fallback",
		class: cnReactive(
			"flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function AvatarBadge(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return span({
		"data-slot": "avatar-badge",
		class: cnReactive(
			"absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none",
			"group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
			"group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
			"group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function AvatarGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "avatar-group",
		class: cnReactive(
			"group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function AvatarGroupCount(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "avatar-group-count",
		class: cnReactive(
			"relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}
