import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {  useRecoilStateLoadable } from 'recoil';
import { getUserAtom } from '../store/userAtom';

export const Listing = () => {
    const params = useParams();
    const [userAtom, setUserAtom] = useRecoilStateLoadable(getUserAtom(params.id as string));
    useEffect(() => {
       
    }, [params.id]);
    console.log(userAtom.contents);
    return (
        <div>
            Listing Page
        </div>
    );
};
