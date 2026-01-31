export type TourGridItemModel = {
    code: string;
    url: string;
    publishPrice: number;
    heading: string;
    fromCountry: string;
    fromState: string;
    toCountry: string;
    toState: string;
    shares: number | null;
    rating: number;
    reviewsCount: number;
    guestsCount: number;
    imageUrl: string | null;

    // New fields
    offerPrice: number | null;
    budgetMin: number;
    budgetMax: number;
    duration: string;
    currency: string;
};
