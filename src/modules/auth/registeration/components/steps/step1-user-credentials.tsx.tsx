import { Button, H2, Muted } from "@/components/ui";
import { Form, type FormProps, Stack } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

/**
 * Props for the UserCredentialsForm component.
 */
interface UserCredentialFormProps extends FormProps {
	/** Callback function when proceeding to next step */
	onNext?: () => void;
	/** Callback function when going back to previous step */
	onBack?: () => void;
	/** Whether to show the back button */
	showBackButton?: boolean;
}

import { useAppForm } from "@/lib/useAppForm";
import { useRegisterFormStore } from "../../store";

import { registerSchema } from "../../schema";

// Extract only the contact field for this step's validation
const phoneNumberFormSchema = registerSchema.pick({
	contact: true,
});

/**
 * Step 1 of the registration process - Phone Number Collection.
 *
 * This component handles the collection and validation of the user's phone number.
 * It integrates with the registration store to persist data and validates input
 * using Zod schema validation.
 *
 * Features:
 * - Phone number input with international formatting
 * - Real-time validation using Zod
 * - Integration with registration store for state persistence
 * - Responsive design with proper form accessibility
 *
 * @param onNext - Callback function to proceed to the next step
 * @param onBack - Callback function to go back to the previous step
 * @param showBackButton - Whether to display the back navigation button
 *
 * @example
 * ```tsx
 * <UserCredentialsForm
 *   onNext={() => console.log('Moving to OTP step')}
 *   showBackButton={false}
 * />
 * ```
 */
export function UserCredentialsForm({
	className,
	onNext,
	onBack,
	showBackButton,
}: UserCredentialFormProps) {
	const { formData, updateField } = useRegisterFormStore();

	const UserCredentialForm = useAppForm({
		defaultValues: {
			contact: formData.contact || "",
		},
		validators: {
			onChange: phoneNumberFormSchema,
		},
		onSubmit: ({ value }) => {
			updateField("contact", value.contact);
			onNext?.();
		},
	});

	return (
		<Form
			className={cn(
				"flex flex-col gap-4 justify-center items-center w-full",
				className,
			)}
			onSubmit={(e) => {
				e.preventDefault();
				UserCredentialForm.handleSubmit();
			}}
		>
			<Stack justify="center" align="center">
				<H2 className="font-bold">Welcome</H2>
				<Muted>Register yourself here</Muted>
			</Stack>

			<UserCredentialForm.AppField name="contact">
				{(field) => <field.PhoneField className="mx-auto" />}
			</UserCredentialForm.AppField>

			<Stack direction={"horizontal"} horizontalSpacing={"md"} className="mt-4">
				{showBackButton && (
					<Button type="button" variant="outline" onClick={onBack}>
						Back
					</Button>
				)}
				<Button type="submit">Next</Button>
			</Stack>
		</Form>
	);
}
