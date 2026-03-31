import { div, effect, type NodeChildren, signal, span } from "sibujs";
import { cn, cnReactive } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toNodes,
} from "./types";

export interface TooltipProps extends BaseProps {
	delayDuration?: number;
	open?: boolean;
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

	const [isOpen, setIsOpen] = signal(controlledOpen ?? defaultOpen);
	let delayTimer: ReturnType<typeof setTimeout> | null = null;

	const el = div({
		"data-slot": "tooltip",
		style: "position: relative; display: inline-block",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__tooltip = {
		isOpen,
		open: () => {
			if (delayDuration > 0) {
				delayTimer = setTimeout(() => {
					if (controlledOpen === undefined) setIsOpen(true);
					onOpenChange?.(true);
				}, delayDuration);
			} else {
				if (controlledOpen === undefined) setIsOpen(true);
				onOpenChange?.(true);
			}
		},
		close: () => {
			if (delayTimer) {
				clearTimeout(delayTimer);
				delayTimer = null;
			}
			if (controlledOpen === undefined) setIsOpen(false);
			onOpenChange?.(false);
		},
	};

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

	el.addEventListener("mouseenter", () => {
		const tooltipEl = el.closest("[data-slot=tooltip]");
		if (tooltipEl) (tooltipEl as ElementWithContext).__tooltip?.open();
	});
	el.addEventListener("mouseleave", () => {
		const tooltipEl = el.closest("[data-slot=tooltip]");
		if (tooltipEl) (tooltipEl as ElementWithContext).__tooltip?.close();
	});
	el.addEventListener("focus", () => {
		const tooltipEl = el.closest("[data-slot=tooltip]");
		if (tooltipEl) (tooltipEl as ElementWithContext).__tooltip?.open();
	});
	el.addEventListener("blur", () => {
		const tooltipEl = el.closest("[data-slot=tooltip]");
		if (tooltipEl) (tooltipEl as ElementWithContext).__tooltip?.close();
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
		role: "tooltip",
		class: cnReactive(
			"z-50 w-max whitespace-nowrap animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
			className,
		),
		style: {
			position: "absolute",
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
		const ctx = (tooltipEl as ElementWithContext).__tooltip;
		if (!ctx) return;

		let closeTimer: ReturnType<typeof setTimeout> | undefined;

		effect(() => {
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
	});

	return content as HTMLElement;
}
