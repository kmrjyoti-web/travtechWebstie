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
    user_itineraries_code: string;
    itineraries_url: string;
    price: string;
    itineraries_heading: string;
    from_country: string;
    from_state: string;
    to_country: string;
    to_state: string;
    no_of_shares: number | null;
    ratting: number;
    review: number;
    noo_off_guest: number;
};
