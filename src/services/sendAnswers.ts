import SurveyFormResponse from "../types/SurveyFormResponse";
import flattenJson from "./flattenJson.ts";

const sendAnswers = async (data: SurveyFormResponse) => {
    return fetch(`http://127.0.0.1:8000/api/satisfaction-survey/${data.survey.id}/answers`, {
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
