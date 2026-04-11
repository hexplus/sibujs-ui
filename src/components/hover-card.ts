import {
	createId,
	div,
	effect,
	type NodeChildren,
	registerDisposer,
	span,
} from "sibujs";
import { bindControlled } from "../lib/controlled";
import { cn } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

export interface HoverCardProps extends BaseProps {
	openDelay?: number;
	closeDelay?: number;
	/** Open state. Accepts a literal OR a reactive getter. */
	open?: boolean | (() => boolean);
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

interface HoverCardContext {
	isOpen: () => boolean;
	contentId: string;
	open: () => void;
	close: () => void;
	cancelClose: () => void;
}

export function HoverCard(
	first?: HoverCardProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<HoverCardProps>(first, second);
	const {
		openDelay = 700,
		closeDelay = 300,
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		nodes,
		...rest
	} = props;

	const [isOpen, setIsOpen, isControlled] = bindControlled<boolean>(
		controlledOpen,
		defaultOpen,
	);
	let openTimer: ReturnType<typeof setTimeout> | null = null;
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	// Stable id so the trigger's aria-describedby can target the content
	const contentId = createId("hover-card-content");

	const el = div({
		"data-slot": "hover-card",
		style: "position: relative; display: inline-block",
		nodes,
		...rest,
	}) as HTMLElement;

	const ctx: HoverCardContext = {
		isOpen,
		contentId,
		open: () => {
			if (closeTimer) {
				clearTimeout(closeTimer);
				closeTimer = null;
			}
			openTimer = setTimeout(() => {
				openTimer = null;
				if (!isControlled) setIsOpen(true);
				onOpenChange?.(true);
			}, openDelay);
		},
		close: () => {
			if (openTimer) {
				clearTimeout(openTimer);
				openTimer = null;
			}
			closeTimer = setTimeout(() => {
				closeTimer = null;
				if (!isControlled) setIsOpen(false);
				onOpenChange?.(false);
			}, closeDelay);
		},
		cancelClose: () => {
			if (closeTimer) {
				clearTimeout(closeTimer);
				closeTimer = null;
			}
		},
	};
	(el as ElementWithContext).__hoverCard = ctx;

	// Pending open/close timers need to be cleared on unmount so the
	// callbacks do not fire against a detached element.
	registerDisposer(el, () => {
		if (openTimer) clearTimeout(openTimer);
		if (closeTimer) clearTimeout(closeTimer);
		openTimer = null;
		closeTimer = null;
	});

	return el as HTMLElement;
}

export function HoverCardTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;

	const findCtx = (el: HTMLElement): HoverCardContext | undefined =>
		(el.closest("[data-slot=hover-card]") as ElementWithContext | null)
			?.__hoverCard as HoverCardContext | undefined;

	const el = span({
		"data-slot": "hover-card-trigger",
		tabindex: "0",
		nodes,
		on: {
			...on,
			// `pointerenter` / `pointerleave` give us touch + mouse in one
			// listener — the previous mouse-only wiring meant tap devices
			// never surfaced the hover card.
			pointerenter: (ev: Event) => {
				findCtx(ev.currentTarget as HTMLElement)?.open();
				(on as Record<string, (ev: Event) => void>)?.pointerenter?.(ev);
			},
			pointerleave: (ev: Event) => {
				findCtx(ev.currentTarget as HTMLElement)?.close();
				(on as Record<string, (ev: Event) => void>)?.pointerleave?.(ev);
			},
			focus: (ev: Event) => {
				findCtx(ev.currentTarget as HTMLElement)?.open();
				(on as Record<string, (ev: Event) => void>)?.focus?.(ev);
			},
			blur: (ev: Event) => {
				findCtx(ev.currentTarget as HTMLElement)?.close();
				(on as Record<string, (ev: Event) => void>)?.blur?.(ev);
			},
			keydown: (ev: Event) => {
				if ((ev as KeyboardEvent).key === "Escape") {
					findCtx(ev.currentTarget as HTMLElement)?.close();
				}
				(on as Record<string, (ev: Event) => void>)?.keydown?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	// Wire aria-describedby once the trigger joins the DOM tree so screen
	// readers can associate the content with the focusable trigger.
	queueMicrotask(() => {
		const ctx = findCtx(el);
		if (ctx) el.setAttribute("aria-describedby", ctx.contentId);
	});

	return el;
}

export interface HoverCardContentProps extends BaseProps {
	align?: "start" | "center" | "end";
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
}

export function HoverCardContent(
	first?: HoverCardContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<HoverCardContentProps>(first, second);
	const {
		class: className,
		align = "center",
		side = "bottom",
		sideOffset = 4,
		nodes,
		on,
		...rest
	} = props;

	const findCtx = (el: HTMLElement): HoverCardContext | undefined =>
		(el.closest("[data-slot=hover-card]") as ElementWithContext | null)
			?.__hoverCard as HoverCardContext | undefined;

	const content = div({
		"data-slot": "hover-card-content",
		"data-side": side,
		"data-align": align,
		// Seed the closed state at creation so the closed-state CSS applies
		// on the first paint — prevents a FOUC flash on mount.
		"data-state": "closed",
		role: "dialog",
		class: cn(
			"z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
			className,
		),
		style: {
			position: "absolute",
			display: "none",
			...(side === "bottom" ? { top: `calc(100% + ${sideOffset}px)` } : {}),
			...(side === "top" ? { bottom: `calc(100% + ${sideOffset}px)` } : {}),
			...(side === "left" ? { right: `calc(100% + ${sideOffset}px)` } : {}),
			...(side === "right" ? { left: `calc(100% + ${sideOffset}px)` } : {}),
			...(align === "center"
				? { left: "50%", transform: "translateX(-50%)" }
				: {}),
			...(align === "start" ? { left: "0" } : {}),
			...(align === "end" ? { right: "0" } : {}),
		} as Record<string, string>,
		nodes,
		on: {
			...on,
			pointerenter: (ev: Event) => {
				findCtx(ev.currentTarget as HTMLElement)?.cancelClose();
				(on as Record<string, (ev: Event) => void>)?.pointerenter?.(ev);
			},
			pointerleave: (ev: Event) => {
				findCtx(ev.currentTarget as HTMLElement)?.close();
				(on as Record<string, (ev: Event) => void>)?.pointerleave?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	queueMicrotask(() => {
		const ctx = findCtx(content);
		if (!ctx) return;

		// Adopt the stable id so the trigger's aria-describedby can resolve.
		content.id = ctx.contentId;

		const teardownEffect = effect(() => {
			const open = ctx.isOpen();
			content.style.display = open ? "" : "none";
			content.setAttribute("data-state", open ? "open" : "closed");
		});

		// Unmount-safe cleanup: the effect goes away when the content is
		// removed from the DOM, so stale signals cannot poke a detached node.
		registerDisposer(content, () => teardownEffect());
	});

	return content as HTMLElement;
}
