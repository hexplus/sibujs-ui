import {
	button as buttonTag,
	div,
	effect,
	h2,
	type NodeChildren,
	p,
	registerDisposer,
	signal,
	span,
} from "sibujs";
import { XIcon } from "../icons";
import { cnReactive } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toNodes,
} from "./types";

export interface SheetProps extends BaseProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function Sheet(
	first?: SheetProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SheetProps>(first, second);
	const {
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		nodes,
		...rest
	} = props;
	const [isOpen, setIsOpen] = signal(controlledOpen ?? defaultOpen);

	const el = div({
		"data-slot": "sheet",
		"data-state": () => (isOpen() ? "open" : "closed"),
		style: "display: contents",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__sheet = {
		isOpen,
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

export function SheetTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;
	return buttonTag({
		"data-slot": "sheet-trigger",
		type: "button",
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				const sheetEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=sheet]",
				);
				if (sheetEl) (sheetEl as ElementWithContext).__sheet?.open();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

export function SheetClose(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;
	const el = div({
		"data-slot": "sheet-close",
		class: "flex flex-col",
		nodes,
		...rest,
	}) as HTMLElement;

	el.addEventListener("click", (ev: Event) => {
		const contentEl = el.closest("[data-slot=sheet-content]");
		if (contentEl) (contentEl as ElementWithContext).__sheetClose?.();
		(on as Record<string, (ev: Event) => void>)?.click?.(ev);
	});

	return el;
}

export interface SheetContentProps extends BaseProps {
	side?: "top" | "right" | "bottom" | "left";
	showCloseButton?: boolean;
}

export function SheetContent(
	first?: SheetContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SheetContentProps>(first, second);
	const {
		class: className,
		side = "right",
		showCloseButton = true,
		nodes,
		...rest
	} = props;

	const overlay = div({
		"data-slot": "sheet-overlay",
		class:
			"fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
	}) as HTMLElement;

	const sideClasses: Record<string, string> = {
		right:
			"inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		top: "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom:
			"inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
	};

	const closeBtn = showCloseButton
		? buttonTag(
				{
					"data-slot": "sheet-close",
					type: "button",
					class:
						"absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary",
				},
				[
					XIcon({ class: "size-4" }),
					span(
						{
							class: "sr-only",
						},
						"Close",
					),
				],
			)
		: null;

	const content = div(
		{
			"data-slot": "sheet-content",
			role: "dialog",
			"aria-modal": "true",
			class: cnReactive(
				"fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",
				sideClasses[side],
				className,
			),
			...rest,
		},
		[...toNodes(nodes), ...(closeBtn ? [closeBtn as Node] : [])],
	) as HTMLElement;

	const container = div(
		{
			"data-slot": "sheet-portal",
			style: "display: none",
		},
		[overlay, content],
	) as HTMLElement;

	const closeFn = () => {
		const sheetEl = container.parentElement?.closest?.("[data-slot=sheet]");
		if (sheetEl) (sheetEl as ElementWithContext).__sheet?.close();
	};

	(content as ElementWithContext).__sheetClose = closeFn;
	if (closeBtn) closeBtn.addEventListener("click", closeFn);
	overlay.addEventListener("click", closeFn);

	const handleKeydown = (ev: KeyboardEvent) => {
		if (ev.key === "Escape") closeFn();
	};

	queueMicrotask(() => {
		const sheetEl = container.parentElement?.closest?.("[data-slot=sheet]");
		if (sheetEl) {
			const ctx = (sheetEl as ElementWithContext).__sheet;
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
						}, 300);
					}
				});
				registerDisposer(container, () => {
					if (closeTimer) clearTimeout(closeTimer);
					document.removeEventListener("keydown", handleKeydown);
					// Restore body scroll if the sheet was still open
					if (document.body.style.overflow === "hidden") {
						document.body.style.overflow = "";
					}
				});
			}
		}
	});

	return container as HTMLElement;
}

export function SheetHeader(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "sheet-header",
		class: cnReactive("flex flex-col gap-1.5 p-4", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function SheetFooter(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "sheet-footer",
		class: cnReactive("mt-auto flex flex-col gap-2 p-4", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function SheetTitle(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return h2({
		"data-slot": "sheet-title",
		class: cnReactive("font-semibold text-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function SheetDescription(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return p({
		"data-slot": "sheet-description",
		class: cnReactive("text-sm text-muted-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}
