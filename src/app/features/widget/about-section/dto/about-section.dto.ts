export type AboutSectionFeatureDto = {
    avatar_class: string;
    icon: string;
    icon_extra_class?: string;
    text: string;
};

export type AboutSectionCounterDto = {
    title: string;
    icon: string;
    text_class: string;
    value: number;
    suffix?: string;
};

export type AboutSectionDto = {
    listing: {
        icon: string;
        title: string;
        image_url: string;
        button_text: string;
        button_route: string;
    };

    main_image_url: string;

    earnings: {
        icon_url: string;
        label: string;
        amount_text: string;
        withdraw_text: string;
        withdraw_route: string;
    };

    content: {
        badge_text: string;
        heading: string;
        description: string;
        features: AboutSectionFeatureDto[];
    };

    footer: {
        learn_more_text: string;
        learn_more_route: string;
        avatars: string[];
        rating_stars: number;
        rating_score_text: string;
        reviews_text: string;
    };

    counters: AboutSectionCounterDto[];

    bg_images: {
        img1: string;
        img2: string;
    };
};