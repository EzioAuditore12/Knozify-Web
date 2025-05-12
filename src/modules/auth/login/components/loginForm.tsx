import { Text,Button } from '@/components/ui'
import { cn } from '@/utils/tailwind-cn'
//schema
import { loginSchema } from '../schema/LoginSchema'

//type
import { loginUserObject } from '../types/userLoginType'

//Form Hook
import { useAppForm } from '@/hooks/useFormHook'



type LoginFormProps = {
  className:string
  onSubmit: (data: { username: string; password: string }) => Promise<void>
  error?: string
}


const LoginForm = (
    {
    className,
    onSubmit,
    error
    }:LoginFormProps) => {
    const loginForm=useAppForm({
    defaultValues:loginUserObject,
    validators:{
      onChange:loginSchema
    },
    onSubmit:async({value})=>{
     await onSubmit({ username: value.username, password: value.password })
    }
  })
  return (
    <div className={cn('flex flex-col gap-y-3 justify-center lg:h-full lg:justify-around mt-3 items-center pb-4',className)}>
       
       {/* Login Header */}
       <div className='flex flex-col w-full justify-center items-center gap-y-1'>
         <Text
        style={{
            fontFamily:"MerriWeather"
        }}
        className='text-2xl font-semibold self-start'
        >Welcome Back</Text>

        <Text
        intent={"secondary"}
        >
          Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
        </Text>
       </div>

        {/* Login Form Input */}
       <form className='w-full flex flex-col gap-y-4'
         onSubmit={(e) => {
        e.preventDefault();
        loginForm.handleSubmit();
      }}
       >
          <loginForm.AppField
          name="username"
          children={(field) => (
          <field.TextField
          className='w-full rounded-lg bg-gray-100 border-gray-300'
          placeholder='Username'
          autoComplete="username"
          />
          )}
          />
          <loginForm.AppField
          name="password"
          children={(field) => (
          <field.TextField
          className='w-full rounded-lg bg-gray-100 border-gray-300'
          placeholder='Password'
          type="password"
          autoComplete="current-password"
          />
          )}
          />
          <Text className='text-blue-400 dark:text-blue-400 place-self-end'>Forgot Password?</Text>

          <loginForm.AppForm>
          <loginForm.SubmitButton
          title={"Login"}
          className="disabled:bg-gray-600 w-full max-w-[400px] self-center"
        />
        </loginForm.AppForm>
        </form>

          {/* Error */}
        {error && <Text intent={"destructive"}>{error}</Text>}

        <div className="flex items-center my-4 w-full">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm font-medium">OR LOGIN WITH</span>
        <div className="flex-grow border-t border-gray-300"></div>
        </div>

          {/* Oauth */}
        <div className='flex flex-row justify-center items-center gap-x-2'>
           <Button>
              G
           </Button>
           <Button>
              F
           </Button>
        </div>
          

        
    </div>
  )
}

export default LoginForm