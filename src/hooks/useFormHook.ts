import { createFormHook } from "@tanstack/react-form";
import { fieldContext,formContext } from "@/contexts/formHookContexts";
import { TextField,SubmitButton,DateField,PhoneInputField } from "@/components/form";


export const {useAppForm}=createFormHook({
    fieldComponents:{
        TextField,
        DateField,
        PhoneInputField
    },
    formComponents:{
        SubmitButton
    },
    fieldContext,formContext
})