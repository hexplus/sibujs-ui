/**
 * Extended regression coverage for PR #11 findings 3 and 4:
 * RadioGroupItem registration lifecycle, and nameless required-group validity
 * tracking DOM membership.
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
const bridgesIn = (root: ParentNode) =>
	root.querySelectorAll("input[data-slot=radio-form-bridge]");
const validityBridges = (root: ParentNode) =>
	root.querySelectorAll("[data-slot=radio-group-validity-bridge]");

beforeEach(() => document.body.replaceChildren());
afterEach(() => document.body.replaceChildren());

describe("RadioGroupItem registration lifecycle", () => {
	it("moves an item between two different forms", async () => {
		const ga = RadioGroup({ name: "a", defaultValue: "x" }, [
			RadioGroupItem({ value: "x" }),
		]) as HTMLElement;
		const gb = RadioGroup({ name: "b", defaultValue: "x" }, []) as HTMLElement;
		const fa = newForm(ga);
		const fb = newForm(gb);
		await settle();
		expect(entries(fa)).toEqual([["a", "x"]]);

		gb.appendChild(ga.querySelector("[data-value=x]") as HTMLElement);
		await settle();

		expect(entries(fa)).toEqual([]);
		expect(entries(fb)).toEqual([["b", "x"]]);
		expect(bridgesIn(fa)).toHaveLength(0);
		expect(bridgesIn(fb)).toHaveLength(1);
	});

	it("moves an item from a named group to a nameless one", async () => {
		const named = RadioGroup({ name: "n", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const nameless = RadioGroup({ defaultValue: "v" }, []) as HTMLElement;
		const f = newForm(named, nameless);
		await settle();
		expect(entries(f)).toEqual([["n", "v"]]);

		nameless.appendChild(named.querySelector("[data-value=v]") as HTMLElement);
		await settle();

		// The named field is gone, and no synthetic field replaced it.
		expect(entries(f)).toEqual([]);
		expect(bridgesIn(f)).toHaveLength(0);
	});

	it("moves an item from a nameless group to a named one", async () => {
		const nameless = RadioGroup({ defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const named = RadioGroup(
			{ name: "n", defaultValue: "v" },
			[],
		) as HTMLElement;
		const f = newForm(nameless, named);
		await settle();
		expect(entries(f)).toEqual([]);

		named.appendChild(nameless.querySelector("[data-value=v]") as HTMLElement);
		await settle();

		expect(entries(f)).toEqual([["n", "v"]]);
	});

	it("survives repeated moves without duplicate inputs", async () => {
		const ga = RadioGroup({ name: "a", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const gb = RadioGroup({ name: "b", defaultValue: "v" }, []) as HTMLElement;
		const f = newForm(ga, gb);
		await settle();

		const item = ga.querySelector("[data-value=v]") as HTMLElement;
		for (let i = 0; i < 4; i++) {
			gb.appendChild(item);
			await settle();
			expect(entries(f)).toEqual([["b", "v"]]);
			expect(bridgesIn(f)).toHaveLength(1);

			ga.appendChild(item);
			await settle();
			expect(entries(f)).toEqual([["a", "v"]]);
			expect(bridgesIn(f)).toHaveLength(1);
		}
	});

	it("re-registers an item removed and later reinserted", async () => {
		const group = RadioGroup({ name: "g", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		const item = group.querySelector("[data-value=v]") as HTMLElement;
		item.remove();
		await settle();
		expect(entries(f)).toEqual([]);
		// Detaching clears state belonging to the group it left.
		expect(item.getAttribute("aria-checked")).toBeNull();

		group.appendChild(item);
		await settle();
		expect(entries(f)).toEqual([["g", "v"]]);
		expect(item.getAttribute("aria-checked")).toBe("true");
	});

	it("never registers an item disposed while detached", async () => {
		const item = RadioGroupItem({ value: "v" });
		await settle();
		dispose(item);

		const group = RadioGroup(
			{ name: "g", defaultValue: "v" },
			[],
		) as HTMLElement;
		const f = newForm(group);
		await settle();

		group.appendChild(item);
		await settle();

		expect(entries(f)).toEqual([]);
		expect(bridgesIn(f)).toHaveLength(0);
	});

	it("cleans up when an item is disposed after registration", async () => {
		const group = RadioGroup({ name: "g", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(bridgesIn(f)).toHaveLength(1);

		dispose(group.querySelector("[data-value=v]") as HTMLElement);
		await settle();
		expect(bridgesIn(f)).toHaveLength(0);
	});

	it("gives nested groups only their own nearest items", async () => {
		const inner = RadioGroup({ name: "inner", defaultValue: "i" }, [
			RadioGroupItem({ value: "i" }),
		]) as HTMLElement;
		const outer = RadioGroup({ name: "outer", defaultValue: "o" }, [
			RadioGroupItem({ value: "o" }),
			inner,
		]) as HTMLElement;
		const f = newForm(outer);
		await settle();

		const got = entries(f)
			.map(([k, v]) => `${k}=${v}`)
			.sort();
		expect(got).toEqual(["inner=i", "outer=o"]);
	});

	it("disposing the old group leaves an already-moved item working", async () => {
		const ga = RadioGroup({ name: "a", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const gb = RadioGroup({ name: "b", defaultValue: "v" }, []) as HTMLElement;
		const f = newForm(ga, gb);
		await settle();

		gb.appendChild(ga.querySelector("[data-value=v]") as HTMLElement);
		await settle();
		expect(entries(f)).toEqual([["b", "v"]]);

		dispose(ga);
		await settle();

		// Disposing the old group must not tear down the item's new binding.
		expect(entries(f)).toEqual([["b", "v"]]);
	});
});

describe("nameless required-group validity follows membership", () => {
	it("restores validity when the selected item is re-enabled", async () => {
		const group = RadioGroup({ required: true, defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		const item = group.querySelector("[data-value=a]") as HTMLElement;
		item.setAttribute("disabled", "");
		await settle();
		expect(f.checkValidity()).toBe(false);

		item.removeAttribute("disabled");
		await settle();
		expect(f.checkValidity()).toBe(true);
	});

	it("reacts to the selected item's data-value changing", async () => {
		const group = RadioGroup({ required: true, defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(true);

		(group.querySelector("[data-value=a]") as HTMLElement).setAttribute(
			"data-value",
			"renamed",
		);
		await settle();

		expect(f.checkValidity()).toBe(false);
	});

	it("becomes invalid when the selected item moves to another group", async () => {
		const other = RadioGroup({}, []) as HTMLElement;
		const group = RadioGroup({ required: true, defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		const f = newForm(group, other);
		await settle();
		expect(f.checkValidity()).toBe(true);

		other.appendChild(group.querySelector("[data-value=a]") as HTMLElement);
		await settle();

		expect(f.checkValidity()).toBe(false);
	});

	it("follows reactive-child removal of the selected item", async () => {
		const [items, setItems] = signal(["a", "b"]);
		const group = RadioGroup({ required: true, defaultValue: "a" }, [
			() => items().map((v) => RadioGroupItem({ value: v })),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(true);

		setItems(["b"]);
		await settle();

		expect(f.checkValidity()).toBe(false);
	});

	it("keeps exactly one validity bridge, and none for optional groups", async () => {
		const required = RadioGroup({ required: true, defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		const optional = RadioGroup({ defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		const f = newForm(required, optional);
		await settle();

		expect(validityBridges(f)).toHaveLength(1);
		// Nameless groups contribute nothing to FormData.
		expect(entries(f)).toEqual([]);

		// Churn membership; still exactly one bridge.
		required.appendChild(RadioGroupItem({ value: "c" }));
		await settle();
		expect(validityBridges(f)).toHaveLength(1);
	});

	it("stops refreshing validity after disposal", async () => {
		const group = RadioGroup({ required: true, defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(true);

		dispose(group);
		await settle();

		// The bridge is gone, so no stale constraint is left on the form.
		expect(validityBridges(f)).toHaveLength(0);
		expect(f.checkValidity()).toBe(true);
	});
});
