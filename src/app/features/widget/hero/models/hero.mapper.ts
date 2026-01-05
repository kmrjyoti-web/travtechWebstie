import { HeroConfigDtoRoot } from '../dto/hero.dto';
import { HeroConfig } from './hero.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';

export class HeroMapper {
    static fromDto(root: HeroConfigDtoRoot): HeroConfig {
        const h = root.hero;

        const panelDto = h.panel ?? { enabled: false, tabs: [] };

        return {
            backgroundUrl: prefixDocApiUrl(h.background_url),
            title: h.title ?? '',
            titleHighlight: h.title_highlight ?? '',
            subtitle: h.subtitle ?? '',
            minHeightPx: h.min_height_px ?? 620,
            parallax: h.parallax ?? true,

            panel: {
                enabled: panelDto.enabled ?? false,
                reserveSpaceWhenHidden: panelDto.reserve_space_when_hidden ?? true,
                reservedHeightPx: panelDto.reserved_height_px ?? 240,
                tabs: (panelDto.tabs ?? [])
                    .filter(t => t.enabled)
                    .map(t => ({
                        id: t.id,
                        label: t.label,
                        iconClass: t.icon_class ?? '',
                        enabled: t.enabled,
                        submitLabel: t.submit_label ?? 'Search',
                        fields: (t.fields ?? []).map(f => ({
                            key: f.key,
                            type: f.type,
                            label: f.label,
                            placeholder: f.placeholder ?? '',
                            defaultValue: f.default,
                            min: f.min,
                            max: f.max,
                            options: (f.options ?? []).map(o => ({ label: o.label, value: o.value })),
                            showIf: f.show_if ? { field: f.show_if.field, equals: f.show_if.equals } : undefined
                        }))
                    }))
            }
        };
    }
}