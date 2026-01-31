export interface PreferencesCardVm {
    id: string;
    title: string;
    imageUrl: string;

    count: number;
    countText: string;          // "25 Tours"

    route: string | any[];

    aosName: string;
    aosDuration: number;
}