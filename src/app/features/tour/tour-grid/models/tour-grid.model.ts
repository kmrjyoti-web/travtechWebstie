export type TourGridItemModel = {
    code: string;
    url: string;
    price: number;
    heading: string;
    fromCountry: string;
    fromState: string;
    toCountry: string;
    toState: string;
    shares: number | null;
    rating: number;
    reviewsCount: number;
    guestsCount: number;
};
