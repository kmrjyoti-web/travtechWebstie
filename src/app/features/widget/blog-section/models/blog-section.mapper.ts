import { BlogSectionDto } from '../dto/blog-section.dto';
import { BlogSectionVm } from './blog-section.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';

export class BlogSectionMapper {
    static fromDto(dto: BlogSectionDto | null | undefined): BlogSectionVm {
        return {
            header: {
                titleHtml:
                    dto?.header?.titleHtml ??
                    'Recent <span class="text-primary text-decoration-underline">Articles</span>',
                subTitle: dto?.header?.subTitle ?? '',
            },
            viewAll: {
                label: dto?.viewAll?.label ?? 'View All Articles',
                routeKey: dto?.viewAll?.routeKey ?? 'blogGrid',
            },
            items: (dto?.items ?? []).map((x) => ({
                image: prefixDocApiUrl(x?.image ?? ''),
                badge: x?.badge ?? '',

                authorName: x?.authorName ?? '',
                authorAvatar: prefixDocApiUrl(x?.authorAvatar ?? ''),

                dateText: x?.dateText ?? '',
                title: x?.title ?? '',

                routeKey: x?.routeKey ?? 'blogDetails',
            })),
        };
    }
}