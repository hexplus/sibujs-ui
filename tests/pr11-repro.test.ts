/**
 * Regression coverage for the component defects reported on PR #11.
 *
 * Every assertion here was first shown to fail against the unmodified PR head
 * (0795f83). The SibuJS compatibility matrix is covered by the `compat` job in
 * `.github/workflows/ci.yml`.
 */
import { dispose, signal } from "sibujs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../src/components/accordion";
import { Calendar } from "../src/components/calendar";
import { Checkbox } from "../src/components/checkbox";
import { RadioGroup, RadioGroupItem } from "../src/components/radio-group";
import { Switch } from "../src/components/switch";
import { ToggleGroup, ToggleGroupItem } from "../src/components/toggle-group";

const settle = async () => {
	for (let i = 0; i < 6; i++) await Promise.resolve();
};
const entries = (f: HTMLFormElement) => [...new FormData(f).entries()];

/** Replace requestAnimationFrame with a manually pumped queue. */
function captureFrames() {
	const frames: FrameRequestCallback[] = [];
	const cancelled = new Set<number>();
	const realRaf = globalThis.requestAnimationFrame;
	const realCancel = globalThis.cancelAnimationFrame;

	globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
		frames.push(cb);
		return frames.length;
	}) as typeof requestAnimationFrame;
	globalThis.cancelAnimationFrame = ((id: number) => {
		cancelled.add(id);
	}) as typeof cancelAnimationFrame;

	return {
		count: () => frames.length,
		/** Run every queued frame that was not cancelled. */
		flush() {
			frames.forEach((cb, i) => {
				if (!cancelled.has(i + 1)) cb(0);
			});
			frames.length = 0;
		},
		restore() {
			globalThis.requestAnimationFrame = realRaf;
			globalThis.cancelAnimationFrame = realCancel;
		},
	};
}

const newForm = (...children: HTMLElement[]) => {
	const f = document.createElement("form");
	for (const c of children) f.appendChild(c);
	document.body.appendChild(f);
	return f;
};

const bridges = (root: ParentNode) =>
	root.querySelectorAll("input[data-slot$=-form-bridge]");

const tabbable = (g: HTMLElement) =>
	[...g.querySelectorAll<HTMLElement>("[data-slot=radio-group-item]")].filter(
		(i) => i.tabIndex === 0,
	);

/** The invariant the roving tab stop must always satisfy. */
function expectSingleTabStop(group: HTMLElement) {
	const items = [
		...group.querySelectorAll<HTMLElement>("[data-slot=radio-group-item]"),
	];
	const enabled = items.filter((i) => !i.hasAttribute("disabled"));
	const stops = tabbable(group);
	expect(stops).toHaveLength(enabled.length === 0 ? 0 : 1);
	// A disabled item is never the tab stop.
	for (const s of stops) expect(s.hasAttribute("disabled")).toBe(false);
}

beforeEach(() => {
	document.body.replaceChildren();
});
afterEach(() => {
	document.body.replaceChildren();
});

