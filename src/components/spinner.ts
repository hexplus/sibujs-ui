import type { NodeChildren } from "sibujs";
import { Loader2Icon } from "../icons";
import { cn } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export function Spinner(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className } = props;

	const svg = Loader2Icon({
		class: cn("size-4 animate-spin", className as string),
	});
	svg.setAttribute("role", "status");
	svg.setAttribute("aria-label", "Loading");

	return svg as unknown as HTMLElement;
}
