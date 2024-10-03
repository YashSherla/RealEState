import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const handleSummit = (e:any) =>{
        e.preventDefault();
        const param = new  URLSearchParams(location.search);
        // console.log(`location.search: ${location.search}`);
        param.set('searchTerm', searchTerm);
        navigate(`/search?${param.toString()}`);
    }
    useEffect(()=>{
        const param = new URLSearchParams(location.search);
        setSearchTerm(param.get('searchTerm') || "");
    },[location.search])
    return (
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input type="text" 
            className="bg-transparent focus:outline-none w-24 sm:w-64" 
            placeholder="Search..."
            value={searchTerm}
            onChange={(e)=> setSearchTerm(e.target.value)} />
            <button onClick={handleSummit}><FaSearch className="text-slate-600" /></button>
        </form>
    )
}