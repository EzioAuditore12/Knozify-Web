import { cn } from "@/lib/utils";
import {
	type ComponentProps,
	type FormEvent,
	type FormEventHandler,
	type ReactNode,
} from "react";

export type FormProps = ComponentProps<"form"> & {
	children?: ReactNode;
	/**
	 * Automatically call event.preventDefault() on submit
	 * @default true
	 */
	preventDefault?: boolean;
	/**
	 * Your submit handler
	 */
	onSubmit?: FormEventHandler<HTMLFormElement>;
};

export function Form({
	className,
	children,
	preventDefault = true,
	onSubmit,
	...props
}: FormProps) {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (preventDefault) e.preventDefault();
		onSubmit?.(e);
	};

	return (
		<form
			className={cn("space-y-4", className)}
			onSubmit={handleSubmit}
			{...props}
		>
			{children}
		</form>
	);
}
