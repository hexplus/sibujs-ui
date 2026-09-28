// ============================================================================
// One Escape dismisses exactly one overlay: the topmost
// ============================================================================
//
// Every dismissable overlay attached its own `document` `keydown` listener
// while open and closed itself on Escape. Nested overlays — a DropdownMenu in
// a Popover in a Dialog — all received the same key press, so one Escape
// closed the whole stack. Most of them also closed without `preventDefault()`,
// so the rest of the page could not tell the key had been consumed.
//
// Every overlay now registers with the shared Escape stack in
// `src/lib/dismissable-layer.ts`.
//
// Invariants under test:
//  - An Escape that closes an overlay arrives with `defaultPrevented` set; an
//    Escape with nothing open is left untouched.
//  - Mixed nested overlays close one layer per Escape, innermost first.
//  - The most recently opened overlay is on top; a reopened one returns to
//    the top; an overlay that stays open is never registered twice.
//  - An Escape already consumed by an element-level handler (Select's
//    trigger) dismisses nothing else.
//  - Closing or disposing every overlay leaves no layer and no listener.

import { dispose, signal } from "sibujs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../../src/components/context-menu";
import { Dialog, DialogContent } from "../../src/components/dialog";
import { Drawer, DrawerContent } from "../../src/components/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../../src/components/dropdown-menu";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from "../../src/components/menubar";
import { NavigationMenu } from "../../src/components/navigation-menu";
import { Popover, PopoverContent } from "../../src/components/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "../../src/components/select";
import { Sheet, SheetContent } from "../../src/components/sheet";
import type { ElementWithContext } from "../../src/components/types";
import {
	__resetEscapeLayers,
	escapeLayerCount,
	registerEscapeLayer,
} from "../../src/lib/dismissable-layer";
import { __resetScrollLock } from "../../src/lib/scroll-lock";

const flush = async () => {
	for (let i = 0; i < 5; i++) await Promise.resolve();
};

/** Dispatch Escape (or another key) on `target` and return the event. */
function press(key = "Escape", target: EventTarget = document): KeyboardEvent {
	const ev = new KeyboardEvent("keydown", {
		key,
		bubbles: true,
		cancelable: true,
	});
	target.dispatchEvent(ev);
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
	__resetEscapeLayers();
});

interface Mounted {
	open(): void;
	isOpen(): boolean;
}

/** A controlled overlay driven by a signal through `open` / `onOpenChange`. */
function controlled(
	build: (open: () => boolean, set: (v: boolean) => void) => HTMLElement,
): () => Mounted {
	return () => {
		const [open, setOpen] = signal(false);
		host.appendChild(build(() => open(), setOpen));
		return { open: () => setOpen(true), isOpen: open };
	};
}

const ctxOf = (slot: string, key: string) => {
	const el = host.querySelector(`[data-slot=${slot}]`) as ElementWithContext;
	return el[key] as {
		isOpen?: () => boolean;
		activeItem?: () => string | null;
		open: (...args: never[]) => void;
	};
};

const overlays: Array<[string, () => Mounted]> = [
	["Dialog", controlled((open, set) => Dialog({ open, onOpenChange: set }, [DialogContent("Body")]))],
	["Sheet", controlled((open, set) => Sheet({ open, onOpenChange: set }, [SheetContent("Body")]))],
	["Drawer", controlled((open, set) => Drawer({ open, onOpenChange: set }, [DrawerContent("Body")]))],
	[
		"DropdownMenu",
		controlled((open, set) =>
			DropdownMenu({ open, onOpenChange: set }, [DropdownMenuContent([DropdownMenuItem("Item")])]),
		),
	],
	["Popover", controlled((open, set) => Popover({ open, onOpenChange: set }, [PopoverContent("Body")]))],
	[
		"Menubar",
		controlled((open, set) =>
			Menubar([
				MenubarMenu({ open, onOpenChange: set }, [
					MenubarTrigger("File"),
					MenubarContent([MenubarItem("New")]),
				]),
			]),
		),
	],
	[
		"Select",
		() => {
			host.appendChild(
				Select({}, [SelectTrigger("Pick"), SelectContent([SelectItem({ value: "a" }, "A")])]),
			);
			const ctx = () => ctxOf("select", "__select");
			return {
				open: () => (ctx() as unknown as { open: () => void }).open(),
				isOpen: () => ctx().isOpen?.() ?? false,
			};
		},
	],
	[
		"ContextMenu",
		() => {
			host.appendChild(
				ContextMenu([ContextMenuTrigger("Area"), ContextMenuContent([ContextMenuItem("A")])]),
			);
			const ctx = () => ctxOf("context-menu", "__contextMenu");
			return {
				open: () => (ctx() as unknown as { open: (x: number, y: number) => void }).open(0, 0),
				isOpen: () => ctx().isOpen?.() ?? false,
			};
		},
	],
	[
		"NavigationMenu",
		() => {
			host.appendChild(NavigationMenu({ viewport: false }, []));
			const ctx = () => ctxOf("navigation-menu", "__navMenu");
			return {
				open: () => (ctx() as unknown as { open: (id: string) => void }).open("item"),
				isOpen: () => ctx().activeItem?.() != null,
			};
		},
	],
];

