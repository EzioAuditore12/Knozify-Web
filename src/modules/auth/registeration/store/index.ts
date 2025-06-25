import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type registerSchemaType } from "../schema";

/**
 * Type definition for the registration form data.
 * Extends the base registration schema with optional confirmPassword field.
 */
type RegisterFormData = Partial<
	registerSchemaType & { confirmPassword: string }
>;

/**
 * Zustand store interface for managing registration form state.
 * Provides methods for updating, clearing, and retrieving form data.
 */
type RegisterFormStore = {
	/** Current form data state */
	formData: RegisterFormData;

	/** Update multiple form fields at once */
	setFormData: (data: Partial<RegisterFormData>) => void;

	/** Update a single form field */
	updateField: <K extends keyof RegisterFormData>(
		field: K,
		value: RegisterFormData[K],
	) => void;

	/** Clear all form data */
	clearFormData: () => void;

	/** Get current form data */
	getFormData: () => RegisterFormData;
};

//TODO: Need to fix this logic of storing date in registeration form
/**
 * Custom storage implementation for Zustand persistence.
 * Handles serialization/deserialization of Date objects for birth_date field.
 * Uses sessionStorage for temporary persistence during registration flow.
 */
const customStorage = {
	/**
	 * Retrieves and deserializes data from sessionStorage.
	 * Converts birth_date string back to Date object if present.
	 */
	getItem: (name: string): string | null => {
		const item = sessionStorage.getItem(name);
		if (!item) return null;

		try {
			const parsed = JSON.parse(item);
			// Convert birth_date string back to Date if it exists
			if (
				parsed.state?.formData?.birth_date &&
				typeof parsed.state.formData.birth_date === "string"
			) {
				parsed.state.formData.birth_date = new Date(
					parsed.state.formData.birth_date,
				);
			}
			return JSON.stringify(parsed);
		} catch {
			return item;
		}
	},

	/**
	 * Serializes and stores data to sessionStorage.
	 * Converts Date objects to ISO strings for storage.
	 */
	setItem: (name: string, value: string): void => {
		try {
			const parsed = JSON.parse(value);
			// Convert Date to string for storage
			if (parsed.state?.formData?.birth_date instanceof Date) {
				parsed.state.formData.birth_date =
					parsed.state.formData.birth_date.toISOString();
			}
			sessionStorage.setItem(name, JSON.stringify(parsed));
		} catch {
			sessionStorage.setItem(name, value);
		}
	},

	/**
	 * Removes data from sessionStorage.
	 */
	removeItem: (name: string): void => {
		sessionStorage.removeItem(name);
	},
};

/**
 * Zustand store for managing registration form state with persistence.
 *
 * Features:
 * - Persistent storage using sessionStorage
 * - Custom serialization for Date objects
 * - Type-safe field updates
 * - Complete form data management
 *
 * Usage:
 * ```tsx
 * const { formData, updateField, setFormData } = useRegisterFormStore();
 *
 * // Update single field
 * updateField('email', 'user@example.com');
 *
 * // Update multiple fields
 * setFormData({ email: 'user@example.com', contact: '+1234567890' });
 * ```
 */
export const useRegisterFormStore = create<RegisterFormStore>()(
	persist(
		(set, get) => ({
			formData: {},
			setFormData: (data) =>
				set((state) => ({
					formData: { ...state.formData, ...data },
				})),
			updateField: (field, value) =>
				set((state) => ({
					formData: { ...state.formData, [field]: value },
				})),
			clearFormData: () => set({ formData: {} }),
			getFormData: () => get().formData,
		}),
		{
			name: "register-form-storage",
			storage: createJSONStorage(() => customStorage),
		},
	),
);
