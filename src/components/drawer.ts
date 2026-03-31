import {
	button as buttonTag,
	div,
	effect,
	h2,
	type NodeChildren,
	p,
	signal,
} from "sibujs";
import { cn } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toNodes,
} from "./types";

export interface DrawerProps extends BaseProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	direction?: "top" | "bottom" | "right" | "left";
}

export function Drawer(
	first?: DrawerProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DrawerProps>(first, second);
	const {
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		direction = "bottom",
		nodes,
		...rest
	} = props;

	const [isOpen, setIsOpen] = signal(controlledOpen ?? defaultOpen);

	const el = div({
		"data-slot": "drawer",
		"data-state": () => (isOpen() ? "open" : "closed"),
		"data-direction": direction,
		style: "display: contents",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__drawer = {
		isOpen,
		direction,
		open: () => {
			if (controlledOpen === undefined) setIsOpen(true);
			onOpenChange?.(true);
		},
		close: () => {
			if (controlledOpen === undefined) setIsOpen(false);
			onOpenChange?.(false);
		},
	};

	return el as HTMLElement;
}

export function DrawerTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;
	return buttonTag({
		"data-slot": "drawer-trigger",
		type: "button",
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				const drawerEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=drawer]",
				);
				if (drawerEl) (drawerEl as ElementWithContext).__drawer?.open();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

export function DrawerClose(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;
	const el = div({
		"data-slot": "drawer-close",
		class: "[&>*]:w-full",
		nodes,
		...rest,
	}) as HTMLElement;

	el.addEventListener("click", (ev: Event) => {
		const contentEl = el.closest("[data-slot=drawer-content]");
		if (contentEl) (contentEl as ElementWithContext).__drawerClose?.();
		(on as Record<string, (ev: Event) => void>)?.click?.(ev);
	});

	return el;
}

export interface DrawerContentProps extends BaseProps {}

const directionClasses: Record<string, string> = {
	bottom:
		"inset-x-0 bottom-0 mt-24 max-h-[80vh] rounded-t-lg border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
	top: "inset-x-0 top-0 mb-24 max-h-[80vh] rounded-b-lg border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
	right:
		"inset-y-0 right-0 w-3/4 border-l sm:max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
	left: "inset-y-0 left-0 w-3/4 border-r sm:max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
};

export function DrawerContent(
	first?: DrawerContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DrawerContentProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	const overlay = div({
		"data-slot": "drawer-overlay",
		class:
			"fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
	}) as HTMLElement;

	const handle = div({
		"data-slot": "drawer-handle",
		class:
			"mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block",
	}) as HTMLElement;

	// Content starts without direction classes — they're added once we know the direction
	const content = div({
		"data-slot": "drawer-content",
		role: "dialog",
		"aria-modal": "true",
		nodes: [handle, ...toNodes(nodes)],
		...rest,
	}) as HTMLElement;

	const container = div({
		"data-slot": "drawer-portal",
		style: "display: none",
		nodes: [overlay, content],
	}) as HTMLElement;

	const closeFn = () => {
		const drawerEl = container.parentElement?.closest?.("[data-slot=drawer]");
		if (drawerEl) (drawerEl as ElementWithContext).__drawer?.close();
	};

	(content as ElementWithContext).__drawerClose = closeFn;
	overlay.addEventListener("click", closeFn);

	const handleKeydown = (ev: KeyboardEvent) => {
		if (ev.key === "Escape") closeFn();
	};

	queueMicrotask(() => {
		const drawerEl = container.parentElement?.closest?.("[data-slot=drawer]");
		if (!drawerEl) return;
		const ctx = (drawerEl as ElementWithContext).__drawer;
		if (!ctx) return;

		const dir = ctx.direction;
		content.setAttribute("data-vaul-drawer-direction", dir);

		// Apply full class string with direction-specific classes (same approach as Sheet)
		content.className = cn(
			"group/drawer-content fixed z-50 flex h-auto flex-col bg-background data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",
			directionClasses[dir] || directionClasses.bottom,
			className,
		);

		let closeTimer: ReturnType<typeof setTimeout> | undefined;

		effect(() => {
			const open = ctx.isOpen();
			const state = open ? "open" : "closed";

			if (open) {
				if (closeTimer) {
					clearTimeout(closeTimer);
					closeTimer = undefined;
				}
				container.style.display = "contents";
				overlay.setAttribute("data-state", state);
				content.setAttribute("data-state", state);
				document.addEventListener("keydown", handleKeydown);
				document.body.style.overflow = "hidden";
			} else {
				// Trigger exit animation first, then hide after it completes
				overlay.setAttribute("data-state", state);
				content.setAttribute("data-state", state);
				document.removeEventListener("keydown", handleKeydown);
				document.body.style.overflow = "";
				closeTimer = setTimeout(() => {
					container.style.display = "none";
					closeTimer = undefined;
				}, 300); // matches data-[state=closed]:duration-300
			}
		});
	});

	return container as HTMLElement;
}

export function DrawerHeader(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "drawer-header",
		class: cn(
			"flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function DrawerFooter(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "drawer-footer",
		class: cn("mt-auto flex flex-col gap-2 p-4", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function DrawerTitle(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return h2({
		"data-slot": "drawer-title",
		class: cn("font-semibold text-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function DrawerDescription(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return p({
		"data-slot": "drawer-description",
		class: cn("text-sm text-muted-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}
