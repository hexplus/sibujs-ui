import { signal, untracked } from "sibujs";
import { nodeOwner } from "./lifecycle";

/**
 * Registry of item labels for list controls whose trigger shows a copy of the
 * selected item's label — Select and Combobox.
 *
 * Items register their label node once they find their control. Consumers
 * read {@link ItemLabelRegistry.label} inside an effect together with the
 * control's value, and re-render when either changes.
 *
 * ## Only the selected items matter
 *
 * The rendered label is a function of the *selected* item's label alone, so
 * the registry only announces a change when it concerns a selected value:
 * that item registering or unregistering, or its label content changing (a
 * translated label switching locale, say). Mounting N unselected items is
 * therefore silent — announcing every registration re-rendered the label N
 * times, and a consumer that scanned every item per render turned mounting a
 * list into O(N²) work.
 *
 * ## One observer
 *
 * Content changes are watched by a single MutationObserver per control rather
 * than one per item. It observes each label node directly instead of a
 * shared root, so labels inside portaled content are still seen. A label that
 * unregisters stays observed until the control is disposed (MutationObserver
 * has no per-target unobserve), but its records are ignored.
 */
export interface ItemLabelRegistry {
	/**
	 * Register the label node of the item with `value`. `ignore`, when given,
	 * is a subtree of `label` whose mutations are not label changes — a check
	 * indicator that is rewritten on every selection, for example.
	 *
	 * @returns The unregister handle.
	 */
	register(value: string, label: HTMLElement, ignore?: Node): () => void;
	/**
	 * The label node registered for `value`, if any. Reactive: an effect that
	 * reads it re-runs when a selected item's label is (un)registered or
	 * changes.
	 */
	label(value: string): HTMLElement | undefined;
}

interface Entry {
	value: string;
	ignore?: Node;
}

/**
 * Create the label registry for one control.
 *
 * @param owner    The control's root; the observer dies with it.
 * @param selected The currently selected values. Read untracked.
 */
export function createItemLabelRegistry(
	owner: Node,
	selected: () => string[],
): ItemLabelRegistry {
	const labels = new Map<string, HTMLElement>();
	const entries = new WeakMap<Node, Entry>();
	const [version, setVersion] = signal(0);
	let counter = 0;
	const announce = () => setVersion(++counter);

	const isSelected = (value: string) => untracked(selected).includes(value);

	/** The registered label containing `node`, with its entry. */
	const entryFor = (node: Node | null): [HTMLElement, Entry] | null => {
		for (let n = node; n; n = n.parentNode) {
			const entry = entries.get(n);
			if (entry) return [n as HTMLElement, entry];
		}
		return null;
	};

	let observer: MutationObserver | null = null;
	const observe = (label: HTMLElement) => {
		if (typeof MutationObserver === "undefined") return;
		if (!observer) {
			observer = new MutationObserver((records) => {
				for (const record of records) {
					const found = entryFor(record.target);
					if (!found) continue;
					const [label, entry] = found;
					// Unregistered, or replaced by another item with the same value.
					if (labels.get(entry.value) !== label) continue;
					if (entry.ignore?.contains(record.target)) continue;
					if (!isSelected(entry.value)) continue;
					announce();
					return;
				}
			});
			nodeOwner(owner).observer(observer);
		}
		observer.observe(label, {
			childList: true,
			subtree: true,
			characterData: true,
		});
	};

	return {
		register(value, label, ignore) {
			labels.set(value, label);
			entries.set(label, { value, ignore });
			observe(label);
			if (isSelected(value)) announce();

			return () => {
				if (labels.get(value) !== label) return;
				labels.delete(value);
				entries.delete(label);
				if (isSelected(value)) announce();
			};
		},
		label(value) {
			version();
			return labels.get(value);
		},
	};
}
