import { deferOwned, nodeOwner } from "./lifecycle";

/**
 * Shared `aria-labelledby` / `aria-describedby` wiring for the dialog-shaped
 * components.
 *
 * Dialog and AlertDialog both generate a per-instance id and expect a
 * title/description child to answer to it. Both must behave identically, so the
 * whole policy lives here rather than being reimplemented twice — which is
 * exactly how they drifted apart once before.
 *
 * ## Two kinds of reference, and only one of them is ours
 *
 * A content element's `aria-labelledby` is either **caller-supplied** or
 * **generated**, and the difference decides everything:
 *
 *  - **Caller-supplied** is authoritative and untouchable. It may point at an
 *    external element elsewhere in the document, at several elements through a
 *    whitespace-separated IDREF list, or at something mounted much later. None
 *    of that is knowable from inside the component, so the only correct policy
 *    is to leave it entirely alone — never re-point it at an internal title,
 *    never remove it because an internal title is missing.
 *  - **Generated** is ours to maintain, and is always a single token naming one
 *    of this instance's own children.
 *
 * Authorship is recorded at construction, when it is a fact, rather than
 * inferred afterwards from the attribute's shape — which cannot distinguish a
 * caller's one-token reference from a generated one.
 *
 * It is also not frozen there. Code outside the component may set
 * `aria-labelledby` imperatively at any later point, and from then on the
 * attribute is no more ours than a prop would have been, so ownership moves —
 * in that direction only. Every managed write is remembered, which is what lets
 * a foreign write be told apart from our own maintenance.
 *
 * ## Ownership is derived, not registered
 *
 * A generated reference must track its target for the target's whole life:
 * mounted late by a reactive child, unmounted when that child goes, remounted,
 * or moved to a different dialog. Rather than have children register and
 * unregister claims — which cannot see a move, and leaks if an unregister is
 * missed — the content re-derives its claimants from the DOM on every change.
 *
 * The result has no registry to leak: the DOM *is* the registry, one
 * `MutationObserver` scoped to the content element keeps it honest, and that
 * observer is released with the component.
 */

export type AriaRefAttr = "aria-labelledby" | "aria-describedby";

/** One managed reference: which attribute, who may claim it, and its base id. */
export interface AriaRefSpec {
	/** The content attribute this reference maintains. */
	attr: AriaRefAttr;
	/**
	 * Selector for elements that may satisfy this reference, e.g.
	 * `[data-slot=dialog-title]`. Matched within the content element.
	 */
	claimant: string;
	/** Id given to the first claimant when it has none of its own. */
	baseId: string;
	/**
	 * True when the caller supplied this attribute themselves, in which case it
	 * is never read, re-pointed or removed.
	 */
	callerOwned: boolean;
}

/**
 * Keep `content`'s generated ARIA references pointing at real, owned elements.
 *
 * @param owner The node whose lifetime governs the observer — the portal
 *   container, since that is what lives in the caller's tree.
 * @param content The element carrying the ARIA attributes.
 * @param contentSelector Selector identifying content elements of this family,
 *   used so a nested dialog's title never satisfies the outer dialog.
 * @param specs The references to maintain.
 */
