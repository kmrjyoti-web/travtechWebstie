import { PreferencesCardDto } from '../dto/preferences-card.dto';
import { PreferencesCardVm } from './preferences-card.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';

export class PreferencesCardMapper {
    static fromDto(dto: PreferencesCardDto): PreferencesCardVm {
        const suffix = dto.count_suffix ?? 'Tours';
        const aosName = dto.aos?.name ?? 'fade-up';
        const aosDuration = dto.aos?.duration ?? 2000;

        return {
            id: dto.preference_id,
            title: dto.title,
            imageUrl: prefixDocApiUrl(dto.image_url),

            count: Number(dto.count ?? 0),
            countText: `${Number(dto.count ?? 0)} ${suffix}`,

            route: dto.route,

            aosName,
            aosDuration,
        };
    }
}