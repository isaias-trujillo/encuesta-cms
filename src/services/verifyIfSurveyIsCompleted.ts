import environment from "../environment.ts";

const verifyIfSurveyIsCompleted = async (surveyId: string) => {
    const {api} = environment();
    return fetch(`${api}/satisfaction-survey/${surveyId}/status`)
        .then(response => response.json())
        .catch(() => ({
            status: 'error',
            error: 'Servicio no disponible en este momento. Intente más tarde.  '
        }));
}

export default verifyIfSurveyIsCompleted;
