/**
 * Reproductions for the remaining PR #11 component review findings.
 * Every test here must FAIL against ccca9ca before the fix.
 */
import { signal } from "sibujs";
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

beforeEach(() => document.body.replaceChildren());
afterEach(() => document.body.replaceChildren());

describe("DEFECT 3 — RadioGroupItem must follow its current group", () => {
	it("binds a detached item mounted into a group later", async () => {
		const item = RadioGroupItem({ value: "late" });
		await settle();

		const group = RadioGroup({ name: "plan", defaultValue: "late" }, [
			RadioGroupItem({ value: "early" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		group.appendChild(item);
		await settle();

		expect(item.getAttribute("aria-checked")).toBe("true");
		expect(item.getAttribute("data-state")).toBe("checked");
		expect(entries(f)).toEqual([["plan", "late"]]);
	});

	it("re-registers when moved from group a to group b", async () => {
		const ga = RadioGroup({ name: "a", defaultValue: "moved" }, [
			RadioGroupItem({ value: "moved" }),
		]) as HTMLElement;
		const gb = RadioGroup({ name: "b", defaultValue: "moved" }, [
			RadioGroupItem({ value: "other" }),
		]) as HTMLElement;
		const f = newForm(ga, gb);
		await settle();

		expect(entries(f)).toEqual([["a", "moved"]]);

		const moved = ga.querySelector("[data-value=moved]") as HTMLElement;
		gb.appendChild(moved);
		await settle();

		const got = entries(f);
		expect(got.some(([k]) => k === "a")).toBe(false);
		expect(got).toContainEqual(["b", "moved"]);
	});
});

describe("DEFECT 4 — nameless required validity follows membership", () => {
	it("becomes invalid when the selected item is removed", async () => {
		const group = RadioGroup({ required: true, defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(true);

		group.querySelector("[data-value=a]")?.remove();
		await settle();

		expect(f.checkValidity()).toBe(false);
	});

	it("becomes invalid when the selected item is disabled", async () => {
		const group = RadioGroup({ required: true, defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(true);

		group.querySelector("[data-value=a]")?.setAttribute("disabled", "");
		await settle();

		expect(f.checkValidity()).toBe(false);
	});

	it("becomes valid when an item matching the controlled value is added", async () => {
		const [value] = signal("later");
		const group = RadioGroup({ required: true, value: () => value() }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(false);

		group.appendChild(RadioGroupItem({ value: "later" }));
		await settle();

		expect(f.checkValidity()).toBe(true);
	});

	it("does not let a nested group's item satisfy the outer group", async () => {
		const inner = RadioGroup({}, [RadioGroupItem({ value: "a" })]) as HTMLElement;
		const outer = RadioGroup({ required: true, defaultValue: "a" }, [
			inner,
		]) as HTMLElement;
		const f = newForm(outer);
		await settle();

		// "a" belongs to the inner group, so the outer group has no valid selection.
		expect(f.checkValidity()).toBe(false);
	});
});
