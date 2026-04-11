import {
	createId,
	div,
	effect,
	type NodeChildren,
	registerDisposer,
	span,
} from "sibujs";
import { bindControlled } from "../lib/controlled";
import { cn, cnReactive } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toNodes,
} from "./types";

export interface TooltipProps extends BaseProps {
	delayDuration?: number;
	/** Open state. Accepts a literal OR a reactive getter. */
	open?: boolean | (() => boolean);
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export interface TooltipProviderProps extends BaseProps {
	delayDuration?: number;
}

export function TooltipProvider(
	first?: TooltipProviderProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<TooltipProviderProps>(first, second);
	const { nodes, ...rest } = props;
	return div({
		"data-slot": "tooltip-provider",
		style: "display: contents",
		nodes,
		...rest,
	}) as HTMLElement;
}

interface TooltipContext {
	isOpen: () => boolean;
	contentId: string;
	open: () => void;
	close: () => void;
}

export function Tooltip(
	first?: TooltipProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<TooltipProps>(first, second);
	const {
		delayDuration = 0,
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		nodes,
		...rest
	} = props;

	// Use the shared helper so reactive `open` getters are supported
	// safely. Without this, `signal(controlledOpen ?? defaultOpen)` would
	// store a getter function as the literal signal value.
	const [isOpen, setIsOpen, isControlled] = bindControlled<boolean>(
		controlledOpen,
		defaultOpen,
	);
	let delayTimer: ReturnType<typeof setTimeout> | null = null;

	// Stable id so the trigger's `aria-describedby` can point at the content
	const contentId = createId("tooltip-content");

	const el = div({
		"data-slot": "tooltip",
		style: "position: relative; display: inline-block",
		nodes,
		...rest,
	}) as HTMLElement;

	const ctx: TooltipContext = {
		isOpen,
		contentId,
		open: () => {
			if (delayTimer) {
				clearTimeout(delayTimer);
				delayTimer = null;
			}
			if (delayDuration > 0) {
				delayTimer = setTimeout(() => {
					delayTimer = null;
					if (!isControlled) setIsOpen(true);
					onOpenChange?.(true);
				}, delayDuration);
			} else {
				if (!isControlled) setIsOpen(true);
				onOpenChange?.(true);
			}
		},
		close: () => {
			if (delayTimer) {
				clearTimeout(delayTimer);
				delayTimer = null;
			}
			if (!isControlled) setIsOpen(false);
			onOpenChange?.(false);
		},
	};
	(el as ElementWithContext).__tooltip = ctx;

	// Clean up the open-delay timer if the tooltip is unmounted mid-delay
	registerDisposer(el, () => {
		if (delayTimer) {
			clearTimeout(delayTimer);
			delayTimer = null;
		}
	});

	return el as HTMLElement;
}

export function TooltipTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, ...rest } = props;

	const el = span({
		"data-slot": "tooltip-trigger",
		tabindex: "0",
		nodes,
		...rest,
	}) as HTMLElement;

	const findCtx = (): TooltipContext | undefined =>
		(el.closest("[data-slot=tooltip]") as ElementWithContext | null)
			?.__tooltip as TooltipContext | undefined;

	// `pointerenter` / `pointerleave` cover mouse AND touch in one API —
	// previously only mouse events were wired, so mobile users could not
	// see tooltips. Focus/blur remain as the keyboard path.
	const onEnter = () => findCtx()?.open();
	const onLeave = () => findCtx()?.close();
	const onEscape = (ev: KeyboardEvent) => {
		if (ev.key === "Escape") findCtx()?.close();
	};

	el.addEventListener("pointerenter", onEnter);
	el.addEventListener("pointerleave", onLeave);
	el.addEventListener("focus", onEnter);
	el.addEventListener("blur", onLeave);
	el.addEventListener("keydown", onEscape);

	// Wire aria-describedby once the trigger joins the DOM tree so the
	// screen reader can read the tooltip content when the trigger focuses.
	queueMicrotask(() => {
		const ctx = findCtx();
		if (ctx) el.setAttribute("aria-describedby", ctx.contentId);
	});

	return el;
}

export interface TooltipContentProps extends BaseProps {
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
}

// Arrow positioning classes per side
const arrowSideClasses: Record<string, string> = {
	top: "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45",
	bottom: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45",
	left: "absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45",
	right: "absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45",
};

export function TooltipContent(
	first?: TooltipContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<TooltipContentProps>(first, second);
	const {
		class: className,
		side = "top",
		sideOffset = 4,
		nodes,
		...rest
	} = props;

	const arrow = div({
		"data-slot": "tooltip-arrow",
		class: cn(
			"z-50 size-2.5 rounded-[2px] bg-foreground fill-foreground",
			arrowSideClasses[side],
		),
	}) as HTMLElement;

	const content = div({
		"data-slot": "tooltip-content",
		"data-side": side,
		// Seed `data-state="closed"` at creation so the closed-state CSS
		// applies on the very first paint instead of one microtask later
		// (prevents a FOUC flash of the tooltip when the parent mounts).
		"data-state": "closed",
		role: "tooltip",
		class: cnReactive(
			"z-50 w-max whitespace-nowrap animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
			className,
		),
		style: {
			position: "absolute",
			// Initial display matches data-state="closed"
			display: "none",
			pointerEvents: "none",
			...(side === "top"
				? {
						bottom: `calc(100% + ${sideOffset}px)`,
						left: "50%",
						transform: "translateX(-50%)",
					}
				: {}),
			...(side === "bottom"
				? {
						top: `calc(100% + ${sideOffset}px)`,
						left: "50%",
						transform: "translateX(-50%)",
					}
				: {}),
			...(side === "left"
				? {
						right: `calc(100% + ${sideOffset}px)`,
						top: "50%",
						transform: "translateY(-50%)",
					}
				: {}),
			...(side === "right"
				? {
						left: `calc(100% + ${sideOffset}px)`,
						top: "50%",
						transform: "translateY(-50%)",
					}
				: {}),
		} as Record<string, string>,
		nodes: [...toNodes(nodes), arrow],
		...rest,
	}) as HTMLElement;

	queueMicrotask(() => {
		const tooltipEl = content.closest("[data-slot=tooltip]");
		if (!tooltipEl) return;
		const ctx = (tooltipEl as ElementWithContext).__tooltip as
			| TooltipContext
			| undefined;
		if (!ctx) return;

		// Adopt the stable id from the parent so the trigger's
		// aria-describedby resolves to this element
		content.id = ctx.contentId;

		let closeTimer: ReturnType<typeof setTimeout> | undefined;

		const teardownEffect = effect(() => {
			const open = ctx.isOpen();
			if (open) {
				if (closeTimer) {
					clearTimeout(closeTimer);
					closeTimer = undefined;
				}
				content.style.display = "";
				content.setAttribute("data-state", "open");
			} else {
				content.setAttribute("data-state", "closed");
				closeTimer = setTimeout(() => {
					content.style.display = "none";
					closeTimer = undefined;
				}, 150);
			}
		});

		// Unmount-safe cleanup: the effect and pending timer both go away
		// when the tooltip content is removed from the DOM, so stale
		// signals never try to poke a detached element.
		registerDisposer(content, () => {
			if (closeTimer) clearTimeout(closeTimer);
			teardownEffect();
		});
	});

	return content as HTMLElement;
}
