import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Checkbox,Button,Text,ActivityIndicator,Input } from '@/components/ui'
import { authStore } from '@/store'


export const Route = createFileRoute('/_app/(home)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [checked,setIsChecked]=useState(false)
  const {logoutUser}=authStore.getState()
  console.log(checked)
  const navigate=useNavigate()

  const access=authStore.getState().authTokens?.access
  const refresh=authStore.getState().authTokens?.refresh
  return(
   <div className='mt-2 flex flex-col gap-y-2 p-2'>
    <Text intent={"destructive"}>Hello these are the reusbale ui components</Text>
    <Text intent={"secondary"}>{access}</Text>
    <Text intent={"secondary"}>{refresh}</Text>
    <Checkbox
    checked={checked}
    onChange={e => setIsChecked(e.target.checked)}
    />
    <Button>
      Hello
    </Button>
    <Input
    placeholder="Hello"
    className='text-red-500'
    />  
    <ActivityIndicator
    className='text-pink-500'
    size={"xl"}
    />
    <Button
    onClick={()=>{
      logoutUser()
      navigate({to:"/login",replace:true})
    }}
    >
      Logout
      </Button>
   </div>
  )
}
