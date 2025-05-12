import { useStore } from "@tanstack/react-form";
import { useFormContext } from "@/contexts/formHookContexts";
import { Button} from "../ui";
import { cn } from "@/utils/tailwind-cn";
import { HTMLAttributes } from "react";

type SubmitButtonProps={
    title:String
} & HTMLAttributes<HTMLButtonElement>

export const SubmitButton=({
    title,
    className,
    ...props
}:SubmitButtonProps)=>{
    const form = useFormContext()

    const [isSubmitting,canSubmit]=useStore(form.store,(state)=>[
        state.isSubmitting,
        state.canSubmit
    ])

    return(
        <Button
        className={cn(className)}
        type="submit"
        disabled={isSubmitting || !canSubmit}
        {...props}
        >
            {title}
        </Button>
    )

}