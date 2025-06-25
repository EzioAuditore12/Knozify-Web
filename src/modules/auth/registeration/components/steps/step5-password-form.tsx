import { Button, H2, Muted } from "@/components/ui";
import { Stack } from "@/components/ui/layout/stack";
import { useAppForm } from "@/lib/useAppForm";
import { useRegisterFormStore } from "../../store";

import { z } from "zod";
import { registerSchema } from "../../schema";

// Extend the password schema to include confirm password validation
const PasswordFormSchema = registerSchema
	.pick({
		password: true,
	})
	.extend({
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

/**
 * Props for the PasswordForm component.
 */
interface PasswordFormProps {
	/** Callback function when form is submitted successfully */
	onSubmit?: () => void;
	/** Callback function when going back to previous step */
	onBack?: () => void;
	/** Whether to show the back button */
	showBackButton?: boolean;
}

/**
 * Step 5 of the registration process - Password Creation.
 *
 * This is the final step of the registration process where users create their
 * password. It includes password confirmation to ensure accuracy and implements
 * strong password validation rules.
 *
 * Features:
 * - Password input with strength requirements
 * - Password confirmation with matching validation
 * - Real-time validation using Zod with custom refinement
 * - Integration with registration store for state persistence
 * - Password visibility toggle
 * - Form submission handling for registration completion
 *
 * @param onSubmit - Callback function for successful form submission
 * @param onBack - Callback function to go back to the previous step
 * @param showBackButton - Whether to display the back navigation button
 *
 * @example
 * ```tsx
 * <PasswordForm
 *   onSubmit={() => console.log('Registration complete!')}
 *   onBack={() => console.log('Going back to username')}
 *   showBackButton={true}
 * />
 * ```
 */
export function PasswordForm({
	onSubmit,
	onBack,
	showBackButton,
}: PasswordFormProps) {
	const { formData, setFormData, getFormData } = useRegisterFormStore();

	const PasswordFormFields = useAppForm({
		defaultValues: {
			password: formData.password || "",
			confirmPassword: formData.confirmPassword || "",
		},
		validators: {
			onChange: PasswordFormSchema,
		},
		onSubmit: ({ value }) => {
			setFormData({
				password: value.password,
				confirmPassword: value.confirmPassword,
			});

			// Final form submission - you can access all form data here
			const finalFormData = getFormData();
			console.log("Final registration data:", finalFormData);

			onSubmit?.();
		},
	});

	return (
		<form
			className="flex flex-col gap-4 justify-center items-center w-full"
			onSubmit={(e) => {
				e.preventDefault();
				PasswordFormFields.handleSubmit();
			}}
		>
			<Stack justify="center" align="center">
				<H2 className="font-bold">Welcome</H2>
				<Muted>Register yourself here</Muted>
			</Stack>

			<PasswordFormFields.AppField name="password">
				{(field) => <field.TextField className="mt-2" type="password" />}
			</PasswordFormFields.AppField>

			<PasswordFormFields.AppField
				name="confirmPassword"
				validators={{
					onChangeListenTo: ["password"],
					onChange: ({ value, fieldApi }) => {
						value !== fieldApi.form.getFieldValue("password") &&
							"Passwords do not match";
					},
				}}
			>
				{(field) => <field.TextField className="mt-2" type="password" />}
			</PasswordFormFields.AppField>

			<Stack direction={"horizontal"} horizontalSpacing={"md"} className="mt-4">
				{showBackButton && (
					<Button type="button" variant="outline" onClick={onBack}>
						Back
					</Button>
				)}
				<Button type="submit">Submit</Button>
			</Stack>
		</form>
	);
}
