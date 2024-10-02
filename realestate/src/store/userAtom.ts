import axios from "axios";
import { atom, atomFamily, selectorFamily } from "recoil";
import { UserProfile } from "../types/types";

export const userAtom = atom<UserProfile | null>({
    key: "userAtom",
    default: null,
})
export const getUserAtom = atomFamily({
    key: "getUserAtom",
    default: selectorFamily({
        key: "getUserSelector",
        get: (id: string) => async () => {
            try {
                const res = await axios.get("http://localhost:3000/listing/get/"+id);
                return res.data.data;
            } catch (error) {
                console.log(error);
                return null;
            }
        },
    })
})
export const getListingAtomFamily = atomFamily({
    key: "getListingAtomFamily",
    default: selectorFamily({
        key: "getListingSelectorFamily",
        get: (id: string) => async () => {
            try {
                const res = await axios.get("http://localhost:3000/listing/get/"+id);
                return res.data.data;
            } catch (error) {
                console.log(error);
                return null;
            }
        },
    })
})