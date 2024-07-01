import SurveyFormResponse from "../types/SurveyFormResponse";
import {create} from "zustand";
import getSurveyForm from "../services/getSurveyForm.ts";
import OptionType from "../types/OptionType";

type SurveyForm = {
    loading: boolean,
    status: 'initial' | 'error' | 'success';
    message?: string;
    init: () => void;
    page: number;
    lastPage: number;
    form?: SurveyFormResponse;
    options?: OptionType;
}

const useSurveyForm = create<SurveyForm>((set) => ({
    loading: false,
    status: 'initial',
    init: async () => {
        const surveyId = new URLSearchParams(window.location.search).get('id') ?? 'nothing';
        // check if already loaded
        const localForm = localStorage.getItem('surveyForm');
        if (localForm) {
            // if the survey id is the same, don't load again
            const parsedForm = JSON.parse(localForm);
            if (parsedForm.surveyId === surveyId) {
                set(() => ({loading: false, status: 'success', form: parsedForm}));
                return;
            }
            // otherwise, remove the old form
            localStorage.removeItem('surveyForm');
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
        localStorage.setItem('surveyForm', JSON.stringify(response.form));
        // survey form found
        set(() => ({loading: false, status: 'success', form: response.form, options: response.options}));
    },

}))

export default useSurveyForm;
