import { effect, signal } from "sibujs";
import { nodeOwner } from "./lifecycle";

/**
 * Result of {@link bindControlled}.
 *
 * Tuple-compatible with the original 3-element shape — existing callers that
 * destructure `[get, set, isControlled]` keep working unchanged — but a fourth
 * element carries the teardown for the controlled-prop subscription.
 */
export type ControlledBinding<T> = [
	get: () => T,
	set: (next: T) => void,
	isControlled: boolean,
	/**
	 * Stops the controlled-prop subscription. Safe to call more than once, and
	 * a no-op in uncontrolled mode. Already registered for you when an `owner`
	 * node was passed.
	 */
	teardown: () => void,
];

/**
 * Helper for shadcn-style controlled/uncontrolled component props.
 *
 * Accepts one of three shapes for the controlled prop:
 *  - `undefined`  → uncontrolled mode, seeded with `defaultValue`
 *  - a literal    → controlled with a static value (unusual but valid)
 *  - a getter `() => T` → controlled with a reactive signal; changes flow in
 *
 * Returns `[get, set, isControlled, teardown]` that callers can use just like a
 * regular `signal()` pair. In controlled mode, `set` is still callable —
 * components should still call it to keep an internal mirror accurate, but
 * should defer to the parent callback (`onOpenChange`, `onCheckedChange`, …)
 * for the source of truth.
 *
 * ## Ownership
 *
 * In controlled mode this subscribes to the parent's signal with `effect()`.
 * That subscription outlives the component unless somebody stops it, which is
 * exactly what used to happen here: the teardown was created and dropped, so a
 * disposed component kept reading the parent getter and kept writing to its own
 * detached DOM forever.
 *
 * Pass the component's in-tree root as `owner` and the subscription is released
 * with that node via `registerDisposer`. Callers that cannot name their root at
 * call time may instead take the returned `teardown` and register it later.
 *
 * For portaled components, `owner` must be the node that actually lives in the
 * caller's tree (the portal anchor/container), not the portaled content — the
 * anchor is what `dispose()` reaches.
 *
 * Before this helper existed, many components did:
 *    const [x, setX] = signal(controlled ?? defaultValue);
 * which broke when `controlled` was a function — the signal then held the
 * function itself rather than the unwrapped value.
 *
 * Named to match the existing `bindField()` pattern in sibujs/ui — this
 * codebase uses plain verbs/nouns rather than `use*` prefixes.
 *
 * @param controlled   The controlled prop: value, getter, or undefined
 * @param defaultValue Seed used in uncontrolled mode
 * @param owner        Optional DOM node owning the subscription's lifetime
 */
export function bindControlled<T>(
	controlled: T | (() => T) | undefined,
	defaultValue: T,
	owner?: Node,
): ControlledBinding<T> {
	const isControlled = controlled !== undefined;
	const seed =
		typeof controlled === "function"
			? defaultValue
			: ((controlled as T | undefined) ?? defaultValue);
	const [value, setValue] = signal<T>(seed);

	let teardown: () => void = () => {};

	if (typeof controlled === "function") {
		const stop = effect(() => {
			setValue((controlled as () => T)());
		});
		let stopped = false;
		teardown = () => {
			if (stopped) return;
			stopped = true;
			stop();
		};
		if (owner) nodeOwner(owner).add(teardown);
	}

	return [value, setValue, isControlled, teardown];
}
