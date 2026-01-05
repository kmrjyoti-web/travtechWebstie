export interface BenefitSection2Vm {
    header: {
        titlePrefix: string;
        titleHighlight: string;
        titleSuffix: string;
        subtitle: string;
        aosName: string;
        aosDuration: number;
    };
    items: BenefitSection2CardVm[];
}

export interface BenefitSection2CardVm {
    id: string;
    title: string;
    description: string;

    icon: string;
    iconBgClass: string;
    iconTextClass: string;
    shadowIconTextClass: string;

    aosName: string;
    aosDuration: number;
}