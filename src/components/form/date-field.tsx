import {
	Button,
	Calendar,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui";
import { useFieldContext } from "@/contexts/tanstackFormContext";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Stack } from "../ui/layout/stack";
import { FieldError } from "./field-error";

/**
 * DateField - Date Picker Input Component
 *
 * A comprehensive date picker component that provides an intuitive calendar
 * interface for date selection. Integrates seamlessly with TanStack Form
 * and provides proper Date object handling with validation support.
 *
 * Features:
 * - Popover-based calendar interface for date selection
 * - Integration with TanStack Form for state management
 * - Proper Date object handling and serialization
 * - Visual date formatting in the trigger button
 * - Built-in error display and validation feedback
 * - Keyboard navigation and accessibility support
 * - Responsive design with mobile-friendly interactions
 * - Dark mode compatibility
 *
 * @param className - Additional CSS classes for styling customization
 * @param inputProps - Additional props passed to the Calendar component
 *
 * @example
 * ```tsx
 * // Basic date picker
 * <DateField />
 *
 * // With custom styling
 * <DateField className="my-custom-class" />
 *
 * // With calendar restrictions
 * <DateField
 *   fromDate={new Date('1900-01-01')}
 *   toDate={new Date()}
 * />
 * ```
 */

export const DateField = ({
	className,
	...inputProps
}: { className?: string } & Record<string, any>) => {
	const field = useFieldContext<Date | undefined>();
	const hasError = field.state.meta.errors.length > 0;
	const [open, setOpen] = useState(false);

	return (
		<Stack spacing="sm" className={cn("w-full", className)}>
			<Label htmlFor={field.name} className="px-1">
				{field.name.charAt(0).toUpperCase() + field.name.slice(1)}
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id={field.name}
						className="w-48 justify-between font-normal"
						type="button"
						aria-invalid={hasError}
					>
						{field.state.value
							? (field.state.value as Date).toLocaleDateString()
							: "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={field.state.value}
						captionLayout="dropdown"
						onSelect={(date: Date | undefined) => {
							field.handleChange(date);
							setOpen(false);
						}}
						{...inputProps}
					/>
				</PopoverContent>
			</Popover>
			<div className="text-sm text-red-500 min-h-5">
				{hasError && <FieldError meta={field.state.meta} />}
			</div>
		</Stack>
	);
};
