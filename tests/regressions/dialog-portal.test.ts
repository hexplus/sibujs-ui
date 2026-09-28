// ============================================================================
// Dialog renders its overlay and content in a body-level portal while open
// ============================================================================
//
// DialogContent built a `data-slot="dialog-portal"` container but returned it
// into the caller's tree, so an open dialog was still subject to every
// ancestor's overflow clipping, stacking context and transform — a `fixed`
// overlay inside a transformed ancestor is positioned against that ancestor,
// not the viewport.
//
// Invariants under test:
//  - While open (and while its close animation plays), the portal is a child
//    of document.body; closed, it is back inside the dialog's own tree.
//  - The most recently opened dialog's portal is last in <body>, so nested and
//    simultaneous dialogs stack in open order.
//  - The dialog context is carried explicitly: close buttons inside the
//    portaled content close THEIR dialog, never another.
//  - Disposal while open removes the portal and releases the keydown listener,
//    the scroll lock and the content's reactive bindings. Nothing is left in
//    <body>.
//  - Nothing touches <body> before the dialog opens, or under SSR.

import {
	disableSSR,
	dispose,
	enableSSR,
	signal,
	type NodeChildren,
} from "sibujs";
import { renderToString } from "sibujs/ssr";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "../../src/components/dialog";
import { __resetScrollLock, scrollLockCount } from "../../src/lib/scroll-lock";

const flush = async () => {
	for (let i = 0; i < 5; i++) await Promise.resolve();
};

const portals = () =>
	[...document.body.children].filter(
		(el) => el.getAttribute("data-slot") === "dialog-portal",
	);

let host: HTMLElement;

beforeEach(() => {
	host = document.createElement("div");
	// Everything a real layout does to trap a fixed overlay.
	host.style.overflow = "hidden";
	host.style.transform = "translateZ(0)";
	host.style.contain = "paint";
	document.body.appendChild(host);
});

afterEach(() => {
	dispose(host);
	host.remove();
	document.body.innerHTML = "";
	__resetScrollLock();
	vi.useRealTimers();
});

function mount(node: Node): void {
	host.appendChild(node);
}

function contentOf(portal: Element): HTMLElement {
	return portal.querySelector("[data-slot=dialog-content]") as HTMLElement;
}

