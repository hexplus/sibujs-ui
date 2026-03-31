import type { NodeChildren } from "sibujs";

/**
 * Base props shared by all sibujs-ui components.
 *
 * Maps to sibujs TagProps conventions:
 * - `class` for CSS classes (merged via cn())
 * - `nodes` for child content
 * - `on` for event listeners
 * - `style` for inline styles
 * - `ref` for element references
 * - arbitrary `data-*` and HTML attributes via spread
 */
export interface BaseProps {
	class?: string;
	nodes?: NodeChildren;
	on?: Record<string, (ev: Event) => void>;
	style?:
		| Record<string, string | number | (() => string | number)>
		| string
		| (() => string);
	ref?: { current: Element | null };
	[attr: string]: unknown;
}

/**
 * Normalize component arguments to support all three sibujs calling conventions:
 * 1. Props object:       Component({ class: "x", nodes: "y" })
 * 2. Positional shorthand: Component("className", children)
 * 3. Children-only:      Component("text"), Component([child]), Component(node)
 */
export function normalizeArgs<P extends BaseProps>(
	first?: P | NodeChildren,
	second?: NodeChildren,
): P {
	if (first === undefined || first === null) return {} as P;
	if (second !== undefined) return { class: first, nodes: second } as P;
	if (typeof first === "string") return { nodes: first } as P;
	if (typeof first === "number") return { nodes: first } as P;
	if (typeof first === "boolean") return {} as P;
	if (typeof first === "function") return { nodes: first } as P;
	if (first instanceof Node) return { nodes: first } as P;
	if (Array.isArray(first)) return { nodes: first } as P;
	return first as P;
}

/**
 * Convert arbitrary node content to a flat array of DOM Nodes.
 * Safely handles arrays, single nodes, strings, numbers, nulls, etc.
 */
export function toNodes(nodes: unknown): Node[] {
	if (Array.isArray(nodes)) {
		const out: Node[] = [];
		for (const n of nodes) {
			if (n instanceof Node) out.push(n);
			else if (n != null && typeof n !== "boolean" && typeof n !== "function")
				out.push(document.createTextNode(String(n)));
		}
		return out;
	}
	if (nodes instanceof Node) return [nodes];
	if (
		nodes != null &&
		typeof nodes !== "boolean" &&
		typeof nodes !== "function"
	)
		return [document.createTextNode(String(nodes))];
	return [];
}

/**
 * Helper to access internal component context stored on DOM elements.
 * Used by compound components (Tabs, Accordion, Dialog, etc.) to share
 * state between parent and child components via DOM traversal.
 */
// biome-ignore lint/suspicious/noExplicitAny: internal context bridge between DOM elements — type varies per component
export type ElementWithContext = HTMLElement & Record<string, any>;
