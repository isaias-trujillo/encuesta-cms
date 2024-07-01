import SurveyFormResponse from "../types/SurveyFormResponse";
import {create} from "zustand";
import getSurveyForm from "../services/getSurveyForm.ts";

type SurveyForm = {
    loading: boolean,
    status: 'initial' | 'error' | 'success';
    message?: string;
    init: () => void;
    data: () => SurveyFormResponse | undefined;
}

const useForm = create<SurveyForm>((set) => ({
    loading: false,
    status: 'initial',
    init: async () => {
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
        const localForm = localStorage.getItem('cms-survey-form-2024');
        if (localForm !== undefined && localForm !== null) {
            // if the survey id is the same, don't load again
            const parsedForm = JSON.parse(localForm);
            if (parsedForm.surveyId === surveyId) {
                set(() => ({loading: false, status: 'success', form: parsedForm}));
                return;
            }
            // otherwise, remove the old form
            localStorage.removeItem('cms-survey-form-2024');
        }
        set(() => ({loading: true, status: 'initial'}));
        // get surveyId from URL e.g. /survey?id=1
        if (!surveyId) {
            set(() => ({loading: false, status: 'error', message: 'Survey ID not found'}));
            return;
        }
        const response = await getSurveyForm(surveyId);
        if (response.status === 'error') {
            set(() => ({loading: false, status: 'error', message: response.error}));
            return;
        }
        // save form to local storage
        localStorage.setItem('cms-survey-form-2024', JSON.stringify(response));
        // survey form found
        set(() => ({loading: false, status: 'success'}));
    },
    data: () => {
        const item = localStorage.getItem('cms-survey-form-2024');
        if (!item) {
            return undefined;
        }
        return JSON.parse(item) as SurveyFormResponse
    }
}))

export default useForm;
