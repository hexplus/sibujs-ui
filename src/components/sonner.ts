import {
	button as buttonTag,
	div,
	effect,
	type NodeChildren,
	p,
	signal,
} from "sibujs";
import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
	XIcon,
} from "../icons";
import { cn, cnReactive } from "../lib/utils";
import { type BaseProps, normalizeArgs } from "./types";

// Toast state management
interface ToastData {
	id: number;
	title?: string;
	description?: string;
	variant?: "default" | "success" | "error" | "warning" | "info" | "loading";
	duration?: number;
	action?: { label: string; onClick: () => void };
	onDismiss?: () => void;
}

let toastId = 0;
const [toasts, setToasts] = signal<ToastData[]>([]);
let toasterContainer: HTMLElement | null = null;
let toasterConfig: {
	richColors?: boolean;
	closeButton?: boolean;
	expand?: boolean;
	visibleToasts?: number;
} = {};

function removeToast(id: number) {
	setToasts(toasts().filter((t) => t.id !== id));
	renderToasts();
}

function renderToasts() {
	if (!toasterContainer) return;

	// Clear existing toasts
	while (toasterContainer.firstChild) {
		toasterContainer.removeChild(toasterContainer.firstChild);
	}

	const currentToasts = toasts();
	const maxVisible = toasterConfig.visibleToasts ?? Infinity;
	const visibleToasts = currentToasts.slice(-maxVisible);
	for (const t of visibleToasts) {
		const toastEl = createToastElement(t);
		toasterContainer.appendChild(toastEl);
	}
}

const toastIcons: Record<string, (cls?: string) => SVGSVGElement> = {
	success: (cls) => CircleCheckIcon({ class: cls ?? "size-4" }),
	info: (cls) => InfoIcon({ class: cls ?? "size-4" }),
	warning: (cls) => TriangleAlertIcon({ class: cls ?? "size-4" }),
	error: (cls) => OctagonXIcon({ class: cls ?? "size-4" }),
	loading: (cls) => Loader2Icon({ class: cn("size-4 animate-spin", cls) }),
};

function createToastElement(t: ToastData): HTMLElement {
	const variantClasses: Record<string, string> = {
		default: "bg-background text-foreground border-border",
		success:
			"bg-background text-foreground border-border [&>[data-slot=toast-icon]]:text-green-500",
		error:
			"bg-background text-foreground border-border [&>[data-slot=toast-icon]]:text-destructive",
		warning:
			"bg-background text-foreground border-border [&>[data-slot=toast-icon]]:text-amber-500",
		info: "bg-background text-foreground border-border [&>[data-slot=toast-icon]]:text-blue-500",
		loading: "bg-background text-foreground border-border",
	};

	const richColorClasses: Record<string, string> = {
		success:
			"bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800 [&>[data-slot=toast-icon]]:text-green-500",
		error:
			"bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800 [&>[data-slot=toast-icon]]:text-red-500",
		warning:
			"bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:border-amber-800 [&>[data-slot=toast-icon]]:text-amber-500",
		info: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800 [&>[data-slot=toast-icon]]:text-blue-500",
	};

	const variant = t.variant ?? "default";

	const contentNodes: Node[] = [];

	// Add icon for variant
	const iconFactory = toastIcons[variant];
	if (iconFactory) {
		contentNodes.push(
			div(
				{
					"data-slot": "toast-icon",
					class: "shrink-0",
				},
				[iconFactory("size-4")],
			) as HTMLElement as Node,
		);
	}

	const textNodes: Node[] = [];

	if (t.title) {
		textNodes.push(
			div(
				{
					"data-slot": "toast-title",
					class: "text-sm font-semibold",
				},
				t.title,
			) as HTMLElement as Node,
		);
	}

	if (t.description) {
		textNodes.push(
			p(
				{
					"data-slot": "toast-description",
					class: "text-sm text-muted-foreground",
				},
				t.description,
			) as HTMLElement as Node,
		);
	}

	contentNodes.push(
		div(
			{
				class: "flex flex-col gap-1",
			},
			textNodes,
		) as HTMLElement as Node,
	);

	const rightNodes: Node[] = [];

	if (t.action) {
		const actionBtn = buttonTag(
			{
				"data-slot": "toast-action",
				type: "button",
				class:
					"inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50",
				on: {
					click: () => {
						t.action?.onClick();
						removeToast(t.id);
					},
				},
			},
			t.action.label,
		) as HTMLElement;
		rightNodes.push(actionBtn as Node);
	}

	const toastNodes: Node[] = [
		div(
			{
				class: "flex items-center gap-3",
			},
			contentNodes,
		) as HTMLElement as Node,
		...(rightNodes.length > 0 ? rightNodes : []),
	];

	// Add close button if configured
	if (toasterConfig.closeButton) {
		const closeBtn = buttonTag(
			{
				"data-slot": "toast-close",
				type: "button",
				class:
					"absolute top-2 right-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-hidden focus:ring-2 group-hover:opacity-100",
				on: {
					click: () => {
						t.onDismiss?.();
						removeToast(t.id);
					},
				},
			},
			[XIcon({ class: "size-4" })],
		) as HTMLElement;
		toastNodes.push(closeBtn as Node);
	}

	const useRichColors = toasterConfig.richColors && variant in richColorClasses;

	const toastEl = div(
		{
			"data-slot": "toast",
			"data-variant": variant,
			class: cn(
				"group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-[var(--border-radius)] border p-4 shadow-lg transition-all animate-in slide-in-from-bottom-full fade-in-80",
				toasterConfig.closeButton && "pr-8",
				useRichColors ? richColorClasses[variant] : variantClasses[variant],
			),
		},
		toastNodes,
	) as HTMLElement;

	// Auto-dismiss (loading toasts don't auto-dismiss by default)
	const duration = t.duration ?? (variant === "loading" ? 0 : 4000);
	if (duration > 0) {
		setTimeout(() => {
			removeToast(t.id);
		}, duration);
	}

	return toastEl as HTMLElement;
}

