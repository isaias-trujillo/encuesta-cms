import QuestionType from "./QuestionType";

type IndicatorType = {
    id: string;
    image: string;
    name: string;
    questions?: QuestionType[]
}

export default IndicatorType;
