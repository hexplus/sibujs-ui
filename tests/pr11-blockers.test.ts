/**
 * Regression coverage for three production blockers found on PR #11.
 *
 *  - A *controlled* RadioGroup could not follow a form reset: the reset never
 *    touches the controlled signal, so no reactive effect re-ran and the
 *    browser-reset native bridges were left contradicting the visible value.
 *  - The unresolved-reference sweep only looked at content descendants and
 *    treated the whole attribute as one id, so it deleted valid caller-supplied
 *    external and multi-token ARIA references.
 *  - ARIA adoption had no removal half: unmounting a reactive title left the
 *    content pointing at an id that no longer existed.
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
import { __resetScrollLock } from "../src/lib/scroll-lock";

const settle = async () => {
	for (let i = 0; i < 12; i++) await Promise.resolve();
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
const tabStops = (g: HTMLElement) => items(g).filter((i) => i.tabIndex === 0);

describe("a controlled RadioGroup never diverges from its form", () => {
	it("keeps the controlled value selected and submitted after reset", async () => {
		// The exact independent reproduction: controlled, no onValueChange.
		const [value] = signal("b");
		const group = RadioGroup({ name: "choice", value: () => value() }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();

		expect(checkedValue(group)).toBe("b");
		expect(entries(f)).toEqual([["choice", "b"]]);

		f.reset();
		await settle();

		expect(items(group)[1].getAttribute("aria-checked")).toBe("true");
		expect(entries(f)).toEqual([["choice", "b"]]);
		expect(items(group)[1].getAttribute("data-state")).toBe("checked");
		expect(tabStops(group)).toHaveLength(1);
	});

	it("restores the bridges when the owner ignores the reset", async () => {
		const [value] = signal("b");
		const seen: string[] = [];
		const group = RadioGroup(
			{
				name: "choice",
				value: () => value(),
				// Deliberately does not write back: the owner rejects the reset.
				onValueChange: (v: string) => seen.push(v),
			},
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();

		f.reset();
		await settle();

		expect(seen).toEqual([""]);
		expect(checkedValue(group)).toBe("b");
		expect(entries(f)).toEqual([["choice", "b"]]);
	});

	it("synchronizes when the owner accepts the reset synchronously", async () => {
		const [value, setValue] = signal("b");
		const seen: string[] = [];
		const group = RadioGroup(
			{
				name: "choice",
				defaultValue: "a",
				value: () => value(),
				onValueChange: (v: string) => {
					seen.push(v);
					setValue(v);
				},
			},
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(entries(f)).toEqual([["choice", "b"]]);

		f.reset();
		await settle();

		expect(seen).toEqual(["a"]);
		expect(checkedValue(group)).toBe("a");
		expect(entries(f)).toEqual([["choice", "a"]]);
	});

	it("synchronizes when the owner accepts the reset asynchronously", async () => {
		const [value, setValue] = signal("b");
		const group = RadioGroup(
			{
				name: "choice",
				defaultValue: "a",
				value: () => value(),
				onValueChange: (v: string) => {
					setTimeout(() => setValue(v), 0);
				},
			},
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();

		f.reset();
		await settle();
		// Still the old value — the owner has not answered yet, and the bridges
		// must agree with what is on screen rather than with the browser reset.
		expect(checkedValue(group)).toBe("b");
		expect(entries(f)).toEqual([["choice", "b"]]);

		await new Promise((r) => setTimeout(r, 5));
		await settle();
		expect(checkedValue(group)).toBe("a");
		expect(entries(f)).toEqual([["choice", "a"]]);
	});

	it("announces the reset exactly once", async () => {
		const [value] = signal("b");
		const seen: string[] = [];
		const group = RadioGroup(
			{
				name: "choice",
				defaultValue: "a",
				value: () => value(),
				onValueChange: (v: string) => seen.push(v),
			},
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();

		f.reset();
		await settle();
		expect(seen).toEqual(["a"]);
	});

	it("does not re-announce a value the group already holds", async () => {
		const [value] = signal("a");
		const seen: string[] = [];
		const group = RadioGroup(
			{
				name: "choice",
				defaultValue: "a",
				value: () => value(),
				onValueChange: (v: string) => seen.push(v),
			},
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();

		f.reset();
		await settle();

		expect(seen).toEqual([]);
		expect(entries(f)).toEqual([["choice", "a"]]);
	});

	it("keeps a required controlled group valid after reset", async () => {
		const [value] = signal("b");
		const group = RadioGroup(
			{ name: "choice", required: true, value: () => value() },
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(true);

		f.reset();
		await settle();

		// The selection is unchanged, so the group is still satisfied.
		expect(checkedValue(group)).toBe("b");
		expect(f.checkValidity()).toBe(true);
		expect(entries(f)).toEqual([["choice", "b"]]);
	});

	it("keeps a required nameless controlled group valid after reset", async () => {
		const [value] = signal("b");
		const group = RadioGroup({ required: true, value: () => value() }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(group);
		await settle();
		expect(f.checkValidity()).toBe(true);

		f.reset();
		await settle();

		expect(checkedValue(group)).toBe("b");
		expect(f.checkValidity()).toBe(true);
	});

	it("keeps a disabled controlled group consistent after reset", async () => {
		const [value] = signal("b");
		const group = RadioGroup(
			{ name: "choice", disabled: true, value: () => value() },
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();
		// Disabled controls are not successful, so they never submit.
		expect(entries(f)).toEqual([]);

		f.reset();
		await settle();

		expect(checkedValue(group)).toBe("b");
		expect(entries(f)).toEqual([]);
	});

	it("survives repeated controlled select/reset cycles", async () => {
		const [value, setValue] = signal("b");
		const group = RadioGroup(
			{
				name: "choice",
				value: () => value(),
				onValueChange: (v: string) => setValue(v),
			},
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		const f = newForm(group);
		await settle();

		for (let i = 0; i < 4; i++) {
			items(group)[1].click();
			await settle();
			expect(entries(f)).toEqual([["choice", "b"]]);
			expect(checkedValue(group)).toBe("b");

			f.reset();
			await settle();
			// defaultValue is "", so the owner accepts a cleared selection.
			expect(checkedValue(group)).toBeNull();
			expect(entries(f)).toEqual([]);
		}
	});

	it("still resets uncontrolled named and nameless groups", async () => {
		const named = RadioGroup({ name: "n", defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const nameless = RadioGroup({ defaultValue: "a" }, [
			RadioGroupItem({ value: "a" }),
			RadioGroupItem({ value: "b" }),
		]) as HTMLElement;
		const f = newForm(named, nameless);
		await settle();

		items(named)[1].click();
		items(nameless)[1].click();
		await settle();
		expect(entries(f)).toEqual([["n", "b"]]);

		f.reset();
		await settle();

		expect(checkedValue(named)).toBe("a");
		expect(checkedValue(nameless)).toBe("a");
		expect(entries(f)).toEqual([["n", "a"]]);
	});

	it("keeps following resets after moving to another form", async () => {
		const [value, setValue] = signal("b");
		const group = RadioGroup(
			{
				name: "choice",
				value: () => value(),
				onValueChange: (v: string) => setValue(v),
			},
			[RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })],
		) as HTMLElement;
		const fa = newForm(group);
		const fb = newForm();
		await settle();
		expect(entries(fa)).toEqual([["choice", "b"]]);

		fb.appendChild(group);
		await settle();
		expect(entries(fa)).toEqual([]);
		expect(entries(fb)).toEqual([["choice", "b"]]);

		// A reset of the *old* form must not touch the group any more.
		fa.reset();
		await settle();
		expect(checkedValue(group)).toBe("b");
		expect(entries(fb)).toEqual([["choice", "b"]]);

		fb.reset();
		await settle();
		expect(checkedValue(group)).toBeNull();
		expect(entries(fb)).toEqual([]);
	});
});

// ── Dialog / AlertDialog ARIA references ────────────────────────────────────

/** Resolve every IDREF token of an ARIA attribute against the whole document. */
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

