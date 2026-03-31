import { div, type NodeChildren } from "sibujs";
import { GripVerticalIcon } from "../icons";
import { cnReactive } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

// ── Types ────────────────────────────────────────────────────────────────────

interface PanelContext {
	defaultSize: number;
	minSize: number;
	maxSize: number;
	collapsible: boolean;
	collapsedSize: number;
	onResize?: (size: number) => void;
	onCollapse?: () => void;
	onExpand?: () => void;
}

interface GroupContext {
	direction: "horizontal" | "vertical";
	onLayout?: (sizes: number[]) => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Map group direction → separator aria-orientation.
 * Horizontal group (side-by-side) → vertical separator.
 * Vertical group (stacked) → horizontal separator.
 */
function separatorOrientation(
	groupDir: "horizontal" | "vertical",
): "horizontal" | "vertical" {
	return groupDir === "horizontal" ? "vertical" : "horizontal";
}

/** Collect direct-child panels inside a group element. */
function getPanels(groupEl: Element): HTMLElement[] {
	return Array.from(
		groupEl.querySelectorAll(":scope > [data-slot=resizable-panel]"),
	) as HTMLElement[];
}

/**
 * Read a panel's logical size (percentage of available space).
 * Internally stored as flex-grow; we normalise to percentages on read.
 */
function readSize(panel: HTMLElement): number {
	return parseFloat(panel.style.flexGrow) || 0;
}

/** Write a logical size onto a panel (clamped to min/max). */
function writeSize(panel: HTMLElement, size: number): void {
	const ctx: PanelContext | undefined = (panel as ElementWithContext)
		.__panelCtx;
	const clamped = Math.max(
		ctx?.minSize ?? 0,
		Math.min(ctx?.maxSize ?? 100, size),
	);
	panel.style.flexGrow = String(clamped);
	ctx?.onResize?.(clamped);
}

/**
 * Normalise all panel sizes so they sum to exactly 100.
 * Called once on mount so flex-grow values become percentages.
 */
function normaliseSizes(groupEl: Element): void {
	const panels = getPanels(groupEl);
	const sizes = panels.map((p) => {
		const ctx: PanelContext | undefined = (p as ElementWithContext).__panelCtx;
		return readSize(p) || ctx?.defaultSize || 0;
	});
	const total = sizes.reduce((a, b) => a + b, 0);
	if (total <= 0) return;
	const factor = 100 / total;
	for (let i = 0; i < panels.length; i++) {
		writeSize(panels[i], sizes[i] * factor);
	}
	fireLayout(groupEl);
}

/** Fire the onLayout callback with current panel sizes. */
function fireLayout(groupEl: Element): void {
	const ctx: GroupContext | undefined = (groupEl as ElementWithContext)
		.__groupCtx;
	ctx?.onLayout?.(getPanels(groupEl).map(readSize));
}

/** Resize two adjacent panels by a delta (in percentage points). */
function resizePair(
	prev: HTMLElement,
	next: HTMLElement,
	deltaPct: number,
	groupEl: Element,
): void {
	const prevCtx: PanelContext | undefined = (prev as ElementWithContext)
		.__panelCtx;
	const nextCtx: PanelContext | undefined = (next as ElementWithContext)
		.__panelCtx;

	const prevSize = readSize(prev);
	const nextSize = readSize(next);
	const total = prevSize + nextSize;

	let newPrev = prevSize + deltaPct;
	let newNext = nextSize - deltaPct;

	const prevMin = prevCtx?.minSize ?? 0;
	const prevMax = prevCtx?.maxSize ?? 100;
	const nextMin = nextCtx?.minSize ?? 0;
	const nextMax = nextCtx?.maxSize ?? 100;

	if (newPrev < prevMin) {
		newPrev = prevMin;
		newNext = total - newPrev;
	}
	if (newPrev > prevMax) {
		newPrev = prevMax;
		newNext = total - newPrev;
	}
	if (newNext < nextMin) {
		newNext = nextMin;
		newPrev = total - newNext;
	}
	if (newNext > nextMax) {
		newNext = nextMax;
		newPrev = total - newNext;
	}

	writeSize(prev, newPrev);
	writeSize(next, newNext);

	// Collapse / expand detection
	if (prevCtx?.collapsible) {
		const t = prevCtx.collapsedSize ?? 0;
		if (prevSize > t && newPrev <= t) prevCtx.onCollapse?.();
		if (prevSize <= t && newPrev > t) prevCtx.onExpand?.();
	}
	if (nextCtx?.collapsible) {
		const t = nextCtx.collapsedSize ?? 0;
		if (nextSize > t && newNext <= t) nextCtx.onCollapse?.();
		if (nextSize <= t && newNext > t) nextCtx.onExpand?.();
	}

	fireLayout(groupEl);
}

/** Find previous and next panel siblings relative to a handle. */
function findAdjacentPanels(
	handleEl: HTMLElement,
	groupEl: Element,
): [HTMLElement | null, HTMLElement | null] {
	const siblings = Array.from(groupEl.children) as HTMLElement[];
	const idx = siblings.indexOf(handleEl);
	let prev: HTMLElement | null = null;
	let next: HTMLElement | null = null;
	for (let i = idx - 1; i >= 0; i--) {
		if (siblings[i].getAttribute("data-slot") === "resizable-panel") {
			prev = siblings[i];
			break;
		}
	}
	for (let i = idx + 1; i < siblings.length; i++) {
		if (siblings[i].getAttribute("data-slot") === "resizable-panel") {
			next = siblings[i];
			break;
		}
	}
	return [prev, next];
}

// ── ResizablePanelGroup ──────────────────────────────────────────────────────

export interface ResizablePanelGroupProps extends BaseProps {
	direction?: "horizontal" | "vertical";
	onLayout?: (sizes: number[]) => void;
	autoSaveId?: string;
}

export function ResizablePanelGroup(
	first?: ResizablePanelGroupProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ResizablePanelGroupProps>(first, second);
	const {
		class: className,
		direction = "horizontal",
		onLayout,
		autoSaveId,
		nodes,
		...rest
	} = props;

	const el = div({
		"data-slot": "resizable-panel-group",
		class: cnReactive(
			"flex h-full w-full aria-[orientation=vertical]:flex-col",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;

	el.setAttribute(
		"aria-orientation",
		direction === "vertical" ? "vertical" : "horizontal",
	);

	const groupCtx: GroupContext = { direction, onLayout };
	(el as ElementWithContext).__groupCtx = groupCtx;

	// Once children are mounted, normalise sizes & restore saved layout
	queueMicrotask(() => {
		if (autoSaveId) {
			try {
				const saved = localStorage.getItem(`resizable-panels:${autoSaveId}`);
				if (saved) {
					const sizes = JSON.parse(saved) as number[];
					const panels = getPanels(el);
					if (sizes.length === panels.length) {
						for (let i = 0; i < panels.length; i++) {
							writeSize(panels[i], sizes[i]);
						}
						fireLayout(el);
						return;
					}
				}
			} catch {
				/* ignore */
			}
		}
		normaliseSizes(el);
	});

	// Persist layout changes
	if (autoSaveId) {
		const orig = onLayout;
		groupCtx.onLayout = (sizes: number[]) => {
			orig?.(sizes);
			try {
				localStorage.setItem(
					`resizable-panels:${autoSaveId}`,
					JSON.stringify(sizes),
				);
			} catch {
				/* ignore */
			}
		};
	}

	return el;
}

// ── ResizablePanel ───────────────────────────────────────────────────────────

export interface ResizablePanelProps extends BaseProps {
	defaultSize?: number;
	minSize?: number;
	maxSize?: number;
	collapsible?: boolean;
	collapsedSize?: number;
	onResize?: (size: number) => void;
	onCollapse?: () => void;
	onExpand?: () => void;
}

export function ResizablePanel(
	first?: ResizablePanelProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ResizablePanelProps>(first, second);
	const {
		class: className,
		defaultSize = 50,
		minSize = 0,
		maxSize = 100,
		collapsible = false,
		collapsedSize = 0,
		onResize,
		onCollapse,
		onExpand,
		nodes,
		...rest
	} = props;

	// flex-grow distributes remaining space (after handles take their
	// natural width) proportionally among panels. flex-basis: 0 ensures
	// only flex-grow matters. flex-shrink: 1 allows panels to yield
	// space when the sum slightly exceeds the container.
	const el = div({
		"data-slot": "resizable-panel",
		class: cnReactive(className),
		style: `flex-grow:${defaultSize};flex-shrink:1;flex-basis:0%;overflow:hidden`,
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__panelCtx = {
		defaultSize,
		minSize,
		maxSize,
		collapsible,
		collapsedSize,
		onResize,
		onCollapse,
		onExpand,
	} satisfies PanelContext;

	return el;
}

// ── ResizableHandle ──────────────────────────────────────────────────────────

export interface ResizableHandleProps extends BaseProps {
	withHandle?: boolean;
	disabled?: boolean;
	onDragging?: (isDragging: boolean) => void;
}

export function ResizableHandle(
	first?: ResizableHandleProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ResizableHandleProps>(first, second);
	const {
		class: className,
		withHandle = false,
		disabled,
		onDragging,
		...rest
	} = props;

	const handleNodes: Node[] = [];
	if (withHandle) {
		handleNodes.push(
			div({
				class:
					"z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border",
				nodes: [GripVerticalIcon({ class: "size-2.5" })],
			}) as Node,
		);
	}

	const el = div({
		"data-slot": "resizable-handle",
		role: "separator",
		tabindex: disabled ? undefined : "0",
		class: cnReactive(
			"relative flex w-px cursor-col-resize items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:cursor-row-resize aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
			className,
		),
		nodes: handleNodes.length ? handleNodes : undefined,
		...rest,
	}) as HTMLElement;

	// Set correct aria-orientation once mounted
	queueMicrotask(() => {
		const groupEl = el.closest("[data-slot=resizable-panel-group]");
		if (groupEl) {
			const ctx: GroupContext | undefined = (groupEl as ElementWithContext)
				.__groupCtx;
			el.setAttribute(
				"aria-orientation",
				separatorOrientation(ctx?.direction ?? "horizontal"),
			);
		}
	});

	if (disabled) return el;

	// ── Pointer drag ──────────────────────────────────────────────────────

	let isDragging = false;
	let startPos = 0;
	let prevPanel: HTMLElement | null = null;
	let nextPanel: HTMLElement | null = null;
	let containerPx = 0;
	let prevStart = 0;
	let nextStart = 0;

	const onPointerDown = (ev: PointerEvent) => {
		const groupEl = el.closest("[data-slot=resizable-panel-group]");
		if (!groupEl) return;

		const ctx: GroupContext | undefined = (groupEl as ElementWithContext)
			.__groupCtx;
		const isVertical = ctx?.direction === "vertical";

		[prevPanel, nextPanel] = findAdjacentPanels(el, groupEl);
		if (!prevPanel || !nextPanel) return;

		isDragging = true;
		onDragging?.(true);
		startPos = isVertical ? ev.clientY : ev.clientX;
		containerPx = isVertical
			? (groupEl as HTMLElement).offsetHeight
			: (groupEl as HTMLElement).offsetWidth;
		prevStart = readSize(prevPanel);
		nextStart = readSize(nextPanel);

		el.setPointerCapture(ev.pointerId);
		ev.preventDefault();
	};

	const onPointerMove = (ev: PointerEvent) => {
		if (!isDragging || !prevPanel || !nextPanel || containerPx === 0) return;

		const groupEl = el.closest("[data-slot=resizable-panel-group]");
		if (!groupEl) return;

		const ctx: GroupContext | undefined = (groupEl as ElementWithContext)
			.__groupCtx;
		const isVertical = ctx?.direction === "vertical";
		const currentPos = isVertical ? ev.clientY : ev.clientX;
		const deltaPx = currentPos - startPos;

		// Convert pixel delta to percentage-point delta.
		// The total flex-grow pool is (prevStart + nextStart); the pixel
		// space they share is proportional to that pool vs total 100.
		const pairPct = prevStart + nextStart;
		const deltaPct = (deltaPx / containerPx) * pairPct;

		const prevCtx: PanelContext | undefined = (prevPanel as ElementWithContext)
			.__panelCtx;
		const nextCtx: PanelContext | undefined = (nextPanel as ElementWithContext)
			.__panelCtx;

		let newPrev = prevStart + deltaPct;
		let newNext = nextStart - deltaPct;

		// Clamp
		const prevMin = prevCtx?.minSize ?? 0;
		const prevMax = prevCtx?.maxSize ?? 100;
		const nextMin = nextCtx?.minSize ?? 0;
		const nextMax = nextCtx?.maxSize ?? 100;

		if (newPrev < prevMin) {
			newPrev = prevMin;
			newNext = pairPct - newPrev;
		}
		if (newPrev > prevMax) {
			newPrev = prevMax;
			newNext = pairPct - newPrev;
		}
		if (newNext < nextMin) {
			newNext = nextMin;
			newPrev = pairPct - newNext;
		}
		if (newNext > nextMax) {
			newNext = nextMax;
			newPrev = pairPct - newNext;
		}

		const prevWas = readSize(prevPanel);
		const nextWas = readSize(nextPanel);

		writeSize(prevPanel, newPrev);
		writeSize(nextPanel, newNext);

		// Collapse / expand
		if (prevCtx?.collapsible) {
			const t = prevCtx.collapsedSize ?? 0;
			if (prevWas > t && newPrev <= t) prevCtx.onCollapse?.();
			if (prevWas <= t && newPrev > t) prevCtx.onExpand?.();
		}
		if (nextCtx?.collapsible) {
			const t = nextCtx.collapsedSize ?? 0;
			if (nextWas > t && newNext <= t) nextCtx.onCollapse?.();
			if (nextWas <= t && newNext > t) nextCtx.onExpand?.();
		}

		fireLayout(groupEl);
	};

	const onPointerUp = (ev: PointerEvent) => {
		if (!isDragging) return;
		isDragging = false;
		onDragging?.(false);
		el.releasePointerCapture(ev.pointerId);
		prevPanel = null;
		nextPanel = null;
	};

	el.addEventListener("pointerdown", onPointerDown as EventListener);
	el.addEventListener("pointermove", onPointerMove as EventListener);
	el.addEventListener("pointerup", onPointerUp as EventListener);

	// ── Keyboard resize ───────────────────────────────────────────────────

	const STEP = 5;

	el.addEventListener("keydown", ((ev: KeyboardEvent) => {
		const groupEl = el.closest("[data-slot=resizable-panel-group]");
		if (!groupEl) return;

		const ctx: GroupContext | undefined = (groupEl as ElementWithContext)
			.__groupCtx;
		const isVertical = ctx?.direction === "vertical";

		let delta = 0;
		if (
			(!isVertical && ev.key === "ArrowLeft") ||
			(isVertical && ev.key === "ArrowUp")
		)
			delta = -STEP;
		else if (
			(!isVertical && ev.key === "ArrowRight") ||
			(isVertical && ev.key === "ArrowDown")
		)
			delta = STEP;
		else if (ev.key === "Home") delta = -100;
		else if (ev.key === "End") delta = 100;
		else if (ev.key === "Enter") {
			const [p] = findAdjacentPanels(el, groupEl);
			if (p) {
				const pc: PanelContext | undefined = (p as ElementWithContext)
					.__panelCtx;
				if (pc?.collapsible) {
					const s = readSize(p);
					const t = pc.collapsedSize ?? 0;
					delta = s <= t ? pc.defaultSize - s : t - s;
				}
			}
		}

		if (delta === 0) return;
		ev.preventDefault();

		const [p, n] = findAdjacentPanels(el, groupEl);
		if (p && n) resizePair(p, n, delta, groupEl);
	}) as EventListener);

	// ── Double-click to reset ─────────────────────────────────────────────

	el.addEventListener("dblclick", () => {
		const groupEl = el.closest("[data-slot=resizable-panel-group]");
		if (!groupEl) return;
		const [p, n] = findAdjacentPanels(el, groupEl);
		if (!p || !n) return;

		const pc: PanelContext | undefined = (p as ElementWithContext).__panelCtx;
		const nc: PanelContext | undefined = (n as ElementWithContext).__panelCtx;
		const total = readSize(p) + readSize(n);
		const pd = pc?.defaultSize ?? 50;
		const nd = nc?.defaultSize ?? 50;
		const dt = pd + nd;

		writeSize(p, (pd / dt) * total);
		writeSize(n, (nd / dt) * total);
		fireLayout(groupEl);
	});

	return el;
}
