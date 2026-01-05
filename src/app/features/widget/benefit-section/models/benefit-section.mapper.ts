import { BenefitSectionDto } from '../dto/benefit-section.dto';
import { BenefitSectionVm } from './benefit-section.model';

export class BenefitSectionMapper {
    static fromDto(dto: BenefitSectionDto): BenefitSectionVm {
        return {
            header: {
                badge: dto.header?.badge ?? 'How it Works',
                title: dto.header?.title ?? '',
                titleDot: dto.header?.title_dot ?? '.',
                aosName: dto.header?.aos?.name ?? 'fade-up',
                aosDuration: dto.header?.aos?.duration ?? 2000,
            },
            items: (dto.items ?? []).map((x) => ({
                id: x.id,
                step: x.step,
                bgClass: x.bg_class,
                iconClass: x.icon_class,
                iconColorClass: x.icon_color_class,
                title: x.title,
                description: x.description,
                aosName: x.aos?.name ?? 'fade-up',
                aosDuration: x.aos?.duration ?? 2000,
            })),
        };
    }
}