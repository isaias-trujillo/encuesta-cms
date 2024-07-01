import {create} from "zustand";
import verifyIfSurveyIsCompleted from "../services/verifyIfSurveyIsCompleted.ts";

type SurveyStatus = {
    loading: boolean;
    status: 'initial' | 'error' | 'not found' | 'completed' | 'in progress';
    surveyId?: string;
    message?: string;
    init: (surveyId: string) => void;
}

const useSurveyStatus = create<SurveyStatus>(set => ({
    loading: false,
    status: 'initial',
    init: async (surveyId: string) => {
        set(() => ({loading: true, status: 'initial'}));
        // get surveyId from URL e.g. /survey?id=1
        if (!surveyId) {
            set(() => ({loading: false, status: 'not found'}));
            return;
        }
        const result = await verifyIfSurveyIsCompleted(surveyId);
        if (result.status === 'error') {
            set(() => ({loading: false, status: 'error', message: result.error}));
            return;
        }
        if (result.status === 'not found') {
            set(() => ({loading: false, status: 'not found'}));
            return;
        }
        // survey is in progress or completed
        set(() => ({loading: false, status: result.status, surveyId}));
        return;
    }
}))

export default useSurveyStatus;
