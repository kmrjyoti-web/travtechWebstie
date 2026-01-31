import { TourGridItemDto } from '../dto/tour-grid.dto';
import { TourGridItemModel } from '../models/tour-grid.model';
import { CurrencyHelper } from '../../../../shared/utils/currency.helper';

export class TourGridMapper {
    static fromDto(dto: TourGridItemDto): TourGridItemModel {
        return {
            code: dto.publish_unique_id || dto.user_itineraries_code || '',
            url: dto.publish_url || dto.itineraries_url || '',
            publishPrice: dto.publish_price !== undefined ? dto.publish_price : parseFloat(dto.price || '0'),
            heading: dto.publish_heading || dto.itineraries_heading || '',
            fromCountry: dto.from_country,
            fromState: dto.from_state,
            toCountry: dto.to_country,
            toState: dto.to_state,
            shares: dto.no_of_shares !== undefined ? dto.no_of_shares : null,
            rating: dto.ratting || 0,
            reviewsCount: dto.review || 0,
            guestsCount: dto.noo_off_guest || 0,
            imageUrl: dto.itineraries_image_detail || (dto.itinerary_images && dto.itinerary_images.length > 0 ? dto.itinerary_images[0] : null),

            // New fields mapping
            offerPrice: dto.offer_price,
            budgetMin: dto.budget_min || 0,
            budgetMax: dto.budget_max || 0,
            duration: (dto.package_duration_day || 0) + ' Days - ' + (dto.package_duration_night || 0) + ' Nights',
            currency: CurrencyHelper.getSymbol(dto.publish_currency_code || 'USD')
        };
    }

    static fromDtoList(dtoList: TourGridItemDto[]): TourGridItemModel[] {
        return dtoList.map(dto => this.fromDto(dto));
    }
}
