// export type TourImage = {
//     largeUrl: string;
//     thumbUrl: string;
//     position: number;
// };
//
// export type TourHighlight = {
//     index: number;
//     detail: string;
// };
//
// export type TourItinerary = {
//     index: number;
//     day: string;
//     heading: string;
//     detail: string;
//     startDate: Date | null;
// };
//
// export type TourListItem = {
//     index: number;
//     detail: string;
// };
//
// export type TourDetailModel = {
//     tourId: string;
//     tourName: string;
//
//     toCountry: string;
//     toState: string;
//     fromCountry: string;
//     fromState: string;
//
//     startDate: Date | null;
//     endDate: Date | null;
//
//     groupMin: number | null;
//     groupMax: number | null;
//
//     description: string;
//
//     amountText: string | null;
//
//     bannerImages: TourImage[];
//     galleryImages: TourImage[];
//
//     highlights: TourHighlight[];
//     itinerary: TourItinerary[];
//
//     inclusions: TourListItem[];
//     exclusions: TourListItem[];
//     preparation: TourListItem[];
// };

export type TravelActivity = {
    time?: string;
    title?: string;
    description?: string;
    location?: string;
    activityType?: string;
    latitude?: number;
    longitude?: number;
    cost?: number;
    completed?: boolean;
};

export type NearbyPlace = {
    name?: string;
    description?: string;
    imageQuery?: string;
    estimatedCost?: string;
    latitude?: number;
    longitude?: number;
    category?: string;
    cost?: number;
    estimatedDuration?: string;
    rating?: number;
};

export type DayWeather = {
    forecast?: string;
    dressCode?: string;
};

export type TravelDay = {
    day: number;
    theme?: string;
    activities?: TravelActivity[];
    nearbyPlaces?: NearbyPlace[];
    weather?: DayWeather;
    accommodationId?: string;
};

export type VisaProcessStep = {
    step: number;
    title: string;
    description: string;
    documents: string[];
    duration: string;
};

export type VisaSource = {
    title: string;
    uri: string;
};

export type VisaInfo = {
    summary?: string;
    sources?: VisaSource[];
    processSteps?: VisaProcessStep[];
};

export type ItineraryData = {
    title?: string;
    summary?: string;
    weather?: string;
    notes?: string;
    days?: TravelDay[];
    inclusions?: string[];
    exclusions?: string[];
};

export type TravelHighlight = {
    name?: string;
    description?: string;
    imageQuery?: string;
    estimatedCost?: string;
    latitude?: number;
    longitude?: number;
    category?: string;
    cost?: number;
    estimatedDuration?: string;
    rating?: number;
};

export type TravelEvent = {
    name?: string;
    date?: string;
    description?: string;
    venue?: string;
    cost?: number;
    latitude?: number;
    longitude?: number;
};

export type EmergencyInfo = {
    embassy?: {
        name?: string;
        address?: string;
        phone?: string;
        website?: string;
        details?: string;
    };
    localServices?: {
        police?: string;
        ambulance?: string;
        fire?: string;
        medical?: string;
    };
};

export type Flight = {
    airline?: string;
    departureAirport?: string;
    arrivalAirport?: string;
    departureTime?: string;
    arrivalTime?: string;
    price?: number;
};

export type TransportOther = {
    type?: string;
    details?: string;
    price?: number;
};

export type Train = {
    trainType?: string;
    departureStation?: string;
    arrivalStation?: string;
    departureTime?: string;
    arrivalTime?: string;
    price?: number;
};

export type Transportation = {
    flights?: Flight[];
    other?: TransportOther[];
    trains?: Train[];
};

export type AccommodationStay = {
    id?: string;
    type?: string;
    hotelName?: string;
    checkInDate?: string;
    checkOutDate?: string;
    price?: number;
    facilities?: string[];
    imageQuery?: string;
    address?: string;
    boardBasis?: string;
    contactNumber?: string;
    rating?: number;
    roomType?: string;
    website?: string;
};

export type Attraction = {
    name?: string;
    description?: string;
    imageQuery?: string;
    estimatedCost?: string;
    latitude?: number;
    longitude?: number;
    category?: string;
    cost?: number;
    estimatedDuration?: string;
    rating?: number;
};

export type LocationDetail = {
    city?: string;
    country?: string;
    countryCode?: string;
    address?: string;
    cityCode?: string;
    state?: string;
    stateCode?: string;
};

export type PackageJsonConfig = {
    preferences?: any;
    visaInfo?: VisaInfo;
    itinerary?: ItineraryData;
    accommodation?: AccommodationStay[];
    transportation?: Transportation;
    attractions?: Attraction[];
    events?: TravelEvent[];
    emergencyInfo?: EmergencyInfo;
    documentsRequired?: string[];
    atmospherePoints?: string[];
    configVersion?: string;
    mapping?: any;
    fromLocation?: LocationDetail;
    toLocation?: LocationDetail;
    
    // ✅ New fields
    images?: {
        headerImage?: string;
        itineraryImages?: string[];
        gallery?: { imageUrl: string; altText?: string; aspectRatio?: string }[];
    };
    headerImage?: string;
    imageGallery?: string[];
    itineraryImages?: string[];
    seo_detail?: {
        title?: string;
        metaDescription?: string;
        meta_description?: string;
        keywords?: string[];
        meta_keywords?: string;
        canonicalUrl?: string;
        canonical_url?: string;
        ogTitle?: string;
        og_title?: string;
        ogDescription?: string;
        og_description?: string;
        ogImage?: string;
        og_image?: string;
    };
};

export type TourImage = {
    largeUrl: string;
    thumbUrl: string;
    position: number;
};

export type TourDetailModel = {
    tourId: string;
    tourName: string;

    // ✅ parsed from package_json_config
    doc: PackageJsonConfig | null;

    // optional header data (useful in UI)
    fromCountry?: string;
    fromState?: string;
    toCountry?: string;
    toState?: string;

    startDate?: Date | null;
    endDate?: Date | null;

    bannerImages?: TourImage[];
    galleryImages?: TourImage[];
};