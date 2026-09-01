import { dispose, signal } from "sibujs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../src/components/accordion";
import {
	Combobox,
	ComboboxContent,
	ComboboxItem,
} from "../src/components/combobox";
import { CommandGroup } from "../src/components/command";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
} from "../src/components/context-menu";
import { Dialog, DialogContent } from "../src/components/dialog";
import { Drawer, DrawerContent } from "../src/components/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../src/components/dropdown-menu";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
} from "../src/components/menubar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "../src/components/navigation-menu";
import { Select, SelectItem, SelectTrigger } from "../src/components/select";
import { Sheet, SheetContent } from "../src/components/sheet";
import { Tooltip, TooltipContent } from "../src/components/tooltip";
import { toChildren, toNodes } from "../src/components/types";
import { __resetScrollLock } from "../src/lib/scroll-lock";

const flush = () => Promise.resolve().then(() => undefined);

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

describe("toChildren normalization", () => {
	it("preserves function children instead of dropping them", () => {
		const fn = () => "hi";
		expect(toChildren(fn)).toEqual([fn]);
		expect(toChildren([fn])).toEqual([fn]);
	});

	it("flattens nested arrays while preserving order", () => {
		expect(toChildren(["a", ["b", ["c", "d"]], "e"])).toEqual([
			"a",
			"b",
			"c",
			"d",
			"e",
		]);
	});

	it("ignores null, undefined and booleans", () => {
		expect(toChildren(["a", null, undefined, true, false, "b"])).toEqual([
			"a",
			"b",
		]);
		expect(toChildren(null)).toEqual([]);
		expect(toChildren(undefined)).toEqual([]);
		expect(toChildren(false)).toEqual([]);
	});

	it("never stringifies arrays or functions", () => {
		const out = toChildren([["x", "y"], () => "z"]);
		expect(out).toHaveLength(3);
		expect(out.some((c) => typeof c === "string" && c.includes(","))).toBe(
			false,
		);
		expect(typeof out[2]).toBe("function");
	});

	it("passes through strings, numbers and DOM nodes", () => {
		const node = document.createElement("span");
		expect(toChildren(["a", 1, node])).toEqual(["a", 1, node]);
	});

	it("toNodes keeps its documented Node[] contract", () => {
		const node = document.createElement("span");
		const out = toNodes(["a", node]);
		expect(out).toHaveLength(2);
		expect(out.every((n) => n instanceof Node)).toBe(true);
	});
});