describe("DEFECT 1 — form bridge with delayed mounting", () => {
	it("installs the bridge when a detached Checkbox is mounted later", async () => {
		const cb = Checkbox({ name: "agree", defaultChecked: true });

		// Created detached; the original setup microtask passed with no parent.
		await settle();

		const f = newForm();
		f.appendChild(cb);
		await settle();

		expect(bridges(f)).toHaveLength(1);
		expect(entries(f)).toEqual([["agree", "on"]]);
	});

	it("installs RadioGroup bridges when mounted later", async () => {
		const group = RadioGroup({ name: "plan", defaultValue: "pro" }, [
			RadioGroupItem({ value: "free" }),
			RadioGroupItem({ value: "pro" }),
		]) as HTMLElement;

		await settle();

		const f = newForm();
		f.appendChild(group);
		await settle();

		expect(entries(f)).toEqual([["plan", "pro"]]);
		expect(bridges(f)).toHaveLength(2);
	});

	it("installs the bridge for a Switch mounted later", async () => {
		const sw = Switch({ name: "notify", defaultChecked: true });
		await settle();

		const f = newForm();
		f.appendChild(sw);
		await settle();

		expect(entries(f)).toEqual([["notify", "on"]]);
	});

	it("never installs a bridge when disposed before mounting", async () => {
		const cb = Checkbox({ name: "agree", defaultChecked: true });
		await settle();

		dispose(cb);

		const f = newForm();
		f.appendChild(cb);
		await settle();

		expect(bridges(f)).toHaveLength(0);
		expect(entries(f)).toEqual([]);
	});

	it("moves the bridge with the control, leaving nothing stale behind", async () => {
		const cb = Checkbox({ name: "agree", defaultChecked: true });
		const formA = newForm(cb);
		await settle();
		expect(entries(formA)).toEqual([["agree", "on"]]);

		const formB = newForm();
		formB.appendChild(cb);
		await settle();

		// The old form keeps no orphaned input...
		expect(bridges(formA)).toHaveLength(0);
		expect(entries(formA)).toEqual([]);
		// ...and the control is fully functional in its new form.
		expect(bridges(formB)).toHaveLength(1);
		expect(entries(formB)).toEqual([["agree", "on"]]);
	});

	it("survives repeated detach/reattach without duplicating inputs", async () => {
		const cb = Checkbox({ name: "agree", defaultChecked: true });
		const f = newForm(cb);
		await settle();

		for (let i = 0; i < 4; i++) {
			cb.remove();
			await settle();
			expect(bridges(f)).toHaveLength(0);

			f.appendChild(cb);
			await settle();
			expect(bridges(f)).toHaveLength(1);
			expect(entries(f)).toEqual([["agree", "on"]]);
		}
	});

	it("removes the bridge on disposal after installation", async () => {
		const cb = Checkbox({ name: "agree" });
		const f = newForm(cb);
		await settle();
		expect(bridges(f)).toHaveLength(1);

		dispose(cb);
		expect(bridges(f)).toHaveLength(0);
		expect(entries(f)).toEqual([]);
	});

	it("keeps synchronously mounted controls behaving as before", async () => {
		const cb = Checkbox({ name: "agree", defaultChecked: true });
		const f = newForm(cb);
		// One microtask flush is all a synchronously mounted control needs.
		await Promise.resolve();
		await Promise.resolve();
		expect(entries(f)).toEqual([["agree", "on"]]);
	});

	it("keeps reactive state in sync after a delayed mount", async () => {
		const [checked, setChecked] = signal(false);
		const cb = Checkbox({ name: "agree", checked: () => checked() });
		await settle();

		const f = newForm();
		f.appendChild(cb);
		await settle();

		expect(entries(f)).toEqual([]);
		setChecked(true);
		expect(entries(f)).toEqual([["agree", "on"]]);
		setChecked(false);
		expect(entries(f)).toEqual([]);
	});
});

