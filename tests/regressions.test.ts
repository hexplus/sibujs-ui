// ============================================================================
// Historical regression tests — sibujs-ui
// ============================================================================
//
// These tests lock in fixes for bugs that have already shipped once.
// Each `describe` block references the specific class of bug so that a
// future regression triggers a test with an obvious name.

import { beforeEach, describe, expect, it, vi } from "vitest";
import { dispose, signal } from "sibujs";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../src/components/accordion";
import { Checkbox } from "../src/components/checkbox";
import { FieldLabel } from "../src/components/field";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../src/components/hover-card";
import { Label } from "../src/components/label";
import { ScrollArea } from "../src/components/scroll-area";
import { Switch } from "../src/components/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/components/tabs";
import { Toggle } from "../src/components/toggle";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../src/components/tooltip";

// ─── 1. Reactive controlled-prop bug ───────────────────────────────────────
//
// Before the bindControlled() helper, these components seeded their
// internal signal with `signal(controlled ?? defaultValue)`. When the
// caller passed a reactive getter, the function itself was stored as
// the signal value. Any read (`String(isChecked())`, `!isChecked()`,
// etc.) was wrong.

describe("Checkbox — reactive controlled prop", () => {
	it("reflects the current value of a reactive `checked` getter", () => {
		const [checked, setChecked] = signal(false);
		const el = Checkbox({ checked }) as HTMLElement;
		expect(el.getAttribute("data-state")).toBe("unchecked");
		expect(el.getAttribute("aria-checked")).toBe("false");

		setChecked(true);
		expect(el.getAttribute("data-state")).toBe("checked");
		expect(el.getAttribute("aria-checked")).toBe("true");
	});

	it("accepts a literal boolean as the initial checked state", () => {
		const el = Checkbox({ checked: true }) as HTMLElement;
		expect(el.getAttribute("data-state")).toBe("checked");
	});

	it("clicking toggles uncontrolled state", () => {
		const el = Checkbox({}) as HTMLElement;
		expect(el.getAttribute("data-state")).toBe("unchecked");
		el.click();
		expect(el.getAttribute("data-state")).toBe("checked");
	});
});

describe("Switch — reactive controlled prop", () => {
	it("reflects the current value of a reactive `checked` getter", () => {
		const [checked, setChecked] = signal(false);
		const el = Switch({ checked }) as HTMLElement;
		expect(el.getAttribute("data-state")).toBe("unchecked");

		setChecked(true);
		expect(el.getAttribute("data-state")).toBe("checked");
	});
});

describe("Tabs — reactive controlled value", () => {
	it("mirrors a reactive `value` getter into the active tab state", () => {
		const [active, setActive] = signal("one");

		const el = Tabs(
			{ value: active },
			[
				TabsList({}, [
					TabsTrigger({ value: "one" }, "One"),
					TabsTrigger({ value: "two" }, "Two"),
				]),
				TabsContent({ value: "one" }, "Panel one"),
				TabsContent({ value: "two" }, "Panel two"),
			],
		) as HTMLElement;
		document.body.appendChild(el);

		// Give the internal queueMicrotask bindings a chance to run
		return Promise.resolve().then(() => {
			const oneTrigger = el.querySelector('[data-slot="tabs-trigger"][data-value="one"]');
			const twoTrigger = el.querySelector('[data-slot="tabs-trigger"][data-value="two"]');

			expect(oneTrigger?.getAttribute("data-state")).toBe("active");
			expect(twoTrigger?.getAttribute("data-state")).toBe("inactive");

			setActive("two");
			// The effect is synchronous once the binding is wired up
			expect(oneTrigger?.getAttribute("data-state")).toBe("inactive");
			expect(twoTrigger?.getAttribute("data-state")).toBe("active");

			document.body.removeChild(el);
		});
	});
});

// ─── 2. Label `for` / `htmlFor` compatibility ──────────────────────────────
//
// Before the fix, `Label({ htmlFor: "x" })` dropped the prop on the
// floor because the component only destructured `for`. Both forms now
// have to produce a working `<label for="x">`.

describe("Label — for / htmlFor compat", () => {
	it("forwards `for` to the underlying label element", () => {
		const el = Label({ for: "email" }, "Email") as HTMLLabelElement;
		expect(el.getAttribute("for")).toBe("email");
		expect(el.textContent).toBe("Email");
	});

	it("accepts `htmlFor` as an alias for `for`", () => {
		const el = Label({ htmlFor: "password" }, "Password") as HTMLLabelElement;
		expect(el.getAttribute("for")).toBe("password");
	});

	it("`for` wins when both are provided", () => {
		const el = Label({ for: "primary", htmlFor: "fallback" }, "x") as HTMLLabelElement;
		expect(el.getAttribute("for")).toBe("primary");
	});
});

