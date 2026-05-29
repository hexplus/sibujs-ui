import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Badge } from "../src/components/badge";
import { Empty } from "../src/components/empty";
import { Skeleton } from "../src/components/skeleton";
import { normalizeArgs } from "../src/components/types";

// BUG 2 — sibujs-ui mirrors core tag(): a lone string is a TEXT child, but a
// lone string that looks like a class list warns loudly ("did you mean
// { class }?") so a styled placeholder doesn't silently render class names.

describe("BUG 2 — sibujs-ui lone class-like string warning", () => {
	let warn: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		warn = vi.spyOn(console, "warn").mockImplementation(() => {});
	});
	afterEach(() => {
		warn.mockRestore();
	});

	describe("normalizeArgs", () => {
		it("treats a lone string as nodes (text child), unchanged", () => {
			expect(normalizeArgs("h-6 w-48")).toEqual({ nodes: "h-6 w-48" });
		});

		it("warns for a class-like lone string", () => {
			normalizeArgs("h-6 w-48");
			expect(warn).toHaveBeenCalledTimes(1);
			expect(warn.mock.calls[0][0]).toContain("looks like a class list");
		});

		it("does NOT warn for prose", () => {
			normalizeArgs("No results found");
			expect(warn).not.toHaveBeenCalled();
		});

		it("string + children → class + nodes (no warning)", () => {
			expect(normalizeArgs("h-6 w-48", "child")).toEqual({
				class: "h-6 w-48",
				nodes: "child",
			});
			expect(warn).not.toHaveBeenCalled();
		});
	});

	describe("Skeleton", () => {
		it("renders class-like lone string as text but warns", () => {
			const el = Skeleton("h-6 w-48");
			expect(el.textContent).toBe("h-6 w-48");
			expect(warn).toHaveBeenCalledTimes(1);
		});

		it("the recommended { class } form sizes the placeholder without warning", () => {
			const el = Skeleton({ class: "h-6 w-48" });
			expect(el.className).toContain("h-6");
			expect(el.className).toContain("w-48");
			expect(el.textContent).toBe("");
			expect(warn).not.toHaveBeenCalled();
		});
	});

	describe("Badge", () => {
		it("renders a lone prose string as text without warning", () => {
			const el = Badge("New");
			expect(el.textContent).toBe("New");
			expect(warn).not.toHaveBeenCalled();
		});
	});

	describe("Empty", () => {
		it("renders a lone prose string as text without warning", () => {
			const el = Empty("Nothing here yet");
			expect(el.textContent).toBe("Nothing here yet");
			expect(warn).not.toHaveBeenCalled();
		});

		it("warns when a class-like string is passed alone", () => {
			Empty("flex-col gap-6");
			expect(warn).toHaveBeenCalledTimes(1);
		});
	});
});
