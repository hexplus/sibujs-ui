/**
 * Shared Escape coordination for every dismissable overlay (Dialog, Sheet,
 * Drawer, DropdownMenu, Popover, Select, ContextMenu, Menubar,
 * NavigationMenu).
 *
 * ## Why this exists
 *
 * Each overlay used to attach its own `document` `keydown` listener while open
 * and close itself on Escape. With overlays nested — a DropdownMenu inside a
 * Popover inside a Dialog — every one of those listeners received the same
 * key press, so a single Escape closed the whole stack. `preventDefault()`
 * alone could not fix it: document listeners run in registration order, so
 * the outer overlay usually saw the event before the inner one had a chance
 * to mark it handled.
 *
 * ## Semantics
 *
 *  - Open overlays register a layer; the most recently registered layer is on
 *    top. Re-registering after a close puts the overlay back on top.
 *  - One `document` listener serves every layer. It is attached when the first
 *    layer registers and removed when the last one leaves.
 *  - An Escape dismisses exactly one layer — the topmost — and is marked with
 *    `preventDefault()`. With no layer registered the event is left untouched.
 *  - An Escape that already arrives with `defaultPrevented` was consumed by an
 *    element-level handler closer to the focus (Select's trigger, Combobox's
 *    input), so no layer is dismissed for it.
 *
 * Safe to import without a DOM (SSR): nothing touches `document` at module
 * scope, and registration is a no-op when there is no `document`.
 */

interface EscapeLayer {
	onEscape: () => void;
}

const layers: EscapeLayer[] = [];
let listening = false;

function handleKeydown(ev: KeyboardEvent): void {
	if (ev.key !== "Escape" || ev.defaultPrevented) return;
	const top = layers[layers.length - 1];
	if (!top) return;
	ev.preventDefault();
	top.onEscape();
}

function listen(): void {
	if (listening || typeof document === "undefined") return;
	listening = true;
	document.addEventListener("keydown", handleKeydown);
}

function unlisten(): void {
	if (!listening) return;
	listening = false;
	document.removeEventListener("keydown", handleKeydown);
}

/**
 * Register an open overlay as the topmost Escape layer. `onEscape` runs when
 * Escape is pressed while this layer is on top.
 *
 * Returns the handle that removes this exact registration. It is idempotent,
 * so a close and a disposal racing each other cannot remove another layer.
 */
export function registerEscapeLayer(onEscape: () => void): () => void {
	if (typeof document === "undefined") return () => {};
	const entry: EscapeLayer = { onEscape };
	layers.push(entry);
	listen();
	return () => {
		const idx = layers.indexOf(entry);
		if (idx === -1) return;
		layers.splice(idx, 1);
		if (layers.length === 0) unlisten();
	};
}

/**
 * A single overlay's handle on the Escape stack, for components that open and
 * close repeatedly.
 *
 * `activate()` and `deactivate()` are idempotent with respect to *this*
 * handle: activating an already active layer keeps its place in the stack
 * (repeated effect runs while open never duplicate it), and deactivating an
 * inactive one does nothing. Activating after a deactivation registers anew,
 * so a reopened overlay is on top again.
 */
export interface DismissableLayer {
	activate(): void;
	deactivate(): void;
	/** Whether this handle is currently registered. */
	active(): boolean;
}

/** Create an independent handle whose Escape runs `onEscape`. */
export function createDismissableLayer(onEscape: () => void): DismissableLayer {
	let unregister: (() => void) | undefined;
	return {
		activate() {
			if (!unregister) unregister = registerEscapeLayer(onEscape);
		},
		deactivate() {
			unregister?.();
			unregister = undefined;
		},
		active() {
			return unregister !== undefined;
		},
	};
}

/** Number of registered layers. Exposed for tests and debugging. */
export function escapeLayerCount(): number {
	return layers.length;
}

/**
 * Test-only reset. Drops every registered layer and the shared listener, so
 * one test's leaked layer cannot swallow the next test's Escape.
 */
export function __resetEscapeLayers(): void {
	layers.length = 0;
	unlisten();
}
