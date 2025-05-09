import { cn } from "@/utils/tailwind-cn";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes} from "react";

const checkBoxVariants=cva(
    "rounded-md",
    {
        variants:{
            intent:{
                primary:"accent-blue-500",
                secondary:"accent-gray-400",
                destructive:"accent-red-500"
            },
            size:{
                sm:"size-4",
                md:"size-6",
                lg:"size-8",
                xl:"size-10"
            }
        },
        defaultVariants:{
            intent:"primary",
            size:"md"
        }
    }
)

type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof checkBoxVariants>

export const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
    ({ intent , size  , className, ...props }, ref) => {
        return (
            <input
                type="checkbox"
                ref={ref}
                className={cn(checkBoxVariants({ intent, size }), className)}
                {...props}
            />
        );
    }
);

Checkbox.displayName="CheckBox"