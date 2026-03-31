import {
	button as buttonTag,
	div,
	effect,
	type NodeChildren,
	signal,
	span,
} from "sibujs";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "../icons";
import { cn } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toNodes,
} from "./types";

export interface SelectProps extends BaseProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	disabled?: boolean;
	name?: string;
	required?: boolean;
}

export function Select(
	first?: SelectProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SelectProps>(first, second);
	const {
		value: controlledValue,
		defaultValue = "",
		onValueChange,
		disabled,
		nodes,
		...rest
	} = props;

	const [value, setValue] = signal(controlledValue ?? defaultValue);
	const [isOpen, setIsOpen] = signal(false);
	const [displayText, setDisplayText] = signal("");
	const [highlightedIndex, setHighlightedIndex] = signal(-1);

	const el = div({
		"data-slot": "select",
		"data-disabled": disabled ? "true" : undefined,
		style: "position: relative; display: inline-block",
		nodes,
		...rest,
	}) as HTMLElement;

	const getVisibleItems = () =>
		Array.from(
			el.querySelectorAll("[data-slot=select-item]:not([data-disabled])"),
		) as HTMLElement[];

	const updateHighlight = () => {
		const items = getVisibleItems();
		const idx = highlightedIndex();
		items.forEach((item, i) => {
			if (i === idx) {
				item.setAttribute("data-highlighted", "");
				item.scrollIntoView({ block: "nearest" });
			} else {
				item.removeAttribute("data-highlighted");
			}
		});
	};

	(el as ElementWithContext).__select = {
		value,
		isOpen,
		displayText,
		setDisplayText,
		select: (v: string, text: string) => {
			if (controlledValue === undefined) setValue(v);
			setDisplayText(text);
			onValueChange?.(v);
			setIsOpen(false);
			setHighlightedIndex(-1);
		},
		toggle: () => {
			if (disabled) return;
			const next = !isOpen();
			setIsOpen(next);
			if (next) {
				// Highlight the currently selected item
				const items = getVisibleItems();
				const selectedIdx = items.findIndex(
					(item) => item.getAttribute("data-value") === value(),
				);
				setHighlightedIndex(selectedIdx >= 0 ? selectedIdx : 0);
				queueMicrotask(() => updateHighlight());
			} else {
				setHighlightedIndex(-1);
			}
		},
		open: () => {
			if (!disabled) setIsOpen(true);
		},
		close: () => {
			setIsOpen(false);
			setHighlightedIndex(-1);
		},
	};

	// Keyboard navigation
	el.addEventListener("keydown", (ev: KeyboardEvent) => {
		const ctx = (el as ElementWithContext).__select;
		if (!ctx.isOpen()) {
			if (
				ev.key === "ArrowDown" ||
				ev.key === "ArrowUp" ||
				ev.key === "Enter" ||
				ev.key === " "
			) {
				ev.preventDefault();
				ctx.toggle();
			}
			return;
		}

		const items = getVisibleItems();
		const idx = highlightedIndex();

		switch (ev.key) {
			case "ArrowDown":
				ev.preventDefault();
				setHighlightedIndex(Math.min(idx + 1, items.length - 1));
				updateHighlight();
				break;
			case "ArrowUp":
				ev.preventDefault();
				setHighlightedIndex(Math.max(idx - 1, 0));
				updateHighlight();
				break;
			case "Home":
				ev.preventDefault();
				setHighlightedIndex(0);
				updateHighlight();
				break;
			case "End":
				ev.preventDefault();
				setHighlightedIndex(items.length - 1);
				updateHighlight();
				break;
			case "Enter":
			case " ":
				ev.preventDefault();
				if (items[idx]) items[idx].click();
				break;
			case "Escape":
				ev.preventDefault();
				ctx.close();
				// Return focus to trigger
				el.querySelector<HTMLElement>("[data-slot=select-trigger]")?.focus();
				break;
		}
	});

	return el as HTMLElement;
}

export interface SelectTriggerProps extends BaseProps {
	size?: "sm" | "default";
	placeholder?: string;
}

