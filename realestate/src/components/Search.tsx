import { FaSearch } from "react-icons/fa"

export const Search = () => {
    return (
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input type="text" className="bg-transparent focus:outline-none w-24 sm:w-64" placeholder="Search..." />
            <button><FaSearch className="text-slate-600" /></button>
        </form>
    )
}