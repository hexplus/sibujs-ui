import { dispose, signal } from "sibujs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	AlertDialog,
	AlertDialogContent,
} from "../src/components/alert-dialog";
import { Dialog, DialogContent } from "../src/components/dialog";
import { Drawer, DrawerContent } from "../src/components/drawer";
import { Sheet, SheetContent } from "../src/components/sheet";
import {
	__resetScrollLock,
	createScrollLock,
	scrollLockCount,
} from "../src/lib/scroll-lock";

const flush = () => Promise.resolve().then(() => undefined);
const overflow = () => document.body.style.overflow;

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

describe("scroll lock primitive", () => {
	it("stores and restores the exact previous inline value", () => {
		document.body.style.overflow = "clip";
		const a = createScrollLock();
		a.acquire();
		expect(overflow()).toBe("hidden");
		a.release();
		expect(overflow()).toBe("clip");
	});

	it("restores the CSS priority as well as the value", () => {
		document.body.style.setProperty("overflow", "clip", "important");
		const a = createScrollLock();
		a.acquire();
		expect(overflow()).toBe("hidden");
		a.release();
		expect(document.body.style.getPropertyValue("overflow")).toBe("clip");
		expect(document.body.style.getPropertyPriority("overflow")).toBe(
			"important",
		);
	});

	it("removes the property entirely when there was none before", () => {
		expect(document.body.getAttribute("style")).toBe(null);
		const a = createScrollLock();
		a.acquire();
		expect(overflow()).toBe("hidden");
		a.release();
		expect(overflow()).toBe("");
	});

	it("a second lock does not overwrite the saved value", () => {
		document.body.style.overflow = "clip";
		const a = createScrollLock();
		const b = createScrollLock();
		a.acquire();
		b.acquire();
		expect(scrollLockCount()).toBe(2);
		a.release();
		// Still locked — b holds it.
		expect(overflow()).toBe("hidden");
		b.release();
		expect(overflow()).toBe("clip");
	});

	it("is idempotent per handle and never goes negative", () => {
		document.body.style.overflow = "clip";
		const a = createScrollLock();
		a.acquire();
		a.acquire();
		a.acquire();
		expect(scrollLockCount()).toBe(1);
		a.release();
		a.release();
		expect(scrollLockCount()).toBe(0);
		expect(overflow()).toBe("clip");
		// Releasing a handle that holds nothing is a no-op.
		a.release();
		expect(scrollLockCount()).toBe(0);
	});

	it("survives rapid acquire/release/acquire cycles", () => {
		document.body.style.overflow = "clip";
		const a = createScrollLock();
		for (let i = 0; i < 20; i++) {
			a.acquire();
			a.release();
		}
		expect(scrollLockCount()).toBe(0);
		expect(overflow()).toBe("clip");
	});
});

