import { cn } from "@/utils/tailwind-cn";
import {cva, type VariantProps} from 'class-variance-authority'
import { forwardRef, InputHTMLAttributes } from "react";

const inputVariants=cva(
    "border-2 p-2 px-4 focus:border-blue-500 outline-none",
    {
        variants:{
            intent:{
                primary:"border-black",
                secondary:"border-gray-500",
                destructive:"border-red-500"
            }
        },
        defaultVariants:{
            intent:"primary"
        }
    }
)

type InputProps=InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>

export const Input=forwardRef<HTMLInputElement,InputProps>((
    {className,intent,children,...props},ref
)=>{
    return(
        <input
        ref={ref}
        className={cn(inputVariants({intent}),className)}
        {...props}
        >
            {children}
        </input>
    )
})

Input.displayName="Input"