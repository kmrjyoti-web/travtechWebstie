import { ClientSectionDto } from '../dto/client-section.dto';
import { ClientSectionVm } from './client-section.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';

export class ClientSectionMapper {
    static fromDto(dto: ClientSectionDto | null | undefined): ClientSectionVm {
        const items = (dto?.items ?? [])
            .map((x, idx) => ({
                id: x.id ?? `client-${idx + 1}`,
                imageUrl: prefixDocApiUrl(x.imageUrl ?? ''),
                alt: x.alt ?? 'client',
            }))
            .filter(x => !!x.imageUrl);

        return {
            title: dto?.title ?? 'Trusted By Clients Around the Globe',
            items,
        };
    }
}