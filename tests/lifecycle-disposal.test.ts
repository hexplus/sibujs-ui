import { dispose, signal } from "sibujs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Checkbox } from "../src/components/checkbox";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../src/components/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../src/components/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "../src/components/radio-group";
import { ScrollArea } from "../src/components/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "../src/components/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/components/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../src/components/tooltip";
import { __resetScrollLock } from "../src/lib/scroll-lock";

/** Wait for queued microtasks (component post-insert wiring) to settle. */
const flush = () => Promise.resolve().then(() => undefined);

/**
 * Count document-level listeners by monkey-patching add/removeEventListener.
 * Confined to tests — production code must not depend on this.
 */
function trackDocumentListeners() {
	const live = new Set<string>();
	let seq = 0;
	const keys = new WeakMap<object, string>();
	const origAdd = document.addEventListener.bind(document);
	const origRemove = document.removeEventListener.bind(document);

	const keyFor = (type: string, fn: object) => {
		let k = keys.get(fn);
		if (!k) {
			k = `${type}#${++seq}`;
			keys.set(fn, k);
		}
		return k;
	};

	document.addEventListener = ((
		type: string,
		fn: EventListenerOrEventListenerObject,
		opts?: boolean | AddEventListenerOptions,
	) => {
		if (fn) live.add(keyFor(type, fn as object));
		return origAdd(type, fn, opts as AddEventListenerOptions);
	}) as typeof document.addEventListener;

	document.removeEventListener = ((
		type: string,
		fn: EventListenerOrEventListenerObject,
		opts?: boolean | EventListenerOptions,
	) => {
		if (fn) live.delete(keyFor(type, fn as object));
		return origRemove(type, fn, opts as EventListenerOptions);
	}) as typeof document.removeEventListener;

	return {
		count: () => live.size,
		restore: () => {
			document.addEventListener = origAdd;
			document.removeEventListener = origRemove;
		},
	};
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

describe("controlled subscriptions are released on dispose", () => {
	it("stops reading a controlled Checkbox getter after dispose", () => {
		const [checked, setChecked] = signal(false);
		let reads = 0;
		const cb = Checkbox({
			checked: () => {
				reads++;
				return checked();
			},
		});
		document.body.appendChild(cb);

		setChecked(true);
		expect(reads).toBeGreaterThan(0);

		dispose(cb);
		const readsAtDispose = reads;

		setChecked(false);
		setChecked(true);

		expect(reads).toBe(readsAtDispose);
	});

	it("does not mutate detached Checkbox DOM after dispose", () => {
		const [checked, setChecked] = signal(false);
		const cb = Checkbox({ checked: () => checked() });
		document.body.appendChild(cb);

		expect(cb.getAttribute("aria-checked")).toBe("false");
		const indicator = cb.querySelector(
			"[data-slot=checkbox-indicator]",
		) as HTMLElement;
		expect(indicator.childNodes.length).toBe(0);

		dispose(cb);
		const htmlAtDispose = cb.outerHTML;

		setChecked(true);

		expect(cb.getAttribute("aria-checked")).toBe("false");
		expect(indicator.childNodes.length).toBe(0);
		expect(cb.outerHTML).toBe(htmlAtDispose);
	});

	it("stops a controlled Dialog reacting after dispose", async () => {
		const [open, setOpen] = signal(false);
		let reads = 0;
		const dlg = Dialog({
			open: () => {
				reads++;
				return open();
			},
		}, [DialogTrigger("Open"), DialogContent("Body")]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		setOpen(true);
		expect(reads).toBeGreaterThan(0);

		dispose(dlg);
		const readsAtDispose = reads;
		setOpen(false);
		setOpen(true);

		expect(reads).toBe(readsAtDispose);
	});

	it("stops a controlled Tabs reacting after dispose", async () => {
		const [tab, setTab] = signal("a");
		let reads = 0;
		const tabs = Tabs(
			{
				value: () => {
					reads++;
					return tab();
				},
			},
			[
				TabsList([TabsTrigger({ value: "a" }, "A"), TabsTrigger({ value: "b" }, "B")]),
				TabsContent({ value: "a" }, "PanelA"),
				TabsContent({ value: "b" }, "PanelB"),
			],
		) as HTMLElement;
		document.body.appendChild(tabs);
		await flush();

		setTab("b");
		expect(reads).toBeGreaterThan(0);

		dispose(tabs);
		const readsAtDispose = reads;
		setTab("a");
		setTab("b");

		expect(reads).toBe(readsAtDispose);
	});

	it("stops a controlled Select reacting after dispose", async () => {
		const [val, setVal] = signal("x");
		let reads = 0;
		const sel = Select(
			{
				value: () => {
					reads++;
					return val();
				},
			},
			[SelectTrigger("Pick"), SelectContent([SelectItem({ value: "x" }, "X")])],
		) as HTMLElement;
		document.body.appendChild(sel);
		await flush();

		setVal("y");
		expect(reads).toBeGreaterThan(0);

		dispose(sel);
		const readsAtDispose = reads;
		setVal("x");
		setVal("y");

		expect(reads).toBe(readsAtDispose);
	});

	it("stops a controlled Tooltip reacting after dispose", async () => {
		const [open, setOpen] = signal(false);
		let reads = 0;
		const tip = Tooltip(
			{
				open: () => {
					reads++;
					return open();
				},
			},
			[TooltipTrigger("Hover"), TooltipContent("Tip")],
		) as HTMLElement;
		document.body.appendChild(tip);
		await flush();

		setOpen(true);
		expect(reads).toBeGreaterThan(0);

		dispose(tip);
		const readsAtDispose = reads;
		setOpen(false);
		setOpen(true);

		expect(reads).toBe(readsAtDispose);
	});

	it("stops a controlled DropdownMenu reacting after dispose", async () => {
		const [open, setOpen] = signal(false);
		let reads = 0;
		const menu = DropdownMenu(
			{
				open: () => {
					reads++;
					return open();
				},
			},
			[
				DropdownMenuTrigger("Menu"),
				DropdownMenuContent([DropdownMenuItem("One")]),
			],
		) as HTMLElement;
		document.body.appendChild(menu);
		await flush();

		setOpen(true);
		expect(reads).toBeGreaterThan(0);

		dispose(menu);
		const readsAtDispose = reads;
		setOpen(false);
		setOpen(true);

		expect(reads).toBe(readsAtDispose);
	});

	it("stops a controlled RadioGroup reacting after dispose", async () => {
		const [val, setVal] = signal("a");
		let reads = 0;
		const group = RadioGroup(
			{
				value: () => {
					reads++;
					return val();
				},
			},
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		document.body.appendChild(group);
		await flush();

		setVal("b");
		expect(reads).toBeGreaterThan(0);

		dispose(group);
		const readsAtDispose = reads;
		setVal("a");
		setVal("b");

		expect(reads).toBe(readsAtDispose);
	});
});

describe("disposal before the setup microtask", () => {
	it("never installs a late effect for a Dialog disposed pre-microtask", async () => {
		const [open, setOpen] = signal(false);
		let reads = 0;
		const dlg = Dialog(
			{
				open: () => {
					reads++;
					return open();
				},
			},
			[DialogContent("Body")],
		) as HTMLElement;
		document.body.appendChild(dlg);

		// Dispose synchronously, before any queueMicrotask wiring has run.
		dispose(dlg);
		await flush();
		await flush();

		const readsAtDispose = reads;
		setOpen(true);
		setOpen(false);

		expect(reads).toBe(readsAtDispose);
	});

	it("never installs a late document listener for a modal disposed pre-microtask", async () => {
		const tracker = trackDocumentListeners();
		try {
			const before = tracker.count();
			const [open] = signal(true);
			const dlg = Dialog({ open: () => open() }, [
				DialogContent("Body"),
			]) as HTMLElement;
			document.body.appendChild(dlg);

			dispose(dlg);
			await flush();
			await flush();

			expect(tracker.count()).toBe(before);
		} finally {
			tracker.restore();
		}
	});

	it("acquires no scroll lock for a modal disposed pre-microtask", async () => {
		const [open] = signal(true);
		const dlg = Dialog({ open: () => open() }, [
			DialogContent("Body"),
		]) as HTMLElement;
		document.body.appendChild(dlg);

		dispose(dlg);
		await flush();
		await flush();

		expect(document.body.style.overflow).toBe("");
	});
});

describe("repeated mount/dispose cycles do not accumulate", () => {
	it("keeps document listener count flat across many Dialog cycles", async () => {
		const tracker = trackDocumentListeners();
		try {
			const [open, setOpen] = signal(false);
			const counts: number[] = [];

			for (let i = 0; i < 5; i++) {
				const dlg = Dialog({ open: () => open() }, [
					DialogContent("Body"),
				]) as HTMLElement;
				document.body.appendChild(dlg);
				await flush();
				setOpen(true);
				setOpen(false);
				dispose(dlg);
				dlg.remove();
				await flush();
				counts.push(tracker.count());
			}

			// Every cycle must land on the same listener count — no growth.
			expect(new Set(counts).size).toBe(1);
		} finally {
			tracker.restore();
		}
	});

	it("keeps controlled-getter reads flat across many Checkbox cycles", () => {
		const [checked, setChecked] = signal(false);
		let reads = 0;
		const getter = () => {
			reads++;
			return checked();
		};

		const deltas: number[] = [];
		for (let i = 0; i < 5; i++) {
			const cb = Checkbox({ checked: getter });
			document.body.appendChild(cb);
			const before = reads;
			setChecked(!checked());
			deltas.push(reads - before);
			dispose(cb);
			cb.remove();
		}

		// Each live checkbox costs exactly the same number of reads per update;
		// a leak would make later iterations read more than earlier ones.
		expect(new Set(deltas).size).toBe(1);
	});

	it("returns the body scroll lock to zero across many open/close cycles", async () => {
		document.body.style.overflow = "clip";
		const [open, setOpen] = signal(false);
		const dlg = Dialog({ open: () => open() }, [
			DialogContent("Body"),
		]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		for (let i = 0; i < 6; i++) {
			setOpen(true);
			setOpen(false);
		}

		expect(document.body.style.overflow).toBe("clip");
		dispose(dlg);
		expect(document.body.style.overflow).toBe("clip");
	});
});

describe("timers and observers are released on dispose", () => {
	it("clears a ScrollArea's pending hide timer", () => {
		vi.useFakeTimers();
		try {
			const area = ScrollArea({ scrollHideDelay: 10_000 }, "content");
			document.body.appendChild(area);

			// mouseleave schedules the delayed hide.
			area.dispatchEvent(new Event("mouseleave", { bubbles: true }));
			const pending = vi.getTimerCount();
			expect(pending).toBeGreaterThan(0);

			dispose(area);

			// Disposal must cancel the outstanding timer rather than let it fire
			// against detached DOM.
			expect(vi.getTimerCount()).toBeLessThan(pending);
		} finally {
			vi.useRealTimers();
		}
	});

	it("clears a Dialog's pending close timer on dispose", async () => {
		const [open, setOpen] = signal(true);
		const dlg = Dialog({ open: () => open() }, [
			DialogContent("Body"),
		]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		vi.useFakeTimers();
		try {
			setOpen(false); // schedules the 200ms hide timer
			const pending = vi.getTimerCount();
			expect(pending).toBeGreaterThan(0);

			dispose(dlg);
			expect(vi.getTimerCount()).toBeLessThan(pending);
		} finally {
			vi.useRealTimers();
		}
	});
});

describe("cleanup is idempotent", () => {
	it("tolerates dispose() being called repeatedly", async () => {
		const [open, setOpen] = signal(true);
		const dlg = Dialog({ open: () => open() }, [
			DialogContent("Body"),
		]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		expect(() => {
			dispose(dlg);
			dispose(dlg);
			dispose(dlg);
		}).not.toThrow();

		setOpen(false);
		expect(() => dispose(dlg)).not.toThrow();
	});

	it("tolerates disposing a nested child then its parent", async () => {
		const content = DialogContent("Body") as HTMLElement;
		const dlg = Dialog({ defaultOpen: true }, [content]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		expect(() => {
			dispose(content);
			dispose(dlg);
		}).not.toThrow();
	});
});
