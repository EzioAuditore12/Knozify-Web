import { AnyFieldMeta } from "@tanstack/react-form";
import { Text } from "../ui";
import { ZodError } from "zod";
import { HTMLAttributes } from "react";

type FieldErrorProps={
    meta:AnyFieldMeta,
} & HTMLAttributes<HTMLParagraphElement>

export const FieldError=({
    meta,
    className,
    ...props
}:FieldErrorProps)=>{
    if(!meta.isTouched) {
        return null;
    }
    return meta.errors.map(({message}:ZodError,index)=>
        <Text
        key={index}
        intent={"destructive"}
        {...props}
        >
            {message}
        </Text>
        )
};