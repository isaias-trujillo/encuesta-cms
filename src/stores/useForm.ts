import SurveyFormResponse from "../types/SurveyFormResponse";
import {create} from "zustand";
import getRemoteSurveyForm from "../services/getRemoteSurveyForm.ts";

type SurveyForm = {
    loading: boolean,
    status: 'initial' | 'error' | 'success';
    message?: string;
    init: () => void;
    data: () => SurveyFormResponse | undefined;
}

export const retrieveLocalForm = () => {
    const item = localStorage.getItem('cms-survey-form-2024');
    if (!item) {
        return undefined;
    }
    return JSON.parse(item) as SurveyFormResponse
};

const useForm = create<SurveyForm>((set, get) => ({
    loading: false,
    status: 'initial',
    init: async () => {
        // get surveyId from URL e.g. /survey?id=1
        const surveyId = new URLSearchParams(window.location.search).get('id') ?? undefined;
        if (!surveyId) {
            set(() => ({
                loading: false,
                status: 'error',
                message: 'Para acceder a la encuesta, por favor, use el enlace que se le proporcionó.'
            }));
            return;
        }
        // check if already loaded
        const localForm = get().data();
        if (localForm) {
            // if the survey id is the same, don't load again
            if (localForm.survey.id === surveyId) {
                set(() => ({loading: false, status: 'success'}));
                return;
            }
            // otherwise, clear the local storage
            localStorage.clear()
        }
        set(() => ({loading: true, status: 'initial'}));
        const response = await getRemoteSurveyForm(surveyId);
        if (response.status === 'error' || !!response.error) {
            set(() => ({loading: false, status: 'error', message: response.error}));
            return;
        }
        // save form to local storage
        localStorage.setItem('cms-survey-form-2024', JSON.stringify(response));
        // survey form found
        set(() => ({loading: false, status: 'success', data: retrieveLocalForm}));
    },
    data: retrieveLocalForm,
}))

export default useForm;
