// ============================================================================
// AccordionContent follows a late controlled value — under jsdom
// ============================================================================
//
// The same scenario as the server-DOM cases in server-markup.test.ts, with
// jsdom registered as the DOM: a server render under a full DOM emulation
// must end in the same state. The value changes from "a" to "b" while the
// render waits for a registered promise; every part of each item, the panel's
// visibility included, must show the final value.

import * as ssr from "sibujs/ssr";
import { describe, expect, it } from "vitest";
import { closed, itemStates, open, renderWithLateValue } from "../helpers/accordion-settle";

const hasAsyncRender = typeof ssr.renderToStringAsync === "function";

describe.skipIf(!hasAsyncRender)("Accordion server render under jsdom", () => {
	it("shows panel b and hides panel a after the value changes from a to b", async () => {
		expect(typeof window).toBe("object");
		expect(itemStates(await renderWithLateValue("single", "a", "b"))).toEqual([closed, open]);
	});
});
