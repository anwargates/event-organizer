export interface Products {
    details: {
        duration: number;
        location: string;
        amenities: string[];
        maxGuests: number;
        info: string;
    };
    title: string;
    detailsUrl: string;
    imageUrl: string;
    type: string;
    price: number;
    category: string;
    id: string;
}
