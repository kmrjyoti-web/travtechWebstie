export interface TrendingPlacesVm {
    header: {
        titlePrefix: string;
        titleHighlight: string;
        titleSuffix: string;
        subtitle: string;
        viewAllText: string;
        viewAllRoute: string | any[];
        aosName: string;
        aosDuration: number;
    };
    tabs: { key: string; label: string; targetId: string; isDefault: boolean }[];
    activeTabKey: string;

    hotel: any[];
    flight: any[];
    car: any[];
    cruise: any[];
    tour: any[];
}