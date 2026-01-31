export interface BlogSectionVm {
    header: {
        titleHtml: string;
        subTitle: string;
    };
    viewAll: {
        label: string;
        routeKey: string;
    };
    items: BlogItemVm[];
}

export interface BlogItemVm {
    image: string;
    badge: string;

    authorName: string;
    authorAvatar: string;

    dateText: string;
    title: string;

    routeKey: string;
}