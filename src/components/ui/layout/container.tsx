import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const containerStyles = cva("flex flex-1", {
	variants: {
		centered: {
			true: "justify-center items-center",
			false: "",
		},
		padded: {
			true: "p-4",
			false: "",
		},
	},
	defaultVariants: {
		centered: false,
		padded: false,
	},
});

type ContainerProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof containerStyles> & {
		className?: string;
		ref?: React.Ref<HTMLDivElement>;
	};

function Container({
	className,
	centered,
	padded,
	children,
	ref,
	...props
}: ContainerProps) {
	return (
		<div
			ref={ref}
			className={cn(containerStyles({ centered, padded }), className)}
			{...props}
		>
			{children}
		</div>
	);
}

export { Container, type ContainerProps };
