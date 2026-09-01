import type { NodeChild, NodeChildren } from "sibujs";

// Dev-mode check, mirroring sibujs core's tree-shakeable `__SIBU_DEV__`
// convention. Off in production browsers, on in test/dev Node.
const _isDev: boolean =
	typeof (globalThis as { __SIBU_DEV__?: boolean }).__SIBU_DEV__ !== "undefined"
		? !!(globalThis as { __SIBU_DEV__?: boolean }).__SIBU_DEV__
		: typeof process !== "undefined" && process.env?.NODE_ENV !== "production";

// Heuristic mirror of sibujs core's tagFactory check: does a lone string look
// like a CSS class list rather than text? Used ONLY to warn — behavior is
// unchanged. Conservative: prose ("New") never trips it; only Tailwind-shaped
// utility strings ("h-6 w-48", "space-y-6") with a class-indicator char do.
function looksLikeClassList(s: string): boolean {
	const t = s.trim();
	if (!t) return false;
	const tokens = t.split(/\s+/);
	let sawClassish = false;
	for (const tok of tokens) {
		if (!/^-?[A-Za-z_][A-Za-z0-9_:/.-]*$/.test(tok)) return false;
		if (/[-:/0-9]/.test(tok)) sawClassish = true;
	}
	return sawClassish;
}

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
	if (typeof first === "string") {
		// Lone string → text child (unchanged). Warn in dev if it looks like a
		// misplaced class list — e.g. Skeleton("h-6 w-48") rendering the class
		// names as visible text instead of sizing the placeholder.
		if (_isDev && looksLikeClassList(first)) {
			console.warn(
				`[sibujs-ui] lone string "${first}" looks like a class list but is being rendered as TEXT content. ` +
					`For classes, pass { class: "${first}" }; to set classes AND children use ("${first}", children).`,
			);
		}
		return { nodes: first } as P;
	}
	if (typeof first === "number") return { nodes: first } as P;
	if (typeof first === "boolean") return {} as P;
	if (typeof first === "function") return { nodes: first } as P;
	if (first instanceof Node) return { nodes: first } as P;
	if (Array.isArray(first)) return { nodes: first } as P;
	return first as P;
}

/**
 * Normalize `NodeChildren` into a flat `NodeChild[]` that can be handed
 * straight to a sibujs tag factory — **preserving reactive child getters**.
 *
 * This is the primitive components should use whenever they need to inspect or
 * extend caller-supplied children (prepending an icon, appending a close
 * button, …) before passing them on.
 *
 * Behaviour, matching sibujs `NodeChild` semantics:
 *  - functions are passed through untouched, so the tag factory binds them
 *    reactively and disposes the binding with the element;
 *  - DOM nodes are passed through;
 *  - strings and numbers are passed through (the factory makes the text node);
 *  - arrays — including nested arrays — are flattened, preserving order;
 *  - `null`, `undefined` and booleans are dropped, as sibujs ignores them.
 *
 * Nothing is stringified: an array is never turned into `"a,b"` and a function
 * is never turned into its source text.
 *
 * Note the deliberate asymmetry with {@link toNodes}: this returns `NodeChild[]`
 * rather than `Node[]` precisely because a reactive child has no `Node`
 * representation until the factory binds it. Materializing one here — via a
 * placeholder plus a manual `effect()` — is what previously leaked
 * subscriptions and duplicated content.
 */
export function toChildren(nodes: unknown): NodeChild[] {
	const out: NodeChild[] = [];

	const walk = (value: unknown): void => {
		if (value === null || value === undefined) return;
		if (typeof value === "boolean") return;
		if (Array.isArray(value)) {
			for (const item of value) walk(item);
			return;
		}
		// Functions and Nodes pass through as-is; strings/numbers are valid
		// NodeChild values that the tag factory turns into text.
		out.push(value as NodeChild);
	};

	walk(nodes);
	return out;
}

/**
 * Convert arbitrary node content to a flat array of DOM Nodes.
 *
 * @deprecated Prefer {@link toChildren}. This helper cannot represent a
 * reactive child — a `() => NodeChild` getter has no `Node` form — so it drops
 * function children entirely. Its signature is kept unchanged for backward
 * compatibility with any external caller that relies on a `Node[]` result.
 */
export function toNodes(nodes: unknown): Node[] {
	if (Array.isArray(nodes)) {
		const out: Node[] = [];
		for (const n of nodes) {
			if (n instanceof Node) out.push(n);
			else if (typeof n === "function") warnDroppedReactiveChild();
			else if (n != null && typeof n !== "boolean")
				out.push(document.createTextNode(String(n)));
		}
		return out;
	}
	if (nodes instanceof Node) return [nodes];
	if (typeof nodes === "function") {
		warnDroppedReactiveChild();
		return [];
	}
	if (nodes != null && typeof nodes !== "boolean")
		return [document.createTextNode(String(nodes))];
	return [];
}

function warnDroppedReactiveChild(): void {
	if (!_isDev) return;
	console.warn(
		"[sibujs-ui] toNodes() dropped a reactive (function) child because it can only return DOM nodes. " +
			"Use toChildren() and pass the result to a tag factory to keep reactive children.",
	);
}

/**
 * Helper to access internal component context stored on DOM elements.
 * Used by compound components (Tabs, Accordion, Dialog, etc.) to share
 * state between parent and child components via DOM traversal.
 */
// biome-ignore lint/suspicious/noExplicitAny: internal context bridge between DOM elements — type varies per component
export type ElementWithContext = HTMLElement & Record<string, any>;
