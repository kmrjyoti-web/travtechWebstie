import { FaqSectionDto } from '../dto/faq-section.dto';
import { FaqSectionVm } from './faq-section.model';

const makeId = (i: number) => {
    // match your ids like faq-collapseOne, two, three...
    const names = ['One', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    return names[i] ?? `item${i + 1}`;
};

export class FaqSectionMapper {
    static fromDto(dto: FaqSectionDto | null | undefined): FaqSectionVm {
        const header = {
            titleHtml:
                dto?.header?.titleHtml ??
                'Frequently Asked <span class="text-primary  text-decoration-underline">Questions</span>',
            subTitle: dto?.header?.subTitle ?? '',
        };

        const items = (dto?.items ?? []).map((x, i) => ({
            id: makeId(i),
            question: x?.question ?? '',
            answerHtml: x?.answerHtml ?? '',
            isOpen: !!x?.isOpen,
        }));

        return { header, items };
    }
}