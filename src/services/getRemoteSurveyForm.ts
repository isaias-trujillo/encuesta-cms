import environment from "../environment.ts";

const getRemoteSurveyForm = async (surveyId: string) => {
    const {api} = environment();
    return fetch(`${api}/satisfaction-survey/${surveyId}/form`)
        .then(response => response.json())
        .catch(error => ({
            status: 'error',
            error: error.message
        }));
}

export default getRemoteSurveyForm;
