import { createFileRoute,Link, Outlet,redirect} from '@tanstack/react-router'
import { authStore } from '@/store'
import { MenuBarDesktop } from '@/components/layout/MenuBar/MenuBar.desktop'
import { useIsMobile } from '@/hooks/use-mobile'
import { MenuBarMobile } from '@/components/layout/MenuBar/MenuBar.mobile'
export const Route = createFileRoute('/_app')({
  beforeLoad:()=>{
        const user=authStore.getState().user
        if(!user){
            throw redirect({
                to:'/login'
            })
        }
    },
    component: AppLayout 
})

function AppLayout() {
    const mobileBreakpoint=useIsMobile()
    return (
      <div className='flex'>
        {mobileBreakpoint ? <MenuBarMobile/> : <MenuBarDesktop/>}
        <div className='flex-1 min-h-screen'>
         <Outlet />
         </div>
      </div>
    )
  }
  
  
  
  

