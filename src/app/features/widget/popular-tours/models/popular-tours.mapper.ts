import { PopularToursDto } from '../dto/popular-tours.dto';
import { PopularToursVm } from './popular-tours.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';

export class PopularToursMapper {
    static fromDto(dto: PopularToursDto): PopularToursVm {
        const headerAosName = dto.header?.aos?.name ?? 'fade-up';
        const headerAosDuration = dto.header?.aos?.duration ?? 2000;

        const wrapAosName = dto.wrapper?.aos?.name ?? 'fade-up';
        const wrapAosDuration = dto.wrapper?.aos?.duration ?? 2000;

        return {
            header: {
                badge: dto.header?.badge ?? 'Top Rated Tours',
                title: dto.header?.title ?? '',
                titleDot: dto.header?.title_dot ?? '.',
                viewAllText: dto.header?.view_all_text ?? 'View All Categories',
                viewAllRoute: dto.header?.view_all_route ?? '/tour/grid',
                aosName: headerAosName,
                aosDuration: headerAosDuration,
            },
            wrapper: {
                className: dto.wrapper?.class ?? 'cars-slider owl-dot-bottom aos row',
                aosName: wrapAosName,
                aosDuration: wrapAosDuration,
            },
            items: (dto.items ?? []).map((x) => ({
                id: x.id,
                imageUrl: prefixDocApiUrl(x.image_url),

                trendingText: x.trending_text ?? 'Trending',

                category: x.category,
                ratingText: (Number(x.rating ?? 0)).toFixed(1),
                reviewsText: `(${Number(x.reviews_count ?? 0)} Reviews)`,

                title: x.title,
                location: x.location,

                priceCurrentText: `$${Number(x.price_current ?? 0)}`,
                priceOldText: x.price_old != null ? `$${Number(x.price_old)}` : '',

                durationText: x.duration_text,
                guestsText: x.guests_text,

                hostAvatarUrl: prefixDocApiUrl(x.host_avatar_url ?? 'assets/img/users/user-01.jpg'),

                detailsRoute: x.details_route,
            })),
        };
    }
}