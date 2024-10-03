import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import axios from "axios";
import { ListingComp } from "../components/ListingComp";
type Listing = {
    _id: string;
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
export const HomePage = ()=>{
    const [imagesURL, setImagesURL] = useState([
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ]);
    const [offer, setOffer] = useState([]);
    const [rent, setrent] = useState([]);
    const [sale, setsale] = useState([]);
    
    useEffect(() => {
        const fetchoffer = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/listing/get?offer=true&limit=4`);
                const data = res.data.listings;
                setOffer(data);
                fetchrent();
            } catch (error) {
                console.log(error);
            }
        }
        const fetchrent = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/listing/get?type=rent&limit=4`);
                const data = res.data.listings;
                setrent(data);
                fetchsale();
            } catch (error) {
                console.log(error);
            }
        }
        const fetchsale = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/listing/get?type=sale&limit=4`);
                const data = res.data.listings;
                setsale(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchoffer();
     },[])
    return (
        <div>
            <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
                <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
                Find your next <span className='text-slate-500'>perfect</span>
                <br />
                place with ease
                </h1>
                <div className='text-gray-400 text-xs sm:text-sm'>
                Yash Estate is the best place to find your next perfect place to
                live.
                <br />
                We have a wide range of properties for you to choose from.
                </div>
                <Link
                to={'/search'}
                className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
                >
                Let's get started...
                </Link>
            </div>
            <div>
                <Swiper
                  modules={[Navigation]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={50}
                  slidesPerView={1}
                 >
                    {imagesURL.map((url: string, index: number) => (
                        <SwiperSlide key={index}>
                            <img
                                src={url}
                                className="w-full object-cover h-[500px]"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="pt-28 px-3 max-w-6xl mx-auto space-y-2">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent offer</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more places for offer</Link>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    offer.length > 0 ? offer.map((list: Listing) => {
                        return <ListingComp key={list._id} {...list} />
                    }) : <p>No Offer found</p>
                }
                </div>
            </div>
            <div className="pt-28 px-3 max-w-6xl mx-auto space-y-2">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    rent.length > 0 ? rent.map((list: Listing) => {
                        return <ListingComp key={list._id} {...list} />
                    }) : <p>No Offer found</p>
                }
                </div>
            </div>
            <div className="pt-28 px-3 max-w-6xl mx-auto space-y-2">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    sale.length > 0 ? sale.map((list: Listing) => {
                        return <ListingComp key={list._id} {...list} />
                    }) : <p>No Offer found</p>
                }
                </div>
            </div>
        </div>
    )

}