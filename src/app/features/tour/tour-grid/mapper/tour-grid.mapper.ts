import { TourGridItemDto } from '../dto/tour-grid.dto';
import { TourGridItemModel } from '../models/tour-grid.model';

export class TourGridMapper {
    static fromDto(dto: TourGridItemDto): TourGridItemModel {
        return {
            code: dto.user_itineraries_code,
            url: dto.itineraries_url,
            price: parseFloat(dto.price),
            heading: dto.itineraries_heading,
            fromCountry: dto.from_country,
            fromState: dto.from_state,
            toCountry: dto.to_country,
            toState: dto.to_state,
            shares: dto.no_of_shares,
            rating: dto.ratting,
            reviewsCount: dto.review,
            guestsCount: dto.noo_off_guest
        };
    }

    static fromDtoList(dtoList: TourGridItemDto[]): TourGridItemModel[] {
        return dtoList.map(dto => this.fromDto(dto));
    }
}
