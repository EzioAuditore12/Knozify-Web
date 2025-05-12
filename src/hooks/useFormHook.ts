import { createFormHook } from "@tanstack/react-form";
import { fieldContext,formContext } from "@/contexts/formHookContexts";
import { TextField,SubmitButton } from "@/components/form";


export const {useAppForm}=createFormHook({
    fieldComponents:{
        TextField,
    },
    formComponents:{
        SubmitButton
    },
    fieldContext,formContext
})