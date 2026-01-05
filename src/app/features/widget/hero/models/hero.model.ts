export type HeroFieldType = 'text' | 'date' | 'time' | 'select' | 'radio' | 'counter';

export interface HeroOption {
    label: string;
    value: any;
}

export interface HeroShowIf {
    field: string;
    equals: any;
}

export interface HeroField {
    key: string;
    type: HeroFieldType;
    label: string;
    placeholder?: string;
    defaultValue?: any;
    min?: number;
    max?: number;
    options?: HeroOption[];
    showIf?: HeroShowIf;
}

export interface HeroTab {
    id: string;
    label: string;
    iconClass?: string;
    enabled: boolean;
    submitLabel: string;
    fields: HeroField[];
}

export interface HeroPanel {
    enabled: boolean;
    reserveSpaceWhenHidden: boolean;
    reservedHeightPx: number;
    tabs: HeroTab[];
}

export interface HeroConfig {
    backgroundUrl: string;
    title: string;
    titleHighlight?: string;
    subtitle?: string;
    minHeightPx: number;
    parallax: boolean;
    panel: HeroPanel;
}