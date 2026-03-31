import { cva } from "class-variance-authority";
import {
	a as aTag,
	button as buttonTag,
	div,
	effect,
	li,
	main as mainTag,
	type NodeChildren,
	signal,
	span,
	ul,
} from "sibujs";
import { PanelLeftIcon } from "../icons";
import { cn, cnReactive } from "../lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "./sheet";
import { Skeleton } from "./skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

// ── Constants ────────────────────────────────────────────────────────────────

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SIDEBAR_CSS_VARS = {
	"--sidebar-width": SIDEBAR_WIDTH,
	"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
} as Record<string, string>;

// ── SidebarProvider ──────────────────────────────────────────────────────────

export interface SidebarProviderProps extends BaseProps {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function SidebarProvider(
	first?: SidebarProviderProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SidebarProviderProps>(first, second);
	const {
		class: className,
		defaultOpen = true,
		open: controlledOpen,
		onOpenChange,
		nodes,
		style,
		...rest
	} = props;

	const [isOpen, setIsOpen] = signal(controlledOpen ?? defaultOpen);
	const [isMobile, setIsMobile] = signal(false);
	const [openMobile, setOpenMobile] = signal(false);

	const el = div({
		"data-slot": "sidebar-wrapper",
		class: cnReactive(
			"group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
			className,
		),
		style: {
			...SIDEBAR_CSS_VARS,
			...(typeof style === "object" &&
			style !== null &&
			!Array.isArray(style) &&
			typeof style !== "function"
				? (style as Record<string, string>)
				: {}),
		} as Record<string, string>,
		nodes,
		...rest,
	}) as HTMLElement;

	const setOpen = (value: boolean) => {
		if (controlledOpen === undefined) setIsOpen(value);
		onOpenChange?.(value);
		// biome-ignore lint/suspicious/noDocumentCookie: intentional cookie for sidebar state persistence
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	};

	const toggleSidebar = () => {
		if (isMobile()) {
			setOpenMobile(!openMobile());
		} else {
			setOpen(!isOpen());
		}
	};

	// Expose context
	(el as ElementWithContext).__sidebar = {
		state: () => (isOpen() ? "expanded" : "collapsed"),
		isOpen,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar,
	};

	// Reactive data-sidebar-state
	queueMicrotask(() => {
		effect(() => {
			el.setAttribute(
				"data-sidebar-state",
				isOpen() ? "expanded" : "collapsed",
			);
		});
	});

	// Mobile breakpoint detection
	if (typeof window !== "undefined") {
		const mql = window.matchMedia("(max-width: 768px)");
		setIsMobile(mql.matches);
		mql.addEventListener("change", (e) => setIsMobile(e.matches));

		// Keyboard shortcut: Ctrl/Cmd+B
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
	}

	return el;
}

// ── useSidebar (DOM-based context access) ────────────────────────────────────

export function useSidebar(el: HTMLElement) {
	const provider = el.closest("[data-slot=sidebar-wrapper]");
	if (!provider)
		throw new Error("useSidebar must be used within a SidebarProvider.");
	return (provider as ElementWithContext).__sidebar;
}

// ── Sidebar ──────────────────────────────────────────────────────────────────

export interface SidebarProps extends BaseProps {
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	collapsible?: "offcanvas" | "icon" | "none";
}

export function Sidebar(
	first?: SidebarProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SidebarProps>(first, second);
	const {
		class: className,
		side = "left",
		variant = "sidebar",
		collapsible = "offcanvas",
		nodes,
		...rest
	} = props;

	if (collapsible === "none") {
		return div({
			"data-slot": "sidebar",
			class: cn(
				"flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
				className,
			),
			nodes,
			...rest,
		}) as HTMLElement;
	}

	// Inner sidebar content wrapper
	const inner = div({
		"data-sidebar": "sidebar",
		"data-slot": "sidebar-inner",
		class:
			"flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm",
		nodes,
	}) as HTMLElement;

	// Gap element
	const gapEl = div({
		"data-slot": "sidebar-gap",
		class: cn(
			"relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
			"group-data-[collapsible=offcanvas]:w-0",
			"group-data-[side=right]:rotate-180",
			variant === "floating" || variant === "inset"
				? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
				: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
		),
	}) as HTMLElement;

	// Container (fixed)
	const containerEl = div({
		"data-slot": "sidebar-container",
		class: cn(
			"fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
			side === "left"
				? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
				: "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
			variant === "floating" || variant === "inset"
				? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
				: "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
			className,
		),
		nodes: [inner],
		...rest,
	}) as HTMLElement;

	// Desktop sidebar wrapper
	const sidebarEl = div({
		"data-slot": "sidebar",
		"data-side": side,
		"data-variant": variant,
		"data-collapsible": "",
		class: "group peer hidden text-sidebar-foreground md:block",
		nodes: [gapEl, containerEl],
	}) as HTMLElement;

	// Mobile sidebar (Sheet)
	const _mobileSheet = (() => {
		const sheetEl = Sheet({}) as HTMLElement;
		return sheetEl;
	})();

	// Wrapper that holds both desktop and mobile
	const wrapper = document.createDocumentFragment();
	wrapper.appendChild(sidebarEl);

	// Bind reactive state after mount
	queueMicrotask(() => {
		const providerEl = sidebarEl.closest("[data-slot=sidebar-wrapper]");
		if (!providerEl) return;
		const ctx = (providerEl as ElementWithContext).__sidebar;
		if (!ctx) return;

		// Desktop: reactive data-state and data-collapsible
		effect(() => {
			const state = ctx.isOpen() ? "expanded" : "collapsed";
			sidebarEl.setAttribute("data-state", state);
			sidebarEl.setAttribute(
				"data-collapsible",
				state === "collapsed" ? collapsible : "",
			);
		});

		// Mobile: render Sheet when on mobile
		let mobileEl: HTMLElement | null = null;

		effect(() => {
			const mobile = ctx.isMobile();
			const mobileOpen = ctx.openMobile();

			if (mobile && !mobileEl) {
				// Create mobile sheet
				mobileEl = Sheet({
					open: mobileOpen,
					onOpenChange: (open: boolean) => ctx.setOpenMobile(open),
					nodes: [
						SheetContent({
							"data-sidebar": "sidebar",
							"data-slot": "sidebar",
							"data-mobile": "true",
							class:
								"w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
							style: {
								"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
							} as Record<string, string>,
							side,
							nodes: [
								SheetHeader({
									class: "sr-only",
									nodes: [
										SheetTitle({ nodes: "Sidebar" }),
										SheetDescription({
											nodes: "Displays the mobile sidebar.",
										}),
									],
								}),
								div({
									class: "flex h-full w-full flex-col",
									nodes: inner.cloneNode(true) as Node,
								}),
							],
						}),
					],
				}) as HTMLElement;
				sidebarEl.parentElement?.insertBefore(mobileEl, sidebarEl);
			}

			if (mobileEl) {
				// Update sheet open state
				const sheetCtx = (mobileEl as ElementWithContext).__dialog;
				if (sheetCtx) {
					if (mobileOpen && !sheetCtx.isOpen?.()) {
						sheetCtx.open?.();
					} else if (!mobileOpen && sheetCtx.isOpen?.()) {
						sheetCtx.close?.();
					}
				}
			}

			if (!mobile && mobileEl) {
				mobileEl.remove();
				mobileEl = null;
			}
		});
	});

	return sidebarEl;
}

// ── SidebarTrigger ───────────────────────────────────────────────────────────

export function SidebarTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, on, ...rest } = props;

	return Button({
		"data-slot": "sidebar-trigger",
		"data-sidebar": "trigger",
		variant: "ghost",
		size: "icon",
		class: cnReactive("size-7", className),
		nodes: [
			PanelLeftIcon({ class: "size-4" }),
			span({ class: "sr-only", nodes: "Toggle Sidebar" }),
			...((Array.isArray(nodes)
				? nodes
				: nodes != null
					? [nodes]
					: []) as Node[]),
		],
		on: {
			...(on as Record<string, (ev: Event) => void>),
			click: (ev: Event) => {
				const providerEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=sidebar-wrapper]",
				);
				if (providerEl)
					(providerEl as ElementWithContext).__sidebar?.toggleSidebar();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

// ── SidebarRail ──────────────────────────────────────────────────────────────

export function SidebarRail(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, on, ...rest } = props;
	return buttonTag({
		"data-slot": "sidebar-rail",
		"data-sidebar": "rail",
		type: "button",
		"aria-label": "Toggle Sidebar",
		title: "Toggle Sidebar",
		tabindex: "-1",
		class: cnReactive(
			"absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
			"in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
			"[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
			"group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
			"[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
			"[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
			className,
		),
		on: {
			...(on as Record<string, (ev: Event) => void>),
			click: (ev: Event) => {
				const providerEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=sidebar-wrapper]",
				);
				if (providerEl)
					(providerEl as ElementWithContext).__sidebar?.toggleSidebar();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

// ── SidebarInset ─────────────────────────────────────────────────────────────

export function SidebarInset(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return mainTag({
		"data-slot": "sidebar-inset",
		class: cnReactive(
			"relative flex w-full flex-1 flex-col bg-background",
			"md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarInput ─────────────────────────────────────────────────────────────

export function SidebarInput(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return Input({
		"data-slot": "sidebar-input",
		"data-sidebar": "input",
		class: cnReactive("h-8 w-full bg-background shadow-none", className),
		...rest,
	}) as HTMLElement;
}

// ── SidebarHeader ────────────────────────────────────────────────────────────

export function SidebarHeader(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		class: cnReactive("flex flex-col gap-2 p-2", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarFooter ────────────────────────────────────────────────────────────

export function SidebarFooter(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		class: cnReactive("flex flex-col gap-2 p-2", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarSeparator ─────────────────────────────────────────────────────────

export function SidebarSeparator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return Separator({
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		class: cnReactive("mx-2 w-auto bg-sidebar-border", className),
		...rest,
	}) as HTMLElement;
}

// ── SidebarContent ───────────────────────────────────────────────────────────

export function SidebarContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		class: cnReactive(
			"flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarGroup ─────────────────────────────────────────────────────────────

export function SidebarGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		class: cnReactive("relative flex w-full min-w-0 flex-col p-2", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarGroupLabel ────────────────────────────────────────────────────────

export function SidebarGroupLabel(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "sidebar-group-label",
		"data-sidebar": "group-label",
		class: cnReactive(
			"flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
			"group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarGroupAction ───────────────────────────────────────────────────────

export function SidebarGroupAction(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, on, ...rest } = props;
	return buttonTag({
		"data-slot": "sidebar-group-action",
		"data-sidebar": "group-action",
		type: "button",
		class: cnReactive(
			"absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
			"after:absolute after:-inset-2 md:after:hidden",
			"group-data-[collapsible=icon]:hidden",
			className,
		),
		nodes,
		on,
		...rest,
	}) as HTMLElement;
}

// ── SidebarGroupContent ──────────────────────────────────────────────────────

export function SidebarGroupContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "sidebar-group-content",
		"data-sidebar": "group-content",
		class: cnReactive("w-full text-sm", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarMenu ──────────────────────────────────────────────────────────────

export function SidebarMenu(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return ul({
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		class: cnReactive("flex w-full min-w-0 flex-col gap-1", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarMenuItem ──────────────────────────────────────────────────────────

export function SidebarMenuItem(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return li({
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		class: cnReactive("group/menu-item relative", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarMenuButton ────────────────────────────────────────────────────────

const sidebarMenuButtonVariants = cva(
	"peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				outline:
					"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
			},
			size: {
				default: "h-8 text-sm",
				sm: "h-7 text-xs",
				lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface SidebarMenuButtonProps extends BaseProps {
	isActive?: boolean;
	variant?: "default" | "outline";
	size?: "default" | "sm" | "lg";
	tooltip?: string | Record<string, unknown>;
}

export function SidebarMenuButton(
	first?: SidebarMenuButtonProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SidebarMenuButtonProps>(first, second);
	const {
		class: className,
		isActive = false,
		variant = "default",
		size = "default",
		tooltip,
		nodes,
		on,
		...rest
	} = props;

	const btn = buttonTag({
		"data-slot": "sidebar-menu-button",
		"data-sidebar": "menu-button",
		"data-size": size,
		"data-active": isActive ? "true" : "false",
		type: "button",
		class: cnReactive(sidebarMenuButtonVariants({ variant, size }), className),
		nodes,
		on,
		...rest,
	}) as HTMLElement;

	if (!tooltip) return btn;

	// Wrap in Tooltip — only visible when sidebar is collapsed (not mobile)
	const tooltipProps =
		typeof tooltip === "string" ? { nodes: tooltip } : tooltip;

	const tooltipEl = Tooltip({
		nodes: [
			TooltipTrigger({ nodes: [btn] }),
			TooltipContent({
				side: "right",
				align: "center",
				...tooltipProps,
			}),
		],
	}) as HTMLElement;

	// Hide tooltip when sidebar is expanded
	queueMicrotask(() => {
		const providerEl = tooltipEl.closest("[data-slot=sidebar-wrapper]");
		if (providerEl) {
			const ctx = (providerEl as ElementWithContext).__sidebar;
			if (ctx) {
				const content = tooltipEl.querySelector(
					"[data-slot=tooltip-content]",
				) as HTMLElement | null;
				if (content) {
					effect(() => {
						const hidden = ctx.state() !== "collapsed" || ctx.isMobile();
						content.style.display = hidden ? "none" : "";
					});
				}
			}
		}
	});

	return tooltipEl;
}

// ── SidebarMenuAction ────────────────────────────────────────────────────────

export interface SidebarMenuActionProps extends BaseProps {
	showOnHover?: boolean;
}

export function SidebarMenuAction(
	first?: SidebarMenuActionProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SidebarMenuActionProps>(first, second);
	const { class: className, showOnHover, nodes, on, ...rest } = props;
	return buttonTag({
		"data-slot": "sidebar-menu-action",
		"data-sidebar": "menu-action",
		type: "button",
		class: cnReactive(
			"absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
			"after:absolute after:-inset-2 md:after:hidden",
			"peer-data-[size=sm]/menu-button:top-1",
			"peer-data-[size=default]/menu-button:top-1.5",
			"peer-data-[size=lg]/menu-button:top-2.5",
			"group-data-[collapsible=icon]:hidden",
			showOnHover &&
				"group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100 md:opacity-0",
			className,
		),
		nodes,
		on,
		...rest,
	}) as HTMLElement;
}

// ── SidebarMenuBadge ─────────────────────────────────────────────────────────

export function SidebarMenuBadge(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "sidebar-menu-badge",
		"data-sidebar": "menu-badge",
		class: cnReactive(
			"pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none",
			"peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
			"peer-data-[size=sm]/menu-button:top-1",
			"peer-data-[size=default]/menu-button:top-1.5",
			"peer-data-[size=lg]/menu-button:top-2.5",
			"group-data-[collapsible=icon]:hidden",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarMenuSkeleton ──────────────────────────────────────────────────────

export interface SidebarMenuSkeletonProps extends BaseProps {
	showIcon?: boolean;
}

export function SidebarMenuSkeleton(
	first?: SidebarMenuSkeletonProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SidebarMenuSkeletonProps>(first, second);
	const { class: className, showIcon = false, ...rest } = props;

	const width = `${Math.floor(Math.random() * 40) + 50}%`;

	const skeletonNodes: Node[] = [];
	if (showIcon) {
		skeletonNodes.push(
			Skeleton({
				class: "size-4 rounded-md",
				"data-sidebar": "menu-skeleton-icon",
			}) as Node,
		);
	}
	skeletonNodes.push(
		Skeleton({
			class: "h-4 max-w-(--skeleton-width) flex-1",
			"data-sidebar": "menu-skeleton-text",
			style: {
				"--skeleton-width": width,
			} as Record<string, string>,
		}) as Node,
	);

	return div({
		"data-slot": "sidebar-menu-skeleton",
		"data-sidebar": "menu-skeleton",
		class: cnReactive("flex h-8 items-center gap-2 rounded-md px-2", className),
		nodes: skeletonNodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarMenuSub ───────────────────────────────────────────────────────────

export function SidebarMenuSub(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return ul({
		"data-slot": "sidebar-menu-sub",
		"data-sidebar": "menu-sub",
		class: cnReactive(
			"mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
			"group-data-[collapsible=icon]:hidden",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarMenuSubItem ───────────────────────────────────────────────────────

export function SidebarMenuSubItem(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return li({
		"data-slot": "sidebar-menu-sub-item",
		"data-sidebar": "menu-sub-item",
		class: cnReactive("group/menu-sub-item relative", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── SidebarMenuSubButton ─────────────────────────────────────────────────────

export interface SidebarMenuSubButtonProps extends BaseProps {
	isActive?: boolean;
	size?: "sm" | "md";
	href?: string;
}

export function SidebarMenuSubButton(
	first?: SidebarMenuSubButtonProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SidebarMenuSubButtonProps>(first, second);
	const {
		class: className,
		isActive = false,
		size = "md",
		href,
		nodes,
		on,
		...rest
	} = props;

	const tag = href ? aTag : buttonTag;
	const tagProps: Record<string, unknown> = {
		"data-slot": "sidebar-menu-sub-button",
		"data-sidebar": "menu-sub-button",
		"data-size": size,
		"data-active": isActive ? "true" : "false",
		class: cnReactive(
			"flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
			"data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
			size === "sm" && "text-xs",
			size === "md" && "text-sm",
			"group-data-[collapsible=icon]:hidden",
			className,
		),
		nodes,
		on,
		...rest,
	};
	if (href) tagProps.href = href;
	if (!href) tagProps.type = "button";

	return tag(tagProps) as HTMLElement;
}