/**
 * Both dialog families are driven through the same table, because the
 * requirement is that they behave identically.
 */
const FAMILIES = [
	{
		name: "Dialog",
		Root: Dialog,
		Content: DialogContent,
		Title: DialogTitle,
		Desc: DialogDescription,
		contentSlot: "[data-slot=dialog-content]",
	},
	{
		name: "AlertDialog",
		Root: AlertDialog,
		Content: AlertDialogContent,
		Title: AlertDialogTitle,
		Desc: AlertDialogDescription,
		contentSlot: "[data-slot=alert-dialog-content]",
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

	describe(`${fam.name} keeps caller-supplied ARIA references`, () => {
		it("keeps an explicit external aria-labelledby", async () => {
			const external = document.createElement("h2");
			external.id = "external-title";
			external.textContent = "External";
			document.body.appendChild(external);

			const root = build({ "aria-labelledby": "external-title" }, []);
			await settle();

			const content = contentOf(root);
			expect(content.getAttribute("aria-labelledby")).toBe("external-title");
			expect(resolvesTo(content, "aria-labelledby")).toBe(external);
		});

		it("keeps an explicit external aria-describedby", async () => {
			const external = document.createElement("p");
			external.id = "external-desc";
			external.textContent = "External desc";
			document.body.appendChild(external);

			const root = build({ "aria-describedby": "external-desc" }, []);
			await settle();

			const content = contentOf(root);
			expect(content.getAttribute("aria-describedby")).toBe("external-desc");
			expect(resolvesTo(content, "aria-describedby")).toBe(external);
		});

		it("keeps multiple whitespace-separated IDREF tokens", async () => {
			for (const id of ["tok-one", "tok-two"]) {
				const n = document.createElement("span");
				n.id = id;
				n.textContent = id;
				document.body.appendChild(n);
			}

			const root = build({ "aria-labelledby": "tok-one tok-two" }, []);
			await settle();

			const content = contentOf(root);
			expect(content.getAttribute("aria-labelledby")).toBe("tok-one tok-two");
			expect(resolveAll(content, "aria-labelledby")).toHaveLength(2);
		});

		it("keeps a mixture of internal and external tokens", async () => {
			const external = document.createElement("span");
			external.id = "mix-external";
			document.body.appendChild(external);

			const root = build({ "aria-labelledby": "mix-internal mix-external" }, [
				fam.Title({ id: "mix-internal" }, "Internal"),
			]);
			await settle();

			const content = contentOf(root);
			expect(content.getAttribute("aria-labelledby")).toBe(
				"mix-internal mix-external",
			);
			expect(resolveAll(content, "aria-labelledby")).toHaveLength(2);
		});

		it("keeps a reference whose target is mounted later", async () => {
			const root = build({ "aria-labelledby": "later-title" }, []);
			await settle();

			const content = contentOf(root);
			// Nothing resolves yet, but the caller's intent must survive.
			expect(content.getAttribute("aria-labelledby")).toBe("later-title");
			expect(resolvesTo(content, "aria-labelledby")).toBeNull();

			const later = document.createElement("h2");
			later.id = "later-title";
			document.body.appendChild(later);
			await settle();

			expect(content.getAttribute("aria-labelledby")).toBe("later-title");
			expect(resolvesTo(content, "aria-labelledby")).toBe(later);
		});

		it("lets an explicit content reference win over an internal title", async () => {
			const external = document.createElement("h2");
			external.id = "wins-title";
			document.body.appendChild(external);

			const root = build({ "aria-labelledby": "wins-title" }, [
				fam.Title({}, "Internal title"),
			]);
			await settle();

			const content = contentOf(root);
			expect(content.getAttribute("aria-labelledby")).toBe("wins-title");
			expect(resolvesTo(content, "aria-labelledby")).toBe(external);
		});

		it("adopts a caller-supplied child id when the content has no explicit ref", async () => {
			const root = build({}, [
				fam.Title({ id: "child-title" }, "T"),
				fam.Desc({ id: "child-desc" }, "D"),
			]);
			await settle();

			const content = contentOf(root);
			expect(content.getAttribute("aria-labelledby")).toBe("child-title");
			expect(content.getAttribute("aria-describedby")).toBe("child-desc");
		});

		it("drops generated references when no title or description exists", async () => {
			const root = build({}, ["just text"]);
			await settle();

			const content = contentOf(root);
			expect(content.hasAttribute("aria-labelledby")).toBe(false);
			expect(content.hasAttribute("aria-describedby")).toBe(false);
		});

		it("keeps two instances independent", async () => {
			const a = build({}, [fam.Title({}, "A"), fam.Desc({}, "da")]);
			const b = build({}, [fam.Title({}, "B"), fam.Desc({}, "db")]);
			await settle();

			const ca = contentOf(a);
			const cb = contentOf(b);
			expect(resolvesTo(ca, "aria-labelledby")?.textContent).toBe("A");
			expect(resolvesTo(cb, "aria-labelledby")?.textContent).toBe("B");
			expect(ca.getAttribute("aria-labelledby")).not.toBe(
				cb.getAttribute("aria-labelledby"),
			);
			expect(ca.contains(resolvesTo(ca, "aria-labelledby") as Node)).toBe(true);
			expect(cb.contains(resolvesTo(ca, "aria-labelledby") as Node)).toBe(
				false,
			);
		});
	});

	describe(`${fam.name} ARIA claims have a full lifecycle`, () => {
		it("adds, removes and restores the reference as a title mounts and unmounts", async () => {
			const [show, setShow] = signal(false);
			const root = build({}, [
				() => (show() ? fam.Title({}, "Reactive") : null),
				fam.Desc({}, "d"),
			]);
			await settle();
			const content = contentOf(root);

			// Absent to begin with.
			expect(content.hasAttribute("aria-labelledby")).toBe(false);

			// Mounts late.
			setShow(true);
			await settle();
			expect(resolvesTo(content, "aria-labelledby")?.textContent).toBe(
				"Reactive",
			);

			// Unmounts: the reference must go with it, never dangle.
			setShow(false);
			await settle();
			expect(resolveAll(content, "aria-labelledby")).toHaveLength(0);
			expect(content.hasAttribute("aria-labelledby")).toBe(false);

			// Remounts.
			setShow(true);
			await settle();
			expect(resolvesTo(content, "aria-labelledby")?.textContent).toBe(
				"Reactive",
			);
		});

		it("does the same for a description", async () => {
			const [show, setShow] = signal(true);
			const root = build({}, [
				fam.Title({}, "t"),
				() => (show() ? fam.Desc({}, "Details") : null),
			]);
			await settle();
			const content = contentOf(root);
			expect(resolvesTo(content, "aria-describedby")?.textContent).toBe(
				"Details",
			);

			setShow(false);
			await settle();
			expect(content.hasAttribute("aria-describedby")).toBe(false);

			setShow(true);
			await settle();
			expect(resolvesTo(content, "aria-describedby")?.textContent).toBe(
				"Details",
			);
		});

		it("re-points to another claimant when the active title is removed", async () => {
			const root = build({}, [
				fam.Title({}, "First"),
				fam.Title({}, "Second"),
			]);
			await settle();
			const content = contentOf(root);
			expect(resolvesTo(content, "aria-labelledby")?.textContent).toBe("First");

			const first = content.querySelector(
				`[data-slot$=-title]`,
			) as HTMLElement;
			first.remove();
			await settle();

			expect(resolvesTo(content, "aria-labelledby")?.textContent).toBe(
				"Second",
			);
		});

		it("removes the attribute when the last claimant goes", async () => {
			const root = build({}, [fam.Title({}, "Only")]);
			await settle();
			const content = contentOf(root);
			expect(content.hasAttribute("aria-labelledby")).toBe(true);

			(content.querySelector(`[data-slot$=-title]`) as HTMLElement).remove();
			await settle();

			expect(content.hasAttribute("aria-labelledby")).toBe(false);
		});

		it("never produces duplicate ids for multiple titles", async () => {
			const root = build({}, [
				fam.Title({}, "One"),
				fam.Title({}, "Two"),
				fam.Title({}, "Three"),
			]);
			await settle();
			const content = contentOf(root);

			const ids = [...content.querySelectorAll(`[data-slot$=-title]`)]
				.map((n) => n.id)
				.filter(Boolean);
			expect(new Set(ids).size).toBe(ids.length);
			expect(resolveAll(content, "aria-labelledby")).toHaveLength(1);
		});

		it("updates both owners when a title moves between instances", async () => {
			const a = build({}, [fam.Title({}, "Movable"), fam.Desc({}, "da")]);
			const b = build({}, [fam.Desc({}, "db")]);
			await settle();

			const ca = contentOf(a);
			const cb = contentOf(b);
			expect(resolvesTo(ca, "aria-labelledby")?.textContent).toBe("Movable");
			expect(cb.hasAttribute("aria-labelledby")).toBe(false);

			const title = ca.querySelector(`[data-slot$=-title]`) as HTMLElement;
			cb.appendChild(title);
			await settle();

			// The old owner lets go, the new owner picks it up.
			expect(ca.hasAttribute("aria-labelledby")).toBe(false);
			expect(resolvesTo(cb, "aria-labelledby")?.textContent).toBe("Movable");
			expect(cb.contains(title)).toBe(true);
		});

		it("keeps an explicit content reference through child disposal", async () => {
			const external = document.createElement("h2");
			external.id = "survives-title";
			document.body.appendChild(external);

			const [show, setShow] = signal(true);
			const root = build({ "aria-labelledby": "survives-title" }, [
				() => (show() ? fam.Title({}, "Internal") : null),
			]);
			await settle();
			const content = contentOf(root);
			expect(content.getAttribute("aria-labelledby")).toBe("survives-title");

			setShow(false);
			await settle();

			// The caller's reference is not ours to remove.
			expect(content.getAttribute("aria-labelledby")).toBe("survives-title");
			expect(resolvesTo(content, "aria-labelledby")).toBe(external);
		});

		it("releases all claim state on disposal", async () => {
			const root = build({}, [fam.Title({}, "T"), fam.Desc({}, "D")]);
			await settle();
			const content = contentOf(root);
			const title = content.querySelector(
				`[data-slot$=-title]`,
			) as HTMLElement;

			dispose(root);
			await settle();

			// Nothing may keep reacting to the disposed tree.
			expect(() => title.remove()).not.toThrow();
			await settle();
			expect(() => {
				content.appendChild(document.createElement("span"));
			}).not.toThrow();
			await settle();
		});
	});

	describe(`${fam.name} ARIA authorship is tracked, never assumed`, () => {
		it("follows a title whose id is changed after mount", async () => {
			const root = build({}, [fam.Title({}, "T")]);
			await settle();
			const content = contentOf(root);
			const title = content.querySelector(
				`[data-slot$=-title]`,
			) as HTMLElement;
			expect(resolvesTo(content, "aria-labelledby")).toBe(title);

			// A caller renaming the element must not leave the reference behind.
			title.id = "renamed-title";
			await settle();

			expect(content.getAttribute("aria-labelledby")).toBe("renamed-title");
			expect(resolvesTo(content, "aria-labelledby")).toBe(title);
		});

		it("hands ownership over when the content attribute is set imperatively", async () => {
			const external = document.createElement("h2");
			external.id = "taken-over";
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

			// Someone other than us writes the attribute: it is theirs from now on.
			content.setAttribute("aria-labelledby", "taken-over");
			await settle();
			expect(content.getAttribute("aria-labelledby")).toBe("taken-over");

			// Losing the internal title must no longer disturb it.
			setShow(false);
			await settle();
			expect(content.getAttribute("aria-labelledby")).toBe("taken-over");
			expect(resolvesTo(content, "aria-labelledby")).toBe(external);

			// Nor must a new internal title steal it back.
			setShow(true);
			await settle();
			expect(content.getAttribute("aria-labelledby")).toBe("taken-over");
		});

		it("treats a reactive caller reference as caller-owned", async () => {
			const external = document.createElement("h2");
			external.id = "reactive-title";
			document.body.appendChild(external);

			const root = build({ "aria-labelledby": () => "reactive-title" }, [
				fam.Title({}, "Internal"),
			]);
			await settle();

			const content = contentOf(root);
			expect(content.getAttribute("aria-labelledby")).toBe("reactive-title");
			expect(resolvesTo(content, "aria-labelledby")).toBe(external);
		});

		it("still manages a generated reference we alone have written", async () => {
			const [show, setShow] = signal(true);
			const root = build({}, [
				() => (show() ? fam.Title({}, "Ours") : null),
			]);
			await settle();
			const content = contentOf(root);
			expect(resolvesTo(content, "aria-labelledby")?.textContent).toBe("Ours");

			// Our own writes must never be mistaken for a caller taking over.
			setShow(false);
			await settle();
			expect(content.hasAttribute("aria-labelledby")).toBe(false);

			setShow(true);
			await settle();
			expect(resolvesTo(content, "aria-labelledby")?.textContent).toBe("Ours");
		});
	});
}
