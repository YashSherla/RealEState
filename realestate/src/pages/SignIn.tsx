import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {  useSetRecoilState } from "recoil";
import { userAtom } from "../store/userAtom";
import { GoogleAuth } from "../components/GoogleAuth";

export const SignIn = ()=>{
   const [fromdata, setFormData] = useState({})
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const  setStoreData = useSetRecoilState(userAtom);
   const navigate = useNavigate();
   const handleChange = (e:any)=>{
    setFormData({...fromdata, [e.target.id]: e.target.value})
   }
   const handleSummit = async () => {
    try {
        setLoading(true);
        const res = await axios.post('http://localhost:3000/auth/signin', fromdata);
        console.log(res.data);
        
        if (res.data.success === false) {
            setError(res.data.message); 
        } else {
            setLoading(false);
            setError(null); 
            localStorage.setItem("access_token", res.data.token);
            localStorage.setItem("user_data", JSON.stringify(res.data.user));
            console.log('This is signed in user:', res.data.user);
            setStoreData(res.data.user);
            navigate('/');
        }
    } catch (error: any) {
        if (error.response && error.response.data) {
            setError(error.response.data.message || "An error occurred."); 
        } else {
        }
    } finally {
        setLoading(false); 
    }
};
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            navigate('/');
        }
    }, [setStoreData]);
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <div className="flex flex-col gap-4">
                <input type="text" className="border-2 border-gray-300 p-2 w-full rounded-md" placeholder="Email" onChange={handleChange} id="email"/>
                <input type="text" className="border-2 border-gray-300 p-2 w-full rounded-md" placeholder="Password" onChange={handleChange} id="password"/>
            </div>
            <div className="my-4">
                <button className="border-2 border-gray-300 p-2 w-full rounded-md bg-blue-950 text-white" onClick={handleSummit}>{loading ? "Loading..." : "SIGN IN"}</button>
            </div>
            <GoogleAuth/>
            <div className='flex gap-2 mt-5'>
                <p>Don't have an account?</p>
                <Link to={'/sign-up'}>
                <span className='text-blue-700'>Sign up</span>
                </Link>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    )
}