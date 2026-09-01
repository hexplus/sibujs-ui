/**
 * Reproductions for the remaining PR #11 core-review component findings.
 * Every test here must FAIL against 0671b8a before the fix.
 */
import { dispose, signal } from "sibujs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { RadioGroup, RadioGroupItem } from "../src/components/radio-group";

const settle = async () => {
	for (let i = 0; i < 8; i++) await Promise.resolve();
};
const entries = (f: HTMLFormElement) => [...new FormData(f).entries()];
const newForm = (...kids: HTMLElement[]) => {
	const f = document.createElement("form");
	for (const k of kids) f.appendChild(k);
	document.body.appendChild(f);
	return f;
};
const ITEM = "[data-slot=radio-group-item]";
const GROUP = "[data-slot=radio-group]";

/** Owned items only — nearest-group ownership, never a broad descendant query. */
const owned = (g: HTMLElement) =>
	[...g.querySelectorAll<HTMLElement>(ITEM)].filter(
		(i) => i.closest(GROUP) === g,
	);
const ownedTabStops = (g: HTMLElement) => owned(g).filter((i) => i.tabIndex === 0);

beforeEach(() => document.body.replaceChildren());
afterEach(() => document.body.replaceChildren());

describe("DEFECT 2 — movement must not depend on observer order", () => {
	// Destination created FIRST: its observer is registered first, so on a move
	// the destination binds before the source's stale detach runs.
	it("keeps the new binding when the destination observer runs first", async () => {
		const dest = RadioGroup({ name: "dest", defaultValue: "v" }, []) as HTMLElement;
		const src = RadioGroup({ name: "src", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const f = newForm(dest, src);
		await settle();

		const item = src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
		dest.appendChild(item);
		await settle();

		expect(entries(f)).toEqual([["dest", "v"]]);
		expect(item.getAttribute("aria-checked")).toBe("true");
		expect(item.getAttribute("data-state")).toBe("checked");
		expect(
			item.querySelectorAll("[data-slot=radio-group-indicator] svg").length,
		).toBe(1);
	});

	it("keeps the new binding when the source observer runs first", async () => {
		const src = RadioGroup({ name: "src", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const dest = RadioGroup({ name: "dest", defaultValue: "v" }, []) as HTMLElement;
		const f = newForm(src, dest);
		await settle();

		const item = src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
		dest.appendChild(item);
		await settle();

		expect(entries(f)).toEqual([["dest", "v"]]);
		expect(item.getAttribute("aria-checked")).toBe("true");
		expect(item.getAttribute("data-state")).toBe("checked");
	});
});

describe("DEFECT 3 — nested groups must be fully isolated", () => {
	it("gives each group exactly one owned tab stop", async () => {
		const inner = RadioGroup({ name: "inner", defaultValue: "i1" }, [
			RadioGroupItem({ value: "i1" }),
			RadioGroupItem({ value: "i2" }),
		]) as HTMLElement;
		const outer = RadioGroup({ name: "outer", defaultValue: "o1" }, [
			RadioGroupItem({ value: "o1" }),
			inner,
		]) as HTMLElement;
		document.body.appendChild(outer);
		await settle();

		expect(ownedTabStops(outer)).toHaveLength(1);
		expect(ownedTabStops(inner)).toHaveLength(1);
	});

	it("does not let inner keyboard navigation drive the outer group", async () => {
		const outerSeen: string[] = [];
		const innerSeen: string[] = [];
		const inner = RadioGroup(
			{
				name: "inner",
				defaultValue: "i1",
				onValueChange: (v: string) => innerSeen.push(v),
			},
			[RadioGroupItem({ value: "i1" }), RadioGroupItem({ value: "i2" })],
		) as HTMLElement;
		const outer = RadioGroup(
			{
				name: "outer",
				defaultValue: "o1",
				onValueChange: (v: string) => outerSeen.push(v),
			},
			[RadioGroupItem({ value: "o1" }), RadioGroupItem({ value: "o2" }), inner],
		) as HTMLElement;
		document.body.appendChild(outer);
		await settle();

		const innerFirst = inner.querySelector(
			`${ITEM}[data-value=i1]`,
		) as HTMLElement;
		innerFirst.dispatchEvent(
			new KeyboardEvent("keydown", {
				key: "ArrowRight",
				bubbles: true,
				cancelable: true,
			}),
		);
		await settle();

		expect(innerSeen).toEqual(["i2"]);
		expect(outerSeen).toEqual([]);
	});
});

describe("DEFECT 4 — named bridges must follow the disabled state", () => {
	it("removes a selected named item from FormData when it is disabled", async () => {
		const group = RadioGroup({ name: "choice", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(entries(f)).toEqual([["choice", "v"]]);

		(group.querySelector(`${ITEM}[data-value=v]`) as HTMLElement).setAttribute(
			"disabled",
			"",
		);
		await settle();

		expect(entries(f)).toEqual([]);
	});

	it("restores submission when the item is re-enabled", async () => {
		const group = RadioGroup({ name: "choice", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		const item = group.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
		item.setAttribute("disabled", "");
		await settle();
		expect(entries(f)).toEqual([]);

		item.removeAttribute("disabled");
		await settle();
		expect(entries(f)).toEqual([["choice", "v"]]);
	});

	it("invalidates a required group whose selected item became disabled", async () => {
		const group = RadioGroup(
			{ name: "choice", required: true, defaultValue: "v" },
			[RadioGroupItem({ value: "v" }), RadioGroupItem({ value: "w" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(true);

		(group.querySelector(`${ITEM}[data-value=v]`) as HTMLElement).setAttribute(
			"disabled",
			"",
		);
		await settle();

		// Nothing selectable is selected, and another required radio remains.
		expect(f.checkValidity()).toBe(false);
	});
});
