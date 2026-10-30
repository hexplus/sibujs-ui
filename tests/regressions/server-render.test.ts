// @vitest-environment node
// ============================================================================
// Server rendering on the built-in server DOM (no jsdom, no `window`)
// ============================================================================
//
// `renderToStringAsync` installs SibuJS's own server DOM when no DOM is
// registered. It implements what rendering needs and nothing a browser alone
// provides, so building these components threw there:
//
//   - Calendar cleared its day grid with `innerHTML = ""` (no HTML parser).
//   - Checkbox, Switch and RadioGroup set `defaultChecked` on their form bridge
//     input, and NativeSelect set `defaultSelected` on its default option —
//     setters the server DOM does not implement. RadioGroup did it in a
//     microtask, so the error escaped the render as an uncaught exception.
//   - ToggleGroupItem scheduled its styling with `requestAnimationFrame`.
//
// Each now uses an equivalent the server DOM has (the reflected content
// attribute, `replaceChildren()`, a microtask instead of a frame), and the
// server markup carries the state the browser starts from.
//
// `renderToStringAsync` and the server DOM arrived in SibuJS 4.14, so the CI
// compatibility jobs that install an older SibuJS skip this file.

import * as ssr from "sibujs/ssr";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	Calendar,
	Checkbox,
	NativeSelect,
	NativeSelectOption,
	RadioGroup,
	RadioGroupItem,
	Switch,
	ToggleGroup,
	ToggleGroupItem,
} from "../../src/index";

const uncaught: unknown[] = [];
const record = (err: unknown) => uncaught.push(err);

beforeEach(() => {
	uncaught.length = 0;
	process.on("uncaughtException", record);
});

afterEach(() => {
	process.off("uncaughtException", record);
});

/** Render on the server DOM, then let deferred work run before asserting. */
async function serverRender(build: () => Node): Promise<string> {
	const { html } = await ssr.renderToStringAsync(build, { marker: "none" });
	await new Promise((resolve) => setTimeout(resolve, 0));
	expect(uncaught).toEqual([]);
	return html;
}

const hasServerDom = typeof ssr.renderToStringAsync === "function";

describe.skipIf(!hasServerDom)("server render on the server DOM", () => {
	it("runs without a browser DOM", () => {
		expect(typeof window).toBe("undefined");
	});

	it("Calendar renders its month grid", async () => {
		const html = await serverRender(() =>
			Calendar({
				defaultMonth: new Date(2026, 0, 1),
				selected: new Date(2026, 0, 15),
			}),
		);
		expect(html).toContain('data-slot="calendar-grid"');
		expect(html).toContain(">31</");
	});

	it("Calendar renders a range in dropdown caption layout", async () => {
		const html = await serverRender(() =>
			Calendar({
				mode: "range",
				captionLayout: "dropdown",
				defaultMonth: new Date(2026, 0, 1),
				selected: { from: new Date(2026, 0, 3), to: new Date(2026, 0, 9) },
			}),
		);
		expect(html).toContain('data-slot="calendar-grid"');
	});

	it("Checkbox renders its checked default", async () => {
		const html = await serverRender(() =>
			Checkbox({ defaultChecked: true, name: "agree" }),
		);
		expect(html).toContain('data-state="checked"');
		expect(html).toContain('aria-checked="true"');
	});

	it("Switch renders its checked default", async () => {
		const html = await serverRender(() =>
			Switch({ defaultChecked: true, name: "notify" }),
		);
		expect(html).toContain('data-state="checked"');
	});

	it("RadioGroup renders without an uncaught error", async () => {
		const html = await serverRender(() =>
			RadioGroup({ defaultValue: "a", name: "plan" }, [
				RadioGroupItem({ value: "a" }),
				RadioGroupItem({ value: "b" }),
			]),
		);
		expect(html).toContain('data-slot="radio-group"');
		expect(html.match(/data-slot="radio-group-item"/g)).toHaveLength(2);
	});

	it("NativeSelect marks its default option as selected", async () => {
		const html = await serverRender(() =>
			NativeSelect({ defaultValue: "b", name: "size" }, [
				NativeSelectOption({ value: "a" }, "A"),
				NativeSelectOption({ value: "b" }, "B"),
			]),
		);
		expect(html).toMatch(/<option[^>]*value="b"[^>]*selected/);
		expect(html).not.toMatch(/<option[^>]*value="a"[^>]*selected/);
	});

	it("ToggleGroupItem takes the group's variant and size", async () => {
		const html = await serverRender(() =>
			ToggleGroup({ type: "single", variant: "outline", size: "sm" }, [
				ToggleGroupItem({ value: "a" }, "A"),
			]),
		);
		expect(html).toMatch(
			/data-slot="toggle-group-item"[^>]*data-variant="outline"[^>]*data-size="sm"/,
		);
	});
});
