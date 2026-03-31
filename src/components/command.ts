import {
	div,
	input as inputTag,
	type NodeChildren,
	signal,
	span,
} from "sibujs";
import { SearchIcon } from "../icons";
import { cn, cnReactive } from "../lib/utils";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./dialog";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

// ── Helpers ──────────────────────────────────────────────────────────────────

function toNodes(nodes: unknown): Node[] {
	if (Array.isArray(nodes)) {
		const out: Node[] = [];
		for (const n of nodes) {
			if (n instanceof Node) out.push(n);
			else if (n != null && typeof n !== "boolean" && typeof n !== "function")
				out.push(document.createTextNode(String(n)));
		}
		return out;
	}
	if (nodes instanceof Node) return [nodes];
	if (
		nodes != null &&
		typeof nodes !== "boolean" &&
		typeof nodes !== "function"
	)
		return [document.createTextNode(String(nodes))];
	return [];
}

// ── Command ──────────────────────────────────────────────────────────────────

export interface CommandProps extends BaseProps {
	onValueChange?: (value: string) => void;
}

export function Command(
	first?: CommandProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<CommandProps>(first, second);
	const { class: className, onValueChange, nodes, ...rest } = props;

	const [query, setQuery] = signal("");
	const [selectedIndex, setSelectedIndex] = signal(0);

	const el = div({
		"data-slot": "command",
		class: cnReactive(
			"flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;

	(el as ElementWithContext).__command = {
		query,
		setQuery: (v: string) => {
			setQuery(v);
			onValueChange?.(v);
		},
		selectedIndex,
		setSelectedIndex,
		getVisibleItems: () => {
			return Array.from(
				el.querySelectorAll("[data-slot=command-item]:not([data-hidden=true])"),
			) as HTMLElement[];
		},
		filter: () => {
			const q = query().toLowerCase();
			const items = el.querySelectorAll("[data-slot=command-item]");
			const groups = el.querySelectorAll("[data-slot=command-group]");
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

			// Hide groups with no visible items
			groups.forEach((group) => {
				const hasVisible = group.querySelector(
					"[data-slot=command-item]:not([data-hidden=true])",
				);
				(group as HTMLElement).style.display = hasVisible ? "" : "none";
			});

			// Show/hide empty state
			const emptyEl = el.querySelector(
				"[data-slot=command-empty]",
			) as HTMLElement | null;
			if (emptyEl) {
				emptyEl.style.display = visibleCount === 0 ? "" : "none";
			}

			// Reset selection
			setSelectedIndex(0);
			updateSelection();
		},
		updateSelection: () => updateSelection(),
	};

	function updateSelection() {
		const items = (
			el as ElementWithContext
		).__command.getVisibleItems() as HTMLElement[];
		const idx = selectedIndex();
		items.forEach((item, i) => {
			item.setAttribute("data-selected", i === idx ? "true" : "false");
		});
	}

	// Keyboard navigation
	el.addEventListener("keydown", (ev: KeyboardEvent) => {
		const ctx = (el as ElementWithContext).__command;
		const items = ctx.getVisibleItems() as HTMLElement[];
		if (!items.length) return;

		if (ev.key === "ArrowDown") {
			ev.preventDefault();
			setSelectedIndex(Math.min(selectedIndex() + 1, items.length - 1));
			ctx.updateSelection();
		} else if (ev.key === "ArrowUp") {
			ev.preventDefault();
			setSelectedIndex(Math.max(selectedIndex() - 1, 0));
			ctx.updateSelection();
		} else if (ev.key === "Enter") {
			ev.preventDefault();
			const idx = selectedIndex();
			if (items[idx]) items[idx].click();
		}
	});

	return el as HTMLElement;
}

// ── CommandInput ─────────────────────────────────────────────────────────────

export interface CommandInputProps extends BaseProps {
	placeholder?: string;
	disabled?: boolean;
	value?: string;
}

export function CommandInput(
	first?: CommandInputProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<CommandInputProps>(first, second);
	const { class: className, placeholder, disabled, value, ...rest } = props;

	const inputEl = inputTag({
		"data-slot": "command-input",
		type: "text",
		placeholder,
		disabled,
		value,
		class: cnReactive(
			"flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
			className,
		),
		...rest,
	}) as HTMLElement;

	const wrapper = div({
		"data-slot": "command-input-wrapper",
		class: "flex h-9 items-center gap-2 border-b px-3",
		nodes: [SearchIcon({ class: "size-4 shrink-0 opacity-50" }), inputEl],
	}) as HTMLElement;

	// Wire to parent command
	queueMicrotask(() => {
		const cmdEl = wrapper.closest("[data-slot=command]");
		if (cmdEl) {
			const ctx = (cmdEl as ElementWithContext).__command;
			if (ctx) {
				inputEl.addEventListener("input", () => {
					ctx.setQuery((inputEl as HTMLInputElement).value);
					ctx.filter();
				});
			}
		}
	});

	return wrapper as HTMLElement;
}

// ── CommandList ──────────────────────────────────────────────────────────────

export function CommandList(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return div({
		"data-slot": "command-list",
		role: "listbox",
		class: cnReactive(
			"max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── CommandEmpty ─────────────────────────────────────────────────────────────

export function CommandEmpty(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	const el = div({
		"data-slot": "command-empty",
		class: cnReactive("py-6 text-center text-sm", className),
		style: "display: none",
		nodes,
		...rest,
	}) as HTMLElement;
	return el as HTMLElement;
}

// ── CommandGroup ─────────────────────────────────────────────────────────────

export interface CommandGroupProps extends BaseProps {
	heading?: string;
}

export function CommandGroup(
	first?: CommandGroupProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<CommandGroupProps>(first, second);
	const { class: className, heading, nodes, ...rest } = props;

	const headingEl = heading
		? div({
				"cmdk-group-heading": "",
				"data-slot": "command-group-heading",
				nodes: heading,
			})
		: null;

	const childNodes: Node[] = [];
	if (headingEl) childNodes.push(headingEl as Node);
	childNodes.push(...toNodes(nodes));

	return div({
		"data-slot": "command-group",
		role: "group",
		class: cnReactive(
			"overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
			className,
		),
		nodes: childNodes,
		...rest,
	}) as HTMLElement;
}

// ── CommandItem ──────────────────────────────────────────────────────────────

export interface CommandItemProps extends BaseProps {
	disabled?: boolean;
	value?: string;
	onSelect?: (value: string) => void;
}

export function CommandItem(
	first?: CommandItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<CommandItemProps>(first, second);
	const {
		class: className,
		disabled,
		value,
		onSelect,
		nodes,
		on,
		...rest
	} = props;

	const el = div({
		"data-slot": "command-item",
		"data-disabled": disabled ? "true" : undefined,
		"data-value": value,
		"data-selected": "false",
		"data-hidden": "false",
		role: "option",
		class: cn(
			"relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
			className,
		),
		nodes,
		on: {
			...on,
			click: (ev: Event) => {
				if (disabled) return;
				const val =
					value ?? (ev.currentTarget as HTMLElement).textContent ?? "";
				onSelect?.(val);
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	return el as HTMLElement;
}

// ── CommandShortcut ──────────────────────────────────────────────────────────

export function CommandShortcut(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	return span({
		"data-slot": "command-shortcut",
		class: cnReactive(
			"ml-auto text-xs tracking-widest text-muted-foreground",
			className,
		),
		nodes,
		...rest,
	}) as HTMLElement;
}

// ── CommandSeparator ─────────────────────────────────────────────────────────

export function CommandSeparator(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, ...rest } = props;
	return div({
		"data-slot": "command-separator",
		role: "separator",
		class: cnReactive("-mx-1 h-px bg-border", className),
		...rest,
	}) as HTMLElement;
}

// ── CommandDialog ────────────────────────────────────────────────────────────

export interface CommandDialogProps extends BaseProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	title?: string;
	description?: string;
	showCloseButton?: boolean;
}

export function CommandDialog(
	first?: CommandDialogProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<CommandDialogProps>(first, second);
	const {
		open,
		onOpenChange,
		title = "Command Palette",
		description = "Search for a command to run...",
		showCloseButton = true,
		nodes,
		...rest
	} = props;

	return Dialog({
		open,
		onOpenChange,
		nodes: [
			DialogContent({
				class: "overflow-hidden p-0",
				showCloseButton,
				nodes: [
					DialogHeader({
						class: "sr-only",
						nodes: [
							DialogTitle({ nodes: title }),
							DialogDescription({ nodes: description }),
						],
					}),
					Command({
						class:
							"**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
						nodes,
						...rest,
					}),
				],
			}),
		],
	}) as HTMLElement;
}
