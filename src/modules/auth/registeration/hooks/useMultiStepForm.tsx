import { type ReactElement, useMemo, useState } from "react";

/**
 * Custom hook for managing multi-step form navigation and state.
 *
 * This hook provides a flexible way to create multi-step forms by accepting
 * a factory function that receives navigation controls and returns the step components.
 *
 * @param stepsFactory - Function that takes navigation controls and returns an array of React elements
 * @returns Object containing current step, navigation methods, and step information
 *
 * @example
 * ```tsx
 * const { currentStepIndex, step, next, back, isFirstStep, isLastStep } = useMultiStepForm(
 *   ({ next, back }) => [
 *     <Step1 onNext={next} />,
 *     <Step2 onNext={next} onBack={back} />,
 *     <Step3 onBack={back} />
 *   ]
 * );
 * ```
 */
export function useMultiStepForm(
	stepsFactory: (navigation: {
		next: () => void;
		back: () => void;
	}) => ReactElement[],
) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	/**
	 * Navigate to the next step.
	 * Will not exceed the total number of steps.
	 */
	const next = () => {
		setCurrentStepIndex((i) => {
			if (i >= steps.length - 1) {
				return i;
			}
			return i + 1;
		});
	};

	/**
	 * Navigate to the previous step.
	 * Will not go below the first step.
	 */
	const back = () => {
		setCurrentStepIndex((i) => {
			if (i <= 0) {
				return i;
			}
			return i - 1;
		});
	};

	/**
	 * Navigate directly to a specific step by index.
	 * @param index - Zero-based index of the step to navigate to
	 */
	const goto = (index: number) => {
		setCurrentStepIndex(index);
	};

	// Memoize steps to prevent unnecessary re-renders
	const steps = useMemo(() => stepsFactory({ next, back }), [next, back]);

	return {
		/** Current step index (0-based) */
		currentStepIndex,
		/** Current step component */
		step: steps[currentStepIndex],
		/** All step components */
		steps,
		/** Whether currently on the first step */
		isFirstStep: currentStepIndex === 0,
		/** Whether currently on the last step */
		isLastStep: currentStepIndex === steps.length - 1,
		/** Navigate to specific step */
		goto,
		/** Navigate to next step */
		next,
		/** Navigate to previous step */
		back,
	};
}
