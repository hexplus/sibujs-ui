import {
	button as buttonTag,
	div,
	effect,
	type NodeChildren,
	p,
	registerDisposer,
	signal,
} from "sibujs";
import { cnReactive } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

export interface PopoverProps extends BaseProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function Popover(
	first?: PopoverProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<PopoverProps>(first, second);
	const {
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		nodes,
		...rest
	} = props;
	const [isOpen, setIsOpen] = signal(controlledOpen ?? defaultOpen);

	const el = div({
		"data-slot": "popover",
		style: "position: relative; display: inline-block",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__popover = {
		isOpen,
		open: () => {
			if (controlledOpen === undefined) setIsOpen(true);
			onOpenChange?.(true);
		},
		close: () => {
			if (controlledOpen === undefined) setIsOpen(false);
			onOpenChange?.(false);
		},
		toggle: () => {
			const next = !isOpen();
			if (controlledOpen === undefined) setIsOpen(next);
			onOpenChange?.(next);
		},
	};

	return el as HTMLElement;
}

export function PopoverTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;

	const el = buttonTag({
		"data-slot": "popover-trigger",
		type: "button",
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				const popoverEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=popover]",
				);
				if (popoverEl) (popoverEl as ElementWithContext).__popover?.toggle();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	// Bind aria-expanded reactively
	queueMicrotask(() => {
		const popoverEl = el.closest("[data-slot=popover]");
		if (popoverEl) {
			const ctx = (popoverEl as ElementWithContext).__popover;
			if (ctx) {
				effect(() => {
					el.setAttribute("aria-expanded", String(ctx.isOpen()));
				});
			}
		}
	});

	return el;
}

export interface PopoverContentProps extends BaseProps {
	align?: "start" | "center" | "end";
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
}

export function PopoverContent(
	first?: PopoverContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<PopoverContentProps>(first, second);
	const {
		class: className,
		align = "center",
		side = "bottom",
		sideOffset = 4,
		nodes,
		...rest
	} = props;

	const content = div({
		"data-slot": "popover-content",
		"data-side": side,
		"data-align": align,
		style: {
			display: "none",
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
		class: cnReactive(
			"z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;

	const handleOutsideClick = (ev: MouseEvent) => {
		const popoverEl = content.closest("[data-slot=popover]");
		if (popoverEl && !popoverEl.contains(ev.target as Node)) {
			(popoverEl as ElementWithContext).__popover?.close();
		}
	};

	const handleKeydown = (ev: KeyboardEvent) => {
		if (ev.key === "Escape") {
			const popoverEl = content.closest("[data-slot=popover]");
			if (popoverEl) (popoverEl as ElementWithContext).__popover?.close();
		}
	};

	queueMicrotask(() => {
		const popoverEl = content.closest("[data-slot=popover]");
		if (!popoverEl) return;
		const ctx = (popoverEl as ElementWithContext).__popover;
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
				document.addEventListener("mousedown", handleOutsideClick);
				document.addEventListener("keydown", handleKeydown);
			} else {
				content.setAttribute("data-state", "closed");
				document.removeEventListener("mousedown", handleOutsideClick);
				document.removeEventListener("keydown", handleKeydown);
				closeTimer = setTimeout(() => {
					content.style.display = "none";
					closeTimer = undefined;
				}, 150);
			}
		});

		// Detach listeners if the element is disposed while still open
		registerDisposer(content, () => {
			if (closeTimer) clearTimeout(closeTimer);
			document.removeEventListener("mousedown", handleOutsideClick);
			document.removeEventListener("keydown", handleKeydown);
		});
	});

	return content;
}

export function PopoverHeader(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "popover-header",
		class: cnReactive("flex flex-col gap-1 text-sm", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function PopoverTitle(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "popover-title",
		class: cnReactive("font-medium", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function PopoverAnchor(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, ...rest } = props;
	return div({
		"data-slot": "popover-anchor",
		nodes,
		...rest,
	}) as HTMLElement;
}

export function PopoverDescription(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return p({
		"data-slot": "popover-description",
		class: cnReactive("text-muted-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}
