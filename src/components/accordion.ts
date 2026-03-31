import {
	button as buttonTag,
	div,
	effect,
	h3,
	type NodeChildren,
	signal,
} from "sibujs";
import { ChevronDownIcon } from "../icons";
import { cn } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toNodes,
} from "./types";

let accordionIdCounter = 0;

export interface AccordionProps extends BaseProps {
	type?: "single" | "multiple";
	defaultValue?: string | string[];
	value?: string | string[];
	onValueChange?: (value: string | string[]) => void;
	collapsible?: boolean;
}

export function Accordion(
	first?: AccordionProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<AccordionProps>(first, second);
	const {
		class: className,
		type = "single",
		defaultValue,
		value: controlledValue,
		onValueChange,
		collapsible = true,
		nodes,
		on,
		...rest
	} = props;

	const initial =
		controlledValue ?? defaultValue ?? (type === "multiple" ? [] : "");
	const [value, setValue] = signal<string | string[]>(initial);

	const el = div({
		"data-slot": "accordion",
		class: className,
		nodes,
		on: {
			...on,
			keydown: (ev: Event) => {
				// Keyboard navigation matching Radix exactly
				const key = (ev as KeyboardEvent).key;
				if (["ArrowDown", "ArrowUp", "Home", "End"].includes(key)) {
					const triggers = Array.from(
						el.querySelectorAll(
							"[data-slot=accordion-trigger]:not([disabled])",
						),
					) as HTMLElement[];

					if (triggers.length === 0) return;

					const currentTarget = ev.target as HTMLElement;
					const idx = triggers.indexOf(currentTarget);

					if (idx === -1) return; // not focused on a valid trigger

					ev.preventDefault();

					let nextIdx = idx;
					if (key === "ArrowDown") {
						nextIdx = (idx + 1) % triggers.length;
					} else if (key === "ArrowUp") {
						nextIdx = (idx - 1 + triggers.length) % triggers.length;
					} else if (key === "Home") {
						nextIdx = 0;
					} else if (key === "End") {
						nextIdx = triggers.length - 1;
					}

					triggers[nextIdx].focus();
				}
				(on as Record<string, (ev: Event) => void>)?.keydown?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__accordion = {
		type,
		collapsible,
		value,
		toggle: (itemValue: string) => {
			const current = value();
			let next: string | string[];

			if (type === "multiple") {
				const arr = Array.isArray(current) ? [...current] : [];
				const idx = arr.indexOf(itemValue);
				if (idx >= 0) arr.splice(idx, 1);
				else arr.push(itemValue);
				next = arr;
			} else {
				next = current === itemValue && collapsible ? "" : itemValue;
			}

			if (controlledValue === undefined) setValue(next);
			onValueChange?.(next);
		},
		isOpen: (itemValue: string): boolean => {
			const current = value();
			if (type === "multiple")
				return Array.isArray(current) && current.includes(itemValue);
			return current === itemValue;
		},
	};

	return el as HTMLElement;
}

export interface AccordionItemProps extends BaseProps {
	value: string;
	disabled?: boolean;
}

export function AccordionItem(
	first?: AccordionItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<AccordionItemProps>(first, second);
	const { class: className, value, disabled, nodes, ...rest } = props;
	const itemId = `acc-${++accordionIdCounter}`;

	const el = div({
		"data-slot": "accordion-item",
		"data-value": value,
		class: cn("border-b last:border-b-0", className),
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__accordionItemId = itemId;
	(el as ElementWithContext).__accordionItemDisabled = disabled;

	// Bind data-state
	queueMicrotask(() => {
		const accordionEl = el.closest("[data-slot=accordion]");
		if (accordionEl) {
			const ctx = (accordionEl as ElementWithContext).__accordion;
			if (ctx) {
				effect(() => {
					const open = ctx.isOpen(value);
					el.setAttribute("data-state", open ? "open" : "closed");
				});
			}
		}
	});

	if (disabled) el.setAttribute("data-disabled", "");

	return el;
}

export function AccordionTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const {
		class: className,
		nodes,
		on,
		disabled: triggerDisabled,
		...rest
	} = props;

	// Exact replicate of ShadCN ChevronDownIcon styling
	const chevron = ChevronDownIcon({
		class:
			"pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200",
	});

	const triggerNodes = toNodes(nodes);
	triggerNodes.push(chevron);

	const btn = buttonTag({
		"data-slot": "accordion-trigger",
		type: "button",
		class: cn(
			"flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
			className,
		),
		nodes: triggerNodes,
		on: {
			...on,
			click: (ev: Event) => {
				const itemEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=accordion-item]",
				);
				const accordionEl = itemEl?.closest("[data-slot=accordion]");
				if (accordionEl && itemEl) {
					// Don't toggle if disabled matching Radix behavior
					const isDisabled =
						(itemEl as ElementWithContext).__accordionItemDisabled ||
						(ev.currentTarget as HTMLButtonElement).disabled;
					if (isDisabled) return;

					const itemValue = itemEl.getAttribute("data-value") ?? "";
					(accordionEl as ElementWithContext).__accordion?.toggle(itemValue);
				}
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLButtonElement;

	const header = h3({
		class: "flex",
		nodes: [btn],
	}) as HTMLElement;

	// Bind open state + ARIA reactively mimicking Radix trigger
	queueMicrotask(() => {
		const itemEl = header.closest("[data-slot=accordion-item]");
		const accordionEl = itemEl?.closest("[data-slot=accordion]");

		if (itemEl) {
			const itemDisabled = (itemEl as ElementWithContext)
				.__accordionItemDisabled;
			if (itemDisabled || triggerDisabled) {
				btn.disabled = true;
				btn.setAttribute("data-disabled", "");
			}

			const itemId = (itemEl as ElementWithContext).__accordionItemId ?? "";
			const contentId = `${itemId}-content`;
			const triggerId = `${itemId}-trigger`;
			btn.id = triggerId;
			btn.setAttribute("aria-controls", contentId);

			if (accordionEl) {
				const ctx = (accordionEl as ElementWithContext).__accordion;
				const itemValue = itemEl.getAttribute("data-value") ?? "";
				if (ctx) {
					effect(() => {
						const open = ctx.isOpen(itemValue);
						btn.setAttribute("data-state", open ? "open" : "closed");
						btn.setAttribute("aria-expanded", String(open));
					});
				}
			}
		}
	});

	return header;
}

export function AccordionContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	// Completely exact ShadCN implementation
	const inner = div({
		class: cn("pt-0 pb-4", className),
		nodes,
	}) as HTMLElement;

	const outer = div({
		"data-slot": "accordion-content",
		class:
			"overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
		nodes: [inner],
		...rest,
	}) as HTMLElement;

	queueMicrotask(() => {
		const itemEl = outer.closest("[data-slot=accordion-item]");
		const accordionEl = itemEl?.closest("[data-slot=accordion]");
		if (accordionEl && itemEl) {
			const ctx = (accordionEl as ElementWithContext).__accordion;
			const itemValue = itemEl.getAttribute("data-value") ?? "";
			const itemId = (itemEl as ElementWithContext).__accordionItemId ?? "";
			const contentId = `${itemId}-content`;
			const triggerId = `${itemId}-trigger`;
			outer.id = contentId;
			outer.setAttribute("role", "region");
			outer.setAttribute("aria-labelledby", triggerId);

			if (ctx) {
				// Keep track of dynamic content height when open (for window resizes) matching Radix --radix-accordion-content-height
				const ro = new ResizeObserver(() => {
					if (outer.style.display !== "none") {
						outer.style.setProperty(
							"--radix-accordion-content-height",
							`${inner.offsetHeight}px`,
						);
					}
				});
				ro.observe(inner);

				let closeFallbackTimer: ReturnType<typeof setTimeout>;

				// Hide completely from DOM matching Radix unmount after animation
				outer.addEventListener("animationend", (e) => {
					if (e.target !== outer) return;
					if (outer.getAttribute("data-state") === "closed") {
						clearTimeout(closeFallbackTimer);
						outer.style.display = "none";
					}
				});

				// Set initial state without animation
				const initialOpen = ctx.isOpen(itemValue);
				outer.setAttribute("data-state", initialOpen ? "open" : "closed");
				outer.style.display = initialOpen ? "" : "none";

				effect(() => {
					const open = ctx.isOpen(itemValue);
					if (open) {
						clearTimeout(closeFallbackTimer);
						// Unhide with height forced to 0 so the animation starts from collapsed
						outer.style.display = "";
						outer.style.height = "0px";
						outer.style.setProperty(
							"--radix-accordion-content-height",
							`${inner.offsetHeight}px`,
						);
						// Single rAF: browser has laid out at height:0, now trigger the open animation
						requestAnimationFrame(() => {
							outer.style.height = "";
							outer.setAttribute("data-state", "open");
						});
					} else {
						outer.style.setProperty(
							"--radix-accordion-content-height",
							`${inner.offsetHeight}px`,
						);
						outer.setAttribute("data-state", "closed");

						const styles = window.getComputedStyle(outer);
						const durationStr = styles.animationDuration || "0s";
						const duration = durationStr.includes("ms")
							? parseFloat(durationStr)
							: parseFloat(durationStr) * 1000;

						if (duration > 0 && styles.animationName !== "none") {
							closeFallbackTimer = setTimeout(() => {
								if (outer.getAttribute("data-state") === "closed") {
									outer.style.display = "none";
								}
							}, duration + 50);
						} else {
							outer.style.display = "none";
						}
					}
				});
			}
		}
	});

	return outer;
}
