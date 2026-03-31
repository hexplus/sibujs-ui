import {
	button as buttonTag,
	div,
	effect,
	input as inputTag,
	type NodeChildren,
	signal,
	span,
} from "sibujs";
import { CheckIcon, ChevronDownIcon, XIcon } from "../icons";
import { cn } from "../lib/utils";
import { Button } from "./button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "./input-group";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
	toNodes,
} from "./types";

// ── Combobox (Root) ──────────────────────────────────────────────────────────

export interface ComboboxProps extends BaseProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	value?: string | string[];
	defaultValue?: string | string[];
	onValueChange?: (value: string | string[]) => void;
	multiple?: boolean;
	disabled?: boolean;
}

export function Combobox(
	first?: ComboboxProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ComboboxProps>(first, second);
	const {
		class: className,
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		value: controlledValue,
		defaultValue,
		onValueChange,
		multiple = false,
		disabled,
		nodes,
		...rest
	} = props;

	const initValue = controlledValue ?? defaultValue ?? (multiple ? [] : "");
	const [isOpen, setIsOpen] = signal(controlledOpen ?? defaultOpen);
	const [query, setQuery] = signal("");
	const [selectedValue, setSelectedValue] = signal(initValue);
	const [highlightedIndex, setHighlightedIndex] = signal(-1);

	const el = div({
		"data-slot": "combobox",
		"data-state": () => (isOpen() ? "open" : "closed"),
		class: cn("relative", className),
		nodes,
		...rest,
	}) as HTMLElement;

	const openCb = () => {
		if (disabled) return;
		if (controlledOpen === undefined) setIsOpen(true);
		onOpenChange?.(true);
	};

	const closeCb = () => {
		if (controlledOpen === undefined) setIsOpen(false);
		onOpenChange?.(false);
		setHighlightedIndex(-1);
	};

	const toggleCb = () => {
		if (disabled) return;
		isOpen() ? closeCb() : openCb();
	};

	const selectCb = (value: string) => {
		if (multiple) {
			const cur = selectedValue() as string[];
			const next = cur.includes(value)
				? cur.filter((v: string) => v !== value)
				: [...cur, value];
			if (controlledValue === undefined) setSelectedValue(next);
			onValueChange?.(next);
		} else {
			if (controlledValue === undefined) setSelectedValue(value);
			onValueChange?.(value);
			closeCb();
		}
	};

	/** Look up an item's visible label from its DOM element. */
	const getItemLabel = (value: string): string => {
		const item = el.querySelector(
			`[data-slot=combobox-item][data-value="${value}"]`,
		);
		return item?.textContent?.trim() ?? value;
	};

	const clearCb = () => {
		if (controlledValue === undefined) setSelectedValue(multiple ? [] : "");
		onValueChange?.(multiple ? [] : "");
	};

	const removeChip = (value: string) => {
		const cur = selectedValue() as string[];
		const next = cur.filter((v: string) => v !== value);
		if (controlledValue === undefined) setSelectedValue(next);
		onValueChange?.(next);
	};

	const isSelected = (value: string): boolean => {
		const cur = selectedValue();
		return multiple ? (cur as string[]).includes(value) : cur === value;
	};

	const filterItems = () => {
		const q = query().toLowerCase();
		const items = el.querySelectorAll("[data-slot=combobox-item]");
		const groups = el.querySelectorAll("[data-slot=combobox-group]");
		let visibleCount = 0;

		items.forEach((item) => {
			const text = (item.textContent ?? "").toLowerCase();
			const matches = !q || text.includes(q);
			(item as HTMLElement).setAttribute(
				"data-hidden",
				matches ? "false" : "true",
			);
			(item as HTMLElement).style.display = matches ? "" : "none";
			if (matches) visibleCount++;
		});

		groups.forEach((group) => {
			const hasVisible = group.querySelector(
				"[data-slot=combobox-item]:not([data-hidden=true])",
			);
			(group as HTMLElement).style.display = hasVisible ? "" : "none";
		});

		// Show/hide empty state
		const contentEl = el.querySelector(
			"[data-slot=combobox-content]",
		) as HTMLElement | null;
		if (contentEl) {
			if (visibleCount === 0) {
				contentEl.setAttribute("data-empty", "");
			} else {
				contentEl.removeAttribute("data-empty");
			}
		}

		setHighlightedIndex(visibleCount > 0 ? 0 : -1);
		updateHighlight();
	};

	const getVisibleItems = () =>
		Array.from(
			el.querySelectorAll("[data-slot=combobox-item]:not([data-hidden=true])"),
		) as HTMLElement[];

	const updateHighlight = () => {
		const items = getVisibleItems();
		const idx = highlightedIndex();
		items.forEach((item, i) => {
			if (i === idx) {
				item.setAttribute("data-highlighted", "");
			} else {
				item.removeAttribute("data-highlighted");
			}
		});
	};

	(el as ElementWithContext).__combobox = {
		isOpen,
		query,
		selectedValue,
		highlightedIndex,
		multiple,
		open: openCb,
		close: closeCb,
		toggle: toggleCb,
		select: selectCb,
		clear: clearCb,
		removeChip,
		isSelected,
		setQuery: (v: string) => setQuery(v),
		filter: filterItems,
		getVisibleItems,
		getItemLabel,
		setHighlightedIndex: (idx: number) => {
			setHighlightedIndex(idx);
			updateHighlight();
		},
		updateHighlight,
	};

	// Keyboard navigation
	el.addEventListener("keydown", (ev: KeyboardEvent) => {
		if (!isOpen()) {
			if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
				ev.preventDefault();
				openCb();
			}
			return;
		}
		const items = getVisibleItems();
		if (ev.key === "ArrowDown") {
			ev.preventDefault();
			setHighlightedIndex(Math.min(highlightedIndex() + 1, items.length - 1));
			updateHighlight();
		} else if (ev.key === "ArrowUp") {
			ev.preventDefault();
			setHighlightedIndex(Math.max(highlightedIndex() - 1, 0));
			updateHighlight();
		} else if (ev.key === "Enter") {
			ev.preventDefault();
			const idx = highlightedIndex();
			if (items[idx]) items[idx].click();
		} else if (ev.key === "Escape") {
			ev.preventDefault();
			closeCb();
		}
	});

	// Close on outside click
	effect(() => {
		if (isOpen()) {
			const handler = (ev: MouseEvent) => {
				if (!el.contains(ev.target as Node)) closeCb();
			};
			document.addEventListener("mousedown", handler);
			return () => document.removeEventListener("mousedown", handler);
		}
	});

	return el;
}

