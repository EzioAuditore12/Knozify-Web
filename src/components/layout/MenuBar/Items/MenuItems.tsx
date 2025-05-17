import { 
    GoHome,
    GoSearch,
    GoBook,
    GoDeviceCameraVideo,
    GoMail,
    GoProjectRoadmap,
    GoPlusCircle ,
    GoPerson,
    GoKebabHorizontal
} from "react-icons/go";

export const menuItems=[
    {icon: <GoHome/>, text: "Home", to: "/"},
    {icon: <GoSearch/>, text: "Search", to: "/search"},
    {icon: <GoBook/>, text: "Explore"},
    {icon: <GoDeviceCameraVideo/>, text: "Reels", to: "/reels"},
    {icon: <GoMail/>, text: "Message"},
    {icon: <GoProjectRoadmap/>, text: "Notifications"},
    {icon: <GoPlusCircle/>, text: "Create"},
    {icon: <GoPerson/>, text: "Profile", to: "/profile"},
    {icon: <GoKebabHorizontal/>, text: "More"},
]