describe("Escape is marked as handled", () => {
	for (const [name, mount] of overlays) {
		it(`${name} closes on Escape and calls preventDefault`, async () => {
			const overlay = mount();
			await flush();
			overlay.open();
			expect(overlay.isOpen()).toBe(true);

			const ev = press();
			expect(overlay.isOpen()).toBe(false);
			expect(ev.defaultPrevented).toBe(true);
			expect(escapeLayerCount()).toBe(0);
		});

		it(`${name} leaves Escape alone while closed`, async () => {
			const overlay = mount();
			await flush();

			const ev = press();
			expect(overlay.isOpen()).toBe(false);
			expect(ev.defaultPrevented).toBe(false);
		});
	}
});

describe("Mixed nested overlays", () => {
	it("Dialog > Popover > DropdownMenu closes one layer per Escape, innermost first", async () => {
		const [dialogOpen, setDialogOpen] = signal(false);
		const [popoverOpen, setPopoverOpen] = signal(false);
		const [menuOpen, setMenuOpen] = signal(false);
		host.appendChild(
			Dialog({ open: () => dialogOpen(), onOpenChange: setDialogOpen }, [
				DialogContent([
					Popover({ open: () => popoverOpen(), onOpenChange: setPopoverOpen }, [
						PopoverContent([
							DropdownMenu({ open: () => menuOpen(), onOpenChange: setMenuOpen }, [
								DropdownMenuContent([DropdownMenuItem("Item")]),
							]),
						]),
					]),
				]),
			]),
		);
		await flush();
		setDialogOpen(true);
		setPopoverOpen(true);
		setMenuOpen(true);
		expect(escapeLayerCount()).toBe(3);

		press();
		expect([dialogOpen(), popoverOpen(), menuOpen()]).toEqual([true, true, false]);

		press();
		expect([dialogOpen(), popoverOpen(), menuOpen()]).toEqual([true, false, false]);

		press();
		expect([dialogOpen(), popoverOpen(), menuOpen()]).toEqual([false, false, false]);

		expect(escapeLayerCount()).toBe(0);
		expect(press().defaultPrevented).toBe(false);
	});

	it("a DropdownMenu inside a Dialog closes alone", async () => {
		const [dialogOpen, setDialogOpen] = signal(true);
		const [menuOpen, setMenuOpen] = signal(false);
		host.appendChild(
			Dialog({ open: () => dialogOpen(), onOpenChange: setDialogOpen }, [
				DialogContent([
					DropdownMenu({ open: () => menuOpen(), onOpenChange: setMenuOpen }, [
						DropdownMenuContent([DropdownMenuItem("Item")]),
					]),
				]),
			]),
		);
		await flush();
		setMenuOpen(true);

		press();
		expect(menuOpen()).toBe(false);
		expect(dialogOpen()).toBe(true);
	});

	it("Escape consumed by a Select trigger inside a Dialog closes only the Select", async () => {
		const [dialogOpen, setDialogOpen] = signal(true);
		const select = Select({}, [
			SelectTrigger("Pick"),
			SelectContent([SelectItem({ value: "a" }, "A")]),
		]);
		host.appendChild(
			Dialog({ open: () => dialogOpen(), onOpenChange: setDialogOpen }, [DialogContent([select])]),
		);
		await flush();
		const ctx = (select as ElementWithContext).__select as {
			open: () => void;
			isOpen: () => boolean;
		};
		ctx.open();
		expect(escapeLayerCount()).toBe(2);

		const trigger = select.querySelector("[data-slot=select-trigger]") as HTMLElement;
		const ev = press("Escape", trigger);
		expect(ev.defaultPrevented).toBe(true);
		expect(ctx.isOpen()).toBe(false);
		expect(dialogOpen()).toBe(true);
		expect(escapeLayerCount()).toBe(1);
	});

	it("nested dialogs close one per Escape", async () => {
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

		press();
		expect(innerOpen()).toBe(false);
		expect(outerOpen()).toBe(true);

		press();
		expect(outerOpen()).toBe(false);
		expect(press().defaultPrevented).toBe(false);
	});
});

