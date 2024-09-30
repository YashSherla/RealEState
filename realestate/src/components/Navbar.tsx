import { Link } from "react-router-dom";
import { Search } from "./Search";
import { userAtom } from "../store/userAtom";
import { useRecoilValue } from "recoil";
import { UserProfile } from "../types/types";


export const Navbar = () => {
    const userProfile = useRecoilValue<UserProfile|null>(userAtom);
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Yash</span>
                    <span className='text-slate-700'>Estate</span>
                </h1>
                <Search />
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            About
                        </li>
                    </Link >
                    {userProfile ? (
                        <Link to='/profile'>
                            <img
                                className='rounded-full h-7 w-7 object-cover'
                                src={userProfile.avatar}
                                alt='profile'
                            />
                        </Link>
                    ) : (
                        <Link to='/sign-in'>
                            <li className='text-slate-700 hover:underline'>Sign in</li>
                        </Link>
                    )}
                </ul>
            </div>
        </header>
    );
};
