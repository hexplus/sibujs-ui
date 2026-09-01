import { button as buttonTag, div, type NodeChildren, span } from "sibujs";
import { CircleIcon } from "../icons";
import { bindControlled } from "../lib/controlled";
import {
	attachGroupValidityBridge,
	attachRadioBridge,
} from "../lib/form-control";
import {
	deferOwned,
	isDisposed,
	nodeOwner,
	scopedEffect,
} from "../lib/lifecycle";
import { cnReactive } from "../lib/utils";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

export interface RadioGroupProps extends BaseProps {
	value?: string | (() => string);
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	/** Form field name. Required for the group to appear in FormData. */
	name?: string;
	/** Disables every item in the group. */
	disabled?: boolean;
	/** Enforced through real native radios, so `checkValidity()` works. */
	required?: boolean;
}

const ITEM_SELECTOR = "[data-slot=radio-group-item]";
const GROUP_SELECTOR = "[data-slot=radio-group]";

/**
 * Items this group actually owns, in DOM order.
 *
 * An item belongs to its *nearest* RadioGroup ancestor, so a nested group's
 * items never count towards the outer group's selection, validity or keyboard
 * navigation.
 */
function ownedItems(group: HTMLElement): HTMLElement[] {
	return Array.from(group.querySelectorAll<HTMLElement>(ITEM_SELECTOR)).filter(
		(item) => item.closest(GROUP_SELECTOR) === group,
	);
}

/** Owned, enabled items. Disabled items are never focusable. */
function enabledItems(group: HTMLElement): HTMLElement[] {
	return ownedItems(group).filter((item) => !item.hasAttribute("disabled"));
}

/**
 * Contract a RadioGroupItem exposes so its owning group can bind and unbind it.
 *
 * The item knows how to render itself; the group decides *which* context it
 * renders against. Keeping the binding replaceable is what lets an item be
 * mounted late, or moved between groups, without being disposed and rebuilt.
 */
interface RadioItemHandle {
	value: string;
	/** Bind to `ctx`; returns the binding's control handle. */
	attach(ctx: RadioGroupContext): RadioItemBinding;
}

/** A single group binding for one item. Both methods are idempotent. */
interface RadioItemBinding {
	/** Release this binding — a no-op once the item has been rebound elsewhere. */
	detach(): void;
	/** Re-read DOM-derived state (currently the effective disabled state). */
	refresh(): void;
}

/** The context a group publishes for its items. */
interface RadioGroupContext {
	value: () => string;
	select: (v: string) => void;
	name?: string;
	disabled?: boolean;
	required?: boolean;
	defaultValue: string;
}

