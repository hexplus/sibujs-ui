import { div, effect, type NodeChildren, signal, span } from "sibujs";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons";
import { cn } from "../lib/utils";
import { Button, type ButtonProps } from "./button";
import {
	type BaseProps,
	type ElementWithContext,
	normalizeArgs,
} from "./types";

// ── Carousel ─────────────────────────────────────────────────────────────────

export interface CarouselProps extends BaseProps {
	orientation?: "horizontal" | "vertical";
	opts?: {
		align?: "start" | "center" | "end";
		loop?: boolean;
	};
}

export function Carousel(
	first?: CarouselProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<CarouselProps>(first, second);
	const {
		class: className,
		orientation = "horizontal",
		opts,
		nodes,
		...rest
	} = props;

	const [canScrollPrev, setCanScrollPrev] = signal(false);
	const [canScrollNext, setCanScrollNext] = signal(true);

	const el = div({
		"data-slot": "carousel",
		"data-orientation": orientation,
		role: "region",
		"aria-roledescription": "carousel",
		class: cn("relative", className),
		nodes,
		...rest,
	}) as HTMLElement;

	function getContentEl(): HTMLElement | null {
		return el.querySelector(
			"[data-slot=carousel-content]",
		) as HTMLElement | null;
	}

	function updateScrollState() {
		const content = getContentEl();
		if (!content) return;

		const isVertical = orientation === "vertical";
		if (isVertical) {
			setCanScrollPrev(content.scrollTop > 0);
			setCanScrollNext(
				content.scrollTop + content.clientHeight < content.scrollHeight - 1,
			);
		} else {
			setCanScrollPrev(content.scrollLeft > 0);
			setCanScrollNext(
				content.scrollLeft + content.clientWidth < content.scrollWidth - 1,
			);
		}
	}

	(el as ElementWithContext).__carousel = {
		orientation,
		opts,
		canScrollPrev,
		canScrollNext,
		scrollPrev: () => {
			const content = getContentEl();
			if (!content) return;
			const isVertical = orientation === "vertical";
			const itemEl = content.querySelector(
				"[data-slot=carousel-item]",
			) as HTMLElement | null;
			const scrollAmount = itemEl
				? isVertical
					? itemEl.offsetHeight
					: itemEl.offsetWidth
				: isVertical
					? content.clientHeight
					: content.clientWidth;
			content.scrollBy({
				[isVertical ? "top" : "left"]: -scrollAmount,
				behavior: "smooth",
			});
			setTimeout(updateScrollState, 350);
		},
		scrollNext: () => {
			const content = getContentEl();
			if (!content) return;
			const isVertical = orientation === "vertical";
			const itemEl = content.querySelector(
				"[data-slot=carousel-item]",
			) as HTMLElement | null;
			const scrollAmount = itemEl
				? isVertical
					? itemEl.offsetHeight
					: itemEl.offsetWidth
				: isVertical
					? content.clientHeight
					: content.clientWidth;
			content.scrollBy({
				[isVertical ? "top" : "left"]: scrollAmount,
				behavior: "smooth",
			});
			setTimeout(updateScrollState, 350);
		},
		updateScrollState,
	};

	// Keyboard navigation
	el.addEventListener("keydown", (ev: KeyboardEvent) => {
		const ctx = (el as ElementWithContext).__carousel;
		if (ev.key === "ArrowLeft" && orientation === "horizontal") {
			ev.preventDefault();
			ctx.scrollPrev();
		} else if (ev.key === "ArrowRight" && orientation === "horizontal") {
			ev.preventDefault();
			ctx.scrollNext();
		} else if (ev.key === "ArrowUp" && orientation === "vertical") {
			ev.preventDefault();
			ctx.scrollPrev();
		} else if (ev.key === "ArrowDown" && orientation === "vertical") {
			ev.preventDefault();
			ctx.scrollNext();
		}
	});

	return el as HTMLElement;
}

// ── CarouselContent ──────────────────────────────────────────────────────────

export function CarouselContent(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;

	const outerWrapper = div({
		class: "overflow-hidden",
		"data-slot": "carousel-content",
	}) as HTMLElement;

	const content = div({
		class: cn("flex", className),
		style: {
			scrollSnapType: "x mandatory",
		} as Record<string, string>,
		nodes,
		...rest,
	}) as HTMLElement;

	outerWrapper.appendChild(content);

	// Update orientation-based styles and listen for scroll
	queueMicrotask(() => {
		const carouselEl = outerWrapper.closest("[data-slot=carousel]");
		if (carouselEl) {
			const ctx = (carouselEl as ElementWithContext).__carousel;
			const isVertical = ctx?.orientation === "vertical";
			if (isVertical) {
				content.classList.add("-mt-4", "flex-col");
				content.style.scrollSnapType = "y mandatory";
			} else {
				content.classList.add("-ml-4");
			}
			content.addEventListener("scroll", () => ctx?.updateScrollState?.(), {
				passive: true,
			});
			// Initial state check
			setTimeout(() => ctx?.updateScrollState?.(), 100);
		}
	});

	return outerWrapper as HTMLElement;
}

