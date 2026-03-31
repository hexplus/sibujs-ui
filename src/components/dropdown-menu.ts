import {
	button as buttonTag,
	div,
	effect,
	type NodeChildren,
	signal,
	span,
} from "sibujs";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "../icons";
import { cn } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toNodes,
} from "./types";

export interface DropdownMenuProps extends BaseProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu(
	first?: DropdownMenuProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DropdownMenuProps>(first, second);
	const {
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		nodes,
		...rest
	} = props;
	const [isOpen, setIsOpen] = signal(controlledOpen ?? defaultOpen);

	const el = div({
		"data-slot": "dropdown-menu",
		style: "position: relative; display: inline-block",
		nodes,
		...rest,
	}) as HTMLElement;

	const closeAll = () => {
		// Close all sub-menus immediately
		el.querySelectorAll("[data-slot=dropdown-menu-sub]").forEach((sub) => {
			const ctx = (sub as ElementWithContext).__dropdownSub;
			if (ctx?.closeImmediate) ctx.closeImmediate();
			else if (ctx?.close) ctx.close();
		});
		// Also hide any portaled sub-contents that reference this root
		document
			.querySelectorAll("[data-slot=dropdown-menu-sub-content]")
			.forEach((sc) => {
				if ((sc as ElementWithContext).__dropdownRoot === el) {
					(sc as HTMLElement).style.display = "none";
				}
			});
		if (controlledOpen === undefined) setIsOpen(false);
		onOpenChange?.(false);
	};

	(el as ElementWithContext).__dropdown = {
		isOpen,
		open: () => {
			if (controlledOpen === undefined) setIsOpen(true);
			onOpenChange?.(true);
		},
		close: closeAll,
		toggle: () => {
			if (isOpen()) {
				closeAll();
			} else {
				if (controlledOpen === undefined) setIsOpen(true);
				onOpenChange?.(true);
			}
		},
	};

	return el as HTMLElement;
}

export function DropdownMenuTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;

	const el = buttonTag({
		"data-slot": "dropdown-menu-trigger",
		type: "button",
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				const menuEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=dropdown-menu]",
				);
				if (menuEl) (menuEl as ElementWithContext).__dropdown?.toggle();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	// Bind aria-expanded reactively
	queueMicrotask(() => {
		const menuEl = el.closest("[data-slot=dropdown-menu]");
		if (menuEl) {
			const ctx = (menuEl as ElementWithContext).__dropdown;
			if (ctx) {
				effect(() => {
					el.setAttribute("aria-expanded", String(ctx.isOpen()));
				});
			}
		}
	});

	return el;
}

export interface DropdownMenuContentProps extends BaseProps {
	align?: "start" | "center" | "end";
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
}