describe("Escape stack order and bookkeeping", () => {
	it("a reopened overlay returns to the top", async () => {
		const [aOpen, setAOpen] = signal(false);
		const [bOpen, setBOpen] = signal(false);
		host.appendChild(Popover({ open: () => aOpen(), onOpenChange: setAOpen }, [PopoverContent("A")]));
		host.appendChild(Popover({ open: () => bOpen(), onOpenChange: setBOpen }, [PopoverContent("B")]));
		await flush();

		setAOpen(true);
		setBOpen(true);
		setAOpen(false);
		setAOpen(true);
		expect(escapeLayerCount()).toBe(2);

		press();
		expect(aOpen()).toBe(false);
		expect(bOpen()).toBe(true);

		press();
		expect(bOpen()).toBe(false);
	});

	it("an overlay that stays open is registered once", async () => {
		host.appendChild(NavigationMenu({ viewport: false }, []));
		await flush();
		const ctx = ctxOf("navigation-menu", "__navMenu") as unknown as {
			open: (id: string) => void;
			activeItem: () => string | null;
		};

		ctx.open("a");
		ctx.open("b");
		expect(escapeLayerCount()).toBe(1);

		press();
		expect(ctx.activeItem()).toBeNull();
		expect(escapeLayerCount()).toBe(0);
	});

	it("an overlay disposed while open drops out of the stack", async () => {
		const [outerOpen, setOuterOpen] = signal(true);
		const route = document.createElement("main");
		route.appendChild(Dialog({ defaultOpen: true }, [DialogContent("Doomed")]));
		host.appendChild(
			Dialog({ open: () => outerOpen(), onOpenChange: setOuterOpen }, [DialogContent("Outer")]),
		);
		host.appendChild(route);
		await flush();
		expect(escapeLayerCount()).toBe(2);

		dispose(route);
		route.remove();
		expect(escapeLayerCount()).toBe(1);

		press();
		expect(outerOpen()).toBe(false);
	});

	it("one shared document listener, attached on first open and removed on last close", async () => {
		const add = vi.spyOn(document, "addEventListener");
		const remove = vi.spyOn(document, "removeEventListener");
		try {
			const [dialogOpen, setDialogOpen] = signal(false);
			const [popoverOpen, setPopoverOpen] = signal(false);
			host.appendChild(
				Dialog({ open: () => dialogOpen(), onOpenChange: setDialogOpen }, [
					DialogContent([
						Popover({ open: () => popoverOpen(), onOpenChange: setPopoverOpen }, [
							PopoverContent("Body"),
						]),
					]),
				]),
			);
			await flush();
			const keydownAdds = () => add.mock.calls.filter(([t]) => t === "keydown").length;
			const keydownRemoves = () => remove.mock.calls.filter(([t]) => t === "keydown").length;

			setDialogOpen(true);
			setPopoverOpen(true);
			expect(keydownAdds()).toBe(1);

			press();
			press();
			expect(escapeLayerCount()).toBe(0);
			expect(keydownRemoves()).toBe(1);
		} finally {
			add.mockRestore();
			remove.mockRestore();
		}
	});
});

describe("registerEscapeLayer", () => {
	it("ignores other keys", () => {
		const onEscape = vi.fn();
		const unregister = registerEscapeLayer(onEscape);
		const ev = press("Enter");
		expect(onEscape).not.toHaveBeenCalled();
		expect(ev.defaultPrevented).toBe(false);
		unregister();
	});

	it("dismisses nothing for an Escape that was already handled", () => {
		const onEscape = vi.fn();
		const unregister = registerEscapeLayer(onEscape);
		const ev = new KeyboardEvent("keydown", { key: "Escape", cancelable: true });
		ev.preventDefault();
		document.dispatchEvent(ev);
		expect(onEscape).not.toHaveBeenCalled();
		unregister();
	});

	it("unregisters the exact registration, idempotently", () => {
		const onEscape = vi.fn();
		const first = registerEscapeLayer(onEscape);
		const second = registerEscapeLayer(onEscape);
		expect(escapeLayerCount()).toBe(2);

		first();
		first();
		expect(escapeLayerCount()).toBe(1);

		press();
		expect(onEscape).toHaveBeenCalledTimes(1);

		second();
		expect(escapeLayerCount()).toBe(0);
		expect(press().defaultPrevented).toBe(false);
		expect(onEscape).toHaveBeenCalledTimes(1);
	});
});
