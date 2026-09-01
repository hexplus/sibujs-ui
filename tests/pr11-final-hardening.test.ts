/**
 * Final hardening for PR #11.
 *
 * Complete lifecycle coverage for the dialog ARIA helper, including a
 * deterministic proof that its own writes converge instead of feeding the
 * MutationObserver that triggered them.
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
import { __resetScrollLock } from "../src/lib/scroll-lock";

const settle = async () => {
	for (let i = 0; i < 12; i++) await Promise.resolve();
};
/** Drain a bounded number of microtask turns, delivering observer callbacks. */
const drain = async (turns: number) => {
	for (let i = 0; i < turns; i++) await Promise.resolve();
};

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

function resolveAll(content: HTMLElement, attr: string): HTMLElement[] {
	const raw = content.getAttribute(attr);
	if (!raw) return [];
	const doc = content.ownerDocument;
	return raw
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.map((id) => doc.getElementById(id))
		.filter((el): el is HTMLElement => el !== null);
}
const resolvesTo = (content: HTMLElement, attr: string) =>
	resolveAll(content, attr)[0] ?? null;

const FAMILIES = [
	{
		name: "Dialog",
		Root: Dialog,
		Content: DialogContent,
		Title: DialogTitle,
		Desc: DialogDescription,
		contentSlot: "[data-slot=dialog-content]",
		titleSlot: "[data-slot=dialog-title]",
		descSlot: "[data-slot=dialog-description]",
	},
	{
		name: "AlertDialog",
		Root: AlertDialog,
		Content: AlertDialogContent,
		Title: AlertDialogTitle,
		Desc: AlertDialogDescription,
		contentSlot: "[data-slot=alert-dialog-content]",
		titleSlot: "[data-slot=alert-dialog-title]",
		descSlot: "[data-slot=alert-dialog-description]",
	},
] as const;

