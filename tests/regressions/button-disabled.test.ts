// ============================================================================
// Button.disabled accepts a getter, like the native button() factory
// ============================================================================
//
// `ButtonProps.disabled` was typed `boolean`, narrower than what the native
// SibuJS `button()` accepts (`boolean | (() => boolean)`), so a reactive
// disabled state needed a wrapper even though Button already hands the prop
// to the native factory unchanged. It now reuses the native prop type.

import { type ButtonProps as NativeButtonProps, signal } from "sibujs";
import { renderToString } from "sibujs/ssr";
import { describe, expect, expectTypeOf, it } from "vitest";
import { AlertDialogAction, Button, type ButtonProps } from "../../src/index";

describe("Button.disabled", () => {
	it("static true / false keep their existing behaviour", () => {
		const on = Button({ disabled: true }, "Save") as HTMLButtonElement;
		const off = Button({ disabled: false }, "Save") as HTMLButtonElement;
		const unset = Button("Save") as HTMLButtonElement;

		expect(on.disabled).toBe(true);
		expect(on.hasAttribute("disabled")).toBe(true);
		expect(off.disabled).toBe(false);
		expect(off.hasAttribute("disabled")).toBe(false);
		expect(unset.hasAttribute("disabled")).toBe(false);
	});

	it("a getter drives the property and the attribute reactively", () => {
		const [busy, setBusy] = signal(false);
		const btn = Button({ disabled: () => busy() }, "Save") as HTMLButtonElement;
		expect(btn.disabled).toBe(false);
		expect(btn.hasAttribute("disabled")).toBe(false);

		setBusy(true);
		expect(btn.disabled).toBe(true);
		expect(btn.hasAttribute("disabled")).toBe(true);

		setBusy(false);
		expect(btn.disabled).toBe(false);
		expect(btn.hasAttribute("disabled")).toBe(false);
	});

	it("a disabled button does not dispatch click to its handler", () => {
		const [busy, setBusy] = signal(true);
		let clicks = 0;
		const btn = Button(
			{ disabled: () => busy(), on: { click: () => clicks++ } },
			"Save",
		) as HTMLButtonElement;
		document.body.appendChild(btn);
		btn.click();
		expect(clicks).toBe(0);
		setBusy(false);
		btn.click();
		expect(clicks).toBe(1);
		btn.remove();
	});

	it("wrappers built on Button (AlertDialogAction) forward a getter too", () => {
		const [busy, setBusy] = signal(true);
		const btn = AlertDialogAction(
			{ disabled: () => busy() },
			"OK",
		) as HTMLButtonElement;
		expect(btn.disabled).toBe(true);
		setBusy(false);
		expect(btn.disabled).toBe(false);
	});

	it("server rendering writes the current value: present for true, absent for false", () => {
		const parsed = (html: string) => {
			const host = document.createElement("div");
			host.innerHTML = html;
			return host.querySelector("button") as HTMLButtonElement;
		};
		expect(
			parsed(renderToString(Button({ disabled: () => true }, "Save"))).hasAttribute(
				"disabled",
			),
		).toBe(true);
		expect(
			parsed(
				renderToString(Button({ disabled: () => false }, "Save")),
			).hasAttribute("disabled"),
		).toBe(false);
		expect(
			parsed(renderToString(Button({ disabled: true }, "Save"))).hasAttribute(
				"disabled",
			),
		).toBe(true);
	});

	it("types: the prop is exactly the native button's disabled type", () => {
		expectTypeOf<ButtonProps["disabled"]>().toEqualTypeOf<
			NativeButtonProps["disabled"]
		>();
		expectTypeOf<ButtonProps["disabled"]>().toEqualTypeOf<
			boolean | (() => boolean) | undefined
		>();

		const [flag] = signal(false);
		Button({ disabled: true });
		Button({ disabled: flag });
		Button({ disabled: () => flag() });
		// @ts-expect-error — a string is not a disabled state
		Button({ disabled: "yes" });
		// @ts-expect-error — nor is a getter of anything but boolean
		Button({ disabled: () => "yes" });
	});
});
