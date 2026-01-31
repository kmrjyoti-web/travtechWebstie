export interface VideoSectionVm {
    settings: Record<string, any>;
    size: string;
    items: VideoItem[];
}

export interface VideoItem {
    id: string;
    url: string;
    iconClass: string;
    anchorClass: string;
}