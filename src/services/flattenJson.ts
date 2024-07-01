type FlattenedObject = {
    'indicator id': string;
    'question id': string;
    'option id': string;
};

const flattenJson = (json: Record<PropertyKey, Record<PropertyKey, string>>): FlattenedObject[] => {
    const result: FlattenedObject[] = [];

    for (const indicatorId in json) {
        const questions = json[indicatorId];
        for (const questionId in questions) {
            result.push({
                'indicator id': indicatorId,
                'question id': questionId,
                'option id': questions[questionId]
            });
        }
    }

    return result;
};

export default flattenJson;
