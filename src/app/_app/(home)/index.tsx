import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button, Text } from '@/components/ui'
import { authStore,themeStore } from '@/store'
import { FiSun, FiMoon } from 'react-icons/fi'

export const Route = createFileRoute('/_app/(home)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { theme, setTheme } = themeStore()
  const {logoutUser}=authStore()
  const navigate=useNavigate()
  
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  
  return (
    <div className='h-full flex flex-col justify-center items-center gap-4 bg-white dark:bg-gray-950'>
      <Text className="text-xl font-medium">Current theme: {theme}</Text>
      
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="relative w-16 h-8 bg-gray-200 rounded-full p-1 transition-colors duration-300 focus:outline-none shadow-inner dark:bg-gray-700"
      >
        <div 
          className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
            ${theme === 'dark' ? 'translate-x-8 bg-gray-800' : 'translate-x-0'}`}
        >
          {theme === 'light' ? (
            <FiSun className="text-yellow-500" size={14} />
          ) : (
            <FiMoon className="text-blue-300" size={14} />
          )}
        </div>
      </button>
      
      {/* Optional alternative button style */}
      <Button
        onClick={toggleTheme}
        className="mt-4 flex items-center gap-2"
      >
        {theme === 'light' ? (
          <>
            <FiMoon size={18} />
            Switch to Dark Mode
          </>
        ) : (
          <>
            <FiSun size={18} />
            Switch to Light Mode
          </>
        )}
      </Button>

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