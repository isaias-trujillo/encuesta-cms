import SurveyFormResponse from "../types/SurveyFormResponse";
import flattenJson from "../utils/flattenJson.ts";
import environment from "../environment.ts";

const {api} = environment();

const sendSurveyAndFinishIt = (data: SurveyFormResponse) => fetch(`${api}/satisfaction-survey/${data.survey.id}/finish`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapDataToBody(data)),
}).then(r => r.json())
    .then(data => {
        if ('error' in data ) {
            throw new Error(data.error)
        }
        return data
    })

const mapDataToBody = (data: SurveyFormResponse) => {
    return {
        'patient id': data.patient.id,
        'survey id': data.survey.id,
        'service id': data.service.id,
        'questionnaire': flattenJson(data.questionnaire)
    };
}

export default sendSurveyAndFinishIt
