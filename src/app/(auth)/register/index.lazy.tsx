import { createLazyFileRoute } from "@tanstack/react-router";
import {
	AtSignIcon,
	LockIcon,
	MessageSquareIcon,
	PhoneIcon,
	UserIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui";
import { Stack } from "@/components/ui/layout/stack";

import { RegisterStepsBanner } from "@/modules/auth/registeration/components";
import {
	OtpValidationForm,
	PasswordForm,
	UserCredentialsForm,
	UserDetailsForm,
	UserNameForm,
} from "@/modules/auth/registeration/components/steps";
import { useMultiStepForm } from "@/modules/auth/registeration/hooks/useMultiStepForm";

export const Route = createLazyFileRoute("/(auth)/register/")({
	component: RouteComponent,
});

function RouteComponent() {
	const stepLabels = [
		"Phone Number",
		"OTP Verification",
		"Personal Details",
		"Username",
		"Password",
	];

	const stepIcons = [
		PhoneIcon,
		MessageSquareIcon,
		UserIcon,
		AtSignIcon,
		LockIcon,
	];

	const handleFinalSubmit = () => {
		console.log("Registration completed!");
		// Handle final form submission here
	};

	const { step, steps, currentStepIndex } = useMultiStepForm(
		({ next, back }) => [
			<UserCredentialsForm
				key="step1"
				onNext={next}
				onBack={back}
				showBackButton={false}
			/>,
			<OtpValidationForm
				key="step2"
				onNext={next}
				onBack={back}
				showBackButton={true}
			/>,
			<UserDetailsForm
				key="step3"
				onNext={next}
				onBack={back}
				showBackButton={true}
			/>,
			<UserNameForm
				key="step4"
				onNext={next}
				onBack={back}
				showBackButton={true}
			/>,
			<PasswordForm
				key="step5"
				onSubmit={handleFinalSubmit}
				onBack={back}
				showBackButton={true}
			/>,
		],
	);

	return (
		<div className="min-h-svh flex flex-col justify-center items-center p-2 w-full">
			<Card className="overflow-hidden p-0 w-full max-w-4xl h-[600px]">
				<CardContent className="grid p-0 md:grid-cols-3 h-full">
					<RegisterStepsBanner
						className="hidden md:block col-span-1"
						currentStep={currentStepIndex + 1}
						totalSteps={steps.length}
						stepLabels={stepLabels}
						stepIcons={stepIcons}
					/>

					<Stack justify={"center"} align={"center"} className="col-span-2 p-2">
						{step}
					</Stack>
				</CardContent>
			</Card>
		</div>
	);
}
