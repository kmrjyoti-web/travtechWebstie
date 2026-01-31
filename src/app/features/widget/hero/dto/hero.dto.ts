export type HeroFieldTypeDto = 'text' | 'date' | 'time' | 'select' | 'radio' | 'counter';

export interface HeroOptionDto {
    label: string;
    value: string | number | boolean;
}

export interface HeroShowIfDto {
    field: string;
    equals: any;
}

export interface HeroFieldDto {
    key: string;
    type: HeroFieldTypeDto;
    label: string;
    placeholder?: string;
    default?: any;
    min?: number;
    max?: number;
    options?: HeroOptionDto[];
    show_if?: HeroShowIfDto;
}

export interface HeroTabDto {
    id: string;
    label: string;
    icon_class?: string;
    enabled: boolean;
    submit_label?: string;
    fields: HeroFieldDto[];
}

export interface HeroPanelDto {
    enabled: boolean;
    reserve_space_when_hidden?: boolean;
    reserved_height_px?: number;
    tabs: HeroTabDto[];
}

export interface HeroDto {
    background_url: string;
    title: string;
    title_highlight?: string;
    subtitle?: string;
    min_height_px?: number;
    parallax?: boolean;
    panel?: HeroPanelDto;
}

export interface HeroConfigDtoRoot {
    hero: HeroDto;
}