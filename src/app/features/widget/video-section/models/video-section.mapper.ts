import { VideoSectionDto } from '../dto/video-section.dto';
import { VideoSectionVm } from './video-section.model';

export class VideoSectionMapper {
    static fromDto(dto: VideoSectionDto): VideoSectionVm {
        return {
            settings: dto.settings ?? {},
            size: dto.size ?? '1400-933',
            items: (dto.items ?? []).map(x => ({
                id: x.id,
                url: x.url,
                iconClass: x.iconClass ?? 'isax isax-play5',
                anchorClass: x.anchorClass ?? 'video-btn video-effect',
            })),
        };
    }
}