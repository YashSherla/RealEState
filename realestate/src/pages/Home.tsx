import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { useState } from "react";
export const HomePage = ()=>{
    const [imagesURL, setImagesURL] = useState([
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ]);
    const [offer, setOffer] = useState([]);
    const [rent, setrent] = useState([]);
    const [sale, setsale] = useState([]);

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
            <div className="p-28 px-3 max-w-6xl mx-auto">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent offer</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more places for offer</Link>

            </div>
            <div className="p-28 px-3 max-w-6xl mx-auto">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>

            </div>
            <div className="p-28 px-3 max-w-6xl mx-auto">
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>

            </div>
        </div>
    )

}