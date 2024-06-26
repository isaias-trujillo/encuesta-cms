import QuestionType from "./QuestionType";

type IndicatorType = {
    uuid: string;
    image: string;
    name: string;
    questions?: QuestionType[]
}

export default IndicatorType;
