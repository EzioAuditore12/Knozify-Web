import { cn } from "@/utils/tailwind-cn";
import { DatePickerInput } from "../ui";
import { FieldError } from "./FieldErrors";
import { useFieldContext } from "@/contexts/formHookContexts";
import { InputHTMLAttributes } from "react";
import { DatePickerInputProps } from "../ui/DatePickerInput";

export const DateField=({
    className,
    ...props
}:InputHTMLAttributes<HTMLInputElement> & DatePickerInputProps)=>{
    const field = useFieldContext<string>()
    return(
        <div className="space-y-1">
            <DatePickerInput
            className={cn(className)}
            id={field.name}
            value={field.state.value ? new Date(field.state.value) : null}
            onChange={date => field.handleChange(date ? date.toISOString().split('T')[0] :  "")}
            onBlur={field.handleBlur}
            {...props}
            />
            <FieldError meta={field.state.meta}/> 
        </div>
    )
}