export function SelectTrigger(
	first?: SelectTriggerProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SelectTriggerProps>(first, second);
	const {
		class: className,
		size = "default",
		placeholder,
		nodes,
		on,
		...rest
	} = props;

	// If nodes are provided (e.g. SelectValue), use them; otherwise create a default value display
	const childNodes = toNodes(nodes);
	const hasSelectValue = childNodes.some(
		(n) =>
			n instanceof HTMLElement &&
			(n as HTMLElement).getAttribute?.("data-slot") === "select-value",
	);

	if (!hasSelectValue && childNodes.length === 0) {
		// Create a default SelectValue with the placeholder
		childNodes.push(
			span({
				"data-slot": "select-value",
				class: "line-clamp-1 flex items-center gap-2",
			}) as Node,
		);
	}

	const el = buttonTag({
		"data-slot": "select-trigger",
		"data-size": size,
		type: "button",
		class: cn(
			"flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
			className,
		),
		nodes: [...childNodes, ChevronDownIcon({ class: "size-4 opacity-50" })],
		...rest,
	}) as HTMLElement;

	// Click handler
	el.addEventListener("click", (ev: Event) => {
		const selectEl = el.closest("[data-slot=select]");
		if (selectEl) (selectEl as ElementWithContext).__select?.toggle();
		(on as Record<string, (ev: Event) => void>)?.click?.(ev);
	});

	// Update display text reactively + bind aria-expanded
	queueMicrotask(() => {
		const selectEl = el.closest("[data-slot=select]");
		if (!selectEl) return;
		const ctx = (selectEl as ElementWithContext).__select;
		if (!ctx) return;

		const valueEl = el.querySelector(
			"[data-slot=select-value]",
		) as HTMLElement | null;
		if (!valueEl) return;

		effect(() => {
			const text = ctx.displayText();
			const open = ctx.isOpen();
			if (text) {
				valueEl.textContent = text;
				el.removeAttribute("data-placeholder");
			} else {
				valueEl.textContent = placeholder ?? "";
				if (placeholder) el.setAttribute("data-placeholder", "");
			}
			el.setAttribute("aria-expanded", String(open));
		});
	});

	return el;
}

export interface SelectContentProps extends BaseProps {
	position?: "item-aligned" | "popper";
}

export function SelectContent(
	first?: SelectContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SelectContentProps>(first, second);
	const { class: className, position = "item-aligned", nodes, ...rest } = props;

	// Viewport wrapper with p-1 padding (matches shadcn's SelectPrimitive.Viewport)
	const viewport = div({
		"data-slot": "select-viewport",
		class: cn(
			"p-1",
			position === "popper"
				? "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
				: "",
		),
		nodes,
	}) as HTMLElement;

	const content = div({
		"data-slot": "select-content",
		role: "listbox",
		class: cn(
			"relative z-50 max-h-60 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
			position === "popper"
				? "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
				: "",
			className,
		),
		style: {
			position: "absolute",
			top: "calc(100% + 4px)",
			left: "0",
			minWidth: "100%",
		} as Record<string, string>,
		nodes: [viewport],
		...rest,
	}) as HTMLElement;

	const handleOutsideClick = (ev: MouseEvent) => {
		const selectEl = content.closest("[data-slot=select]");
		if (selectEl && !selectEl.contains(ev.target as Node)) {
			(selectEl as ElementWithContext).__select?.close();
		}
	};

	const handleKeydown = (ev: KeyboardEvent) => {
		if (ev.key === "Escape") {
			const selectEl = content.closest("[data-slot=select]");
			if (selectEl) (selectEl as ElementWithContext).__select?.close();
		}
	};

	queueMicrotask(() => {
		const selectEl = content.closest("[data-slot=select]");
		if (!selectEl) return;
		const ctx = (selectEl as ElementWithContext).__select;
		if (!ctx) return;

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
	});

	return content as HTMLElement;
}

export function SelectGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { nodes, ...rest } = props;
	return div({
		"data-slot": "select-group",
		role: "group",
		nodes,
		...rest,
	}) as HTMLElement;
}

export function SelectLabel(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "select-label",
		class: cn("px-2 py-1.5 text-xs text-muted-foreground", className),
		nodes,
		...rest,
	}) as HTMLElement;
}

export interface SelectItemProps extends BaseProps {
	value: string;
	disabled?: boolean;
}

