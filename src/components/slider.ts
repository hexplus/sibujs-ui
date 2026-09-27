import { div, type NodeChildren } from "sibujs";
import { bindControlled } from "../lib/controlled";
import { nodeOwner, ownedEffect } from "../lib/lifecycle";
import { cn, cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

export interface SliderProps extends BaseProps {
	value?: number[] | (() => number[]);
	defaultValue?: number[];
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	orientation?: "horizontal" | "vertical";
	onValueChange?: (value: number[]) => void;
}

export function Slider(
	first?: SliderProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<SliderProps>(first, second);
	const {
		class: className,
		value: controlledValue,
		defaultValue,
		min = 0,
		max = 100,
		step = 1,
		disabled,
		orientation = "horizontal",
		onValueChange,
		...rest
	} = props;

	const [values, setValues, isControlled, stopControlled] = bindControlled<
		number[]
	>(controlledValue, defaultValue ?? [min]);

	const range = div({
		"data-slot": "slider-range",
		class: cn(
			"absolute bg-primary",
			orientation === "horizontal" ? "h-full" : "w-full",
		),
	}) as HTMLElement;

	const track = div(
		{
			"data-slot": "slider-track",
			"data-orientation": orientation,
			class: cn(
				"relative grow overflow-hidden rounded-full bg-muted",
				orientation === "horizontal" ? "h-1.5 w-full" : "h-full w-1.5",
			),
		},
		[range],
	) as HTMLElement;

	const el = div(
		{
			"data-slot": "slider",
			"data-orientation": orientation,
			"data-disabled": disabled ? "" : undefined,
			class: cnReactive(
				"relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50",
				orientation === "vertical" ? "h-full min-h-44 w-auto flex-col" : "",
				className,
			),
			...rest,
		},
		[track],
	) as HTMLElement;

	// The controlled-prop subscription dies with this element.
	nodeOwner(el).add(stopControlled);

	const commit = (index: number, next: number) => {
		const newVals = [...values()];
		newVals[index] = next;
		if (!isControlled) setValues(newVals);
		onValueChange?.(newVals);
	};

	const percentOf = (val: number) => ((val - min) / (max - min)) * 100;

	/**
	 * Build the thumb for `values()[i]`.
	 *
	 * Thumbs are created on demand rather than once from the initial array, so
	 * a value that grows or shrinks (one thumb to a range, say) gets exactly one
	 * thumb per entry. Its state is written by the positioning effect below, not
	 * bound per thumb, so a removed thumb leaves no subscription behind.
	 */
	const createThumb = (i: number): HTMLElement => {
		const thumb = div({
			"data-slot": "slider-thumb",
			tabindex: disabled ? undefined : "0",
			role: "slider",
			"aria-valuemin": String(min),
			"aria-valuemax": String(max),
			"aria-orientation": orientation,
			class:
				"block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
		}) as HTMLElement;

		let dragging = false;

		const updateValue = (clientPos: number) => {
			const rect = track.getBoundingClientRect();
			let ratio: number;
			if (orientation === "horizontal") {
				ratio = Math.max(0, Math.min(1, (clientPos - rect.left) / rect.width));
			} else {
				ratio = Math.max(
					0,
					Math.min(1, 1 - (clientPos - rect.top) / rect.height),
				);
			}
			const raw = min + ratio * (max - min);
			const stepped = Math.round(raw / step) * step;
			commit(i, Math.max(min, Math.min(max, stepped)));
		};

		thumb.addEventListener("pointerdown", (ev: PointerEvent) => {
			if (disabled) return;
			dragging = true;
			thumb.setPointerCapture(ev.pointerId);
		});

		thumb.addEventListener("pointermove", (ev: PointerEvent) => {
			if (!dragging) return;
			updateValue(orientation === "horizontal" ? ev.clientX : ev.clientY);
		});

		thumb.addEventListener("pointerup", () => {
			dragging = false;
		});

		thumb.addEventListener("keydown", (ev: KeyboardEvent) => {
			if (disabled) return;
			const current = values()[i] ?? min;
			if (ev.key === "ArrowRight" || ev.key === "ArrowUp") {
				ev.preventDefault();
				commit(i, Math.min(max, current + step));
			} else if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") {
				ev.preventDefault();
				commit(i, Math.max(min, current - step));
			}
		});

		return thumb;
	};

	const thumbs: HTMLElement[] = [];

	// Keep one thumb per value, then position range and thumbs — owned so a
	// disposed slider stops writing into detached thumbs.
	ownedEffect(el, () => {
		const vals = values();
		const count = Math.max(vals.length, 1);
		while (thumbs.length < count) {
			const thumb = createThumb(thumbs.length);
			thumbs.push(thumb);
			el.appendChild(thumb);
		}
		while (thumbs.length > count) {
			thumbs.pop()?.remove();
		}

		// One value fills from `min`; several span from the lowest to the highest.
		const start = vals.length > 1 ? percentOf(Math.min(...vals)) : 0;
		const end = percentOf(
			vals.length > 1 ? Math.max(...vals) : (vals[0] ?? min),
		);
		if (orientation === "horizontal") {
			range.style.left = `${start}%`;
			range.style.width = `${end - start}%`;
		} else {
			range.style.bottom = `${start}%`;
			range.style.height = `${end - start}%`;
		}

		thumbs.forEach((thumb, i) => {
			const val = vals[i] ?? min;
			const percent = percentOf(val);
			thumb.setAttribute("aria-valuenow", String(val));
			thumb.style.position = "absolute";
			if (orientation === "horizontal") {
				thumb.style.left = `${percent}%`;
				thumb.style.transform = "translateX(-50%)";
			} else {
				thumb.style.bottom = `${percent}%`;
				thumb.style.transform = "translateY(50%)";
			}
		});
	});

	return el as HTMLElement;
}
