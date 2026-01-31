// export type ApiResponse<T> = {
//     data: T;
//     pagination_info: any;
//     is_success: boolean;
//     status: string;
//     response_code: string;
//     response_severity: string;
//     response_message: string;
//     response_details: any[];
// };
//
// export type TourDetailDto = {
//     package_id: string;
//     package_name: string;
//
//     to_country: string;
//     to_state: string;
//     from_country: string;
//     from_state: string;
//
//     package_start_date: string | null;
//     package_end_date: string | null;
//
//     package_group_size_min: number | null;
//     package_group_size_max: number | null;
//
//     package_description: string | null;
//     package_amount: string | null;
//
//     // JSON strings
//     package_image: string | null;
//     package_highlights: string | null;
//
//     // ✅ this is the key you asked: itinerary comes from here
//     package_itinerary_detail: string | null;
//
//     package_inclusions_detail: string | null;
//     package_exclusions_detail: string | null;
//     package_advance_preparation_detail: string | null;
// };

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

export type TourDetailDto = {
    itineraries_detail: string | null;
    package_id: string;
    package_name: string;

    to_country: string;
    to_state: string;
    from_country: string;
    from_state: string;

    package_start_date: string | null;
    package_end_date: string | null;

    package_group_size_min: number | null;
    package_group_size_max: number | null;

    package_description: string | null;
    package_amount: string | null;

    // JSON strings (existing)
    package_image: string | null;
    package_highlights: string | null;
    package_itinerary_detail: string | null;
    package_inclusions_detail: string | null;
    package_exclusions_detail: string | null;
    package_advance_preparation_detail: string | null;

    // ✅ NEW (only need this for Travel Document UI)
    package_json_config: string | null;
};