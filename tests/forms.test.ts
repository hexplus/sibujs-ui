import { dispose, signal } from "sibujs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Checkbox } from "../src/components/checkbox";
import { RadioGroup, RadioGroupItem } from "../src/components/radio-group";
import { Switch } from "../src/components/switch";

/**
 * The native bridge is inserted one microtask after construction (and two for
 * RadioGroupItem, which must first find its group context), so tests flush a
 * few times before asserting.
 */
const settle = async () => {
	for (let i = 0; i < 4; i++) await Promise.resolve();
};

function form(...children: HTMLElement[]): HTMLFormElement {
	const f = document.createElement("form");
	for (const c of children) f.appendChild(c);
	document.body.appendChild(f);
	return f;
}

const entries = (f: HTMLFormElement) => [...new FormData(f).entries()];

beforeEach(() => {
	document.body.replaceChildren();
});

afterEach(() => {
	document.body.replaceChildren();
});

describe("Checkbox form participation", () => {
	it("submits name=on only while checked", async () => {
		const cb = Checkbox({ name: "agree", defaultChecked: false });
		const f = form(cb);
		await settle();

		expect(entries(f)).toEqual([]);

		cb.click();
		expect(entries(f)).toEqual([["agree", "on"]]);

		cb.click();
		expect(entries(f)).toEqual([]);
	});

	it("uses a custom value when provided", async () => {
		const cb = Checkbox({ name: "plan", value: "pro", defaultChecked: true });
		const f = form(cb);
		await settle();

		expect(entries(f)).toEqual([["plan", "pro"]]);
	});

	it("contributes nothing while disabled", async () => {
		const cb = Checkbox({
			name: "agree",
			defaultChecked: true,
			disabled: true,
		});
		const f = form(cb);
		await settle();

		expect(entries(f)).toEqual([]);
	});

	it("enforces required through real constraint validation", async () => {
		const cb = Checkbox({ name: "tos", required: true });
		const f = form(cb);
		await settle();

		expect(f.checkValidity()).toBe(false);

		cb.click();
		expect(f.checkValidity()).toBe(true);
		expect(entries(f)).toEqual([["tos", "on"]]);
	});

	it("adds no duplicate tab stop and stays out of the a11y tree", async () => {
		const cb = Checkbox({ name: "agree" });
		const f = form(cb);
		await settle();

		const bridge = f.querySelector(
			"input[data-slot=checkbox-form-bridge]",
		) as HTMLInputElement;
		expect(bridge).toBeTruthy();
		expect(bridge.tabIndex).toBe(-1);
		expect(bridge.getAttribute("aria-hidden")).toBe("true");
		// Exactly one bridge input — no duplicate form entries possible.
		expect(f.querySelectorAll("input").length).toBe(1);
	});

	it("follows a controlled signal", async () => {
		const [checked, setChecked] = signal(false);
		const cb = Checkbox({ name: "agree", checked: () => checked() });
		const f = form(cb);
		await settle();

		expect(entries(f)).toEqual([]);
		setChecked(true);
		expect(entries(f)).toEqual([["agree", "on"]]);
		setChecked(false);
		expect(entries(f)).toEqual([]);
	});

	it("restores its default on form reset (uncontrolled)", async () => {
		const cb = Checkbox({ name: "agree", defaultChecked: true });
		const f = form(cb);
		await settle();
		expect(entries(f)).toEqual([["agree", "on"]]);

		cb.click();
		expect(entries(f)).toEqual([]);
		expect(cb.getAttribute("aria-checked")).toBe("false");

		f.reset();
		await settle();

		expect(entries(f)).toEqual([["agree", "on"]]);
		// The custom control follows the reset, not just the hidden input.
		expect(cb.getAttribute("aria-checked")).toBe("true");
	});

	it("notifies onCheckedChange on reset when controlled", async () => {
		const [checked, setChecked] = signal(true);
		const seen: boolean[] = [];
		const cb = Checkbox({
			name: "agree",
			defaultChecked: false,
			checked: () => checked(),
			onCheckedChange: (v) => {
				seen.push(v);
				setChecked(v);
			},
		});
		const f = form(cb);
		await settle();

		f.reset();
		await settle();

		expect(seen).toContain(false);
		expect(cb.getAttribute("aria-checked")).toBe("false");
	});

	it("preserves onCheckedChange on click", async () => {
		const seen: boolean[] = [];
		const cb = Checkbox({ name: "a", onCheckedChange: (v) => seen.push(v) });
		form(cb);
		await settle();

		cb.click();
		cb.click();
		expect(seen).toEqual([true, false]);
	});

	it("adds no bridge input when neither name nor required is set", async () => {
		const cb = Checkbox({});
		const f = form(cb);
		await settle();
		expect(f.querySelectorAll("input").length).toBe(0);
	});

	it("removes its bridge input on dispose", async () => {
		const cb = Checkbox({ name: "agree" });
		const f = form(cb);
		await settle();
		expect(f.querySelectorAll("input").length).toBe(1);

		dispose(cb);
		expect(f.querySelectorAll("input").length).toBe(0);
	});
});