// ── CarouselItem ─────────────────────────────────────────────────────────────

export function CarouselItem(
	first?: BaseProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<BaseProps>(first, second);
	const { class: className, nodes, ...rest } = props;
	const el = div({
		"data-slot": "carousel-item",
		role: "group",
		"aria-roledescription": "slide",
		class: cn("min-w-0 shrink-0 grow-0 basis-full", className),
		style: { scrollSnapAlign: "start" },
		nodes,
		...rest,
	}) as HTMLElement;

	// Add orientation-based padding
	queueMicrotask(() => {
		const carouselEl = el.closest("[data-slot=carousel]");
		if (carouselEl) {
			const ctx = (carouselEl as ElementWithContext).__carousel;
			const isVertical = ctx?.orientation === "vertical";
			el.classList.add(isVertical ? "pt-4" : "pl-4");
		}
	});

	return el;
}

// ── CarouselPrevious ─────────────────────────────────────────────────────────

export interface CarouselNavProps extends BaseProps {
	variant?: ButtonProps["variant"];
	size?: ButtonProps["size"];
}

export function CarouselPrevious(
	first?: CarouselNavProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<CarouselNavProps>(first, second);
	const {
		class: className,
		variant = "outline",
		size = "icon",
		nodes,
		on,
		...rest
	} = props;

	const el = Button({
		"data-slot": "carousel-previous",
		variant,
		size,
		class: cn("absolute size-8 rounded-full", className),
		nodes: [
			ArrowLeftIcon({ class: "size-4" }),
			span({ class: "sr-only", nodes: "Previous slide" }) as Node,
			...((Array.isArray(nodes)
				? nodes
				: nodes != null
					? [nodes]
					: []) as Node[]),
		],
		on: {
			...on,
			click: (ev: Event) => {
				const carouselEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=carousel]",
				);
				if (carouselEl)
					(carouselEl as ElementWithContext).__carousel?.scrollPrev();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	// Position based on orientation & bind disabled state
	queueMicrotask(() => {
		const carouselEl = el.closest("[data-slot=carousel]");
		if (carouselEl) {
			const ctx = (carouselEl as ElementWithContext).__carousel;
			const isVertical = ctx?.orientation === "vertical";
			if (isVertical) {
				el.classList.add(
					"-top-12",
					"left-1/2",
					"-translate-x-1/2",
					"rotate-90",
				);
			} else {
				el.classList.add("top-1/2", "-left-12", "-translate-y-1/2");
			}
			if (ctx) {
				effect(() => {
					(el as HTMLButtonElement).disabled = !ctx.canScrollPrev();
				});
			}
		}
	});

	return el as HTMLElement;
}

// ── CarouselNext ─────────────────────────────────────────────────────────────

export function CarouselNext(
	first?: CarouselNavProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<CarouselNavProps>(first, second);
	const {
		class: className,
		variant = "outline",
		size = "icon",
		nodes,
		on,
		...rest
	} = props;

	const el = Button({
		"data-slot": "carousel-next",
		variant,
		size,
		class: cn("absolute size-8 rounded-full", className),
		nodes: [
			ArrowRightIcon({ class: "size-4" }),
			span({ class: "sr-only", nodes: "Next slide" }) as Node,
			...((Array.isArray(nodes)
				? nodes
				: nodes != null
					? [nodes]
					: []) as Node[]),
		],
		on: {
			...on,
			click: (ev: Event) => {
				const carouselEl = (ev.currentTarget as HTMLElement).closest(
					"[data-slot=carousel]",
				);
				if (carouselEl)
					(carouselEl as ElementWithContext).__carousel?.scrollNext();
				(on as Record<string, (ev: Event) => void>)?.click?.(ev);
			},
		},
		...rest,
	}) as HTMLElement;

	// Position based on orientation & bind disabled state
	queueMicrotask(() => {
		const carouselEl = el.closest("[data-slot=carousel]");
		if (carouselEl) {
			const ctx = (carouselEl as ElementWithContext).__carousel;
			const isVertical = ctx?.orientation === "vertical";
			if (isVertical) {
				el.classList.add(
					"-bottom-12",
					"left-1/2",
					"-translate-x-1/2",
					"rotate-90",
				);
			} else {
				el.classList.add("top-1/2", "-right-12", "-translate-y-1/2");
			}
			if (ctx) {
				effect(() => {
					(el as HTMLButtonElement).disabled = !ctx.canScrollNext();
				});
			}
		}
	});

	return el as HTMLElement;
}
