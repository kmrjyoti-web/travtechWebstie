export interface PopularToursVm {
    header: {
        badge: string;
        title: string;
        titleDot: string;
        viewAllText: string;
        viewAllRoute: string | any[];
        aosName: string;
        aosDuration: number;
    };
    wrapper: {
        className: string;
        aosName: string;
        aosDuration: number;
    };
    items: PopularTourCardVm[];
}

export interface PopularTourCardVm {
    id: string;
    imageUrl: string;

    trendingText: string;

    category: string;
    ratingText: string;        // "5.0"
    reviewsText: string;       // "(105 Reviews)"

    title: string;
    location: string;

    priceCurrentText: string;  // "$500"
    priceOldText: string;      // "$789" or ""

    durationText: string;
    guestsText: string;

    hostAvatarUrl: string;

    detailsRoute: string | any[];
}