export function RadioGroup(
	first?: RadioGroupProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<RadioGroupProps>(first, second);
	const {
		class: className,
		value: controlledValue,
		defaultValue = "",
		onValueChange,
		name,
		disabled,
		required,
		nodes,
		on,
		...rest
	} = props;

	const [value, setValue, isControlled, stopControlled] =
		bindControlled<string>(controlledValue, defaultValue);

	const select = (v: string) => {
		if (disabled) return;
		if (!isControlled) setValue(v);
		onValueChange?.(v);
	};

	/**
	 * Return the group to its reset default.
	 *
	 * Form reset is a *group*-level concern: only the group knows what its
	 * default is and what "nothing selected" means. Driving it from the items'
	 * native radios handled just one direction — an item becoming checked — so a
	 * reset that cleared the selection (any group whose `defaultValue` matches no
	 * item, which includes every group without one) left the control still
	 * showing a value the form had already dropped. It also never reached a
	 * nameless group at all, since those have no radio bridges to listen through.
	 *
	 * Unlike {@link select} this ignores `disabled`: a reset is not user input,
	 * and native disabled controls are reset too. Leaving a disabled group out of
	 * step with its form is the very desync this fixes.
	 *
	 * ## Controlled groups
	 *
	 * A controlled group cannot simply "return to its default": the value is not
	 * ours to set. All we may do is *ask*, once, via `onValueChange`, and then
	 * accept whatever the owner decides — which may be to accept the reset, to
	 * ignore it, or to answer later.
	 *
	 * That makes the final step mandatory rather than optional. The browser has
	 * already reset the native bridges by the time this runs, and when the owner
	 * ignores the request nothing changes the signal, so no reactive effect
	 * re-runs to put them back. The group would then display one value and submit
	 * another. Re-reading the authoritative value and reconciling closes that
	 * gap for every outcome: accepted, ignored, or still pending (in which case
	 * the ordinary reactive binding takes over when the answer arrives).
	 */
	const resetToDefault = () => {
		if (nodeOwner(el).disposed()) return;

		// Ask at most once, and never re-announce a value the group already holds.
		if (value() !== defaultValue) {
			if (!isControlled) setValue(defaultValue);
			onValueChange?.(defaultValue);
		}

		// Whatever the value is *now*, the native bridges were just reset out from
		// under it and must be brought back into line — along with the roving tab
		// stop and constraint validity.
		reconcile();
	};

	/**
	 * Radio keyboard model: the group is a single tab stop, and arrows move
	 * between items, selecting as they go. Disabled items are skipped entirely.
	 */
	const moveFocus = (from: HTMLElement, delta: number | "first" | "last") => {
		const items = enabledItems(el);
		if (items.length === 0) return;
		let next: HTMLElement;
		if (delta === "first") next = items[0];
		else if (delta === "last") next = items[items.length - 1];
		else {
			const idx = items.indexOf(from);
			// Wrap around, matching native radio group behaviour.
			const target =
				idx === -1 ? 0 : (idx + delta + items.length) % items.length;
			next = items[target];
		}
		const nextValue = next.getAttribute("data-value") ?? "";
		select(nextValue);
		next.focus();
	};

	const el = div({
		"data-slot": "radio-group",
		role: "radiogroup",
		"aria-required": required ? "true" : undefined,
		"data-disabled": disabled ? "true" : undefined,
		class: cnReactive("grid gap-3", className),
		nodes,
		on: {
			...on,
			keydown: (ev: Event) => {
				const kev = ev as KeyboardEvent;

				// Two independent responsibilities, deliberately kept apart.
				//
				// (1) Internal navigation, which is *conditional*. The event also
				//     bubbles up from nested groups, so this group navigates only for
				//     an enabled item it directly owns.
				//
				// (2) The consumer's `on.keydown`, which is *unconditional*: it is a
				//     listener on this element and must see every keydown delivered
				//     here — owned or bubbled, navigation key or not, enabled or not.
				//     Navigation eligibility used to `return` early and swallow it,
				//     turning an internal ownership rule into a public API gap.
				//
				// Propagation is never stopped to enforce ownership; an outer group
				// declining to navigate must not make the event disappear.
				const target = (kev.target as HTMLElement | null)?.closest?.(
					ITEM_SELECTOR,
				) as HTMLElement | null;

				const navigable =
					!!target &&
					!disabled &&
					!target.hasAttribute("disabled") &&
					target.closest(GROUP_SELECTOR) === el;

				if (navigable) {
					// `preventDefault` stays scoped to keys this group actually acts on.
					switch (kev.key) {
						case "ArrowDown":
						case "ArrowRight":
							kev.preventDefault();
							moveFocus(target, 1);
							break;
						case "ArrowUp":
						case "ArrowLeft":
							kev.preventDefault();
							moveFocus(target, -1);
							break;
						case "Home":
							kev.preventDefault();
							moveFocus(target, "first");
							break;
						case "End":
							kev.preventDefault();
							moveFocus(target, "last");
							break;
						default:
							break;
					}
				}

				(on as Record<string, (ev: Event) => void>)?.keydown?.(kev);
			},
		},
		...rest,
	}) as HTMLElement;

	nodeOwner(el).add(stopControlled);

	const ctx: RadioGroupContext = {
		value,
		select,
		name,
		disabled,
		required,
		defaultValue,
	};
	(el as ElementWithContext).__radioGroup = ctx;

	/**
	 * Roving tab stop: exactly one enabled item is tabbable — the selected one,
	 * or the first enabled item when nothing valid is selected. Without this
	 * every item would be its own tab stop, which is not how a radio group
	 * behaves.
	 */
	const applyRovingTabIndex = () => {
		const current = value();
		// Owned items only: a nested RadioGroup's items belong to that group, and
		// touching them here left the inner group with no tab stop at all.
		const all = ownedItems(el);
		const enabled = all.filter((item) => !item.hasAttribute("disabled"));

		const selected = enabled.find(
			(item) => item.getAttribute("data-value") === current,
		);
		// A selected-but-disabled or absent item cannot hold the tab stop, so it
		// falls to the first enabled item instead.
		const tabStop = selected ?? enabled[0];

		for (const item of all) {
			item.tabIndex = item === tabStop ? 0 : -1;
		}
	};

	/**
	 * The group's current selection, or "" when it is not a valid choice.
	 *
	 * Compares `data-value` while iterating the group's own items rather than
	 * building an attribute selector: consumer values are arbitrary strings, and
	 * partial selector escaping is a bug waiting to happen.
	 */
	const validSelection = (): string => {
		const current = value();
		if (!current) return "";
		for (const item of ownedItems(el)) {
			if (item.getAttribute("data-value") !== current) continue;
			return item.hasAttribute("disabled") ? "" : current;
		}
		return "";
	};

	// Nameless required groups validate through a single group-level input;
	// named groups use the per-item native radios instead.
	const validity = name
		? { refresh: () => {} }
		: attachGroupValidityBridge(el, {
				required,
				disabled,
				selection: validSelection,
			});

	/**
	 * Items currently bound to this group, with their detach handles.
	 *
	 * This registry is the single membership model: the same reconciliation pass
	 * maintains item bindings, the roving tab stop and constraint validity, so
	 * they cannot drift apart.
	 */
	const registry = new Map<HTMLElement, RadioItemBinding>();

	const reconcile = () => {
		if (nodeOwner(el).disposed()) return;

		const owned = ownedItems(el);
		const ownedSet = new Set(owned);

		// Items that left this group (moved elsewhere, or removed).
		for (const [item, binding] of registry) {
			if (!ownedSet.has(item)) {
				binding.detach();
				registry.delete(item);
			}
		}

		for (const item of owned) {
			const existing = registry.get(item);
			if (existing) {
				// Retained: push current DOM state into the bridge. Without this a
				// `disabled` attribute added after registration never reached the
				// native radio, which kept submitting.
				existing.refresh();
				continue;
			}
			// A disposed item must never be revived by a later mount.
			if (isDisposed(item)) continue;
			const handle = (item as ElementWithContext).__radioGroupItem as
				| RadioItemHandle
				| undefined;
			if (!handle) continue;
			registry.set(item, handle.attach(ctx));
		}

		applyRovingTabIndex();
		validity.refresh();
	};

	deferOwned(el, (owner) => {
		reconcile();

		// Selection changes are reactive; membership changes are not, so they
		// arrive through the observer below.
		scopedEffect(el, () => {
			value();
			applyRovingTabIndex();
			validity.refresh();
		});

		/**
		 * Follow the owning form's reset.
		 *
		 * Delegated from the document rather than bound to a specific form: the
		 * `reset` event bubbles, so one owner-released listener stays correct even
		 * if the group is later moved into a different form, with no form-tracking
		 * observer of its own.
		 */
		if (typeof document !== "undefined") {
			owner.listen(document, "reset", (ev: Event) => {
				const target = ev.target;
				if (!(target instanceof HTMLFormElement)) return;
				if (!target.contains(el)) return;
				// The reset event fires *before* controls are restored, so act on
				// the next microtask — the same timing the native bridges use.
				queueMicrotask(resetToDefault);
			});
		}

		/**
		 * DOM membership is not reactive. Without this, an item inserted, removed,
		 * moved or disabled after initialization would keep a stale binding, a
		 * stale tab stop and stale validity. Scoped to this group's subtree and
		 * disposed with it; `tabindex` is deliberately absent from the attribute
		 * filter so our own writes cannot re-trigger the observer.
		 */
		if (typeof MutationObserver !== "undefined") {
			const mo = new MutationObserver((records) => {
				if (owner.disposed()) return;
				// The native bridges we manage live inside this subtree, so their own
				// attribute writes must not feed back into reconciliation.
				const relevant = records.some(
					(r) =>
						!(r.target instanceof HTMLElement) ||
						!r.target.hasAttribute("data-slot") ||
						!String(r.target.getAttribute("data-slot")).endsWith(
							"-form-bridge",
						),
				);
				if (!relevant) return;
				reconcile();
			});
			mo.observe(el, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ["disabled", "data-value"],
			});
			owner.observer(mo);
		}

		// Releasing the group releases every binding it owns. Items already moved
		// elsewhere were dropped from the registry when they left, so their new
		// group's binding is untouched.
		owner.add(() => {
			for (const [, binding] of registry) binding.detach();
			registry.clear();
		});
	});

	return el as HTMLElement;
}

