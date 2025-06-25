import { Button, H2, Muted } from "@/components/ui";
import { Stack } from "@/components/ui/layout/stack";
import { useAppForm } from "@/lib/useAppForm";
import { useRegisterFormStore } from "../../store";

import { registerSchema } from "../../schema";

// Extract only the OTP field for this step's validation
const OtpValidationSchema = registerSchema.pick({
	otp: true,
});

/**
 * Props for the OtpValidationForm component.
 */
interface OtpValidationFormProps {
	/** Callback function when proceeding to next step */
	onNext?: () => void;
	/** Callback function when going back to previous step */
	onBack?: () => void;
	/** Whether to show the back button */
	showBackButton?: boolean;
}

/**
 * Step 2 of the registration process - OTP Verification.
 *
 * This component handles the verification of the OTP (One-Time Password) sent
 * to the user's phone number. It provides a user-friendly OTP input interface
 * and validates the entered code.
 *
 * Features:
 * - 6-digit OTP input with individual character boxes
 * - Auto-focus progression between input fields
 * - Real-time validation using Zod
 * - Integration with registration store for state persistence
 * - Resend OTP functionality (UI placeholder)
 *
 * @param onNext - Callback function to proceed to the next step
 * @param onBack - Callback function to go back to the previous step
 * @param showBackButton - Whether to display the back navigation button
 *
 * @example
 * ```tsx
 * <OtpValidationForm
 *   onNext={() => console.log('OTP verified, moving to details')}
 *   onBack={() => console.log('Going back to phone input')}
 *   showBackButton={true}
 * />
 * ```
 */
export function OtpValidationForm({
	onNext,
	onBack,
	showBackButton,
}: OtpValidationFormProps) {
	const { formData, updateField } = useRegisterFormStore();

	const OtpValidationForm = useAppForm({
		defaultValues: {
			otp: formData.otp || "",
		},
		validators: {
			onChange: OtpValidationSchema,
		},
		onSubmit: ({ value }) => {
			updateField("otp", value.otp);
			onNext?.();
		},
	});

	return (
		<form
			className="flex flex-col gap-4 justify-center items-center"
			onSubmit={(e) => {
				e.preventDefault();
				OtpValidationForm.handleSubmit();
			}}
		>
			<Stack justify="center" align="center">
				<H2 className="font-bold">Welcome</H2>
				<Muted>Register yourself here</Muted>
			</Stack>

			<OtpValidationForm.AppField name="otp">
				{(field) => <field.OtpField className="mt-2" />}
			</OtpValidationForm.AppField>

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
