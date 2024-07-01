const getSurveyForm = async (surveyId: string) => {
    return fetch(`http://127.0.0.1:8000/api/satisfaction-survey/${surveyId}/form`)
        .then(response => response.json())
        .catch(error => ({
            status: 'error',
            error: error.message
        }));
}

export default getSurveyForm;
