// @vitest-environment node
// ============================================================================
// Server markup carries the state the browser starts from
// ============================================================================
//
// Components wire their state after insertion — they find their compound
// parent with `closest()` in a microtask, then write `data-state`, `aria-*`
// and visibility from an effect. A server render runs no ordinary effect, so
// the server HTML had none of it: closed Select and menu panels rendered
// visible, Tabs and Accordion had no `data-state`, a DropdownMenu's content
// was moved to <body> and left the markup, ids came from process-wide counters
// or Math.random(), and ScrollArea relied on a <style> element the server
// never emits.
//
// Now the effects that only reflect state also run in a server render
// (`ownedEffect(…, { server: true })`, sibujs 4.14+), side effects (listeners,
// timers, focus, measuring, scroll locks, portals) stay in the browser, and
// ids come from `createId()`, which numbers per request on the server. These
// tests render on SibuJS's built-in server DOM — no jsdom, no `window` — and
// read the markup.

import * as ssr from "sibujs/ssr";
import { describe, expect, it } from "vitest";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	ChartContainer,
	Checkbox,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	RadioGroup,
	RadioGroupItem,
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SidebarMenuSkeleton,
	Slider,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../src/index";
import { closed, itemStates, open, renderWithLateValue } from "../helpers/accordion-settle";

const hasServerDom = typeof ssr.renderToStringAsync === "function";

async function serverRender(build: () => Node): Promise<string> {
	const { html } = await ssr.renderToStringAsync(build, { marker: "none" });
	return html;
}

/** The opening tag of the first element whose attributes contain `marker`. */
function tagWith(html: string, marker: string): string {
	const at = html.indexOf(marker);
	expect(at, `no element with ${marker}`).toBeGreaterThan(-1);
	return html.slice(html.lastIndexOf("<", at), html.indexOf(">", at) + 1);
}

const tabs = (value?: () => string) => () =>
	Tabs({ defaultValue: "a", value }, [
		TabsList([
			TabsTrigger({ value: "a" }, "A"),
			TabsTrigger({ value: "b" }, "B"),
		]),
		TabsContent({ value: "a" }, "Panel A"),
		TabsContent({ value: "b" }, "Panel B"),
	]);

