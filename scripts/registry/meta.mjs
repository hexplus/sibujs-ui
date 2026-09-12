/**
 * Human-written registry metadata: one-line descriptions and categories.
 *
 * This is the ONLY hand-maintained part of the registry. Everything that could
 * drift from the source — file contents, npm dependencies, registry
 * dependencies, the Tailwind utilities a component relies on — is derived from
 * `src/` by `build.mjs`. A component missing from this map still ships (with no
 * description); `tests/registry.test.ts` fails so the gap is noticed.
 */

/** @type {Record<string, { description: string; category: string }>} */
export const UI_META = {
	accordion: { category: "layout", description: "Vertically stacked headings that each reveal a section of content." },
	"alert-dialog": { category: "feedback", description: "A modal dialog that interrupts the user and expects a response." },
	alert: { category: "feedback", description: "A callout that draws attention to important information." },
	"aspect-ratio": { category: "layout", description: "Displays content within a fixed width-to-height ratio." },
	avatar: { category: "data-display", description: "An image element with a fallback for representing a user." },
	badge: { category: "feedback", description: "A small label for status, counts or categories." },
	breadcrumb: { category: "navigation", description: "Shows the path to the current page as a list of links." },
	"button-group": { category: "forms", description: "Groups related buttons into a single joined control." },
	button: { category: "forms", description: "A button with variants and sizes." },
	calendar: { category: "data-display", description: "A date picker grid with month navigation and dropdowns." },
	card: { category: "layout", description: "A container with header, content and footer slots." },
	carousel: { category: "layout", description: "A slideshow for cycling through a set of elements." },
	chart: { category: "data-display", description: "Chart container, tooltip and legend primitives driven by a config." },
	checkbox: { category: "forms", description: "A control that toggles between checked and unchecked." },
	collapsible: { category: "layout", description: "A panel that expands and collapses its content." },
	combobox: { category: "forms", description: "An input with a filterable list of suggestions." },
	command: { category: "navigation", description: "A searchable command menu." },
	"context-menu": { category: "navigation", description: "A menu opened by right-clicking an element." },
	dialog: { category: "feedback", description: "A modal window layered over the page." },
	direction: { category: "utilities", description: "Provides and reads the text direction (ltr/rtl) for a subtree." },
	drawer: { category: "feedback", description: "A panel that slides in from an edge of the screen." },
	"dropdown-menu": { category: "navigation", description: "A menu of actions opened from a trigger." },
	empty: { category: "feedback", description: "A placeholder for empty states." },
	field: { category: "forms", description: "Layout primitives for labelled form fields, groups and errors." },
	form: { category: "forms", description: "Form item, label, description and message primitives." },
	"hover-card": { category: "navigation", description: "Preview content shown when hovering a link." },
	"input-group": { category: "forms", description: "An input with leading or trailing addons and buttons." },
	"input-otp": { category: "forms", description: "A one-time-password input split into slots." },
	input: { category: "forms", description: "A styled text input." },
	item: { category: "data-display", description: "A flexible row for lists: media, content and actions." },
	kbd: { category: "data-display", description: "Displays a keyboard key or shortcut." },
	label: { category: "forms", description: "An accessible label for a form control." },
	menubar: { category: "navigation", description: "A horizontal menu bar of dropdown menus." },
	"native-select": { category: "forms", description: "A styled native select element." },
	"navigation-menu": { category: "navigation", description: "A site navigation menu with flyout content." },
	pagination: { category: "navigation", description: "Page navigation with previous and next links." },
	popover: { category: "navigation", description: "Floating content anchored to a trigger." },
	progress: { category: "feedback", description: "A bar showing the completion of a task." },
	"radio-group": { category: "forms", description: "A set of radio buttons where one can be selected." },
	resizable: { category: "layout", description: "Panel groups with draggable resize handles." },
	"scroll-area": { category: "layout", description: "A scroll container with custom scrollbars." },
	select: { category: "forms", description: "A custom select with a popup list of options." },
	separator: { category: "layout", description: "A horizontal or vertical divider." },
	sheet: { category: "feedback", description: "A dialog that slides in from a screen edge." },
	sidebar: { category: "layout", description: "A composable, collapsible application sidebar." },
	skeleton: { category: "feedback", description: "A placeholder shown while content loads." },
	slider: { category: "forms", description: "Selects a value or range by dragging a thumb." },
	sonner: { category: "feedback", description: "Toast notifications via Toaster and toast()." },
	spinner: { category: "feedback", description: "An animated loading indicator." },
	switch: { category: "forms", description: "A toggle between on and off." },
	table: { category: "layout", description: "Styled table primitives." },
	tabs: { category: "layout", description: "Layered sections of content shown one at a time." },
	textarea: { category: "forms", description: "A styled multi-line text input." },
	"toggle-group": { category: "forms", description: "A set of toggle buttons with single or multiple selection." },
	toggle: { category: "forms", description: "A two-state button." },
	tooltip: { category: "feedback", description: "A short label shown on hover or focus." },
};

/** @type {Record<string, string>} */
export const LIB_META = {
	utils: "Class name helpers: cn() and cnReactive() (clsx + tailwind-merge).",
	types: "Shared component props and argument normalization.",
	lifecycle: "Owner-scoped effects and deferred setup tied to element disposal.",
	controlled: "Controlled/uncontrolled state binding for component props.",
	aria: "Wires aria-labelledby / aria-describedby references by id.",
	"form-control": "Pairs custom controls (checkbox, switch, radio) with hidden native inputs so forms see them.",
	"scroll-lock": "Reference-counted body scroll locking for overlays.",
	icons: "The inline SVG icons used by the components (a subset of lucide).",
};
