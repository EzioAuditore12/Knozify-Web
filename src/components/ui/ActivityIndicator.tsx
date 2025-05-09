import React from 'react';
import { cn } from '@/utils/tailwind-cn';
import { cva, type VariantProps } from 'class-variance-authority';

const activityIndicatorVariants = cva(
  'animate-spin', 
  {
    variants: {
      intent: {
        primary: 'text-blue-300', 
        secondary: 'text-gray-500',
        destructive: 'text-red-500',
        default: 'text-current', 
      },
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6', 
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'md',
    },
  }
);

// Update SpinnerProps to extend VariantProps
interface SpinnerProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof activityIndicatorVariants> {}

export const ActivityIndicator: React.FC<SpinnerProps> = ({
  className,
  intent,
  size,
  ...props // Other SVG props like strokeWidth, etc.
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor" 
      strokeWidth={props.strokeWidth || "2"} 
      strokeLinecap={props.strokeLinecap || "round"}
      strokeLinejoin={props.strokeLinejoin || "round"}
      className={cn(activityIndicatorVariants({ intent, size }), className)}
      {...props} 
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

ActivityIndicator.displayName = 'ActivityIndicator';