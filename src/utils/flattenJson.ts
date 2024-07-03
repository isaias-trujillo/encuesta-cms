import SurveyFormResponse from "../types/SurveyFormResponse";

type FlattenedObject = {
    'indicator id': string;
    'question id': string;
    'option id': string;
};

const flattenJson = (questionnaire: SurveyFormResponse['questionnaire']): FlattenedObject[] => {
    const result: FlattenedObject[] = [];

    questionnaire.forEach(indicator => {
        indicator.questions.forEach(question => {
            if (!question.answer){
                return;
            }
            result.push({
                'indicator id': indicator.id,
                'question id': question.id,
                'option id': question.answer,
            });
        });
    });

    return result;
};

export default flattenJson;
