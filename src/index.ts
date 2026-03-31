// Utilities

// Types
export { type BaseProps, normalizeArgs, toNodes } from "./components/types";

// Icons (1694 lucide icons + aliases)
export * from "./icons";
export { cn, cnReactive } from "./lib/utils";

// --- Components ---

export type {
	AccordionItemProps,
	AccordionProps,
} from "./components/accordion";
// Accordion
export {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./components/accordion";
export type { AlertProps } from "./components/alert";
// Alert
export {
	Alert,
	AlertDescription,
	AlertTitle,
	alertVariants,
} from "./components/alert";
export type {
	AlertDialogActionProps,
	AlertDialogCancelProps,
	AlertDialogContentProps,
	AlertDialogProps,
} from "./components/alert-dialog";
// Alert Dialog
export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./components/alert-dialog";
export type { AspectRatioProps } from "./components/aspect-ratio";
// Aspect Ratio
export { AspectRatio } from "./components/aspect-ratio";
export type { AvatarImageProps, AvatarProps } from "./components/avatar";
// Avatar
export {
	Avatar,
	AvatarBadge,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage,
} from "./components/avatar";
export type { BadgeProps } from "./components/badge";
// Badge
export { Badge, badgeVariants } from "./components/badge";
export type { BreadcrumbLinkProps } from "./components/breadcrumb";
// Breadcrumb
export {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./components/breadcrumb";
export type { ButtonProps } from "./components/button";
// Button
export { Button, buttonVariants } from "./components/button";
export type {
	ButtonGroupProps,
	ButtonGroupSeparatorProps,
} from "./components/button-group";
// Button Group
export {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
	buttonGroupVariants,
} from "./components/button-group";
export type { CalendarProps, DateRange } from "./components/calendar";
// Calendar
export { Calendar } from "./components/calendar";

// Card
export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./components/card";
export type { CarouselProps } from "./components/carousel";
// Carousel
export {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./components/carousel";
export type {
	ChartConfig,
	ChartContainerProps,
	ChartStyleProps,
	ChartTooltipContentProps,
} from "./components/chart";
// Chart
export {
	ChartContainer,
	ChartLegendContent,
	ChartStyle,
	ChartTooltipContent,
} from "./components/chart";
export type { CheckboxProps } from "./components/checkbox";
// Checkbox
export { Checkbox } from "./components/checkbox";
export type { CollapsibleProps } from "./components/collapsible";
// Collapsible
export {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./components/collapsible";
export type {
	ComboboxChipProps,
	ComboboxContentProps,
	ComboboxInputProps,
	ComboboxItemProps,
	ComboboxProps,
} from "./components/combobox";
// Combobox
export {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxClear,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
	ComboboxSeparator,
	ComboboxTrigger,
	ComboboxValue,
} from "./components/combobox";
export type {
	CommandDialogProps,
	CommandGroupProps,
	CommandInputProps,
	CommandItemProps,
	CommandProps,
} from "./components/command";
// Command
export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "./components/command";
export type {
	ContextMenuCheckboxItemProps,
	ContextMenuItemProps,
	ContextMenuLabelProps,
	ContextMenuProps,
	ContextMenuRadioGroupProps,
	ContextMenuRadioItemProps,
} from "./components/context-menu";
// Context Menu
export {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "./components/context-menu";
export type { DialogContentProps, DialogProps } from "./components/dialog";
// Dialog
export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./components/dialog";
export type { DirectionProviderProps } from "./components/direction";
// Direction
export { DirectionProvider, useDirection } from "./components/direction";
export type { DrawerContentProps, DrawerProps } from "./components/drawer";
// Drawer
export {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./components/drawer";
export type {
	DropdownMenuCheckboxItemProps,
	DropdownMenuContentProps,
	DropdownMenuItemProps,
	DropdownMenuLabelProps,
	DropdownMenuProps,
} from "./components/dropdown-menu";
// Dropdown Menu
export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "./components/dropdown-menu";
export type { EmptyMediaProps } from "./components/empty";
// Empty
export {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
	emptyMediaVariants,
} from "./components/empty";
export type { FieldLabelProps, FieldProps } from "./components/field";
// Field
export {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle,
	fieldVariants,
} from "./components/field";
export type { FormLabelProps, FormMessageProps } from "./components/form";
// Form
export {
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "./components/form";
export type {
	HoverCardContentProps,
	HoverCardProps,
} from "./components/hover-card";
// Hover Card
export {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "./components/hover-card";
export type { InputProps } from "./components/input";
// Input
export { Input } from "./components/input";
export type {
	InputGroupAddonProps,
	InputGroupButtonProps,
} from "./components/input-group";
// Input Group
export {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
	inputGroupAddonVariants,
	inputGroupButtonVariants,
} from "./components/input-group";
export type { InputOTPProps, InputOTPSlotProps } from "./components/input-otp";
// Input OTP
export {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "./components/input-otp";
export type { ItemMediaProps, ItemProps } from "./components/item";
// Item
export {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
	itemMediaVariants,
	itemVariants,
} from "./components/item";

// Kbd
export { Kbd, KbdGroup } from "./components/kbd";
export type { LabelProps } from "./components/label";
// Label
export { Label } from "./components/label";
export type {
	MenubarCheckboxItemProps,
	MenubarContentProps,
	MenubarItemProps,
	MenubarLabelProps,
	MenubarMenuProps,
	MenubarRadioGroupProps,
	MenubarRadioItemProps,
} from "./components/menubar";
// Menubar
export {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "./components/menubar";
export type {
	NativeSelectOptGroupProps,
	NativeSelectOptionProps,
	NativeSelectProps,
} from "./components/native-select";
// Native Select
export {
	NativeSelect,
	NativeSelectOptGroup,
	NativeSelectOption,
} from "./components/native-select";
export type {
	NavigationMenuItemProps,
	NavigationMenuLinkProps,
	NavigationMenuProps,
} from "./components/navigation-menu";
// Navigation Menu
export {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "./components/navigation-menu";
export type { PaginationLinkProps } from "./components/pagination";
// Pagination
export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./components/pagination";
export type { PopoverContentProps, PopoverProps } from "./components/popover";
// Popover
export {
	Popover,
	PopoverAnchor,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "./components/popover";
export type { ProgressProps } from "./components/progress";
// Progress
export { Progress } from "./components/progress";
export type {
	RadioGroupItemProps,
	RadioGroupProps,
} from "./components/radio-group";
// Radio Group
export { RadioGroup, RadioGroupItem } from "./components/radio-group";
export type {
	ResizableHandleProps,
	ResizablePanelGroupProps,
	ResizablePanelProps,
} from "./components/resizable";
// Resizable
export {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "./components/resizable";
export type { ScrollBarProps } from "./components/scroll-area";
// Scroll Area
export { ScrollArea, ScrollBar } from "./components/scroll-area";
export type {
	SelectContentProps,
	SelectItemProps,
	SelectProps,
	SelectTriggerProps,
	SelectValueProps,
} from "./components/select";
// Select
export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "./components/select";
export type { SeparatorProps } from "./components/separator";
// Separator
export { Separator } from "./components/separator";
export type { SheetContentProps, SheetProps } from "./components/sheet";
// Sheet
export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./components/sheet";
export type {
	SidebarMenuActionProps,
	SidebarMenuButtonProps,
	SidebarMenuSkeletonProps,
	SidebarMenuSubButtonProps,
	SidebarProps,
	SidebarProviderProps,
} from "./components/sidebar";
// Sidebar
export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
} from "./components/sidebar";

// Skeleton
export { Skeleton } from "./components/skeleton";
export type { SliderProps } from "./components/slider";
// Slider
export { Slider } from "./components/slider";
export type { ToasterProps, ToastOptions } from "./components/sonner";
// Sonner / Toast
export { Toaster, toast } from "./components/sonner";

// Spinner
export { Spinner } from "./components/spinner";
export type { SwitchProps } from "./components/switch";
// Switch
export { Switch } from "./components/switch";

// Table
export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./components/table";
export type {
	TabsContentProps,
	TabsListProps,
	TabsProps,
	TabsTriggerProps,
} from "./components/tabs";
// Tabs
export {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	tabsListVariants,
} from "./components/tabs";
export type { TextareaProps } from "./components/textarea";
// Textarea
export { Textarea } from "./components/textarea";
export type { ToggleProps } from "./components/toggle";
// Toggle
export { Toggle, toggleVariants } from "./components/toggle";
export type {
	ToggleGroupItemProps,
	ToggleGroupProps,
} from "./components/toggle-group";
// Toggle Group
export { ToggleGroup, ToggleGroupItem } from "./components/toggle-group";
export type {
	TooltipContentProps,
	TooltipProps,
	TooltipProviderProps,
} from "./components/tooltip";
// Tooltip
export {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./components/tooltip";
