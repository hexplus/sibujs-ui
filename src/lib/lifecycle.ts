import { type EffectBody, effect, onMount, registerDisposer } from "sibujs";

/**
 * Ownership helper that ties arbitrary teardown work to a DOM node's lifetime.
 *
 * sibujs gives us `registerDisposer(node, teardown)` and `dispose(node)`, but
 * components in this package repeatedly need three things on top of that:
 *
 *  1. A single place to collect *many* teardowns for one node without
 *     registering N separate disposers.
 *  2. A way to know whether the node has already been disposed — components
 *     that finish their wiring inside `queueMicrotask()` can be disposed
 *     before that microtask ever runs, and must not install a subscription,
 *     timer or global listener afterwards.
 *  3. Convenience wrappers so timers, animation frames, observers and
 *     document/window listeners are released together with reactive effects,
 *     rather than each call site remembering to do it by hand.
 *
 * Every teardown registered here is run exactly once. Running cleanup twice
 * (explicit `dispose()` after an ancestor already disposed, for example) is a
 * no-op, matching the framework's "all disposers MUST be idempotent" contract.
 */
export interface Owner {
	/**
	 * Register a teardown to run when the owning node is disposed.
	 * If the node is *already* disposed, the teardown runs immediately so
	 * late-arriving work can never leak.
	 */
	add(teardown: () => void): void;
	/**
	 * Register a teardown that can also be released *early*, before the node is
	 * disposed, by calling the returned handle.
	 *
	 * Use for bindings that are replaceable during the node's lifetime — a
	 * RadioGroupItem re-registering with a different group, for example. The
	 * handle is idempotent, and releasing it drops the entry so repeated
	 * re-binding cannot accumulate dead closures on a long-lived node.
	 */
	addScoped(teardown: () => void): () => void;
	/** True once the owning node has been disposed. */
	disposed(): boolean;
	/**
	 * Run `fn` in a microtask, unless the owning node is disposed by then.
	 * Use for post-insertion wiring that must not resurrect a dead component.
	 */
	defer(fn: () => void): void;
	/** `addEventListener` whose removal is tied to the owner. */
	listen(
		target: EventTarget,
		type: string,
		handler: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	): void;
	/**
	 * `setTimeout` that is cleared on disposal, and whose teardown is dropped
	 * once the timer has fired so repeated scheduling cannot accumulate.
	 */
	timeout(fn: () => void, ms: number): ReturnType<typeof setTimeout>;
	/**
	 * `setInterval` that is cleared on disposal. Unlike the one-shot helpers its
	 * teardown is retained for the timer's whole life, because that is exactly
	 * how long the interval runs.
	 */
	interval(fn: () => void, ms: number): ReturnType<typeof setInterval>;
	/**
	 * `requestAnimationFrame` that is cancelled on disposal, and whose teardown
	 * is dropped once the frame has run.
	 */
	raf(fn: FrameRequestCallback): number;
	/** Track a disconnectable observer (Mutation/Resize/Intersection). */
	observer(o: { disconnect: () => void }): void;
}

const OWNER = Symbol.for("sibujs-ui.owner");

type OwnerHost = Node & { [OWNER]?: Owner };

/**
 * Get (or lazily create) the Owner for a DOM node.
 *
 * The Owner is cached on the node itself, so repeated calls from different
 * component helpers share one disposed-flag and one teardown list, and only a
 * single aggregate disposer is registered with sibujs.
 */
export function nodeOwner(node: Node): Owner {
	const host = node as OwnerHost;
	const existing = host[OWNER];
	if (existing) return existing;

	let isDisposed = false;
	// A Set rather than an array so a scoped teardown can be released early
	// without leaving a dead closure behind. Insertion order is preserved, so
	// reverse iteration still tears down innermost-first.
	let teardowns: Set<() => void> | null = new Set();

	const runAll = (): void => {
		if (isDisposed) return;
		isDisposed = true;
		const pending = [...(teardowns ?? [])];
		teardowns = null;
		// Run in reverse registration order (innermost wiring first) and never
		// let one failing teardown strand the rest.
		for (let i = pending.length - 1; i >= 0; i--) {
			try {
				pending[i]();
			} catch (err) {
				console.error("[sibujs-ui] teardown failed during dispose", err);
			}
		}
	};

	const owner: Owner = {
		add(teardown) {
			if (isDisposed) {
				// Already torn down — run now rather than retain a dead closure.
				try {
					teardown();
				} catch (err) {
					console.error("[sibujs-ui] late teardown failed", err);
				}
				return;
			}
			teardowns?.add(teardown);
		},
		addScoped(teardown) {
			let done = false;
			const release = () => {
				if (done) return;
				done = true;
				teardowns?.delete(release);
				try {
					teardown();
				} catch (err) {
					console.error("[sibujs-ui] scoped teardown failed", err);
				}
			};
			owner.add(release);
			return release;
		},
		disposed() {
			return isDisposed;
		},
		defer(fn) {
			queueMicrotask(() => {
				if (isDisposed) return;
				fn();
			});
		},
		listen(target, type, handler, options) {
			target.addEventListener(type, handler, options);
			owner.add(() => target.removeEventListener(type, handler, options));
		},
		timeout(fn, ms) {
			// One-shot, so the cancellation teardown is released as soon as the
			// timer has fired. Retaining it would cost one dead closure per call
			// for the node's whole life — unbounded for a component that schedules
			// a timer per interaction. The callback is also made inert after
			// disposal: a timer that already reached the task queue cannot be
			// cleared, and must not mutate DOM whose owner is gone.
			let release: () => void = () => {};
			const id = setTimeout(() => {
				release();
				if (isDisposed) return;
				fn();
			}, ms);
			release = owner.addScoped(() => clearTimeout(id));
			return id;
		},
		interval(fn, ms) {
			// Deliberately *not* self-releasing: an interval has no completion, so
			// its teardown must live exactly as long as the timer it clears.
			const id = setInterval(() => {
				if (isDisposed) return;
				fn();
			}, ms);
			owner.add(() => clearInterval(id));
			return id;
		},
		raf(fn) {
			// Same one-shot contract as `timeout`: release the cancellation once
			// the frame has run, and make the callback inert after disposal, since
			// a frame already dequeued by the browser cannot be cancelled.
			let release: () => void = () => {};
			const id = requestAnimationFrame((t) => {
				release();
				if (isDisposed) return;
				fn(t);
			});
			release = owner.addScoped(() => cancelAnimationFrame(id));
			return id;
		},
		observer(o) {
			owner.add(() => o.disconnect());
		},
	};

	host[OWNER] = owner;
	registerDisposer(node, runAll);
	return owner;
}