// ── ComboboxValue ────────────────────────────────────────────────────────────

export function ComboboxValue(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	const el = span({
		"data-slot": "combobox-value",
		class: cn(className),
		nodes,
		...rest,
	}) as HTMLElement;

	queueMicrotask(() => {
		const comboEl = el.closest("[data-slot=combobox]");
		if (comboEl) {
			const ctx = (comboEl as ElementWithContext).__combobox;
			if (ctx) {
				effect(() => {
					const val = ctx.selectedValue();
					const placeholder = el.getAttribute("data-placeholder") ?? "";
					if (typeof val === "string") {
						el.textContent = val ? ctx.getItemLabel(val) : placeholder;
					} else {
						const labels = (val as string[]).map((v: string) =>
							ctx.getItemLabel(v),
						);
						el.textContent =
							labels.length > 0 ? labels.join(", ") : placeholder;
					}
				});
			}
		}
	});

	return el;
}

// ── ComboboxTrigger ──────────────────────────────────────────────────────────

export function ComboboxTrigger(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, on, ...rest } = props;
	const el = buttonTag({
		"data-slot": "combobox-trigger",
		type: "button",
		class: cn("[&_svg:not([class*='size-'])]:size-4", className),
		nodes: [
			...toNodes(nodes),
			ChevronDownIcon({
				"data-slot": "combobox-trigger-icon",
				class: "pointer-events-none size-4 text-muted-foreground",
			}) as unknown as Node,
		],
		on: {
			...(on as Record<string, (ev: Event) => void>),
			click: (ev: Event) => {
				const comboEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=combobox]",
				);
				if (comboEl) (comboEl as ElementWithContext).__combobox?.toggle();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
	return el;
}

// ── ComboboxClear ────────────────────────────────────────────────────────────

export function ComboboxClear(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, on, ...rest } = props;
	return InputGroupButton({
		"data-slot": "combobox-clear",
		variant: "ghost",
		size: "icon-xs",
		class: cn(className),
		nodes: [XIcon({ class: "pointer-events-none size-4" }) as unknown as Node],
		on: {
			...(on as Record<string, (ev: Event) => void>),
			click: (ev: Event) => {
				const comboEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=combobox]",
				);
				if (comboEl) (comboEl as ElementWithContext).__combobox?.clear();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;
}

// ── ComboboxInput ────────────────────────────────────────────────────────────

export interface ComboboxInputProps extends BaseProps {
	placeholder?: string;
	disabled?: boolean;
	showTrigger?: boolean;
	showClear?: boolean;
}

export function ComboboxInput(
	first?: ComboboxInputProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ComboboxInputProps>(first, second);
	const {
		class: className,
		placeholder = "Search...",
		disabled,
		showTrigger = true,
		showClear = false,
		nodes,
		...rest
	} = props;

	const inputEl = InputGroupInput({
		"data-slot": "combobox-input",
		type: "text",
		placeholder,
		disabled,
		role: "combobox",
		autocomplete: "nope",
		"data-1p-ignore": "",
		"data-lpignore": "true",
		"aria-expanded": "false",
		"aria-autocomplete": "list",
		...rest,
	}) as HTMLInputElement;

	const addonChildren: Node[] = [];

	if (showTrigger) {
		const triggerBtn = InputGroupButton({
			size: "icon-xs",
			variant: "ghost",
			"data-slot": "input-group-button",
			class:
				"group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
			disabled,
			nodes: [
				ChevronDownIcon({
					"data-slot": "combobox-trigger-icon",
					class: "pointer-events-none size-4 text-muted-foreground",
				}) as unknown as Node,
			],
		}) as HTMLElement;
		addonChildren.push(triggerBtn);

		// Trigger click toggles combobox
		triggerBtn.addEventListener("click", () => {
			const comboEl = triggerBtn.closest("[data-slot=combobox]");
			if (comboEl) (comboEl as ElementWithContext).__combobox?.toggle();
			inputEl.focus();
		});
	}

	if (showClear) {
		addonChildren.push(ComboboxClear({ disabled }) as Node);
	}

	// Forward aria-invalid to InputGroup wrapper so border styling applies
	const ariaInvalid = (rest as Record<string, unknown>)["aria-invalid"];

	const wrapper = InputGroup({
		class: cn("w-auto", className),
		...(ariaInvalid ? { "aria-invalid": ariaInvalid } : {}),
		nodes: [
			inputEl,
			InputGroupAddon({
				align: "inline-end",
				nodes: addonChildren,
			}),
			...toNodes(nodes),
		],
	}) as HTMLElement;

	// Wire input events to combobox context
	queueMicrotask(() => {
		const comboEl = wrapper.closest("[data-slot=combobox]");
		if (!comboEl) return;
		const ctx = (comboEl as ElementWithContext).__combobox;
		if (!ctx) return;

		// On typing, filter items and open if closed
		inputEl.addEventListener("input", () => {
			ctx.setQuery(inputEl.value);
			ctx.filter();
			if (!ctx.isOpen()) ctx.open();
		});

		// On focus, open dropdown and select input text for easy re-search
		inputEl.addEventListener("focus", () => {
			if (!ctx.isOpen()) ctx.open();
			inputEl.select();
		});

		// Show selected value label in input when selection changes
		effect(() => {
			const val = ctx.selectedValue();
			const open = ctx.isOpen();

			// When closed, show the selected label (not the search query)
			if (!open) {
				if (ctx.multiple) {
					// For multi-select, clear the input (chips show the values)
					inputEl.value = "";
				} else {
					const strVal = val as string;
					inputEl.value = strVal ? ctx.getItemLabel(strVal) : "";
				}
				ctx.setQuery("");
			}

			inputEl.setAttribute("aria-expanded", String(open));
		});

		// When opening, reset filter to show all items
		let wasOpen = ctx.isOpen();
		effect(() => {
			const open = ctx.isOpen();
			if (open && !wasOpen) {
				inputEl.value = "";
				ctx.setQuery("");
				// Show all items without calling filter() to avoid reactive loop
				const items = (comboEl as HTMLElement).querySelectorAll(
					"[data-slot=combobox-item]",
				);
				items.forEach((item) => {
					(item as HTMLElement).setAttribute("data-hidden", "false");
					(item as HTMLElement).style.display = "";
				});
				const groups = (comboEl as HTMLElement).querySelectorAll(
					"[data-slot=combobox-group]",
				);
				groups.forEach((g) => {
					(g as HTMLElement).style.display = "";
				});
				const contentEl = (comboEl as HTMLElement).querySelector(
					"[data-slot=combobox-content]",
				);
				if (contentEl) contentEl.removeAttribute("data-empty");
			}
			wasOpen = open;
		});
	});

	return wrapper;
}

// ── ComboboxContent ──────────────────────────────────────────────────────────

export interface ComboboxContentProps extends BaseProps {
	side?: "top" | "bottom" | "left" | "right";
	sideOffset?: number;
	align?: "start" | "center" | "end";
	alignOffset?: number;
}

export function ComboboxContent(
	first?: ComboboxContentProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ComboboxContentProps>(first, second);
	const {
		class: className,
		side = "bottom",
		sideOffset = 6,
		align = "start",
		alignOffset = 0,
		nodes,
		...rest
	} = props;

	const content = div({
		"data-slot": "combobox-content",
		"data-side": side,
		class: cn(
			"group/combobox-content relative max-h-96 w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
			"*:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;

	// Position and visibility
	queueMicrotask(() => {
		const comboEl = content.closest("[data-slot=combobox]");
		if (!comboEl) return;
		const ctx = (comboEl as ElementWithContext).__combobox;
		if (!ctx) return;

		content.style.position = "absolute";
		content.style.left = "0";
		content.style.zIndex = "50";

		const positionContent = () => {
			// Find the anchor element (input-group or chips container)
			const anchor =
				comboEl.querySelector("[data-slot=input-group]") ??
				comboEl.querySelector("[data-slot=combobox-chips]") ??
				comboEl;
			const anchorWidth = (anchor as HTMLElement).offsetWidth;

			content.style.width = `${anchorWidth}px`;
			content.style.minWidth = `${anchorWidth}px`;

			if (side === "bottom") {
				content.style.top = `${(anchor as HTMLElement).offsetTop + (anchor as HTMLElement).offsetHeight + sideOffset}px`;
			} else if (side === "top") {
				content.style.bottom = `calc(100% - ${(anchor as HTMLElement).offsetTop}px + ${sideOffset}px)`;
			}

			if (align === "end") {
				content.style.left = "auto";
				content.style.right = `${alignOffset}px`;
			} else if (align === "center") {
				const left = (anchor as HTMLElement).offsetLeft + anchorWidth / 2;
				content.style.left = `${left + alignOffset}px`;
				content.style.transform = "translateX(-50%)";
			} else {
				content.style.left = `${(anchor as HTMLElement).offsetLeft + alignOffset}px`;
			}
		};

		effect(() => {
			const open = ctx.isOpen();
			content.style.display = open ? "" : "none";
			content.setAttribute("data-state", open ? "open" : "closed");
			if (open) {
				content.setAttribute("data-open", "");
				content.removeAttribute("data-closed");
				positionContent();
			} else {
				content.setAttribute("data-closed", "");
				content.removeAttribute("data-open");
			}
		});
	});

	return content;
}

// ── ComboboxList ─────────────────────────────────────────────────────────────

export function ComboboxList(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "combobox-list",
		role: "listbox",
		class: cn(
			"max-h-[min(calc(--spacing(96)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── ComboboxItem ─────────────────────────────────────────────────────────────

export interface ComboboxItemProps extends BaseProps {
	value: string;
	disabled?: boolean;
	onSelect?: (value: string) => void;
}

export function ComboboxItem(
	first?: ComboboxItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ComboboxItemProps>(first, second);
	const {
		class: className,
		value,
		disabled,
		onSelect,
		nodes,
		on,
		...rest
	} = props;

	const indicator = span({
		"data-slot": "combobox-item-indicator",
		class:
			"pointer-events-none absolute right-2 flex size-4 items-center justify-center",
	}) as HTMLElement;

	const el = div({
		"data-slot": "combobox-item",
		"data-value": value,
		"data-disabled": disabled ? "" : undefined,
		"data-hidden": "false",
		role: "option",
		class: cn(
			"relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			className,
		),
		nodes: [...toNodes(nodes), indicator],
		...rest,
	}) as HTMLElement;

	// Event listeners (attached directly for reliable binding)
	el.addEventListener("click", (ev: Event) => {
		if (disabled) return;
		const comboEl = el.closest("[data-slot=combobox]");
		if (comboEl) (comboEl as ElementWithContext).__combobox?.select(value);
		onSelect?.(value);
		(on as Record<string, (ev: Event) => void>)?.click?.(ev);
	});

	el.addEventListener("mouseenter", () => {
		const comboEl = el.closest("[data-slot=combobox]");
		if (comboEl) {
			const ctx = (comboEl as ElementWithContext).__combobox;
			if (ctx) {
				const items = ctx.getVisibleItems() as HTMLElement[];
				const idx = items.indexOf(el);
				if (idx >= 0) ctx.setHighlightedIndex(idx);
			}
		}
	});

	// Bind check indicator reactively
	queueMicrotask(() => {
		const comboEl = el.closest("[data-slot=combobox]");
		if (comboEl) {
			const ctx = (comboEl as ElementWithContext).__combobox;
			if (ctx) {
				effect(() => {
					const selected = ctx.isSelected(value);
					el.setAttribute("aria-selected", String(selected));
					indicator.innerHTML = "";
					if (selected) {
						indicator.appendChild(
							CheckIcon({
								class: "pointer-events-none size-4 pointer-coarse:size-5",
							}) as unknown as Node,
						);
					}
				});
			}
		}
	});

	return el;
}

// ── ComboboxGroup ────────────────────────────────────────────────────────────

export function ComboboxGroup(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "combobox-group",
		class: cn(className),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── ComboboxLabel ────────────────────────────────────────────────────────────

export function ComboboxLabel(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "combobox-label",
		class: cn(
			"px-2 py-1.5 text-xs text-muted-foreground pointer-coarse:px-3 pointer-coarse:py-2 pointer-coarse:text-sm",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── ComboboxEmpty ────────────────────────────────────────────────────────────

export function ComboboxEmpty(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "combobox-empty",
		class: cn(
			"hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── ComboboxSeparator ────────────────────────────────────────────────────────

export function ComboboxSeparator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return div({
		"data-slot": "combobox-separator",
		class: cn("-mx-1 my-1 h-px bg-border", className),
		...rest,
	}) as HTMLElement;
}

// ── ComboboxChips ────────────────────────────────────────────────────────────

export function ComboboxChips(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "combobox-chips",
		class: cn(
			"flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent bg-clip-padding px-2.5 py-1.5 text-sm shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-[3px] has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1.5 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── ComboboxChip ─────────────────────────────────────────────────────────────

export interface ComboboxChipProps extends BaseProps {
	value: string;
	showRemove?: boolean;
}

export function ComboboxChip(
	first?: ComboboxChipProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ComboboxChipProps>(first, second);
	const { class: className, value, showRemove = true, nodes, ...rest } = props;

	const chipNodes = [...toNodes(nodes)];

	if (showRemove) {
		const removeBtn = Button({
			variant: "ghost",
			size: "icon-xs",
			"data-slot": "combobox-chip-remove",
			class: "-ml-1 opacity-50 hover:opacity-100",
			nodes: [
				XIcon({ class: "pointer-events-none size-3" }) as unknown as Node,
			],
			on: {
				click: (ev: Event) => {
					ev.stopPropagation();
					const comboEl = (ev.currentTarget as HTMLElement).closest(
						"[data-slot=combobox]",
					);
					if (comboEl)
						(comboEl as ElementWithContext).__combobox?.removeChip(value);
				},
			},
		}) as Node;
		chipNodes.push(removeBtn);
	}

	return div({
		"data-slot": "combobox-chip",
		class: cn(
			"flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
			className,
		),
		nodes: chipNodes,
		...rest,
	}) as HTMLElement;
}

// ── ComboboxChipsInput ───────────────────────────────────────────────────────

export function ComboboxChipsInput(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;

	const inputEl = inputTag({
		"data-slot": "combobox-chip-input",
		autocomplete: "nope",
		"data-1p-ignore": "",
		"data-lpignore": "true",
		class: cn("min-w-16 flex-1 outline-none", className),
		...rest,
	}) as HTMLElement;

	const origPlaceholder = (rest as Record<string, unknown>).placeholder as
		| string
		| undefined;

	queueMicrotask(() => {
		const comboEl = inputEl.closest("[data-slot=combobox]");
		if (comboEl) {
			const ctx = (comboEl as ElementWithContext).__combobox;
			if (ctx) {
				inputEl.addEventListener("input", () => {
					ctx.setQuery((inputEl as HTMLInputElement).value);
					ctx.filter();
					if (!ctx.isOpen()) ctx.open();
				});
				inputEl.addEventListener("focus", () => {
					if (!ctx.isOpen()) ctx.open();
				});
				// Hide placeholder when chips are present
				effect(() => {
					const val = ctx.selectedValue();
					const hasValues = Array.isArray(val) && val.length > 0;
					(inputEl as HTMLInputElement).placeholder = hasValues
						? ""
						: (origPlaceholder ?? "");
				});
			}
		}
	});

	return inputEl;
}
