export interface VideoSectionDto {
    settings: Record<string, any>;
    size: string;
    items: VideoItemDto[];
}

export interface VideoItemDto {
    id: string;
    url: string;
    iconClass: string;
    anchorClass: string;
}