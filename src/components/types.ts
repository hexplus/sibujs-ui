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
	class?: string | (() => string);
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
 * Normalize component arguments to support every sibujs calling convention:
 *
 *   1. No args:             Component()
 *   2. Props object:        Component({ class: "x", nodes: "y" })
 *   3. Props + children:    Component({ class: "x", on: {...} }, "y")
 *   4. Positional:          Component("className", children)
 *   5. Children-only:       Component("text") / Component([child]) / Component(node) / Component(() => child)
 *
 * Forms 3 and 4 both use the two-arg shape. They are disambiguated by
 * the type of `first`: an object (plain props) means form 3, a string
 * means form 4. Form 3 takes the props verbatim but uses the positional
 * second arg as the effective `nodes` (overriding any `nodes` key on
 * the props object if both are present).
 */
export function normalizeArgs<P extends BaseProps>(
	first?: P | NodeChildren,
	second?: NodeChildren,
): P {
	if (first === undefined || first === null) return {} as P;

	// Two-arg forms
	if (second !== undefined) {
		// Form 4: Component("className", children)
		if (typeof first === "string") {
			return { class: first, nodes: second } as P;
		}
		// Form 3: Component({ ...props }, children)
		// The props object is used verbatim, but the positional second
		// arg wins over any `nodes` key already on it.
		if (
			typeof first === "object" &&
			!Array.isArray(first) &&
			!(first instanceof Node) &&
			typeof first !== "function"
		) {
			return { ...(first as P), nodes: second } as P;
		}
		// Fallthrough: first is a non-string, non-object value AND second
		// was provided. That shape is meaningless — ignore second and
		// process first via the one-arg rules below.
	}

	// Single-arg forms
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
