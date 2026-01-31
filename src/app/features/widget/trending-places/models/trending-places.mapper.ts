import { TrendingPlacesDto } from '../dto/trending-places.dto';
import { TrendingPlacesVm } from './trending-places.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';

export class TrendingPlacesMapper {
    static fromDto(dto: TrendingPlacesDto): TrendingPlacesVm {
        const tabs = (dto.tabs ?? []).map(t => ({
            key: t.key,
            label: t.label,
            targetId: t.target_id,
            isDefault: !!t.default,
        }));
        const defaultTab = tabs.find(x => x.isDefault)?.key ?? (tabs[0]?.key ?? 'hotel');

        return {
            header: {
                titlePrefix: dto.header?.title_prefix ?? 'Our',
                titleHighlight: dto.header?.title_highlight ?? 'Trending',
                titleSuffix: dto.header?.title_suffix ?? 'Places',
                subtitle: dto.header?.subtitle ?? '',
                viewAllText: dto.header?.view_all_text ?? 'View All Places',
                viewAllRoute: dto.header?.view_all_route ?? '/hotel/grid',
                aosName: dto.header?.aos?.name ?? 'fade-up',
                aosDuration: dto.header?.aos?.duration ?? 2000,
            },
            tabs,
            activeTabKey: defaultTab,
            hotel: (dto.data?.hotel ?? []).map(h => ({
                ...h,
                image_url: prefixDocApiUrl(h.image_url),
                user_avatar_url: prefixDocApiUrl(h.user_avatar_url)
            })),
            flight: (dto.data?.flight ?? []).map(f => ({
                ...f,
                image_url: prefixDocApiUrl(f.image_url),
                airline_icon_url: prefixDocApiUrl(f.airline_icon_url),
                user_avatar_url: prefixDocApiUrl(f.user_avatar_url)
            })),
            car: (dto.data?.car ?? []).map(c => ({
                ...c,
                image_url: prefixDocApiUrl(c.image_url),
                user_avatar_url: prefixDocApiUrl(c.user_avatar_url)
            })),
            cruise: (dto.data?.cruise ?? []).map(cr => ({
                ...cr,
                image_url: prefixDocApiUrl(cr.image_url),
                user_avatar_url: prefixDocApiUrl(cr.user_avatar_url)
            })),
            tour: (dto.data?.tour ?? []).map(t => ({
                ...t,
                image_url: prefixDocApiUrl(t.image_url),
                user_avatar_url: prefixDocApiUrl(t.user_avatar_url)
            })),
        };
    }
}