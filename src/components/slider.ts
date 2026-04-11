import { div, effect, type NodeChildren } from "sibujs";
import { bindControlled } from "../lib/controlled";
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

	// Determine initial array length for thumb creation. If the controlled prop
	// is a reactive getter, read it once up front to size the thumbs; otherwise
	// use the literal or `defaultValue`.
	const controlledInitial =
		typeof controlledValue === "function" ? controlledValue() : controlledValue;
	const initial = controlledInitial ?? defaultValue ?? [min];
	const [values, setValues] = bindControlled<number[]>(
		controlledValue,
		initial,
	);

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

	const thumbs: HTMLElement[] = initial.map(
		(_, i) =>
			div({
				"data-slot": "slider-thumb",
				tabindex: disabled ? undefined : "0",
				role: "slider",
				"aria-valuemin": String(min),
				"aria-valuemax": String(max),
				"aria-valuenow": () => String(values()[i] ?? min),
				"aria-orientation": orientation,
				class:
					"block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
			}) as HTMLElement,
	);

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
		[track, ...thumbs],
	) as HTMLElement;

	// Update range and thumb positions
	effect(() => {
		const vals = values();
		const rangePercent = (((vals[0] ?? min) - min) / (max - min)) * 100;
		if (orientation === "horizontal") {
			range.style.width = `${rangePercent}%`;
		} else {
			range.style.height = `${rangePercent}%`;
		}
		thumbs.forEach((thumb, i) => {
			const val = vals[i] ?? min;
			const percent = ((val - min) / (max - min)) * 100;
			if (orientation === "horizontal") {
				thumb.style.position = "absolute";
				thumb.style.left = `${percent}%`;
				thumb.style.transform = "translateX(-50%)";
			} else {
				thumb.style.position = "absolute";
				thumb.style.bottom = `${percent}%`;
				thumb.style.transform = "translateY(50%)";
			}
		});
	});

	// Pointer drag interaction
	thumbs.forEach((thumb, i) => {
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
			const clamped = Math.max(min, Math.min(max, stepped));
			const newVals = [...values()];
			newVals[i] = clamped;
			if (controlledValue === undefined) setValues(newVals);
			onValueChange?.(newVals);
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
				const newVal = Math.min(max, current + step);
				const newVals = [...values()];
				newVals[i] = newVal;
				if (controlledValue === undefined) setValues(newVals);
				onValueChange?.(newVals);
			} else if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") {
				ev.preventDefault();
				const newVal = Math.max(min, current - step);
				const newVals = [...values()];
				newVals[i] = newVal;
				if (controlledValue === undefined) setValues(newVals);
				onValueChange?.(newVals);
			}
		});
	});

	return el as HTMLElement;
}
