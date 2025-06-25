import { z } from "zod";

/**
 * Comprehensive validation schema for the registration form.
 *
 * This schema defines validation rules for all fields in the multi-step
 * registration process, including pattern matching, type validation,
 * and custom error messages.
 *
 * @example
 * ```typescript
 * // Validate entire form
 * const result = registerSchema.parse(formData);
 *
 * // Validate specific fields
 * const usernameSchema = registerSchema.pick({ username: true });
 * const usernameResult = usernameSchema.parse({ username: 'john_doe' });
 * ```
 */
//TODO: Need to add better regex in registeration
export const registerSchema = z.object({
	/**
	 * Username field validation.
	 * Requirements: No spaces or commas, must not be blank
	 */
	username: z
		.string()
		.regex(/^[^ ,]+$/, "Username must not contain spaces or comma or be blank"),

	/**
	 * Password field validation.
	 * Requirements: Minimum 8 characters, uppercase, lowercase, number, special character
	 */
	password: z
		.string()
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			"Password must be at least 8 characters, include uppercase, lowercase, number, and special character.",
		),

	/**
	 * First name field validation.
	 * Requirements: Must start with capital letter, contain only letters
	 */
	first_name: z
		.string()
		.regex(
			/^[A-Z][a-zA-Z]*$/,
			"First name must start with a capital letter and contain only letters",
		),

	/**
	 * Last name field validation.
	 * Requirements: Must start with capital letter, contain only letters
	 */
	last_name: z
		.string()
		.regex(
			/^[A-Z][a-zA-Z]*$/,
			"Last name must start with a capital letter and contain only letters",
		),

	/**
	 * Contact/phone number field validation.
	 * Requirements: Must not be empty
	 * TODO: Add international phone number validation
	 */
	contact: z.string().nonempty(),

	/**
	 * Birth date field validation.
	 * Requirements: Must be a valid Date object
	 */
	birth_date: z.date(),

	/**
	 * OTP field validation.
	 * Requirements: Must be a string
	 * TODO: Add specific OTP format validation (6 digits)
	 */
	otp: z.string(), // TODO: Need to update schema for otp
});

/**
 * Type definition derived from the registration schema.
 * Use this type for TypeScript type safety throughout the application.
 */
export type registerSchemaType = z.infer<typeof registerSchema>;