describe("DEFECT 2 — required nameless RadioGroup validation", () => {
	it("is valid when an enabled item is selected without a public name", async () => {
		const group = RadioGroup({ required: true, defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		expect(f.checkValidity()).toBe(true);
	});

	it("is invalid when a required nameless group has no selection", async () => {
		const group = RadioGroup({ required: true }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		expect(f.checkValidity()).toBe(false);
	});

	it("becomes valid once the user selects an item", async () => {
		const group = RadioGroup({ required: true }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(false);

		group.querySelector<HTMLElement>("[data-value=b]")?.click();
		await settle();

		expect(f.checkValidity()).toBe(true);
	});

	it("exposes no generated field in FormData", async () => {
		const group = RadioGroup({ required: true, defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		expect(entries(f)).toEqual([]);
		// Nothing named may have been generated anywhere in the form.
		for (const input of f.querySelectorAll("input")) {
			expect(input.getAttribute("name")).toBeNull();
		}
	});

	it("keeps two nameless required groups independent", async () => {
		const g1 = RadioGroup({ required: true, defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		const g2 = RadioGroup({ required: true }, [
			RadioGroupItem({ value: "x" }),
		]) as HTMLElement;
		const f = newForm(g1, g2);
		await settle();

		// g1 is satisfied, g2 is not — so the form is invalid.
		expect(f.checkValidity()).toBe(false);

		g2.querySelector<HTMLElement>("[data-value=x]")?.click();
		await settle();
		expect(f.checkValidity()).toBe(true);

		// And still no FormData pollution from either group.
		expect(entries(f)).toEqual([]);
	});

	it("still submits the selected value for a named group", async () => {
		const group = RadioGroup(
			{ name: "plan", required: true, defaultValue: "pro" },
			[RadioGroupItem({ value: "free" }), RadioGroupItem({ value: "pro" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();

		expect(entries(f)).toEqual([["plan", "pro"]]);
		expect(f.checkValidity()).toBe(true);
		// No group-level validity bridge is added when a real name exists.
		expect(
			f.querySelectorAll("[data-slot=radio-group-validity-bridge]"),
		).toHaveLength(0);
	});

	it("treats a disabled nameless group as barred from validation", async () => {
		const group = RadioGroup({ required: true, disabled: true }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		expect(f.checkValidity()).toBe(true);
	});

	it("does not count a selection pointing at a disabled item", async () => {
		const group = RadioGroup({ required: true, defaultValue: "b" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b", disabled: true }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		// "b" is disabled, so there is no valid selection.
		expect(f.checkValidity()).toBe(false);
	});

	it("adds no validity bridge when the group is not required", async () => {
		const group = RadioGroup({ defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		expect(f.querySelectorAll("input")).toHaveLength(0);
		expect(f.checkValidity()).toBe(true);
	});

	it("works with a controlled nameless required group", async () => {
		const [value, setValue] = signal("");
		const group = RadioGroup({ required: true, value: () => value() }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		expect(f.checkValidity()).toBe(false);
		setValue("a");
		expect(f.checkValidity()).toBe(true);
	});
});

describe("DEFECT 3 — roving tabindex with dynamic items", () => {
	it("normalizes an item inserted after initialization", async () => {
		const group = RadioGroup({ defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		document.body.appendChild(group);
		await settle();
		expectSingleTabStop(group);

		group.appendChild(RadioGroupItem({ value: "c" }));
		await settle();

		expectSingleTabStop(group);
		expect(tabbable(group)[0].getAttribute("data-value")).toBe("a");
	});

	it("restores a tab stop when the current one is removed", async () => {
		const group = RadioGroup({ defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		document.body.appendChild(group);
		await settle();

		group.querySelector<HTMLElement>("[data-value=a]")?.remove();
		await settle();

		expectSingleTabStop(group);
		expect(tabbable(group)[0].getAttribute("data-value")).toBe("b");
	});

	it("updates both groups when an item moves between them", async () => {
		const g1 = RadioGroup({ defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const g2 = RadioGroup({ defaultValue: "x" }, [
			RadioGroupItem({ value: "x" }),
		]) as HTMLElement;
		document.body.append(g1, g2);
		await settle();

		const moved = g1.querySelector<HTMLElement>("[data-value=b]") as HTMLElement;
		g2.appendChild(moved);
		await settle();

		expectSingleTabStop(g1);
		expectSingleTabStop(g2);
		// The moved item is not a second tab stop in its new home.
		expect(moved.tabIndex).toBe(-1);
	});

	it("keeps a valid tab stop when the selected item becomes disabled", async () => {
		const group = RadioGroup({ defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		document.body.appendChild(group);
		await settle();

		const first = group.querySelector<HTMLElement>(
			"[data-value=a]",
		) as HTMLElement;
		first.setAttribute("disabled", "");
		await settle();

		expectSingleTabStop(group);
		expect(first.tabIndex).toBe(-1);
	});

	it("normalizes items added and removed through reactive children", async () => {
		const [items, setItems] = signal(["a", "b"]);
		const group = RadioGroup({ defaultValue: "a" }, [
			() => items().map((v) => RadioGroupItem({ value: v })),
		]) as HTMLElement;
		document.body.appendChild(group);
		await settle();
		expectSingleTabStop(group);

		setItems(["a", "b", "c", "d"]);
		await settle();
		expectSingleTabStop(group);

		// Drop the selected item; the tab stop must move to a survivor.
		setItems(["c", "d"]);
		await settle();
		expectSingleTabStop(group);
	});

	it("stops observing membership once the group is disposed", async () => {
		const group = RadioGroup({ defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		document.body.appendChild(group);
		await settle();

		dispose(group);

		const late = RadioGroupItem({ value: "z" });
		group.appendChild(late);
		await settle();

		// A disposed group must not keep normalizing tabindex.
		expect(late.tabIndex).toBe(0);
	});
});

describe("DEFECT 4 — no callbacks or DOM mutation after disposal", () => {
	it("cancels a pending Accordion animation frame", async () => {
		const raf = captureFrames();
		try {
			const [open, setOpen] = signal("");
			const acc = Accordion({ type: "single", value: () => open() }, [
				AccordionItem({ value: "i1" }, [
					AccordionTrigger("T"),
					AccordionContent("Body"),
				]),
			]) as HTMLElement;
			document.body.appendChild(acc);
			await settle();

			setOpen("i1"); // schedules the open animation frame
			const content = acc.querySelector(
				"[data-slot=accordion-content]",
			) as HTMLElement;
			expect(raf.count()).toBeGreaterThan(0);

			dispose(acc);
			const stateAtDispose = content.getAttribute("data-state");
			const heightAtDispose = content.style.height;

			raf.flush();

			expect(content.getAttribute("data-state")).toBe(stateAtDispose);
			expect(content.style.height).toBe(heightAtDispose);
		} finally {
			raf.restore();
		}
	});

	it("still runs the Accordion frame while the component is alive", async () => {
		const raf = captureFrames();
		try {
			const [open, setOpen] = signal("");
			const acc = Accordion({ type: "single", value: () => open() }, [
				AccordionItem({ value: "i1" }, [
					AccordionTrigger("T"),
					AccordionContent("Body"),
				]),
			]) as HTMLElement;
			document.body.appendChild(acc);
			await settle();

			setOpen("i1");
			raf.flush();

			const content = acc.querySelector(
				"[data-slot=accordion-content]",
			) as HTMLElement;
			// The guard must not suppress legitimate work.
			expect(content.getAttribute("data-state")).toBe("open");
			expect(content.style.height).toBe("");
		} finally {
			raf.restore();
		}
	});

	it("cancels a pending ToggleGroup item frame", async () => {
		const raf = captureFrames();
		try {
			const group = ToggleGroup({ type: "single" }, [
				ToggleGroupItem({ value: "a" }, "A"),
			]) as HTMLElement;
			document.body.appendChild(group);

			const item = group.querySelector(
				"[data-slot=toggle-group-item]",
			) as HTMLElement;
			expect(raf.count()).toBeGreaterThan(0);

			dispose(group);
			const before = item.outerHTML;

			raf.flush();

			expect(item.outerHTML).toBe(before);
		} finally {
			raf.restore();
		}
	});

	it("cancels a pending Calendar dropdown frame", async () => {
		const raf = captureFrames();
		try {
			const cal = Calendar({ captionLayout: "dropdown" }) as HTMLElement;
			document.body.appendChild(cal);
			await settle();

			const trigger = cal.querySelector("button") as HTMLElement;
			trigger?.click();
			await settle();

			dispose(cal);
			// Flushing must not throw or touch detached DOM.
			expect(() => raf.flush()).not.toThrow();
		} finally {
			raf.restore();
		}
	});

	it("clears pending Accordion close timers on disposal", async () => {
		const [open, setOpen] = signal("i1");
		const acc = Accordion({ type: "single", value: () => open() }, [
			AccordionItem({ value: "i1" }, [
				AccordionTrigger("T"),
				AccordionContent("Body"),
			]),
		]) as HTMLElement;
		document.body.appendChild(acc);
		await settle();

		vi.useFakeTimers();
		try {
			setOpen("");
			const pending = vi.getTimerCount();
			dispose(acc);
			expect(vi.getTimerCount()).toBeLessThanOrEqual(pending);
			// Nothing queued may fire against the detached tree.
			expect(() => vi.runAllTimers()).not.toThrow();
		} finally {
			vi.useRealTimers();
		}
	});

	it("is safe to dispose more than once", async () => {
		const group = RadioGroup({ name: "n", required: true, defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
		]) as HTMLElement;
		newForm(group);
		await settle();

		expect(() => {
			dispose(group);
			dispose(group);
		}).not.toThrow();
	});
});
