export interface BenefitSectionDto {
    header: BenefitSectionHeaderDto;
    items: BenefitSectionItemDto[];
}

export interface BenefitSectionHeaderDto {
    badge: string;
    title: string;
    title_dot?: string;
    aos?: { name?: string; duration?: number };
}

export interface BenefitSectionItemDto {
    id: string;
    step: string;               // "01"
    bg_class: string;           // bg-teal-trans
    icon_class: string;         // isax-buildings-25
    icon_color_class: string;   // text-teal / text-primary / text-purple
    title: string;
    description: string;
    aos?: { name?: string; duration?: number };
}