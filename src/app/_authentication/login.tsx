import { createFileRoute,redirect,  useNavigate} from '@tanstack/react-router'
import { authStore } from '@/store'
import { useState } from 'react'

//hook
import { LoginUser } from '@/modules/auth/login/hooks/loginUser'

//components
import LoginHeader from '@/modules/auth/login/components/loginHeader'
import LoginForm from '@/modules/auth/login/components/loginForm'


export const Route = createFileRoute('/_authentication/login')({
  beforeLoad:()=>{
    const user=authStore.getState().user
    if(user){
        throw redirect({
            to:'/'
        })
    }
},
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
  
  {/*TODO Need to fix this login page responsiveness accross all deviices */}
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