export interface ToasterProps extends BaseProps {
	position?:
		| "top-left"
		| "top-right"
		| "top-center"
		| "bottom-left"
		| "bottom-right"
		| "bottom-center";
	richColors?: boolean;
	closeButton?: boolean;
	expand?: boolean;
	visibleToasts?: number;
}

export function Toaster(
	first?: ToasterProps | NodeChildren,
	second?: NodeChildren,
): HTMLElement {
	const props = normalizeArgs<ToasterProps>(first, second);
	const {
		class: className,
		position = "bottom-right",
		richColors = false,
		closeButton = false,
		expand = false,
		visibleToasts,
		...rest
	} = props;

	toasterConfig = { richColors, closeButton, expand, visibleToasts };

	const positionClasses: Record<string, string> = {
		"top-left": "top-0 left-0",
		"top-right": "top-0 right-0",
		"top-center": "top-0 left-1/2 -translate-x-1/2",
		"bottom-left": "bottom-0 left-0",
		"bottom-right": "bottom-0 right-0",
		"bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
	};

	const container = div({
		"data-slot": "toaster",
		class: cnReactive(
			"toaster group fixed z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]",
			positionClasses[position],
			className,
		),
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)",
			"--border-radius": "var(--radius)",
		} as Record<string, string>,
		...rest,
	}) as HTMLElement;

	toasterContainer = container;

	// React to toast changes
	effect(() => {
		const _toasts = toasts();
		renderToasts();
	});

	return container as HTMLElement;
}

export interface ToastOptions {
	title?: string;
	description?: string;
	variant?: "default" | "success" | "error" | "warning" | "info" | "loading";
	duration?: number;
	action?: { label: string; onClick: () => void };
	onDismiss?: () => void;
}

export function toast(options: ToastOptions | string): number {
	const data: ToastData =
		typeof options === "string"
			? { id: ++toastId, description: options }
			: { id: ++toastId, ...options };

	setToasts([...toasts(), data]);
	renderToasts();
	return data.id;
}

toast.success = (
	message: string,
	options?: Omit<ToastOptions, "variant" | "description">,
) => toast({ description: message, variant: "success", ...options });

toast.error = (
	message: string,
	options?: Omit<ToastOptions, "variant" | "description">,
) => toast({ description: message, variant: "error", ...options });

toast.warning = (
	message: string,
	options?: Omit<ToastOptions, "variant" | "description">,
) => toast({ description: message, variant: "warning", ...options });

toast.info = (
	message: string,
	options?: Omit<ToastOptions, "variant" | "description">,
) => toast({ description: message, variant: "info", ...options });

toast.loading = (
	message: string,
	options?: Omit<ToastOptions, "variant" | "description">,
) => toast({ description: message, variant: "loading", ...options });

toast.promise = <T>(
	promise: Promise<T>,
	options: {
		loading: string;
		success: string | ((data: T) => string);
		error: string | ((err: unknown) => string);
	},
): Promise<T> => {
	const id = toast.loading(options.loading);

	promise
		.then((data) => {
			toast.dismiss(id);
			const message =
				typeof options.success === "function"
					? options.success(data)
					: options.success;
			toast.success(message);
		})
		.catch((err) => {
			toast.dismiss(id);
			const message =
				typeof options.error === "function"
					? options.error(err)
					: options.error;
			toast.error(message);
		});

	return promise;
};

toast.dismiss = (id?: number) => {
	if (id !== undefined) {
		removeToast(id);
	} else {
		setToasts([]);
		renderToasts();
	}
};
