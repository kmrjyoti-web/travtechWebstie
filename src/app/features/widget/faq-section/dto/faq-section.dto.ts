export interface FaqSectionDto {
    header?: {
        titleHtml?: string;
        subTitle?: string;
    };
    items?: FaqItemDto[];
}

export interface FaqItemDto {
    question?: string;
    answerHtml?: string;
    isOpen?: boolean;
}