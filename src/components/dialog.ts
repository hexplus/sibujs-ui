import {
	button as buttonTag,
	dispose,
	div,
	h2,
	type NodeChildren,
	p,
	span,
} from "sibujs";
import { XIcon } from "../icons";
import { bindAriaRefs } from "../lib/aria";
import { bindControlled } from "../lib/controlled";
import { deferOwned, nodeOwner, ownedEffect } from "../lib/lifecycle";
import { createScrollLock } from "../lib/scroll-lock";
import { cn, cnReactive } from "../lib/utils";
import { Button } from "./button";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toChildren,
} from "./types";

// Auto-incrementing ID for accessible linkage
let dialogIdCounter = 0;

// Close functions of the open dialogs, in open order. One shared document
// listener serves them all and closes only the topmost, so a single Escape
// dismisses one nested dialog instead of every open one.
const escapeStack: Array<() => void> = [];

const handleEscape = (ev: KeyboardEvent) => {
	if (ev.key !== "Escape") return;
	const top = escapeStack[escapeStack.length - 1];
	if (!top) return;
	ev.preventDefault();
	top();
};

function pushEscape(close: () => void): void {
	if (escapeStack.length === 0)
		document.addEventListener("keydown", handleEscape);
	escapeStack.push(close);
}

function removeEscape(close: () => void): void {
	const idx = escapeStack.lastIndexOf(close);
	if (idx === -1) return;
	escapeStack.splice(idx, 1);
	if (escapeStack.length === 0)
		document.removeEventListener("keydown", handleEscape);
}

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

	const [isOpen, setIsOpen, isControlled, stopControlled] =
		bindControlled<boolean>(controlledOpen, defaultOpen);

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

	nodeOwner(el).add(stopControlled);

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

	// Recorded now, while it is a fact. An explicit reference may name an
	// external element, several elements, or one that does not exist yet — none
	// of which can be told apart from a generated reference after the fact, so
	// authorship is captured rather than inferred.
	const callerLabelledBy = rest["aria-labelledby"] != null;
	const callerDescribedBy = rest["aria-describedby"] != null;

	// Create overlay
	const overlay = div({
		"data-slot": "dialog-overlay",
		class:
			"fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
	}) as HTMLElement;

	// Create close button
	const closeButtonEl = showCloseButton
		? buttonTag(
				{
					"data-slot": "dialog-close",
					type: "button",
					class:
						"absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				},
				[
					XIcon(),
					span(
						{
							class: "sr-only",
						},
						"Close",
					),
				],
			)
		: null;

	// Reactive (function) children must survive: toChildren keeps getters intact
	// so the tag factory binds them, and the close button still lands last.
	const contentNodes = toChildren(nodes);
	if (closeButtonEl) contentNodes.push(closeButtonEl as Node);

	const content = div(
		{
			"data-slot": "dialog-content",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": titleId,
			"aria-describedby": descId,
			class: cn(
				"fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
				className,
			),
			...rest,
		},
		contentNodes,
	) as HTMLElement;

	// The portal: overlay + content. While the dialog is open (and while its
	// close animation plays) it is a child of document.body, so no ancestor's
	// overflow clipping, stacking context, transform or containment applies to
	// the fixed overlay. Closed, it lives inside `anchor`, in the caller's tree —
	// which is also what server rendering and a never-opened dialog show.
	const portal = div(
		{
			"data-slot": "dialog-portal",
			style: "display: none",
		},
		[overlay, content],
	) as HTMLElement;

	// The node DialogContent returns. It never moves, so it is what `dispose()`
	// reaches — through an ancestor (a route change, a `when()` branch) or
	// directly — and it owns every subscription, timer, global listener, the
	// scroll lock and the portal itself.
	const anchor = div(
		{
			"data-slot": "dialog-anchor",
			style: "display: contents",
		},
		[portal],
	) as HTMLElement;

	// Internal bridge from the in-tree anchor to its portal, which is not a
	// descendant while the dialog is open (see ElementWithContext).
	(anchor as ElementWithContext).__dialogPortal = portal;

	// Keep the generated references pointing at real, owned children — adding,
	// re-pointing and removing them as titles mount, move and unmount. A
	// caller-supplied reference is left strictly alone.
	bindAriaRefs(anchor, content, "[data-slot=dialog-content]", [
		{
			attr: "aria-labelledby",
			claimant: "[data-slot=dialog-title]",
			baseId: titleId,
			callerOwned: callerLabelledBy,
		},
		{
			attr: "aria-describedby",
			claimant: "[data-slot=dialog-description]",
			baseId: descId,
			callerOwned: callerDescribedBy,
		},
	]);

	// The dialog this content belongs to. Resolved once, from the anchor's place
	// in the tree — the anchor never moves — and carried from then on, so
	// nothing inside the portaled overlay/content depends on DOM ancestry to
	// find its dialog. DialogClose and DialogFooter reach it through
	// `__dialogClose` on the content element, which travels with the portal.
	let dialogCtx: ElementWithContext["__dialog"] | null = null;
	const closeFn = () => {
		dialogCtx?.close();
	};

	(content as ElementWithContext).__dialogClose = closeFn;
	if (closeButtonEl) {
		closeButtonEl.addEventListener("click", closeFn);
	}
	overlay.addEventListener("click", closeFn);

	const scrollLock = createScrollLock();
	const portalInBody = () => portal.parentNode !== anchor;
	/** Put the portal back where it lives while closed. */
	const returnPortal = () => {
		if (portalInBody()) anchor.appendChild(portal);
	};

	// Registered now, not in the deferred setup: a dialog disposed while open
	// must never leave its overlay in <body>. The portal is not a descendant of
	// the anchor while it is in <body>, so the anchor's disposal would not
	// reach it — dispose it explicitly, then remove it.
	nodeOwner(anchor).add(() => {
		if (!portalInBody()) return;
		dispose(portal);
		portal.remove();
	});

	// Bind visibility reactively after insertion.
	deferOwned(anchor, (owner) => {
		const dialogEl = anchor.parentElement?.closest?.("[data-slot=dialog]");
		if (!dialogEl) return;
		const ctx = (dialogEl as ElementWithContext).__dialog;
		if (!ctx) return;
		dialogCtx = ctx;

		let closeTimer: ReturnType<typeof setTimeout> | undefined;
		let keydownBound = false;

		const bindKeydown = () => {
			if (keydownBound) return;
			keydownBound = true;
			pushEscape(closeFn);
		};
		const unbindKeydown = () => {
			if (!keydownBound) return;
			keydownBound = false;
			removeEscape(closeFn);
		};

		ownedEffect(anchor, () => {
			const open = ctx.isOpen();
			const state = open ? "open" : "closed";

			if (open) {
				if (closeTimer) {
					clearTimeout(closeTimer);
					closeTimer = undefined;
				}
				// Appending (again) makes this the last portal in <body>, so the
				// most recently opened dialog — a nested one included — paints on
				// top of the others at the same z-index.
				if (typeof document !== "undefined" && document.body) {
					document.body.appendChild(portal);
				}
				portal.style.display = "contents";
				overlay.setAttribute("data-state", state);
				content.setAttribute("data-state", state);
				bindKeydown();
				scrollLock.acquire();
			} else {
				overlay.setAttribute("data-state", state);
				content.setAttribute("data-state", state);
				unbindKeydown();
				scrollLock.release();
				// The close animation plays where the dialog is shown; only then
				// does the portal go back into the tree.
				closeTimer = setTimeout(() => {
					portal.style.display = "none";
					returnPortal();
					closeTimer = undefined;
				}, 200);
			}
		});

		owner.add(() => {
			if (closeTimer) clearTimeout(closeTimer);
			unbindKeydown();
			// Release only the lock this instance holds.
			scrollLock.release();
		});
	});

	return anchor;
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

	const footerNodes = toChildren(nodes);
	if (showCloseButton) {
		const closeBtn = Button(
			{
				variant: "outline",
			},
			"Close",
		);
		closeBtn.addEventListener("click", () => {
			const contentEl = closeBtn.closest("[data-slot=dialog-content]");
			if (contentEl) (contentEl as ElementWithContext).__dialogClose?.();
		});
		footerNodes.push(closeBtn as Node);
	}

	return div(
		{
			"data-slot": "dialog-footer",
			class: cnReactive(
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				className,
			),
			...rest,
		},
		footerNodes,
	) as HTMLElement;
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

	// The id and the content's `aria-labelledby` are maintained by the owning
	// DialogContent (see `bindAriaRefs`), which is the only place that can see
	// this title mount, move or unmount.
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

	// As with DialogTitle, the owning DialogContent maintains the id and the
	// content's `aria-describedby`.
	return el;
}
