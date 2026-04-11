import { div, type NodeChildren, registerDisposer } from "sibujs";
import { cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

// ── ScrollArea ───────────────────────────────────────────────────────────────

export interface ScrollAreaProps extends BaseProps {
	/** Scrollbar visibility: "auto" hides when idle, "always" keeps visible,
	 *  "scroll" shows only while scrolling, "hover" shows on hover. */
	type?: "auto" | "always" | "scroll" | "hover";
	/** Delay in ms before auto-hiding the scrollbar (default 600). */
	scrollHideDelay?: number;
}

export function ScrollArea(
	first?: ScrollAreaProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ScrollAreaProps>(first, second);
	const {
		class: className,
		type = "hover",
		scrollHideDelay = 600,
		nodes,
		...rest
	} = props;

	// Viewport — scrollable container with native scrollbar hidden
	const viewport = div({
		"data-slot": "scroll-area-viewport",
		class:
			"size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
		style: "overflow:scroll;scrollbar-width:none",
		nodes,
	}) as HTMLElement;

	// Also hide scrollbar in WebKit
	const styleEl = document.createElement("style");
	const scopeId = `sa-${Math.random().toString(36).slice(2, 8)}`;
	styleEl.textContent = `[data-scope-id="${scopeId}"]::-webkit-scrollbar{display:none}`;
	viewport.setAttribute("data-scope-id", scopeId);

	// Vertical scrollbar
	const vThumb = div({
		"data-slot": "scroll-area-thumb",
		class: "rounded-full bg-border",
		style: "position:absolute;right:0;width:100%",
	}) as HTMLElement;

	const vBar = div(
		{
			"data-slot": "scroll-area-scrollbar",
			"data-orientation": "vertical",
			class:
				"touch-none select-none transition-colors absolute top-0 right-0 h-full w-2.5 border-l border-l-transparent p-px",
			style: "opacity:0;transition:opacity 200ms",
		},
		[vThumb],
	) as HTMLElement;

	// Horizontal scrollbar
	const hThumb = div({
		"data-slot": "scroll-area-thumb",
		class: "rounded-full bg-border",
		style: "position:absolute;bottom:0;height:100%",
	}) as HTMLElement;

	const hBar = div(
		{
			"data-slot": "scroll-area-scrollbar",
			"data-orientation": "horizontal",
			class:
				"touch-none select-none transition-colors absolute bottom-0 left-0 w-full h-2.5 border-t border-t-transparent p-px",
			style: "opacity:0;transition:opacity 200ms",
		},
		[hThumb],
	) as HTMLElement;

	// Corner (when both scrollbars visible)
	const corner = div({
		"data-slot": "scroll-area-corner",
		class: "absolute right-0 bottom-0 bg-transparent",
	}) as HTMLElement;

	// Root
	const root = div(
		{
			"data-slot": "scroll-area",
			class: cnReactive("relative", className),
			...rest,
		},
		[styleEl, viewport, vBar, hBar, corner],
	) as HTMLElement;

	// ── Scrollbar logic ──────────────────────────────────────────────────

	let hideTimer: ReturnType<typeof setTimeout> | null = null;
	let isHovering = false;

	function showBars(): void {
		if (hideTimer) {
			clearTimeout(hideTimer);
			hideTimer = null;
		}
		// Only show bars that have scrollable content
		if (viewport.scrollHeight > viewport.clientHeight) {
			vBar.style.opacity = "1";
		}
		if (viewport.scrollWidth > viewport.clientWidth) {
			hBar.style.opacity = "1";
		}
	}

	function hideBars(): void {
		if (type === "always") return;
		if (hideTimer) clearTimeout(hideTimer);
		hideTimer = setTimeout(() => {
			if (!isHovering || type !== "hover") {
				vBar.style.opacity = "0";
				hBar.style.opacity = "0";
			}
		}, scrollHideDelay);
	}

	function updateThumbs(): void {
		const vh = viewport.clientHeight;
		const sh = viewport.scrollHeight;
		const vw = viewport.clientWidth;
		const sw = viewport.scrollWidth;

		// Vertical thumb
		if (sh > vh) {
			const trackH = vBar.clientHeight;
			const ratio = vh / sh;
			const thumbH = Math.max(ratio * trackH, 20);
			const scrollRange = sh - vh;
			const trackRange = trackH - thumbH;
			const top =
				scrollRange > 0 ? (viewport.scrollTop / scrollRange) * trackRange : 0;
			vThumb.style.height = `${thumbH}px`;
			vThumb.style.top = `${top}px`;
			vBar.style.display = "";
		} else {
			vBar.style.display = "none";
		}

		// Horizontal thumb
		if (sw > vw) {
			const trackW = hBar.clientWidth;
			const ratio = vw / sw;
			const thumbW = Math.max(ratio * trackW, 20);
			const scrollRange = sw - vw;
			const trackRange = trackW - thumbW;
			const left =
				scrollRange > 0 ? (viewport.scrollLeft / scrollRange) * trackRange : 0;
			hThumb.style.width = `${thumbW}px`;
			hThumb.style.left = `${left}px`;
			hBar.style.display = "";
		} else {
			hBar.style.display = "none";
		}

		// Corner
		const hasV = sh > vh;
		const hasH = sw > vw;
		corner.style.display = hasV && hasH ? "" : "none";
		if (hasV && hasH) {
			corner.style.width = "10px";
			corner.style.height = "10px";
		}
	}

	// Update on scroll
	viewport.addEventListener("scroll", () => {
		updateThumbs();
		if (type === "scroll" || type === "auto") {
			showBars();
			hideBars();
		}
	});

	// Hover behavior
	if (type === "hover" || type === "auto") {
		root.addEventListener("mouseenter", () => {
			isHovering = true;
			showBars();
		});
		root.addEventListener("mouseleave", () => {
			isHovering = false;
			hideBars();
		});
	}

	// Always-visible mode
	if (type === "always") {
		queueMicrotask(() => {
			updateThumbs();
			showBars();
		});
	}

	// ── Thumb drag ────────────────────────────────────────────────────────

	function setupDrag(
		_thumb: HTMLElement,
		bar: HTMLElement,
		orientation: "vertical" | "horizontal",
	): void {
		let isDragging = false;
		let startPos = 0;
		let startScroll = 0;

		bar.addEventListener("pointerdown", ((ev: PointerEvent) => {
			const isVert = orientation === "vertical";

			// If click is on the track (not the thumb), jump to that position
			if (ev.target === bar) {
				const rect = bar.getBoundingClientRect();
				const clickPos = isVert
					? ev.clientY - rect.top
					: ev.clientX - rect.left;
				const trackSize = isVert ? rect.height : rect.width;
				const scrollSize = isVert
					? viewport.scrollHeight - viewport.clientHeight
					: viewport.scrollWidth - viewport.clientWidth;
				const ratio = clickPos / trackSize;
				if (isVert) {
					viewport.scrollTop = ratio * scrollSize;
				} else {
					viewport.scrollLeft = ratio * scrollSize;
				}
				updateThumbs();
			}

			// Start dragging
			isDragging = true;
			startPos = isVert ? ev.clientY : ev.clientX;
			startScroll = isVert ? viewport.scrollTop : viewport.scrollLeft;
			bar.setPointerCapture(ev.pointerId);
			ev.preventDefault();
		}) as EventListener);

		bar.addEventListener("pointermove", ((ev: PointerEvent) => {
			if (!isDragging) return;
			const isVert = orientation === "vertical";
			const currentPos = isVert ? ev.clientY : ev.clientX;
			const delta = currentPos - startPos;

			const viewportSize = isVert
				? viewport.clientHeight
				: viewport.clientWidth;
			const scrollSize = isVert ? viewport.scrollHeight : viewport.scrollWidth;
			const scrollRange = scrollSize - viewportSize;
			const trackRange = viewportSize;
			const scrollDelta = (delta / trackRange) * scrollRange;

			if (isVert) {
				viewport.scrollTop = startScroll + scrollDelta;
			} else {
				viewport.scrollLeft = startScroll + scrollDelta;
			}
			updateThumbs();
		}) as EventListener);

		const stopDrag = ((ev: PointerEvent) => {
			if (!isDragging) return;
			isDragging = false;
			bar.releasePointerCapture(ev.pointerId);
		}) as EventListener;

		bar.addEventListener("pointerup", stopDrag);
		bar.addEventListener("pointercancel", stopDrag);
	}

	setupDrag(vThumb, vBar, "vertical");
	setupDrag(hThumb, hBar, "horizontal");

	// Initial update after DOM mount
	queueMicrotask(() => updateThumbs());

	// Observe content size changes
	if (typeof ResizeObserver !== "undefined") {
		const ro = new ResizeObserver(() => {
			updateThumbs();
			if (type === "always") showBars();
		});
		ro.observe(viewport);
		// Observe first child too (content changes)
		queueMicrotask(() => {
			if (viewport.firstElementChild) {
				ro.observe(viewport.firstElementChild);
			}
		});
		// Tie the observer to the root element's disposer so an unmounted
		// scroll-area does not leave the ResizeObserver holding references
		// to its viewport and content closure.
		registerDisposer(root, () => ro.disconnect());
	}

	return root;
}

// ── ScrollBar (standalone) ───────────────────────────────────────────────────

export interface ScrollBarProps extends BaseProps {
	orientation?: "vertical" | "horizontal";
}

/** Standalone ScrollBar — used when you need to customise scrollbar appearance
 *  outside of the built-in ScrollArea scrollbar. */
export function ScrollBar(
	first?: ScrollBarProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ScrollBarProps>(first, second);
	const { class: className, orientation = "vertical", ...rest } = props;

	return div(
		{
			"data-slot": "scroll-area-scrollbar",
			"data-orientation": orientation,
			class: cnReactive(
				"flex touch-none p-px transition-colors select-none",
				orientation === "vertical" &&
					"h-full w-2.5 border-l border-l-transparent",
				orientation === "horizontal" &&
					"h-2.5 flex-col border-t border-t-transparent",
				className,
			),
			...rest,
		},
		[
			div({
				"data-slot": "scroll-area-thumb",
				class: "relative flex-1 rounded-full bg-border",
			}),
		],
	) as HTMLElement;
}
