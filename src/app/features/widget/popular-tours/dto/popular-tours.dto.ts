// Reusing the structure from TourGridItemDto or similar, but kept specific here
export interface PopularTourItemDto {
    publish_unique_id: string;
    publish_heading: string;
    publish_url: string;
    itineraries_image_detail: string;

    // Additional fields that might be returned
    base_price?: number;
    publish_price?: number;
    offer_price?: number | null;

    package_duration_day?: number;
    package_duration_night?: number;

    to_country?: string;
    to_state?: string;

    ratting?: number;
    review?: number;

    // For now, mapping these to the existing UI expectation
    // If the API returns exactly what TourGrid returns, we should align.
}

export interface PopularToursDto {
    data: PopularTourItemDto[];
    // Include other fields if needed, like pagination_info, is_success, etc.
}