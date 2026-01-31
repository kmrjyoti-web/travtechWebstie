export interface BenefitSection2Dto {
    header: BenefitSection2HeaderDto;
    items: BenefitSection2ItemDto[];
}

export interface BenefitSection2HeaderDto {
    title_prefix: string;
    title_highlight: string;
    title_suffix: string;
    subtitle: string;
    aos?: { name?: string; duration?: number };
}

export interface BenefitSection2ItemDto {
    id: string;
    title: string;
    description: string;

    icon: string;                    // isax-lock-1
    icon_bg_class: string;           // bg-secondary
    icon_text_class: string;         // text-white / text-gray-9
    shadow_icon_text_class: string;  // text-secondary / text-orange ...

    aos?: { name?: string; duration?: number };
}