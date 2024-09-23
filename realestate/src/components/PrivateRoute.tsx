import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";
import { Link, Outlet } from "react-router-dom";

export const PrivateRoute = ()=>{
    const user = useRecoilValue(userAtom);
    return  user ? <Outlet/>: <Link to="/sign-in"></Link>
}