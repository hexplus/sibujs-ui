import { div, type NodeChildren } from "sibujs";
import { type BaseProps, normalizeArgs } from "./types";

export interface DirectionProviderProps extends BaseProps {
	dir?: "ltr" | "rtl";
	direction?: "ltr" | "rtl";
}

export function DirectionProvider(
	first?: DirectionProviderProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DirectionProviderProps>(first, second);
	const { dir = "ltr", direction, nodes, ...rest } = props;
	const resolvedDir = direction ?? dir;
	return div({
		"data-slot": "direction-provider",
		dir: resolvedDir,
		style: "display: contents",
		nodes,
		...rest,
	}) as HTMLElement;
}

/**
 * Reads the direction from the closest ancestor with a [dir] attribute.
 * Returns "ltr" if no ancestor sets a direction.
 */
export function useDirection(el: HTMLElement): "ltr" | "rtl" {
	const closest = el.closest("[dir]");
	if (closest) {
		const dir = closest.getAttribute("dir");
		if (dir === "rtl" || dir === "ltr") return dir;
	}
	return "ltr";
}
