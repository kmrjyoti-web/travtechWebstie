export interface FaqSectionVm {
    header: {
        titleHtml: string;
        subTitle: string;
    };
    items: FaqItemVm[];
}

export interface FaqItemVm {
    id: string;          // stable id for accordion
    question: string;
    answerHtml: string;
    isOpen: boolean;
}