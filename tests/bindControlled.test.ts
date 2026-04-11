// ============================================================================
// bindControlled — shared helper for shadcn-style controlled props
// ============================================================================
//
// This helper is the fix for a historical bug where 10 components stored
// a reactive getter as the literal signal value instead of subscribing to
// it. These tests lock the three accepted shapes (undefined / literal /
// function) and verify the internal signal reflects external changes.

import { describe, expect, it } from "vitest";
import { signal } from "sibujs";
import { bindControlled } from "../src/lib/controlled";

describe("bindControlled", () => {
	it("treats undefined as uncontrolled and seeds from defaultValue", () => {
		const [get, , isControlled] = bindControlled<boolean>(undefined, false);
		expect(get()).toBe(false);
		expect(isControlled).toBe(false);
	});

	it("treats a literal as controlled and uses it directly", () => {
		const [get, , isControlled] = bindControlled<string>("ready", "idle");
		expect(get()).toBe("ready");
		expect(isControlled).toBe(true);
	});

	it("treats a getter as controlled and mirrors its value", () => {
		const [source, setSource] = signal("first");
		const [get, , isControlled] = bindControlled<string>(source, "fallback");
		expect(isControlled).toBe(true);
		// Initial value is the current getter value, NOT the function itself
		expect(get()).toBe("first");

		// External update propagates through the internal mirror
		setSource("second");
		expect(get()).toBe("second");
	});

	it("internal set() works in uncontrolled mode", () => {
		const [get, set] = bindControlled<number>(undefined, 0);
		expect(get()).toBe(0);
		set(42);
		expect(get()).toBe(42);
	});

	it("never stores the getter function itself as the signal value", () => {
		const getter = () => true;
		const [get] = bindControlled<boolean>(getter, false);
		// If the helper regresses to `signal(controlled ?? defaultValue)`,
		// the value would be the function itself — String(fn()) would yield
		// the function body. Assert the unwrapped boolean instead.
		expect(typeof get()).toBe("boolean");
		expect(get()).toBe(true);
	});
});
