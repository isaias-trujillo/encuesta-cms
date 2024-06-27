import {create} from "zustand";
import IndicatorType from "../types/IndicatorType";
import getQuestionsOfPage from "../services/getQuestionsOfPage.ts";
import OptionType from "../types/OptionType";
import emergencia from './../assets/emergencia.json' with {type: 'json'};
import options from './../assets/options.json' with {type: 'json'};

type Survey = {
    indicators: () => IndicatorType[];
    options: OptionType[];
    page: number;
    maxPages: () => number;
    nextPage: () => void;
    previousPage: () => void;
    updateAnswer: ({indicator, question, answer}: { indicator: string, question: string, answer: string }) => void;
    answerOf: ({indicator, question}: { indicator: string, question: string }) => string | undefined;
}

const useSurvey = create<Survey>((set, get) => ({
    options: options,
    page: parseInt(localStorage.getItem('page') ?? '1'),
    maxPages: () => {
        const questions = emergencia.indicators.map(indicator => (indicator.questions ?? []).length)
            .reduce((a, b) => a + b, 0);
        return Math.ceil(questions / 5);
    },
    updateAnswer: ({indicator, question, answer}) => {
        // indexed with indicator and question
        const oldAnswers = localStorage.getItem("answers") || "{}";
        const answers = JSON.parse(oldAnswers);
        answers[indicator] = {
            ...answers[indicator] ?? {},
            [question]: answer
        }
        localStorage.setItem("answers", JSON.stringify(answers));
    },
    answerOf: ({indicator, question}) => {
        const answers = localStorage.getItem("answers") || "{}";
        return JSON.parse(answers)[indicator]?.[question];
    },
    indicators: () => {
        const {page, options, answerOf} = get();
        return getQuestionsOfPage(emergencia, 5, page, options, answerOf);
    },
    nextPage: () => {
        const {page} = get();
        const limit = get().maxPages();
        const nextPage = Math.min(limit, page + 1);
        if (nextPage > limit) return;
        set(() => ({page: nextPage}));
        localStorage.setItem('page', nextPage.toString());
        window.location.reload();
    },
    previousPage: () => {
        const {page} = get();
        const previousPage = Math.max(1, page - 1);
        if (previousPage < 1) return;
        set(() => ({page: previousPage}));
        localStorage.setItem('page', previousPage.toString());
        window.location.reload();
    }
}));

export default useSurvey;
