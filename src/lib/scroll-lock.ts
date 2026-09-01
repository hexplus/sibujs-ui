/**
 * Reference-counted body scroll lock shared by every modal-like component
 * (Dialog, AlertDialog, Sheet, Drawer).
 *
 * ## Why this exists
 *
 * Each component used to do its own `document.body.style.overflow = "hidden"`
 * on open and `document.body.style.overflow = ""` on close. That is wrong in
 * four separate ways:
 *
 *  - Mounting an *initially closed* modal ran the "closed" branch of its
 *    visibility effect once, erasing whatever `overflow` the page had set.
 *  - Closing one modal unlocked the page while another modal was still open.
 *  - Disposal restored `""` rather than the value that was actually there.
 *  - The four components had no idea the others existed.
 *
 * ## Semantics
 *
 *  - The **first** acquisition snapshots the exact inline `overflow` value and
 *    its CSS priority, then applies `hidden`.
 *  - Further acquisitions only increment the count; they never re-snapshot, so
 *    the value captured is always the page's own, never another modal's
 *    `hidden`.
 *  - Releasing while other locks remain leaves the page locked.
 *  - Releasing the **last** lock restores the snapshot byte-for-byte: the
 *    original value *and* priority, or removal of the property entirely when
 *    there was no inline `overflow` to begin with.
 *
 * Each holder gets its own handle from {@link createScrollLock}; a handle can
 * be acquired and released repeatedly but never double-counts, so rapid
 * open/close/open transitions and a disposal that races a close can't drive the
 * shared counter negative or strand it above zero.
 *
 * Safe to import without a DOM (SSR): nothing touches `document` at module
 * scope, and every operation no-ops when there is no `document.body`.
 */

interface Snapshot {
	value: string;
	priority: string;
}

let lockCount = 0;
let snapshot: Snapshot | null = null;

function body(): HTMLElement | null {
	if (typeof document === "undefined") return null;
	return document.body ?? null;
}

/** Number of currently held locks. Exposed for tests and debugging. */
export function scrollLockCount(): number {
	return lockCount;
}

function acquireShared(): void {
	const el = body();
	if (!el) return;
	if (lockCount === 0) {
		// First lock: remember exactly what was there before we touch it.
		snapshot = {
			value: el.style.getPropertyValue("overflow"),
			priority: el.style.getPropertyPriority("overflow"),
		};
		el.style.setProperty("overflow", "hidden");
	}
	lockCount++;
}

function releaseShared(): void {
	const el = body();
	if (!el) return;
	if (lockCount === 0) return;
	lockCount--;
	if (lockCount > 0) return;

	// Last lock released: restore the original inline state precisely.
	const snap = snapshot;
	snapshot = null;
	if (!snap || snap.value === "") {
		el.style.removeProperty("overflow");
		return;
	}
	el.style.setProperty("overflow", snap.value, snap.priority || undefined);
}

/**
 * A single holder's handle on the shared lock.
 *
 * `acquire()` and `release()` are idempotent with respect to *this* handle:
 * acquiring twice counts once, releasing twice releases once, and releasing a
 * handle that never acquired does nothing.
 */
export interface ScrollLock {
	acquire(): void;
	release(): void;
	/** Whether this particular handle currently holds the lock. */
	held(): boolean;
}

/** Create an independent handle on the shared body scroll lock. */
export function createScrollLock(): ScrollLock {
	let holding = false;
	return {
		acquire() {
			if (holding) return;
			holding = true;
			acquireShared();
		},
		release() {
			if (!holding) return;
			holding = false;
			releaseShared();
		},
		held() {
			return holding;
		},
	};
}

/**
 * Test-only reset. Drops all outstanding locks and forgets the snapshot
 * without touching the DOM, so one test's leaked lock cannot pollute the next.
 */
export function __resetScrollLock(): void {
	lockCount = 0;
	snapshot = null;
}
