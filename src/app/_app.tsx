import { createFileRoute,Link, Outlet,redirect} from '@tanstack/react-router'
import { authStore } from '@/store'

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
    return (
      <div>
        <header className="bg-gray-800 text-white p-4">My App Header</header>
        <nav className="bg-gray-200 p-2">Sidebar or Navigation</nav>
  
        <main className="p-4 flex flex-col">
          <div>
            <ul className='flex flex-row gap-x-4 border-2 border-black self-start'>
              <li>
                <Link to="/" className='[&.active]:text-green-500 [&.active]:font-bold'>
                Home
                </Link>
              </li>
              <li>
                <Link to="/search" className='[&.active]:text-green-500 [&.active]:font-bold'>
                Search
                </Link>
              </li>
              <li>
                <Link to="/reels" className='[&.active]:text-green-500 [&.active]:font-bold'>
                Reel
                </Link>
              </li>
              <li>
              <Link to="/profile" className='[&.active]:text-green-500 [&.active]:font-bold'>
               Profile
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </main>
      </div>
    )
  }
  
  

