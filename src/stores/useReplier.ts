import {create} from "zustand";
import SurveyFormResponse from "../types/SurveyFormResponse";
import sendAnswers from "../services/sendAnswers.ts";

type Replier = {
    current: (indicatorId: string, questionId: string) => string | undefined;
    next: (indicatorId: string, questionId: string, optionId: string) => void;
}

const useReplier = create<Replier>(() => ({
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
    next: (indicatorId, questionId, optionId) => {
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
    }
}))

export default useReplier
