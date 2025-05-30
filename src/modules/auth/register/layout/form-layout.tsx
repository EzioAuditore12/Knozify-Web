import { Outlet } from "@tanstack/react-router";

export default function FormLayout(){
    return(
        <div className="grid md:grid-cols-2 border-2 border-black h-full w-full rounded-xl
                        max-w-[800px] overflow-hidden shadow-2xl">
            <div className="bg-blue-500"/>
            <Outlet/>
        </div>
    )
}