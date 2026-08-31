import {
	deferOwned,
	nodeOwner,
	scopedEffect,
	whenConnected,
} from "./lifecycle";

/**
 * Native form bridge for components that render a custom control.
 *
 * Checkbox, Switch and RadioGroup all render `<button type="button">` elements
 * so they can be styled freely. A button is not a successful form control, so
 * these components accepted `name` / `value` / `required` props and then
 * produced no entry in `new FormData(form)` and took no part in constraint
 * validation at all.
 *
 * The fix is the approach Radix uses: keep the custom control exactly as it is
 * and pair it with a real, visually hidden native input that mirrors its state.
 * The native input is what the form actually sees, so `FormData`,
 * `checkValidity()`, `reportValidity()` and form reset all behave natively
 * without the component giving up its appearance.
 *
 * ## Why visually hidden rather than `display: none` / `type="hidden"`
 *
 * A `display: none` (or `hidden`) control is barred from constraint
 * validation in some paths and, when it is not, browsers refuse to focus it to
 * show the validation bubble — Chrome logs "An invalid form control … is not
 * focusable" and silently blocks submission. `input[type=hidden]` is barred
 * from constraint validation outright, so `required` would be a lie. A
 * visually hidden but rendered input keeps real validation working.
 *
 * ## Avoiding duplicate tab stops and duplicate entries
 *
 * The bridge input is `aria-hidden` with `tabindex="-1"`, so it is skipped by
 * both the tab order and the accessibility tree — the styled button remains the
 * only focusable, announced control. Exactly one bridge input is created per
 * component instance, and it is removed on disposal, so no duplicate form
 * entries can appear.
 */

/** Inline styles that hide the input without removing it from layout/validation. */
const VISUALLY_HIDDEN =
	"position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;opacity:0;pointer-events:none;";

function createBridgeInput(type: "checkbox" | "radio"): HTMLInputElement {
	const input = document.createElement("input");
	input.type = type;
	input.setAttribute("data-slot", `${type}-form-bridge`);
	input.setAttribute("aria-hidden", "true");
	input.tabIndex = -1;
	input.setAttribute("style", VISUALLY_HIDDEN);
	return input;
}

export interface CheckboxBridgeOptions {
	/** Form field name. Without one the control is not successful, natively. */
	name?: string;
	/** Submitted value while checked. Defaults to `"on"`, as native checkboxes do. */
	value?: string;
	required?: boolean;
	disabled?: boolean;
	/** Value the control returns to on form reset. */
	defaultChecked: boolean;
	/** Current checked state of the custom control. */
	checked: () => boolean;
	/** Called when a form reset changes the state, so the component can follow. */
	onReset: (checked: boolean) => void;
}

/**
 * Attach a checkbox-shaped native bridge next to `root`.
 *
 * Does nothing unless `name` or `required` is set — matching native behaviour,
 * where a nameless, non-required checkbox contributes nothing to a form.
 * The input is inserted as `root`'s next sibling and removed on disposal.
 */
export function attachCheckboxBridge(
	root: HTMLElement,
	opts: CheckboxBridgeOptions,
): () => void {
	if (!opts.name && !opts.required) return () => {};

	const input = createBridgeInput("checkbox");
	if (opts.name) input.name = opts.name;
	// Native checkboxes submit "on" when no value attribute is present.
	if (opts.value !== undefined) input.value = opts.value;
	if (opts.required) input.required = true;
	if (opts.disabled) input.disabled = true;
	// `defaultChecked` drives the content attribute, which is what form reset
	// restores — it must reflect the component's own default, not its current state.
	input.defaultChecked = opts.defaultChecked;
	input.checked = opts.defaultChecked;

	return bindBridge(root, input, opts.checked, opts.onReset);
}

/** Handle returned by {@link attachGroupValidityBridge}. */
export interface GroupValidityHandle {
	/** Recompute validity after a membership or disabled-state change. */
	refresh(): void;
}

export interface GroupValidityOptions {
	/** Whether the group is required. */
	required?: boolean;
	/** Whether the whole group is disabled. */
	disabled?: boolean;
	/**
	 * The group's current *valid* selection, or `""` when there is none.
	 * A selection pointing at a disabled or absent item must report `""`.
	 */
	selection: () => string;
}

/**
 * Attach a group-level constraint-validation bridge for a RadioGroup that has
 * no public `name`.
 *
 * ## Why a single nameless input rather than named radios
 *
 * Native radios form one validation group only when they share a `name` *and* a
 * form owner; per the HTML spec an element with an empty name belongs to no
 * radio group at all. The previous bridge left nameless radios unnamed, so the
 * browser treated each one as its own required group — a group with one item
 * selected still reported invalid, because the *other* required "groups" were
 * empty. Generating a shared name would fix validation but would then submit a
 * synthetic field the consumer never asked for.
 *
 * A single nameless input avoids both problems. Constraint validation applies
 * to every submittable control regardless of name, so `required` is enforced
 * for real; but a control without a name is not successful, so it contributes
 * nothing to `FormData`. One input per group means two nameless groups validate
 * independently, and no generated name or id can collide between instances.
 *
 * Does nothing unless the group is `required` — without it there is no
 * constraint to enforce and no reason to add a node.
 */
