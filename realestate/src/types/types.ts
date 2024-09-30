export interface UserProfile {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ListingForm {
    imageUrls: string[];
    name: string;
    description: string;
    address: string;
    type: 'rent' | 'sale';
    bedrooms: number;
    bathrooms: number;
    regularPrice: number;
    discountPrice: number;
    offer: boolean;
    parking: boolean;
    furnished: boolean;
}

