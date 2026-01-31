export interface BenefitSectionVm {
    header: {
        badge: string;
        title: string;
        titleDot: string;
        aosName: string;
        aosDuration: number;
    };
    items: BenefitItemVm[];
}

export interface BenefitItemVm {
    id: string;
    step: string;
    bgClass: string;
    iconClass: string;
    iconColorClass: string;
    title: string;
    description: string;
    aosName: string;
    aosDuration: number;
}