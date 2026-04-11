import { effect, signal } from "sibujs";

/**
 * Helper for shadcn-style controlled/uncontrolled component props.
 *
 * Accepts one of three shapes for the controlled prop:
 *  - `undefined`  → uncontrolled mode, seeded with `defaultValue`
 *  - a literal    → controlled with a static value (unusual but valid)
 *  - a getter `() => T` → controlled with a reactive signal; changes flow in
 *
 * Returns a tuple `[get, set, isControlled]` that callers can use just like a
 * regular `signal()` pair. In controlled mode, `set` is still callable —
 * components should still call it to keep an internal mirror accurate, but
 * should defer to the parent callback (`onOpenChange`, `onCheckedChange`, …)
 * for the source of truth.
 *
 * Before this helper existed, many components did:
 *    const [x, setX] = signal(controlled ?? defaultValue);
 * which broke when `controlled` was a function — the signal then held the
 * function itself rather than the unwrapped value.
 *
 * Named to match the existing `bindField()` pattern in sibujs/ui — this
 * codebase uses plain verbs/nouns rather than `use*` prefixes.
 */
export function bindControlled<T>(
	controlled: T | (() => T) | undefined,
	defaultValue: T,
): [() => T, (next: T) => void, boolean] {
	const isControlled = controlled !== undefined;
	const seed =
		typeof controlled === "function"
			? defaultValue
			: ((controlled as T | undefined) ?? defaultValue);
	const [value, setValue] = signal<T>(seed);

	if (typeof controlled === "function") {
		effect(() => {
			setValue((controlled as () => T)());
		});
	}

	return [value, setValue, isControlled];
}
