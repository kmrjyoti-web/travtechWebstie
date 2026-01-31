import { PopularToursDto, PopularTourItemDto } from '../dto/popular-tours.dto';
import { PopularToursVm } from './popular-tours.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';
import { CurrencyHelper } from '../../../../shared/utils/currency.helper';

export class PopularToursMapper {
    static fromDto(dto: PopularToursDto): PopularToursVm {
        // DTO has a 'data' array
        const items = Array.isArray(dto?.data) ? dto.data : [];

        // Hardcoded header & wrapper for now, as API only returns items
        return {
            header: {
                badge: 'Top Rated Tours',
                title: 'Most Popular ',
                titleDot: 'Tours',
                viewAllText: 'View All Categories',
                viewAllRoute: '/tour/tour-grid/popular_tours',
                aosName: 'fade-up',
                aosDuration: 2000,
            },
            wrapper: {
                className: 'cars-slider owl-dot-bottom aos row',
                aosName: 'fade-up',
                aosDuration: 2000,
            },
            items: items.map((x) => PopularToursMapper.mapItem(x)),
        };
    }

    private static mapItem(x: PopularTourItemDto) {
        // Merge duration days/nights
        const days = x.package_duration_day || 0;
        const nights = x.package_duration_night || 0;
        const durationText = `${days} Days - ${nights} Nights`;

        // Handle price display logic
        const currencySymbol = CurrencyHelper.getSymbol('USD'); // Default or fetch from x if available

        let priceCurrentText = '';
        let priceOldText = '';

        const publishPrice = x.publish_price ?? 0;
        const offerPrice = x.offer_price;

        if (offerPrice) {
            priceCurrentText = `${currencySymbol}${offerPrice}`;
            priceOldText = `${currencySymbol}${publishPrice}`;
        } else {
            priceCurrentText = `${currencySymbol}${publishPrice}`;
        }

        return {
            id: x.publish_unique_id,
            imageUrl: prefixDocApiUrl(x.itineraries_image_detail),

            trendingText: 'Trending', // specific field likely missing in filtered API, default used

            category: 'Tour', // Default category
            ratingText: (Number(x.ratting ?? 0)).toFixed(1),
            reviewsText: `(${Number(x.review ?? 0)} Reviews)`,

            title: x.publish_heading,
            location: x.to_country || '',

            priceCurrentText,
            priceOldText,

            durationText,
            guestsText: '2 Guests', // Default if missing in API response

            hostAvatarUrl: 'assets/img/users/user-01.jpg', // Default

            detailsRoute: ['/tour/tour-details', x.publish_url],
        };
    }
}