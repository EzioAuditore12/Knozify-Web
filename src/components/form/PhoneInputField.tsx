import { useFieldContext } from "@/contexts/formHookContexts";
import { cn } from "@/utils/tailwind-cn";
import { FieldError } from "./FieldErrors";
import { InputHTMLAttributes } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput, { type Country } from 'react-phone-number-input'

type PhoneNumberInputFieldProps = {
    defaultCountry?: Country;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

export const PhoneInputField = ({
    className,
    defaultCountry,
    ...restInputProps
}: PhoneNumberInputFieldProps) => {
    const field = useFieldContext<string>()
    
    return(
        <div>
            <PhoneInput
            className={cn(className)}
            defaultCountry={defaultCountry}
            id={field.name}
            name={field.name} // It's good practice to include the name attribute
            value={field.state.value} // This is a string from the form context
            onChange={value => field.handleChange(value === undefined ? '' : value)} // Handle undefined from PhoneInput
            onBlur={field.handleBlur}
            {...restInputProps} // Spread the remaining compatible props
            />
            <FieldError meta={field.state.meta}/> 
        </div>
    )
}