export function bindAriaRefs(
	owner: Node,
	content: HTMLElement,
	contentSelector: string,
	specs: AriaRefSpec[],
): void {
	const doc = content.ownerDocument;

	/**
	 * Give `el` a stable, document-unique id, or keep the one it already has.
	 *
	 * Caller-supplied ids always win. Generated ids are assigned once and never
	 * revised, so a claimant's id does not churn when a sibling comes or goes —
	 * and a second title takes `<base>-2` rather than duplicating `<base>`.
	 */
	const ensureId = (el: HTMLElement, baseId: string, taken: Set<string>) => {
		if (el.id) return el.id;
		let candidate = baseId;
		let n = 2;
		while (taken.has(candidate) || doc.getElementById(candidate)) {
			candidate = `${baseId}-${n++}`;
		}
		el.id = candidate;
		return candidate;
	};

	/** Claimants this content owns directly — never a nested dialog's. */
	const ownedClaimants = (selector: string) =>
		[...content.querySelectorAll<HTMLElement>(selector)].filter(
			(el) => el.closest(contentSelector) === content,
		);

	/**
	 * Authorship, per attribute. Declared by the caller at construction, and
	 * only ever revised *towards* the caller — never away from them.
	 */
	const callerOwned = new Map<AriaRefAttr, boolean>();
	/** The last value this module wrote, so a third-party write is recognisable. */
	const written = new Map<AriaRefAttr, string | null>();

	for (const spec of specs) {
		const current = content.getAttribute(spec.attr);
		// The declared flag is the primary signal. Whatever actually landed on the
		// element is a second one: a prop supplied indirectly still resolves to a
		// caller value, and anything that is not our own generated id is not ours.
		callerOwned.set(
			spec.attr,
			spec.callerOwned || (current !== null && current !== spec.baseId),
		);
		written.set(spec.attr, current);
	}

	/** Write a managed reference, remembering it as ours. */
	const writeRef = (attr: AriaRefAttr, value: string | null) => {
		if (value === null) content.removeAttribute(attr);
		else content.setAttribute(attr, value);
		written.set(attr, value);
	};

	/**
	 * Hand an attribute to the caller if anyone but us changed it.
	 *
	 * Authorship is a fact that can change after construction: code outside the
	 * component may set `aria-labelledby` imperatively at any point, and from
	 * then on it is no more ours to overwrite than a prop would have been.
	 * Comparing against what we last wrote is what distinguishes a foreign write
	 * from our own, so our maintenance never looks like a caller takeover.
	 */
	const noteForeignWrites = () => {
		for (const spec of specs) {
			if (callerOwned.get(spec.attr)) continue;
			if (content.getAttribute(spec.attr) !== written.get(spec.attr)) {
				callerOwned.set(spec.attr, true);
			}
		}
	};

	const sync = () => {
		if (nodeOwner(owner).disposed()) return;
		noteForeignWrites();

		const taken = new Set<string>();
		for (const spec of specs) {
			const claimants = ownedClaimants(spec.claimant);
			// Every claimant gets an id, even when the attribute is the caller's:
			// a title is a useful reference target regardless of who points at it,
			// and assigning them all together is what keeps them distinct.
			//
			// Each id joins `taken` as it is assigned, not after the pass: a
			// detached content element is invisible to `getElementById`, so
			// claimants in one would otherwise all be handed the same base id.
			const ids: string[] = [];
			for (const el of claimants) {
				const id = ensureId(el, spec.baseId, taken);
				taken.add(id);
				ids.push(id);
			}

			// The caller's reference is not ours to maintain, in either direction.
			if (callerOwned.get(spec.attr)) continue;

			if (ids.length === 0) {
				// Nothing claims it. A reference to a removed element is worse than
				// no reference: assistive technology reports the dialog as unlabelled
				// either way, but the dangling form hides that from any audit which
				// only checks the attribute is present.
				if (content.hasAttribute(spec.attr)) writeRef(spec.attr, null);
			} else if (content.getAttribute(spec.attr) !== ids[0]) {
				// Point at the first claimant in DOM order, so removing the active
				// one falls through to the next rather than dropping the label.
				writeRef(spec.attr, ids[0]);
			}
		}
	};

	deferOwned(owner, (o) => {
		sync();

		// Membership and identity are not reactive. Without this, a title mounted,
		// removed, moved or *renamed* after setup would leave the reference stale.
		//
		// Watching `id` and the two ARIA attributes cannot loop: every write below
		// is conditional on actually changing something, so a sync re-triggered by
		// our own write finds nothing to do and produces no further records.
		if (typeof MutationObserver === "undefined") return;
		const mo = new MutationObserver(() => {
			if (o.disposed()) return;
			sync();
		});
		mo.observe(content, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["id", "aria-labelledby", "aria-describedby"],
		});
		o.observer(mo);
	});
}
