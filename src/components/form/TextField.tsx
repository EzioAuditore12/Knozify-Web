import { useFieldContext } from "@/contexts/formHookContexts";
import { cn } from "@/utils/tailwind-cn";
import { Input} from "../ui";
import { FieldError } from "./FieldErrors";
import { InputHTMLAttributes } from "react";

export const TextField=({
    className,
    ...inputProps
}:InputHTMLAttributes<HTMLInputElement>)=>{
    const field = useFieldContext<string>()

    return(
        <div className="space-y-1">
            <Input
            className={cn(className)}
            id={field.name}
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            {...inputProps}
            />
            <FieldError meta={field.state.meta}/> 
        </div>
    )
}