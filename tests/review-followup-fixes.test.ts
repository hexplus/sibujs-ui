/**
 * Regression coverage for four defects found in review of the
 * `fix/ui-lifecycle-a11y-hardening` branch.
 *
 *  1. RadioGroup ignored a form reset that *cleared* the selection, so the
 *     control and the form disagreed about the field's value.
 *  2. AlertDialogContent's one-shot "drop unresolved ARIA references" pass ran
 *     before a reactive child could produce a title, and nothing ever restored
 *     the reference.
 *  3. DialogTitle/DialogDescription never re-pointed the content at a
 *     caller-supplied id, and DialogContent had no unresolved-reference pass at
 *     all, so `aria-labelledby` could dangle.
 *  4. `Owner.raf()` / `timeout()` retained their cancellation closure forever,
 *     so a component that schedules a frame or timer per interaction grew an
 *     unbounded teardown list.
 */
import { dispose, signal } from "sibujs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from "../src/components/alert-dialog";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "../src/components/dialog";
import { RadioGroup, RadioGroupItem } from "../src/components/radio-group";
import { nodeOwner } from "../src/lib/lifecycle";
import { __resetScrollLock } from "../src/lib/scroll-lock";

const settle = async () => {
	for (let i = 0; i < 8; i++) await Promise.resolve();
};

const ITEM = "[data-slot=radio-group-item]";
const entries = (f: HTMLFormElement) => [...new FormData(f).entries()];
const newForm = (...kids: HTMLElement[]) => {
	const f = document.createElement("form");
	for (const k of kids) f.appendChild(k);
	document.body.appendChild(f);
	return f;
};
const items = (g: HTMLElement) => [...g.querySelectorAll<HTMLElement>(ITEM)];
const checkedValue = (g: HTMLElement) =>
	items(g)
		.find((i) => i.getAttribute("aria-checked") === "true")
		?.getAttribute("data-value") ?? null;

/** Resolve an ARIA id reference within a content element. */
function resolves(content: HTMLElement, attr: string): HTMLElement | null {
	const id = content.getAttribute(attr);
	if (!id) return null;
	for (const el of content.querySelectorAll<HTMLElement>("[id]")) {
		if (el.id === id) return el;
	}
	return null;
}

beforeEach(() => {
	__resetScrollLock();
	document.body.replaceChildren();
	document.body.removeAttribute("style");
});
afterEach(() => {
	document.body.replaceChildren();
	document.body.removeAttribute("style");
	__resetScrollLock();
});

// ── Finding 1 ───────────────────────────────────────────────────────────────

