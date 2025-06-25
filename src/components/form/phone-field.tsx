import { useFieldContext } from "@/contexts/tanstackFormContext";
import { cn } from "@/lib/utils";
import PhoneInput from "react-phone-input-2";
import { Label } from "../ui";
import { Stack } from "../ui/layout/stack";
import { FieldError } from "./field-error";
import "react-phone-input-2/lib/style.css";
import { useEffect } from "react";

/**
 * PhoneField - International Phone Number Input Component
 *
 * A comprehensive phone input component with international country code support,
 * built-in validation, and dark mode compatibility. Integrates with TanStack Form
 * for seamless form state management.
 *
 * Features:
 * - International phone number input with country selection
 * - Real-time formatting and validation
 * - Dark mode support with custom CSS injection
 * - Integration with TanStack Form context
 * - Automatic error display and validation feedback
 * - Responsive design with proper accessibility
 *
 * @param className - Additional CSS classes for styling customization
 * @param inputProps - All other props passed to react-phone-input-2 PhoneInput
 *
 * @example
 * ```tsx
 * <PhoneField
 *   placeholder="Enter phone number"
 *   country="us"
 *   onlyCountries={['us', 'ca', 'gb']}
 * />
 * ```
 */
export const PhoneField = ({ className, ...inputProps }: any) => {
	const field = useFieldContext<string>();
	const hasError = field.state.meta.errors.length > 0;

	/**
	 * Inject custom styles for dark mode support.
	 * This ensures the phone input component matches the application theme.
	 */
	useEffect(() => {
		const style = document.createElement("style");
		style.id = "phone-input-dark-mode";

		// Only add if not already present
		if (!document.getElementById("phone-input-dark-mode")) {
			style.textContent = `
				.react-tel-input {
					font-family: inherit !important;
				}
				.react-tel-input .form-control {
					background-color: hsl(var(--background)) !important;
					color: hsl(var(--foreground)) !important;
					border-color: hsl(var(--border)) !important;
					border-radius: calc(var(--radius) - 2px) !important;
					height: 40px !important;
					font-size: 14px !important;
				}
				.react-tel-input .form-control:focus {
					border-color: hsl(var(--ring)) !important;
					box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2) !important;
					outline: none !important;
				}
				.react-tel-input .flag-dropdown {
					background-color: hsl(var(--background)) !important;
					border-color: hsl(var(--border)) !important;
					border-radius: calc(var(--radius) - 2px) !important;
				}
				.react-tel-input .flag-dropdown:hover {
					background-color: hsl(var(--accent)) !important;
				}
				.react-tel-input .selected-flag {
					background-color: transparent !important;
				}
				.react-tel-input .country-list {
					background-color: hsl(var(--popover)) !important;
					border-color: hsl(var(--border)) !important;
					border-radius: var(--radius) !important;
					box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
				}
				.react-tel-input .country-list .country {
					color: hsl(var(--popover-foreground)) !important;
					background-color: transparent !important;
				}
				.react-tel-input .country-list .country:hover {
					background-color: hsl(var(--accent)) !important;
				}
				.react-tel-input .country-list .country.highlight {
					background-color: hsl(var(--primary)) !important;
					color: hsl(var(--primary-foreground)) !important;
				}
				.react-tel-input .country-list .search {
					background-color: hsl(var(--background)) !important;
					color: hsl(var(--foreground)) !important;
					border-color: hsl(var(--border)) !important;
					margin: 8px !important;
					border-radius: calc(var(--radius) - 2px) !important;
				}
				.react-tel-input .country-list .search::placeholder {
					color: hsl(var(--muted-foreground)) !important;
				}
			`;
			document.head.appendChild(style);
		}

		return () => {
			// Cleanup on unmount
			const existingStyle = document.getElementById("phone-input-dark-mode");
			if (existingStyle) {
				existingStyle.remove();
			}
		};
	}, []);

	return (
		<Stack spacing="sm" className={cn(className)}>
			<Label htmlFor={field.name}>
				{field.name.charAt(0).toUpperCase() + field.name.slice(1)}
			</Label>
			<div
				className={cn("phone-input-wrapper", hasError && "phone-input-error")}
			>
				<PhoneInput
					inputProps={{
						id: field.name,
						name: field.name,
						onBlur: field.handleBlur,
					}}
					country={"in"}
					value={field.state.value}
					onChange={field.handleChange}
					{...inputProps}
				/>
			</div>
			<div className="text-sm text-red-500 min-h-5">
				{hasError && <FieldError meta={field.state.meta} />}
			</div>
		</Stack>
	);
};
