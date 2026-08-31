import { button as buttonTag, div, type NodeChildren, show } from "sibujs";
import { bindControlled } from "../lib/controlled";
import { deferOwned, nodeOwner, ownedEffect } from "../lib/lifecycle";
import { cnReactive } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

export interface CollapsibleProps extends BaseProps {
	open?: boolean | (() => boolean);
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

	const [isOpen, setIsOpen, isControlled, stopControlled] =
		bindControlled<boolean>(controlledOpen, defaultOpen);

	const el = div({
		"data-slot": "collapsible",
		"data-state": () => (isOpen() ? "open" : "closed"),
		"data-disabled": disabled ? "true" : undefined,
		class: className,
		nodes,
		...rest,
	}) as HTMLElement;

	// The controlled-prop subscription dies with this element.
	nodeOwner(el).add(stopControlled);

	(el as ElementWithContext).__collapsible = {
		isOpen,
		toggle: () => {
			if (disabled) return;
			const next = !isOpen();
			if (!isControlled) setIsOpen(next);
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

	deferOwned(el, () => {
		const collapsibleEl = el.closest("[data-slot=collapsible]");
		if (collapsibleEl) {
			const ctx = (collapsibleEl as ElementWithContext).__collapsible;
			if (ctx) {
				ownedEffect(el, () => {
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
		class: cnReactive(className),
		nodes,
		...rest,
	}) as HTMLElement;

	// After insertion, bind visibility and data-state to parent collapsible state
	deferOwned(wrapper, () => {
		const collapsibleEl = wrapper.closest("[data-slot=collapsible]");
		if (collapsibleEl) {
			const ctx = (collapsibleEl as ElementWithContext).__collapsible;
			if (ctx) {
				show(() => ctx.isOpen(), wrapper);
				ownedEffect(wrapper, () => {
					wrapper.setAttribute("data-state", ctx.isOpen() ? "open" : "closed");
				});
			}
		}
	});

	return wrapper as HTMLElement;
}
