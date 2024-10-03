import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";
import { useNavigate } from "react-router-dom";
export const CreateListing = () => { 
    const [uploading , setUploading] = useState(false);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState("");
    const [files, setFiles] = useState([]);
    const [imageUploadError, setImageUploadError] = useState("");
    const userProfile = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const handleRemoveImage = (index: number) => {
        // const newFiles = [...formData.imageUrls];
        // const newFormData = { ...formData, imageUrls: newFiles.filter((_, i) => i !== index) };
        // console.log(newFormData);
        setFormData({
            ...formData,
            imageUrls:formData.imageUrls.filter((_, i) => i !== index),
        })
    }
    const handleImageSubmit = () =>{
        try {
            if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
                setUploading(true);
                setImageUploadError("");
                const promises = Array.from(files).map(file => storeImage(file));
                Promise.all(promises).then((urls) => {
                    setFormData({...formData, imageUrls: formData.imageUrls.concat(urls as any)});
                    setUploading(false);
                }).catch((error) => {
                    setUploading(false);
                    console.error('Error uploading images:', error);
                })
            }else{
                setImageUploadError("You can only upload up to 6 images");
                setUploading(false);
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            setUploading(false);
            setImageUploadError("Error uploading images");
        }
    }
    const storeImage = async (file:any)=>{
        return new Promise((resolve, reject)=>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const upLoadTask = uploadBytesResumable(storageRef, file);
        upLoadTask.on('state_changed',(snapshot)=>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },(error)=>{
            console.log(error);
            reject(error);
        },()=>{
            console.log('Upload is completed');
            getDownloadURL(upLoadTask.snapshot.ref).then((downloadURL)=>{
                resolve(downloadURL);
            })
        })
        })
    }
    const handleSubmit =async ()=>{
        try {
            if (formData.imageUrls.length < 1)
                return setError('Please upload at least one image');
            // if (+formData.regularPrice < +formData.discountPrice)
            //     return setError('Discount price should be less than regular price');
            setLoading(true);
            const res = await axios.post('http://localhost:3000/listing/create', {...formData, userRef: userProfile?._id});
            console.log(res.data);
            if (res.data.success === false) {
                setError(res.data.message);
                setLoading(false);
            }
            setLoading(false);
            setError("");
            navigate(`/listing/${res.data.data._id}`);
            
        } catch (error:any) {
            setError(error);
            setLoading(false);
        }
    }

    const handleChange = (e:any)=>{
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({...formData, type: e.target.id});
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({...formData, [e.target.id]: e.target.checked});
        }
        if (e.target.type === 'number' || e.target.type === 'text'|| e.target.type === 'textarea') {
            setFormData({...formData, [e.target.id]: e.target.value});
        }
    }
   
    return (
        <div className="text-center mt-4">
            <h1 className="text-3xl font-semibold">CREATE A LISTING</h1>
            <form action=""></form>
            <div className="grid grid-cols-12 max-w-3xl mx-auto gap-3">
                <div className="col-span-12 p-5  lg:col-span-6 flex flex-col gap-2 ">
                    <div className="flex flex-col gap-3">
                        <input 
                        type="text"
                        className="w-full bg-slate-100 border-2 border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-400" 
                        placeholder="Name" 
                        id="name"
                        onChange={handleChange}
                        value={formData.name}
                        required />
                        <textarea 
                         name=""
                         className="w-full bg-slate-100 border-2 border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-400"
                         placeholder="Description"
                         id="description"
                         onChange={handleChange}
                         value={formData.description}
                         required/>
                        <input 
                        type="text" 
                        className="w-full bg-slate-100 border-2 border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-400" 
                        placeholder="Address" 
                        id="address"
                        onChange={handleChange}
                        value={formData.address}
                        required />
                    </div>
                    <div className="flex gap-2">
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.type === 'sale'}
                            />
                            <span>Sale</span>
                         </div>
                         <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.type === 'rent'}
                            />
                            <span>Rent</span>
                         </div>
                         <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span>Parking Spot</span>
                         </div>
                         <div className='flex gap-2'>
                            <input 
                                type='checkbox'
                                id='furnished'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span>Furnished</span>
                         </div>
                    </div>
                    <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.offer}
                            />
                            <span>Offer</span>
                    </div>
                    <div className='flex'>
                        <div className="flex gap-2 items-center">
                            <input
                                type='number'
                                id='Beds'
                                className='w-1/3 bg-slate-100 border-2 border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-400'
                                min={0}
                                required
                                onChange={handleChange}
                                // value={formData.bedrooms}
                            />
                            <span className="text-slate-500">Beds</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type='number'
                                id='Baths'
                                className='w-1/3 bg-slate-100 border-2 border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-400'
                                min={0}
                                required
                                onChange={handleChange}
                                // value={formData.bathrooms}
                            />
                            <span className="text-slate-500">Baths</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <input type="text" className="w-1/2 bg-slate-100 border-2 border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-400" placeholder="Price" id="regularPrice" />
                        <div className="flex flex-col">
                            <h1>Regular Price</h1>
                            <p>($ / Month)</p>
                        </div>
                    </div>
                    {
                    formData.offer && (
                        <div className="flex gap-2">
                            <input type="text" className="w-1/2 bg-slate-100 border-2 border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-400" placeholder="Price" id="discountedPrice" />
                            <div className="flex flex-col">
                                <h1>Discounted Price</h1>
                                <p>($ / Month)</p>
                            </div>
                        </div> )
                    }
                </div>
                <div className="col-span-12 p-5 lg:col-span-6 flex flex-col gap-3">
                    <div className="flex">
                        <p><b>Images:</b>The first image will be the cover (max 6)</p>
                    </div>
                    <div className="flex gap-3">
                        <input type="file" multiple className="w-full bg-slate-100 border-2 border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-slate-400" onChange={(e:any) => setFiles(e.target.files)}/>
                        <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80" onClick={handleImageSubmit}>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <div>
                        {formData.imageUrls.map((url, index) => (
                            <div key={index} className='flex justify-between p-3 border items-center'>
                             <img
                               src={url}
                               alt='listing image'
                               className='w-20 h-20 object-contain rounded-lg'
                             />
                             <button
                               type='button'
                               onClick={() => handleRemoveImage(index)}
                               className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                             >
                               Delete
                             </button>
                           </div>
                        ))}
                    </div>
                    <div>
                        <p className="text-red-500">{imageUploadError}</p>
                    </div>
                    <div>
                        <button className="border-2 border-gray-300 p-2 w-full rounded-md bg-blue-950 text-white" onClick={handleSubmit} >
                            {loading ? 'Creating...' : 'Create Listing'}
                        </button>
                    </div>
                    <div>
                        <p className="text-red-500">{error}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}