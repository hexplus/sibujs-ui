import {
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

export interface ContextMenuProps extends BaseProps {
	onOpenChange?: (open: boolean) => void;
}

export function ContextMenu(
	first?: ContextMenuProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ContextMenuProps>(first, second);
	const { onOpenChange, nodes, ...rest } = props;
	const [isOpen, setIsOpen] = signal(false);
	const [posX, setPosX] = signal(0);
	const [posY, setPosY] = signal(0);

	const el = div({
		"data-slot": "context-menu",
		style: "display: contents",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__contextMenu = {
		isOpen,
		posX,
		posY,
		open: (x: number, y: number) => {
			setPosX(x);
			setPosY(y);
			setIsOpen(true);
			onOpenChange?.(true);
		},
		close: () => {
			setIsOpen(false);
			onOpenChange?.(false);
		},
	};

	return el as HTMLElement;
}

export function ContextMenuTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;
	return div({
		"data-slot": "context-menu-trigger",
		nodes,
		on: {
			...on,
			contextmenu: (ev: Event) => {
				ev.preventDefault();
				const mouseEv = ev as MouseEvent;
				const menuEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=context-menu]",
				);
				if (menuEl)
					(menuEl as ElementWithContext).__contextMenu?.open(
						mouseEv.clientX,
						mouseEv.clientY,
					);
				(on as Record<string, (ev: Event) => void>)?.contextmenu?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

export interface ContextMenuContentProps extends BaseProps {}

export function ContextMenuContent(
	first?: ContextMenuContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ContextMenuContentProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	const content = div({
		"data-slot": "context-menu-content",
		role: "menu",
		class: cn(
			"z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
			className,
		),
		style: {
			position: "fixed",
		} as Record<string, string>,
		nodes,
		...rest,
	}) as HTMLElement;

	const handleOutsideClick = (ev: MouseEvent) => {
		if (!content.contains(ev.target as Node)) {
			const menuEl = content.closest("[data-slot=context-menu]");
			if (menuEl) (menuEl as ElementWithContext).__contextMenu?.close();
		}
	};

	const handleKeydown = (ev: KeyboardEvent) => {
		if (ev.key === "Escape") {
			const menuEl = content.closest("[data-slot=context-menu]");
			if (menuEl) (menuEl as ElementWithContext).__contextMenu?.close();
		}
	};

	queueMicrotask(() => {
		const menuEl = content.closest("[data-slot=context-menu]");
		if (menuEl) {
			const ctx = (menuEl as ElementWithContext).__contextMenu;
			if (ctx) {
				effect(() => {
					const open = ctx.isOpen();
					content.style.display = open ? "" : "none";
					content.setAttribute("data-state", open ? "open" : "closed");
					if (open) {
						content.style.left = `${ctx.posX()}px`;
						content.style.top = `${ctx.posY()}px`;
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

	return content as HTMLElement;
}

export function ContextMenuGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, ...rest } = props;
	return div({
		"data-slot": "context-menu-group",
		role: "group",
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface ContextMenuItemProps extends BaseProps {
	inset?: boolean;
	variant?: "default" | "destructive";
	disabled?: boolean;
	onSelect?: () => void;
}

export function ContextMenuItem(
	first?: ContextMenuItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ContextMenuItemProps>(first, second);
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
		"data-slot": "context-menu-item",
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
				const menuEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=context-menu]",
				);
				if (menuEl) (menuEl as ElementWithContext).__contextMenu?.close();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

export interface ContextMenuCheckboxItemProps extends BaseProps {
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
}

export function ContextMenuCheckboxItem(
	first?: ContextMenuCheckboxItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ContextMenuCheckboxItemProps>(first, second);
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
		"data-slot": "context-menu-checkbox-item",
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

export interface ContextMenuRadioGroupProps extends BaseProps {
	value?: string;
	onValueChange?: (value: string) => void;
}

export function ContextMenuRadioGroup(
	first?: ContextMenuRadioGroupProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ContextMenuRadioGroupProps>(first, second);
	const { value: val, onValueChange, nodes, ...rest } = props;
	const [currentValue, setCurrentValue] = signal(val ?? "");

	const el = div({
		"data-slot": "context-menu-radio-group",
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

export interface ContextMenuRadioItemProps extends BaseProps {
	value: string;
	disabled?: boolean;
}

export function ContextMenuRadioItem(
	first?: ContextMenuRadioItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ContextMenuRadioItemProps>(first, second);
	const { class: className, value: val, disabled, nodes, on, ...rest } = props;

	const indicatorWrapper = span({
		"data-slot": "context-menu-radio-indicator",
		class:
			"pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
	});

	const el = div({
		"data-slot": "context-menu-radio-item",
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
					"[data-slot=context-menu-radio-group]",
				);
				if (groupEl)
					(groupEl as ElementWithContext).__radioGroup?.setValue(val);
				const menuEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=context-menu]",
				);
				if (menuEl) (menuEl as ElementWithContext).__contextMenu?.close();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	// Reactively show/hide radio indicator
	queueMicrotask(() => {
		const groupEl = el.closest("[data-slot=context-menu-radio-group]");
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

export interface ContextMenuLabelProps extends BaseProps {
	inset?: boolean;
}

export function ContextMenuLabel(
	first?: ContextMenuLabelProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ContextMenuLabelProps>(first, second);
	const { class: className, inset, nodes, ...rest } = props;
	return div({
		"data-slot": "context-menu-label",
		"data-inset": inset,
		class: cnReactive(
			"px-2 py-1.5 text-sm font-medium text-foreground data-[inset]:pl-8",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function ContextMenuSeparator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return div({
		"data-slot": "context-menu-separator",
		role: "separator",
		class: cnReactive("-mx-1 my-1 h-px bg-border", className),
		...rest,
	}) as HTMLElement;
}

export function ContextMenuShortcut(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return span({
		"data-slot": "context-menu-shortcut",
		class: cnReactive(
			"ml-auto text-xs tracking-widest text-muted-foreground",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

export function ContextMenuSub(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, ...rest } = props;
	const [isOpen, setIsOpen] = signal(false);

	const el = div({
		"data-slot": "context-menu-sub",
		style: "position: relative",
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__contextSub = {
		isOpen,
		open: () => setIsOpen(true),
		close: () => setIsOpen(false),
	};

	return el as HTMLElement;
}

export interface ContextMenuSubTriggerProps extends BaseProps {
	inset?: boolean;
}

export function ContextMenuSubTrigger(
	first?: ContextMenuSubTriggerProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ContextMenuSubTriggerProps>(first, second);
	const { class: className, inset, nodes, on, ...rest } = props;
	return div({
		"data-slot": "context-menu-sub-trigger",
		"data-inset": inset,
		class: cn(
			"flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
			className,
		),
		nodes: [...toNodes(nodes), ChevronRightIcon({ class: "ml-auto size-4" })],
		on: {
			...on,
			mouseenter: (ev: Event) => {
				const subEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=context-menu-sub]",
				);
				if (subEl) (subEl as ElementWithContext).__contextSub?.open();
				(on as Record<string, (ev: Event) => void>)?.mouseenter?.(ev);
			},
			mouseleave: (ev: Event) => {
				const subEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=context-menu-sub]",
				);
				if (subEl) (subEl as ElementWithContext).__contextSub?.close();
				(on as Record<string, (ev: Event) => void>)?.mouseleave?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

export function ContextMenuSubContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	const content = div({
		"data-slot": "context-menu-sub-content",
		class: cn(
			"z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
			className,
		),
		style: {
			position: "absolute",
			left: "100%",
			top: "0",
		},
		nodes,
		...rest,
	}) as HTMLElement;

	queueMicrotask(() => {
		const subEl = content.closest("[data-slot=context-menu-sub]");
		if (subEl) {
			const ctx = (subEl as ElementWithContext).__contextSub;
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
