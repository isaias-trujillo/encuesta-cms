import {create} from "zustand";
import SurveyFormResponse from "../types/SurveyFormResponse";
import sendAnswers from "../services/sendAnswers.ts";
import splitFormInPages from "../utils/splitFormInPages.ts";

type Replier = {
    init: (page: number) => void;
    current: (indicatorId: string, questionId: string) => string | undefined;
    next: (indicatorId: string, questionId: string, optionId: string, page: number) => void;
    status?: 'has missing questions' | 'all question is missing' | 'no missing questions'
    message?: string;
    overview: {
        total: number;
        answered: number;
        missing: number;
        previousMissing: number;
    };
}

const useReplier = create<Replier>((setState) => ({
    init: (page: number) => {
        const form = JSON.parse(localStorage.getItem('cms-survey-form-2024') ?? '{}') as SurveyFormResponse;
        const slice = splitFormInPages(form)[page - 1];
        const total = slice?.indicators.map(indicator => indicator.questions.length).reduce((acc, curr) => acc + curr, 0) ?? 0;
        const answered = slice?.indicators.map(indicator => indicator.questions.filter(question => question.answer).length).reduce((acc, curr) => acc + curr, 0) ?? 0;
        const missing = total - answered
        setState((state) => ({...state, overview: {total, answered, missing, previousMissing: missing}}));
    },
    current: (indicatorId: string, questionId: string) => {
        const form = localStorage.getItem('cms-survey-form-2024');
        if (!form) {
            return undefined;
        }
        const parsedForm = JSON.parse(form) as SurveyFormResponse;
        const indicator = parsedForm.questionnaire.find(i => i.id === indicatorId);
        if (!indicator) {
            return undefined;
        }
        const question = indicator.questions.find(q => q.id === questionId);
        if (!question) {
            return undefined;
        }
        return question.answer;
    },
    next: (indicatorId, questionId, optionId, page: number) => {
        const form = localStorage.getItem('cms-survey-form-2024');
        if (!form) {
            return;
        }
        const parsedForm = JSON.parse(form) as SurveyFormResponse;
        const indicator = parsedForm.questionnaire.find(i => i.id === indicatorId);
        if (!indicator) {
            return;
        }
        const question = indicator.questions.find(q => q.id === questionId);
        if (!question) {
            return;
        }
        question.answer = optionId;
        // save the answer to the question in the local storage
        localStorage.setItem('cms-survey-form-2024', JSON.stringify(parsedForm));
        // save the answer to the question in database
        sendAnswers(parsedForm).then(r => r.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))

        const slice = splitFormInPages(parsedForm)[page - 1];
        const missing = slice.indicators.map(indicator => indicator.questions.filter(question => !question.answer).length).reduce((acc, curr) => acc + curr, 0);
        const total = slice.indicators.map(indicator => indicator.questions.length).reduce((acc, curr) => acc + curr, 0);
        const answered = total - missing;
        setState((state) => ({...state, overview: {total: total, answered, missing, previousMissing: state.overview.missing}}));
    },
    overview: {
        total: 0,
        answered: 0,
        missing: 0,
        previousMissing: 0
    }
}))

export default useReplier
