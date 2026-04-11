import { div, type NodeChildren } from "sibujs";
import { type BaseProps, normalizeArgs } from "./types";

export interface AspectRatioProps extends BaseProps {
	ratio?: number;
}

export function AspectRatio(
	first?: AspectRatioProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<AspectRatioProps>(first, second);
	const { ratio = 1, class: className, nodes, style, ...rest } = props;

	return div(
		{
			"data-slot": "aspect-ratio",
			class: className,
			style: {
				position: "relative",
				width: "100%",
				paddingBottom: `${(1 / ratio) * 100}%`,
				...(typeof style === "object" && !Array.isArray(style)
					? (style as Record<string, string | number>)
					: {}),
			},
			...rest,
		},
		[
			div({
				style: { position: "absolute", inset: "0" },
				nodes,
			}),
		],
	) as HTMLElement;
}
