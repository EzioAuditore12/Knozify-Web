import { useFieldContext } from "@/contexts/tanstackFormContext";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "../ui";
import { FieldError } from "./fieldError";

export const TextField = ({ className, ...inputProps }: InputProps) => {
	const field = useFieldContext<string>();
	const hasError = field.state.meta.errors.length > 0;

	return (
		<>
			<Input
				className={cn(className)}
				id={field.name}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				{...inputProps}
			/>
			<p className="min-h-[30px]">
				{" "}
				{/* Reserve space for error */}
				{hasError ? <FieldError meta={field.state.meta} /> : null}
			</p>
		</>
	);
};
