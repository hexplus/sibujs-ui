import { cva } from "class-variance-authority";
import {
	a as aTag,
	button as buttonTag,
	div,
	effect,
	type NodeChildren,
	registerDisposer,
	signal,
} from "sibujs";
import { ChevronDownIcon } from "../icons";
import { cn, cnReactive } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toNodes,
} from "./types";

// ── Trigger Style CVA ────────────────────────────────────────────────────────

export const navigationMenuTriggerStyle = cva(
	"group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent",
);

// ── NavigationMenu ───────────────────────────────────────────────────────────

export interface NavigationMenuProps extends BaseProps {
	viewport?: boolean;
}

export function NavigationMenu(
	first?: NavigationMenuProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<NavigationMenuProps>(first, second);
	const { class: className, viewport = false, nodes, ...rest } = props;

	const [activeItem, setActiveItem] = signal<string | null>(null);

	const childNodes = toNodes(nodes);
	if (viewport) childNodes.push(NavigationMenuViewport() as Node);

	const el = div(
		{
			"data-slot": "navigation-menu",
			"data-viewport": viewport,
			class: cnReactive(
				"group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
				className,
			),
			...rest,
		},
		childNodes,
	) as HTMLElement;

	(el as ElementWithContext).__navMenu = {
		activeItem,
		setActiveItem,
		open: (id: string) => setActiveItem(id),
		close: () => setActiveItem(null),
	};

	// Close on outside click
	const handleOutsideClick = (ev: MouseEvent) => {
		if (!el.contains(ev.target as Node)) setActiveItem(null);
	};
	const handleKeydown = (ev: KeyboardEvent) => {
		if (ev.key === "Escape") setActiveItem(null);
	};

	effect(() => {
		if (activeItem() !== null) {
			document.addEventListener("mousedown", handleOutsideClick);
			document.addEventListener("keydown", handleKeydown);
		} else {
			document.removeEventListener("mousedown", handleOutsideClick);
			document.removeEventListener("keydown", handleKeydown);
		}
	});

	// Ensure listeners are detached if the element is unmounted while the
	// menu is still open — otherwise they'd leak.
	registerDisposer(el, () => {
		document.removeEventListener("mousedown", handleOutsideClick);
		document.removeEventListener("keydown", handleKeydown);
	});

	return el;
}

// ── NavigationMenuList ───────────────────────────────────────────────────────

export function NavigationMenuList(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "navigation-menu-list",
		class: cnReactive(
			"group flex flex-1 list-none items-center justify-center gap-1",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── NavigationMenuItem ───────────────────────────────────────────────────────

export interface NavigationMenuItemProps extends BaseProps {
	value?: string;
}

export function NavigationMenuItem(
	first?: NavigationMenuItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<NavigationMenuItemProps>(first, second);
	const { class: className, value, nodes, ...rest } = props;
	const itemId = value ?? `nav-item-${Math.random().toString(36).slice(2, 9)}`;

	const el = div({
		"data-slot": "navigation-menu-item",
		"data-value": itemId,
		class: cnReactive("relative", className),
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__navItemId = itemId;
	return el;
}

// ── NavigationMenuTrigger ────────────────────────────────────────────────────

export function NavigationMenuTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	const el = buttonTag(
		{
			"data-slot": "navigation-menu-trigger",
			type: "button",
			class: cn(navigationMenuTriggerStyle(), "group", className),
			...rest,
		},
		[
			...toNodes(nodes),
			ChevronDownIcon({
				class:
					"relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
				"aria-hidden": "true",
			}),
		],
	) as HTMLElement;

	el.addEventListener("click", () => {
		const itemEl = el.closest("[data-slot=navigation-menu-item]");
		const menuEl = el.closest("[data-slot=navigation-menu]");
		if (itemEl && menuEl) {
			const ctx = (menuEl as ElementWithContext).__navMenu;
			const itemId = (itemEl as ElementWithContext).__navItemId;
			if (ctx && itemId) {
				ctx.activeItem() === itemId ? ctx.close() : ctx.open(itemId);
			}
		}
	});

	queueMicrotask(() => {
		const itemEl = el.closest("[data-slot=navigation-menu-item]");
		const menuEl = el.closest("[data-slot=navigation-menu]");
		if (itemEl && menuEl) {
			const ctx = (menuEl as ElementWithContext).__navMenu;
			const itemId = (itemEl as ElementWithContext).__navItemId;
			if (ctx && itemId) {
				effect(() => {
					el.setAttribute(
						"data-state",
						ctx.activeItem() === itemId ? "open" : "closed",
					);
				});
			}
		}
	});

	return el;
}

// ── NavigationMenuContent ────────────────────────────────────────────────────

export function NavigationMenuContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	const content = div({
		"data-slot": "navigation-menu-content",
		style: "display: none",
		class: cnReactive(
			"absolute top-full left-0 z-50 mt-1.5 w-auto overflow-hidden rounded-md border bg-popover p-2 pr-2.5 text-popover-foreground shadow data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;

	queueMicrotask(() => {
		const itemEl = content.closest("[data-slot=navigation-menu-item]");
		const menuEl = content.closest("[data-slot=navigation-menu]");
		if (itemEl && menuEl) {
			const ctx = (menuEl as ElementWithContext).__navMenu;
			const itemId = (itemEl as ElementWithContext).__navItemId;
			if (ctx && itemId) {
				let closeTimer: ReturnType<typeof setTimeout> | undefined;
				effect(() => {
					const isActive = ctx.activeItem() === itemId;
					if (isActive) {
						if (closeTimer) {
							clearTimeout(closeTimer);
							closeTimer = undefined;
						}
						content.style.display = "";
						content.setAttribute("data-state", "open");
					} else {
						content.setAttribute("data-state", "closed");
						closeTimer = setTimeout(() => {
							content.style.display = "none";
							closeTimer = undefined;
						}, 200);
					}
				});
			}
		}
	});

	return content;
}

// ── NavigationMenuLink ───────────────────────────────────────────────────────

export interface NavigationMenuLinkProps extends BaseProps {
	href?: string;
	active?: boolean;
}

export function NavigationMenuLink(
	first?: NavigationMenuLinkProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<NavigationMenuLinkProps>(first, second);
	const { class: className, href, active, nodes, ...rest } = props;

	const el = aTag({
		"data-slot": "navigation-menu-link",
		href,
		"data-active": active ? "true" : undefined,
		class: cn(
			"flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;

	el.addEventListener("click", (_ev: Event) => {
		const menuEl = el.closest("[data-slot=navigation-menu]");
		if (menuEl) (menuEl as ElementWithContext).__navMenu?.close();
	});

	return el;
}

// ── NavigationMenuViewport ───────────────────────────────────────────────────

export function NavigationMenuViewport(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	const viewport = div({
		"data-slot": "navigation-menu-viewport",
		class: cnReactive(
			"origin-top-center relative mt-1.5 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;

	return div(
		{
			class: "absolute top-full left-0 isolate z-50 flex justify-center",
		},
		[viewport],
	) as HTMLElement;
}

// ── NavigationMenuIndicator ──────────────────────────────────────────────────

export function NavigationMenuIndicator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div(
		{
			"data-slot": "navigation-menu-indicator",
			class: cnReactive(
				"top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
				className,
			),
			...rest,
		},
		[
			div({
				class:
					"relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md",
			}),
			...toNodes(nodes),
		],
	) as HTMLElement;
}