describe("FieldLabel — for / htmlFor compat", () => {
	it("forwards `for` on FieldLabel too", () => {
		const el = FieldLabel({ for: "username" }, "Username") as HTMLLabelElement;
		expect(el.getAttribute("for")).toBe("username");
	});

	it("accepts `htmlFor` on FieldLabel", () => {
		const el = FieldLabel({ htmlFor: "city" }, "City") as HTMLLabelElement;
		expect(el.getAttribute("for")).toBe("city");
	});
});

// ─── 3. Toggle — reactive controlled prop ──────────────────────────────────
//
// Before the bindControlled() fix, Toggle seeded its signal with
// `signal(pressed ?? defaultPressed)`. A reactive getter stored as the
// literal signal value meant every read returned the function itself,
// so `data-state` and `aria-pressed` were always "on"/"true".

describe("Toggle — reactive controlled prop", () => {
	it("reflects the current value of a reactive `pressed` getter", () => {
		const [pressed, setPressed] = signal(false);
		const el = Toggle({ pressed }) as HTMLElement;
		expect(el.getAttribute("data-state")).toBe("off");
		expect(el.getAttribute("aria-pressed")).toBe("false");

		setPressed(true);
		expect(el.getAttribute("data-state")).toBe("on");
		expect(el.getAttribute("aria-pressed")).toBe("true");
	});

	it("accepts a literal boolean as the initial pressed state", () => {
		const el = Toggle({ pressed: true }) as HTMLElement;
		expect(el.getAttribute("data-state")).toBe("on");
	});

	it("clicking toggles uncontrolled state", () => {
		const el = Toggle({}) as HTMLElement;
		expect(el.getAttribute("data-state")).toBe("off");
		el.click();
		expect(el.getAttribute("data-state")).toBe("on");
	});

	it("controlled toggle does not mutate its internal mirror on click", () => {
		const [pressed, _setPressed] = signal(false);
		let called = false;
		const el = Toggle({
			pressed,
			onPressedChange: () => {
				called = true;
			},
		}) as HTMLElement;
		el.click();
		// onPressedChange fires but the internal state still mirrors the parent
		expect(called).toBe(true);
		expect(el.getAttribute("data-state")).toBe("off");
	});
});

// ─── 4. Tooltip — reactive open, a11y, initial state ───────────────────────
//
// Previously Tooltip stored a reactive `open` getter as the signal value
// (same class as Checkbox/Switch/Tabs/Toggle), and TooltipContent did not
// adopt the stable id needed for aria-describedby. Initial markup also
// flashed open because the data-state wasn't seeded at creation.

describe("Tooltip — reactive controlled open + a11y", () => {
	it("reflects a reactive `open` getter into the content state", async () => {
		const [open, setOpen] = signal(false);
		const root = Tooltip({ open }, [
			TooltipTrigger({}, "Trigger"),
			TooltipContent({}, "Content"),
		]);
		document.body.appendChild(root);
		await Promise.resolve();

		const content = root.querySelector(
			'[data-slot="tooltip-content"]',
		) as HTMLElement;
		expect(content.getAttribute("data-state")).toBe("closed");

		setOpen(true);
		expect(content.getAttribute("data-state")).toBe("open");

		dispose(root);
		document.body.removeChild(root);
	});

	it("seeds data-state=closed on the content at creation (no FOUC)", () => {
		const content = TooltipContent({}, "Content");
		expect(content.getAttribute("data-state")).toBe("closed");
		expect((content as HTMLElement).style.display).toBe("none");
	});

	it("wires aria-describedby from trigger to content via a shared id", async () => {
		const root = Tooltip({}, [
			TooltipTrigger({}, "T"),
			TooltipContent({}, "C"),
		]);
		document.body.appendChild(root);
		await Promise.resolve();

		const trigger = root.querySelector(
			'[data-slot="tooltip-trigger"]',
		) as HTMLElement;
		const content = root.querySelector(
			'[data-slot="tooltip-content"]',
		) as HTMLElement;

		const describedBy = trigger.getAttribute("aria-describedby");
		expect(describedBy).toBeTruthy();
		expect(content.id).toBe(describedBy);

		dispose(root);
		document.body.removeChild(root);
	});

	it("Escape key closes an uncontrolled tooltip", async () => {
		const root = Tooltip({}, [
			TooltipTrigger({}, "T"),
			TooltipContent({}, "C"),
		]);
		document.body.appendChild(root);
		await Promise.resolve();

		const trigger = root.querySelector(
			'[data-slot="tooltip-trigger"]',
		) as HTMLElement;
		const content = root.querySelector(
			'[data-slot="tooltip-content"]',
		) as HTMLElement;

		trigger.dispatchEvent(new Event("pointerenter"));
		expect(content.getAttribute("data-state")).toBe("open");

		trigger.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Escape" }),
		);
		expect(content.getAttribute("data-state")).toBe("closed");

		dispose(root);
		document.body.removeChild(root);
	});
});

