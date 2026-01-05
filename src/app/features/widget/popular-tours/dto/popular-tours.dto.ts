export interface PopularToursDto {
    header: PopularToursHeaderDto;
    wrapper?: PopularToursWrapperDto;
    items: PopularTourItemDto[];
}

export interface PopularToursHeaderDto {
    badge: string;
    title: string;
    title_dot?: string;
    view_all_text?: string;
    view_all_route?: string | any[];
    aos?: { name?: string; duration?: number };
}

export interface PopularToursWrapperDto {
    class?: string;
    aos?: { name?: string; duration?: number };
}

export interface PopularTourItemDto {
    id: string;
    image_url: string;

    trending_text?: string;

    category: string;
    rating: number;
    reviews_count: number;

    title: string;
    location: string;

    price_current: number;
    price_old?: number;

    duration_text: string;
    guests_text: string;

    host_avatar_url?: string;

    details_route: string | any[];
}