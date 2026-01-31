import { FooterDto } from '../dto/footer.dto';
import { FooterData } from './footer.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';

export class FooterMapper {
    static fromDto(dto: FooterDto): FooterData {
        return {
            hideOnBase: dto.hideOnBase ?? [],
            columns: (dto.columns ?? []).map(c => ({
                title: c.title ?? '',
                links: (c.links ?? []).map(l => ({
                    label: l.label ?? '',
                    routeKey: l.routeKey,
                    href: l.href
                }))
            })),
            brand: {
                homeRouteKey: dto.brand?.homeRouteKey ?? 'index',
                logoLight: prefixDocApiUrl(dto.brand?.logoLight ?? ''),
                logoDark: prefixDocApiUrl(dto.brand?.logoDark ?? '')
            },
            stores: {
                label: dto.stores?.label ?? 'Available on :',
                items: (dto.stores?.items ?? []).map(x => ({ img: prefixDocApiUrl(x.img ?? ''), href: x.href ?? 'javascript:void(0);' }))
            },
            contact: {
                support: {
                    iconWrapClass: dto.contact?.support?.iconWrapClass ?? '',
                    iconClass: dto.contact?.support?.iconClass ?? '',
                    title: dto.contact?.support?.title ?? '',
                    value: dto.contact?.support?.value ?? ''
                },
                email: {
                    iconWrapClass: dto.contact?.email?.iconWrapClass ?? '',
                    iconClass: dto.contact?.email?.iconClass ?? '',
                    title: dto.contact?.email?.title ?? '',
                    value: dto.contact?.email?.value ?? ''
                }
            },
            footerArt: { img: prefixDocApiUrl(dto.footerArt?.img ?? '') },
            bottom: {
                copyrightHtml: dto.bottom?.copyrightHtml ?? '',
                brandName: dto.bottom?.brandName ?? '',
                brandHref: dto.bottom?.brandHref ?? 'javascript:void(0);',
                social: (dto.bottom?.social ?? []).map(s => ({ iconClass: s.iconClass ?? '', href: s.href ?? 'javascript:void(0);' })),
                cards: (dto.bottom?.cards ?? []).map(c => ({ img: prefixDocApiUrl(c.img ?? ''), href: c.href ?? 'javascript:void(0);' }))
            }
        };
    }
}