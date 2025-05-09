import { cn } from "@/utils/tailwind-cn"
import { cva, type VariantProps } from "class-variance-authority"
import { HTMLAttributes, } from "react"
import { forwardRef } from "react"

const textVariants=cva(
    "font-mono",
    {
        variants:{
            intent:{
                primary:"text-black dark:text-white",
                secondary:"text-gray-400",
                destructive:"text-red-500"
            },
            size:{
                sm:"text-sm",
                md:"text-md",
                lg:"text-lg",
                xl:"text-xl",
            }
        },
        defaultVariants:{
            intent:"primary",
            size:"md"
        }
    }
)

type TextProps = HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof textVariants>

export const Text = forwardRef<HTMLParagraphElement,TextProps>((
    { className,children,intent,size,...props } , ref
)=>{
    return(
        <p 
        ref={ref}
        className={cn(textVariants({intent,size}),className)}
        {...props}
        >
            {children}
        </p>
    )
})

Text.displayName="Text"