// ─── 5. HoverCard — reactive open ──────────────────────────────────────────

describe("HoverCard — reactive controlled open + a11y", () => {
	it("reflects a reactive `open` getter into the content state", async () => {
		const [open, setOpen] = signal(false);
		const root = HoverCard({ open }, [
			HoverCardTrigger({}, "T"),
			HoverCardContent({}, "C"),
		]);
		document.body.appendChild(root);
		await Promise.resolve();

		const content = root.querySelector(
			'[data-slot="hover-card-content"]',
		) as HTMLElement;
		expect(content.getAttribute("data-state")).toBe("closed");

		setOpen(true);
		expect(content.getAttribute("data-state")).toBe("open");

		dispose(root);
		document.body.removeChild(root);
	});

	it("seeds data-state=closed on HoverCardContent at creation", () => {
		const content = HoverCardContent({}, "C");
		expect(content.getAttribute("data-state")).toBe("closed");
		expect((content as HTMLElement).style.display).toBe("none");
	});

	it("wires aria-describedby from trigger to content via a shared id", async () => {
		const root = HoverCard({}, [
			HoverCardTrigger({}, "T"),
			HoverCardContent({}, "C"),
		]);
		document.body.appendChild(root);
		await Promise.resolve();

		const trigger = root.querySelector(
			'[data-slot="hover-card-trigger"]',
		) as HTMLElement;
		const content = root.querySelector(
			'[data-slot="hover-card-content"]',
		) as HTMLElement;

		const describedBy = trigger.getAttribute("aria-describedby");
		expect(describedBy).toBeTruthy();
		expect(content.id).toBe(describedBy);

		dispose(root);
		document.body.removeChild(root);
	});
});

// ─── 6. ResizeObserver cleanup on dispose ──────────────────────────────────
//
// Accordion and ScrollArea both attach a ResizeObserver during the
// queueMicrotask wire-up. Before the fix these observers were never
// disconnected, so repeatedly mounting and unmounting either component
// leaked references to the viewport and its content closure. The
// regression test mocks ResizeObserver globally and asserts that
// `disconnect()` is invoked when the element is disposed.

type MockRO = {
	observe: ReturnType<typeof vi.fn>;
	unobserve: ReturnType<typeof vi.fn>;
	disconnect: ReturnType<typeof vi.fn>;
};

let roInstances: MockRO[] = [];

beforeEach(() => {
	roInstances = [];
	class FakeResizeObserver {
		observe = vi.fn();
		unobserve = vi.fn();
		disconnect = vi.fn();
		constructor() {
			roInstances.push(this as unknown as MockRO);
		}
	}
	(globalThis as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver =
		FakeResizeObserver as unknown as typeof ResizeObserver;
});

describe("Accordion — ResizeObserver is disconnected on dispose", () => {
	it("disconnects its ResizeObserver when the content is disposed", async () => {
		const root = Accordion({ type: "single", defaultValue: "a" }, [
			AccordionItem({ value: "a" }, [
				AccordionTrigger({}, "A"),
				AccordionContent({}, "content"),
			]),
		]);
		document.body.appendChild(root);
		await Promise.resolve();

		expect(roInstances.length).toBeGreaterThan(0);
		const ro = roInstances[roInstances.length - 1];
		expect(ro.observe).toHaveBeenCalled();
		expect(ro.disconnect).not.toHaveBeenCalled();

		dispose(root);
		document.body.removeChild(root);

		expect(ro.disconnect).toHaveBeenCalledTimes(1);
	});
});

describe("ScrollArea — ResizeObserver is disconnected on dispose", () => {
	it("disconnects its ResizeObserver when the root is disposed", async () => {
		const root = ScrollArea({}, "scroll me");
		document.body.appendChild(root);
		await Promise.resolve();

		expect(roInstances.length).toBeGreaterThan(0);
		const ro = roInstances[roInstances.length - 1];
		expect(ro.observe).toHaveBeenCalled();
		expect(ro.disconnect).not.toHaveBeenCalled();

		dispose(root);
		document.body.removeChild(root);

		expect(ro.disconnect).toHaveBeenCalledTimes(1);
	});
});
