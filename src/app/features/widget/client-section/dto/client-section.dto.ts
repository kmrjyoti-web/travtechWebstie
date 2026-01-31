export interface ClientSectionDto {
    title?: string;
    items?: ClientItemDto[];
}

export interface ClientItemDto {
    id?: string;
    imageUrl?: string;
    alt?: string;
}