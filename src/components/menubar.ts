import {
	button as buttonTag,
	div,
	effect,
	type NodeChildren,
	registerDisposer,
	signal,
	span,
} from "sibujs";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "../icons";
import { cn, cnReactive } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toNodes,
} from "./types";

// ── Menubar ──────────────────────────────────────────────────────────────────

export function Menubar(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "menubar",
		role: "menubar",
		class: cnReactive(
			"flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── MenubarMenu ──────────────────────────────────────────────────────────────

export interface MenubarMenuProps extends BaseProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function MenubarMenu(
	first?: MenubarMenuProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<MenubarMenuProps>(first, second);
	const { open: controlledOpen, onOpenChange, nodes, ...rest } = props;
	const [isOpen, setIsOpen] = signal(controlledOpen ?? false);

	const el = div({
		"data-slot": "menubar-menu",
		style: "position: relative",
		"data-state": () => (isOpen() ? "open" : "closed"),
		nodes,
		...rest,
	}) as HTMLElement;

	const closeAll = () => {
		// Close all sub-menus immediately
		el.querySelectorAll("[data-slot=menubar-sub]").forEach((sub) => {
			(sub as ElementWithContext).__menubarSub?.closeImmediate?.();
		});
		document
			.querySelectorAll("[data-slot=menubar-sub-content]")
			.forEach((sc) => {
				if ((sc as ElementWithContext).__menubarRoot === el) {
					(sc as HTMLElement).style.display = "none";
				}
			});
		if (controlledOpen === undefined) setIsOpen(false);
		onOpenChange?.(false);
	};

	(el as ElementWithContext).__menubarMenu = {
		isOpen,
		open: () => {
			if (controlledOpen === undefined) setIsOpen(true);
			onOpenChange?.(true);
		},
		close: closeAll,
		toggle: () => {
			if (isOpen()) closeAll();
			else {
				if (controlledOpen === undefined) setIsOpen(true);
				onOpenChange?.(true);
			}
		},
	};

	return el as HTMLElement;
}

// ── MenubarTrigger ───────────────────────────────────────────────────────────

export function MenubarTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, on, ...rest } = props;

	const el = buttonTag({
		"data-slot": "menubar-trigger",
		type: "button",
		role: "menuitem",
		class: cnReactive(
			"flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
			className,
		),
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				const menuEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=menubar-menu]",
				);
				if (menuEl) (menuEl as ElementWithContext).__menubarMenu?.toggle();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	queueMicrotask(() => {
		const menuEl = el.closest("[data-slot=menubar-menu]");
		if (menuEl) {
			const ctx = (menuEl as ElementWithContext).__menubarMenu;
			if (ctx) {
				effect(() => {
					el.setAttribute("data-state", ctx.isOpen() ? "open" : "closed");
				});
			}
		}
	});

	return el;
}

// ── MenubarContent ───────────────────────────────────────────────────────────

export interface MenubarContentProps extends BaseProps {
	align?: "start" | "center" | "end";
	side?: "top" | "bottom";
	sideOffset?: number;
}

export function MenubarContent(
	first?: MenubarContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<MenubarContentProps>(first, second);
	const {
		class: className,
		align = "start",
		side = "bottom",
		sideOffset = 8,
		nodes,
		...rest
	} = props;

	const content = div({
		"data-slot": "menubar-content",
		role: "menu",
		class: cnReactive(
			"z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
			className,
		),
		style: {
			position: "absolute",
			...(side === "bottom" ? { top: `calc(100% + ${sideOffset}px)` } : {}),
			...(side === "top" ? { bottom: `calc(100% + ${sideOffset}px)` } : {}),
			...(align === "start" ? { left: "0" } : {}),
			...(align === "center"
				? { left: "50%", transform: "translateX(-50%)" }
				: {}),
			...(align === "end" ? { right: "0" } : {}),
		} as Record<string, string>,
		nodes,
		...rest,
	}) as HTMLElement;

	const handleOutsideClick = (ev: MouseEvent) => {
		const menuEl = content.closest("[data-slot=menubar-menu]");
		if (menuEl && !menuEl.contains(ev.target as Node)) {
			// Also check portaled sub-contents
			let insidePortaled = false;
			document
				.querySelectorAll("[data-slot=menubar-sub-content]")
				.forEach((sc) => {
					if ((sc as HTMLElement).contains(ev.target as Node))
						insidePortaled = true;
				});
			if (!insidePortaled)
				(menuEl as ElementWithContext).__menubarMenu?.close();
		}
	};

	const handleKeydown = (ev: KeyboardEvent) => {
		if (ev.key === "Escape") {
			const menuEl = content.closest("[data-slot=menubar-menu]");
			if (menuEl) (menuEl as ElementWithContext).__menubarMenu?.close();
		}
	};

	queueMicrotask(() => {
		const menuEl = content.closest("[data-slot=menubar-menu]");
		if (menuEl) {
			const ctx = (menuEl as ElementWithContext).__menubarMenu;
			if (ctx) {
				effect(() => {
					const open = ctx.isOpen();
					content.style.display = open ? "" : "none";
					content.setAttribute("data-state", open ? "open" : "closed");
					if (open) {
						document.addEventListener("mousedown", handleOutsideClick);
						document.addEventListener("keydown", handleKeydown);
					} else {
						document.removeEventListener("mousedown", handleOutsideClick);
						document.removeEventListener("keydown", handleKeydown);
					}
				});
				registerDisposer(content, () => {
					document.removeEventListener("mousedown", handleOutsideClick);
					document.removeEventListener("keydown", handleKeydown);
				});
			}
		}
	});

	return content;
}

