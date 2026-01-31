export interface FooterLinkDto {
    label: string;
    routeKey?: string;
    href?: string;
}

export interface FooterColumnDto {
    title: string;
    links: FooterLinkDto[];
}

export interface FooterBrandDto {
    homeRouteKey?: string;
    logoLight: string;
    logoDark: string;
}

export interface FooterStoreBadgeDto {
    img: string;
    href: string;
}

export interface FooterStoresDto {
    label: string;
    items: FooterStoreBadgeDto[];
}

export interface FooterContactBlockDto {
    iconWrapClass: string;
    iconClass: string;
    title: string;
    value: string;
}

export interface FooterContactDto {
    support: FooterContactBlockDto;
    email: FooterContactBlockDto;
}

export interface FooterSocialDto {
    iconClass: string;
    href: string;
}

export interface FooterCardDto {
    img: string;
    href: string;
}

export interface FooterBottomDto {
    copyrightHtml: string;
    brandName: string;
    brandHref: string;
    social: FooterSocialDto[];
    cards: FooterCardDto[];
}

export interface FooterArtDto {
    img: string;
}

export interface FooterDto {
    hideOnBase?: string[];
    columns: FooterColumnDto[];
    brand: FooterBrandDto;
    stores: FooterStoresDto;
    contact: FooterContactDto;
    footerArt: FooterArtDto;
    bottom: FooterBottomDto;
}