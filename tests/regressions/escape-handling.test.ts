// ============================================================================
// Escape is marked as handled, and closes only the topmost Dialog
// ============================================================================
//
// Dialog, Sheet, Drawer, DropdownMenu and Popover closed on Escape without
// calling `preventDefault()`, so the rest of the page could not tell the key
// had been consumed (Select already did). Separately, every open Dialog kept
// its own document listener and closed itself unconditionally, so one Escape
// dismissed a whole stack of nested dialogs.
//
// Invariants under test:
//  - An Escape that closes an overlay arrives with `defaultPrevented` set.
//  - An Escape with nothing open is left untouched.
//  - With nested dialogs open, each Escape closes only the most recently
//    opened one.

import { dispose, signal } from "sibujs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Dialog, DialogContent } from "../../src/components/dialog";
import { Drawer, DrawerContent } from "../../src/components/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../../src/components/dropdown-menu";
import { Popover, PopoverContent } from "../../src/components/popover";
import { Sheet, SheetContent } from "../../src/components/sheet";
import { __resetScrollLock } from "../../src/lib/scroll-lock";

const flush = async () => {
	for (let i = 0; i < 5; i++) await Promise.resolve();
};

/** Dispatch Escape on the document and return the event. */
function pressEscape(): KeyboardEvent {
	const ev = new KeyboardEvent("keydown", {
		key: "Escape",
		bubbles: true,
		cancelable: true,
	});
	document.dispatchEvent(ev);
	return ev;
}

let host: HTMLElement;

beforeEach(() => {
	host = document.createElement("div");
	document.body.appendChild(host);
});

afterEach(() => {
	dispose(host);
	host.remove();
	document.body.innerHTML = "";
	__resetScrollLock();
});

describe("Escape is marked as handled", () => {
	const cases: Array<[string, (open: () => boolean, set: (v: boolean) => void) => HTMLElement]> = [
		["Dialog", (open, set) => Dialog({ open, onOpenChange: set }, [DialogContent("Body")])],
		["Sheet", (open, set) => Sheet({ open, onOpenChange: set }, [SheetContent("Body")])],
		["Drawer", (open, set) => Drawer({ open, onOpenChange: set }, [DrawerContent("Body")])],
		[
			"DropdownMenu",
			(open, set) =>
				DropdownMenu({ open, onOpenChange: set }, [
					DropdownMenuContent([DropdownMenuItem("Item")]),
				]),
		],
		["Popover", (open, set) => Popover({ open, onOpenChange: set }, [PopoverContent("Body")])],
	];

	for (const [name, build] of cases) {
		it(`${name} calls preventDefault when Escape closes it`, async () => {
			const [open, setOpen] = signal(true);
			host.appendChild(build(() => open(), setOpen));
			await flush();

			const ev = pressEscape();
			expect(open()).toBe(false);
			expect(ev.defaultPrevented).toBe(true);
		});

		it(`${name} leaves Escape alone while closed`, async () => {
			const [open, setOpen] = signal(false);
			host.appendChild(build(() => open(), setOpen));
			await flush();

			const ev = pressEscape();
			expect(open()).toBe(false);
			expect(ev.defaultPrevented).toBe(false);
		});
	}
});

describe("Nested dialogs and Escape", () => {
	it("one Escape closes only the topmost dialog", async () => {
		const [outerOpen, setOuterOpen] = signal(true);
		const [innerOpen, setInnerOpen] = signal(false);
		const inner = Dialog({ open: () => innerOpen(), onOpenChange: setInnerOpen }, [
			DialogContent("Inner"),
		]);
		host.appendChild(
			Dialog({ open: () => outerOpen(), onOpenChange: setOuterOpen }, [
				DialogContent(["Outer", inner]),
			]),
		);
		await flush();
		setInnerOpen(true);

		pressEscape();
		expect(innerOpen()).toBe(false);
		expect(outerOpen()).toBe(true);

		pressEscape();
		expect(outerOpen()).toBe(false);

		// Nothing left open: the shared listener is gone.
		expect(pressEscape().defaultPrevented).toBe(false);
	});

	it("the most recently opened of two sibling dialogs closes first", async () => {
		const [aOpen, setAOpen] = signal(false);
		const [bOpen, setBOpen] = signal(false);
		host.appendChild(Dialog({ open: () => aOpen(), onOpenChange: setAOpen }, [DialogContent("A")]));
		host.appendChild(Dialog({ open: () => bOpen(), onOpenChange: setBOpen }, [DialogContent("B")]));
		await flush();

		setBOpen(true);
		setAOpen(true);

		pressEscape();
		expect(aOpen()).toBe(false);
		expect(bOpen()).toBe(true);

		pressEscape();
		expect(bOpen()).toBe(false);
	});

	it("a dialog disposed while open drops out of the stack", async () => {
		const [outerOpen, setOuterOpen] = signal(true);
		const route = document.createElement("main");
		route.appendChild(Dialog({ defaultOpen: true }, [DialogContent("Doomed")]));
		host.appendChild(
			Dialog({ open: () => outerOpen(), onOpenChange: setOuterOpen }, [DialogContent("Outer")]),
		);
		host.appendChild(route);
		await flush();

		dispose(route);
		route.remove();

		pressEscape();
		expect(outerOpen()).toBe(false);
	});
});
