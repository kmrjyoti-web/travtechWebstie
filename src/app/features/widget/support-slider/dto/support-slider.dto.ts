export type SupportSliderDirectionDto = 'left' | 'right';
export type SupportSliderSpeedDto = 'slow' | 'normal' | 'fast';

export interface SupportSliderItemDto {
    title: string;
}

export interface SupportSliderDto {
    items: SupportSliderItemDto[];
    direction?: SupportSliderDirectionDto;
    speed?: SupportSliderSpeedDto;
    bgClass?: string;
}