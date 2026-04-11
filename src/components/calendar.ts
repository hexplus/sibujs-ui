import {
	button as buttonTag,
	div,
	type NodeChildren,
	registerDisposer,
	signal,
	span,
} from "sibujs";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { cn } from "../lib/utils";
import { buttonVariants } from "./button";
import { type BaseProps, normalizeArgs } from "./types";

interface ElementWithCalendarDropdowns extends HTMLElement {
	__monthDropdown?: { root: HTMLElement; update: (value: string) => void };
	__yearDropdown?: { root: HTMLElement; update: (value: string) => void };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const SHORT_MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

function daysInMonth(year: number, month: number): number {
	return new Date(year, month + 1, 0).getDate();
}

function isSameDay(a: Date, b: Date): boolean {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

function isToday(d: Date): boolean {
	return isSameDay(d, new Date());
}

function isInRange(
	d: Date,
	from?: Date,
	to?: Date,
): "start" | "end" | "middle" | false {
	if (!from || !to) return false;
	if (isSameDay(d, from)) return "start";
	if (isSameDay(d, to)) return "end";
	if (d > from && d < to) return "middle";
	return false;
}

// ── Calendar ─────────────────────────────────────────────────────────────────

export interface DateRange {
	from?: Date;
	to?: Date;
}

export type CalendarProps = BaseProps & {
	defaultMonth?: Date;
	disabled?: (date: Date) => boolean;
	showOutsideDays?: boolean;
	numberOfMonths?: number;
	captionLayout?: "label" | "dropdown";
	startYear?: number;
	endYear?: number;
} & (
		| { mode?: "single"; selected?: Date; onSelect?: (date: Date) => void }
		| {
				mode: "range";
				selected?: DateRange;
				onSelect?: (range: DateRange) => void;
		  }
	);

export function Calendar(
	first?: CalendarProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<CalendarProps>(first, second);
	const {
		class: className,
		mode = "single",
		selected,
		defaultMonth,
		onSelect,
		disabled: isDisabled,
		showOutsideDays = true,
		numberOfMonths = 1,
		captionLayout = "label",
		startYear = new Date().getFullYear() - 100,
		endYear = new Date().getFullYear() + 10,
		...rest
	} = props;

	const initial =
		defaultMonth ??
		(mode === "single" && selected instanceof Date ? selected : undefined) ??
		(mode === "range" && selected && !(selected instanceof Date)
			? selected.from
			: undefined) ??
		new Date();
	const [currentYear, setCurrentYear] = signal(initial.getFullYear());
	const [currentMonth, setCurrentMonth] = signal(initial.getMonth());

	// Single mode state
	const [selectedDate, setSelectedDate] = signal<Date | null>(
		mode === "single" && selected instanceof Date ? selected : null,
	);

	// Range mode state
	const [rangeFrom, setRangeFrom] = signal<Date | undefined>(
		mode === "range" && selected && !(selected instanceof Date)
			? selected.from
			: undefined,
	);
	const [rangeTo, setRangeTo] = signal<Date | undefined>(
		mode === "range" && selected && !(selected instanceof Date)
			? selected.to
			: undefined,
	);

	// ── Custom dropdown builder ──
	function createCustomDropdown(
		items: { value: string; label: string }[],
		currentValue: string,
		onChange: (value: string) => void,
	): { root: HTMLElement; update: (value: string) => void } {
		const triggerLabel = span(
			items.find((i) => i.value === currentValue)?.label ?? "",
		) as HTMLElement;
		const listEl = div({
			class:
				"absolute left-0 top-full z-50 mt-1 max-h-48 min-w-full overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
			style: "display: none",
		}) as HTMLElement;

		let isOpen = false;

		function close() {
			isOpen = false;
			listEl.style.display = "none";
			document.removeEventListener("mousedown", outsideClick);
		}

		function outsideClick(ev: MouseEvent) {
			if (!root.contains(ev.target as Node)) close();
		}

		function renderItems(selected: string) {
			listEl.innerHTML = "";
			for (const item of items) {
				const isActive = item.value === selected;
				const option = div(
					{
						class: cn(
							"relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none hover:bg-accent hover:text-accent-foreground",
							isActive && "bg-accent text-accent-foreground font-medium",
						),
						on: {
							click: () => {
								onChange(item.value);
								close();
							},
						},
					},
					item.label,
				) as HTMLElement;
				listEl.appendChild(option);
			}
			// Scroll active into view
			requestAnimationFrame(() => {
				const activeIdx = items.findIndex((i) => i.value === selected);
				if (activeIdx >= 0 && listEl.children[activeIdx]) {
					(listEl.children[activeIdx] as HTMLElement).scrollIntoView({
						block: "center",
					});
				}
			});
		}

		const trigger = buttonTag(
			{
				type: "button",
				class:
					"flex h-8 items-center gap-1 rounded-md pr-1 pl-2 text-sm select-none",
				on: {
					click: () => {
						if (isOpen) {
							close();
						} else {
							isOpen = true;
							renderItems(
								items.find((i) => i.label === triggerLabel.textContent)
									?.value ?? currentValue,
							);
							listEl.style.display = "";
							document.addEventListener("mousedown", outsideClick);
						}
					},
				},
			},
			[
				triggerLabel,
				ChevronDownIcon({
					class: "size-3.5 text-muted-foreground",
				}) as unknown as Node,
			],
		) as HTMLElement;

		const root = div(
			{
				class:
					"relative rounded-md border border-input shadow-xs has-focus:border-ring has-focus:ring-[3px] has-focus:ring-ring/50",
			},
			[trigger, listEl],
		) as HTMLElement;

		// Detach the outside-click listener if the dropdown is disposed while open
		registerDisposer(root, () => {
			document.removeEventListener("mousedown", outsideClick);
		});

		function update(value: string) {
			const item = items.find((i) => i.value === value);
			if (item) triggerLabel.textContent = item.label;
		}

		return { root, update };
	}

	function createDropdownCaption(panelIndex: number): HTMLElement {
		const monthItems = SHORT_MONTHS.map((label, i) => ({
			value: String(i),
			label,
		}));
		const yearItems: { value: string; label: string }[] = [];
		for (let y = startYear; y <= endYear; y++) {
			yearItems.push({ value: String(y), label: String(y) });
		}

		const monthDropdown = createCustomDropdown(
			monthItems,
			String(currentMonth() + panelIndex),
			(v) => {
				setCurrentMonth(Number(v));
				updateAll();
			},
		);

		const yearDropdown = createCustomDropdown(
			yearItems,
			String(currentYear()),
			(v) => {
				setCurrentYear(Number(v));
				updateAll();
			},
		);

		const el = div(
			{
				"data-slot": "calendar-dropdowns",
				class:
					"flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
			},
			[monthDropdown.root, yearDropdown.root],
		) as HTMLElement;

		// Store update refs on element for updateDropdownCaption
		(el as ElementWithCalendarDropdowns).__monthDropdown = monthDropdown;
		(el as ElementWithCalendarDropdowns).__yearDropdown = yearDropdown;

		return el;
	}

	function updateDropdownCaption(captionEl: HTMLElement, panelIndex: number) {
		const m = currentMonth() + panelIndex;
		const y = currentYear() + Math.floor(m / 12);
		const normalizedM = ((m % 12) + 12) % 12;

		(captionEl as ElementWithCalendarDropdowns).__monthDropdown?.update(
			String(normalizedM),
		);
		(captionEl as ElementWithCalendarDropdowns).__yearDropdown?.update(
			String(y),
		);
	}

	// ── Build month panels ──
	const monthPanels: HTMLElement[] = [];
	const captionElements: HTMLElement[] = [];
	const gridContainers: HTMLElement[] = [];

	for (let i = 0; i < numberOfMonths; i++) {
		let captionEl: HTMLElement;

		if (captionLayout === "dropdown") {
			captionEl = createDropdownCaption(i);
		} else {
			const label = span({
				"data-slot": "calendar-caption-label",
				class: "text-sm font-medium select-none",
			}) as HTMLElement;
			captionEl = div(
				{
					"data-slot": "calendar-month-caption",
					class:
						"flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
				},
				[label],
			) as HTMLElement;
		}

		captionElements.push(captionEl);

		const grid = div({ "data-slot": "calendar-grid" }) as HTMLElement;
		gridContainers.push(grid);

		monthPanels.push(
			div(
				{
					class: "flex w-full flex-col gap-4",
				},
				[captionEl, grid],
			) as HTMLElement,
		);
	}

	function updateCaptions() {
		for (let i = 0; i < numberOfMonths; i++) {
			if (captionLayout === "dropdown") {
				updateDropdownCaption(captionElements[i], i);
			} else {
				const m = currentMonth() + i;
				const y = currentYear() + Math.floor(m / 12);
				const normalizedM = ((m % 12) + 12) % 12;
				const date = new Date(y, normalizedM);
				const label = captionElements[i].querySelector(
					"[data-slot=calendar-caption-label]",
				) as HTMLElement;
				if (label)
					label.textContent = date.toLocaleString("default", {
						month: "long",
						year: "numeric",
					});
			}
		}
	}

	function updateAll() {
		updateCaptions();
		renderGrids();
	}

	function renderGrids() {
		for (let i = 0; i < numberOfMonths; i++) {
			const m = currentMonth() + i;
			const y = currentYear() + Math.floor(m / 12);
			const normalizedM = ((m % 12) + 12) % 12;
			renderSingleGrid(gridContainers[i], y, normalizedM);
		}
	}

	function renderSingleGrid(
		container: HTMLElement,
		year: number,
		month: number,
	) {
		const sel = selectedDate();
		const rFrom = rangeFrom();
		const rTo = rangeTo();
		const totalDays = daysInMonth(year, month);
		const firstDay = new Date(year, month, 1).getDay();

		container.innerHTML = "";

		// Weekday headers
		container.appendChild(
			div(
				{
					class: "flex",
				},
				WEEKDAYS.map(
					(wd) =>
						div(
							{
								class:
									"flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none",
								style:
									"display: flex; align-items: center; justify-content: center; width: var(--cell-size); height: var(--cell-size)",
							},
							wd,
						) as Node,
				),
			) as HTMLElement,
		);

		const cells: Node[] = [];
		const prevMonthDays = daysInMonth(year, month - 1);

		for (let i = 0; i < firstDay; i++) {
			const dayNum = prevMonthDays - firstDay + 1 + i;
			if (showOutsideDays) {
				cells.push(
					createDayCell(
						new Date(year, month - 1, dayNum),
						true,
						sel,
						rFrom,
						rTo,
					),
				);
			} else {
				cells.push(createEmptyCell());
			}
		}

		for (let d = 1; d <= totalDays; d++) {
			cells.push(
				createDayCell(new Date(year, month, d), false, sel, rFrom, rTo),
			);
		}

		const remaining = 7 - (cells.length % 7);
		if (remaining < 7) {
			for (let i = 1; i <= remaining; i++) {
				if (showOutsideDays) {
					cells.push(
						createDayCell(new Date(year, month + 1, i), true, sel, rFrom, rTo),
					);
				} else {
					cells.push(createEmptyCell());
				}
			}
		}

		for (let i = 0; i < cells.length; i += 7) {
			container.appendChild(
				div(
					{
						class: "mt-2 flex w-full",
					},
					cells.slice(i, i + 7),
				) as HTMLElement,
			);
		}
	}

	function createEmptyCell(): Node {
		return div({
			class:
				"group/day relative flex-1 aspect-square p-0 text-center select-none",
		}) as Node;
	}

	function createDayCell(
		date: Date,
		outside: boolean,
		sel: Date | null,
		rFrom?: Date,
		rTo?: Date,
	): Node {
		const isSelected =
			mode === "single" ? (sel ? isSameDay(date, sel) : false) : false;
		const rangePos = mode === "range" ? isInRange(date, rFrom, rTo) : false;
		const isRangeSelected = rangePos === "start" || rangePos === "end";
		const isRangeMiddle = rangePos === "middle";
		const isRangeEndpoint = rangePos === "start" || rangePos === "end";
		const isTodayDate = isToday(date);
		const dayDisabled = isDisabled?.(date) ?? false;

		const btn = buttonTag(
			{
				"data-slot": "calendar-day",
				type: "button",
				disabled: dayDisabled,
				"data-day": date.toLocaleDateString(),
				"data-today": isTodayDate ? "" : undefined,
				"data-selected": isSelected || isRangeEndpoint ? "true" : undefined,
				"data-selected-single": isSelected ? "true" : "false",
				"data-range-start": rangePos === "start" ? "true" : undefined,
				"data-range-end": rangePos === "end" ? "true" : undefined,
				"data-range-middle": isRangeMiddle ? "true" : undefined,
				"data-outside": outside ? "" : undefined,
				"data-disabled": dayDisabled ? "" : undefined,
				class: cn(
					buttonVariants({ variant: "ghost", size: "icon" }),
					"flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal",
					"data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
					"data-[range-start=true]:rounded-md data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:rounded-l-md data-[range-start=true]:rounded-r-none",
					"data-[range-end=true]:rounded-md data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:rounded-r-md data-[range-end=true]:rounded-l-none",
					"data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-middle=true]:rounded-none",
					"dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70",
					"group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50",
					isTodayDate &&
						!isSelected &&
						!isRangeSelected &&
						"rounded-md bg-accent text-accent-foreground",
					isTodayDate && isSelected && "data-[selected=true]:rounded-none",
					outside &&
						"text-muted-foreground aria-selected:text-muted-foreground",
					dayDisabled && "text-muted-foreground opacity-50",
				),
				on: {
					click: () => {
						if (dayDisabled) return;
						if (mode === "single") {
							setSelectedDate(date);
							(onSelect as ((d: Date) => void) | undefined)?.(date);
						} else {
							handleRangeClick(date);
						}
						renderGrids();
					},
				},
			},
			String(date.getDate()),
		);

		return div(
			{
				class: cn(
					"group/day relative flex-1 aspect-square h-full w-full p-0 text-center select-none",
					"[&:last-child[data-selected=true]_button]:rounded-r-md",
					"[&:first-child[data-selected=true]_button]:rounded-l-md",
					isRangeMiddle && "bg-accent rounded-none",
					rangePos === "start" && "rounded-l-md bg-accent",
					rangePos === "end" && "rounded-r-md bg-accent",
					outside && "text-muted-foreground",
				),
				"data-selected": isSelected || isRangeEndpoint ? "true" : undefined,
			},
			[btn as Node],
		) as Node;
	}

	function handleRangeClick(date: Date) {
		const from = rangeFrom();
		const to = rangeTo();

		if (!from || (from && to)) {
			setRangeFrom(date);
			setRangeTo(undefined);
			(onSelect as ((r: DateRange) => void) | undefined)?.({ from: date });
		} else {
			if (date < from) {
				setRangeFrom(date);
				setRangeTo(from);
				(onSelect as ((r: DateRange) => void) | undefined)?.({
					from: date,
					to: from,
				});
			} else {
				setRangeTo(date);
				(onSelect as ((r: DateRange) => void) | undefined)?.({
					from,
					to: date,
				});
			}
		}
	}

	// ── Navigate ──
	function navigate(delta: number) {
		let m = currentMonth() + delta;
		let y = currentYear();
		while (m < 0) {
			m += 12;
			y--;
		}
		while (m > 11) {
			m -= 12;
			y++;
		}
		setCurrentMonth(m);
		setCurrentYear(y);
		updateAll();
	}

	// ── Nav buttons ──
	const prevButton = buttonTag(
		{
			"data-slot": "calendar-nav-prev",
			type: "button",
			class: cn(
				buttonVariants({ variant: "ghost" }),
				"size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
			),
			on: { click: () => navigate(-1) },
		},
		[ChevronLeftIcon({ class: "size-4" })],
	) as HTMLElement;

	const nextButton = buttonTag(
		{
			"data-slot": "calendar-nav-next",
			type: "button",
			class: cn(
				buttonVariants({ variant: "ghost" }),
				"size-(--cell-size) p-0 select-none aria-disabled:opacity-50",
			),
			on: { click: () => navigate(1) },
		},
		[ChevronRightIcon({ class: "size-4" })],
	) as HTMLElement;

	// ── Structure ──
	const nav = div(
		{
			"data-slot": "calendar-nav",
			class:
				"absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
		},
		[prevButton, nextButton],
	) as HTMLElement;

	const monthsEl = div(
		{
			class: "relative flex flex-col gap-4 md:flex-row",
		},
		[nav, ...monthPanels],
	) as HTMLElement;

	const root = div(
		{
			"data-slot": "calendar",
			class: "w-fit",
		},
		[monthsEl],
	) as HTMLElement;

	const el = div(
		{
			class: cn(
				"group/calendar bg-background p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
				className,
			),
			...rest,
		},
		[root],
	) as HTMLElement;

	updateCaptions();
	renderGrids();

	return el as HTMLElement;
}
