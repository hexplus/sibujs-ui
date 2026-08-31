/**
 * Full regression coverage for the PR #11 core-review component findings.
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

/** Nearest-group ownership — never a broad descendant query. */
const owned = (g: HTMLElement) =>
	[...g.querySelectorAll<HTMLElement>(ITEM)].filter(
		(i) => i.closest(GROUP) === g,
	);
const ownedTabStops = (g: HTMLElement) =>
	owned(g).filter((i) => i.tabIndex === 0);
const bridges = (root: ParentNode) =>
	root.querySelectorAll("input[data-slot=radio-form-bridge]");
const indicatorCount = (item: HTMLElement) =>
	item.querySelectorAll("[data-slot=radio-group-indicator] svg").length;

const press = (el: HTMLElement, key: string) =>
	el.dispatchEvent(
		new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }),
	);

beforeEach(() => document.body.replaceChildren());
afterEach(() => document.body.replaceChildren());

describe("RadioGroupItem movement is observer-order independent", () => {
	/**
	 * Build two groups in a given construction order, so their MutationObservers
	 * are registered in that order. The moved item must end up identical either
	 * way.
	 */
	const build = (
		destFirst: boolean,
		srcProps: Record<string, unknown>,
		destProps: Record<string, unknown>,
	) => {
		const mk = (props: Record<string, unknown>, withItem: boolean) =>
			RadioGroup(
				props,
				withItem ? [RadioGroupItem({ value: "v" })] : [],
			) as HTMLElement;
		let src: HTMLElement;
		let dest: HTMLElement;
		if (destFirst) {
			dest = mk(destProps, false);
			src = mk(srcProps, true);
		} else {
			src = mk(srcProps, true);
			dest = mk(destProps, false);
		}
		return { src, dest };
	};

	for (const destFirst of [true, false]) {
		const order = destFirst ? "destination first" : "source first";

		it(`named -> named (${order})`, async () => {
			const { src, dest } = build(
				destFirst,
				{ name: "src", defaultValue: "v" },
				{ name: "dest", defaultValue: "v" },
			);
			const f = newForm(src, dest);
			await settle();

			const item = src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
			dest.appendChild(item);
			await settle();

			expect(entries(f)).toEqual([["dest", "v"]]);
			expect(item.getAttribute("aria-checked")).toBe("true");
			expect(item.getAttribute("data-state")).toBe("checked");
			expect(indicatorCount(item)).toBe(1);
			expect(bridges(f)).toHaveLength(1);
		});

		it(`named -> nameless (${order})`, async () => {
			const { src, dest } = build(
				destFirst,
				{ name: "src", defaultValue: "v" },
				{ defaultValue: "v" },
			);
			const f = newForm(src, dest);
			await settle();

			dest.appendChild(src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement);
			await settle();

			expect(entries(f)).toEqual([]);
			expect(bridges(f)).toHaveLength(0);
			const item = dest.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
			expect(item.getAttribute("aria-checked")).toBe("true");
		});

		it(`nameless -> named (${order})`, async () => {
			const { src, dest } = build(
				destFirst,
				{ defaultValue: "v" },
				{ name: "dest", defaultValue: "v" },
			);
			const f = newForm(src, dest);
			await settle();

			dest.appendChild(src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement);
			await settle();

			expect(entries(f)).toEqual([["dest", "v"]]);
			expect(bridges(f)).toHaveLength(1);
		});

		it(`between separate forms (${order})`, async () => {
			const { src, dest } = build(
				destFirst,
				{ name: "src", defaultValue: "v" },
				{ name: "dest", defaultValue: "v" },
			);
			const fa = newForm(src);
			const fb = newForm(dest);
			await settle();

			dest.appendChild(src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement);
			await settle();

			expect(entries(fa)).toEqual([]);
			expect(entries(fb)).toEqual([["dest", "v"]]);
			expect(bridges(fa)).toHaveLength(0);
			expect(bridges(fb)).toHaveLength(1);
		});

		it(`repeated back-and-forth movement (${order})`, async () => {
			const { src, dest } = build(
				destFirst,
				{ name: "src", defaultValue: "v" },
				{ name: "dest", defaultValue: "v" },
			);
			const f = newForm(src, dest);
			await settle();

			const item = src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
			for (let i = 0; i < 4; i++) {
				dest.appendChild(item);
				await settle();
				expect(entries(f)).toEqual([["dest", "v"]]);
				expect(bridges(f)).toHaveLength(1);
				expect(indicatorCount(item)).toBe(1);

				src.appendChild(item);
				await settle();
				expect(entries(f)).toEqual([["src", "v"]]);
				expect(bridges(f)).toHaveLength(1);
				expect(indicatorCount(item)).toBe(1);
			}
		});

		it(`old group signals cannot mutate the moved item (${order})`, async () => {
			const [srcValue, setSrcValue] = signal("v");
			const src = RadioGroup(
				{ name: "src", value: () => srcValue() },
				[RadioGroupItem({ value: "v" })],
			) as HTMLElement;
			const dest = RadioGroup(
				{ name: "dest", defaultValue: "v" },
				[],
			) as HTMLElement;
			const f = destFirst ? newForm(dest, src) : newForm(src, dest);
			await settle();

			const item = src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
			dest.appendChild(item);
			await settle();

			// Changing the *old* group's selection must not touch the moved item.
			setSrcValue("something-else");
			await settle();

			expect(item.getAttribute("aria-checked")).toBe("true");
			expect(entries(f)).toEqual([["dest", "v"]]);
		});

		it(`disposing the source group after the move (${order})`, async () => {
			const { src, dest } = build(
				destFirst,
				{ name: "src", defaultValue: "v" },
				{ name: "dest", defaultValue: "v" },
			);
			const f = newForm(src, dest);
			await settle();

			const item = src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
			dest.appendChild(item);
			await settle();

			dispose(src);
			await settle();

			expect(entries(f)).toEqual([["dest", "v"]]);
			expect(item.getAttribute("aria-checked")).toBe("true");
		});

		it(`disposing the destination group after the move (${order})`, async () => {
			const { src, dest } = build(
				destFirst,
				{ name: "src", defaultValue: "v" },
				{ name: "dest", defaultValue: "v" },
			);
			const f = newForm(src, dest);
			await settle();

			dest.appendChild(src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement);
			await settle();

			dispose(dest);
			await settle();

			expect(entries(f)).toEqual([]);
			expect(bridges(f)).toHaveLength(0);
		});
	}

	it("detached and reinserted items rebind correctly", async () => {
		const group = RadioGroup({ name: "g", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		const item = group.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
		item.remove();
		await settle();
		expect(entries(f)).toEqual([]);

		group.appendChild(item);
		await settle();
		expect(entries(f)).toEqual([["g", "v"]]);
		expect(bridges(f)).toHaveLength(1);
		expect(indicatorCount(item)).toBe(1);
	});

	it("an item disposed while detached is never revived", async () => {
		const item = RadioGroupItem({ value: "v" });
		await settle();
		dispose(item);

		const group = RadioGroup({ name: "g", defaultValue: "v" }, []) as HTMLElement;
		const f = newForm(group);
		await settle();
		group.appendChild(item);
		await settle();

		expect(entries(f)).toEqual([]);
		expect(bridges(f)).toHaveLength(0);
	});
});

describe("nested RadioGroups are fully isolated", () => {
	const buildNested = (
		outerProps: Record<string, unknown> = {},
		innerProps: Record<string, unknown> = {},
	) => {
		const inner = RadioGroup(
			{ name: "inner", defaultValue: "i1", ...innerProps },
			[RadioGroupItem({ value: "i1" }), RadioGroupItem({ value: "i2" })],
		) as HTMLElement;
		const outer = RadioGroup(
			{ name: "outer", defaultValue: "o1", ...outerProps },
			[RadioGroupItem({ value: "o1" }), RadioGroupItem({ value: "o2" }), inner],
		) as HTMLElement;
		return { outer, inner };
	};

	it("gives each group exactly one owned tab stop", async () => {
		const { outer, inner } = buildNested();
		document.body.appendChild(outer);
		await settle();

		expect(ownedTabStops(outer)).toHaveLength(1);
		expect(ownedTabStops(inner)).toHaveLength(1);
		expect(owned(outer)).toHaveLength(2);
		expect(owned(inner)).toHaveLength(2);
	});

	it("outer reconciliation does not disturb inner tabindex, and vice versa", async () => {
		const { outer, inner } = buildNested();
		document.body.appendChild(outer);
		await settle();

		const innerBefore = owned(inner).map((i) => i.tabIndex);
		outer.appendChild(RadioGroupItem({ value: "o3" }));
		await settle();
		expect(owned(inner).map((i) => i.tabIndex)).toEqual(innerBefore);
		expect(ownedTabStops(inner)).toHaveLength(1);

		const outerBefore = owned(outer).map((i) => i.tabIndex);
		inner.appendChild(RadioGroupItem({ value: "i3" }));
		await settle();
		expect(owned(outer).map((i) => i.tabIndex)).toEqual(outerBefore);
		expect(ownedTabStops(outer)).toHaveLength(1);
	});

	for (const key of ["ArrowRight", "ArrowLeft", "Home", "End"]) {
		it(`inner ${key} changes only the inner group`, async () => {
			const outerSeen: string[] = [];
			const innerSeen: string[] = [];
			const { outer, inner } = buildNested(
				{ onValueChange: (v: string) => outerSeen.push(v) },
				{ onValueChange: (v: string) => innerSeen.push(v) },
			);
			document.body.appendChild(outer);
			await settle();

			press(inner.querySelector(`${ITEM}[data-value=i1]`) as HTMLElement, key);
			await settle();

			expect(outerSeen).toEqual([]);
			expect(innerSeen).toHaveLength(1);
			expect(["i1", "i2"]).toContain(innerSeen[0]);
		});
	}

	it("keeps one tab stop per group as nested membership changes", async () => {
		const { outer, inner } = buildNested();
		document.body.appendChild(outer);
		await settle();

		inner.appendChild(RadioGroupItem({ value: "i3" }));
		await settle();
		expect(ownedTabStops(outer)).toHaveLength(1);
		expect(ownedTabStops(inner)).toHaveLength(1);

		(inner.querySelector(`${ITEM}[data-value=i1]`) as HTMLElement).remove();
		await settle();
		expect(ownedTabStops(outer)).toHaveLength(1);
		expect(ownedTabStops(inner)).toHaveLength(1);
	});

	it("updates ownership when an item moves between outer and inner", async () => {
		const { outer, inner } = buildNested();
		const f = newForm(outer);
		await settle();

		const moved = outer.querySelector(`${ITEM}[data-value=o2]`) as HTMLElement;
		inner.appendChild(moved);
		await settle();

		expect(owned(outer).map((i) => i.getAttribute("data-value"))).toEqual(["o1"]);
		expect(owned(inner).map((i) => i.getAttribute("data-value"))).toEqual([
			"i1",
			"i2",
			"o2",
		]);
		expect(ownedTabStops(outer)).toHaveLength(1);
		expect(ownedTabStops(inner)).toHaveLength(1);
		// It now submits under the inner group's name.
		const got = entries(f).map(([k, v]) => `${k}=${v}`);
		expect(got).toContain("outer=o1");
		expect(got).toContain("inner=i1");
	});

	it("nested items cannot satisfy the outer group's required validation", async () => {
		const inner = RadioGroup({}, [RadioGroupItem({ value: "a" })]) as HTMLElement;
		const outer = RadioGroup({ required: true, defaultValue: "a" }, [
			inner,
		]) as HTMLElement;
		const f = newForm(outer);
		await settle();

		expect(f.checkValidity()).toBe(false);
	});

	it("named nested groups submit independent values", async () => {
		const { outer } = buildNested();
		const f = newForm(outer);
		await settle();

		const got = entries(f)
			.map(([k, v]) => `${k}=${v}`)
			.sort();
		expect(got).toEqual(["inner=i1", "outer=o1"]);
	});
});

describe("named bridges follow the effective disabled state", () => {
	it("drops a selected item from FormData when disabled, and restores it", async () => {
		const group = RadioGroup({ name: "choice", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(entries(f)).toEqual([["choice", "v"]]);

		const item = group.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
		item.setAttribute("disabled", "");
		await settle();
		expect(entries(f)).toEqual([]);

		item.removeAttribute("disabled");
		await settle();
		expect(entries(f)).toEqual([["choice", "v"]]);
	});

	it("invalidates a required group when the selected item is disabled", async () => {
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
		expect(f.checkValidity()).toBe(false);

		// Selecting the remaining enabled item satisfies the group again.
		(group.querySelector(`${ITEM}[data-value=w]`) as HTMLElement).click();
		await settle();
		expect(f.checkValidity()).toBe(true);
		expect(entries(f)).toEqual([["choice", "w"]]);
	});

	it("disables every bridge when the whole group is disabled", async () => {
		const group = RadioGroup(
			{ name: "choice", defaultValue: "v", disabled: true },
			[RadioGroupItem({ value: "v" }), RadioGroupItem({ value: "w" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();

		expect(entries(f)).toEqual([]);
		for (const b of bridges(f)) {
			expect((b as HTMLInputElement).disabled).toBe(true);
		}
	});

	it("preserves disabled behaviour when the item moves between groups", async () => {
		const src = RadioGroup({ name: "src", defaultValue: "v" }, [
			RadioGroupItem({ value: "v", disabled: true }),
		]) as HTMLElement;
		const dest = RadioGroup({ name: "dest", defaultValue: "v" }, []) as HTMLElement;
		const f = newForm(src, dest);
		await settle();
		expect(entries(f)).toEqual([]);

		dest.appendChild(src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement);
		await settle();

		// Still disabled in its new group, so still not successful.
		expect(entries(f)).toEqual([]);
		expect(bridges(f)).toHaveLength(1);
		expect((bridges(f)[0] as HTMLInputElement).disabled).toBe(true);
	});

	it("preserves disabled behaviour when the item moves between forms", async () => {
		const src = RadioGroup({ name: "src", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const dest = RadioGroup({ name: "dest", defaultValue: "v" }, []) as HTMLElement;
		const fa = newForm(src);
		const fb = newForm(dest);
		await settle();

		const item = src.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
		item.setAttribute("disabled", "");
		await settle();
		expect(entries(fa)).toEqual([]);

		dest.appendChild(item);
		await settle();
		expect(entries(fb)).toEqual([]);

		item.removeAttribute("disabled");
		await settle();
		expect(entries(fb)).toEqual([["dest", "v"]]);
	});

	it("survives repeated disable/enable cycles with one bridge throughout", async () => {
		const group = RadioGroup({ name: "choice", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		const item = group.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;
		for (let i = 0; i < 5; i++) {
			item.setAttribute("disabled", "");
			await settle();
			expect(entries(f)).toEqual([]);
			expect(bridges(f)).toHaveLength(1);

			item.removeAttribute("disabled");
			await settle();
			expect(entries(f)).toEqual([["choice", "v"]]);
			expect(bridges(f)).toHaveLength(1);
		}
	});

	it("stops synchronizing after disposal", async () => {
		const group = RadioGroup({ name: "choice", defaultValue: "v" }, [
			RadioGroupItem({ value: "v" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		const item = group.querySelector(`${ITEM}[data-value=v]`) as HTMLElement;

		dispose(group);
		await settle();
		expect(bridges(f)).toHaveLength(0);

		// Nothing may reappear when attributes change on a disposed tree.
		item.setAttribute("disabled", "");
		await settle();
		expect(bridges(f)).toHaveLength(0);
		expect(entries(f)).toEqual([]);
	});
});
