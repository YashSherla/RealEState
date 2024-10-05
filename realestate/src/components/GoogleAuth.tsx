import { app } from "../firebase"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/userAtom";

export const GoogleAuth = () =>{
    const  setStoreData = useSetRecoilState(userAtom);
    const navigate = useNavigate();
    const handleGoogleSubmit = async () => {
       try {
            const provider = new GoogleAuthProvider();
            const auth =  getAuth(app);
            const result = await signInWithPopup(auth,provider);
            console.log(result);
            const res = await axios.post('http://localhost:3000/auth/google', {
                username:result.user.displayName,
                email:result.user.email,
                avatar:result.user.photoURL
            });
            localStorage.setItem("access_token", res.data.token);
            localStorage.setItem("user_data", JSON.stringify(res.data.user));
            setStoreData(res.data.user)
            navigate('/');
       } catch (error) {
            console.log(error);
       }
    }
    return (
        <div className="my-4">
            <button className="border-2 border-gray-300 p-2 w-full rounded-md  bg-green-500 text-white" onClick={handleGoogleSubmit}>CONTINUE WITH GOOGLE</button>
        </div>
    )
}