export function attachGroupValidityBridge(
	root: HTMLElement,
	opts: GroupValidityOptions,
): GroupValidityHandle {
	if (!opts.required) return { refresh: () => {} };

	const input = document.createElement("input");
	input.type = "text";
	input.required = true;
	// Deliberately no `name`: enforced by validation, absent from FormData.
	input.setAttribute("data-slot", "radio-group-validity-bridge");
	input.setAttribute("aria-hidden", "true");
	input.tabIndex = -1;
	input.setAttribute("style", VISUALLY_HIDDEN);

	/**
	 * Recompute validity from the group's *current* state.
	 *
	 * Exposed imperatively because the inputs to this decision are not all
	 * reactive: whether the selected value still corresponds to an enabled item
	 * belonging to this group depends on DOM membership and on the `disabled`
	 * attribute, and neither is a signal. The group calls this from the same
	 * reconciliation pass that maintains its roving tab stop, so membership is
	 * modelled once rather than twice.
	 */
	const refresh = () => {
		if (nodeOwner(root).disposed()) return;
		input.disabled = !!opts.disabled;
		input.value = opts.selection();
	};

	// Selection changes arrive reactively; membership changes via refresh().
	scopedEffect(root, refresh);

	// Form reset is handled by the items' own state; nothing to do here beyond
	// keeping the input beside its group.
	bindPlacement(root, input, () => {});

	return { refresh };
}

/**
 * Handle for a bridge whose owner may outlive a single binding.
 *
 * `refresh()` re-reads the current-state getters. It exists because some of a
 * radio's inputs are DOM state rather than signals — an item's `disabled`
 * attribute can change with no reactive notification — so the owning group
 * pushes an update from its reconciliation pass.
 */
export interface RadioBridgeHandle {
	detach(): void;
	refresh(): void;
}

export interface RadioBridgeOptions {
	name?: string;
	value: string;
	required?: boolean;
	/**
	 * Current effective disabled state, read on every refresh.
	 *
	 * A getter rather than a boolean: the bridge used to capture this once at
	 * creation, so disabling the visible button left its native radio enabled
	 * and still submitting.
	 */
	disabled?: () => boolean;
	/** Whether this item is the group's reset default. */
	defaultSelected: boolean;
	/** Whether this item is currently selected. */
	selected: () => boolean;
	/** Called when a form reset changes the selection. */
	onReset: (selected: boolean) => void;
}

/**
 * Attach a radio-shaped native bridge next to `root`.
 *
 * All items in one group share the `name`, so the browser enforces "only one
 * value may be successful" and `required` for free.
 */
export function attachRadioBridge(
	root: HTMLElement,
	opts: RadioBridgeOptions,
): RadioBridgeHandle {
	// Without a public name a native radio belongs to no radio group, so it can
	// neither submit nor validate meaningfully. Nameless groups are validated by
	// attachGroupValidityBridge() on the group element instead.
	if (!opts.name) return { detach: () => {}, refresh: () => {} };

	const input = createBridgeInput("radio");
	if (opts.name) input.name = opts.name;
	input.value = opts.value;
	if (opts.required) input.required = true;

	const currentlyDisabled = () => opts.disabled?.() ?? false;
	/**
	 * A disabled radio is never checked.
	 *
	 * Being barred from constraint validation is not enough on its own: for a
	 * radio group the `required` constraint is satisfied when *any* member is
	 * checked, so a selected-but-disabled member would keep an otherwise empty
	 * required group looking valid — while contributing nothing to FormData.
	 */
	const currentlyChecked = () => opts.selected() && !currentlyDisabled();

	input.disabled = currentlyDisabled();
	input.defaultChecked = opts.defaultSelected;
	input.checked = opts.defaultSelected && !currentlyDisabled();

	const detach = bindBridge(root, input, currentlyChecked, opts.onReset);

	let detached = false;
	return {
		detach() {
			if (detached) return;
			detached = true;
			detach();
		},
		refresh() {
			// A retired binding must never touch the input the current one owns.
			if (detached) return;
			const nextDisabled = currentlyDisabled();
			// Write only on an actual change: the bridge lives inside the group's
			// observed subtree, so an unconditional attribute write would
			// re-trigger the group's MutationObserver and loop forever.
			if (input.disabled !== nextDisabled) input.disabled = nextDisabled;
			const nextChecked = currentlyChecked();
			if (input.checked !== nextChecked) input.checked = nextChecked;
		},
	};
}

