import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/**
 * Like cn() but supports reactive class functions.
 * If any input is a function, returns a function that re-evaluates on each call.
 * Used by components when user-provided className may be reactive.
 */
export function cnReactive(
	...inputs: (ClassValue | (() => string))[]
): string | (() => string) {
	const hasFn = inputs.some((i) => typeof i === "function");
	if (hasFn) {
		return () =>
			twMerge(
				clsx(
					inputs.map((i) =>
						typeof i === "function" ? (i as () => string)() : i,
					),
				),
			);
	}
	return twMerge(clsx(inputs as ClassValue[]));
}
