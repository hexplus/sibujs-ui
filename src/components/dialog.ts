import {
	button as buttonTag,
	div,
	effect,
	h2,
	type NodeChildren,
	p,
	registerDisposer,
	span,
} from "sibujs";
import { XIcon } from "../icons";
import { bindControlled } from "../lib/controlled";
import { cn, cnReactive } from "../lib/utils";
import { Button } from "./button";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toNodes,
} from "./types";

// Auto-incrementing ID for accessible linkage
let dialogIdCounter = 0;

export interface DialogProps extends BaseProps {
	open?: boolean | (() => boolean);
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function Dialog(
	first?: DialogProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DialogProps>(first, second);
	const {
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		nodes,
		onElement: userOnElement,
		...rest
	} = props;

	const [isOpen, setIsOpen, isControlled] = bindControlled<boolean>(
		controlledOpen,
		defaultOpen,
	);

	const dialogApi = {
		isOpen,
		open: () => {
			if (!isControlled) setIsOpen(true);
			onOpenChange?.(true);
		},
		close: () => {
			if (!isControlled) setIsOpen(false);
			onOpenChange?.(false);
		},
		toggle: () => {
			const next = !isOpen();
			if (!isControlled) setIsOpen(next);
			onOpenChange?.(next);
		},
	};

	const el = div({
		"data-slot": "dialog",
		"data-state": () => (isOpen() ? "open" : "closed"),
		style: "display: contents",
		nodes,
		onElement: (el: HTMLElement) => {
			(el as ElementWithContext).__dialog = dialogApi;
			if (typeof userOnElement === "function")
				(userOnElement as (el: HTMLElement) => void)(el);
		},
		...rest,
	}) as HTMLElement;

	return el as HTMLElement;
}

export function DialogTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;
	return buttonTag({
		"data-slot": "dialog-trigger",
		type: "button",
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				const dialogEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=dialog]",
				);
				if (dialogEl) (dialogEl as ElementWithContext).__dialog?.open();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

export function DialogClose(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;
	const el = div({
		"data-slot": "dialog-close",
		class: "[&>*]:w-full",
		nodes,
		...rest,
	}) as HTMLElement;

	el.addEventListener("click", (ev: Event) => {
		const contentEl = el.closest("[data-slot=dialog-content]");
		if (contentEl) (contentEl as ElementWithContext).__dialogClose?.();
		else {
			const dialogEl = el.closest("[data-slot=dialog]");
			if (dialogEl) (dialogEl as ElementWithContext).__dialog?.close();
		}
		(on as Record<string, (ev: Event) => void>)?.click?.(ev);
	});

	return el;
}

export interface DialogContentProps extends BaseProps {
	showCloseButton?: boolean;
}

export function DialogContent(
	first?: DialogContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DialogContentProps>(first, second);
	const { class: className, showCloseButton = true, nodes, ...rest } = props;

	const dialogId = `dlg-${++dialogIdCounter}`;
	const titleId = `${dialogId}-title`;
	const descId = `${dialogId}-desc`;

	// Create overlay
	const overlay = div({
		"data-slot": "dialog-overlay",
		class:
			"fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
	}) as HTMLElement;

	// Create close button
	const closeButtonEl = showCloseButton
		? buttonTag({
				"data-slot": "dialog-close",
				type: "button",
				class:
					"absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				nodes: [XIcon(), span({ class: "sr-only", nodes: "Close" })],
			})
		: null;

	const contentNodes = toNodes(nodes);
	if (closeButtonEl) contentNodes.push(closeButtonEl as Node);

	const content = div({
		"data-slot": "dialog-content",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": titleId,
		"aria-describedby": descId,
		class: cn(
			"fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
			className,
		),
		nodes: contentNodes,
		...rest,
	}) as HTMLElement;

	// Store IDs for child components
	(content as ElementWithContext).__dialogIds = { titleId, descId };

	// Container that portals overlay + content
	const container = div({
		"data-slot": "dialog-portal",
		style: "display: none",
		nodes: [overlay, content],
	}) as HTMLElement;

	// Wire close behavior
	const closeFn = () => {
		// Walk up to find dialog context
		const dialogEl = container.parentElement?.closest?.("[data-slot=dialog]");
		if (dialogEl) (dialogEl as ElementWithContext).__dialog?.close();
	};

	(content as ElementWithContext).__dialogClose = closeFn;
	if (closeButtonEl) {
		closeButtonEl.addEventListener("click", closeFn);
	}
	overlay.addEventListener("click", closeFn);

	// Escape key
	const handleKeydown = (ev: KeyboardEvent) => {
		if (ev.key === "Escape") closeFn();
	};

	// Bind visibility reactively after insertion
	queueMicrotask(() => {
		const dialogEl = container.parentElement?.closest?.("[data-slot=dialog]");
		if (dialogEl) {
			const ctx = (dialogEl as ElementWithContext).__dialog;
			if (ctx) {
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
						overlay.setAttribute("data-state", state);
						content.setAttribute("data-state", state);
						document.removeEventListener("keydown", handleKeydown);
						document.body.style.overflow = "";
						closeTimer = setTimeout(() => {
							container.style.display = "none";
							closeTimer = undefined;
						}, 200);
					}
				});
				registerDisposer(container, () => {
					if (closeTimer) clearTimeout(closeTimer);
					document.removeEventListener("keydown", handleKeydown);
					if (document.body.style.overflow === "hidden") {
						document.body.style.overflow = "";
					}
				});
			}
		}
	});

	return container;
}

export function DialogHeader(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "dialog-header",
		class: cnReactive(
			"flex flex-col gap-2 text-center sm:text-left",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface DialogFooterProps extends BaseProps {
	showCloseButton?: boolean;
}

export function DialogFooter(
	first?: DialogFooterProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DialogFooterProps>(first, second);
	const { class: className, showCloseButton = false, nodes, ...rest } = props;

	const footerNodes = toNodes(nodes);
	if (showCloseButton) {
		const closeBtn = Button({ variant: "outline", nodes: "Close" });
		closeBtn.addEventListener("click", () => {
			const contentEl = closeBtn.closest("[data-slot=dialog-content]");
			if (contentEl) (contentEl as ElementWithContext).__dialogClose?.();
		});
		footerNodes.push(closeBtn as Node);
	}

	return div({
		"data-slot": "dialog-footer",
		class: cnReactive(
			"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
			className,
		),
		nodes: footerNodes,
		...rest,
	}) as HTMLElement;
}

export function DialogTitle(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	const el = h2({
		"data-slot": "dialog-title",
		class: cnReactive("text-lg leading-none font-semibold", className),
		nodes,
		...rest,
	}) as HTMLElement;

	// Auto-set ID for aria linkage
	queueMicrotask(() => {
		const contentEl = el.closest("[data-slot=dialog-content]");
		if (contentEl) {
			const ids = (contentEl as ElementWithContext).__dialogIds;
			if (ids?.titleId) el.id = ids.titleId;
		}
	});

	return el;
}

export function DialogDescription(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	const el = p({
		"data-slot": "dialog-description",
		class: cnReactive("text-sm text-muted-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;

	// Auto-set ID for aria linkage
	queueMicrotask(() => {
		const contentEl = el.closest("[data-slot=dialog-content]");
		if (contentEl) {
			const ids = (contentEl as ElementWithContext).__dialogIds;
			if (ids?.descId) el.id = ids.descId;
		}
	});

	return el;
}
