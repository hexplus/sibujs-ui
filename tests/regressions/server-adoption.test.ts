// ============================================================================
// Adopting hydration of server-rendered components
// ============================================================================
//
// `hydrate(App, root, { strategy: "adopt" })` builds the client tree on the
// server's nodes. It can only claim what the server rendered, so a component
// whose server markup lacked something the browser builds at once — a check
// icon, a Slider thumb, a DropdownMenu's content moved to <body> — was
// reported as a mismatch and rebuilt. A Checkbox also threw during takeover:
// its indicator was cleared and then refilled, and the icon that claimed the
// server's node had already been removed with the clearing.
//
// Each case is rendered with `{ hydration: "adopt" }`, then taken over in
// jsdom; the takeover must report no mismatch.

import * as ssr from "sibujs/ssr";
import * as testing from "sibujs/testing";
import { afterEach, describe, expect, it } from "vitest";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Checkbox,
	Combobox,
	ComboboxContent,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	RadioGroup,
	RadioGroupItem,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Slider,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../src/index";

type HydrateInTest = (
	html: string,
	app: () => Node,
	options: { strategy: "adopt" },
) => Promise<{ mismatches: unknown[]; cleanup(): void }>;

const hydrateInTest = (testing as unknown as { hydrateInTest?: HydrateInTest }).hydrateInTest;
const supported = typeof ssr.renderToStringAsync === "function" && typeof hydrateInTest === "function";

const cleanups: Array<() => void> = [];
afterEach(() => {
	for (const c of cleanups.splice(0)) c();
	document.body.replaceChildren();
});

async function adopt(build: () => Node): Promise<unknown[]> {
	const { html } = await ssr.renderToStringAsync(build, { hydration: "adopt" });
	const report = await (hydrateInTest as HydrateInTest)(html, build, { strategy: "adopt" });
	cleanups.push(() => report.cleanup());
	return report.mismatches;
}

const cases: Record<string, () => Node> = {
	Checkbox: () => Checkbox({ defaultChecked: true, name: "agree" }),
	RadioGroup: () =>
		RadioGroup({ defaultValue: "a", name: "plan" }, [RadioGroupItem({ value: "a" }), RadioGroupItem({ value: "b" })]),
	Tabs: () =>
		Tabs({ defaultValue: "a" }, [
			TabsList([TabsTrigger({ value: "a" }, "A"), TabsTrigger({ value: "b" }, "B")]),
			TabsContent({ value: "a" }, "Panel A"),
			TabsContent({ value: "b" }, "Panel B"),
		]),
	Accordion: () =>
		Accordion({ type: "single", defaultValue: "a" }, [
			AccordionItem({ value: "a" }, [AccordionTrigger("A"), AccordionContent("Body A")]),
			AccordionItem({ value: "b" }, [AccordionTrigger("B"), AccordionContent("Body B")]),
		]),
	Select: () =>
		Select({ defaultValue: "a" }, [
			SelectTrigger([SelectValue()]),
			SelectContent([SelectItem({ value: "a" }, "Apple"), SelectItem({ value: "b" }, "Banana")]),
		]),
	"Dialog (closed)": () => Dialog([DialogTrigger("Open"), DialogContent([DialogTitle("Title")])]),
	DropdownMenu: () => DropdownMenu([DropdownMenuTrigger("Menu"), DropdownMenuContent([DropdownMenuItem("Rename")])]),
	Combobox: () =>
		Combobox({ defaultValue: "a" }, [
			ComboboxInput(),
			ComboboxContent([ComboboxList([ComboboxItem({ value: "a" }, "Apple")])]),
		]),
	Slider: () => Slider({ defaultValue: [30, 70] }),
};

describe.skipIf(!supported)("adopting hydration of server-rendered components", () => {
	for (const [name, build] of Object.entries(cases)) {
		it(`${name} is taken over with no mismatch`, async () => {
			expect(await adopt(build)).toEqual([]);
		});
	}
});
