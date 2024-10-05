import { useEffect, useState } from "react"
import { FaBars, FaHome, FaInfo, FaSign, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";
import { UserProfile } from "../types/types";
export const Drawer = () =>{
    const [isMobile,setIsMobile] = useState(window.innerWidth < 1024);
    const [isVisibleDrawer,setisVisibleDrawer] = useState(false);
    const userProfile = useRecoilValue<UserProfile|null>(userAtom);
    useEffect(()=>{ 
        const handleResize = () =>{
            setIsMobile(window.innerWidth < 1024)
        }
        window.addEventListener('resize',handleResize);
        return () =>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    const handleToogle = () =>{
       setisVisibleDrawer(!isVisibleDrawer);
    }
    const handleLinkClick = () => {
        setisVisibleDrawer(false); 
    };
    if (!isMobile) return null;
    return <div>
       <button onClick={handleToogle}><FaBars></FaBars></button>
      <div 
       className={`fixed inset-y-0 right-0 w-64  transition-transform transform bg-slate-200 shadow-md border-2 p-5 ${
        isVisibleDrawer ? 'translate-x-0' : 'translate-x-full'
    } duration-500 z-10 space-y-3`}
      >
        <div className="flex justify-between">
            <span className='text-slate-500 text-xl font-semibold'>Main Menu</span>
            <button className="text-blue-400" onClick={handleToogle}><FaWindowClose className="text-2xl"></FaWindowClose></button>
        </div>
        <div className="flex flex-col space-y-6">
            <Link to='/' onClick={handleLinkClick}>
                <div className="flex gap-3">
                    <FaHome className="text-xl"></FaHome>
                    <p className=' text-slate-700 hover:underline'>Home</p>
                </div>
            </Link>
            <Link to='/about' onClick={handleLinkClick}>
                <div className="flex gap-3">
                    <FaInfo className="text-xl"></FaInfo>
                    <p className=' text-slate-700 hover:underline'>About</p>
                </div>
            </Link >
            {userProfile ? (
            <Link to='/profile' onClick={handleLinkClick}>
                <div className="flex gap-3">
                    <img
                    className='rounded-full h-5 w-5 object-cover'
                    src={userProfile.avatar}
                    alt='profile'
                    />
                    <p className=' text-slate-700 hover:underline'>Profile</p>
                </div>
            </Link>
                ) : (
            <Link to='/sign-in' onClick={handleLinkClick}>
                <div className="flex gap-3">
                    <FaSign className="text-xl"></FaSign>
                    <p className='text-slate-700 hover:underline'>Sign in</p>
                </div>
            </Link>
            )}
        </div>
      </div>
    </div>
}