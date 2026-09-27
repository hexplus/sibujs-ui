import { effect, signal } from "sibujs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Calendar, type DateRange } from "../../src/components/calendar";
import {
	Combobox,
	ComboboxContent,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
} from "../../src/components/combobox";
import {
	Command,
	CommandInput,
	CommandItem,
	CommandList,
} from "../../src/components/command";
import {
	ContextMenuCheckboxItem,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
} from "../../src/components/context-menu";
import {
	DropdownMenuCheckboxItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from "../../src/components/dropdown-menu";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "../../src/components/input-otp";
import {
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
} from "../../src/components/menubar";
import {
	NativeSelect,
	NativeSelectOption,
} from "../../src/components/native-select";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../src/components/select";
import { Slider } from "../../src/components/slider";
import { ToggleGroup, ToggleGroupItem } from "../../src/components/toggle-group";

/**
 * Regression tests for controlled values that were not reflected in the DOM.
 *
 * Every component here wires itself to its compound-component context one
 * microtask after construction, so tests settle a few microtasks (and, for
 * ToggleGroup, one animation frame) before asserting.
 */
const settle = async () => {
	for (let i = 0; i < 6; i++) await Promise.resolve();
};

const frame = () =>
	new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

function mount<T extends Node>(node: T): T {
	document.body.appendChild(node);
	return node;
}

beforeEach(() => {
	document.body.replaceChildren();
});

afterEach(() => {
	document.body.replaceChildren();
});

// ── Select ───────────────────────────────────────────────────────────────────

function fruitItems() {
	return [
		SelectItem({ value: "a" }, "Apple"),
		SelectItem({ value: "b" }, "Banana"),
		SelectItem({ value: "c" }, "Cherry"),
	];
}

const selectLabel = (root: HTMLElement) =>
	root.querySelector("[data-slot=select-value]")?.textContent ?? null;

const selectTrigger = (root: HTMLElement) =>
	root.querySelector("[data-slot=select-trigger]") as HTMLElement;

const selectItem = (root: HTMLElement, value: string) =>
	root.querySelector(
		`[data-slot=select-item][data-value="${value}"]`,
	) as HTMLElement;

describe("regression: Select label is derived from the value", () => {
	it("regression: trigger label follows a getter value A -> B -> '' -> unknown", async () => {
		const [v, setV] = signal("a");
		const root = mount(
			Select({ value: () => v() }, [
				SelectTrigger({ placeholder: "Pick a fruit" }),
				SelectContent(fruitItems()),
			]),
		);
		await settle();
		expect(selectLabel(root)).toBe("Apple");

		setV("b");
		await settle();
		expect(selectLabel(root)).toBe("Banana");
		expect(selectItem(root, "b").getAttribute("aria-selected")).toBe("true");

		setV("");
		await settle();
		expect(selectLabel(root)).toBe("Pick a fruit");
		expect(selectTrigger(root).hasAttribute("data-placeholder")).toBe(true);

		setV("nope");
		await settle();
		expect(selectLabel(root)).toBe("Pick a fruit");
		expect(selectTrigger(root).hasAttribute("data-placeholder")).toBe(true);
	});

	it("regression: SelectValue follows a getter value A -> B -> '' -> unknown", async () => {
		const [v, setV] = signal("a");
		const root = mount(
			Select({ value: () => v() }, [
				SelectTrigger([SelectValue({ placeholder: "Pick a fruit" })]),
				SelectContent(fruitItems()),
			]),
		);
		await settle();
		expect(selectLabel(root)).toBe("Apple");

		setV("c");
		await settle();
		expect(selectLabel(root)).toBe("Cherry");

		setV("");
		await settle();
		expect(selectLabel(root)).toBe("Pick a fruit");

		setV("nope");
		await settle();
		expect(selectLabel(root)).toBe("Pick a fruit");
	});

	it("regression: SelectValue without a placeholder clears when the value is cleared", async () => {
		const [v, setV] = signal("b");
		const root = mount(
			Select({ value: () => v() }, [
				SelectTrigger([SelectValue()]),
				SelectContent(fruitItems()),
			]),
		);
		await settle();
		expect(selectLabel(root)).toBe("Banana");

		setV("");
		await settle();
		expect(selectLabel(root)).toBe("");
	});

	it("regression: label is correct on first render, before the menu is ever opened", async () => {
		const root = mount(
			Select({ defaultValue: "c" }, [
				SelectTrigger([SelectValue({ placeholder: "Pick a fruit" })]),
				SelectContent(fruitItems()),
			]),
		);
		await settle();
		const content = root.querySelector(
			"[data-slot=select-content]",
		) as HTMLElement;
		expect(content.getAttribute("data-state")).toBe("closed");
		expect(selectLabel(root)).toBe("Cherry");
		expect(selectTrigger(root).hasAttribute("data-placeholder")).toBe(false);
	});

	it("regression: SelectValue placeholder shows on first render when nothing is selected", async () => {
		const root = mount(
			Select([
				SelectTrigger([SelectValue({ placeholder: "Pick a fruit" })]),
				SelectContent(fruitItems()),
			]),
		);
		await settle();
		expect(selectLabel(root)).toBe("Pick a fruit");
		expect(selectTrigger(root).hasAttribute("data-placeholder")).toBe(true);
	});

	it("regression: a controlled Select whose parent rejects a click keeps the correct label", async () => {
		const [v] = signal("a");
		const onValueChange = vi.fn();
		const root = mount(
			Select({ value: () => v(), onValueChange }, [
				SelectTrigger({ placeholder: "Pick a fruit" }),
				SelectContent(fruitItems()),
			]),
		);
		await settle();

		selectTrigger(root).click();
		selectItem(root, "b").click();
		await settle();

		expect(onValueChange).toHaveBeenCalledWith("b");
		expect(selectLabel(root)).toBe("Apple");
		expect(selectItem(root, "a").getAttribute("aria-selected")).toBe("true");
		expect(selectItem(root, "b").getAttribute("aria-selected")).toBe("false");
	});

	it("regression: a controlled Select whose parent accepts a click shows the new label", async () => {
		const [v, setV] = signal("a");
		const root = mount(
			Select({ value: () => v(), onValueChange: setV }, [
				SelectTrigger({ placeholder: "Pick a fruit" }),
				SelectContent(fruitItems()),
			]),
		);
		await settle();

		selectTrigger(root).click();
		selectItem(root, "c").click();
		await settle();

		expect(selectLabel(root)).toBe("Cherry");
	});

	it("regression: `name` submits the value with the form instead of landing on the wrapper", async () => {
		const form = document.createElement("form");
		const root = Select({ name: "fruit", defaultValue: "b" }, [
			SelectTrigger({ placeholder: "Pick a fruit" }),
			SelectContent(fruitItems()),
		]);
		form.appendChild(root);
		mount(form);
		await settle();

		expect(root.getAttribute("name")).toBeNull();
		expect([...new FormData(form).entries()]).toEqual([["fruit", "b"]]);

		selectTrigger(root).click();
		selectItem(root, "c").click();
		await settle();
		expect([...new FormData(form).entries()]).toEqual([["fruit", "c"]]);
	});

	it("regression: form reset returns an uncontrolled Select to its defaultValue", async () => {
		const form = document.createElement("form");
		const root = Select({ name: "fruit", defaultValue: "a" }, [
			SelectTrigger({ placeholder: "Pick a fruit" }),
			SelectContent(fruitItems()),
		]);
		form.appendChild(root);
		mount(form);
		await settle();

		selectTrigger(root).click();
		selectItem(root, "c").click();
		await settle();
		expect(selectLabel(root)).toBe("Cherry");

		form.reset();
		await settle();
		expect(selectLabel(root)).toBe("Apple");
		expect([...new FormData(form).entries()]).toEqual([["fruit", "a"]]);
	});

	it("regression: label follows an item that mounts after the value was set", async () => {
		const [items, setItems] = signal<string[]>([]);
		const root = mount(
			Select({ defaultValue: "late" }, [
				SelectTrigger({ placeholder: "Pick" }),
				SelectContent(() => items().map((v) => SelectItem({ value: v }, `Item ${v}`))),
			]),
		);
		await settle();
		expect(selectLabel(root)).toBe("Pick");

		setItems(["early", "late"]);
		await settle();
		expect(selectLabel(root)).toBe("Item late");
	});

	it("regression: label stays live when the selected item's text changes", async () => {
		const [lang, setLang] = signal("en");
		const t = (en: string, es: string) => () => (lang() === "en" ? en : es);
		const items = () => [
			SelectItem({ value: "a" }, t("Apple", "Manzana")),
			SelectItem({ value: "b" }, t("Banana", "Platano")),
		];
		const withTrigger = mount(
			Select({ defaultValue: "a" }, [
				SelectTrigger({ placeholder: "Pick" }),
				SelectContent(items()),
			]),
		);
		const withValue = mount(
			Select({ defaultValue: "b" }, [
				SelectTrigger([SelectValue({ placeholder: "Pick" })]),
				SelectContent(items()),
			]),
		);
		await settle();
		expect(selectLabel(withTrigger)).toBe("Apple");
		expect(selectLabel(withValue)).toBe("Banana");

		setLang("es");
		await settle();
		expect(selectLabel(withTrigger)).toBe("Manzana");
		expect(selectLabel(withValue)).toBe("Platano");
	});

	it("regression: `required` takes part in constraint validation", async () => {
		const form = document.createElement("form");
		const root = Select({ required: true }, [
			SelectTrigger({ placeholder: "Pick a fruit" }),
			SelectContent(fruitItems()),
		]);
		form.appendChild(root);
		mount(form);
		await settle();

		expect(form.checkValidity()).toBe(false);

		selectTrigger(root).click();
		selectItem(root, "a").click();
		await settle();
		expect(form.checkValidity()).toBe(true);
	});
});

// ── Combobox ─────────────────────────────────────────────────────────────────

function comboItems() {
	return [
		ComboboxItem({ value: "a" }, "Apple"),
		ComboboxItem({ value: "b" }, "Banana"),
		ComboboxItem({ value: "c" }, "Cherry"),
	];
}

const comboInput = (root: HTMLElement) =>
	root.querySelector("[data-slot=combobox-input]") as HTMLInputElement;

const comboItem = (root: HTMLElement, value: string) =>
	root.querySelector(
		`[data-slot=combobox-item][data-value="${value}"]`,
	) as HTMLElement;

describe("regression: Combobox controlled value", () => {
	it("regression: accepts a getter value (single) and reflects changes", async () => {
		const [v, setV] = signal("a");
		const root = mount(
			Combobox({ value: () => v() }, [
				ComboboxInput(),
				ComboboxContent([ComboboxList(comboItems())]),
			]),
		);
		await settle();
		expect(comboInput(root).value).toBe("Apple");
		expect(comboItem(root, "a").getAttribute("aria-selected")).toBe("true");

		setV("b");
		await settle();
		expect(comboInput(root).value).toBe("Banana");
		expect(comboItem(root, "b").getAttribute("aria-selected")).toBe("true");
		expect(comboItem(root, "a").getAttribute("aria-selected")).toBe("false");

		setV("");
		await settle();
		expect(comboInput(root).value).toBe("");
	});

	it("regression: accepts a getter value (multiple) without crashing ComboboxValue", async () => {
		const [v, setV] = signal<string[]>(["a"]);
		const root = mount(
			Combobox({ multiple: true, value: () => v() }, [
				ComboboxValue(),
				ComboboxContent([ComboboxList(comboItems())]),
			]),
		);
		await settle();
		const valueEl = root.querySelector(
			"[data-slot=combobox-value]",
		) as HTMLElement;
		expect(valueEl.textContent).toBe("Apple");

		setV(["b", "c"]);
		await settle();
		expect(valueEl.textContent).toBe("Banana, Cherry");
		expect(comboItem(root, "a").getAttribute("aria-selected")).toBe("false");
		expect(comboItem(root, "c").getAttribute("aria-selected")).toBe("true");
	});

	it("regression: labels stay live when the selected item's text changes", async () => {
		const [lang, setLang] = signal("en");
		const t = (en: string, es: string) => () => (lang() === "en" ? en : es);
		const root = mount(
			Combobox({ defaultValue: "a" }, [
				ComboboxInput(),
				ComboboxValue(),
				ComboboxContent([
					ComboboxList([
						ComboboxItem({ value: "a" }, t("Apple", "Manzana")),
						ComboboxItem({ value: "b" }, t("Banana", "Platano")),
					]),
				]),
			]),
		);
		await settle();
		const valueEl = root.querySelector(
			"[data-slot=combobox-value]",
		) as HTMLElement;
		expect(comboInput(root).value).toBe("Apple");
		expect(valueEl.textContent).toBe("Apple");

		setLang("es");
		await settle();
		expect(comboInput(root).value).toBe("Manzana");
		expect(valueEl.textContent).toBe("Manzana");
	});

	it("regression: a controlled Combobox whose parent rejects a click keeps its value", async () => {
		const [v] = signal("a");
		const onValueChange = vi.fn();
		const root = mount(
			Combobox({ value: () => v(), onValueChange }, [
				ComboboxInput(),
				ComboboxContent([ComboboxList(comboItems())]),
			]),
		);
		await settle();

		comboItem(root, "c").click();
		await settle();
		expect(onValueChange).toHaveBeenCalledWith("c");
		expect(comboInput(root).value).toBe("Apple");
		expect(comboItem(root, "c").getAttribute("aria-selected")).toBe("false");
	});
});

// ── Menu radio groups and checkbox items ─────────────────────────────────────

const radioCases = [
	{
		name: "DropdownMenuRadioGroup",
		Group: DropdownMenuRadioGroup,
		Item: DropdownMenuRadioItem,
		slot: "dropdown-menu-radio-item",
	},
	{
		name: "ContextMenuRadioGroup",
		Group: ContextMenuRadioGroup,
		Item: ContextMenuRadioItem,
		slot: "context-menu-radio-item",
	},
	{
		name: "MenubarRadioGroup",
		Group: MenubarRadioGroup,
		Item: MenubarRadioItem,
		slot: "menubar-radio-item",
	},
];

for (const { name, Group, Item, slot } of radioCases) {
	describe(`regression: ${name} controlled value`, () => {
		const checkedOf = (root: HTMLElement, index: number) =>
			root
				.querySelectorAll(`[data-slot=${slot}]`)
				[index].getAttribute("aria-checked");

		it(`regression: ${name} reflects external changes of a getter value`, async () => {
			const [v, setV] = signal("top");
			const root = mount(
				Group({ value: () => v() }, [
					Item({ value: "top" }, "Top"),
					Item({ value: "bottom" }, "Bottom"),
				]),
			);
			await settle();
			expect(checkedOf(root, 0)).toBe("true");
			expect(checkedOf(root, 1)).toBe("false");

			setV("bottom");
			await settle();
			expect(checkedOf(root, 0)).toBe("false");
			expect(checkedOf(root, 1)).toBe("true");
		});

		it(`regression: ${name} does not change internally when controlled`, async () => {
			const [v] = signal("top");
			const onValueChange = vi.fn();
			const root = mount(
				Group({ value: () => v(), onValueChange }, [
					Item({ value: "top" }, "Top"),
					Item({ value: "bottom" }, "Bottom"),
				]),
			);
			await settle();

			(root.querySelectorAll(`[data-slot=${slot}]`)[1] as HTMLElement).click();
			await settle();
			expect(onValueChange).toHaveBeenCalledWith("bottom");
			expect(checkedOf(root, 0)).toBe("true");
			expect(checkedOf(root, 1)).toBe("false");
		});
	});
}

const checkboxCases = [
	{ name: "DropdownMenuCheckboxItem", Item: DropdownMenuCheckboxItem },
	{ name: "ContextMenuCheckboxItem", Item: ContextMenuCheckboxItem },
	{ name: "MenubarCheckboxItem", Item: MenubarCheckboxItem },
];

for (const { name, Item } of checkboxCases) {
	describe(`regression: ${name} controlled checked`, () => {
		it(`regression: ${name} reflects external changes of a getter`, async () => {
			const [c, setC] = signal(false);
			const item = mount(Item({ checked: () => c() }, "Status bar"));
			await settle();
			expect(item.getAttribute("aria-checked")).toBe("false");

			setC(true);
			await settle();
			expect(item.getAttribute("aria-checked")).toBe("true");
			expect(item.querySelector("svg")).not.toBeNull();
		});

		it(`regression: ${name} does not toggle internally when controlled`, async () => {
			const [c] = signal(true);
			const onCheckedChange = vi.fn();
			const item = mount(
				Item({ checked: () => c(), onCheckedChange }, "Status bar"),
			);
			await settle();

			item.click();
			await settle();
			expect(onCheckedChange).toHaveBeenCalledWith(false);
			expect(item.getAttribute("aria-checked")).toBe("true");
		});

		it(`regression: ${name} still toggles when uncontrolled`, async () => {
			const item = mount(Item({ defaultChecked: true }, "Status bar"));
			await settle();
			expect(item.getAttribute("aria-checked")).toBe("true");
			item.click();
			await settle();
			expect(item.getAttribute("aria-checked")).toBe("false");
		});
	});
}

// ── Slider ───────────────────────────────────────────────────────────────────

describe("regression: Slider controlled value", () => {
	it("regression: reflects a controlled array that changes length", async () => {
		const [v, setV] = signal([50]);
		const root = mount(Slider({ value: () => v() }));
		const thumbs = () =>
			Array.from(
				root.querySelectorAll("[data-slot=slider-thumb]"),
			) as HTMLElement[];
		await settle();
		expect(thumbs()).toHaveLength(1);

		setV([20, 80]);
		await settle();
		expect(thumbs()).toHaveLength(2);
		expect(thumbs().map((t) => t.getAttribute("aria-valuenow"))).toEqual([
			"20",
			"80",
		]);
		expect(thumbs()[1].style.left).toBe("80%");

		setV([10]);
		await settle();
		expect(thumbs()).toHaveLength(1);
		expect(thumbs()[0].getAttribute("aria-valuenow")).toBe("10");
	});
});

// ── NativeSelect ─────────────────────────────────────────────────────────────

function nativeOptions() {
	return [
		NativeSelectOption({ value: "a" }, "Apple"),
		NativeSelectOption({ value: "b" }, "Banana"),
		NativeSelectOption({ value: "c" }, "Cherry"),
	];
}

const nativeSelect = (root: HTMLElement) =>
	root.querySelector("select") as HTMLSelectElement;

describe("regression: NativeSelect value", () => {
	it("regression: an initial static value sticks", async () => {
		const root = mount(NativeSelect({ value: "b" }, nativeOptions()));
		await settle();
		expect(nativeSelect(root).value).toBe("b");
	});

	it("regression: defaultValue selects the option and is restored on form reset", async () => {
		const form = document.createElement("form");
		const root = NativeSelect({ name: "f", defaultValue: "c" }, nativeOptions());
		form.appendChild(root);
		mount(form);
		await settle();
		expect(nativeSelect(root).value).toBe("c");

		nativeSelect(root).value = "a";
		form.reset();
		expect(nativeSelect(root).value).toBe("c");
	});

	it("regression: a getter value drives the selection", async () => {
		const [v, setV] = signal("a");
		const root = mount(NativeSelect({ value: () => v() }, nativeOptions()));
		await settle();
		expect(nativeSelect(root).value).toBe("a");

		setV("c");
		await settle();
		expect(nativeSelect(root).value).toBe("c");
	});

	it("regression: a controlled NativeSelect whose parent rejects a change reverts", async () => {
		const [v] = signal("b");
		const onChange = vi.fn();
		const root = mount(
			NativeSelect({ value: () => v(), onChange }, nativeOptions()),
		);
		await settle();

		const sel = nativeSelect(root);
		sel.value = "a";
		sel.dispatchEvent(new Event("change", { bubbles: true }));
		await settle();
		expect(onChange).toHaveBeenCalledWith("a");
		expect(sel.value).toBe("b");
	});
});

// ── ToggleGroup ──────────────────────────────────────────────────────────────

describe("regression: ToggleGroup controlled value", () => {
	const stateOf = (root: HTMLElement) =>
		Array.from(root.querySelectorAll("[data-slot=toggle-group-item]")).map(
			(i) => i.getAttribute("data-state"),
		);

	it("regression: reflects external changes of a getter value", async () => {
		const [v, setV] = signal("bold");
		const root = mount(
			ToggleGroup({ type: "single", value: () => v() }, [
				ToggleGroupItem({ value: "bold" }, "B"),
				ToggleGroupItem({ value: "italic" }, "I"),
			]),
		);
		await settle();
		await frame();
		expect(stateOf(root)).toEqual(["on", "off"]);

		setV("italic");
		await settle();
		expect(stateOf(root)).toEqual(["off", "on"]);
	});

	it("regression: does not toggle internally when controlled", async () => {
		const [v] = signal<string[]>(["bold"]);
		const onValueChange = vi.fn();
		const root = mount(
			ToggleGroup({ type: "multiple", value: () => v(), onValueChange }, [
				ToggleGroupItem({ value: "bold" }, "B"),
				ToggleGroupItem({ value: "italic" }, "I"),
			]),
		);
		await settle();
		await frame();

		(
			root.querySelectorAll("[data-slot=toggle-group-item]")[1] as HTMLElement
		).click();
		await settle();
		expect(onValueChange).toHaveBeenCalledWith(["bold", "italic"]);
		expect(stateOf(root)).toEqual(["on", "off"]);
	});
});

// ── InputOTP ─────────────────────────────────────────────────────────────────

describe("regression: InputOTP controlled value", () => {
	function otp(props: Record<string, unknown>) {
		return mount(
			InputOTP({ maxLength: 4, ...props }, [
				InputOTPGroup([
					InputOTPSlot({ index: 0 }),
					InputOTPSlot({ index: 1 }),
					InputOTPSlot({ index: 2 }),
					InputOTPSlot({ index: 3 }),
				]),
			]),
		);
	}
	const chars = (root: HTMLElement) =>
		Array.from(root.querySelectorAll("[data-slot=input-otp-char]"))
			.map((c) => c.textContent)
			.join("");
	const hidden = (root: HTMLElement) =>
		root.querySelector("[data-slot=input-otp-hidden]") as HTMLInputElement;

	it("regression: reflects external changes of a getter value", async () => {
		const [v, setV] = signal("12");
		const root = otp({ value: () => v() });
		await settle();
		expect(chars(root)).toBe("12");
		expect(hidden(root).value).toBe("12");

		setV("9876");
		await settle();
		expect(chars(root)).toBe("9876");
		expect(hidden(root).value).toBe("9876");

		setV("");
		await settle();
		expect(chars(root)).toBe("");
		expect(hidden(root).value).toBe("");
	});

	it("regression: a controlled InputOTP whose parent rejects input keeps its value", async () => {
		const [v] = signal("12");
		const onValueChange = vi.fn();
		const root = otp({ value: () => v(), onValueChange });
		await settle();

		hidden(root).value = "123";
		hidden(root).dispatchEvent(new Event("input"));
		await settle();
		expect(onValueChange).toHaveBeenCalledWith("123");
		expect(chars(root)).toBe("12");
		expect(hidden(root).value).toBe("12");
	});
});

// ── Calendar ─────────────────────────────────────────────────────────────────

describe("regression: Calendar controlled selection", () => {
	const selectedDay = (root: HTMLElement) =>
		root.querySelector("[data-selected-single=true]")?.textContent ?? null;
	const day = (root: HTMLElement, n: number) =>
		Array.from(root.querySelectorAll("[data-slot=calendar-day]")).find(
			(b) => b.textContent === String(n) && !b.hasAttribute("data-outside"),
		) as HTMLElement;

	it("regression: a getter `selected` drives the selected day", async () => {
		const [d, setD] = signal<Date | undefined>(new Date(2026, 0, 10));
		const root = mount(
			Calendar({ selected: () => d(), defaultMonth: new Date(2026, 0, 1) }),
		);
		await settle();
		expect(selectedDay(root)).toBe("10");

		setD(new Date(2026, 0, 20));
		await settle();
		expect(selectedDay(root)).toBe("20");

		setD(undefined);
		await settle();
		expect(selectedDay(root)).toBeNull();
	});

	const dayKey = (y: number, m: number, d: number) =>
		new Date(y, m, d).toLocaleDateString();
	const showsDay = (root: HTMLElement, y: number, m: number, d: number) =>
		Array.from(root.querySelectorAll("[data-slot=calendar-day]")).some(
			(b) =>
				b.getAttribute("data-day") === dayKey(y, m, d) &&
				!b.hasAttribute("data-outside"),
		);

	it("regression: a controlled date set to another month moves the view to it", async () => {
		const [d, setD] = signal<Date | undefined>(new Date(2026, 0, 10));
		const root = mount(
			Calendar({ selected: () => d(), defaultMonth: new Date(2026, 0, 1) }),
		);
		await settle();
		expect(showsDay(root, 2026, 0, 15)).toBe(true);

		setD(new Date(2026, 2, 5));
		await settle();
		expect(showsDay(root, 2026, 2, 15)).toBe(true);
		expect(selectedDay(root)).toBe("5");

		// Browsing away afterwards is not undone.
		(
			root.querySelector("[data-slot=calendar-nav-next]") as HTMLElement
		).click();
		await settle();
		expect(showsDay(root, 2026, 3, 15)).toBe(true);
		expect(selectedDay(root)).toBeNull();
	});

	it("regression: a controlled date already visible does not move the view", async () => {
		const [d, setD] = signal<Date | undefined>(new Date(2026, 0, 10));
		const root = mount(
			Calendar({
				selected: () => d(),
				defaultMonth: new Date(2026, 0, 1),
				numberOfMonths: 2,
			}),
		);
		await settle();

		setD(new Date(2026, 1, 14));
		await settle();
		expect(showsDay(root, 2026, 0, 15)).toBe(true);
		expect(selectedDay(root)).toBe("14");
	});

	it("regression: a controlled range set to another month moves the view to it", async () => {
		const [r, setR] = signal({
			from: new Date(2026, 0, 3),
			to: new Date(2026, 0, 8),
		});
		const root = mount(
			Calendar({
				mode: "range",
				selected: () => r(),
				defaultMonth: new Date(2026, 0, 1),
			}),
		);
		await settle();

		setR({ from: new Date(2026, 5, 1), to: new Date(2026, 5, 4) });
		await settle();
		expect(showsDay(root, 2026, 5, 15)).toBe(true);
		expect(
			root.querySelector("[data-range-start=true]")?.textContent,
		).toBe("1");
	});

	it("regression: a controlled Calendar opens on the selected month", async () => {
		const [d] = signal<Date | undefined>(new Date(2030, 6, 9));
		const root = mount(Calendar({ selected: () => d() }));
		await settle();
		expect(showsDay(root, 2030, 6, 15)).toBe(true);
		expect(selectedDay(root)).toBe("9");
	});

	it("regression: a controlled Calendar whose parent rejects a click keeps its selection", async () => {
		const [d] = signal<Date | undefined>(new Date(2026, 0, 10));
		const onSelect = vi.fn();
		const root = mount(
			Calendar({
				selected: () => d(),
				onSelect,
				defaultMonth: new Date(2026, 0, 1),
			}),
		);
		await settle();

		day(root, 15).click();
		await settle();
		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(selectedDay(root)).toBe("10");
	});
});

// ── Command ──────────────────────────────────────────────────────────────────

describe("regression: CommandInput value", () => {
	const visible = (root: HTMLElement) =>
		Array.from(root.querySelectorAll("[data-slot=command-item]"))
			.filter((i) => i.getAttribute("data-hidden") !== "true")
			.map((i) => i.textContent);

	it("regression: a getter value drives the input and the filter", async () => {
		const [q, setQ] = signal("ban");
		const root = mount(
			Command([
				CommandInput({ value: () => q() }),
				CommandList([
					CommandItem("Apple"),
					CommandItem("Banana"),
					CommandItem("Cherry"),
				]),
			]),
		);
		await settle();
		const input = root.querySelector(
			"[data-slot=command-input]",
		) as HTMLInputElement;
		expect(input.value).toBe("ban");
		expect(visible(root)).toEqual(["Banana"]);

		setQ("");
		await settle();
		expect(input.value).toBe("");
		expect(visible(root)).toEqual(["Apple", "Banana", "Cherry"]);
	});

	it("regression: a static value is on the input at construction, with or without a Command", async () => {
		const lone = CommandInput({ value: "ban" });
		expect(
			(lone.querySelector("[data-slot=command-input]") as HTMLInputElement)
				.value,
		).toBe("ban");

		const root = mount(
			Command([
				CommandInput({ value: "ban" }),
				CommandList([
					CommandItem("Apple"),
					CommandItem("Banana"),
					CommandItem("Cherry"),
				]),
			]),
		);
		const input = root.querySelector(
			"[data-slot=command-input]",
		) as HTMLInputElement;
		expect(input.value).toBe("ban");

		await settle();
		expect(input.value).toBe("ban");
		expect(visible(root)).toEqual(["Banana"]);
	});

	it("regression: getter changes apply synchronously and filter once each", async () => {
		const [q, setQ] = signal("");
		const root = mount(
			Command([
				CommandInput({ value: () => q() }),
				CommandList([
					CommandItem("Apple"),
					CommandItem("Banana"),
					CommandItem("Cherry"),
				]),
			]),
		);
		await settle();
		const input = root.querySelector(
			"[data-slot=command-input]",
		) as HTMLInputElement;

		// Count filter passes by wrapping the context's filter.
		const ctx = (root as unknown as { __command: { filter: () => void } })
			.__command;
		const filter = ctx.filter;
		let filters = 0;
		ctx.filter = () => {
			filters++;
			filter();
		};

		setQ("ch");
		expect(input.value).toBe("ch");
		expect(visible(root)).toEqual(["Cherry"]);
		expect(filters).toBe(1);

		setQ("a");
		setQ("ban");
		expect(input.value).toBe("ban");
		expect(visible(root)).toEqual(["Banana"]);
		expect(filters).toBe(3);

		// Nothing was queued behind the synchronous updates.
		await settle();
		expect(filters).toBe(3);
		expect(visible(root)).toEqual(["Banana"]);
	});
});

// ── Code-review follow-ups ───────────────────────────────────────────────────

describe("regression: Calendar controlled view and rendering", () => {
	const dayKey = (y: number, m: number, d: number) =>
		new Date(y, m, d).toLocaleDateString();
	const showsDay = (root: HTMLElement, y: number, m: number, d: number) =>
		Array.from(root.querySelectorAll("[data-slot=calendar-day]")).some(
			(b) =>
				b.getAttribute("data-day") === dayKey(y, m, d) &&
				!b.hasAttribute("data-outside"),
		);
	const dayButton = (
		root: HTMLElement,
		y: number,
		m: number,
		d: number,
		outside = false,
	) =>
		Array.from(root.querySelectorAll("[data-slot=calendar-day]")).find(
			(b) =>
				b.getAttribute("data-day") === dayKey(y, m, d) &&
				b.hasAttribute("data-outside") === outside,
		) as HTMLElement;
	const next = (root: HTMLElement) =>
		(root.querySelector("[data-slot=calendar-nav-next]") as HTMLElement).click();
	const selectedDay = (root: HTMLElement) =>
		root.querySelector("[data-selected-single=true]")?.textContent ?? null;

	it("regression: finishing a controlled range in a later month keeps the view there", async () => {
		const [r, setR] = signal<DateRange | undefined>(undefined);
		const root = mount(
			Calendar({
				mode: "range",
				selected: () => r(),
				onSelect: (range: DateRange) => setR(range),
				defaultMonth: new Date(2026, 0, 1),
				numberOfMonths: 1,
			}),
		);
		await settle();

		dayButton(root, 2026, 0, 10).click();
		await settle();
		next(root);
		await settle();
		dayButton(root, 2026, 1, 5).click();
		await settle();

		expect(r()?.from?.getDate()).toBe(10);
		expect(r()?.to?.getMonth()).toBe(1);
		expect(showsDay(root, 2026, 1, 15)).toBe(true);
		expect(root.querySelector("[data-range-end=true]")?.textContent).toBe("5");
	});

	it("regression: clicking an outside day in controlled single mode does not move the view", async () => {
		const [d, setD] = signal<Date | undefined>(undefined);
		const root = mount(
			Calendar({
				selected: () => d(),
				onSelect: (date: Date) => setD(date),
				defaultMonth: new Date(2026, 0, 1),
			}),
		);
		await settle();

		// January 2026 opens with 28–31 December as outside days.
		dayButton(root, 2025, 11, 31, true).click();
		await settle();
		expect(d()?.getDate()).toBe(31);
		expect(showsDay(root, 2026, 0, 15)).toBe(true);
		expect(showsDay(root, 2025, 11, 15)).toBe(false);
	});

	it("regression: a programmatic range change with a visible endpoint does not move the view", async () => {
		const [r, setR] = signal<DateRange | undefined>(undefined);
		const root = mount(
			Calendar({
				mode: "range",
				selected: () => r(),
				defaultMonth: new Date(2026, 1, 1),
			}),
		);
		await settle();

		setR({ from: new Date(2026, 0, 20), to: new Date(2026, 1, 5) });
		await settle();
		expect(showsDay(root, 2026, 1, 15)).toBe(true);
		expect(root.querySelector("[data-range-end=true]")?.textContent).toBe("5");
	});

	it("regression: an enclosing reactive scope does not rebuild the Calendar", async () => {
		const [d, setD] = signal<Date | undefined>(new Date(2026, 0, 10));
		const host = mount(document.createElement("div"));
		let builds = 0;
		const stop = effect(() => {
			builds++;
			host.replaceChildren(
				Calendar({ selected: () => d(), defaultMonth: new Date(2026, 0, 1) }),
			);
		});
		await settle();
		const calendar = host.firstElementChild;
		expect(builds).toBe(1);

		setD(new Date(2026, 0, 20));
		await settle();
		next(host);
		await settle();
		expect(builds).toBe(1);
		expect(host.firstElementChild).toBe(calendar);
		stop();
	});

	it("regression: a controlled click renders the grid once", async () => {
		const [d, setD] = signal<Date | undefined>(new Date(2026, 0, 10));
		const root = mount(
			Calendar({
				selected: () => d(),
				onSelect: (date: Date) => setD(date),
				defaultMonth: new Date(2026, 0, 1),
			}),
		);
		await settle();
		const grid = root.querySelector("[data-slot=calendar-grid]") as HTMLElement;
		// Every render starts by clearing the grid.
		let clears = 0;
		const countClears = (records: MutationRecord[]) => {
			clears += records.filter((r) => r.removedNodes.length > 0).length;
		};
		const observer = new MutationObserver(countClears);
		observer.observe(grid, { childList: true });

		dayButton(root, 2026, 0, 15).click();
		await settle();
		countClears(observer.takeRecords());
		observer.disconnect();
		expect(clears).toBe(1);
		expect(selectedDay(root)).toBe("15");
	});

	it("regression: a getter change is rendered synchronously", async () => {
		const [d, setD] = signal<Date | undefined>(new Date(2026, 0, 10));
		const root = mount(
			Calendar({ selected: () => d(), defaultMonth: new Date(2026, 0, 1) }),
		);
		await settle();

		setD(new Date(2026, 0, 20));
		expect(selectedDay(root)).toBe("20");
		setD(new Date(2026, 2, 3));
		expect(showsDay(root, 2026, 2, 15)).toBe(true);
		expect(selectedDay(root)).toBe("3");
	});
});

describe("regression: Select form bridge is not editable", () => {
	const bridgeOf = (form: HTMLFormElement) =>
		form.querySelector("[data-slot=select-form-bridge]") as HTMLInputElement;

	it("regression: typing into the bridge does not change the submitted value", async () => {
		const form = document.createElement("form");
		const root = Select({ name: "fruit", defaultValue: "b" }, [
			SelectTrigger({ placeholder: "Pick a fruit" }),
			SelectContent(fruitItems()),
		]);
		form.appendChild(root);
		mount(form);
		await settle();

		const bridge = bridgeOf(form);
		bridge.value = "zzz";
		bridge.dispatchEvent(new Event("input", { bubbles: true }));
		expect(bridge.value).toBe("b");
		expect([...new FormData(form).entries()]).toEqual([["fruit", "b"]]);
		expect(selectLabel(root)).toBe("Banana");
	});

	it("regression: required still blocks an empty Select, and focus goes to the trigger", async () => {
		const form = document.createElement("form");
		const root = Select({ name: "fruit", required: true }, [
			SelectTrigger({ placeholder: "Pick a fruit" }),
			SelectContent(fruitItems()),
		]);
		form.appendChild(root);
		mount(form);
		await settle();

		const bridge = bridgeOf(form);
		bridge.value = "typed";
		bridge.dispatchEvent(new Event("input", { bubbles: true }));
		expect(form.checkValidity()).toBe(false);
		// A validity check alone does not move focus.
		expect(document.activeElement).not.toBe(selectTrigger(root));

		// Reporting a failed submit focuses the invalid control, as the
		// browser does; the focus must end up on the trigger.
		bridge.focus();
		expect(document.activeElement).toBe(selectTrigger(root));
	});
});

describe("regression: a plain checked/value is the initial value for menus and ToggleGroup", () => {
	for (const { name, Item } of checkboxCases) {
		it(`regression: ${name} with a plain \`checked\` still toggles`, async () => {
			const onCheckedChange = vi.fn();
			const item = mount(
				Item({ checked: true, onCheckedChange }, "Status bar"),
			);
			await settle();
			expect(item.getAttribute("aria-checked")).toBe("true");

			item.click();
			await settle();
			expect(onCheckedChange).toHaveBeenLastCalledWith(false);
			expect(item.getAttribute("aria-checked")).toBe("false");

			item.click();
			await settle();
			expect(onCheckedChange).toHaveBeenLastCalledWith(true);
			expect(item.getAttribute("aria-checked")).toBe("true");
		});
	}

	for (const { name, Group, Item, slot } of radioCases.filter(
		(c) => c.name !== "MenubarRadioGroup",
	)) {
		it(`regression: ${name} with a plain \`value\` still changes on click`, async () => {
			const onValueChange = vi.fn();
			const root = mount(
				Group({ value: "top", onValueChange }, [
					Item({ value: "top" }, "Top"),
					Item({ value: "bottom" }, "Bottom"),
				]),
			);
			await settle();
			const items = () =>
				Array.from(root.querySelectorAll(`[data-slot=${slot}]`)) as HTMLElement[];
			expect(items().map((i) => i.getAttribute("aria-checked"))).toEqual([
				"true",
				"false",
			]);

			items()[1].click();
			await settle();
			expect(onValueChange).toHaveBeenCalledWith("bottom");
			expect(items().map((i) => i.getAttribute("aria-checked"))).toEqual([
				"false",
				"true",
			]);
		});
	}

	it("regression: ToggleGroup with a plain `value` still toggles", async () => {
		const onValueChange = vi.fn();
		const root = mount(
			ToggleGroup({ type: "single", value: "bold", onValueChange }, [
				ToggleGroupItem({ value: "bold" }, "B"),
				ToggleGroupItem({ value: "italic" }, "I"),
			]),
		);
		await settle();
		await frame();
		const items = () =>
			Array.from(
				root.querySelectorAll("[data-slot=toggle-group-item]"),
			) as HTMLElement[];
		expect(items().map((i) => i.getAttribute("data-state"))).toEqual([
			"on",
			"off",
		]);

		items()[1].click();
		await settle();
		expect(onValueChange).toHaveBeenCalledWith("italic");
		expect(items().map((i) => i.getAttribute("data-state"))).toEqual([
			"off",
			"on",
		]);
	});
});

describe("regression: InputOTP follows the committed value", () => {
	it("regression: a rejected paste neither completes nor moves focus", async () => {
		const [v, setV] = signal("12");
		const onComplete = vi.fn();
		const root = mount(
			InputOTP(
				{
					maxLength: 4,
					value: () => v(),
					onValueChange: (next: string) => {
						if (/^\d*$/.test(next)) setV(next);
					},
					onComplete,
				},
				[
					InputOTPGroup([
						InputOTPSlot({ index: 0 }),
						InputOTPSlot({ index: 1 }),
						InputOTPSlot({ index: 2 }),
						InputOTPSlot({ index: 3 }),
					]),
				],
			),
		);
		await settle();
		const hidden = root.querySelector(
			"[data-slot=input-otp-hidden]",
		) as HTMLInputElement;
		const active = () =>
			Array.from(root.querySelectorAll("[data-slot=input-otp-slot]"))
				.filter((s) => s.getAttribute("data-active") === "true")
				.map((s) => s.getAttribute("data-index"));

		hidden.focus();
		await settle();
		expect(active()).toEqual(["2"]);

		hidden.value = "abcd";
		hidden.dispatchEvent(new Event("input"));
		await settle();
		expect(onComplete).not.toHaveBeenCalled();
		expect(hidden.value).toBe("12");
		expect(active()).toEqual(["2"]);

		// An accepted input still completes, with the committed value.
		hidden.value = "1234";
		hidden.dispatchEvent(new Event("input"));
		await settle();
		expect(onComplete).toHaveBeenCalledWith("1234");
		expect(active()).toEqual(["3"]);
	});
});

describe("regression: NativeSelect defaultValue with options that arrive later", () => {
	it("regression: defaultValue selects a late option and form reset returns to it", async () => {
		const [opts, setOpts] = signal<string[]>([]);
		const form = document.createElement("form");
		const root = NativeSelect({ name: "f", defaultValue: "b" }, () =>
			opts().map((v) => NativeSelectOption({ value: v }, v)),
		);
		form.appendChild(root);
		mount(form);
		await settle();

		setOpts(["a", "b", "c"]);
		await settle();
		const sel = nativeSelect(root);
		expect(sel.value).toBe("b");

		sel.value = "c";
		form.reset();
		expect(sel.value).toBe("b");
	});

	it("guard: a late default option does not take the selection from the user", async () => {
		const root = mount(
			NativeSelect({ defaultValue: "b" }, [
				NativeSelectOption({ value: "a" }, "a"),
				NativeSelectOption({ value: "c" }, "c"),
			]),
		);
		await settle();
		const sel = nativeSelect(root);
		sel.value = "c";
		sel.dispatchEvent(new Event("change", { bubbles: true }));

		sel.appendChild(NativeSelectOption({ value: "b" }, "b"));
		await settle();
		expect(sel.value).toBe("c");
	});
});

describe("regression: item registration does not re-render labels per item", () => {
	const manyValues = Array.from({ length: 500 }, (_, i) => `i${i}`);

	/**
	 * Count mutations of `target` from now on; each label render replaces its
	 * content once. Call the result to stop counting and read the total.
	 */
	function countRenders(target: Node) {
		let count = 0;
		const observer = new MutationObserver((records) => {
			count += records.length;
		});
		observer.observe(target, {
			childList: true,
			subtree: true,
			characterData: true,
		});
		return () => {
			count += observer.takeRecords().length;
			observer.disconnect();
			return count;
		};
	}

	it("regression: mounting 500 Select items renders the label a bounded number of times", async () => {
		const [label, setLabel] = signal("Item 250");
		const root = mount(
			Select({ defaultValue: "i250" }, [
				SelectTrigger({ placeholder: "Pick" }),
				SelectContent(
					manyValues.map((v) =>
						SelectItem({ value: v }, v === "i250" ? () => label() : `Item ${v}`),
					),
				),
			]),
		);
		const valueEl = root.querySelector("[data-slot=select-value]") as HTMLElement;
		const renders = countRenders(valueEl);
		await settle();
		expect(renders()).toBeLessThanOrEqual(2);
		expect(selectLabel(root)).toBe("Item 250");

		setLabel("Renamed");
		await settle();
		expect(selectLabel(root)).toBe("Renamed");
	});

	it("regression: mounting 500 Combobox items renders the label a bounded number of times", async () => {
		const [label, setLabel] = signal("Item 250");
		const root = mount(
			Combobox({ defaultValue: "i250" }, [
				ComboboxValue(),
				ComboboxContent([
					ComboboxList(
						manyValues.map((v) =>
							ComboboxItem(
								{ value: v },
								v === "i250" ? () => label() : `Item ${v}`,
							),
						),
					),
				]),
			]),
		);
		const valueEl = root.querySelector(
			"[data-slot=combobox-value]",
		) as HTMLElement;
		const renders = countRenders(valueEl);
		await settle();
		expect(renders()).toBeLessThanOrEqual(2);
		expect(valueEl.textContent).toBe("Item 250");

		setLabel("Renamed");
		await settle();
		expect(valueEl.textContent).toBe("Renamed");
	});
});
