import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListingComp } from "../components/ListingComp";

type Listing = {
    id: string;
    name: string;
    description: string;
    address: string;
    regularPrice: number;
    discountPrice?: number; 
    bathrooms: number;
    bedrooms: number;
    furnished: boolean;
    parking:boolean;
    type:string;
    offer:boolean;
    imageUrls:string[];
    userRef:string;
}
export const Search = () =>{
    const [loading , setLoading] = useState(false);
    const [listing , setListing] = useState<Listing[]>([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
      });
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchParams = {
            searchTerm: urlParams.get('searchTerm') || '',
            type: urlParams.get('type') || 'all',
            parking: urlParams.get('parking') === 'true',
            furnished: urlParams.get('furnished') === 'true',
            offer: urlParams.get('offer') === 'true',
            sort: urlParams.get('sort') || 'created_at',
            order: urlParams.get('order') || 'desc',
        };
        setSidebardata(searchParams);
        const fetchData = async ()=>{
            try {
                setLoading(true);
                const searchQuery = urlParams.toString();
                const res = await axios.get(`http://localhost:3000/listing/get?${searchQuery}`);
                if (res.data.success === false) {
                    setLoading(false);
                    setError("Something want wrong")
                }
                const data = await res.data.listings;
                setListing(data)
                setError("");
            } catch (error:any) {
                setLoading(false);
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        fetchData();
    },[location.search])

    const handleChange = (e:any) =>{
        // e.preventDefault();
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebardata({...sidebardata , type: e.target.id})
        }
        if (e.target.id === 'searchTerm') {
            setSidebardata({...sidebardata,searchTerm:e.target.value})
        }
        if ( e.target.id === 'parking' ||
        e.target.id === 'furnished' ||
        e.target.id === 'offer') {
            setSidebardata({...sidebardata,[e.target.id]:e.target.checked || e.target.checked === 'true' ? true : false})
        }
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0];
            const order = e.target.value.split('_')[1];
            setSidebardata({...sidebardata,sort,order})
        }
    }
    const handleSubmit = (e : any) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm',sidebardata.searchTerm);
        urlParams.set('type',sidebardata.type);
        urlParams.set('parking',sidebardata.parking.toString());
        urlParams.set('furnished',sidebardata.furnished.toString());
        urlParams.set('offer',sidebardata.offer.toString());
        urlParams.set('sort',sidebardata.sort);
        urlParams.set('order',sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="hidden lg:block sm:col-span-4 p-4 space-y-6 border-r-2">
                <div className="flex">
                    <label htmlFor="" className="text-slate-700">Search Term:</label>
                    <input type="text" className=" bg-slate-100 border border-gray-300 rounded-md w-full p-3" id="searchTerm" value={sidebardata.searchTerm} onChange={handleChange}/>
                </div>
                <div className="flex gap-2">
                    <p>Type:</p>
                    <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='all'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type === 'all'}
                            />
                            <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type === 'rent'}
                            />
                            <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type === 'sale'}
                            />
                            <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.offer}
                            />
                            <span>Offer</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <p>Amenities:</p>
                    <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.parking}
                            />
                            <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.furnished}
                            />
                            <span>Furnished</span>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <label>Sort:</label>
                    <select 
                    id="sort_order"
                    className="bg-slate-100 border border-gray-300 rounded-md p-3"
                    defaultValue={'createdAt_desc'}
                    onChange={handleChange}>
                        <option value="createdAt_desc">Latest</option>
                        <option value="regularPrice_desc">Price high to low</option>
                        <option value="regularPrice_asc">Price low to high</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>
                <div>
                    <button 
                    className="bg-blue-950 text-white rounded-md p-3 w-full" 
                    onClick={handleSubmit}
                    >Search</button>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-8 p-3 flex flex-col  w-full">
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
                    {
                        loading ? <p>Loading....</p> : error ? <p>{error}</p> : (
                        listing.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {listing.map((list: Listing, index: number) => {
                                return (
                                    <ListingComp key={index} {...list}  />
                                )
                            })}
                        </div>
                    ) : <p>No Listings Found</p>
                )
            }   
            </div>
        </div>
    )
}