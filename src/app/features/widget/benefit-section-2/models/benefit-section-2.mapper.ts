import { BenefitSection2Dto } from '../dto/benefit-section-2.dto';
import { BenefitSection2Vm } from './benefit-section-2.model';

export class BenefitSection2Mapper {
    static fromDto(dto: BenefitSection2Dto): BenefitSection2Vm {
        return {
            header: {
                titlePrefix: dto.header?.title_prefix ?? 'Our',
                titleHighlight: dto.header?.title_highlight ?? 'Benefits',
                titleSuffix: dto.header?.title_suffix ?? '& Key Advantages',
                subtitle: dto.header?.subtitle ?? '',
                aosName: dto.header?.aos?.name ?? 'fade-up',
                aosDuration: dto.header?.aos?.duration ?? 2000,
            },
            items: (dto.items ?? []).map((x) => ({
                id: x.id,
                title: x.title,
                description: x.description,

                icon: x.icon,
                iconBgClass: x.icon_bg_class,
                iconTextClass: x.icon_text_class,
                shadowIconTextClass: x.shadow_icon_text_class,

                aosName: x.aos?.name ?? 'fade-up',
                aosDuration: x.aos?.duration ?? 2000,
            })),
        };
    }
}