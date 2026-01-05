import { AboutSectionDto } from '../dto/about-section.dto';
import { AboutSectionModel } from './about-section.model';
import { prefixDocApiUrl } from '../../../../shared/utils/image-url.util';

export class AboutSectionMapper {
    static fromDto(dto: AboutSectionDto): AboutSectionModel {
        return {
            listing: {
                icon: dto.listing.icon,
                title: dto.listing.title,
                imageUrl: prefixDocApiUrl(dto.listing.image_url),
                buttonText: dto.listing.button_text,
                buttonRoute: dto.listing.button_route,
            },

            mainImageUrl: prefixDocApiUrl(dto.main_image_url),

            earnings: {
                iconUrl: prefixDocApiUrl(dto.earnings.icon_url),
                label: dto.earnings.label,
                amountText: dto.earnings.amount_text,
                withdrawText: dto.earnings.withdraw_text,
                withdrawRoute: dto.earnings.withdraw_route,
            },

            content: {
                badgeText: dto.content.badge_text,
                heading: dto.content.heading,
                description: dto.content.description,
                features: (dto.content.features ?? []).map(f => ({
                    avatarClass: f.avatar_class,
                    icon: f.icon,
                    iconExtraClass: f.icon_extra_class ?? '',
                    text: f.text,
                })),
            },

            footer: {
                learnMoreText: dto.footer.learn_more_text,
                learnMoreRoute: dto.footer.learn_more_route,
                avatars: (dto.footer.avatars ?? []).map(a => prefixDocApiUrl(a)),
                ratingStars: dto.footer.rating_stars ?? 0,
                ratingScoreText: dto.footer.rating_score_text ?? '',
                reviewsText: dto.footer.reviews_text ?? '',
            },

            counters: (dto.counters ?? []).map(c => ({
                title: c.title,
                icon: c.icon,
                textClass: c.text_class,
                value: c.value,
                suffix: c.suffix ?? '',
            })),

            bgImages: {
                img1: prefixDocApiUrl(dto.bg_images.img1),
                img2: prefixDocApiUrl(dto.bg_images.img2),
            },
        };
    }
}