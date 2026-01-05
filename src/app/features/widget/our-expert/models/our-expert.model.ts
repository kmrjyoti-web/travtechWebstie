export interface OurExpertVm {
    header: OurExpertHeader;
    aos: OurExpertAos;
    viewAll: OurExpertViewAll;
    items: OurExpertItem[];
}

export interface OurExpertHeader {
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
}

export interface OurExpertAos {
    name: string;
    duration: number;
}

export interface OurExpertViewAll {
    label: string;
    routeKey: string;
}

export interface OurExpertItem {
    id: string;
    name: string;

    ratingBadgeText: string;    // "5.0"
    reviewsText: string;        // "(499 Reviews)"

    countryText: string;
    countryFlagUrl: string;

    imageUrl: string;
    bgClass: string;
    circleClass: string;

    totalListings: number;
    startsFromText: string;     // "$452"
}