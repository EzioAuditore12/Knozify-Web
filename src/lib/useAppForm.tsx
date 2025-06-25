import {
	DateField,
	OtpField,
	PhoneField,
	SubmitButton,
	TextField,
} from "@/components/form";
import { fieldContext, formContext } from "@/contexts/tanstackFormContext";
import { createFormHook } from "@tanstack/react-form";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
		PhoneField,
		OtpField,
		DateField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
