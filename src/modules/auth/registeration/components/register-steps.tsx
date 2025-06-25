import { cn } from "@/lib/utils";
import { CheckIcon, type LucideIcon } from "lucide-react";
import { type ComponentProps } from "react";

/**
 * Props for the RegisterStepsBanner component.
 */
interface RegisterStepsBannerProps extends ComponentProps<"div"> {
	/** Current active step (1-based) */
	currentStep: number;
	/** Total number of steps */
	totalSteps: number;
	/** Labels for each step */
	stepLabels: string[];
	/** Icons for each step */
	stepIcons: LucideIcon[];
}

/**
 * A visually rich step indicator component for the registration process.
 *
 * Features:
 * - Visual progress indicator with icons and labels
 * - Progress bar showing completion percentage
 * - Support for completed, current, and upcoming step states
 * - Responsive design with dark mode support
 * - Accessible with proper ARIA attributes
 *
 * @param currentStep - The current active step (1-based)
 * @param totalSteps - Total number of steps in the process
 * @param stepLabels - Array of labels for each step
 * @param stepIcons - Array of Lucide icons for each step
 *
 * @example
 * ```tsx
 * <RegisterStepsBanner
 *   currentStep={2}
 *   totalSteps={5}
 *   stepLabels={['Phone', 'Verify', 'Details', 'Username', 'Password']}
 *   stepIcons={[PhoneIcon, ShieldCheckIcon, UserIcon, AtSignIcon, LockIcon]}
 * />
 * ```
 */
export function RegisterStepsBanner({
	className,
	currentStep,
	totalSteps,
	stepLabels,
	stepIcons,
	...props
}: RegisterStepsBannerProps) {
	return (
		<div
			className={cn("bg-muted p-6 flex flex-col justify-center", className)}
			{...props}
		>
			<div className="space-y-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-foreground mb-2">
						Create Account
					</h2>
					<p className="text-sm text-muted-foreground">
						Step {currentStep} of {totalSteps}
					</p>
				</div>

				<div className="space-y-4">
					{Array.from({ length: totalSteps }, (_, index) => {
						const stepNumber = index + 1;
						const isCompleted = stepNumber < currentStep;
						const isCurrent = stepNumber === currentStep;
						const isUpcoming = stepNumber > currentStep;

						const StepIcon = stepIcons[index];
						const stepLabel = stepLabels[index] || `Step ${stepNumber}`;

						if (!StepIcon) {
							console.warn(`No icon provided for step ${stepNumber}`);
							return null;
						}

						return (
							<div
								key={stepNumber}
								className={cn(
									"flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
									{
										"bg-primary text-primary-foreground shadow-sm": isCurrent,
										"bg-primary/10 text-primary": isCompleted,
										"text-muted-foreground": isUpcoming,
									},
								)}
							>
								<div
									className={cn(
										"flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200",
										{
											"bg-primary border-primary text-primary-foreground":
												isCurrent,
											"bg-green-500 border-green-500 text-white": isCompleted,
											"border-muted-foreground/30": isUpcoming,
										},
									)}
								>
									{isCompleted ? (
										<CheckIcon className="w-4 h-4" />
									) : (
										<StepIcon className="w-4 h-4" />
									)}
								</div>

								<div className="flex-1">
									<div
										className={cn("font-medium text-sm", {
											"text-primary-foreground": isCurrent,
											"text-primary": isCompleted,
											"text-muted-foreground": isUpcoming,
										})}
									>
										{stepLabel}
									</div>
									<div
										className={cn("text-xs", {
											"text-primary-foreground/80": isCurrent,
											"text-primary/80": isCompleted,
											"text-muted-foreground/60": isUpcoming,
										})}
									>
										{isCompleted && "Completed"}
										{isCurrent && "Current step"}
										{isUpcoming && "Upcoming"}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Progress bar */}
				<div className="mt-6">
					<div className="flex justify-between text-xs text-muted-foreground mb-2">
						<span>Progress</span>
						<span>
							{Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}%
						</span>
					</div>
					<div className="w-full bg-muted-foreground/20 rounded-full h-2">
						<div
							className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
							style={{
								width: `${Math.max(8, ((currentStep - 1) / (totalSteps - 1)) * 100)}%`,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
