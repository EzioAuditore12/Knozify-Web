import { cn } from "@/utils/tailwind-cn"

interface LoginHeaderProps{
    className?:string
}

const LoginHeader = ({
    className
}:LoginHeaderProps) => {
  return (
    <div
    className={cn("overflow-hidden bg-red-500",className)}
    >
    <img 
    src="https://i.pinimg.com/736x/58/bd/4f/58bd4fc9ebfccc1f2de419529bbf1a12.jpg"
    className="object-cover w-full max-h-fit"
    />

    </div>
  )
}

export default LoginHeader