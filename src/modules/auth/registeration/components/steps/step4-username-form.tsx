import { Button, H2, Muted } from "@/components/ui";
import { Stack } from "@/components/ui/layout/stack";
import { useAppForm } from "@/lib/useAppForm";
import { useRegisterFormStore } from "../../store";

import { registerSchema } from "../../schema";

// Extract only the username field for this step's validation
const UsernameFormSchema = registerSchema.pick({
	username: true,
});

/**
 * Props for the UserNameForm component.
 */
interface UserNameFormProps {
	/** Callback function when proceeding to next step */
	onNext?: () => void;
	/** Callback function when going back to previous step */
	onBack?: () => void;
	/** Whether to show the back button */
	showBackButton?: boolean;
}

/**
 * Step 4 of the registration process - Username Selection.
 *
 * This component handles the collection and validation of the user's desired username.
 * It provides real-time validation to ensure the username meets requirements
 * and integrates with the registration store for state persistence.
 *
 * Features:
 * - Username input with real-time validation
 * - Validation rules enforcement (length, characters, uniqueness)
 * - Integration with registration store for state persistence
 * - User-friendly validation feedback
 * - Responsive design with proper form accessibility
 *
 * @param onNext - Callback function to proceed to the next step
 * @param onBack - Callback function to go back to the previous step
 * @param showBackButton - Whether to display the back navigation button
 *
 * @example
 * ```tsx
 * <UserNameForm
 *   onNext={() => console.log('Moving to password step')}
 *   onBack={() => console.log('Going back to details')}
 *   showBackButton={true}
 * />
 * ```
 */
export function UserNameForm({
	onNext,
	onBack,
	showBackButton,
}: UserNameFormProps) {
	const { formData, updateField } = useRegisterFormStore();

	const UserNameFormFields = useAppForm({
		defaultValues: {
			username: formData.username || "",
		},
		validators: {
			onChange: UsernameFormSchema,
		},
		onSubmit: ({ value }) => {
			updateField("username", value.username);
			onNext?.();
		},
	});

	return (
		<form
			className="flex flex-col gap-4 justify-center items-center w-full"
			onSubmit={(e) => {
				e.preventDefault();
				UserNameFormFields.handleSubmit();
			}}
		>
			<Stack justify="center" align="center">
				<H2 className="font-bold">Welcome</H2>
				<Muted>Register yourself here</Muted>
			</Stack>

			<UserNameFormFields.AppField name="username">
				{(field) => <field.TextField className="mt-2" />}
			</UserNameFormFields.AppField>

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
