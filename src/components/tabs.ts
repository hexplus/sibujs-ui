import { cva, type VariantProps } from "class-variance-authority";
import {
	button as buttonTag,
	div,
	effect,
	type NodeChildren,
	signal,
} from "sibujs";
import { cn, cnReactive } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

export interface TabsProps extends BaseProps {
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
	orientation?: "horizontal" | "vertical";
}

let tabsIdCounter = 0;

export function Tabs(
	first?: TabsProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<TabsProps>(first, second);
	const {
		class: className,
		defaultValue = "",
		value: controlledValue,
		onValueChange,
		orientation = "horizontal",
		nodes,
		...rest
	} = props;

	const [activeTab, setActiveTab] = signal(controlledValue ?? defaultValue);

	const el = div({
		"data-slot": "tabs",
		"data-orientation": orientation,
		class: cnReactive(
			"group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;

	const tabsId = `tabs-${++tabsIdCounter}`;

	(el as ElementWithContext).__tabs = {
		activeTab,
		tabsId,
		setActiveTab: (v: string) => {
			if (controlledValue === undefined) setActiveTab(v);
			onValueChange?.(v);
		},
	};

	return el as HTMLElement;
}

export const tabsListVariants = cva(
	"group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
	{
		variants: {
			variant: {
				default: "bg-muted",
				line: "gap-1 bg-transparent",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface TabsListProps
	extends BaseProps,
		VariantProps<typeof tabsListVariants> {}

export function TabsList(
	first?: TabsListProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<TabsListProps>(first, second);
	const { class: className, variant = "default", nodes, ...rest } = props;
	return div({
		"data-slot": "tabs-list",
		"data-variant": variant,
		role: "tablist",
		class: cnReactive(tabsListVariants({ variant }), className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface TabsTriggerProps extends BaseProps {
	value: string;
	disabled?: boolean;
}

export function TabsTrigger(
	first?: TabsTriggerProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<TabsTriggerProps>(first, second);
	const { class: className, value, disabled, nodes, on, ...rest } = props;

	const el = buttonTag({
		"data-slot": "tabs-trigger",
		"data-value": value,
		role: "tab",
		type: "button",
		disabled,
		class: cn(
			"relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			"group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
			"data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground",
			"after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
			className,
		),
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				const tabsEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=tabs]",
				);
				if (tabsEl) (tabsEl as ElementWithContext).__tabs?.setActiveTab(value);
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	// Bind active state reactively + aria
	queueMicrotask(() => {
		const tabsEl = el.closest("[data-slot=tabs]");
		if (tabsEl) {
			const ctx = (tabsEl as ElementWithContext).__tabs;
			if (ctx) {
				const idPrefix = ctx.tabsId;
				el.id = `tab-${idPrefix}-${value}`;
				el.setAttribute("aria-controls", `panel-${idPrefix}-${value}`);

				effect(() => {
					const isActive = ctx.activeTab() === value;
					el.setAttribute("data-state", isActive ? "active" : "inactive");
					el.setAttribute("aria-selected", String(isActive));
				});
			}
		}
	});

	return el as HTMLElement;
}

export interface TabsContentProps extends BaseProps {
	value: string;
}

export function TabsContent(
	first?: TabsContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<TabsContentProps>(first, second);
	const { class: className, value, nodes, ...rest } = props;

	const el = div({
		"data-slot": "tabs-content",
		"data-value": value,
		role: "tabpanel",
		class: cnReactive("flex-1 outline-none", className),
		nodes,
		...rest,
	}) as HTMLElement;

	// Bind visibility to active tab + aria
	queueMicrotask(() => {
		const tabsEl = el.closest("[data-slot=tabs]");
		if (tabsEl) {
			const ctx = (tabsEl as ElementWithContext).__tabs;
			if (ctx) {
				const idPrefix = ctx.tabsId;
				el.id = `panel-${idPrefix}-${value}`;
				el.setAttribute("aria-labelledby", `tab-${idPrefix}-${value}`);

				effect(() => {
					const isActive = ctx.activeTab() === value;
					el.style.display = isActive ? "" : "none";
					el.setAttribute("data-state", isActive ? "active" : "inactive");
				});
			}
		}
	});

	return el as HTMLElement;
}
