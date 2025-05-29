import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { authStore } from '@/store'

export const Route = createFileRoute('/_authentication')({
  beforeLoad:()=>{
      const user=authStore.getState().user
      if(user){
          throw redirect({
              to:'/'
          })
      }
  },
  component:()=><Outlet/>,
})