/**
 * True when `node` has an Owner that has already been disposed.
 *
 * Cheap read-only probe — unlike `nodeOwner()` it does not attach an Owner to
 * nodes that never had one.
 */
export function isDisposed(node: Node): boolean {
	return (node as OwnerHost)[OWNER]?.disposed() ?? false;
}

/**
 * Create an `effect()` whose subscription is owned by `owner`.
 *
 * This is the replacement for the bare `effect(...)` calls that used to be
 * scattered through the components: the teardown returned by `effect()` was
 * discarded, so the subscription outlived the element and kept writing to
 * detached DOM.
 *
 * If `owner` is already disposed the effect is never created at all, which is
 * what makes the `queueMicrotask` race safe — see {@link deferOwned}.
 *
 * @param owner The in-tree node whose lifetime governs the subscription. For
 *   portaled content this must be the anchor/container that actually lives in
 *   the caller's tree, since that is the node `dispose()` can reach.
 */
export function ownedEffect(
	owner: Node,
	body: EffectBody | (() => void),
): void {
	scopedEffect(owner, body);
}

/**
 * Like {@link ownedEffect}, but returns an idempotent handle that stops the
 * effect early.
 *
 * The subscription still dies with the node if the handle is never called, so
 * this is strictly a superset of `ownedEffect`. Use it for effects belonging to
 * a binding that can be replaced while the node lives on.
 */
export function scopedEffect(
	owner: Node,
	body: EffectBody | (() => void),
): () => void {
	const o = nodeOwner(owner);
	if (o.disposed()) return () => {};
	const stop = effect(body);
	return o.addScoped(stop);
}

/**
 * Run `fn` once `owner` is connected to the document, skipping it entirely if
 * the node is disposed first.
 *
 * `deferOwned()` only waits a microtask, which is enough for a component built
 * and inserted in the same synchronous pass. A component may instead be
 * constructed detached and mounted an arbitrary time later — a Checkbox built
 * into a variable, or returned from a factory, and appended to a form only
 * afterwards. Work that genuinely needs a parent (inserting a form bridge next
 * to the control) must wait for the mount rather than give up on it.
 *
 * Delegates to sibujs's own `onMount`, which watches through one shared
 * MutationObserver that disconnects as soon as nothing is waiting on it, and
 * unregisters the watcher when the element is disposed. Nothing global or
 * permanent is installed here.
 */
export function whenConnected(owner: Node, fn: () => void): void {
	const o = nodeOwner(owner);
	if (o.disposed()) return;

	// Returns undefined explicitly: sibujs's onMount treats a returned function
	// as an unmount cleanup, which is not what this helper provides.
	const guarded = (): undefined => {
		if (o.disposed()) return undefined;
		fn();
		return undefined;
	};

	// Non-elements (and DOM-less environments) cannot be mount-watched; fall
	// back to the microtask behaviour so callers keep working.
	if (typeof document === "undefined" || !(owner instanceof HTMLElement)) {
		queueMicrotask(guarded);
		return;
	}

	onMount(guarded, owner);
}

/**
 * Run post-insertion wiring for `owner` in a microtask, skipping it entirely if
 * the node was disposed in the meantime.
 *
 * Components finish their wiring after insertion so they can find their
 * compound-component context with `closest()`. Between construction and that
 * microtask the element can already have been disposed — by a `when()` branch
 * flipping, an `each()` row being removed, or an explicit `dispose()`. Running
 * the setup anyway installed a fresh effect and fresh document listeners on a
 * dead component, which nothing would ever release.
 *
 * The callback receives the node's {@link Owner} so timers, listeners and
 * observers created during setup are released with it.
 */
export function deferOwned(owner: Node, setup: (o: Owner) => void): void {
	const o = nodeOwner(owner);
	queueMicrotask(() => {
		if (o.disposed()) return;
		setup(o);
	});
}
