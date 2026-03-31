import { div, effect, type NodeChildren, signal, span } from "sibujs";
import { cn } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

export interface HoverCardProps extends BaseProps {
	openDelay?: number;
	closeDelay?: number;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
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

	const [isOpen, setIsOpen] = signal(controlledOpen ?? defaultOpen);
	let openTimer: ReturnType<typeof setTimeout> | null = null;
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	const el = div({
		"data-slot": "hover-card",
		style: "position: relative; display: inline-block",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__hoverCard = {
		isOpen,
		open: () => {
			if (closeTimer) {
				clearTimeout(closeTimer);
				closeTimer = null;
			}
			openTimer = setTimeout(() => {
				if (controlledOpen === undefined) setIsOpen(true);
				onOpenChange?.(true);
			}, openDelay);
		},
		close: () => {
			if (openTimer) {
				clearTimeout(openTimer);
				openTimer = null;
			}
			closeTimer = setTimeout(() => {
				if (controlledOpen === undefined) setIsOpen(false);
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

	return el as HTMLElement;
}

export function HoverCardTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;

	return span({
		"data-slot": "hover-card-trigger",
		nodes,
		on: {
			...on,
			mouseenter: (ev: Event) => {
				const cardEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=hover-card]",
				);
				if (cardEl) (cardEl as ElementWithContext).__hoverCard?.open();
				(on as Record<string, (ev: Event) => void>)?.mouseenter?.(ev);
			},
			mouseleave: (ev: Event) => {
				const cardEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=hover-card]",
				);
				if (cardEl) (cardEl as ElementWithContext).__hoverCard?.close();
				(on as Record<string, (ev: Event) => void>)?.mouseleave?.(ev);
			},
			focus: (ev: Event) => {
				const cardEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=hover-card]",
				);
				if (cardEl) (cardEl as ElementWithContext).__hoverCard?.open();
				(on as Record<string, (ev: Event) => void>)?.focus?.(ev);
			},
			blur: (ev: Event) => {
				const cardEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=hover-card]",
				);
				if (cardEl) (cardEl as ElementWithContext).__hoverCard?.close();
				(on as Record<string, (ev: Event) => void>)?.blur?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
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

	const content = div({
		"data-slot": "hover-card-content",
		"data-side": side,
		"data-align": align,
		class: cn(
			"z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
			className,
		),
		style: {
			position: "absolute",
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
			mouseenter: (ev: Event) => {
				const cardEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=hover-card]",
				);
				if (cardEl) (cardEl as ElementWithContext).__hoverCard?.cancelClose();
				(on as Record<string, (ev: Event) => void>)?.mouseenter?.(ev);
			},
			mouseleave: (ev: Event) => {
				const cardEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=hover-card]",
				);
				if (cardEl) (cardEl as ElementWithContext).__hoverCard?.close();
				(on as Record<string, (ev: Event) => void>)?.mouseleave?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	queueMicrotask(() => {
		const cardEl = content.closest("[data-slot=hover-card]");
		if (cardEl) {
			const ctx = (cardEl as ElementWithContext).__hoverCard;
			if (ctx) {
				effect(() => {
					const open = ctx.isOpen();
					content.style.display = open ? "" : "none";
					content.setAttribute("data-state", open ? "open" : "closed");
				});
			}
		}
	});

	return content as HTMLElement;
}
