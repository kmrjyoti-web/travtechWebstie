export interface DestinationCard {
    id: string;
    title: string;
    imageUrl: string;
    rating: number;
    reviewsCount: number;
    stars: boolean[]; // length 5
    stats: Array<{
        label: string;
        countText: string;   // "21 Flights", "06 Cruises"
        icon: string;
        colorClass: string;
        borderEnd: boolean;
    }>;
    route: string | any[];
    aosName: string;
    aosDuration: number;
}