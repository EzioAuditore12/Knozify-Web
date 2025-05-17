import { GoHome, GoSearch,GoVideo,GoPlusCircle, GoPerson } from "react-icons/go";
import { Link } from "@tanstack/react-router";

//TODO: Need to make this logic more scalable in future
export const MenuBarMobile = () => {
    return (
        <div className="fixed bottom-0 h-16 border-t-2 border-gray-200 w-full bg-white dark:bg-gray-900 dark:border-gray-700 shadow-2xl">
            <div className="flex justify-around items-center h-full">
                <Link 
                    to="/" 
                    className="flex flex-col items-center w-16 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                    <GoHome size={24} />
                </Link>

                 <Link 
                    to="/search" 
                    className="flex flex-col items-center w-16 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                    <GoSearch size={24} />
                </Link>

                 <Link 
                    to="/" 
                    className="flex flex-col items-center w-16 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                    <GoPlusCircle size={24} />
                </Link>
                
                <Link 
                    to="/reels" 
                    className="flex flex-col items-center w-16 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                    <GoVideo size={24} />
                </Link>
                
                <Link 
                    to="/profile" 
                    className="flex flex-col items-center w-16 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                    <GoPerson size={24} />
                </Link>
            </div>
        </div>
    );
};