import { SupportSliderDto } from '../dto/support-slider.dto';
import { SupportSlider } from './support-slider.model';

export class SupportSliderMapper {
    static fromDto(dto: SupportSliderDto): SupportSlider {
        return {
            items: (dto.items ?? []).map(x => ({ title: x.title ?? '' })),
            direction: dto.direction ?? 'left',
            speed: dto.speed ?? 'slow',
            bgClass: dto.bgClass ?? 'bg-primary',
        };
    }
}