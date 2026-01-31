export type ApiResponse<T> = {
    data: T;
    pagination_info: any;
    is_success: boolean;
    status: string;
    response_code: string;
    response_severity: string;
    response_message: string;
    response_details: any[];
};

export type TourGridItemDto = {
    publish_unique_id: string;
    publish_heading: string;
    publish_url: string;
    itineraries_image_detail: string;
    package_duration_day: number;
    package_duration_night: number;
    package_travelers_min: number;
    package_travelers_max: number;
    base_currency_code: string;
    publish_currency_code: string;
    base_price: number;
    publish_price: number;
    base_currency_conversion: number;
    offer_price: number | null;
    budget_min: number;
    budget_max: number;

    // Location fields
    to_country: string;
    to_state: string;
    from_country: string;
    from_state: string;

    // Optional legacy or additional fields
    user_itineraries_code?: string;
    itineraries_url?: string;
    price?: string;
    itineraries_heading?: string;
    no_of_shares?: number | null;
    ratting?: number;
    review?: number;
    noo_off_guest?: number;
    itinerary_images?: string[];
};