describe("Switch form participation", () => {
	it("submits only while checked", async () => {
		const sw = Switch({ name: "notify" });
		const f = form(sw);
		await settle();

		expect(entries(f)).toEqual([]);
		sw.click();
		expect(entries(f)).toEqual([["notify", "on"]]);
		sw.click();
		expect(entries(f)).toEqual([]);
	});

	it("honours value, disabled and required", async () => {
		const sw = Switch({ name: "mode", value: "dark", defaultChecked: true });
		const f = form(sw);
		await settle();
		expect(entries(f)).toEqual([["mode", "dark"]]);

		const disabled = Switch({
			name: "off",
			defaultChecked: true,
			disabled: true,
		});
		const f2 = form(disabled);
		await settle();
		expect(entries(f2)).toEqual([]);

		const req = Switch({ name: "must", required: true });
		const f3 = form(req);
		await settle();
		expect(f3.checkValidity()).toBe(false);
		req.click();
		expect(f3.checkValidity()).toBe(true);
	});

	it("follows a controlled signal and supports reset", async () => {
		const [on, setOn] = signal(false);
		const sw = Switch({ name: "s", checked: () => on() });
		const f = form(sw);
		await settle();

		setOn(true);
		expect(entries(f)).toEqual([["s", "on"]]);

		const un = Switch({ name: "u", defaultChecked: true });
		const f2 = form(un);
		await settle();
		un.click();
		expect(entries(f2)).toEqual([]);
		f2.reset();
		await settle();
		expect(entries(f2)).toEqual([["u", "on"]]);
		expect(un.getAttribute("aria-checked")).toBe("true");
	});
});

