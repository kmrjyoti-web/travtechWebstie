import { OurExpertDto } from '../dto/our-expert.dto';
import { OurExpertVm, OurExpertItem } from './our-expert.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';

export class OurExpertMapper {
    static fromDto(dto: OurExpertDto): OurExpertVm {
        return {
            header: dto.header,
            aos: { name: dto.aos.name, duration: dto.aos.duration },
            viewAll: dto.viewAll,
            items: dto.items.map(OurExpertMapper.mapItem),
        };
    }

    private static mapItem(i: any): OurExpertItem {
        return {
            id: i.id,
            name: i.name,
            ratingBadgeText: Number(i.rating ?? 0).toFixed(1),
            reviewsText: `(${i.reviewsText})`,
            countryText: i.countryText,
            countryFlagUrl: prefixDocApiUrl(i.countryFlagUrl),
            imageUrl: prefixDocApiUrl(i.imageUrl),
            bgClass: i.bgClass,
            circleClass: i.circleClass,
            totalListings: Number(i.totalListings ?? 0),
            startsFromText: `${i.currencySymbol ?? '$'}${Number(i.startsFrom ?? 0)}`,
        };
    }
}