import { dispose, signal } from "sibujs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../src/components/alert-dialog";
import { __resetScrollLock } from "../src/lib/scroll-lock";

const flush = () => Promise.resolve().then(() => undefined);

/** Resolve an ARIA id reference within the content element. */
function resolves(content: HTMLElement, attr: string): HTMLElement | null {
	const id = content.getAttribute(attr);
	if (!id) return null;
	for (const el of content.querySelectorAll<HTMLElement>("[id]")) {
		if (el.id === id) return el;
	}
	return null;
}

function buildAlert(titleText: string, descText: string) {
	const root = AlertDialog({ defaultOpen: true }, [
		AlertDialogContent([
			AlertDialogHeader([
				AlertDialogTitle(titleText),
				AlertDialogDescription(descText),
			]),
		]),
	]) as HTMLElement;
	document.body.appendChild(root);
	return root;
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

describe("AlertDialog accessible labelling", () => {
	it("resolves both ARIA references to real elements", async () => {
		const root = buildAlert("Delete file?", "This cannot be undone.");
		await flush();
		await flush();

		const content = root.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;

		const labelled = resolves(content, "aria-labelledby");
		const described = resolves(content, "aria-describedby");

		expect(labelled).not.toBeNull();
		expect(described).not.toBeNull();
		expect(labelled?.getAttribute("data-slot")).toBe("alert-dialog-title");
		expect(described?.getAttribute("data-slot")).toBe(
			"alert-dialog-description",
		);
		expect(labelled?.textContent).toBe("Delete file?");
		expect(described?.textContent).toBe("This cannot be undone.");
	});

	it("does not use the old hard-coded ids", async () => {
		const root = buildAlert("T", "D");
		await flush();
		await flush();

		const content = root.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;
		expect(content.getAttribute("aria-labelledby")).not.toBe(
			"alert-dialog-title",
		);
		expect(content.getAttribute("aria-describedby")).not.toBe(
			"alert-dialog-description",
		);
	});

	it("gives two simultaneous dialogs distinct ids", async () => {
		const a = buildAlert("First title", "First description");
		const b = buildAlert("Second title", "Second description");
		await flush();
		await flush();

		const ca = a.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;
		const cb = b.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;

		expect(ca.getAttribute("aria-labelledby")).not.toBe(
			cb.getAttribute("aria-labelledby"),
		);
		expect(ca.getAttribute("aria-describedby")).not.toBe(
			cb.getAttribute("aria-describedby"),
		);

		// Every id in the document is unique.
		const ids = [...document.querySelectorAll("[id]")].map((e) => e.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it("each dialog references its own children, not the other's", async () => {
		const a = buildAlert("First title", "First description");
		const b = buildAlert("Second title", "Second description");
		await flush();
		await flush();

		const ca = a.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;
		const cb = b.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;

		expect(resolves(ca, "aria-labelledby")?.textContent).toBe("First title");
		expect(resolves(ca, "aria-describedby")?.textContent).toBe(
			"First description",
		);
		expect(resolves(cb, "aria-labelledby")?.textContent).toBe("Second title");
		expect(resolves(cb, "aria-describedby")?.textContent).toBe(
			"Second description",
		);

		// The referenced nodes are contained by their own dialog only.
		expect(ca.contains(resolves(ca, "aria-labelledby") as Node)).toBe(true);
		expect(cb.contains(resolves(ca, "aria-labelledby") as Node)).toBe(false);
	});

	it("keeps ids stable across reactive open/close transitions", async () => {
		const [open, setOpen] = signal(false);
		const root = AlertDialog({ open: () => open() }, [
			AlertDialogContent([
				AlertDialogTitle("Stable"),
				AlertDialogDescription("Desc"),
			]),
		]) as HTMLElement;
		document.body.appendChild(root);
		await flush();
		await flush();

		const content = root.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;
		const before = [
			content.getAttribute("aria-labelledby"),
			content.getAttribute("aria-describedby"),
		];

		setOpen(true);
		setOpen(false);
		setOpen(true);
		await flush();

		expect([
			content.getAttribute("aria-labelledby"),
			content.getAttribute("aria-describedby"),
		]).toEqual(before);
		expect(resolves(content, "aria-labelledby")?.textContent).toBe("Stable");
	});

	it("does not cross-wire contexts after dispose and remount", async () => {
		const first = buildAlert("Original", "Original desc");
		await flush();
		await flush();
		const firstContent = first.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;
		const firstLabel = firstContent.getAttribute("aria-labelledby");

		dispose(first);
		first.remove();

		const second = buildAlert("Remounted", "Remounted desc");
		await flush();
		await flush();
		const secondContent = second.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;

		expect(secondContent.getAttribute("aria-labelledby")).not.toBe(firstLabel);
		expect(resolves(secondContent, "aria-labelledby")?.textContent).toBe(
			"Remounted",
		);
		expect(resolves(secondContent, "aria-describedby")?.textContent).toBe(
			"Remounted desc",
		);
	});

	it("drops the reference when a description is intentionally absent", async () => {
		const root = AlertDialog({ defaultOpen: true }, [
			AlertDialogContent([AlertDialogTitle("Only a title")]),
		]) as HTMLElement;
		document.body.appendChild(root);
		await flush();
		await flush();

		const content = root.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;

		expect(resolves(content, "aria-labelledby")?.textContent).toBe(
			"Only a title",
		);
		// No description element exists, so no dangling reference may remain.
		expect(content.hasAttribute("aria-describedby")).toBe(false);
	});

	it("honours a user-supplied id without breaking the reference", async () => {
		const root = AlertDialog({ defaultOpen: true }, [
			AlertDialogContent([
				AlertDialogTitle({ id: "my-custom-title" }, "Custom"),
				AlertDialogDescription("Desc"),
			]),
		]) as HTMLElement;
		document.body.appendChild(root);
		await flush();
		await flush();

		const content = root.querySelector(
			"[data-slot=alert-dialog-content]",
		) as HTMLElement;
		const title = content.querySelector(
			"[data-slot=alert-dialog-title]",
		) as HTMLElement;

		expect(title.id).toBe("my-custom-title");
		expect(content.getAttribute("aria-labelledby")).toBe("my-custom-title");
		expect(resolves(content, "aria-labelledby")).toBe(title);
	});
});
