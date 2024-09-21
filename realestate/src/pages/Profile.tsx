import { useState } from "react"
import { Navbar } from "../components/Navbar"
export const Profile = ()=>{
   const [getUser, setUser] = useState(null);
    return (
        <div>
            <Navbar avatar=""/>
            <div>Profile</div>
           
        </div>
    )
}