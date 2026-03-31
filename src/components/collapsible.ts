import {
	button as buttonTag,
	div,
	effect,
	type NodeChildren,
	show,
	signal,
} from "sibujs";
import { cn } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

export interface CollapsibleProps extends BaseProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	disabled?: boolean;
}

export function Collapsible(
	first?: CollapsibleProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<CollapsibleProps>(first, second);
	const {
		class: className,
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		disabled,
		nodes,
		...rest
	} = props;

	const [isOpen, setIsOpen] = signal(controlledOpen ?? defaultOpen);

	const el = div({
		"data-slot": "collapsible",
		"data-state": () => (isOpen() ? "open" : "closed"),
		"data-disabled": disabled ? "true" : undefined,
		class: className,
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__collapsible = {
		isOpen,
		toggle: () => {
			if (disabled) return;
			const next = !isOpen();
			if (controlledOpen === undefined) setIsOpen(next);
			onOpenChange?.(next);
		},
	};

	return el as HTMLElement;
}

export function CollapsibleTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, on, ...rest } = props;

	const el = buttonTag({
		"data-slot": "collapsible-trigger",
		type: "button",
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				const collapsibleEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=collapsible]",
				);
				if (collapsibleEl)
					(collapsibleEl as ElementWithContext).__collapsible?.toggle();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	queueMicrotask(() => {
		const collapsibleEl = el.closest("[data-slot=collapsible]");
		if (collapsibleEl) {
			const ctx = (collapsibleEl as ElementWithContext).__collapsible;
			if (ctx) {
				effect(() => {
					el.setAttribute("data-state", ctx.isOpen() ? "open" : "closed");
				});
			}
		}
	});

	return el;
}

export function CollapsibleContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	const wrapper = div({
		"data-slot": "collapsible-content",
		class: cn(className),
		nodes,
		...rest,
	}) as HTMLElement;

	// After insertion, bind visibility and data-state to parent collapsible state
	queueMicrotask(() => {
		const collapsibleEl = wrapper.closest("[data-slot=collapsible]");
		if (collapsibleEl) {
			const ctx = (collapsibleEl as ElementWithContext).__collapsible;
			if (ctx) {
				show(() => ctx.isOpen(), wrapper);
				effect(() => {
					wrapper.setAttribute("data-state", ctx.isOpen() ? "open" : "closed");
				});
			}
		}
	});

	return wrapper as HTMLElement;
}
