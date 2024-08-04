export interface Products {
    details: {
        duration: number;
        location: string;
        amenities: string[];
        maxGuests: number;
    };
    title: string;
    detailsUrl: string;
    imageUrl: string;
    type: string;
    price: number;
    category: string;
    id: string;
}
