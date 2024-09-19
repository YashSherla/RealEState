import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Signup = ()=>{
   const [fromdata, setFormData] = useState({})
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const handleChange = (e:any)=>{
    setFormData({...fromdata, [e.target.id]: e.target.value})
   }
   const handleSummit =async ()=>{
    try {
        setLoading(true);
        const res = await axios.post('http://localhost:5000/auth/signup', fromdata);
        console.log(res.data);
        if (res.data.success === false) {
            setError(res.data.message);
            setLoading(false);
        }else{
            setLoading(false);
            setError(null);
            navigate('/sign-in');
        }
    } catch (error:any) {
        if (error.response && error.response.data) {
            setError(error.response.data.message || "An error occurred."); 
        } else {
            setError(error.message);
        }
    }finally{
        setLoading(false);
    }
   }
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <div className="flex flex-col gap-4">
                <input type="text" className="border-2 border-gray-300 p-2 w-full rounded-md" placeholder="Username" onChange={handleChange} id="username" required={true} />
                <input type="text" className="border-2 border-gray-300 p-2 w-full rounded-md" placeholder="Email" onChange={handleChange} id="email" required={true}/>
                <input type="text" className="border-2 border-gray-300 p-2 w-full rounded-md" placeholder="Password" onChange={handleChange} id="password" required={true}/>
                <button className="border-2 border-gray-300 p-2 w-full rounded-md bg-blue-950 text-white" onClick={handleSummit}>{loading ? "Loading..." : "SIGN UP"}</button>
                <button className="border-2 border-gray-300 p-2 w-full rounded-md  bg-red-500 text-white">CONTINUE WITH GOOGLE</button>
            </div>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to={'/sign-in'}>
                <span className='text-blue-700'>Sign in</span>
                </Link>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    )
}