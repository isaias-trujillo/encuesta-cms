import SurveyFormResponse from "../types/SurveyFormResponse";

const splitFormInPages = (response?: SurveyFormResponse): Page[] => {
    if (!response) return [];
    const maxQuestionsPerPage = 5;
    const pages: Page[] = [];
    let currentPage: Page = {indicators: [], totalQuestions: 0};

    for (const indicator of response.questionnaire ?? []) {
        let currentIndicator: Indicator = {...indicator, questions: []};

        for (const question of indicator.questions) {
            if (currentPage.totalQuestions < maxQuestionsPerPage) {
                currentIndicator.questions.push(question);
                currentPage.totalQuestions++;
            } else {
                if (currentIndicator.questions.length > 0) {
                    currentPage.indicators.push(currentIndicator);
                }
                pages.push(currentPage);
                currentPage = {indicators: [], totalQuestions: 0};
                currentIndicator = {...indicator, questions: [question]};
                currentPage.totalQuestions = 1;
            }
        }

        if (currentIndicator.questions.length > 0) {
            currentPage.indicators.push(currentIndicator);
        }
    }

    if (currentPage.totalQuestions > 0) {
        pages.push(currentPage);
    }

    return pages;
}

interface Question {
    id: string;
    question: string;
    answer?: string;
}

interface Indicator {
    id: string;
    name: string;
    image: string;
    questions: Question[];
}

interface Page {
    indicators: Indicator[];
    totalQuestions: number;
}

export default splitFormInPages
