export interface TrendingPlacesDto {
    header: TrendingPlacesHeaderDto;
    tabs: TrendingTabDto[];
    data: TrendingPlacesDataDto;
}

export interface TrendingPlacesHeaderDto {
    title_prefix: string;
    title_highlight: string;
    title_suffix: string;
    subtitle: string;
    view_all_text?: string;
    view_all_route?: string | any[];
    aos?: { name?: string; duration?: number };
}

export interface TrendingTabDto {
    key: 'flight' | 'hotel' | 'car' | 'cruise' | 'tour';
    label: string;
    target_id: string;
    default?: boolean;
}

export interface TrendingPlacesDataDto {
    hotel?: TrendingHotelDto[];
    flight?: TrendingFlightDto[];
    car?: TrendingCarDto[];
    cruise?: TrendingCruiseDto[];
    tour?: TrendingTourDto[];
}

export interface TrendingHotelDto {
    id: string;
    image_url: string;
    badge_text?: string;
    badge_class?: string;
    rating: number;
    reviews_text: string;
    title: string;
    location: string;
    facilities?: string[];
    facilities_more?: string;
    price: number;
    price_unit: string;
    user_name: string;
    user_avatar_url: string;
    route: string | any[];
}

export interface TrendingFlightDto {
    id: string;
    image_url: string;
    badge_left_text?: string;
    badge_left_class?: string;
    rating: number;
    from_city: string;
    to_city: string;
    title: string;
    airline_name: string;
    airline_icon_url: string;
    stop_text: string;
    date_text: string;
    price_from: number;
    seats_left: string;
    user_avatar_url: string;
    route: string | any[];
}

export interface TrendingCarDto {
    id: string;
    image_url: string;
    badge_text?: string;
    badge_class?: string;
    type_badge: string;
    title: string;
    location: string;
    fuel: string;
    gear: string;
    travelled: string;
    price: number;
    price_unit: string;
    rating: number;
    reviews_text: string;
    user_avatar_url: string;
    route: string | any[];
}

export interface TrendingCruiseDto {
    id: string;
    image_url: string;
    badge_text?: string;
    badge_class?: string;
    user_name: string;
    user_avatar_url: string;
    rating: number;
    rating_count_text: string;
    title: string;
    location: string;
    year: string;
    guests: string;
    width: string;
    speed: string;
    facilities?: string[];
    facilities_more?: string;
    price: number;
    price_unit: string;
    route: string | any[];
}

export interface TrendingTourDto {
    id: string;
    image_url: string;
    badge_text?: string;
    badge_class?: string;
    category: string;
    rating: number;
    reviews_text: string;
    title: string;
    location: string;
    price_current: number;
    price_old?: number;
    duration_text: string;
    guests_text: string;
    user_avatar_url: string;
    route: string | any[];
}