import axios from "axios";
import { atom, atomFamily, selectorFamily } from "recoil";
import { UserProfile } from "../types/types";
export const userAtom = atom<UserProfile | null>({
    key: "userAtom",
    default: null
})
export const getUserAtom = atomFamily({
    key: "getUserAtom",
    default: selectorFamily({
        key: "getUserSelector",
        get: (id: string) => async () => {
            try {
                const res = await axios.get("http://localhost:3000/user/"+id, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                });
                return res.data.data;
            } catch (error) {
                console.log(error);
            }
        },
    })
})