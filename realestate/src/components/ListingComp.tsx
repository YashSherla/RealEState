import { FaMapMarkerAlt } from "react-icons/fa"
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
export const ListingComp = (list:Listing) => {
    return (
        <div  className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg p-3 space-y-2">
                <img src={list.imageUrls[0]} className="h-[200px] sm:h-[180px] w-full object-cover hover:scale-105 transition-transform duration-300" />
                <h1 className="font-semibold line-clamp-1">{list.name}</h1>
                <div className="flex gap-1">
                    <FaMapMarkerAlt className="text-red-500" />
                    <p className="text-sm overflow-ellipsis w-[250px] line-clamp-1">{list.address}</p>
                </div>
                <p className="text-sm line-clamp-3">{list.description}</p>
                <div>
                    $
                    {list.offer
                    ? list.discountPrice?.toLocaleString('en-US')
                    : list.regularPrice.toLocaleString('en-US')}
                    {list.type === 'rent' && ' / month'}
                </div>
                <div className="flex gap-3">
                    {
                        list.bedrooms > 1 ? <p className="font-semibold">{list.bedrooms} Beds</p> : <p className="font-semibold">{list.bedrooms} Bed</p>
                    }
                    {
                        list.bathrooms > 1 ? <p className="font-semibold">{list.bathrooms} Baths</p> : <p className="font-semibold">{list.bathrooms} Bath</p>
                    }
                </div>
            </div>
    )
}