describe("RadioGroup follows a form reset that clears the selection", () => {
	it("clears the selection when the group has no defaultValue", async () => {
		const changes: string[] = [];
		const group = RadioGroup(
			{ name: "choice", onValueChange: (v: string) => changes.push(v) },
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();

		items(group)[1].click();
		await settle();
		expect(entries(f)).toEqual([["choice", "b"]]);
		expect(checkedValue(group)).toBe("b");

		f.reset();
		await settle();

		// The browser unchecked every bridge radio; the control must agree.
		expect(entries(f)).toEqual([]);
		expect(checkedValue(group)).toBeNull();
		expect(items(group)[1].getAttribute("data-state")).toBe("unchecked");
		expect(changes.at(-1)).toBe("");
	});

	it("restores the defaultValue rather than merely clearing", async () => {
		const group = RadioGroup({ name: "choice", defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		items(group)[1].click();
		await settle();
		expect(entries(f)).toEqual([["choice", "b"]]);

		f.reset();
		await settle();

		expect(entries(f)).toEqual([["choice", "a"]]);
		expect(checkedValue(group)).toBe("a");
	});

	it("survives repeated select/reset cycles", async () => {
		const group = RadioGroup({ name: "choice" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		for (let i = 0; i < 4; i++) {
			items(group)[i % 2].click();
			await settle();
			expect(entries(f)).toHaveLength(1);

			f.reset();
			await settle();
			expect(entries(f)).toEqual([]);
			expect(checkedValue(group)).toBeNull();
		}
	});

	it("re-invalidates a required named group after reset", async () => {
		const group = RadioGroup({ name: "choice", required: true }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(false);

		items(group)[0].click();
		await settle();
		expect(f.checkValidity()).toBe(true);

		f.reset();
		await settle();
		expect(f.checkValidity()).toBe(false);
		expect(checkedValue(group)).toBeNull();
	});

	it("re-invalidates a required nameless group after reset", async () => {
		const group = RadioGroup({ required: true }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(false);

		items(group)[0].click();
		await settle();
		expect(f.checkValidity()).toBe(true);

		f.reset();
		await settle();

		// A nameless group contributes nothing to FormData, but it still lives in
		// the form and must return to its default on reset.
		expect(checkedValue(group)).toBeNull();
		expect(f.checkValidity()).toBe(false);
	});

	it("resets a nameless group back to its defaultValue", async () => {
		const group = RadioGroup({ defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		items(group)[1].click();
		await settle();
		expect(checkedValue(group)).toBe("b");

		f.reset();
		await settle();
		expect(checkedValue(group)).toBe("a");
	});

	it("leaves a controlled group's value to its owner", async () => {
		const [value, setValue] = signal("b");
		const group = RadioGroup({ name: "choice", value: () => value() }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(checkedValue(group)).toBe("b");

		f.reset();
		await settle();

		// A controlled value is owned by the caller: reset must not rewrite it
		// behind their back.
		expect(checkedValue(group)).toBe("b");
		setValue("a");
		await settle();
		expect(checkedValue(group)).toBe("a");
	});
});

// ── Finding 2 ───────────────────────────────────────────────────────────────

describe("AlertDialog restores ARIA references for late children", () => {
	it("labels the dialog when the title appears reactively", async () => {
		const [show, setShow] = signal(false);
		const root = AlertDialog({ defaultOpen: true }, [
			AlertDialogContent({}, [
				() => (show() ? AlertDialogTitle({}, "Delete file?") : null),
				AlertDialogDescription({}, "This cannot be undone."),
			]),
		]) as HTMLElement;
		document.body.appendChild(root);
		await settle();

		const content = root.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;

		// Absent to begin with, so the reference is correctly dropped.
		expect(content.getAttribute("aria-labelledby")).toBeNull();
		expect(resolves(content, "aria-describedby")).not.toBeNull();

		setShow(true);
		await settle();

		const labelled = resolves(content, "aria-labelledby");
		expect(labelled).not.toBeNull();
		expect(labelled?.getAttribute("data-slot")).toBe("alert-dialog-title");
		expect(labelled?.textContent).toBe("Delete file?");
	});

	it("keeps the description reference when it appears reactively", async () => {
		const [show, setShow] = signal(false);
		const root = AlertDialog({ defaultOpen: true }, [
			AlertDialogContent({}, [
				AlertDialogTitle({}, "Title"),
				() => (show() ? AlertDialogDescription({}, "Details") : null),
			]),
		]) as HTMLElement;
		document.body.appendChild(root);
		await settle();
		const content = root.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;
		expect(content.getAttribute("aria-describedby")).toBeNull();

		setShow(true);
		await settle();
		expect(resolves(content, "aria-describedby")?.textContent).toBe("Details");
	});

	it("still drops a reference that never resolves", async () => {
		const root = AlertDialog({ defaultOpen: true }, [
			AlertDialogContent({}, [AlertDialogTitle({}, "Only a title")]),
		]) as HTMLElement;
		document.body.appendChild(root);
		await settle();

		const content = root.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;
		expect(resolves(content, "aria-labelledby")).not.toBeNull();
		expect(content.getAttribute("aria-describedby")).toBeNull();
	});

	it("still honours a caller-supplied id", async () => {
		const root = AlertDialog({ defaultOpen: true }, [
			AlertDialogContent({}, [
				AlertDialogTitle({ id: "my-title" }, "Custom"),
				AlertDialogDescription({}, "d"),
			]),
		]) as HTMLElement;
		document.body.appendChild(root);
		await settle();

		const content = root.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;
		expect(content.getAttribute("aria-labelledby")).toBe("my-title");
		expect(resolves(content, "aria-labelledby")?.textContent).toBe("Custom");
	});
});

// ── Finding 3 ───────────────────────────────────────────────────────────────

describe("Dialog ARIA references always resolve", () => {
	const build = (children: unknown[]) => {
		const root = Dialog({ defaultOpen: true }, [
			DialogContent({}, children as never),
		]) as HTMLElement;
		document.body.appendChild(root);
		return root;
	};
	const contentOf = (root: HTMLElement) =>
		root.querySelector("[data-slot=dialog-content]") as HTMLElement;

	it("re-points the content at a caller-supplied title id", async () => {
		const root = build([
			DialogTitle({ id: "my-title" }, "Custom"),
			DialogDescription({}, "d"),
		]);
		await settle();

		const content = contentOf(root);
		expect(content.getAttribute("aria-labelledby")).toBe("my-title");
		expect(resolves(content, "aria-labelledby")?.textContent).toBe("Custom");
	});

	it("re-points the content at a caller-supplied description id", async () => {
		const root = build([
			DialogTitle({}, "t"),
			DialogDescription({ id: "my-desc" }, "Details"),
		]);
		await settle();

		const content = contentOf(root);
		expect(content.getAttribute("aria-describedby")).toBe("my-desc");
		expect(resolves(content, "aria-describedby")?.textContent).toBe("Details");
	});

	it("drops a reference with no matching element", async () => {
		const root = build([DialogTitle({}, "Only a title")]);
		await settle();

		const content = contentOf(root);
		expect(resolves(content, "aria-labelledby")).not.toBeNull();
		expect(content.getAttribute("aria-describedby")).toBeNull();
	});

	it("drops both references when neither element exists", async () => {
		const root = build(["Just some text"]);
		await settle();

		const content = contentOf(root);
		expect(content.getAttribute("aria-labelledby")).toBeNull();
		expect(content.getAttribute("aria-describedby")).toBeNull();
	});

	it("labels the dialog when the title appears reactively", async () => {
		const [show, setShow] = signal(false);
		const root = build([
			() => (show() ? DialogTitle({}, "Late title") : null),
			DialogDescription({}, "d"),
		]);
		await settle();

		const content = contentOf(root);
		expect(content.getAttribute("aria-labelledby")).toBeNull();

		setShow(true);
		await settle();
		expect(resolves(content, "aria-labelledby")?.textContent).toBe(
			"Late title",
		);
	});

	it("keeps the normal case resolving to its own instance", async () => {
		const a = build([DialogTitle({}, "A"), DialogDescription({}, "da")]);
		const b = build([DialogTitle({}, "B"), DialogDescription({}, "db")]);
		await settle();

		expect(resolves(contentOf(a), "aria-labelledby")?.textContent).toBe("A");
		expect(resolves(contentOf(b), "aria-labelledby")?.textContent).toBe("B");
		expect(
			contentOf(a).getAttribute("aria-labelledby"),
		).not.toBe(contentOf(b).getAttribute("aria-labelledby"));
	});
});

// ── Finding 4 ───────────────────────────────────────────────────────────────

describe("Owner one-shot timers do not retain teardowns", () => {
	it("releases each raf teardown once the frame has run", () => {
		const queue: FrameRequestCallback[] = [];
		const origRaf = globalThis.requestAnimationFrame;
		const origCancel = globalThis.cancelAnimationFrame;
		let cancels = 0;
		globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
			queue.push(cb);
			return queue.length;
		}) as typeof requestAnimationFrame;
		globalThis.cancelAnimationFrame = (() => {
			cancels++;
		}) as typeof cancelAnimationFrame;

		try {
			const el = document.createElement("div");
			document.body.appendChild(el);
			const owner = nodeOwner(el);

			// A component that schedules one frame per interaction — Accordion does
			// exactly this on every open.
			for (let i = 0; i < 15; i++) {
				owner.raf(() => {});
				const cb = queue.pop();
				cb?.(0);
			}

			// Only disposal-time cancellations matter: they count the teardowns
			// still retained on the node. Completed frames must retain none.
			const beforeDispose = cancels;
			dispose(el);
			expect(cancels - beforeDispose).toBe(0);
		} finally {
			globalThis.requestAnimationFrame = origRaf;
			globalThis.cancelAnimationFrame = origCancel;
		}
	});

	it("still cancels a frame that has not run yet", () => {
		const queue: FrameRequestCallback[] = [];
		const origRaf = globalThis.requestAnimationFrame;
		const origCancel = globalThis.cancelAnimationFrame;
		let cancels = 0;
		globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) => {
			queue.push(cb);
			return queue.length;
		}) as typeof requestAnimationFrame;
		globalThis.cancelAnimationFrame = (() => {
			cancels++;
		}) as typeof cancelAnimationFrame;

		try {
			const el = document.createElement("div");
			document.body.appendChild(el);
			let ran = false;
			nodeOwner(el).raf(() => {
				ran = true;
			});

			const beforeDispose = cancels;
			dispose(el);
			expect(cancels - beforeDispose).toBe(1);

			// A frame the browser already dequeued must still be inert.
			queue[0]?.(0);
			expect(ran).toBe(false);
		} finally {
			globalThis.requestAnimationFrame = origRaf;
			globalThis.cancelAnimationFrame = origCancel;
		}
	});

	it("releases each timeout teardown once the timer has fired", async () => {
		const origClear = globalThis.clearTimeout;
		let clears = 0;
		globalThis.clearTimeout = ((id: never) => {
			clears++;
			return origClear(id);
		}) as typeof clearTimeout;

		try {
			const el = document.createElement("div");
			document.body.appendChild(el);
			const owner = nodeOwner(el);

			for (let i = 0; i < 15; i++) {
				await new Promise<void>((resolve) => {
					owner.timeout(() => resolve(), 0);
				});
			}

			// As above: count only the teardowns still retained at disposal.
			const beforeDispose = clears;
			dispose(el);
			expect(clears - beforeDispose).toBe(0);
		} finally {
			globalThis.clearTimeout = origClear;
		}
	});

	it("still clears a timeout that has not fired", () => {
		const el = document.createElement("div");
		document.body.appendChild(el);
		let ran = false;
		nodeOwner(el).timeout(() => {
			ran = true;
		}, 10_000);

		dispose(el);
		expect(ran).toBe(false);
	});

	it("does not run a one-shot callback after disposal", async () => {
		const el = document.createElement("div");
		document.body.appendChild(el);
		const owner = nodeOwner(el);
		let ran = false;

		owner.timeout(() => {
			ran = true;
		}, 0);
		dispose(el);
		await new Promise((r) => setTimeout(r, 5));
		expect(ran).toBe(false);
	});

	it("keeps an interval's teardown until disposal", async () => {
		const el = document.createElement("div");
		document.body.appendChild(el);
		let ticks = 0;
		nodeOwner(el).interval(() => {
			ticks++;
		}, 1);

		await new Promise((r) => setTimeout(r, 12));
		expect(ticks).toBeGreaterThan(0);

		const seen = ticks;
		dispose(el);
		await new Promise((r) => setTimeout(r, 12));
		// The interval genuinely stopped.
		expect(ticks).toBe(seen);
	});
});
