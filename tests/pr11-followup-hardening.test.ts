/**
 * Regression coverage for a follow-up finding on PR #11.
 *
 * RadioGroup's keydown handler returned early on ownership/disabled checks and
 * so swallowed the consumer's `on.keydown` callback.
 */
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { RadioGroup, RadioGroupItem } from "../src/components/radio-group";

const settle = async () => {
	for (let i = 0; i < 8; i++) await Promise.resolve();
};
const ITEM = "[data-slot=radio-group-item]";
const GROUP = "[data-slot=radio-group]";

const press = (el: HTMLElement, key: string) =>
	el.dispatchEvent(
		new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }),
	);

const owned = (g: HTMLElement) =>
	[...g.querySelectorAll<HTMLElement>(ITEM)].filter(
		(i) => i.closest(GROUP) === g,
	);
const checkedValue = (g: HTMLElement) =>
	owned(g).find((i) => i.getAttribute("aria-checked") === "true")
		?.getAttribute("data-value") ?? null;

beforeEach(() => document.body.replaceChildren());
afterEach(() => document.body.replaceChildren());

describe("the consumer keydown callback is never filtered out", () => {
	/** Outer group containing two owned items plus a nested inner group. */
	const buildNested = (
		outerProps: Record<string, unknown> = {},
		innerProps: Record<string, unknown> = {},
	) => {
		const outerKeys: KeyboardEvent[] = [];
		const innerKeys: KeyboardEvent[] = [];
		const outerSelected: string[] = [];
		const innerSelected: string[] = [];

		const inner = RadioGroup(
			{
				name: "inner",
				defaultValue: "i1",
				onValueChange: (v: string) => innerSelected.push(v),
				on: { keydown: (ev: Event) => innerKeys.push(ev as KeyboardEvent) },
				...innerProps,
			},
			[RadioGroupItem({ value: "i1" }), RadioGroupItem({ value: "i2" })],
		) as HTMLElement;

		const outer = RadioGroup(
			{
				name: "outer",
				defaultValue: "o1",
				onValueChange: (v: string) => outerSelected.push(v),
				on: { keydown: (ev: Event) => outerKeys.push(ev as KeyboardEvent) },
				...outerProps,
			},
			[RadioGroupItem({ value: "o1" }), RadioGroupItem({ value: "o2" }), inner],
		) as HTMLElement;

		document.body.appendChild(outer);
		return { outer, inner, outerKeys, innerKeys, outerSelected, innerSelected };
	};

	it("delivers a bubbled arrow key to both consumer handlers exactly once", async () => {
		const n = buildNested();
		await settle();

		const i1 = n.inner.querySelector(`${ITEM}[data-value=i1]`) as HTMLElement;
		const outerFocusBefore = owned(n.outer).map((i) => i.tabIndex);

		press(i1, "ArrowDown");
		await settle();

		// The inner group navigated.
		expect(n.innerSelected).toEqual(["i2"]);
		expect(checkedValue(n.inner)).toBe("i2");

		// The outer group's selection and focus order are untouched.
		expect(n.outerSelected).toEqual([]);
		expect(checkedValue(n.outer)).toBe("o1");
		expect(owned(n.outer).map((i) => i.tabIndex)).toEqual(outerFocusBefore);
		expect(document.activeElement).not.toBe(
			n.outer.querySelector(`${ITEM}[data-value=o2]`),
		);

		// Both consumer handlers saw the one event, through normal bubbling.
		expect(n.innerKeys).toHaveLength(1);
		expect(n.outerKeys).toHaveLength(1);
		expect(n.outerKeys[0]).toBe(n.innerKeys[0]);
		expect(n.outerKeys[0].key).toBe("ArrowDown");
	});

	for (const key of ["ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"]) {
		it(`delivers a bubbled ${key} to both handlers without outer navigation`, async () => {
			const n = buildNested();
			await settle();

			press(
				n.inner.querySelector(`${ITEM}[data-value=i1]`) as HTMLElement,
				key,
			);
			await settle();

			expect(n.innerKeys).toHaveLength(1);
			expect(n.outerKeys).toHaveLength(1);
			expect(n.outerSelected).toEqual([]);
			expect(checkedValue(n.outer)).toBe("o1");
			expect(n.innerSelected).toHaveLength(1);
		});
	}

	it("delivers a non-navigation key to the consumer callback", async () => {
		const n = buildNested();
		await settle();

		const o1 = n.outer.querySelector(`${ITEM}[data-value=o1]`) as HTMLElement;
		const handled = press(o1, "a");
		await settle();

		expect(n.outerKeys).toHaveLength(1);
		expect(n.outerKeys[0].key).toBe("a");
		// Nothing was selected and the event was not cancelled.
		expect(n.outerSelected).toEqual([]);
		expect(handled).toBe(true);
		expect(n.outerKeys[0].defaultPrevented).toBe(false);
	});

	it("delivers keydown from a non-item target inside the group", async () => {
		const seen: KeyboardEvent[] = [];
		const label = document.createElement("span");
		const group = RadioGroup(
			{
				name: "g",
				defaultValue: "a",
				on: { keydown: (ev: Event) => seen.push(ev as KeyboardEvent) },
			},
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" }), label],
		) as HTMLElement;
		document.body.appendChild(group);
		await settle();

		press(label, "ArrowDown");
		await settle();

		expect(seen).toHaveLength(1);
		// No item was the source, so nothing navigated.
		expect(checkedValue(group)).toBe("a");
	});

	it("still reaches the callback while the group is disabled", async () => {
		const seen: KeyboardEvent[] = [];
		const selected: string[] = [];
		const group = RadioGroup(
			{
				name: "d",
				defaultValue: "a",
				disabled: true,
				onValueChange: (v: string) => selected.push(v),
				on: { keydown: (ev: Event) => seen.push(ev as KeyboardEvent) },
			},
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		document.body.appendChild(group);
		await settle();

		const first = owned(group)[0];
		const handled = press(first, "ArrowDown");
		await settle();

		// The callback still fires…
		expect(seen).toHaveLength(1);
		expect(seen[0].key).toBe("ArrowDown");
		// …but no navigation happened, and the key was not consumed.
		expect(selected).toEqual([]);
		expect(checkedValue(group)).toBe("a");
		expect(handled).toBe(true);
		expect(seen[0].defaultPrevented).toBe(false);
	});

	it("still reaches the callback for a keydown on a disabled item", async () => {
		const seen: KeyboardEvent[] = [];
		const selected: string[] = [];
		const group = RadioGroup(
			{
				name: "d2",
				defaultValue: "a",
				onValueChange: (v: string) => selected.push(v),
				on: { keydown: (ev: Event) => seen.push(ev as KeyboardEvent) },
			},
			[
				RadioGroupItem({ value: "a" }),
				RadioGroupItem({ value: "b", disabled: true }),
			],
		) as HTMLElement;
		document.body.appendChild(group);
		await settle();

		const disabledItem = owned(group)[1];
		press(disabledItem, "ArrowDown");
		await settle();

		expect(seen).toHaveLength(1);
		// A disabled item is not a navigation origin.
		expect(selected).toEqual([]);
		expect(checkedValue(group)).toBe("a");
	});

	it("keeps preventDefault limited to keys the owning group handles", async () => {
		const n = buildNested();
		await settle();

		const i1 = n.inner.querySelector(`${ITEM}[data-value=i1]`) as HTMLElement;
		// The inner group owns this key, so it cancels it…
		expect(press(i1, "ArrowDown")).toBe(false);
		await settle();
		expect(n.outerKeys[0].defaultPrevented).toBe(true);

		// …but the outer group never adds a preventDefault of its own for a key
		// it does not handle.
		const o1 = n.outer.querySelector(`${ITEM}[data-value=o1]`) as HTMLElement;
		expect(press(o1, "Tab")).toBe(true);
		await settle();
		expect(n.outerKeys[1].key).toBe("Tab");
		expect(n.outerKeys[1].defaultPrevented).toBe(false);
	});

	it("keeps non-nested navigation correct and still calls the callback", async () => {
		const seen: string[] = [];
		const selected: string[] = [];
		const group = RadioGroup(
			{
				name: "flat",
				defaultValue: "a",
				onValueChange: (v: string) => selected.push(v),
				on: { keydown: (ev: Event) => seen.push((ev as KeyboardEvent).key) },
			},
			[
				RadioGroupItem({ value: "a" }),
				RadioGroupItem({ value: "b" }),
				RadioGroupItem({ value: "c" }),
			],
		) as HTMLElement;
		document.body.appendChild(group);
		await settle();

		const items = owned(group);
		press(items[0], "ArrowDown");
		await settle();
		expect(checkedValue(group)).toBe("b");

		press(items[1], "End");
		await settle();
		expect(checkedValue(group)).toBe("c");

		press(items[2], "Home");
		await settle();
		expect(checkedValue(group)).toBe("a");

		// Wrapping still works.
		press(items[0], "ArrowUp");
		await settle();
		expect(checkedValue(group)).toBe("c");

		expect(selected).toEqual(["b", "c", "a", "c"]);
		expect(seen).toEqual(["ArrowDown", "End", "Home", "ArrowUp"]);
	});

	it("does not stop propagation to enforce ownership", async () => {
		const n = buildNested();
		const bodySeen: KeyboardEvent[] = [];
		const onBody = (ev: Event) => bodySeen.push(ev as KeyboardEvent);
		document.body.addEventListener("keydown", onBody);
		await settle();

		try {
			press(n.inner.querySelector(`${ITEM}[data-value=i1]`) as HTMLElement, "ArrowDown");
			await settle();
			// The event reached the document body untouched.
			expect(bodySeen).toHaveLength(1);
		} finally {
			document.body.removeEventListener("keydown", onBody);
		}
	});

	it("works when no consumer keydown handler is supplied", async () => {
		const group = RadioGroup({ name: "none", defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		document.body.appendChild(group);
		await settle();

		expect(() => press(owned(group)[0], "ArrowDown")).not.toThrow();
		await settle();
		expect(checkedValue(group)).toBe("b");
	});
});
