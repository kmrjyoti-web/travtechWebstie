import { DestinationDto } from '../dto/destination.dto';
import { DestinationCard } from './destination.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';

export class DestinationMapper {
    static fromDto(dto: DestinationDto): DestinationCard {
        const rating = Math.max(0, Math.min(5, Math.round(dto.rating ?? 0)));

        const stars = Array.from({ length: 5 }, (_, i) => i < rating);

        const stats = (dto.stats ?? []).map((s, idx, arr) => ({
            label: s.label,
            countText: `${String(s.count).padStart(2, '0')} ${s.label}`,
            icon: s.icon,
            colorClass: s.color_class ?? '',
            borderEnd: idx !== arr.length - 1,
        }));

        return {
            id: dto.destination_id,
            title: dto.title,
            imageUrl: prefixDocApiUrl(dto.image_url),
            rating,
            reviewsCount: dto.reviews_count,
            stars,
            stats,
            route: dto.route,
            aosName: dto.aos?.name ?? 'fade-up',
            aosDuration: dto.aos?.duration ?? 2000,
        };
    }
}