import { Button, H2, Muted } from "@/components/ui";
import { Stack } from "@/components/ui/layout/stack";
import { useAppForm } from "@/lib/useAppForm";
import { registerSchema } from "../../schema";
import { useRegisterFormStore } from "../../store";

// Extract only the user details fields for this step's validation
const userDetailsFormSchema = registerSchema.pick({
	first_name: true,
	last_name: true,
	birth_date: true,
});

/**
 * Props for the UserDetailsForm component.
 */
interface UserDetailsFormProps {
	/** Callback function when proceeding to next step */
	onNext?: () => void;
	/** Callback function when going back to previous step */
	onBack?: () => void;
	/** Whether to show the back button */
	showBackButton?: boolean;
}

/**
 * Step 3 of the registration process - Personal Details Collection.
 *
 * This component collects the user's personal information including first name,
 * last name, and birth date. It handles proper date serialization and validation
 * for all personal details.
 *
 * Features:
 * - First name and last name text inputs with validation
 * - Date picker for birth date with proper date handling
 * - Real-time validation using Zod
 * - Integration with registration store for state persistence
 * - Proper date serialization/deserialization
 *
 * @param onNext - Callback function to proceed to the next step
 * @param onBack - Callback function to go back to the previous step
 * @param showBackButton - Whether to display the back navigation button
 *
 * @example
 * ```tsx
 * <UserDetailsForm
 *   onNext={() => console.log('Moving to username step')}
 *   onBack={() => console.log('Going back to OTP')}
 *   showBackButton={true}
 * />
 * ```
 */
export function UserDetailsForm({
	onNext,
	onBack,
	showBackButton,
}: UserDetailsFormProps) {
	const { formData, setFormData } = useRegisterFormStore();

	// Convert string date back to Date object if it exists
	const existingBirthDate = formData.birth_date
		? typeof formData.birth_date === "string"
			? new Date(formData.birth_date)
			: formData.birth_date
		: undefined;

	const UserDetailsFormFields = useAppForm({
		defaultValues: {
			first_name: formData.first_name || "",
			last_name: formData.last_name || "",
			birth_date: existingBirthDate,
		},
		validators: {
			onChange: userDetailsFormSchema,
		},
		onSubmit: async ({ value }) => {
			setFormData({
				first_name: value.first_name,
				last_name: value.last_name,
				birth_date: value.birth_date,
			});
			onNext?.();
		},
	});

	return (
		<form
			className="flex flex-col gap-4 justify-center items-center w-full"
			onSubmit={(e) => {
				e.preventDefault();
				UserDetailsFormFields.handleSubmit();
			}}
		>
			<Stack justify="center" align="center">
				<H2 className="font-bold">Welcome</H2>
				<Muted>Register yourself here</Muted>
			</Stack>

			<UserDetailsFormFields.AppField name="first_name">
				{(field) => <field.TextField className="mt-2" />}
			</UserDetailsFormFields.AppField>

			<UserDetailsFormFields.AppField name="last_name">
				{(field) => <field.TextField className="mt-2" />}
			</UserDetailsFormFields.AppField>

			<UserDetailsFormFields.AppField name="birth_date">
				{(field) => <field.DateField className="mt-2" />}
			</UserDetailsFormFields.AppField>

			<Stack direction={"horizontal"} horizontalSpacing={"md"} className="mt-4">
				{showBackButton && (
					<Button type="button" variant="outline" onClick={onBack}>
						Back
					</Button>
				)}
				<Button type="submit">Next</Button>
			</Stack>
		</form>
	);
}
