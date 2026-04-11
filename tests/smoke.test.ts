// ============================================================================
// Smoke tests — every top-level component constructs without throwing
// ============================================================================
//
// A missing export, a typo in a `tagFactory("…")` call, an unbound
// context access, or a prototype pollution guard that now rejects a
// legitimate prop — all of these surface as a construction error the
// moment the component runs. This file walks every exported component
// and asserts it produces an HTMLElement. It is intentionally cheap
// and broad: one failure per regression, not a detailed assertion.

import { describe, expect, it } from "vitest";
import * as sibujsUi from "../src/index";

describe("smoke: every component constructs", () => {
	// Components that take no required props and return a single element.
	// This is the 80% case — most sibujs-ui primitives accept a shorthand
	// `Foo()` call with no arguments and return an HTMLElement.
	const simpleFactories = [
		"Accordion",
		"Alert",
		"AlertDescription",
		"AlertTitle",
		"AspectRatio",
		"Avatar",
		"AvatarFallback",
		"AvatarImage",
		"Badge",
		"Button",
		"ButtonGroup",
		"Card",
		"CardContent",
		"CardDescription",
		"CardFooter",
		"CardHeader",
		"CardTitle",
		"Checkbox",
		"Collapsible",
		"CollapsibleContent",
		"CollapsibleTrigger",
		"Dialog",
		"Empty",
		"EmptyDescription",
		"EmptyTitle",
		"Field",
		"FieldContent",
		"FieldDescription",
		"FieldGroup",
		"FieldLabel",
		"FieldLegend",
		"FieldSet",
		"FieldTitle",
		"Input",
		"InputGroup",
		"Item",
		"ItemContent",
		"ItemDescription",
		"ItemMedia",
		"ItemTitle",
		"Kbd",
		"Label",
		"NativeSelect",
		"NavigationMenu",
		"Pagination",
		"Popover",
		"Progress",
		"RadioGroup",
		"ScrollArea",
		"Select",
		"Separator",
		"Sheet",
		"Skeleton",
		"Slider",
		"Spinner",
		"Switch",
		"Table",
		"Tabs",
		"Textarea",
		"Toggle",
		"ToggleGroup",
		"Tooltip",
	] as const;

	for (const name of simpleFactories) {
		it(`${name}() constructs an Element`, () => {
			// biome-ignore lint/suspicious/noExplicitAny: dynamic dispatch by name
			const factory = (sibujsUi as any)[name];
			expect(typeof factory).toBe("function");
			const el = factory();
			// `Spinner` returns an SVG element, every other factory returns
			// an HTMLElement. Both are `Element`s, so the looser assertion
			// keeps the smoke test inclusive.
			expect(el).toBeInstanceOf(Element);
		});
	}

	it("exports the cn / cnReactive utilities", () => {
		expect(typeof sibujsUi.cn).toBe("function");
		expect(typeof sibujsUi.cnReactive).toBe("function");
	});

	it("exports BaseProps, normalizeArgs, toNodes", () => {
		expect(typeof sibujsUi.normalizeArgs).toBe("function");
		expect(typeof sibujsUi.toNodes).toBe("function");
	});
});
