import {motion} from 'framer-motion'
import { useState } from 'react'
import {FaBars} from 'react-icons/fa'
import { menuItems } from './Items/MenuItems'
import { NavItems } from './Items/NavItem'
import { Tooltip } from 'react-tooltip'

/*
TODO: Need to add logo here
TODO: Need to change the styling 
*/
export const MenuBarDesktop = () => {
    const [isSidebarOpen,setIsSidebarOpen]=useState<boolean>(false)
  return <div className='border-r-1 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 overflow-auto'>
    <Tooltip 
        id="sidebar-tooltip"
        place="right"
        offset={40}
    />
    <motion.div 
    initial={{width:60}}
    animate={{width: isSidebarOpen ? 240 : 60}}
    transition={{duration:0.4}}
    className='h-screen p-4 dark:text-white'
    >
        <button 
        className='text-xl mb-4'
        onClick={()=>setIsSidebarOpen(prev=>!prev)}>
            <FaBars/>
        </button>
        <nav className='flex flex-col gap-11'>
          {menuItems.map((item,index)=>{
            return(
              <NavItems
              key={index}
              Icon={item.icon}
              text={item.text}
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
              to={item.to}
              />
            )
          })}
        </nav>
    </motion.div>
  </div>
}

