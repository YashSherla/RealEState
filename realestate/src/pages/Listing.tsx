import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { getUserAtom } from '../store/userAtom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa';
export const Listing = () => {
    const params = useParams();
    const userAtom = useRecoilValueLoadable(getUserAtom(params.id as string));
    return (
        userAtom.state === "loading" ? (
            <div>
                <p>Loading...</p>
            </div>
        ) : (
            <div>
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={50}
                    slidesPerView={1}
                    style={{ height: '550px' }}
                >
                    {
                        userAtom.contents.imageUrls.map((url: string, index: number) => (
                            <SwiperSlide key={index}>
                                <div
                                    className='h-full'
                                    style={{
                                        background: `url(${url}) center no-repeat`,
                                        backgroundSize: 'cover',
                                        height: '100%',
                                    }}
                                ></div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                     <h1 className='text-3xl font-bold mb-4 text-slate-800'>
                        {userAtom.contents.name} - ${userAtom.contents.offer 
                        ? userAtom.contents.discountPrice.toLocaleString('en-US'): 
                        userAtom.contents.regularPrice.toLocaleString('en-US')}
                        {userAtom.contents.type === 'rent' ? '/month' : ''}
                     </h1>
                     <div className='flex items-center gap-4'>
                        <FaMapMarkerAlt></FaMapMarkerAlt>
                        <p>{userAtom.contents.address}</p>
                     </div>
                     <div className='flex items-center gap-4'>
                        <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                            {userAtom.contents.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </p>
                        {userAtom.contents.offer && (
                            <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                            ${+userAtom.contents.regularPrice - +userAtom.contents.discountPrice} OFF
                            </p>
                        )}
                    </div>
                    <div>
                        <p className='text-slate-700'>{userAtom.contents.description}</p>
                    </div>
                    <div>
                        <ul className='flex items-center gap-4'>
                            <li className='sm:flex items-center gap-1'>
                                <FaBed className='text-lg' />
                                <p>{userAtom.contents.bedrooms} Bedrooms</p>
                            </li>
                            <li className='sm:flex items-center gap-1'>
                                <FaBath className='text-lg' />
                                <p>{userAtom.contents.bathrooms} Bathrooms</p>
                            </li>
                            <li className='sm:flex items-center gap-1'>
                                <FaParking className='text-lg' />
                                <p>{userAtom.contents.parking} Parking</p>
                            </li>
                            <li className='sm:flex items-center gap-1'>
                                <FaChair className='text-lg' />
                                <p>{userAtom.contents.furnished} Furnished</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <button className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                            Contact landlord
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};
