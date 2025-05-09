import {cva, type VariantProps} from 'class-variance-authority'
import { cn } from '@/utils/tailwind-cn'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants=cva(
    "inline-flex justify-center items-center rounded-md cursor-pointer transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants:{
            intent:{
                primary:"bg-blue-500 hover:bg-blue-200 text-white",
                secondary:"bg-gray-300 hover:bg-gray-200 text-black",
                destructive:"bg-red-500 hover:bg-red-200 text-white"
            },
            size:{
                sm:"h-6 p-1 px-2",
                md:"h-8 p-2 px-4",
                lg:"h-10 p-3 px-6"
            }
        },
        defaultVariants:{
            intent:"primary",
            size:"md"
        }
    }
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, children, intent, size, ...props }, 
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ intent, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName="Button"