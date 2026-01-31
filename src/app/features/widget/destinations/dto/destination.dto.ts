export interface DestinationDto {
    destination_id: string;
    title: string;
    image_url: string;
    rating: number; // 0..5
    reviews_count: number;
    route: string | any[];
    aos?: { name?: string; duration?: number };
    stats: DestinationStatDto[];
}

export interface DestinationStatDto {
    label: string;        // Flights/Hotels/Cruises
    count: number;
    icon: string;         // isax-airplane
    color_class?: string; // text-indigo
}