/**
 * Shared wiring: keep the input beside its control wherever that control ends
 * up, mirror component state onto it, follow form resets back into the
 * component, and clean everything up on disposal.
 *
 * ## Why this is not a one-shot insertion
 *
 * The bridge used to be inserted from a single `deferOwned()` microtask that
 * gave up when `root.parentNode` was null. A control constructed detached and
 * appended to a form later therefore never got a bridge at all, and silently
 * vanished from `FormData`. Placement now waits for the control to be
 * connected, and re-runs whenever the control moves.
 *
 * Exactly one input node exists per control for its whole life: `place()` only
 * ever *moves* that node with `insertBefore`, never clones it, so no lifecycle
 * activity can produce a duplicate form entry.
 */
function bindBridge(
	root: HTMLElement,
	input: HTMLInputElement,
	checked: () => boolean,
	onReset: (checked: boolean) => void,
): () => void {
	// Mirror component state onto the native input. Scoped, so the subscription
	// dies with the component *and* can be released early when the binding is
	// replaced — a RadioGroupItem moving to a different group, for instance.
	const stopMirror = scopedEffect(root, () => {
		input.checked = checked();
	});

	const stopPlacement = bindPlacement(root, input, () =>
		onReset(input.checked),
	);

	let released = false;
	return () => {
		if (released) return;
		released = true;
		stopMirror();
		stopPlacement();
	};
}

/**
 * Keep `input` positioned immediately after `root`, following it across mounts
 * and moves, and wire the owning form's reset event.
 *
 * Shared by the checkbox/radio bridges and the group validity bridge.
 */
export function bindPlacement(
	root: HTMLElement,
	input: HTMLInputElement,
	onReset: () => void,
): () => void {
	const owner = nodeOwner(root);
	let released = false;

	let parentObserver: MutationObserver | null = null;
	let observedParent: Node | null = null;
	let boundForm: HTMLFormElement | null = null;
	let removeFormListener: (() => void) | null = null;
	let mountArmed = false;

	const stopObservingParent = () => {
		parentObserver?.disconnect();
		parentObserver = null;
		observedParent = null;
	};

	const unbindForm = () => {
		removeFormListener?.();
		removeFormListener = null;
		boundForm = null;
	};

	/** Bind the reset listener to whichever form currently owns the input. */
	const bindForm = () => {
		const form = input.form;
		if (form === boundForm) return;
		unbindForm();
		if (!form) return;
		boundForm = form;
		// The reset event fires *before* controls are restored, so read the
		// input back on the next microtask to learn what the browser chose.
		const handler = () => {
			queueMicrotask(() => {
				if (owner.disposed()) return;
				onReset();
			});
		};
		form.addEventListener("reset", handler);
		removeFormListener = () => form.removeEventListener("reset", handler);
	};

	/**
	 * Watch the control's current parent so a move (or removal) is noticed.
	 * Scoped to that one parent — never the document — and replaced whenever
	 * the control lands somewhere new.
	 */
	const observeParent = (parent: Node) => {
		if (observedParent === parent) return;
		stopObservingParent();
		if (typeof MutationObserver === "undefined") return;
		observedParent = parent;
		parentObserver = new MutationObserver(() => {
			if (released || owner.disposed()) return;
			// Only react when the control itself moved away or the bridge was
			// displaced; otherwise sibling churn would cause pointless work.
			if (root.parentNode !== parent || input.previousSibling !== root) {
				place();
			}
		});
		parentObserver.observe(parent, { childList: true });
	};

	/** Wait for the next mount, at most one outstanding watch at a time. */
	const armMountWatch = () => {
		if (mountArmed || released || owner.disposed()) return;
		mountArmed = true;
		whenConnected(root, () => {
			mountArmed = false;
			place();
		});
	};

	function place(): void {
		if (released || owner.disposed()) return;

		const parent = root.parentNode;
		if (!parent) {
			// Detached: take the bridge with the control so no stale input is
			// left behind in the old form, and wait for the next mount.
			input.remove();
			stopObservingParent();
			unbindForm();
			armMountWatch();
			return;
		}

		// Move (never clone) the single bridge node into place.
		if (input.parentNode !== parent || input.previousSibling !== root) {
			parent.insertBefore(input, root.nextSibling);
		}
		observeParent(parent);
		bindForm();
	}

	if (root.isConnected) {
		// Synchronously mounted controls keep their existing timing: the bridge
		// appears on the microtask after construction.
		deferOwned(root, place);
	} else {
		armMountWatch();
	}

	// Scoped, so a caller can detach this bridge without disposing the control
	// it belongs to.
	return owner.addScoped(() => {
		released = true;
		stopObservingParent();
		unbindForm();
		input.remove();
	});
}