// ── MenubarGroup ─────────────────────────────────────────────────────────────

export function MenubarGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, ...rest } = props;
	return div({
		"data-slot": "menubar-group",
		role: "group",
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── MenubarLabel ─────────────────────────────────────────────────────────────

export interface MenubarLabelProps extends BaseProps {
	inset?: boolean;
}

export function MenubarLabel(
	first?: MenubarLabelProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<MenubarLabelProps>(first, second);
	const { class: className, inset, nodes, ...rest } = props;
	return div({
		"data-slot": "menubar-label",
		"data-inset": inset,
		class: cnReactive(
			"px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── MenubarItem ──────────────────────────────────────────────────────────────

export interface MenubarItemProps extends BaseProps {
	inset?: boolean;
	variant?: "default" | "destructive";
	disabled?: boolean;
	onSelect?: () => void;
}

export function MenubarItem(
	first?: MenubarItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<MenubarItemProps>(first, second);
	const {
		class: className,
		inset,
		variant = "default",
		disabled,
		onSelect,
		nodes,
		on,
		...rest
	} = props;

	const el = div({
		"data-slot": "menubar-item",
		"data-inset": inset,
		"data-variant": variant,
		"data-disabled": disabled ? "" : undefined,
		role: "menuitem",
		tabindex: disabled ? undefined : "0",
		class: cn(
			"relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;

	el.addEventListener("click", (ev: Event) => {
		if (disabled) return;
		onSelect?.();
		// Close from root menu or portaled sub-content
		const menuEl =
			el.closest("[data-slot=menubar-menu]") ??
			(el.closest("[data-slot=menubar-sub-content]") as ElementWithContext)
				?.__menubarRoot;
		if (menuEl) (menuEl as ElementWithContext).__menubarMenu?.close();
		(on as Record<string, (ev: Event) => void>)?.click?.(ev);
	});

	return el;
}

// ── MenubarSeparator ─────────────────────────────────────────────────────────

export function MenubarSeparator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return div({
		"data-slot": "menubar-separator",
		role: "separator",
		class: cnReactive("-mx-1 my-1 h-px bg-border", className),
		...rest,
	}) as HTMLElement;
}

// ── MenubarShortcut ──────────────────────────────────────────────────────────

export function MenubarShortcut(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return span({
		"data-slot": "menubar-shortcut",
		class: cnReactive(
			"ml-auto text-xs tracking-widest text-muted-foreground",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── MenubarCheckboxItem ──────────────────────────────────────────────────────

export interface MenubarCheckboxItemProps extends BaseProps {
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
}

export function MenubarCheckboxItem(
	first?: MenubarCheckboxItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<MenubarCheckboxItemProps>(first, second);
	const {
		class: className,
		checked = false,
		onCheckedChange,
		disabled,
		nodes,
		on,
		...rest
	} = props;
	const [isChecked, setIsChecked] = signal(checked);

	return div(
		{
			"data-slot": "menubar-checkbox-item",
			role: "menuitemcheckbox",
			"aria-checked": () => String(isChecked()),
			"data-disabled": disabled ? "" : undefined,
			tabindex: disabled ? undefined : "0",
			class: cn(
				"relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			),
			on: {
				...on,
				click: (ev: Event) => {
					if (disabled) return;
					const next = !isChecked();
					setIsChecked(next);
					onCheckedChange?.(next);
					(on as Record<string, (ev: Event) => void>)?.click?.(ev);
				},
			},
			...rest,
		},
		[
			span(
				{
					class:
						"pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
				},
				() => (isChecked() ? [CheckIcon({ class: "size-4" })] : []),
			),
			...toNodes(nodes),
		],
	) as HTMLElement;
}

// ── MenubarRadioGroup ────────────────────────────────────────────────────────

export interface MenubarRadioGroupProps extends BaseProps {
	value?: string;
	onValueChange?: (value: string) => void;
}

export function MenubarRadioGroup(
	first?: MenubarRadioGroupProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<MenubarRadioGroupProps>(first, second);
	const { value: controlledValue, onValueChange, nodes, ...rest } = props;
	const [value, setValue] = signal(controlledValue ?? "");

	const el = div({
		"data-slot": "menubar-radio-group",
		role: "group",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__menubarRadioGroup = {
		value,
		setValue: (v: string) => {
			if (controlledValue === undefined) setValue(v);
			onValueChange?.(v);
		},
	};

	return el;
}

// ── MenubarRadioItem ─────────────────────────────────────────────────────────

export interface MenubarRadioItemProps extends BaseProps {
	value: string;
	disabled?: boolean;
}

export function MenubarRadioItem(
	first?: MenubarRadioItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<MenubarRadioItemProps>(first, second);
	const { class: className, value, disabled, nodes, on, ...rest } = props;

	const indicator = span({
		"data-slot": "menubar-radio-indicator",
		class:
			"pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
	});

	const el = div(
		{
			"data-slot": "menubar-radio-item",
			role: "menuitemradio",
			"data-disabled": disabled ? "" : undefined,
			tabindex: disabled ? undefined : "0",
			class: cn(
				"relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			),
			on: {
				...on,
				click: (ev: Event) => {
					if (disabled) return;
					const groupEl = el.closest("[data-slot=menubar-radio-group]");
					if (groupEl)
						(groupEl as ElementWithContext).__menubarRadioGroup?.setValue(
							value,
						);
					(on as Record<string, (ev: Event) => void>)?.click?.(ev);
				},
			},
			...rest,
		},
		[indicator, ...toNodes(nodes)],
	) as HTMLElement;

	queueMicrotask(() => {
		const groupEl = el.closest("[data-slot=menubar-radio-group]");
		if (groupEl) {
			const ctx = (groupEl as ElementWithContext).__menubarRadioGroup;
			if (ctx) {
				effect(() => {
					const checked = ctx.value() === value;
					el.setAttribute("aria-checked", String(checked));
					indicator.innerHTML = "";
					if (checked)
						indicator.appendChild(CircleIcon({ class: "size-2 fill-current" }));
				});
			}
		}
	});

	return el;
}

// ── MenubarSub ───────────────────────────────────────────────────────────────

export function MenubarSub(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, ...rest } = props;
	const [isOpen, setIsOpen] = signal(false);
	let closeTimer: ReturnType<typeof setTimeout> | undefined;

	const el = div({
		"data-slot": "menubar-sub",
		style: "position: relative",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__menubarSub = {
		isOpen,
		open: () => {
			if (closeTimer) {
				clearTimeout(closeTimer);
				closeTimer = undefined;
			}
			setIsOpen(true);
		},
		close: () => {
			closeTimer = setTimeout(() => {
				setIsOpen(false);
				closeTimer = undefined;
			}, 100);
		},
		closeImmediate: () => {
			if (closeTimer) {
				clearTimeout(closeTimer);
				closeTimer = undefined;
			}
			setIsOpen(false);
		},
	};

	el.addEventListener("mouseenter", () => {
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = undefined;
		}
	});
	el.addEventListener("mouseleave", () => {
		(el as ElementWithContext).__menubarSub?.close();
	});

	return el;
}

// ── MenubarSubTrigger ────────────────────────────────────────────────────────

export interface MenubarSubTriggerProps extends BaseProps {
	inset?: boolean;
}

export function MenubarSubTrigger(
	first?: MenubarSubTriggerProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<MenubarSubTriggerProps>(first, second);
	const { class: className, inset, nodes, on, ...rest } = props;

	const el = div(
		{
			"data-slot": "menubar-sub-trigger",
			"data-inset": inset,
			class: cnReactive(
				"flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
				className,
			),
			...rest,
		},
		[...toNodes(nodes), ChevronRightIcon({ class: "ml-auto h-4 w-4" })],
	) as HTMLElement;

	el.addEventListener("mouseenter", () => {
		const subEl = el.closest("[data-slot=menubar-sub]");
		if (subEl) (subEl as ElementWithContext).__menubarSub?.open();
	});

	return el;
}

// ── MenubarSubContent ────────────────────────────────────────────────────────

export function MenubarSubContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	const content = div({
		"data-slot": "menubar-sub-content",
		role: "menu",
		class: cnReactive(
			"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
			className,
		),
		style: { position: "fixed", zIndex: "50" },
		nodes,
		...rest,
	}) as HTMLElement;

	queueMicrotask(() => {
		const subEl = content.closest("[data-slot=menubar-sub]");
		if (!subEl) return;
		const ctx = (subEl as ElementWithContext).__menubarSub;
		if (!ctx) return;

		// Store root menu reference before portaling
		const rootMenu = subEl.closest("[data-slot=menubar-menu]");
		if (rootMenu)
			(content as ElementWithContext).__menubarRoot = rootMenu as HTMLElement;

		// Portal to body
		document.body.appendChild(content);

		effect(() => {
			const open = ctx.isOpen();
			content.style.display = open ? "" : "none";
			content.setAttribute("data-state", open ? "open" : "closed");
			if (open) {
				const trigger = subEl.querySelector("[data-slot=menubar-sub-trigger]");
				if (trigger) {
					const rect = trigger.getBoundingClientRect();
					content.style.left = `${rect.right + 2}px`;
					content.style.top = `${rect.top}px`;
				}
			}
		});

		content.addEventListener("mouseenter", () => ctx.open());
		content.addEventListener("mouseleave", () => ctx.close());
	});

	return content;
}