describe("Dialog portal", () => {
	it("an open dialog's overlay and content live in <body>, outside every clipping ancestor", async () => {
		const dlg = Dialog({ defaultOpen: true }, [
			DialogTrigger("Open"),
			DialogContent([DialogTitle("Title"), "Body"]),
		]);
		mount(dlg);
		await flush();

		expect(portals()).toHaveLength(1);
		const portal = portals()[0] as HTMLElement;
		expect(host.contains(portal)).toBe(false);
		expect(portal.querySelector("[data-slot=dialog-overlay]")).not.toBeNull();
		expect(contentOf(portal).textContent).toContain("Body");
		expect(portal.style.display).toBe("contents");
	});

	it("a closed dialog keeps its content in its own tree and never touches <body>", async () => {
		const dlg = Dialog([DialogTrigger("Open"), DialogContent("Body")]);
		mount(dlg);
		await flush();

		expect(portals()).toHaveLength(0);
		const portal = dlg.querySelector("[data-slot=dialog-portal]") as HTMLElement;
		expect(portal).not.toBeNull();
		expect(portal.style.display).toBe("none");
		expect(dlg.querySelector("[data-slot=dialog-content]")?.textContent).toContain(
			"Body",
		);
	});

	it("opens into <body> from the trigger and returns to the tree once the close animation ends", async () => {
		vi.useFakeTimers();
		const dlg = Dialog([DialogTrigger("Open"), DialogContent("Body")]);
		mount(dlg);
		await vi.advanceTimersByTimeAsync(0);

		(dlg.querySelector("[data-slot=dialog-trigger]") as HTMLElement).click();
		expect(portals()).toHaveLength(1);
		const portal = portals()[0] as HTMLElement;
		const content = contentOf(portal);
		expect(content.getAttribute("data-state")).toBe("open");

		(content.querySelector("[data-slot=dialog-close]") as HTMLElement).click();
		// The close animation plays where the dialog is shown.
		expect(content.getAttribute("data-state")).toBe("closed");
		expect(portal.parentElement).toBe(document.body);

		await vi.advanceTimersByTimeAsync(200);
		expect(portals()).toHaveLength(0);
		expect(dlg.contains(portal)).toBe(true);
		expect(portal.style.display).toBe("none");
	});

	it("reopening during the close animation keeps the portal in <body>", async () => {
		vi.useFakeTimers();
		const [open, setOpen] = signal(true);
		mount(Dialog({ open: () => open() }, [DialogContent("Body")]));
		await vi.advanceTimersByTimeAsync(0);

		setOpen(false);
		await vi.advanceTimersByTimeAsync(100);
		setOpen(true);
		await vi.advanceTimersByTimeAsync(500);

		expect(portals()).toHaveLength(1);
		expect(contentOf(portals()[0]).getAttribute("data-state")).toBe("open");
	});

	it("close buttons inside the portaled content close their own dialog only", async () => {
		const [aOpen, setAOpen] = signal(true);
		const [bOpen, setBOpen] = signal(true);
		const a = Dialog({ open: () => aOpen(), onOpenChange: setAOpen }, [
			DialogContent({ showCloseButton: false }, [
				"A",
				DialogClose(Object.assign(document.createElement("button"), { textContent: "close A" })),
			]),
		]);
		const b = Dialog({ open: () => bOpen(), onOpenChange: setBOpen }, [
			DialogContent({ showCloseButton: false }, [
				"B",
				DialogFooter({ showCloseButton: true }),
			]),
		]);
		mount(a);
		mount(b);
		await flush();
		expect(portals()).toHaveLength(2);

		const [pa, pb] = portals();
		expect(contentOf(pa).textContent).toContain("A");
		expect(contentOf(pb).textContent).toContain("B");

		(contentOf(pb).querySelector("[data-slot=dialog-footer] button") as HTMLElement).click();
		expect(bOpen()).toBe(false);
		expect(aOpen()).toBe(true);

		(contentOf(pa).querySelector("[data-slot=dialog-close]") as HTMLElement).click();
		expect(aOpen()).toBe(false);
	});

	it("the overlay closes its own dialog", async () => {
		const [open, setOpen] = signal(true);
		mount(Dialog({ open: () => open(), onOpenChange: setOpen }, [DialogContent("Body")]));
		await flush();
		(portals()[0].querySelector("[data-slot=dialog-overlay]") as HTMLElement).click();
		expect(open()).toBe(false);
	});

	it("nested and simultaneous dialogs stack in the order they were opened", async () => {
		const [innerOpen, setInnerOpen] = signal(false);
		const inner = Dialog({ open: () => innerOpen() }, [DialogContent("Inner")]);
		const outer = Dialog({ defaultOpen: true }, [DialogContent(["Outer", inner])]);
		mount(outer);
		await flush();
		expect(portals()).toHaveLength(1);

		setInnerOpen(true);
		expect(portals()).toHaveLength(2);
		const [first, second] = portals();
		expect(contentOf(first).textContent).toContain("Outer");
		// Inner is last in <body>, so it paints above the outer dialog.
		expect(contentOf(second).textContent).toBe("InnerClose");
		// Its trigger-side context is still the inner Dialog, inside the outer
		// dialog's portaled content.
		expect(contentOf(first).contains(inner)).toBe(true);
	});

	it("keeps aria-labelledby / aria-describedby resolving to the portaled title and description", async () => {
		mount(
			Dialog({ defaultOpen: true }, [
				DialogContent([DialogTitle("Delete file"), DialogDescription("This cannot be undone")]),
			]),
		);
		await flush();
		const content = contentOf(portals()[0]);
		const labelledBy = content.getAttribute("aria-labelledby") as string;
		const describedBy = content.getAttribute("aria-describedby") as string;
		expect(document.getElementById(labelledBy)?.textContent).toBe("Delete file");
		expect(document.getElementById(describedBy)?.textContent).toBe("This cannot be undone");
		expect(content.getAttribute("role")).toBe("dialog");
		expect(content.getAttribute("aria-modal")).toBe("true");
	});

	it("reactive children keep updating after the move to <body>", async () => {
		const [text, setText] = signal("first");
		const [open, setOpen] = signal(false);
		mount(Dialog({ open: () => open() }, [DialogContent(() => text())]));
		await flush();
		setOpen(true);
		const content = contentOf(portals()[0]);
		expect(content.textContent).toContain("first");
		setText("second");
		expect(content.textContent).toContain("second");
	});

	it("disposal while open removes the portal and releases listeners, scroll lock and bindings", async () => {
		const added: string[] = [];
		const removed: string[] = [];
		const origAdd = document.addEventListener.bind(document);
		const origRemove = document.removeEventListener.bind(document);
		document.addEventListener = ((type: string, ...rest: unknown[]) => {
			added.push(type);
			return (origAdd as (...a: unknown[]) => void)(type, ...rest);
		}) as typeof document.addEventListener;
		document.removeEventListener = ((type: string, ...rest: unknown[]) => {
			removed.push(type);
			return (origRemove as (...a: unknown[]) => void)(type, ...rest);
		}) as typeof document.removeEventListener;
		try {
			const [text, setText] = signal("live");
			let reads = 0;
			const route = document.createElement("main");
			route.appendChild(
				Dialog({ defaultOpen: true }, [
					DialogContent(() => {
						reads++;
						return text();
					}),
				]),
			);
			mount(route);
			await flush();
			expect(portals()).toHaveLength(1);
			expect(scrollLockCount()).toBe(1);
			expect(added.filter((t) => t === "keydown")).toHaveLength(1);

			// A route change: the page's subtree is disposed and removed.
			dispose(route);
			route.remove();

			expect(portals()).toHaveLength(0);
			expect(document.querySelector("[data-slot=dialog-content]")).toBeNull();
			expect(scrollLockCount()).toBe(0);
			expect(removed.filter((t) => t === "keydown")).toHaveLength(1);
			const readsAtDispose = reads;
			setText("after");
			expect(reads).toBe(readsAtDispose);
		} finally {
			document.addEventListener = origAdd;
			document.removeEventListener = origRemove;
		}
	});

	it("disposing the DialogContent node itself while open cleans up the portal", async () => {
		const content = DialogContent("Body");
		mount(Dialog({ defaultOpen: true }, [content]));
		await flush();
		expect(portals()).toHaveLength(1);
		dispose(content);
		expect(portals()).toHaveLength(0);
		expect(scrollLockCount()).toBe(0);
	});

	it("a dialog disposed before its setup microtask never touches <body>", async () => {
		const dlg = Dialog({ defaultOpen: true }, [DialogContent("Body")]);
		mount(dlg);
		dispose(dlg);
		await flush();
		expect(portals()).toHaveLength(0);
		expect(scrollLockCount()).toBe(0);
	});

	it("many open/dispose cycles leave no orphaned portal", async () => {
		for (let i = 0; i < 5; i++) {
			const dlg = Dialog({ defaultOpen: true }, [DialogContent(`Body ${i}`)]);
			mount(dlg);
			await flush();
			expect(portals()).toHaveLength(1);
			dispose(dlg);
			dlg.remove();
		}
		expect(portals()).toHaveLength(0);
		expect(scrollLockCount()).toBe(0);
	});

	it("server rendering keeps the content in the dialog's markup and never touches <body>", async () => {
		const before = document.body.innerHTML;
		enableSSR();
		let html = "";
		try {
			const children: NodeChildren = [DialogTrigger("Open"), DialogContent("Server body")];
			html = renderToString(Dialog({ defaultOpen: true }, children));
			await flush();
		} finally {
			disableSSR();
		}
		expect(html).toContain("Server body");
		expect(html).toContain('data-slot="dialog-portal"');
		expect(document.body.innerHTML).toBe(before);
	});
});
