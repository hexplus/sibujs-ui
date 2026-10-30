// Shared by the server-DOM and jsdom regressions for AccordionContent: a
// controlled Accordion whose value changes while a server render is still
// settling, and a reader for the per-item state in the resulting HTML.

import { signal } from "sibujs";
import * as ssr from "sibujs/ssr";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../src/index";

export type AccordionValue = string | string[];

/**
 * Render a controlled Accordion that starts at `from` and is set to `to` from
 * a short timer the render waits for (`prerenderWait`). The timer fires after
 * the components' deferred setup, which runs in microtasks.
 */
export async function renderWithLateValue(
	type: "single" | "multiple",
	from: AccordionValue,
	to: AccordionValue,
): Promise<string> {
	const { html } = await ssr.renderToStringAsync(
		() => {
			const [value, setValue] = signal<AccordionValue>(from);
			ssr.prerenderWait(
				new Promise<void>((resolve) => {
					setTimeout(() => {
						setValue(to);
						resolve();
					}, 5);
				}),
			);
			return Accordion(
				{ type, value },
				["a", "b"].map((itemValue) =>
					AccordionItem({ value: itemValue }, [
						AccordionTrigger(itemValue),
						AccordionContent(itemValue),
					]),
				),
			);
		},
		{ marker: "none" },
	);
	return html;
}

export interface ItemState {
	item: string | undefined;
	trigger: string | undefined;
	panel: string | undefined;
	visible: boolean;
}

/** The state of each item, in order, read from the opening tags. */
export function itemStates(html: string): ItemState[] {
	const items = html.match(/<div[^>]*data-slot="accordion-item"[^>]*>/g) ?? [];
	const triggers = html.match(/<button[^>]*aria-expanded="[a-z]+"[^>]*>/g) ?? [];
	const panels = html.match(/<div[^>]*data-slot="accordion-content"[^>]*>/g) ?? [];
	return items.map((item, i) => ({
		item: /data-state="(\w+)"/.exec(item)?.[1],
		trigger: /aria-expanded="(\w+)"/.exec(triggers[i] ?? "")?.[1],
		panel: /data-state="(\w+)"/.exec(panels[i] ?? "")?.[1],
		visible: !/display:\s*none/.test(panels[i] ?? ""),
	}));
}

/** What an item that is open (or closed) in the final value must show everywhere. */
export const open: ItemState = { item: "open", trigger: "true", panel: "open", visible: true };
export const closed: ItemState = { item: "closed", trigger: "false", panel: "closed", visible: false };
