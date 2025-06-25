import { cn } from "@/lib/utils";
import { Fallback, Image, Root } from "@radix-ui/react-avatar";
import { type ComponentProps } from "react";

type AvatarProps = ComponentProps<typeof Root>;

function Avatar({ className, ...props }: AvatarProps) {
	return (
		<Root
			data-slot="avatar"
			className={cn(
				"relative flex size-8 shrink-0 overflow-hidden rounded-full",
				className,
			)}
			{...props}
		/>
	);
}

type AvatarImageProps = ComponentProps<typeof Image>;

function AvatarImage({ className, ...props }: AvatarImageProps) {
	return (
		<Image
			data-slot="avatar-image"
			className={cn("aspect-square size-full", className)}
			{...props}
		/>
	);
}

type AvatarFallbackProps = ComponentProps<typeof Fallback>;

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
	return (
		<Fallback
			data-slot="avatar-fallback"
			className={cn(
				"bg-muted flex size-full items-center justify-center rounded-full",
				className,
			)}
			{...props}
		/>
	);
}

export { Avatar, AvatarImage, AvatarFallback };
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps };
