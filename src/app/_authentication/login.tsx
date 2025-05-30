import { createFileRoute, useNavigate} from '@tanstack/react-router'
import { useState } from 'react'

//hook
import { LoginUser } from '@/modules/auth/login/hooks/loginUser'

//components
import LoginHeader from '@/modules/auth/login/components/loginHeader'
import LoginForm from '@/modules/auth/login/components/loginForm'


//Need to improve the login UI
export const Route = createFileRoute('/_authentication/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [error,setError]=useState<string>("")
  const navigate=useNavigate()

   const handleSubmit = async ({ username, password }: { username: string, password: string }) => {
    
    const result = await LoginUser(username, password)
    if (result.success) {
      navigate({to:"/",replace:true})
    } else {
      setError(result.message || '')
    }
  }
  
  {/*TODO Need to fix this login page responsiveness accross all devices and styling */}
  return (
    
     <div className='max-h-dvh p-3 dark:bg-gray-900 flex flex-col gap-y-4 grow-1 lg:flex-row lg:gap-x-2'>
      {/*TODO Need to fix this taking extra space in lg screens */}
      <LoginHeader
      className='w-full h-[40%] lg:w-[50%] lg:h-dvh rounded-2xl min-h-[200px]'
      />
      <LoginForm
      className='h-[60%] lg:h-dvh'
      onSubmit={handleSubmit}
      error={error}
      />
    </div>
  )
}