describe("RadioGroup form participation", () => {
	const buildGroup = (props: Record<string, unknown> = {}) => {
		const group = RadioGroup({ name: "plan", ...props }, [
			RadioGroupItem({ value: "free" }),
			RadioGroupItem({ value: "pro" }),
			RadioGroupItem({ value: "team", disabled: true }),
		]) as HTMLElement;
		return group;
	};

	it("submits the selected value under the group name", async () => {
		const group = buildGroup({ defaultValue: "pro" });
		const f = form(group);
		await settle();

		expect(entries(f)).toEqual([["plan", "pro"]]);
	});

	it("keeps exactly one value successful", async () => {
		const group = buildGroup({ defaultValue: "free" });
		const f = form(group);
		await settle();

		const items = group.querySelectorAll<HTMLElement>(
			"[data-slot=radio-group-item]",
		);
		items[1].click();
		await settle();

		const got = entries(f);
		expect(got).toEqual([["plan", "pro"]]);
		expect(got.filter(([k]) => k === "plan")).toHaveLength(1);
	});

	it("submits nothing when nothing is selected", async () => {
		const group = buildGroup();
		const f = form(group);
		await settle();
		expect(entries(f)).toEqual([]);
	});

	it("enforces required validation", async () => {
		const group = buildGroup({ required: true });
		const f = form(group);
		await settle();

		expect(f.checkValidity()).toBe(false);

		const items = group.querySelectorAll<HTMLElement>(
			"[data-slot=radio-group-item]",
		);
		items[0].click();
		await settle();

		expect(f.checkValidity()).toBe(true);
		expect(entries(f)).toEqual([["plan", "free"]]);
	});

	it("excludes a disabled item and a disabled group", async () => {
		const group = buildGroup({ defaultValue: "team" });
		const f = form(group);
		await settle();
		// "team" is disabled, so it is not successful.
		expect(entries(f)).toEqual([]);

		const wholeGroup = RadioGroup(
			{ name: "g2", defaultValue: "a", disabled: true },
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		const f2 = form(wholeGroup);
		await settle();
		expect(entries(f2)).toEqual([]);
	});

	it("supports form reset", async () => {
		const group = buildGroup({ defaultValue: "free" });
		const f = form(group);
		await settle();

		const items = group.querySelectorAll<HTMLElement>(
			"[data-slot=radio-group-item]",
		);
		items[1].click();
		await settle();
		expect(entries(f)).toEqual([["plan", "pro"]]);

		f.reset();
		await settle();

		expect(entries(f)).toEqual([["plan", "free"]]);
		expect(items[0].getAttribute("aria-checked")).toBe("true");
		expect(items[1].getAttribute("aria-checked")).toBe("false");
	});

	it("follows a controlled signal", async () => {
		const [value, setValue] = signal("free");
		const group = RadioGroup({ name: "plan", value: () => value() }, [
			RadioGroupItem({ value: "free" }),
			RadioGroupItem({ value: "pro" }),
		]) as HTMLElement;
		const f = form(group);
		await settle();

		expect(entries(f)).toEqual([["plan", "free"]]);
		setValue("pro");
		expect(entries(f)).toEqual([["plan", "pro"]]);
	});

	it("adds exactly one bridge input per item, none tabbable", async () => {
		const group = buildGroup({ defaultValue: "free" });
		const f = form(group);
		await settle();

		const bridges = f.querySelectorAll<HTMLInputElement>(
			"input[data-slot=radio-form-bridge]",
		);
		expect(bridges.length).toBe(3);
		for (const b of bridges) {
			expect(b.tabIndex).toBe(-1);
			expect(b.getAttribute("aria-hidden")).toBe("true");
		}
	});
});

describe("RadioGroup keyboard navigation", () => {
	const build = () => {
		const group = RadioGroup({ name: "k", defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b", disabled: true }),
			RadioGroupItem({ value: "c" }),
			RadioGroupItem({ value: "d" }),
		]) as HTMLElement;
		document.body.appendChild(group);
		return {
			group,
			items: [
				...group.querySelectorAll<HTMLElement>("[data-slot=radio-group-item]"),
			],
		};
	};

	const press = (el: HTMLElement, key: string) =>
		el.dispatchEvent(
			new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true }),
		);

	it("exposes a single roving tab stop", async () => {
		const { items } = build();
		await settle();

		expect(items[0].tabIndex).toBe(0);
		expect(items[1].tabIndex).toBe(-1);
		expect(items[2].tabIndex).toBe(-1);
		expect(items[3].tabIndex).toBe(-1);
		expect(items.filter((i) => i.tabIndex === 0)).toHaveLength(1);
	});

	it("moves the tab stop with the selection", async () => {
		const { items } = build();
		await settle();

		items[2].click();
		await settle();

		expect(items[2].tabIndex).toBe(0);
		expect(items[0].tabIndex).toBe(-1);
	});

	it("makes the first enabled item tabbable when nothing is selected", async () => {
		const group = RadioGroup({ name: "n" }, [
			RadioGroupItem({ value: "x", disabled: true }),
			RadioGroupItem({ value: "y" }),
		]) as HTMLElement;
		document.body.appendChild(group);
		await settle();

		const items = [
			...group.querySelectorAll<HTMLElement>("[data-slot=radio-group-item]"),
		];
		expect(items[0].tabIndex).toBe(-1);
		expect(items[1].tabIndex).toBe(0);
	});

	it("ArrowDown / ArrowRight advance and skip disabled items", async () => {
		const { items } = build();
		await settle();

		press(items[0], "ArrowDown");
		await settle();
		// index 1 is disabled, so selection lands on "c".
		expect(items[2].getAttribute("aria-checked")).toBe("true");

		press(items[2], "ArrowRight");
		await settle();
		expect(items[3].getAttribute("aria-checked")).toBe("true");
	});

	it("ArrowUp / ArrowLeft go backwards and skip disabled items", async () => {
		const { items } = build();
		await settle();

		items[2].click();
		await settle();

		press(items[2], "ArrowUp");
		await settle();
		expect(items[0].getAttribute("aria-checked")).toBe("true");

		items[2].click();
		await settle();
		press(items[2], "ArrowLeft");
		await settle();
		expect(items[0].getAttribute("aria-checked")).toBe("true");
	});

	it("wraps around at both ends", async () => {
		const { items } = build();
		await settle();

		press(items[0], "ArrowUp");
		await settle();
		expect(items[3].getAttribute("aria-checked")).toBe("true");

		press(items[3], "ArrowDown");
		await settle();
		expect(items[0].getAttribute("aria-checked")).toBe("true");
	});

	it("Home and End jump to the first and last enabled items", async () => {
		const { items } = build();
		await settle();

		press(items[0], "End");
		await settle();
		expect(items[3].getAttribute("aria-checked")).toBe("true");

		press(items[3], "Home");
		await settle();
		expect(items[0].getAttribute("aria-checked")).toBe("true");
	});

	it("never selects a disabled item via the keyboard", async () => {
		const { items } = build();
		await settle();

		for (const key of ["ArrowDown", "ArrowUp", "Home", "End"]) {
			press(items[0], key);
			await settle();
			expect(items[1].getAttribute("aria-checked")).not.toBe("true");
		}
	});

	it("does not navigate when the whole group is disabled", async () => {
		const group = RadioGroup({ name: "d", defaultValue: "a", disabled: true }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		document.body.appendChild(group);
		await settle();

		const items = [
			...group.querySelectorAll<HTMLElement>("[data-slot=radio-group-item]"),
		];
		press(items[0], "ArrowDown");
		await settle();

		expect(items[0].getAttribute("aria-checked")).toBe("true");
		expect(items[1].getAttribute("aria-checked")).toBe("false");
	});
});