describe("modal components coordinate through the shared lock", () => {
	it("an initially closed dialog does not touch an existing overflow", async () => {
		document.body.style.overflow = "clip";
		const dlg = Dialog({}, [DialogContent("Body")]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		expect(overflow()).toBe("clip");
		expect(scrollLockCount()).toBe(0);

		dispose(dlg);
		expect(overflow()).toBe("clip");
	});

	it("opening then closing one dialog restores the previous value", async () => {
		document.body.style.overflow = "clip";
		const [open, setOpen] = signal(false);
		const dlg = Dialog({ open: () => open() }, [
			DialogContent("Body"),
		]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		setOpen(true);
		expect(overflow()).toBe("hidden");

		setOpen(false);
		expect(overflow()).toBe("clip");
	});

	it("two open dialogs stay locked after one closes", async () => {
		document.body.style.overflow = "clip";
		const [openA, setOpenA] = signal(false);
		const [openB, setOpenB] = signal(false);

		const a = Dialog({ open: () => openA() }, [
			DialogContent("A"),
		]) as HTMLElement;
		const b = Dialog({ open: () => openB() }, [
			DialogContent("B"),
		]) as HTMLElement;
		document.body.append(a, b);
		await flush();

		setOpenA(true);
		setOpenB(true);
		expect(scrollLockCount()).toBe(2);
		expect(overflow()).toBe("hidden");

		setOpenA(false);
		expect(overflow()).toBe("hidden");

		setOpenB(false);
		expect(overflow()).toBe("clip");
	});

	it("a Dialog and a Sheet coordinate through the same lock", async () => {
		document.body.style.overflow = "clip";
		const [dOpen, setDOpen] = signal(false);
		const [sOpen, setSOpen] = signal(false);

		const dlg = Dialog({ open: () => dOpen() }, [
			DialogContent("D"),
		]) as HTMLElement;
		const sheet = Sheet({ open: () => sOpen() }, [
			SheetContent("S"),
		]) as HTMLElement;
		document.body.append(dlg, sheet);
		await flush();

		setDOpen(true);
		setSOpen(true);
		expect(scrollLockCount()).toBe(2);

		setDOpen(false);
		expect(overflow()).toBe("hidden");

		setSOpen(false);
		expect(overflow()).toBe("clip");
	});

	it("AlertDialog and Drawer join the same shared lock", async () => {
		document.body.style.overflow = "clip";
		const [aOpen, setAOpen] = signal(false);
		const [dOpen, setDOpen] = signal(false);

		const alert = AlertDialog({ open: () => aOpen() }, [
			AlertDialogContent("A"),
		]) as HTMLElement;
		const drawer = Drawer({ open: () => dOpen() }, [
			DrawerContent("D"),
		]) as HTMLElement;
		document.body.append(alert, drawer);
		await flush();

		setAOpen(true);
		setDOpen(true);
		expect(scrollLockCount()).toBe(2);
		expect(overflow()).toBe("hidden");

		setAOpen(false);
		expect(overflow()).toBe("hidden");
		setDOpen(false);
		expect(overflow()).toBe("clip");
	});

	it("disposing an open modal releases only its own lock", async () => {
		document.body.style.overflow = "clip";
		const [openA, setOpenA] = signal(false);
		const [openB, setOpenB] = signal(false);

		const a = Dialog({ open: () => openA() }, [
			DialogContent("A"),
		]) as HTMLElement;
		const b = Dialog({ open: () => openB() }, [
			DialogContent("B"),
		]) as HTMLElement;
		document.body.append(a, b);
		await flush();

		setOpenA(true);
		setOpenB(true);
		expect(scrollLockCount()).toBe(2);

		dispose(a);
		expect(scrollLockCount()).toBe(1);
		expect(overflow()).toBe("hidden");

		dispose(b);
		expect(scrollLockCount()).toBe(0);
		expect(overflow()).toBe("clip");
	});

	it("rapid open/close/open never produces a stale or negative count", async () => {
		document.body.style.overflow = "clip";
		const [open, setOpen] = signal(false);
		const dlg = Dialog({ open: () => open() }, [
			DialogContent("Body"),
		]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		for (let i = 0; i < 10; i++) {
			setOpen(true);
			setOpen(false);
			expect(scrollLockCount()).toBeGreaterThanOrEqual(0);
		}
		expect(scrollLockCount()).toBe(0);
		expect(overflow()).toBe("clip");

		setOpen(true);
		expect(scrollLockCount()).toBe(1);
		dispose(dlg);
		expect(scrollLockCount()).toBe(0);
		expect(overflow()).toBe("clip");
	});

	it("uncontrolled modals behave identically to controlled ones", async () => {
		document.body.style.overflow = "clip";
		const dlg = Dialog({ defaultOpen: true }, [
			DialogContent("Body"),
		]) as HTMLElement;
		document.body.appendChild(dlg);
		await flush();

		expect(overflow()).toBe("hidden");
		expect(scrollLockCount()).toBe(1);

		dispose(dlg);
		expect(overflow()).toBe("clip");
		expect(scrollLockCount()).toBe(0);
	});
});
