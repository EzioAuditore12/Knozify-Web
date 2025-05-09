import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Checkbox,Button,Text,ActivityIndicator,Input } from '@/components/ui'

export const Route = createFileRoute('/_app/(home)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [checked,setIsChecked]=useState(false)

  console.log(checked)

  return(
   <div className='mt-2 flex flex-col gap-y-2'>
    <Text intent={"destructive"}>Hello these are the reusbale ui components</Text>
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
   </div>
  )
}