export interface RadioGroupItemProps extends BaseProps {
	value: string;
	disabled?: boolean;
}

export function RadioGroupItem(
	first?: RadioGroupItemProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<RadioGroupItemProps>(first, second);
	const { class: className, value: itemValue, disabled, on, ...rest } = props;

	const indicatorWrapper = span({
		"data-slot": "radio-group-indicator",
		class: "relative flex items-center justify-center",
	});

	const el = buttonTag(
		{
			"data-slot": "radio-group-item",
			"data-value": itemValue,
			type: "button",
			role: "radio",
			disabled,
			class: cnReactive(
				"aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
				className,
			),
			on: {
				...on,
				click: (ev: Event) => {
					if (disabled) return;
					const groupEl = (ev.currentTarget as HTMLElement).closest(
						"[data-slot=radio-group]",
					);
					if (groupEl)
						(groupEl as ElementWithContext).__radioGroup?.select(itemValue);
					(on as Record<string, (ev: Event) => void>)?.click?.(ev);
				},
			},
			...rest,
		},
		[indicatorWrapper],
	) as HTMLElement;

	/**
	 * The item's single authoritative binding.
	 *
	 * Group observers fire in the order their observers were created, not in the
	 * order of the DOM operation. When the destination group's observer ran
	 * first, it installed the new binding and the source group's observer then
	 * ran a *stale* detach that stripped the ARIA state, indicator and bridge the
	 * new binding had just installed. A binding is therefore identified by a
	 * token: only the current token may mutate the item, so any stale detach
	 * degrades to a no-op.
	 */
	let currentBinding: { token: object; teardown: () => void } | null = null;

	/**
	 * Bind this item to a group context.
	 *
	 * Attaching retires the previous binding immediately, so exactly one group
	 * effect, one native bridge, one reset listener and one indicator renderer
	 * exist at any time. Moving an item never disposes it.
	 */
	const attach = (ctx: RadioGroupContext): RadioItemBinding => {
		// Retire whatever came before, right now — not whenever the old group's
		// observer happens to get around to it.
		currentBinding?.teardown();

		const token = {};

		/** This item's effective disabled state, re-read on demand. */
		const effectivelyDisabled = () =>
			!!disabled || el.hasAttribute("disabled") || !!ctx.disabled;

		const stopEffect = scopedEffect(el, () => {
			const isSelected = ctx.value() === itemValue;
			el.setAttribute("aria-checked", String(isSelected));
			el.setAttribute("data-state", isSelected ? "checked" : "unchecked");
			indicatorWrapper.replaceChildren();
			if (isSelected) {
				indicatorWrapper.appendChild(
					CircleIcon({
						class:
							"absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary",
					}),
				);
			}
		});

		// Native radio bridge — the group name makes the browser enforce
		// single-selection, required validation and reset for us.
		const bridge = attachRadioBridge(el, {
			name: ctx.name,
			value: itemValue,
			required: ctx.required,
			disabled: effectivelyDisabled,
			defaultSelected: ctx.defaultValue === itemValue,
			selected: () => ctx.value() === itemValue,
			// Reset is handled once, by the owning group — see `resetToDefault`.
			// An item cannot do it correctly on its own: it only ever learns that
			// *it* became checked, never that the group's selection was cleared,
			// and it would double-announce `onValueChange` alongside the group.
			onReset: () => {},
		});

		const teardown = () => {
			// Only the binding that is still current may tear anything down.
			if (currentBinding?.token !== token) return;
			currentBinding = null;
			stopEffect();
			bridge.detach();
			// Leave no stale state from the group this item just left.
			el.removeAttribute("aria-checked");
			el.removeAttribute("data-state");
			indicatorWrapper.replaceChildren();
		};

		currentBinding = { token, teardown };

		return {
			detach: teardown,
			refresh: () => {
				if (currentBinding?.token !== token) return;
				bridge.refresh();
			},
		};
	};

	// Create the owner up front. Without it, disposing an item that was never
	// attached to a group would find no owner to mark, and a later mount would
	// lazily create a fresh, undisposed one and bind the dead item.
	nodeOwner(el);

	(el as ElementWithContext).__radioGroupItem = {
		value: itemValue,
		attach,
	} satisfies RadioItemHandle;

	return el;
}
