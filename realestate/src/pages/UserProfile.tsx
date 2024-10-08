import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";
import {  useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
 
type UserProfileData = {
    avatar?: string;
    Username?: string;
    Email?: string;
    Password?: string | number;
}
export const Profile = () => {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [file , setfile] = useState(undefined);
    const [uploadPerc, setUploadPerc] = useState(0)
    const currentuser = useRecoilValue(userAtom);
    const [fromData, setFormData] = useState<UserProfileData>({});
    const [error , setError] = useState(null);
    const [updateSuccess , setUpdateSuccess] = useState(null);
    const [listing , setListing] = useState([]);
    const [showListing , setShowListing] = useState(false);
    const [showListingError , setShowListingError] = useState("");
    const navigate = useNavigate();
    const handleonChange = (e:any)=>{
        setFormData({...fromData,[e.target.id]: e.target.value})
    }
    useEffect(() => {
        if (file) {
            handleProfile(file)
        }
    },[file])
    const handleProfile = (file: any) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadPerc(Math.round(progress));
        }, (error) => {
            console.log(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                console.log(downloadUrl);
                setFormData({...fromData,avatar:downloadUrl})
            })
        })

    }
    const handleSubmit = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/user/update/${currentuser?._id}`, fromData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            console.log(res.data);
            if (res.data.success === false) {
                setError(res.data.message);
            } else {
                localStorage.setItem("user_data", JSON.stringify(res.data.user));
                setUpdateSuccess(res.data.message);
                setError(null);
                setTimeout(()=>{
                    setUpdateSuccess(null)
                }, 3000);
            }
        } catch (error: any) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);
            
        }
    };
    const handleSignout = ()=>{
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
        window.location.reload();
        navigate('/sign-in');
    }
    const handleDeleteAcc = async()=>{
        try {
            const res = await axios.delete(`http://localhost:3000/user/delete/${currentuser?._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            console.log(res.data);
            if (res.data.success === false) {
                setError(res.data.message);
            }else{
                setError(null);
                alert(res.data.message);
                localStorage.removeItem("access_token");
                localStorage.removeItem("user_data");
                window.location.reload();
                navigate('/sign-up');
            }
        } catch (error: any) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);
        }
    }
    const handleShowListing = async ()=>{
        try {
            const res = await axios.get(`http://localhost:3000/user/listing/${currentuser?._id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }
            );
            console.log(res.data);
            if (res.data.success === false) {
                setShowListingError(res.data.message);
            }
            setListing(res.data.data);
            setShowListingError("");
        } catch (error : any) {
            setShowListingError(error);
        }
    }
    const handleListingDelete = async (id:string)=>{
        try {
            const res = await axios.delete(`http://localhost:3000/listing/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            console.log(res.data);
            if (res.data.success === false) {
                setError(res.data.message);
            }
            setUpdateSuccess(res.data.message);
            setError(null);
            setTimeout(()=>{
                setUpdateSuccess(null)
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }
     return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            {/* <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3" > */}
            <div className="flex flex-col items-center gap-3">
                <div>
                    <input type="file"  hidden ref={fileRef} onChange={(e:any)=>setfile(e.target.files[0])} accept='image/*'/>
                    <img 
                    src= {fromData.avatar||currentuser?.avatar} 
                    alt='profile'
                    className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
                    onClick={()=>fileRef.current!.click()}
                    />
                </div>
                {/* <p className='text-sm self-center'>
                    {fileUploadError ? (
                        <span className='text-red-700'>
                        Error Image upload (image must be less than 2 mb)
                        </span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                        <span className='text-green-700'>Image successfully uploaded!</span>
                    ) : (
                        ''
                    )}
                </p> */}
                <input type="text" 
                className="border-2 border-gray-300 p-2 w-full rounded-md" 
                placeholder="Username"
                defaultValue={currentuser?.username}
                id="username"
                onChange={handleonChange}/>
                <input type="text" 
                className="border-2 border-gray-300 p-2 w-full rounded-md" 
                placeholder="Email"  
                defaultValue={currentuser?.email}
                id="email"
                onChange={handleonChange}/>
                <input type="text" 
                className="border-2 border-gray-300 p-2 w-full rounded-md" 
                placeholder="Password"  
                id="password"
                onChange={handleonChange}/>
                <button className="border-2 border-gray-300 p-2 w-full rounded-md bg-blue-950 text-white" onClick={handleSubmit}>UPDATE</button>
                <Link className='border-2 border-gray-300 p-2 w-full rounded-md bg-green-600 text-white hover:opacity-95 text-center' to={'/create-listing'}>CREATE LISTING</Link>
                </div>
            {/* </form> */}
            <div className="flex justify-between mt-5">
                <span className='text-red-700 cursor-pointer' onClick={handleDeleteAcc}> Delete account</span>
                <span className='text-red-700 cursor-pointer' onClick={handleSignout}> Sign out</span>
            </div>
            <p className='text-red-700 mt-5'>{error ? error : ''}</p>
            <p className='text-green-700 mt-5'>
                {updateSuccess ? 'User is updated successfully!' : ''}
            </p>
            <button className='text-green-700 w-full' onClick={()=>{
                handleShowListing();
                setShowListing(!showListing);
            }}> {showListing ? 'Hide Listings' : 'Show Listings'}</button>
            {showListing && <div>
                <p className='text-red-700'>{showListingError ? showListingError : ''}</p>
                {
                    listing && listing.length > 0 ? (
                        <div>
                            <h1 className='text-3xl font-semibold text-center my-7'>Your Listings</h1>
                            {
                                listing.map((item: any , index : number) => (
                                    <div key={index} className='flex justify-between p-3 border items-center'>
                                        <div className="flex gap-3 items-center">
                                            <img
                                            src={item.imageUrls}
                                            alt='listing image'
                                            className='w-20 h-20 object-contain rounded-lg'
                                            />
                                            <p className='text-lg font-semibold'>{item.name}</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <button
                                            type='button'
                                            onClick={() => handleListingDelete(item._id)}
                                            className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                            >
                                            Delete
                                            </button>
                                            <button
                                            type='button'
                                            onClick={() => navigate(`/update-listing/${item._id}`)}
                                            className='p-3 text-green-700 rounded-lg uppercase hover:opacity-75'
                                            >
                                            Edit
                                            </button>
                                        </div>
                                </div>
                                ))
                            }
                        </div>
                    ) : <p>No listings</p>
                } 
            </div>}
        </div>
    )
}   