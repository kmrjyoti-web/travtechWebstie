export interface BlogSectionDto {
    header?: {
        titleHtml?: string;
        subTitle?: string;
    };
    viewAll?: {
        label?: string;
        routeKey?: string; // ex: blogGrid
    };
    items?: BlogItemDto[];
}

export interface BlogItemDto {
    image?: string;
    badge?: string;

    authorName?: string;
    authorAvatar?: string;

    dateText?: string;
    title?: string;

    routeKey?: string; // ex: blogDetails
}