export function SelectItem(
	first?: SelectItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SelectItemProps>(first, second);
	const {
		class: className,
		value: itemValue,
		disabled,
		nodes,
		on,
		...rest
	} = props;

	const indicator = span({
		"data-slot": "select-item-indicator",
		class: "absolute right-2 flex size-3.5 items-center justify-center",
	});

	const el = div({
		"data-slot": "select-item",
		"data-value": itemValue,
		"data-disabled": disabled ? "" : undefined,
		role: "option",
		class: cn(
			"relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
			className,
		),
		nodes: [indicator, span({ nodes })],
		...rest,
	}) as HTMLElement;

	// Click to select
	el.addEventListener("click", (ev: Event) => {
		if (disabled) return;
		const selectEl = el.closest("[data-slot=select]");
		if (selectEl) {
			const text = el.querySelector("span:last-child")?.textContent ?? "";
			(selectEl as ElementWithContext).__select?.select(itemValue, text);
		}
		(on as Record<string, (ev: Event) => void>)?.click?.(ev);
	});

	// Hover to highlight
	el.addEventListener("mouseenter", () => {
		// Clear all highlights and highlight this one
		const selectEl = el.closest("[data-slot=select]");
		if (selectEl) {
			for (const item of selectEl.querySelectorAll("[data-slot=select-item]")) {
				item.removeAttribute("data-highlighted");
			}
			el.setAttribute("data-highlighted", "");
		}
	});

	// Show check icon for selected item and sync displayText
	queueMicrotask(() => {
		const selectEl = el.closest("[data-slot=select]");
		if (!selectEl) return;
		const ctx = (selectEl as ElementWithContext).__select;
		if (!ctx) return;

		effect(() => {
			const isSelected = ctx.value() === itemValue;
			el.setAttribute("aria-selected", String(isSelected));
			el.setAttribute("data-state", isSelected ? "checked" : "unchecked");
			indicator.innerHTML = "";
			if (isSelected) {
				indicator.appendChild(CheckIcon({ class: "size-4" }));
				if (!ctx.displayText()) {
					const text = el.querySelector("span:last-child")?.textContent ?? "";
					if (text) ctx.setDisplayText(text);
				}
			}
		});
	});

	return el as HTMLElement;
}

export function SelectSeparator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return div({
		"data-slot": "select-separator",
		class: cn("pointer-events-none -mx-1 my-1 h-px bg-border", className),
		...rest,
	}) as HTMLElement;
}

export interface SelectValueProps extends BaseProps {
	placeholder?: string;
}

export function SelectValue(
	first?: SelectValueProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SelectValueProps>(first, second);
	const { class: className, placeholder, nodes, ...rest } = props;
	const el = span({
		"data-slot": "select-value",
		class: cn("line-clamp-1 flex items-center gap-2", className),
		nodes: nodes ?? (placeholder ? placeholder : undefined),
		...rest,
	}) as HTMLElement;

	// Sync display text reactively
	queueMicrotask(() => {
		const selectEl = el.closest("[data-slot=select]");
		if (!selectEl) return;
		const ctx = (selectEl as ElementWithContext).__select;
		if (!ctx) return;

		effect(() => {
			const text = ctx.displayText();
			if (text) {
				el.textContent = text;
				const trigger = el.closest("[data-slot=select-trigger]");
				trigger?.removeAttribute("data-placeholder");
			} else if (placeholder) {
				el.textContent = placeholder;
				const trigger = el.closest("[data-slot=select-trigger]");
				trigger?.setAttribute("data-placeholder", "");
			}
		});
	});

	return el;
}

export function SelectScrollUpButton(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "select-scroll-up-button",
		class: cn(
			"flex cursor-default items-center justify-center py-1",
			className,
		),
		nodes: nodes ?? [ChevronUpIcon({ class: "size-4" })],
		...rest,
	}) as HTMLElement;
}

export function SelectScrollDownButton(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "select-scroll-down-button",
		class: cn(
			"flex cursor-default items-center justify-center py-1",
			className,
		),
		nodes: nodes ?? [ChevronDownIcon({ class: "size-4" })],
		...rest,
	}) as HTMLElement;
}
