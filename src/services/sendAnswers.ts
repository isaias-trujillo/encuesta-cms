import SurveyFormResponse from "../types/SurveyFormResponse";
import flattenJson from "../utils/flattenJson.ts";
import environment from "../environment.ts";

const sendAnswers = async (data: SurveyFormResponse) => {
    const {api} = environment();
    return fetch(`${api}/satisfaction-survey/${data.survey.id}/answers`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapDataToBody(data)),
    })
}

const mapDataToBody = (data: SurveyFormResponse) => {
    return {
        'patient id': data.patient.id,
        'survey id': data.survey.id,
        'service id': data.service.id,
        'questionnaire': flattenJson(data.questionnaire)
    };
}

export default sendAnswers;
