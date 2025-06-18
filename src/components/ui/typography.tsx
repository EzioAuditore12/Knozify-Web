import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

type H1Props = ComponentProps<"h1"> & {
	asChild?: boolean;
};

function H1({ className, ...props }: H1Props) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground select-text",
				className,
			)}
			{...props}
		/>
	);
}

type H2Props = ComponentProps<"h2"> & {
	asChild?: boolean;
};

function H2({ className, ...props }: H2Props) {
	return (
		<h2
			className={cn(
				"scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-foreground select-text",
				className,
			)}
			{...props}
		/>
	);
}

type H3Props = ComponentProps<"h3"> & {
	asChild?: boolean;
};

function H3({ className, ...props }: H3Props) {
	return (
		<h3
			className={cn(
				"scroll-m-20 text-2xl font-semibold tracking-tight text-foreground select-text",
				className,
			)}
			{...props}
		/>
	);
}

type H4Props = ComponentProps<"h4"> & {
	asChild?: boolean;
};

function H4({ className, ...props }: H4Props) {
	return (
		<h4
			className={cn(
				"scroll-m-20 text-xl font-semibold tracking-tight text-foreground select-text",
				className,
			)}
			{...props}
		/>
	);
}

type PProps = ComponentProps<"p"> & {
	asChild?: boolean;
};

function P({ className, ...props }: PProps) {
	return (
		<p
			className={cn("text-base text-foreground select-text", className)}
			{...props}
		/>
	);
}

type BlockQuoteProps = ComponentProps<"blockquote"> & {
	asChild?: boolean;
};

function BlockQuote({ className, ...props }: BlockQuoteProps) {
	return (
		<blockquote
			className={cn(
				"mt-6 border-l-2 border-border pl-6 text-base text-foreground italic select-text",
				className,
			)}
			{...props}
		/>
	);
}

type CodeProps = ComponentProps<"code"> & {
	asChild?: boolean;
};

function Code({ className, ...props }: CodeProps) {
	return (
		<code
			className={cn(
				"relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] text-sm font-semibold text-foreground select-text",
				className,
			)}
			{...props}
		/>
	);
}

type LeadProps = ComponentProps<"p"> & {
	asChild?: boolean;
};

function Lead({ className, ...props }: LeadProps) {
	return (
		<p
			className={cn("text-xl text-muted-foreground select-text", className)}
			{...props}
		/>
	);
}

type LargeProps = ComponentProps<"div"> & {
	asChild?: boolean;
};

function Large({ className, ...props }: LargeProps) {
	return (
		<div
			className={cn(
				"text-xl font-semibold text-foreground select-text",
				className,
			)}
			{...props}
		/>
	);
}

type SmallProps = ComponentProps<"small"> & {
	asChild?: boolean;
};

function Small({ className, ...props }: SmallProps) {
	return (
		<small
			className={cn(
				"text-sm font-medium leading-none text-foreground select-text",
				className,
			)}
			{...props}
		/>
	);
}

type MutedProps = ComponentProps<"p"> & {
	asChild?: boolean;
};

function Muted({ className, ...props }: MutedProps) {
	return (
		<p
			className={cn("text-sm text-muted-foreground select-text", className)}
			{...props}
		/>
	);
}

export { BlockQuote, Code, H1, H2, H3, H4, Large, Lead, Muted, P, Small };
export type {
	H1Props,
	H2Props,
	H3Props,
	H4Props,
	PProps,
	BlockQuoteProps,
	CodeProps,
	LeadProps,
	LargeProps,
	SmallProps,
	MutedProps,
};
