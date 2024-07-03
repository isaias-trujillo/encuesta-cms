import {create} from "zustand";
import verifyIfSurveyIsCompleted from "../services/verifyIfSurveyIsCompleted.ts";
import SurveyFormResponse from "../types/SurveyFormResponse";
import sendSurveyAndFinishIt from "../services/sendSurveyAndFinishIt.ts";

type SurveyStatus = {
    loading: boolean;
    status: 'initial' | 'error' | 'not found' | 'completed' | 'in progress' | 'not finished';
    surveyId?: string;
    message?: string;
    init: (surveyId: string) => void;
    tryFinish: () => Promise<void>;
}

const useStatus = create<SurveyStatus>(set => ({
    loading: false,
    status: 'initial',
    init: async (surveyId: string | undefined) => {
        set(() => ({loading: true, status: 'initial'}));
        // get surveyId from URL e.g. /survey?id=1
        if (!surveyId) {
            set(() => ({loading: false, status: 'not found', message: 'No se encontró la encuesta.'}));
            return;
        }
        const result = await verifyIfSurveyIsCompleted(surveyId);
        if (result.status === 'not found') {
            set(() => ({loading: false, status: 'not found', message: result?.error ?? result.message}));
            return;
        }
        if (result.status === 'error') {
            console.log("Hello");
            set(() => ({loading: false, status: 'error', message: result?.error ?? result.message}));
            return;
        }
        if (result.status === 'completed') {
            set(() => ({loading: false, status: 'completed', surveyId}));
            // clear local storage
            localStorage.clear();
            return;
        }
        set(() => ({loading: false, status: 'in progress', surveyId}));
        return;
    },
    tryFinish: async () => {
        set(() => ({loading: true}));
        const form = localStorage.getItem('cms-survey-form-2024');
        if (!form) {
            set(() => ({loading: false, status: 'error', message: 'No se encontró la encuesta en progreso.'}));
            return;
        }
        const parsedForm = JSON.parse(form) as SurveyFormResponse;
        sendSurveyAndFinishIt(parsedForm)
            .then(data => {
                set(() => ({loading: false, status: data.status, message: data?.message}));
            }).catch(error => {
            set(() => ({
                loading: false,
                status: 'error',
                message: error.message ?? 'Hubo un error al enviar la encuesta. Por favor, intenta de nuevo.'
            }));
        })
    }
}))

export default useStatus;
