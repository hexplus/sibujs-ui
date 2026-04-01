import {
	button as buttonTag,
	div,
	effect,
	h2,
	type NodeChildren,
	p,
	signal,
} from "sibujs";
import { cn, cnReactive } from "../lib/utils";
import { Button, type ButtonProps } from "./button";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

export interface AlertDialogProps extends BaseProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function AlertDialog(
	first?: AlertDialogProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<AlertDialogProps>(first, second);
	const {
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		nodes,
		...rest
	} = props;

	const [isOpen, setIsOpen] = signal(controlledOpen ?? defaultOpen);

	const el = div({
		"data-slot": "alert-dialog",
		"data-state": () => (isOpen() ? "open" : "closed"),
		style: "display: contents",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__alertDialog = {
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

export function AlertDialogTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;
	return buttonTag({
		"data-slot": "alert-dialog-trigger",
		type: "button",
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				const dialogEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=alert-dialog]",
				);
				if (dialogEl) (dialogEl as ElementWithContext).__alertDialog?.open();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

export interface AlertDialogContentProps extends BaseProps {
	size?: "default" | "sm";
}

export function AlertDialogContent(
	first?: AlertDialogContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<AlertDialogContentProps>(first, second);
	const { class: className, size = "default", nodes, ...rest } = props;

	const overlay = div({
		"data-slot": "alert-dialog-overlay",
		class:
			"fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
	}) as HTMLElement;

	const content = div({
		"data-slot": "alert-dialog-content",
		"data-size": size,
		role: "alertdialog",
		"aria-modal": "true",
		"aria-labelledby": "alert-dialog-title",
		"aria-describedby": "alert-dialog-description",
		class: cn(
			"group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;

	const container = div({
		"data-slot": "alert-dialog-portal",
		style: "display: none",
		nodes: [overlay, content],
	}) as HTMLElement;

	const closeFn = () => {
		const dialogEl = container.parentElement?.closest?.(
			"[data-slot=alert-dialog]",
		);
		if (dialogEl) (dialogEl as ElementWithContext).__alertDialog?.close();
	};

	(content as ElementWithContext).__alertDialogClose = closeFn;

	// Do NOT close on overlay click for alert-dialog (user must take action)

	queueMicrotask(() => {
		const dialogEl = container.parentElement?.closest?.(
			"[data-slot=alert-dialog]",
		);
		if (dialogEl) {
			const ctx = (dialogEl as ElementWithContext).__alertDialog;
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
						document.body.style.overflow = "hidden";
					} else {
						overlay.setAttribute("data-state", state);
						content.setAttribute("data-state", state);
						document.body.style.overflow = "";
						closeTimer = setTimeout(() => {
							container.style.display = "none";
							closeTimer = undefined;
						}, 200);
					}
				});
			}
		}
	});

	return container as HTMLElement;
}

export function AlertDialogHeader(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "alert-dialog-header",
		class: cnReactive(
			"grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function AlertDialogFooter(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "alert-dialog-footer",
		class: cnReactive(
			"flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function AlertDialogTitle(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return h2({
		"data-slot": "alert-dialog-title",
		class: cnReactive(
			"text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function AlertDialogDescription(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return p({
		"data-slot": "alert-dialog-description",
		class: cnReactive("text-sm text-muted-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function AlertDialogMedia(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "alert-dialog-media",
		class: cn(
			"mb-2 inline-flex size-16 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface AlertDialogActionProps extends ButtonProps {}

export function AlertDialogAction(
	first?: AlertDialogActionProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<AlertDialogActionProps>(first, second);
	const { on, ...rest } = props;
	const btn = Button({
		"data-slot": "alert-dialog-action",
		on: {
			...on,
			click: (ev: Event) => {
				const contentEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=alert-dialog-content]",
				);
				if (contentEl) (contentEl as ElementWithContext).__alertDialogClose?.();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	});
	return btn as HTMLElement;
}

export interface AlertDialogCancelProps extends ButtonProps {}

export function AlertDialogCancel(
	first?: AlertDialogCancelProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<AlertDialogCancelProps>(first, second);
	const { on, variant = "outline", ...rest } = props;
	const btn = Button({
		"data-slot": "alert-dialog-cancel",
		variant,
		on: {
			...on,
			click: (ev: Event) => {
				const contentEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=alert-dialog-content]",
				);
				if (contentEl) (contentEl as ElementWithContext).__alertDialogClose?.();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	});
	return btn as HTMLElement;
}
