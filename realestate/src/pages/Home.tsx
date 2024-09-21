import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar"
import { useRecoilState } from "recoil";
import { getUserAtom } from "../store/userAtom";
import { useEffect } from "react";
export const HomePage = ()=>{
    const [searchParams] = useSearchParams();
    const id= searchParams.get("id") || "";
    const [getUser, setUser] = useRecoilState(getUserAtom(id));
    // useEffect(() => {
    //     setUser(id);
    // },[id])
    return (
        <div>
           <Navbar avatar={getUser?.avatar}/>
        </div>
    )

}