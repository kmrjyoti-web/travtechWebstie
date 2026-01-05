export type AboutSectionFeature = {
    avatarClass: string;
    icon: string;
    iconExtraClass?: string;
    text: string;
};

export type AboutSectionCounter = {
    title: string;
    icon: string;
    textClass: string;
    value: number;
    suffix?: string;
};

export type AboutSectionModel = {
    listing: {
        icon: string;
        title: string;
        imageUrl: string;
        buttonText: string;
        buttonRoute: string;
    };

    mainImageUrl: string;

    earnings: {
        iconUrl: string;
        label: string;
        amountText: string;
        withdrawText: string;
        withdrawRoute: string;
    };

    content: {
        badgeText: string;
        heading: string;
        description: string;
        features: AboutSectionFeature[];
    };

    footer: {
        learnMoreText: string;
        learnMoreRoute: string;
        avatars: string[];
        ratingStars: number;
        ratingScoreText: string;
        reviewsText: string;
    };

    counters: AboutSectionCounter[];

    bgImages: {
        img1: string;
        img2: string;
    };
};

export const ABOUT_SECTION_EMPTY: AboutSectionModel = {
    listing: { icon: '', title: '', imageUrl: '', buttonText: '', buttonRoute: '/' },
    mainImageUrl: '',
    earnings: { iconUrl: '', label: '', amountText: '', withdrawText: '', withdrawRoute: '/' },
    content: { badgeText: '', heading: '', description: '', features: [] },
    footer: { learnMoreText: '', learnMoreRoute: '/', avatars: [], ratingStars: 0, ratingScoreText: '', reviewsText: '' },
    counters: [],
    bgImages: { img1: '', img2: '' }
};