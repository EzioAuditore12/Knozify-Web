import { useFieldContext } from "@/contexts/tanstackFormContext";
import { cn } from "@/lib/utils";
import React from "react";
import { Label } from "../ui";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "../ui/input-otp";
import { Stack } from "../ui/layout/stack";
import { FieldError } from "./field-error";

/**
 * OtpField - One-Time Password Input Component
 *
 * A specialized input component for collecting OTP (One-Time Password) values
 * with individual character slots and automatic focus progression. Perfect for
 * verification flows like phone number or email verification.
 *
 * Features:
 * - Individual character input slots with auto-focus progression
 * - Configurable length and grouping for different OTP formats
 * - Visual separator between groups for better readability
 * - Integration with TanStack Form for state management
 * - Automatic error display and validation feedback
 * - Keyboard navigation support (arrow keys, backspace)
 * - Copy/paste support for complete OTP values
 * - Responsive design with proper accessibility
 *
 * @param className - Additional CSS classes for styling customization
 * @param length - Total number of OTP digits (default: 6)
 * @param groupSize - Number of digits per group before separator (default: 3)
 * @param inputProps - Additional props passed to the InputOTP component
 *
 * @example
 * ```tsx
 * // Standard 6-digit OTP with 3-digit groups
 * <OtpField length={6} groupSize={3} />
 *
 * // 4-digit OTP without grouping
 * <OtpField length={4} groupSize={4} />
 *
 * // Custom styling
 * <OtpField className="my-custom-class" length={6} />
 * ```
 */
export const OtpField = ({
	className,
	length = 6,
	groupSize = 3,
	...inputProps
}: { className?: string; length?: number; groupSize?: number } & Record<
	string,
	any
>) => {
	const field = useFieldContext<string>();
	const hasError = field.state.meta.errors.length > 0;

	// Split indices into groups for rendering
	const groups = [];
	for (let i = 0; i < length; i += groupSize) {
		groups.push(
			Array.from(
				{ length: Math.min(groupSize, length - i) },
				(_, idx) => i + idx,
			),
		);
	}

	return (
		<Stack spacing="sm" className={cn("w-full", className)}>
			<Label htmlFor={field.name}>
				{field.name.charAt(0).toUpperCase() + field.name.slice(1)}
			</Label>
			<InputOTP
				id={field.name}
				value={field.state.value}
				onChange={field.handleChange}
				maxLength={length}
				{...inputProps}
			>
				{groups.map((group, groupIdx) => (
					<React.Fragment key={`group-${groupIdx}`}>
						<InputOTPGroup>
							{group.map((slotIdx) => (
								<InputOTPSlot key={slotIdx} index={slotIdx} />
							))}
						</InputOTPGroup>
						{groupIdx < groups.length - 1 && (
							<InputOTPSeparator key={`sep-${groupIdx}`} />
						)}
					</React.Fragment>
				))}
			</InputOTP>
			<div className="text-sm text-red-500 min-h-5">
				{hasError && <FieldError meta={field.state.meta} />}
			</div>
		</Stack>
	);
};
