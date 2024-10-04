import { useEffect, useState } from "react"
import { FaHamburger } from "react-icons/fa";

export const Drawer = () =>{
    const [isMobile,setIsMobile] = useState(window.innerWidth < 1024);
    useEffect(()=>{ 
        const handleResize = () =>{
            setIsMobile(window.innerWidth < 1024)
        }
        window.addEventListener('resize',handleResize);
        return () =>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    if (!isMobile) return null;
    return <div>
        <FaHamburger></FaHamburger>
    </div>
}