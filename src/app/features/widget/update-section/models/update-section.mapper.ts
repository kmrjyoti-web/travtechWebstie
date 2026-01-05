import { UpdateSectionDto } from '../dto/update-section.dto';
import { UpdateSectionVm } from './update-section.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';

export class UpdateSectionMapper {
    static fromDto(dto: UpdateSectionDto | null | undefined): UpdateSectionVm {
        return {
            title: dto?.title ?? 'Stay Updated',
            subTitle: dto?.subTitle ?? '',
            placeholder: dto?.placeholder ?? 'Enter Email Address',
            buttonText: dto?.buttonText ?? 'Subscribe',
            iconClass: dto?.iconClass ?? 'isax isax-message-favorite5',
            bgImageUrl: prefixDocApiUrl(dto?.bgImageUrl ?? 'assets/img/bg/update-bg.png'),
        };
    }
}