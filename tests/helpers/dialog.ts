import type { ElementWithContext } from "../../src/components/types";

/**
 * The `[data-slot=dialog-content]` element of the Dialog rooted at `root`,
 * wherever it currently is. While a Dialog is open its content lives in a
 * body-level portal, which is not a descendant of the root; the in-tree
 * `dialog-anchor` keeps an internal reference to it.
 */
export function dialogContent(root: Element): HTMLElement {
	const slot = "[data-slot=dialog-content]";
	const inTree = root.querySelector<HTMLElement>(slot);
	if (inTree) return inTree;
	const anchor = root.querySelector(
		"[data-slot=dialog-anchor]",
	) as ElementWithContext | null;
	const portal = anchor?.__dialogPortal as HTMLElement | undefined;
	return portal?.querySelector<HTMLElement>(slot) as HTMLElement;
}
