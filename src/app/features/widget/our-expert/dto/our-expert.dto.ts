export interface OurExpertDto {
    header: OurExpertHeaderDto;
    aos: OurExpertAosDto;
    viewAll: OurExpertViewAllDto;
    items: OurExpertItemDto[];
}

export interface OurExpertHeaderDto {
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
}

export interface OurExpertAosDto {
    name: string;
    duration: number;
}

export interface OurExpertViewAllDto {
    label: string;
    routeKey: string; // e.g. "team"
}

export interface OurExpertItemDto {
    id: string;
    name: string;
    rating: number;
    reviewsText: string;          // "499 Reviews"
    countryText: string;          // "Brazil, Rio"
    countryFlagUrl: string;
    imageUrl: string;
    bgClass: string;              // "bg-purple-100"
    circleClass: string;          // "bg-info"
    totalListings: number;
    startsFrom: number;
    currencySymbol: string;       // "$"
}