export type SupportSliderDirection = 'left' | 'right';
export type SupportSliderSpeed = 'slow' | 'normal' | 'fast';

export interface SupportSliderItem {
    title: string;
}

export interface SupportSlider {
    items: SupportSliderItem[];
    direction: SupportSliderDirection;
    speed: SupportSliderSpeed;
    bgClass: string;
}