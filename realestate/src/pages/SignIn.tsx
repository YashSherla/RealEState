import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const SignIn = ()=>{
   const [fromdata, setFormData] = useState({})
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const handleChange = (e:any)=>{
    setFormData({...fromdata, [e.target.id]: e.target.value})
   }
   const handleSummit = async () => {
    try {
        setLoading(true);
        const res = await axios.post('http://localhost:5000/auth/signin', fromdata);
        console.log(res.data);
        
        if (res.data.success === false) {
            setError(res.data.message); 
        } else {
            setLoading(false);
            setError(null); 
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

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <div className="flex flex-col gap-4">
                <input type="text" className="border-2 border-gray-300 p-2 w-full rounded-md" placeholder="Email" onChange={handleChange} id="email"/>
                <input type="text" className="border-2 border-gray-300 p-2 w-full rounded-md" placeholder="Password" onChange={handleChange} id="password"/>
            </div>
            <div className="my-4">
                <button className="border-2 border-gray-300 p-2 w-full rounded-md bg-blue-950 text-white" onClick={handleSummit}>{loading ? "Loading..." : "SIGN UP"}</button>
            </div>
            <div className="my-4">
                <button className="border-2 border-gray-300 p-2 w-full rounded-md  bg-red-500 text-white">CONTINUE WITH GOOGLE</button>
            </div>
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