describe("reactive children render and update", () => {
	it("DialogContent(() => value()) renders and updates", async () => {
		const [text, setText] = signal("first");
		const dlg = Dialog({ defaultOpen: true }, [
			DialogContent(() => text()),
		]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		const content = dlg.querySelector(
			"[data-slot=dialog-content]",
		) as HTMLElement;
		expect(content.textContent).toContain("first");

		setText("second");
		expect(content.textContent).toContain("second");
		expect(content.textContent).not.toContain("first");
	});

	it("places a reactive child before the internal close button", async () => {
		const [text, setText] = signal("body");
		const dlg = Dialog({ defaultOpen: true }, [
			DialogContent({ showCloseButton: true }, () => text()),
		]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		const content = dlg.querySelector(
			"[data-slot=dialog-content]",
		) as HTMLElement;
		const closeBtn = content.querySelector(
			"[data-slot=dialog-close]",
		) as HTMLElement;
		expect(closeBtn).toBeTruthy();

		// The reactive text must precede the close button in document order.
		const position = closeBtn.compareDocumentPosition(
			content.firstChild as Node,
		);
		expect(position & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
		expect(content.textContent).toContain("body");

		setText("changed");
		expect(content.textContent).toContain("changed");
		// Close button survives the update and is still last.
		expect(content.querySelector("[data-slot=dialog-close]")).toBe(closeBtn);
	});

	it("keeps a reactive child after the Drawer's prepended handle", async () => {
		const [text, setText] = signal("one");
		const drawer = Drawer({ defaultOpen: true }, [
			DrawerContent(() => text()),
		]) as HTMLElement;
		document.body.appendChild(drawer);
		await flush();

		const content = drawer.querySelector(
			"[data-slot=drawer-content]",
		) as HTMLElement;
		expect(content.textContent).toContain("one");
		// The drag handle is prepended by the component and must stay first.
		expect(content.firstElementChild?.getAttribute("data-slot")).toBe(
			"drawer-handle",
		);

		setText("two");
		expect(content.textContent).toContain("two");
		expect(content.firstElementChild?.getAttribute("data-slot")).toBe(
			"drawer-handle",
		);
	});

	it("disposes the reactive child with its component", async () => {
		const [text, setText] = signal("live");
		let reads = 0;
		const dlg = Dialog({ defaultOpen: true }, [
			DialogContent(() => {
				reads++;
				return text();
			}),
		]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		setText("still-live");
		const readsBefore = reads;

		dispose(dlg);
		setText("after-dispose");

		expect(reads).toBe(readsBefore);
	});

	it("works through Sheet", async () => {
		const [text, setText] = signal("s1");
		const sheet = Sheet({ defaultOpen: true }, [
			SheetContent(() => text()),
		]) as HTMLElement;
		document.body.appendChild(sheet);
		await flush();

		const content = sheet.querySelector(
			"[data-slot=sheet-content]",
		) as HTMLElement;
		expect(content.textContent).toContain("s1");
		setText("s2");
		expect(content.textContent).toContain("s2");
	});

	it("works through Accordion", async () => {
		const [text, setText] = signal("a1");
		const acc = Accordion({ type: "single", defaultValue: "i1" }, [
			AccordionItem({ value: "i1" }, [
				AccordionTrigger(() => text()),
				AccordionContent("panel"),
			]),
		]) as HTMLElement;
		document.body.appendChild(acc);
		await flush();

		const trigger = acc.querySelector(
			"[data-slot=accordion-trigger]",
		) as HTMLElement;
		expect(trigger.textContent).toContain("a1");
		setText("a2");
		expect(trigger.textContent).toContain("a2");
	});

	it("works through Select", async () => {
		const [text, setText] = signal("pick one");
		const sel = Select({}, [
			SelectTrigger(() => text()),
			SelectItem({ value: "x" }, "X"),
		]) as HTMLElement;
		document.body.appendChild(sel);
		await flush();

		const trigger = sel.querySelector(
			"[data-slot=select-trigger]",
		) as HTMLElement;
		expect(trigger.textContent).toContain("pick one");
		setText("pick two");
		expect(trigger.textContent).toContain("pick two");
	});

	it("works through Combobox", async () => {
		const [text, setText] = signal("c1");
		const combo = Combobox({}, [
			ComboboxContent([ComboboxItem({ value: "a" }, () => text())]),
		]) as HTMLElement;
		document.body.appendChild(combo);
		await flush();

		const item = combo.querySelector(
			"[data-slot=combobox-item]",
		) as HTMLElement;
		expect(item.textContent).toContain("c1");
		setText("c2");
		expect(item.textContent).toContain("c2");
	});

	it("works through DropdownMenu", async () => {
		const [text, setText] = signal("d1");
		const menu = DropdownMenu({}, [
			DropdownMenuContent([DropdownMenuItem(() => text())]),
		]) as HTMLElement;
		document.body.appendChild(menu);
		await flush();

		const item = document.querySelector(
			"[data-slot=dropdown-menu-item]",
		) as HTMLElement;
		expect(item.textContent).toContain("d1");
		setText("d2");
		expect(item.textContent).toContain("d2");
		dispose(menu);
	});

	it("works through ContextMenu", async () => {
		const [text, setText] = signal("cm1");
		const menu = ContextMenu({}, [
			ContextMenuContent([ContextMenuItem(() => text())]),
		]) as HTMLElement;
		document.body.appendChild(menu);
		await flush();

		const item = menu.querySelector(
			"[data-slot=context-menu-item]",
		) as HTMLElement;
		expect(item.textContent).toContain("cm1");
		setText("cm2");
		expect(item.textContent).toContain("cm2");
	});

	it("works through Menubar", async () => {
		const [text, setText] = signal("m1");
		const bar = Menubar({}, [
			MenubarMenu([MenubarContent([MenubarItem(() => text())])]),
		]) as HTMLElement;
		document.body.appendChild(bar);
		await flush();

		const item = bar.querySelector("[data-slot=menubar-item]") as HTMLElement;
		expect(item.textContent).toContain("m1");
		setText("m2");
		expect(item.textContent).toContain("m2");
	});

	it("works through NavigationMenu", async () => {
		const [text, setText] = signal("n1");
		const nav = NavigationMenu({}, [
			NavigationMenuList([NavigationMenuItem(() => text())]),
		]) as HTMLElement;
		document.body.appendChild(nav);
		await flush();

		const item = nav.querySelector(
			"[data-slot=navigation-menu-item]",
		) as HTMLElement;
		expect(item.textContent).toContain("n1");
		setText("n2");
		expect(item.textContent).toContain("n2");
	});

	it("works through Tooltip", async () => {
		const [text, setText] = signal("t1");
		const tip = Tooltip({ defaultOpen: true }, [
			TooltipContent(() => text()),
		]) as HTMLElement;
		document.body.appendChild(tip);
		await flush();

		const content = tip.querySelector(
			"[data-slot=tooltip-content]",
		) as HTMLElement;
		expect(content.textContent).toContain("t1");
		setText("t2");
		expect(content.textContent).toContain("t2");
	});

	it("works through Command groups, after the heading", async () => {
		const [text, setText] = signal("g1");
		const group = CommandGroup({ heading: "Head" }, () =>
			text(),
		) as HTMLElement;
		document.body.appendChild(group);
		await flush();

		expect(group.textContent).toContain("Head");
		expect(group.textContent).toContain("g1");
		// The heading stays first.
		expect(group.firstElementChild?.getAttribute("data-slot")).toBe(
			"command-group-heading",
		);

		setText("g2");
		expect(group.textContent).toContain("g2");
		expect(group.firstElementChild?.getAttribute("data-slot")).toBe(
			"command-group-heading",
		);
	});

	it("renders nested arrays of children in order", async () => {
		const dlg = Dialog({ defaultOpen: true }, [
			DialogContent({ showCloseButton: false }, [
				"a",
				["b", ["c"]],
				() => "d",
			]),
		]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		const content = dlg.querySelector(
			"[data-slot=dialog-content]",
		) as HTMLElement;
		expect(content.textContent).toBe("abcd");
	});

	it("ignores null and boolean children", async () => {
		const dlg = Dialog({ defaultOpen: true }, [
			DialogContent({ showCloseButton: false }, [
				"a",
				null,
				true,
				false,
				undefined,
				"b",
			]),
		]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		const content = dlg.querySelector(
			"[data-slot=dialog-content]",
		) as HTMLElement;
		expect(content.textContent).toBe("ab");
	});
});
