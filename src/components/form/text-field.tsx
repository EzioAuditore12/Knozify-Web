import { useFieldContext } from "@/contexts/tanstackFormContext";
import { cn } from "@/lib/utils";
import { Input, type InputProps, Label } from "../ui";
import { Stack } from "../ui/layout/stack";
import { FieldError } from "./field-error";

/**
 * TextField
 *
 * A labeled input with built-in error display.
 *
 * Props:
 *   • className: extra class names for the wrapper
 *   • ...inputProps: all other InputProps passed to the <Input>
 *
 * Notes:
 *   – We wrap <FieldError> in a <div> (not a <P>) to avoid nested <p> tags,
 *     since FieldError itself renders a <p> and HTML forbids <p> inside <p>.
 */

export const TextField = ({ className, ...inputProps }: InputProps) => {
	const field = useFieldContext<string>();
	const hasError = field.state.meta.errors.length > 0;

	return (
		<Stack spacing="sm" className={cn("w-full", className)}>
			<Label htmlFor={field.name}>
				{field.name.charAt(0).toUpperCase() + field.name.slice(1)}
			</Label>
			<Input
				id={field.name}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				{...inputProps}
			/>
			<div className="text-sm text-red-500 min-h-5">
				{hasError && <FieldError meta={field.state.meta} />}
			</div>
		</Stack>
	);
};
