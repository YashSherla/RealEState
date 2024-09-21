import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";

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