export function DropdownMenuContent(
	first?: DropdownMenuContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DropdownMenuContentProps>(first, second);
	const {
		class: className,
		align = "start",
		side = "bottom",
		sideOffset = 4,
		nodes,
		...rest
	} = props;

	const content = div({
		"data-slot": "dropdown-menu-content",
		"data-side": side,
		role: "menu",
		class: cn(
			"z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
			className,
		),
		style: {
			position: "absolute",
			...(side === "bottom" ? { top: `calc(100% + ${sideOffset}px)` } : {}),
			...(side === "top" ? { bottom: `calc(100% + ${sideOffset}px)` } : {}),
			...(side === "left" ? { right: `calc(100% + ${sideOffset}px)` } : {}),
			...(side === "right" ? { left: `calc(100% + ${sideOffset}px)` } : {}),
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
		const menuEl = content.closest("[data-slot=dropdown-menu]");
		if (menuEl && !menuEl.contains(ev.target as Node)) {
			(menuEl as ElementWithContext).__dropdown?.close();
		}
	};

	const handleKeydown = (ev: KeyboardEvent) => {
		if (ev.key === "Escape") {
			const menuEl = content.closest("[data-slot=dropdown-menu]");
			if (menuEl) (menuEl as ElementWithContext).__dropdown?.close();
		}
	};

	queueMicrotask(() => {
		const menuEl = content.closest("[data-slot=dropdown-menu]");
		if (menuEl) {
			const ctx = (menuEl as ElementWithContext).__dropdown;
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
			}
		}
	});

	return content as HTMLElement;
}

export function DropdownMenuGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, ...rest } = props;
	return div({
		"data-slot": "dropdown-menu-group",
		role: "group",
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface DropdownMenuItemProps extends BaseProps {
	inset?: boolean;
	variant?: "default" | "destructive";
	disabled?: boolean;
	onSelect?: () => void;
}

export function DropdownMenuItem(
	first?: DropdownMenuItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DropdownMenuItemProps>(first, second);
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
	return div({
		"data-slot": "dropdown-menu-item",
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
		on: {
			...on,
			click: (ev: Event) => {
				if (disabled) return;
				onSelect?.();
				const item = ev.currentTarget as HTMLElement;
				const menuEl =
					item.closest("[data-slot=dropdown-menu]") ??
					(
						item.closest(
							"[data-slot=dropdown-menu-sub-content]",
						) as ElementWithContext
					)?.__dropdownRoot;
				if (menuEl) (menuEl as ElementWithContext).__dropdown?.close();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

export interface DropdownMenuCheckboxItemProps extends BaseProps {
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
}

export function DropdownMenuCheckboxItem(
	first?: DropdownMenuCheckboxItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DropdownMenuCheckboxItemProps>(first, second);
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

	return div({
		"data-slot": "dropdown-menu-checkbox-item",
		role: "menuitemcheckbox",
		"aria-checked": () => String(isChecked()),
		"data-disabled": disabled ? "" : undefined,
		tabindex: disabled ? undefined : "0",
		class: cn(
			"relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			className,
		),
		nodes: [
			span({
				class:
					"pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
				nodes: () => (isChecked() ? [CheckIcon({ class: "size-4" })] : []),
			}),
			...toNodes(nodes),
		],
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
	}) as HTMLElement;
}

export interface DropdownMenuLabelProps extends BaseProps {
	inset?: boolean;
}

export function DropdownMenuLabel(
	first?: DropdownMenuLabelProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DropdownMenuLabelProps>(first, second);
	const { class: className, inset, nodes, ...rest } = props;
	return div({
		"data-slot": "dropdown-menu-label",
		"data-inset": inset,
		class: cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function DropdownMenuSeparator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return div({
		"data-slot": "dropdown-menu-separator",
		role: "separator",
		class: cn("-mx-1 my-1 h-px bg-border", className),
		...rest,
	}) as HTMLElement;
}

export function DropdownMenuShortcut(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return span({
		"data-slot": "dropdown-menu-shortcut",
		class: cn(
			"ml-auto text-xs tracking-widest text-muted-foreground",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface DropdownMenuRadioGroupProps extends BaseProps {
	value?: string;
	onValueChange?: (value: string) => void;
}

export function DropdownMenuRadioGroup(
	first?: DropdownMenuRadioGroupProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DropdownMenuRadioGroupProps>(first, second);
	const { value: val, onValueChange, nodes, ...rest } = props;
	const [currentValue, setCurrentValue] = signal(val ?? "");

	const el = div({
		"data-slot": "dropdown-menu-radio-group",
		role: "group",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__radioGroup = {
		value: currentValue,
		setValue: (v: string) => {
			setCurrentValue(v);
			onValueChange?.(v);
		},
	};

	return el as HTMLElement;
}

export interface DropdownMenuRadioItemProps extends BaseProps {
	value: string;
	disabled?: boolean;
}

export function DropdownMenuRadioItem(
	first?: DropdownMenuRadioItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DropdownMenuRadioItemProps>(first, second);
	const { class: className, value: val, disabled, nodes, on, ...rest } = props;

	const indicatorWrapper = span({
		"data-slot": "dropdown-menu-radio-indicator",
		class:
			"pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
	});

	const el = div({
		"data-slot": "dropdown-menu-radio-item",
		role: "menuitemradio",
		"data-disabled": disabled ? "" : undefined,
		tabindex: disabled ? undefined : "0",
		class: cn(
			"relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			className,
		),
		nodes: [indicatorWrapper, ...toNodes(nodes)],
		on: {
			...on,
			click: (ev: Event) => {
				if (disabled) return;
				const groupEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=dropdown-menu-radio-group]",
				);
				if (groupEl)
					(groupEl as ElementWithContext).__radioGroup?.setValue(val);
				const menuEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=dropdown-menu]",
				);
				if (menuEl) (menuEl as ElementWithContext).__dropdown?.close();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	// Reactively show/hide radio indicator
	queueMicrotask(() => {
		const groupEl = el.closest("[data-slot=dropdown-menu-radio-group]");
		if (groupEl) {
			const ctx = (groupEl as ElementWithContext).__radioGroup;
			if (ctx) {
				effect(() => {
					const isSelected = ctx.value() === val;
					el.setAttribute("aria-checked", String(isSelected));
					indicatorWrapper.innerHTML = "";
					if (isSelected) {
						indicatorWrapper.appendChild(
							CircleIcon({ class: "size-2 fill-current" }),
						);
					}
				});
			}
		}
	});

	return el as HTMLElement;
}

export function DropdownMenuSub(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, ...rest } = props;
	const [isOpen, setIsOpen] = signal(false);
	let closeTimer: ReturnType<typeof setTimeout> | undefined;

	const el = div({
		"data-slot": "dropdown-menu-sub",
		style: "position: relative",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__dropdownSub = {
		isOpen,
		open: () => {
			if (closeTimer) {
				clearTimeout(closeTimer);
				closeTimer = undefined;
			}
			setIsOpen(true);
		},
		close: () => {
			// Delay close so mouse can move from trigger to sub-content
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

	// Keep open while mouse is anywhere inside the sub container
	el.addEventListener("mouseenter", () => {
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = undefined;
		}
	});
	el.addEventListener("mouseleave", () => {
		(el as ElementWithContext).__dropdownSub?.close();
	});

	return el as HTMLElement;
}

export interface DropdownMenuSubTriggerProps extends BaseProps {
	inset?: boolean;
}

export function DropdownMenuSubTrigger(
	first?: DropdownMenuSubTriggerProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<DropdownMenuSubTriggerProps>(first, second);
	const { class: className, inset, nodes, on, ...rest } = props;
	return div({
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": inset,
		class: cn(
			"flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
			className,
		),
		nodes: [...toNodes(nodes), ChevronRightIcon({ class: "ml-auto size-4" })],
		on: {
			...on,
			mouseenter: (ev: Event) => {
				const subEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=dropdown-menu-sub]",
				);
				if (subEl) (subEl as ElementWithContext).__dropdownSub?.open();
				(on as Record<string, (ev: Event) => void>)?.mouseenter?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

export function DropdownMenuSubContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	const content = div({
		"data-slot": "dropdown-menu-sub-content",
		class: cn(
			"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
			className,
		),
		style: { position: "fixed", zIndex: "50" },
		nodes,
		...rest,
	}) as HTMLElement;

	queueMicrotask(() => {
		const subEl = content.closest("[data-slot=dropdown-menu-sub]");
		if (!subEl) return;
		const ctx = (subEl as ElementWithContext).__dropdownSub;
		if (!ctx) return;

		// Store root menu reference before portaling (for item click to close all)
		const rootMenu = subEl.closest("[data-slot=dropdown-menu]");
		if (rootMenu)
			(content as ElementWithContext).__dropdownRoot = rootMenu as HTMLElement;

		// Move to body so it's not clipped by parent overflow
		document.body.appendChild(content);

		effect(() => {
			const open = ctx.isOpen();
			content.style.display = open ? "" : "none";
			content.setAttribute("data-state", open ? "open" : "closed");

			if (open) {
				// Position relative to the sub-trigger
				const trigger = subEl.querySelector(
					"[data-slot=dropdown-menu-sub-trigger]",
				);
				if (trigger) {
					const rect = trigger.getBoundingClientRect();
					content.style.left = `${rect.right + 2}px`;
					content.style.top = `${rect.top}px`;
				}
			}
		});

		// Keep sub open when mouse enters the portaled content
		content.addEventListener("mouseenter", () => {
			ctx.open();
		});
		content.addEventListener("mouseleave", () => {
			ctx.close();
		});
	});

	return content as HTMLElement;
}