for (const fam of FAMILIES) {
	const build = (contentProps: Record<string, unknown>, children: unknown[]) => {
		const root = fam.Root({ defaultOpen: true }, [
			// biome-ignore lint/suspicious/noExplicitAny: untyped children bag
			fam.Content(contentProps as never, children as any),
		]) as HTMLElement;
		document.body.appendChild(root);
		return root;
	};
	const contentOf = (root: HTMLElement) =>
		root.querySelector(fam.contentSlot) as HTMLElement;
	const titlesIn = (content: HTMLElement) =>
		[...content.querySelectorAll<HTMLElement>(fam.titleSlot)];
	const descsIn = (content: HTMLElement) =>
		[...content.querySelectorAll<HTMLElement>(fam.descSlot)];

	describe(`${fam.name} generated ARIA references track their claimant's id`, () => {
		it("follows the active title when its id changes", async () => {
			const root = build({}, [fam.Title({}, "T")]);
			await settle();
			const content = contentOf(root);
			const title = titlesIn(content)[0];

			title.id = "changed-title";
			await settle();

			expect(content.getAttribute("aria-labelledby")).toBe("changed-title");
			expect(resolvesTo(content, "aria-labelledby")).toBe(title);
		});

		it("re-assigns and re-points when the active title's id is removed", async () => {
			const root = build({}, [fam.Title({}, "T")]);
			await settle();
			const content = contentOf(root);
			const title = titlesIn(content)[0];

			title.removeAttribute("id");
			await settle();

			// The helper must restore a working reference, not leave it dangling.
			expect(title.id).not.toBe("");
			expect(content.getAttribute("aria-labelledby")).toBe(title.id);
			expect(resolvesTo(content, "aria-labelledby")).toBe(title);
		});

		it("ignores an id change on a non-active title", async () => {
			const root = build({}, [fam.Title({}, "First"), fam.Title({}, "Second")]);
			await settle();
			const content = contentOf(root);
			const [first, second] = titlesIn(content);
			const before = content.getAttribute("aria-labelledby");
			expect(resolvesTo(content, "aria-labelledby")).toBe(first);

			second.id = "second-renamed";
			await settle();

			expect(content.getAttribute("aria-labelledby")).toBe(before);
			expect(resolvesTo(content, "aria-labelledby")).toBe(first);
		});

		it("selects the next title when a renamed active title is removed", async () => {
			const root = build({}, [fam.Title({}, "First"), fam.Title({}, "Second")]);
			await settle();
			const content = contentOf(root);
			const [first, second] = titlesIn(content);

			first.id = "renamed-active";
			await settle();
			expect(content.getAttribute("aria-labelledby")).toBe("renamed-active");

			first.remove();
			await settle();

			expect(content.getAttribute("aria-labelledby")).toBe(second.id);
			expect(resolvesTo(content, "aria-labelledby")).toBe(second);
			expect(second.textContent).toBe("Second");
		});

		it("follows the active description when its id changes or is removed", async () => {
			const root = build({}, [fam.Desc({}, "D")]);
			await settle();
			const content = contentOf(root);
			const desc = descsIn(content)[0];

			desc.id = "changed-desc";
			await settle();
			expect(content.getAttribute("aria-describedby")).toBe("changed-desc");
			expect(resolvesTo(content, "aria-describedby")).toBe(desc);

			desc.removeAttribute("id");
			await settle();
			expect(desc.id).not.toBe("");
			expect(content.getAttribute("aria-describedby")).toBe(desc.id);
			expect(resolvesTo(content, "aria-describedby")).toBe(desc);
		});

		it("selects the next description when a renamed active one is removed", async () => {
			const root = build({}, [fam.Desc({}, "First"), fam.Desc({}, "Second")]);
			await settle();
			const content = contentOf(root);
			const [first, second] = descsIn(content);

			first.id = "renamed-desc";
			await settle();
			expect(content.getAttribute("aria-describedby")).toBe("renamed-desc");

			first.remove();
			await settle();
			expect(content.getAttribute("aria-describedby")).toBe(second.id);
			expect(resolvesTo(content, "aria-describedby")).toBe(second);
		});

		it("keeps generated ids stable and unique across churn", async () => {
			const root = build({}, [
				fam.Title({}, "One"),
				fam.Title({}, "Two"),
				fam.Title({}, "Three"),
				fam.Desc({}, "D1"),
				fam.Desc({}, "D2"),
			]);
			await settle();
			const content = contentOf(root);

			const allIds = () =>
				[...titlesIn(content), ...descsIn(content)].map((n) => n.id);
			const first = allIds();
			expect(first.every(Boolean)).toBe(true);
			expect(new Set(first).size).toBe(first.length);

			// Unrelated churn must not renumber anything already assigned.
			content.appendChild(document.createElement("span"));
			await settle();
			expect(allIds()).toEqual(first);

			// A new claimant takes a fresh id without colliding.
			content.appendChild(fam.Title({}, "Four"));
			await settle();
			const grown = allIds();
			expect(new Set(grown).size).toBe(grown.length);
			// The originals kept their ids.
			expect(grown.slice(0, 3)).toEqual(first.slice(0, 3));
		});

		it("assigns unique ids even while the content is detached", async () => {
			// getElementById cannot see a detached tree, so uniqueness must not
			// depend on the claimants already being in the document.
			const content = fam.Content({}, [
				fam.Title({}, "One"),
				fam.Title({}, "Two"),
				fam.Title({}, "Three"),
			] as never) as HTMLElement;
			await settle();

			const inner = content.querySelector(fam.contentSlot) as HTMLElement;
			const ids = [...inner.querySelectorAll<HTMLElement>(fam.titleSlot)].map(
				(n) => n.id,
			);
			expect(ids.every(Boolean)).toBe(true);
			expect(new Set(ids).size).toBe(ids.length);
		});

		it("isolates nested dialogs", async () => {
			const innerRoot = fam.Root({ defaultOpen: true }, [
				// biome-ignore lint/suspicious/noExplicitAny: untyped children bag
				fam.Content({} as never, [
					fam.Title({}, "Inner title"),
					fam.Desc({}, "Inner desc"),
				] as any),
			]) as HTMLElement;

			const root = build({}, [
				fam.Title({}, "Outer title"),
				fam.Desc({}, "Outer desc"),
				innerRoot,
			]);
			await settle();

			const outerContent = contentOf(root);
			const innerContent = innerRoot.querySelector(
				fam.contentSlot,
			) as HTMLElement;

			expect(resolvesTo(outerContent, "aria-labelledby")?.textContent).toBe(
				"Outer title",
			);
			expect(resolvesTo(outerContent, "aria-describedby")?.textContent).toBe(
				"Outer desc",
			);
			expect(resolvesTo(innerContent, "aria-labelledby")?.textContent).toBe(
				"Inner title",
			);
			expect(resolvesTo(innerContent, "aria-describedby")?.textContent).toBe(
				"Inner desc",
			);
			expect(outerContent.getAttribute("aria-labelledby")).not.toBe(
				innerContent.getAttribute("aria-labelledby"),
			);

			// Removing the inner title must not disturb the outer reference.
			(innerContent.querySelector(fam.titleSlot) as HTMLElement).remove();
			await settle();
			expect(resolvesTo(outerContent, "aria-labelledby")?.textContent).toBe(
				"Outer title",
			);
			expect(innerContent.hasAttribute("aria-labelledby")).toBe(false);
		});

		it("updates both owners when a claimant moves between dialogs", async () => {
			const a = build({}, [fam.Title({}, "Movable"), fam.Desc({}, "da")]);
			const b = build({}, [fam.Desc({}, "db")]);
			await settle();
			const ca = contentOf(a);
			const cb = contentOf(b);

			const title = titlesIn(ca)[0];
			cb.appendChild(title);
			await settle();

			expect(ca.hasAttribute("aria-labelledby")).toBe(false);
			expect(resolvesTo(cb, "aria-labelledby")).toBe(title);

			// And back again.
			ca.appendChild(title);
			await settle();
			expect(resolvesTo(ca, "aria-labelledby")).toBe(title);
			expect(cb.hasAttribute("aria-labelledby")).toBe(false);
		});

		it("removes the reference when the final claimant goes", async () => {
			const root = build({}, [fam.Title({}, "Only"), fam.Desc({}, "OnlyD")]);
			await settle();
			const content = contentOf(root);
			expect(content.hasAttribute("aria-labelledby")).toBe(true);
			expect(content.hasAttribute("aria-describedby")).toBe(true);

			titlesIn(content)[0].remove();
			descsIn(content)[0].remove();
			await settle();

			expect(content.hasAttribute("aria-labelledby")).toBe(false);
			expect(content.hasAttribute("aria-describedby")).toBe(false);
		});

		it("stops reconciling after disposal", async () => {
			const root = build({}, [fam.Title({}, "T")]);
			await settle();
			const content = contentOf(root);
			const before = content.getAttribute("aria-labelledby");
			expect(before).not.toBeNull();

			dispose(root);
			await settle();

			// Nothing the helper owns may keep writing to a disposed tree.
			titlesIn(content)[0]?.remove();
			await settle();
			expect(content.getAttribute("aria-labelledby")).toBe(before);

			content.appendChild(fam.Title({}, "Late"));
			await settle();
			expect(content.getAttribute("aria-labelledby")).toBe(before);
		});
	});

	describe(`${fam.name} caller-owned ARIA is never touched`, () => {
		it("leaves a caller-supplied reference alone through claimant churn", async () => {
			const external = document.createElement("h2");
			external.id = "caller-owned-title";
			document.body.appendChild(external);

			const [show, setShow] = signal(true);
			const root = build({ "aria-labelledby": "caller-owned-title" }, [
				() => (show() ? fam.Title({}, "Internal") : null),
			]);
			await settle();
			const content = contentOf(root);

			for (const next of [false, true, false]) {
				setShow(next);
				await settle();
				expect(content.getAttribute("aria-labelledby")).toBe(
					"caller-owned-title",
				);
			}
			expect(resolvesTo(content, "aria-labelledby")).toBe(external);
		});

		it("keeps a caller IDREF list intact", async () => {
			for (const id of ["list-a", "list-b", "list-c"]) {
				const n = document.createElement("span");
				n.id = id;
				document.body.appendChild(n);
			}
			const root = build({ "aria-labelledby": "list-a list-b list-c" }, [
				fam.Title({}, "Internal"),
			]);
			await settle();
			const content = contentOf(root);

			expect(content.getAttribute("aria-labelledby")).toBe(
				"list-a list-b list-c",
			);
			expect(resolveAll(content, "aria-labelledby")).toHaveLength(3);

			titlesIn(content)[0].remove();
			await settle();
			expect(content.getAttribute("aria-labelledby")).toBe(
				"list-a list-b list-c",
			);
		});

		it("treats a reactive caller reference as caller-owned", async () => {
			const external = document.createElement("h2");
			external.id = "reactive-owned";
			document.body.appendChild(external);

			const root = build({ "aria-describedby": () => "reactive-owned" }, [
				fam.Desc({}, "Internal"),
			]);
			await settle();
			const content = contentOf(root);

			expect(content.getAttribute("aria-describedby")).toBe("reactive-owned");
			descsIn(content)[0].remove();
			await settle();
			expect(content.getAttribute("aria-describedby")).toBe("reactive-owned");
		});

		it("hands ownership over on an imperative write, permanently", async () => {
			const external = document.createElement("h2");
			external.id = "imperative-owned";
			document.body.appendChild(external);

			const [show, setShow] = signal(true);
			const root = build({}, [
				() => (show() ? fam.Title({}, "Internal") : null),
			]);
			await settle();
			const content = contentOf(root);
			expect(resolvesTo(content, "aria-labelledby")?.textContent).toBe(
				"Internal",
			);

			content.setAttribute("aria-labelledby", "imperative-owned");
			await settle();

			for (const next of [false, true, false, true]) {
				setShow(next);
				await settle();
				expect(content.getAttribute("aria-labelledby")).toBe(
					"imperative-owned",
				);
			}
		});

		it("does not mistake its own writes for caller ownership", async () => {
			const [show, setShow] = signal(true);
			const root = build({}, [
				() => (show() ? fam.Title({}, "Ours") : null),
				fam.Desc({}, "OursD"),
			]);
			await settle();
			const content = contentOf(root);

			// Many helper-driven transitions in a row: each write is the helper's
			// own, so ownership must never drift to the caller.
			for (let i = 0; i < 5; i++) {
				setShow(false);
				await settle();
				expect(content.hasAttribute("aria-labelledby")).toBe(false);

				setShow(true);
				await settle();
				expect(resolvesTo(content, "aria-labelledby")?.textContent).toBe(
					"Ours",
				);
			}
			// The description was never disturbed by any of it.
			expect(resolvesTo(content, "aria-describedby")?.textContent).toBe(
				"OursD",
			);
		});
	});

	describe(`${fam.name} ARIA reconciliation converges`, () => {
		/**
		 * The helper writes `id` and the ARIA attributes while observing exactly
		 * those attributes, so it feeds the observer that triggered it. This proves
		 * the feedback terminates rather than trusting that it does: a probe counts
		 * every mutation, and after a bounded number of drained microtask turns the
		 * count must stop growing.
		 */
		const countMutations = (content: HTMLElement) => {
			const records: string[] = [];
			const probe = new MutationObserver((batch) => {
				for (const r of batch) {
					records.push(
						r.type === "attributes"
							? `attr:${r.attributeName}`
							: `child:${r.addedNodes.length}/${r.removedNodes.length}`,
					);
				}
			});
			probe.observe(content, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ["id", "aria-labelledby", "aria-describedby"],
			});
			return { records, stop: () => probe.disconnect() };
		};

		it("stabilizes after an id change, with no unbounded write loop", async () => {
			const root = build({}, [fam.Title({}, "T"), fam.Desc({}, "D")]);
			await settle();
			const content = contentOf(root);
			const title = titlesIn(content)[0];

			const probe = countMutations(content);
			try {
				title.id = "loop-probe";
				await drain(40);
				const settled = probe.records.length;

				// A converging system does no further work; a looping one keeps going.
				await drain(400);
				expect(probe.records.length).toBe(settled);

				// And the work it did was small and bounded, not merely finite.
				expect(settled).toBeLessThanOrEqual(8);
				expect(content.getAttribute("aria-labelledby")).toBe("loop-probe");
			} finally {
				probe.stop();
			}
		});

		it("stabilizes when the helper must assign an id and re-point", async () => {
			const root = build({}, [fam.Title({}, "T")]);
			await settle();
			const content = contentOf(root);
			const title = titlesIn(content)[0];

			const probe = countMutations(content);
			try {
				// Forces both kinds of helper write: a fresh id and a new reference.
				title.removeAttribute("id");
				await drain(40);
				const settled = probe.records.length;

				await drain(400);
				expect(probe.records.length).toBe(settled);
				expect(settled).toBeLessThanOrEqual(10);
				expect(resolvesTo(content, "aria-labelledby")).toBe(title);
			} finally {
				probe.stop();
			}
		});

		it("stabilizes after repeated claimant churn", async () => {
			const [show, setShow] = signal(true);
			const root = build({}, [
				() => (show() ? fam.Title({}, "Churn") : null),
			]);
			await settle();
			const content = contentOf(root);

			const probe = countMutations(content);
			try {
				for (let i = 0; i < 6; i++) {
					setShow(i % 2 === 0 ? false : true);
					await drain(40);
				}
				const settled = probe.records.length;

				await drain(400);
				expect(probe.records.length).toBe(settled);
				// Roughly a couple of mutations per toggle, not a runaway count.
				expect(settled).toBeLessThanOrEqual(40);
			} finally {
				probe.stop();
			}
		});
	});
}