describe.skipIf(!hasServerDom)("server markup carries component state", () => {
	it("Tabs marks the active trigger and hides the inactive panel", async () => {
		const html = await serverRender(tabs());
		const [a, b] = html.match(/<button[^>]*data-slot="tabs-trigger"[^>]*>/g) ?? [];
		expect(a).toContain('data-state="active"');
		expect(a).toContain('aria-selected="true"');
		expect(b).toContain('data-state="inactive"');
		const panels = html.match(/<div[^>]*data-slot="tabs-content"[^>]*>/g) ?? [];
		expect(panels[0]).not.toContain("display: none");
		expect(panels[1]).toContain("display: none");
	});

	it("a controlled getter decides the server markup, not the default", async () => {
		const html = await serverRender(tabs(() => "b"));
		const [a, b] = html.match(/<button[^>]*data-slot="tabs-trigger"[^>]*>/g) ?? [];
		expect(a).toContain('data-state="inactive"');
		expect(b).toContain('data-state="active"');
	});

	it("Accordion items and triggers carry their open state", async () => {
		const html = await serverRender(() =>
			Accordion({ type: "single", defaultValue: "a" }, [
				AccordionItem({ value: "a" }, [AccordionTrigger("A"), AccordionContent("Open")]),
				AccordionItem({ value: "b" }, [AccordionTrigger("B"), AccordionContent("Closed")]),
			]),
		);
		const items = html.match(/<div[^>]*data-slot="accordion-item"[^>]*>/g) ?? [];
		expect(items[0]).toContain('data-state="open"');
		expect(items[1]).toContain('data-state="closed"');
		const triggers = html.match(/<button[^>]*aria-expanded="[a-z]+"[^>]*>/g) ?? [];
		expect(triggers.map((t) => /aria-expanded="(\w+)"/.exec(t)?.[1])).toEqual(["true", "false"]);
	});

	it("Collapsible reflects open and closed", async () => {
		for (const open of [true, false]) {
			const html = await serverRender(() =>
				Collapsible({ open }, [CollapsibleTrigger("Toggle"), CollapsibleContent("Body")]),
			);
			expect(tagWith(html, 'data-slot="collapsible-trigger"')).toContain(
				`data-state="${open ? "open" : "closed"}"`,
			);
		}
	});

	it("Select hides its closed content, checks the selected item and shows its label", async () => {
		const html = await serverRender(() =>
			Select({ defaultValue: "a", name: "fruit" }, [
				SelectTrigger([SelectValue({ placeholder: "Pick" })]),
				SelectContent([SelectItem({ value: "a" }, "Apple"), SelectItem({ value: "b" }, "Banana")]),
			]),
		);
		const content = tagWith(html, 'data-slot="select-content"');
		expect(content).toContain("display: none");
		expect(content).toContain('data-state="closed"');
		const items = html.match(/<div[^>]*data-slot="select-item"[^>]*>/g) ?? [];
		expect(items[0]).toContain('aria-selected="true"');
		expect(items[1]).toContain('aria-selected="false"');
		const trigger = html.slice(html.indexOf('data-slot="select-trigger"'), html.indexOf('data-slot="select-content"'));
		expect(trigger).toContain("Apple");
		expect(trigger).not.toContain("Pick");
	});

	it("an open Dialog renders in place; a closed one renders hidden", async () => {
		const open = await serverRender(() =>
			Dialog({ open: true }, [DialogTrigger("Open"), DialogContent([DialogTitle("Title")])]),
		);
		expect(open).toContain("Title");
		expect(tagWith(open, 'data-slot="dialog-content"')).toContain('data-state="open"');
		expect(tagWith(open, 'data-slot="dialog-portal"')).toContain("display: contents");

		const closed = await serverRender(() =>
			Dialog({ open: false }, [DialogTrigger("Open"), DialogContent([DialogTitle("Title")])]),
		);
		expect(tagWith(closed, 'data-slot="dialog-content"')).toContain('data-state="closed"');
		expect(tagWith(closed, 'data-slot="dialog-portal"')).toContain("display: none");
	});

	it("DropdownMenu content stays in the markup, hidden while closed", async () => {
		const html = await serverRender(() =>
			DropdownMenu([DropdownMenuTrigger("Menu"), DropdownMenuContent([DropdownMenuItem("Rename")])]),
		);
		expect(html).toContain("Rename");
		const content = tagWith(html, 'data-slot="dropdown-menu-content"');
		expect(content).toContain('data-state="closed"');
		expect(content).toContain("display: none");
		expect(tagWith(html, 'data-slot="dropdown-menu-trigger"')).toContain('aria-expanded="false"');
	});

	it("Checkbox renders its check icon and a native input that submits without JavaScript", async () => {
		const html = await serverRender(() =>
			Checkbox({ defaultChecked: true, name: "agree", value: "yes", required: true }),
		);
		expect(html).toMatch(/data-slot="checkbox-indicator"[^>]*>\s*<svg/);
		const bridge = tagWith(html, 'data-slot="checkbox-form-bridge"');
		expect(bridge).toContain('name="agree"');
		expect(bridge).toContain('value="yes"');
		expect(bridge).toContain("checked");
		expect(bridge).toContain("required");
	});

	it("RadioGroup renders a native radio per item, the selected one checked", async () => {
		const html = await serverRender(() =>
			RadioGroup({ defaultValue: "b", name: "plan" }, [
				RadioGroupItem({ value: "a" }),
				RadioGroupItem({ value: "b" }),
			]),
		);
		const radios = html.match(/<input[^>]*data-slot="radio-form-bridge"[^>]*>/g) ?? [];
		expect(radios).toHaveLength(2);
		expect(radios[0]).toContain('value="a"');
		expect(radios[0]).not.toMatch(/\schecked/);
		expect(radios[1]).toContain('value="b"');
		expect(radios[1]).toMatch(/\schecked/);
		const items = html.match(/<button[^>]*data-slot="radio-group-item"[^>]*>/g) ?? [];
		expect(items[1]).toContain('data-state="checked"');
	});

	it("ids are the same on every request", async () => {
		// They came from counters shared by the whole process, so a second
		// request got `tabs-2` where the browser computes `tabs-1`.
		const first = await serverRender(tabs());
		const second = await serverRender(tabs());
		expect(second).toBe(first);
		expect(first).toMatch(/id="tab-tabs-\d+-a"/);
	});

	it("SidebarMenuSkeleton is the same on every request", async () => {
		const build = () => SidebarMenuSkeleton({ showIcon: true });
		const first = await serverRender(build);
		expect(await serverRender(build)).toBe(first);
		expect(first).toMatch(/--skeleton-width: \d+%/);
	});

	it("ScrollArea hides the WebKit scrollbar with a class, not a <style> element", async () => {
		const html = await serverRender(() => ScrollArea({ class: "h-20" }, ["Long content"]));
		expect(tagWith(html, 'data-slot="scroll-area-viewport"')).toContain("[&amp;::-webkit-scrollbar]:hidden");
		expect(html).not.toContain("data-scope-id");
	});

	// The inline color must be the one ChartStyle's stylesheet resolves in the
	// browser for the light theme, or the chart changes color on takeover. The
	// stylesheet writes `color` first and a nonempty `theme.light` after it,
	// under the same selector, so `theme.light` wins and an empty one does not.
	it.each([
		{ name: "base color only", entry: { color: "#2563eb" }, expected: "#2563eb" },
		{ name: "theme only", entry: { theme: { light: "#16a34a", dark: "#123456" } }, expected: "#16a34a" },
		{
			name: "theme.light overrides the base color",
			entry: { color: "#000000", theme: { light: "#ffffff", dark: "#123456" } },
			expected: "#ffffff",
		},
		{
			name: "an empty theme.light falls back to the base color",
			entry: { color: "#000000", theme: { light: "", dark: "#123456" } },
			expected: "#000000",
		},
	])("ChartContainer carries its light color inline, as its stylesheet resolves it: $name", async ({
		entry,
		expected,
	}) => {
		const html = await serverRender(() =>
			ChartContainer({ config: { desktop: { label: "Desktop", ...entry } } }, []),
		);
		const chart = tagWith(html, 'data-slot="chart"');
		expect(/--color-desktop:\s*([^;"]+)/.exec(chart)?.[1]?.trim()).toBe(expected);
	});

	it("InputOTP carries its maxlength, value and characters", async () => {
		const html = await serverRender(() =>
			InputOTP({ maxLength: 4, defaultValue: "12" }, [
				InputOTPGroup([InputOTPSlot({ index: 0 }), InputOTPSlot({ index: 1 })]),
			]),
		);
		const input = tagWith(html, 'data-slot="input-otp-hidden"');
		expect(input).toContain('maxlength="4"');
		expect(input).toContain('value="12"');
		expect(html).toMatch(/>1<\/span>/);
		expect(html).toMatch(/>2<\/span>/);
	});

	it("Slider renders one positioned thumb per value", async () => {
		const html = await serverRender(() => Slider({ defaultValue: [20, 60], max: 100 }));
		const thumbs = html.match(/<[^>]*role="slider"[^>]*>/g) ?? [];
		expect(thumbs).toHaveLength(2);
		expect(thumbs[0]).toContain('aria-valuenow="20"');
		expect(tagWith(html, 'data-slot="slider-range"')).toContain("width: 40%");
	});
});

// A controlled value can change while the render waits for async work. Item
// and trigger states followed it, but AccordionContent set its state once and
// updated it only from a browser effect, so the final HTML showed the earlier
// panel and hid the selected one.
describe.skipIf(!hasServerDom)("Accordion follows a controlled value that changes while the render settles", () => {
	it.each([
		{ name: "single, a → b", type: "single" as const, from: "a", to: "b", expected: [closed, open] },
		{ name: "single, closed → a", type: "single" as const, from: "", to: "a", expected: [open, closed] },
		{ name: "single, a → closed", type: "single" as const, from: "a", to: "", expected: [closed, closed] },
		{ name: "multiple, [a] → [b]", type: "multiple" as const, from: ["a"], to: ["b"], expected: [closed, open] },
		{ name: "multiple, [] → [a, b]", type: "multiple" as const, from: [], to: ["a", "b"], expected: [open, open] },
	])("$name", async ({ type, from, to, expected }) => {
		expect(itemStates(await renderWithLateValue(type, from, to))).toEqual(expected);
	});
});
