import IndicatorType from "../types/IndicatorType";
import SurveyType from "../types/SurveyType";
import OptionType from "../types/OptionType";

const getQuestionsOfPage = (
    {indicators}: SurveyType,
    questionsPerPage: number,
    pageNumber: number,
    options: OptionType[],
    answerOf: ({indicator, question}: { indicator: string, question: string }) => string | undefined = () => undefined
): IndicatorType[] => {
    const paginatedQuestions: IndicatorType[][] = [];
    let currentPage: IndicatorType[] = [];
    let currentQuestionCount = 0;

    indicators.forEach(indicator => {
        let remainingQuestions = [...indicator.questions];

        while (remainingQuestions.length > 0) {
            const spaceLeft = questionsPerPage - currentQuestionCount;
            const questionsToAdd = remainingQuestions.slice(0, spaceLeft);

            let indicatorToAdd = currentPage.find(ind => ind.id === indicator.id);
            if (!indicatorToAdd) {
                indicatorToAdd = {
                    id: indicator.id,
                    name: indicator.name,
                    image: indicator.image,
                    questions: []
                };
                currentPage.push(indicatorToAdd);
            }

            indicatorToAdd?.questions?.push(...(questionsToAdd).map(q => ({
                ...q,
                options: options.map(o => {
                    if (answerOf({indicator: indicator.id, question: q.id}) === o.id) {
                        return {...o, selected: true};
                    }
                    return o;
                })
            })));
            currentQuestionCount += questionsToAdd.length;
            remainingQuestions = remainingQuestions.slice(spaceLeft);

            if (currentQuestionCount === questionsPerPage) {
                paginatedQuestions.push(currentPage);
                currentPage = [];
                currentQuestionCount = 0;
            }
        }
    });

    if (currentQuestionCount > 0) {
        paginatedQuestions.push(currentPage);
    }

    return paginatedQuestions[pageNumber - 1] || [];
};

export default getQuestionsOfPage;
