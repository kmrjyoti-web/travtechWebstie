export interface PreferencesCardDto {
    preference_id: string;
    title: string;
    image_url: string;

    count: number;              // 25
    count_suffix?: string;      // "Tours"

    route: string | any[];

    aos?: {
        name?: string;            // "fade-up"
        duration?: number;        // 2000
    };
}