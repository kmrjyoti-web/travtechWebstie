export interface FooterLink {
    label: string;
    routeKey?: string;
    href?: string;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterBrand {
    homeRouteKey?: string;
    logoLight: string;
    logoDark: string;
}

export interface FooterStoreBadge {
    img: string;
    href: string;
}

export interface FooterStores {
    label: string;
    items: FooterStoreBadge[];
}

export interface FooterContactBlock {
    iconWrapClass: string;
    iconClass: string;
    title: string;
    value: string;
}

export interface FooterContact {
    support: FooterContactBlock;
    email: FooterContactBlock;
}

export interface FooterSocial {
    iconClass: string;
    href: string;
}

export interface FooterCard {
    img: string;
    href: string;
}

export interface FooterBottom {
    copyrightHtml: string;
    brandName: string;
    brandHref: string;
    social: FooterSocial[];
    cards: FooterCard[];
}

export interface FooterArt {
    img: string;
}

export interface FooterData {
    hideOnBase: string[];
    columns: FooterColumn[];
    brand: FooterBrand;
    stores: FooterStores;
    contact: FooterContact;
    footerArt: FooterArt;
    bottom: FooterBottom;
}