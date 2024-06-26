import IndicatorType from "./IndicatorType";
import QuestionType from "./QuestionType";

type SurveyType = {
    uuid: string;
    area: string;
    indicators: (IndicatorType & {
        questions: QuestionType[];
    })[];
}

export default SurveyType;
