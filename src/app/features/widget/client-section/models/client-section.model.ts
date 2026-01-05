export interface ClientSectionVm {
    title: string;
    items: ClientItem[];
}

export interface ClientItem {
    id: string;
    imageUrl: string;
    alt: string;
}